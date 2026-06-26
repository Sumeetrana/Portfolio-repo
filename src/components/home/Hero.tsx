"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import Link from "next/link";
import React from "react";

const FRAME_COUNT = 176;
const FRAME_BASE  = "/hero/ezgif-frame-";

function frameUrl(i: number) {
  return `${FRAME_BASE}${String(i + 1).padStart(3, "0")}.jpg`;
}

// ── Shared panel dot (hooks must live at component top-level) ─────────────────
function PanelDot({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const COUNT = 3;
  const lo  = Math.max(0, (index - 0.4) / COUNT);
  const mid = index / COUNT;
  const hi  = Math.min(1, (index + 0.4) / COUNT);
  const scale   = useTransform(progress, [lo, mid, hi], [1, 1.8, 1]);
  const opacity = useTransform(progress, [Math.max(0, (index - 0.3) / COUNT), mid, Math.min(1, (index + 0.3) / COUNT)], [0.25, 1, 0.25]);
  return <motion.span style={{ scale, opacity }} className="block w-2 h-2 rounded-full bg-white/50" />;
}

// ── Panel 1: Introduction ─────────────────────────────────────────────────────
function Panel1() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative z-10">
      <div className="container-custom pt-28 pb-12 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-indigo-500/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-400 font-medium">Available for new projects</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 leading-[1.1] tracking-tight mb-6 max-w-5xl mx-auto"
        >
          I Build High-Performance{" "}
          <span className="gradient-text">Websites</span>,{" "}
          <span className="gradient-text">Mobile Apps</span> &{" "}
          <span className="gradient-text">Scalable Digital Products</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 mx-auto mb-10 leading-relaxed"
          style={{ maxWidth: "600px", textWrap: "balance" } as React.CSSProperties}
        >
          I help startups, businesses, and founders turn ideas into fast, modern,
          SEO&#8209;friendly web and mobile experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-row items-center justify-center gap-3 mb-10 flex-wrap"
        >
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap">
            Start a Project
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card border border-white/10 text-slate-200 font-semibold text-base hover:bg-white/8 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap">
            View My Work
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: "5+",  label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "99%", label: "Client Satisfaction" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── Panel 2: What I Build ─────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Lightning-fast websites and web apps built with Next.js, React & TypeScript — optimised for Core Web Vitals and SEO from day one.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel"],
    stat: "90+ PageSpeed",
    color: "from-indigo-500/20 to-violet-500/10",
    border: "border-indigo-500/20",
    accent: "text-indigo-400",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps using React Native. One codebase, native feel, App Store ready — delivered in weeks, not months.",
    tags: ["React Native", "Expo", "iOS", "Android"],
    stat: "2× Faster Launch",
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    accent: "text-violet-400",
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    desc: "LLM-powered features, intelligent workflows and API integrations that save your team hours every week and open new revenue streams.",
    tags: ["OpenAI", "LangChain", "Node.js", "Zapier"],
    stat: "10× Productivity",
    color: "from-cyan-500/20 to-indigo-500/10",
    border: "border-cyan-500/20",
    accent: "text-cyan-400",
  },
];

function Panel2() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative z-10">
      <div className="container-custom px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block mb-3">What I Build</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Three ways I can <span className="gradient-text">help you grow</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 border ${s.border} bg-gradient-to-br ${s.color} hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className={`text-xs font-bold uppercase tracking-widest ${s.accent} mb-2`}>{s.stat}</div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className={`text-xs px-2.5 py-1 rounded-full bg-white/5 ${s.accent} border ${s.border}`}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Panel 3: Call to Action ───────────────────────────────────────────────────
function Panel3() {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center relative z-10">
      <div className="container-custom text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-card border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400 font-medium">Open to new projects · Abu Dhabi, UAE</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary?</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether it's a new product, a performance overhaul, or an AI integration — let's turn your idea into a live, revenue-generating product.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 hover:-translate-y-1"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <a
              href="mailto:sumeet.rana@innovaccer.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card border border-white/10 text-slate-300 font-medium text-base hover:bg-white/8 hover:border-white/20 transition-all duration-200 hover:-translate-y-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Send an Email
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "50+", label: "Projects Shipped" },
              { value: "30+", label: "Happy Clients" },
              { value: "UAE", label: "Based In" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
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
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.65, 0.72]);

  // Map scroll progress → target frame index
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

    // Preload first 10 frames immediately, rest after a short delay
    images.current = Array.from({ length: FRAME_COUNT }, () => new Image());

    const loadFrame = (i: number) => {
      const img = images.current[i];
      img.src = frameUrl(i);
      if (i === 0) {
        img.onload = () => {
          canvas.width  = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);
        };
      }
    };

    // First 10 frames immediately for instant first paint
    for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) loadFrame(i);

    // Rest after 1s — by then the page is interactive
    const t = setTimeout(() => {
      for (let i = 10; i < FRAME_COUNT; i++) loadFrame(i);
    }, 1000);

    // RAF loop: draw only when the frame index changes
    const tick = () => {
      const target = targetFrame.current;
      if (target !== frameIndex.current) {
        const img = images.current[target];
        if (img?.complete) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          frameIndex.current = target;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} aria-label="Hero section">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050510]">

        {/* Image-sequence canvas — scroll-driven, frame-perfect */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay darkens slightly as you scroll deeper into the panels */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#050510] pointer-events-none"
        />

        {/* Shared: floating tech badges (desktop only) */}
        {[
          { text: "Next.js 15",   pos: "top-28 left-[8%]",   delay: 0.8 },
          { text: "React Native", pos: "top-40 right-[8%]",  delay: 1.0 },
          { text: "Node.js",      pos: "bottom-32 left-[10%]", delay: 1.2 },
          { text: "AWS Cloud",    pos: "bottom-40 right-[8%]", delay: 1.4 },
        ].map(({ text, pos, delay }) => (
          <motion.div
            key={text}
            aria-hidden="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className={`absolute ${pos} hidden xl:block pointer-events-none z-20`}
          >
            <div className="tech-badge animate-float-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {text}
            </div>
          </motion.div>
        ))}

        {/* Horizontal content track */}
        <motion.div
          style={{ x, display: "flex", width: "300vw", height: "100%" }}
          className="will-change-transform"
        >
          <Panel1 />
          <Panel2 />
          <Panel3 />
        </motion.div>

        {/* Panel indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          <PanelDot progress={scrollYProgress} index={0} />
          <PanelDot progress={scrollYProgress} index={1} />
          <PanelDot progress={scrollYProgress} index={2} />
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-indigo-500/50 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
