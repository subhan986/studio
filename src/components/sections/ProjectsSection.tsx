
"use client";
import { PROJECTS_DATA } from '@/constants';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// ProjectCard itself will handle its item animation (initial and animate states)
// So we only need to define variants for the container here for staggering.

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Our Star Campaigns" className="py-16 md:py-24 bg-muted/20 dark:bg-muted/10">
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // amount: 0.1 means animation starts when 10% of section is visible
      >
        {PROJECTS_DATA.map((project) => (
          // motion.div wrapper for individual card staggering is now handled by ProjectCard's own variants
          // The container's staggerChildren will apply to direct motion children.
          // If ProjectCard is not a motion component itself, wrap it for staggering:
          // <motion.div key={project.id} variants={itemVariants}> 
          //   <ProjectCard project={project} />
          // </motion.div>
          // Since ProjectCard is now a motion component with its own variants,
          // it will respond to the stagger from the parent container automatically.
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
