"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { services } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function ServicesClient() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#050510" }}>
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="gradient-bg absolute inset-0 opacity-30" />
        <div className="dot-pattern absolute inset-0 opacity-20" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                Services
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-4xl mx-auto"
            >
              Everything You Need to{" "}
              <span className="gradient-text">Build, Launch & Grow</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              One expert partner for every layer of your digital product.
            </motion.p>
            {/* Service anchor links */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 justify-center"
            >
              {services.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                >
                  {service.icon} {service.title}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={staggerContainer}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-start`}
                >
                  {/* Icon & Title Column */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex-shrink-0 w-full lg:w-72 xl:w-80"
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}
                    >
                      <div className="w-full h-full rounded-2xl bg-[#050510] flex items-center justify-center text-4xl">
                        {service.icon}
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="glass-card rounded-2xl p-4 border border-white/5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
                        Ideal For
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {service.idealFor}
                      </p>
                    </div>
                  </motion.div>

                  {/* Content Column */}
                  <motion.div variants={fadeInUp} className="flex-1">
                    <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 hover:border-indigo-500/20 transition-colors duration-300">
                      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
                        />
                        What&apos;s Included
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-gray-300">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 text-indigo-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        href={`/contact?service=${service.slug}`}
                        variant="primary"
                        size="md"
                      >
                        Start This Project →
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
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
                Not Sure Where to Start?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Not sure which service you need?
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Tell me about your project and I&apos;ll recommend the right approach for your goals and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Discuss Your Project
                </Button>
                <Button href="/portfolio" variant="secondary" size="lg">
                  View My Work
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
