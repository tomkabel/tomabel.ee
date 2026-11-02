# Redesign plan: "The way of seeing" (2026-11-02)

Supersedes the `design/living-protocol` direction. Reference set: `img3/`. The favored
samples (the ones saved twice) are expert4, expert9, expert10, `-032043-099`,
`-033758-727`, `-033936-588`, `-034148-341`.

## What the favored samples share

1. **Diagrams are the content.** Every favored image puts a flat 2D schematic (a
   sequence diagram, a state machine, a flow graph) inside a dark card, either between
   paragraphs or as the thumbnail of a post. The current site decorates with ambient
   telemetry (TelemetryLayer, HashStream, FaultLine). The samples have no ambient layer.
   All the visual interest comes from the explanatory figures.
2. **Two-state "broken vs fixed" figures.** Attack flow above, zero-trust fix below.
   SECURE-BY-HOPE (grey) sits over SECURE-BY-DESIGN (emerald). The color carries
   meaning: amber marks the attacker or failure path, emerald marks the verified path,
   white is neutral.
3. **Editorial serif with a quiet layout.** A big Newsreader headline ("The way of
   seeing."), a narrow reading column, a top bar with only the wordmark and 3 or 4
   text links. There are no gradients, glows or 3D.
4. **Homepage = index, not a showcase.** A hero line, one signature split-schematic, an
   editorial list or 2x2 grid of research posts with schematic thumbnails, mono date
   and read-time, amber topic tags, then the KRATT callout (amber border), the PGP card
   (emerald border) and the footer.
5. **A live TLS inspector strip** (expert9 and 033758). It's one mono bar showing the
   real connection facts.

The palette is already in DESIGN.md (`#0a0c0b`-ish canvas, `#111615` cards, `#1e2624`
1px borders, emerald `#10b981`, amber `#f59e0b`). This is a structural and
content-system change, not a recolor.

## Plan

### Phase 0: Branch and cut (½ day)
- New branch `design/way-of-seeing` from `main`, not from `living-protocol`.
- Delete the ambient system: TelemetryLayer, HashStream, FaultLine, and any
  canvas/Three/OGL deps left in `package.json` that only those use. Bundle size should
  drop noticeably. Record the before/after numbers.
- Keep the tokens. Tighten them in `src/index.css` to the sample hexes: canvas
  `#0a0c0b`, surface `#111615`, border `#1e2624`. Drop unused surface/overlay steps.

### Phase 1: The figure system (core work, 2–3 days)
One `<Figure>` primitive plus 3 diagram kinds, all hand-authored inline SVG (no chart
lib, so they survive SSR prerender and read without JS):
- `SequenceDiagram`: lanes, plus arrows `{from, to, label, kind: neutral|attack|verified}`.
  This covers the relay attack and mTLS fix figures (expert4, 034148).
- `FlowGraph`: boxes and orthogonal edges, positioned by explicit grid coordinates (no
  auto-layout). Covers the bytecode VM and TLS figure (033936) and the card thumbnails.
- `SplitFigure`: two stacked panes, "before" in muted grey and "after" in emerald.
  This is the signature hero piece (expert10, 032043).
- Shared rules: 1px strokes, mono 11–12px labels, `kind` mapped to color via tokens,
  `<title>`/`<desc>` plus a text caption for a11y, and a figure number with a caption
  beneath. Reduced motion means static. Otherwise allow only a one-time stroke draw-in.
- Reuse whatever is salvageable from the existing ApprovalSequence, BytecodeGraph and
  Octagon. They're the right idea, just restyle them onto the primitive.

### Phase 2: Homepage (1–2 days)
Order: top bar, then hero ("The way of seeing." plus the SplitFigure login→WebAuthn),
then a TLS inspector strip, then the research index, then the KRATT callout, then PGP,
then the footer.
- Research index: a 2-column grid of cards. Each card has a FlowGraph thumbnail, a mono
  date and read-time in emerald, a serif title, a one-line dek and an amber tag.
- TLS strip: reuse the telemetry.tsx `connection.json` fetch; render only when live. No invented "Status: SECURE" theatre (see 3a25a75).
- Remove WorkCard and the essay-row variants they replace.

### Phase 3: Article template (2 days)
- A single `ArticleLayout`: 68ch serif column, title, mono byline (author · date · read
  time), and figures that break out to about 80ch. On ≥1280px, an optional right rail
  for "Related" (034148).
- Each of the ~20 research pages gets at least one real figure: the broken flow and its
  fix wherever the article has one. Go in priority order: Smart-ID, PIN delegation,
  BotGuard/bytecode, Zero-trust octagon, then the rest.
- Migrate pages to the layout mechanically. Content stays the same.

### Phase 4: Chrome and secondary pages (1 day)
- Nav: wordmark plus Research · Systems · About · RSS, and the language toggle as mono
  `ET / EN`. Mobile collapses to the same links with no drawer animation.
- Footer: "Estonia-based. I write in English and Estonian." plus `© 2026 TOM KRISTIAN
  ABEL · PROKSIABEL OÜ — PERSONALLY ACCOUNTABLE`, plus the reg. no. and the legal links.
- About, Systems, Disclosures and the legal pages inherit ArticleLayout.

### Phase 5: Verify and ship (1 day)
- Run `npx tsc --noEmit`, `npm run lint` and `npm run build`. The prerendered HTML must
  contain figure captions and `<desc>` text.
- Take Playwright screenshots at 375, 768 and 1440 widths and compare them side by side
  with the favored samples. Check contrast with axe, check the figures under reduced
  motion and keyboard navigation.
- Lighthouse on home plus one article: LCP below 1.5s and no CLS from the figures
  (each SVG gets a fixed `viewBox` and aspect-ratio).
- Rewrite DESIGN.md from the shipped result and mark the CLAUDE.md architecture
  section stale or update it.

## Explicitly not doing
- Light-mode bands (the grey wave in expert4 is a generation artifact).
- Iconography-heavy thumbnails like the person and lock icons in 033758. Keep schematic
  boxes and lines only.
- Any new dependency. SVG plus Tailwind covers everything here.

## Decisions (tiltrank, 2026-11-02; log: docs/.decisions.log)
1. Hero headline: localized pair. EN "The way of seeing." / ET "Vaatevinkel."
2. Research index: hybrid. 4 featured schematic cards, then an editorial archive list.
3. TLS strip: reuse the existing `connection.json` inspector (`src/components/site/telemetry.tsx`).
   Render the strip only on a live result; on failure or `live:false` it is absent, not empty.
