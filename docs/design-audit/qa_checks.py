"""Automated WCAG / layout checks for the design-audit routes.

Usage: python3 docs/design-audit/qa_checks.py [base-url]   (default http://localhost:4173)
Exits non-zero if any check fails. Checks, per route and viewport:
  - no horizontal overflow
  - no rendered text under 12px
  - interactive targets >= 44x44 (WCAG 2.5.5; inline links inside running prose exempt)
  - first Tab on home lands on the skip link
"""
import sys
from playwright.sync_api import sync_playwright

base = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
routes = ["/", "/disclosures", "/systems", "/about", "/disclosures/smart-id-achilles-heel",
          "/disclosures/i-used-to-break-authentication", "/privacy", "/no-such-page"]
viewports = {"mobile": (375, 812), "tablet": (768, 1024), "desktop": (1440, 900)}

PROBE = """() => {
  const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const small = [...document.querySelectorAll('body *')].filter(e => vis(e) &&
    [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) &&
    parseFloat(getComputedStyle(e).fontSize) < 12).map(e => e.tagName + ':' + e.textContent.trim().slice(0, 30));
  const inProse = e => !!e.closest('p, td, dd, blockquote, figcaption');
  const targets = [...document.querySelectorAll('a[href], button')].filter(e => vis(e) && !inProse(e))
    .map(e => { const r = e.getBoundingClientRect(); return [e, Math.round(r.width), Math.round(r.height)]; })
    .filter(([, w, h]) => w < 44 || h < 44).map(([e, w, h]) => `${e.tagName}:${e.textContent.trim().slice(0, 24)} ${w}x${h}`);
  return { overflow: document.documentElement.scrollWidth - innerWidth, small, targets };
}"""

failures = 0
with sync_playwright() as p:
    browser = p.chromium.launch()
    for vp, (w, h) in viewports.items():
        page = browser.new_page(viewport={"width": w, "height": h})
        page.add_init_script("localStorage.setItem('language', 'en')")
        for r in routes:
            page.goto(base + r, wait_until="networkidle")
            res = page.evaluate(PROBE)
            problems = []
            if res["overflow"] > 0:
                problems.append(f"overflow {res['overflow']}px")
            if res["small"]:
                problems.append(f"text<12px {res['small'][:4]}")
            if res["targets"]:
                problems.append(f"targets<44 {res['targets'][:6]}")
            if problems:
                failures += 1
                print(f"FAIL {vp:7} {r}: " + "; ".join(problems))
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(base + "/", wait_until="networkidle")
    page.keyboard.press("Tab")
    first = page.evaluate("document.activeElement.textContent.trim().slice(0, 40)")
    on_skip = page.evaluate("document.activeElement === document.querySelector('a[href=\"#main-content\"]')")
    if not on_skip:
        failures += 1
        print(f"FAIL first Tab is not the skip link: {first!r}")
    else:
        print(f"ok   first Tab -> {first!r}")
    browser.close()

print("ALL CHECKS PASSED" if failures == 0 else f"{failures} failing route/viewport combos")
sys.exit(1 if failures else 0)
