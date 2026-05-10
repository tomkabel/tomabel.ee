import type { CapabilityAxis } from './types';

export const capabilityAxes: CapabilityAxis[] = [
  {
    id: 'reverse-engineering',
    label: { en: 'Reverse Engineering', et: 'Pöördprojekteerimine' },
    description: {
      en: 'Decompiling obfuscated virtual machines, deconstructing hostile JavaScript environments, and mapping opcode architectures. Deep experience with anti-debug, chronometric defense, and anti-fraud system analysis.',
      et: 'Obfitseeritud virtuaalmasinate dekompileerimine, vaenulike JavaScripti keskkondade lahtimonteerimine ja opkoodi arhitektuuride kaardistamine. Sügav kogemus anti-debug, kronomeetrilise kaitse ja pettustõrjesüsteemide analüüsiga.',
    },
    value: 0.9,
    projects: [
      {
        id: 'botguard-vm',
        name: 'BotGuard VM Research',
        description: {
          en: "Reverse-engineered Google's BotGuard VM opcode architecture, anti-debug chronometric defenses, and anti-logger mechanisms. Published original research advancing public understanding of obfuscated JavaScript VMs.",
          et: 'Google\'i BotGuard VM opkoodi arhitektuuri, anti-debug kronomeetriliste kaitsemehhanismide ja anti-loggeri mehhanismide pöördprojekteerimine. Avaldatud originaaluuring, mis edendab obfitseeritud JavaScripti VM-de mõistmist.',
        },
        techTags: ['Go', 'JavaScript', 'VM Decompilation', 'Anti-Debug'],
        url: '/#research',
      },
      {
        id: 'bg-decompiler',
        name: 'bg-vm-decompiler',
        description: {
          en: 'Open-source decompiler and static analyzer for BotGuard VM bytecode. Enables researchers to analyze opcode sequences without dynamic execution. Includes control-flow graph reconstruction.',
          et: 'Avatud lähtekoodiga dekompilaator ja staatiline analüsaator BotGuard VM baitkoodi jaoks. Võimaldab teadlastel analüüsida opkoodi järjestusi ilma dünaamilise täitmiseta.',
        },
        techTags: ['Go', 'Compiler', 'Static Analysis', 'CLI'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'fraud-network-analysis',
        name: 'Fraud Network Analysis Engine',
        description: {
          en: 'Reverse-engineered modern JavaScript-based fraud detection networks to understand their heuristics. Mapped device fingerprinting, behavioral analysis, and reputation scoring systems.',
          et: 'Pöördprojekteeris kaasaegsed JavaScript-põhised pettusetuvastusvõrgustikud, et mõista nende heuristikat. Kaardistas seadmete sõrmejäljetuvastuse ja käitumusliku analüüsi süsteemid.',
        },
        techTags: ['JavaScript', 'ML', 'Network Analysis', 'Security'],
      },
    ],
    accentProject: 'botguard-vm',
  },
  {
    id: 'ai-ml-infrastructure',
    label: { en: 'AI/ML Infrastructure', et: 'AI/ML Taristu' },
    description: {
      en: 'Architecting production-grade AI pipelines with GPU orchestration, serverless inference, and MCP-based agentic workflows. Building the infrastructure that makes AI actually work at scale.',
      et: 'Tootmiskõlblike AI torustike arhitekteerimine GPU orkestreerimise, serverless inferentsi ja MCP-põhiste agentide töövoogudega. Taristu ehitamine, mis paneb AI päriselt mastaabis tööle.',
    },
    value: 0.85,
    projects: [
      {
        id: 'echoguard',
        name: 'EchoGuard',
        description: {
          en: 'End-to-end AI voice cloning red-teaming pipeline using RunPod Serverless GPU cloud compute. FastAPI backend with Redis caching and async job queues orchestrating Demucs, WhisperX, and RMVPE models.',
          et: 'AI hääleklonimise punase meeskonna torustik, kasutades RunPod Serverless GPU pilvandmetöötlust. FastAPI backend Redis vahemäluga ja asünkroonsete tööjärjekordadega.',
        },
        techTags: ['FastAPI', 'Python', 'GPU', 'RunPod', 'Redis'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'ml-pipeline',
        name: 'ML Pipeline Infrastructure',
        description: {
          en: 'Designed and deployed infrastructure for training and serving ML models at scale. Automated data pipeline from collection through feature engineering to model deployment.',
          et: 'Kavandas ja juurutas taristu masinõppemudelite treenimiseks ja teenindamiseks mastaabis. Automatiseeris andmetorustiku kogumisest mudeli juurutamiseni.',
        },
        techTags: ['Docker', 'MLflow', 'Python', 'Kubernetes'],
      },
    ],
    accentProject: 'echoguard',
  },
  {
    id: 'offensive-tooling',
    label: { en: 'Offensive Tooling', et: 'Ründetööriistad' },
    description: {
      en: 'Building high-performance offensive security tools in Go. Custom MITM frameworks, TLS fingerprinting proxies, and bypass tooling that operates at the edge of what detection systems can identify.',
      et: 'Suure jõudlusega ründeturbetööriistade ehitamine Go keeles. Kohandatud MITM raamistikud, TLS sõrmejäljeproksid ja möödaviimistööriistad.',
    },
    value: 0.95,
    projects: [
      {
        id: 'fingerprintproxy',
        name: 'fingerprintproxy',
        description: {
          en: 'Production-grade TLS fingerprinting forward proxy with 80+ browser profiles, MITM support, and per-request fingerprint selection. Custom http.RoundTripper for fine-grained TLS handshake control.',
          et: 'Tootmiskõlblik TLS sõrmejälje puhverserver 80+ brauseriprofiiliga, MITM toega ja päringupõhise sõrmejälje valikuga.',
        },
        techTags: ['Go', 'TLS', 'HTTP/2', 'JA3'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'aitm-proxy',
        name: 'AiTM Proxy Toolkit',
        description: {
          en: 'Advanced adversary-in-the-middle proxy framework for testing modern authentication flows. Bypasses certificate pinning, intercepts OAuth2/OIDC exchanges.',
          et: 'Täiustatud vaheltlõike proksi raamistik kaasaegsete autentimisvoogude testimiseks.',
        },
        techTags: ['Go', 'TLS', 'OAuth2', 'HTTP/2'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'go-security-suite',
        name: 'Go Security Suite',
        description: {
          en: 'Collection of purpose-built offensive security tools in Go. Custom HTTP fuzzer, TLS analysis toolkit, and concurrent scanning infrastructure designed for scale.',
          et: 'Kogumik Go keeles kirjutatud ründeturbetööriistu.',
        },
        techTags: ['Go', 'Concurrency', 'TLS', 'HTTP'],
        github: 'https://github.com/tkabel',
      },
    ],
    accentProject: 'fingerprintproxy',
  },
  {
    id: 'systems-engineering',
    label: { en: 'Systems Engineering', et: 'Süsteemitehnika' },
    description: {
      en: 'Designing distributed, resilient systems with zero-trust architecture, custom transport layers, and infrastructure automation. From kernel concepts to cloud-native deployments.',
      et: 'Jaotatud, vastupidavate süsteemide projekteerimine null-usalduse arhitektuuri, kohandatud transpordikihtide ja taristu automatiseerimisega.',
    },
    value: 0.8,
    projects: [
      {
        id: 'mcp-agentic',
        name: 'stop-slop-drop-top',
        description: {
          en: 'MCP server integration and Claude Code skill enabling AI agents to autonomously evaluate and rewrite content. CLI and API aggregation backend with async batch processing for CI/CD pipelines.',
          et: 'MCP serveri integratsioon ja Claude Code oskus, mis võimaldab AI agentidel autonoomselt sisu hinnata ja ümber kirjutada.',
        },
        techTags: ['Node.js', 'Python', 'MCP', 'CI/CD'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'zero-trust',
        name: 'Zero-Trust Architecture Framework',
        description: {
          en: 'Complete reference architecture for zero-trust network security in cloud-native environments. Policy engine design, microsegmentation patterns, continuous verification pipelines.',
          et: 'Terviklik võrdlusarhitektuur null-usalduse võrgu turbe juurutamiseks pilv-native keskkondades.',
        },
        techTags: ['Kubernetes', 'Istio', 'OPA', 'Cloud'],
      },
      {
        id: 'infra-automation',
        name: 'Infrastructure Automation Toolkit',
        description: {
          en: 'Automated provisioning and configuration management for security testing environments. Reproducible, disposable test ranges with realistic network topologies.',
          et: 'Automatiseeritud taristu projekteerimine ja konfiguratsioonihaldus turvetestimise keskkondade jaoks.',
        },
        techTags: ['Terraform', 'Ansible', 'Docker', 'Linux'],
      },
    ],
    accentProject: 'mcp-agentic',
  },
  {
    id: 'research-analysis',
    label: { en: 'Research & Analysis', et: 'Uurimistöö ja analüüs' },
    description: {
      en: 'Deep-dive technical research into hostile software, obfuscated VMs, and anti-fraud ecosystems. Producing whitepapers and original findings that advance the field.',
      et: 'Põhjalik tehniline uurimistöö vaenuliku tarkvara, obfitseeritud VM-de ja pettustõrje ökosüsteemide kohta.',
    },
    value: 0.85,
    projects: [
      {
        id: 'botguard-research',
        name: 'BotGuard VM Security Research',
        description: {
          en: "Comprehensive research on Google's BotGuard VM: opcode architecture mapping, chronometric defense analysis, anti-debug mechanisms, and Puppet bypass strategy using go-rod.",
          et: 'Põhjalik uurimistöö Google\'i BotGuard VM-i kohta: opkoodi arhitektuur, kronomeetrilise kaitse analüüs, anti-debug mehhanismid.',
        },
        techTags: ['Reverse Engineering', 'VM', 'JavaScript', 'Security'],
        url: '/#research',
      },
    ],
    accentProject: 'botguard-research',
  },
  {
    id: 'architecture-design',
    label: { en: 'Architecture & Design', et: 'Arhitektuur ja disain' },
    description: {
      en: 'System design and API architecture that balances security, scalability, and maintainability. Building the blueprints that turn capability into production systems.',
      et: 'Süsteemidisain ja API arhitektuur, mis tasakaalustab turvalisust, mastaabitavust ja hooldatavust.',
    },
    value: 0.75,
    projects: [
      {
        id: 'pentest-platform',
        name: 'AI-Assisted Pentest Intelligence Platform',
        description: {
          en: 'Platform combining offensive security testing with AI-driven analysis. Automates reconnaissance, correlates findings across attack vectors, generates prioritized remediation.',
          et: 'Platvorm, mis ühendab ründeturbe testimise AI-põhise analüüsiga.',
        },
        techTags: ['Go', 'Python', 'React', 'PostgreSQL'],
      },
      {
        id: 'session-security',
        name: 'Session Security Analysis Framework',
        description: {
          en: 'In-depth framework for analyzing web application session management. Token generation analysis, session fixation testing, concurrent session handling evaluation.',
          et: 'Põhjalik raamistik veebirakenduste sessioonihalduse analüüsimiseks.',
        },
        techTags: ['Security', 'OAuth', 'JWT', 'React'],
      },
    ],
    accentProject: 'pentest-platform',
  },
];
