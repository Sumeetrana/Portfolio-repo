"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none"
      />
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Featured Work"
          title="Projects That "
          highlight="Deliver Impact"
          subtitle="Self-initiated portfolio projects demonstrating real-world problem solving across different industries."
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/case-studies/${project.slug}`} className="block h-full">
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
                  {/* Card header / visual */}
                  <div
                    className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 grid-pattern opacity-30"
                    />
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      {project.title[0]}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs text-slate-400 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                        {project.label}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                      {project.solution.slice(0, 120)}...
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-500">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-indigo-400 font-medium group-hover:gap-2 transition-all">
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/8 hover:border-white/20 transition-all duration-200"
          >
            View Full Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
