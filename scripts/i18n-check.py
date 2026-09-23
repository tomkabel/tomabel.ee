"""Runtime i18n checks against a served build (default http://localhost:4173).

  python3 scripts/i18n-check.py [base-url]

Fails (exit 1) if, for any route and either stored language:
  - the language the text is written in disagrees with its nearest `lang`
    attribute (e.g. an English article under <html lang="et">)
  - known English UI chrome leaks into the Estonian UI outside an English scope
  - a bilingual article's section anchors change when the language switches
  - a first visit ignores the browser language
"""
import re
import sys
from playwright.sync_api import sync_playwright

base = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
routes = ["/", "/disclosures", "/systems", "/about", "/my-story", "/privacy", "/disclosure", "/nope",
          "/disclosures/smart-id-achilles-heel", "/disclosures/the-kratt-problem",
          "/disclosures/the-fortune-500-illusion-of-control", "/disclosures/the-pin-that-cannot-be-delegated"]
BILINGUAL_ARTICLE = "/disclosures/the-fortune-500-illusion-of-control"
ENGLISH_CHROME = ["Progress", "Contents", "Integrity · SHA-256", "Verifying", "Switch to Estonian", "Canonical text unavailable"]

# Share of words carrying Estonian letters or high-frequency Estonian function words.
ET = re.compile(r"[õäöüšž]|^(ja|on|ei|mis|kui|see|oma|või|et|ka|ning|kes|seda)$", re.I)

# Per-scope text: every element with a lang attribute, minus nested lang scopes.
SCOPES = """() => [...document.querySelectorAll('[lang]')].map(el => {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('[lang], script, style, pre, code').forEach(n => n.remove());
  return { lang: el.getAttribute('lang'), tag: el.tagName, text: clone.textContent };
})"""

failures = []
with sync_playwright() as p:
    browser = p.chromium.launch()
    for stored in ("et", "en"):
        ctx = browser.new_context(locale="en-US")
        page = ctx.new_page()
        page.add_init_script(f"localStorage.setItem('language', '{stored}')")
        for r in routes:
            page.goto(base + r, wait_until="networkidle")
            for scope in page.evaluate(SCOPES):
                words = [w.strip(".,:;()“”\"'’!?") for w in scope["text"].split()]
                words = [w for w in words if len(w) > 1]
                if len(words) < 25:
                    continue
                ratio = sum(bool(ET.search(w)) for w in words) / len(words)
                written = "et" if ratio > 0.08 else "en"
                if written != scope["lang"]:
                    failures.append(f"[{stored}] {r}: <{scope['tag'].lower()} lang={scope['lang']}> holds {written} text (et-ratio {ratio:.2f})")
            if stored == "et":
                leaked = page.evaluate("""(needles) => {
                  const clone = document.body.cloneNode(true);
                  clone.querySelectorAll('[lang="en"]').forEach(n => n.remove());
                  const attrs = [...document.querySelectorAll(':not([lang="en"] *)[aria-label], :not([lang="en"] *)[title]')]
                    .map(e => (e.getAttribute('aria-label') || '') + ' ' + (e.getAttribute('title') || '')).join(' ');
                  const hay = clone.innerText + ' ' + attrs;
                  return needles.filter(n => hay.includes(n));
                }""", ENGLISH_CHROME)
                if leaked:
                    failures.append(f"[et] {r}: English UI chrome outside an English scope: {leaked}")
        ctx.close()

    # Anchors must not depend on the display language.
    ids = {}
    for lang in ("en", "et"):
        ctx = browser.new_context()
        page = ctx.new_page()
        page.add_init_script(f"localStorage.setItem('language', '{lang}')")
        page.goto(base + BILINGUAL_ARTICLE, wait_until="networkidle")
        ids[lang] = page.evaluate("[...document.querySelectorAll('section[id^=\"sec-\"]')].map(s => s.id)")
        ctx.close()
    if not ids["en"] or ids["en"] != ids["et"]:
        failures.append(f"section anchors differ by language: en={ids['en'][:3]} et={ids['et'][:3]}")

    # First visit follows the browser language.
    for locale, want in (("et-EE", "et"), ("en-GB", "en"), ("fi-FI", "en")):
        ctx = browser.new_context(locale=locale)
        page = ctx.new_page()
        page.goto(base + "/", wait_until="networkidle")
        got = page.evaluate("document.documentElement.lang")
        if got != want:
            failures.append(f"first visit with browser {locale}: html lang={got}, expected {want}")
        ctx.close()
    browser.close()

for f in failures:
    print("FAIL", f)
print("i18n checks passed" if not failures else f"{len(failures)} i18n failures")
sys.exit(1 if failures else 0)
