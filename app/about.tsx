import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-16 px-4">
      <section className="max-w-2xl w-full flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl uppercase tracking-wider mb-8 font-bold">Who Am I?</h1>
        <div className="text-center text-base md:text-lg text-neutral-200 mb-8">
          <p className="mb-4">My name is Alejandro, but you can call me Alex Paul. I'm an independent artist, musician, and producer hailing from the Tamaulipas-Texas border, where I constantly experiment with my music on-chain.</p>
          <p className="mb-4">I started creating and producing music 14 years ago, but five years ago, I took the leap to release it on digital streaming platforms. In March 2022, I made my debut on Web 3 by minting my music as a collectible, and from day one, I've been diving deep into this exciting new playground.</p>
          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Web 3 Highlights:</h2>
          <ul className="text-left mx-auto max-w-md text-base md:text-lg text-neutral-200 mb-8 list-disc list-inside">
            <li>3 Sold-Out Music Drops on Sound</li>
            <li>2 Sold-Out Music Drops on Zora</li>
            <li>2 Sold-Out Drops on Catalog</li>
            <li>Ranked Among the Top 10 Artists on Riff / Lens Protocol</li>
            <li>Over 2,000 Collectors on Lens</li>
            <li>Featured Performer on "Una Cancion"</li>
          </ul>
          <p>At this moment I'm working in an audiovisual Album titled <button className="inline-block px-4 py-1 bg-indigo-700 rounded-full text-xs uppercase tracking-wider text-white font-bold hover:bg-indigo-500 transition-colors mx-1">The Lab</button>, press the button to know more about the project.</p>
        </div>
      </section>
    </main>
  );
} 