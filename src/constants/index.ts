
import type { Project, SkillCategory, SocialLink } from '@/types';
import { 
  Linkedin, Github, Mail, Briefcase, Code, ServerCog, DatabaseZap, Wrench, 
  BrainCircuit, LayoutTemplate, Palette, TestTubeDiagonal, CloudCog, TerminalSquare, 
  GitFork, MessageSquare, Sigma, Move, Figma, ImageIcon, FlaskConical, Dna, FileText, Globe, Zap
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '#hero', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '/generate-description', label: 'AI Generator', icon: BrainCircuit },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'genecrafter',
    title: 'GeneCrafter: AI-Driven Gene Circuit Designer',
    description: 'A sleek, web-based tool for synthetic biologists to design, simulate, and optimize gene circuits in real-time using AI. Includes 3D visualization of dynamic cell behavior.',
    imageUrl: 'https://images.unsplash.com/photo-1641903202531-bfa6bf0c6419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxnZW5lfGVufDB8fHx8MTc0ODUxNTM3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAiHint: 'gene circuit',
    tags: ['React', 'Three.js', 'Python', 'Flask', 'Gemini API', 'BioJS'],
    liveUrl: 'https://genecrafter.live',
    repoUrl: 'https://github.com/subhan/genecrafter',
  },
  {
    id: 'comparethatphone',
    title: 'CompareThatPhone: Smart Gadget Comparison Engine',
    description: 'A dynamic website that compares smartphones by specs, pricing, visuals, and local deals. Powered by real-time data and AI assistance.',
    imageUrl: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8cGhvbmVzfGVufDB8fHx8MTc0ODUxNTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAiHint: 'gadget comparison',
    tags: ['Next.js', 'Firebase', 'Gemini API', 'TailwindCSS'],
    liveUrl: 'https://comparethatphone.io',
    repoUrl: 'https://github.com/subhan/comparethatphone',
  },
  {
    id: 'saltsaffron',
    title: 'Salt & Saffron (Novel Project)',
    description: 'A dual-timeline historical fiction novel about memory, friendship, and resistance—set during the Salt March and in post-Y2K India.',
    imageUrl: 'https://images.unsplash.com/photo-1563267292-b787b0ae72bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8bm92ZWx8ZW58MHx8fHwxNzQ4NTE2MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAiHint: 'book cover',
    tags: ['Scrivener', 'Google Docs', 'Canva', 'MidJourney'],
    // liveUrl: undefined, // Not Yet Published
    // repoUrl: undefined, // N/A
  },
  {
    id: 'gravityplay',
    title: 'GravityPlay: Real Physics, Real Fun',
    description: 'A 3D gravity simulator built from scratch using Newton’s laws—visual, interactive, and super satisfying to watch.',
    imageUrl: 'https://images.unsplash.com/photo-1633624875862-2a3c50468718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxncmF2aXR5fGVufDB8fHx8MTc0ODUxNjE2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAiHint: 'physics simulation',
    tags: ['JavaScript', 'Three.js', 'Physics Engine'],
    liveUrl: 'https://gravityplay.space',
    repoUrl: 'https://github.com/subhan/gravityplay',
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      { id: 's1', name: 'HTML', icon: Code },
      { id: 's2', name: 'CSS', icon: Palette },
      { id: 's3', name: 'JavaScript', icon: Code }, 
      { id: 's4', name: 'React', icon: LayoutTemplate }, 
      { id: 's5', name: 'Tailwind CSS', icon: Palette },
      { id: 's6', name: 'Framer Motion', icon: Move },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      { id: 's7', name: 'Node.js', icon: ServerCog },
      { id: 's8', name: 'Express', icon: ServerCog }, 
      { id: 's9', name: 'MongoDB', icon: DatabaseZap },
      { id: 's10', name: 'Firebase', icon: DatabaseZap }, 
    ],
  },
  {
    id: 'data_ai',
    name: 'Data & AI',
    skills: [
      { id: 's11', name: 'Python', icon: Code }, 
      { id: 's12', name: 'NumPy', icon: Sigma },
      { id: 's13', name: 'Pandas', icon: DatabaseZap }, 
      { id: 's14', name: 'TensorFlow', icon: BrainCircuit },
      { id: 's15', name: 'Gemini (LLMs)', icon: BrainCircuit },
    ],
  },
  {
    id: 'creative_tools',
    name: 'Creative Tools',
    skills: [
      { id: 's16', name: 'Figma', icon: Figma },
      { id: 's17', name: 'Canva', icon: Palette },
      { id: 's18', name: 'Adobe XD', icon: Palette }, 
      { id: 's19', name: 'MidJourney', icon: ImageIcon },
    ],
  },
  {
    id: 'science_bio',
    name: 'Science & Bio',
    skills: [
      { id: 's20', name: 'Synthetic Biology', icon: FlaskConical },
      { id: 's21', name: 'Gene Circuit Design', icon: Dna },
      { id: 's22', name: 'Bioinformatics', icon: DatabaseZap }, 
    ],
  },
  {
    id: 'devops_tools',
    name: 'DevOps & Tools',
    skills: [
      { id: 's23', name: 'Git & GitHub', icon: GitFork }, 
      { id: 's24', name: 'Vercel', icon: CloudCog },
      { id: 's25', name: 'Netlify', icon: CloudCog }, 
      { id: 's26', name: 'Markdown', icon: FileText },
      { id: 's27', name: 'VS Code', icon: TerminalSquare }, 
    ],
  },
];

export const SOCIAL_LINKS_DATA: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/subhan986', 
    icon: Github,
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:subyounas@gmail.com',
    icon: Mail,
  },
];
