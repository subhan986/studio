
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle'; // Added ThemeToggle
import { Button } from '@/components/ui/button';


export default function ProcessorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky-header"> {/* Updated class */}
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Brain className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-display text-primary">Tri-AI</h1>
          </Link>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <ThemeToggle /> {/* Added ThemeToggle */}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 md:p-10">
        <UrlProcessorPageClient />
      </main>
      <footer className="py-8 bg-secondary/30 border-t border-border/30">
        <div className="container mx-auto px-6 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Tri-AI. All rights reserved.</p>
          <p className="text-sm mt-1">Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
