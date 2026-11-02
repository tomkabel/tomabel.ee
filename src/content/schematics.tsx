import type { ReactNode } from 'react';
import { FlowGraph, SequenceDiagram } from '../components/site/figure';
import type { Language } from '../i18n/translations';

// Thumbnail schematics for the featured cards, keyed by href. Each one draws a
// claim the linked article makes; nothing here is decoration.
export const cardSchematics: Record<string, (l: Language) => ReactNode> = {
  '/disclosures/botguard-disassembled': (l) => (
    <FlowGraph
      width={420}
      height={130}
      desc={l === 'en'
        ? 'Page script feeds the bytecode VM, which emits a token; the server verifies the token but cannot tie it to the machine that produced it.'
        : 'Lehe skript toidab baitkoodi VM-i, mis väljastab tokeni; server kontrollib tokenit, kuid ei saa seda siduda masinaga, mis selle tootis.'}
      nodes={[
        { id: 's', x: 50, y: 30, label: 'script', w: 70 },
        { id: 'vm', x: 155, y: 30, label: 'bytecode VM', w: 96 },
        { id: 't', x: 265, y: 30, label: 'PO token', w: 76 },
        { id: 'srv', x: 370, y: 30, label: 'server', w: 70, kind: 'verified' },
        { id: 'm', x: 265, y: 105, label: 'any machine', kind: 'attack', w: 100 },
      ]}
      edges={[
        { from: 's', to: 'vm' },
        { from: 'vm', to: 't' },
        { from: 't', to: 'srv', kind: 'verified' },
        { from: 'm', to: 'srv', label: 'replay', kind: 'attack', dashed: true },
      ]}
    />
  ),
  '/disclosures/smart-id-achilles-heel': (l) => (
    <SequenceDiagram
      width={420}
      lanes={[l === 'en' ? 'victim' : 'ohver', l === 'en' ? 'relay' : 'vahendaja', 'bank']}
      desc={l === 'en'
        ? 'Signing relay: the victim sees a real login streamed from a remote browser, approves it in Smart-ID, and the session lands with the attacker.'
        : 'Allkirjastamise vahendusrünne: ohver näeb kaugbrauserist voogedastatud päris sisselogimist, kinnitab selle Smart-ID-s ja seanss jõuab ründajale.'}
      messages={[
        { from: 1, to: 2, label: 'start login' },
        { from: 1, to: 0, label: l === 'en' ? 'stream real page' : 'päris leht', kind: 'attack' },
        { from: 0, to: 2, label: l === 'en' ? 'PIN approve' : 'PIN-kinnitus' },
        { from: 2, to: 1, label: l === 'en' ? 'session' : 'seanss', kind: 'attack' },
      ]}
    />
  ),
  '/systems#fingerprintproxy': (l) => (
    <FlowGraph
      width={420}
      height={80}
      desc={l === 'en'
        ? 'A client connects through fingerprintproxy, which presents a chosen browser TLS profile (JA3/JA4) to the origin.'
        : 'Klient ühendub fingerprintproxy kaudu, mis esitab päritolule valitud brauseri TLS-profiili (JA3/JA4).'}
      nodes={[
        { id: 'c', x: 40, y: 45, label: 'client', w: 60 },
        { id: 'p', x: 165, y: 45, label: 'fingerprintproxy', w: 124, kind: 'verified' },
        { id: 'o', x: 380, y: 45, label: 'origin', w: 60 },
      ]}
      edges={[
        { from: 'c', to: 'p', label: 'TLS' },
        { from: 'p', to: 'o', label: 'JA4 profile', kind: 'verified' },
      ]}
    />
  ),
  '/disclosures/zero-trust-octagon': (l) => {
    const r = 62;
    const nodes = Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI / 4) * i - Math.PI / 2 + Math.PI / 8;
      return { id: `a${i + 1}`, x: 210 + Math.cos(a) * r * 2.4, y: 80 + Math.sin(a) * r, label: `A${i + 1}`, w: 44, kind: 'verified' as const };
    });
    return (
      <FlowGraph
        width={420}
        height={160}
        desc={l === 'en' ? 'Eight axioms arranged as an octagon; each must hold for the architecture to be zero trust.' : 'Kaheksa aksioomi kaheksanurgana; arhitektuur on nullusaldusega vaid siis, kui kõik kehtivad.'}
        nodes={nodes}
        edges={nodes.map((n, i) => ({ from: n.id, to: nodes[(i + 1) % 8]!.id }))}
      />
    );
  },
};

// Hero: the same login, as hoped and as proven.
export function HeroBefore({ l }: { l: Language }) {
  return (
    <div aria-hidden className="mx-auto grid max-w-xs gap-3 font-mono text-xs text-muted-foreground">
      <span>{l === 'en' ? 'username' : 'kasutajanimi'}</span>
      <span className="h-8 rounded-hair border border-border bg-sunken" />
      <span>{l === 'en' ? 'password' : 'parool'}</span>
      <span className="h-8 rounded-hair border border-border bg-sunken px-3 leading-8">••••••••</span>
      <span className="mx-auto mt-1 rounded-hair border border-border-strong px-4 py-1.5">{l === 'en' ? 'Log in' : 'Logi sisse'}</span>
    </div>
  );
}

export function HeroAfter({ l }: { l: Language }) {
  return (
    <SequenceDiagram
      width={420}
      lanes={[l === 'en' ? 'authenticator' : 'autentija', l === 'en' ? 'browser' : 'brauser', 'server']}
      desc={l === 'en'
        ? 'WebAuthn: the server sends a challenge, the browser binds it to the origin, the authenticator signs with a device key, and the server verifies the signature with the registered public key.'
        : 'WebAuthn: server saadab väljakutse, brauser seob selle päritoluga, autentija allkirjastab seadmevõtmega ja server kontrollib allkirja registreeritud avaliku võtmega.'}
      messages={[
        { from: 2, to: 1, label: 'challenge' },
        { from: 1, to: 0, label: 'challenge + origin' },
        { from: 0, to: 1, label: l === 'en' ? 'signature (device key)' : 'allkiri (seadmevõti)', kind: 'verified' },
        { from: 1, to: 2, label: 'assertion', kind: 'verified' },
      ]}
    />
  );
}
