"use client";
import React, { useRef, useEffect, useState } from 'react';
import HeatmapBackground from "./HeatmapBackground";
import { User, Users, Trophy, Award, DollarSign, Disc3, Video, Package, MessageCircle, HelpCircle, Settings } from 'lucide-react';
import { collectibles } from '../app/page';

export default function TheLabContent() {
  const lobbyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Estados para drag y minimizado de chips/cards
  const [minIntro, setMinIntro] = useState(false);
  const [minRewards, setMinRewards] = useState(false);
  const [minFund, setMinFund] = useState(false);
  const [minTopSupporters, setMinTopSupporters] = useState(false);
  const [minMerch, setMinMerch] = useState(false);
  const [minMusicNFTs, setMinMusicNFTs] = useState(false);
  const [minTelegram, setMinTelegram] = useState(false);
  const [minWhy, setMinWhy] = useState(false);
  // Estados para animaciones
  const [animIntro, setAnimIntro] = useState('');
  const [animRewards, setAnimRewards] = useState('');
  const [animFund, setAnimFund] = useState('');
  const [animTopSupporters, setAnimTopSupporters] = useState('');
  const [animMerch, setAnimMerch] = useState('');
  const [animMusicNFTs, setAnimMusicNFTs] = useState('');
  const [animTelegram, setAnimTelegram] = useState('');
  const [animWhy, setAnimWhy] = useState('');
  // Refs para drag de cada card/chip
  const introDrag = useRef<any>({ ref: useRef(null), pos: { x: 100, y: 80 }, dragging: false, onMouseDown: () => {} });
  const rewardsDrag = useRef<any>({ ref: useRef(null), pos: { x: 220, y: 120 }, dragging: false, onMouseDown: () => {} });
  const fundDrag = useRef<any>({ ref: useRef(null), pos: { x: 340, y: 160 }, dragging: false, onMouseDown: () => {} });
  const topSupportersDrag = useRef<any>({ ref: useRef(null), pos: { x: 460, y: 200 }, dragging: false, onMouseDown: () => {} });
  const merchMinDrag = useRef<any>({ ref: useRef(null), pos: { x: 580, y: 240 }, dragging: false, onMouseDown: () => {} });
  const musicNFTsMinDrag = useRef<any>({ ref: useRef(null), pos: { x: 700, y: 280 }, dragging: false, onMouseDown: () => {} });
  const telegramDrag = useRef<any>({ ref: useRef(null), pos: { x: 820, y: 320 }, dragging: false, onMouseDown: () => {} });
  const whyDrag = useRef<any>({ ref: useRef(null), pos: { x: 940, y: 360 }, dragging: false, onMouseDown: () => {} });
  // Handlers para minimizar/maximizar
  const handleMinimize = (setMin: React.Dispatch<React.SetStateAction<boolean>>, setAnim: React.Dispatch<React.SetStateAction<string>>) => {
    setMin(true);
    setAnim('animate-fadeOut');
    setTimeout(() => setAnim(''), 300);
  };

  const handleMaximize = (setMin: React.Dispatch<React.SetStateAction<boolean>>, setAnim: React.Dispatch<React.SetStateAction<string>>) => {
    setAnim('animate-fadeIn');
    setMin(false);
    setTimeout(() => setAnim(''), 300);
  };

  // Estados para visibilidad
  const [showIntro, setShowIntro] = useState(true);
  const [showRewards, setShowRewards] = useState(true);
  const [showFund, setShowFund] = useState(true);
  const [showTopSupporters, setShowTopSupporters] = useState(true);
  const [showMerch, setShowMerch] = useState(true);
  const [showMusicNFTs, setShowMusicNFTs] = useState(true);
  const [showTelegram, setShowTelegram] = useState(true);
  const [showWhy, setShowWhy] = useState(true);

  // Posiciones originales
  const originalPositions = {
    intro: { x: 100, y: 80 },
    rewards: { x: 220, y: 120 },
    fund: { x: 340, y: 160 },
    topSupporters: { x: 460, y: 200 },
    merch: { x: 580, y: 240 },
    musicNFTs: { x: 700, y: 280 },
    telegram: { x: 820, y: 320 },
    why: { x: 940, y: 360 }
  };

  // Función para restaurar todas las cards a su posición original
  const resetAllCards = () => {
    introDrag.current.pos = { ...originalPositions.intro };
    rewardsDrag.current.pos = { ...originalPositions.rewards };
    fundDrag.current.pos = { ...originalPositions.fund };
    topSupportersDrag.current.pos = { ...originalPositions.topSupporters };
    merchMinDrag.current.pos = { ...originalPositions.merch };
    musicNFTsMinDrag.current.pos = { ...originalPositions.musicNFTs };
    telegramDrag.current.pos = { ...originalPositions.telegram };
    whyDrag.current.pos = { ...originalPositions.why };

    // Restaurar visibilidad
    setShowIntro(true);
    setShowRewards(true);
    setShowFund(true);
    setShowTopSupporters(true);
    setShowMerch(true);
    setShowMusicNFTs(true);
    setShowTelegram(true);
    setShowWhy(true);

    // Restaurar estado minimizado
    setMinIntro(false);
    setMinRewards(false);
    setMinFund(false);
    setMinTopSupporters(false);
    setMinMerch(false);
    setMinMusicNFTs(false);
    setMinTelegram(false);
    setMinWhy(false);

    // Actualizar posiciones visualmente
    if (introDrag.current.ref.current) {
      introDrag.current.ref.current.style.transform = `translate(${originalPositions.intro.x}px, ${originalPositions.intro.y}px)`;
    }
    if (rewardsDrag.current.ref.current) {
      rewardsDrag.current.ref.current.style.transform = `translate(${originalPositions.rewards.x}px, ${originalPositions.rewards.y}px)`;
    }
    if (fundDrag.current.ref.current) {
      fundDrag.current.ref.current.style.transform = `translate(${originalPositions.fund.x}px, ${originalPositions.fund.y}px)`;
    }
    if (topSupportersDrag.current.ref.current) {
      topSupportersDrag.current.ref.current.style.transform = `translate(${originalPositions.topSupporters.x}px, ${originalPositions.topSupporters.y}px)`;
    }
    if (merchMinDrag.current.ref.current) {
      merchMinDrag.current.ref.current.style.transform = `translate(${originalPositions.merch.x}px, ${originalPositions.merch.y}px)`;
    }
    if (musicNFTsMinDrag.current.ref.current) {
      musicNFTsMinDrag.current.ref.current.style.transform = `translate(${originalPositions.musicNFTs.x}px, ${originalPositions.musicNFTs.y}px)`;
    }
    if (telegramDrag.current.ref.current) {
      telegramDrag.current.ref.current.style.transform = `translate(${originalPositions.telegram.x}px, ${originalPositions.telegram.y}px)`;
    }
    if (whyDrag.current.ref.current) {
      whyDrag.current.ref.current.style.transform = `translate(${originalPositions.why.x}px, ${originalPositions.why.y}px)`;
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Función para manejar el inicio del drag
    const handleMouseDown = (e: MouseEvent, dragRef: any) => {
      if (!dragRef.current) return;
      dragRef.current.dragging = true;
      const startX = e.clientX - dragRef.current.pos.x;
      const startY = e.clientY - dragRef.current.pos.y;

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current.dragging) return;
        dragRef.current.pos.x = e.clientX - startX;
        dragRef.current.pos.y = e.clientY - startY;
        if (dragRef.current.ref.current) {
          dragRef.current.ref.current.style.transform = `translate(${dragRef.current.pos.x}px, ${dragRef.current.pos.y}px)`;
        }
      };

      const handleMouseUp = () => {
        dragRef.current.dragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Configurar los event listeners para cada card
    const setupDragListeners = () => {
      // Intro card
      if (introDrag.current.ref.current) {
        introDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, introDrag);
        introDrag.current.ref.current.addEventListener('mousedown', introDrag.current.onMouseDown);
      }

      // Rewards card
      if (rewardsDrag.current.ref.current) {
        rewardsDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, rewardsDrag);
        rewardsDrag.current.ref.current.addEventListener('mousedown', rewardsDrag.current.onMouseDown);
      }

      // Fund card
      if (fundDrag.current.ref.current) {
        fundDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, fundDrag);
        fundDrag.current.ref.current.addEventListener('mousedown', fundDrag.current.onMouseDown);
      }

      // Top Supporters card
      if (topSupportersDrag.current.ref.current) {
        topSupportersDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, topSupportersDrag);
        topSupportersDrag.current.ref.current.addEventListener('mousedown', topSupportersDrag.current.onMouseDown);
      }

      // Merch card
      if (merchMinDrag.current.ref.current) {
        merchMinDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, merchMinDrag);
        merchMinDrag.current.ref.current.addEventListener('mousedown', merchMinDrag.current.onMouseDown);
      }

      // Music NFTs card
      if (musicNFTsMinDrag.current.ref.current) {
        musicNFTsMinDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, musicNFTsMinDrag);
        musicNFTsMinDrag.current.ref.current.addEventListener('mousedown', musicNFTsMinDrag.current.onMouseDown);
      }

      // Telegram card
      if (telegramDrag.current.ref.current) {
        telegramDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, telegramDrag);
        telegramDrag.current.ref.current.addEventListener('mousedown', telegramDrag.current.onMouseDown);
      }

      // Why card
      if (whyDrag.current.ref.current) {
        whyDrag.current.onMouseDown = (e: MouseEvent) => handleMouseDown(e, whyDrag);
        whyDrag.current.ref.current.addEventListener('mousedown', whyDrag.current.onMouseDown);
      }
    };

    // Limpiar los event listeners
    const cleanupDragListeners = () => {
      if (introDrag.current.ref.current) {
        introDrag.current.ref.current.removeEventListener('mousedown', introDrag.current.onMouseDown);
      }
      if (rewardsDrag.current.ref.current) {
        rewardsDrag.current.ref.current.removeEventListener('mousedown', rewardsDrag.current.onMouseDown);
      }
      if (fundDrag.current.ref.current) {
        fundDrag.current.ref.current.removeEventListener('mousedown', fundDrag.current.onMouseDown);
      }
      if (topSupportersDrag.current.ref.current) {
        topSupportersDrag.current.ref.current.removeEventListener('mousedown', topSupportersDrag.current.onMouseDown);
      }
      if (merchMinDrag.current.ref.current) {
        merchMinDrag.current.ref.current.removeEventListener('mousedown', merchMinDrag.current.onMouseDown);
      }
      if (musicNFTsMinDrag.current.ref.current) {
        musicNFTsMinDrag.current.ref.current.removeEventListener('mousedown', musicNFTsMinDrag.current.onMouseDown);
      }
      if (telegramDrag.current.ref.current) {
        telegramDrag.current.ref.current.removeEventListener('mousedown', telegramDrag.current.onMouseDown);
      }
      if (whyDrag.current.ref.current) {
        whyDrag.current.ref.current.removeEventListener('mousedown', whyDrag.current.onMouseDown);
      }
    };

    // Configurar los listeners iniciales
    setupDragListeners();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupDragListeners();
    };
  }, []);

  // ...aquí irán los siguientes bloques de lógica y JSX...
  return (
    <div className="lobby-area" ref={lobbyRef} style={{position:'relative',zIndex:1}}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s ease forwards;
        }
        .draggable-card {
          transition: all 0.3s ease;
        }
        .draggable-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        }
        .draggable-header button {
          opacity: 0.7;
          transition: all 0.2s ease;
        }
        .draggable-header button:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        .reset-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: 2px solid #3b82f6;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: monospace;
          font-size: 14px;
          transition: all 0.3s ease;
          z-index: 1000;
        }
        .reset-button:hover {
          background: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>
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
              backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(51,255,51,0.1) 2px,rgba(51,255,51,0.1) 4px)`
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
                  <span className="text-sm">{(0).toFixed(1)}%</span> {/* Sustituye 0 por el valor real de progreso si tienes lógica */}
                </div>
                {/* ASCII Progress Bar */}
                <div className="bg-black border border-[#33ff33] p-2 mb-2">
                  <div className="flex items-center">
                    <span className="mr-2">[</span>
                    <div className="flex-1 bg-[#111] h-4 relative">
                      <div className="absolute top-0 left-0 h-full bg-[#33ff33] transition-all duration-300" style={{ width: `0%` }} />
                    </div>
                    <span className="ml-2">]</span>
                  </div>
                </div>
              </div>
              {/* Amounts Display */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-black border border-[#33ff33] p-3">
                  <div className="text-sm mb-1">TARGET AMOUNT</div>
                  <div className="text-xl font-bold">8000 USDC</div>
                </div>
                <div className="bg-black border border-[#33ff33] p-3">
                  <div className="text-sm mb-1">CURRENT AMOUNT</div>
                  <div className="text-xl font-bold">0 USDC</div>
                </div>
              </div>
              {/* Status Display */}
              <div className="bg-black border border-[#33ff33] p-3 mb-6">
                <div className="text-sm mb-1">SYSTEM STATUS</div>
                <div className="text-lg">{'>'} AWAITING FUNDS...</div>
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
        {/* Card Intro flotante */}
        {!isMobile && showIntro && (
          <div className={`draggable-card ${animIntro}`} ref={introDrag.current.ref} style={{ left: introDrag.current.pos.x, top: introDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #3b82f6 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minIntro ? 56 : 400, maxHeight: minIntro ? 56 : 400, border: '2px solid #3b82f6', boxShadow: '0 8px 32px rgba(59,130,246,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #3b82f6 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #3b82f6', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><User size={28} style={{marginRight: 10}}/> INTRO</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minIntro ? handleMaximize(setMinIntro, setAnimIntro) : handleMinimize(setMinIntro, setAnimIntro)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minIntro ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowIntro(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minIntro && (
              <div className="draggable-content" style={{ cursor: 'pointer', padding: 24, fontSize: '1.08rem', lineHeight:1.7, overflowY: 'auto', flex: 1 }}>
                <p style={{color:'#60a5fa', fontWeight:600, fontSize:'1.13rem', marginBottom:18}}>Hi, my name is Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.</p>
                <p style={{marginBottom:14}}>I started creating and producing music 14 years ago, but 5 years ago, I decided to begin releasing it on DSPs. In March 2022, I made my debut in web3 by minting my music as a collectible, and from day one, I've been exploring this exciting playground.</p>
                <p style={{marginBottom:14}}>Right now, I'm working on an audiovisual album titled <span style={{color:'#3b82f6', fontWeight:700}}>&quot;The Lab&quot;</span>, and to bring this project to life, I'm seeking to raise <span style={{color:'#60a5fa', fontWeight:700}}>$8,000 USD</span> to cover the album's costs through a crowdfund on seedclub. Releasing a track can be costly; an entire album is even more so, but together we can make it happen faster.</p>
                <p style={{marginBottom:14}}>Every contribution counts, and I've lined up some rewards to show my appreciation.</p>
                <p style={{marginBottom:14}}><span style={{color:'#3b82f6', fontWeight:700}}>&quot;The Lab&quot;</span> is also a way to empower artists and collaborators to work together. By participating in this crowdfunding campaign, you'll have the opportunity to be part of the project as an executive producer or curator.</p>
                <p style={{marginBottom:0}}>Explore this site to learn more about the project!</p>
              </div>
            )}
          </div>
        )}
        {/* Card Rewards flotante */}
        {!isMobile && showRewards && (
          <div className={`draggable-card ${animRewards}`} ref={rewardsDrag.current.ref} style={{ left: rewardsDrag.current.pos.x, top: rewardsDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #fbbf24 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minRewards ? 56 : 400, maxHeight: minRewards ? 56 : 400, border: '2px solid #fbbf24', boxShadow: '0 8px 32px rgba(251,191,36,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #fbbf24 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #fbbf24', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><Users size={28} style={{marginRight: 10}}/> REWARDS</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minRewards ? handleMaximize(setMinRewards, setAnimRewards) : handleMinimize(setMinRewards, setAnimRewards)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minRewards ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowRewards(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minRewards && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <p style={{fontSize: '1.08rem', color: '#ffe082', fontWeight: 500, marginBottom: 18}}>By jumping on board with this crowdfunding campaign, you're not just funding a music project—you're joining a movement! Here's what you can get:</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fff200', fontWeight: 700, fontSize: '1.18rem', display:'flex',alignItems:'center'}}><Trophy size={22} style={{marginRight:6}}/>Top Supporter</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Executive Producer Credits:</b> Your name will shine in the album credits—how cool is that?</li>
                    <li><b>Exclusive Merch:</b> Be the first to rock our limited-edition merch, designed just for you!</li>
                    <li><b>Full Album Airdrop:</b> Get the complete album sent to you before anyone else.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Award size={20} style={{marginRight:6}}/>Top 3 Supporters</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Curator Credits:</b> You'll be recognized in the album credits for your support.</li>
                    <li><b>Exclusive Merch:</b> Snag some of our first-line merch.</li>
                    <li><b>Full Album Airdrop:</b> Get the album delivered right to your wallet!</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>Top 10 Supporters</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Character from The Lab:</b> Become part of the story with your very own character!</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{margin: '0 0 8px 0', color: '#ffe082', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>All Contributors</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>The Lab Gang Badge:</b> A special badge to celebrate your support—wear it with pride!</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Card Fund Allocation flotante */}
        {!isMobile && showFund && (
          <div className={`draggable-card ${animFund}`} ref={fundDrag.current.ref} style={{ left: fundDrag.current.pos.x, top: fundDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #22c55e 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minFund ? 56 : 400, maxHeight: minFund ? 56 : 400, border: '2px solid #22c55e', boxShadow: '0 8px 32px rgba(34,197,94,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #22c55e 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #22c55e', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><DollarSign size={28} style={{marginRight: 10}}/> FUNDS ALLOCATION</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minFund ? handleMaximize(setMinFund, setAnimFund) : handleMinimize(setMinFund, setAnimFund)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minFund ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowFund(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minFund && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Disc3 size={20} style={{marginRight:6}}/>Production Costs</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Studio Rent:</b> Renting a studio for recording.</li>
                    <li><b>Session Musician Fees:</b> Fees for additional musicians if required.</li>
                    <li><b>Equipment Rental/Purchase:</b> Renting or purchasing specialized equipment.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Video size={20} style={{marginRight:6}}/>Music Videos</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Director and Production Team:</b> Budget for hiring a director and crew.</li>
                    <li><b>Location Fees:</b> Expenses for securing shooting locations.</li>
                    <li><b>Set Design and Props:</b> Funds for set design and props.</li>
                    <li><b>Costume and Makeup:</b> Budget for costumes and makeup artists.</li>
                    <li><b>Post-Production:</b> Expenses for editing and visual effects.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Distribution and Manufacturing</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Physical Distribution:</b> Budget for manufacturing and distribution costs.</li>
                    <li><b>Licensing and Copyright:</b> Expenses for licenses and copyright registrations.</li>
                    <li><b>Promotion and Distribution:</b> Allocating funds for marketing.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Trophy size={20} style={{marginRight:6}}/>Release Party</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Event Costs:</b> Budget for venue rental, catering, and other expenses.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Settings size={20} style={{marginRight:6}}/>Technologies</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Hire a developer:</b> to create the mint site for the album.</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{margin: '0 0 8px 0', color: '#4ade80', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Merchandise Design</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>First Line of Clothing Design:</b> Funds allocated for designing the first line of limited-edition merchandise.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Card Top Supporters flotante */}
        {!isMobile && showTopSupporters && (
          <div className={`draggable-card ${animTopSupporters}`} ref={topSupportersDrag.current.ref} style={{ left: topSupportersDrag.current.pos.x, top: topSupportersDrag.current.pos.y, position: 'absolute', zIndex: 10, background: '#181a20', border: '2px solid #FFD600', color: '#fff', fontWeight: 700, minWidth: 260, maxWidth: 340, minHeight: minTopSupporters ? 56 : 120, boxShadow: '0 0 24px 0 #FFD60033', fontSize: (isMobile ? 13 : 16), borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflow: 'hidden', padding: 0, transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #FFD600 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #FFD600', display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',cursor:'pointer',height:56}}>
              <span style={{display:'flex',alignItems:'center',gap:10}}><Trophy size={22} color="#FFD600"/> Top Supporters</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minTopSupporters ? handleMaximize(setMinTopSupporters, setAnimTopSupporters) : handleMinimize(setMinTopSupporters, setAnimTopSupporters)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minTopSupporters ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowTopSupporters(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minTopSupporters && (
              <div className="draggable-content" style={{padding: 18, width:'100%', display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1}}>
                <div style={{color:'#FFD600',fontWeight:700,fontSize:17,marginBottom:6,animation:'pulseTS 1.6s infinite alternate'}}>Coming Soon</div>
                <div style={{color:'#fff',opacity:0.7,fontSize:14,textAlign:'center'}}>The top supporters of The Lab will be featured here.</div>
              </div>
            )}
            <style>{`
              @keyframes pulseTS {
                0% { opacity: 1; text-shadow: 0 0 8px #FFD60044; }
                100% { opacity: 0.7; text-shadow: 0 0 24px #FFD600; }
              }
            `}</style>
          </div>
        )}

        {/* Card Merch flotante */}
        {!isMobile && showMerch && (
          <div className={`draggable-card ${animMerch}`} ref={merchMinDrag.current.ref} style={{ left: merchMinDrag.current.pos.x, top: merchMinDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #ef4444 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minMerch ? 56 : 400, maxHeight: minMerch ? 56 : 400, border: '2px solid #ef4444', boxShadow: '0 8px 32px rgba(239,68,68,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #ef4444 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #ef4444', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><Package size={28} style={{marginRight: 10}}/> MERCH</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minMerch ? handleMaximize(setMinMerch, setAnimMerch) : handleMinimize(setMinMerch, setAnimMerch)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minMerch ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowMerch(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minMerch && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <p style={{fontSize: '1.08rem', color: '#fca5a5', fontWeight: 500, marginBottom: 18}}>Get ready to rock The Lab's exclusive merchandise! Our first line of limited-edition items is coming soon.</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fecaca', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Package size={20} style={{marginRight:6}}/>Coming Soon</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Limited Edition T-Shirts:</b> High-quality, unique designs that represent The Lab's aesthetic.</li>
                    <li><b>Exclusive Hoodies:</b> Premium comfort with The Lab's signature style.</li>
                    <li><b>Collectible Pins:</b> Small but mighty pieces of The Lab's universe.</li>
                    <li><b>Special Accessories:</b> Unique items that complement your collection.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fecaca', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Trophy size={20} style={{marginRight:6}}/>Top Supporter Benefits</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>First Access:</b> Be the first to get your hands on our merchandise.</li>
                    <li><b>Exclusive Items:</b> Special pieces only available to top supporters.</li>
                    <li><b>Custom Designs:</b> Input on future merchandise designs.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Music NFTs flotante */}
        {!isMobile && showMusicNFTs && (
          <div className={`draggable-card ${animMusicNFTs}`} ref={musicNFTsMinDrag.current.ref} style={{ left: musicNFTsMinDrag.current.pos.x, top: musicNFTsMinDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #8b5cf6 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minMusicNFTs ? 56 : 400, maxHeight: minMusicNFTs ? 56 : 400, border: '2px solid #8b5cf6', boxShadow: '0 8px 32px rgba(139,92,246,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #8b5cf6 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #8b5cf6', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><Disc3 size={28} style={{marginRight: 10}}/> MUSIC NFTs</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minMusicNFTs ? handleMaximize(setMinMusicNFTs, setAnimMusicNFTs) : handleMinimize(setMinMusicNFTs, setAnimMusicNFTs)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minMusicNFTs ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowMusicNFTs(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minMusicNFTs && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <p style={{fontSize: '1.08rem', color: '#c4b5fd', fontWeight: 500, marginBottom: 18}}>Experience The Lab's music in a whole new way through our exclusive NFT collection.</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ddd6fe', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Disc3 size={20} style={{marginRight:6}}/>Album NFTs</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Full Album Collection:</b> Own pieces of The Lab's complete musical journey.</li>
                    <li><b>Exclusive Artwork:</b> Unique visual representations for each track.</li>
                    <li><b>Special Editions:</b> Limited edition versions with extra content.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#ddd6fe', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Trophy size={20} style={{marginRight:6}}/>Collector Benefits</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Royalty Shares:</b> Earn from future sales and streams.</li>
                    <li><b>Exclusive Access:</b> Early access to new releases and events.</li>
                    <li><b>Community Perks:</b> Special benefits within The Lab's community.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Telegram flotante */}
        {!isMobile && showTelegram && (
          <div className={`draggable-card ${animTelegram}`} ref={telegramDrag.current.ref} style={{ left: telegramDrag.current.pos.x, top: telegramDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #0ea5e9 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minTelegram ? 56 : 400, maxHeight: minTelegram ? 56 : 400, border: '2px solid #0ea5e9', boxShadow: '0 8px 32px rgba(14,165,233,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #0ea5e9 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #0ea5e9', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><MessageCircle size={28} style={{marginRight: 10}}/> TELEGRAM</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minTelegram ? handleMaximize(setMinTelegram, setAnimTelegram) : handleMaximize(setMinTelegram, setAnimTelegram)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minTelegram ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowTelegram(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minTelegram && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <p style={{fontSize: '1.08rem', color: '#7dd3fc', fontWeight: 500, marginBottom: 18}}>Join The Lab's community on Telegram for exclusive updates, behind-the-scenes content, and direct interaction with the team.</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#bae6fd', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><MessageCircle size={20} style={{marginRight:6}}/>Community Features</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Exclusive Updates:</b> Be the first to know about new releases and events.</li>
                    <li><b>Direct Communication:</b> Chat directly with the team and other supporters.</li>
                    <li><b>Special Announcements:</b> Get early access to important news and opportunities.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#bae6fd', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>Join Us</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Community Access:</b> Join our growing community of supporters.</li>
                    <li><b>Exclusive Content:</b> Access special content and discussions.</li>
                    <li><b>Network:</b> Connect with other music and NFT enthusiasts.</li>
                  </ul>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="px-8 py-3 bg-[#0ea5e9] border-2 border-[#0ea5e9] text-white font-mono text-lg rounded shadow-lg hover:bg-[#0284c7] hover:text-white transition-all duration-200 tracking-widest"
                    style={{
                      boxShadow: '0 0 16px #0ea5e955, 0 2px 8px #000',
                      textShadow: '0 0 6px #0ea5e9',
                      letterSpacing: 2
                    }}
                    onClick={() => window.open('https://t.me/thelabcommunity', '_blank')}
                  >
                    JOIN TELEGRAM
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Why flotante */}
        {!isMobile && showWhy && (
          <div className={`draggable-card ${animWhy}`} ref={whyDrag.current.ref} style={{ left: whyDrag.current.pos.x, top: whyDrag.current.pos.y, position: 'absolute', zIndex: 10, background: 'linear-gradient(135deg, #232323 60%, #f43f5e 100%)', color: '#fff', minWidth: 340, maxWidth: 500, width: 400, minHeight: minWhy ? 56 : 400, maxHeight: minWhy ? 56 : 400, border: '2px solid #f43f5e', boxShadow: '0 8px 32px rgba(244,63,94,0.10), 0 2px 8px #0004', borderRadius: 18, display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div className="draggable-header" style={{background: 'linear-gradient(90deg, #f43f5e 60%, #232323 100%)', color: '#232323', fontWeight: 700, fontSize: 22, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottom: '2px solid #f43f5e', display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:12,cursor:'pointer'}}>
              <span style={{display:'flex',alignItems:'center'}}><HelpCircle size={28} style={{marginRight: 10}}/> WHY</span>
              <div style={{display:'flex',gap:8}}>
                <button 
                  onClick={() => minWhy ? handleMaximize(setMinWhy, setAnimWhy) : handleMinimize(setMinWhy, setAnimWhy)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  {minWhy ? '□' : '−'}
                </button>
                <button 
                  onClick={() => setShowWhy(false)}
                  className="text-[#232323] hover:text-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            {!minWhy && (
              <div className="draggable-content" style={{paddingTop: 18, paddingBottom: 18, cursor: 'pointer', overflowY: 'auto', flex: 1}}>
                <p style={{fontSize: '1.08rem', color: '#fda4af', fontWeight: 500, marginBottom: 18}}>Discover why The Lab is more than just a music project—it's a movement towards a new way of creating and sharing art.</p>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fecdd3', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><HelpCircle size={20} style={{marginRight:6}}/>Our Mission</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Innovation:</b> Pushing the boundaries of music and technology.</li>
                    <li><b>Community:</b> Building a strong, engaged community of supporters.</li>
                    <li><b>Transparency:</b> Creating a transparent and fair ecosystem for artists.</li>
                  </ul>
                </div>
                <div style={{marginBottom: 18}}>
                  <h3 style={{margin: '0 0 8px 0', color: '#fecdd3', fontWeight: 700, fontSize: '1.13rem', display:'flex',alignItems:'center'}}><Users size={20} style={{marginRight:6}}/>Your Impact</h3>
                  <ul style={{marginLeft: 0, paddingLeft: 18, color:'#fff'}}>
                    <li><b>Support Independent Art:</b> Help independent artists thrive.</li>
                    <li><b>Shape the Future:</b> Be part of the evolution of music distribution.</li>
                    <li><b>Build Community:</b> Join a movement of like-minded individuals.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón de reset */}
        <button 
          className="reset-button"
          onClick={resetAllCards}
        >
          Reset Cards
        </button>
      </div>
    </div>
  );
} 