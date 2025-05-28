"use client";

import { useState } from "react";
import { MessageSquare, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  displayName: string;
  comment: string;
  timestamp: string;
  amount: number;
  wallet: string;
}

export default function CommentsFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    // Example comments - replace with actual data from Supabase
    {
      displayName: "Alex",
      comment: "Let's make this happen! 🚀",
      timestamp: "2024-03-20T10:00:00Z",
      amount: 100,
      wallet: "0x1234...5678"
    },
    {
      displayName: "Sarah",
      comment: "Can't wait for the new music!",
      timestamp: "2024-03-20T09:30:00Z",
      amount: 50,
      wallet: "0x8765...4321"
    }
  ]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/20 flex items-center justify-center text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Comments Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-[#101014] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white">Supporters' Messages</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{comment.displayName}</span>
                      <span className="text-xs text-gray-400">({comment.wallet})</span>
                    </div>
                    <span className="text-sm text-red-400">${comment.amount}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.comment}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 