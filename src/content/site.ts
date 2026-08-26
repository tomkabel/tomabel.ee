import type { Language } from '../i18n/translations';

// ─── Site metadata ──────────────────────────────────────────────────────────

export const site = {
  name: 'tomabel.ee',
  tagline: {
    en: 'Systems architect and security researcher.',
    et: 'Süsteemiarhitekt ja turvauurija.',
  },
  hero: {
    eyebrow: {
      en: 'Tom Kristian Abel — Estonia',
      et: 'Tom Kristian Abel — Eesti',
    },
    line1: {
      en: 'I break authentication for a living.',
      et: 'Elatise teenimiseks murran autentimist.',
    },
    line2: {
      en: 'Now I build the kind that doesn\'t.',
      et: 'Nüüd ehitan sellist, mis ei murdu.',
    },
    intro: {
      en: "I'm Tom Kristian Abel — systems architect and security researcher. I reverse engineer how authentication and browser defenses fail, then design the systems that survive what I find.",
      et: 'Olen Tom Kristian Abel — süsteemiarhitekt ja turvauurija. Pöördprojekteerin, kuidas autentimine ja brauserikaitse ebaõnnestuvad, ning kavandan süsteemid, mis minu leitu üle elavad.',
    },
  },
  introStrip: {
    en: "Most of my work lives at one fault line: the gap between what a system claims to verify and what it actually verifies. I've spent years on both sides of that gap — first exploiting it, now closing it. These days I research identity protocols (FIDO2 / WebAuthn, eIDAS, Smart-ID), reverse engineer anti-fraud systems at the opcode level, and ship production platforms built secure-by-design. I disclose what I find, in public, and I take responsibility for all of it.",
    et: "Suurem osa minu tööst elab ühel murdejoonel: lõhe selle vahel, mida süsteem väidab end kontrollivat, ja mida ta tegelikult kontrollib. Olen aastaid veetnud mõlemal pool seda lõhet — algul seda ära kasutades, nüüd sulgedes. Tänapäeval uurin identiteediprotokolle (FIDO2 / WebAuthn, eIDAS, Smart-ID), pöördprojekteerin pettusevastaseid süsteeme opkoodi tasemel ja tarnin tootmisplatvorme, mis on turvalised disaini järgi, mitte lootuse peale. Avaldan oma leiud avalikult ja võtan kõige eest vastutuse.",
  },
  contact: {
    github: 'https://github.com/tomkabel',
    linkedin: 'https://www.linkedin.com/in/hr-abel',
    email: 'mailto:tom@tomabel.ee',
  },
  disclaimer: {
    en: 'ProksiAbel OÜ maintains strict client confidentiality. I, personally, am publicly accountable for my research and opinions.',
    et: 'ProksiAbel OÜ säilitab ranget kliendikonfidentsiaalsust. Mina isiklikult vastutan avalikult oma uuringute ja arvamuste eest.',
  },
  languages: {
    en: 'Estonia-based. I write in English and Estonian.',
    et: 'Asun Eestis. Kirjutan inglise ja eesti keeles.',
  },
};

// ─── Featured work (homepage cards) ──────────────────────────────────────────

export type FeaturedWork = {
  // A system-impact badge (real proper nouns / posture), not a ticket code —
  // it tells a client or peer what the work touched, not an invented ID.
  impact: { en: string; et: string };
  title: { en: string; et: string };
  blurb: { en: string; et: string };
  tags: string[];
  href: string;
  cta: { en: string; et: string };
};

export const featuredWork: FeaturedWork[] = [
  {
    impact: { en: "Google's anti-fraud VM", et: "Google'i pettusevastane VM" },
    title: {
      en: 'BotGuard, disassembled',
      et: 'BotGuard, lahti võetud',
    },
    blurb: {
      en: "Opcode-level reverse engineering of Google's VM-based anti-fraud system — anti-debug mechanisms, token portability, the works.",
      et: "Google'i VM-põhise pettusevastase süsteemi opkooditasemel pöördprojekteerimine — anti-debug mehhanismid, tokenite ülekantavus, kõik.",
    },
    tags: ['Reverse Engineering', 'Anti-Fraud VM'],
    href: '/disclosures/botguard-disassembled',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    impact: { en: 'Disclosed · RIA / CERT-EE', et: 'Avalikustatud · RIA / CERT-EE' },
    title: {
      en: 'Smart-ID / eID research',
      et: 'Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol vulnerability research on Estonia's national authentication stack, with coordinated disclosure to RIA and CERT-EE.",
      et: 'Protokolli haavatavuste uuringud Eesti riikliku autentimise taristu kohta, koordineeritud avalikustamisega RIA-le ja CERT-EE-le.',
    },
    tags: ['eIDAS', 'Coordinated Disclosure'],
    href: '/disclosures/smart-id-achilles-heel',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    impact: { en: 'Open source · Go', et: 'Avatud lähtekood · Go' },
    title: {
      en: 'fingerprintproxy',
      et: 'fingerprintproxy',
    },
    blurb: {
      en: 'Production Go TLS-fingerprinting proxy. 65+ browser profiles, JA3/JA4, MITM support, clean API.',
      et: 'Tootmisvalmis Go TLS-sõrmejäljeproksi. 65+ brauseriprofiili, JA3/JA4, MITM tugi, puhas API.',
    },
    tags: ['Go', 'TLS / JA4'],
    href: '/systems',
    cta: { en: 'View systems', et: 'Vaata süsteeme' },
  },
  {
    impact: { en: 'Open framework', et: 'Avatud raamistik' },
    title: {
      en: 'Zero-Trust Octagon',
      et: 'Zero-Trust Octagon',
    },
    blurb: {
      en: 'A zero-trust architecture framework built from first principles — 8 axioms, a 9-dimension morphological matrix, archetypal breach analysis.',
      et: 'Null-usalduse arhitektuuri raamistik, ehitatud esimestest põhimõtetest — 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks, arhetüüpne rikkumiste analüüs.',
    },
    tags: ['Architecture', 'Zero Trust'],
    href: '/disclosures/zero-trust-octagon',
    cta: { en: 'Read', et: 'Loe' },
  },
];

// ─── Disclosures (unified research + essays index) ───────────────────────────

// One editorial surface. `kind` drives the filter tabs on /disclosures; `type`
// is the human-facing label shown on each row. Slugs live under /disclosures/.
export type DisclosureKind = 'disclosure' | 'teardown' | 'essay' | 'framework';

export type Disclosure = {
  kind: DisclosureKind;
  title: { en: string; et: string };
  blurb: { en: string; et: string };
  type: { en: string; et: string };
  meta?: { en: string; et: string };
  tags?: string[];
  keywords?: string;
  // Detail page route, e.g. '/disclosures/botguard-disassembled'. Absent = queued.
  href?: string;
};

export const disclosures: Disclosure[] = [
  {
    kind: 'teardown',
    title: {
      en: "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
      et: "BotGuard, lahti võetud — Google'i pettusevastase VM-i pöördprojekteerimine",
    },
    blurb: {
      en: "A deep, opcode-level teardown of Google's BotGuard: the bytecode VM, its anti-debugging and obfuscation layers, and a token-portability weakness. Builds on Cypa's VM analysis and LuanRT's PO-token research. If you've ever wondered what \"client-side trust\" is really worth, start here.",
      et: "Põhjalik opkooditasemel analüüs Google'i BotGuardist: baitkoodi VM, selle anti-debug ja obfuskeerimiskihid ning tokenite ülekantavuse nõrkus. Ehitab Cypa VM-analüüsi ja LuanRT PO-tokeni uurimistöö peale. Kui oled kunagi mõelnud, mida \"kliendipoolne usaldus\" tegelikult väärt on, alusta siit.",
    },
    tags: ['Reverse Engineering', 'Anti-Fraud VM', 'BotGuard'],
    keywords: 'browser automation, CDP, VM analysis, anti-fraud, client-side security',
    type: { en: 'Technical Teardown', et: 'Tehniline analüüs' },
    meta: {
      en: 'Published · 13 min read',
      et: 'Avaldatud · 13 min lugemist',
    },
    href: '/disclosures/botguard-disassembled',
  },
  {
    kind: 'disclosure',
    title: {
      en: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
      et: 'Eesti e-riigi Achilleuse kand — Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol-level analysis of the authentication ecosystem that 1.4M+ Estonians, Latvians, and Lithuanians use every day. Covers the threat model, an interactive signing-relay class of attack, and the regulatory picture (eIDAS, GDPR, NIS2). Disclosed to the vendor before publication. Names the gaps; proposes the fixes.",
      et: 'Protokollitasemel analüüs autentimise ökosüsteemist, mida 1,4M+ eestlast, lätlast ja leedukat iga päev kasutavad. Hõlmab ohumudelit, interaktiivset allkirjastamise relay-rünnete klassi ja regulatiivset pilti (eIDAS, GDPR, NIS2). Avalikustatud müüjale enne avaldamist. Nimetab lüngad; pakub parandused.',
    },
    tags: ['Smart-ID', 'eIDAS', 'Coordinated Disclosure'],
    keywords: 'Smart-ID, eID, phishing, vishing, signing relay, BITB, Estonia, eIDAS',
    type: { en: 'Disclosed Research', et: 'Avalikustatud uuring' },
    meta: {
      en: 'Published · 14 min read',
      et: 'Avaldatud · 14 min lugemist',
    },
    href: '/disclosures/smart-id-achilles-heel',
  },
  {
    kind: 'framework',
    title: {
      en: 'Zero-Trust Octagon — a framework from first principles',
      et: 'Zero-Trust Octagon — raamistik esimestest põhimõtetest',
    },
    blurb: {
      en: "Most \"zero trust\" is a vendor checklist. This is the opposite: 8 axioms, a 9-dimension morphological matrix for reasoning about any architecture, and archetypal breach walkthroughs that show where designs actually fail. Written to be argued with.",
      et: "Enamik \"null-usaldusest\" on müüja kontrollnimekiri. See on vastupidine: 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks mis tahes arhitektuuri üle arutlemiseks ja arhetüüpsed rikkumiste läbimängud, mis näitavad, kus kavandid tegelikult ebaõnnestuvad. Kirjutatud selleks, et selle üle vaieldaks.",
    },
    tags: ['Architecture', 'Zero Trust', 'NIST 800-207'],
    meta: {
      en: 'Published · 19 min read',
      et: 'Avaldatud · 19 min lugemist',
    },
    type: { en: 'Framework', et: 'Raamistik' },
    href: '/disclosures/zero-trust-octagon',
  },
  {
    kind: 'essay',
    title: {
      en: "I used to break authentication. Here's what that taught me about building it.",
      et: 'Kunagi murdsin ma autentimist. Siin on see, mida see mulle selle ehitamise kohta õpetas.',
    },
    blurb: {
      en: 'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the arms race looks like from both sides.',
      et: 'Lõputöö essee kõigele muule sellel saidil: miks ründe mõistmine on usaldusväärse kaitse eeltingimus ja milline näeb võidurelvastumine välja mõlemalt poolt.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: {
      en: 'Published · 10 min read',
      et: 'Avaldatud · 10 min lugemist',
    },
    href: '/disclosures/i-used-to-break-authentication',
  },
  {
    kind: 'essay',
    title: {
      en: 'What client-side trust is actually worth',
      et: 'Mida kliendipoolne usaldus tegelikult väärt on',
    },
    blurb: {
      en: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
      et: 'BotGuard lahtivõtmine juhtumiuuringuna: struktuurne põhjus, miks iga kaitse, mis jookseb masinal, mida sa ei kontrolli, on läbiräägitav, ja mida sellega teha.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: {
      en: 'Published · 6 min read',
      et: 'Avaldatud · 6 min lugemist',
    },
    href: '/disclosures/what-client-side-trust-is-actually-worth',
  },
  {
    kind: 'essay',
    title: {
      en: 'The kratt problem',
      et: 'Krati probleem',
    },
    blurb: {
      en: "On offensive capability as a folkloric kratt — tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
      et: 'Ründevõimekusest kui rahvapärimuse kratist — väsimatu, kuni tal on suund, ohtlik hetkel, kui seda pole. Lühike lugu eetikast, jõudeolekust ja tööriistade õiges suunas juhtimisest.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: {
      en: 'Published · 4 min read',
      et: 'Avaldatud · 4 min lugemist',
    },
    href: '/disclosures/the-kratt-problem',
  },
  {
    kind: 'essay',
    title: {
      en: 'Coordinated disclosure in a small country',
      et: 'Koordineeritud avalikustamine väikeses riigis',
    },
    blurb: {
      en: "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other — the legal exposure, the incentives, and why owning your own story is the only real protection.",
      et: 'Milline on tegelikult riikliku taristu vea avalikustamine, kui kõik ruumisviibijad tunnevad üksteist — õiguslikud riskid, stiimulid ja miks oma loo omamine on ainus tõeline kaitse.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: {
      en: 'Published · 6 min read',
      et: 'Avaldatud · 6 min lugemist',
    },
    href: '/disclosures/coordinated-disclosure-in-a-small-country',
  },
  {
    kind: 'essay',
    title: {
      en: 'The evolution of cyber fraud in Estonia, 2010–2026',
      et: 'Küberpettuste areng Eestis, 2010–2026',
    },
    blurb: {
      en: "How Estonia's small language held the fraud industry at arm's length for a decade, and what happened when the barrier fell: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes, with annual losses climbing from five to ten million euros to 29 million in 2025. A reference paper built from RIA yearbook data, SEB's Baltic victim statistics, and the ERR/Äripäev investigation.",
      et: 'Kuidas Eesti väike keel hoidis pettuste tööstust eemal kümmekond aastat ja mis juhtus, kui barjäär langes: värvatud emakeelekõnelejad, tööstuslikud vishing-kõnekeskused, kullerivõrgustikud ja AI-süvavõltsingud, aastakahjude kasvades viielt-kümnele miljonilt eurolt 29 miljonini 2025. aastal. Viitetöö RIA aastaraamatu, SEB Baltikumi ohvristatistika ning ERRi ja Äripäeva uurimistöö põhjal.',
    },
    tags: ['Phishing', 'Vishing', 'AI Fraud', 'Estonia'],
    keywords:
      'Estonia, phishing, vishing, fraud, Smart-ID, deepfake, AI fraud, RIA, cybercrime',
    type: { en: 'Reference Paper', et: 'Viitetöö' },
    meta: {
      en: 'Published · 12 min read',
      et: 'Avaldatud · 12 min lugemist',
    },
    href: '/disclosures/the-evolution-of-cyber-fraud-in-estonia',
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'offensive'
  | 'products'
  | 'ai-ml'
  | 'systems'
  | 'research'
  | 'foundations';

export type Project = {
  name: string;
  stack: string;
  blurb: { en: string; et: string };
  href: string; // primary/fallback link (kept for backward compatibility)
  category?: ProjectCategory;
  tags?: string[];
  repo?: string; // public GitHub source, if any
  live?: string; // live deployment / docs URL, if any
  stars?: number; // surfaced as a badge when notable
  featured?: boolean; // eligible to surface on the homepage later
};

// Ordered category metadata for grouping on the projects page.
export const projectCategories: { id: ProjectCategory; label: { en: string; et: string } }[] = [
  { id: 'offensive', label: { en: 'Offensive & Reverse Engineering', et: 'Rünne ja pöördprojekteerimine' } },
  { id: 'products', label: { en: 'Applied Security Products', et: 'Rakenduslikud turvatooted' } },
  { id: 'ai-ml', label: { en: 'AI & Retrieval Systems', et: 'AI- ja hankesüsteemid' } },
  { id: 'systems', label: { en: 'Systems & Infrastructure', et: 'Süsteemid ja taristu' } },
  { id: 'research', label: { en: 'Research & Frameworks', et: 'Uuringud ja raamistikud' } },
  { id: 'foundations', label: { en: 'Foundations', et: 'Alused' } },
];

export const projects: Project[] = [
  // ── Offensive & Reverse Engineering ────────────────────────────────────────
  {
    name: 'google-botguard-security-research',
    stack: 'Reverse Engineering',
    category: 'offensive',
    tags: ['Reverse Engineering', 'Anti-Fraud VM', 'BotGuard'],
    stars: 105,
    featured: true,
    blurb: {
      en: "An opcode-level breakdown of Google's VM-based BotGuard engine. It documents the bytecode interpreter, the anti-debugging tricks, the obfuscation layers, and a specific flaw in token portability.",
      et: "Google'i VM-põhise BotGuardi mootori opkooditasemel lahtivõtmine. Dokumenteerib baitkoodi interpretaatori, anti-debug võtted, obfuskeerimiskihid ja konkreetse nõrkuse tokenite ülekantavuses.",
    },
    href: 'https://github.com/tomkabel/google-botguard-security-research',
    repo: 'https://github.com/tomkabel/google-botguard-security-research',
  },
  {
    name: 'fingerprintproxy',
    stack: 'Go · actively maintained',
    category: 'offensive',
    tags: ['Go', 'TLS / JA4', 'MITM'],
    featured: true,
    blurb: {
      en: 'A TLS-fingerprinting proxy written in Go. It supports JA3/JA4 emulation across 65+ browser profiles, MITM packet interception, and a straightforward configuration API.',
      et: 'Go-s kirjutatud TLS-sõrmejäljeproksi. Toetab JA3/JA4 emulatsiooni üle 65+ brauseriprofiili, MITM-pakettide kinnipüüdmist ja arusaadavat seadistus-API-t.',
    },
    href: 'https://github.com/tomkabel/fingerprintproxy',
    repo: 'https://github.com/tomkabel/fingerprintproxy',
  },
  {
    name: 'skid-security-research',
    stack: 'Security Research · disclosed',
    category: 'offensive',
    tags: ['Smart-ID', 'eIDAS', 'Coordinated Disclosure'],
    blurb: {
      en: "Protocol analysis of Smart-ID's cross-device authentication, pinpointing where the trust boundaries break down during device handoffs. Published through coordinated disclosure.",
      et: 'Smart-ID seadmeteülese autentimise protokollianalüüs, mis täpsustab, kus usalduspiirid seadmete üleandmisel murduvad. Avaldatud koordineeritud avalikustamise kaudu.',
    },
    href: 'https://github.com/tomkabel/skid-security-research',
    repo: 'https://github.com/tomkabel/skid-security-research',
    live: 'https://tomkabel.github.io/skid-security-research/',
  },
  {
    name: 'C3EE-Cyber-CTF',
    stack: 'Go · CTF write-up',
    category: 'offensive',
    tags: ['Go', 'CTF', 'Write-up'],
    blurb: {
      en: 'Estonia’s Cybercrime Unit (C3, part of the Keskkriminaalpolitsei) decided to skip standard LinkedIn job postings and put out a recruitment challenge disguised as a CTF, but calling it a CTF is giving it way too much credit. It was just an old-school book cipher for beginners.',
      et: 'Eesti küberkuritegevuse üksus (C3, osa Keskkriminaalpolitseist) otsustas tavalised LinkedIni tööpakkumised vahele jätta ja avaldas CTF-iks maskeeritud värbamisülesande, aga selle CTF-iks nimetamine on sellele liiga palju au andmine. See oli lihtsalt vanakooli raamatušiffer algajatele.',
    },
    href: 'https://github.com/tomkabel/C3EE-Cyber-CTF',
    repo: 'https://github.com/tomkabel/C3EE-Cyber-CTF',
  },

  // ── Applied Security Products (live) ───────────────────────────────────────
  {
    name: 'Proksimity',
    stack: 'Cloudflare · live',
    category: 'products',
    tags: ['Identity', 'TLS', 'Privacy'],
    featured: true,
    blurb: {
      en: 'Passive identity verification from network-level timing and TLS handshake characteristics instead of tracking cookies or canvas fingerprinting. It reads no packet payload and stores no personal data.',
      et: 'Passiivne identiteedi tuvastamine võrgutaseme ajastusest ja TLS-i käepigistuse omadustest, mitte jälgivatest küpsistest ega canvas-sõrmejälgedest. Ei loe pakettide sisu ega salvesta isikuandmeid.',
    },
    href: 'https://proksimity.pages.dev',
    live: 'https://proksimity.pages.dev',
  },
  {
    name: 'Specter',
    stack: 'Edge · live',
    category: 'products',
    tags: ['Edge', 'Access Control', 'Signed Audit'],
    blurb: {
      en: 'Edge-based access control that classifies requests into human, scripted, and hostile sessions. It applies progressive rate limiting and emits a cryptographically signed audit log for every routing decision.',
      et: 'Servapõhine juurdepääsukontroll, mis liigitab päringud inimese, skriptitud ja vaenulikeks seansideks. Rakendab astmelist kiiruspiirangut ja väljastab iga marsruutimisotsuse kohta krüptograafiliselt allkirjastatud auditijälje.',
    },
    href: 'https://specter-48f.pages.dev',
    live: 'https://specter-48f.pages.dev',
  },
  {
    name: 'SteroidID',
    stack: 'FIDO2 + Smart-ID · live',
    category: 'products',
    tags: ['FIDO2', 'Smart-ID', 'Passwordless'],
    featured: true,
    blurb: {
      en: 'Pairs FIDO2 passkeys with Smart-ID to remove the mobile prompt from desktop login. A browser extension, a local daemon, and an accessibility hook finish authentication in roughly 8 seconds from a single fingerprint read.',
      et: 'Ühendab FIDO2 pääsuvõtmed Smart-ID-ga, et kaotada mobiiliviip töölaua sisselogimisest. Brauserilaiendus, kohalik deemon ja ligipääsetavuse haak viivad autentimise lõpule umbes 8 sekundiga ühest sõrmejälje lugemisest.',
    },
    href: 'https://steroidid.pages.dev',
    live: 'https://steroidid.pages.dev',
  },

  // ── AI & Retrieval Systems ─────────────────────────────────────────────────
  {
    name: 'Discord RAG pipeline',
    stack: 'Retrieval · FastAPI',
    category: 'ai-ml',
    tags: ['RAG', 'LanceDB', 'BM25'],
    blurb: {
      en: 'A role-based retrieval pipeline over FastAPI: LanceDB vector search and BM25 combined into hybrid retrieval, with RBAC-aware filtering so access control is part of the query, not an afterthought.',
      et: 'Rollipõhine hankekonveier FastAPI peal: LanceDB vektorotsing ja BM25 ühendatud hübriidhankeks, RBAC-teadliku filtreerimisega, nii et pääsuhaldus on osa päringust, mitte järelmõte.',
    },
    href: 'https://github.com/tomkabel/discord-rag-pipeline',
    repo: 'https://github.com/tomkabel/discord-rag-pipeline',
  },
  {
    name: 'deepgram-batch',
    stack: 'Go · Deepgram Nova-3',
    category: 'ai-ml',
    tags: ['Go', 'Speech-to-Text', '50+ languages'],
    blurb: {
      en: 'A CLI for batch speech-to-text jobs across 50+ languages on Deepgram Nova-3. Built to process entire directory archives, not single files.',
      et: 'Käsurea tööriist hulgi-kõnetuvastuseks 50+ keeles Deepgram Nova-3 peal. Ehitatud tervete kaustaarhiivide töötlemiseks, mitte üksikute failide jaoks.',
    },
    href: 'https://github.com/tomkabel/deepgram-batch',
    repo: 'https://github.com/tomkabel/deepgram-batch',
  },
  {
    name: 'lovable-codebase-agent',
    stack: 'Python · codemod',
    category: 'ai-ml',
    tags: ['Python', 'Codegen', 'Refactor'],
    blurb: {
      en: 'An AST-based cleanup tool for raw Lovable.dev exports. It strips vendor wrappers, removes dead dependencies, migrates SSR setups to SSG, and generates standard CI workflows.',
      et: 'AST-põhine puhastustööriist toorete Lovable.dev ekspordifailide jaoks. Eemaldab tarnija kestad, kustutab surnud sõltuvused, teisendab SSR-seadistused SSG-ks ja loob standardsed CI-töövood.',
    },
    href: 'https://github.com/tomkabel/lovable-codebase-agent',
    repo: 'https://github.com/tomkabel/lovable-codebase-agent',
  },
  {
    name: 'SKILL Lab',
    stack: 'Cloudflare · live',
    category: 'ai-ml',
    tags: ['LLM', 'Writing', 'On-device'],
    blurb: {
      en: 'An in-browser editor that catches the mechanical patterns of AI writing: filler transitions, structural symmetry, passive constructions. It runs on-device, with no external API calls.',
      et: 'Brauserisisene toimetaja, mis püüab AI-kirjutamise mehaanilised mustrid: täiteüleminekud, struktuurne sümmeetria, umbisikulised konstruktsioonid. Töötab seadmes, ilma väliste API-kutseteta.',
    },
    href: 'https://ai.tomabel.ee',
    live: 'https://ai.tomabel.ee',
  },
  {
    name: 'deepseek-offpeak',
    stack: 'JS · Cloudflare Pages',
    category: 'ai-ml',
    tags: ['JavaScript', 'Pricing', 'DevTool'],
    blurb: {
      en: "A zero-dependency timezone tracker and cost calculator for DeepSeek's discounted off-peak pricing windows.",
      et: 'Sõltuvusteta ajavööndijälgija ja kulukalkulaator DeepSeeki tipuväliste soodushinnaperioodide jaoks.',
    },
    href: 'https://github.com/tomkabel/deepseek-offpeak',
    repo: 'https://github.com/tomkabel/deepseek-offpeak',
    live: 'https://deepseek-offpeak.pages.dev',
  },
  {
    name: 'Hele Beež Pastakas',
    stack: 'Flask · PWA',
    category: 'ai-ml',
    tags: ['Flask', 'PWA', 'VLM'],
    blurb: {
      en: 'A math-grading interface built on Vision-Language Models (OpenAI / Anthropic), wrapped in an offline-first PWA. Designed for evaluating handwritten work with local data storage.',
      et: 'Matemaatikahindamise liides, mis põhineb visuaal-keelemudelitel (OpenAI / Anthropic), pakitud offline-first PWA-sse. Kavandatud käsitsi kirjutatud tööde hindamiseks kohaliku andmesalvestusega.',
    },
    href: 'https://github.com/tomkabel',
  },

  // ── Systems & Infrastructure ───────────────────────────────────────────────
  {
    name: 'Vooglaadija',
    stack: 'FastAPI · collaborative',
    category: 'systems',
    tags: ['FastAPI', 'Redis', 'Observability'],
    blurb: {
      en: 'A media-extraction service backed by Redis task queues, JWT auth, and rate limiting, with an HTMX frontend and SSE streaming. Instrumented with Prometheus, OpenTelemetry, and Sentry inside a 7-container Docker Compose setup.',
      et: 'Meediafailide eraldamise teenus Redis-ülesandejärjekordade, JWT-autentimise ja kiiruspiiranguga, HTMX-liidese ja SSE-voogedastusega. Instrumenteeritud Prometheuse, OpenTelemetry ja Sentryga 7-konteinerilises Docker Compose seadistuses.',
    },
    href: 'https://github.com/tomkabel/vooglaadija',
    repo: 'https://github.com/tomkabel/vooglaadija',
  },
  {
    name: 'scripts',
    stack: 'Shell · ops',
    category: 'systems',
    tags: ['Bash', 'Server Setup', 'Ops'],
    blurb: {
      en: "Tom's Awesome Scripts — a battle-worn collection of bash for server setup and management. The stuff you'd otherwise copy-paste at 2am, made idempotent and safe.",
      et: "Tom's Awesome Scripts — lahingus karastunud bash-skriptide kogu serveri seadistamiseks ja haldamiseks. Skriptid, mida muidu kopeeriksid kell 2 öösel, tehtud idempotentseks ja turvaliseks.",
    },
    href: 'https://github.com/tomkabel/scripts',
    repo: 'https://github.com/tomkabel/scripts',
  },

  // ── Research & Frameworks ──────────────────────────────────────────────────
  {
    name: 'zero-trust-octagon',
    stack: 'VitePress · framework',
    category: 'research',
    tags: ['Zero Trust', 'Architecture', 'NIST 800-207'],
    featured: true,
    blurb: {
      en: 'An architectural reference that breaks Zero Trust into 8 structural axioms and a 9-dimension evaluation matrix, focused on concrete breach failure modes rather than vendor compliance checklists.',
      et: 'Arhitektuuriline teatmematerjal, mis jaotab null-usalduse 8 struktuurseks aksioomiks ja 9-dimensiooniliseks hindamismaatriksiks, keskendudes konkreetsetele rikkumiste tõrkerežiimidele, mitte tarnijate vastavuskontroll-nimekirjadele.',
    },
    href: 'https://github.com/tomkabel/zero-trust-octagon',
    repo: 'https://github.com/tomkabel/zero-trust-octagon',
  },

  // ── Foundations ────────────────────────────────────────────────────────────
  {
    name: 'tartu-progeksam-2025',
    stack: 'Python · education',
    category: 'foundations',
    tags: ['Python', 'Education'],
    blurb: {
      en: 'Questions and clean Python solutions for the University of Tartu 2025 programming exam. A study resource, worked end to end.',
      et: 'Tartu Ülikooli 2025. aasta programmeerimiseksami küsimused ja puhtad Python-lahendused. Õppematerjal, läbi töötatud algusest lõpuni.',
    },
    href: 'https://github.com/tomkabel/tartu-progeksam-2025',
    repo: 'https://github.com/tomkabel/tartu-progeksam-2025',
  },
];

// ─── Bio ─────────────────────────────────────────────────────────────────────

export const bio = {
  paragraphs: [
    {
      en: "I started on the wrong side of the authentication arms race. I reverse engineered browser security, TLS fingerprinting, and anti-fraud systems — and for a while, I broke them for money. I don't hide that. It ultimately led to a conviction in 2024, an outcome I take full responsibility for.",
      et: 'Alustasin autentimise võidurelvastumise valelt poolt. Pöördprojekteerisin brauseriturvalisust, TLS-i sõrmejäljetuvastust ja pettusevastaseid süsteeme — ja mõnda aega murdsin neid raha eest. Ma ei varja seda. See viis lõpuks 2024. aastal süüdimõistmiseni, mille tagajärgede eest võtan täieliku vastutuse.',
    },
    {
      en: "What I kept was the way of seeing. Once you've taken authentication apart for a living, you can't un-see how fragile most of it is — and you get tired of watching the same systems get picked apart in the same ways. So now I point the same skills the other direction: I research how identity protocols and browser defenses fail (FIDO2 / WebAuthn, eIDAS, Smart-ID, anti-fraud VMs), disclose what I find responsibly, and design systems that are secure-by-design rather than secure-by-hope.",
      et: 'Mida ma alles jätsin, oli nägemisviis. Kui oled autentimise elatise teenimiseks lahti võtnud, ei saa sa enam mittenäha, kui habras suurem osa sellest on — ja sa tüdined vaatamast, kuidas samu süsteeme samadel viisidel lahti võetakse. Nii et nüüd suunan samad oskused teisele poole: uurin, kuidas identiteediprotokollid ja brauserikaitsed ebaõnnestuvad (FIDO2 / WebAuthn, eIDAS, Smart-ID, pettusevastased VM-id), avalikustan oma leiud vastutustundlikult ja kavandan süsteeme, mis on turvalised disaini järgi, mitte lootuse peale.',
    },
    {
      en: "These days I'm Lead Systems Architect and CTO at MatX, where I build production platforms under the threat models I write — zero-trust architecture, phishing-resistant authentication, and GDPR/NIS2 compliance treated as engineering, not paperwork. I work in English and Estonian, and most of my research orbits Estonia's authentication and anti-fraud landscape, because it's one of the most digitized in the world and therefore one of the most interesting to defend.",
      et: 'Tänapäeval olen juhtiv süsteemiarhitekt ja CTO MatX-is, kus ehitan tootmisplatvorme nende ohumudelite alusel, mida ise kirjutan — null-usalduse arhitektuur, õngitsemiskindel autentimine ja GDPR/NIS2 vastavus, mida käsitletakse inseneritööna, mitte paberimäärimisena. Töötan inglise ja eesti keeles ning suurem osa minu uuringutest tiirleb Eesti autentimis- ja pettusevastase maastiku ümber, sest see on üks kõige digiteeritumaid maailmas ja seega üks huvitavamaid, mida kaitsta.',
    },
  ],
  kratt: {
    en: "In Estonian folklore a kratt is a servant assembled from spare parts that works tirelessly for its maker — and turns on you the moment you leave it idle. That's offensive capability in one image. It's only useful pointed in the right direction, so I do that pointing in public, and I stand behind my work and my opinions personally.",
    et: 'Eesti rahvapärimuses on kratt varuosadest kokku pandud teener, kes töötab väsimatult oma tegija heaks — ja pöördub su vastu hetkel, kui jätad ta jõude. See on ründevõimekus ühes pildis. See on kasulik ainult õiges suunas suunatuna, nii et teen seda suunamist avalikult ning seisan oma töö ja arvamuste taga isiklikult.',
  },
};

// ─── Company contact info ────────────────────────────────────────────────────

export const contactInfo = {
  email: 'tom@tomabel.ee',
  phone: '+37256666981',
  phoneDisplay: '+372 56666981',
  address: {
    street: 'Pargi tn 2 Sindi',
    city: 'Tori vald',
    county: 'Pärnumaa',
    postalCode: '86705',
    country: 'Estonia',
  },
  company: {
    name: 'ProksiAbel OÜ',
    registrationCode: '17017826',
  },
};

// ─── Helper: get content by language ─────────────────────────────────────────

export function localize<T extends { en: string; et: string }>(obj: T, lang: Language): string {
  return obj[lang];
}
