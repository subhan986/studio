
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
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
      delay: 0.4,
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


export function HeroSection() {
  return (
    <SectionWrapper id="hero" className="bg-background dark:bg-background overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <motion.div
        className="grid grid-cols-1 gap-12 items-center text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Top Part: Boozt Portfolio */}
        <div className="py-12 md:py-16">
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-6 leading-tight"
            variants={titleVariants}
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Boozt Portfolio
          </motion.h1>
          <motion.p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto" variants={taglineVariants}>
            Check out some of our star-studded campaigns and success stories. <br className="hidden sm:block" />Warning: may cause serious FOMO.
          </motion.p>
          <motion.div variants={buttonVariants} whileHover={buttonHoverProps}>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl px-10 py-6 text-lg rounded-full">
              <Link href="#projects">
                Discover More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom Part: About Boozt - This will effectively be a new section within Hero */}
        <motion.div
          className="py-12 md:py-16 border-t border-border/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={aboutSectionVariants}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div className="flex justify-center md:order-last" variants={aboutItemVariants}>
              <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="hsl(var(--accent))" glarePosition="all" tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={800}>
                <Image
                  src="https://images.unsplash.com/photo-1523878291631-87283277f717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3RhdHVlfGVufDB8fHx8MTc0ODUxNDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Boozt Agency Team"
                  width={350}
                  height={350}
                  className="rounded-lg shadow-2xl object-cover border-4 border-accent/50"
                  data-ai-hint="modern agency team"
                  priority
                />
              </Tilt>
            </motion.div>
            <div className="text-center md:text-left">
              <motion.h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary" variants={aboutItemVariants}>
                About Boozt
              </motion.h2>
              <motion.p className="text-md sm:text-lg text-foreground/90 mb-6 leading-relaxed" variants={aboutItemVariants}>
                We&apos;re not your average advertising agency. We&apos;re a creative powerhouse, a data-driven think tank, and a team of passionate storytellers rolled into one. We Boozt brands by crafting unforgettable campaigns that resonate, engage, and convert.
              </motion.p>
              <motion.p className="text-md sm:text-lg text-foreground/90 mb-8 leading-relaxed" variants={aboutItemVariants}>
                From viral social media sensations to high-impact ad strategies, we leverage cutting-edge tech and out-of-the-box thinking to make your brand shine.
              </motion.p>
              <motion.div variants={aboutItemVariants} whileHover={secondaryButtonHoverProps}>
                <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 shadow-lg px-8 py-5 text-md rounded-full">
                  <Link href="#contact">
                    Learn More <Info className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
