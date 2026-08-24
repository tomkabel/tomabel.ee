import { useTranslation } from '../../i18n/LanguageContext';

// Key facts verified against public/public-key.asc on 2026-08-24
// (gpg --show-keys). If the key changes, update here and regenerate WKD.
export const pgpKey = {
  keyId: '0x0C2A0C6F110AABC5',
  fingerprint: '03DA 4E96 931B B2DC 095A 2109 0C2A 0C6F 110A ABC5',
  sha256: 'a63667ca9b1729e02b24c19cf2441953b76b934417a17b042fd1eeab68d8530a',
  url: '/public-key.asc',
};

// One PGP key card, rendered on /disclosure and /about — same key, one source
// of truth, so a future key rotation updates both surfaces at once.
export default function PgpCard() {
  const { t } = useTranslation();

  return (
    <div className="bg-surface p-4 border border-border text-muted space-y-2">
      <p>
        <a href={pgpKey.url} className="text-accent hover:underline">
          {t.disclosure.pgp.download}
        </a>
      </p>
      <p>
        <strong className="text-accent">{t.disclosure.pgp.keyId}:</strong>{' '}
        <span className="font-mono text-sm">{pgpKey.keyId}</span>
      </p>
      <p>
        <strong className="text-accent">{t.disclosure.pgp.fingerprint}:</strong>{' '}
        <span className="font-mono text-sm">{pgpKey.fingerprint}</span>
      </p>
      <p>
        <strong className="text-accent">{t.disclosure.pgp.sha256}:</strong>{' '}
        <span className="break-all font-mono text-sm">{pgpKey.sha256}</span>
      </p>
    </div>
  );
}
