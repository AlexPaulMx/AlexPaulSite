"use client";
import { useState } from "react";
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
  Minimize2,
  Maximize2,
  Folder,
  FileText,
  Settings,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Tipos de apps disponibles
type AppType = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

export default function TheLab() {
  // Meta de crowdfunding: $10,000 USD
  const goal = 10000;
  const currentAmount = 0; // Esto se actualizará con la integración real
  const progress = (currentAmount / goal) * 100;

  const [activeApps, setActiveApps] = useState<AppType[]>([
    {
      id: "about",
      title: "About The Lab",
      icon: <Info className="w-6 h-6" />,
      content: (
        <div className="p-6 text-gray-300">
          <h2 className="text-2xl font-bold mb-4">About The Lab</h2>
          <p className="mb-4">
            Hi, my name is Alejandro A.k.a. Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
          </p>
          <p className="mb-4">
            Right now, I'm pouring my heart and mind into an audiovisual album titled "The Lab." This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators involved in making this vision a reality.
          </p>
          <p className="mb-4">
            I plan to release this album independently, without the backing of a major record label. To bring this vision to life, I'm aiming to raise $10K USD to cover the album's production costs.
          </p>
          <p>
            This album will showcase a multicultural soundscape, introducing my first English songs and experimenting with various genres, including pop, hip hop/R&B, synthpop, Latin rhythms, and house.
          </p>
        </div>
      ),
      isOpen: true,
      isMinimized: false,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 }
    },
    {
      id: "rewards",
      title: "Rewards",
      icon: <Gift className="w-6 h-6" />,
      content: (
        <div className="p-6 text-gray-300">
          <h2 className="text-2xl font-bold mb-4">Rewards</h2>
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Top Supporter</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Executive Producer Credits</li>
                <li>Exclusive Merch</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Top 5 Supporters</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Executive Producer Credits</li>
                <li>Exclusive Merch</li>
                <li>Full Album CD</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Top 10 Supporters</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>The Lab Crew Character</li>
                <li>Full Album Airdrop</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">All Contributors</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>The Lab Gang Badge</li>
                <li>Release Party Invitation</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      position: { x: 200, y: 200 },
      size: { width: 600, height: 500 }
    },
    {
      id: "funding",
      title: "Funding Details",
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="p-6 text-gray-300">
          <h2 className="text-2xl font-bold mb-4">Funds Allocation</h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Production Costs</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Studio Rent</li>
                <li>Session Musician Fees</li>
                <li>Equipment Rental/Purchase</li>
                <li>Music Videos Production</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Distribution and Manufacturing</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Physical Distribution</li>
                <li>Licensing and Copyright</li>
                <li>Promotion and Distribution</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Technologies</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Mint Site Development</li>
                <li>Merchandise Design</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      isOpen: false,
      isMinimized: false,
      position: { x: 300, y: 300 },
      size: { width: 600, height: 500 }
    }
  ]);

  const [draggedApp, setDraggedApp] = useState<string | null>(null);
  const [resizingApp, setResizingApp] = useState<string | null>(null);
  const [isProgressCardExpanded, setIsProgressCardExpanded] = useState(true);

  const handleAppAction = (appId: string, action: 'open' | 'close' | 'minimize') => {
    setActiveApps(apps => apps.map(app => {
      if (app.id === appId) {
        switch (action) {
          case 'open':
            return { ...app, isOpen: true, isMinimized: false };
          case 'close':
            return { ...app, isOpen: false, isMinimized: false };
          case 'minimize':
            return { ...app, isMinimized: !app.isMinimized };
          default:
            return app;
        }
      }
      return app;
    }));
  };

  const handleDragStart = (appId: string) => {
    setDraggedApp(appId);
  };

  const handleDragEnd = (appId: string, position: { x: number; y: number }) => {
    setActiveApps(apps => apps.map(app => 
      app.id === appId ? { ...app, position } : app
    ));
    setDraggedApp(null);
  };

  const handleResize = (appId: string, size: { width: number; height: number }) => {
    setActiveApps(apps => apps.map(app => 
      app.id === appId ? { ...app, size } : app
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-[url('/images/hero-background.svg')] bg-cover bg-center opacity-10" />

      {/* Fixed Progress Card */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 right-4 w-80 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 z-50"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">The Lab Progress</h3>
            <button
              onClick={() => setIsProgressCardExpanded(!isProgressCardExpanded)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              {isProgressCardExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          <AnimatePresence>
            {isProgressCardExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
                  >
                    Support Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 flex items-center px-4 z-50">
        <div className="flex space-x-2">
          {activeApps.map(app => (
            <button
              key={app.id}
              onClick={() => handleAppAction(app.id, app.isOpen ? 'minimize' : 'open')}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${
                app.isOpen && !app.isMinimized ? 'bg-gray-700' : ''
              }`}
            >
              {app.icon}
            </button>
          ))}
        </div>
      </div>

      {/* App Windows */}
      <AnimatePresence>
        {activeApps.map(app => app.isOpen && (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: app.isMinimized ? 0 : 1,
              scale: app.isMinimized ? 0.9 : 1,
              x: app.position.x,
              y: app.position.y,
              width: app.size.width,
              height: app.size.height
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            drag={!app.isMinimized}
            dragMomentum={false}
            onDragStart={() => handleDragStart(app.id)}
            onDragEnd={(_, info) => handleDragEnd(app.id, {
              x: app.position.x + info.offset.x,
              y: app.position.y + info.offset.y
            })}
            className={`absolute bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 ${
              draggedApp === app.id ? 'z-50' : 'z-40'
            }`}
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 rounded-t-lg border-b border-gray-700">
              <div className="flex items-center space-x-2">
                {app.icon}
                <span className="text-sm font-medium">{app.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAppAction(app.id, 'minimize')}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAppAction(app.id, 'close')}
                  className="p-1 hover:bg-red-500 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="overflow-auto" style={{ height: `calc(${app.size.height}px - 40px)` }}>
              {app.content}
            </div>

            {/* Resize Handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={() => setResizingApp(app.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 space-y-4">
        {activeApps.map(app => (
          <button
            key={app.id}
            onClick={() => handleAppAction(app.id, 'open')}
            className="flex flex-col items-center space-y-1 group"
          >
            <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
              {app.icon}
            </div>
            <span className="text-sm text-gray-300">{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 