"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function CaseStudiesClient() {
  return (
    <main className="min-h-screen" style={{ background: "#050510" }}>
      {/* Hero */}
      <section className="section-padding pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Inside the Build:{" "}
              <span className="gradient-text">How I Solve Real Problems</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              A deep dive into how each project was designed, engineered, and
              optimised — from problem discovery to production-ready solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card border border-indigo-500/20 rounded-xl p-4 flex gap-3 items-start"
        >
          <span className="text-indigo-400 text-xl mt-0.5">ℹ</span>
          <p className="text-white/50 text-sm">
            All projects below are self-initiated portfolio concepts built to
            demonstrate real-world engineering decisions, architecture patterns,
            and product thinking. They are not live commercial products.
          </p>
        </motion.div>
      </section>

      {/* Project Cards */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group">
                  {/* Gradient stripe */}
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${project.color}`}
                  />
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                      {/* Left: Content */}
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
                          {project.label}
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-indigo-400 font-medium mb-5">
                          {project.subtitle}
                        </p>

                        {/* Problem Summary */}
                        <div
                          className={`rounded-xl p-4 mb-6 bg-gradient-to-br ${project.gradient} border border-white/5`}
                        >
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                            The Problem
                          </p>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span key={t} className="tech-badge">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:min-w-[180px]">
                        <Link
                          href={`/case-studies/${project.slug}`}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap`}
                        >
                          Read Case Study
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                        <span className="text-white/30 text-xs">
                          {project.tech.length} technologies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-10 text-center border border-indigo-500/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Let&apos;s talk about your idea. I help founders and businesses
              turn complex problems into clean, scalable products.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start a Conversation
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
