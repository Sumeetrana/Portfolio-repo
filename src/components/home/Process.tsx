"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProcessSection() {
  return (
    <section className="section-padding relative" aria-labelledby="process-heading">
      <div aria-hidden="true" className="absolute inset-0 grid-pattern opacity-25" />

      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="How I Work"
          title="A Proven "
          highlight="6-Step Process"
          subtitle="From our first call to your product launch — here's exactly how we'll work together."
          className="mb-10"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group glass-card rounded-2xl p-4 text-center hover:bg-white/5 hover:border-indigo-500/20 transition-all duration-300"
            >
              {/* Step number */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 group-hover:from-indigo-500/30 group-hover:to-violet-500/30 transition-all">
                <span className="text-xs font-bold text-indigo-400">{step.step}</span>
              </div>
              <h3 className="font-semibold text-slate-200 text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
