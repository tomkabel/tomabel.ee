// Stable anchor id for a section heading, shared by the rail's TOC links and the
// section elements the article renders.
export function sectionSlug(heading: string): string {
  return (
    'sec-' +
    heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
  );
}
