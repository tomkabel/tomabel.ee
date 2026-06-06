import type { CapabilityAxis } from './types';

export const capabilityAxes: CapabilityAxis[] = [
  {
    id: 'reverse-engineering',
    label: { en: 'Reverse Engineering', et: 'Pöördprojekteerimine' },
    description: {
      en: 'Decompiling obfuscated virtual machines, deconstructing hostile JavaScript environments, and mapping opcode architectures. Working knowledge of anti-debug, chronometric defense, and anti-fraud system analysis.',
      et: 'Obfitseeritud virtuaalmasinate dekompileerimine, vaenulike JavaScripti keskkondade lahtimonteerimine ja opkoodi arhitektuuride kaardistamine. Praktiline kogemus anti-debug, kronomeetrilise kaitse ja pettustõrjesüsteemide analüüsiga.',
    },
    value: 0.9,
    projects: [
      {
        id: 'botguard-vm',
        name: 'BotGuard VM Research',
        description: {
          en: "Reverse-engineered Google's BotGuard VM opcode architecture and anti-debug defenses. Published original research on obfuscated JavaScript VMs.",
          et: 'Google\'i BotGuard VM opkoodi arhitektuuri ja anti-debug kaitsemehhanismide pöördprojekteerimine. Avaldatud originaaluuring obfitseeritud JavaScripti VM-de kohta.',
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
          en: 'Open-source decompiler and static analyzer for BotGuard VM bytecode. Enables analysis of opcode sequences without dynamic execution.',
          et: 'Avatud lähtekoodiga dekompilaator ja staatiline analüsaator BotGuard VM baitkoodi jaoks. Võimaldab analüüsida opkoodi järjestusi ilma dünaamilise täitmiseta.',
        },
        techTags: ['Go', 'Compiler', 'Static Analysis', 'CLI'],
        github: 'https://github.com/tkabel',
      },
      {
        id: 'fraud-network-analysis',
        name: 'Fraud Network Analysis',
        description: {
          en: 'Reverse-engineered JavaScript-based fraud detection networks to understand their heuristics. Mapped device fingerprinting and behavioral analysis systems.',
          et: 'Pöördprojekteeris JavaScript-põhised pettusetuvastusvõrgustikud, et mõista nende heuristikat. Kaardistas seadmete sõrmejäljetuvastuse süsteemid.',
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
      en: 'Working with AI pipelines, GPU orchestration, serverless inference, and MCP-based agentic workflows. Building the tooling that connects AI to real workloads.',
      et: 'AI torustike, GPU orkestreerimise, serverless inferentsi ja MCP-põhiste agentide töövoogude arendamine. Tööriistade ehitamine, mis ühendavad AI päris töödega.',
    },
    value: 0.85,
    projects: [
      {
        id: 'echoguard',
        name: 'EchoGuard',
        description: {
          en: 'AI voice cloning red-teaming pipeline using RunPod Serverless GPU compute. FastAPI backend with Redis caching and async job queues.',
          et: 'AI hääleklonimise punase meeskonna torustik, kasutades RunPod Serverless GPU arvutust. FastAPI backend Redis vahemäluga.',
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
        id: 'ml-pipeline',
        name: 'ML Pipeline Infrastructure',
        description: {
          en: 'Infrastructure for training and serving ML models. Automated data pipeline from collection through feature engineering to deployment.',
          et: 'Taristu masinõppemudelite treenimiseks ja teenindamiseks. Automatiseeritud andmetorustik kogumisest juurutamiseni.',
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
      en: 'Building security tools in Go. Custom MITM frameworks, TLS fingerprinting proxies, and bypass utilities.',
      et: 'Turvatööriistade ehitamine Go keeles. Kohandatud MITM raamistikud, TLS sõrmejäljeproksid ja möödaviimistööriistad.',
    },
    value: 0.95,
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
    ],
    accentProject: 'fingerprintproxy',
  },
  {
    id: 'systems-engineering',
    label: { en: 'Systems Engineering', et: 'Süsteemitehnika' },
    description: {
      en: 'Building and configuring security-related systems with zero-trust principles, custom transport layers, and infrastructure automation. Working from server configuration to cloud-native deployments.',
      et: 'Turvalisusega seotud süsteemide ehitamine ja seadistamine null-usalduse põhimõtetel, kohandatud transpordikihtide ja taristu automatiseerimisega.',
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
          en: 'Zero-trust network security patterns for cloud-native environments. Policy engine design, microsegmentation, and verification pipelines.',
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
      en: 'Technical research into hostile software, obfuscated VMs, and anti-fraud ecosystems. Producing whitepapers and sharing findings.',
      et: 'Tehniline uurimistöö vaenuliku tarkvara, obfitseeritud VM-de ja pettustõrje ökosüsteemide kohta.',
    },
    value: 0.85,
    projects: [
      {
        id: 'botguard-research',
        name: 'BotGuard VM Security Research',
        description: {
          en: "Research on Google's BotGuard VM: opcode architecture mapping, chronometric defense analysis, anti-debug mechanisms, and Puppet bypass strategy using go-rod.",
          et: 'Põhjalik uurimistöö Google\'i BotGuard VM-i kohta: opkoodi arhitektuur, kronomeetrilise kaitse analüüs, anti-debug mehhanismid.',
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
    id: 'architecture-design',
    label: { en: 'Architecture & Design', et: 'Arhitektuur ja disain' },
    description: {
      en: 'System design and API architecture with a focus on security, scalability, and maintainability. Turning capability into working software.',
      et: 'Süsteemidisain ja API arhitektuur, keskendudes turvalisusele, mastaabitavusele ja hooldatavusele.',
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
        featured: true,
        image: {
          src: '/projects/pentest-platform.svg',
          alt: {
            en: 'AI-Assisted Pentest Intelligence Platform — automated reconnaissance and AI-driven analysis',
            et: 'AI-toega luureturbe platvorm — automatiseeritud luure ja AI-põhine analüüs',
          },
          width: 800,
          height: 450,
        },
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
    accentProject: 'pentest-platform',
  },
];
