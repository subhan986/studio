import RoomDesigner from '@/components/room-designer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <RoomDesigner />
      </main>
    </div>
  );
}
