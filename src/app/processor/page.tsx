
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import Link from 'next/link';
import Image from 'next/image'; // Added for image logo
import { Button } from '@/components/ui/button';

export default function ProcessorPage() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <header className="sticky-header"> 
        <div className="container flex h-16 sm:h-20 items-center">
          <Link href="/" className="flex items-center"> {/* Removed space-x as image is the main content */}
            <Image
              src="https://placehold.co/120x40.png"
              alt="Tri-AI Logo"
              width={120}
              height={40}
              className="h-10 w-auto" // Adjust height as needed, width will scale
              data-ai-hint="logo brand"
            />
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            {/* ThemeToggle removed */}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-10">
        <UrlProcessorPageClient /> 
      </main>
      <footer className="py-8 border-t border-border/30 bg-background/80"> 
        <div className="container mx-auto px-4 sm:px-6 text-center text-foreground/60">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Tri-AI. All rights reserved.</p>
          <p className="text-xs sm:text-sm mt-1">Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
