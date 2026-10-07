# SERP markup audit — tomabel.ee (2026-10-07)

Scope: all 27 URLs in `https://tomabel.ee/sitemap.xml`. Fetched live via self-hosted Firecrawl (`/v2/scrape`, `rawHtml` = rendered DOM) and cross-checked against the static shells in `pub/`. JSON-LD parsed with `JSON.parse` and the plugin's `schema_lint.py` pre-flight. All values below are **Measured** unless marked otherwise.

## Where the head is generated

| File | Role |
| --- | --- |
| `/home/notroot/Documents/tomabel.ee/index.html` | Base shell: charset, viewport, theme-color, description, canonical, OG, Twitter, three static JSON-LD blocks (Person, Organization, WebSite), `<title>`. Served as-is for `/`. |
| `/home/notroot/Documents/tomabel.ee/src/content/route-meta.ts` | Single source of per-route title/description (en + et), `ld` config (`type`, `datePublished`, `dateModified`, headline, abstract), `metaFor()`, `jsonLdFor()` (Article/ScholarlyArticle + BreadcrumbList `@graph`, or AboutPage). |
| `/home/notroot/Documents/tomabel.ee/scripts/spa-routes.mjs` | `postbuild`: copies `pub/index.html` per route, regex-stamps title/description/canonical/og:*/twitter:* and appends the per-route JSON-LD `<script>` before `</head>`. Adds `noindex` to `/cookies` and `404.html`. Has canonical and home-title build gates. |
| `/home/notroot/Documents/tomabel.ee/src/components/Seo.tsx` | Runtime: on route/language change rewrites the same tags and injects `<script id="seo-jsonld">`. |
| `/home/notroot/Documents/tomabel.ee/src/content/route-meta.test.ts` | Enforces length limits, en/et parity, `inLanguage` honesty. |

Pipeline is sound: one metadata module, build gates, static per-route shells. Findings below are gaps, not breakage.

## Audit results (27/27 URLs, all HTTP 200)

| Check | Result |
| --- | --- |
| `<title>` | Present and unique on every URL. Lengths 25–63 chars. Home title is 63 (slightly over 60, acceptable). |
| `meta description` | Present and unique. 31–160 chars. Short outliers: `/terms/` (31), `/about/` (83), `/privacy/` (83), `/disclosure/` (82). |
| `rel=canonical` | Exactly one per page, self-referencing, trailing-slash form matches sitemap. |
| `robots` meta | None on indexable pages (correct). `noindex` on `/cookies/` (not in sitemap) and `404.html`. |
| Open Graph | `og:type` (`website` / `article` correct per page), `og:url`, `og:title`, `og:description`, `og:image` (1200x630 PNG, shared) on all pages. Missing on all: `og:site_name`, `og:locale`, `og:image:width/height/alt`, `article:published_time`, `article:modified_time`, `article:author` on article pages. |
| Twitter | `summary_large_image`, title/description/url/image on all. Missing: `twitter:creator`/`twitter:site` (no handle known — N/A unless one exists). |
| `<html lang>` | `en` static everywhere; Estonian only client-side. No `hreflang` (correct: no distinct ET URLs exist, so none should be emitted). |
| JSON-LD validity | All blocks parse. 0 parse errors across 27 pages. |

### JSON-LD inventory

- Every page: `Person`, `Organization` (ProksiAbel OÜ, with address + registry code), `WebSite` — inherited from `index.html`, so the full home-page entity set repeats on all 27 URLs.
- 21 article pages: `@graph[ScholarlyArticle|BlogPosting, BreadcrumbList]` with `headline`, `description`, `url`, `datePublished`, `dateModified`, `author`, `inLanguage`.
- `/my-story/`: `AboutPage` with `name`, `description`, `url`, `datePublished`, `author`, `inLanguage`.
- `/about/`, `/systems/`, `/disclosures/`, `/privacy/`, `/terms/`, `/disclosure/`: no page-specific block.

### Issues found (priority order)

1. **Duplicate article JSON-LD in the rendered DOM (all 22 ld pages).** Static shell has 4 blocks; the rendered DOM has 5 — the article `@graph` appears twice. Cause: `spa-routes.mjs` writes the block without an `id`, and `Seo.tsx` only removes `#seo-jsonld` before re-injecting. Googlebot's render pass sees two identical Article nodes. Fix is one attribute in `scripts/spa-routes.mjs` (see Patch A).
2. **Article nodes lack `image`, `publisher`, `mainEntityOfPage`, and the author has no `@id`/`sameAs`.** Google Article rich results want `image` (recommended, strongly weighted) and `publisher`; the author entity is a loose `Person` not linked to the home-page `Person`. Fix in `jsonLdFor()` (Patch B).
3. **Entities are not linked.** `Person`, `Organization`, `WebSite` have no `@id`; `WebSite.publisher` is an inline copy. `Person` has no `worksFor` link to ProksiAbel OÜ (it says `MatX` — **verify** this is still true and visible on the page; if not, it is unsupported markup). `Organization` lacks `logo`, `sameAs`, `founder` (lint: missing recommended `logo`, `sameAs`). Fix in `index.html` (Patch C).
4. **`/about/` has no `AboutPage` node; `/my-story/` AboutPage has no `mainEntity`.** (Patch D.)
5. **No `og:site_name`, `og:locale`, `article:*` OG tags.** Low cost, helps LinkedIn/Slack/Mastodon previews and date display. (Patch A/C.)
6. **Thin descriptions on `/terms/`, `/about/`, `/privacy/`, `/disclosure/`.** Rewrite in `route-meta.ts` (see "Meta copy").
7. **Shared OG image on every page.** Not an error; per-article images would improve social CTR and satisfy Article `image`. Deferred unless images are produced.

Not issues: FAQ/HowTo absent (Google retired FAQ rich results 2026-05-07; nothing to add). `hreflang` absent is correct for a single-URL bilingual SPA.

## Ready-to-paste blocks

Only facts already visible on the site or in `index.html` are used. `[VERIFY]` marks values that need confirmation before shipping.

### Patch A — `scripts/spa-routes.mjs`

Give the stamped block the id `Seo.tsx` already clears, and add OG article/site tags.

```js
// replace the existing JSON-LD insertion
if (jsonLd) {
  const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
  html = html.replace('</head>', () => `<script type="application/ld+json" id="seo-jsonld">${json}</script>\n    </head>`);
}

// add after the `tags` loop: article OG tags for ld routes
const ld = routeMeta[`/${route}`]?.ld;
if (ld) {
  const og = [
    `<meta property="article:published_time" content="${ld.datePublished}" />`,
    ld.dateModified && `<meta property="article:modified_time" content="${ld.dateModified}" />`,
    `<meta property="article:author" content="https://tomabel.ee/" />`,
  ].filter(Boolean).join('\n    ');
  html = html.replace('</head>', () => `${og}\n    </head>`);
}
```

`og:site_name` and `og:locale` are static — add once to `index.html` (Patch C); every shell inherits them.

### Patch B — `src/content/route-meta.ts` `jsonLdFor()` (Article/BlogPosting template)

```ts
const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const author = { '@type': 'Person', '@id': PERSON_ID, name: 'Tom Kristian Abel', url: `${SITE_URL}/` };
const publisher = { '@type': 'Organization', '@id': ORG_ID, name: 'ProksiAbel OÜ', url: `${SITE_URL}/` };

// article node
{
  '@type': ld.type,                       // 'BlogPosting' | 'ScholarlyArticle'
  '@id': `${url}#article`,
  headline: copy.headline,                // keep <= 110 chars
  description: copy.abstract,
  url,
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  image: [OG_IMAGE],                      // swap for a per-article 1200x630 when one exists
  datePublished: ld.datePublished,
  ...(ld.dateModified && { dateModified: ld.dateModified }),
  author,
  publisher,
  inLanguage: lang,
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
}
```

Rendered example (`/disclosures/botguard-disassembled/`, EN):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id": "https://tomabel.ee/disclosures/botguard-disassembled/#article",
      "headline": "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
      "description": "A teardown of Google's BotGuard anti-fraud VM from public research, built on Cypa's VM analysis and LuanRT's PO-token research: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the structural binding gap at the end of the chain — a token bound to site, lifetime and content, but not to the machine.",
      "url": "https://tomabel.ee/disclosures/botguard-disassembled/",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://tomabel.ee/disclosures/botguard-disassembled/" },
      "image": ["https://tomabel.ee/og-image.png"],
      "datePublished": "2026-08-11",
      "dateModified": "2026-10-04",
      "author": { "@type": "Person", "@id": "https://tomabel.ee/#person", "name": "Tom Kristian Abel", "url": "https://tomabel.ee/" },
      "publisher": { "@type": "Organization", "@id": "https://tomabel.ee/#organization", "name": "ProksiAbel OÜ", "url": "https://tomabel.ee/" },
      "inLanguage": "en",
      "isPartOf": { "@type": "WebSite", "@id": "https://tomabel.ee/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tomabel.ee/" },
        { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://tomabel.ee/disclosures/" },
        { "@type": "ListItem", "position": 3, "name": "BotGuard, disassembled — reverse engineering Google's anti-fraud VM", "item": "https://tomabel.ee/disclosures/botguard-disassembled/" }
      ]
    }
  ]
}
```

BreadcrumbList: already correct (3 items, absolute `item` URLs, Estonian names when `lang === 'et'`). Only change: use the shorter `routeMeta[path].en.title` minus the ` — Tom Kristian Abel` suffix for item 3 if the headline exceeds ~70 chars; optional.

### Patch C — `index.html` home page: Person + Organization + WebSite, linked

Replace the three existing blocks with one `@graph`. Also add the two OG tags.

```html
<meta property="og:site_name" content="Tom Kristian Abel" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="et_EE" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Tom Kristian Abel — Security Researcher & Systems Architect" />
<script type="application/ld+json">
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
      "description": "Security researcher and systems architect focused on identity protocols, browser defenses, and zero-trust architecture.",
      "email": "tom@tomabel.ee",
      "worksFor": { "@id": "https://tomabel.ee/#organization" },
      "knowsAbout": ["Authentication", "FIDO2", "WebAuthn", "eIDAS", "Smart-ID", "Reverse Engineering", "Zero Trust Architecture", "TLS Fingerprinting", "Anti-fraud systems"],
      "nationality": { "@type": "Country", "name": "Estonia" },
      "sameAs": [
        "https://github.com/tomkabel",
        "https://www.linkedin.com/in/hr-abel"
      ],
      "mainEntityOfPage": "https://tomabel.ee/about/"
    },
    {
      "@type": "Organization",
      "@id": "https://tomabel.ee/#organization",
      "name": "ProksiAbel OÜ",
      "legalName": "ProksiAbel OÜ",
      "url": "https://tomabel.ee/",
      "logo": { "@type": "ImageObject", "url": "https://tomabel.ee/og-image.png", "width": 1200, "height": 630 },
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
      "identifier": { "@type": "PropertyValue", "name": "Estonian Business Registry Code", "value": "17017826" },
      "vatID": "[VERIFY: EE VAT number, or delete this line]",
      "sameAs": ["https://github.com/tomkabel"],
      "knowsAbout": ["Offensive security research", "Identity and authentication", "Zero trust architecture"],
      "areaServed": "EE"
    },
    {
      "@type": "WebSite",
      "@id": "https://tomabel.ee/#website",
      "name": "tomabel.ee",
      "alternateName": "Tom Kristian Abel",
      "url": "https://tomabel.ee/",
      "inLanguage": ["en", "et"],
      "publisher": { "@id": "https://tomabel.ee/#organization" },
      "author": { "@id": "https://tomabel.ee/#person" }
    },
    {
      "@type": "WebPage",
      "@id": "https://tomabel.ee/#webpage",
      "url": "https://tomabel.ee/",
      "name": "Tom Kristian Abel — Security Researcher & Systems Architect",
      "isPartOf": { "@id": "https://tomabel.ee/#website" },
      "about": { "@id": "https://tomabel.ee/#person" },
      "inLanguage": "en"
    }
  ]
}
</script>
```

Notes:
- `jobTitle` changed from "Lead Systems Architect & CTO" / `worksFor: MatX` to match the visible page title. If the MatX role is still current and stated on `/about/`, keep it as a second `worksFor` entry; otherwise it is unsupported by page content.
- A square logo (≥112x112) at `/logo.png` would be better than reusing the OG image for `Organization.logo`.
- `spa-routes.mjs` regexes do not touch JSON-LD, so this block flows into every shell unchanged. Point Patch B's `@id` references at these ids.
- Build gate in `spa-routes.mjs` checks only title/description; the `@id` strings are plain literals, no gate change needed.

### Patch D — AboutPage (`/about/` and `/my-story/`)

Add an `ld` entry for `/about` in `route-meta.ts` and extend the AboutPage branch of `jsonLdFor()`:

```ts
// route-meta.ts — new entry
"/about": {
  en: {...}, et: {...},
  ld: { type: "AboutPage", datePublished: "[VERIFY: first publish date]", dateModified: "[VERIFY]",
        en: { headline: "About Tom Kristian Abel", abstract: "The way of seeing: background, philosophy, and how to work with Tom Kristian Abel." },
        et: { headline: "Tom Kristian Abelist", abstract: "Visioon: taust, põhimõtted ja see, kuidas Tom Kristian Abeliga koostööd teha." } },
},

// jsonLdFor() AboutPage branch
return {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': url,
  name: copy.headline,
  description: copy.abstract,
  url,
  datePublished: ld.datePublished,
  ...(ld.dateModified && { dateModified: ld.dateModified }),
  mainEntity: { '@id': `${SITE_URL}/#person` },
  author: { '@id': `${SITE_URL}/#person` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  isPartOf: { '@id': `${SITE_URL}/#website` },
  inLanguage: lang,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: CRUMBS[lang][0], item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: copy.headline, item: url },
    ],
  },
};
```

`route-meta.test.ts` test "every page route has metadata" will pass unchanged; test "JSON-LD declares the language" needs no change. Adding `ld` to `/about` flips its `og:type` to `article` via `metaFor()` — acceptable (`profile` would be more accurate; if wanted, add `type: 'profile'` handling in `metaFor`).

## Meta copy (title / description options)

Keyword front-loaded, en only; et mirrors live in `route-meta.ts`.

**`/` (63 → trim to ≤60)**
1. `Tom Kristian Abel — Security Researcher, Systems Architect` (59)
2. `Tom Kristian Abel | Security Research & Zero Trust` (50)
3. keep current (63; Google truncates at pixel width, usually survives)

Descriptions (current 154, fine). Alt: `Security researcher Tom Kristian Abel reverse engineers how authentication fails — Smart-ID, BotGuard, zero trust — then builds systems that survive it.` (156)

**`/about/` (83 → 150–160)**
- `Who Tom Kristian Abel is and how he works: security researcher, systems architect, founder of ProksiAbel OÜ in Estonia. Background, principles, how to engage.` (158)

**`/privacy/` (83)**
- `Privacy policy for tomabel.ee: the minimal data this site collects, why, how long it is kept, and your rights under GDPR. No analytics, no cross-site tracking.` (158)

**`/terms/` (31)**
- `Terms of service for tomabel.ee: permitted use of the site and its research, licensing of the texts, liability limits, and governing law (Estonia).` (148)

**`/disclosure/` (82)**
- `Security research policy of ProksiAbel OÜ: rules of engagement, coordinated disclosure timeline, safe-harbour terms, and how to report a finding to us.` (154)

**`/disclosures/` (121)**
- `Security research by Tom Kristian Abel: Smart-ID and eID vulnerabilities, BotGuard teardown, zero-trust frameworks and essays, each with its disclosure status.` (159)

Only write descriptions whose claims the page actually makes (GDPR rights, safe harbour, governing law) — **check the page text before pasting**.

## Validation steps

1. `npm run build` — build gates in `spa-routes.mjs` must pass.
2. `node --test src/content/route-meta.test.ts` (or the repo's test runner).
3. Rich Results Test on `/`, one ScholarlyArticle, one BlogPosting, `/my-story/`: expect Article + Breadcrumb detected, 0 errors; "image" warning gone.
4. Schema.org validator: confirm `@id` references resolve within the same page (all four ids live in the base block, so every shell is self-contained).
5. Re-run `python3 .../schema_lint.py https://tomabel.ee/` — `Organization` should no longer report missing `logo`/`sameAs`.
6. Re-fetch a rendered article (Firecrawl `rawHtml`) and count `application/ld+json`: expect 2 (base graph + article graph), not 5.

## Deferred

- Per-article OG images (Article `image`, social CTR) — needs image production.
- `twitter:site`/`twitter:creator` — N/A, no handle found in repo.
- `/systems/` as `CollectionPage`/`ItemList` of `SoftwareSourceCode` — speculative; add if the Systems page gets a stable list with repo URLs.
