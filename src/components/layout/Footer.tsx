export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} PortfolioPilot. All rights reserved.</p>
        <p className="mt-1">Designed with passion and coded with Next.js.</p>
      </div>
    </footer>
  );
}
