import { Link } from 'react-router-dom';

type ReportSection = {
  heading: string;
  paragraphs: string[];
};

const title = "BotGuard, disassembled — reverse engineering Google's anti-fraud VM";
const standfirst =
  "BotGuard is Google's anti-fraud virtual machine, deployed in login flows and ReCaptcha. It is not a fingerprint script, and misreading it as one is how threat models go wrong. This report covers the bytecode VM, the anti-debug and anti-logger layers that protect it, and the structural weakness at the end of the chain: the token it produces is portable, and the server that verifies it has no way to check the claim against the machine that made it.";

const openingParagraphs = [
  'This report documents the BotGuard VM as deployed in Google\u2019s account login and ReCaptcha flows, and the Proof of Origin (PO) token system YouTube\u2019s web player uses today. It builds on three external bodies of work. Cypa\u2019s botguard-reverse repository contains the foundational VM analysis, including a disassembler and decompiler for the custom bytecode. LuanRT\u2019s BgUtils project reverse engineered YouTube\u2019s PO token generation and attestation flow. The yt-dlp project\u2019s PO token guide documents how those tokens are enforced in production and how the downloader ecosystem works around them.',
  'My own contribution is the portability analysis: a 2021 demonstration that a token minted in one context is accepted in another, and the argument about what that means for client-side trust models generally. The demonstration and the opcode-level notes it builds on are documented in my public repository, google-botguard-security-research, which has been public since release.',
  'Method: static analysis of the VM bytecode and interpreter using the open-source tooling from botguard-reverse, review of BgUtils\u2019 attestation flow and the yt-dlp enforcement documentation, and comparison of the token lifecycle across the login and YouTube contexts. No live Google system was attacked or probed in the course of writing this report. The analysis is based on public sources as of August 11, 2026. Two limits apply. Google rebuilds BotGuard frequently; variable names and opcode numbers shift between compiles, so this describes the architecture, not a byte-exact snapshot. And the PO token system is still changing, with enforcement rolling out per client and per format.',
];

const sections: ReportSection[] = [
  {
    heading: 'The defense is a CPU, not a script',
    paragraphs: [
      'BotGuard is not a JavaScript program in the usual sense. The bundle a page loads contains a custom bytecode program, executed by a virtual machine written in JavaScript. The obfuscated code visible in DevTools is the interpreter. The actual logic is the bytecode it runs.',
      "Cypa's writeup is explicit about what the VM is for. BotGuard generates a token used to verify the validity of requests to Google's servers. In ReCaptcha it is not used as a fingerprint, a common misreading; it is used to verify that the request comes from a browser, because the token is designed to only be generable by browser execution. The VM is register-based, emulating a modern CPU, rather than stack-based like a JVM or WebAssembly.",
      'That design choice is the core of its strength. A VM virtualizes the code completely, so the algorithm is data: there is no function to read and no straightforward way to debug into it. It beats standard control flow flattening because beautifying the code is not enough; you need a disassembler and a decompiler just to see the instructions. Cypa also notes the VM carries features standard VMs such as Kasada or TikTok do not, including register encryption and flow-changing opcodes.',
    ],
  },
  {
    heading: 'The entry point is derived from the bytecode itself',
    paragraphs: [
      'Initialization starts at new window.botguard.bg(). The constructor modifies a large string, the VM bytecode, before sending it to another function. The VM then locates its own bytecode string, takes a substring, often the first three characters plus an underscore, and uses that dynamic key to find its initialization routine.',
      'The trick defeats symbol scanning: the entry point cannot be found by searching for a known symbol, because the symbol is computed from the payload at runtime. Static analysis tools have nothing stable to anchor on.',
    ],
  },
  {
    heading: 'The opcode surface includes self-modifying code',
    paragraphs: [
      'The instruction set mixes standard operations with custom ones. Identified opcodes include 328 (USHR) and 381 (ADD) for bitwise and arithmetic work, 65 (SETPROP) and 467 (GETPROP) for object property manipulation, 220 (IN) which checks for property existence, likely hunting for webdriver flags, and 289 (HALT). The VM context holds critical globals, and several opcodes read or write it directly.',
      'The more consequential piece is self-modifying code. The VM constructs an array of integers, Register 274, and maps them to string definitions. A LOADSTRING opcode generates new instructions on the fly, and an EVAL opcode, mapped as LOADOP, compiles them into executable logic. The code visible at the start of execution is not the code that runs at the end. This is why static analysis of a single snapshot understates the program: the instruction stream grows while it executes.',
    ],
  },
  {
    heading: 'The timing-based anti-debug diverts instead of crashing',
    paragraphs: [
      'The VM polls performance.now() combined with Date.now() continuously. Set a breakpoint and execution pauses while the clock keeps running; on resume, the delta between timestamps is large.',
      'The VM uses that delta to mutate a seed stored in the VM context as K.U. The seed determines the decryption key for the next block of bytecode. If the delta suggests a debugger was active, the seed corrupts, and the program silently diverges into a garbage execution path that produces an invalid token, which the server rejects. Cypa\u2019s notes show quick math operations that determine an amount to xor the seed by; the value should stay at zero, and when it does not, the following bytes of the program change.',
      'The notable detail: the program does not crash when it detects a debugger. It keeps executing, apparently normally, down a dead timeline. The researcher believes they are debugging the real program while the VM is running a corrupted copy of it.',
    ],
  },
  {
    heading: 'The anti-logger turns logging into corruption',
    paragraphs: [
      'You cannot print the variables. The script aggressively binds to console methods, building a trap function that overrides properties. Cypa\u2019s analysis traces the mechanism: a getter is installed so that whenever any patched method is called, a handler function runs. That handler pops a value off a stack; the pop method of an empty array is bound onto a prototype, so calling any patched method on an object pops from that stack.',
      'The stack is shared with the memory reader, which retrieves bytes from the program\u2019s memory. Log a variable or hit a conditional logpoint and the memory pointer shifts, the VM reads the wrong bytes, the instruction stream corrupts, and token minting fails. The trap does not need to be clever about what you logged. The act of logging is enough to move the pointer.',
    ],
  },
  {
    heading: 'The memory reader is a circular dependency',
    paragraphs: [
      'Bytecode fetching runs through a memory reader, often minified as H. It reads bytes from the bytecode array and encrypts them before returning them. Per the repository notes, three pieces of state drive it. Register 21 is a rolling key array. Z.W is a position tracker that increments linearly. Z.U is the seed, which mutates based on time and execution history.',
      'The call H(true, L, 8) reads 8 bits, and with the first argument true, invokes an encryption routine using Register 21. A SETPROP opcode exists specifically to scramble these keys, resetting the position and pulling a fresh seed from the reader. The result is a circular dependency: the reader relies on the seed, and the seed relies on the reader. My reading is that static analysis without perfect emulation goes nowhere; the same position in the stream can decrypt to different values depending on execution history, because the decoder re-seeds itself as it goes.',
    ],
  },
  {
    heading: 'The error handler loop-unrolls',
    paragraphs: [
      'Beyond the opcodes there is an operation that is not quite an opcode: the error handler that drives the main loop, using loop unrolling. It catches errors, sends them to a function that modifies two register arrays, checks whether an integer register exceeds 3, subtracts 3 when it does, and calls an encryption function on both arrays, pushing the newly encrypted values back in.',
      'The loop count varies per script. For the sample Cypa analyzed, it took roughly 38 iterations. Loop unrolling is normally an optimization; here it doubles as obfuscation, because the code path any single static view shows is only a fragment of the actual cycle.',
    ],
  },
  {
    heading: 'The token is portable',
    paragraphs: [
      'The output of the whole exercise is a token. BotGuard mints it after the VM runs its checks, and Google\u2019s server verifies it alongside the request. In 2021 I demonstrated that the token does not need to be minted by the context that presents it. A token generated in a compliant environment, extracted before the minting request completes, is accepted when attached to a request from a different context.',
      'The mechanism matters less than what it proves. Google\u2019s server validates the token\u2019s integrity, not its origin. That was demonstrated in 2021 and documented in my repository; it has not been independently reproduced or re-verified against current builds. The token demonstrates that a browser passed the checks, not which browser, and not which user or context is holding it. The environment spoofing required to mint valid tokens is documented in the public repository: a hardened browser automation setup that masks the usual headless tells, lets BotGuard run its checks on a legitimate domain, and captures the token before the network call finishes.',
      'The reason the attack works is architectural, not cryptographic. The server never sees the machine that produced the token. It sees a claim written by that machine. The claim is accepted because there is no way to cryptographically verify it against the machine; at best it can be weighted against server-side heuristics.',
    ],
  },
  {
    heading: 'PO tokens are the same pattern with more layers',
    paragraphs: [
      "YouTube's player enforces the same design under a different name. Proof of Origin tokens are required for requests from some clients; the yt-dlp guide documents that without one, format requests can return HTTP 403, and repeated failures can get the account or IP blocked. A PO token is generated by an attestation provider: BotGuard on Web, DroidGuard on Android, iOSGuard on iOS, and a token from one platform is not accepted on another.",
      'BgUtils, LuanRT\u2019s reverse engineered implementation, maps the flow. The client obtains a challenge, the VM script plus its bytecode program, from the InnerTube challenge response embedded in page source, from the InnerTube API\u2019s attestation endpoint, or from Google\u2019s Web Anti-Abuse private API. The VM runs and produces a BotGuard response, which is exchanged for an integrity token through the GenerateIT endpoint. The integrity token feeds a minter function that produces PO tokens bound to an identifier; the result is 110 to 128 bytes.',
      'Per the BgUtils-based analysis in the repository, YouTube uses three token types. A cold start token is a placeholder used to initiate playback before the full session-bound token is minted, using a simple XOR cipher and bound to the Data Sync ID or Visitor ID. A session bound token is minted when the user first interacts with the player, bound to the account\u2019s Data Sync ID when logged in or the Visitor ID otherwise. A content bound token is generated per player request and bound to the specific video ID. The yt-dlp guide confirms the content binding: most web tokens are bound to the video ID, so a new token is required for each video, and lifetimes may be as short as 12 hours.',
      'Server-side enforcement also exists. Per the repository notes, the player checks a value called sps in media segment responses when using the UMP or SABR streaming protocols. Status 1 means the stream is fine, either a valid token, Premium, or no token required. Status 2 means a token is required and the client gets a grace window of 1 to 2 MB of data before playback is interrupted. Status 3 means a token is mandatory and no further data is served without one.',
      'The portability weakness persists in a weaker form. BgUtils and the yt-dlp PO token providers mint PO tokens outside YouTube\u2019s own player, running the VM in Node, and the resulting tokens are accepted in production for real requests. That shows the server still cannot distinguish the minting context: the client produces the token, and the server cannot observe the machine that produced it. The 2021 exfiltration technique itself was not re-tested against current builds, and Google\u2019s continuous rebuilds mean the specifics have drifted. What changed since 2021 is friction: three token types with different binding semantics, server-side enforcement that can interrupt playback mid-stream, and content binding that ties tokens to video IDs, shrinking the reuse window. The multi-layer design makes the attack more complex to execute, and the layers are real improvements. They do not close the structural gap.',
    ],
  },
  {
    heading: 'What the layers actually buy',
    paragraphs: [
      "None of this makes the defense worthless. The VM raises the cost of automated abuse against Google's properties. It pushed attackers toward instrumenting real browsers and paying for real devices, which is more expensive and easier to detect than pure scripted requests. That is a genuine win.",
      'The failure mode is not the control. It is the belief that the control is a verdict rather than a signal. A fraud engine that treats client attestation as proof that a user is legitimate is trusting an attacker-controlled input. A fraud engine that treats it as one feature among many, weighted against server-side evidence such as IP reputation, session history, and behavioral analysis, is using it correctly. The sps mechanism is a step in that direction: server-side enforcement that checks the token at delivery time instead of trusting the client\u2019s account of itself.',
      'The same logic applies to device fingerprinting, browser integrity checks, and the rest of the client-side catalog. They are all reports from a machine you do not control. Use them to rank and filter. Never use them as the ground truth of a decision that matters.',
    ],
  },
];

const sources = [
  {
    label: 'Cypa, botguard-reverse',
    url: 'https://github.com/dsekz/botguard-reverse',
    note: 'VM analysis, anti-debug and anti-logger internals, disassembler and decompiler',
  },
  {
    label: 'Tom Kristian Abel, google-botguard-security-research',
    url: 'https://github.com/tomkabel/google-botguard-security-research',
    note: 'opcode table, memory reader, error handler, 2021 portability demonstration, PO token synthesis',
  },
  {
    label: 'LuanRT, BgUtils',
    url: 'https://github.com/LuanRT/BgUtils',
    note: 'PO token generation and attestation flow, MIT licensed',
  },
  {
    label: 'yt-dlp, Po-Token-Guide',
    url: 'https://github.com/yt-dlp/yt-dlp/wiki/Po-Token-Guide',
    note: 'token enforcement, content binding, platform attestation providers',
  },
  {
    label: 'Brainicism, bgutil-ytdlp-pot-provider',
    url: 'https://github.com/Brainicism/bgutil-ytdlp-pot-provider',
    note: 'PO token provider for yt-dlp built on BgUtils, maintained by a yt-dlp maintainer',
  },
  {
    label: 'Companion essay: What client-side trust is actually worth',
    url: 'https://tomabel.ee/writing/what-client-side-trust-is-actually-worth/',
    note: 'the argument this report\u2019s evidence supports',
  },
];

const disclosureParagraphs = [
  "This report describes Google's production anti-fraud systems. The technical analysis is drawn from research that was already public before this report: Cypa's botguard-reverse (open source), LuanRT's BgUtils (MIT), and my own google-botguard-security-research repository, public since its release. The portability demonstration predates this report by years and is documented in that repository.",
  'No live Google system was tested or probed for this report, and no new vulnerability is disclosed here. Google updates BotGuard continuously; variable names and opcode numbers shift between compiles, and PO token enforcement is rolling out per client and format. Nothing in this report should be read as current bypass guidance, and operational detail is deliberately left at the architecture level. Research conduct follows the site\u2019s ',
];

const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function BotGuardDisassembledResearchPage() {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/research"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            ← Back to research
          </Link>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Research · Technical Teardown · Anti-Fraud
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 11, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">13 min read</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">Tom Kristian Abel</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24 border border-border bg-white/[0.02] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Thesis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              All that VM engineering protects a single assumption: the machine running it is a real browser, operated by a real person. The token it produces is portable, so the defense ends as a ticket. Treat the verdict as a signal, never as ground truth.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {sections.map((section) => (
            <section key={section.heading} className="mt-16 max-w-3xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Sources
            </h2>
            <div className="mt-6 space-y-4">
              {sources.map((source) => (
                <p key={source.url} className="text-lg leading-relaxed text-muted">
                  <a
                    href={source.url}
                    className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    {source.label}
                  </a>
                  <span className="text-muted-foreground"> — {source.note}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Disclosure status
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              <p>{disclosureParagraphs[0]}</p>
              <p>
                {disclosureParagraphs[1]}
                <a
                  href={disclosurePolicyUrl}
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  security research policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
