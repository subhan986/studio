
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Info, Brain, Globe, Code, MessageCircle } from 'lucide-react'; // Added Brain, Globe, Code, MessageCircle
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjusted for potentially more items
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
};

const taglineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

const floatingStatsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4, // Delay after tagline
    },
  },
};

const floatingStatItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
   hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px hsl(var(--primary) / 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 10 }
  }
};


const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      duration: 0.5,
      delay: 0.6, // Delay after floating stats
    },
  },
};

const aboutSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      duration: 0.8,
      staggerChildren: 0.2,
      delay: 0.3, // Delay after buttons if buttons are also in this section
    },
  },
};

const aboutItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


const buttonHoverProps = {
  scale: 1.08,
  boxShadow: "0px 0px 15px hsl(var(--primary))",
  transition: { type: "spring", stiffness: 300, damping: 10 }
};

const secondaryButtonHoverProps = {
  scale: 1.05,
  boxShadow: "0px 0px 12px hsl(var(--accent))",
  transition: { type: "spring", stiffness: 300, damping: 15 }
};

const floatingStats = [
  { icon: Brain, text: "4+ Interdisciplinary Projects" },
  { icon: Globe, text: "Built for Scientists, Writers & Everyone in Between" },
  { icon: Code, text: "Always Coding, Always Creating" },
];

export function HeroSection() {
  return (
    <SectionWrapper id="hero" className="bg-background dark:bg-background overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <motion.div
        className="grid grid-cols-1 gap-10 md:gap-12 items-center text-center" // Adjusted gap
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Top Part: Subhan Portfolio */}
        <div className="py-10 md:py-12">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 leading-tight" // Adjusted size and margin
            variants={titleVariants}
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Subhan Portfolio
          </motion.h1>
          <motion.p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto" variants={taglineVariants}>
            Creative Technologist & Storyteller. <br className="hidden sm:block" /> Building innovative solutions at the crossroads of code, science, and narrative.
          </motion.p>

          {/* Floating Stats Cards */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-10"
            variants={floatingStatsContainerVariants}
          >
            {floatingStats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 p-3 bg-card/70 dark:bg-card/50 backdrop-blur-sm rounded-lg shadow-md border border-border/20"
                variants={floatingStatItemVariants}
                whileHover="hover"
              >
                <stat.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-foreground/90">{stat.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={buttonVariants} // Using buttonVariants for the container of buttons
          >
            <motion.div whileHover={buttonHoverProps}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl px-8 py-5 text-md rounded-full">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={secondaryButtonHoverProps}>
               <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 shadow-lg px-8 py-5 text-md rounded-full">
                  <Link href="#contact">
                    Get In Touch <MessageCircle className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Part: About Me */}
        <motion.div
          className="py-10 md:py-12 border-t border-border/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Reduced amount for earlier trigger
          variants={aboutSectionVariants}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div className="flex justify-center md:order-last" variants={aboutItemVariants}>
              <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="hsl(var(--accent))" glarePosition="all" tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={1000}>
                <Image
                  src="https://images.unsplash.com/photo-1523878291631-87283277f717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3RhdHVlfGVufDB8fHx8MTc0ODUxNDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Subhan - Professional Headshot"
                  width={300} // Slightly smaller for personal portfolio
                  height={300}
                  className="rounded-lg shadow-2xl object-cover border-4 border-primary/50" // Changed border color
                  data-ai-hint="professional headshot" // Updated hint
                  priority
                />
              </Tilt>
            </motion.div>
            <div className="text-center md:text-left">
              <motion.h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary" variants={aboutItemVariants}>
                About Me
              </motion.h2>
              <motion.p className="text-md sm:text-lg text-foreground/90 mb-4 leading-relaxed" variants={aboutItemVariants}>
                Hey! I’m Subhan — a curious mind at the intersection of code, science, and stories. I’m building interactive platforms that blend synthetic biology, 3D simulations, and AI into tools that are as cool as they are useful.
              </motion.p>
              <motion.p className="text-md sm:text-lg text-foreground/90 mb-6 leading-relaxed" variants={aboutItemVariants}>
                When I’m not knee-deep in JavaScript or spinning up gene circuits, I’m probably dreaming up novels inspired by resistance, memory, and the magic of female friendship. I believe in using tech and narrative to challenge norms and shape the future.
              </motion.p>
              <motion.p className="text-md sm:text-lg text-foreground/90 mb-8 leading-relaxed font-semibold" variants={aboutItemVariants}>
                Let’s build something unforgettable.
              </motion.p>
              {/* Optional: Could re-add a button here if needed, or rely on main CTAs above */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
