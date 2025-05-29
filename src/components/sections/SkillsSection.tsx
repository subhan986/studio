import { SKILLS_DATA } from '@/constants';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="My Skills" className="bg-muted/30 dark:bg-muted/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {SKILLS_DATA.map((category) => (
          <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-primary">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill.id} className="flex items-center text-sm">
                    <skill.icon className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
