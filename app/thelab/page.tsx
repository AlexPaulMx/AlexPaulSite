"use client";
import dynamic from "next/dynamic";
import React from 'react';

const TheLabContent = dynamic(() => import("../../components/TheLabContent"), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function TheLab() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <TheLabContent />
    </React.Suspense>
  );
} 