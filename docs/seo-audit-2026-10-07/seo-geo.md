# SEO / GEO audit — tomabel.ee — 2026-10-07

Scope: all 28 URLs in `https://tomabel.ee/sitemap.xml`, live `robots.txt`, `llms.txt`, and the
prerendered shells in `pub/` (verified identical to live for `/`: same `<title>`, `lang="en"`).
Sources read: `pub/**/index.html`, `src/content/route-meta.ts`, `src/content/site.ts`,
`scripts/spa-routes.mjs`, `src/i18n/LanguageContext.tsx`, `worker/index.js`,
`docs/i18n-locale-urls-plan.md`, `docs/agent-readiness-plan.md`.

## 1. Scorecard

| Area | Status | Note |
| --- | --- | --- |
| Title / description per route | OK | 28/28 unique, self-canonical, 25–61 char titles, 31–160 char descriptions. Build gate enforces it. |
| Open Graph / Twitter | OK (weak) | 5 OG + 5 Twitter tags on every page; one shared `og-image.png`, no `og:locale`, no `article:published_time`. |
| JSON-LD | Partial | Person + Organization + WebSite sitewide; ScholarlyArticle/BlogPosting + BreadcrumbList on 19 articles; AboutPage on `/my-story`. No `@id` linking, no `publisher`/`image`/`mainEntityOfPage` on articles, no FAQPage, no ProfilePage, no CollectionPage. |
| Content in HTML (no-JS) | OK | 1,100–5,600 words per article in the prerendered shell. |
| robots.txt / AI crawlers | OK | `*` plus 11 named AI bots allowed, Content-Signal `search=yes, ai-input=yes, ai-train=yes`, sitemap declared. |
| llms.txt | OK | Present, well-written index with one-line abstracts. No `llms-full.txt`. |
| Estonian | Missing from the index | 31 `et` meta entries and 8 bilingual article bodies exist in source, but **zero Estonian text is in any prerendered HTML** (`grep turvauurija pub/ -r` = 0). Estonian is reachable only after hydration via `localStorage`/`navigator.languages`. No `/et/` URLs, no `hreflang`, `<html lang="en">` everywhere. |
| Entity consistency | Weak | Person `worksFor` = MatX; Organization = ProksiAbel OÜ; `/disclosure` page branded "ProksiAbel OÜ"; `security.txt` points to `proksiabel.ee` (Canonical, Policy, Contact, Encryption). Three identities, no `@id` graph tying them together. |
| Freshness signals | Suspicious | 19/19 articles carry `dateModified: 2026-10-04`. A uniform bump reads as a template change, not a revision; Google and Perplexity discount it. |
| Images | None | 0 `<img>` on any page. No per-article OG image, no diagrams → nothing for image search, weaker social CTR. |
| Verification / indexing | Unknown | No `google-site-verification`/`msvalidate` meta, no IndexNow key file. Cannot confirm Bing coverage (Copilot and Claude/Brave depend on it). |

## 2. Keyword and intent fit

The site answers two distinct intents and currently targets only the second one well.

### 2.1 Who searches, what they type

| Intent | EN queries | ET queries | Current best page | Fit |
| --- | --- | --- | --- | --- |
| Hire / consult | `offensive security consultant Estonia`, `penetration testing Estonia`, `security researcher Tallinn`, `authentication security audit` | `turvatestimine`, `läbistustestimine`, `pentest Eesti`, `küberturbe konsultant`, `turvaaudit`, `IT-turvalisuse ekspert` | `/` , `/systems/` | Poor. Neither page says "consultant", "audit", "pentest" or names a service. No Estonian URL at all. |
| Smart-ID / eID research | `Smart-ID vulnerability`, `Smart-ID relay attack`, `Smart-ID QR phishing`, `eIDAS remote QSCD AI agent` | `Smart-ID turvaauk`, `Smart-ID haavatavus`, `Smart-ID petuskeem`, `Smart-ID QR-kood pettus` | `/disclosures/smart-id-achilles-heel/`, `/the-pin-that-cannot-be-delegated/`, `/the-fix-that-doesnt-need-sk/` | Good in EN. ET body exists for the Achilles' heel page but is not indexable. This is the highest-value Estonian-language cluster on the site: Estonian press and RIA/TTJA readers search in Estonian. |
| BotGuard / anti-bot RE | `BotGuard reverse engineering`, `Google BotGuard VM`, `client-side anti-fraud bypass`, `PACT Cloudflare tokens` | — (English-only niche) | `/botguard-disassembled/`, `/pact-software-anchor-turn/`, `/why-vlms-break-client-side-anti-fraud/` | Good. Low competition; already the long-form reference. |
| Zero trust framework | `zero trust architecture framework`, `zero trust dimensions`, `zero trust breach scenario` | `nullusaldus`, `zero trust arhitektuur` | `/zero-trust-octagon/` + 5 archetype pages | OK. Hub page exists; archetype pages should link up to it in body and breadcrumb (they do in breadcrumb). |
| Estonia fraud landscape | `cyber fraud Estonia statistics`, `Estonia phishing 2025 losses` | `küberpettused Eesti 2025`, `pettuste statistika Eesti`, `telefonipettus Eesti` | `/the-evolution-of-cyber-fraud-in-estonia/` | Good EN; ET body exists in source, not indexable. |
| Person / brand | `Tom Kristian Abel`, `Tom Abel security` | `Tom Kristian Abel`, `Tom Abel häkker` | `/`, `/about/`, `/my-story/` | OK. |

### 2.2 Concrete fixes

1. **Home `<title>`/description** currently repeat each other word-for-word
   (`route-meta.ts` line 29). Replace description with intent words:
   - en: `Security researcher and systems architect in Estonia. Smart-ID / eIDAS vulnerability research, anti-fraud VM teardowns (BotGuard), zero-trust architecture, and authentication security reviews for teams that ship.`
   - et: `Turvauurija ja süsteemiarhitekt Eestist. Smart-ID / eIDAS turvauuringud, pettusevastaste süsteemide pöördprojekteerimine, nullusalduse arhitektuur ja autentimise turvaauditid.`
2. **`/systems/` title** `Systems — Tom Kristian Abel` carries no query term. Use
   `Shipped systems: TLS-fingerprinting proxy, media pipeline, RAG — Tom Kristian Abel` (en) /
   `Ehitatud süsteemid: TLS-sõrmejäljeproksi, meediatoru, RAG — Tom Kristian Abel` (et).
3. **`/disclosures/` title** `Research — ...` → `Security research: Smart-ID, BotGuard, zero trust — Tom Kristian Abel`.
4. **No services page.** Hire-intent queries have nowhere to land. Either a short
   "Work with me" section on `/about/` with explicit nouns (authentication review, protocol
   analysis, reverse-engineering engagement, expert opinion for Estonian regulators/press)
   or a `/work/` route. Without it, "consultant" ranking is impossible regardless of schema.
5. **Estonian visibility** is blocked by architecture, not copy. The `/et/` plan in
   `docs/i18n-locale-urls-plan.md` (decisions confirmed 2026-09-23) is the fix; everything
   below in §4 assumes it ships. Until then Estonian meta in `route-meta.ts` is dead weight
   for search.
6. **Internal anchors.** Archetype pages mention "Zero-Trust Octagon" in the description but
   the first in-body link to the hub should use the exact phrase as anchor text; check that
   each of the 5 archetype pages and `/nine-dimensions-of-zero-trust/` links to
   `/zero-trust-octagon/` within the first screen.

## 3. Meta tags

Per-page template already correct; add these, all derivable from `route-meta.ts` in
`scripts/spa-routes.mjs` (no new data needed):

```html
<meta property="og:site_name" content="tomabel.ee" />
<meta property="og:locale" content="en_GB" />
<!-- when ld exists -->
<meta property="article:published_time" content="2026-08-11" />
<meta property="article:modified_time" content="2026-10-04" />
<meta property="article:author" content="https://tomabel.ee/about/" />
<!-- Markdown alternate so agents discover the Worker's text/markdown without probing -->
<link rel="alternate" type="text/markdown" href="https://tomabel.ee/disclosures/smart-id-achilles-heel/" />
<!-- once /et/ ships -->
<link rel="alternate" hreflang="en" href="https://tomabel.ee/disclosures/smart-id-achilles-heel/" />
<link rel="alternate" hreflang="et" href="https://tomabel.ee/et/disclosures/smart-id-achilles-heel/" />
<link rel="alternate" hreflang="x-default" href="https://tomabel.ee/disclosures/smart-id-achilles-heel/" />
```

Per-article OG images: a 1200×630 template (title + eyebrow on the dark token palette)
generated at build is enough; `og:image` is the only thing LinkedIn shows, and LinkedIn is the
main referral surface for this audience. Add `og:image:width`/`height`/`alt`.

Drop nothing. `theme-color`, viewport, canonical, sitemap link are all right. `noindex` on the
`/cookies` redirect stub and on `404.html` is correct.

## 4. JSON-LD — ready-to-paste

Principles applied: one `@id` per entity so Person, Organization, WebSite and every article
resolve to the same node; `publisher` on articles (required for Article rich results and used
by Perplexity/ChatGPT for source attribution); `inLanguage` per locale; no invented facts
(everything below comes from existing site content).

### 4.1 Sitewide graph (replaces the three separate blocks in `index.html`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tomabel.ee/#person",
      "name": "Tom Kristian Abel",
      "url": "https://tomabel.ee/",
      "image": "https://tomabel.ee/og-image.png",
      "jobTitle": "Security Researcher & Systems Architect",
      "description": "Security researcher and systems architect. Reverse engineers how authentication and browser defenses fail, then designs the systems that survive what he finds.",
      "email": "tom@tomabel.ee",
      "nationality": { "@type": "Country", "name": "Estonia" },
      "homeLocation": { "@type": "Country", "name": "Estonia" },
      "knowsLanguage": ["et", "en"],
      "knowsAbout": [
        { "@type": "Thing", "name": "Smart-ID", "sameAs": "https://en.wikipedia.org/wiki/Smart-ID" },
        { "@type": "Thing", "name": "eIDAS", "sameAs": "https://en.wikipedia.org/wiki/EIDAS" },
        { "@type": "Thing", "name": "WebAuthn", "sameAs": "https://en.wikipedia.org/wiki/WebAuthn" },
        { "@type": "Thing", "name": "FIDO2", "sameAs": "https://en.wikipedia.org/wiki/FIDO_Alliance" },
        { "@type": "Thing", "name": "Zero trust architecture", "sameAs": "https://en.wikipedia.org/wiki/Zero_trust_architecture" },
        { "@type": "Thing", "name": "Reverse engineering", "sameAs": "https://en.wikipedia.org/wiki/Reverse_engineering" },
        { "@type": "Thing", "name": "TLS fingerprinting", "sameAs": "https://en.wikipedia.org/wiki/JA3_(fingerprint)" },
        "Google BotGuard",
        "Client-side anti-fraud",
        "Coordinated vulnerability disclosure"
      ],
      "affiliation": { "@id": "https://tomabel.ee/#org" },
      "worksFor": { "@type": "Organization", "name": "MatX" },
      "sameAs": [
        "https://github.com/tomkabel",
        "https://www.linkedin.com/in/hr-abel"
      ],
      "mainEntityOfPage": "https://tomabel.ee/about/"
    },
    {
      "@type": "Organization",
      "@id": "https://tomabel.ee/#org",
      "name": "ProksiAbel OÜ",
      "url": "https://tomabel.ee/",
      "logo": "https://tomabel.ee/favicon.svg",
      "email": "tom@tomabel.ee",
      "telephone": "+37256666981",
      "founder": { "@id": "https://tomabel.ee/#person" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pargi tn 2, Sindi",
        "addressLocality": "Tori vald",
        "addressRegion": "Pärnumaa",
        "postalCode": "86705",
        "addressCountry": "EE"
      },
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "Estonian Business Registry Code",
        "value": "17017826"
      },
      "areaServed": ["EE", "EU"],
      "knowsLanguage": ["et", "en"]
    },
    {
      "@type": "WebSite",
      "@id": "https://tomabel.ee/#website",
      "name": "tomabel.ee",
      "url": "https://tomabel.ee/",
      "inLanguage": ["en", "et"],
      "publisher": { "@id": "https://tomabel.ee/#org" },
      "author": { "@id": "https://tomabel.ee/#person" }
    }
  ]
}
```

Decide once whether `jobTitle` is "Lead Systems Architect & CTO" (current, employer-facing)
or "Security Researcher & Systems Architect" (what the `<title>` says). They must match;
AI engines flag the mismatch as low-confidence entity data.

### 4.2 Article node (pattern for `jsonLdFor` in `route-meta.ts` / `spa-routes.mjs`)

Shown for `/disclosures/smart-id-achilles-heel/`. Changes vs. current: `@id`, `publisher`,
`author` by reference, `mainEntityOfPage`, `image`, `wordCount`, `isAccessibleForFree`,
`about`, `keywords`, `license` (if you want it), and the breadcrumb kept.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id": "https://tomabel.ee/disclosures/smart-id-achilles-heel/#article",
      "headline": "The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
      "alternativeHeadline": "Why Smart-ID resists MITM by design and fails at the approval layer",
      "description": "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows.",
      "url": "https://tomabel.ee/disclosures/smart-id-achilles-heel/",
      "mainEntityOfPage": "https://tomabel.ee/disclosures/smart-id-achilles-heel/",
      "image": "https://tomabel.ee/og/smart-id-achilles-heel.png",
      "datePublished": "2026-08-11",
      "dateModified": "2026-10-04",
      "author": { "@id": "https://tomabel.ee/#person" },
      "publisher": { "@id": "https://tomabel.ee/#org" },
      "isPartOf": { "@id": "https://tomabel.ee/#website" },
      "inLanguage": "en",
      "wordCount": 4600,
      "isAccessibleForFree": true,
      "about": [
        { "@type": "Thing", "name": "Smart-ID", "sameAs": "https://en.wikipedia.org/wiki/Smart-ID" },
        { "@type": "Thing", "name": "eIDAS", "sameAs": "https://en.wikipedia.org/wiki/EIDAS" },
        { "@type": "Organization", "name": "SK ID Solutions", "url": "https://www.skidsolutions.eu/" }
      ],
      "keywords": ["Smart-ID", "eID", "signing relay", "cross-device QR", "eIDAS", "coordinated disclosure", "Estonia"],
      "citation": [
        "https://www.skidsolutions.eu/",
        "https://www.ria.ee/"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tomabel.ee/" },
        { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://tomabel.ee/disclosures/" },
        { "@type": "ListItem", "position": 3, "name": "The Achilles' heel of Estonia's e-state", "item": "https://tomabel.ee/disclosures/smart-id-achilles-heel/" }
      ]
    }
  ]
}
```

`wordCount` is computable in `spa-routes.mjs` from the rendered body; `citation` only where
the article already links the source. When `/et/` ships, the `/et/` shell emits the same node
with `"@id": ".../et/disclosures/smart-id-achilles-heel/#article"`, `inLanguage: "et"`, the
`et.headline`/`et.abstract` already in `route-meta.ts`, and `translationOfWork` pointing at the
English `@id`; the English node gets `workTranslation` back.

### 4.3 FAQPage — Smart-ID cluster (highest AI-citation value)

Put on `/disclosures/smart-id-achilles-heel/` **only if the questions and answers also appear
as visible text** (Google requires it; a short "Questions this research answers" block at the
end is enough). Answers are from the article's own claims; keep them one paragraph.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://tomabel.ee/disclosures/smart-id-achilles-heel/#faq",
  "inLanguage": "en",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can Smart-ID be intercepted with a man-in-the-middle attack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Smart-ID's split-key signing and server-side verification mean a MITM between the relying party and SK cannot produce a valid signature, and replacing the endpoint fails by design. The weakness is not the cryptography but the approval layer: what the user is shown and asked to approve."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Smart-ID signing-relay attack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An interactive attack against Smart-ID+ cross-device QR flows: the attacker starts a legitimate session with a bank or service, relays the QR or verification code to the victim in real time, and the victim approves a transaction they believe is their own. It was reported to SK ID Solutions in November 2025 and to RIA, TTJA and AKI in April 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Can banks mitigate the Smart-ID relay without a change from SK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A session-history check on the relying-party side, which PSD2 RTS Article 2 already requires for transaction monitoring, detects most relay attempts. The approach, its prior art (Paršovs, LHV) and its limits are described in 'The fix that doesn't need SK'."
      }
    },
    {
      "@type": "Question",
      "name": "Can an AI agent enter a Smart-ID PIN on my behalf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. SK's terms of use, the remote-QSCD certification practice statement and eIDAS Articles 26 and 32 require the PIN to be entered by the signatory personally. Delegation needs an OAuth-style pattern where the agent acts under a scoped grant, not the user's qualified signature."
      }
    }
  ]
}
```

Estonian version (same block with `inLanguage: "et"`) for the `/et/` shell:
`Kas Smart-ID-d saab vahelt lugeda (MITM)?` / `Mis on Smart-ID allkirjastamise edastusrünne (signing relay)?` /
`Kas pank saab relay-rünnet tõrjuda ilma SK muudatuseta?` / `Kas tehisintellekti agent tohib minu Smart-ID PIN-i sisestada?`

### 4.4 ProfilePage — `/about/` (and `/my-story/` already has AboutPage)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://tomabel.ee/about/#profile",
  "url": "https://tomabel.ee/about/",
  "dateModified": "2026-10-04",
  "inLanguage": "en",
  "mainEntity": { "@id": "https://tomabel.ee/#person" },
  "isPartOf": { "@id": "https://tomabel.ee/#website" }
}
```

### 4.5 CollectionPage — `/disclosures/`

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://tomabel.ee/disclosures/#collection",
  "url": "https://tomabel.ee/disclosures/",
  "name": "Security research by Tom Kristian Abel",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://tomabel.ee/#website" },
  "author": { "@id": "https://tomabel.ee/#person" },
  "hasPart": [
    { "@id": "https://tomabel.ee/disclosures/smart-id-achilles-heel/#article" },
    { "@id": "https://tomabel.ee/disclosures/botguard-disassembled/#article" },
    { "@id": "https://tomabel.ee/disclosures/zero-trust-octagon/#article" }
  ]
}
```

Generate `hasPart` from `routeMeta` entries that have `ld` — it is one `Object.entries` filter
in `spa-routes.mjs`.

### 4.6 SoftwareSourceCode — `/systems/` (one node per shipped system)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": "https://tomabel.ee/systems/#fingerprintproxy",
  "name": "fingerprintproxy",
  "description": "Production Go TLS-fingerprinting proxy with 65+ browser profiles and JA3/JA4 emulation.",
  "programmingLanguage": "Go",
  "codeRepository": "https://github.com/tomkabel/fingerprintproxy",
  "author": { "@id": "https://tomabel.ee/#person" },
  "keywords": ["TLS fingerprinting", "JA3", "JA4", "uTLS", "proxy"]
}
```

Fill `codeRepository` only with real public URLs; omit the property for private systems.

## 5. AI-engine visibility (GEO)

What already works: AI bots allowed with explicit Content-Signal; full article text in HTML;
`llms.txt` with abstracts; Worker does `Accept: text/markdown` negotiation and sends
`Link: rel="describedby"` to `llms.txt` (per `worker/index.js`; not re-verified over the wire
in this audit because the CLI cannot set request headers — confirm with the `curl -sI -H
'Accept: text/markdown'` check from `docs/agent-readiness-plan.md` §Order).

Gaps, by impact:

1. **`llms-full.txt` is missing.** Perplexity, Claude and ChatGPT browsing fetch a single file
   when they can. `scripts/spa-routes.mjs` already has the rendered text per route; emit the
   concatenation (title, URL, date, body as plain text, `---` separators) to
   `pub/llms-full.txt` and link it from `llms.txt` line 3.
2. **Uniform `dateModified: 2026-10-04` on all 19 articles.** Set `dateModified` only when
   the body text changed (the `canonical-text.mjs` hash exists for exactly this: compare the
   content hash at build time and keep the previous date when unchanged).
3. **Entity confusion.** Person works for MatX, site is published by ProksiAbel OÜ, the
   disclosure policy is branded ProksiAbel OÜ, and `.well-known/security.txt` points every
   field at `proksiabel.ee`. Pick one story and state it in one sentence on `/about/`
   ("ProksiAbel OÜ is the company through which I publish and consult; by day I am ... at
   MatX") and put it in `Person.description`. Update `security.txt` to `tomabel.ee` URLs or
   make sure the `proksiabel.ee` targets resolve and agree.
4. **Answer-first openers.** Articles open with a narrative paragraph. Add a 2–3 sentence
   "In short" block under the H1 (visible, not collapsed) that states the finding, the date,
   the vendor and the disclosure status. This is the passage LLMs quote. The Smart-ID and
   BotGuard pages are the priority.
5. **Statistics and citations density.** The fraud and Smart-ID pages already cite RIA, PPA,
   Eesti Pank, SEB figures: good. The archetype breach traces are composites with almost no
   numbers: add one table per page (step, time, control that should have fired) so a model
   can extract a structured answer.
6. **Bing / Copilot / Claude.** Claude and Copilot do not use Google's index. Submit the
   sitemap in Bing Webmaster Tools and drop an IndexNow key at `pub/<key>.txt`; a 28-URL
   site can ping IndexNow from the GitHub Pages workflow after each deploy.
7. **Estonian answers.** Estonian prompts to ChatGPT/Perplexity about Smart-ID fraud today
   land on ERR, Delfi and RIA. The `/et/` shells (with `inLanguage: "et"` JSON-LD and the
   Estonian FAQ) are the only way this site gets cited in Estonian; the bilingual bodies for
   8 articles already exist in `src/pages/`.
8. **PDF**. Perplexity weights PDFs. A `pub/papers/smart-id-achilles-heel.pdf` (print-to-PDF
   of the prerendered page is enough) linked with `rel="alternate" type="application/pdf"`
   and listed in the sitemap is cheap and gives the Smart-ID research a second citable
   surface, which also helps when press or RIA want a stable document to reference.

## 6. Prioritised actions

| # | Action | Where | Effort | Why |
| --- | --- | --- | --- | --- |
| 1 | Ship `/et/` locale URLs + hreflang per `docs/i18n-locale-urls-plan.md` | plan PR-1/PR-2 | 2–3 d | Unlocks every Estonian query; everything else in ET depends on it |
| 2 | Sitewide `@graph` with `@id`s; articles get `publisher`, `mainEntityOfPage`, `image`, `wordCount`; fix `jobTitle` mismatch | `index.html`, `route-meta.ts`, `spa-routes.mjs` | 2 h | Entity resolution for Google Knowledge Panel and AI attribution |
| 3 | Stop uniform `dateModified` bumps; derive from content hash | `spa-routes.mjs` + `canonical-text.mjs` | 1 h | Freshness credibility |
| 4 | `llms-full.txt` + `<link rel="alternate" type="text/markdown">` | `spa-routes.mjs`, `llms.txt` | 1 h | AI retrieval in one fetch |
| 5 | Home/systems/disclosures titles and descriptions with intent words (§2.2) | `route-meta.ts` | 30 min | CTR and hire-intent queries |
| 6 | "In short" answer block + FAQ section (visible) + FAQPage JSON-LD on Smart-ID page, then BotGuard | 2 page files + `route-meta.ts` | 2 h | Highest-citation passages |
| 7 | Per-article OG image template | build script | 2 h | LinkedIn CTR, image search |
| 8 | Bing Webmaster + IndexNow key + ping from deploy workflow | `.github/workflows/static.yml`, `public/` | 30 min | Copilot and Claude visibility |
| 9 | Reconcile `security.txt` / ProksiAbel / MatX identity on `/about/` | `public/.well-known/security.txt`, `AboutPage.tsx` | 30 min | Trust and entity consistency |
| 10 | Services copy on `/about/` or a `/work/` route | new section | half day | Only way to rank for consultant/pentest queries |

## 7. Validation after changes

- `https://validator.schema.org/?url=https%3A%2F%2Ftomabel.ee%2Fdisclosures%2Fsmart-id-achilles-heel%2F`
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Ftomabel.ee%2Fdisclosures%2Fsmart-id-achilles-heel%2F`
- `curl -sI -H 'Accept: text/markdown' https://tomabel.ee/` → `content-type: text/markdown`, `vary: accept`
- `site:tomabel.ee` on Google and Bing; expect 28 (then 28 + N `/et/` URLs)
- After `/et/`: Search Console → International targeting shows no hreflang errors; each pair reciprocal.
