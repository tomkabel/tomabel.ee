import React from 'react';

export default function Disclosure() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800 p-4 border border-slate-700 mb-6 text-sm text-gray-400">
          <strong>Version:</strong> 1.0 | <strong>Published:</strong> March 28, 2026
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Security Research Policy</h1>
        <p className="text-xl text-cyan-500 font-semibold mb-8">ProksiAbel OÜ</p>
        <p className="text-gray-300 mb-8">
          This is ProksiAbel OÜ's policy for our own security research activities.
        </p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Purpose</h2>
            <p className="text-gray-300 leading-relaxed">
              This document outlines the guidelines under which ProksiAbel OÜ conducts
              security research, vulnerability assessments, and related activities against
              third-party systems. This policy exists to inform operators of systems we
              research about our methodology, commitments, and how to opt out if desired.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Why This Policy Exists</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We maintain this policy to provide transparency to website operators whose
              systems we may interact with during our security research activities. We
              believe in operating openly and respectfully, giving system owners the
              information they need to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Identify our research activities in their logs</li>
              <li>Contact us with questions or concerns</li>
              <li>Opt out if they object to our research</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Operational Guidelines</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              When conducting security research, we adhere to the following operational principles:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3">
              <li>
                <strong>Rate Limiting:</strong> We apply reasonable rate limits to all requests to avoid impacting target systems.
              </li>
              <li>
                <strong>User-Agent Identification:</strong> Our requests include a descriptive User-Agent header identifying our research activities:
                <br />
                <code className="text-sm bg-slate-800 px-2 py-1 rounded mt-1 inline-block">
                  Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 [Security Researcher: Tom Kristian Abel; +https://proksiabel.ee/disclosure]
                </code>
              </li>
              <li>
                <strong>Custom Headers:</strong> We also include additional headers for easier identification:
                <br />
                <code className="text-sm bg-slate-800 px-2 py-1 rounded mt-1 inline-block">X-Security-Scanner: ProksiAbel-SecurityResearch-2026</code>
                <br />
                <code className="text-sm bg-slate-800 px-2 py-1 rounded mt-1 inline-block">X-Contact: security@proksiabel.ee</code>
              </li>
              <li>
                <strong>Opt-Out Mechanism:</strong> If you do not want our research activities on your systems, you can opt out by:
                <ul className="list-disc list-inside text-gray-300 ml-6 mt-1">
                  <li>Blocking our IP range</li>
                  <li>Adding <code className="bg-slate-800 px-1 rounded">Disallow: /</code> to your <code className="bg-slate-800 px-1 rounded">robots.txt</code></li>
                </ul>
                We will respect these opt-out signals.
              </li>
              <li>
                <strong>No Exploitation:</strong> We do not attempt to exploit vulnerabilities or gain unauthorized access.
              </li>
              <li>
                <strong>Minimal Impact:</strong> We minimize any footprint on target systems.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">If We Accessed Your Site</h2>
            <p className="text-gray-300 leading-relaxed">
              If you find our requests in your logs and object to our research activities,
              simply block our IP range or add us to <code className="bg-slate-800 px-1 rounded">robots.txt</code>. 
              We will respect this and cease interaction with your systems. We welcome direct contact if
              you have concerns about our activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Contact</h2>
            <p className="text-gray-300 leading-relaxed mb-2">
              If you have questions about our security research activities, or believe we may have
              interacted with your systems, please contact us:
            </p>
            <ul className="text-gray-300 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:security@proksiabel.ee" className="text-cyan-400 hover:underline">security@proksiabel.ee</a> (Preferred - PGP encrypted)</li>
              <li><strong>Phone:</strong> +372 56666981</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Company Information</h2>
            <div className="bg-slate-800 p-4 border border-slate-700 text-gray-300 space-y-1">
              <p><strong className="text-cyan-400">Business Name:</strong> ProksiAbel OÜ</p>
              <p><strong className="text-cyan-400">Registration Code:</strong> 17017826</p>
              <p><strong className="text-cyan-400">Address:</strong> Pargi tn 2 Sindi, Tori vald, Pärnumaa 86705, Estonia</p>
              <p><strong className="text-cyan-400">Contact:</strong> Tom Kristian Abel</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">PGP Key for Encrypted Communication</h2>
            <div className="bg-slate-800 p-4 border border-slate-700 text-gray-300 space-y-2">
              <p>
                <a href="/public-key.asc" className="text-cyan-400 hover:underline">Download PGP Public Key</a>
              </p>
              <p><strong className="text-cyan-400">Key ID:</strong> 0x30A8306F110AAAC5</p>
              <p><strong className="text-cyan-400">Fingerprint:</strong> 03D8E5A59306ECB7025A21090CA0C6F110AAAC5</p>
              <p><strong className="text-cyan-400">SHA-256:</strong> a63667ca9b1729e02b24c19cf2441953b76b934417a17b042fd1eeab68d8530a</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-cyan-500 font-semibold mb-4">Acknowledgments</h2>
            <p className="text-gray-300 leading-relaxed">
              We acknowledge and respect the security research community. If you have
              identified vulnerabilities in our systems, we welcome responsible disclosure
              via our contact channels.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-gray-500 text-sm">
            For general inquiries: <a href="mailto:info@proksiabel.ee" className="text-cyan-400 hover:underline">info@proksiabel.ee</a>
          </p>
        </div>
      </div>
    </div>
  );
}
