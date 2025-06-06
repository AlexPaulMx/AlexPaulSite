"use client";

import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause } from 'lucide-react';

interface FloatingPlayerProps {
  minimal?: boolean;
}

export function FloatingPlayer({ minimal = false }: FloatingPlayerProps) {
  const { 
    current,
    playing,
    progress,
    duration,
    tracks,
    handlePlayPause,
    handleNext,
    handlePrev,
  } = usePlayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = Math.min(Math.max(0, e.clientX - width / 2), window.innerWidth - width);
        const y = Math.min(Math.max(0, e.clientY - height / 2), window.innerHeight - height);
        containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!tracks[current]) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-2 flex items-center gap-2 transition-transform duration-100"
      style={{
        transform: `translate(${mousePositionRef.current.x}px, ${mousePositionRef.current.y}px)`,
      }}
    >
      <img
        src={tracks[current].cover}
        alt={tracks[current].title}
        className="w-10 h-10 rounded"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">
          {tracks[current].title}
        </div>
        <div className="text-xs text-neutral-400 truncate">
          {tracks[current].artist}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          onClick={handlePlayPause}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          {playing ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={handleNext}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
} 