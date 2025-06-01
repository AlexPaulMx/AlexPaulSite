"use client";

import React from 'react';
import { Progress } from "../../components/ui/progress"

interface FundingProgressProps {
  progress: number
  goal: number
  current: number
}

export function FundingProgress({ progress, goal, current }: FundingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span>{progress}% funded</span>
        <span>{current} of {goal} ETH</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
} 