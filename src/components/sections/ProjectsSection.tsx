import { PROJECTS_DATA } from '@/constants';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { SectionWrapper } from '@/components/shared/SectionWrapper';

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="My Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS_DATA.map((project) => (
          <div key={project.id} className="group">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
