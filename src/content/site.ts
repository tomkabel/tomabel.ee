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
      en: 'Tom Kristian Abel · Estonia',
      et: 'Tom Kristian Abel · Eesti',
    },
    line1: {
      en: 'I broke authentication for a living.',
      et: 'Elatise teenimiseks murdsin autentimist.',
    },
    line2: {
      en: 'Now I build the kind that doesn’t.',
      et: 'Nüüd ehitan sellist, mis ei murdu.',
    },
    intro: {
      en: "I’m Tom Kristian Abel, a systems architect and security researcher. I reverse engineer how authentication and browser defenses fail, then design the systems that survive what I find.",
      et: 'Olen Tom Kristian Abel, süsteemiarhitekt ja turvauurija. Pöördprojekteerin, kuidas autentimine ja brauserikaitse ebaõnnestuvad, ning kavandan süsteemid, mis minu leitu üle elavad.',
    },
  },
  introStrip: {
    en: "Most of my work lives at one fault line: the gap between what a system claims to verify and what it actually verifies. I spent years exploiting that gap. Now I close it, in public, and answer for all of it.",
    et: "Suurem osa minu tööst elab ühel murdejoonel: lõhe selle vahel, mida süsteem väidab end kontrollivat, ja mida ta tegelikult kontrollib. Aastaid kasutasin seda lõhet ära. Nüüd sulgen selle, avalikult, ja võtan kõige eest vastutuse.",
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
    impact: { en: "Teardown · Google’s anti-fraud VM", et: "Analüüs · Google’i pettusevastane VM" },
    title: {
      en: 'BotGuard, disassembled',
      et: 'BotGuard, lahti võetud',
    },
    blurb: {
      en: "Opcode-level reverse engineering of Google’s VM-based anti-fraud system — anti-debug mechanisms, token portability, the works.",
      et: "Google’i VM-põhise pettusevastase süsteemi opkooditasemel pöördprojekteerimine — anti-debug mehhanismid, tokenite ülekantavus, kõik.",
    },
    tags: ['Reverse Engineering', 'Anti-Debug'],
    href: '/disclosures/botguard-disassembled',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    impact: { en: 'Disclosure · RIA / CERT-EE', et: 'Avalikustamine · RIA / CERT-EE' },
    title: {
      en: 'Smart-ID / eID research',
      et: 'Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol vulnerability research on Estonia’s national authentication stack, with coordinated disclosure to RIA and CERT-EE.",
      et: 'Protokolli haavatavuste uuringud Eesti riikliku autentimise taristu kohta, koordineeritud avalikustamisega RIA-le ja CERT-EE-le.',
    },
    tags: ['eIDAS', 'Coordinated Disclosure'],
    href: '/disclosures/smart-id-achilles-heel',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    impact: { en: 'System · Open source', et: 'Süsteem · Avatud lähtekood' },
    title: {
      en: 'fingerprintproxy',
      et: 'fingerprintproxy',
    },
    blurb: {
      en: 'Production Go TLS-fingerprinting proxy. 65+ browser profiles, JA3/JA4, MITM support, clean API.',
      et: 'Tootmisvalmis Go TLS-sõrmejäljeproksi. 65+ brauseriprofiili, JA3/JA4, MITM tugi, puhas API.',
    },
    tags: ['Go', 'TLS / JA4'],
    href: '/systems#fingerprintproxy',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    impact: { en: 'Framework · Open', et: 'Raamistik · Avatud' },
    title: {
      en: 'Zero-Trust Octagon',
      et: 'Zero-Trust Octagon',
    },
    blurb: {
      en: 'A zero-trust architecture framework built from first principles — 8 axioms, a 9-dimension morphological matrix, archetypal breach analysis.',
      et: 'Null-usalduse arhitektuuri raamistik, ehitatud esimestest põhimõtetest — 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks, arhetüüpne rikkumiste analüüs.',
    },
    tags: ['Architecture', 'NIST 800-207'],
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

// Articles whose body exists only in English. The router renders these inside
// an English LanguageScope (so lang attributes and shared chrome match the
// text), shows Estonian readers a notice, and the index marks them. When an
// article gains an Estonian body, remove it here.
export const englishOnlyArticles: ReadonlySet<string> = new Set([
  '/disclosures/i-used-to-break-authentication',
  '/disclosures/what-client-side-trust-is-actually-worth',
  '/disclosures/the-kratt-problem',
  '/disclosures/coordinated-disclosure-in-a-small-country',
  '/disclosures/botguard-disassembled',
  '/disclosures/smart-id-achilles-heel',
  '/disclosures/zero-trust-octagon',
  '/disclosures/pact-software-anchor-turn',
  '/disclosures/chatgpt-is-not-a-phishing-scanner',
]);

export const disclosures: Disclosure[] = [
  {
    kind: 'teardown',
    title: {
      en: "BotGuard, disassembled — reverse engineering Google’s anti-fraud VM",
      et: "BotGuard, lahti võetud — Google’i pettusevastase VM-i pöördprojekteerimine",
    },
    blurb: {
      en: "A deep, opcode-level teardown of Google’s BotGuard: the bytecode VM, its anti-debugging and obfuscation layers, and the structural binding gap at the end — a token the server verifies but cannot tie to the machine that made it. Builds on Cypa’s VM analysis and LuanRT’s PO-token research. If you’ve ever wondered what \"client-side trust\" is really worth, start here.",
      et: "Põhjalik opkooditasemel analüüs Google’i BotGuardist: baitkoodi VM, selle anti-debug ja obfuskeerimiskihid ning struktuurne sidumislünk ahela lõpus — token, mida server kontrollib, kuid ei suuda siduda masinaga, mis selle lõi. Ehitab Cypa VM-analüüsi ja LuanRT PO-tokeni uurimistöö peale. Kui oled kunagi mõelnud, mida \"kliendipoolne usaldus\" tegelikult väärt on, alusta siit.",
    },
    tags: ['Reverse Engineering', 'Anti-Fraud VM', 'BotGuard'],
    keywords: 'browser automation, CDP, VM analysis, anti-fraud, client-side security',
    type: { en: 'Technical Teardown', et: 'Tehniline analüüs' },
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 15 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 15 min lugemist' },
    href: '/disclosures/botguard-disassembled',
  },
  {
    kind: 'disclosure',
    title: {
      en: "The Achilles' heel of Estonia’s e-state — Smart-ID / eID research",
      et: 'Eesti e-riigi Achilleuse kand — Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol-level analysis of the authentication ecosystem that 3.7M+ users in Estonia, Latvia, and Lithuania rely on (SK, October 2025). Covers the threat model, an interactive signing-relay class of attack, the June 2026 Smart-ID+ rollout, and the regulatory picture (eIDAS, PSD2, DORA, NIS2, GDPR). Reported to SK ID Solutions in November 2025; the dated disclosure timeline is on the page. Names the gaps; proposes the fixes.",
      et: 'Protokollitasemel analüüs autentimise ökosüsteemist, millele toetub üle 3,7 miljoni kasutaja Eestis, Lätis ja Leedus (SK, oktoober 2025). Hõlmab ohumudelit, interaktiivset allkirjastamise relay-rünnete klassi, 2026. aasta juuni Smart-ID+ juurutust ja regulatiivset pilti (eIDAS, PSD2, DORA, NIS2, GDPR). SK ID Solutionsit teavitati 2025. aasta novembris; avalikustamise ajajoon on lehel. Nimetab lüngad; pakub parandused.',
    },
    tags: ['Smart-ID', 'eIDAS', 'Coordinated Disclosure'],
    keywords: 'Smart-ID, eID, phishing, vishing, signing relay, BITB, Estonia, eIDAS',
    type: { en: 'Disclosed Research', et: 'Avalikustatud uuring' },
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 19 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 19 min lugemist' },
    href: '/disclosures/smart-id-achilles-heel',
  },
  {
    kind: 'framework',
    title: {
      en: 'Zero-Trust Octagon — a framework from first principles',
      et: 'Zero-Trust Octagon — raamistik esimestest põhimõtetest',
    },
    blurb: {
      en: "Most \"zero trust\" is a vendor checklist. This is the opposite: 8 axioms, a 9-dimension morphological matrix for reasoning about any architecture, and composite breach walkthroughs that show where designs fail. Sources are linked and corrections logged. Written to be argued with.",
      et: "Enamik \"null-usaldusest\" on müüja kontrollnimekiri. See on vastupidine: 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks mis tahes arhitektuuri üle arutlemiseks ja üldistatud rünnakute läbimängud, mis näitavad, kus kavandid ebaõnnestuvad. Allikad on viidatud ja parandused kirjas. Kirjutatud selleks, et selle üle vaieldaks.",
    },
    tags: ['Architecture', 'Zero Trust', 'NIST 800-207'],
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 24 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 24 min lugemist' },
    type: { en: 'Framework', et: 'Raamistik' },
    href: '/disclosures/zero-trust-octagon',
  },
  {
    kind: 'essay',
    title: {
      en: 'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS',
      et: 'PIN, mida ei saa delegeerida — Smart-ID, AI-agendid ja eIDAS',
    },
    blurb: {
      en: "Why an AI agent cannot enter your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Articles 26 and 32 read side by side. Why the better reading ties sole control to the moment of signing, what can lawfully be delegated instead, and the OAuth-style pattern that works.",
      et: 'Miks AI-agent ei tohi sinu eest Smart-ID PIN-koodi sisestada: SK ID Solutionsi enda tingimused, kaug-QSCD teenuse praktika avaldus ning eIDASe artiklid 26 ja 32 kõrvuti loetuna. Miks parem tõlgendus seob ainukontrolli allkirja andmise hetkega, mida võib selle asemel delegeerida ja milline OAuthi-laadne muster töötab.',
    },
    tags: ['Smart-ID', 'eIDAS', 'AI Agents'],
    keywords: 'Smart-ID, eIDAS, AI agents, delegated credentials, sole control, qualified electronic signature, PIN automation',
    type: { en: 'Analysis', et: 'Analüüs' },
    meta: { en: 'Published 8 Sep 2026 · Updated 4 Oct 2026 · 13 min read', et: 'Avaldatud 8. september 2026 · Uuendatud 4. oktoober 2026 · 13 min lugemist' },
    href: '/disclosures/the-pin-that-cannot-be-delegated',
  },
  {
    kind: 'essay',
    title: {
      en: "I used to break authentication. Here’s what that taught me about building it.",
      et: 'Kunagi murdsin ma autentimist. Siin on see, mida see mulle selle ehitamise kohta õpetas.',
    },
    blurb: {
      en: 'The thesis essay for this site: why understanding offense is a prerequisite for credible defense, worked through one example from the Smart-ID relay research.',
      et: 'Selle saidi programmiline essee: miks ründe mõistmine on usaldusväärse kaitse eeltingimus, läbi mängitud ühe näitega Smart-ID relay-uuringust.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: { en: 'Published 22 Jun 2026 · Updated 4 Oct 2026 · 8 min read', et: 'Avaldatud 22. juuni 2026 · Uuendatud 4. oktoober 2026 · 8 min lugemist' },
    href: '/disclosures/i-used-to-break-authentication',
  },
  {
    kind: 'essay',
    title: {
      en: 'What client-side trust is actually worth',
      et: 'Mida kliendipoolne usaldus tegelikult väärt on',
    },
    blurb: {
      en: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don’t control is negotiable, and what to do about it.",
      et: 'BotGuard lahtivõtmine juhtumiuuringuna: struktuurne põhjus, miks iga kaitse, mis jookseb masinal, mida sa ei kontrolli, on läbiräägitav, ja mida sellega teha.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 9 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 9 min lugemist' },
    href: '/disclosures/what-client-side-trust-is-actually-worth',
  },
  {
    kind: 'essay',
    title: {
      en: "The fix that doesn’t need SK",
      et: 'Parandus, mis SK-d ei vaja',
    },
    blurb: {
      en: "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing SK ID Solutions, a bank, or a regulator to move first. Here’s a sixth, not new but under-used: a check of each session against the account’s device and network history that a bank can run today. Paršovs and LHV got there first, and PSD2 already requires this kind of monitoring. It is strongest against attacker-session vishing and the cross-device relay, and weakest against victim-initiated transfers.",
      et: 'Raport "Eesti e-riigi Achilleuse kand" loetleb viis parandust Smart-ID allkirjastamise relay-rünnete vastu, millest igaüks vajab, et SK ID Solutions, pank või regulaator esimesena liiguks. Siin on kuues, mitte uus, kuid alakasutatud: iga seansi võrdlemine konto seadme- ja võrguajalooga, mida pank saab teha juba täna. Paršovs ja LHV jõudsid selleni varem ning PSD2 nõuab sellist jälgimist juba praegu. Kõige tugevam on see ründaja seansiga vishingu ja seadmeülese relay vastu, kõige nõrgem ohvri enda algatatud ülekannete puhul.',
    },
    tags: ['Smart-ID', 'Fraud Prevention', 'Session Continuity'],
    keywords: 'Smart-ID, signing relay, session continuity, fraud prevention, network fingerprinting',
    type: { en: 'Essay', et: 'Essee' },
    meta: { en: 'Published 6 Sep 2026 · Updated 4 Oct 2026 · 5 min read', et: 'Avaldatud 6. september 2026 · Uuendatud 4. oktoober 2026 · 5 min lugemist' },
    href: '/disclosures/the-fix-that-doesnt-need-sk',
  },
  {
    kind: 'essay',
    title: {
      en: 'The kratt problem',
      et: 'Krati probleem',
    },
    blurb: {
      en: "On offensive capability as a folkloric kratt — tireless while it has direction, dangerous the moment it doesn’t. A short piece on ethics, idleness, and pointing tools in the right direction.",
      et: 'Ründevõimekusest kui rahvapärimuse kratist — väsimatu, kuni tal on suund, ohtlik hetkel, kui seda pole. Lühike lugu eetikast, jõudeolekust ja tööriistade õiges suunas juhtimisest.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 5 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 5 min lugemist' },
    href: '/disclosures/the-kratt-problem',
  },
  {
    kind: 'essay',
    title: {
      en: 'Coordinated disclosure in a small country',
      et: 'Koordineeritud avalikustamine väikeses riigis',
    },
    blurb: {
      en: "What it’s actually like to disclose a flaw in critical digital infrastructure when everyone in the room knows each other — the legal exposure, the incentives, and why owning your own story is the only real protection.",
      et: 'Milline on tegelikult kriitilise digitaristu vea avalikustamine, kui kõik ruumisviibijad tunnevad üksteist — õiguslikud riskid, stiimulid ja miks oma loo omamine on ainus tõeline kaitse.',
    },
    type: { en: 'Essay', et: 'Essee' },
    meta: { en: 'Published 11 Aug 2026 · Updated 4 Oct 2026 · 9 min read', et: 'Avaldatud 11. august 2026 · Uuendatud 4. oktoober 2026 · 9 min lugemist' },
    href: '/disclosures/coordinated-disclosure-in-a-small-country',
  },
  {
    kind: 'essay',
    title: {
      en: 'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens',
      et: 'PACT ja tarkvaralise ankru pööre — Private Access Control Tokenite kriitiline analüüs',
    },
    blurb: {
      en: "PACT, announced in June 2026 by Cloudflare with Firefox, Chrome, Edge, and Shopify, is, as its designers describe it, privacy-preserving rate limiting: Anchors vouch anonymously, Moderators enforce the limit. The ACT/ARC cryptography is sound. Who may act as an Anchor, and how sites judge them, is still undecided, and that decides whether the web gets an open anti-bot layer or another trust oligopoly.",
      et: "PACT, mille Cloudflare 2026. aasta juunis koos Firefoxi, Chrome’i, Edge’i ja Shopifyga välja kuulutas, on oma autorite kirjelduses privaatsust säästev päringute piiramine: ankrud annavad anonüümse kinnituse, moderaatorid jõustavad piirangu. ACT/ARC-i krüptograafia on korras. Kes tohib olla ankur ja kuidas saidid ankruid hindavad, on veel otsustamata, ja just see otsustab, kas veeb saab avatud robotitõrje kihi või järjekordse usaldusoligopoli.",
    },
    tags: ['PACT', 'Privacy Pass', 'Anti-Fraud'],
    keywords: 'PACT, Private Access Control Tokens, Privacy Pass, anonymous credentials, ACT, ARC, CAPTCHA, WEI, anti-bot, trust, governance',
    type: { en: 'Critical Analysis', et: 'Kriitiline analüüs' },
    meta: { en: 'Published 28 Aug 2026 · Updated 4 Oct 2026 · 14 min read', et: 'Avaldatud 28. august 2026 · Uuendatud 4. oktoober 2026 · 14 min lugemist' },
    href: '/disclosures/pact-software-anchor-turn',
  },
  {
    kind: 'essay',
    title: {
      en: 'The evolution of cyber fraud in Estonia, 2017–2026',
      et: 'Küberpettuste areng Eestis, 2017–2026',
    },
    blurb: {
      en: "How Estonia’s small language held the fraud industry at arm’s length, and what happened when the barrier fell in late 2024: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes. Police-reported losses rose from about €8 million in 2023 to €29 million in 2025, with €13.2 million more in the first half of 2026, as banks began rolling out Smart-ID+. A reference paper built from PPA and RIA data, SEB’s Baltic victim statistics, and the ERR/Äripäev investigation.",
      et: 'Kuidas Eesti väike keel hoidis pettuste tööstust eemal ja mis juhtus, kui barjäär 2024. aasta lõpus langes: värvatud emakeelekõnelejad, tööstuslikud vishing-kõnekeskused, kullerivõrgustikud ja tehisintellekti süvavõltsingud. Politseile teatatud kahju kasvas umbes 8 miljonilt eurolt 2023. aastal 29 miljonini 2025. aastal ja 2026. aasta esimesel poolaastal lisandus 13,2 miljonit, samal ajal kui pangad hakkasid kasutusele võtma Smart-ID+. Viitetöö PPA ja RIA andmete, SEB Baltikumi ohvristatistika ning ERRi ja Äripäeva uurimistöö põhjal.',
    },
    tags: ['Phishing', 'Vishing', 'AI Fraud', 'Estonia'],
    keywords:
      'Estonia, phishing, vishing, fraud, Smart-ID, deepfake, AI fraud, RIA, cybercrime',
    type: { en: 'Reference Paper', et: 'Viitetöö' },
    meta: { en: 'Published 26 Aug 2026 · Updated 4 Oct 2026 · 16 min read', et: 'Avaldatud 26. august 2026 · Uuendatud 4. oktoober 2026 · 16 min lugemist' },
    href: '/disclosures/the-evolution-of-cyber-fraud-in-estonia',
  },
  {
    kind: 'essay',
    title: {
      en: 'ChatGPT is not a phishing scanner',
      et: 'ChatGPT ei ole õngitsusskanner',
    },
    blurb: {
      en: "A fact check of the advice to paste a suspicious link into ChatGPT. What ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS and AI-targeted cloaking can serve an assistant's fetch a decoy page; and why VirusTotal and Google's Safe Browsing site-status page are a better first check, though not a final verdict.",
      et: 'Faktikontroll nõuandest panna kahtlane link ChatGPT-sse. Mida ChatGPT, Claude ja Gemini linkide, domeeni vanuse ja avalike arvustuste kontrollimise kohta tegelikult dokumenteerivad; miks TDS-varjestus ja tehisintellektile suunatud varjestus võivad näidata assistendi päringule söödalehte; ning miks VirusTotal ja Google’i Safe Browsingu saidi oleku leht on parem esmane kontroll, kuigi mitte lõplik hinnang.',
    },
    tags: ['Phishing', 'LLMs', 'Cloaking'],
    keywords:
      'ChatGPT, phishing, LLM, domain age, VirusTotal, Safe Browsing, TDS, cloaking, RDAP, Claude, Gemini',
    type: { en: 'Fact Check', et: 'Faktikontroll' },
    meta: { en: 'Published 6 Sep 2026 · Updated 4 Oct 2026 · 11 min read', et: 'Avaldatud 6. september 2026 · Uuendatud 4. oktoober 2026 · 11 min lugemist' },
    href: '/disclosures/chatgpt-is-not-a-phishing-scanner',
  },
  {
    kind: 'essay',
    title: {
      en: 'The Gray Space: Russian-Linked Proxy and Hosting Infrastructure in Estonia',
      et: 'Hall ruum: Venemaaga seotud proksi- ja majutustaristu Eestis',
    },
    blurb: {
      en: "In September 2026 QualityNetwork OÜ, a named operator of the Fineproxy proxy service, became a RIPE LIR and was allocated former Region40 prefixes. An OSINT reference tracing that network through Qurium’s DDoS reports (Azerbaijan 2018–2019, Rappler 2023), what the record does and does not show about Vault Dweller OÜ’s withdrawn AS203834, and why none of it is proven Russian state activity.",
      et: '2026. aasta septembris sai Fineproxy proksiteenuse üks nimetatud käitaja QualityNetwork OÜ RIPE LIR-iks ja talle eraldati endised Region40 plokid. OSINT-viitetöö jälgib seda võrku Quriumi DDoS-raportite kaudu (Aserbaidžaan 2018–2019, Rappler 2023), kirjeldab, mida avalikud andmed Vault Dweller OÜ tagasi võetud AS203834 kohta näitavad ja mida mitte, ning miks ükski neist ei ole tõendatud Venemaa riiklik tegevus.',
    },
    tags: ['OSINT', 'Estonia', 'Proxy Networks', 'Infrastructure', 'DDoS'],
    keywords:
      'Estonia, Fineproxy, QualityNetwork, RIPE LIR, AS35624, Vault Dweller, AS203834, RIPE geolocation, bulletproof hosting, DDoS, gray space, Region40, Kingservers, Rappler, Qurium',
    type: { en: 'Reference Paper', et: 'Viitetöö' },
    meta: { en: 'Published 14 Sep 2026 · Updated 4 Oct 2026 · 13 min read', et: 'Avaldatud 14. september 2026 · Uuendatud 4. oktoober 2026 · 13 min lugemist' },
    href: '/disclosures/russian-cyber-ops-estonia-hosting',
  },
  {
    kind: 'essay',
    title: { en: 'How client-side anti-fraud actually works, and what VLM agents change', et: 'Kuidas kliendipoolne pettusetõrje tegelikult töötab ja mida muudavad visuaal-keelemudelil põhinevad agendid' },
    blurb: {
      en: 'Client-side anti-fraud measures the cost of forgery, not humanity. An AI agent that operates a stock browser from the operating system forges nothing inside the browser. What that does to each of the five defensive paradigms, what a small testbed measured, and why the open question is now who controls the root of trust.',
      et: 'Kliendipoolne pettusetõrje mõõdab võltsimise hinda, mitte inimlikkust. Tehisintellekti agent, mis juhib muutmata brauserit operatsioonisüsteemi kaudu, ei võltsi brauseri sees midagi. Mida see teeb viie kaitseparadigmaga, mida mõõtis väike katsekeskkond ja miks on lahtine küsimus nüüd see, kes kontrollib usalduse juurt.',
    },
    tags: ['Anti-Automation', 'VLM', 'Attestation', 'Threat Model'],
    keywords: 'client-side anti-fraud, bot detection, vision-language model, operator synthesis, BotGuard, Private Access Tokens, DBSC, passkeys, PACT, attestation centralization, behavioral biometrics, residential proxies',
    type: { en: 'Threat Model Analysis', et: 'Ohumudeli analüüs' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 15 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 15 min lugemist' },
    href: '/disclosures/why-vlms-break-client-side-anti-fraud',
  },
  {
    kind: 'framework',
    title: { en: 'The Nine Dimensions of Zero Trust', et: 'Null-usalduse üheksa mõõdet' },
    blurb: {
      en: 'The nine-dimension morphological matrix laid out dimension by dimension: nine coupled architectural choices, the canonical values for each, and why most architectures fall into one low-maturity cluster.',
      et: 'Üheksamõõtmeline morfoloogiline maatriks mõõde mõõtme haaval: üheksa omavahel seotud arhitektuurivalikut, iga mõõtme kanoonilised väärtused ja miks enamik arhitektuure langeb ühte madala küpsuse kobarasse.',
    },
    tags: ['Zero Trust', 'Architecture', 'Morphological Matrix', 'Attestation'],
    keywords: 'zero trust, morphological matrix, zero trust architecture, trust anchor, attestation modality, policy distribution, observability trust, human continuity, CISA maturity model, zero standing privileges',
    type: { en: 'Framework Analysis', et: 'Raamistiku analüüs' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 14 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 14 min lugemist' },
    href: '/disclosures/nine-dimensions-of-zero-trust',
  },
  {
    kind: 'framework',
    title: { en: 'The Fortune 500 Illusion of Control', et: 'Fortune 500 kontrolliillusioon' },
    blurb: {
      en: 'The largest security budget, the most tooling, the most attestations — and a breach that runs from a stolen session cookie to a full database export in twenty minutes. A step-by-step trace of Archetype B, an analytical composite, not a real incident.',
      et: 'Suurim turbe-eelarve, kõige rohkem tööriistu ja vastavustunnistusi — ning rünne, mis jõuab varastatud seansiküpsisest täieliku andmebaasi väljavõtteni kahekümne minutiga. Arhetüübi B samm-sammuline jälitus; tegu on analüütilise üldistusega, mitte tegeliku intsidendiga.',
    },
    tags: ['Zero Trust', 'Incident Analysis', 'Continuous Verification', 'Enterprise'],
    keywords: 'zero trust, Zero-Trust Octagon, Archetype B, session token theft, infostealer, continuous verification, hard deny, lateral movement, SIEM blindness, device-bound credentials',
    type: { en: 'Breach Trace', et: 'Rünnaku jälg' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 8 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 8 min lugemist' },
    href: '/disclosures/the-fortune-500-illusion-of-control',
  },
  {
    kind: 'framework',
    title: { en: 'Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype', et: 'Liigu kiiresti, paranda toodangus: idufirma arhetüübi täielik rünnaku jälg' },
    blurb: {
      en: 'A composite breach trace of the startup archetype: a malicious dependency robs the CI pipeline, passes the only gate, and reaches production with a valid identity. Why the pipeline is the highest-value target in a velocity-optimised architecture, and which fixes a startup will actually keep.',
      et: 'Idufirma arhetüübi üldistatud rünnakujälg: pahatahtlik sõltuvus röövib CI-konveieri, läbib ainsa värava ja jõuab kehtiva identiteediga toodangusse. Miks on konveier kiirusele optimeeritud arhitektuuris kõrgeima väärtusega sihtmärk ja millised parandused idufirmas päriselt püsima jäävad.',
    },
    tags: ['Zero Trust', 'Supply Chain', 'CI/CD', 'Kubernetes'],
    keywords: 'supply chain attack, CI/CD security, malicious dependency, install scripts, GitOps, workload identity, SPIFFE, container image signing, eBPF runtime detection, zero trust architecture',
    type: { en: 'Breach Trace', et: 'Rünnaku jälg' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 11 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 11 min lugemist' },
    href: '/disclosures/move-fast-fix-it-in-prod',
  },
  {
    kind: 'framework',
    title: { en: 'SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D', et: 'SaaS-i külge liimitud lahja kaitse: arhetüübi D täielik rünnakujälg' },
    blurb: {
      en: 'The small team running on a dozen SaaS products is the most common architecture and the one written about most condescendingly. This is a composite breach trace: MFA fatigue, a stolen session the proxy never sees, and what one person can start fixing in an afternoon.',
      et: 'Tosinal SaaS-tootel toimiv väike meeskond on kõige levinum arhitektuur ja see, millest kirjutatakse kõige üleolevamalt. Siin on üldistatud rünnakujälg: MFA-väsitamine, varastatud seanss, mida proksi ei näe, ja see, mida üks inimene saab ühe pärastlõunaga parandama hakata.',
    },
    tags: ['Zero Trust', 'SaaS', 'MFA Fatigue', 'Identity'],
    keywords: 'MFA fatigue, push bombing, SaaS blind spot, identity-aware proxy, OAuth grant audit, FIDO2, phishing-resistant MFA, zero trust, small team security, Archetype D',
    type: { en: 'Breach Trace', et: 'Rünnaku jälg' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 11 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 11 min lugemist' },
    href: '/disclosures/saas-glued-lean-defense',
  },
  {
    kind: 'essay',
    title: { en: 'Identity Is the Root. Proof Is the Gate.', et: 'Identiteet on juur. Tõend on värav.' },
    blurb: {
      en: 'Every other control in a zero-trust architecture consumes an identity claim it did not produce. This is why the quality of the proof at the gate sets the ceiling, why strong cryptography still fails at the approval layer, and why phishing resistance alone does not close the gap.',
      et: 'Iga teine kontroll usaldusvabas arhitektuuris tarbib identiteediväidet, mida ta ise ei tooda. Seepärast määrab väravas võetava tõendi kvaliteet lae, seepärast nurjub tugev krüptograafia ikkagi heakskiidukihis ja seepärast ei sulge andmepüügikindlus üksi seda lõhet.',
    },
    tags: ['Zero Trust', 'Authentication', 'Identity', 'eID'],
    keywords: 'zero trust, identity is the root of trust, continuous authentication, proof before action, phishing-resistant authentication, WebAuthn, FIDO2, transaction binding, Smart-ID, Estonian eID, sender-constrained tokens, authorization architecture',
    type: { en: 'Framework Analysis', et: 'Raamistiku analüüs' },
    meta: { en: 'Published 22 Sep 2026 · Updated 4 Oct 2026 · 10 min read', et: 'Avaldatud 22. september 2026 · Uuendatud 4. oktoober 2026 · 10 min lugemist' },
    href: '/disclosures/identity-is-the-root-proof-is-the-gate',
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
      en: "An opcode-level breakdown of Google’s VM-based BotGuard engine. It documents the bytecode interpreter, the anti-debugging tricks, the obfuscation layers, and a specific flaw in token portability.",
      et: "Google’i VM-põhise BotGuardi mootori opkooditasemel lahtivõtmine. Dokumenteerib baitkoodi interpretaatori, anti-debug võtted, obfuskeerimiskihid ja konkreetse nõrkuse tokenite ülekantavuses.",
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
    name: 'smart-id-security-research',
    stack: 'Security Research · disclosed',
    category: 'offensive',
    tags: ['Smart-ID', 'eIDAS', 'Coordinated Disclosure'],
    blurb: {
      en: "Protocol analysis of Smart-ID’s cross-device authentication, pinpointing where the trust boundaries break down during device handoffs. Reported to SK ID Solutions in November 2025, with a public disclosure timeline.",
      et: 'Smart-ID seadmeteülese autentimise protokollianalüüs, mis täpsustab, kus usalduspiirid seadmete üleandmisel murduvad. Teavitasin SK ID Solutionsit 2025. aasta novembris, avalikustamise ajajoon on avalik.',
    },
    href: 'https://github.com/tomkabel/smart-id-security-research',
    repo: 'https://github.com/tomkabel/smart-id-security-research',
    live: 'https://tomkabel.github.io/smart-id-security-research/',
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
      en: "A zero-dependency timezone tracker and cost calculator for DeepSeek’s discounted off-peak pricing windows.",
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
      en: "Tom’s Awesome Scripts — a battle-worn collection of bash for server setup and management. The stuff you’d otherwise copy-paste at 2am, made idempotent and safe.",
      et: "Tom’s Awesome Scripts — lahingus karastunud bash-skriptide kogu serveri seadistamiseks ja haldamiseks. Skriptid, mida muidu kopeeriksid kell 2 öösel, tehtud idempotentseks ja turvaliseks.",
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
      en: "I started on the wrong side of the authentication arms race. I reverse engineered browser security, TLS fingerprinting, and anti-fraud systems — and for a while, I broke them for money. I don’t hide that. It ultimately led to a conviction in 2024, an outcome I take full responsibility for.",
      et: 'Alustasin autentimise võidurelvastumise valelt poolt. Pöördprojekteerisin brauseriturvalisust, TLS-i sõrmejäljetuvastust ja pettusevastaseid süsteeme — ja mõnda aega murdsin neid raha eest. Ma ei varja seda. See viis lõpuks 2024. aastal süüdimõistmiseni, mille tagajärgede eest võtan täieliku vastutuse.',
    },
    {
      en: "What I kept was the way of seeing. Once you’ve taken authentication apart for a living, you can’t un-see how fragile most of it is — and you get tired of watching the same systems get picked apart in the same ways. So now I point the same skills the other direction: I research how identity protocols and browser defenses fail (FIDO2 / WebAuthn, eIDAS, Smart-ID, anti-fraud VMs), disclose what I find responsibly, and design systems that are secure-by-design rather than secure-by-hope.",
      et: 'Mida ma alles jätsin, oli nägemisviis. Kui oled autentimise elatise teenimiseks lahti võtnud, ei saa sa enam mittenäha, kui habras suurem osa sellest on — ja sa tüdined vaatamast, kuidas samu süsteeme samadel viisidel lahti võetakse. Nii et nüüd suunan samad oskused teisele poole: uurin, kuidas identiteediprotokollid ja brauserikaitsed ebaõnnestuvad (FIDO2 / WebAuthn, eIDAS, Smart-ID, pettusevastased VM-id), avalikustan oma leiud vastutustundlikult ja kavandan süsteeme, mis on turvalised disaini järgi, mitte lootuse peale.',
    },
    {
      en: "These days I’m Lead Systems Architect and CTO at MatX, where I build production platforms under the threat models I write — zero-trust architecture, phishing-resistant authentication, and GDPR/NIS2 compliance treated as engineering, not paperwork. I work in English and Estonian, and most of my research orbits Estonia’s authentication and anti-fraud landscape, because it’s one of the most digitized in the world and therefore one of the most interesting to defend.",
      et: 'Tänapäeval olen juhtiv süsteemiarhitekt ja CTO MatX-is, kus ehitan tootmisplatvorme nende ohumudelite alusel, mida ise kirjutan — null-usalduse arhitektuur, õngitsemiskindel autentimine ja GDPR/NIS2 vastavus, mida käsitletakse inseneritööna, mitte paberimäärimisena. Töötan inglise ja eesti keeles ning suurem osa minu uuringutest tiirleb Eesti autentimis- ja pettusevastase maastiku ümber, sest see on üks kõige digiteeritumaid maailmas ja seega üks huvitavamaid, mida kaitsta.',
    },
  ],
  kratt: {
    en: "In Estonian folklore a kratt is a servant assembled from spare parts that works tirelessly for its maker — and turns on you the moment you leave it idle. That’s offensive capability in one image. It’s only useful pointed in the right direction, so I do that pointing in public, and I stand behind my work and my opinions personally.",
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
