"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "../../lib/supabaseClient";

type Supporter = {
  id: number;
  address: string;
  display_name: string;
  comment: string | null;
  amount: number;
  currency: "USDC" | "ETH";
  created_at: string;
};

export default function SupportersList() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const { data, error } = await supabase
          .from("supporters")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching supporters:", error);
          setError("Error al cargar los supporters");
          return;
        }

        if (!data || data.length === 0) {
          console.log("No supporters found");
          setSupporters([]);
          return;
        }

        console.log("Fetched supporters:", data);
        setSupporters(data);
      } catch (error) {
        console.error("Error in fetchSupporters:", error);
        setError("Error al cargar los supporters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupporters();

    // Subscribe to new supporters
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
          console.log("New supporter received:", payload);
          setSupporters((current) => [payload.new as Supporter, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-black/30 rounded-2xl border border-white/10 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-black/30 rounded-2xl border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (supporters.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-black/30 rounded-2xl border border-white/10 text-center">
        <p className="text-gray-400">¡Sé el primero en apoyar este proyecto!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Supporters</h2>
      <div className="space-y-4">
        {supporters.map((supporter) => (
          <div
            key={supporter.id}
            className="p-6 bg-black/30 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {supporter.display_name}
                </h3>
                <p className="text-sm text-gray-400">
                  {supporter.address.slice(0, 6)}...{supporter.address.slice(-4)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">
                  {supporter.currency === "USDC" ? "$" : "Ξ"}
                  {supporter.amount.toFixed(supporter.currency === "USDC" ? 2 : 4)}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(supporter.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            {supporter.comment && (
              <p className="text-gray-300 mt-2 italic">"{supporter.comment}"</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 