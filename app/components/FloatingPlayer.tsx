"use client"

import React from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export function FloatingPlayer() {
  const {
    tracks,
    current,
    playing,
    progress,
    duration,
    volume,
    audioRef,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSeek,
    handleVolume,
  } = usePlayer();

  if (!tracks.length || !tracks[current]) return null;

  const currentTrackData = tracks[current];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            <Image
              src={currentTrackData.cover}
              alt={currentTrackData.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div>
            <h3 className="font-bold">{currentTrackData.title}</h3>
            <p className="text-sm text-gray-400">{currentTrackData.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="p-2 hover:text-pink-400">
              <SkipBack size={20} />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={handleNext} className="p-2 hover:text-pink-400">
              <SkipForward size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 w-64">
            <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
              max={100}
              value={(progress / duration) * 100}
            onChange={handleSeek}
              className="flex-1"
          />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => audioRef.current && (audioRef.current.muted = !audioRef.current.muted)} className="p-2 hover:text-pink-400">
            {audioRef.current?.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
} 