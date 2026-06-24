"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  subtitle: string;
  label: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  businessValue: string;
  color: string;
  gradient: string;
};

type Props = {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
};

// Infer tech category based on name
function categorizeTech(tech: string): string {
  const frontend = ["Next.js", "React", "React Native", "Three.js", "Tailwind CSS", "Expo"];
  const backend = ["Node.js", "NestJS", "FastAPI", "Python", "Express", "LangChain", "OpenAI", "Celery"];
  const database = ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Firebase"];
  const cloud = ["AWS", "GCP", "AWS IoT", "Vercel", "Azure", "Docker", "Kubernetes"];
  const other = ["Stripe", "Socket.io", "WebSockets", "Google Maps API", "Mapbox", "Mapbox"];

  if (frontend.some((f) => tech.includes(f))) return "Frontend";
  if (backend.some((b) => tech.includes(b))) return "Backend";
  if (database.some((d) => tech.includes(d))) return "Database";
  if (cloud.some((c) => tech.includes(c))) return "Cloud";
  if (other.some((o) => tech.includes(o))) return "Integration";
  return "Other";
}

const v2Ideas: Record<string, string[]> = {
  genienow: [
    "AI-powered service matching that auto-suggests the right provider based on job photos",
    "Dynamic surge pricing during peak demand periods with provider earnings boost",
    "Subscription bundles (e.g., Monthly Home Care Pack) with pre-booked slots",
  ],
  "ai-content-agent": [
    "Multi-language support to auto-translate and localise content for Arabic markets",
    "AI video script generator that turns articles into short-form video content",
    "Built-in A/B testing for headlines and meta descriptions with auto-optimisation",
  ],
  quickbite: [
    "AI-powered upsell suggestions ('Customers who ordered this also loved…')",
    "WhatsApp ordering integration — customers order directly via chat",
    "Dynamic menu pricing based on time of day and stock availability",
  ],
  fitflow: [
    "AI personal trainer that generates custom workout plans based on attendance data",
    "Wearable integration (Apple Watch, Garmin) for real-time class heart rate tracking",
    "In-app community feed for member challenges and progress sharing",
  ],
  fleettrack: [
    "Predictive maintenance alerts using IoT sensor data and ML anomaly detection",
    "Carbon footprint dashboard for sustainability reporting compliance",
    "AI dispatch assistant that auto-assigns jobs to nearest available driver",
  ],
  homehub: [
    "AR property staging — visualise furniture in empty rooms via phone camera",
    "AI-generated neighbourhood trend reports emailed to buyers weekly",
    "Blockchain-based title deed verification integrated with Dubai Land Department",
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CaseStudyClient({ project, prevProject, nextProject }: Props) {
  const techByCategory = project.tech.reduce<Record<string, string[]>>(
    (acc, t) => {
      const cat = categorizeTech(t);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(t);
      return acc;
    },
    {}
  );

  const categoryColors: Record<string, string> = {
    Frontend: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300",
    Backend: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300",
    Database: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300",
    Cloud: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
    Integration: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
    Other: "from-white/10 to-white/5 border-white/20 text-white/60",
  };

  const ideas = v2Ideas[project.slug] || [
    "Real-time collaboration features for team-based workflows",
    "Native mobile app with offline-first architecture",
    "Advanced analytics dashboard with predictive insights",
  ];

  return (
    <main className="min-h-screen" style={{ background: "#050510" }}>
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-60`}
        />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-10"
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/case-studies"
              className="hover:text-white/70 transition-colors"
            >
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-white/60">{project.title}</span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 bg-gradient-to-r ${project.color} text-white`}
              >
                {project.label}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-indigo-300 font-medium mb-8"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container-custom pb-24">
        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-12">
            {/* 1. Overview */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">📋</span> Project Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Timeline", value: "6–8 weeks", icon: "⏱️" },
                  { label: "Type", value: "Self-initiated concept", icon: "🧠" },
                  {
                    label: "Tech Stack",
                    value: `${project.tech.length} technologies`,
                    icon: "⚙️",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-xl p-5 bg-gradient-to-br ${project.gradient} border border-white/5`}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      {stat.label}
                    </div>
                    <div className="text-white font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 2. The Problem */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🔴</span> The Problem
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {project.problem}
              </p>
            </motion.section>

            {/* 3. The Solution */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">✅</span> The Solution
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {project.solution}
              </p>
            </motion.section>

            {/* 4. Key Features */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🚀</span> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 5. Tech Architecture */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">🏗️</span> Tech Architecture
              </h2>
              <div className="space-y-5">
                {Object.entries(techByCategory).map(([category, techs]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((t) => (
                        <span
                          key={t}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border bg-gradient-to-br ${
                            categoryColors[category] ??
                            "from-white/10 to-white/5 border-white/20 text-white/60"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 6. Business Value */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`rounded-2xl p-8 bg-gradient-to-br ${project.gradient} border border-white/10`}
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-2xl">💼</span> Business Value
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {project.businessValue}
                </p>
              </div>
            </motion.section>

            {/* 7. SEO & Performance */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span> SEO & Performance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: "🔍",
                    title: "Server-Side Rendering",
                    desc: "Built with Next.js SSR for maximum SEO. Every page is fully rendered on the server so Google indexes all content immediately.",
                  },
                  {
                    icon: "📊",
                    title: "Core Web Vitals",
                    desc: "Optimised for LCP, FID, and CLS. Images are lazy-loaded, fonts are preloaded, and JavaScript bundles are tree-shaken.",
                  },
                  {
                    icon: "🏷️",
                    title: "Structured Data",
                    desc: "JSON-LD schema markup included for rich snippets. OpenGraph and Twitter Card metadata for social sharing.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="text-white font-semibold mb-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 8. What I'd Build Next */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-2xl">🔮</span> What I&apos;d Build Next
              </h2>
              <p className="text-white/40 text-sm mb-6">
                v2 feature ideas — where this product could go next
              </p>
              <div className="space-y-4">
                {ideas.map((idea, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/5"
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {idea}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Prev / Next Navigation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {prevProject ? (
                <Link
                  href={`/case-studies/${prevProject.slug}`}
                  className="flex-1 glass-card rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all group flex items-center gap-4"
                >
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-white transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                      Previous
                    </p>
                    <p className="text-white font-semibold group-hover:text-indigo-300 transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextProject ? (
                <Link
                  href={`/case-studies/${nextProject.slug}`}
                  className="flex-1 glass-card rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                      Next
                    </p>
                    <p className="text-white font-semibold group-hover:text-indigo-300 transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-white transition-colors flex-shrink-0"
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
              ) : (
                <div className="flex-1" />
              )}
            </motion.div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="xl:w-72 flex-shrink-0">
            <div className="xl:sticky xl:top-32 space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${project.gradient} border border-white/10`}
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  Liked this project?
                </h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Let&apos;s build something similar for your business. I&apos;m
                  available for new projects.
                </p>
                <Link
                  href="/contact"
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg`}
                >
                  Let&apos;s Talk
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

              {/* All Case Studies */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-card rounded-2xl p-6 border border-white/5"
              >
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                  All Case Studies
                </h3>
                <Link
                  href="/case-studies"
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
                >
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
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  Back to all projects
                </Link>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
