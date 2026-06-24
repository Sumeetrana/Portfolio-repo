"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ServicesPreview() {
  const firstRow = services.slice(0, 4);
  const secondRow = services.slice(4); // 3 items

  const CardContent = ({ service }: { service: typeof services[0] }) => (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col h-full glass-card rounded-2xl p-5 hover:bg-white/5 hover:border-indigo-500/25 transition-all duration-300"
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-lg mb-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
      >
        {service.icon}
      </div>
      {/* Title */}
      <h3 className="font-semibold text-slate-200 text-sm mb-1.5 group-hover:text-white transition-colors leading-snug">
        {service.title}
      </h3>
      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors flex-1">
        {service.shortDesc}
      </p>
      {/* CTA */}
      <div className="mt-3 flex items-center gap-1 text-indigo-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );

  return (
    <section className="section-padding relative" aria-labelledby="services-heading">
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="What I Do"
          title="Services That Drive "
          highlight="Real Results"
          subtitle="From concept to deployment — I cover every layer of the modern tech stack so you have one trusted partner for everything digital."
          className="mb-10"
        />

        {/* First row: 4 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {firstRow.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <CardContent service={service} />
            </motion.div>
          ))}
        </div>

        {/* Second row: 3 items centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-[75%] mx-auto">
          {secondRow.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: (i + 4) * 0.06 }}
            >
              <CardContent service={service} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            View all services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
