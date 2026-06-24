"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Pins the hero behind all content sections:
 * – Hero sticks at z-index 0
 * – Sections (z-index 1) slide up over it
 * – Hero slowly zooms out + fades as sections cover it
 */
export default function HeroPinWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 0 }}>
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
