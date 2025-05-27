'use client';
export const dynamic = "force-dynamic";
import React from 'react';
import dynamicImport from 'next/dynamic';
import NoiseBg from '../../components/NoiseBg';

// Nuevo icono Users para Zora
const UsersIcon = (
  <svg width="22" height="22" fill="#ef4444" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="#ef4444" strokeWidth="2" fill="none"/><circle cx="9" cy="7" r="4" stroke="#ef4444" strokeWidth="2" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#ef4444" strokeWidth="2" fill="none"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#ef4444" strokeWidth="2" fill="none"/></svg>
);

export default function AboutPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '28px 6px' : '32px 12px', position:'relative', overflow:'hidden' }}>
      <NoiseBg />
      <section style={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 28 : 36, position:'relative', zIndex:2 }}>
        {/* Hero: Nombre y Foto */}
        <h1 style={{ fontSize: isMobile ? 34 : 38, fontWeight: 900, letterSpacing: 2, margin: 0, textAlign: 'center', lineHeight:1.1, textTransform:'uppercase', marginBottom: isMobile ? 10 : 16 }}>ALEX PAUL</h1>
        <div style={{width:'100%', maxWidth:220, margin:'0 auto', marginBottom:isMobile?10:16}}>
          <img
            src="https://i.scdn.co/image/ab67616100005174e4aefe89ba9c637d669a06c5"
            alt="Alex Paul Photo"
            style={{
              width: '100%',
              aspectRatio: '1/1',
              objectFit: 'cover',
              borderRadius: 24,
              boxShadow: '0 4px 32px #ef444444',
              display: 'block',
            }}
          />
        </div>
        {/* Bio en tarjeta */}
        <div style={{background:'#181a20', border:'1.5px solid #232323', borderRadius:16, boxShadow:'0 2px 8px #ef444433', padding:isMobile? '18px 12px' : '22px 22px', width:'100%', maxWidth:520, marginBottom: isMobile ? 8 : 0}}>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.18, color: '#fff', textAlign: 'justify', margin: 0, opacity:0.95 }}>
            I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain. I began creating and producing music 14 years ago, but in 2019, I decided to start sharing my music with the world. In March 2022, I made my debut by minting my music as a collectible on-chain, and since day one, I have been exploring this exciting playground. I continue to create every day.
          </p>
        </div>
        {/* Highlights en tarjetas */}
        <div style={{ display:'flex', flexDirection: 'column', gap:isMobile?12:18, justifyContent:'center', width:'100%' }}>
          <Highlight icon={<svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#ef4444" strokeWidth="2.2" fill="none"/></svg>} text="Over 2M streams on YouTube" />
          <Highlight icon={<svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="11" y="3" width="2" height="18" rx="1"/></svg>} text="220 collectors on Sound" />
          <Highlight icon={UsersIcon} text="300 collectors on Zora" />
          <Highlight icon={<svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="11" y="3" width="2" height="18" rx="1"/></svg>} text="2 sold-out releases on Catalog" />
          <Highlight icon={<svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/><path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" fill="none"/></svg>} text="3 one-of-one pieces sold on Hey/Orb" />
          <Highlight icon={<svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#ef4444" strokeWidth="2.2" fill="none"/></svg>} text="Performer on 'Una Cancion'" />
          <Highlight icon={<svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#ef4444" strokeWidth="2.2" fill="none"/></svg>} text="3 placements on Spotify Latin Friday" />
        </div>
        {/* Follow Me On - igual que Home */}
        <section className="py-8 text-center border-t border-neutral-800">
          <span className="inline-block px-6 py-2 border border-white text-sm uppercase tracking-wider text-white mb-4">Follow Me On</span>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {/* Warpcast (W) */}
            <a href="https://warpcast.com/alexpaul" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Warpcast">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><text x="16" y="23" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">W</text></svg>
            </a>
            {/* Lens (Hey) */}
            <a href="https://hey.xyz/u/alexpaul" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Lens">
              <img src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeihitgwcgukma6hb7pfrjcwiwdby6zgmllw7snzijl5hd2jopaxzdi/Logo%20Lens%20Blanco.png" alt="Lens" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/alexpaulmx/" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Instagram">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="20" height="20" rx="6" stroke="#fff" strokeWidth="2" fill="none"/>
                <circle cx="16" cy="16" r="5" stroke="#fff" strokeWidth="2" fill="none"/>
                <circle cx="22.2" cy="9.8" r="1.2" fill="#fff"/>
              </svg>
            </a>
            {/* Spotify */}
            <a href="https://open.spotify.com/artist/2prfYgiUwtdXGBY4cqhkWg" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Spotify">
              <img src="https://img.icons8.com/ios11/512/FFFFFF/spotify.png" alt="Spotify" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
            </a>
            {/* Apple Music */}
            <a href="https://music.apple.com/us/artist/alex-paul/1470429100" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Apple Music">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><text x="16" y="21" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif"></text></svg>
            </a>
          </div>
        </section>
      </section>
      <style>{`
        .about-border-anim { pointer-events:none; }
        @keyframes aboutBorderPulse {
          0% { box-shadow: 0 2px 16px #ef4444; border-color: #ef4444; }
          50% { box-shadow: 0 4px 32px #fff; border-color: #fff; }
          100% { box-shadow: 0 2px 16px #ef4444; border-color: #ef4444; }
        }
        .about-social-icon { opacity:0.85; transition:transform 0.18s, opacity 0.18s; }
        .about-social-icon:hover { opacity:1; transform:scale(1.18); }
      `}</style>
    </main>
  );
}

// Tarjeta de highlight
function Highlight({icon, text}:{icon:React.ReactNode, text:string}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,background:'#181a20',borderRadius:12,padding:'10px 16px',fontWeight:600,fontSize:15,boxShadow:'0 2px 8px #ef444433',border:'1.5px solid #232323',color:'#fff'}}>
      <span style={{display:'flex',alignItems:'center'}}>{icon}</span> {text}
    </div>
  );
} // trigger redeploy
