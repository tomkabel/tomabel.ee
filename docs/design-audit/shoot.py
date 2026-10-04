"""Full-page screenshots of the main routes at three viewports.

Usage: python3 docs/design-audit/shoot.py <out-dir> [base-url]
Needs a running `pnpm dev` (default http://localhost:5173).
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path(sys.argv[1])
base = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:5173"
routes = {
    "home": "/",
    "disclosures": "/disclosures",
    "systems": "/systems",
    "about": "/about",
    "article": "/disclosures/smart-id-achilles-heel",
    "essay": "/disclosures/i-used-to-break-authentication",
    "privacy": "/privacy",
    "404": "/no-such-page",
}
viewports = {"mobile": (375, 812), "tablet": (768, 1024), "desktop": (1440, 900)}

out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    for vp, (w, h) in viewports.items():
        page = browser.new_page(viewport={"width": w, "height": h}, reduced_motion="reduce")
        page.add_init_script("localStorage.setItem('language', 'en')")
        for name, path in routes.items():
            page.goto(base + path, wait_until="networkidle")
            page.wait_for_timeout(300)
            overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if overflow > 0:
                print(f"OVERFLOW {vp}/{name}: {overflow}px")
            page.screenshot(path=str(out / f"{name}-{vp}.png"), full_page=True)
        page.close()
    browser.close()
print(f"wrote {len(routes) * len(viewports)} screenshots to {out}")
