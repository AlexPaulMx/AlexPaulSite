"use client"

import Image from "next/image"
import Link from "next/link"
import { Apple, Instagram, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Brush, Settings, User } from "lucide-react"
import { motion } from "framer-motion"
import React, { useRef, useState, useEffect } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Autoplay } from "@/components/ui/carousel"
import dynamic from "next/dynamic"
import { usePlayer } from './context/PlayerContext';
import { FloatingPlayer } from './components/FloatingPlayer';
import NoiseBg from "@/components/NoiseBg";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
}

const releases = [
  {
    image: "/images/release-1.jpg",
    title: "Release 1",
    audio: "/audio/sample1.mp3"
  },
  {
    image: "/images/release-2.jpg",
    title: "Release 2",
    audio: "/audio/sample2.mp3"
  },
  {
    image: "/images/release-3.jpg",
    title: "Release 3",
    audio: "/audio/sample3.mp3"
  },
  {
    image: "/images/release-4.jpg",
    title: "Release 4",
    audio: "/audio/sample4.mp3"
  }
]

type Release = {
  title: string;
  url: string;
  cover: string;
  description?: string;
  spotify?: string;
  apple?: string;
  youtube?: string;
  smartlink?: string;
  amazon?: string;
  deezer?: string;
};

export const collectibles = [
  {
    title: "Piso 23",
    url: "https://www.sound.xyz/alexpaul/piso-23",
    cover: "/images/collectibles/piso-23.jpeg",
    smartlink: "https://artists.landr.com/055855171221",
    spotify: "https://open.spotify.com/intl-es/track/2IRsF7QevLdElI4csFRVhS?si=4b6daee86db5430d",
    apple: "https://music.apple.com/us/album/piso-23/1758786446?i=1758786447&app=music",
    youtube: "https://www.youtube.com/watch?v=aFJN8F3B-Zw",
    amazon: "https://music.amazon.com.mx/albums/B0D9WN9PZR",
    deezer: "https://www.deezer.com/track/1830233617"
  },
  {
    title: "Piso 23 remix",
    url: "https://www.sound.xyz/alexpaul/piso-23-remix",
    cover: "/images/collectibles/Piso 23 remix.png"
  },
  {
    title: "Retrato",
    url: "https://www.sound.xyz/alexpaul/retrato",
    cover: "/images/collectibles/retrato.jpg",
    spotify: "https://open.spotify.com/album/0oCUIGx5DEUHqESvB3xJ2V?si=Gl56gSUdQlaNMcebtKDnDw",
    apple: "https://music.apple.com/us/album/retrato-single/1720654554?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_kTFmQJHLMoIsMKj_VeUupGMUvaaTJxq0Q",
    deezer: "https://www.deezer.com/album/522185052"
  },
  {
    title: "03:00 AM",
    url: "https://www.sound.xyz/alexpaul/0300-am",
    cover: "/images/collectibles/0300 am.jpg",
    spotify: "https://open.spotify.com/intl-es/album/2mwxVQLdGbOeiEIlmaF5Ob",
    apple: "https://music.apple.com/mx/album/03-00-am-single/1720827207",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_nkH2-aqU8LRtYZ8v0aNGXlHZkHXUxHATs",
    deezer: "https://www.deezer.com/album/522636162"
  },
  {
    title: "Cuando ya no me duelas",
    url: "https://www.sound.xyz/alexpaul/cuando-ya-no-me-duelas",
    cover: "https://i1.sndcdn.com/artworks-kKvgrzD62yiXjhyj-zxpQQQ-t1080x1080.jpg",
    spotify: "https://open.spotify.com/album/4unguHwgWqUlsGmFk8fz4c?si=ecFn1cvpTuSboPJxSsdzBw",
    apple: "https://music.apple.com/us/album/cuando-ya-no-me-duelas-single/1724654761?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_kTFmQJHLMoIsMKj_VeUupGMUvaaTJxq0Q",
    deezer: "https://www.deezer.com/album/532155972"
  },
  {
    title: "Ya no estoy triste (ft gen.wav)",
    url: "https://www.sound.xyz/alexpaul/ya-no-estoy-triste-ft-genwav",
    cover: "/images/collectibles/ya-no-estoy-triste-ft-genwav.jpeg",
    spotify: "https://open.spotify.com/intl-es/album/7EOymY12B7gKDzot7MMbyK",
    apple: "https://music.apple.com/us/album/ya-no-estoy-triste-feat-gen-wav-single/1729887405?app=music",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_mgnT9a9J50OyqTERGuMUTDT12dJp7DG8U",
    deezer: "https://www.deezer.com/album/545414522"
  },
  {
    title: "Otro Ambiente",
    url: "https://www.sound.xyz/alexpaul/otro-ambiente",
    cover: "/images/collectibles/otro-ambiente.jpg",
    spotify: "https://open.spotify.com/intl-es/album/6lBEXOFU7eH2VuL5Dmmx46",
    apple: "https://music.apple.com/us/album/otro-ambiente-single/1720825548?app=music",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_meit6_e1OIg1J0tpltuDN98M5y2CmZIVg",
    deezer: "https://www.deezer.com/album/522630782"
  },
  {
    title: "Rosa Pastel",
    url: "https://www.sound.xyz/alexpaul/rosa-pastel",
    cover: "/images/collectibles/rosa-pastel.jpeg",
    spotify: "https://open.spotify.com/album/7fq1TJDIV6NyYhAIwiO3aw?si=m7mltL_5TVSwOoib7RonKA",
    apple: "https://music.apple.com/us/album/rosa-pastel-feat-bulla-beatz-single/1728496866?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_m4-MMAs5idarcrR-66VCijpDg1NCb243I",
    deezer: "https://www.deezer.com/album/542116412"
  },
  {
    title: "Entre Nosotros",
    url: "https://www.sound.xyz/alexpaul/entre-nosotros",
    cover: "/images/collectibles/entre nosotros.gif",
    spotify: "https://open.spotify.com/album/1Xe3vtDDKlSPeGFQEZodRg?si=YM879KVsTraz4UJwavTQgQ",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_nSbGaXX11irRzxhS-YmFa-lx2kkjPjrO0",
    deezer: "https://www.deezer.com/album/519835342"
  },
  {
    title: "Como Antes",
    url: "https://www.sound.xyz/alexpaul/como-antes",
    cover: "https://i.scdn.co/image/ab67616d0000b2736bb4b7dd585a2e44fa515f79",
    spotify: "https://open.spotify.com/intl-es/album/6LX0sI01Uhz3lSRCclUNWv?si=TNYJblPKRRauLhlBqSfSfg",
    apple: "https://music.apple.com/us/album/como-antes-single/1769351150",
    amazon: "https://www.amazon.it/Como-Antes-Alex-Paul/dp/B0DHCRFFK4"
  },
  {
    title: "¿Por qué lloras por el?",
    url: "https://www.sound.xyz/alexpaul/por-que-lloras-por-el",
    cover: "https://i.scdn.co/image/ab67616d0000b27327c945aa997e44fa963811fb",
    spotify: "https://open.spotify.com/intl-es/album/1ZAuhQLHuHwApNpRARgMpa",
    apple: "https://music.apple.com/us/album/por-qu%C3%A9-lloras-por-el-single/1720654986?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_lPGL2-Wp5DppRi9_4mNsQI7XPiL5TUZc0",
    deezer: "https://www.deezer.com/album/522187182"
  },
  {
    title: "Shot por mi",
    url: "https://www.sound.xyz/alexpaul/shot-por-mi",
    cover: "https://i.scdn.co/image/ab67616d0000b273548bf4b88ea991112484a190",
    spotify: "https://open.spotify.com/album/6Mbh5c0zvsXkXg46TSHl8R?si=9_UaFAeCTOeAk5XgVtGW7g",
    apple: "https://music.apple.com/us/album/shot-por-mi-single/1721225524?app=music",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_kNCaEi2jtZMpHp07O2jfXZfSFDqjWps-k",
    deezer: "https://www.deezer.com/album/523401112"
  },
  {
    title: "Culpa mía",
    url: "https://www.sound.xyz/alexpaul/culpa-mia",
    cover: "https://i.scdn.co/image/ab67616d0000b2738efcd0a615a49ed8c0f76967",
    spotify: "https://open.spotify.com/album/79fFPqO8x3CmyzkqxMUR8P?si=G3tSMtm9QOCE4N6cJMu8Xw",
    apple: "https://music.apple.com/us/album/culpa-m%C3%ADa-single/1720654839?app=itunes",
    deezer: "https://www.deezer.com/album/522187122"
  },
  {
    title: "Me quedo en casa",
    url: "https://www.sound.xyz/alexpaul/me-quedo-en-casa",
    cover: "https://s.mxmcdn.net/images-storage/albums2/5/8/7/5/8/5/52585785_350_350.jpg",
    spotify: "https://open.spotify.com/album/6YjqxWLFnZvNXIVQzQw3wF?si=LEJYH1ztR3m_Om2SPqV8PA",
    apple: "https://music.apple.com/us/album/me-quedo-en-casa-single/1720654607?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_l1fdeYEyqn9Biyy7XJLBNii3gXNISHgoQ",
    deezer: "https://www.deezer.com/album/522185092"
  },
  {
    title: "Clavada",
    url: "https://www.sound.xyz/alexpaul/clavada",
    cover: "https://i.scdn.co/image/ab67616d00001e02cd7d8269454f92d766a4e301",
    spotify: "https://open.spotify.com/album/72VMyLBepo0tV8HlUwCXnI?si=W7FwBRYrTWqD_nwu3m778A",
    apple: "https://music.apple.com/us/album/clavada-single/1718630982?app=itunes",
    deezer: "https://www.deezer.com/album/517249262"
  },
  {
    title: "Mi vieja chica",
    url: "https://www.sound.xyz/alexpaul/mi-vieja-chica",
    cover: "https://i.scdn.co/image/ab67616d0000b273f68588164d23abfe6ba0e68a",
    spotify: "https://open.spotify.com/album/7nEfM0SA8Shh5LqEs2Rmp7?si=GVDu_VCCQ8S9NItUZ_6Knw",
    apple: "https://music.apple.com/us/album/mi-vieja-chica-single/1719634949?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_lXuCJVrlK2bZFVVosRFbQuQUcAA_hRCtU",
    deezer: "https://www.deezer.com/album/519835512"
  },
  {
    title: "Navegando",
    url: "https://www.sound.xyz/alexpaul/navegando",
    cover: "https://m.media-amazon.com/images/I/31VpczzV-DL._UXNaN_FMjpg_QL85_.jpg",
    spotify: "https://open.spotify.com/album/2qO5t3BEoUeYfsc9X8JAzG?si=LAT1wGc0S1aRjqcguh6szA",
    apple: "https://music.apple.com/us/album/navegando-single/1716588043?app=itunes",
    youtube: "https://youtube.com/playlist?list=OLAK5uy_lC9H2IBMC779RJ-TKvSIfhcDFVrLKU7yU",
    deezer: "https://www.deezer.com/album/512555831"
  },
]

type MusicPlayerProps = {
  index: number
  isActive: boolean
  onPlay: (idx: number) => void
  onPause: () => void
  onPrev: () => void
  onNext: () => void
  audioSrc: string
  title: string
  cover: string
}

function MusicPlayer({ index, isActive, onPlay, onPause, onPrev, onNext, audioSrc, title, cover }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  // Play/Pause control
  const handlePlayPause = () => {
    if (!isPlaying) {
      onPlay(index)
    } else {
      onPause()
    }
  }

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const seekTime = (Number(e.target.value) / 100) * duration
      setProgress(seekTime)
  }

  // Volume
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value)
    setVolume(vol)
  }

  // Mute
  const handleMute = () => {
    setMuted(!muted)
  }

  // When active changes
  React.useEffect(() => {
    if (isActive) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
      setProgress(0)
    }
  }, [isActive])

  return (
    <div className="flex flex-col items-center bg-neutral-900 rounded-lg p-4 shadow-lg">
      <div className="relative w-full aspect-square mb-2">
        <Image src={cover} alt={title} fill className="object-cover rounded-md" />
      </div>
      <div className="w-full flex flex-col items-center">
        <span className="font-semibold mb-2 text-sm text-center">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
        <div className="flex items-center w-full gap-2">
          <span className="text-xs w-8 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={duration ? (progress / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 accent-indigo-500 h-1"
          />
          <span className="text-xs w-8">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={handleMute} className="hover:text-indigo-400 rounded-none">
            {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="accent-indigo-500 h-1"
            style={{ width: 60 }}
          />
        </div>
      </div>
    </div>
  )
}

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: true }, [Autoplay({ delay: 2500, stopOnInteraction: false })])
  const [modalCollectible, setModalCollectible] = useState<Release | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [showFloating, setShowFloating] = useState(false);

  const handlePlay = (idx: number) => {
    setActiveIndex(idx)
  }
  const handlePause = () => {
    setActiveIndex(null)
  }
  const handlePrev = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0
      return prev === 0 ? releases.length - 1 : prev - 1
    })
  }
  const handleNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0
      return prev === releases.length - 1 ? 0 : prev + 1
    })
  }

  // Crea un array tracks con la información correcta para el reproductor
  const tracks = [
    {
      title: "03:00 AM",
      artist: "Alex Paul",
      cover: "/images/collectibles/0300 am.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeid3cb2bilpjrrxyx6bcwdbstradbbksz4xg3q3a54xkxnafvro47y/03%3A00%20AM.wav"
    },
    {
      title: "Piso 23",
      artist: "Alex Paul",
      cover: "/images/collectibles/piso-23.jpeg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/PISO%2023%20.wav"
    },
    {
      title: "Como Antes",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b2736bb4b7dd585a2e44fa515f79",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeidst4w3d6nnb22dbeqgl3xtzkl5x6qyo4bqf3bi535kffn432t7gy/Como%20antes.wav"
    },
    {
      title: "Clavada",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d00001e02cd7d8269454f92d766a4e301",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Clavada.wav"
    },
    {
      title: "Cuando ya no me duelas",
      artist: "Alex Paul",
      cover: "https://i1.sndcdn.com/artworks-kKvgrzD62yiXjhyj-zxpQQQ-t1080x1080.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Cuando%20ya%20no%20me%20duelas.wav"
    },
    {
      title: "Culpa mía",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b2738efcd0a615a49ed8c0f76967",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Culpa%20mi%CC%81a.wav"
    },
    {
      title: "Entre Nosotros (Feat. Alana & Bulla Beatz)",
      artist: "Alex Paul",
      cover: "/images/collectibles/entre nosotros.gif",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Entre%20nosotros%20%28Feat.%20Alana%20%26%20Bulla%20Beatz%29.wav"
    },
    {
      title: "Me quedo en casa",
      artist: "Alex Paul",
      cover: "https://s.mxmcdn.net/images-storage/albums2/5/8/7/5/8/5/52585785_350_350.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Me%20Quedo%20En%20Casa%20.wav"
    },
    {
      title: "Mi vieja chica",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b273f68588164d23abfe6ba0e68a",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Mi%20Vieja%20Chica.wav"
    },
    {
      title: "Otro Ambiente",
      artist: "Alex Paul",
      cover: "/images/collectibles/otro-ambiente.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Otro%20Ambiente.wav"
    },
    {
      title: "Perdidos",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b273f68588164d23abfe6ba0e68a",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Perdidos.wav"
    },
    {
      title: "¿Por qué lloras por él?",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b27327c945aa997e44fa963811fb",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Por%20queCC%81%20lloras%20por%20e%CC%81l%3F.wav"
    },
    {
      title: "Retrato",
      artist: "Alex Paul",
      cover: "/images/collectibles/retrato.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Retrato.wav"
    },
    {
      title: "Rosa Pastel",
      artist: "Alex Paul",
      cover: "/images/collectibles/rosa-pastel.jpeg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Rosa%20Pastel%20%282%29.wav"
    },
    {
      title: "Shot por mi",
      artist: "Alex Paul",
      cover: "https://i.scdn.co/image/ab67616d0000b273548bf4b88ea991112484a190",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Shot%20Por%20Mi%20.wav"
    },
    {
      title: "Ya no estoy triste",
      artist: "Alex Paul",
      cover: "/images/collectibles/ya-no-estoy-triste-ft-genwav.jpeg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/Ya%20no%20estoy%20triste.wav"
    },
    {
      title: "BFV",
      artist: "Alex Paul",
      cover: "/images/collectibles/bfv.jpg",
      src: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiajnnipzjjcazkzrqee7kvhdnb74ckx2tpby2iwkifmlugs3ljedq/BFV.wav"
    }
  ];

  useEffect(() => {
    if (!playerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
      observer.observe(playerRef.current);
    return () => {
      if (playerRef.current) observer.unobserve(playerRef.current);
    };
  }, []);

  return (
    <>
      <main className="min-h-screen text-white relative" style={{zIndex:10}}>
        {/* Hero Section: Spotify Player */}
        <section className="py-16 px-4 flex flex-col items-center justify-center relative overflow-hidden" style={{minHeight:380}}>
          {/* Background oscuro con efecto de noise/ruido */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            <NoiseBg />
          </div>
          {/* Hero Content */}
            <PlayerUI 
              tracks={tracks} 
              onViewRelease={(collectible) => {
                setModalCollectible(collectible);
                setModalOpen(true);
              }}
            playerRef={playerRef}
            />
        </section>

        {/* Latest Release Section */}
        <section className="py-16 px-4 flex flex-col items-center justify-center border-t border-neutral-800">
          <h2 className="text-center text-xl uppercase tracking-wider mb-12 text-white font-normal">Latest Release</h2>
          <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden border-2 border-indigo-700 shadow-lg mx-auto">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/eZQZFU31lVM?autoplay=1&mute=1&controls=1&loop=1&playlist=eZQZFU31lVM"
              title="Alex Paul - Más reciente canción"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <div style={{color:'#FFD600',fontWeight:600,fontSize:13,textAlign:'center',marginTop:6,opacity:0.85}}>
              Si el video no suena, haz click en el video para activar el audio (algunos navegadores bloquean el autoplay con sonido).
            </div>
          </div>
        </section>

        {/* Next Drops Section */}
        <section className="py-16 px-4 flex flex-col items-center justify-center border-t border-neutral-800">
          <h2 className="text-center text-xl uppercase tracking-wider mb-12 text-white font-normal">Next Drops</h2>
          <div className="w-full max-w-5xl mx-auto px-2 md:px-8">
            <div className="grid grid-cols-3 text-xs uppercase tracking-wider text-neutral-500 mb-4" style={{minWidth:400}}>
              <div>Date</div>
              <div>Title</div>
              <div>Link</div>
            </div>
            <div className="divide-y divide-neutral-800" style={{minWidth:400}}>
              <div className="grid grid-cols-3 py-4 text-sm md:text-base items-center">
                <div className="text-xs md:text-sm">TBD</div>
                <div className="text-xs md:text-sm">Nadie como tú</div>
                <div className="text-xs md:text-sm flex justify-center"><button className="px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse">Pre-save</button></div>
              </div>
              <div className="grid grid-cols-3 py-4 text-sm md:text-base items-center">
                <div className="text-xs md:text-sm">TBD</div>
                <div className="text-xs md:text-sm">Tu Nombre</div>
                <div className="text-xs md:text-sm flex justify-center"><button className="px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse">Pre-save</button></div>
              </div>
              <div className="grid grid-cols-3 py-4 text-sm md:text-base items-center">
                <div className="text-xs md:text-sm">TBD</div>
                <div className="text-xs md:text-sm">Una Mejor</div>
                <div className="text-xs md:text-sm flex justify-center"><button className="px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse">Pre-save</button></div>
              </div>
              <div className="grid grid-cols-3 py-4 text-sm md:text-base items-center">
                <div className="text-xs md:text-sm">TBD</div>
                <div className="text-xs md:text-sm">The Lab Album</div>
                <div className="text-xs md:text-sm flex justify-center"><button className="px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse">Pre-save</button></div>
              </div>
            </div>
          </div>
        </section>

        {/* Releases Section */}
        <section className="py-16 px-4 flex flex-col items-center justify-center border-t border-neutral-800 relative overflow-hidden" style={{minHeight:380}}>
          {/* Background oscuro con efecto de noise/ruido */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}>
            <NoiseBg />
          </div>
          <div className="flex justify-center mb-12 relative z-10">
            <span className="inline-block px-6 py-2 border border-white text-xl uppercase tracking-wider text-white font-normal">Discography</span>
          </div>
          <div className="relative w-full z-10">
            <Carousel opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}>
              <CarouselContent className="flex gap-6 min-w-max releases-marquee">
                {collectibles.concat(collectibles).map((item, idx) => (
                  <CarouselItem key={idx} className="group min-w-[170px] max-w-[200px] aspect-square bg-black rounded-xl shadow-lg overflow-hidden relative border border-neutral-800 transition-all duration-300 transform hover:scale-105 hover:z-10 md:min-w-[300px] md:max-w-md">
                    <img src={item.cover} alt={item.title} className="object-cover w-full h-full absolute inset-0 group-hover:opacity-60 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-bold mb-2 text-center px-2 drop-shadow-lg group-hover:scale-110 transition-transform">{item.title}</span>
                      <span className="text-xs text-white/80 mb-4">Alex Paul</span>
                      <button onClick={() => setModalCollectible(item)} className="flex items-center justify-center gap-1 px-2 py-0.5 bg-white/90 text-black rounded-full text-[9px] uppercase tracking-wider font-bold shadow-md hover:bg-[#ef4444] hover:text-white transition-all duration-200 whitespace-nowrap min-w-[60px] max-w-[90px] leading-tight border border-neutral-300/60 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/60" style={{fontSize:'9px',padding:'2px 8px',lineHeight:'1.1'}}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 3v18l15-9L5 3z" fill="#FFD600"/></svg>
                        View Release
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Top Collectors Section */}
        <section className="py-16 px-4 flex flex-col items-center justify-center border-t border-neutral-800">
          <h2 className="text-center text-xl uppercase tracking-wider mb-12 text-white font-normal">Top Collectors</h2>
          {/* Mobile: scroll horizontal, Desktop: grid */}
          <div className="block md:hidden w-full px-2 space-y-3 top-collectors-mobile">
            {collectors.map((collector, idx) => (
              <div
                key={idx}
                className="flex items-center bg-black/80 rounded-2xl shadow-lg border border-neutral-800 w-full px-3 py-2"
              >
                {/* Avatar */}
                <span className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-800 border-2 border-white/10 shadow-md mr-3">
                  <User className="w-10 h-10 text-neutral-400" />
                </span>
                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-bold text-white text-base truncate max-w-[140px] mb-1">{collector.name}</span>
                  <div className="flex items-center gap-2 text-xs text-white/80 font-semibold mb-1">
                    <svg width='13' height='13' fill='none' viewBox='0 0 24 24'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.5 2.46 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='#FFD600'/></svg>
                    {collector.collected} Collected
                    <svg width='13' height='13' fill='none' viewBox='0 0 24 24'><path d='M12 8v4l3 3' stroke='#ef4444' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/><circle cx='12' cy='12' r='10' stroke='#ef4444' strokeWidth='2'/></svg>
                    {collector.since}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {collectors.map((collector, idx) => (
              <motion.div
                key={idx}
                className="relative flex flex-col items-center bg-black rounded-2xl shadow-lg p-5 border border-neutral-800 min-w-[180px] max-w-[200px] hover:scale-110 transition-all duration-200"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring', bounce: 0.45 }}
                whileHover={{ scale: 1.13, boxShadow: '0 8px 32px #FFD60044' }}
              >
                {/* Ranking badge */}
                <span className={`absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full font-bold text-black text-base shadow-lg ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-neutral-300' : idx === 2 ? 'bg-orange-400' : 'bg-neutral-700 text-white'}`}>{idx + 1}</span>
                <span className="w-28 h-28 flex items-center justify-center rounded-full mb-3 bg-neutral-800 border-4 border-white/10 shadow-md">
                  <User className="w-20 h-20 text-neutral-400" />
                </span>
                <span className="font-bold text-white text-base truncate max-w-[140px] mb-1">{collector.name}</span>
                <span className="text-xs text-white/80 font-semibold mb-1">{collector.collected} Collected</span>
                <span className="text-xs text-neutral-300">{collector.since}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-8 text-center border-t border-neutral-800">
          <motion.div {...fadeIn}>
            <span className="inline-block px-6 py-2 border border-white text-sm uppercase tracking-wider text-white mb-4">Follow Me On</span>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-6 mt-8" {...fadeIn}>
            {/* Social Media Icons */}
            {/* Warpcast (W) */}
            <a href="https://warpcast.com/alexpaul" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Warpcast">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><text x="16" y="23" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">W</text></svg>
            </a>
            {/* Lens (Hey) */}
            <a href="https://hey.xyz/u/alexpaul" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Lens">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="none"/><path d="M16 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="#fff"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/alexpaulmx/" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Instagram">
              {/* Instagram minimal outline logo, white */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="20" height="20" rx="6" stroke="#fff" strokeWidth="2" fill="none"/>
                <circle cx="16" cy="16" r="5" stroke="#fff" strokeWidth="2" fill="none"/>
                <circle cx="22.2" cy="9.8" r="1.2" fill="#fff"/>
              </svg>
            </a>
            {/* Spotify */}
            <a href="https://open.spotify.com/artist/2prfYgiUwtdXGBY4cqhkWg" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Spotify">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3C8.3 3 2 9.3 2 17s6.3 14 14 14 14-6.3 14-14S23.7 3 16 3zm6.2 20.2c-.3.5-1 .7-1.5.4-4.1-2.5-9.2-3-15.1-1.7-.6.1-1.2-.2-1.3-.8-.1-.6.2-1.2.8-1.3 6.4-1.4 12.1-.8 16.6 1.9.5.3.7 1 .5 1.5zm2.1-4.2c-.4.7-1.3.9-2 .5-4.7-2.9-11.9-3.7-17.4-2-.8.2-1.6-.2-1.8-1-.2-.8.2-1.6 1-1.8 6.1-1.8 13.9-1.5 21.5 2.1.9.5 1.1 1.7.6 2.6-.5.9-1.7 1.1-2.6.6z" fill="#fff"/>
              </svg>
            </a>
            {/* Apple Music */}
            <a href="https://music.apple.com/us/artist/alex-paul/1470429100" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Apple Music">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><text x="16" y="21" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff" fontFamily="Arial, Helvetica, sans-serif"></text></svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UC-Uei4OqY8xX5M1YgqGxW4w" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="YouTube">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M27.8 10.2c-.3-1.2-1.2-2.1-2.4-2.4C23.1 7.3 16 7.3 16 7.3s-7.1 0-9.4.5c-1.2.3-2.1 1.2-2.4 2.4C3.7 12.5 3.7 16 3.7 16s0 3.5.5 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.3.5 9.4.5 9.4.5s7.1 0 9.4-.5c1.2-.3 2.1-1.2 2.4-2.4.5-2.3.5-5.8.5-5.8s0-3.5-.5-5.8zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/></svg>
            </a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-xs text-neutral-400 border-t border-neutral-800">
          <div>© 2025 Alex Paul. All rights reserved.</div>
        </footer>

        {/* Modal Release */}
        {modalCollectible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-black rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden relative border-none">
              {/* Close button */}
              <button onClick={() => setModalCollectible(null)} className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition-colors bg-black/60 rounded-full w-12 h-12 flex items-center justify-center z-10 border-2 border-white/10">
                ×
              </button>
              {/* Image */}
              <div className="flex items-center justify-center p-8 md:p-12 bg-black flex-shrink-0 w-full md:w-[380px]">
                <img src={modalCollectible.cover} alt={modalCollectible.title} className="max-h-96 w-auto rounded-2xl shadow-xl border-2 border-white/10" />
              </div>
              {/* Info */}
              <div className="flex flex-col justify-center px-8 py-8 gap-6 w-full">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="uppercase text-xs font-bold bg-neutral-800 text-white px-3 py-1 rounded tracking-widest">Single</span>
                    {/* Puedes agregar año si lo tienes: <span className="uppercase text-xs font-bold bg-neutral-800 text-white px-3 py-1 rounded tracking-widest">2024</span> */}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wider mb-2 text-white">{modalCollectible.title}</h2>
                  {modalCollectible.description && (
                    <p className="text-base text-neutral-300 mb-4 max-w-xl" style={{letterSpacing:1.2}}>{modalCollectible.description}</p>
                  )}
                  <div className="text-sm text-neutral-400 mb-6">ARTIST <span className="text-white font-bold float-right">Alex Paul</span></div>
                </div>
                <div>
                  <div className="text-lg font-extrabold uppercase tracking-wider mb-4 text-white border-2 border-white px-4 py-2 inline-block bg-black">Available On</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {modalCollectible.apple && (
                      <a href={modalCollectible.apple} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-neutral-800 transition-colors shadow">
                        <img src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafkreig5jm7z6gk4w4bshbwljhrxqtdncbbk7bhkwgqoiwo75rsiifxpme" alt="Apple Music" className="w-6 h-6 inline-block align-middle" style={{objectFit:'contain'}} /> Apple
                      </a>
                    )}
                    {modalCollectible.spotify && (
                      <a href={modalCollectible.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-[#1ed760]/80 transition-colors shadow">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Spotify.png/1200px-Spotify.png" alt="Spotify" className="w-6 h-6 inline-block align-middle" style={{objectFit:'contain'}} /> Spotify
                      </a>
                    )}
                    {modalCollectible.youtube && (
                      <a href={modalCollectible.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-[#ff0000]/80 transition-colors shadow">
                        <span className="w-6 h-6 inline-block align-middle"><svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.505 3.5 16 3.5 16 3.5s-3.505 0-5.386.574A2.994 2.994 0 0 0 8.502 6.186C8 8.067 8 12 8 12s0 3.933.502 5.814a2.994 2.994 0 0 0 2.112 2.112C12.495 20.5 16 20.5 16 20.5s3.505 0 5.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.933 24 12 24 12s0-3.933-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/></svg></span> YouTube
                      </a>
                    )}
                    {modalCollectible.deezer && (
                      <a href={modalCollectible.deezer} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-[#ff0000]/80 transition-colors shadow">
                        <span className="w-6 h-6 inline-block align-middle"><svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><rect x="2" y="17" width="3" height="5" fill="#EF5466"/><rect x="6" y="14" width="3" height="8" fill="#F68F26"/><rect x="10" y="10" width="3" height="12" fill="#F9D423"/><rect x="14" y="6" width="3" height="16" fill="#62B36F"/><rect x="18" y="2" width="3" height="20" fill="#3A8BC9"/></svg></span> Deezer
                      </a>
                    )}
                    {modalCollectible.amazon && (
                      <a href={modalCollectible.amazon} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-[#ff9900]/80 transition-colors shadow">
                        <span className="w-6 h-6 inline-block align-middle"><svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6"><rect width="32" height="32" rx="6" fill="#FF9900"/><text x="16" y="21" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">a</text></svg></span> Amazon
                      </a>
                    )}
                    {/* Fallback smartlink */}
                    {!modalCollectible.spotify && !modalCollectible.apple && !modalCollectible.youtube && !modalCollectible.amazon && !modalCollectible.deezer && modalCollectible.smartlink && (
                      <a href={modalCollectible.smartlink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 border-2 border-neutral-700 rounded-none font-bold uppercase text-white text-base tracking-wider hover:bg-neutral-800 transition-colors shadow">
                        All Platforms
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <a href={modalCollectible.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center px-6 py-3 bg-yellow-400 text-black font-bold uppercase rounded shadow hover:bg-yellow-300 transition-colors text-lg">Collect</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {showFloating && <FloatingPlayer />}
    </>
  );
}

const tourDates = [
  { date: "APR 12", city: "BERLIN, GERMANY", venue: "GRETCHEN, FRIEDRICHSHAIN DISTRICT" },
  { date: "APR 17", city: "LONDON, UNITED KINGDOM", venue: "THE ELECTRIC BALLROOM" },
  { date: "APR 24", city: "PARIS, FRANCE", venue: "LA BELLEVILLOISE, RUE BOYER, 20TH ARRONDISSEMENT" },
  { date: "MAY 8", city: "AMSTERDAM, NETHERLANDS", venue: "MELKWEG, LIJNBAANSGRACHT" },
  { date: "MAY 15", city: "BERLIN, ITALY", venue: "SANTERIA TOSCANA 31" },
  { date: "JUN 3", city: "TORONTO, CANADA", venue: "VELVET UNDERGROUND, QUEEN STREET WEST" },
  { date: "JUN 14", city: "NEW YORK, NY, USA", venue: "ELSEWHERE, BUSHWICK, BROOKLYN" },
  { date: "JUN 22", city: "LOS ANGELES, CA, USA", venue: "ECHO, ECHOPLEX LA" },
]

// Array de collectors para el carrusel
const collectors = [
  { name: "dehyad", avatar: "/images/collectors/dehyad.jpg", collected: 45, since: "Since Jun 2024" },
  { name: "Rohit Kumar", avatar: "/images/collectors/rohit.jpg", collected: 27, since: "Since Oct 2024" },
  { name: "0xaa2...824e", avatar: "/images/collectors/oxaa.jpg", collected: 21, since: "Since Jan 2024" },
  { name: "sweetman.eth", avatar: "/images/collectors/sweetman.jpg", collected: 19, since: "Since Feb 2023" },
  { name: "0xdad...2ac5", avatar: "/images/collectors/0xdad.jpg", collected: 18, since: "Since Jan 2024" },
  { name: "big coke", avatar: "/images/collectors/bigcoke.jpg", collected: 16, since: "Since Jun 2023" },
  { name: "Bilansely", avatar: "/images/collectors/bilansely.jpg", collected: 15, since: "Since Jun 2023" },
  { name: "Investor felix", avatar: "/images/collectors/investorfelix.jpg", collected: 14, since: "Since Feb 2023" },
  { name: "Alex Paul", avatar: "/images/collectors/alexpaul.jpg", collected: 13, since: "Since Feb 2023" },
  { name: "MetaMu", avatar: "/images/collectors/metamu.jpg", collected: 11, since: "Since Apr 2023" },
  // ...agrega el resto de los collectors de la imagen aquí...
]

function PlayerUI({ 
  tracks, 
  onViewRelease,
  playerRef
}: { 
  tracks: {title:string,artist:string,cover:string,src:string, album?:string, genres?:string[], year?:string, description?:string}[],
  onViewRelease: (collectible: Release) => void,
  playerRef: React.RefObject<HTMLDivElement>
}) {
  const {
    current,
    playing,
    progress,
    duration,
    volume,
    loading,
    error,
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
  } = usePlayer();

  // Inicializar tracks en el contexto
  React.useEffect(() => {
    setTracks(tracks);
  }, [tracks, setTracks]);

  return (
    <>
      <div ref={playerRef} className="w-full max-w-4xl bg-neutral-950 rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-neutral-800">
        {/* Cover */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 bg-neutral-900 w-full md:w-72">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden shadow border border-neutral-800 mb-4 relative">
            <img 
              src={tracks[current].cover} 
              alt={tracks[current].title} 
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "/images/default-cover.jpg";
              }}
            />
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
        {/* Info & Controls */}
        <div className="flex-1 flex flex-col justify-between p-6 gap-4">
          <div>
            <div className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-2 truncate">{tracks[current].title}</div>
            <div className="text-base text-neutral-400 mb-2 truncate">{tracks[current].artist}</div>
            {error && (
              <div className="text-red-500 text-sm mb-2">{error}</div>
            )}
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-neutral-500 min-w-[36px] text-right">{formatTime(progress)}</span>
            <input type="range" min={0} max={duration} value={progress} onChange={handleSeek} className="flex-1 accent-red-500 h-1" />
            <span className="text-xs text-neutral-500 min-w-[36px]">{formatTime(duration)}</span>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-3 mb-2">
            <button onClick={handlePrev} className="bg-transparent text-red-500 rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-800 transition-colors" aria-label="Prev"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button onClick={handlePlayPause} className="bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow transition-colors" aria-label="Play/Pause">
              {loading ? (
                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : playing ? (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="20"/><rect x="18" y="4" width="4" height="20"/></svg>
              ) : (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6,4 24,14 6,24"/></svg>
              )}
            </button>
            <button onClick={handleNext} className="bg-transparent text-red-500 rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-neutral-800 transition-colors" aria-label="Next"><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
            <span className="text-xs text-neutral-400 ml-2">Vol</span>
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} className="accent-red-500 h-1" style={{width:80}} />
          </div>
          {/* Song list */}
          <div className="w-full flex flex-col gap-1 bg-neutral-900/80 rounded-lg p-2 border border-neutral-800 max-h-48 overflow-y-auto mt-2">
            {tracks.map((t, i) => (
              <button 
                key={i} 
                onClick={()=>{
                  setCurrent(i);
                  setPlaying(true);
                }} 
                className={`flex items-center justify-between px-3 py-2 rounded transition-colors text-left text-sm ${i===current ? 'bg-red-600 text-white font-bold' : 'hover:bg-neutral-800 text-neutral-300'}`}
              >
                <span className="truncate">{t.title}</span>
                <span className="text-xs ml-2">{t.artist}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
