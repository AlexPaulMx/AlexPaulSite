"use client";

import React from 'react';
import { motion } from 'framer-motion';

type FundingProgressProps = {
  current: number;
  target: number;
  backers: number;
  daysLeft: number;
};

export default function FundingProgress({
  current,
  target,
  backers,
  daysLeft,
}: FundingProgressProps) {
  const progress = Math.min((current / target) * 100, 100);

    return (
    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Funding Progress</h3>
        <div className="text-sm text-gray-400">
          {daysLeft} days left
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>${current.toLocaleString()}</span>
            <span>${target.toLocaleString()}</span>
      </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <div className="text-gray-400">Backers</div>
            <div className="font-bold">{backers}</div>
          </div>
          <div>
            <div className="text-gray-400">Progress</div>
            <div className="font-bold">{progress.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
} 