"use client";
import dynamic from "next/dynamic";
import React from "react";
const TheLabHeatmapBackground = dynamic(() => import("../components/HeatmapBackground"), { ssr: false });

export default function HeatmapGlobal() {
  // Debug: muestra si el componente se monta
  React.useEffect(() => {
    console.log("[HeatmapGlobal] MONTADO");
  }, []);
  return (
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',width:'100vw',height:'100vh'}}>
      <TheLabHeatmapBackground />
    </div>
  );
} 