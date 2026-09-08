# Article integrity proofs

Each `<slug>.txt` is the canonical plain-text copy of a published article. The
`ArticleProof` component (`src/components/site/article-proof.tsx`) fetches this
file, hashes it in-browser with WebCrypto (SHA-256), and compares the result
against the `expectedSha256` committed to source. This proves the served text
has not been altered.

These files are **generated** — do not hand-edit them. `scripts/canonical-text.mjs`
reads each article page's own content constants, renders the canonical text, and
rewrites that page's `expectedSha256` to match. CI fails if the two drift.

The detached signature `<slug>.txt.asc` proves authorship. It is **not**
verified in-browser (no openpgp.js); readers verify it out-of-band with `gpg`:

```
gpg --import public-key.asc
gpg --verify <slug>.txt.asc <slug>.txt
```

Signing key: `03DA 4E96 931B B2DC 095A 2109 0C2A 0C6F 110A ABC5`
(`0x0C2A0C6F110AABC5`).

## Maintenance

After editing any article body:

1. `pnpm canonical` — regenerates every `<slug>.txt` and updates each page's
   `expectedSha256`. Commit both.
2. **Sign it (Tom only):**
   `gpg --detach-sign --armor -u 0x0C2A0C6F110AABC5 public/verification/<slug>.txt`
   This produces `<slug>.txt.asc`. The agent does not sign.

Editing an article invalidates its existing signature, so step 2 must be redone
each time. A `.asc` that no longer verifies is worse than none — delete it
rather than shipping it stale.

Until a `.asc` exists the integrity check still works (hash match) and
`ArticleProof` says so plainly: it probes for the signature and only prints the
`gpg --verify` recipe when one is actually published.
