"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Briefcase, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">PortfolioPilot</span>
          </Link>
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted/50 md:hidden"></div>
          <div className="h-8 w-96 animate-pulse rounded-md bg-muted/50 hidden md:block"></div>
        </div>
      </header>
    );
  }
  
  const renderNavLinks = (isMobile = false) => (
    NAV_LINKS.map((link) => {
      const LinkComponent = isMobile ? SheetClose : 'div';
      return (
        <LinkComponent key={link.label} asChild={isMobile}>
          <Link
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}
          >
            {link.icon && <link.icon className="inline-block h-4 w-4 mr-1" />}
            {link.label}
          </Link>
        </LinkComponent>
      );
    })
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">PortfolioPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="p-6">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                   <SheetClose asChild>
                    <>
                      <Briefcase className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">PortfolioPilot</span>
                    </>
                  </SheetClose>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {renderNavLinks(true)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
