import React, { useState } from 'react';
import { Gift, Music } from 'lucide-react';
import Image from 'next/image';

export const TheLabFarcaster = () => {
  const [showRewards, setShowRewards] = useState(false);

  return (
    <div className="w-full max-w-xs mx-auto bg-black rounded-2xl shadow-xl p-4 flex flex-col items-center gap-4 border border-gray-800">
      {/* Logo y título */}
      <div className="flex flex-col items-center gap-1">
        <Image src="/images/thelab-logo.png" alt="The Lab Logo" width={64} height={64} className="rounded-full bg-black border border-gray-700" />
        <h1 className="text-lg font-bold text-white mt-2">The Lab</h1>
        <span className="text-xs text-gray-400">Audiovisual Album by AlexPaul</span>
      </div>

      {/* Video o imagen */}
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        <video
          src="https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Meta y progreso */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>Meta: $10,000</span>
          <span>0%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Botones principales */}
      <div className="flex flex-col gap-2 w-full mt-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition" onClick={() => alert('Funcionalidad de apoyo próximamente')}>Apoyar proyecto</button>
        <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2" onClick={() => setShowRewards(!showRewards)}>
          <Gift className="w-4 h-4 text-purple-400" /> Ver recompensas
        </button>
      </div>

      {/* Recompensas principales */}
      {showRewards && (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 mt-2 animate-fade-in">
          <h2 className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2"><Gift className="w-4 h-4" />Top Rewards</h2>
          <ul className="text-xs text-gray-200 space-y-1">
            <li>• Executive Producer Credits</li>
            <li>• Exclusive Merch</li>
            <li>• Full Album Airdrop</li>
            <li>• Release Party Invitation</li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="text-[8px] text-gray-600 mt-1 text-center">Powered by Farcaster Frame</div>
    </div>
  );
}; 