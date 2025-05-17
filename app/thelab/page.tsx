"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { 
  Music, 
  Users, 
  Trophy, 
  Package, 
  MessageCircle, 
  DollarSign, 
  Globe, 
  Heart, 
  Star, 
  Gift,
  X,
  Menu,
  Info,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  PartyPopper,
  Map,
  MapPin,
  ShoppingBag,
  Disc,
  GripVertical,
  Instagram,
  Twitter,
  Youtube,
  Music2
} from "lucide-react";
import Image from "next/image";

type ProjectPoint = {
  id: string;
  title: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  content: React.ReactNode;
};

export default function TheLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [progressPosition, setProgressPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();

  // Meta de crowdfunding: $10,000 USD
  const goal = 10000;
  const currentAmount = 0; // Actualizar con integración real
  const progress = (currentAmount / goal) * 100;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projectPoints: ProjectPoint[] = [
    {
      id: "intro",
      title: "About The Lab",
      icon: <Info className="w-6 h-6 text-blue-400" />,
      position: { x: 20, y: 20 },
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Hi, my name is Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Right now, I'm pouring my heart and mind into an audiovisual album titled "The Lab." This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators involved in making this vision a reality.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            I plan to release this album independently, without the backing of a major record label. To bring this vision to life, I'm aiming to raise $10K USD to cover the album's production costs.
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            This album will showcase a multicultural soundscape, introducing my first English songs and experimenting with various genres, including pop, hip hop/R&B, synthpop, Latin rhythms, and house.
          </p>
          <div className="flex items-center justify-center space-x-6 pt-4">
            <a
              href="https://www.instagram.com/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://open.spotify.com/artist/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Music2 className="w-6 h-6" />
            </a>
          </div>
        </div>
      )
    },
    {
      id: "rewards",
      title: "Rewards",
      icon: <Gift className="w-6 h-6 text-red-400" />,
      position: { x: 60, y: 30 },
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Top Supporter</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Executive Producer Credits
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Exclusive Merch
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Top 5 Supporters</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Executive Producer Credits
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Exclusive Merch
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Full Album CD
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Top 10 Supporters</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                The Lab Crew Character
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Full Album Airdrop
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">All Contributors</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                The Lab Gang Badge
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Release Party Invitation
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "why-support",
      title: "Why Support",
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      position: { x: 40, y: 60 },
      content: (
        <div className="space-y-6">
          <ol className="list-decimal text-gray-200 space-y-4 ml-6 text-lg">
            <li><b>Empowerment of Independent Artists:</b> Your contribution helps support independent creators, allowing us to thrive outside traditional music industry constraints.</li>
            <li><b>Join a Creative Community:</b> When you contribute, you're not just donating—you're becoming part of a community that values collaboration and creativity.</li>
            <li><b>Exclusive Access:</b> As a supporter, you'll gain exclusive insights into the creative process, behind-the-scenes content, and the opportunity to engage with the project on a personal level.</li>
            <li><b>Cool Rewards:</b> I've lined up some awesome rewards to show my appreciation, connecting you directly to the music and the journey.</li>
            <li><b>Make a F*cking Party!</b> If we reach our goal, you'll be invited to an exclusive release party!</li>
          </ol>
        </div>
      )
    },
    {
      id: "funds",
      title: "Funds Allocation",
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      position: { x: 80, y: 40 },
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Production Costs</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Studio Rent
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Session Musician Fees
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Equipment Rental/Purchase
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Music Videos Production
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Distribution and Manufacturing</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Physical Distribution
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Licensing and Copyright
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Promotion and Distribution
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "nfts",
      title: "Music NFTs",
      icon: <Disc className="w-6 h-6 text-purple-400" />,
      position: { x: 70, y: 70 },
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-white">The Lab NFTs</h3>
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/nft1.jpg"
                    alt="The Lab NFT"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-lg">The Lab #1</h4>
                  <p className="text-gray-300">Exclusive access to the first track of the album</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-white">NFT Benefits</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                  Exclusive Access to Digital Content
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                  Royalty Sharing
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                  Special Edition Tracks
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-purple-400" />
                  Behind-the-scenes Content
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "merch",
      title: "Merchandise",
      icon: <ShoppingBag className="w-6 h-6 text-orange-400" />,
      position: { x: 30, y: 80 },
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Limited Edition Collection</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Exclusive T-Shirts
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Custom Hoodies
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Collectible Pins
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Signed Posters
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fondo con efecto noise */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/noise.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Contenedor principal con padding para móvil */}
      <div className="relative z-10 px-4 py-8 md:px-8 md:py-12">
        {/* Header con mejor espaciado en móvil */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white">The Lab</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-gray-300 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Contenedor de secciones con mejor espaciado en móvil */}
        <div className="space-y-8 md:space-y-12">
          {/* About The Lab con mejor espaciado */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 md:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">About The Lab</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Welcome to The Lab, where innovation meets creativity. This is your exclusive space to explore, experiment, and experience the future of music and technology.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-4 md:pt-6">
              <a
                href="https://www.instagram.com/alexpaulmx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://twitter.com/alexpaulmx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://www.youtube.com/@alexpaulmx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://open.spotify.com/artist/alexpaulmx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Music2 className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          {/* The Lab Progress con mejor diseño para móvil */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 md:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">The Lab Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-black/20 rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Music NFTs</h3>
                  <span className="text-sm text-gray-400">3/5</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Community</h3>
                  <span className="text-sm text-gray-400">2/5</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Music NFTs con mejor diseño para móvil */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 md:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Music NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projectPoints.map((point, index) => (
                <div key={index} className="bg-black/20 rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src="/images/nft1.jpg"
                      alt={point.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-sm text-gray-400">{point.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community con mejor diseño para móvil */}
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-6 md:p-8 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Community</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projectPoints.map((point, index) => (
                <div key={index} className="bg-black/20 rounded-lg p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      {point.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{point.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menú lateral con mejor diseño para móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-black/95 backdrop-blur-lg z-50 p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {projectPoints.map((point, index) => (
                <a
                  key={index}
                  onClick={() => {
                    setSelectedPoint(point.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <span>{point.title}</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 