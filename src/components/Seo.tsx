import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { jsonLdFor, metaFor, pageUrl, routeMeta } from '../content/route-meta';

function setMeta(selector: string, attribute: string, value: string) {
  document.querySelector(selector)?.setAttribute(attribute, value);
}

// Keeps <head> in step with client-side navigation. The static shells that
// scripts/spa-routes.mjs writes carry the same values from the same module,
// so crawlers that do not run JS see what this sets.
export default function Seo() {
  const { pathname } = useLocation();
  const { language } = useTranslation();
  const key = pathname.replace(/\/+$/, '') || '/';

  React.useEffect(() => {
    const meta = metaFor(key, language);
    // An unknown path must not claim its own URL as canonical.
    const url = key in routeMeta ? pageUrl(key) : pageUrl('/');
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:type"]', 'content', meta.type);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:url"]', 'content', url);

    document.getElementById('seo-jsonld')?.remove();
    const jsonLd = jsonLdFor(key, language);
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [key, language]);

  return null;
}
