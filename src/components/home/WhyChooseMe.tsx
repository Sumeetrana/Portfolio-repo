"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: "⚡",
    title: "Full-Stack Expertise",
    desc: "One partner for frontend, backend, mobile, cloud, and SEO. No coordination overhead, no agency markup.",
  },
  {
    icon: "🎯",
    title: "Business-Focused",
    desc: "Every technical decision is made with your business goals in mind — not what's trendy in tech.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "MVPs delivered in weeks, not months. I know how to scope, prioritize, and ship without cutting corners.",
  },
  {
    icon: "📈",
    title: "SEO-First Approach",
    desc: "Every site is built to rank. Performance, structured data, and content architecture baked in from day one.",
  },
  {
    icon: "🔒",
    title: "Production-Grade Code",
    desc: "Scalable architecture, proper security, CI/CD pipelines, and documentation — built to last.",
  },
  {
    icon: "💬",
    title: "Clear Communication",
    desc: "Regular updates, transparent timelines, and honest scope conversations. No surprises.",
  },
];

export default function WhyChooseMe() {
  return (
    <section className="section-padding" aria-labelledby="why-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Work With Me"
          title="The "
          highlight="Unfair Advantage"
          subtitle="What separates good development from development that actually grows your business."
          className="mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group glass-card rounded-2xl p-5 hover:bg-white/5 hover:border-indigo-500/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/4 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="font-semibold text-slate-200 mb-1.5 text-sm">{reason.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
