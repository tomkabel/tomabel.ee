# tomabel.ee

Source of [tomabel.ee](https://tomabel.ee), the personal website and research portfolio of Tom Kristian Abel (ProksiAbel OÜ): security research, published disclosures and contact. The site is bilingual (Estonian and English).

## Stack

React, React Router, TypeScript, Vite (with a server-side render pass for static pages) and Tailwind CSS. Package manager: pnpm. Node.js 22.18 or newer.

## Development

```sh
pnpm install
pnpm dev        # local dev server
pnpm build      # client build + SSR pre-render, then route and link checks
pnpm lint
pnpm typecheck
pnpm test
```

## License

Copyright © 2025–2026 Tom Kristian Abel / ProksiAbel OÜ.

Licensed under the [GNU Affero General Public License v3.0 or later](LICENSE) (AGPL-3.0-or-later). If you run a modified version of this site, you must offer its source to its visitors. The license covers copyright only: it grants no rights to the name Tom Kristian Abel, ProksiAbel OÜ or their logos. Copies obtained while the project was MIT-licensed keep their MIT terms.

Six early scaffold commits (2025-03-02, "Release 1-3" series: navbar, image and path fixes)
carry the placeholder identity `username <e@mail.com>` from an unconfigured local `git init`;
they are Tom Kristian Abel's own work, made before GitHub tooling was set up. No third party
holds copyright in them. This is the written record requested before the AGPL relicense.
