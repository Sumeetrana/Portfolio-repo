"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

const projectTypes = [
  "Web Development",
  "Mobile App Development",
  "Backend Development",
  "SEO Optimization",
  "Cloud & DevOps",
  "AI Automation",
  "MVP Development",
  "Other / Not Sure",
];

const budgetRanges = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000+",
  "Let's discuss",
];

const timelines = [
  "ASAP (1–2 weeks)",
  "1 Month",
  "2–3 Months",
  "3–6 Months",
  "Flexible",
];

const phoneNumber = siteConfig.whatsapp.replace(/\D/g, "");
const waMessage = encodeURIComponent(
  "Hi Sumeet! I found your portfolio and I'd like to discuss a project."
);

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero */}
      <section className="pt-32 pb-16 relative" aria-labelledby="contact-heading">
        <div aria-hidden="true" className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-400 font-medium">
                Available for new projects
              </span>
            </div>
            <h1
              id="contact-heading"
              className="text-4xl md:text-6xl font-bold text-slate-50 leading-tight mb-6"
            >
              Let&apos;s Build Your{" "}
              <span className="gradient-text">Digital Product</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tell me about your project and I&apos;ll get back to you within
              24 hours with a tailored proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="pb-24 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Quick contact */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-slate-200 mb-4">
                  Quick Contact
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 group"
                    aria-label={`Send email to ${siteConfig.email}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm text-slate-300 group-hover:text-indigo-400 transition-colors">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${phoneNumber}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                    aria-label="Chat on WhatsApp"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">WhatsApp</p>
                      <p className="text-sm text-slate-300 group-hover:text-[#25D366] transition-colors">
                        Chat Now
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="text-sm text-slate-300">{siteConfig.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-slate-200 mb-4 text-sm">
                  Why Clients Choose Me
                </h2>
                <ul className="space-y-3" role="list">
                  {[
                    "Guaranteed 24h response",
                    "Free project consultation call",
                    "Transparent pricing upfront",
                    "Weekly progress updates",
                    "Post-launch support included",
                    "NDA available on request",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-400"
                    >
                      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-semibold text-slate-200 mb-4 text-sm">
                  Follow My Work
                </h2>
                <div className="flex gap-3">
                  {[
                    { name: "GitHub", href: siteConfig.social.github },
                    { name: "Twitter", href: siteConfig.social.twitter },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="px-3 py-2 rounded-lg glass-card border border-white/8 text-xs text-slate-400 hover:text-slate-200 hover:border-indigo-500/30 transition-all"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8">
                {status === "error" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-3">Something went wrong</h2>
                    <p className="text-slate-400 mb-8">
                      Message could not be sent. Please try again or email me directly at{" "}
                      <a href={`mailto:${siteConfig.email}`} className="text-indigo-400 hover:underline">{siteConfig.email}</a>.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium hover:bg-indigo-500/20 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                ) : status === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-3">
                      Message Sent!
                    </h2>
                    <p className="text-slate-400 mb-8">
                      Thanks for reaching out. I&apos;ll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium hover:bg-indigo-500/20 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    <h2 className="text-xl font-semibold text-slate-100 mb-6">
                      Tell Me About Your Project
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm text-slate-400 mb-1.5">
                          Full Name <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ravi Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-slate-400 mb-1.5">
                          Email Address <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="ravi@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="company" className="block text-sm text-slate-400 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name (optional)"
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="projectType" className="block text-sm text-slate-400 mb-1.5">
                          Project Type <span className="text-indigo-400">*</span>
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={form.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all text-sm appearance-none"
                        >
                          <option value="" disabled className="bg-[#0a0a1a]">Select type</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t} className="bg-[#0a0a1a]">{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm text-slate-400 mb-1.5">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all text-sm appearance-none"
                        >
                          <option value="" disabled className="bg-[#0a0a1a]">Select budget</option>
                          {budgetRanges.map((b) => (
                            <option key={b} value={b} className="bg-[#0a0a1a]">{b}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm text-slate-400 mb-1.5">
                          Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all text-sm appearance-none"
                        >
                          <option value="" disabled className="bg-[#0a0a1a]">Select timeline</option>
                          {timelines.map((t) => (
                            <option key={t} value={t} className="bg-[#0a0a1a]">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm text-slate-400 mb-1.5">
                        Project Details <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project — what problem are you solving, who are your users, any existing designs or requirements?"
                        className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {status === "sending" ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Project Brief"
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-600 mt-4">
                      By submitting this form, you agree to be contacted about
                      your project. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 relative z-10" aria-labelledby="faq-heading">
        <div className="container-custom max-w-3xl mx-auto">
          <h2
            id="faq-heading"
            className="text-2xl font-bold text-slate-100 text-center mb-10"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How quickly can you start my project?",
                a: "I typically start new projects within 1–2 weeks of signing an agreement. If you have an urgent deadline, let me know and I'll do my best to accommodate.",
              },
              {
                q: "Do you work with clients outside UAE?",
                a: "Absolutely. While I'm based in Abu Dhabi, I work with clients worldwide via remote collaboration. Time zone differences are easily managed with regular async updates and weekly calls.",
              },
              {
                q: "What does the development process look like?",
                a: "Discovery → Strategy → Design → Development → Launch → Growth. I keep you involved at every stage with regular demos, Figma reviews, and progress updates.",
              },
              {
                q: "Do you offer ongoing maintenance after launch?",
                a: "Yes. All projects include 30 days of post-launch support. For ongoing maintenance, updates, and growth work, I offer monthly retainer packages.",
              },
            ].map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-5"
              >
                <h3 className="font-semibold text-slate-200 mb-2 text-sm">{q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
