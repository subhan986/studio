
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Zap, CircleCheckBig, ChartNoAxesColumnIncreasing } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky-header">
        <div className="container flex h-16 sm:h-20 items-center">
          <Link href="/" className="flex h-full items-center">
            <Image
              src="https://placehold.co/150x50.png"
              alt="Tri-AI Logo"
              width={150}
              height={50}
              className="h-auto w-auto object-contain"
              data-ai-hint="cosmic logo"
              priority
            />
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            {/* Future nav items can go here */}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <Card className="max-w-3xl mx-auto p-6 sm:p-10 shadow-lg bg-card card-glow-hover">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-primary mb-6">
                Unlock Web Insights with Tri-AI
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-10">
                Tri-AI is your intelligent assistant for scraping, validating, and enhancing content from any article URL. Transform raw web data into structured, reliable, and polished information effortlessly.
              </p>
              <Button asChild size="lg" className="font-semibold text-lg py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Link href="/processor" className="flex items-center">
                  <span className="flex items-center">
                    Get Started <ExternalLink className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-center text-primary mb-12 sm:mb-16">
              How Tri-AI Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              <Card className="card-glow-hover bg-card border-border/50 shadow-lg">
                <CardHeader className="items-center text-center">
                  <div className="p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--scraper-accent)]" style={{ filter: 'drop-shadow(0 0 5px var(--scraper-accent))' }} />
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-[var(--scraper-accent)]" style={{textShadow: '0 0 8px hsla(var(--scraper-accent), 0.7)'}}>1. Scrape Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-sm sm:text-base">
                    Provide any article URL, and Tri-AI's first agent intelligently extracts the title, summary, key takeaways, and full text content, cutting through the noise.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="card-glow-hover bg-card border-border/50 shadow-lg">
                <CardHeader className="items-center text-center">
                  <div className="p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <CircleCheckBig className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--validator-accent)]" style={{ filter: 'drop-shadow(0 0 5px var(--validator-accent))' }} />
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-[var(--validator-accent)]" style={{textShadow: '0 0 8px hsla(var(--validator-accent), 0.7)'}}>2. Validate Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-sm sm:text-base">
                    The second agent assesses the scraped content for apparent reliability and internal consistency, highlighting claims that might need further verification.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="card-glow-hover bg-card border-border/50 shadow-lg">
                <CardHeader className="items-center text-center">
                  <div className="p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <ChartNoAxesColumnIncreasing className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--enhancer-accent-gold)]" style={{ filter: 'drop-shadow(0 0 5px var(--enhancer-accent-gold))' }}/>
                  </div>
                  <CardTitle className="font-display text-xl sm:text-2xl text-[var(--enhancer-accent-gold)]" style={{textShadow: '0 0 8px hsla(var(--enhancer-accent-gold), 0.7)'}}>3. Enhance & Refine</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-card-foreground/80 text-sm sm:text-base">
                    Finally, the third agent takes the validated information and enhances it into well-written, comprehensive prose, ready for your use.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
