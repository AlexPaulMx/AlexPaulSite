"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useRef, useState } from 'react';
import dynamicImport from 'next/dynamic';
import { Music, User, Users, Package, Share2, Award, DollarSign, Trophy, Play, Pause, SkipForward, Square, Volume2, X, Apple, Disc3, Video, MessageCircle, HelpCircle, Settings } from 'lucide-react';
import '../styles/areas/lobby.css';
import { collectibles } from '../page';

// Importa HeatmapBackground dinámicamente para evitar SSR window error
const HeatmapBackground = dynamicImport(() => import('../../components/HeatmapBackground'), { ssr: false });

// Define type for collision rects
type CollisionRect = { x: number; y: number; width: number; height: number };

const useDraggable = (
  initial = { x: 0, y: 0 },
  bounds = { minX: 0, minY: 0, maxX: 1000, maxY: 600 },
  avoidRects: CollisionRect[] = []
) => {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;
      // Limitar dentro de los bounds
      newX = Math.max(bounds.minX, Math.min(newX, bounds.maxX));
      newY = Math.max(bounds.minY, Math.min(newY, bounds.maxY));
      // Evitar superposición con otras cartas
      const thisRect = ref.current ? (ref.current as HTMLElement).getBoundingClientRect() : { width: 320, height: 220 };
      for (const rect of avoidRects) {
        if (!rect) continue;
        // Checa colisión
        if (
          newX < rect.x + rect.width &&
          newX + thisRect.width > rect.x &&
          newY < rect.y + rect.height &&
          newY + thisRect.height > rect.y
        ) {
          // Empuja la carta fuera del área de colisión
          if (newX + thisRect.width > rect.x && newX < rect.x) newX = rect.x - thisRect.width;
          if (newX < rect.x + rect.width && newX > rect.x) newX = rect.x + rect.width;
          if (newY + thisRect.height > rect.y && newY < rect.y) newY = rect.y - thisRect.height;
          if (newY < rect.y + rect.height && newY > rect.y) newY = rect.y + rect.height;
        }
      }
      setPos({ x: newX, y: newY });
    };
    const handleMouseUp = () => setDragging(false);
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, bounds, avoidRects]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setDragging(true);
    }
  };

  return { pos, ref, onMouseDown, dragging };
};

// Agregar función utilitaria para formatear tiempo
function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const TheLab = () => {
  // Estados para el crowdfunding
  const [currentAmount, setCurrentAmount] = useState(0);
  const targetAmount = 10000; // 10,000 USDC
  const progress = (currentAmount / targetAmount) * 100;

  // Estados para el reproductor
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);

  const lobbyRef = useRef<HTMLDivElement>(null);

  const track = {
    title: '03:00 AM',
    artist: 'Alex Paul',
    cover: 'https://i.scdn.co/image/ab67616d0000b273b1e2e7c318e44e7f1c1b1c1b',
    mp3: '', // Aquí puedes poner el link mp3 si lo tienes
    spotify: 'https://open.spotify.com/intl-es/album/2mwxVQLdGbOeiEIlmaF5Ob'
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setPlayerProgress(audioRef.current.currentTime);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleNext = () => {
    // Si hay más canciones, aquí iría la lógica
    handleStop();
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) audioRef.current.volume = Number(e.target.value);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lobbyRef.current) return;
      const { width, height, left, top } = lobbyRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      // Range: -1 to 1
      const px = (x - 0.5) * 2;
      const py = (y - 0.5) * 2;
      lobbyRef.current.style.setProperty('--parallax-x', `${px}`);
      lobbyRef.current.style.setProperty('--parallax-y', `${py}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Card minimize state
  const [minIntro, setMinIntro] = useState(true);
  const [minRewards, setMinRewards] = useState(true);
  const [minFund, setMinFund] = useState(true);
  // Nuevo estado para Music NFTs
  const [minMusicNFTs, setMinMusicNFTs] = useState(true);
  const [animIntro, setAnimIntro] = useState('card-anim-in');
  const [animRewards, setAnimRewards] = useState('card-anim-in');
  const [animFund, setAnimFund] = useState('card-anim-in');
  const [animMusicNFTs, setAnimMusicNFTs] = useState('card-anim-in');

  // Draggable hooks con colisión
  const introRect: CollisionRect | null = !minIntro ? { x: 60, y: 80, width: 400, height: 260 } : null;
  const rewardsRect: CollisionRect | null = !minRewards ? { x: 340, y: 120, width: 400, height: 260 } : null;
  const fundRect: CollisionRect | null = !minFund ? { x: 900, y: 120, width: 400, height: 260 } : null;
  const introDrag = useDraggable(
    { x: 60, y: 80 },
    { minX: 0, minY: 0, maxX: 300, maxY: 400 },
    [rewardsRect, fundRect].filter(Boolean) as CollisionRect[]
  );
  const rewardsDrag = useDraggable(
    { x: 340, y: 120 },
    { minX: 320, minY: 0, maxX: 620, maxY: 400 },
    [introRect, fundRect].filter(Boolean) as CollisionRect[]
  );
  const fundDrag = useDraggable(
    { x: typeof window !== 'undefined' ? window.innerWidth - 340 : 0, y: 320 },
    { minX: 0, minY: 0, maxX: typeof window !== 'undefined' ? window.innerWidth - 340 : 0, maxY: window.innerHeight - 80 },
    []
  );

  // Estado para el chip de Top Supporters
  const [minTopSupporters, setMinTopSupporters] = useState(true);
  const [animTopSupporters, setAnimTopSupporters] = useState('card-anim-in');
  const topSupportersDrag = useDraggable(
    { x: 600, y: 80 },
    { minX: 500, minY: 0, maxX: 900, maxY: 400 },
    []
  );

  // Estado para detectar si es móvil (reactivo a resize)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsivo: estilos para el chip de Top Supporters
  const topChipStyle = isMobile ? {
    right: 16,
    bottom: 16,
    top: 'auto',
    left: 'auto',
    minWidth: 160,
    fontSize: 15,
    padding: '12px 20px',
    borderRadius: 16,
    boxShadow: '0 0 20px 0 #FFD60044'
  } : {
    right: 40,
    top: 220,
    minWidth: 220,
    fontSize: 18,
    padding: '10px 22px',
    borderRadius: 18
  };

  // Estado para chips verticales móviles
  const [openMobileChip, setOpenMobileChip] = useState<string|null>(null);

  // Draggable hooks para chips minimizados (solo desktop)
  const introMinDrag = useDraggable(
    { x: 60, y: 80 },
    { minX: 0, minY: 0, maxX: 300, maxY: 200 }, // más arriba
    []
  );
  const rewardsMinDrag = useDraggable(
    { x: 340, y: 80 },
    { minX: 320, minY: 0, maxX: 620, maxY: 200 }, // más arriba
    []
  );
  const topSupportersMinDrag = useDraggable(
    { x: window.innerWidth - 320, y: 80 },
    { minX: 0, minY: 0, maxX: window.innerWidth - 220, maxY: 200 }, // más arriba
    []
  );
  const musicNFTsMinDrag = useDraggable(
    { x: window.innerWidth - 320, y: 260 },
    { minX: 0, minY: 200, maxX: window.innerWidth - 220, maxY: 400 }, // debajo de los otros
    []
  );
  const merchMinDrag = useDraggable(
    { x: 80, y: 260 },
    { minX: 0, minY: 200, maxX: 400, maxY: 400 }, // debajo de los otros
    []
  );

  // 1. Crea un estado minMerch y animMerch para Merch, igual que los otros chips/cards.
  const [minMerch, setMinMerch] = useState(true);
  const [animMerch, setAnimMerch] = useState('card-anim-in');

  // --- Estado para chip de Telegram ---
  const [minTelegram, setMinTelegram] = useState(true);
  const [animTelegram, setAnimTelegram] = useState('card-anim-in');
  const telegramMinDrag = useDraggable(
    { x: 80, y: 420 },
    { minX: 0, minY: 400, maxX: 400, maxY: 600 }, // más abajo
    []
  );
  const telegramDrag = useDraggable(
    { x: 80, y: 600 },
    { minX: 0, minY: 0, maxX: 400, maxY: 800 },
    []
  );

  // 1. Estado para el chip Why Support The Lab
  const [minWhy, setMinWhy] = useState(true);
  const [animWhy, setAnimWhy] = useState('card-anim-in');
  const whyDrag = useDraggable(
    { x: 100, y: 80 },
    { minX: 0, minY: 0, maxX: 400, maxY: 400 },
    []
  );

  const playerRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (playerRef.current) {
      observer.observe(playerRef.current);
    }
    return () => {
      if (playerRef.current) observer.unobserve(playerRef.current);
    };
  }, []);

  return (
    <div className="lobby-area" ref={lobbyRef} style={{position:'relative',zIndex:1}}>
      <HeatmapBackground />
      <div className="lobby-header">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {/* Logo matraz minimalista blanco */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="none" />
                <path d="M16 8h16v4c0 1.1-.9 2-2 2h-1v15.1c0 .53.21 1.04.59 1.41l6.3 6.3A4.978 4.978 0 0 1 40 40v2a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2c0-1.32.53-2.59 1.47-3.53l6.3-6.3c.38-.37.59-.88.59-1.41V14h-1a2 2 0 0 1-2-2V8Zm2 0v4h12V8H18Zm2 6v15.1c0 1.32-.53 2.59-1.47 3.53l-6.3 6.3A2.978 2.978 0 0 0 8 40v2h32v-2c0-.8-.32-1.56-.88-2.12l-6.3-6.3A4.978 4.978 0 0 1 30 29.1V14H18Z" fill="#fff"/>
              </svg>
            </span>
            <h1 className="lobby-title" style={{ margin: 0 }}>THE LAB</h1>
          </div>
          <p className="lobby-subtitle">BY ALEX PAUL</p>
        </div>
      </div>
      <div className="lobby-content" ref={lobbyRef}>
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-neutral-400">Click on the stations to explore the album.</p>
        </div>

        {/* Fixed Crowdfunding Progress Section - Old Computer Style */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          {/* Monitor Frame */}
          <div className="bg-[#1a1a1a] border-4 border-[#333] rounded-lg p-6 relative overflow-hidden">
            {/* CRT Screen Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#33ff33]/5 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-[#33ff33]/[0.03] pointer-events-none" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(51, 255, 51, 0.1) 2px,
                rgba(51, 255, 51, 0.1) 4px
              )`
            }}></div>
            
            {/* Screen Content */}
            <div className="relative z-10 font-mono text-[#33ff33]">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-[#33ff33]/30 pb-2">
                <span className="text-lg tracking-wider">CROWDFUNDING TERMINAL v1.0</span>
                <span className="text-sm">{new Date().toLocaleTimeString()}</span>
              </div>

              {/* Progress Display */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">PROGRESS:</span>
                  <span className="text-sm">{progress.toFixed(1)}%</span>
                </div>
                
                {/* ASCII Progress Bar */}
                <div className="bg-black border border-[#33ff33] p-2 mb-2">
                  <div className="flex items-center">
                    <span className="mr-2">[</span>
                    <div className="flex-1 bg-[#111] h-4 relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#33ff33] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="ml-2">]</span>
                  </div>
                </div>
              </div>

              {/* Amounts Display */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-black border border-[#33ff33] p-3">
                  <div className="text-sm mb-1">TARGET AMOUNT</div>
                  <div className="text-xl font-bold">{targetAmount} USDC</div>
                </div>
                <div className="bg-black border border-[#33ff33] p-3">
                  <div className="text-sm mb-1">CURRENT AMOUNT</div>
                  <div className="text-xl font-bold">{currentAmount} USDC</div>
                </div>
              </div>

              {/* Status Display */}
              <div className="bg-black border border-[#33ff33] p-3 mb-6">
                <div className="text-sm mb-1">SYSTEM STATUS</div>
                <div className="text-lg">
                  {currentAmount >= targetAmount 
                    ? '> GOAL ACHIEVED! THANK YOU FOR YOUR SUPPORT!' 
                    : '> AWAITING FUNDS...'}
                </div>
              </div>

              {/* Support Button */}
              <div className="flex justify-center">
                <button
                  className="px-8 py-3 bg-[#ff3366] border-2 border-[#ff3366] text-white font-mono text-lg rounded shadow-lg hover:bg-[#ff3366] hover:text-white transition-all duration-200 tracking-widest retro-btn animate-pulse"
                  style={{
                    boxShadow: '0 0 16px #ff336655, 0 2px 8px #000',
                    textShadow: '0 0 6px #ff3366',
                    letterSpacing: 2
                  }}
                  onClick={() => window.open('https://seedclub.xyz/crowdfunding-link', '_blank')}
                >
                  SUPPORT
                </button>
              </div>
            </div>
          </div>

          {/* Monitor Stand */}
          <div className="w-32 h-8 bg-[#333] mx-auto rounded-b-lg"></div>
        </div>

        {/* ... el resto del JSX del lobby original ... */}
        {/* CHIPS/CARDS FLOTANTES Y MINIMIZABLES */}
        {/* INTRO CHIP MINIMIZADO Y CARD COMPLETA */}
        {!isMobile && !minIntro && (
          <div className={`draggable-card ${animIntro}`}
            ref={introDrag.ref}
            style={{
              left: introDrag.pos.x,
              top: introDrag.pos.y,
              position: 'absolute',
              zIndex: introDrag.dragging ? 20 : 10,
              background: 'linear-gradient(135deg, #232323 60%, #3b82f6 100%)',
              color: '#fff',
              minWidth: 340,
              maxWidth: 500,
              width: 400,
              minHeight: 400,
              maxHeight: 400,
              border: '2px solid #3b82f6',
              boxShadow: '0 8px 32px rgba(59,130,246,0.10), 0 2px 8px #0004',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="draggable-header" onMouseDown={introDrag.onMouseDown} onClick={() => { setMinIntro(true); setAnimIntro('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #3b82f6 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #3b82f6', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><User size={28} style={{marginRight: 10}}/> INTRO</span>
            </div>
            <div className="draggable-content" onDoubleClick={e => { e.stopPropagation(); setMinIntro(true); setAnimIntro('card-anim-in'); }} style={{ cursor: 'pointer', padding: 24, fontSize: '1.08rem', lineHeight: 1.7, overflowY: 'auto', flex: 1 }}>
              <p style={{color:'#60a5fa', fontWeight:600, fontSize:'1.13rem', marginBottom:18}}>Hi, my name is Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.</p>
              <p style={{marginBottom:14}}>I started creating and producing music 14 years ago, but 5 years ago, I decided to begin releasing it on DSPs. In March 2022, I made my debut in web3 by minting my music as a collectible, and from day one, I've been exploring this exciting playground.</p>
              <p style={{marginBottom:14}}>Right now, I'm working on an audiovisual album titled <span style={{color:'#3b82f6', fontWeight:700}}>&quot;The Lab&quot;</span>, and to bring this project to life, I'm seeking to raise <span style={{color:'#60a5fa', fontWeight:700}}>$8,000 USD</span> to cover the album's costs trough a crowfund on seedclub. Releasing a track can be costly; an entire album is even more so, but together we can make it happen faster.</p>
              <p style={{marginBottom:14}}>Every contribution counts, and I've lined up some rewards to show my appreciation.</p>
              <p style={{marginBottom:14}}><span style={{color:'#3b82f6', fontWeight:700}}>&quot;The Lab&quot;</span> is also a way to empower artists and collaborators to work together. By participating in this crowdfunding campaign, you'll have the opportunity to be part of the project as an executive producer or curator.</p>
              <p style={{marginBottom:0}}>Explore this site to learn more about the project!</p>
            </div>
          </div>
        )}
        {/* REWARDS CARD COMPLETA - REDISEÑADA */}
        {!isMobile && !minRewards && (
          <div className={`draggable-card ${animRewards}`}
            ref={rewardsDrag.ref}
            style={{
              left: rewardsDrag.pos.x,
              top: rewardsDrag.pos.y,
              position: 'absolute',
              zIndex: rewardsDrag.dragging ? 20 : 10,
              background: 'linear-gradient(135deg, #232323 60%, #fbbf24 100%)',
              color: '#fff',
              minWidth: 340,
              maxWidth: 500,
              width: 400,
              minHeight: 400,
              maxHeight: 400,
              border: '2px solid #fbbf24',
              boxShadow: '0 8px 32px rgba(251,191,36,0.10), 0 2px 8px #0004',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="draggable-header" onMouseDown={rewardsDrag.onMouseDown} onClick={() => { setMinRewards(true); setAnimRewards('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #fbbf24 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #fbbf24', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><Users size={28} style={{marginRight: 10}}/> REWARDS</span>
            </div>
            <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}} onDoubleClick={e => { e.stopPropagation(); setMinRewards(true); setAnimRewards('card-anim-in'); }}>
              <p style={{fontSize: '1.08rem', color: '#ffe082', fontWeight: 500, marginBottom: 18}}>By jumping on board with this crowdfunding campaign, you're not just funding a music project—you're joining a movement! Here's what you can get:</p>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#fff200', fontWeight: 700, fontSize: 1.18+'rem', display:'flex',alignItems:'center'}}><Trophy size={22} style={{marginRight:6}}/>Top Supporter</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Executive Producer Credits:</b> Your name will shine in the album credits—how cool is that?</li>
                  <li><b>Exclusive Merch:</b> Be the first to rock our limited-edition merch, designed just for you!</li>
                  <li><b>Full Album Airdrop:</b> Get the complete album sent to you before anyone else.</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Award size={20} style={{marginRight:6}}/>Top 3 Supporters</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Curator Credits:</b> You'll be recognized in the album credits for your support.</li>
                  <li><b>Exclusive Merch:</b> Snag some of our first-line merch.</li>
                  <li><b>Full Album Airdrop:</b> Get the album delivered right to your wallet!</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>Top 10 Supporters</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Character from The Lab:</b> Become part of the story with your very own character!</li>
                </ul>
              </div>
              <div>
                <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>All Contributors</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>The Lab Gang Badge:</b> A special badge to celebrate your support—wear it with pride!</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* FUND ALLOCATION CARD COMPLETA - REDISEÑADA */}
        {!isMobile && !minFund && (
          <div className={`draggable-card ${animFund}`}
            ref={fundDrag.ref}
            style={{
              left: fundDrag.pos.x,
              top: fundDrag.pos.y,
              position: 'absolute',
              zIndex: fundDrag.dragging ? 20 : 10,
              background: 'linear-gradient(135deg, #232323 60%, #22c55e 100%)',
              color: '#fff',
              minWidth: 340,
              maxWidth: 500,
              width: 400,
              minHeight: 400,
              maxHeight: 400,
              border: '2px solid #22c55e',
              boxShadow: '0 8px 32px rgba(34,197,94,0.10), 0 2px 8px #0004',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="draggable-header" onMouseDown={fundDrag.onMouseDown} onClick={() => { setMinFund(true); setAnimFund('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #22c55e 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #22c55e', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><DollarSign size={28} style={{marginRight: 10}}/> FUNDS ALLOCATION</span>
            </div>
            <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}} onDoubleClick={e => { e.stopPropagation(); setMinFund(true); setAnimFund('card-anim-in'); }}>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Disc3 size={20} style={{marginRight:6}}/>Production Costs</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Studio Rent:</b> Renting a studio for recording.</li>
                  <li><b>Session Musician Fees:</b> Fees for additional musicians if required.</li>
                  <li><b>Equipment Rental/Purchase:</b> Renting or purchasing specialized equipment.</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Video size={20} style={{marginRight:6}}/>Music Videos</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Director and Production Team:</b> Budget for hiring a director and crew.</li>
                  <li><b>Location Fees:</b> Expenses for securing shooting locations.</li>
                  <li><b>Set Design and Props:</b> Funds for set design and props.</li>
                  <li><b>Costume and Makeup:</b> Budget for costumes and makeup artists.</li>
                  <li><b>Post-Production:</b> Expenses for editing and visual effects.</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Distribution and Manufacturing</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Physical Distribution:</b> Budget for manufacturing and distribution costs.</li>
                  <li><b>Licensing and Copyright:</b> Expenses for licenses and copyright registrations.</li>
                  <li><b>Promotion and Distribution:</b> Allocating funds for marketing.</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Trophy size={20} style={{marginRight:6}}/>Release Party</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Event Costs:</b> Budget for venue rental, catering, and other expenses.</li>
                </ul>
              </div>
              <div style={{marginBottom: 18}}>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Settings size={20} style={{marginRight:6}}/>Technologies</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>Hire a developer:</b> to create the mint site for the album.</li>
                </ul>
              </div>
              <div>
                <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Merchandise Design</h3>
                <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                  <li><b>First Line of Clothing Design:</b> Funds allocated for designing the first line of limited-edition merchandise.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* TOP SUPPORTERS CARD COMPLETA - REDISEÑADA */}
        {!isMobile && !minTopSupporters && (
          <div className={`draggable-card ${animTopSupporters}`}
            ref={topSupportersDrag.ref}
            style={{
              left: topSupportersDrag.pos.x,
              top: topSupportersDrag.pos.y,
              position: 'absolute',
              zIndex: topSupportersDrag.dragging ? 20 : 10,
              background: '#181a20',
              border: '2px solid #FFD600',
              color: '#fff',
              fontWeight: 700,
              minWidth: 260,
              maxWidth: 340,
              minHeight: 120,
              boxShadow: '0 0 24px 0 #FFD60033',
              fontSize: (isMobile ? 13 : 16),
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              overflow: 'hidden',
              padding: 0
            }}
          >
            <div className="draggable-header" onMouseDown={topSupportersDrag.onMouseDown} onClick={() => { setMinTopSupporters(true); setAnimTopSupporters('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #FFD600 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #FFD600', display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',cursor:'pointer',height:56}}>
              <span style={{display:'flex',alignItems:'center',gap:10}}><Trophy size={22} color="#FFD600"/> Top Supporters</span>
            </div>
            <div className="draggable-content" style={{padding: 18, width:'100%', display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1}}>
              <div style={{color:'#FFD600',fontWeight:700,fontSize:17,marginBottom:6,animation:'pulseTS 1.6s infinite alternate'}}>Coming Soon</div>
              <div style={{color:'#fff',opacity:0.7,fontSize:14,textAlign:'center'}}>The top supporters of The Lab will be featured here.</div>
            </div>
            <style>{`
              @keyframes pulseTS {
                0% { opacity: 1; text-shadow: 0 0 8px #FFD60044; }
                100% { opacity: 0.7; text-shadow: 0 0 24px #FFD600; }
              }
            `}</style>
          </div>
        )}
        {/* MERCH CHIP MINIMIZADO Y CARD COMPLETA */}
        {!isMobile && minMerch && (
          <div className={`minimized-chip ${animMerch} floating`}
            ref={merchMinDrag.ref}
            onMouseDown={merchMinDrag.onMouseDown}
            onClick={() => { setMinMerch(false); setAnimMerch('card-anim-in'); }}
            style={{ 
              left: merchMinDrag.pos.x, 
              top: merchMinDrag.pos.y, 
              position: 'absolute', 
              zIndex: 30,
              background: 'linear-gradient(145deg, #f472b6, #ec4899)',
              borderColor: '#f9a8d4',
              color: '#fff',
              cursor: 'move'
            }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={18}/> Merch</span>
          </div>
        )}
        {!isMobile && !minMerch && (
          <div className={`draggable-card`}
            ref={merchMinDrag.ref}
            style={{
              left: merchMinDrag.pos.x,
              top: merchMinDrag.pos.y,
              position: 'absolute',
              zIndex: merchMinDrag.dragging ? 20 : 10,
              background: '#181a20',
              color: '#fff',
              minWidth: 320,
              maxWidth: 480
            }}
          >
            <div className="draggable-header" onMouseDown={merchMinDrag.onMouseDown}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Package size={20}/> Merch</span>
              <button className="min-btn" onClick={() => { setMinMerch(true); setAnimMerch('card-anim-in'); }}><svg width="18" height="18" viewBox="0 0 24 24"><rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor"/></svg></button>
            </div>
            <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18}}>
              <p>First line of merch for top supporters. Stay tuned!</p>
            </div>
          </div>
        )}
        {/* MUSIC NFTS CHIP MINIMIZADO Y CARD COMPLETA */}
        {!isMobile && minMusicNFTs && (
          <div className={`minimized-chip ${animMusicNFTs} floating`}
            ref={musicNFTsMinDrag.ref}
            onMouseDown={musicNFTsMinDrag.onMouseDown}
            onClick={() => { setMinMusicNFTs(false); setAnimMusicNFTs('card-anim-in'); }}
            style={{
              left: musicNFTsMinDrag.pos.x,
              top: musicNFTsMinDrag.pos.y,
              position: 'absolute',
              zIndex: 30,
              background: 'linear-gradient(145deg, #a21caf, #7e22ce)',
              borderColor: '#c084fc',
              color: '#fff',
              cursor: 'move'
            }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Disc3 size={18}/> Music NFTs</span>
          </div>
        )}
        {!isMobile && !minMusicNFTs && (
          <div className={`draggable-card ${animMusicNFTs}`}
            ref={musicNFTsMinDrag.ref}
            style={{
              left: musicNFTsMinDrag.pos.x,
              top: musicNFTsMinDrag.pos.y,
              position: 'absolute',
              zIndex: musicNFTsMinDrag.dragging ? 20 : 10,
              background: '#181a20',
              color: '#fff',
              minWidth: 320,
              maxWidth: 480
            }}
          >
            <div className="draggable-header" onMouseDown={musicNFTsMinDrag.onMouseDown} onClick={() => { setMinMusicNFTs(true); setAnimMusicNFTs('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #a21caf 60%, #232323 100%)', color: '#fff', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #a21caf', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><Disc3 size={20}/> Music NFTs</span>
            </div>
            <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18}}>
              <div style={{ display: 'flex', overflowX: 'auto', gap: 18, paddingBottom: 8 }}>
                {collectibles.map((item: any, idx: any) => (
                  <div key={idx} style={{ minWidth: 140, maxWidth: 140, background: '#232323', borderRadius: 14, boxShadow: '0 2px 8px #0006', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }} className="nft-card">
                    <img src={item.cover} alt={item.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                    <div className="nft-hover-info" style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(24,26,32,0.93)',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.18s',
                      pointerEvents: 'none',
                      padding: 12
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#a3e635', marginBottom: 10 }}>Alex Paul</div>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '7px 18px', background: '#a3e635', color: '#232323', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', marginTop: 4 }}>Collect</a>
                    </div>
                  </div>
                ))}
              </div>
              <style>{`
                .nft-card:hover .nft-hover-info {
                  opacity: 1 !important;
                  pointer-events: auto !important;
                }
              `}</style>
            </div>
          </div>
        )}
        {/* CHIPS VERTICALES SOLO EN MÓVIL */}
        {isMobile && (
          <div className="mobile-vertical-chips">
            {[{key:'intro',label:'Intro',icon:<User size={18}/>,content:(
              <div style={{color:'#111',fontSize:15,lineHeight:1.7}}>
                <p style={{color:'#60a5fa', fontWeight:600, fontSize:'1.13rem', marginBottom:18}}>🎤 INTRO:</p>
                <p style={{marginBottom:14}}>Hi, my name is Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.</p>
                <p style={{marginBottom:14}}>Right now, I'm pouring my heart and mind into an audiovisual album titled "The Lab." This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators who can help me realize this vision.</p>
                <p style={{marginBottom:14}}>I plan to release my next album independently, without the backing of a major record label. To bring this vision to life, I'm aiming to raise $10K USD to cover the album's production costs. While a single release can be a significant investment, creating a full album demands even more resources. Your support will help us achieve this goal more effectively, allowing me to break free from industry conventions, sustain my indie career, and share my music with the world.</p>
                <p style={{marginBottom:14}}>This album will showcase a multicultural soundscape, introducing my first English songs and experimenting with experimental genres, pop, hip hop/R&B, synthpop, Latin rhythms, and house. By blending crypto-native platforms with traditional music services, I aim to ensure my music reaches a global audience while also onboarding new users to the blockchain.</p>
                <p style={{marginBottom:14}}>Every contribution counts, and I've lined up some amazing rewards to show my appreciation. Join me on this journey, and let's create something unforgettable together!</p>
              </div>
            )},
            {key:'rewards',label:'Rewards',icon:<Users size={18}/>,content:(
              <div style={{fontSize: '1.08rem', color: '#ffe082', fontWeight: 500, marginBottom: 18}}>
                <p>By jumping on board with this crowdfunding campaign, you're taking part in this music project and getting rewards. Here's what you can get:</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fff200', fontWeight: 700, fontSize: 1.18+'rem', display:'flex',alignItems:'center'}}><Trophy size={22} style={{marginRight:6}}/>Top Supporter</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Executive Producer Credits:</b> Your name will shine in the album credits—how cool is that?</li>
                    <li><b>Exclusive Merch:</b> Be the first to rock my first line of limited-edition merch.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Award size={20} style={{marginRight:6}}/>Top 5 Supporters</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Curator Credits:</b> You'll be recognized in one track of the album credits for your support.</li>
                    <li><b>Exclusive Merch:</b> Get some of our first-line merch.</li>
                    <li><b>Full Album CD:</b> Receive a physical copy of the album on CD.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>Top 10 Supporters</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>The Lab Crew Character:</b> Become part of the story with your very own character!</li>
                    <li><b>Full Album Airdrop:</b> Have the album delivered right to your wallet.</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>All Contributors</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>The Lab Gang Badge:</b> A special badge airdrop to celebrate your support.</li>
                    <li><b>Release Party Invitation:</b> If we reach our goal, you'll be invited to an exclusive release party!</li>
                  </ul>
                </div>
              </div>
            )},
            {key:'fund',label:'Fund Allocation',icon:<DollarSign size={18}/>,content:(
              <div style={{color:'#111',fontSize:15,lineHeight:1.7}}>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Disc3 size={20} style={{marginRight:6}}/>Production Costs</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Studio Rent:</b> Renting a studio for recording.</li>
                    <li><b>Session Musician Fees:</b> Fees for additional musicians if required.</li>
                    <li><b>Equipment Rental/Purchase:</b> Renting or buying specialized equipment.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Video size={20} style={{marginRight:6}}/>Music Videos</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Director and Production Team:</b> Budget for hiring a director and crew.</li>
                    <li><b>Location Fees:</b> Expenses for securing shooting locations.</li>
                    <li><b>Set Design and Props:</b> Funds for set design and props.</li>
                    <li><b>Costume and Makeup:</b> Budget for costumes and makeup artists.</li>
                    <li><b>Post-Production:</b> Expenses for editing and visual effects.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Distribution and Manufacturing</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Physical Distribution:</b> Budget for manufacturing and distribution costs.</li>
                    <li><b>Licensing and Copyright:</b> Expenses for licenses and copyright registrations.</li>
                    <li><b>Promotion and Distribution:</b> Allocating funds for marketing.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Trophy size={20} style={{marginRight:6}}/>Release Party</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Event Costs:</b> Budget for venue rental, catering, and other expenses.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Settings size={20} style={{marginRight:6}}/>Technologies</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>Hire a developer:</b> to create the mint site for the album.</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: 1.13+'rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Merchandise Design</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#111'}}>
                    <li><b>First Line of Clothing Design:</b> Funds allocated for designing the first line of limited-edition merchandise.</li>
                  </ul>
                </div>
              </div>
            )},
            {key:'top',label:'Top Supporters',icon:<Trophy size={18}/>,content:(
              <div style={{color:'#FFD600',fontWeight:600,fontSize:15,lineHeight:1.7}}>
                <p>Coming Soon</p>
              </div>
            )},
            {key:'merch',label:'Merch',icon:<Package size={18}/>,content:(
              <div style={{color:'#111',fontSize:15,lineHeight:1.7}}>
                <p>First line of merch for top supporters. Stay tuned!</p>
              </div>
            )},
            {key:'nfts',label:'Music NFTs',icon:<Disc3 size={18}/>,content:(
              <div style={{ display: 'flex', overflowX: 'auto', gap: 18, paddingBottom: 8 }}>
                {collectibles.map((item: any, idx: any) => (
                  <div key={idx} style={{ minWidth: 140, maxWidth: 140, background: '#232323', borderRadius: 14, boxShadow: '0 2px 8px #0006', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }} className="nft-card">
                    <img src={item.cover} alt={item.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                    <div className="nft-hover-info" style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(24,26,32,0.93)',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.18s',
                      pointerEvents: 'none',
                      padding: 12
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#a3e635', marginBottom: 10 }}>Alex Paul</div>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '7px 18px', background: '#a3e635', color: '#232323', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', marginTop: 4 }}>Collect</a>
                    </div>
                  </div>
                ))}
              </div>
            )},
            {key:'telegram',label:'Telegram',icon:<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" alt="Telegram" style={{width:18,height:18,display:'inline'}} />,content:(
              <div style={{color:'#111',fontSize:15,lineHeight:1.7,display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'10px 24px',background:'#229ED9',color:'#fff',fontWeight:700,fontSize:18,borderRadius:8,textDecoration:'none',boxShadow:'0 2px 8px #229ED944',transition:'background 0.18s'}}> 
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" alt="Telegram" style={{width:22,height:22}} /> Join on Telegram
                </a>
              </div>
            )},
            ].map(chip => (
              <div key={chip.key} className="mobile-chip-block">
                <button
                  className={`mobile-chip-btn ${openMobileChip===chip.key ? 'active' : ''}`}
                  onClick={() => setOpenMobileChip(openMobileChip===chip.key ? null : chip.key)}
                >
                  {chip.icon} {chip.label}
                </button>
                {openMobileChip===chip.key && (
                  <div className="mobile-chip-content" style={{maxHeight: 320, overflowY: 'auto'}}>
                    {chip.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* INTRO CHIP MINIMIZADO */}
        {!isMobile && minIntro && (
          <div className={`minimized-chip ${animIntro}`}
            ref={introMinDrag.ref}
            onClick={() => { setMinIntro(false); setAnimIntro('card-anim-in'); }}
            style={{
              left: introMinDrag.pos.x,
              top: introMinDrag.pos.y - 30,
              position: 'absolute',
              zIndex: 30,
              background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
              borderColor: '#60a5fa',
              color: '#fff'
            }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={18}/> Intro</span>
          </div>
        )}
        {/* REWARDS CHIP MINIMIZADO */}
        {!isMobile && minRewards && (
          <div className={`minimized-chip ${animRewards}`}
            ref={rewardsMinDrag.ref}
            onClick={() => { setMinRewards(false); setAnimRewards('card-anim-in'); }}
            style={{
              left: rewardsMinDrag.pos.x,
              top: rewardsMinDrag.pos.y,
              position: 'absolute',
              zIndex: 30,
              background: 'linear-gradient(145deg, #fbbf24, #d97706)',
              borderColor: '#fcd34d',
              color: '#fff',
              minWidth: 90,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: 15
            }}>
            <Award size={18}/>
            <span>Rewards</span>
          </div>
        )}
        {/* FUND ALLOCATION CHIP MINIMIZADO */}
        {!isMobile && minFund && (
          <div className={`minimized-chip ${animFund}`}
            ref={fundDrag.ref}
            onClick={() => { setMinFund(false); setAnimFund('card-anim-in'); }}
            style={{
              left: fundDrag.pos.x,
              top: fundDrag.pos.y,
              position: 'absolute',
              zIndex: 30,
              background: 'linear-gradient(145deg, #22c55e, #16a34a)',
              borderColor: '#4ade80',
              color: '#fff',
              minWidth: 90,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: 15
            }}>
            <DollarSign size={18}/>
            <span>Fund Allocation</span>
          </div>
        )}
        {/* TOP SUPPORTERS CHIP MINIMIZADO */}
        {!isMobile && minTopSupporters && (
          <div className={`minimized-chip ${animTopSupporters}`}
            ref={topSupportersMinDrag.ref}
            onClick={() => { setMinTopSupporters(false); setAnimTopSupporters('card-anim-in'); }}
            style={{
              left: topSupportersMinDrag.pos.x,
              top: topSupportersMinDrag.pos.y,
              position: 'absolute',
              zIndex: 30,
              background: '#181a20',
              border: '2px solid #FFD600',
              color: '#FFD600',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 0 8px #FFD60044',
              fontSize: (isMobile ? 13 : 16)
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Trophy size={isMobile ? 13 : 16} color="#FFD600"/> Top Supporters</span>
          </div>
        )}
        {/* TELEGRAM CHIP MINIMIZADO */}
        {!isMobile && minTelegram && (
          <div className={`minimized-chip ${animTelegram} floating`}
            ref={telegramMinDrag.ref}
            onMouseDown={telegramMinDrag.onMouseDown}
            onClick={() => { setMinTelegram(false); setAnimTelegram('card-anim-in'); }}
            style={{
              left: telegramMinDrag.pos.x,
              top: telegramMinDrag.pos.y,
              position: 'absolute',
              zIndex: 30,
              background: 'linear-gradient(145deg, #229ED9, #0ea5e9)',
              borderColor: '#7dd3fc',
              color: '#fff',
              cursor: 'move'
            }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={18}/> Telegram</span>
          </div>
        )}
        {/* TELEGRAM CARD COMPLETA */}
        {!isMobile && !minTelegram && (
          <div className={`draggable-card ${animTelegram}`}
            ref={telegramDrag.ref}
            style={{
              left: telegramDrag.pos.x,
              top: telegramDrag.pos.y,
              position: 'absolute',
              zIndex: telegramDrag.dragging ? 20 : 10,
              background: 'linear-gradient(135deg, #229ED9 60%, #1c7bb6 100%)',
              color: '#fff',
              minWidth: 220,
              maxWidth: 340,
              border: '2px solid #229ED9',
              boxShadow: '0 8px 32px rgba(34,158,217,0.10), 0 2px 8px #0004',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 24
            }}
          >
            <div className="draggable-header" onMouseDown={telegramDrag.onMouseDown} onClick={() => { setMinTelegram(true); setAnimTelegram('card-anim-in'); }} style={{background: 'linear-gradient(90deg, #229ED9 60%, #1c7bb6 100%)', color: '#fff', fontWeight: 700, fontSize: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #229ED9', display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" alt="Telegram" style={{width:26,height:26,marginRight:8}} /> Telegram
            </div>
            <div className="draggable-content" style={{padding: 0, marginTop: 18, textAlign:'center'}}>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'10px 24px',background:'#fff',color:'#229ED9',fontWeight:700,fontSize:18,borderRadius:8,textDecoration:'none',boxShadow:'0 2px 8px #229ED944',transition:'background 0.18s'}}> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png" alt="Telegram" style={{width:22,height:22}} /> Join on Telegram
              </a>
            </div>
          </div>
        )}
        {/* CHIP MINIMIZADO Why Support The Lab */}
        {!isMobile && minWhy && (
          <div className={`minimized-chip ${animWhy} floating`}
            ref={whyDrag.ref}
            onMouseDown={whyDrag.onMouseDown}
            onClick={() => { setMinWhy(false); setAnimWhy('card-anim-in'); }}
            style={{
              left: whyDrag.pos.x,
              top: whyDrag.pos.y,
              position: 'absolute',
              zIndex: 8000,
              background: '#1a1a1a',
              border: '2px solid #ff3366',
              color: '#ff3366',
              minWidth: 120,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 0 20px rgba(255, 51, 102, 0.2)',
              borderRadius: 0,
              letterSpacing: 0.5,
              cursor: 'move',
              fontFamily: 'monospace'
            }}>
            <span style={{display:'flex',alignItems:'center',gap:8}}>
              <HelpCircle size={18} style={{color: '#ff3366'}}/> WHY SUPPORT
            </span>
          </div>
        )}
        {/* CARD COMPLETA Why Support The Lab */}
        {!isMobile && !minWhy && (
          <div className={`draggable-card ${animWhy}`}
            ref={whyDrag.ref}
            style={{
              left: whyDrag.pos.x,
              top: whyDrag.pos.y,
              position: 'absolute',
              zIndex: whyDrag.dragging ? 20 : 10,
              background: '#1a1a1a',
              color: '#ff3366',
              minWidth: 340,
              maxWidth: 500,
              width: 400,
              minHeight: 300,
              maxHeight: 300,
              border: '2px solid #ff3366',
              fontFamily: 'monospace',
              boxShadow: '0 0 20px rgba(255, 51, 102, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="draggable-header" onMouseDown={whyDrag.onMouseDown} onClick={() => { setMinWhy(true); setAnimWhy('card-anim-in'); }} style={{background: '#232323', color: '#fbbf24', fontWeight: 800, fontSize: 24, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottom: '2px solid #fbbf24', display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',cursor:'pointer',height:60, letterSpacing:1.2}}>
              <span style={{display:'flex',alignItems:'center',gap:10}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
                Why Support The Lab?
              </span>
            </div>
            <div className="draggable-content" style={{padding: '28px 28px 22px 28px', cursor: 'pointer', overflowY: 'auto', flex: 1}}>
              <ul style={{margin:0,paddingLeft:22,fontSize:18,lineHeight:2.1,letterSpacing:0.1, color:'#fff', fontWeight:500}}>
                <li style={{marginBottom:18}}><span style={{color:'#fbbf24',fontWeight:700}}>Empowerment of Independent Artists:</span> Your contribution helps support independent creators like me, allowing us to thrive outside traditional music industry constraints.</li>
                <li style={{marginBottom:18}}><span style={{color:'#fbbf24',fontWeight:700}}>Join a Creative Community:</span> When you contribute, you're not just donating—you're becoming part of a community that values collaboration and creativity.</li>
                <li style={{marginBottom:18}}><span style={{color:'#fbbf24',fontWeight:700}}>Exclusive Access:</span> As a supporter, you'll gain exclusive insights into the creative process, behind-the-scenes content, and the opportunity to engage with the project on a personal level.</li>
                <li style={{marginBottom:18}}><span style={{color:'#fbbf24',fontWeight:700}}>Cool Rewards:</span> I've lined up some awesome rewards to show my appreciation, connecting you directly to the music and the journey.</li>
                <li><span style={{color:'#fbbf24',fontWeight:700}}>Make a F*cking Party!</span> If we reach our goal, you'll be invited to an exclusive release party!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .minimized-chip {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TheLab; 