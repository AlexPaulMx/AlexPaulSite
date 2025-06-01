"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type Track = {
  title: string;
  artist: string;
  cover: string;
  src: string;
  album?: string;
  genres?: string[];
  year?: string;
  description?: string;
};

type PlayerContextType = {
  tracks: Track[];
  setTracks: (tracks: Track[]) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
};

const PlayerContext = createContext<PlayerContextType>({
  tracks: [],
  setTracks: () => {},
  currentTrack: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = tracks[currentTrackIndex] || null;

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const next = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const previous = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
      tracks,
      setTracks,
        currentTrack,
        isPlaying,
        play,
        pause,
        next,
        previous,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext); 