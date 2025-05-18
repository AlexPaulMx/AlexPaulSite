"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

export default function AppLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const prevPath = useRef<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on mount (first visit or refresh)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this only runs on mount

  useEffect(() => {
    // Handle page transitions
    if (prevPath.current) {
      const prevIndex = getPageIndex(prevPath.current);
      const currentIndex = getPageIndex(pathname);
      setDirection(prevIndex > currentIndex ? 'up' : 'down');
    }
    prevPath.current = pathname;
  }, [pathname]);

  const getPageIndex = (path: string) => {
    const pages = ['/', '/about', '/thelab', '/music', '/contact'];
    return pages.indexOf(path);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className={`transition-transform duration-500 ease-in-out ${
          direction === 'up' ? 'translate-y-[-100%]' : 'translate-y-[100%]'
        }`}
      >
        {children}
      </div>
    </>
  );
} 