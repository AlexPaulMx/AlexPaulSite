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
  Music2,
  User
} from "lucide-react";
import Image from "next/image";
import NoiseBg from "@/components/NoiseBg";
import type { PanInfo } from 'framer-motion';
import DonationWidget from "../components/DonationWidget";

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
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [progressPosition, setProgressPosition] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const dragControls = useDragControls();
  const [contentCardPosition, setContentCardPosition] = useState<{x: number, y: number} | null>(null);

  // Meta de crowdfunding: $10,000 USD
  const goal = 10000;
  const currentAmount = 0; // Actualizar con integración real
  const progress = (currentAmount / goal) * 100;

  // Estado para el acordeón móvil (solo una sección a la vez)
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Datos de ejemplo para supporters y top supporters
  const supporters = [
    { name: 'Alice', amount: 500 },
    { name: 'Bob', amount: 350 },
    { name: 'Charlie', amount: 200 },
    { name: 'Diana', amount: 120 },
    { name: 'Eve', amount: 100 },
    { name: 'Frank', amount: 80 },
  ];
  const topSupporters = supporters.slice(0, 3);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
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

  useEffect(() => {
    if (selectedPoint && !isMobile) {
      const centerX = window.innerWidth / 2 - 240; // max-w-md/2 aprox
      const centerY = window.innerHeight / 2 - 200; // altura estimada/2
      setContentCardPosition({ x: centerX, y: centerY });
    }
  }, [selectedPoint, isMobile]);

  const projectPoints: ProjectPoint[] = [
    {
      id: "intro",
      title: "About The Lab",
      icon: <Info className="w-6 h-6 text-blue-400" />,
      position: { x: 20, y: 20 },
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-2xl font-extrabold text-center text-white tracking-wide mb-2">ABOUT THE LAB</h2>
          </div>
          <div className="text-gray-300 text-base leading-snug text-center">
            <p className="mb-2">Hi, my name is Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.</p>
            <p className="mb-2">Right now, I'm pouring my heart and mind into an audiovisual album titled "The Lab." This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators involved in making this vision a reality.</p>
            <p className="mb-2">I plan to release this album independently, without the backing of a major record label. To bring this vision to life, I'm aiming to raise $10K USD to cover the album's production costs.</p>
            <p>This album will showcase a multicultural soundscape, introducing my first English songs and experimenting with various genres, including pop, hip hop/R&B, synthpop, Latin rhythms, and house.</p>
        </div>
          <div className="flex justify-center gap-6 pt-2 pb-1">
            <a
              href="https://www.instagram.com/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="https://www.youtube.com/@alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Youtube className="w-8 h-8" />
            </a>
            <a
              href="https://open.spotify.com/artist/alexpaulmx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Music2 className="w-8 h-8" />
            </a>
            </div>
        </div>
      )
    },
    {
      id: "rewards",
      title: "Rewards",
      icon: <Gift className="w-6 h-6 text-red-400" />,
      position: { x: 75, y: 30 },
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
      position: { x: 25, y: 75 },
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
                Studio Rent: Renting a studio for recording
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Session Musician Fees: Fees for additional musicians
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Equipment Rental/Purchase: Specialized equipment
              </li>
            </ul>
            </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Music Videos</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Director and Production Team
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Location Fees
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Set Design and Props
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Costume and Makeup
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Post-Production
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
                Promotion and Marketing
              </li>
                </ul>
              </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Release Party</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Event Costs: Venue, catering, and expenses
              </li>
                </ul>
              </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Technologies</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Mint Site Development
              </li>
            </ul>
            </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Merchandise Design</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                First Line of Limited-Edition Clothing
              </li>
            </ul>
          </div>
            </div>
      )
    },
    {
      id: "merch",
      title: "Merchandise",
      icon: <ShoppingBag className="w-6 h-6 text-orange-400" />,
      position: { x: 15, y: 80 },
      content: (
        <div className="space-y-6">
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Coming Soon</h3>
            <p className="text-gray-300">
              We're working on something special for you. Stay tuned!
            </p>
            </div>
        </div>
      )
    }
  ];

  const handleDragEnd = (id: string, info: any) => {
    setCardPositions(prev => ({
      ...prev,
      [id]: {
        x: (prev[id]?.x || 0) + info.offset.x,
        y: (prev[id]?.y || 0) + info.offset.y
      }
    }));
  };

  const handleContentCardDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    setContentCardPosition(pos => {
      if (!pos) return pos;
      return {
        x: pos.x + info.offset.x,
        y: pos.y + info.offset.y
      };
    });
  };

  return (
    <div className="min-h-[180vh] bg-black text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        {/*
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
        {/* Noise Effect igual que Home */}
        <NoiseBg />
          </div>

      {/* Cursor Effect - Solo en desktop */}
      {isMobile === false && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div
            className="absolute w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
            style={{ 
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}

      {/* Mobile Design */}
      {isMobile ? (
        <div className="relative z-10 min-h-screen">
          {/* Mobile Header */}
          <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg z-50 p-4 border-b border-white/10">
            <div className="flex items-center justify-center relative gap-2">
              <Image
                src="/images/thelab-logo.png"
                alt="The Lab Logo"
                width={120}
                height={60}
                className="object-contain h-10 w-auto drop-shadow-lg"
                priority
              />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-gray-300 transition-colors absolute right-0"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            </div>

          {/* Mobile Content */}
          <div className="pt-20 pb-8 px-4 space-y-4">
            {/* Progress Section */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-2 shadow-2xl shadow-black/40"
            >
              <div className="flex items-center gap-2 mb-4">
                <Music className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">The Lab Progress</h2>
          </div>
              <div className="space-y-4">
                <div className="w-full flex justify-center mb-4">
                  <video src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4" controls autoPlay loop className="rounded-xl w-full max-w-md shadow-lg" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Goal: ${goal.toLocaleString()} USD</span>
                    <span>Raised: ${currentAmount.toLocaleString()} USD</span>
                  </div>
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                    />
                  </div>
                </div>
                <DonationWidget />
            </div>
                    </motion.div>

            {/* Accordion Sections */}
            {projectPoints.map((point, idx) => (
              <motion.div
                key={point.id}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 * Math.random() }}
                className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 mb-2 shadow-2xl shadow-black/40"
              >
                <button
                  className="w-full flex items-center justify-between p-4 focus:outline-none"
                  onClick={() => setOpenSection(openSection === point.id ? null : point.id)}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        y: [0, -5, 0, 5, 0],
                        x: [0, 2, 0, -2, 0]
                      }}
                      transition={{
                        duration: 2 + (idx % 2),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.1
                      }}
                      className="p-2 bg-red-500/20 rounded-lg"
                    >
                      {point.icon}
                    </motion.div>
                    <h2 className="text-lg font-bold text-white">{point.title}</h2>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white transition-transform ${openSection === point.id ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openSection === point.id ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'}`}
                  style={{background: openSection === point.id ? 'rgba(0,0,0,0.2)' : 'transparent'}}>
                  {openSection === point.id && (
                    <div className="text-gray-300 text-sm">
                      {point.content}
          </div>
        )}
              </div>
                </motion.div>
            ))}
                </div>
                </div>
      ) : (
        // Desktop Design (mantener el diseño original)
        <>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed top-4 left-4 z-50 p-2 bg-gray-800/80 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm z-40 p-4"
              >
                <div className="space-y-4">
                  {projectPoints.map((point, idx) => (
                    <button
                      key={point.id}
                      onClick={() => {
                        setSelectedPoint(point.id);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0, 5, 0],
                          x: [0, 2, 0, -2, 0]
                        }}
                        transition={{
                          duration: 2 + (idx % 2),
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.1
                        }}
                      >
                        {point.icon}
                      </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/20">
              <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5" />
              {/* Noise Effect */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-50" />
              </div>
                </div>

            {/* Project Points */}
            {projectPoints.map((point, idx) => (
              <motion.button
                key={point.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                drag
                dragControls={dragControls}
                dragMomentum={false}
                className="absolute z-30"
                style={{
                  left: `${point.position.x}%`,
                  top: `calc(${point.position.y}% + 60px)`, // margen superior extra para no tocar supporters
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedPoint(point.id)}
              >
                <motion.div
                  animate={{ y: [0, -14, 0, 14, 0] }}
                  transition={{
                    duration: 5 + (idx % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-500/50 shadow-2xl shadow-black/40">
                    {point.icon}
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0, 10, 0] }}
                    transition={{
                      duration: 5 + (idx % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.3
                    }}
                    className="mt-2 whitespace-nowrap text-sm font-medium text-gray-300"
                  >
                    {point.title}
                  </motion.div>
                </motion.div>
              </motion.button>
            ))}

            {/* Título superior */}
            <div className="w-full flex justify-center mt-12">
              <Image
                src="/images/thelab-logo.png"
                alt="The Lab Logo"
                width={340}
                height={180}
                className="object-contain h-32 w-auto drop-shadow-lg"
                priority
              />
            </div>

            {/* Progress Card como sección superior */}
            <div className="w-full flex flex-col items-center mt-8 mb-8 gap-4 pb-16">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-black/40 border border-gray-700 px-6 py-8"
              >
                <div className="space-y-4">
                  <div className="w-full flex justify-center mb-4">
                    <video src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4" controls autoPlay loop className="rounded-xl w-full max-w-md shadow-lg" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Goal: ${goal.toLocaleString()} USD</span>
                      <span>Raised: ${currentAmount.toLocaleString()} USD</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      />
                    </div>
                  </div>
                  <DonationWidget />
                </div>
              </motion.div>
              {/* Supporters Card */}
              <div className="w-full max-w-md bg-gradient-to-br from-gray-950/95 to-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/40 border border-yellow-200/20 px-6 py-6 sticky top-[120px] z-10 overflow-auto max-h-[520px]">
                {/* Header minimalista */}
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <h3 className="text-lg font-bold tracking-widest text-yellow-100 uppercase">Supporters</h3>
                </div>
                <div className="border-b border-yellow-100/10 mb-4" />
                {/* Top Supporters Podium */}
                <div className="flex justify-center items-end gap-2 mb-6">
                  {topSupporters.map((s, i) => {
                    const podium = [
                      'from-yellow-400 to-yellow-200', // oro
                      'from-gray-300 to-gray-100',      // plata
                      'from-orange-700 to-yellow-400'   // bronce
                    ];
                    const size = i === 0 ? 'h-24 w-20' : 'h-20 w-16';
                    const textSize = i === 0 ? 'text-xl' : 'text-base';
                    const fontWeight = i === 0 ? 'font-extrabold' : 'font-bold';
                    return (
                      <div key={s.name} className={`flex flex-col items-center justify-end relative ${i === 0 ? 'z-10' : 'opacity-90'}` }>
                        <div className={`rounded-xl shadow-lg border-2 border-yellow-200/40 bg-gradient-to-b ${podium[i]} flex flex-col items-center justify-center ${size} mb-2 relative animate-pulse`}
                          style={{ boxShadow: i === 0 ? '0 0 24px 4px #FFD70055' : undefined }}>
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-black rounded-full px-2 py-0.5 text-xs font-bold border-2 border-yellow-400 shadow">#{i+1}</span>
                          <span className={`text-black ${textSize} ${fontWeight} drop-shadow`}>{s.name}</span>
                          <span className="text-yellow-900 text-xs font-mono mt-1">${s.amount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Ranking de todos los supporters */}
                <div>
                  <span className="text-xs text-gray-400 font-semibold block mb-1 tracking-wide">Ranking</span>
                  <ul className="divide-y divide-yellow-100/10 max-h-[140px] overflow-y-auto pr-1">
                    {supporters.map((s, i) => (
                      <li key={s.name} className="flex items-center gap-3 py-2 hover:bg-yellow-100/5 transition rounded-lg">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-yellow-300 text-black' : i === 1 ? 'bg-gray-300 text-black' : i === 2 ? 'bg-orange-700 text-white' : 'bg-gray-800 text-yellow-200'}`}>{s.name[0]}</span>
                        <span className="flex-1 font-medium text-gray-100">{s.name}</span>
                        <span className="text-xs text-yellow-200 font-mono">${s.amount}</span>
                        <span className="text-[10px] text-yellow-400 font-bold">#{i+1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Content Panel */}
            <AnimatePresence>
              {selectedPoint && !isMobile && contentCardPosition && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  drag
                  dragMomentum={false}
                  onDragEnd={handleContentCardDragEnd}
                  dragConstraints={{
                    left: 0,
                    top: 0,
                    right: window.innerWidth - 100,
                    bottom: window.innerHeight - 100
                  }}
                  style={{
                    position: 'fixed',
                    left: contentCardPosition.x,
                    top: contentCardPosition.y,
                    zIndex: 50
                  }}
                  className="w-[80%] max-w-md bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl shadow-black/40 border border-gray-700 p-3 md:p-4 max-h-[70vh] overflow-y-auto"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      {projectPoints.find(p => p.id === selectedPoint)?.icon}
                      {projectPoints.find(p => p.id === selectedPoint)?.title}
                    </h2>
                    <button
                      onClick={() => { setSelectedPoint(null); setContentCardPosition(null); }}
                      className="p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {projectPoints.find(p => p.id === selectedPoint)?.content}
                  </div>
                </motion.div>
              )}
              {/* Mobile: igual que antes, sin drag */}
              {selectedPoint && isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'fixed',
                  }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-2xl shadow-black/40 border border-gray-700 z-50 p-4 md:p-6 max-h-[80vh] overflow-y-auto"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      {projectPoints.find(p => p.id === selectedPoint)?.icon}
                      {projectPoints.find(p => p.id === selectedPoint)?.title}
                    </h2>
                    <button
                      onClick={() => { setSelectedPoint(null); setContentCardPosition(null); }}
                      className="p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {projectPoints.find(p => p.id === selectedPoint)?.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
        )}
    </div>
  );
} 