import React from 'react';

export default function NoiseBg() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');
    function noise() {
      if (!ctx) return;
      let imgData = ctx.createImageData(w, h);
      let buf = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buf.length; i++) {
        let shade = Math.floor(Math.random() * 60) + 20;
        buf[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
      }
      ctx.putImageData(imgData, 0, 0);
    }
    let animId: number;
    function loop() {
      noise();
      animId = requestAnimationFrame(loop);
    }
    loop();
    function handleResize() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      // @ts-ignore
      ctx = null;
    };
  }, []);

  return <canvas ref={canvasRef} width={1920} height={1080} style={{position:'fixed',inset:0,width:'100vw',height:'100vh',zIndex:0,opacity:0.18,background:'#111'}} />;
} 