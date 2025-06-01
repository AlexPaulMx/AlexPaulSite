"use client";

import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export function FloatingPlayer({ minimal = false }: { minimal?: boolean }) {
  const { 
    current,
    playing,
    tracks,
    progress,
    duration,
    handlePlayPause,
    handleNext,
    handlePrev
  } = usePlayer();

  if (!tracks.length || current === null || !playing) return null;
  const currentTrack = tracks[current];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-black/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl px-5 py-3 min-w-[260px] max-w-[360px] animate-fade-in" style={{boxShadow:'0 8px 32px #000a, 0 2px 24px #f43f5e44'}}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img src={currentTrack.cover} alt={currentTrack.title} className="w-12 h-12 rounded-lg object-cover border border-white/10 shadow" />
        <div className="min-w-0">
          <div className="font-bold text-white text-sm truncate max-w-[140px]">{currentTrack.title}</div>
          <div className="text-xs text-neutral-300 truncate max-w-[140px]">{currentTrack.artist}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handlePrev} className="p-2 text-pink-400 hover:text-white transition"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
        <button onClick={handlePlayPause} className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          {playing ? <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="20"/><rect x="18" y="4" width="4" height="20"/></svg> : <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6,4 24,14 6,24"/></svg>}
        </button>
        <button onClick={handleNext} className="p-2 text-pink-400 hover:text-white transition"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
      </div>
      {/* Barra de progreso minimal */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 ml-3">
        <input type="range" min={0} max={duration} value={progress} onChange={()=>{}} className="w-full accent-pink-500 h-1" style={{minWidth:80}} readOnly />
      </div>
    </div>
  );
} 