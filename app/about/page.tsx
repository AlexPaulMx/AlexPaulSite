'use client';
export const dynamic = "force-dynamic";
import React from 'react';
import dynamicImport from 'next/dynamic';

// Importa NoiseBg dinámicamente, ahora sí funciona porque está en otro archivo
const NoiseBg = dynamicImport(() => import('../../components/NoiseBg'), { ssr: false });

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 12px', position:'relative', overflow:'hidden' }}>
      <NoiseBg />
      <section style={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, position:'relative', zIndex:2 }}>
        {/* Foto destacada */}
        <div style={{position:'relative',marginBottom:8}}>
          <span className="about-border-anim" style={{position:'absolute',inset:0,borderRadius:'50%',border:'3px solid #FFD600',boxShadow:'0 2px 24px #FFD600',zIndex:1,animation:'aboutBorderPulse 2.8s infinite cubic-bezier(.4,2,.6,1)'}}></span>
          <img
            src="https://i.scdn.co/image/ab67616100005174e4aefe89ba9c637d669a06c5"
            alt="Alex Paul Photo"
            style={{
              width: 140,
              height: 140,
              objectFit: 'cover',
              borderRadius: '50%',
              position:'relative',
              zIndex:2,
              border: '4px solid #fff',
              boxShadow: '0 4px 32px #FFD60044'
            }}
          />
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2, margin: 0, textAlign: 'center', lineHeight:1.1 }}>Alex Paul <span style={{fontWeight:400, fontSize:20, color:'#FFD600'}}>(Alejandro)</span></h1>
        <p style={{ fontSize: 19, lineHeight: 1.7, color: '#fff', textAlign: 'center', margin: 0, opacity:0.95, maxWidth:520 }}>
          My name is Alejandro, also known as Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain. I began creating and producing music 14 years ago, but in 2019, I decided to start sharing my music with the world. In March 2022, I made my debut by minting my music as a collectible on-chain, and since day one, I have been exploring this exciting playground. I continue to create every day.
        </p>
        {/* Highlights en tarjetas */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:18, justifyContent:'center', width:'100%' }}>
          <Highlight icon={<svg width="22" height="22" fill="#FFD600" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#FFD600" strokeWidth="2.2" fill="none"/></svg>} text="Over 2M streams on YouTube" />
          <Highlight icon={<svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="11" y="3" width="2" height="18" rx="1"/></svg>} text="220 collectors on Sound" />
          <Highlight icon={<svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/><path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" fill="none"/></svg>} text="300 collectors on Zora" />
          <Highlight icon={<svg width="22" height="22" fill="#FFD600" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="11" y="3" width="2" height="18" rx="1"/></svg>} text="2 sold-out releases on Catalog" />
          <Highlight icon={<svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/><path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" fill="none"/></svg>} text="3 one-of-one pieces sold on Hey/Orb" />
          <Highlight icon={<svg width="22" height="22" fill="#FFD600" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#FFD600" strokeWidth="2.2" fill="none"/></svg>} text="Performer on 'Una Cancion'" />
          <Highlight icon={<svg width="22" height="22" fill="#FFD600" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2.2" fill="none"/><path d="M8 12l2 2 4-4" stroke="#FFD600" strokeWidth="2.2" fill="none"/></svg>} text="3 placements on Spotify Latin Friday" />
        </div>
        {/* Links sociales solo logos */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1, marginBottom: 2, color: '#fff', textAlign: 'center' }}>Links</span>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
            <a href="https://warpcast.com/alexpaul" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="Warpcast"><svg width="28" height="28" fill="#fff" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M10.5 23V9h3.5l4.5 7.5V9H22v14h-3.5l-4.5-7.5V23z" fill="#111"/></svg></a>
            <a href="https://hey.xyz/u/alexpaul" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="Lens"><svg width="28" height="28" fill="#fff" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#111"/></svg></a>
            <a href="https://www.instagram.com/alexpaulmx/" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="Instagram"><svg width="28" height="28" fill="#fff" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 24.6 353.3 22.9C317.7 21.2 130.3 21.2 94.7 22.9 59.4 24.6 28 32.8 2.7 59.1S-1.7 94.7.1 130.1c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.6 1.7-223 0-258.6zm-48.1 288c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.9 9s-103.5 2.7-132.9-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.9s-2.7-103.5 9-132.9c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.9-9s103.5-2.7 132.9 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.9s2.7 103.5-9 132.9z"/></svg></a>
            <a href="https://open.spotify.com/artist/2prfYgiUwtdXGBY4cqhkWg" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="Spotify"><svg width="28" height="28" fill="#fff" viewBox="0 0 168 168"><circle cx="84" cy="84" r="84" fill="#fff"/><path d="M84 0C37.7 0 0 37.7 0 84s37.7 84 84 84 84-37.7 84-84S130.3 0 84 0zm38.2 120.5c-1.5 2.5-4.7 3.3-7.2 1.8-19.8-12.1-44.8-14.8-74.2-8.1-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.8-7.1 59.1-4.1 81.1 9.1 2.5 1.5 3.3 4.7 1.8 7.3zm10.3-20.7c-1.9 3.1-5.9 4.1-9 2.2-22.7-13.9-57.4-18-84.5-9.8-3.5 1-7.2-.9-8.2-4.4-1-3.5.9-7.2 4.4-8.2 30.2-8.9 68.1-4.4 93.2 11.1 3.1 1.9 4.1 5.9 2.1 9zm.2-21.6c-27.1-16.1-71.8-17.6-97.6-9.6-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.1-8.6 77.2-7 108.6 11.1 4.1 2.4 5.5 7.7 3.1 11.8-2.4 4.1-7.7 5.5-11.8 3.1z" fill="#111"/></svg></a>
            <a href="https://music.apple.com/us/artist/alex-paul/1470429100" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="Apple Music"><svg width="28" height="28" fill="#fff" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/><text x="16" y="21" textAnchor="middle" fontSize="13" fill="#111" fontFamily="Arial, Helvetica, sans-serif"></text></svg></a>
            <a href="https://www.youtube.com/channel/UC-Uei4OqY8xX5M1YgqGxW4w" target="_blank" rel="noopener noreferrer" className="about-social-icon" aria-label="YouTube"><svg width="28" height="28" fill="#fff" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/><path d="M23.498 13.186a2.994 2.994 0 0 0-2.112-2.112C19.505 10.5 16 10.5 16 10.5s-3.505 0-5.386.574A2.994 2.994 0 0 0 8.502 13.186C8 15.067 8 19 8 19s0 3.933.502 5.814a2.994 2.994 0 0 0 2.112 2.112C12.495 27.5 16 27.5 16 27.5s3.505 0 5.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 22.933 24 19 24 19s0-3.933-.502-5.814zM13.545 22.568V15.432L19.818 19l-6.273 3.568z" fill="#111"/></svg></a>
          </nav>
        </div>
        <div style={{ marginTop: 18, color: '#FFD600', fontWeight: 600, fontSize: 16, textAlign: 'center', opacity: 0.85 }}>
          "Always experimenting. Always building."
        </div>
      </section>
      <style>{`
        .about-border-anim { pointer-events:none; }
        @keyframes aboutBorderPulse {
          0% { box-shadow: 0 2px 16px #FFD600; border-color: #FFD600; }
          50% { box-shadow: 0 4px 32px #fff; border-color: #fff; }
          100% { box-shadow: 0 2px 16px #FFD600; border-color: #FFD600; }
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
    <div style={{display:'flex',alignItems:'center',gap:8,background:'#181a20',borderRadius:12,padding:'10px 16px',fontWeight:600,fontSize:15,boxShadow:'0 2px 8px #FFD60033',border:'1.5px solid #232323',color:'#fff'}}>
      <span style={{display:'flex',alignItems:'center'}}>{icon}</span> {text}
    </div>
  );
} // trigger redeploy
