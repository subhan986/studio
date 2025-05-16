
import type {Metadata} from 'next';
import { Playfair_Display } from 'next/font/google';
// System font will be used for body from globals.css
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tri-AI',
  description: 'AI-powered multi-agent information processing system using Gemini.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${playfairDisplay.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
