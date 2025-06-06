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
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Función auxiliar para manejar la reproducción
  const handlePlay = async () => {
    if (!audioRef.current) {
      console.log('No audio element available');
      return;
    }
    
    try {
      console.log('Attempting to play audio...');
      // Si hay una promesa de reproducción pendiente, esperamos a que termine
      if (playPromiseRef.current) {
        console.log('Waiting for pending play promise...');
        await playPromiseRef.current;
      }
      
      // Intentamos reproducir
      console.log('Starting playback...');
      playPromiseRef.current = audioRef.current.play();
      await playPromiseRef.current;
      console.log('Playback started successfully');
      setPlaying(true);
      setLoading(false);
    } catch (err) {
      console.error('Error playing audio:', err);
      setError(err instanceof Error ? err.message : 'Error playing audio');
      setPlaying(false);
      setLoading(false);
    } finally {
      playPromiseRef.current = null;
    }
  };

  // Cargar nueva canción cuando cambia el track actual
  useEffect(() => {
    if (!audioRef.current || !tracks[current]) {
      console.log('No audio element or track available');
      return;
    }

    console.log('Loading new track:', tracks[current].title);
    setLoading(true);
    setError(null);

    const audio = audioRef.current;
    audio.src = tracks[current].src;
    
    // Manejar eventos de carga
    const handleCanPlay = () => {
      console.log('Audio can play');
      setLoading(false);
      if (playing) {
        handlePlay();
      }
    };

    const handleLoadError = (e: Event) => {
      console.error('Error loading audio:', e);
      setError('Error loading audio file');
      setLoading(false);
          setPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleLoadError);

    // Cargar el audio
    audio.load();
    setProgress(0);
    setDuration(0);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleLoadError);
    };
  }, [current, tracks]);

  // Play/Pause control
  useEffect(() => {
    if (!audioRef.current) return;
    
      if (playing) {
      handlePlay();
    } else {
      console.log('Pausing audio...');
      // Si hay una promesa de reproducción pendiente, esperamos a que termine
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          audioRef.current?.pause();
        }).catch(() => {
          // Ignoramos errores al pausar
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Actualizar progreso y duración
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      console.log('Track ended, playing next...');
      handleNext();
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setError('Error playing audio');
      setPlaying(false);
      setLoading(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    console.log('Play/Pause clicked, current state:', playing);
    setPlaying(prev => !prev);
  };

  const handleNext = () => {
    console.log('Next track requested');
    setCurrent(prev => (prev + 1) % tracks.length);
    setPlaying(true);
  };

  const handlePrev = () => {
    console.log('Previous track requested');
    setCurrent(prev => (prev - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = Number(e.target.value);
      console.log('Seeking to:', seekTime);
      audioRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    console.log('Setting volume to:', vol);
    setVolume(vol);
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
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
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