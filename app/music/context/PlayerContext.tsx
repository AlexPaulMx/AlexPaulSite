"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  cover: string;
  src: string;
  album?: string;
  genres?: string[];
  year?: string;
  description?: string;
}

interface PlayerContextType {
  current: number;
  playing: boolean;
  progress: number;
  duration: number;
  volume: number;
  loading: boolean;
  error: string | null;
  tracks: Track[];
  setCurrent: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTracks: (tracks: Track[]) => void;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cargar nueva canción cuando cambia el track actual
  useEffect(() => {
    if (audioRef.current && tracks[current]) {
      audioRef.current.src = tracks[current].src;
      audioRef.current.load();
      setProgress(0);
      setDuration(0);
      if (playing) {
        audioRef.current.play().catch(err => {
          setError(err.message);
          setPlaying(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, tracks]);

  // Play/Pause control
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(err => {
          setError(err.message);
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % tracks.length);
    setPlaying(true);
  };

  // Actualizar progreso y duración
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleNext);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, handleNext]);

  // Volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = Number(e.target.value);
      audioRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  return (
    <PlayerContext.Provider value={{
      current,
      playing,
      progress,
      duration,
      volume,
      loading,
      error,
      tracks,
      setCurrent,
      setPlaying,
      setProgress,
      setDuration,
      setVolume,
      setLoading,
      setError,
      setTracks,
      handlePlayPause,
      handleNext,
      handlePrev,
      handleSeek,
      handleVolume,
      audioRef
    }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
} 