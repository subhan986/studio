
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, CheckCircle, BarChart, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle'; 
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky-header">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Brain className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-display text-primary">Tri-AI</h1>
          </Link>
          <nav className="flex items-center space-x-2">
            {/* "Go to Processor" button removed from here */}
            <ThemeToggle /> 
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-bold font-display text-primary mb-6">
              Unlock Web Insights with Tri-AI
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto">
              Tri-AI is your intelligent assistant for scraping, validating, and enhancing content from any article URL. Transform raw web data into structured, reliable, and polished information effortlessly.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/processor" className="flex items-center">
                Get Started <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold font-display text-center text-primary mb-16">
              How Tri-AI Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <Card className="card-hover bg-card border-border/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl text-primary">1. Scrape Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-base">
                    Provide any article URL, and Tri-AI's first agent intelligently extracts the title, summary, key takeaways, and full text content, cutting through the noise.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="card-hover bg-card border-border/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl text-primary">2. Validate Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-base">
                    The second agent assesses the scraped content for apparent reliability and internal consistency, highlighting claims that might need further verification.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="card-hover bg-card border-border/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <BarChart className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-display text-2xl text-primary">3. Enhance & Refine</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-base">
                    Finally, the third agent takes the validated information and enhances it into well-written, comprehensive prose, ready for your use.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
