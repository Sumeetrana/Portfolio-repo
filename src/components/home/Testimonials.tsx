"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote:
      "Sumeet delivered our e-commerce platform in record time. The performance scores are incredible and our conversion rate jumped 40% in the first month.",
    name: "Ravi Sharma",
    title: "Founder, RetailFlow",
    initials: "RS",
    color: "from-indigo-500 to-violet-500",
  },
  {
    quote:
      "Working with Sumeet was effortless. He understood our requirements immediately, suggested smart improvements, and shipped a product we're proud to show investors.",
    name: "Aisha Al-Mansoori",
    title: "CEO, LaunchPad UAE",
    initials: "AA",
    color: "from-emerald-500 to-teal-500",
  },
  {
    quote:
      "The SEO work Sumeet did for our website brought us from page 5 to page 1 for our main keywords in 3 months. The organic traffic speaks for itself.",
    name: "James Thornton",
    title: "Marketing Director, GrowthCo",
    initials: "JT",
    color: "from-rose-500 to-pink-500",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative" aria-labelledby="testimonials-heading">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-72 h-72 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none"
      />
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Clients Say About "
          highlight="Working With Me"
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 leading-none mb-0.5">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
