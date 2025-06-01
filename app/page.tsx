import Link from 'next/link';
import { Music, Info, Users } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Alex Paul</h1>
        <p className="text-gray-400">Welcome to my website</p>
      </div>
    </main>
  );
}
