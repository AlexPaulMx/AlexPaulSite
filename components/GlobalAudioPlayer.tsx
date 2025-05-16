"use client";
import React, { createContext, useContext, useRef, useState } from "react";

// Contexto global para el player
const AudioPlayerContext = createContext<any>(null);

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}

const defaultTracks = [
  // Aquí puedes importar el array de tracks desde page.tsx o definirlo igual
  // Ejemplo:
  {
    title: "Piso 23",
    artist: "Alex Paul",
    cover: "/images/collectibles/piso-23.jpeg",
    src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/PISO%2023%20.wav"
  },
  // ...agrega el resto igual que en page.tsx
];

export function AudioPlayerProvider({ children, tracks = defaultTracks }: { children: React.ReactNode, tracks?: typeof defaultTracks }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Funciones de control
  const play = (idx?: number) => {
    if (typeof idx === "number") setCurrent(idx);
    setPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 50);
  };
  const pause = () => {
    setPlaying(false);
    audioRef.current?.pause();
  };
  const next = () => {
    setCurrent((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    setPlaying(true);
  };
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setPlaying(true);
  };
  const seek = (val: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val;
    setProgress(val);
  };
  const setVol = (val: number) => {
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  // Efectos
  React.useEffect(() => {
    if (!audioRef.current) return;
    const update = () => {
      setProgress(audioRef.current!.currentTime);
      setDuration(audioRef.current!.duration || 0);
    };
    audioRef.current.addEventListener("timeupdate", update);
    audioRef.current.addEventListener("loadedmetadata", update);
    audioRef.current.addEventListener("ended", next);
    return () => {
      audioRef.current?.removeEventListener("timeupdate", update);
      audioRef.current?.removeEventListener("loadedmetadata", update);
      audioRef.current?.removeEventListener("ended", next);
    };
  }, [current]);
  React.useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);
  React.useEffect(() => {
    if (audioRef.current && playing) audioRef.current.play();
    else if (audioRef.current) audioRef.current.pause();
  }, [current, playing]);

  return (
    <AudioPlayerContext.Provider value={{ current, setCurrent, playing, setPlaying, play, pause, next, prev, seek, setVol, progress, duration, volume, tracks }}>
      {children}
      <GlobalAudioPlayerUI audioRef={audioRef} />
    </AudioPlayerContext.Provider>
  );
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function GlobalAudioPlayerUI({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const { current, playing, play, pause, next, prev, seek, setVol, progress, duration, volume, tracks } = useAudioPlayer();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio error:', e);
    setError('Error loading audio. Please try another track.');
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 9999, background: '#181a20ee', borderTop: '1px solid #222', boxShadow: '0 -2px 16px #000a', display: 'flex', alignItems: 'center', padding: '8px 16px', gap: 16, minHeight: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <img 
          src={tracks[current].cover} 
          alt={tracks[current].title} 
          style={{ 
            width: 44, 
            height: 44, 
            borderRadius: 8, 
            objectFit: 'cover', 
            background: '#232323', 
            border: '1px solid #333' 
          }}
          onError={(e) => {
            e.currentTarget.src = '/images/default-cover.jpg';
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{tracks[current].title}</div>
          <div style={{ color: '#bdbdbd', fontSize: 13, lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{tracks[current].artist}</div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={tracks[current].src} 
        preload="auto"
        onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
      />
      {error && (
        <div style={{ 
          color: '#f43f5e', 
          fontSize: 12, 
          padding: '4px 8px', 
          background: '#181a20', 
          borderRadius: 4,
          marginLeft: 8
        }}>
          {error}
        </div>
      )}
      {isLoading && (
        <div style={{ 
          color: '#bdbdbd', 
          fontSize: 12, 
          padding: '4px 8px', 
          background: '#181a20', 
          borderRadius: 4,
          marginLeft: 8
        }}>
          Loading...
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <button onClick={prev} style={{ background: 'none', border: 'none', color: '#f43f5e', width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }} aria-label="Prev"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
        <button onClick={playing ? pause : play} style={{ background: '#f43f5e', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #f43f5e44' }} aria-label="Play/Pause" disabled={isLoading}>
          {playing ? (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="20"/><rect x="18" y="4" width="4" height="20"/></svg>
          ) : (
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6,4 24,14 6,24"/></svg>
          )}
        </button>
        <button onClick={next} style={{ background: 'none', border: 'none', color: '#f43f5e', width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }} aria-label="Next"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
        <span style={{ color: '#bdbdbd', fontSize: 12, minWidth: 36, textAlign: 'right' }}>{formatTime(progress)}</span>
        <input type="range" min={0} max={duration} value={progress} onChange={e => seek(Number(e.target.value))} style={{ flex: 1, accentColor: '#f43f5e', height: 2, background: '#232323', borderRadius: 2 }} />
        <span style={{ color: '#bdbdbd', fontSize: 12, minWidth: 36 }}>{formatTime(duration)}</span>
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => setVol(Number(e.target.value))} style={{ width: 70, accentColor: '#f43f5e', marginLeft: 8 }} />
      </div>
    </div>
  );
} 