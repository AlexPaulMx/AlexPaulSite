import { useEffect, useState } from "react";

const EMOJIS = ["💸", "🤑", "💵", "💰"];
const COUNT = 30;

export default function MoneyRain({ show = false, duration = 2500 }: { show: boolean; duration?: number }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {Array.from({ length: COUNT }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "-2em",
              fontSize: "2rem",
              animation: `money-fall 2.2s linear ${delay}s forwards`,
              pointerEvents: "none",
            }}
          >
            {emoji}
          </span>
        );
      })}
      <style jsx global>{`
        @keyframes money-fall {
          to {
            transform: translateY(110vh) rotate(30deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
} 