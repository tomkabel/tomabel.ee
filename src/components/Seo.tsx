import React from 'react';
import { useLocation } from 'react-router-dom';

type Meta = {
  title: string;
  description: string;
  url: string;
  type?: string;
  jsonLd?: object;
};

// Canonical URLs use the trailing-slash form: GitHub Pages 301s /path to
// /path/ and serves pub/path/index.html there (see scripts/spa-routes.mjs).
const META: Record<string, Meta> = {
  '/': {
    title: 'Tom Kristian Abel — Security Researcher & Systems Architect',
    description:
      'Tom Kristian Abel — Security Researcher & Systems Architect. I reverse engineer how authentication fails, then build systems that survive what I find.',
    url: 'https://tomabel.ee/',
  },
  '/disclosures': {
    title: 'Disclosures — Tom Kristian Abel',
    description:
      'Disclosed vulnerability research, opcode-level teardowns, architecture frameworks, and essays. Where research touches live systems, it was disclosed responsibly before publication.',
    url: 'https://tomabel.ee/disclosures/',
  },
  '/systems': {
    title: 'Systems — Tom Kristian Abel',
    description:
      'Tools, security products, and backend services I have built and deployed — from a Go TLS-fingerprinting proxy to production identity platforms.',
    url: 'https://tomabel.ee/systems/',
  },
  '/disclosures/i-used-to-break-authentication': {
    title:
      "I used to break authentication. Here's what that taught me about building it. — Tom Kristian Abel",
    description:
      'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
    url: 'https://tomabel.ee/disclosures/i-used-to-break-authentication/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline:
        "I used to break authentication. Here's what that taught me about building it.",
      description:
        'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
      url: 'https://tomabel.ee/disclosures/i-used-to-break-authentication/',
      datePublished: '2026-06-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/what-client-side-trust-is-actually-worth': {
    title: 'What client-side trust is actually worth — Tom Kristian Abel',
    description:
      "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
    url: 'https://tomabel.ee/disclosures/what-client-side-trust-is-actually-worth/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'What client-side trust is actually worth',
      description:
        "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
      url: 'https://tomabel.ee/disclosures/what-client-side-trust-is-actually-worth/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/the-kratt-problem': {
    title: 'The kratt problem — Tom Kristian Abel',
    description:
      "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
    url: 'https://tomabel.ee/disclosures/the-kratt-problem/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'The kratt problem',
      description:
        "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
      url: 'https://tomabel.ee/disclosures/the-kratt-problem/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/coordinated-disclosure-in-a-small-country': {
    title: 'Coordinated disclosure in a small country — Tom Kristian Abel',
    description:
      "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection.",
    url: 'https://tomabel.ee/disclosures/coordinated-disclosure-in-a-small-country/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Coordinated disclosure in a small country',
      description:
        "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection.",
      url: 'https://tomabel.ee/disclosures/coordinated-disclosure-in-a-small-country/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/the-fix-that-doesnt-need-sk': {
    title: "The fix that doesn't need SK — Tom Kristian Abel",
    description:
      "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing SK ID Solutions, a bank, or a regulator to move first. Here's a sixth: a session-continuity check a bank's own edge can run today.",
    url: 'https://tomabel.ee/disclosures/the-fix-that-doesnt-need-sk/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: "The fix that doesn't need SK",
      description:
        "The Achilles' heel report lists five fixes for the Smart-ID signing relay, each needing SK ID Solutions, a bank, or a regulator to move first. Here's a sixth: a session-continuity check a bank's own edge can run today.",
      url: 'https://tomabel.ee/disclosures/the-fix-that-doesnt-need-sk/',
      datePublished: '2026-09-06',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/botguard-disassembled': {
    title:
      "BotGuard, disassembled — reverse engineering Google's anti-fraud VM — Tom Kristian Abel",
    description:
      "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research.",
    url: 'https://tomabel.ee/disclosures/botguard-disassembled/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline:
        "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
      description:
        "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research.",
      url: 'https://tomabel.ee/disclosures/botguard-disassembled/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/smart-id-achilles-heel': {
    title:
      "The Achilles' heel of Estonia's e-state — Smart-ID / eID research — Tom Kristian Abel",
    description:
      "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows.",
    url: 'https://tomabel.ee/disclosures/smart-id-achilles-heel/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: "The Achilles' heel of Estonia's e-state — Smart-ID / eID research",
      description:
        "Protocol-level analysis of Estonia's Smart-ID: why MITM and endpoint-replacement attacks fail by design, and how the approval layer fails instead, including the interactive signing-relay class of attack against Smart-ID+ cross-device QR flows.",
      url: 'https://tomabel.ee/disclosures/smart-id-achilles-heel/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/zero-trust-octagon': {
    title: 'Zero-Trust Octagon — a framework from first principles — Tom Kristian Abel',
    description:
      'A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs.',
    url: 'https://tomabel.ee/disclosures/zero-trust-octagon/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'Zero-Trust Octagon — a framework from first principles',
      description:
        'A zero-trust architecture framework built from first principles: 8 axioms, a 9-dimension morphological matrix, and archetypal breach walkthroughs.',
      url: 'https://tomabel.ee/disclosures/zero-trust-octagon/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/pact-software-anchor-turn': {
    title:
      'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens — Tom Kristian Abel',
    description:
      "A critical analysis of Cloudflare's PACT proposal, announced with Firefox, Chrome, Edge, and Shopify in June 2026: what blind-signature tokens actually prove, why the missing governance layer is the real risk, and the markers that would make the design defensible.",
    url: 'https://tomabel.ee/disclosures/pact-software-anchor-turn/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline:
        'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens',
      description:
        "A critical analysis of Cloudflare's PACT proposal, announced with Firefox, Chrome, Edge, and Shopify in June 2026: what blind-signature tokens actually prove, why the missing governance layer is the real risk, and the markers that would make the design defensible.",
      url: 'https://tomabel.ee/disclosures/pact-software-anchor-turn/',
      datePublished: '2026-08-28',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/chatgpt-is-not-a-phishing-scanner': {
    title: 'ChatGPT is not a phishing scanner — Tom Kristian Abel',
    description:
      "A fact check of the advice to paste a suspicious link into ChatGPT: what ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS cloaking can serve a single AI fetch a decoy page; and why VirusTotal and Google Safe Browsing remain the verdict layer.",
    url: 'https://tomabel.ee/disclosures/chatgpt-is-not-a-phishing-scanner/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'ChatGPT is not a phishing scanner',
      description:
        "A fact check of the advice to paste a suspicious link into ChatGPT: what ChatGPT, Claude, and Gemini actually document about checking links, domain age, and reviews; why TDS cloaking can serve a single AI fetch a decoy page; and why VirusTotal and Google Safe Browsing remain the verdict layer.",
      url: 'https://tomabel.ee/disclosures/chatgpt-is-not-a-phishing-scanner/',
      datePublished: '2026-09-06',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/the-pin-that-cannot-be-delegated': {
    title:
      'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS — Tom Kristian Abel',
    description:
      "Why an AI agent cannot hold your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Article 26 read side by side. What sole control means at the moment of signing, why delegated credentials do not change it, and the OAuth-style pattern that actually works.",
    url: 'https://tomabel.ee/disclosures/the-pin-that-cannot-be-delegated/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS',
      description:
        "Why an AI agent cannot hold your Smart-ID PIN: SK ID Solutions' own terms, the remote-QSCD practice statement, and eIDAS Article 26 read side by side. What sole control means at the moment of signing, why delegated credentials do not change it, and the OAuth-style pattern that actually works.",
      url: 'https://tomabel.ee/disclosures/the-pin-that-cannot-be-delegated/',
      datePublished: '2026-09-08',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/the-evolution-of-cyber-fraud-in-estonia': {
    title:
      'The evolution of cyber fraud in Estonia, 2010–2026 — Tom Kristian Abel',
    description:
      "How Estonia's small language held the fraud industry at arm's length for a decade, and what happened when the barrier fell: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes, with annual losses climbing from five to ten million euros to 29 million in 2025.",
    url: 'https://tomabel.ee/disclosures/the-evolution-of-cyber-fraud-in-estonia/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'The evolution of cyber fraud in Estonia, 2010–2026',
      description:
        "How Estonia's small language held the fraud industry at arm's length for a decade, and what happened when the barrier fell: recruited native speakers, industrialized vishing call centers, courier networks, and AI deepfakes, with annual losses climbing from five to ten million euros to 29 million in 2025.",
      url: 'https://tomabel.ee/disclosures/the-evolution-of-cyber-fraud-in-estonia/',
      datePublished: '2026-08-26',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/russian-cyber-ops-estonia-hosting': {
    title:
      'The Gray Space: Russian Cyber Operations and Estonian Hosting Infrastructure — Tom Kristian Abel',
    description:
      "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting providers, bulletproof entities like Vault Dweller OÜ, and gray-space proxy networks (Fineproxy, Quality Network OÜ) anchored in Estonian data centers. Maps Ilia Trusov's infrastructure network, RIPE geolocation manipulation, and documented DDoS operations against Rappler and Azerbaijan-critical targets.",
    url: 'https://tomabel.ee/disclosures/russian-cyber-ops-estonia-hosting/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline:
        'The Gray Space: Russian Cyber Operations and Estonian Hosting Infrastructure',
      description:
        "An OSINT assessment of Estonia's dual role in the Russian cyber ecosystem: mainstream hosting providers, bulletproof entities like Vault Dweller OÜ, and gray-space proxy networks (Fineproxy, Quality Network OÜ) anchored in Estonian data centers.",
      url: 'https://tomabel.ee/disclosures/russian-cyber-ops-estonia-hosting/',
      datePublished: '2026-09-14',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/about': {
    title: 'About — Tom Kristian Abel',
    description:
      'The way of seeing — background, philosophy, and how to work with Tom Kristian Abel.',
    url: 'https://tomabel.ee/about/',
  },
  '/my-story': {
    title: 'My story — Tom Kristian Abel',
    description:
      "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the published research that is the evidence. With a link to the original Delfi interview.",
    url: 'https://tomabel.ee/my-story/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'My story — Tom Kristian Abel',
      description:
        "How I got here, in three acts: charged by Estonia's cybercrime police as a young man, the pivot from selling the gap to closing it, and the published research that is the evidence. With a link to the original Delfi interview.",
      url: 'https://tomabel.ee/my-story/',
      datePublished: '2026-09-21',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/why-vlms-break-client-side-anti-fraud': {
    title:
      'How client-side anti-fraud actually works, and why VLMs break it — Tom Kristian Abel',
    description:
      'Fifteen years of bot detection assumes an automated client must forge something a real browser produces naturally. A vision-language model driving a stock browser forges nothing. The five defensive paradigms, which survive operator synthesis, and the attestation centralization problem.',
    url: 'https://tomabel.ee/disclosures/why-vlms-break-client-side-anti-fraud/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'How client-side anti-fraud actually works, and why VLMs break it',
      description:
        'Fifteen years of bot detection assumes an automated client must forge something a real browser produces naturally. A vision-language model driving a stock browser forges nothing. The five defensive paradigms, which survive operator synthesis, and the attestation centralization problem.',
      url: 'https://tomabel.ee/disclosures/why-vlms-break-client-side-anti-fraud/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/nine-dimensions-of-zero-trust': {
    title:
      'The Nine Dimensions of Zero Trust — Tom Kristian Abel',
    description:
      'Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, policy distribution, observability, posture and human continuity. A walkthrough of the morphological matrix and how to read an organization real position on it.',
    url: 'https://tomabel.ee/disclosures/nine-dimensions-of-zero-trust/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'The Nine Dimensions of Zero Trust',
      description:
        'Zero trust is not a maturity ladder. It is a nine-dimensional configuration space: trust anchor, identity, enforcement, attestation, response, policy distribution, observability, posture and human continuity. A walkthrough of the morphological matrix and how to read an organization real position on it.',
      url: 'https://tomabel.ee/disclosures/nine-dimensions-of-zero-trust/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/the-fortune-500-illusion-of-control': {
    title:
      'The Fortune 500 Illusion of Control — Tom Kristian Abel',
    description:
      'A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the largest security budget, the most tooling and the most attestations, taken from a stolen session cookie to full database exfiltration in twenty minutes.',
    url: 'https://tomabel.ee/disclosures/the-fortune-500-illusion-of-control/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'The Fortune 500 Illusion of Control',
      description:
        'A full breach trace of Archetype B from the Zero-Trust Octagon: the enterprise with the largest security budget, the most tooling and the most attestations, taken from a stolen session cookie to full database exfiltration in twenty minutes.',
      url: 'https://tomabel.ee/disclosures/the-fortune-500-illusion-of-control/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/move-fast-fix-it-in-prod': {
    title:
      'Move Fast, Fix It In Prod — Tom Kristian Abel',
    description:
      'A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency passes the only verification gate the architecture has and reaches production with a valid workload identity. Composite analytical model, not a real incident.',
    url: 'https://tomabel.ee/disclosures/move-fast-fix-it-in-prod/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'Move Fast, Fix It In Prod: A Full Breach Trace of the Startup Archetype',
      description:
        'A full supply-chain and CI/CD breach trace of Archetype C, the velocity-optimised startup: a typosquatted dependency passes the only verification gate the architecture has and reaches production with a valid workload identity. Composite analytical model, not a real incident.',
      url: 'https://tomabel.ee/disclosures/move-fast-fix-it-in-prod/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/saas-glued-lean-defense': {
    title:
      'SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D — Tom Kristian Abel',
    description:
      'A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, the SaaS blind spot an identity-aware proxy never covers, OAuth grant cascade, and five fixes one operator can apply in an afternoon without a budget.',
    url: 'https://tomabel.ee/disclosures/saas-glued-lean-defense/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'SaaS-Glued Lean Defense: The Full Breach Trace for Archetype D',
      description:
        'A step-by-step breach trace of the small-team SaaS architecture: MFA fatigue to session theft, the SaaS blind spot an identity-aware proxy never covers, OAuth grant cascade, and five fixes one operator can apply in an afternoon without a budget.',
      url: 'https://tomabel.ee/disclosures/saas-glued-lean-defense/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/disclosures/identity-is-the-root-proof-is-the-gate': {
    title:
      'Identity Is the Root. Proof Is the Gate. — Tom Kristian Abel',
    description:
      'Every control in a zero-trust architecture is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On authentication events versus continuous proof, the six distinct claims people call authenticated, and why phishing-resistant credentials are necessary but not sufficient.',
    url: 'https://tomabel.ee/disclosures/identity-is-the-root-proof-is-the-gate/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: 'Identity Is the Root. Proof Is the Gate.',
      description:
        'Every control in a zero-trust architecture is downstream of identity, so the proof taken at the gate is the ceiling on everything above it. On authentication events versus continuous proof, the six distinct claims people call authenticated, and why phishing-resistant credentials are necessary but not sufficient.',
      url: 'https://tomabel.ee/disclosures/identity-is-the-root-proof-is-the-gate/',
      datePublished: '2026-09-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/privacy': {
    title: 'Privacy Policy — Tom Kristian Abel',
    description:
      'What little data tomabel.ee collects and how it is handled. No cross-site tracking.',
    url: 'https://tomabel.ee/privacy/',
  },
  '/terms': {
    title: 'Terms of Service — Tom Kristian Abel',
    description: 'The rules for using tomabel.ee.',
    url: 'https://tomabel.ee/terms/',
  },
  '/disclosure': {
    title: 'Security Research Policy — ProksiAbel OÜ',
    description:
      'How we handle security research: rules, disclosure process, and how to contact us.',
    url: 'https://tomabel.ee/disclosure/',
  },
  '/cookies': {
    title: 'Cookie Policy — Tom Kristian Abel',
    description: 'Cookies (or lack thereof) on tomabel.ee.',
    url: 'https://tomabel.ee/cookies/',
  },
};

const FALLBACK: Meta = {
  title: 'Page Not Found — Tom Kristian Abel',
  description: 'The page you are looking for does not exist or has been moved.',
  url: 'https://tomabel.ee/',
};

function setMeta(selector: string, attribute: string, value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

export default function Seo() {
  const { pathname } = useLocation();
  const key = pathname.replace(/\/+$/, '') || '/';
  const meta = META[key] ?? FALLBACK;

  React.useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', meta.url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', meta.url);
    setMeta('meta[property="og:type"]', 'content', meta.type ?? 'website');
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:url"]', 'content', meta.url);

    document.getElementById('seo-jsonld')?.remove();
    if (meta.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-jsonld';
      script.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  }, [meta]);

  return null;
}
