# 02 — Audit findings (HEAD baseline, af7c6f8)

Rubric: `01-ai-slop-patterns.md`. Scope: `git show HEAD:` of `src/**/*.tsx`, `src/index.css`,
`tailwind.config.js`, `index.html` (47 tsx/css files), plus `src/content/site.ts` for visible copy.
Screenshots: `screens/before/*.png` (home/article/systems/404/privacy desktop and home-mobile were reviewed).
Line numbers are HEAD line numbers. Counts come from regex sweeps over the HEAD snapshot.

## 1. Summary

- **Rubric score: 24 distinct IDs hit**: L2, L3, L4, L6, L7, L8, L11, L13, T2, T3, T6, T7, T8, C9, K1, K2,
  K6, K8, K9, I1, I2, I8, X1, X7. By the rubric's arithmetic (5+ = heavy) that counts as heavy slop, but the
  number overstates it. Most hits are low intensity (one file, or the variant rather than the
  canonical form). The families that do the damage are **T7 eyebrows, X1 em-dashes, L11 grid mask, K1 stripes,
  the L2 pill and T2 fonts**, because they sit on every page.
- **Sev-5 rubric IDs present** (fix whatever the total): L2 (pill badge, card variant), L4 + K8 (ErrorBoundary
  tile + emoji), K1 (Callout rounded side-stripe).
- **Clean on the big tells**: no C1 purple, no C2 gradient text, no C4 glow shadows, no C5 halo blob, no L1
  dual-button hero, no L5 stats, no L12 logo cloud, no X2/X6 buzzwords, no I10 (reduced motion is handled).
- **Findings by severity (26 total):** Sev 5: 0 · Sev 4: 5 · Sev 3: 11 · Sev 2: 8 · Sev 1: 2.
- **WCAG contrast on #0A0B0D** (then on surface #111318 and surface-2 #171A21):
  foreground #F2F4F8 17.88 · muted #A2AAB8 **8.42** (7.94 / 7.44) · muted-foreground #8B94A4 **6.44**
  (6.08 / 5.70) · subtle #6C7788 **4.34, fails AA for body text** (4.10 / 3.84) · accent #34D399 **10.24**
  (9.67 / 9.06) · warning 10.85 · danger 7.12 · accent-foreground on accent 9.89.

## 2. Findings (sorted by severity)

| ID | Rubric | File:line (HEAD) | Pattern | Sev | Occurrences / files | Snippet | Screen |
|----|--------|------------------|---------|-----|---------------------|---------|--------|
| F01 | L4 K6 K8 | src/components/ErrorBoundary.tsx:25-26 | Gradient icon-in-rounded-square tile with ⚠ emoji, centred card, `rounded-xl` CTA | 4 | 1 file (renders on every crash) | `w-16 h-16 rounded-xl bg-gradient-to-br from-accent/30 to-warning/30` | not captured (runtime only) |
| F02 | T7 | src/components/site/section-header.tsx:17 | Uppercase wide-tracked mono eyebrow with accent hairline above every section head | 4 | `uppercase` 132× / 35 files; `tracking-widest` 65, `[0.2em]` 32, `[0.25em]` 30, `[0.3em]` 1; hairline eyebrow 5× / 3 files | `font-mono text-xs uppercase tracking-[0.25em]` + `h-px w-8 bg-accent/60` | home-desktop (every section), systems-desktop |
| F03 | a11y | src/components/site/nav.tsx:56-63 | Touch targets under 44px (under 24px for some): telemetry icon button is a bare 14px glyph with no padding; language toggle ~16px tall (:65); hamburger 20px (:78-85); telemetry close 20px (telemetry.tsx:112); Systems filter chips are unpadded `text-xs` (SystemsPage.tsx:124) | 4 | 5 controls / 3 files; 0 `min-h-11`/`size-11` in src | `<Activity className="size-3.5" />` | home-mobile (top bar) |
| F04 | X1 | src/content/site.ts:13 | Em-dashes in eyebrow, hero intro, card blurbs, essay titles | 4 | 185 in non-comment tsx lines / 30 files + 40 in site.ts | `'Tom Kristian Abel — Estonia'` | home-desktop (eyebrow, intro, cards, essay list) |
| F05 | L2 (card) | src/components/site/work-card.tsx:18 | Tinted pill badge (`rounded-full`, accent/7% fill, 10px mono caps) above each card title | 4 | 4 cards on home; same pill chrome is also on SystemsPage status | `rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 font-mono text-[10px]` | home-desktop Featured Work |
| F06 | K1 | src/components/site/article.tsx:31 | Callout: rounded card with 2px coloured left stripe. The stripe also appears on PullQuote (:43), the home blockquote (HomePage.tsx:55) and the EntryRow hover bar (entry-row.tsx:87) | 3 | 4 components; Callout used across the research pages | `rounded-lg border border-l-2 border-border-strong ${toneRing[tone]}` | article-desktop, home-desktop "fault line" |
| F07 | L11 | src/index.css:53-59 | `.grid-bg` 64px grid-line background under a radial-gradient mask behind every hero | 3 | 20 usages: HomePage.tsx:16 + all 19 article pages (e.g. KrattProblemPage.tsx:65) | `[mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]` | home-desktop hero (faint) |
| F08 | T2 | tailwind.config.js:7-8 | Geist sans + Space Grotesk display, the "LLM font combo" | 3 | 4 decl. (tailwind.config.js:7-8, index.css:15, main.tsx:5-6); `font-display` 90× / 31 files | `display: ['"Space Grotesk Variable"', '"Geist Variable"', …]` | every screen (all headings) |
| F09 | I1 I2 | src/components/site/work-card.tsx:16 | `transition-all duration-300` plus translate-lift on hover for cards | 3 | `transition-all` 6 files; hover lift 5 files (work-card:16, cross-nav:22, SystemsPage:194, ProjectsPage:180, entry-row:46/HomePage:147 arrow) | `transition-all duration-300 hover:-translate-y-1 … hover:shadow-elevated-accent` | home-desktop cards, systems-desktop |
| F10 | a11y/T7 | src/components/site/work-card.tsx:30 | Text under 12px, nearly always uppercase, widely tracked and muted | 3 | `text-[10px]` 33× / 19 files; `text-[11px]` 25× / 23 files (58 total) | `font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground` | home-desktop card tags, footer; systems-desktop |
| F11 | C9 | src/components/site/footer.tsx:53 | `subtle` #6C7788 (4.34:1) used for readable text, sometimes at 10-11px | 3 | `text-subtle` 14× (footer:53 at 10px, telemetry.tsx:131 at 11px, ErrorBoundary.tsx:29 body, CodeBlock line numbers/comments article.tsx:87,90) | `font-mono text-[10px] uppercase tracking-widest text-subtle` | home-desktop footer baseline |
| F12 | L6 | src/pages/KrattProblemPage.tsx:114 | Numbered `01 / 02` label above every article h2, which repeats the numbering already in the ReaderRail TOC (reader-rail.tsx:117) | 3 | 19 article pages + rail | `{String(i + 1).padStart(2, '0')}` | article-desktop |
| F13 | L13 L3 | src/pages/SystemsPage.tsx:99 | Template sameness: near-black, mint accent, Space Grotesk, mono eyebrows and a grid of identical bordered cards (17 cards, `xl:grid-cols-3`, same chrome for flagship and minor repos). With the copy blanked it reads as the stock dark dev-portfolio | 3 | systems + home featured grid | `grid gap-6 md:grid-cols-2 xl:grid-cols-3` | systems-desktop, home-desktop |
| F14 | C7 (accent dilution) T4 | src/components/PrivacyPolicy.tsx:18 | Legal pages set every h2/h3 in accent, in plain sans `text-xl` with no display face; also uses an off-token `text-red-400` (PrivacyPolicy.tsx:142). Contradicts "accent reserved for semantic signals" (tailwind.config.js:25) | 3 | 35 accent headings / 6 files (Privacy 12, Terms 11, Disclosure 8, MyStory 2, About 1, Projects 1) | `<h2 className="text-xl text-accent font-semibold mb-4">` | privacy-desktop |
| F15 | T3 (colour variant) | src/pages/HomePage.tsx:25 | Headline whose second clause is recoloured in accent ("Now I build the kind that doesn't."), the colour version of the accent-word hero | 3 | 1 (the hero) | `<span className="text-accent">{site.hero.line2[language]}</span>` | home-desktop, home-mobile |
| F16 | L13 (maintenance) | src/pages/KrattProblemPage.tsx:64-124 | Article scaffold copy-pasted across 19 pages with no ArticleLayout. 26 distinct className lines appear in 5+ of the pages (**430 occurrences**) and 14 lines are identical in all 19. A dead `<div hidden>` "Thesis" box survives in 8 pages (KrattProblemPage.tsx:95) | 3 | 19 files | `<header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">` ×19 | article-desktop |
| F17 | tokens | src/index.css:19-26 | Hard-coded colours; **0 CSS custom properties** (tokens exist only in the Tailwind JS config), so index.css repeats token hex/rgba (:19-20, :26, :55-56). `bg-[#0b0d12]` off-token code surface (article.tsx:74). Ad-hoc `bg-white/[0.0x]` tint layer used in place of surface tokens: 69× / 23 files (57× `[0.03]`). index.html:7 `theme-color #0A0A0B` ≠ background `#0A0B0D` | 2 | 17 hex + 9 rgba in 4 files; 69 white-alpha | `outline: 2px solid #34D399;` | article-desktop meta chips |
| F18 | T6 | src/pages/HomePage.tsx:23 | No fluid type: 0 `clamp()`, 45 breakpoint jumps (`md:`/`lg:text-Nxl`) in 25 files | 2 | 45 / 25 files | `text-5xl … md:text-7xl` | home-mobile vs desktop |
| F19 | K2 | src/components/site/nav.tsx:20 | `backdrop-blur` on sticky bars and the modal scrim. Restrained (no frosted cards), but 4 uses | 2 | nav:20, telemetry.tsx:98, DisclosuresPage:102, SystemsPage:81 | `bg-background/80 backdrop-blur-md` | systems-desktop filter bar |
| F20 | L8 L1-lite | src/components/NotFound.tsx:9-15 | 404 is the one centred, generic screen: `text-6xl` accent number, `rounded-xl` filled button, no display face, "Page Not Found" title case. Off-system next to the editorial pages | 2 | 1 file (ErrorBoundary repeats it) | `inline-block px-6 py-3 bg-accent … rounded-xl` | 404-desktop |
| F21 | T8 | src/components/site/nav.tsx:35 | All-caps tracked nav links (desktop and mobile :110) | 2 | 2 | `text-xs font-medium uppercase tracking-widest` | home-desktop nav |
| F22 | K9 | src/App.tsx:67 | Pulsing accent dot used as the route loader | 2 | 1 | `size-2.5 animate-pulse rounded-full bg-accent` | not captured |
| F23 | X7 | src/pages/AuthenticationEssayPage.tsx:63 | "not just X" contrast framing | 2 | 5 (Authentication 63/91, Pin 93, SmartId 102, article-proof 47) | `not just` | article prose |
| F24 | L7 | src/pages/HomePage.tsx:49 | Every home section uses the same `py-24` with no rhythm between related and unrelated blocks | 2 | 3 sections + hero `pb-24` | `px-6 py-24` | home-desktop |
| F25 | I8 | tailwind.config.js:41 | `caret-blink` keyframe defined but never used (leftover from a typewriter) | 1 | 1 | `'caret-blink': { '0%, 49%': …` | — |
| F26 | dead code | src/pages/ProjectsPage.tsx:180 | Unrouted page (`/projects` redirects to `/systems`, App.tsx:143) that duplicates the SystemsPage card; `SectionHeader` still takes an unused `index` prop (section-header.tsx:10) | 1 | 213 lines | `transition-all duration-300 hover:-translate-y-0.5` | — |

False positives excluded: X2 "elevated" (10) is the `shadow-elevated` class name, and "unlocks/unlocked" (2) are
literal technical prose. `outline-none` at App.tsx:98 (skip-link target) and telemetry.tsx:105 (programmatically
focused panel) keep the global `:focus-visible`, so I3 is not hit. The static `● LIVE` dots (SystemsPage.tsx:205)
mark real live deployments and do not pulse, so they are not K9.

## 3. Prioritized remediation (top 10)

1. **Extract `ArticleLayout` / `ArticleHeader` / `ArticleSection`** (F16, F12, F07-article side). Lever: component
   edit, then mechanical replace across 19 pages. Removes 430 duplicated lines, the 8 dead `hidden` boxes and
   the duplicated 01/02 numbering (keep numbers in the rail only). Every later article change touches one file.
2. **Retire the eyebrow system** (F02, F10, F21). Lever: token plus component edit. Add a `text-label`
   utility (≥12px, `tracking-[0.08em]`, sentence case or small-caps) in the Tailwind config; drop the accent hairline;
   mechanically replace `text-[10px]`/`text-[11px]` (58) and cut `tracking-[0.2-0.3em]` (63). Keep caps only
   for true metadata (dates, tags).
3. **Fix touch targets** (F03). Lever: component edit in nav.tsx / telemetry.tsx / SystemsPage filter. Give
   icon buttons `grid size-11 place-items-center` (or `-m-3 p-3`) and give filter chips `min-h-11 px-3`.
4. **De-pill and de-lift cards** (F05, F09, F13). Lever: component edit (work-card, cross-nav, SystemsPage card).
   Turn the impact pill into a plain mono meta line. Replace `transition-all … -translate-y-1` with
   `transition-colors` + border colour change. Give flagship systems a different layout (wide row) from minor repos.
5. **Tokenise colour as CSS custom properties** (F17, F11). Lever: token change. Define `--bg`, `--surface*`,
   `--fg`, `--muted*`, `--accent`, `--line` in index.css `:root`, point the Tailwind config at `var(--…)`, and
   replace the 69 `bg-white/[0.0x]` with `bg-surface`/`bg-surface-2`. Lift `subtle` to about #7C8798 (≥4.5:1 on
   surface-2) or ban it for text. Fix theme-color to #0A0B0D and delete `bg-[#0b0d12]`.
6. **Remove K1 stripes** (F06). Lever: component edit in article.tsx and HomePage. Callout becomes a full
   hairline border with a tone-coloured label only. PullQuote can use typographic scale (serif, hanging quote)
   with no rule. Drop the EntryRow hover bar.
7. **Rebuild ErrorBoundary + 404 on the editorial system** (F01, F20, F22). Lever: component edit. Left-aligned,
   mono status line (`ERR` / `404`), display h1, text link back home. No gradient tile, no emoji, no `rounded-xl`.
   Replace the pulse loader with a static label or nothing.
8. **Legal pages: headings in foreground, display face** (F14). Lever: mechanical replace (35×
   `text-accent` to `font-display text-foreground`) plus swapping `text-red-400` for the `danger` token.
9. **Replace Space Grotesk as the display face** (F08). Lever: token change (`fontFamily.display` + one
   `@fontsource` import). Options: set headings in Newsreader (already loaded) or use a less predictable
   grotesk. Geist body can stay if display changes. Add `clamp()` display sizes at the same time (F18).
10. **Drop the grid-mask hero background and copy passes** (F07, F04, F15, F23). Lever: mechanical replace
    (delete 20 `grid-bg` divs + utility) and a copy edit: swap em-dashes in UI strings (site.ts eyebrow, intro,
    card blurbs, titles) for commas/colons/full stops; reconsider the recoloured hero clause (weight or
    serif contrast instead of accent).

## 4. Not slop: keep these

- **Three-voice type split**: Newsreader serif for reading moments (fault-line strip, pull quotes), Commit
  Mono for machine data (hashes, JA4, code, metadata), sans for UI. It is purposeful. The problem is how much
  mono caps there is, not that mono exists.
- **Borders over glow.** Depth comes from a three-tier surface ramp (#0A0B0D / #111318 / #171A21) and a
  specular inset highlight, with no coloured glows, halos or blurred blobs (C3-C5 clean). No gradients
  anywhere except the ErrorBoundary tile.
- **Accessibility foundations**: global accent `:focus-visible` outline, a global `prefers-reduced-motion` reset,
  a focus-trapped and focus-restoring telemetry dialog, `aria-current` on nav/TOC, a role=progressbar reading meter.
  Main text tokens pass AA comfortably (muted 8.42, muted-foreground 6.44, accent 10.24).
- **One orchestrated motion moment**: staggered `rise-in` only on the home hero (8px, 0.6s), not fade-up on
  every section (I5 clean). The arrow-shift micro-interaction is small and consistent.
- **Layout**: left-aligned asymmetric hero with two text links (not L1), a 3/9 editorial grid, list rows
  for essays instead of cards, and a sticky reader rail with a live TOC. No stat strip, logo cloud or FAQ stack.
- **Honest components**: ArticleProof (in-browser SHA-256, and says plainly when there is no signature),
  Telemetry (fetch on open only, no fake values) and static LIVE dots on real deployments are
  on-brand for a security researcher and unlike anything a template would produce.
- **Copy is specific and first-person** ("I broke authentication for a living"), with no buzzword verbs, no
  "everything you need", no vague "Get started" CTAs. Em-dashes are the only systematic copy tell.
- **Restrained radius** (`rounded-lg` on 6 components, `rounded` on tags; K3 clean) and only 3 functional
  lucide icons at small size (K7/K13 clean).
