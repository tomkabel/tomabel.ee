import { useTranslation } from '../../i18n/LanguageContext';

export default function EntryRow({
  code,
  title,
  blurb,
  type,
  meta,
}: {
  code: string;
  title: { en: string; et: string };
  blurb?: { en: string; et: string };
  type: { en: string; et: string };
  meta?: string;
}) {
  const { language } = useTranslation();

  return (
    <article className="group relative border-b border-border py-8 transition-colors hover:bg-white/[0.02]">
      <span aria-hidden className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-subtle transition-colors group-hover:text-accent">
              {code}
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {type[language]}
            </div>
          </div>
          <div className="md:col-span-10">
            <h3 className="font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
              {title[language]}
              <span className="ml-2 inline-block font-mono text-base text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </h3>
            {blurb ? (
              <p className="mt-3 max-w-3xl text-muted">{blurb[language]}</p>
            ) : null}
            {meta ? (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {meta}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
