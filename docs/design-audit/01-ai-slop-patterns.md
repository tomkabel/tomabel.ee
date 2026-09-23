# 01 — AI-slop frontend patterns (reference catalogue)

Reference list of visual and interaction patterns that mark a frontend as AI-generated or
low-effort (v0, Lovable, Bolt, Cursor, Claude/GPT landing pages, shadcn defaults), 2025-2026.
Compiled 2026-09-23 from the sources at the end. Use it as the rubric for later audit docs.

**How to read it**

- **Sev** is 1-5. 5 means the pattern alone is a strong AI tell. 1 means it only counts when it
  shows up alongside others.
- **Freq** is how often it turns up in AI output: common, occasional or rare.
- **Grep** is a starting regex or class list for `rg` over `src/`. A match needs checking by hand;
  Krebs measured a 5-10% false-positive rate for deterministic CSS/DOM checks.
- The combination is what gives it away. No pattern is wrong by itself. Noqta: "the problem is
  that everyone uses all of them at once". In Krebs' 1,590-page Show HN scan, 46% of pages were
  clean (0-1 patterns) and roughly a fifth were heavy slop.

---

## C — Color

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| C1 | "VibeCode Purple" gradient | Indigo/violet to blue/pink gradient on hero, CTA or background with no semantic reason. The best-known tell. | `from-(indigo\|purple\|violet)-[4-6]00`, `to-(blue\|pink\|fuchsia)-`, `linear-gradient\(.*#(6366f1\|8b5cf6\|7c3aed\|a855f7)` | 5 | common |
| C2 | Gradient text | Headline word clipped to a gradient. | `bg-clip-text text-transparent`, `-webkit-background-clip:\s*text` | 5 | common |
| C3 | Dark mode with glowing accents | Permanent near-black background with neon/cyan/purple glows as the only depth cue. | `bg-(black\|zinc-950\|slate-950\|neutral-950)`, `shadow-.*-500/`, `drop-shadow-\[0_0_` | 4 | common |
| C4 | Coloured glow shadows | Large blurred box-shadows tinted with the accent colour on cards and buttons. | `shadow-(indigo\|purple\|cyan\|blue)-500/[0-9]+`, `box-shadow:.*rgba\((99\|139\|168),` | 4 | common |
| C5 | Radial halo / spotlight | Blurred radial blob or "spotlight" behind the hero content. | `radial-gradient\(`, `blur-3xl`, `blur-\[1[0-9]{2}px\]`, `absolute .* rounded-full .* blur` | 4 | common |
| C6 | Timid / evenly spread palette | Five or more hues at equal weight and no dominant colour; or an untouched Tailwind default ramp. | count distinct `-(red\|blue\|green\|purple\|pink\|amber)-[0-9]00` families > 3 | 3 | common |
| C7 | Flat surfaces, no tonal hierarchy | One background value everywhere, or a single accent at full saturation with no tints or shades. Cards are separated only by borders or shadows. | only one `bg-` token across sections; accent used only at `-500` | 3 | common |
| C8 | Alternating section bands | Mechanical white / `#F5F5F5` / white section backgrounds. | `bg-(gray\|slate)-50` alternating with `bg-white` | 2 | common |
| C9 | Medium-grey body on dark | `text-gray-400/500` body copy on near-black, which barely passes contrast (or fails it). | `text-(gray\|zinc\|slate\|neutral)-[45]00` on dark bg | 4 | common |
| C10 | Grey text on coloured background | Muted grey text placed on a tinted or gradient panel, so it reads as dirty and low contrast. | `text-gray-[4-6]00` inside `bg-(indigo\|purple\|blue)-` | 3 | occasional |
| C11 | Cream/beige "tasteful" palette | The 2026 counter-default: a `#f5f0e8`-style cream plus serif. It is now itself a model default. | `#f[5-9a-f]f[0-5]e[0-9a-f]`, `bg-(stone\|amber)-50` | 2 | occasional |

## T — Typography

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| T1 | Inter everywhere | Inter (or Roboto, Open Sans, system stack) for headings and body alike. Krebs singles out the centred Inter hero. | `font-family:.*Inter`, `fontFamily.*Inter`, `font-sans` as the only family | 4 | common |
| T2 | The "LLM font combo" | Space Grotesk, Instrument Serif and Geist in the usual pairings. Picked to avoid Inter, but just as predictable. | `Space Grotesk\|Instrument Serif\|Geist` | 3 | common |
| T3 | Italic-serif accent word | One word in the hero set in serif italic inside a sans headline ("Beautifully *crafted*"). | `<em\|italic.*font-serif\|font-serif.*italic` inside `h1` | 4 | common |
| T4 | Single family, flat hierarchy | One family, and heading levels step up evenly (16/24/32) with no dramatic contrast. | only `text-(xl\|2xl\|3xl)`, no `text-[5-9]xl` or `clamp(` | 3 | common |
| T5 | Only 400/700 weights | Weights limited to `font-normal` and `font-bold`, with no 300/500/600 or variable-axis use. | only `font-(normal\|bold)` present | 2 | common |
| T6 | No fluid scaling | Fixed breakpoint jumps (`text-4xl md:text-6xl`) instead of `clamp()`. | `text-[0-9]xl (sm\|md\|lg):text-` with no `clamp\(` in the CSS | 2 | common |
| T7 | Uppercase tracking-wide eyebrows | Small all-caps label with wide tracking above every section heading. | `uppercase tracking-(wide\|wider\|widest)`, `letter-spacing:\s*0\.[1-3]em` | 4 | common |
| T8 | All-caps headings / labels | Whole headings or nav set in caps. | `uppercase` on `h[1-3]` or nav links | 3 | common |
| T9 | Uniform line-height | `leading-relaxed` / 1.5 on headings and body alike, with no tightened display leading. | no `leading-(none\|tight)` on display text | 2 | common |
| T10 | Default tracking on display sizes | Large headings left at 0 tracking, or crushed with `tracking-tighter` everywhere. | `text-[6-9]xl` without `tracking-`; `tracking-tighter` on body | 2 | occasional |
| T11 | Oversized hero headline | A `text-7xl`+ headline with little to say, used as the main visual device. | `text-(7xl\|8xl\|9xl)` in hero | 2 | occasional |

## L — Layout

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| L1 | Centred hero + dual CTA | Full-screen centred hero: badge, big headline, one-line subtitle, primary and ghost button side by side. | `text-center` hero + `flex .* gap-4` with two `<Button` (`variant="outline"`) | 5 | common |
| L2 | Pill badge above H1 | "New" / "Introducing" / "v2.0" chip, often with a pulsing dot or sparkle, directly above the headline. | `rounded-full .* (px-3\|px-4) .* text-(xs\|sm)` right before `<h1` | 5 | common |
| L3 | Symmetric 3-card feature grid | Every section runs heading, description, then three identical cards. | `grid-cols-1 md:grid-cols-3`, `lg:grid-cols-3` repeated | 5 | common |
| L4 | Icon-in-rounded-square card | Feature card with a lucide icon in a tinted rounded tile above the heading. | `(h-1[02]\|w-1[02]) .* rounded-(lg\|xl) .* bg-.*/10` followed by `<[A-Z]\w+Icon\|lucide` | 5 | common |
| L5 | Stat banner row | "10x / 99.9% / 24/7 / 500+" metric strip, often made-up numbers. | `grid-cols-(3\|4)` with `text-(3xl\|4xl) font-bold` numerals; `99.9%\|24/7\|10x` | 4 | common |
| L6 | Numbered 1-2-3 steps | "01 Discover / 02 Design / 03 Deliver" sequence or tiny numbered section labels. | `0[1-3]` in `font-mono\|text-xs`; `step\s*[1-3]` | 3 | common |
| L7 | Monotonous spacing | The same `py-24`/`py-20` on every section and `gap-8` everywhere, with no rhythm between related and unrelated blocks. | identical `py-(16\|20\|24)` on all `<section` | 3 | common |
| L8 | Everything centred | Body copy, cards and section heads all centre-aligned. | `text-center` count ≈ section count; `mx-auto text-center max-w-` | 3 | common |
| L9 | Nested cards | Card inside card inside card; bordered panels within bordered panels. | `<Card` within `<Card`; nested `rounded-.* border` | 3 | occasional |
| L10 | Bento grid by default | Asymmetric bento tiles for content that has no size hierarchy. | `col-span-2 row-span-2`, `grid-rows-` in a features section | 2 | occasional |
| L11 | Decorative grid-line / dot background | Faint grid or dot pattern masked with a radial fade behind the hero. | `bg-\[linear-gradient\(to_right`, `bg-grid`, `mask-image:\s*radial-gradient` | 3 | common |
| L12 | Logo-cloud + testimonial + FAQ + CTA stack | The fixed SaaS section order, including a fake "Trusted by" row. | `Trusted by\|Loved by`, `Accordion` FAQ just before the footer CTA | 2 | common |
| L13 | Template sameness | With the text removed, the page cannot be told apart from any other SaaS page. Test: blank the copy and look at the screenshot. | manual screenshot test | 4 | common |

## K — Components & surfaces

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| K1 | Side-stripe accent card | A 3-4px coloured left (or top) border on a rounded card or blockquote. "As reliable a sign as em-dashes." | `border-l-(4\|\[3px\])`, `border-t-4`, `border-left:\s*[34]px solid` with `rounded` | 5 | common |
| K2 | Glassmorphism everywhere | Frosted translucent cards (`backdrop-blur`) over gradients. The 2022 look that became the LLM default. | `backdrop-blur(-sm\|-md\|-lg\|-xl)?`, `bg-white/(5\|10)`, `backdrop-filter:\s*blur` | 4 | common |
| K3 | Uniform big radius | The same `rounded-xl/2xl` on cards, buttons, inputs, badges and images, so the hierarchy disappears. | `rounded-(xl\|2xl\|3xl)` ratio > 70% of all `rounded-` | 4 | common |
| K4 | Untouched shadcn defaults | Default `--radius: 0.5rem`, zinc/slate tokens, `Button`/`Card`/`Badge` variants never restyled. | `components/ui/`, `--radius:\s*0\.5rem`, `hsl\(var\(--primary\)\)` unchanged | 4 | common |
| K5 | Hairline border + wide soft shadow | `border border-white/10` or `border-gray-200` paired with a large diffuse shadow on every card. | `border .* shadow-(xl\|2xl)`, `shadow-\[0_\d+px_\d{2,}px` | 3 | common |
| K6 | Gradient buttons / overlays | Gradient-filled CTAs and gradient overlays on images. | `bg-gradient-to-r .* (Button\|<a\|<button)`, `from-black/.* to-transparent` over images | 3 | common |
| K7 | Stock lucide icons uncustomised | Default lucide set at default stroke, with a generic metaphor per feature (Zap, Shield, Rocket, Sparkles). | `lucide-react` imports of `Zap\|Shield\|Rocket\|Sparkles\|Star\|CheckCircle` | 3 | common |
| K8 | Emoji as icons / bullets | 🚀 💡 ✨ ⚡ as section icons, list bullets or nav icons. | `[\x{1F300}-\x{1FAFF}\x{2728}\x{26A1}]` in JSX/strings | 5 | common |
| K9 | Pulsing "Live" dot | A green or accent dot with `animate-ping`/`animate-pulse` on things that are not live. | `animate-(ping\|pulse)` on a `rounded-full h-2 w-2` | 4 | common |
| K10 | Sparkle glyph decoration | ✦ ✧ ⌁ ↗ glyphs as decorative bullets or icon stand-ins. | `✦\|✧\|⌁` | 3 | occasional |
| K11 | Fake dashboard mock | Hero screenshot built from fake UI (made-up charts, lorem metrics) instead of the real product. | `recharts` or hard-coded data arrays in the hero component | 3 | occasional |
| K12 | Placeholder / AI imagery | Gradient boxes standing in for images, or AI illustrations with melted details. | `bg-gradient-.* aspect-video` with no `<img`; `placeholder.svg` | 3 | occasional |
| K13 | Massive icons | Icons scaled up to fill space instead of content. | `(h\|w)-(16\|20\|24)` on an icon component | 2 | occasional |

## I — Interaction & motion

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| I1 | Blanket `transition-all duration-300` | The same transition on every interactive element, animating layout properties as well. | `transition-all duration-300`, `transition:\s*all` | 3 | common |
| I2 | `hover:scale-105` on everything | Cards, buttons and images all grow on hover, with no state difference between element types. | `hover:scale-(105\|110)`, `hover:-translate-y-1` repeated | 3 | common |
| I3 | Missing focus indicators | `outline-none` without a `focus-visible` replacement; keyboard users get no state. | `outline-none\|focus:outline-none` without `focus-visible:ring` nearby | 4 | common |
| I4 | No or identical hover states | Links and buttons have no hover state, or all share one opacity change. | `hover:opacity-(80\|90)` as the only hover variant | 2 | common |
| I5 | Fade-up on every section | Each section fades in and slides up 20px on scroll, all the same way, in place of one orchestrated moment. | `initial=\{\{ opacity: 0, y: 20` repeated; `animate-fade-in-up` | 3 | common |
| I6 | Bounce / elastic easing | Springy overshoot on UI chrome. | `ease-bounce\|cubic-bezier\(.*1\.[2-9]`, `type: "spring"` on buttons | 2 | occasional |
| I7 | Auto-scrolling marquee | An infinite logo or testimonial ticker. | `animate-(marquee\|scroll)`, `@keyframes marquee` | 3 | common |
| I8 | Decorative blinking cursor / typewriter | Typewriter hero text with a blinking caret. | `animate-blink`, `typewriter`, `TypeAnimation` | 3 | occasional |
| I9 | Images that move on hover | Zoom-on-hover on every image thumbnail. | `group-hover:scale-1[01]0` on `<img` | 2 | common |
| I10 | Reduced motion ignored | None of the motion above checks `prefers-reduced-motion`. | absence of `prefers-reduced-motion\|motion-reduce:` | 3 | common |

## X — Copy tells (visible in the UI)

| ID | Pattern | Description | Grep signature | Sev | Freq |
|----|---------|-------------|----------------|-----|------|
| X1 | Em-dash overuse | Em-dashes in headlines, subtitles and card copy. | `—` count per 1k words | 4 | common |
| X2 | Buzzword verbs | Unlock, Elevate, Empower, Supercharge, Seamless, Effortless, Next-generation, Revolutionize. | `\b(Unlock\|Elevate\|Empower\|Supercharge\|Seamless\|Effortless\|Revolutioni[sz]e\|Next-gen)` | 5 | common |
| X3 | Triads and two-word slogans | "Automate. Integrate. Scale." / "Move faster. Work smarter. Grow together." | `\w+\.\s\w+\.\s\w+\.` in headings | 4 | common |
| X4 | Generic section heads | "Features", "Solutions", "Why choose us", "How it works". | `>(Features\|Solutions\|Benefits\|Why Choose Us\|How It Works)<` | 3 | common |
| X5 | Vague CTAs | "Get started", "Learn more" on every card. | `Get started\|Learn more` count > 2 | 3 | common |
| X6 | "Everything you need to…" | Promises of completeness with no specifics; "for modern teams". | `Everything you need\|for modern teams\|all-in-one` | 4 | common |
| X7 | Forced contrast framing | "Not X, but Y" / "It's not just a tool, it's a…" patterns. | `not just\|isn't just\|It's not .*, it's` | 3 | common |
| X8 | Redundant UX writing | A heading and subtitle that say the same thing twice; the same text repeated in one container. | manual | 2 | occasional |

---

## Quick scoring rubric

1. Count the distinct IDs that hit. 0-1 is clean (Krebs' 46% bucket). 2-4 is mild. 5+ is heavy slop.
2. Any single Sev-5 hit (C1, C2, L1-L4, K1, K8, X2) is worth fixing whatever the total.
3. After the grep pass, run the screenshot/blank-copy test (L13). It catches template sameness that
   no regex will find.

What separates clean sites (developersdigest, noqta): a palette that isn't the LLM default, a type
system that isn't Inter, and one strong layout primitive repeated on purpose. Those choices are
written down in tokens or a DESIGN.md, so they don't have to be made again on every prompt.

## Sources

Scraped in full:

- Adrian Krebs, "Scoring Show HN submissions for AI design patterns": https://www.adriankrebs.ch/blog/design-slop/
- Developers Digest, "AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded": https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- AIToolPick, "How to Make Your Website Not Look AI-Generated (30-Point Checklist)": https://aitoolpick.org/blog/ai-generated-website-checklist/
- Noqta, "Escaping AI Slop: Fix the 4 Overused AI UI Patterns": https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026
- Claude Cookbook, "Prompting for frontend aesthetics": https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- Impeccable anti-patterns / slop rule catalogue: https://impeccable.style/anti-patterns/ and https://impeccable.style/slop

Search-result summaries only (not scraped):

- https://github.com/pbakaus/impeccable
- https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono
- https://rottoways.com/blog/ai-generated-website-looks-generic
- https://claude.com/blog/improving-frontend-design-through-skills
- https://github.com/LeoStehlik/no-slop-ui
