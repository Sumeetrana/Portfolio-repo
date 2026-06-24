"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TechStack() {
  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby="tech-heading">
      <div aria-hidden="true" className="absolute inset-0 dot-pattern opacity-20" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools I Use to "
          highlight="Build Great Products"
          subtitle="A modern, battle-tested toolkit for every layer of your digital product."
          className="mb-10"
        />

        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ scale: 1.06, y: -2 }}
            >
              <span className="tech-badge cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/70 flex-shrink-0" />
                <span>{tech.name}</span>
                <span className="text-slate-600 text-xs">({tech.category})</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
