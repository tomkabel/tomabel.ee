import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';

// Canonical internal paths end in "/" (GitHub Pages serves dir/index.html and
// 301s the slash-less form). Every internal link goes through this so the
// prerendered HTML links straight to the canonical URL. Query and hash survive.
export function withSlash(to: string): string {
  const m = /^([^?#]*)(.*)$/.exec(to)!;
  const path = m[1] ?? '', rest = m[2] ?? '';
  if (!path.startsWith('/') || path.endsWith('/') || /\.[a-z0-9]+$/i.test(path)) return to;
  return `${path}/${rest}`;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => (
  <RouterLink ref={ref} to={typeof to === 'string' ? withSlash(to) : to} {...props} />
));
Link.displayName = 'Link';

export default Link;
