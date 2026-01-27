import Header from '@/components/Header';
import JourneyBuilder from '@/components/JourneyBuilder';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">
        <JourneyBuilder />
      </main>
    </div>
  );
}
