
import { UrlProcessorPageClient } from '@/components/UrlProcessorPageClient';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Tri-Agent Insights</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 md:p-10">
        <UrlProcessorPageClient />
      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Powered by Google Gemini.
          </p>
        </div>
      </footer>
    </div>
  );
}
