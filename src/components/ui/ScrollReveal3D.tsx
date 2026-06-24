"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal3D({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll 0→0.25: section enters from below (tilted forward, scaled down)
  // Scroll 0.25→0.75: fully in view (flat, full scale)
  // Scroll 0.75→1: exits above (tilts back, slightly shrinks)
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [14, 0, 0, -9]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.91, 1, 1, 0.95]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.65]
  );
  const y = useTransform(scrollYProgress, [0, 0.22], [48, 0]);

  // Spring-smooth the transforms
  const sRotateX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const sScale   = useSpring(scale,   { stiffness: 80, damping: 20 });
  const sY       = useSpring(y,       { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} style={{ perspective: "1400px" }} className={className}>
      <motion.div
        style={{
          rotateX: sRotateX,
          scale: sScale,
          opacity,
          y: sY,
          transformOrigin: "50% 0%",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
