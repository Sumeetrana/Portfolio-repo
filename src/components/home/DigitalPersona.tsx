"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PersonaScene = dynamic(() => import("@/components/three/PersonaScene"), { ssr: false });

const traits = [
  "Problem Solver", "Clean Code", "Performance First",
  "UX Driven", "API Expert", "Cloud Native", "AI Explorer", "Open Source",
];

const stats = [
  { val: "5+",  label: "Years" },
  { val: "50+", label: "Projects" },
  { val: "15+", label: "Tech Stack" },
  { val: "UAE", label: "Based In" },
];

export default function DigitalPersona() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #0a0820 50%, #050510 100%)" }}
      aria-label="About Sumeet Rana"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Side glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-72 h-72 -translate-y-1/2 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left: Content ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full glass-card border border-indigo-500/25">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-sm text-indigo-300 font-medium tracking-wide">Digital Identity</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-slate-100">Meet the</span>
              <br />
              <span className="gradient-text">Engineer Behind</span>
              <br />
              <span className="text-slate-100">the Code</span>
            </h2>

            <p className="text-slate-400 leading-relaxed mb-6 text-base">
              Senior Software Engineer based in Abu Dhabi, UAE with 5+ years of
              experience building scalable web apps, mobile products, backend
              systems, and AI-powered tools. I turn complex problems into elegant
              digital solutions.
            </p>

            {/* Trait badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg glass-card border border-indigo-500/20 text-xs text-indigo-300 font-medium"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-4 gap-3 mb-7">
              {stats.map(({ val, label }) => (
                <div key={label} className="glass-card rounded-xl p-3 text-center border border-white/5">
                  <div className="text-xl font-bold gradient-text">{val}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl glass-card border border-emerald-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
              </span>
              <span className="text-sm text-slate-300">Available for new projects · Abu Dhabi, UAE</span>
            </div>
          </motion.div>

          {/* ── Right: 3D Persona ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[480px] lg:h-[580px]"
          >
            <PersonaScene />

            {/* Floating terminal badges */}
            {[
              { text: "> sumeet.init()",     pos: "top-6 right-6",    col: "indigo", delay: "0s"   },
              { text: "> skills: expert",    pos: "bottom-16 left-4", col: "violet", delay: "0.8s" },
              { text: "> status: building",  pos: "top-1/2 right-3",  col: "cyan",   delay: "1.5s" },
              { text: "> location: UAE",     pos: "bottom-6 right-8", col: "emerald",delay: "2s"   },
            ].map(({ text, pos, col, delay }) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseFloat(delay) + 0.5 }}
                className={`absolute ${pos} glass-card border border-${col}-500/30 px-3 py-1.5 rounded-lg text-xs text-${col}-300 font-mono animate-float-slow pointer-events-none`}
                style={{ animationDelay: delay }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
