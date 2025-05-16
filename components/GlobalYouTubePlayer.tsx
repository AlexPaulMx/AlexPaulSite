"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function GlobalYouTubePlayer() {
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/" && !minimized) setMinimized(true);
    if (pathname === "/" && minimized) setMinimized(false);
  }, [pathname]);

  const player = (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        right: minimized ? 24 : "50%",
        bottom: minimized ? 24 : "auto",
        left: minimized ? "auto" : "50%",
        top: minimized ? "auto" : 120,
        transform: minimized ? "none" : "translate(-50%, 0)",
        width: minimized ? 320 : 720,
        height: minimized ? 180 : 405,
        boxShadow: "0 4px 32px #000a",
        borderRadius: 16,
        overflow: "hidden",
        background: "#000",
        transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        pointerEvents: "auto"
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/eZQZFU31lVM?autoplay=1&mute=0&controls=1&loop=1&playlist=eZQZFU31lVM"
        title="Alex Paul - Más reciente canción"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: "block" }}
      />
      {minimized && (
        <button
          onClick={() => setMinimized(false)}
          style={{
            position: "absolute",
            left: 8,
            top: 8,
            background: "#FFD600",
            color: "#111",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            padding: "4px 12px",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          ⬆️
        </button>
      )}
      {!minimized && (
        <button
          onClick={() => setMinimized(true)}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            background: "#FFD600",
            color: "#111",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            padding: "4px 12px",
            cursor: "pointer",
            zIndex: 2
          }}
        >
          ⬇️
        </button>
      )}
    </div>
  );

  if (!mounted) return null;
  return createPortal(player, document.body);
} 