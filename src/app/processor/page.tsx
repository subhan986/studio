
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function ProcessorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Brain className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-display text-primary">Tri-AI</h1>
          </Link>
          <nav className="flex items-center space-x-2">
             {/* Add any processor-specific nav items here if needed */}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 md:p-10">
        <UrlProcessorPageClient />
      </main>
      <footer className="py-8 bg-secondary/20 border-t border-border/30">
        <div className="container mx-auto px-6 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Tri-AI. All rights reserved.</p>
          <p className="text-sm mt-1">Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
