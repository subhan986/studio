
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 50, damping: 20 } 
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0px 10px 30px -5px hsl(var(--primary) / 0.2)",
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial" // This will be controlled by ProjectsSection for staggered entrance
      whileInView="animate" // Animate when in view, if not staggered by parent
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-xl border-border/30 bg-card/80 backdrop-blur-sm transition-all duration-300 ease-out">
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full overflow-hidden rounded-t-xl">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110" // group-hover might be redundant if card itself scales
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={project.imageAiHint || "tech project"}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
          <CardTitle className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow min-h-[60px]">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/30">
                <Zap className="mr-1 h-3 w-3" /> {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-wrap justify-start gap-3">
          {project.liveUrl && (
            <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-full px-4">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-full px-4">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
