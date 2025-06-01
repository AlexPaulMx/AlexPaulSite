"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

interface Supporter {
  name: string;
  avatar: string;
  amount: number;
  comment?: string;
}

interface SupportersAndCommentsProps {
  supporters: Supporter[];
}

export function SupportersAndComments({ supporters }: SupportersAndCommentsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Supporters</h3>
      <div className="space-y-4">
        {supporters.map((supporter, index) => (
          <div key={index} className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={supporter.avatar} alt={supporter.name} />
              <AvatarFallback>{supporter.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{supporter.name}</span>
                <span className="text-sm text-neutral-400">{supporter.amount} ETH</span>
              </div>
              {supporter.comment && (
                <p className="text-sm text-neutral-400 mt-1">{supporter.comment}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 