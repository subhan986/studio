
import { SOCIAL_LINKS_DATA } from '@/constants';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-8">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          {SOCIAL_LINKS_DATA.map((link) => (
            <Button key={link.id} asChild variant="outline" size="icon" className="rounded-full w-12 h-12 hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-110">
              <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-6 w-6 text-primary" />
              </Link>
            </Button>
          ))}
        </div>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
          <Link href="mailto:subyounas@gmail.com">
            Send Me an Email
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
