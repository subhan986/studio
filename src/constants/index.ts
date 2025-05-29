import type { Project, SkillCategory, SocialLink } from '@/types';
import { Linkedin, Github, Mail, Briefcase, Code, ServerCog, DatabaseZap, Wrench, BrainCircuit, LayoutTemplate, Palette, TestTubeDiagonal, CloudCog, TerminalSquare, GitFork, MessageSquare } from 'lucide-react';

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: '/generate-description', label: 'AI Generator', icon: BrainCircuit },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product listings, cart functionality, and payment integration.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'online store',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application to help teams organize and track their work effectively.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'task board',
    tags: ['Vue.js', 'Firebase', 'Vuetify'],
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Personal Portfolio Website',
    description: 'This very portfolio website, built with Next.js and Tailwind CSS, showcasing my skills and projects.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'portfolio website',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GenAI'],
    repoUrl: '#',
  },
    {
    id: '4',
    title: 'AI Blog Post Generator',
    description: 'A tool leveraging generative AI to create draft blog posts based on provided topics and keywords.',
    imageUrl: 'https://placehold.co/400x300.png',
    imageAiHint: 'ai writing',
    tags: ['Python', 'FastAPI', 'GPT-3', 'Docker'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      { id: 's1', name: 'HTML5', icon: Code },
      { id: 's2', name: 'CSS3 & Tailwind', icon: Palette },
      { id: 's3', name: 'JavaScript (ES6+)', icon: Code },
      { id: 's4', name: 'TypeScript', icon: Code },
      { id: 's5', name: 'React & Next.js', icon: LayoutTemplate },
      { id: 's6', name: 'Vue.js', icon: LayoutTemplate },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      { id: 's7', name: 'Node.js & Express', icon: ServerCog },
      { id: 's8', name: 'Python (Flask/FastAPI)', icon: ServerCog },
      { id: 's9', name: 'RESTful APIs', icon: ServerCog },
      { id: 's10', name: 'GraphQL', icon: ServerCog },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    skills: [
      { id: 's11', name: 'MongoDB', icon: DatabaseZap },
      { id: 's12', name: 'PostgreSQL', icon: DatabaseZap },
      { id: 's13', name: 'Firebase', icon: DatabaseZap },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    skills: [
      { id: 's14', name: 'Git & GitHub', icon: GitFork },
      { id: 's15', name: 'Docker', icon: Wrench },
      { id: 's16', name: 'CI/CD', icon: CloudCog },
      { id: 's17', name: 'VS Code', icon: TerminalSquare },
    ],
  },
  {
    id: 'other',
    name: 'Other Skills',
    skills: [
      { id: 's18', name: 'Agile Methodologies', icon: Briefcase },
      { id: 's19', name: 'Testing (Jest, Cypress)', icon: TestTubeDiagonal },
      { id: 's20', name: 'GenAI Integration', icon: BrainCircuit },
      { id: 's21', name: 'Communication', icon: MessageSquare },
    ],
  },
];

export const SOCIAL_LINKS_DATA: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icon: Linkedin,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/',
    icon: Github,
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:youremail@example.com',
    icon: Mail,
  },
];
