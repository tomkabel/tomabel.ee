# Article integrity proofs

Each `<slug>.txt` is the canonical plain-text copy of a published article. The
`ArticleProof` component (`src/components/site/article-proof.tsx`) fetches this
file, hashes it in-browser with WebCrypto (SHA-256), and compares the result
against the `expectedSha256` committed to source. This proves the served text
has not been altered.

The detached signature `<slug>.txt.asc` proves authorship. It is **not**
verified in-browser (no openpgp.js); readers verify it out-of-band with `gpg`:

```
gpg --import public-key.asc
gpg --verify <slug>.txt.asc <slug>.txt
```

Signing key: `03DA 4E96 931B B2DC 095A 2109 0C2A 0C6F 110A ABC5`
(`0x0C2A0C6F110AABC5`).

## Maintenance — required manual step before deploy

The `.txt` files here are canonical text snapshots. After finalizing an
article's text:

1. Update `<slug>.txt` with the final canonical text.
2. Recompute the hash: `sha256sum public/verification/<slug>.txt`.
3. Paste it into the article page's `<ArticleProof expectedSha256="…" />`.
4. **Sign it (Tom only):**
   `gpg --detach-sign --armor public/verification/<slug>.txt`
   This produces `<slug>.txt.asc`. The agent does not sign.

Until a `.asc` exists, the integrity check still works (hash match); only the
signature is "pending".
