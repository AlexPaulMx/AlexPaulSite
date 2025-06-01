"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { usePublicClient, useAccount } from "wagmi";
import { formatEther } from "viem";
import { USDC_ADDRESS, USDC_ABI, parseUSDCAmount } from "../utils/usdc";

type Supporter = {
  name: string;
  amount: number;
  message?: string;
  avatar?: string;
  date: string;
  type?: 'USDC' | 'ETH';
};

type Comment = {
  user: string;
  avatar?: string;
  message: string;
  date: string;
};

type SupportersAndCommentsProps = {
  supporters: Supporter[];
  comments: Comment[];
};

const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";

export default function SupportersAndComments({
  supporters: initialSupporters,
  comments: initialComments,
}: SupportersAndCommentsProps) {
  const [supporters, setSupporters] = useState<Supporter[]>(initialSupporters);
  const [comments, setComments] = useState<Comment[]>(initialComments);
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
            name: PROJECT_WALLET,
            amount: parseUSDCAmount(usdcBalance),
            date: new Date().toLocaleDateString(),
            type: 'USDC'
          });
        }

        // Agregar ETH balance
        if (ethBalance > 0) {
          newSupporters.push({
            name: PROJECT_WALLET,
            amount: Number(formatEther(ethBalance)),
            date: new Date().toLocaleDateString(),
            type: 'ETH'
          });
        }

        setSupporters(prev => [...prev, ...newSupporters]);
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
                name: transaction.from,
                amount,
                date: new Date().toLocaleDateString(),
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
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const newCommentData = {
      user: connectedAddress,
      message: newComment,
      date: new Date().toISOString()
    };
    savedComments.unshift(newCommentData);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    // Agregar comentario a la lista
    setComments(prev => [{
      user: connectedAddress,
      message: newComment,
      date: new Date().toLocaleDateString()
    }, ...prev]);

    setNewComment("");
  };

  // Cargar comentarios guardados
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const commentSupporters = savedComments.map((comment: any) => ({
      user: comment.user,
      message: comment.message,
      date: new Date(comment.date).toLocaleDateString()
    }));
    setComments(prev => [...prev, ...commentSupporters]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Supporters */}
      <div>
        <h3 className="text-xl font-bold mb-4">Supporters</h3>
        <div className="space-y-4">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="bg-black/30 rounded-lg border border-white/10 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
                  {supporter.avatar ? (
                    <Image
                      src={supporter.avatar}
                      alt={supporter.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50" />
                  )}
                  </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                  <div>
                      <div className="font-bold">{supporter.name}</div>
                      <div className="text-sm text-gray-400">
                        {supporter.date}
                      </div>
                    </div>
                    <div className="text-pink-500 font-bold">
                      ${supporter.amount}
                    </div>
                  </div>
                  {supporter.message && (
                    <div className="mt-2 text-sm text-gray-300">
                      {supporter.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="bg-black/30 rounded-lg border border-white/10 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
                  {comment.avatar ? (
                    <Image
                      src={comment.avatar}
                      alt={comment.user}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold">{comment.user}</div>
                    <div className="text-sm text-gray-400">{comment.date}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-300">
                    {comment.message}
              </div>
                </div>
              </div>
            </div>
          ))}
            </div>
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
  );
} 