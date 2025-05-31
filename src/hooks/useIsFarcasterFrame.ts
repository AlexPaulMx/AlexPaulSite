import { useEffect, useState } from 'react';

export const useIsFarcasterFrame = () => {
  const [isFarcasterFrame, setIsFarcasterFrame] = useState(false);

  useEffect(() => {
    // Check for Farcaster specific headers
    const checkFarcasterFrame = () => {
      // This is a simplified check. In production, you should check for specific Farcaster headers
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isFrame = window.self !== window.top;
      setIsFarcasterFrame(isFrame && userAgent.includes('farcaster'));
    };

    checkFarcasterFrame();
  }, []);

  return isFarcasterFrame;
}; 