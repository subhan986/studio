
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ProcessorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky-header bg-background/90 backdrop-blur-sm">
        <div className="container flex h-16 sm:h-20 items-center">
          <Link href="/" className="flex h-full items-center"> {/* Modified: Added h-full */}
            <Image
              src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxicmFpbnxlbnwwfHx8fDE3NDc0MTgzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Tri-AI Logo"
              width={120}
              height={40}
              className="h-full w-auto object-contain" // Modified: Image takes full height of Link, width auto, object-contain
              data-ai-hint="brain logo"
            />
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            {/* ThemeToggle is managed by its own component if active */}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-10">
        <UrlProcessorPageClient />
      </main>
      <footer className="py-8 border-t border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 text-center text-foreground/60">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Tri-AI. All rights reserved.</p>
          <p className="text-xs sm:text-sm mt-1">Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
