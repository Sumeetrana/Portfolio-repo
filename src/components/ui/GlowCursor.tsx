"use client";

import { useEffect, useRef } from "react";

const TRAIL = 14;

export default function GlowCursor() {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(Array.from({ length: TRAIL }, () => ({ x: -200, y: -200 })));
  const mouse = useRef({ x: -200, y: -200 });
  const visible = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dotsRef.current.forEach(d => d && (d.style.opacity = "1"));
      }
    };
    const onLeave = () => {
      visible.current = false;
      dotsRef.current.forEach(d => d && (d.style.opacity = "0"));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let rafId: number;
    const lerps = [0.22, ...Array.from({ length: TRAIL - 1 }, (_, i) => 0.55 - i * 0.03)];

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      pos.current[0].x += (mouse.current.x - pos.current[0].x) * lerps[0];
      pos.current[0].y += (mouse.current.y - pos.current[0].y) * lerps[0];
      for (let i = 1; i < TRAIL; i++) {
        pos.current[i].x += (pos.current[i-1].x - pos.current[i].x) * lerps[i];
        pos.current[i].y += (pos.current[i-1].y - pos.current[i].y) * lerps[i];
      }
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const { x, y } = pos.current[i];
        dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      });
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => {
        const scale = 1 - i / TRAIL;
        const size  = 18 + i * 2;
        const blur  = i * 1.5;
        const glow  = 6 + i * 3;
        return (
          <div
            key={i}
            ref={el => { dotsRef.current[i] = el; }}
            style={{
              position: "fixed",
              left: 0, top: 0,
              width:  size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(139,92,246,${0.9 - i*0.06}) 0%, rgba(99,102,241,${0.5 - i*0.03}) 60%, transparent 100%)`,
              filter: `blur(${blur}px)`,
              boxShadow: `0 0 ${glow}px rgba(139,92,246,${0.7 - i*0.05})`,
              transform: `scale(${scale})`,
              opacity: 0,
              transition: "opacity 0.3s",
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
