"use client";

import { useEffect, useState } from "react";
import { usePublicClient, useAccount } from "wagmi";
import { formatEther } from "viem";
import { USDC_ADDRESS, USDC_ABI, parseUSDCAmount } from "../utils/usdc";

interface Supporter {
  address: string;
  amount: number;
  timestamp: Date;
  type: 'ETH' | 'USDC';
  message?: string;
}

const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";

export default function SupportersAndComments() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [newComment, setNewComment] = useState("");
  const publicClient = usePublicClient();
  const { address: connectedAddress } = useAccount();

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      if (!publicClient) return;

      try {
        // Cargar balance USDC
        const usdcBalance = await publicClient.readContract({
          address: USDC_ADDRESS,
          abi: USDC_ABI,
          functionName: 'balanceOf',
          args: [PROJECT_WALLET],
        }) as bigint;

        // Cargar balance ETH
        const ethBalance = await publicClient.getBalance({
          address: PROJECT_WALLET as `0x${string}`,
        });

        const newSupporters: Supporter[] = [];

        // Agregar USDC balance
        if (usdcBalance > 0) {
          newSupporters.push({
            address: PROJECT_WALLET,
            amount: parseUSDCAmount(usdcBalance),
            timestamp: new Date(),
            type: 'USDC'
          });
        }

        // Agregar ETH balance
        if (ethBalance > 0) {
          newSupporters.push({
            address: PROJECT_WALLET,
            amount: Number(formatEther(ethBalance)),
            timestamp: new Date(),
            type: 'ETH'
          });
        }

        setSupporters(newSupporters);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, [publicClient]);

  // Escuchar nuevas transacciones
  useEffect(() => {
    if (!publicClient) return;

    const unwatch = publicClient.watchBlockNumber({
      onBlockNumber: async (blockNumber) => {
        const block = await publicClient.getBlock({ blockNumber });
        
        for (const tx of block.transactions) {
          if (typeof tx === 'string') continue;
          
          const transaction = tx as any;
          if (transaction.to?.toLowerCase() === PROJECT_WALLET.toLowerCase()) {
            const amount = Number(formatEther(transaction.value));
            if (amount > 0) {
              setSupporters(prev => [{
                address: transaction.from,
                amount,
                timestamp: new Date(),
                type: 'ETH'
              }, ...prev]);
            }
          }
        }
      },
    });

    return () => {
      unwatch();
    };
  }, [publicClient]);

  const handleComment = async () => {
    if (!newComment.trim() || !connectedAddress) return;

    // Guardar comentario en localStorage
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const newCommentData = {
      address: connectedAddress,
      message: newComment,
      timestamp: new Date().toISOString()
    };
    comments.unshift(newCommentData);
    localStorage.setItem('comments', JSON.stringify(comments));

    // Agregar comentario a la lista
    setSupporters(prev => [{
      address: connectedAddress,
      amount: 0,
      timestamp: new Date(),
      type: 'ETH',
      message: newComment
    }, ...prev]);

    setNewComment("");
  };

  // Cargar comentarios guardados
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const commentSupporters = savedComments.map((comment: any) => ({
      address: comment.address,
      amount: 0,
      timestamp: new Date(comment.timestamp),
      type: 'ETH' as const,
      message: comment.message
    }));
    setSupporters(prev => [...prev, ...commentSupporters]);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-8">
      <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Supporters & Comments</h2>
        <div className="space-y-4">
          {supporters.map((supporter, index) => (
            <div key={index} className="flex flex-col space-y-2 p-3 bg-black/20 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-500">❤️</span>
                  </div>
                  <div>
                    <div className="text-white">{supporter.address.slice(0, 6)}...{supporter.address.slice(-4)}</div>
                    <div className="text-gray-400 text-xs">{supporter.timestamp.toLocaleDateString()}</div>
                  </div>
                </div>
                {supporter.amount > 0 && (
                  <div className="text-right">
                    <div className="text-white">{supporter.amount.toFixed(4)} {supporter.type}</div>
                    <div className="text-gray-400 text-xs">≈ ${(supporter.amount * 3000).toFixed(2)}</div>
                  </div>
                )}
              </div>
              {supporter.message && (
                <div className="pl-10 text-sm text-gray-300 border-t border-gray-700 pt-2">
                  {supporter.message}
                </div>
              )}
            </div>
          ))}
          {supporters.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No supporters yet. Be the first one!
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            rows={3}
          />
          <button
            onClick={handleComment}
            disabled={!connectedAddress}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connectedAddress ? 'Post Comment' : 'Connect Wallet to Comment'}
          </button>
        </div>
      </div>
    </div>
  );
} 