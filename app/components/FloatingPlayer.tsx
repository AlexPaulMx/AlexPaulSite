"use client"

import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, GripVertical } from 'lucide-react';

export function FloatingPlayer() {
  const {
    current,
    playing,
    progress,
    duration,
    volume,
    loading,
    error,
    tracks,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolume,
  } = usePlayer();

  if (!tracks.length || !tracks[current] || !playing) return null;

  return (
    <div
      className="fixed flex items-center gap-5 z-50 animate-fade-in"
      style={{
        right: 24,
        bottom: 24,
        minWidth: 320,
        maxWidth: 420,
        background: 'rgba(30,30,40,0.65)',
        boxShadow: '0 8px 32px #000a, 0 2px 24px #f43f5e44',
        borderRadius: 28,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(255,255,255,0.13)',
        padding: '22px 28px',
      }}
    >
      <img 
        src={tracks[current].cover} 
        alt={tracks[current].title} 
        className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white/20 bg-neutral-800"
        style={{boxShadow:'0 2px 12px #0006'}}
      />
      <div className="flex flex-col min-w-[120px] flex-1">
        <div className="text-base font-bold truncate text-white drop-shadow mb-1" style={{letterSpacing:0.2}}>{tracks[current].title}</div>
        <div className="text-xs text-neutral-300 truncate mb-2">{tracks[current].artist}</div>
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 accent-pink-500"
          style={{marginBottom:6, accentColor:'#f43f5e'}}
        />
        <div className="flex justify-between text-xs text-neutral-400" style={{fontVariantNumeric:'tabular-nums'}}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 ml-2">
        <div className="flex items-center gap-2 mb-1">
          <button onClick={handlePrev} className="p-2 hover:text-pink-400 transition-colors rounded-full bg-white/10 hover:bg-pink-500/20 shadow">
            <SkipBack size={18} />
          </button>
          <button onClick={handlePlayPause} className={`p-2 rounded-full shadow-lg ${playing ? 'bg-pink-500 text-white' : 'bg-white/10 text-white hover:bg-pink-500 hover:text-white'} transition-all duration-200`} style={{fontSize:22}}>
            {loading ? (
              <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            ) : playing ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </button>
          <button onClick={handleNext} className="p-2 hover:text-pink-400 transition-colors rounded-full bg-white/10 hover:bg-pink-500/20 shadow">
            <SkipForward size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          {volume === 0 ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-20 h-1 accent-pink-500"
            style={{accentColor:'#f43f5e'}}
          />
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </div>
  );
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
} 