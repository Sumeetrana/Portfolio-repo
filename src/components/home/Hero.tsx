"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const FRAME_COUNT = 176;
const FRAME_BASE  = "/hero/ezgif-frame-";

function frameUrl(i: number) {
  return `${FRAME_BASE}${String(i + 1).padStart(3, "0")}.jpg`;
}

// Shared left-column wrapper — all panels use the same layout
function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center relative z-10">
      {/* Mobile: centered over full-screen video. Desktop: left column only */}
      <div className="w-full md:w-[45%] px-8 md:px-16 lg:px-20 flex flex-col items-center md:items-start text-center md:text-left">
        {children}
      </div>
    </div>
  );
}

// ── Panel 1: Introduction ─────────────────────────────────────────────────────
function Panel1() {
  return (
    <PanelShell>
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.22em] mb-5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Full-Stack Engineer · Abu Dhabi, UAE
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-50 leading-[1.05] tracking-tight mb-7"
        style={{ fontFamily: "var(--font-display)" }}
      >
        I Build Products
        <br />
        <span className="gradient-text">Startups Trust.</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex flex-row items-center gap-3 flex-wrap"
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start a Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-card border border-white/10 text-slate-200 font-semibold text-sm hover:bg-white/8 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          View My Work
        </Link>
      </motion.div>
    </PanelShell>
  );
}

// ── Panel 2: What I Build ─────────────────────────────────────────────────────
const SERVICES = [
  { title: "Web Development",  desc: "Next.js, React & TypeScript — fast, SEO-ready from day one." },
  { title: "Mobile Apps",      desc: "React Native for iOS & Android — one codebase, native feel." },
  { title: "AI & Automation",  desc: "LLM workflows and integrations that save your team hours." },
];

function Panel2() {
  return (
    <PanelShell>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.22em] mb-10"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What I Build
      </motion.p>

      <div className="flex flex-col gap-8">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border-t border-white/10 pt-5"
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-white leading-tight mb-1.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </PanelShell>
  );
}

// ── Panel 3: Call to Action ───────────────────────────────────────────────────
function Panel3() {
  return (
    <PanelShell>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.65 }}
      >
        <p
          className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.22em] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&apos;s Work Together
        </p>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Have an idea?
          <br />
          <span className="gradient-text">Let&apos;s build it.</span>
        </h2>

        <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed max-w-xs">
          Available for new projects — Abu Dhabi &amp; remote.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 hover:-translate-y-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get in Touch
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </motion.div>
    </PanelShell>
  );
}

// ── Hero: canvas image-sequence scrubber + 3-panel horizontal scroll ─────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const images       = useRef<HTMLImageElement[]>([]);
  const frameIndex   = useRef(0);
  const rafRef       = useRef<number>(0);
  const targetFrame  = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x              = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.25]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrame.current = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw image scaled to cover the canvas — shift right so character stays right of centre
    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const scaledW = img.naturalWidth * scale;
      const scaledH = img.naturalHeight * scale;
      const overflow = scaledW - cw;
      const dx = -(overflow * 0.3);
      const dy = (ch - scaledH) / 2;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = "blur(0.4px)";
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, scaledW, scaledH);
      ctx.filter = "none";
    };

    // Match canvas buffer exactly to CSS pixels — no DPR upscaling which blurs low-res source frames
    const resize = () => {
      const isDesktop = window.innerWidth >= 768;
      const cssW = isDesktop ? Math.round(window.innerWidth * 0.55) : window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width  = cssW;
      canvas.height = cssH;
      canvas.style.width  = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      const img = images.current[frameIndex.current];
      if (img?.complete && img.naturalWidth) drawCover(img);
    };
    resize();
    window.addEventListener("resize", resize);

    images.current = Array.from({ length: FRAME_COUNT }, () => new Image());

    const loadFrame = (i: number) => {
      const img = images.current[i];
      img.src = frameUrl(i);
      if (i === 0) {
        img.onload = () => drawCover(img);
      }
    };

    for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) loadFrame(i);

    const t = setTimeout(() => {
      for (let i = 10; i < FRAME_COUNT; i++) loadFrame(i);
    }, 1000);

    const tick = () => {
      const target = targetFrame.current;
      if (target !== frameIndex.current) {
        const img = images.current[target];
        if (img?.complete && img.naturalWidth) {
          drawCover(img);
          frameIndex.current = target;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} aria-label="Hero section">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050510]">

        {/* Right-side canvas — explicitly occupies the right 55% on desktop */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute top-0 right-0"
        />

        {/* Desktop only: feather on left edge of video */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 h-full w-[55%] pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to right, #050510 0%, rgba(5,5,16,0.92) 15%, rgba(5,5,16,0.5) 32%, rgba(5,5,16,0.1) 50%, transparent 65%)",
          }}
        />

        {/* Desktop only: subtle darkening overlay on video as scroll progresses */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="absolute top-0 right-0 h-full w-[55%] bg-[#050510] pointer-events-none hidden md:block"
        />

        {/* Mobile: full-screen dark gradient so text is readable over the video */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,16,0.55) 0%, rgba(5,5,16,0.35) 40%, rgba(5,5,16,0.65) 100%)",
          }}
        />

        {/* Floating info cards over the video — desktop only */}
        <div className="absolute top-0 right-0 h-full md:w-[55%] hidden md:flex flex-col justify-between py-28 px-8 pointer-events-none z-10">
          {/* Top-right: availability badge */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/70" style={{ fontFamily: "var(--font-display)" }}>Available for projects</span>
            </div>
          </div>
        </div>

        {/* Horizontal content track */}
        <motion.div
          style={{ x, display: "flex", width: "300vw", height: "100%" }}
          className="will-change-transform"
        >
          <Panel1 />
          <Panel2 />
          <Panel3 />
        </motion.div>

        {/* Scroll hint — always visible across all hero panels */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span
            className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.22em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-indigo-400/60 to-transparent" />
        </div>

      </div>
    </div>
  );
}
