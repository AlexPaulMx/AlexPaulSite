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
  PartyPopper
} from "lucide-react";

type SectionType = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

type SectionsType = {
  [key: string]: SectionType;
};

export default function TheLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSection, setCurrentSection] = useState<keyof SectionsType>("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const sections: SectionsType = {
    about: {
      title: "About The Lab",
      icon: <Info className="w-6 h-6" />,
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
    rewards: {
      title: "Rewards",
      icon: <Gift className="w-6 h-6" />,
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
    funding: {
      title: "Funding Details",
      icon: <DollarSign className="w-6 h-6" />,
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
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-white">Technologies</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Mint Site Development
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                Merchandise Design
              </li>
            </ul>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/hero-background.svg')] bg-cover bg-center opacity-5" />

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
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentSection(key as keyof SectionsType);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-lg"
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Music className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl md:text-3xl font-bold">The Lab</h1>
            </div>
            {!isMobile && (
              <div className="flex space-x-4">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentSection(key as keyof SectionsType)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentSection === key
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="bg-gray-800/30 rounded-xl backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-center space-x-2 mb-6">
              {sections[currentSection].icon}
              <h2 className="text-xl md:text-2xl font-bold">{sections[currentSection].title}</h2>
            </div>
            {sections[currentSection].content}
          </div>
        </div>
      </div>

      {/* HERO / INTRO */}
      <section className="relative px-4 py-16 md:py-24 flex flex-col items-center text-center bg-gradient-to-b from-black/80 to-transparent">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          The Lab
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-2xl text-lg md:text-2xl text-gray-200 mb-8">
          Hi, my name is Alejandro A.k.a. Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="max-w-2xl text-base md:text-lg text-gray-400 mb-4">
          Right now, I'm pouring my heart and mind into an audiovisual album titled <b>"The Lab"</b>. This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators involved in making this vision a reality.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }} className="max-w-2xl text-base md:text-lg text-gray-400 mb-4">
          I plan to release this album independently, without the backing of a major record label. To bring this vision to life, I'm aiming to raise <b>$10K USD</b> to cover the album's production costs. While a single release can be a significant investment, creating a full album demands even more resources. Your support will help us achieve this goal more effectively, allowing me to break free from industry conventions, sustain my indie career, and share my music with the world.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="max-w-2xl text-base md:text-lg text-gray-400 mb-4">
          This album will showcase a multicultural soundscape, introducing my first English songs and experimenting with experimental genres, pop, hip hop/R&B, synthpop, latin rhythms, and house. By blending crypto-native platforms with traditional music services, I aim to ensure my music reaches a global audience while also onboarding new users to the blockchain.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.7 }} className="max-w-2xl text-base md:text-lg text-gray-400">
          Every contribution counts, and I've lined up some amazing rewards to show my appreciation.
        </motion.p>
      </section>

      {/* PROGRESS BAR & SUPPORT BUTTON */}
      <section className="w-full flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Goal: ${goal.toLocaleString()} USD</span>
            <span>Raised: ${currentAmount.toLocaleString()} USD</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Support Now
          </motion.button>
        </div>
      </section>

      {/* REWARDS */}
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2"><Gift className="w-8 h-8 text-yellow-400" /> Rewards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800/70 rounded-xl p-6 flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Trophy className="w-6 h-6 text-blue-400" /> Top Supporter</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Executive Producer Credits: Your name will shine in the album credits—how cool is that?</li>
              <li>Exclusive Merch: Be the first to rock my first line of limited-edition merch.</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6 flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Star className="w-6 h-6 text-purple-400" /> Top 5 Supporters</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Executive Producer Credits: You'll be recognized in one track of the album credits for your support.</li>
              <li>Exclusive Merch: Get some of our first-line merch.</li>
              <li>Full Album CD: Receive a physical copy of the album on CD.</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6 flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Users className="w-6 h-6 text-pink-400" /> Top 10 Supporters</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>The Lab Crew Character: Become part of the story with your very own character!</li>
              <li>Full Album Airdrop: Have the album delivered right to your wallet.</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6 flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Heart className="w-6 h-6 text-green-400" /> All Contributors</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>The Lab Gang Badge: A special badge airdrop to celebrate your support.</li>
              <li>Release Party Invitation: If we reach our goal, you'll be invited to an exclusive release party!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FUNDS ALLOCATION */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2"><DollarSign className="w-8 h-8 text-green-400" /> Funds Allocation</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800/70 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Production Costs</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Studio Rent: Renting a studio for recording.</li>
              <li>Session Musician Fees: Fees for additional musicians if required.</li>
              <li>Equipment Rental/Purchase: Renting or purchasing specialized equipment.</li>
              <li>Music Videos: <br />
                <ul className="ml-4 list-disc">
                  <li>Director and Production Team</li>
                  <li>Location Fees</li>
                  <li>Set Design and Props</li>
                  <li>Costume and Makeup</li>
                  <li>Post-Production</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Distribution and Manufacturing</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Physical Distribution: Budget for manufacturing and distribution costs.</li>
              <li>Licensing and Copyright: Expenses for licenses and copyright registrations.</li>
              <li>Promotion and Distribution: Allocating funds for marketing.</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Release Party</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Event Costs: Budget for venue rental, catering, and other expenses.</li>
            </ul>
            <h3 className="text-lg font-bold mt-4 mb-2">Technologies</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>Hire a developer to create the mint site for the album.</li>
            </ul>
            <h3 className="text-lg font-bold mt-4 mb-2">Merchandise Design</h3>
            <ul className="text-gray-300 list-disc list-inside ml-4">
              <li>First Line of Clothing Design: Funds allocated for designing the first line of limited-edition merchandise.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY SUPPORT */}
      <section className="px-4 py-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2"><PartyPopper className="w-8 h-8 text-pink-400" /> Why Support This Project?</h2>
        <ol className="list-decimal text-gray-200 space-y-4 ml-6 text-lg">
          <li><b>Empowerment of Independent Artists:</b> Your contribution helps support independent creators, allowing us to thrive outside traditional music industry constraints.</li>
          <li><b>Join a Creative Community:</b> When you contribute, you're not just donating—you're becoming part of a community that values collaboration and creativity.</li>
          <li><b>Exclusive Access:</b> As a supporter, you'll gain exclusive insights into the creative process, behind-the-scenes content, and the opportunity to engage with the project on a personal level.</li>
          <li><b>Cool Rewards:</b> I've lined up some awesome rewards to show my appreciation, connecting you directly to the music and the journey.</li>
          <li><b>Make a F*cking Party!</b> If we reach our goal, you'll be invited to an exclusive release party!</li>
        </ol>
      </section>

      {/* FINAL CTA */}
      <section className="w-full flex flex-col items-center px-4 py-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full max-w-xs px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Support The Lab Now
        </motion.button>
        <p className="mt-4 text-gray-400 text-center max-w-lg">
          Every contribution brings us closer to making this vision a reality. Thank you for believing in independent music!
        </p>
      </section>

      {/* Fixed Progress Card */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed ${isMobile ? 'bottom-4 left-4 right-4' : 'bottom-8 left-1/2 -translate-x-1/2 w-96'} bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 z-50`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">The Lab Progress</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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