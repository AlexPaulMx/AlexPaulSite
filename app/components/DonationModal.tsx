"use client";

import { useState, useEffect } from "react";
import { X, Heart, MessageSquare } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { displayName: string; comment: string; amount: number; currency: string }) => void;
  defaultDisplayName?: string;
  amount: number;
  currency: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  onSave,
  defaultDisplayName = "",
  amount,
  currency,
}: DonationModalProps) {
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDisplayName(defaultDisplayName);
      setComment("");
    }
  }, [isOpen, defaultDisplayName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ displayName, comment, amount, currency });
    // Dispara eventos globales para refrescar supporters y progreso
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('refresh-supporters'));
      window.dispatchEvent(new Event('refresh-progress'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#101014] border border-white/10 rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent text-center">
            Thank You for Your Support!
          </h2>
          <p className="text-gray-400 text-sm text-center mt-2">
            Leave your mark on The Lab's journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="displayName" className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <span>How would you like to be known?</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Your name or nickname"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <MessageSquare className="w-4 h-4" />
              <span>Leave a message (optional)</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              placeholder="Share your thoughts..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#101014] shadow-lg shadow-red-500/20"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
} 