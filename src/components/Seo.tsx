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
  '/research': {
    title: 'Research & Publications — Tom Kristian Abel',
    description:
      'Technical papers, analyses, and findings from ongoing security research.',
    url: 'https://tomabel.ee/research/',
  },
  '/projects': {
    title: 'Featured Projects — Tom Kristian Abel',
    description:
      'Selected projects demonstrating capability across reverse engineering, security tooling, infrastructure, and research.',
    url: 'https://tomabel.ee/projects/',
  },
  '/writing': {
    title: 'Writing — Tom Kristian Abel',
    description:
      'Essays and arguments connecting the research. Less formal than the research, more opinionated.',
    url: 'https://tomabel.ee/writing/',
  },
  '/writing/i-used-to-break-authentication': {
    title:
      "I used to break authentication. Here's what that taught me about building it. — Tom Kristian Abel",
    description:
      'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
    url: 'https://tomabel.ee/writing/i-used-to-break-authentication/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline:
        "I used to break authentication. Here's what that taught me about building it.",
      description:
        'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
      url: 'https://tomabel.ee/writing/i-used-to-break-authentication/',
      datePublished: '2026-06-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/writing/what-client-side-trust-is-actually-worth': {
    title: 'What client-side trust is actually worth — Tom Kristian Abel',
    description:
      "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
    url: 'https://tomabel.ee/writing/what-client-side-trust-is-actually-worth/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'What client-side trust is actually worth',
      description:
        "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
      url: 'https://tomabel.ee/writing/what-client-side-trust-is-actually-worth/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/writing/the-kratt-problem': {
    title: 'The kratt problem — Tom Kristian Abel',
    description:
      "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
    url: 'https://tomabel.ee/writing/the-kratt-problem/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'The kratt problem',
      description:
        "Offensive capability as a folkloric kratt: tireless while it has direction, dangerous the moment it doesn't. A short piece on ethics, idleness, and pointing tools in the right direction.",
      url: 'https://tomabel.ee/writing/the-kratt-problem/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/writing/coordinated-disclosure-in-a-small-country': {
    title: 'Coordinated disclosure in a small country — Tom Kristian Abel',
    description:
      "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection.",
    url: 'https://tomabel.ee/writing/coordinated-disclosure-in-a-small-country/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Coordinated disclosure in a small country',
      description:
        "What it's actually like to disclose a national-infrastructure flaw when everyone in the room knows each other: the legal exposure, the incentives, and why owning your own story is the only real protection.",
      url: 'https://tomabel.ee/writing/coordinated-disclosure-in-a-small-country/',
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: 'https://tomabel.ee/',
      },
    },
  },
  '/research/botguard-disassembled': {
    title:
      "BotGuard, disassembled — reverse engineering Google's anti-fraud VM — Tom Kristian Abel",
    description:
      "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research.",
    url: 'https://tomabel.ee/research/botguard-disassembled/',
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline:
        "BotGuard, disassembled — reverse engineering Google's anti-fraud VM",
      description:
        "An opcode-level teardown of Google's BotGuard anti-fraud VM: the register-based bytecode machine, its timing-based anti-debug and anti-logger layers, and the token-portability weakness at the end of the chain. Builds on Cypa's VM analysis and LuanRT's PO-token research.",
      url: 'https://tomabel.ee/research/botguard-disassembled/',
      datePublished: '2026-08-11',
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
