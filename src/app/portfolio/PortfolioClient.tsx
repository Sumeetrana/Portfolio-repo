"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/data";

type FilterTab = "All" | "Web" | "Mobile" | "SaaS" | "AI";

const filterConfig: Record<FilterTab, string[]> = {
  All: [],
  Web: ["homehub", "dogstudio", "3d-portfolio", "genienow"],
  Mobile: ["genienow", "fleettrack"],
  SaaS: ["homehub", "fleettrack"],
  AI: ["ai-content-agent"],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut" as const,
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const tabs: FilterTab[] = ["All", "Web", "Mobile", "SaaS", "AI"];

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => filterConfig[activeTab].includes(p.slug));

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#050510" }}>
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="gradient-bg absolute inset-0 opacity-30" />
        <div className="dot-pattern absolute inset-0 opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
              Portfolio
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-4xl mx-auto"
          >
            Projects Built to{" "}
            <span className="gradient-text">Solve Real Problems</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-10"
          >
            A mix of live shipped products and self-initiated concepts — each demonstrating full-stack engineering depth across real-world industries.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
                {tab !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({filterConfig[tab].length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-4">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  id={project.slug}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/25 transition-colors duration-300 flex flex-col"
                >
                  {/* Card Header */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${project.color} p-8 flex flex-col justify-between overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />
                    </div>
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white/80 border border-white/20 backdrop-blur-sm mb-3">
                        {project.label}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                      <p className="text-white/75 text-sm mt-1">{project.subtitle}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Problem */}
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
                        The Problem
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
                        The Solution
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mt-0.5">
                              <svg
                                className="w-2.5 h-2.5 text-indigo-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Business Value */}
                    <div
                      className={`rounded-2xl p-4 bg-gradient-to-br ${project.gradient} border border-white/5 mb-6`}
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
                        Business Value
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed">{project.businessValue}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      {"liveUrl" in project && project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          View Live Site
                        </a>
                      )}
                      <Button
                        href={`/contact?project=${project.slug}`}
                        variant="secondary"
                        size="sm"
                        className="flex-1 justify-center"
                      >
                        Start Similar Project
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-16">
        <div className="container-custom">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-500 text-sm max-w-2xl mx-auto px-4 py-6 border-t border-white/5"
          >
            Projects marked <span className="text-indigo-400">Live · Deployed on Vercel</span> are real shipped products. Others are self-initiated concepts demonstrating full-stack engineering depth.
          </motion.p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-10 md:p-16 text-center border border-indigo-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/5 to-cyan-600/10 rounded-3xl" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                Ready to Build?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Let&apos;s turn your idea into a product. I&apos;m available for new projects in Abu Dhabi and globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Project
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore Services
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
