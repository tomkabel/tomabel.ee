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
    rss: '/writing.xml',
  },
  disclaimer: {
    en: 'ProksiAbel OÜ maintains strict client confidentiality. I, personally, am publicly accountable for my research and opinions.',
    et: 'ProksiAbel OÜ säilitab ranget kliendikonfidentsiaalsust. Mina isiklikult vastutan avalikult oma uuringute ja arvamuste eest.',
  },
  languages: {
    en: 'Estonia-based. I write in English and Estonian.',
    et: 'Eestis baseeruv. Kirjutan inglise ja eesti keeles.',
  },
};

// ─── Featured work (homepage cards) ──────────────────────────────────────────

export type FeaturedWork = {
  code: string;
  title: { en: string; et: string };
  blurb: { en: string; et: string };
  tags: string[];
  href: string;
  cta: { en: string; et: string };
};

export const featuredWork: FeaturedWork[] = [
  {
    code: 'REV-ENG-01',
    title: {
      en: 'BotGuard, disassembled',
      et: 'BotGuard, lahti võetud',
    },
    blurb: {
      en: "Opcode-level reverse engineering of Google's VM-based anti-fraud system — anti-debug mechanisms, token portability, the works.",
      et: "Google'i VM-põhise pettusevastase süsteemi opkooditasemel pöördprojekteerimine — anti-debug mehhanismid, tokenite ülekantavus, kõik.",
    },
    tags: ['Reverse Engineering', 'Anti-Fraud VM'],
    href: '/research',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    code: 'ID-EID-02',
    title: {
      en: 'Smart-ID / eID research',
      et: 'Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol vulnerability research on Estonia's national authentication stack, with coordinated disclosure to RIA and CERT-EE.",
      et: 'Protokolli haavatavuste uuringud Eesti riikliku autentimise taristu kohta, koordineeritud avalikustamisega RIA-le ja CERT-EE-le.',
    },
    tags: ['eIDAS', 'Coordinated Disclosure'],
    href: '/research',
    cta: { en: 'Read', et: 'Loe' },
  },
  {
    code: 'TOOL-03',
    title: {
      en: 'fingerprintproxy',
      et: 'fingerprintproxy',
    },
    blurb: {
      en: 'Production Go TLS-fingerprinting proxy. 65+ browser profiles, JA3/JA4, MITM support, clean API.',
      et: 'Tootmisvalmis Go TLS-sõrmejäljeproksi. 65+ brauseriprofiili, JA3/JA4, MITM tugi, puhas API.',
    },
    tags: ['Go', 'TLS / JA4'],
    href: '/projects',
    cta: { en: 'View on GitHub', et: 'Vaata GitHubis' },
  },
  {
    code: 'ARCH-04',
    title: {
      en: 'Zero-Trust Octagon',
      et: 'Zero-Trust Octagon',
    },
    blurb: {
      en: 'A zero-trust architecture framework built from first principles — 8 axioms, a 9-dimension morphological matrix, archetypal breach analysis.',
      et: 'Null-usalduse arhitektuuri raamistik, ehitatud esimestest põhimõtetest — 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks, arhetüüpne rikkumiste analüüs.',
    },
    tags: ['Architecture', 'Zero Trust'],
    href: '/research',
    cta: { en: 'Read', et: 'Loe' },
  },
];

// ─── Research entries ────────────────────────────────────────────────────────

export type ResearchEntry = {
  code: string;
  title: { en: string; et: string };
  blurb: { en: string; et: string };
  keywords?: string;
  type: { en: string; et: string };
};

export const researchEntries: ResearchEntry[] = [
  {
    code: 'R-01',
    title: {
      en: "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
      et: "BotGuard, lahti võetud — Google'i pettusevastase VM-i pöördprojekteerimine",
    },
    blurb: {
      en: "A deep, opcode-level teardown of Google's BotGuard: the bytecode VM, its anti-debugging and obfuscation layers, and a token-portability weakness. Builds on Cypa's VM analysis and LuanRT's PO-token research. If you've ever wondered what \"client-side trust\" is really worth, start here.",
      et: "Põhjalik opkooditasemel analüüs Google'i BotGuardist: baitkoodi VM, selle anti-debug ja obfuskeerimiskihid ning tokenite ülekantavuse nõrkus. Ehitab Cypa VM-analüüsi ja LuanRT PO-tokeni uurimistöö peale. Kui oled kunagi mõelnud, mida \"kliendipoolne usaldus\" tegelikult väärt on, alusta siit.",
    },
    keywords: 'browser automation, CDP, VM analysis, anti-fraud, client-side security',
    type: { en: 'Technical Teardown', et: 'Tehniline Analüüs' },
  },
  {
    code: 'R-02',
    title: {
      en: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
      et: 'Eesti e-riigi Achilleuse kand — Smart-ID / eID uuringud',
    },
    blurb: {
      en: "Protocol-level analysis of the authentication ecosystem that 1.4M+ Estonians, Latvians, and Lithuanians use every day. Covers the threat model, an interactive signing-relay class of attack, and the regulatory picture (eIDAS, GDPR, NIS2). Disclosed to RIA / CERT-EE before publication. Names the gaps; proposes the fixes.",
      et: 'Protokollitasemel analüüs autentimise ökosüsteemist, mida 1,4M+ eestlast, lätlast ja leedukat iga päev kasutavad. Hõlmab ohumudelit, interaktiivset allkirjastamise relay-rünnete klassi ja regulatiivset pilti (eIDAS, GDPR, NIS2). Avalikustatud RIA-le / CERT-EE-le enne avaldamist. Nimetab lüngad; pakub parandused.',
    },
    type: { en: 'Disclosed Research', et: 'Avalikustatud Uuring' },
  },
  {
    code: 'R-03',
    title: {
      en: 'Zero-Trust Octagon — a framework from first principles',
      et: 'Zero-Trust Octagon — raamistik esimestest põhimõtetest',
    },
    blurb: {
      en: "Most \"zero trust\" is a vendor checklist. This is the opposite: 8 axioms, a 9-dimension morphological matrix for reasoning about any architecture, and archetypal breach walkthroughs that show where designs actually fail. Written to be argued with.",
      et: "Enamik \"null-usaldusest\" on müüja kontrollnimekiri. See on vastupidine: 8 aksioomi, 9-dimensiooniline morfoloogiline maatriks mis tahes arhitektuuri üle arutlemiseks ja arhetüüpsed rikkumiste läbimängud, mis näitavad, kus kavandid tegelikult ebaõnnestuvad. Kirjutatud selleks, et selle üle vaieldaks.",
    },
    type: { en: 'Framework', et: 'Raamistik' },
  },
  {
    code: 'R-04',
    title: {
      en: 'The evolution of cyber fraud in Estonia, 2010–2026',
      et: 'Küberpettuste areng Eestis, 2010–2026',
    },
    blurb: {
      en: "An 80-page, heavily cited history of how phishing, vishing, and fraud have evolved in one of the world's most digitized states — through the arrival of AI-assisted attacks and deepfakes, and the regulatory responses that chased them. The reference I wished existed when I started.",
      et: "80-leheküljeline, rohkelt viidatud ajalugu sellest, kuidas õngitsemine, vishing ja pettused on arenenud ühes maailma kõige digiteeritumas riigis — läbi AI-abistatavate rünnakute ja süvavõltsingute saabumise ning regulatiivsete vastuste, mis neid taga ajasid. Viide, mille olemasolu ma oleksin tahtnud, kui alustasin.",
    },
    type: { en: 'Reference Paper', et: 'Viitetöö' },
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export type Project = {
  name: string;
  stack: string;
  blurb: { en: string; et: string };
  href: string;
};

export const projects: Project[] = [
  {
    name: 'fingerprintproxy',
    stack: 'Go · actively maintained',
    blurb: {
      en: 'A production-grade TLS-fingerprinting proxy: 65+ browser profiles, JA3/JA4 emulation, MITM support, and a clean API. The practical companion to the research — this is what understanding TLS fingerprinting looks like in code.',
      et: 'Tootmiskõlblik TLS-sõrmejäljeproksi: 65+ brauseriprofiili, JA3/JA4 emulatsioon, MITM tugi ja puhas API. Praktiline kaaslane uurimistööle — selline näeb TLS-i sõrmejäljetuvastuse mõistmine koodis välja.',
    },
    href: 'https://github.com/tomkabel/fingerprintproxy',
  },
  {
    name: 'Vooglaadija (team21)',
    stack: 'FastAPI · collaborative',
    blurb: {
      en: "A media-extraction service done right: Redis queues, JWT auth, CSRF and rate limiting, Prometheus + OpenTelemetry + Sentry, SSE streaming, an HTMX UI, and a 7-service Docker Compose stack. A reference for what \"FastAPI with proper observability\" actually means.",
      et: 'Meediumi eraldamise teenus tehtud õigesti: Redis järjekorrad, JWT autentimine, CSRF ja kiiruspiirangud, Prometheus + OpenTelemetry + Sentry, SSE voogedastus, HTMX kasutajaliides ja 7-teenuseline Docker Compose pinud. Viide sellele, mida "FastAPI korraliku jälgitavusega" tegelikult tähendab.',
    },
    href: 'https://github.com/tomkabel',
  },
  {
    name: 'Discord RAG pipeline',
    stack: 'retrieval · FastAPI',
    blurb: {
      en: 'A retrieval-augmented pipeline with LanceDB vector search, BM25 hybrid retrieval, RBAC-aware filtering, and LLM synthesis, served over FastAPI with systemd integration and CI. RAG with access control treated as a first-class concern, not an afterthought.',
      et: 'Hankimisega täiendatud torujuhe LanceDB vektorotsinguga, BM25 hübriidotsinguga, RBAC-teadliku filtreerimise ja LLM sünteesiga, serveeritud FastAPI kaudu koos systemd integratsiooni ja CI-ga. RAG koos pääsuhaldusega käsitletud esmatähtsa murena, mitte järelmõttena.',
    },
    href: 'https://github.com/tomkabel',
  },
  {
    name: 'PunanePastakas (valge-marker)',
    stack: 'Flask · PWA',
    blurb: {
      en: 'An AI math-grading assistant: Flask + VLM (OpenAI / Anthropic), offline-first PWA, GDPR-compliant by design. Built for real classrooms, not a demo.',
      et: 'AI matemaatikahindamise assistent: Flask + VLM (OpenAI / Anthropic), offline-first PWA, GDPR-iga kooskõlas disainist alates. Ehitatud päris klassiruumide jaoks, mitte demoks.',
    },
    href: 'https://github.com/tomkabel',
  },
];

// ─── Essays ──────────────────────────────────────────────────────────────────

export type Essay = {
  title: { en: string; et: string };
  blurb: { en: string; et: string };
};

export const essays: Essay[] = [
  {
    title: {
      en: "I used to break authentication. Here's what that taught me about building it.",
      et: 'Kunagi murdsin ma autentimist. Siin on see, mida see mulle selle ehitamise kohta õpetas.',
    },
    blurb: {
      en: 'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the arms race looks like from both sides.',
      et: 'Lõputöö essee kõigele muule sellel saidil: miks ründe mõistmine on usaldusväärse kaitse eeltingimus ja milline näeb võidurelvastumine välja mõlemalt poolt.',
    },
  },
  {
    title: {
      en: 'What client-side trust is actually worth',
      et: 'Mida kliendipoolne usaldus tegelikult väärt on',
    },
    blurb: {
      en: "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
      et: 'BotGuard lahtivõtmine juhtumiuuringuna: struktuurne põhjus, miks iga kaitse, mis jookseb masinal, mida sa ei kontrolli, on läbiräägitav, ja mida sellega teha.',
    },
  },
  {
    title: {
      en: 'The kratt problem',
      et: 'Krati probleem',
    },
    blurb: {
      en: "On offensive capability as a folkloric kratt — tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
      et: 'Ründevõimekusest kui rahvapärimuse kratist — väsimatu, kuni tal on suund, ohtlik hetkel, kui seda pole. Lühike lugu eetikast, jõudeolekust ja tööriistade õiges suunas juhtimisest.',
    },
  },
  {
    title: {
      en: 'Coordinated disclosure in a small country',
      et: 'Koordineeritud avalikustamine väikeses riigis',
    },
    blurb: {
      en: "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other — the legal exposure, the incentives, and why owning your own story is the only real protection.",
      et: 'Milline on tegelikult riikliku taristu vea avalikustamine, kui kõik ruumisviibijad tunnevad üksteist — õiguslikud riskid, stiimulid ja miks oma loo omamine on ainus tõeline kaitse.',
    },
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
