"use client";
export const dynamic = "force-dynamic";
import dynamic from "next/dynamic";
import React from 'react';

const TheLabContent = dynamic(() => import("../../components/TheLabContent"), { ssr: false });

export default function TheLab() {
  return <TheLabContent />;
} 