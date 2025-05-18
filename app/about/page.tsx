'use client';
export const dynamic = "force-dynamic";
import React from 'react';
import dynamicImport from 'next/dynamic';

// Importa NoiseBg dinámicamente, ahora sí funciona porque está en otro archivo
const NoiseBg = dynamicImport(() => import('../../components/NoiseBg'), { ssr: false });

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
        <div style={{width:'100%', maxWidth:600, margin:'0 auto', marginBottom:isMobile?10:16}}>
          <img
            src="https://i.scdn.co/image/ab67616100005174e4aefe89ba9c637d669a06c5"
            alt="Alex Paul Photo"
            style={{
              width: '100%',
              height: isMobile ? 200 : 260,
              objectFit: 'cover',
              borderRadius: 24,
              boxShadow: '0 4px 32px #ef444444',
              display: 'block',
            }}
          />
        </div>
        {/* Bio en tarjeta */}
        <div style={{background:'#181a20', border:'1.5px solid #232323', borderRadius:16, boxShadow:'0 2px 8px #ef444433', padding:isMobile? '18px 12px' : '22px 22px', width:'100%', maxWidth:520, marginBottom: isMobile ? 8 : 0}}>
          <p style={{ fontSize: isMobile ? 17 : 19, lineHeight: 1.18, color: '#fff', textAlign: 'justify', margin: 0, opacity:0.95 }}>
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
        <section style={{ width: '100%', marginTop: isMobile ? 16 : 8 }}>
          <span style={{ display: 'block', fontWeight: 700, fontSize: isMobile ? 15 : 15, letterSpacing: 1, marginBottom: 14, color: '#fff', textAlign: 'center', textTransform: 'uppercase', border: '1.5px solid #fff', borderRadius: 8, padding: isMobile ? '6px 16px' : '6px 18px', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>Follow Me On</span>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 18, justifyContent: 'center', marginTop: 18 }}>
            <a href="https://warpcast.com/alexpaul" target="_blank" rel="noopener noreferrer" aria-label="Warpcast" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><text x="16" y="23" textAnchor="middle" fontSize={isMobile?18:20} fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">W</text></svg>
            </a>
            <a href="https://hey.xyz/u/alexpaul" target="_blank" rel="noopener noreferrer" aria-label="Lens" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#fff"/></svg>
            </a>
            <a href="https://www.instagram.com/alexpaulmx/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="20" height="20" rx="6" stroke="#fff" strokeWidth="2" fill="none"/><circle cx="16" cy="16" r="5" stroke="#fff" strokeWidth="2" fill="none"/><circle cx="22.2" cy="9.8" r="1.2" fill="#fff"/></svg>
            </a>
            <a href="https://open.spotify.com/artist/2prfYgiUwtdXGBY4cqhkWg" target="_blank" rel="noopener noreferrer" aria-label="Spotify" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} viewBox="0 0 168 168" fill="none"><circle cx="84" cy="84" r="84" fill="none"/><path d="M84 0C37.7 0 0 37.7 0 84s37.7 84 84 84 84-37.7 84-84S130.3 0 84 0zm38.2 120.5c-1.5 2.5-4.7 3.3-7.2 1.8-19.8-12.1-44.8-14.8-74.2-8.1-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.8-7.1 59.1-4.1 81.1 9.1 2.5 1.5 3.3 4.7 1.8 7.3zm10.3-20.7c-1.9 3.1-5.9 4.1-9 2.2-22.7-13.9-57.4-18-84.5-9.8-3.5 1-7.2-.9-8.2-4.4-1-3.5.9-7.2 4.4-8.2 30.2-8.9 68.1-4.4 93.2 11.1 3.1 1.9 4.1 5.9 2.1 9zm.2-21.6c-27.1-16.1-71.8-17.6-97.6-9.6-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.1-8.6 77.2-7 108.6 11.1 4.1 2.4 5.5 7.7 3.1 11.8-2.4 4.1-7.7 5.5-11.8 3.1z" fill="#fff"/></svg>
            </a>
            <a href="https://music.apple.com/us/artist/alex-paul/1470429100" target="_blank" rel="noopener noreferrer" aria-label="Apple Music" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" stroke="#fff" strokeWidth="2" fill="none"/><text x="16" y="21" textAnchor="middle" fontSize={isMobile?13:13} fill="#fff" fontFamily="Arial, Helvetica, sans-serif"></text></svg>
            </a>
            <a href="https://www.youtube.com/channel/UC-Uei4OqY8xX5M1YgqGxW4w" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{padding:isMobile?6:8}}>
              <svg width={isMobile?32:32} height={isMobile?32:32} fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" stroke="#fff" strokeWidth="2" fill="none"/><path d="M23.498 13.186a2.994 2.994 0 0 0-2.112-2.112C19.505 10.5 16 10.5 16 10.5s-3.505 0-5.386.574A2.994 2.994 0 0 0 8.502 13.186C8 15.067 8 19 8 19s0 3.933.502 5.814a2.994 2.994 0 0 0 2.112 2.112C12.495 27.5 16 27.5 16 27.5s3.505 0 5.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 22.933 24 19 24 19s0-3.933-.502-5.814zM13.545 22.568V15.432L19.818 19l-6.273 3.568z" fill="#fff"/></svg>
            </a>
          </nav>
        </section>
        <div style={{ marginTop: isMobile ? 22 : 18, color: '#ef4444', fontWeight: 600, fontSize: isMobile ? 15 : 16, textAlign: 'center', opacity: 0.92 }}>
          "Always experimenting. Always building."
        </div>
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
