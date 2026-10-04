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
  // Last substantive revision; omitted when the page has not changed since publication.
  dateModified?: string;
  en: { headline: string; abstract: string };
  et?: { headline: string; abstract: string };
};

export type RouteMeta = { en: PageMeta; et?: PageMeta; ld?: Ld };

export const routeMeta = {
  "/": {
    en: { title: "Tom Kristian Abel — Security Researcher & Systems Architect", description: "Tom Kristian Abel — Security Researcher & Systems Architect. I reverse engineer how authentication fails, then build systems that survive what I find." },
    et: { title: "Tom Kristian Abel — turvauurija ja süsteemiarhitekt", description: "Tom Kristian Abel, turvauurija ja süsteemiarhitekt. Pöördprojekteerin autentimise nurjumist ja ehitan süsteeme, mis leitud puudustele vastu peavad." },
  },
  "/disclosures": {
    en: { title: "Research — Tom Kristian Abel", description: "Vulnerability research, teardowns, architecture frameworks and essays. Work on live systems states its disclosure status." },
    et: { title: "Uuringud — Tom Kristian Abel", description: "Turvanõrkuste uuringud, käsukooditasemel analüüsid, arhitektuuriraamistikud ja esseed. Elavaid süsteeme puudutavatel uuringutel on märgitud avalikustamise seis." },
  },
  "/systems": {
    en: { title: "Systems — Tom Kristian Abel", description: "Tools, security products, and backend services I have built and deployed — from a Go TLS-fingerprinting proxy to production identity platforms." },
    et: { title: "Süsteemid — Tom Kristian Abel", description: "Tööriistad, turvalahendused ja taustateenused, mille olen ehitanud ja juurutanud: Go TLS-sõrmejälgede proksiserverist kuni identiteediplatvormideni." },
  },
  "/disclosures/i-used-to-break-authentication": {
    en: { title: "I used to break authentication — Tom Kristian Abel", description: "The thesis essay for this site: why understanding offense is a prerequisite for credible defense, worked through one Smart-ID relay example." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-06-22",
      dateModified: "2026-10-04",
      en: { headline: "I used to break authentication. Here's what that taught me about building it.", abstract: "The thesis essay for this site: why understanding offense is a prerequisite for credible defense, worked through one example from the Smart-ID relay research." },
    },
  },
  "/disclosures/what-client-side-trust-is-actually-worth": {
    en: { title: "What client-side trust is actually worth — Tom Kristian Abel", description: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "What client-side trust is actually worth", abstract: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it." },
    },
  },
  "/disclosures/the-kratt-problem": {
    en: { title: "The kratt problem — Tom Kristian Abel", description: "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. On ethics, idleness, and aiming tools right." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "The kratt problem", abstract: "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction." },
    },
  },
  "/disclosures/coordinated-disclosure-in-a-small-country": {
    en: { title: "Coordinated disclosure in a small country — Tom Kristian Abel", description: "Disclosing a flaw in critical digital infrastructure when everyone in the room knows each other: the legal exposure, the incentives, and owning your own story." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "Coordinated disclosure in a small country", abstract: "What it's actually like to disclose a flaw in critical digital infrastructure when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection." },
    },
  },
  "/disclosures/the-fix-that-doesnt-need-sk": {
    en: { title: "The fix that doesn't need SK — Tom Kristian Abel", description: "A session-history check banks can run today against the Smart-ID signing relay: prior art from Paršovs and LHV, required by PSD2 RTS Art. 2, and its limits." },
    et: { title: "Parandus, mis SK-d ei vaja — Tom Kristian Abel", description: "Seansiajaloo kontroll, mida pank saab Smart-ID allkirjastamise vahendusründe vastu teha juba täna: Paršovsi ja LHV eeltöö, PSD2 RTS art 2 nõue ja piirid." },
    ld: {
      type: "BlogPosting",
      datePublished: "2026-09-06",
      dateModified: "2026-10-04",
      en: { headline: "The fix that doesn't need SK", abstract: "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing a regulator, the banks, or a legislature or court to move first. A sixth, not new but under-used: checking each session against the account's device and network history, which a bank can run today and PSD2 RTS Art. 2 already requires. Strongest against attacker-session vishing and the cross-device relay; weakest against victim-initiated transfers." },
      et: { headline: "Parandus, mis SK-d ei vaja", abstract: "Raport „Eesti e-riigi Achilleuse kand“ loetleb viis parandust Smart-ID allkirjastamise vahendusrünnete vastu ja igaüks neist vajab, et regulaator, pangad või seadusandja või kohus teeks esimese sammu. Kuues, mitte uus, kuid alakasutatud: iga seansi võrdlemine konto seadme- ja võrguajalooga, mida pank saab teha juba täna ja mida PSD2 RTS art 2 juba nõuab. Kõige tugevam ründaja seansiga kõneõngitsuse ja seadmeülese vahendusründe vastu, kõige nõrgem ohvri enda algatatud ülekannete puhul." },
    },
  },
  "/disclosures/botguard-disassembled": {
    en: { title: "BotGuard, disassembled — Tom Kristian Abel", description: "An opcode-level teardown of Google's BotGuard VM, built on Cypa's and LuanRT's work: tokens bound to site, lifetime and content, but not to the machine." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "BotGuard, disassembled — reverse engineering Google's anti-fraud VM", abstract: "An opcode-level teardown of Google's BotGuard anti-fraud VM, built on Cypa's VM analysis and LuanRT's PO-token research: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the structural binding gap at the end of the chain — a token bound to site, lifetime and content, but not to the machine." },
    },
  },
  "/disclosures/smart-id-achilles-heel": {
    en: { title: "The Achilles' heel of Estonia's e-state — Tom Kristian Abel", description: "Protocol-level analysis of Smart-ID: why MITM and endpoint replacement fail by design, how the approval layer fails instead, and the disclosure record." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research", abstract: "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows." },
    },
  },
  "/disclosures/zero-trust-octagon": {
    en: { title: "Zero-Trust Octagon — Tom Kristian Abel", description: "A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-11",
      dateModified: "2026-10-04",
      en: { headline: "Zero-Trust Octagon — a framework from first principles", abstract: "A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs." },
    },
  },
  "/disclosures/pact-software-anchor-turn": {
    en: { title: "PACT and the software-anchor turn — Tom Kristian Abel", description: "PACT as its designers describe it: privacy-preserving rate limiting over ACT/ARC anonymous credentials. Sound cryptography; the Anchor question is still open." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-28",
      dateModified: "2026-10-04",
      en: { headline: "PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens", abstract: "PACT, announced in June 2026 by Cloudflare with Firefox, Chrome, Edge, and Shopify, is, as its designers describe it, privacy-preserving rate limiting: Anchors vouch anonymously, Moderators enforce the limit. The ACT/ARC cryptography is sound. Who may act as an Anchor, and how sites judge them, is still undecided." },
    },
  },
  "/disclosures/chatgpt-is-not-a-phishing-scanner": {
    en: { title: "ChatGPT is not a phishing scanner — Tom Kristian Abel", description: "A fact check of pasting suspect links into ChatGPT: what assistants document, why TDS and AI-targeted cloaking defeat single fetches, and better first checks." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-06",
      dateModified: "2026-10-04",
      en: { headline: "ChatGPT is not a phishing scanner", abstract: "A fact check of the advice to paste a suspicious link into ChatGPT. What ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS and AI-targeted cloaking can serve an assistant's fetch a decoy page; and why VirusTotal and Google's Safe Browsing site-status page are a better first check, though not a final verdict." },
    },
  },
  "/disclosures/the-pin-that-cannot-be-delegated": {
    en: { title: "The PIN that cannot be delegated — Tom Kristian Abel", description: "Why an AI agent cannot enter your Smart-ID PIN: SK's terms, the remote-QSCD practice statement, eIDAS Articles 26 and 32, and the OAuth-style pattern instead." },
    et: { title: "PIN, mida ei saa delegeerida — Tom Kristian Abel", description: "Miks TI-agent ei tohi sinu eest Smart-ID PIN-koodi sisestada: SK tingimused, kaug-QSCD praktika avaldus, eIDASe artiklid 26 ja 32 ning OAuthi-laadne muster." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-08",
      dateModified: "2026-10-04",
      en: { headline: "The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS", abstract: "Why an AI agent cannot enter your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Articles 26 and 32 read side by side. Why the better reading ties sole control to the moment of signing, what can lawfully be delegated instead, and the OAuth-style pattern that works." },
      et: { headline: "PIN, mida ei saa delegeerida — Smart-ID, TI-agendid ja eIDAS", abstract: "Miks TI-agent ei tohi sinu eest Smart-ID PIN-koodi sisestada: SK ID Solutionsi enda tingimused, kaug-QSCD teenuse tavadokument ning eIDASe artiklid 26 ja 32 kõrvuti loetuna. Miks parem tõlgendus seob ainukontrolli allkirja andmise hetkega, mida võib selle asemel delegeerida ja milline OAuthi-laadne muster töötab." },
    },
  },
  "/disclosures/the-evolution-of-cyber-fraud-in-estonia": {
    en: { title: "Cyber fraud in Estonia, 2017–2026 — Tom Kristian Abel", description: "How Estonia's small language held fraud at arm's length, and what happened when it fell in late 2024: native speakers, vishing centers, Smart-ID+, AI deepfakes." },
    et: { title: "Küberpettused Eestis, 2017–2026 — Tom Kristian Abel", description: "Kuidas väike eesti keel hoidis petturid eemal ja mis juhtus, kui barjäär 2024. aasta lõpus langes: emakeelekõnelejad, kõnekeskused, Smart-ID+ ja süvavõltsingud." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-08-26",
      dateModified: "2026-10-04",
      en: { headline: "The evolution of cyber fraud in Estonia, 2017–2026", abstract: "How Estonia's small language held the fraud industry at arm's length, and what happened when the barrier fell in late 2024: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes. Police-reported losses rose from about €8 million in 2023 to €29 million in 2025, with €13.2 million more in the first half of 2026, as banks began rolling out Smart-ID+." },
      et: { headline: "Küberpettuste areng Eestis, 2017–2026", abstract: "Kuidas Eesti väike keel hoidis pettuste tööstust eemal ja mis juhtus, kui barjäär 2024. aasta lõpus langes: värvatud emakeelekõnelejad, tööstuslikud kõneõngitsuskeskused, kullerivõrgustikud ja tehisintellekti süvavõltsingud. Politseile teatatud kahju kasvas umbes 8 miljonilt eurolt 2023. aastal 29 miljonini 2025. aastal ja 2026. aasta esimesel poolaastal lisandus 13,2 miljonit, samal ajal kui pangad hakkasid kasutusele võtma Smart-ID+." },
    },
  },
  "/disclosures/russian-cyber-ops-estonia-hosting": {
    en: { title: "The Gray Space: Russian-Linked Proxies — Tom Kristian Abel", description: "In September 2026 QualityNetwork OÜ, a named Fineproxy operator, became a RIPE LIR. An OSINT reference on that network, Qurium's DDoS reports and their limits." },
    et: { title: "Hall ala: Venemaaga seotud proksitaristu — Tom Kristian Abel", description: "2026. aasta septembris sai Fineproxy üks käitaja QualityNetwork OÜ RIPE LIR-iks. OSINT-viitetöö sellest võrgust, Quriumi DDoS-raportitest ja nende piiridest." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-14",
      dateModified: "2026-10-04",
      en: { headline: "The Gray Space: Russian-Linked Proxy and Hosting Infrastructure in Estonia", abstract: "In September 2026 QualityNetwork OÜ, a named operator of the Fineproxy proxy service, became a RIPE LIR and was allocated former Region40 prefixes. An OSINT reference tracing that network through Qurium's DDoS reports (Azerbaijan 2018–2019, Rappler 2023), what the record does and does not show about Vault Dweller OÜ's withdrawn AS203834, and why none of it is proven Russian state activity." },
      et: { headline: "Hall ala: Venemaaga seotud proksi- ja majutustaristu Eestis", abstract: "2026. aasta septembris sai Fineproxy proksiteenuse üks nimetatud käitaja QualityNetwork OÜ RIPE LIR-iks ja talle eraldati endised Region40 plokid. OSINT-viitetöö jälgib seda võrku Quriumi DDoS-raportite kaudu (Aserbaidžaan 2018–2019, Rappler 2023), kirjeldab, mida avalikud andmed Vault Dweller OÜ tagasi võetud AS203834 kohta näitavad ja mida mitte, ning miks ükski neist ei ole tõendatud Venemaa riiklik tegevus." },
    },
  },
  "/about": {
    en: { title: "About — Tom Kristian Abel", description: "The way of seeing — background, philosophy, and how to work with Tom Kristian Abel." },
    et: { title: "Minust — Tom Kristian Abel", description: "Visioon: taust, põhimõtted ja see, kuidas Tom Kristian Abeliga koostööd teha." },
  },
  "/my-story": {
    en: { title: "My story — Tom Kristian Abel", description: "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the evidence." },
    et: { title: "Minu lugu — Tom Kristian Abel", description: "Kuidas ma siia jõudsin, kolmes vaatuses: noorena esitatud kahtlustus, pööre turvalõhe müümiselt selle sulgemisele ja tõendid." },
    ld: {
      type: "AboutPage",
      datePublished: "2026-09-21",
      en: { headline: "My story — Tom Kristian Abel", abstract: "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the published research that is the evidence. With a link to the original Delfi interview." },
      et: { headline: "Minu lugu — Tom Kristian Abel", abstract: "Kuidas ma siia jõudsin, kolmes vaatuses: Keskkriminaalpolitsei noorena esitatud kahtlustus, pööre turvalõhe müümiselt selle sulgemisele ja avaldatud uurimistöö, mis on selle tõend. Koos lingiga algsele Delfi intervjuule." },
    },
  },
  "/disclosures/why-vlms-break-client-side-anti-fraud": {
    en: { title: "What VLM agents change in anti-fraud — Tom Kristian Abel", description: "Fifteen years of bot detection assumes automation must forge what a real browser produces. A VLM driving a stock browser forges nothing inside it." },
    et: { title: "Mida VLM-agendid pettusetõrjes muudavad — Tom Kristian Abel", description: "Viisteist aastat robotituvastust eeldab, et automaatika peab matkima seda, mida päris brauser tekitab. Muutmata brauserit juhtiv VLM ei võltsi selles midagi." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "How client-side anti-fraud actually works, and what VLM agents change", abstract: "Fifteen years of bot detection assumes an automated client must forge something a real browser produces naturally. A vision-language model driving a stock browser forges nothing inside it. The five defensive paradigms, how much of each survives operator synthesis, measurements from a small testbed, and the attestation centralization problem." },
      et: { headline: "Kuidas kliendipoolne pettusetõrje tegelikult töötab ja mida muudavad visuaal-keelemudelil põhinevad agendid", abstract: "Viisteist aastat robotituvastust eeldab, et automaatne klient peab matkima midagi, mida päris brauser tekitab loomulikult. Visuaal-keelemudel, mis juhib muutmata brauserit, ei võltsi selle sees midagi. Viis kaitseparadigmat, kui palju igaühest operaatori sünteesi üle elab, väikese katsekeskkonna mõõtmised ja atesteerimise tsentraliseerimise probleem." },
    },
  },
  "/disclosures/nine-dimensions-of-zero-trust": {
    en: { title: "The Nine Dimensions of Zero Trust — Tom Kristian Abel", description: "Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, and posture." },
    et: { title: "Nullusalduse üheksa mõõdet — Tom Kristian Abel", description: "Nullusaldus ei ole küpsusmudel, vaid üheksamõõtmeline konfiguratsiooniruum: usaldusankur, identiteet, jõustamine, atesteerimine, reageerimine ja seisund." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "The Nine Dimensions of Zero Trust", abstract: "Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, policy distribution, observability, posture and human continuity. A walkthrough of the morphological matrix and how to read an organization real position on it." },
      et: { headline: "Nullusalduse üheksa mõõdet", abstract: "Nullusaldus ei ole küpsusmudel, vaid üheksamõõtmeline konfiguratsiooniruum: usaldusankur, identiteet, jõustamine, atesteerimine, reageerimine, poliitika levitamine, jälgitavus, seisund ja inimlik järjepidevus. Ülevaade morfoloogilisest maatriksist ja sellest, kuidas lugeda organisatsiooni tegelikku asukohta selles." },
    },
  },
  "/disclosures/the-fortune-500-illusion-of-control": {
    en: { title: "The Fortune 500 Illusion of Control — Tom Kristian Abel", description: "A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the biggest budget, from a stolen session cookie to full exfiltration." },
    et: { title: "Fortune 500 kontrolliillusioon — Tom Kristian Abel", description: "Raamistiku Zero-Trust Octagon arhetüübi B rünnakuteekond suurima eelarvega ettevõtte näitel: varastatud seansiküpsisest kuni andmebaasi täieliku väljavõtteni." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "The Fortune 500 Illusion of Control", abstract: "A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the largest security budget, the most tooling and the most attestations, taken from a stolen session cookie to full database exfiltration in twenty minutes." },
      et: { headline: "Fortune 500 kontrolliillusioon", abstract: "Raamistiku Zero-Trust Octagon arhetüübi B täielik rünnakuteekond: suurima turbe-eelarve, kõige rohkemate tööriistade ja vastavustunnistustega ettevõte, varastatud seansiküpsisest kuni täieliku andmebaasi väljavõtteni kahekümne minutiga." },
    },
  },
  "/disclosures/move-fast-fix-it-in-prod": {
    en: { title: "Move Fast, Fix It In Prod — Tom Kristian Abel", description: "A composite supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a malicious dependency reaches production with a valid identity." },
    et: { title: "Liigu kiiresti, paranda toodangus — Tom Kristian Abel", description: "Kiirusele optimeeritud idufirma (arhetüüp C) üldistatud tarneahela ja CI/CD rünnakuteekond: pahatahtlik sõltuvus jõuab toodangusse kehtiva identiteediga." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype", abstract: "A composite supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a malicious dependency robs the CI pipeline, passes the only verification gate the architecture has, and reaches production with a valid workload identity. An analytical model, not a real incident." },
      et: { headline: "Liigu kiiresti, paranda toodangus: idufirma arhetüübi täielik rünnaku jälg", abstract: "Kiirusele optimeeritud idufirma (arhetüüp C) üldistatud tarneahela ja CI/CD rünnakuteekond: pahatahtlik sõltuvus röövib CI-konveieri, läbib ainsa kontrollpunkti, mis arhitektuuril on, ja jõuab toodangusse kehtiva töökoormuse identiteediga. Analüütiline mudel, mitte tegelik intsident." },
    },
  },
  "/disclosures/saas-glued-lean-defense": {
    en: { title: "SaaS-Glued Lean Defense — Tom Kristian Abel", description: "A composite breach trace of the small-team SaaS architecture: MFA fatigue to session theft, and six fixes one operator can start in an afternoon." },
    et: { title: "SaaS-i külge liimitud lahja kaitse — Tom Kristian Abel", description: "Väikese meeskonna SaaS-arhitektuuri üldistatud rünnakujälg: MFA-väsitusründest seansivarguseni ja kuus parandust, mida üks inimene saab kohe alustada." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D", abstract: "A composite, step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, the SaaS blind spot an identity-aware proxy never covers, the OAuth grant cascade, and six fixes one operator can start in an afternoon." },
      et: { headline: "SaaS-i külge liimitud lahja kaitse: arhetüübi D täielik rünnakujälg", abstract: "Väikese meeskonna SaaS-arhitektuuri üldistatud rünnakujälg samm-sammult: MFA väsitusründest seansivarguseni, SaaS-i pimeala, mida identiteediteadlik proksi ei kata, OAuth-volituste kaskaad ja kuus parandust, mida üks inimene saab ühe pärastlõunaga alustada." },
    },
  },
  "/disclosures/identity-is-the-root-proof-is-the-gate": {
    en: { title: "Identity Is the Root. Proof Is the Gate. — Tom Kristian Abel", description: "Every zero-trust control is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On what authenticated really means." },
    et: { title: "Identiteet on juur. Tõend on värav. — Tom Kristian Abel", description: "Iga kontroll nullusaldusarhitektuuris sõltub identiteedist, seega seab väravas nõutud tõend lae kõigele selle kohal. Mida „autenditud“ tegelikult tähendab." },
    ld: {
      type: "ScholarlyArticle",
      datePublished: "2026-09-22",
      dateModified: "2026-10-04",
      en: { headline: "Identity Is the Root. Proof Is the Gate.", abstract: "Every control in a zero-trust architecture is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On authentication events versus continuous proof, the six distinct claims people call authenticated, and why phishing-resistant credentials are necessary but not sufficient." },
      et: { headline: "Identiteet on juur. Tõend on värav.", abstract: "Iga kontroll nullusaldusarhitektuuris asub identiteedist allavoolu, seega seab väravas nõutud tõend lae kõigele selle kohal. Autentimissündmused versus pidev tõendamine, kuus erinevat väidet, mida nimetatakse autendituks, ja miks õngitsuskindlad mandaadid on vajalikud, kuid mitte piisavad." },
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
    et: { title: "Turvauuringute poliitika — ProksiAbel OÜ", description: "Kuidas me turvauuringuid teeme: reeglid, avalikustamisprotsess ja kuidas meiega ühendust võtta." },
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
  en: ['Home', 'Research'],
  et: ['Avaleht', 'Uuringud'],
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
        ...(ld.dateModified && { dateModified: ld.dateModified }),
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
