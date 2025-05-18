import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 2 + Math.random() * 3), 18);
    }
    return () => clearTimeout(frame);
  }, [progress]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(10,10,15,0.96)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.4s',
    }}>
      <Image src="/images/logo-alexpaul.png" alt="Logo" width={90} height={90} style={{ marginBottom: 32, filter: 'drop-shadow(0 2px 16px #ef4444)' }} />
      <div style={{ width: 220, maxWidth: '80vw', marginBottom: 18 }}>
        <div style={{ height: 8, background: '#23232a', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px #ef444422' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #ef4444 60%, #fff 100%)', borderRadius: 8, transition: 'width 0.18s' }} />
        </div>
      </div>
      <div style={{ color: '#fff', fontWeight: 700, letterSpacing: 2, fontSize: 18, opacity: 0.92 }}>LOADING</div>
    </div>
  );
} 