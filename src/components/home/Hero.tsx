"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const words = ["Websites", "Mobile Apps", "Scalable Products"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
      aria-label="Hero section"
    >
      {/* Three.js scene */}
      <HeroScene />

      {/* Subtle dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#050510]/40 pointer-events-none" aria-hidden="true" />

      {/* Floating tech labels */}
      {[
        { text: "Next.js 15", pos: "top-28 left-[8%]", delay: 0.8 },
        { text: "React Native", pos: "top-40 right-[8%]", delay: 1.0 },
        { text: "Node.js", pos: "bottom-32 left-[10%]", delay: 1.2 },
        { text: "AWS Cloud", pos: "bottom-40 right-[8%]", delay: 1.4 },
      ].map(({ text, pos, delay }) => (
        <motion.div
          key={text}
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.6 }}
          className={`absolute ${pos} hidden xl:block`}
        >
          <div className="tech-badge animate-float-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            {text}
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="container-custom relative z-10 pt-28 pb-12 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card border border-indigo-500/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-400 font-medium">
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-400 mx-auto mb-10 leading-relaxed text-center"
          style={{ maxWidth: "600px", textWrap: "balance" } as React.CSSProperties}
        >
          I help startups, businesses, and founders turn ideas into fast, modern, SEO&#8209;friendly web and mobile experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-row items-center justify-center gap-3 mb-10 flex-wrap"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            Start a Project
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-card border border-white/10 text-slate-200 font-semibold text-base hover:bg-white/8 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
          >
            View My Work
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "99%", label: "Client Satisfaction" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
