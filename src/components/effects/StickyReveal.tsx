"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Section layout where the eyebrow + title stick to the left
 * on desktop while the right-side content scrolls past it.
 * On mobile it's a simple stacked layout.
 */
export default function StickyReveal({ eyebrow, title, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0, 0.15], [32, 0]);

  return (
    <div ref={ref} className="relative">
      <div className="container-custom">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 xl:gap-24">

          {/* Sticky left label (desktop) */}
          <div className="hidden lg:block">
            <motion.div
              style={{ opacity: labelOpacity, y: labelY }}
              className="sticky top-32 pb-8"
            >
              <span className="block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                {eyebrow}
              </span>
              <h2 className="text-2xl font-bold text-slate-100 leading-snug">{title}</h2>
              <div className="mt-6 w-8 h-px bg-indigo-500/40" />
            </motion.div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden mb-10">
            <span className="block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              {eyebrow}
            </span>
            <h2 className="text-3xl font-bold text-slate-100">{title}</h2>
          </div>

          {/* Scrolling content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
