
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import Link from 'next/link';
import { ArrowRight, Download, BrainCircuit, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const floatingCardContent = [
  { icon: BrainCircuit, text: "4+ Interdisciplinary Projects" },
  { icon: Globe, text: "Built for Scientists, Writers & Everyone in Between" },
  { icon: Zap, text: "Always Coding, Always Creating" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const buttonHoverProps = {
  scale: 1.05,
  boxShadow: "0px 0px 12px hsl(var(--primary))", // Using HSL variable for glow
  transition: { type: "spring", stiffness: 300, damping: 15 }
};


export function HeroSection() {
  return (
    <SectionWrapper id="about" className="bg-muted/30 dark:bg-muted/10 overflow-hidden">
      <motion.div 
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-center md:order-last">
          <motion.div variants={itemVariants}>
            <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="hsl(var(--primary))" glarePosition="all" tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
              <Image
                src="https://images.unsplash.com/photo-1523878291631-87283277f717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3RhdHVlfGVufDB8fHx8MTc0ODUxNDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional Headshot"
                width={300}
                height={300}
                className="rounded-full shadow-xl border-4 border-primary object-cover"
                data-ai-hint="professional headshot"
                priority
              />
            </Tilt>
          </motion.div>
        </div>
        <div className="text-center md:text-left">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Hello, I&apos;m <span className="text-primary">M.Subhan</span>
          </motion.h1>
          
          <motion.div 
            className="mb-6 space-y-2"
            variants={containerVariants} // This will stagger its children
          >
            {floatingCardContent.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-center md:justify-start text-lg text-muted-foreground"
                variants={itemVariants}
              >
                <item.icon className="h-5 w-5 mr-2 text-accent" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p className="text-lg mb-3 leading-relaxed" variants={itemVariants}>
            Hey! I’m Subhan — a curious mind at the intersection of code, science, and stories. I’m building interactive platforms that blend synthetic biology, 3D simulations, and AI into tools that are as cool as they are useful.
          </motion.p>
          <motion.p className="text-lg mb-6 leading-relaxed" variants={itemVariants}>
            When I’m not knee-deep in JavaScript or spinning up gene circuits, I’m probably dreaming up novels inspired by resistance, memory, and the magic of female friendship. I believe in using tech and narrative to challenge norms and shape the future.
          </motion.p>
          <motion.p className="text-lg mb-6 leading-relaxed font-medium" variants={itemVariants}>
            Let’s build something unforgettable.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants} // Animate the button group as one item
          >
            <motion.div whileHover={buttonHoverProps}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={buttonHoverProps}>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-md">
                {/* Replace with actual resume link */}
                <a href="/resume.pdf" download> 
                  Download CV <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
