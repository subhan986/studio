import { Paintbrush } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-border/50 bg-card">
      <div className="container mx-auto flex items-center gap-3">
        <Paintbrush className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary">
          RoomAIdea
        </h1>
      </div>
    </header>
  );
}
