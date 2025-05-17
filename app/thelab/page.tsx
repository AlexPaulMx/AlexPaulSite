"use client";
import { motion } from "framer-motion";
import { Beaker, Music, Users, Trophy, Package, MessageCircle } from "lucide-react";

export default function TheLab() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-background.svg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <div className="flex items-center justify-center mb-6">
            <Beaker className="w-12 h-12 text-blue-500" />
            <h1 className="text-6xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              THE LAB
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Un espacio experimental donde la música y la tecnología se encuentran para crear algo único.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Music Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <Music className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Música Experimental</h3>
            <p className="text-gray-400">
              Explora nuevas formas de crear y distribuir música a través de la tecnología blockchain.
            </p>
          </motion.div>

          {/* Community Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors"
          >
            <Users className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Comunidad</h3>
            <p className="text-gray-400">
              Únete a una comunidad de artistas y entusiastas que están redefiniendo el futuro de la música.
            </p>
          </motion.div>

          {/* Rewards Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-pink-500 transition-colors"
          >
            <Trophy className="w-12 h-12 text-pink-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Recompensas</h3>
            <p className="text-gray-400">
              Gana recompensas exclusivas por ser parte de esta revolución musical.
            </p>
          </motion.div>

          {/* Merch Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors"
          >
            <Package className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Merchandise</h3>
            <p className="text-gray-400">
              Colecciona artículos exclusivos diseñados para los verdaderos fans.
            </p>
          </motion.div>

          {/* NFT Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-colors"
          >
            <Beaker className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">NFTs</h3>
            <p className="text-gray-400">
              Posee piezas únicas de arte y música en formato NFT.
            </p>
          </motion.div>

          {/* Community Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-colors"
          >
            <MessageCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Comunidad</h3>
            <p className="text-gray-400">
              Conecta con otros miembros de la comunidad a través de nuestro canal de Telegram.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ¿Listo para ser parte de la revolución?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a The Lab y sé parte de la próxima generación de música experimental.
            </p>
            <button 
              onClick={() => window.open('https://t.me/thelabcommunity', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Únete a la Comunidad
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 