"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Props {
  children: React.ReactNode[];
  label?: string;
}

// Extracted so useTransform is called at the top level of a component, not inside .map()
function PanelDot({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  // Clamp all offsets to [0, 1] — negative offsets crash the WAAPI layer
  const lo = Math.max(0, (index - 0.4) / count);
  const mid = index / count;
  const hi = Math.min(1, (index + 0.4) / count);

  const loO = Math.max(0, (index - 0.3) / count);
  const hiO = Math.min(1, (index + 0.3) / count);

  const scale   = useTransform(progress, [lo,  mid, hi],  [1, 1.7, 1]);
  const opacity = useTransform(progress, [loO, mid, hiO], [0.25, 1, 0.25]);

  return (
    <motion.span
      style={{ scale, opacity }}
      className="block w-1.5 h-1.5 rounded-full bg-white/60"
    />
  );
}

function ScrollHint({
  progress,
  label,
}: {
  progress: MotionValue<number>;
  label: string;
}) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
    >
      <span className="text-xs text-white/30 uppercase tracking-widest">{label}</span>
      <div className="w-px h-8 bg-gradient-to-b from-indigo-500/50 to-transparent" />
    </motion.div>
  );
}

export default function HorizontalScrollSection({ children, label }: Props) {
  const count = children.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `${-(count - 1) * 100}vw`]
  );

  return (
    <div ref={containerRef} style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Horizontal track */}
        <motion.div
          style={{ x, display: "flex", width: `${count * 100}vw`, height: "100%" }}
        >
          {children}
        </motion.div>

        {/* Panel dots — each is its own component so hooks are called at top level */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {children.map((_, i) => (
            <PanelDot key={i} progress={scrollYProgress} index={i} count={count} />
          ))}
        </div>

        <ScrollHint progress={scrollYProgress} label={label ?? "Scroll to explore"} />
      </div>
    </div>
  );
}
