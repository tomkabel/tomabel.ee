// Disclosure paragraphs store the whole policy sentence as plain text, so the
// verification texts read it complete; this links the phrase on the page.
const POLICY_URL = 'https://tomabel.ee/disclosure/';
const PHRASES = ['security research policy', 'turvauuringute põhimõtteid'];

export function PolicyText({ text }: { text: string }) {
  const phrase = PHRASES.find((p) => text.includes(p));
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  return (
    <>
      {text.slice(0, at)}
      <a
        href={POLICY_URL}
        className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
      >
        {phrase}
      </a>
      {text.slice(at + phrase.length)}
    </>
  );
}
