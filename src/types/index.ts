import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageAiHint?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
}
