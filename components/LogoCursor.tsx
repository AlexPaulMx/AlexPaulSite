"use client";
import React, { useRef, useEffect } from "react";

export default function LogoCursor() {
  const cursorRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let animationId: number;
    let lastX = window.innerWidth/2, lastY = window.innerHeight/2;
    const move = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener('mousemove', move);
    function animate() {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${lastX-16}px,${lastY-16}px,0)`;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    document.body.style.cursor = 'none';
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(animationId);
      document.body.style.cursor = '';
    };
  }, []);
  return (
    <img
      ref={cursorRef}
      src="/images/logo-alexpaul.png"
      alt="Cursor Logo"
      height={48}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: 48,
        width: 'auto',
        pointerEvents: 'none',
        zIndex: 2147483647,
        transition: 'transform 0.12s',
        filter: 'drop-shadow(0 0 12px #FFD600) saturate(2)',
        mixBlendMode: 'normal',
        opacity: 1,
        aspectRatio: 'auto',
      }}
    />
  );
} 