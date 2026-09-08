import { useEffect, useState } from 'react';
import { pgpKey } from './pgp-card';

type Status = 'checking' | 'match' | 'mismatch' | 'error';

async function sha256Hex(buffer: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Honest integrity proof: fetch the canonical plain-text copy of this article
// from /verification/<slug>.txt, hash it in-browser (WebCrypto, no deps), and
// compare against the hash committed to source. The detached signature
// (<slug>.txt.asc) is verified out-of-band with gpg — the CLI path is the
// honest one; we do not claim in-browser signature verification.
export default function ArticleProof({
  slug,
  expectedSha256,
}: {
  slug: string;
  expectedSha256: string;
}) {
  const [status, setStatus] = useState<Status>('checking');
  const [computed, setComputed] = useState<string | null>(null);
  // Signing is a manual, offline step. Until the detached signature is actually
  // published, claiming one exists would be the dishonest half of an honesty
  // widget — so probe for it and only then print the gpg instructions.
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/verification/${slug}.txt`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const hex = await sha256Hex(await res.arrayBuffer());
        if (cancelled) return;
        setComputed(hex);
        setStatus(hex === expectedSha256 ? 'match' : 'mismatch');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    (async () => {
      const res = await fetch(`/verification/${slug}.txt.asc`, { method: 'HEAD' }).catch(
        () => null,
      );
      if (!cancelled) setSigned(Boolean(res?.ok));
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, expectedSha256]);

  const verdict = {
    checking: { text: 'Verifying…', tone: 'text-muted-foreground' },
    match: { text: 'MATCH ✓', tone: 'text-accent' },
    mismatch: { text: 'MISMATCH ✗', tone: 'text-danger' },
    error: { text: 'Canonical text unavailable', tone: 'text-muted-foreground' },
  }[status];

  return (
    <section
      aria-label="Cryptographic integrity proof"
      className="mx-auto max-w-4xl px-6 pb-16"
    >
      <div className="rounded-lg border border-border-strong bg-surface p-6 font-mono text-sm shadow-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Integrity · SHA-256
          </p>
          <span className={`text-xs font-bold uppercase tracking-widest ${verdict.tone}`}>
            {verdict.text}
          </span>
        </div>

        <dl className="mt-4 space-y-2 text-muted">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="shrink-0 text-subtle">expected</dt>
            <dd className="break-all text-foreground">{expectedSha256}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="shrink-0 text-subtle">computed</dt>
            <dd className={`break-all ${status === 'mismatch' ? 'text-danger' : 'text-foreground'}`}>
              {computed ?? '—'}
            </dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted">
          {signed ? (
            <>
              <p>
                The canonical text is signed with PGP key{' '}
                <span className="text-foreground">{pgpKey.fingerprint}</span>. Verify the
                detached signature yourself:
              </p>
              <pre className="mt-2 overflow-x-auto rounded border border-border bg-background/60 p-3 text-foreground">
{`curl -O https://tomabel.ee/public-key.asc
curl -O https://tomabel.ee/verification/${slug}.txt
curl -O https://tomabel.ee/verification/${slug}.txt.asc
gpg --import public-key.asc
gpg --verify ${slug}.txt.asc ${slug}.txt`}
              </pre>
              <p className="mt-3">
                <a href="/public-key.asc" className="text-accent hover:underline">
                  Download public key
                </a>
              </p>
            </>
          ) : (
            <p>
              This article&rsquo;s detached PGP signature is not published yet. The hash above
              proves the served text matches the digest committed to source; it does not yet
              prove authorship. Signing key{' '}
              <span className="text-foreground">{pgpKey.fingerprint}</span> &mdash;{' '}
              <a href="/public-key.asc" className="text-accent hover:underline">
                download public key
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
