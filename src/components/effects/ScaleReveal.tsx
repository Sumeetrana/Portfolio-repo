"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps any section with a scale + fade entrance.
 * Replaces the basic ScrollReveal3D for richer transitions.
 */
export default function ScaleReveal({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo out — fast enter, soft settle
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
