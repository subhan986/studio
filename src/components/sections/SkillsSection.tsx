
"use client";
import { SKILLS_DATA } from '@/constants';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const skillCategoryCardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { 
    y: -5, 
    boxShadow: "0px 8px 25px hsl(var(--primary) / 0.15)",
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  },
};

const skillItemVariants = {
  hover: { 
    scale: 1.1,
    color: "hsl(var(--accent))",
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

const iconVariants = {
  hover: { 
    rotate: [0, -15, 15, -10, 10, 0], 
    scale: 1.2,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="Our Superpowers" className="bg-background dark:bg-background py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {SKILLS_DATA.map((category) => (
          <motion.div
            key={category.id}
            variants={skillCategoryCardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="h-full shadow-lg rounded-xl border-border/30 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-primary">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.skills.map((skill) => (
                    <motion.li 
                      key={skill.id} 
                      className="flex items-center text-md"
                      variants={skillItemVariants}
                      whileHover="hover" // Apply hover to the whole li for text color change
                    >
                      <motion.div variants={iconVariants} whileHover="hover"> {/* Separate motion div for icon */}
                        <skill.icon className="h-6 w-6 mr-3 text-accent flex-shrink-0" />
                      </motion.div>
                      <span>{skill.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
