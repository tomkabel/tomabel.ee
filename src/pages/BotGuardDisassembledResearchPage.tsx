import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';
import ArticleProof from '../components/site/article-proof';
import { ArticleHeader, Callout, CodeBlock } from '../components/site/article';
import { PolicyText } from '../components/site/policy-link';

type ReportSection = {
  heading: string;
  paragraphs: string[];
  after?: ReactNode;
};

const title = "BotGuard, disassembled — reverse engineering Google's anti-fraud VM";
const standfirst =
  "BotGuard is Google's anti-fraud virtual machine, used in ReCaptcha and elsewhere in Google's anti-abuse stack. It is not a fingerprint script, and misreading it as one is how threat models go wrong. This report covers the bytecode VM, the anti-debug and anti-logger layers that protect it, and the structural limit at the end of the chain: the token it produces is portable, and the server that verifies it has no way to check the claim against the machine that made it. The VM internals here are drawn from Cypa's botguard-reverse and the PO-token details from LuanRT's BgUtils; the attribution is inline throughout.";

const openingParagraphs = [
  'This report documents the BotGuard VM and the Proof of Origin (PO) token system YouTube\u2019s web player uses today. The VM internals described below come from Cypa\u2019s (dsekz) botguard-reverse repository, which did the foundational analysis, including a disassembler and decompiler for the custom bytecode; Cypa worked from a single ReCaptcha bytecode sample, so the opcode-level description is of that sample, not a survey of every surface where Google deploys BotGuard. The PO-token details come from LuanRT\u2019s BgUtils, which reverse engineered YouTube\u2019s PO token generation and attestation flow. The yt-dlp project\u2019s PO token guide documents how those tokens are enforced in production and how the downloader ecosystem works around them.',
  'What is new here versus that prior work is the synthesis and the client-side-trust argument built on top of it, plus a portability test I ran privately in 2021. That test is described from my own notes; it has not been independently reproduced or re-verified against current builds, and it sits inside a well-known class of token-harvesting techniques (CAPTCHA-token harvesters were already packaged, pip-installable tools by 2020). My repository, google-botguard-security-research, is an analytical Systematization of Knowledge paper; its README states it contains no reverse-engineered proprietary code and no novel attacks. It should be cited for the argument, not as the source of the VM internals, which are Cypa\u2019s and LuanRT\u2019s.',
  'Method: static analysis of the VM bytecode and interpreter using the open-source tooling from botguard-reverse, review of BgUtils\u2019 attestation flow and the yt-dlp enforcement documentation, and comparison of the token lifecycle across contexts. No live Google system was attacked or probed in the course of writing this report; the 2021 test is a separate, earlier piece of work and is flagged as such. The analysis is based on public sources as of August 11, 2026. Two limits apply. Google rebuilds BotGuard frequently; variable names and opcode numbers shift between compiles, so this describes the architecture, not a byte-exact snapshot. And the PO token system is still changing, with enforcement rolling out per client and per format.',
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
    after: (
      <CodeBlock
        title="BotGuard VM — opcode surface"
        lang="disasm"
        lines={[
          '; opcode numbers drift between Google rebuilds',
          '328  USHR             ; unsigned bit-shift',
          '381  ADD              ; arithmetic',
          '065  SETPROP          ; write property / scramble keys',
          '467  GETPROP          ; read property',
          '220  IN               ; property-existence test (possibly webdriver checks)',
          '289  HALT',
          '',
          '; self-modifying core: the stream rewrites itself',
          'LOADSTRING  r274      ; materialize new instruction bytes',
          'LOADOP      (EVAL)    ; compile them into live logic',
        ]}
      />
    ),
  },
  {
    heading: 'The timing-based anti-debug diverts instead of crashing',
    paragraphs: [
      'The VM polls performance.now() combined with Date.now() to check elapsed time. Set a breakpoint and execution pauses while the clock keeps running; on resume, the delta between timestamps is large.',
      'The VM uses that delta to mutate a seed stored in the VM context as K.U. The seed determines the decryption key for the next block of bytecode. If the delta suggests a debugger was active, the seed corrupts, and the program silently diverges into a garbage execution path that produces an invalid token (which the server would then reject — an inference from the design, not something the source measures). Cypa\u2019s notes show quick math operations that determine an amount to xor the seed by; the value should stay at zero, and when it does not, the following bytes of the program change.',
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
      'Bytecode fetching runs through a memory reader, often minified as H. It reads bytes from the bytecode array and encrypts them before returning them. Per Cypa’s analysis, three pieces of state drive it. Register 21 is a rolling key array. Z.W is a position tracker that increments linearly. Z.U is the seed, which mutates based on time and execution history.',
      'The call H(true, L, 8) reads 8 bits, and with the first argument true, invokes an encryption routine using Register 21. A SETPROP opcode also rescrambles these keys, resetting the position and pulling a fresh seed from the reader. The result is a circular dependency: the reader relies on the seed, and the seed relies on the reader. My reading is that static analysis without perfect emulation goes nowhere; the same position in the stream can decrypt to different values depending on execution history, because the decoder re-seeds itself as it goes.',
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
      'The output of the whole exercise is a token. BotGuard mints it after the VM runs its checks, and Google\u2019s server verifies it alongside the request. In a 2021 test \u2014 my own, run privately, and never independently reproduced or re-verified against current builds \u2014 a token minted in one context was accepted on a request from a different context. This is the known token-harvesting class: harvesting a valid token in one environment and replaying it in another was already a packaged, pip-installable technique by 2020 (for example, CAPTCHA-token harvesters). The 2021 note is recorded here as the author\u2019s observation, not as a disclosed vulnerability.',
      'What it illustrates is a binding gap. Google does bind its tokens in several ways: reCAPTCHA tokens are valid for a short window (about two minutes), single-use, and tied to a site (siteverify returns the hostname); PO tokens are content-bound to a video ID. What none of these reach is the machine. The token shows that a browser passed the checks \u2014 not which browser, and not which user or context now holds it.',
      'The reason is architectural, not cryptographic. The server never sees the machine that produced the token. It sees a claim written by that machine, and there is no way to cryptographically verify that claim against the machine; at best it can be weighted against server-side heuristics.',
    ],
    after: (
      <Callout label="Note — the binding gap">
        <p>
          Google binds its tokens to a site, a short single-use lifetime and, for PO tokens, a
          video ID — but not to the machine that minted them. A token therefore proves that{' '}
          <em>a</em> browser passed the checks, never which browser, which user, or which context
          now holds it. The author&rsquo;s 2021 replay observation sits inside this well-known
          token-harvesting class and has not been independently reproduced.
        </p>
      </Callout>
    ),
  },
  {
    heading: 'PO tokens are the same pattern with more layers',
    paragraphs: [
      "YouTube's player enforces the same design under a different name. Proof of Origin tokens are required for requests from some clients; the yt-dlp guide documents that without one, requests “may return HTTP Error 403, or result in your account or IP address being blocked.” A PO token is generated by an attestation provider: BotGuard on Web, DroidGuard on Android, iOSGuard on iOS, and a token from one platform is not accepted on another.",
      'BgUtils, LuanRT\u2019s reverse engineered implementation, maps the flow. The client obtains a challenge, the VM script plus its bytecode program, from the InnerTube challenge response embedded in page source, from the InnerTube API\u2019s attestation endpoint, or from Google\u2019s Web Anti-Abuse private API. The VM runs and produces a BotGuard response, which is exchanged for an integrity token through the GenerateIT endpoint. The integrity token feeds a minter function that produces PO tokens bound to an identifier; the result is 110 to 128 bytes.',
      'BgUtils documents three token types, and notes that YouTube\u2019s web client no longer uses the session-bound one \u2014 it now relies on cold-start and content-bound tokens. A cold start token is a placeholder used to initiate playback before a fuller token is minted, using a simple XOR cipher and bound to the Data Sync ID or Visitor ID. A session bound token (minted when the user first interacts with the player, bound to the account\u2019s Data Sync ID when logged in or the Visitor ID otherwise) is the type the web client has dropped. A content bound token is generated per player request and bound to the specific video ID. The yt-dlp guide confirms the content binding: as of its July 2026 revision, tokens are bound to the user session (Visitor ID or account Session ID) or to the video ID, so a new token is required for each video, and lifetimes may be as short as 12 hours.',
      'Server-side enforcement also exists. BgUtils documents that the player checks a value called sps (StreamProtectionStatus) in media segment responses when using the UMP or SABR streaming protocols. Status 1 means the stream is fine, either a valid token, Premium, or no token required. Status 2 means a token is required and the client gets a grace window of 1 to 2 MB of data before playback is interrupted. Status 3 means a token is mandatory and no further data is served without one.',
      'The same binding gap persists in a narrower form. BgUtils and the yt-dlp PO token providers mint PO tokens outside YouTube\u2019s own player, and the resulting tokens are accepted in production for real requests \u2014 which shows the server still cannot distinguish the minting context. The arms race has kept moving: since November 2025 yt-dlp has required an external JavaScript runtime (Deno is recommended) for full YouTube support, the clearest production signal that Google is pushing client-side checks into a full JS runtime rather than a self-contained bundle. What changed since 2021 is friction, not the architecture: different token types with different binding semantics, server-side enforcement that can interrupt playback mid-stream, and content binding that ties tokens to video IDs, shrinking the reuse window. These are real improvements that make the work more complex. They raise cost; they do not close the structural gap between what the server can verify and the machine it cannot see.',
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
    label: 'LuanRT, BgUtils',
    url: 'https://github.com/LuanRT/BgUtils',
    note: 'PO token generation and attestation flow, token types, sps semantics, MIT licensed',
  },
  {
    label: 'Tom Kristian Abel, google-botguard-security-research',
    url: 'https://github.com/tomkabel/google-botguard-security-research',
    note: 'analytical SoK paper (no reverse-engineered code, no novel attacks); cited for the client-side-trust argument, not the VM internals',
  },
  {
    label: 'yt-dlp, PO Token Guide (revised 12 Jul 2026)',
    url: 'https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide',
    note: 'token enforcement, content and session binding, platform attestation providers',
  },
  {
    label: 'yt-dlp #15012 — external JS runtime required for YouTube (12 Nov 2025)',
    url: 'https://github.com/yt-dlp/yt-dlp/issues/15012',
    note: 'client-side checks moving into a full JS runtime (Deno recommended)',
  },
  {
    label: 'Brainicism, bgutil-ytdlp-pot-provider',
    url: 'https://github.com/Brainicism/bgutil-ytdlp-pot-provider',
    note: 'PO token provider for yt-dlp built on BgUtils',
  },
  {
    label: 'Google reCAPTCHA — Verifying the user’s response',
    url: 'https://developers.google.com/recaptcha/docs/verify',
    note: 'two-minute, single-use tokens; siteverify returns the hostname',
  },
  {
    label: 'captcha-harvester (PyPI, v1.0.1, 24 Apr 2020)',
    url: 'https://pypi.org/project/captcha-harvester/',
    note: 'prior-art token-harvesting tooling the 2021 replay note belongs to',
  },
  {
    label: 'Companion essay: What client-side trust is actually worth',
    url: 'https://tomabel.ee/disclosures/what-client-side-trust-is-actually-worth/',
    note: 'the argument this report\u2019s evidence supports',
  },
];

const disclosureParagraphs = [
  "This report describes Google's production anti-fraud systems. The technical analysis is drawn from research that was already public before this report: Cypa's botguard-reverse (open source) and LuanRT's BgUtils (MIT). My own google-botguard-security-research repository is an analytical SoK paper and is cited for the client-side-trust argument, not as the source of the VM internals.",
  'No live Google system was tested or probed for this report, and no new vulnerability is disclosed here. The one first-person element is a token-replay test I ran privately in 2021; it has not been independently reproduced and belongs to a token-harvesting class that was already public tooling by 2020. Google was not notified of that 2021 test, through its Vulnerability Reward Program or any other channel; it is an unreproduced observation, not a disclosed vulnerability. Google updates BotGuard continuously, so this describes architecture, not a byte-exact snapshot, and operational detail is deliberately left out. Research conduct follows the site\u2019s security research policy.',
  'Disclosure: the author runs ProksiAbel O\u00dc, which builds Proksimity, a commercial server-side traffic identity-assurance product. Several recommendations here \u2014 weighting attestation against server-side signals such as IP reputation and session history \u2014 fall in that category.',
  'Corrections, 4 October 2026: the VM internals are now attributed inline to Cypa (botguard-reverse) and the PO-token details to LuanRT (BgUtils) rather than to the author\u2019s repository; the 2021 portability claim is reframed as the author\u2019s own unreproduced note within the known token-harvesting class, with the \u201cweakness\u201d framing dropped; token-binding limits (site, lifetime, content, not machine) are stated accurately; the session-bound token is noted as no longer used by YouTube\u2019s web client; and the yt-dlp enforcement wording is quoted as written.',
];

const whatsNewItems = [
  'Cypa (dsekz), botguard-reverse \u2014 the VM internals: register-based bytecode VM, entry point, opcode surface, anti-debug, anti-logger, memory reader, error handler.',
  'LuanRT, BgUtils and the googlevideo flow \u2014 the PO-token system: token types, the GenerateIT exchange, the sps status codes and the 1\u20132 MB grace window.',
  'yt-dlp \u2014 production enforcement: HTTP 403 behaviour, content/session binding, and (since Nov 2025) the external JS-runtime requirement.',
  'This report \u2014 the synthesis and the client-side-trust argument built on top of that prior work, plus a private, unreproduced 2021 token-replay note flagged as such.',
];

export default function BotGuardDisassembledResearchPage() {
  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← Back to research</>}
        kicker={<>Research · Technical Teardown · Anti-Fraud</>}
        title={title}
        standfirst={standfirst}
        meta={[
          <>Published · August 11, 2026</>,
          <>Updated · October 4, 2026</>,
          <>15 min read</>,
          <>Tom Kristian Abel</>,
        ]}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail sections={sections} backHref="/disclosures" backLabel="All disclosures" />
          </div>
          <div hidden className="border border-border bg-surface p-5">
            <p className="label font-bold text-accent">
              Thesis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              All that VM engineering protects a single assumption: the machine running it is a real browser, operated by a real person. The token it produces is portable, so the defense ends as a ticket. Treat the verdict as a signal, never as ground truth.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-measure space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 max-w-measure">
            <Callout label="What’s new here vs. prior work">
              <ul className="space-y-2">
                {whatsNewItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Callout>
          </div>

          {sections.map((section, i) => (
            <section key={section.heading} id={sectionSlug(section.heading)} className="mt-16 max-w-measure scroll-mt-24">
              <p className="mb-4 label font-medium text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-3xl leading-tight text-foreground">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.after}
            </section>
          ))}

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
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

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Related reading
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                <Link
                  to="/disclosures/what-client-side-trust-is-actually-worth"
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  What client-side trust is actually worth
                </Link>{' '}
                uses this teardown as its central case study for a broader argument about
                attestation architectures.
              </p>
              <p>
                <Link
                  to="/disclosures/why-vlms-break-client-side-anti-fraud"
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  How client-side anti-fraud actually works, and what VLM agents change
                </Link>{' '}
                extends the same structural weakness to VLM-driven agents operating a real browser.
              </p>
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Disclosure status
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              {disclosureParagraphs.map((paragraph) => (
                <p key={paragraph}>
                  <PolicyText text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>

      <ArticleProof
        slug="botguard-disassembled"
        expectedSha256="473b9275e2363753f98428dff24d1dcfa7954fdfcf8d4f3307c010be3dd35372"
      />
    </article>
  );
}
