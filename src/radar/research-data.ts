import type { ResearchPaper } from './types';

export const researchPapers: ResearchPaper[] = [
  {
    id: 'botguard-vm-paper',
    title: "Deconstructing BotGuard: A Technical Analysis of Google's Obfuscated JavaScript Virtual Machine",
    abstract: {
      en: 'A comprehensive technical analysis of Google\'s BotGuard VM — a hostile, obfuscated JavaScript Virtual Machine used for bot detection. Maps opcode architecture, anti-debug chronometric defenses, anti-logger mechanisms, and evaluates bypass strategies including the Puppet approach using go-rod.',
      et: 'Põhjalik tehniline analüüs Google\'i BotGuard VM-ist — vaenulikust, obfitseeritud JavaScripti virtuaalmasinast, mida kasutatakse bot-tuvastuseks.',
    },
    status: 'published',
    date: '2025-11',
    tags: ['Reverse Engineering', 'VM', 'JavaScript', 'Bot Detection'],
    featured: true,
  },
];
