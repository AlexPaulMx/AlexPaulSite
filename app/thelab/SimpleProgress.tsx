"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const GOAL_AMOUNT = 10000; // $10,000 USD

export default function SimpleProgress() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTotal = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('supporters')
        .select('amount');
      
      if (error) {
        console.error('Error fetching supporters:', error);
        return;
      }

      const total = data ? data.reduce((sum: number, s: { amount: number }) => sum + Number(s.amount), 0) : 0;
      console.log('Total raised:', total);
      setTotalRaised(total);
      setProgress(Math.min((total / GOAL_AMOUNT) * 100, 100));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotal();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('supporters_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'supporters' }, 
        () => {
          console.log('Change detected in supporters table');
          fetchTotal();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-black/30 rounded-2xl border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
          <div className="h-8 bg-gray-800/50 rounded"></div>
          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black/30 rounded-2xl border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Total Raised</span>
        <span className="text-lg font-bold text-white">${totalRaised.toFixed(2)}</span>
      </div>
      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full animate-progress-bar"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #ff5ecd, #a259f7, #00ffb8)',
            backgroundSize: '200% 200%',
            animation: 'gradientMove 3s ease-in-out infinite',
            transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)'
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">Goal: ${GOAL_AMOUNT.toLocaleString()}</span>
        <span className="text-sm text-gray-400">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
} 