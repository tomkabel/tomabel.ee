// The brand lockup: a rounded tile cut by one emerald slash ("fault line"),
// beside the serif wordmark. Chosen from img-logo/ because it is the only
// candidate that survives 16px, uses one accent, and extends the "/" the nav
// already carried. The parent link supplies `group` for the hover state.
export function BrandMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden focusable="false" className={className}>
      <rect
        x="0.75"
        y="0.75"
        width="34.5"
        height="34.5"
        rx="7.25"
        strokeWidth="1.5"
        className="fill-surface stroke-subtle/50 transition-colors duration-fast group-hover:fill-surface-2 group-hover:stroke-accent/50"
      />
      <path d="M19.5 1.5 12.5 34.5" strokeWidth="1" className="stroke-surface-3" />
      <path d="M20.25 9 14.25 27" strokeWidth="2.5" className="stroke-accent" />
      <rect x="21.5" y="24.75" width="2.25" height="2.25" className="fill-accent" />
    </svg>
  );
}

// Screen readers and non-JS crawlers get the plain text "tomabel.ee"; the
// colour split is presentation only.
export default function Brand() {
  return (
    <>
      <BrandMark />
      <span className="font-display text-xl leading-none text-foreground">
        tomabel<span className="text-accent">.</span>
        <span className="text-muted-foreground">ee</span>
      </span>
    </>
  );
}
