// Per-route <head> metadata in both languages: the single source for the
// runtime (src/components/Seo.tsx) and the build (scripts/spa-routes.mjs,
// which stamps it into each static route shell). Estonian entries exist only
// for pages whose body is bilingual; englishOnlyArticles never get one, and
// src/content/route-meta.test.ts enforces both directions.
//
// Imports carry explicit .ts extensions so node (tests, build script) can load
// this module without a bundler.
import type { Language } from '../i18n/translations.ts';

export const SITE_URL = 'https://tomabel.ee';

export type PageMeta = { title: string; description: string };

type Ld = {
  // AboutPage renders as a single node; the article types get a breadcrumb.
  type: 'BlogPosting' | 'ScholarlyArticle' | 'AboutPage';
  datePublished: string;
  en: { headline: string; abstract: string };
  et?: { headline: string; abstract: string };
};

export type RouteMeta = { en: PageMeta; et?: PageMeta; ld?: Ld };

export const routeMeta = {
  "/": {
    en: { title: "Tom Kristian Abel — Security Researcher & Systems Architect", description: "Tom Kristian Abel — Security Researcher & Systems Architect. I reverse engineer how authentication fails, then build systems that survive what I find." },
    et: { title: "Tom Kristian Abel — turvauurija ja süsteemiarhitekt", description: "Tom Kristian Abel, turvauurija ja süsteemiarhitekt. Pöördprojekteerin, kuidas autentimine ebaõnnestub, ja ehitan süsteeme, mis minu leitu üle elavad." },
  },
  "/disclosures": {
    en: { title: "Disclosures — Tom Kristian Abel", description: "Disclosed vulnerability research, opcode-level teardowns, architecture frameworks, and essays — always disclosed responsibly before publication." },
    et: { title: "Avalikustatud — Tom Kristian Abel", description: "Haavatavuste uuringud, opkooditasemel analüüsid, arhitektuuriraamistikud ja esseed. Kõik leiud avalikustan vastutustundlikult enne avaldamist." },
  },
  "/systems": {
    en: { title: "Systems — Tom Kristian Abel", description: "Tools, security products, and backend services I have built and deployed — from a Go TLS-fingerprinting proxy to production identity platforms." },
    et: { title: "Süsteemid — Tom Kristian Abel", description: "Tööriistad, turvalahendused ja backend-teenused, mille olen ehitanud ja juurutanud: Go TLS-sõrmejälgede proksist kuni identiteediplatvormideni." },
  },
  "/disclosures/i-used-to-break-authentication": {
    en: { title: "I used to break authentication — Tom Kristian Abel", description: "The thesis essay for this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-06-22",
      en: { headline: "I used to break authentication. Here's what that taught me about building it.", abstract: "The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides." },
    },
  },
  "/disclosures/what-client-side-trust-is-actually-worth": {
    en: { title: "What client-side trust is actually worth — Tom Kristian Abel", description: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      en: { headline: "What client-side trust is actually worth", abstract: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it." },
    },
  },
  "/disclosures/the-kratt-problem": {
    en: { title: "The kratt problem — Tom Kristian Abel", description: "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. On ethics, idleness, and aiming tools right." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      en: { headline: "The kratt problem", abstract: "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction." },
    },
  },
  "/disclosures/coordinated-disclosure-in-a-small-country": {
    en: { title: "Coordinated disclosure in a small country — Tom Kristian Abel", description: "Disclosing a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and owning your own story." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      en: { headline: "Coordinated disclosure in a small country", abstract: "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection." },
    },
  },
  "/disclosures/the-fix-that-doesnt-need-sk": {
    en: { title: "The fix that doesn't need SK — Tom Kristian Abel", description: "Five fixes for the Smart-ID signing relay need SK, a bank, or a regulator to move first. A sixth: a session-continuity check a bank's edge can run today." },
    et: { title: "Parandus, mis SK-d ei vaja — Tom Kristian Abel", description: "Viis parandust Smart-ID relay-rünnete vastu ootavad, et SK, pank või regulaator liiguks esimesena. Kuues on kontroll, mida pank saab teha juba täna." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-09-06",
      en: { headline: "The fix that doesn't need SK", abstract: "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing SK ID Solutions, a bank, or a regulator to move first. Here's a sixth: a session-continuity check a bank's own edge can run today." },
      et: { headline: "Parandus, mis SK-d ei vaja", abstract: "Raport „Eesti e-riigi Achilleuse kand“ loetleb viis parandust Smart-ID allkirjastamise relay-rünnete vastu ja igaüks neist vajab, et SK ID Solutions, pank või regulaator liiguks esimesena. Siin on kuues: seansi järjepidevuse kontroll, mida pank saab oma servas käivitada juba täna." },
    },
  },
  "/disclosures/botguard-disassembled": {
    en: { title: "BotGuard, disassembled — Tom Kristian Abel", description: "An opcode-level teardown of Google's BotGuard anti-fraud VM: the bytecode machine, its anti-debug layers, and the token-portability weakness at the end." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      en: { headline: "BotGuard, disassembled — reverse engineering Google's anti-fraud VM", abstract: "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research." },
    },
  },
  "/disclosures/smart-id-achilles-heel": {
    en: { title: "The Achilles' heel of Estonia's e-state — Tom Kristian Abel", description: "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      en: { headline: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research", abstract: "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows." },
    },
  },
  "/disclosures/zero-trust-octagon": {
    en: { title: "Zero-Trust Octagon — Tom Kristian Abel", description: "A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      en: { headline: "Zero-Trust Octagon — a framework from first principles", abstract: "A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs." },
    },
  },
  "/disclosures/pact-software-anchor-turn": {
    en: { title: "PACT and the software-anchor turn — Tom Kristian Abel", description: "A critical analysis of Cloudflare's PACT proposal with Firefox, Chrome, Edge, and Shopify: what blind-signature tokens prove, and the missing governance layer." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-28",
      en: { headline: "PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens", abstract: "A critical analysis of Cloudflare's PACT proposal, announced with Firefox, Chrome, Edge, and Shopify in June 2026: what blind-signature tokens actually prove, why the missing governance layer is the real risk, and the markers that would make the design defensible." },
    },
  },
  "/disclosures/chatgpt-is-not-a-phishing-scanner": {
    en: { title: "ChatGPT is not a phishing scanner — Tom Kristian Abel", description: "A fact check of pasting suspicious links into ChatGPT: what mainstream assistants document, why TDS cloaking defeats single fetches, and the real verdict layer." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-06",
      en: { headline: "ChatGPT is not a phishing scanner", abstract: "A fact check of the advice to paste a suspicious link into ChatGPT: what ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS cloaking can serve a single AI fetch a decoy page; and why VirusTotal and Google Safe Browsing remain the verdict layer." },
    },
  },
  "/disclosures/the-pin-that-cannot-be-delegated": {
    en: { title: "The PIN that cannot be delegated — Tom Kristian Abel", description: "Why an AI agent cannot hold your Smart-ID PIN: SK's own terms, the QSCD practice statement, and eIDAS Article 26, plus the OAuth-style pattern that works." },
    et: { title: "PIN, mida ei saa delegeerida — Tom Kristian Abel", description: "Miks AI-agent ei tohi hoida sinu Smart-ID PIN-koodi: SK tingimused, QSCD praktika avaldus ja eIDAS-i artikkel 26 ning OAuthi-laadne muster, mis töötab." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-08",
      en: { headline: "The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS", abstract: "Why an AI agent cannot hold your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Article 26 read side by side. What sole control means at the moment of signing, why delegated credentials do not change it, and the OAuth-style pattern that actually works." },
      et: { headline: "PIN, mida ei saa delegeerida — Smart-ID, AI-agendid ja eIDAS", abstract: "Miks AI-agent ei tohi hoida sinu Smart-ID PIN-koodi: SK ID Solutionsi enda tingimused, kaug-QSCD teenuse praktika avaldus ja eIDAS-i artikkel 26 kõrvuti loetuna. Mida tähendab ainukontroll allkirjastamise hetkel, miks delegeeritud mandaadid seda ei muuda ja milline OAuthi-laadne muster tegelikult töötab." },
    },
  },
  "/disclosures/the-evolution-of-cyber-fraud-in-estonia": {
    en: { title: "Cyber fraud in Estonia, 2010–2026 — Tom Kristian Abel", description: "How Estonia's small language held fraud at arm's length for a decade, and what happened when it fell: native speakers, vishing centers, and AI deepfakes." },
    et: { title: "Küberpettused Eestis, 2010–2026 — Tom Kristian Abel", description: "Kuidas Eesti väike keel hoidis petturid kümme aastat eemal ja mis juhtus, kui barjäär langes: värvatud emakeelekõnelejad, vishing-keskused ja süvavõltsingud." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-26",
      en: { headline: "The evolution of cyber fraud in Estonia, 2010–2026", abstract: "How Estonia's small language held the fraud industry at arm's length for a decade, and what happened when the barrier fell: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes, with annual losses climbing from five to ten million euros to 29 million in 2025." },
      et: { headline: "Küberpettuste areng Eestis, 2010–2026", abstract: "Kuidas Eesti väike keel hoidis pettusetööstust kümme aastat eemal ja mis juhtus, kui barjäär langes: värvatud emakeelekõnelejad, tööstuslikud vishing-kõnekeskused, kullerivõrgud ja tehisintellekti süvavõltsingud. Aastased kahjud kasvasid viielt kuni kümnelt miljonilt eurolt 29 miljonini 2025. aastal." },
    },
  },
  "/disclosures/russian-cyber-ops-estonia-hosting": {
    en: { title: "Russian Cyber Ops and Estonian Hosting — Tom Kristian Abel", description: "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting, bulletproof entities, and gray-space proxy networks." },
    et: { title: "Vene küberoperatsioonid ja Eesti hosting — Tom Kristian Abel", description: "OSINT-hinnang Eesti kahetisele rollile Vene küberökosüsteemis: tavapärased hostingupakkujad, bulletproof-ettevõtted ja halli ruumi proksivõrgud." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-14",
      en: { headline: "The Gray Space: Russian Cyber Operations and Estonian Hosting Infrastructure", abstract: "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting providers, bulletproof entities like Vault Dweller OÜ, and gray-space proxy networks (Fineproxy, Quality Network OÜ) anchored in Estonian data centers." },
      et: { headline: "Hall ruum: Venemaa küberoperatsioonid ja Eesti hostingutaristu", abstract: "OSINT-hinnang Eesti kahetisele rollile Vene küberökosüsteemis: tavapärased hostingupakkujad, bulletproof-ettevõtted nagu Vault Dweller OÜ ning Eesti andmekeskustesse ankurdatud halli ruumi proksivõrgud (Fineproxy, Quality Network OÜ)." },
    },
  },
  "/about": {
    en: { title: "About — Tom Kristian Abel", description: "The way of seeing — background, philosophy, and how to work with Tom Kristian Abel." },
    et: { title: "Minust — Tom Kristian Abel", description: "Nägemisviis: taust, põhimõtted ja see, kuidas Tom Kristian Abeliga koostööd teha." },
  },
  "/my-story": {
    en: { title: "My story — Tom Kristian Abel", description: "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the evidence." },
    et: { title: "Minu lugu — Tom Kristian Abel", description: "Kuidas ma siia jõudsin, kolmes vaatuses: noorena esitatud kahtlustus, pööre lõhe müümiselt selle sulgemisele ja tõendid." },
    ld: {
      type: "AboutPage",
      datePublished: "2026-09-21",
      en: { headline: "My story — Tom Kristian Abel", abstract: "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the published research that is the evidence. With a link to the original Delfi interview." },
      et: { headline: "Minu lugu — Tom Kristian Abel", abstract: "Kuidas ma siia jõudsin, kolmes vaatuses: Keskkriminaalpolitsei noorena esitatud kahtlustus, pööre lõhe müümiselt selle sulgemisele ja avaldatud uurimistöö, mis on selle tõend. Koos lingiga algsele Delfi intervjuule." },
    },
  },
  "/disclosures/why-vlms-break-client-side-anti-fraud": {
    en: { title: "Why VLMs break client-side anti-fraud — Tom Kristian Abel", description: "Fifteen years of bot detection assumes automation must forge what a real browser produces. A VLM driving a stock browser forges nothing at all." },
    et: { title: "Miks VLM-id murravad pettusetõrje — Tom Kristian Abel", description: "Viisteist aastat botituvastust eeldab, et automaatika peab võltsima seda, mida päris brauser toodab. Muutmata brauserit juhtiv VLM ei võltsi midagi." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "How client-side anti-fraud actually works, and why VLMs break it", abstract: "Fifteen years of bot detection assumes an automated client must forge something a real browser produces naturally. A vision-language model driving a stock browser forges nothing. The five defensive paradigms, which survive operator synthesis, and the attestation centralization problem." },
      et: { headline: "Kuidas kliendipoolne pettusetõrje tegelikult töötab ja miks visuaal-keelemudelid selle murravad", abstract: "Viisteist aastat botituvastust eeldab, et automaatne klient peab võltsima midagi, mida päris brauser toodab loomulikult. Visuaal-keelemudel, mis juhib muutmata brauserit, ei võltsi midagi. Viis kaitseparadigmat, millised neist operaatori sünteesi üle elavad, ja atesteerimise tsentraliseerimise probleem." },
    },
  },
  "/disclosures/nine-dimensions-of-zero-trust": {
    en: { title: "The Nine Dimensions of Zero Trust — Tom Kristian Abel", description: "Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, and posture." },
    et: { title: "Null-usalduse üheksa mõõdet — Tom Kristian Abel", description: "Null-usaldus ei ole redel, vaid üheksamõõtmeline konfiguratsiooniruum: usaldusankur, identiteet, jõustamine, atesteerimine, reageering ja seisund." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "The Nine Dimensions of Zero Trust", abstract: "Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, policy distribution, observability, posture and human continuity. A walkthrough of the morphological matrix and how to read an organization real position on it." },
      et: { headline: "Null-usalduse üheksa mõõdet", abstract: "Null-usaldus ei ole redel, vaid üheksamõõtmeline konfiguratsiooniruum: usaldusankur, identiteet, jõustamine, atesteerimine, reageering, poliitika levitamine, jälgitavus, seisund ja inimlik järjepidevus. Ülevaade morfoloogilisest maatriksist ja sellest, kuidas lugeda organisatsiooni tegelikku asukohta selles." },
    },
  },
  "/disclosures/the-fortune-500-illusion-of-control": {
    en: { title: "The Fortune 500 Illusion of Control — Tom Kristian Abel", description: "A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the biggest budget, from a stolen session cookie to full exfiltration." },
    et: { title: "Fortune 500 kontrolliillusioon — Tom Kristian Abel", description: "Zero-Trust Octagoni arhetüübi B täielik rünnakujälg: suurima eelarvega ettevõte, varastatud seansiküpsisest kuni täieliku andmebaasi väljavõtteni." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "The Fortune 500 Illusion of Control", abstract: "A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the largest security budget, the most tooling and the most attestations, taken from a stolen session cookie to full database exfiltration in twenty minutes." },
      et: { headline: "Fortune 500 kontrolliillusioon", abstract: "Zero-Trust Octagoni arhetüübi B täielik rünnakujälg: suurima turbe-eelarve, kõige rohkemate tööriistade ja vastavustunnistustega ettevõte, varastatud seansiküpsisest kuni täieliku andmebaasi väljavõtteni kahekümne minutiga." },
    },
  },
  "/disclosures/move-fast-fix-it-in-prod": {
    en: { title: "Move Fast, Fix It In Prod — Tom Kristian Abel", description: "A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency reaches production with a valid identity." },
    et: { title: "Liigu kiiresti, paranda toodangus — Tom Kristian Abel", description: "Kiirusele optimeeritud idufirma (arhetüüp C) tarneahela ja CI/CD rünnakujälg: tüposquat-sõltuvus jõuab toodangusse kehtiva identiteediga." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype", abstract: "A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency passes the only verification gate the architecture has and reaches production with a valid workload identity. Composite analytical model, not a real incident." },
      et: { headline: "Liigu kiiresti, paranda toodangus: idufirma arhetüübi täielik rünnaku jälg", abstract: "Kiirusele optimeeritud idufirma (arhetüüp C) täielik tarneahela ja CI/CD rünnakujälg: tüposquat-sõltuvus läbib ainsa kontrollpunkti, mis arhitektuuril on, ja jõuab toodangusse kehtiva töökoormuse identiteediga. Koondanalüütiline mudel, mitte tegelik intsident." },
    },
  },
  "/disclosures/saas-glued-lean-defense": {
    en: { title: "SaaS-Glued Lean Defense — Tom Kristian Abel", description: "A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, and five fixes one operator can apply in an afternoon." },
    et: { title: "SaaS-i külge liimitud lahja kaitse — Tom Kristian Abel", description: "Väikese meeskonna SaaS-arhitektuuri rünnakujälg samm-sammult: MFA-väsitamisest seansivarguseni ja viis parandust, mida üks inimene teeb ühe pärastlõunaga." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D", abstract: "A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, the SaaS blind spot an identity-aware proxy never covers, OAuth grant cascade, and five fixes one operator can apply in an afternoon without a budget." },
      et: { headline: "SaaS-i külge liimitud lahja kaitse: arhetüübi D täielik rünnakujälg", abstract: "Väikese meeskonna SaaS-arhitektuuri rünnakujälg samm-sammult: MFA-väsitamisest seansivarguseni, SaaS-i pimeala, mida identiteediteadlik proksi ei kata, OAuth-volituste kaskaad ja viis parandust, mida üks inimene saab ilma eelarveta teha ühe pärastlõunaga." },
    },
  },
  "/disclosures/identity-is-the-root-proof-is-the-gate": {
    en: { title: "Identity Is the Root. Proof Is the Gate. — Tom Kristian Abel", description: "Every zero-trust control is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On what authenticated really means." },
    et: { title: "Identiteet on juur. Tõend on värav. — Tom Kristian Abel", description: "Iga kontroll usaldusvabas arhitektuuris sõltub identiteedist, seega seab väravas võetud tõend lae kõigele selle kohal. Mida „autenditud“ tegelikult tähendab." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      en: { headline: "Identity Is the Root. Proof Is the Gate.", abstract: "Every control in a zero-trust architecture is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On authentication events versus continuous proof, the six distinct claims people call authenticated, and why phishing-resistant credentials are necessary but not sufficient." },
      et: { headline: "Identiteet on juur. Tõend on värav.", abstract: "Iga kontroll usaldusvabas arhitektuuris asub identiteedist allavoolu, seega seab väravas võetud tõend lae kõigele selle kohal. Ühekordne autentimine versus pidev tõendamine, kuus erinevat väidet, mida nimetatakse autendituks, ja miks õngitsuskindlad mandaadid on vajalikud, kuid mitte piisavad." },
    },
  },
  "/privacy": {
    en: { title: "Privacy Policy — Tom Kristian Abel", description: "What little data tomabel.ee collects and how it is handled. No cross-site tracking." },
    et: { title: "Privaatsuspoliitika — Tom Kristian Abel", description: "Kui vähe andmeid tomabel.ee kogub ja kuidas neid käsitletakse. Saitideülest jälgimist ei ole." },
  },
  "/terms": {
    en: { title: "Terms of Service — Tom Kristian Abel", description: "The rules for using tomabel.ee." },
    et: { title: "Kasutustingimused — Tom Kristian Abel", description: "Reeglid tomabel.ee kasutamiseks." },
  },
  "/disclosure": {
    en: { title: "Security Research Policy — ProksiAbel OÜ", description: "How we handle security research: rules, disclosure process, and how to contact us." },
    et: { title: "Turvauuringute poliitika — ProksiAbel OÜ", description: "Kuidas me turvauuringuid teeme: reeglid, avalikustamise protsess ja kuidas meiega ühendust võtta." },
  },
  "/cookies": {
    en: { title: "Cookie Policy — Tom Kristian Abel", description: "Cookies (or lack thereof) on tomabel.ee." },
    et: { title: "Küpsised — Tom Kristian Abel", description: "Küpsised (või nende puudumine) saidil tomabel.ee." },
  },
} satisfies Record<string, RouteMeta>;

export type RoutePath = keyof typeof routeMeta;

export const notFoundMeta: Record<Language, PageMeta> = {
  en: {
    title: 'Page Not Found — Tom Kristian Abel',
    description: 'The page you are looking for does not exist or has been moved.',
  },
  et: {
    title: 'Lehte ei leitud — Tom Kristian Abel',
    description: 'Otsitud lehte ei ole olemas või see on teisaldatud.',
  },
};

// Canonical URLs use the trailing-slash form: GitHub Pages 301s /path to
// /path/ and serves pub/path/index.html there (see scripts/spa-routes.mjs).
export const pageUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

export function metaFor(path: string, language: Language): PageMeta & { type: 'website' | 'article' } {
  const route: RouteMeta | undefined = (routeMeta as Record<string, RouteMeta>)[path];
  const meta = route ? (route[language] ?? route.en) : notFoundMeta[language];
  return { ...meta, type: route?.ld ? 'article' : 'website' };
}

const CRUMBS: Record<Language, [string, string]> = {
  en: ['Home', 'Disclosures'],
  et: ['Avaleht', 'Avalikustatud'],
};

// Structured data for a route in one language, or null when it has none. A
// language without its own copy falls back to English and says so via
// inLanguage, so the markup never claims a translation that does not exist.
export function jsonLdFor(path: string, language: Language): object | null {
  const ld = (routeMeta as Record<string, RouteMeta>)[path]?.ld;
  if (!ld) return null;
  const lang: Language = ld[language] ? language : 'en';
  const copy = ld[lang] ?? ld.en;
  const url = pageUrl(path);
  const author = { '@type': 'Person', name: 'Tom Kristian Abel', url: `${SITE_URL}/` };

  if (ld.type === 'AboutPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: copy.headline,
      description: copy.abstract,
      url,
      datePublished: ld.datePublished,
      author,
      inLanguage: lang,
    };
  }
  const [home, index] = CRUMBS[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ld.type,
        headline: copy.headline,
        description: copy.abstract,
        url,
        datePublished: ld.datePublished,
        author,
        inLanguage: lang,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: home, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: index, item: `${SITE_URL}/disclosures/` },
          { '@type': 'ListItem', position: 3, name: copy.headline, item: url },
        ],
      },
    ],
  };
}
