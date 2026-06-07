import type { CapabilityAxis } from './types';

export const capabilityAxes: CapabilityAxis[] = [
  {
    id: 'reverse-engineering',
    label: { en: 'I Reverse-Engineer Things', et: 'Pöördprojekteerin asju' },
    description: {
      en: "Most of my reverse engineering time went into Google's BotGuard virtual machine — mapping its opcode architecture, documenting how it fights debuggers, and building a decompiler for its bytecode. I also pick apart JavaScript-based fraud detection networks to understand how they fingerprint devices and score risk.",
      et: 'Suurem osa minu pöördprojekteerimise ajast on kulunud Google\'i BotGuard virtuaalmasina sees — selle opkoodiarhitektuuri kaardistamisele, silurivastaste kaitse dokumenteerimisele ja baitkoodi dekompilaatori ehitamisele. Lisaks lahan JavaScript-põhiseid pettusetuvastusvõrgustikke.',
    },
    value: 0.35,
    projects: [
      {
        id: 'botguard-vm',
        name: 'BotGuard VM Research',
        description: {
          en: "Mapped Google's BotGuard VM opcode architecture and anti-debug defenses. Documented chronometric timing protections and JavaScript VM internals.",
          et: 'Google\'i BotGuard VM opkoodiarhitektuuri ja anti-debug kaitse kaardistamine. Dokumenteerisin kronomeetrilised kaitse- ja VM-i sisemuse.',
        },
        techTags: ['Go', 'JavaScript', 'VM Decompilation', 'Anti-Debug'],
        url: '/#research',
        featured: true,
        image: {
          src: '/projects/botguard-vm.svg',
          alt: {
            en: 'BotGuard VM Research — reverse engineering obfuscated JavaScript virtual machines',
            et: 'BotGuard VM uurimistöö — obfitseeritud JavaScripti virtuaalmasinate pöördprojekteerimine',
          },
          width: 800,
          height: 450,
        },
      },
      {
        id: 'bg-decompiler',
        name: 'bg-vm-decompiler',
        description: {
          en: 'Open-source decompiler and static analyzer for BotGuard VM bytecode. Analyze opcode sequences without running the VM.',
          et: 'Avatud lähtekoodiga dekompilaator ja staatiline analüsaator BotGuard VM baitkoodi jaoks.',
        },
        techTags: ['Go', 'Compiler', 'Static Analysis', 'CLI'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'fraud-network-analysis',
        name: 'Fraud Detection Analysis',
        description: {
          en: 'Picked apart JavaScript-based fraud detection networks to understand their heuristics. Mapped device fingerprinting and behavioral scoring systems.',
          et: 'JavaScript-põhiste pettusetuvastusvõrgustike analüüs. Kaardistas seadmete sõrmejäljetuvastuse ja käitumispõhise hindamise süsteemid.',
        },
        techTags: ['JavaScript', 'Network Analysis', 'Security'],
      },
    ],
    accentProject: 'botguard-vm',
  },
  {
    id: 'research-analysis',
    label: { en: 'I Write & Publish', et: 'Kirjutan ja avaldan' },
    description: {
      en: "When I dig into something, I write it up. My research on BotGuard's VM internals — opcode architecture, anti-debug strategies, chronometric defense timing — has been published and cited. I believe security research should be shared, not hoarded.",
      et: 'Kui ma millessegi süvenen, kirjutan selle üles. Minu uurimistöö BotGuard VM sisemusest — opkoodiarhitektuur, anti-debug strateegiad, kronomeetrilise kaitse ajastus — on avaldatud ja viidatud. Usun, et turvauuringuid tuleb jagada, mitte varjata.',
    },
    value: 0.25,
    projects: [
      {
        id: 'botguard-research',
        name: 'BotGuard VM Security Research',
        description: {
          en: "Research publication on BotGuard VM internals: opcode architecture mapping, chronometric defense timing analysis, anti-debug mechanisms, and a Puppet-based bypass strategy using go-rod.",
          et: 'Teadustöö BotGuard VM sisemusest: opkoodiarhitektuuri kaardistamine, kronomeetrilise kaitse ajastusanalüüs, anti-debug mehhanismid ja Puppet-põhine möödaviimisstrateegia.',
        },
        techTags: ['Reverse Engineering', 'VM', 'JavaScript', 'Security'],
        url: '/#research',
        featured: true,
        image: {
          src: '/projects/botguard-research.svg',
          alt: {
            en: 'BotGuard VM Security Research — comprehensive analysis of obfuscated JavaScript VM',
            et: 'BotGuard VM turbeuuring — põhjalik analüüs obfitseeritud JavaScripti VM-ist',
          },
          width: 800,
          height: 450,
        },
      },
    ],
    accentProject: 'botguard-research',
  },
  {
    id: 'offensive-tooling',
    label: { en: 'I Build Security Tools', et: 'Ehitan turvatööriistu' },
    description: {
      en: 'I write practical security tools in Go — TLS fingerprinting proxies, adversary-in-the-middle frameworks, HTTP fuzzers, and penetration testing platforms. Each tool solves a specific problem I ran into during research or testing.',
      et: 'Ehitan praktilisi turvatööriistu Go keeles — TLS sõrmejäljeproksid, vaheltlõike raamistikud, HTTP fuzzerid ja läbistustestimise platvormid. Iga tööriist lahendab konkreetse probleemi uuringute käigus.',
    },
    value: 0.6,
    projects: [
      {
        id: 'fingerprintproxy',
        name: 'fingerprintproxy',
        description: {
          en: 'TLS fingerprinting forward proxy with 80+ browser profiles, MITM support, and per-request fingerprint selection. Custom http.RoundTripper for TLS handshake control.',
          et: 'TLS sõrmejälje puhverserver 80+ brauseriprofiiliga, MITM toega ja päringupõhise sõrmejälje valikuga.',
        },
        techTags: ['Go', 'TLS', 'HTTP/2', 'JA3'],
        github: 'https://github.com/tkabel',
        featured: true,
        image: {
          src: '/projects/fingerprintproxy.svg',
          alt: {
            en: 'fingerprintproxy — TLS fingerprinting forward proxy with 80+ browser profiles',
            et: 'fingerprintproxy — TLS sõrmejälje puhverserver 80+ brauseriprofiiliga',
          },
          width: 800,
          height: 450,
        },
      },
      {
        id: 'aitm-proxy',
        name: 'AiTM Proxy Toolkit',
        description: {
          en: 'Adversary-in-the-middle proxy framework for testing modern authentication flows. Handles certificate pinning and OAuth2/OIDC exchanges.',
          et: 'Vaheltlõike proksi raamistik kaasaegsete autentimisvoogude testimiseks.',
        },
        techTags: ['Go', 'TLS', 'OAuth2', 'HTTP/2'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'go-security-suite',
        name: 'Go Security Suite',
        description: {
          en: 'Collection of security tools in Go. Custom HTTP fuzzer, TLS analysis toolkit, and concurrent scanning infrastructure.',
          et: 'Kogumik Go keeles kirjutatud turvatööriistu.',
        },
        techTags: ['Go', 'Concurrency', 'TLS', 'HTTP'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'pentest-platform',
        name: 'Pentest Intelligence Platform',
        description: {
          en: 'Platform that combines offensive security testing with AI-driven analysis. Automates reconnaissance, correlates findings across attack vectors, and generates prioritized remediation steps.',
          et: 'Platvorm, mis ühendab ründeturbe testimise AI-põhise analüüsiga.',
        },
        techTags: ['Go', 'Python', 'React', 'PostgreSQL'],
        featured: true,
        image: {
          src: '/projects/pentest-platform.svg',
          alt: {
            en: 'Pentest Intelligence Platform — automated reconnaissance and AI-driven analysis',
            et: 'AI-toega luureturbe platvorm — automatiseeritud luure ja AI-põhine analüüs',
          },
          width: 800,
          height: 450,
        },
      },
    ],
    accentProject: 'fingerprintproxy',
  },
  {
    id: 'infrastructure',
    label: { en: 'I Run Production Infrastructure', et: 'Haldan tootmistaristut' },
    description: {
      en: "I build and run the infrastructure that makes the other work possible — GPU compute pipelines for AI inference, MCP-based agentic systems, zero-trust network architectures, and automated cloud deployments. Terraform, Kubernetes, Docker, RunPod. I care about security boundaries and reliability, not about the size of the cluster.",
      et: 'Ehitan ja haldan taristut, mis teeb kõik muu võimalikuks — GPU arvutustorustikud AI inferentsiks, MCP-põhised agentsüsteemid, null-usalduse võrguarhitektuurid ja automatiseeritud pilvejuurutused. Terraform, Kubernetes, Docker, RunPod. Hoolin turvapiiridest ja töökindlusest, mitte klastri suurusest.',
    },
    value: 0.4,
    projects: [
      {
        id: 'echoguard',
        name: 'EchoGuard',
        description: {
          en: 'AI voice cloning red-teaming pipeline using RunPod Serverless GPU compute. FastAPI backend with Redis caching and async job queues.',
          et: 'AI hääleklonimise punase meeskonna torustik, kasutades RunPod Serverless GPU arvutust.',
        },
        techTags: ['FastAPI', 'Python', 'GPU', 'RunPod', 'Redis'],
        github: 'https://github.com/tkabel',
        featured: true,
        image: {
          src: '/projects/echoguard.svg',
          alt: {
            en: 'EchoGuard — AI voice cloning red-teaming pipeline with GPU compute',
            et: 'EchoGuard — AI hääleklonimise punase meeskonna torustik GPU arvutusega',
          },
          width: 800,
          height: 450,
        },
      },
      {
        id: 'zero-trust',
        name: 'Zero-Trust Architecture Framework',
        description: {
          en: 'Zero-trust network security patterns for cloud-native environments. Policy engine design, microsegmentation, and continuous verification pipelines.',
          et: 'Null-usalduse võrgu turbe mustrid pilv-native keskkondade jaoks. Poliitikamootori disain, mikrosegmentatsioon.',
        },
        techTags: ['Kubernetes', 'Istio', 'OPA', 'Cloud'],
        featured: true,
        image: {
          src: '/projects/zero-trust.svg',
          alt: {
            en: 'Zero-Trust Architecture Framework — microsegmentation and continuous verification',
            et: 'Null-usalduse arhitektuuri raamistik — mikrosegmentatsioon ja pidev kontroll',
          },
          width: 800,
          height: 450,
        },
      },
      {
        id: 'ml-pipeline',
        name: 'ML Pipeline Infrastructure',
        description: {
          en: 'Infrastructure for training and serving ML models. Automated data pipeline from collection through feature engineering to deployment.',
          et: 'Taristu masinõppemudelite treenimiseks ja teenindamiseks. Automatiseeritud andmetorustik kogumisest juurutamiseni.',
        },
        techTags: ['Docker', 'MLflow', 'Python', 'Kubernetes'],
      },
      {
        id: 'mcp-agentic',
        name: 'stop-slop-drop-top',
        description: {
          en: 'MCP server integration and Claude Code skill that lets AI agents autonomously evaluate and rewrite content. CLI and API aggregation backend with async batch processing for CI/CD pipelines.',
          et: 'MCP serveri integratsioon ja Claude Code oskus, mis võimaldab AI agentidel autonoomselt sisu hinnata ja ümber kirjutada.',
        },
        techTags: ['Node.js', 'Python', 'MCP', 'CI/CD'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'infra-automation',
        name: 'Infrastructure Automation Toolkit',
        description: {
          en: 'Automated provisioning and configuration management for security testing environments. Reproducible, disposable test ranges with realistic network topologies.',
          et: 'Automatiseeritud taristu loomine ja konfiguratsioonihaldus turvatestimise keskkondade jaoks.',
        },
        techTags: ['Terraform', 'Ansible', 'Docker', 'Linux'],
      },
      {
        id: 'session-security',
        name: 'Session Security Analysis',
        description: {
          en: 'Framework for analyzing web application session management. Token generation analysis, session fixation testing, concurrent session handling.',
          et: 'Raamistik veebirakenduste sessioonihalduse analüüsimiseks.',
        },
        techTags: ['Security', 'OAuth', 'JWT', 'React'],
      },
    ],
    accentProject: 'echoguard',
  },
];
