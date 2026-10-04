import { useTranslation } from '../../i18n/LanguageContext';
import { pgpKey } from './pgp-key';

// One PGP key card, rendered on /disclosure and /about — same key, one source
// of truth, so a future key rotation updates both surfaces at once.
export default function PgpCard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 rounded-figure border border-border bg-surface p-5 text-muted">
      <p>
        <a href={pgpKey.url} className="text-accent hover:underline">
          {t.disclosure.pgp.download}
        </a>
      </p>
      <p>
        <strong className="label mr-1 font-medium text-muted-foreground">{t.disclosure.pgp.keyId}:</strong>{' '}
        <span className="font-mono text-sm">{pgpKey.keyId}</span>
      </p>
      <p>
        <strong className="label mr-1 font-medium text-muted-foreground">{t.disclosure.pgp.fingerprint}:</strong>{' '}
        <span className="font-mono text-sm">{pgpKey.fingerprint}</span>
      </p>
      <p>
        <strong className="label mr-1 font-medium text-muted-foreground">{t.disclosure.pgp.sha256}:</strong>{' '}
        <span className="break-all font-mono text-sm">{pgpKey.sha256}</span>
      </p>
    </div>
  );
}
