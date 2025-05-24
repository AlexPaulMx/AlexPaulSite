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
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import { USDC_ADDRESS, USDC_ABI, parseUSDCAmount } from "./utils/usdc";
import FundingProgress from "./components/FundingProgress";
import DonationModal from "./components/DonationModal";
import SupportersList from "./components/SupportersList";
import { createClient } from "@supabase/supabase-js";

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

function trackToCollectible(track: {title:string,artist:string,cover:string,src:string, album?:string, genres?:string[], year?:string, description?:string}) {
  const collectible = collectibles.find(c => c.title.trim().toLowerCase() === track.title.trim().toLowerCase());
  if (collectible) {
    return collectible;
  }
  return {
    title: track.title,
    url: '',
    cover: track.cover,
    description: track.description
  };
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const { address } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationCurrency, setDonationCurrency] = useState<"USDC" | "ETH">("ETH");
  const [displayName, setDisplayName] = useState("");
  const [comment, setComment] = useState("");
  const [collectors, setCollectors] = useState<Array<{
    name: string;
    avatar: string;
    collected: number;
    since: string;
  }>>([]);
  const [isLoadingCollectors, setIsLoadingCollectors] = useState(true);

  // ETH Donation
  const { write: sendEth, data: ethData } = useContractWrite({
    address: "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8",
    abi: [],
    functionName: "receive",
  });

  // USDC Donation
  const { write: sendUSDC, data: usdcData } = useContractWrite({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "transfer",
  });

  // Wait for transaction
  const { isLoading: isEthLoading } = useWaitForTransaction({
    hash: ethData?.hash,
  });

  const { isLoading: isUsdcLoading } = useWaitForTransaction({
    hash: usdcData?.hash,
  });

  // Handle donation submission
  const handleDonate = async () => {
    if (!address) return;

    try {
      if (donationCurrency === "ETH") {
        await sendEth({
          value: parseEther(donationAmount),
        });
      } else {
        await sendUSDC({
          args: [
            "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8",
            parseUSDCAmount(donationAmount),
          ],
        });
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error sending donation:", error);
    }
  };

  // Save supporter info
  const handleSaveSupporter = async (data: { displayName: string; comment: string }) => {
    if (!address) return;

    try {
      const { error } = await supabase.from("supporters").insert({
        address,
        display_name: data.displayName,
        comment: data.comment,
        amount: parseFloat(donationAmount),
        currency: donationCurrency,
      });

      if (error) throw error;

      setDisplayName(data.displayName);
      setComment(data.comment);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving supporter info:", error);
    }
  };

  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const { data, error } = await supabase
          .from("supporters")
          .select("display_name, amount, created_at")
          .order("amount", { ascending: false })
          .limit(10);

        if (error) throw error;

        if (data) {
          setCollectors(data.map((s, i) => ({
            name: s.display_name,
            avatar: `/images/collectors/collector${i + 1}.jpg`,
            collected: s.amount,
            since: `Since ${new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
          })));
        }
      } catch (error) {
        console.error("Error fetching collectors:", error);
      } finally {
        setIsLoadingCollectors(false);
      }
    };

    fetchCollectors();
  }, []);

  return (
    <main className="min-h-screen bg-[#101014] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Support The Lab's Journey
          </h1>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Join us in creating something extraordinary. Your support helps us push the boundaries of what's possible in music and technology.
          </p>

          <FundingProgress />

          <div className="mt-12 p-8 bg-black/30 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                  <select
                    value={donationCurrency}
                    onChange={(e) => setDonationCurrency(e.target.value as "USDC" | "ETH")}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleDonate}
                disabled={!address || isEthLoading || isUsdcLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#101014] shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!address
                  ? "Connect Wallet"
                  : isEthLoading || isUsdcLoading
                  ? "Processing..."
                  : "Donate Now"}
              </button>
            </div>
          </div>

          <SupportersList />
        </div>
      </div>

      <DonationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveSupporter}
        defaultDisplayName={displayName}
        address={address || ""}
        amount={parseFloat(donationAmount)}
        currency={donationCurrency}
      />
      </main>
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
];

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
          <button
            onClick={() => onViewRelease(trackToCollectible(tracks[current]))}
            className="mt-2 px-4 py-1 rounded-full bg-red-600 text-white text-sm font-semibold shadow hover:bg-red-700 transition-colors"
          >
            View Release
          </button>
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
