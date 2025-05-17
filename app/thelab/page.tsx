"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Disc
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
            Hi, my name is Alejandro A.k.a. Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
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
        </div>
      )
    },
    {
      id: "rewards",
      title: "Rewards",
      icon: <Gift className="w-6 h-6 text-yellow-400" />,
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      </div>

      {/* Cursor Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800/80 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm z-40 p-4"
          >
            <div className="space-y-4">
              {projectPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => {
                    setSelectedPoint(point.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-lg"
                >
                  {point.icon}
                  <span>{point.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Map */}
      <div className="relative w-full h-screen">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
        </div>

        {/* Project Points */}
        {projectPoints.map((point) => (
          <motion.button
            key={point.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className={`absolute ${isMobile ? 'hidden' : ''}`}
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => setSelectedPoint(point.id)}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-500/50 shadow-lg shadow-blue-500/20">
                {point.icon}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-300">
                {point.title}
              </div>
            </motion.div>
          </motion.button>
        ))}

        {/* Content Panel */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed ${isMobile ? 'bottom-0 left-0 right-0' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl'} bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 z-50 p-6`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {projectPoints.find(p => p.id === selectedPoint)?.icon}
                  {projectPoints.find(p => p.id === selectedPoint)?.title}
                </h2>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {projectPoints.find(p => p.id === selectedPoint)?.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Progress Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 z-50 transform hover:scale-105 transition-transform duration-300"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Music className="w-6 h-6 text-blue-400" />
              The Lab Progress
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Goal: ${goal.toLocaleString()} USD</span>
              <span>Raised: ${currentAmount.toLocaleString()} USD</span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Support Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 