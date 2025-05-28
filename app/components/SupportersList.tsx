import React, { useEffect, useState } from 'react';
import { supabase } from '../../AlexPaulSite/lib/supabaseClient';

type Supporter = {
  id?: number;
  address: string;
  display_name: string;
  comment: string | null;
  amount: number;
  currency: "USDC" | "ETH";
  created_at?: string;
};

const SupportersList: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchSupporters = async () => {
      try {
        const { data, error } = await supabase
          .from("supporters")
          .select("*")
          .order("created_at", { ascending: false });

        console.log("[SUPPORTERS FETCH] Data:", data);
        console.log("[SUPPORTERS FETCH] Error:", error);

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
        (payload: any) => {
          console.log("New supporter received:", payload);
          setSupporters((current) => [payload.new as Supporter, ...current]);
        }
      )
      .subscribe((status: any) => {
        console.log("Subscription status:", status);
      });

    // Listener para refresco manual
    const refreshHandler = () => fetchSupporters();
    window.addEventListener('refresh-supporters', refreshHandler);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('refresh-supporters', refreshHandler);
    };
  }, [mounted]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Supporters</h2>
      {isLoading ? (
        <div className="text-gray-400">Loading...</div>
      ) : supporters.length === 0 ? (
        <div className="text-gray-400">¡Sé el primero en apoyar este proyecto!</div>
      ) : (
        <div className="space-y-4">
          {supporters.map((supporter, i) => (
            <div key={i} className="p-4 bg-black/30 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">{supporter.display_name}</span>
                <span className="text-sm text-gray-400">{supporter.amount} {supporter.currency}</span>
              </div>
              {supporter.comment && (
                <div className="text-gray-300 mt-2 italic">"{supporter.comment}"</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportersList; 