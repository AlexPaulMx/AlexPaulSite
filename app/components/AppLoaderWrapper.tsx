"use client";
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ORDER = ["/", "/about", "/thelab"];

export default function AppLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [direction, setDirection] = useState<"up"|"down">("down");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      const prevIdx = NAV_ORDER.indexOf(prevPath.current);
      const nextIdx = NAV_ORDER.indexOf(pathname);
      setDirection(nextIdx > prevIdx ? "down" : "up");
      prevPath.current = pathname;
    }
  }, [pathname]);

  if (loading) return <Loader />;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: direction === "down" ? 60 : -60
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: direction === "down" ? -60 : 60
        }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 