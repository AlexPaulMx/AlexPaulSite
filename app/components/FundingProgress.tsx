"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const GOAL_AMOUNT = 10000; // $10,000 USD
const POLL_INTERVAL = 5000; // 5 seconds

export default function FundingProgress() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const { data, error } = await supabase
          .from('supporters')
          .select('amount');
        console.log('[FUNDING PROGRESS] Data:', data);
        console.log('[FUNDING PROGRESS] Error:', error);
        if (error) {
          console.error('Error fetching supporters:', error);
          setTotalRaised(0);
          return;
        }
        const total = data ? data.reduce((sum: number, s: { amount: number }) => sum + Number(s.amount), 0) : 0;
        console.log('[FUNDING PROGRESS] Total calculated:', total);
        setTotalRaised(total);
        setProgress(Math.min((total / GOAL_AMOUNT) * 100, 100));
        setLastUpdate(new Date());
      } catch (error) {
        console.error('[FUNDING PROGRESS] Unexpected error:', error);
        setTotalRaised(0);
      }
    };

    // Fetch initial data
    fetchTotal();

    // Set up event listener for refresh
    const handler = () => {
      console.log('[FUNDING PROGRESS] Refresh event received');
      fetchTotal();
    };
    window.addEventListener('refresh-progress', handler);
    
    // Set up polling interval as backup
    const interval = setInterval(fetchTotal, POLL_INTERVAL);

    return () => {
      window.removeEventListener('refresh-progress', handler);
      clearInterval(interval);
    };
  }, []);

  if (!totalRaised) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-[#101014] rounded-2xl border border-white/10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
          <div className="h-8 bg-gray-800/50 rounded"></div>
          <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-black/30 rounded-2xl border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Total Raised</span>
        <span className="text-lg font-bold text-white">${totalRaised.toFixed(2)}</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">Goal: ${GOAL_AMOUNT.toLocaleString()}</span>
        <span className="text-sm text-gray-400">{progress.toFixed(1)}%</span>
      </div>
      <div className="mt-4 text-xs text-gray-400 space-y-1">
        <div className="flex justify-between pt-1 border-t border-gray-700">
          <span className="font-medium">Total:</span>
          <span className="font-medium">${totalRaised.toFixed(2)}</span>
        </div>
        <div className="text-[10px] text-gray-500 text-right mt-1">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
} 