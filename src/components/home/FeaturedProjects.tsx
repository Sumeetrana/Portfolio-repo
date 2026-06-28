"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";
import HorizontalScrollSection from "@/components/effects/HorizontalScrollSection";

// Per-panel visual identity
const PANELS = [
  {
    // HomeHub — property / real estate
    base: "bg-[#04080f]",
    glow1: { color: "bg-emerald-500/10", pos: "top-[-10%] right-[10%]", size: "w-[700px] h-[700px]" },
    glow2: { color: "bg-indigo-600/12", pos: "bottom-[-5%] left-[5%]",  size: "w-[500px] h-[500px]" },
    glow3: { color: "bg-teal-400/6",    pos: "top-[40%] left-[40%]",    size: "w-[400px] h-[400px]" },
    accent: { text: "text-emerald-400", border: "border-emerald-500/30", chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25" },
    line: "from-emerald-500/60 to-transparent",
    tag: "Real Estate Tech",
  },
  {
    // Dogstudio — creative agency
    base: "bg-[#08040f]",
    glow1: { color: "bg-violet-600/14",  pos: "top-[-5%] left-[20%]",   size: "w-[650px] h-[650px]" },
    glow2: { color: "bg-pink-500/8",     pos: "bottom-[0%] right-[5%]", size: "w-[500px] h-[500px]" },
    glow3: { color: "bg-purple-400/6",   pos: "top-[50%] right-[30%]",  size: "w-[350px] h-[350px]" },
    accent: { text: "text-violet-400", border: "border-violet-500/30", chip: "bg-violet-500/10 text-violet-300 border-violet-500/25" },
    line: "from-violet-500/60 to-transparent",
    tag: "Creative Agency",
  },
  {
    // 3D Portfolio — creative / animation
    base: "bg-[#04060f]",
    glow1: { color: "bg-cyan-500/10",    pos: "top-[5%] right-[15%]",   size: "w-[600px] h-[600px]" },
    glow2: { color: "bg-blue-600/12",    pos: "bottom-[-5%] left-[10%]", size: "w-[550px] h-[550px]" },
    glow3: { color: "bg-indigo-400/7",   pos: "top-[45%] left-[35%]",   size: "w-[400px] h-[400px]" },
    accent: { text: "text-cyan-400", border: "border-cyan-500/30", chip: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25" },
    line: "from-cyan-500/60 to-transparent",
    tag: "3D / Animation",
  },
];

function ProjectPanel({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const p = PANELS[index % PANELS.length];
  const num = String(index + 1).padStart(2, "0");
  const liveUrl = "liveUrl" in project ? (project as typeof project & { liveUrl?: string }).liveUrl : undefined;

  return (
    <div className={`relative w-screen h-screen flex-shrink-0 ${p.base} overflow-hidden`}>

      {/* Multi-point glow layer */}
      <div aria-hidden="true" className={`absolute ${p.glow1.pos} ${p.glow1.size} rounded-full ${p.glow1.color} blur-[120px] pointer-events-none`} />
      <div aria-hidden="true" className={`absolute ${p.glow2.pos} ${p.glow2.size} rounded-full ${p.glow2.color} blur-[100px] pointer-events-none`} />
      <div aria-hidden="true" className={`absolute ${p.glow3.pos} ${p.glow3.size} rounded-full ${p.glow3.color} blur-[80px] pointer-events-none`} />

      {/* Subtle grid */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* Vignette edges */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
      }} />

      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-14 lg:p-20 max-w-5xl">

        {/* Top: number + tag */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5"
        >
          <span className={`text-6xl md:text-8xl font-black leading-none select-none ${p.accent.text} opacity-10`}>
            {num}
          </span>
          <div className="flex flex-col gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${p.accent.text}`}>{p.tag}</span>
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${p.accent.chip} border w-fit`}>
              {project.label}
            </span>
          </div>
        </motion.div>

        {/* Middle: title + description */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-2xl"
        >
          {/* Accent line */}
          <div className={`h-px w-16 bg-gradient-to-r ${p.line} mb-6`} />
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            {project.title}
          </h3>
          <p className={`text-sm font-semibold uppercase tracking-widest ${p.accent.text} mb-5`}>{project.subtitle}</p>
          <p className="text-base text-slate-400 leading-relaxed max-w-lg">
            {project.solution.slice(0, 160)}…
          </p>
        </motion.div>

        {/* Bottom: tech + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-5"
        >
          {/* Tech chips */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className={`text-xs px-3 py-1.5 rounded-full ${p.accent.chip} border font-medium`}>{t}</span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-500 border border-white/10">+{project.tech.length - 5}</span>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Site
              </a>
            )}
            <Link
              href={`/portfolio#${project.slug}`}
              className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full border ${p.accent.border} ${p.accent.text} hover:bg-white/5 transition-all duration-300 text-sm font-semibold`}
            >
              Case Study
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section aria-labelledby="projects-heading">
      {/* Intro */}
      <div className="section-padding container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Featured Work
          </span>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Projects That <span className="gradient-text">Deliver Impact</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Scroll through selected projects — each built to solve a real problem.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll panels */}
      <HorizontalScrollSection label="Scroll to explore projects">
        {featured.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} index={i} />
        ))}
      </HorizontalScrollSection>

      {/* View all */}
      <div className="container-custom py-16 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/8 hover:border-white/20 transition-all duration-200"
          >
            View Full Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
