// GitHub Pages has no SPA rewrites: a request to /research serves 404.html with
// HTTP 404 unless pub/research/index.html exists. Emit one index.html shell per
// client route so every sitemap URL returns 200 (and /research 301s to
// /research/, which then serves the shell directly).
//
// Each shell is stamped with ITS OWN title/description/canonical/og tags so the
// raw HTML (what AI crawlers and first-pass Googlebot see) is per-route, not a
// homepage duplicate. The client-side Seo component (src/components/Seo.tsx)
// rewrites the same tags at runtime — keep this map in sync with its META map.
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const BASE = 'https://tomabel.ee';

// Per-route static meta, stamped into each shell. Mirrors Seo.tsx META.
const META = {
  disclosures: {
    title: 'Disclosures — Tom Kristian Abel',
    description:
      'Disclosed vulnerability research, opcode-level teardowns, architecture frameworks, and essays — always disclosed responsibly before publication.',
  },
  systems: {
    title: 'Systems — Tom Kristian Abel',
    description:
      'Tools, security products, and backend services I have built and deployed — from a Go TLS-fingerprinting proxy to production identity platforms.',
  },
  'disclosures/i-used-to-break-authentication': {
    title: 'I used to break authentication — Tom Kristian Abel',
    description:
      'The thesis essay for this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline:
            "I used to break authentication. Here's what that taught me about building it.",
          description:
            'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
          url: `${BASE}/disclosures/i-used-to-break-authentication/`,
          datePublished: '2026-06-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: "I used to break authentication. Here's what that taught me about building it.", item: `${BASE}/disclosures/i-used-to-break-authentication/` },
          ],
        },
      ],
    },
  },
  'disclosures/what-client-side-trust-is-actually-worth': {
    title: 'What client-side trust is actually worth — Tom Kristian Abel',
    description:
      "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: 'What client-side trust is actually worth',
          description:
            "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
          url: `${BASE}/disclosures/what-client-side-trust-is-actually-worth/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'What client-side trust is actually worth', item: `${BASE}/disclosures/what-client-side-trust-is-actually-worth/` },
          ],
        },
      ],
    },
  },
  'disclosures/the-kratt-problem': {
    title: 'The kratt problem — Tom Kristian Abel',
    description:
      "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. On ethics, idleness, and aiming tools right.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: 'The kratt problem',
          description:
            "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
          url: `${BASE}/disclosures/the-kratt-problem/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The kratt problem', item: `${BASE}/disclosures/the-kratt-problem/` },
          ],
        },
      ],
    },
  },
  'disclosures/coordinated-disclosure-in-a-small-country': {
    title: 'Coordinated disclosure in a small country — Tom Kristian Abel',
    description:
      "Disclosing a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and owning your own story.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: 'Coordinated disclosure in a small country',
          description:
            "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection.",
          url: `${BASE}/disclosures/coordinated-disclosure-in-a-small-country/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'Coordinated disclosure in a small country', item: `${BASE}/disclosures/coordinated-disclosure-in-a-small-country/` },
          ],
        },
      ],
    },
  },
  'disclosures/the-fix-that-doesnt-need-sk': {
    title: "The fix that doesn't need SK — Tom Kristian Abel",
    description:
      "Five fixes for the Smart-ID signing relay need SK, a bank, or a regulator to move first. A sixth: a session-continuity check a bank's edge can run today.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: "The fix that doesn't need SK",
          description:
            "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing SK ID Solutions, a bank, or a regulator to move first. Here's a sixth: a session-continuity check a bank's own edge can run today.",
          url: `${BASE}/disclosures/the-fix-that-doesnt-need-sk/`,
          datePublished: '2026-09-06',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: "The fix that doesn't need SK", item: `${BASE}/disclosures/the-fix-that-doesnt-need-sk/` },
          ],
        },
      ],
    },
  },
  'disclosures/botguard-disassembled': {
    title: 'BotGuard, disassembled — Tom Kristian Abel',
    description:
      "An opcode-level teardown of Google's BotGuard anti-fraud VM: the bytecode machine, its anti-debug layers, and the token-portability weakness at the end.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline:
            "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
          description:
            "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research.",
          url: `${BASE}/disclosures/botguard-disassembled/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: "BotGuard, disassembled — reverse engineering Google's anti-fraud VM", item: `${BASE}/disclosures/botguard-disassembled/` },
          ],
        },
      ],
    },
  },
  'disclosures/smart-id-achilles-heel': {
    title: "The Achilles' heel of Estonia's e-state — Tom Kristian Abel",
    description:
      "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
          description:
            "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows.",
          url: `${BASE}/disclosures/smart-id-achilles-heel/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research", item: `${BASE}/disclosures/smart-id-achilles-heel/` },
          ],
        },
      ],
    },
  },
  'disclosures/the-pin-that-cannot-be-delegated': {
    title: 'The PIN that cannot be delegated — Tom Kristian Abel',
    description:
      "Why an AI agent cannot hold your Smart-ID PIN: SK's own terms, the QSCD practice statement, and eIDAS Article 26, plus the OAuth-style pattern that works.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS',
          description:
            "Why an AI agent cannot hold your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Article 26 read side by side. What sole control means at the moment of signing, why delegated credentials do not change it, and the OAuth-style pattern that actually works.",
          url: `${BASE}/disclosures/the-pin-that-cannot-be-delegated/`,
          datePublished: '2026-09-08',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS', item: `${BASE}/disclosures/the-pin-that-cannot-be-delegated/` },
          ],
        },
      ],
    },
  },
  'disclosures/zero-trust-octagon': {
    title: 'Zero-Trust Octagon — Tom Kristian Abel',
    description:
      'A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'Zero-Trust Octagon — a framework from first principles',
          description:
            'A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs.',
          url: `${BASE}/disclosures/zero-trust-octagon/`,
          datePublished: '2026-08-11',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'Zero-Trust Octagon — a framework from first principles', item: `${BASE}/disclosures/zero-trust-octagon/` },
          ],
        },
      ],
    },
  },
  'disclosures/pact-software-anchor-turn': {
    title: 'PACT and the software-anchor turn — Tom Kristian Abel',
    description:
      "A critical analysis of Cloudflare's PACT proposal with Firefox, Chrome, Edge, and Shopify: what blind-signature tokens prove, and the missing governance layer.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline:
            'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens',
          description:
            "A critical analysis of Cloudflare's PACT proposal, announced with Firefox, Chrome, Edge, and Shopify in June 2026: what blind-signature tokens actually prove, why the missing governance layer is the real risk, and the markers that would make the design defensible.",
          url: `${BASE}/disclosures/pact-software-anchor-turn/`,
          datePublished: '2026-08-28',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens', item: `${BASE}/disclosures/pact-software-anchor-turn/` },
          ],
        },
      ],
    },
  },
  'disclosures/chatgpt-is-not-a-phishing-scanner': {
    title: 'ChatGPT is not a phishing scanner — Tom Kristian Abel',
    description:
      "A fact check of pasting suspicious links into ChatGPT: what mainstream assistants document, why TDS cloaking defeats single fetches, and the real verdict layer.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'ChatGPT is not a phishing scanner',
          description:
            "A fact check of the advice to paste a suspicious link into ChatGPT: what ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS cloaking can serve a single AI fetch a decoy page; and why VirusTotal and Google Safe Browsing remain the verdict layer.",
          url: `${BASE}/disclosures/chatgpt-is-not-a-phishing-scanner/`,
          datePublished: '2026-09-06',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'ChatGPT is not a phishing scanner', item: `${BASE}/disclosures/chatgpt-is-not-a-phishing-scanner/` },
          ],
        },
      ],
    },
  },
  'disclosures/the-evolution-of-cyber-fraud-in-estonia': {
    title: 'Cyber fraud in Estonia, 2010–2026 — Tom Kristian Abel',
    description:
      "How Estonia's small language held fraud at arm's length for a decade, and what happened when it fell: native speakers, vishing centers, and AI deepfakes.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'The evolution of cyber fraud in Estonia, 2010–2026',
          description:
            "How Estonia's small language held the fraud industry at arm's length for a decade, and what happened when the barrier fell: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes, with annual losses climbing from five to ten million euros to 29 million in 2025.",
          url: `${BASE}/disclosures/the-evolution-of-cyber-fraud-in-estonia/`,
          datePublished: '2026-08-26',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The evolution of cyber fraud in Estonia, 2010–2026', item: `${BASE}/disclosures/the-evolution-of-cyber-fraud-in-estonia/` },
          ],
        },
      ],
    },
  },
  'my-story': {
    title: 'My story — Tom Kristian Abel',
    description:
      "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the evidence.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'My story — Tom Kristian Abel',
      description:
        "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the published research that is the evidence. With a link to the original Delfi interview.",
      url: `${BASE}/my-story/`,
      datePublished: '2026-09-21',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: `${BASE}/`,
      },
    },
  },
  'disclosures/russian-cyber-ops-estonia-hosting': {
    title: 'Russian Cyber Ops and Estonian Hosting — Tom Kristian Abel',
    description:
      "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting, bulletproof entities, and gray-space proxy networks.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline:
            'The Gray Space: Russian Cyber Operations and Estonian Hosting Infrastructure',
          description:
            "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting providers, bulletproof entities like Vault Dweller OÜ, and gray-space proxy networks (Fineproxy, Quality Network OÜ) anchored in Estonian data centers.",
          url: `${BASE}/disclosures/russian-cyber-ops-estonia-hosting/`,
          datePublished: '2026-09-14',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The Gray Space: Russian Cyber Operations and Estonian Hosting Infrastructure', item: `${BASE}/disclosures/russian-cyber-ops-estonia-hosting/` },
          ],
        },
      ],
    },
  },

  'disclosures/why-vlms-break-client-side-anti-fraud': {
    title: 'Why VLMs break client-side anti-fraud — Tom Kristian Abel',
    description:
      'Fifteen years of bot detection assumes automation must forge what a real browser produces. A VLM driving a stock browser forges nothing at all.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'How client-side anti-fraud actually works, and why VLMs break it',
          description:
            'Fifteen years of bot detection assumes an automated client must forge something a real browser produces naturally. A vision-language model driving a stock browser forges nothing. The five defensive paradigms, which survive operator synthesis, and the attestation centralization problem.',
          url: `${BASE}/disclosures/why-vlms-break-client-side-anti-fraud/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'How client-side anti-fraud actually works, and why VLMs break it', item: `${BASE}/disclosures/why-vlms-break-client-side-anti-fraud/` },
          ],
        },
      ],
    },
  },
  'disclosures/nine-dimensions-of-zero-trust': {
    title:
      'The Nine Dimensions of Zero Trust — Tom Kristian Abel',
    description:
      'Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, and posture.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'The Nine Dimensions of Zero Trust',
          description:
            'Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, policy distribution, observability, posture and human continuity. A walkthrough of the morphological matrix and how to read an organization real position on it.',
          url: `${BASE}/disclosures/nine-dimensions-of-zero-trust/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The Nine Dimensions of Zero Trust', item: `${BASE}/disclosures/nine-dimensions-of-zero-trust/` },
          ],
        },
      ],
    },
  },
  'disclosures/the-fortune-500-illusion-of-control': {
    title:
      'The Fortune 500 Illusion of Control — Tom Kristian Abel',
    description:
      'A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the biggest budget, from a stolen session cookie to full exfiltration.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'The Fortune 500 Illusion of Control',
          description:
            'A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the largest security budget, the most tooling and the most attestations, taken from a stolen session cookie to full database exfiltration in twenty minutes.',
          url: `${BASE}/disclosures/the-fortune-500-illusion-of-control/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'The Fortune 500 Illusion of Control', item: `${BASE}/disclosures/the-fortune-500-illusion-of-control/` },
          ],
        },
      ],
    },
  },
  'disclosures/move-fast-fix-it-in-prod': {
    title:
      'Move Fast, Fix It In Prod — Tom Kristian Abel',
    description:
      'A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency reaches production with a valid identity.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype',
          description:
            'A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency passes the only verification gate the architecture has and reaches production with a valid workload identity. Composite analytical model, not a real incident.',
          url: `${BASE}/disclosures/move-fast-fix-it-in-prod/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype', item: `${BASE}/disclosures/move-fast-fix-it-in-prod/` },
          ],
        },
      ],
    },
  },
  'disclosures/saas-glued-lean-defense': {
    title: 'SaaS-Glued Lean Defense — Tom Kristian Abel',
    description:
      'A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, and five fixes one operator can apply in an afternoon.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D',
          description:
            'A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, the SaaS blind spot an identity-aware proxy never covers, OAuth grant cascade, and five fixes one operator can apply in an afternoon without a budget.',
          url: `${BASE}/disclosures/saas-glued-lean-defense/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D', item: `${BASE}/disclosures/saas-glued-lean-defense/` },
          ],
        },
      ],
    },
  },
  'disclosures/identity-is-the-root-proof-is-the-gate': {
    title:
      'Identity Is the Root. Proof Is the Gate. — Tom Kristian Abel',
    description:
      'Every zero-trust control is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On what authenticated really means.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          headline: 'Identity Is the Root. Proof Is the Gate.',
          description:
            'Every control in a zero-trust architecture is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On authentication events versus continuous proof, the six distinct claims people call authenticated, and why phishing-resistant credentials are necessary but not sufficient.',
          url: `${BASE}/disclosures/identity-is-the-root-proof-is-the-gate/`,
          datePublished: '2026-09-22',
          author: {
            '@type': 'Person',
            name: 'Tom Kristian Abel',
            url: `${BASE}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Disclosures', item: `${BASE}/disclosures/` },
            { '@type': 'ListItem', position: 3, name: 'Identity Is the Root. Proof Is the Gate.', item: `${BASE}/disclosures/identity-is-the-root-proof-is-the-gate/` },
          ],
        },
      ],
    },
  },
  about: {
    title: 'About — Tom Kristian Abel',
    description:
      'The way of seeing — background, philosophy, and how to work with Tom Kristian Abel.',
  },
  privacy: {
    title: 'Privacy Policy — Tom Kristian Abel',
    description:
      'What little data tomabel.ee collects and how it is handled. No cross-site tracking.',
  },
  terms: {
    title: 'Terms of Service — Tom Kristian Abel',
    description: 'The rules for using tomabel.ee.',
  },
  disclosure: {
    title: 'Security Research Policy — ProksiAbel OÜ',
    description:
      'How we handle security research: rules, disclosure process, and how to contact us.',
  },
  cookies: {
    title: 'Cookie Policy — Tom Kristian Abel',
    description: 'Cookies (or lack thereof) on tomabel.ee.',
  },
};

const routes = Object.keys(META);

for (const route of routes) {
  const url = `${BASE}/${route}/`;
  const meta = META[route];
  mkdirSync(`pub/${route}`, { recursive: true });
  let html = readFileSync('pub/index.html', 'utf-8');

  // Stamp per-route meta into the static HTML.
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );

  // Per-route JSON-LD (e.g. BlogPosting for the essay): insert alongside the
  // base Person/WebSite block instead of replacing it.
  if (meta.jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>\n    </head>`,
    );
  }

  writeFileSync(`pub/${route}/index.html`, html);
}

// Build-time gate: every route shell must carry exactly ONE canonical pointing
// at itself. A dual-canonical or homepage-canonical regression fails the build.
const offenders = routes
  .map((route) => {
    const html = readFileSync(`pub/${route}/index.html`, 'utf-8');
    const canonicals = [...html.matchAll(/rel="canonical"/g)].length;
    const pointsAtSelf = html.includes(`<link rel="canonical" href="${BASE}/${route}/" />`);
    return { route, canonicals, pointsAtSelf };
  })
  .filter((r) => r.canonicals !== 1 || !r.pointsAtSelf);
if (offenders.length > 0) {
  console.error('FAIL: canonical gate — each route needs exactly 1 self-canonical:', offenders);
  process.exit(1);
}

console.log(`spa-routes: emitted ${routes.length} route shells with per-route meta`);

// Build-time gate: this map and Seo.tsx's META must stay in sync. If a route is
// missing from Seo.tsx, the client-side Seo component falls through to FALLBACK
// on mount and rewrites the page's title to "Page Not Found" and its canonical
// to the homepage — which tells Google the page is a duplicate of "/" and
// deindexes it. The static shell looks fine, so this fails silently and only
// shows up in search rankings weeks later. (Caught exactly that on
// /disclosures/zero-trust-octagon.)
const seoSrc = readFileSync('src/components/Seo.tsx', 'utf-8');
const seoKeys = new Set(
  [...seoSrc.matchAll(/^ {2}'(\/[^']*)':\s*\{/gm)].map((m) => m[1]),
);
const unsynced = routes.filter((route) => !seoKeys.has(`/${route}`));
if (unsynced.length > 0) {
  console.error(
    'FAIL: routes present here but missing from Seo.tsx META (they would render as "Page Not Found" and self-canonicalize to the homepage):',
    unsynced,
  );
  process.exit(1);
}

// GH Pages fallback for unknown paths: serve a noindex copy of the shell.
// HTTP 404 + noindex keeps unknown URLs out of the index.
const notFound = readFileSync('pub/index.html', 'utf-8').replace(
  '</head>',
  '    <meta name="robots" content="noindex" />\n  </head>',
);
writeFileSync('pub/404.html', notFound);
