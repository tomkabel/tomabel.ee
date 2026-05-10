export interface RadarProject {
  id: string;
  name: string;
  description: { en: string; et: string };
  techTags: string[];
  url?: string;
  github?: string;
}

export interface CapabilityAxis {
  id: string;
  label: { en: string; et: string };
  description: { en: string; et: string };
  value: number; // 0–1 for radar polygon
  projects: RadarProject[];
  accentProject?: string; // id of featured project
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: { en: string; et: string };
  status: 'published' | 'draft' | 'in-progress';
  date: string;
  tags: string[];
  url?: string;
  featured?: boolean;
}
