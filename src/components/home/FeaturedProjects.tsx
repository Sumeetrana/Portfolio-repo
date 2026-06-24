"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";
import HorizontalScrollSection from "@/components/effects/HorizontalScrollSection";

const PANEL_GRADIENTS = [
  "from-indigo-950 via-[#050510] to-violet-950",
  "from-[#050510] via-violet-950 to-[#050520]",
  "from-violet-950 via-[#06050f] to-indigo-950",
];

const ACCENTS = [
  { text: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-500/10", glow: "bg-indigo-500/8" },
  { text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10", glow: "bg-violet-500/8" },
  { text: "text-cyan-400",   border: "border-cyan-500/30",   bg: "bg-cyan-500/10",   glow: "bg-cyan-500/8"   },
];

function ProjectPanel({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const acc = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative w-screen h-screen flex-shrink-0 bg-gradient-to-br ${PANEL_GRADIENTS[index % PANEL_GRADIENTS.length]} overflow-hidden`}
    >
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
      <div aria-hidden="true" className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${acc.glow} blur-[140px]`} />

      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16 lg:p-20 max-w-5xl">

        {/* Number + label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <span className={`text-7xl md:text-9xl font-black leading-none select-none ${acc.text} opacity-15`}>
            {num}
          </span>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-widest ${acc.text} block mb-1`}>{project.label}</span>
            <div className={`h-px w-12 ${acc.bg}`} />
          </div>
        </motion.div>

        {/* Title + description */}
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl"
          >
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              {project.title}
            </h3>
            <p className={`text-sm font-semibold uppercase tracking-widest ${acc.text} mb-4`}>{project.subtitle}</p>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
              {project.solution.slice(0, 160)}…
            </p>
          </motion.div>
        </div>

        {/* Tech + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-end gap-6"
        >
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className={`text-xs px-3 py-1.5 rounded-full ${acc.bg} ${acc.text} border ${acc.border} font-medium`}>{t}</span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-500 border border-white/10">+{project.tech.length - 5}</span>
            )}
          </div>
          <Link
            href={`/case-studies/${project.slug}`}
            className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border ${acc.border} ${acc.text} hover:${acc.bg} transition-all duration-300 text-sm font-semibold shrink-0`}
          >
            View Case Study
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
