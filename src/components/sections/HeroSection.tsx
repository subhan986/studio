
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import Link from 'next/link';
import { ArrowRight, Download, BrainCircuit, Globe, Zap } from 'lucide-react';

export function HeroSection() {
  const floatingCardContent = [
    { icon: BrainCircuit, text: "4+ Interdisciplinary Projects" },
    { icon: Globe, text: "Built for Scientists, Writers & Everyone in Between" },
    { icon: Zap, text: "Always Coding, Always Creating" },
  ];

  return (
    <SectionWrapper id="about" className="bg-muted/30 dark:bg-muted/10">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex justify-center md:order-last">
          <Image
            src="https://images.unsplash.com/photo-1523878291631-87283277f717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3RhdHVlfGVufDB8fHx8MTc0ODUxNDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Professional Headshot"
            width={300}
            height={300}
            className="rounded-full shadow-xl border-4 border-primary object-cover"
            data-ai-hint="professional headshot"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Hello, I&apos;m <span className="text-primary">M.Subhan</span>
          </h1>
          <div className="mb-6 space-y-2">
            {floatingCardContent.map((item, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start text-lg text-muted-foreground">
                <item.icon className="h-5 w-5 mr-2 text-accent" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-lg mb-3 leading-relaxed">
            Hey! I’m Subhan — a curious mind at the intersection of code, science, and stories. I’m building interactive platforms that blend synthetic biology, 3D simulations, and AI into tools that are as cool as they are useful.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            When I’m not knee-deep in JavaScript or spinning up gene circuits, I’m probably dreaming up novels inspired by resistance, memory, and the magic of female friendship. I believe in using tech and narrative to challenge norms and shape the future.
          </p>
          <p className="text-lg mb-6 leading-relaxed font-medium">
            Let’s build something unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 shadow-md transition-transform hover:scale-105">
              {/* Replace with actual resume link */}
              <a href="/resume.pdf" download> 
                Download CV <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
