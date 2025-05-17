import React, { useRef, useEffect, useState } from 'react';

const palettes = [
  [200, 270, 190],
  [140, 40, 320],
  [51, 0, 168],
  [270, 190, 320],
  [40, 200, 140],
];
const trailColorsArr = [
  'rgba(59,130,246,0.22)',
  'rgba(34,197,94,0.22)',
  'rgba(236,72,153,0.22)',
  'rgba(251,191,36,0.22)',
  'rgba(16,185,129,0.22)',
  'rgba(244,63,94,0.22)',
  'rgba(139,92,246,0.22)',
  'rgba(20,184,166,0.22)',
  'rgba(253,186,116,0.22)',
];

const HeatmapBackground = () => {
  const gradRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trail = useRef<{x:number,y:number}[]>([]);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [trailColorIdx, setTrailColorIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailColorIdx(idx => (idx + 1) % trailColorsArr.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gradCanvas = gradRef.current;
    if (gradCanvas) {
      gradCanvas.width = window.innerWidth;
      gradCanvas.height = window.innerHeight;
    }
    let gradAnimId: number;
    function drawGradientBg() {
      if (!gradCanvas) return;
      const ctx = gradCanvas.getContext('2d');
      if (!ctx) return;
      const t = Date.now() / 3000;
      const pal = palettes[paletteIdx];
      const grad = ctx.createLinearGradient(0, 0, gradCanvas.width, gradCanvas.height);
      grad.addColorStop(0, `hsl(${pal[0] + Math.sin(t)*40}, 80%, 16%)`);
      grad.addColorStop(0.5, `hsl(${pal[1] + Math.cos(t*1.2)*40}, 80%, 18%)`);
      grad.addColorStop(1, `hsl(${pal[2] + Math.sin(t+1)*40}, 90%, 20%)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, gradCanvas.width, gradCanvas.height);
      gradAnimId = requestAnimationFrame(drawGradientBg);
    }
    drawGradientBg();
    window.addEventListener('resize', () => {
      if (gradCanvas) {
        gradCanvas.width = window.innerWidth;
        gradCanvas.height = window.innerHeight;
      }
    });
    return () => cancelAnimationFrame(gradAnimId);
  }, [paletteIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      trail.current.push({x: mouse.x, y: mouse.y});
      if (trail.current.length > 12) trail.current.shift();
      for (let i = 0; i < trail.current.length; i++) {
        const t = trail.current[i];
        const r = 60 + i*10;
        const color = i === trail.current.length-1 ? trailColorsArr[trailColorIdx] : trailColorsArr[(trailColorIdx+i)%trailColorsArr.length].replace('0.22','0.10');
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [trailColorIdx]);

  return <>
    <canvas ref={gradRef} style={{position:'fixed',inset:0,width:'100vw',height:'100vh',zIndex:0,pointerEvents:'none'}} />
    <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100vw',height:'100vh',zIndex:1,pointerEvents:'none'}} />
  </>;
};

export default HeatmapBackground; 