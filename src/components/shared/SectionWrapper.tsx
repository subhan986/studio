import type React from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function SectionWrapper({ id, children, className, title }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
