"use client";
import { motion } from "framer-motion";
import { Music, Users, Trophy, Package, MessageCircle, DollarSign, Globe, Heart, Star, Gift } from "lucide-react";

export default function TheLab() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            THE LAB
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Un álbum audiovisual experimental que fusiona música multicultural con tecnología blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300">Experimental</span>
            <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300">Pop</span>
            <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-300">Hip Hop/R&B</span>
            <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300">Synthpop</span>
            <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300">Latin Rhythms</span>
            <span className="px-4 py-2 bg-red-500/20 rounded-full text-red-300">House</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Apoya el Proyecto
          </motion.button>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">Sobre el Proyecto</h2>
          <p className="text-lg text-gray-300 mb-8">
            Hi, my name is Alejandro A.k.a. Alex Paul. I'm an independent artist, musician, and producer from the Tamaulipas-Texas border, constantly experimenting with my music on-chain.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Right now, I'm pouring my heart and mind into an audiovisual album titled "The Lab." This project is important to me because it represents an opportunity to collaborate with people who believe in my music and to support other creators involved in making this vision a reality.
          </p>
        </motion.div>
      </div>

      {/* Rewards Section */}
      <div className="bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Recompensas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Top Supporter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <Trophy className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Top Supporter</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Executive Producer Credits</li>
                <li>• Exclusive Merch</li>
              </ul>
            </motion.div>

            {/* Top 5 Supporters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <Star className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Top 5 Supporters</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Executive Producer Credits</li>
                <li>• Exclusive Merch</li>
                <li>• Full Album CD</li>
              </ul>
            </motion.div>

            {/* Top 10 Supporters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20"
            >
              <Users className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Top 10 Supporters</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• The Lab Crew Character</li>
                <li>• Full Album Airdrop</li>
              </ul>
            </motion.div>

            {/* All Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
            >
              <Gift className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">All Contributors</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• The Lab Gang Badge</li>
                <li>• Release Party Invitation</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why Support Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">¿Por qué apoyar este proyecto?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
          >
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Empoderamiento de Artistas Independientes</h3>
            <p className="text-gray-300">
              Tu contribución ayuda a apoyar a creadores independientes, permitiéndonos prosperar fuera de las restricciones tradicionales de la industria musical.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
          >
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Únete a una Comunidad Creativa</h3>
            <p className="text-gray-300">
              Al contribuir, no solo estás donando, te estás convirtiendo en parte de una comunidad que valora la colaboración y la creatividad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
          >
            <Globe className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Acceso Exclusivo</h3>
            <p className="text-gray-300">
              Como patrocinador, obtendrás acceso exclusivo al proceso creativo, contenido detrás de escena y la oportunidad de interactuar con el proyecto a nivel personal.
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
              ¡Hagamos una fiesta!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Si alcanzamos nuestra meta, ¡te invitaremos a una fiesta de lanzamiento exclusiva!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Apoya el Proyecto
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 