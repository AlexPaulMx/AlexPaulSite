"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Comment {
  displayName: string;
  comment: string;
  timestamp: string;
  amount: number;
  wallet: string;
}

export default function CommentsFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Función de prueba para insertar un supporter
  const insertTestSupporter = async () => {
    try {
      const { data, error } = await supabase
        .from("supporters")
        .insert([
          {
            display_name: "Test Supporter",
            address: "0x1234567890abcdef1234567890abcdef12345678",
            amount: 100.00,
            comment: "¡Este es un mensaje de prueba!"
          }
        ])
        .select();

      if (error) throw error;
      console.log("Test supporter inserted:", data);
    } catch (error) {
      console.error("Error inserting test supporter:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchComments = async () => {
      try {
        console.log("Fetching comments from Supabase...");
        
        const { data, error } = await supabase
          .from("supporters")
          .select("display_name, comment, created_at, amount, address")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(error.message || "Error al conectar con la base de datos");
        }

        console.log("Supabase response:", data);

        if (data) {
          const formattedComments = data.map(s => ({
            displayName: s.display_name,
            comment: s.comment || "",
            timestamp: s.created_at,
            amount: s.amount,
            wallet: s.address
          }));
          console.log("Formatted comments:", formattedComments);
          setComments(formattedComments);
        }
      } catch (error) {
        console.error("Error in fetchComments:", error);
        setError(error instanceof Error ? error.message : "Error al cargar los mensajes. Por favor, intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    // Subscribe to new comments
    const channel = supabase
      .channel("supporters_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "supporters",
        },
        (payload) => {
          console.log("New comment received:", payload);
          const newComment = payload.new as any;
          setComments(current => [{
            displayName: newComment.display_name,
            comment: newComment.comment || "",
            timestamp: newComment.created_at,
            amount: newComment.amount,
            wallet: newComment.address
          }, ...current]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to new comments");
        } else if (status === "CHANNEL_ERROR") {
          console.error("Error subscribing to new comments");
          setError("Error al conectar con la base de datos en tiempo real");
        }
      });

    return () => {
      console.log("Cleaning up subscription...");
      supabase.removeChannel(channel);
    };
  }, [mounted]);

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "recientemente";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "recientemente";
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: es 
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "recientemente";
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          // Descomentar la siguiente línea para probar la inserción
          // insertTestSupporter();
        }}
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

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-800/50 rounded-lg"></div>
                  <div className="h-20 bg-gray-800/50 rounded-lg"></div>
                  <div className="h-20 bg-gray-800/50 rounded-lg"></div>
                </div>
              ) : error ? (
                <div className="text-red-400 text-center py-4">
                  <p>{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                  ¡Sé el primero en dejar un mensaje!
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{comment.displayName}</h4>
                          <p className="text-xs text-gray-400">
                            {comment.wallet.slice(0, 6)}...{comment.wallet.slice(-4)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">
                            ${comment.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(comment.timestamp)}
                          </p>
                        </div>
                      </div>
                      {comment.comment && (
                        <p className="text-gray-300 text-sm mt-2 italic">"{comment.comment}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 