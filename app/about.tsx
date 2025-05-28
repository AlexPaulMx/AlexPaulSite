import React from "react";
import Image from "next/image";
import { Music, Star, Users, Trophy, Youtube, PlusCircle } from "lucide-react";

const highlights = [
  {
    icon: <Youtube className="w-6 h-6 text-red-500" />, text: "Over 2M streams on YouTube"
  },
  {
    icon: <PlusCircle className="w-6 h-6 text-indigo-400" />, text: "220 collectors on Sound"
  },
  {
    icon: <Trophy className="w-6 h-6 text-yellow-400" />, text: "Top 10 on Riff/Lens Protocol"
  },
  {
    icon: <Star className="w-6 h-6 text-pink-400" />, text: "Featured on 'Una Cancion'"
  },
  {
    icon: <img src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeihitgwcgukma6hb7pfrjcwiwdby6zgmllw7snzijl5hd2jopaxzdi/Logo%20Lens%20Blanco.png" alt="Lens" className="w-6 h-6 object-contain" />, text: "2,000+ Collectors on Lens"
  },
  {
    icon: <Music className="w-6 h-6 text-green-400" />, text: "7 Sold-Out Drops (Sound, Zora, Catalog)"
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex flex-col items-center py-8 px-2 md:px-0">
      <section className="w-full max-w-2xl flex flex-col items-center gap-10 mt-8 mb-8">
        {/* Nombre grande */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center tracking-tight mb-2">ALEX PAUL</h1>
        {/* Avatar grande */}
        <div className="relative flex items-center justify-center mb-2">
          <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full bg-pink-500/20 blur-2xl z-0" />
          <Image
            src="/images/alexpaul-avatar.png"
            alt="Alex Paul Avatar"
            width={180}
            height={180}
            className="rounded-full border-4 border-indigo-500 shadow-2xl bg-gray-900 object-cover relative z-10"
            priority
          />
        </div>
        {/* Bio alineada a la izquierda */}
        <div className="w-full bg-black/70 border border-white/10 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-4 items-start max-w-xl mx-auto">
          <h2 className="text-lg md:text-2xl font-bold text-indigo-300 mb-2">About</h2>
          <p className="text-base md:text-lg text-gray-200 text-left">
            My name is Alejandro, but you can call me <span className="font-bold text-indigo-400">Alex Paul</span>. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
          </p>
          <p className="text-base md:text-lg text-gray-200 text-left">
            I began creating and producing music 14 years ago, but in 2019, I decided to start sharing my music with the world. In March 2022, I made my debut by minting my music as a collectible on-chain, and since day one, I have been exploring this exciting playground. I continue to create every day.
          </p>
        </div>
        {/* Highlights como tarjetas individuales */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-900/80 border border-white/10 rounded-xl p-4 shadow-md hover:scale-[1.03] hover:border-indigo-400 transition-transform duration-200">
              {h.icon}
              <span className="text-base md:text-lg text-indigo-100 font-medium">{h.text}</span>
            </div>
          ))}
        </div>
        {/* CTA The Lab */}
        <div className="w-full flex flex-col items-center gap-2 mt-4">
          <p className="text-center text-base md:text-lg text-gray-300 mb-2">I'm currently working on an audiovisual album titled <span className="font-bold text-pink-400">The Lab</span>. Click below to know more about the project!</p>
          <a
            href="/thelab"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 rounded-full text-lg font-bold uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-transform"
          >
            <Music className="w-6 h-6" /> Discover The Lab
          </a>
        </div>
      </section>
    </main>
  );
} 