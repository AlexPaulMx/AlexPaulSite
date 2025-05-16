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
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
  const audioRef = useRef<HTMLAudioElement>(null) as React.RefObject<HTMLAudioElement>;

  // Persistir el estado en localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('playerState');
    if (savedState) {
      const { current, playing, volume, progress } = JSON.parse(savedState);
      setCurrent(current);
      setPlaying(playing);
      setVolume(volume);
      setProgress(progress);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playerState', JSON.stringify({ current, playing, volume, progress }));
  }, [current, playing, volume, progress]);

  // Manejar cambios en la pista actual
  useEffect(() => {
    if (audioRef.current && tracks[current]) {
      audioRef.current.src = tracks[current].src;
      if (playing) {
        audioRef.current.play().catch(err => {
          setError("Error al reproducir el audio");
          setPlaying(false);
        });
      }
    }
  }, [current, tracks]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      setLoading(true);
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
          setError(null);
        })
        .catch(err => {
          setError("Error al reproducir el audio");
          setPlaying(false);
          setLoading(false);
        });
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    setPlaying(true);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
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
      audioRef,
      handlePlayPause,
      handleNext,
      handlePrev,
      handleSeek,
      handleVolume,
    }}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
        onError={() => {
          setError("Error al cargar el audio");
          setPlaying(false);
        }}
      />
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