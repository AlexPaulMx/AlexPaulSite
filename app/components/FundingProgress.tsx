"use client";

import { useEffect, useState } from "react";
import { useContractRead, useBalance, usePublicClient } from "wagmi";
import { USDC_ADDRESS, USDC_ABI, parseUSDCAmount } from "../utils/usdc";
import { formatEther } from "viem";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const GOAL_AMOUNT = 10000; // $10,000 USD
const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";
const POLL_INTERVAL = 5000; // 5 seconds

interface FundingProgressProps {
  currentAmount: number;
  targetAmount: number;
  lastUpdate: string;
}

export default function FundingProgress({ currentAmount, targetAmount, lastUpdate }: FundingProgressProps) {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [totalRaised, setTotalRaised] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [usdcValue, setUsdcValue] = useState(0);

  const publicClient = usePublicClient();

  // Get USDC balance of project wallet
  const { data: usdcBalance, refetch: refetchUSDC } = useContractRead({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [PROJECT_WALLET],
  });

  // Get ETH balance of project wallet
  const { data: ethBalance, refetch: refetchETH } = useBalance({
    address: PROJECT_WALLET as `0x${string}`,
  });

  // Listen for USDC Transfer events
  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      eventName: 'Transfer',
      args: {
        to: PROJECT_WALLET,
      },
      onLogs: (logs) => {
        console.log('New USDC transfer received:', logs);
        refetchUSDC();
      },
    });

    return () => {
      unwatch();
    };
  }, [publicClient, refetchUSDC]);

  // Listen for ETH transactions
  useEffect(() => {
    const unwatch = publicClient.watchBlockNumber({
      onBlockNumber: (blockNumber) => {
        publicClient.getBlock({ blockNumber }).then((block) => {
          const projectTransactions = block.transactions.filter(
            (tx) => tx.to?.toLowerCase() === PROJECT_WALLET.toLowerCase()
          );
          
          if (projectTransactions.length > 0) {
            console.log('New ETH transaction received:', projectTransactions);
            refetchETH();
          }
        });
      },
    });

    return () => {
      unwatch();
    };
  }, [publicClient, refetchETH]);

  // Function to update balances
  const updateBalances = async () => {
    try {
      await Promise.all([refetchUSDC(), refetchETH()]);
    } catch (error) {
      console.error("Error updating balances:", error);
    }
  };

  // Set up polling interval as backup
  useEffect(() => {
    const interval = setInterval(updateBalances, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculate USDC amount
    const usdcAmount = usdcBalance ? parseUSDCAmount(usdcBalance as bigint) : 0;
    setUsdcValue(usdcAmount);
    
    // Calculate ETH amount in USD (assuming 1 ETH = $3000 for now)
    const ethAmount = ethBalance ? Number(formatEther(ethBalance.value)) : 0;
    const ethInUsd = ethAmount * 3000; // This should be replaced with real price feed
    setEthValue(ethInUsd);
    
    // Update total raised
    const total = usdcAmount + ethInUsd;
    setTotalRaised(total);
    setProgress(Math.min((total / GOAL_AMOUNT) * 100, 100));
  }, [usdcBalance, ethBalance]);

  useEffect(() => {
    setMounted(true);
    try {
      setFormattedDate(formatDistanceToNow(new Date(lastUpdate), { 
        addSuffix: true,
        locale: es 
      }));
    } catch (error) {
      console.error("Error formatting date:", error);
      setFormattedDate("recientemente");
    }
  }, [lastUpdate]);

  if (!mounted) {
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

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(currentAmount);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#101014] rounded-2xl border border-white/10">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Funding Progress</h3>
          <span className="text-sm text-gray-400">Last update: {formattedDate}</span>
        </div>
        
        <div className="relative h-4 bg-gray-800/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-red-600"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            {formattedAmount}
          </div>
          <div className="text-sm text-gray-400">
            {progress.toFixed(1)}% of ${targetAmount.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
} 