"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const skills = [
  { name: "Next.js", level: 95 },
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "React Native", level: 88 },
  { name: "Node.js", level: 90 },
  { name: "NestJS", level: 82 },
  { name: "Python", level: 78 },
  { name: "PostgreSQL", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "Redis", level: 78 },
  { name: "AWS", level: 82 },
  { name: "Docker", level: 80 },
  { name: "CI/CD", level: 78 },
  { name: "SEO", level: 88 },
  { name: "OpenAI", level: 85 },
  { name: "LangChain", level: 80 },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "7", label: "Core Services" },
  { value: "UAE", label: "Based In" },
];

const values = [
  {
    icon: "⚡",
    title: "Quality Over Speed",
    description:
      "Rushed code creates technical debt that costs more to fix than to get right the first time. I take the time to build maintainable, well-architected systems that stand the test of scale.",
  },
  {
    icon: "📈",
    title: "Business-First Thinking",
    description:
      "Every technical decision is filtered through one question: does this move the needle for your business? I understand P&Ls, conversion rates, and user retention — not just codebases.",
  },
  {
    icon: "🤝",
    title: "Long-Term Partnerships",
    description:
      "The best outcomes come from deep collaboration, not one-off sprints. I invest in understanding your domain, your users, and your growth goals so I can keep delivering value over time.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutClient() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#050510" }}>
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="gradient-bg absolute inset-0 opacity-30" />
        <div className="dot-pattern absolute inset-0 opacity-20" />
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                About Me
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              Senior Software Engineer Building{" "}
              <span className="gradient-text">Digital Products That Scale</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="space-y-5 text-gray-300 text-lg leading-relaxed mb-12">
              <p>
                Over the past 5+ years, I&apos;ve designed and shipped scalable web applications, mobile apps, backend
                systems, cloud infrastructure, and automation tools across a wide range of industries. What started as a
                frontend career quickly evolved into full-stack engineering — and today I architect complete digital
                products end-to-end. I&apos;m based in Abu Dhabi, UAE, working with clients locally and globally.
              </p>
              <p>
                My deepest expertise sits at the intersection of Next.js, React, React Native, Node.js, PostgreSQL, and
                AWS. I&apos;ve shipped products across healthcare tech, e-commerce, SaaS platforms, and logistics
                operations — each one built with performance, scalability, and real business outcomes at the forefront.
                Every project I deliver is designed not just to work today, but to grow with you.
              </p>
              <p>
                I&apos;m not just a developer you hire — I&apos;m a digital product partner. I care about your business
                goals, your users, and your growth trajectory. If a feature doesn&apos;t move your metrics or solve a
                real user problem, it doesn&apos;t go in. Clean code matters, but outcomes matter more.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 text-center border border-white/5"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Technical Expertise"
            title="Skills & Technologies"
            subtitle="A full-stack toolkit built for shipping modern, scalable digital products."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-12"
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={fadeInUp} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech badge cloud */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-wrap gap-3 justify-center mt-14"
          >
            {skills.map((skill) => (
              <motion.span
                key={`badge-${skill.name}`}
                variants={fadeInUp}
                className="tech-badge"
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="container-custom relative z-10">
          <SectionHeader
            eyebrow="How I Work"
            title="Principles I Build By"
            subtitle="The values that shape how I approach every project and every client relationship."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={index}
                className="glass-card rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center text-2xl mb-6 border border-indigo-500/20">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                Let&apos;s Build Your{" "}
                <span className="gradient-text">Digital Product</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Whether you&apos;re a startup founder with an idea or a growing business ready to scale — I&apos;d love
                to hear about your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Conversation
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  View Services
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
