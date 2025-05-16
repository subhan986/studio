
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle'; 
import { Button } from '@/components/ui/button';

export default function ProcessorPage() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <header className="sticky-header"> 
        <div className="container flex h-16 sm:h-20 items-center">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary" /> 
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary">Tri-AI</h1>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <ThemeToggle /> 
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-10 bg-background"> {/* Added bg-background here */}
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

