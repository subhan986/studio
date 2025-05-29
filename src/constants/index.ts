
import type { Project, SkillCategory, SocialLink } from '@/types';
import { 
  Linkedin, Github, Mail, Briefcase, Code, ServerCog, DatabaseZap, Wrench, 
  BrainCircuit, LayoutTemplate, Palette, TestTubeDiagonal, CloudCog, TerminalSquare, 
  GitFork, MessageSquare, Sigma, Move, FigmaIcon as Figma, ImageIcon, FlaskConical, Dna, FileText, Globe, Zap
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
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
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'gene circuit',
    tags: ['React', 'Three.js', 'Python', 'Flask', 'Gemini API', 'BioJS'],
    liveUrl: 'https://genecrafter.live', // Assuming protocol for live sites
    repoUrl: 'https://github.com/subhan/genecrafter',
  },
  {
    id: 'comparethatphone',
    title: 'CompareThatPhone: Smart Gadget Comparison Engine',
    description: 'A dynamic website that compares smartphones by specs, pricing, visuals, and local deals. Powered by real-time data and AI assistance.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'gadget comparison',
    tags: ['Next.js', 'Firebase', 'Gemini API', 'TailwindCSS'],
    liveUrl: 'https://comparethatphone.io',
    repoUrl: 'https://github.com/subhan/comparethatphone',
  },
  {
    id: 'saltsaffron',
    title: 'Salt & Saffron (Novel Project)',
    description: 'A dual-timeline historical fiction novel about memory, friendship, and resistance—set during the Salt March and in post-Y2K India.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'book cover',
    tags: ['Scrivener', 'Google Docs', 'Canva', 'MidJourney'],
    // liveUrl: undefined, // Not Yet Published
    // repoUrl: undefined, // N/A
  },
  {
    id: 'gravityplay',
    title: 'GravityPlay: Real Physics, Real Fun',
    description: 'A 3D gravity simulator built from scratch using Newton’s laws—visual, interactive, and super satisfying to watch.',
    imageUrl: 'https://placehold.co/400x300.png',
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
      { id: 's13', name: 'Pandas', icon: DatabaseZap }, // Using DatabaseZap as a generic data icon
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
      { id: 's18', name: 'Adobe XD', icon: Palette }, // Using Palette as generic design tool icon
      { id: 's19', name: 'MidJourney', icon: ImageIcon },
    ],
  },
  {
    id: 'science_bio',
    name: 'Science & Bio',
    skills: [
      { id: 's20', name: 'Synthetic Biology', icon: FlaskConical },
      { id: 's21', name: 'Gene Circuit Design', icon: Dna },
      { id: 's22', name: 'Bioinformatics', icon: DatabaseZap }, // Using DatabaseZap for data aspect
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
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/', // Keep generic or ask user to update
    icon: Linkedin,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/subhan', // Assuming this from project URLs, ask user to confirm/update
    icon: Github,
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:youremail@example.com', // Keep generic or ask user to update
    icon: Mail,
  },
];
