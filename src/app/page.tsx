import Footer from '@/components/footer';
import Header from '@/components/header';
import RoomDesigner from '@/components/room-designer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <RoomDesigner />
      </main>
      <Footer />
    </div>
  );
}
