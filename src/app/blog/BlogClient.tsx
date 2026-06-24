"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/lib/data";

const CATEGORIES = ["All", "Web Development", "SEO", "Mobile Apps", "AI & Automation"];

const categoryColors: Record<string, string> = {
  "Web Development": "from-indigo-500 to-indigo-600",
  SEO: "from-emerald-500 to-teal-600",
  "Mobile Apps": "from-purple-500 to-pink-600",
  "AI & Automation": "from-amber-500 to-orange-600",
};

const categoryBadgeColors: Record<string, string> = {
  "Web Development": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  SEO: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Mobile Apps": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "AI & Automation": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="min-h-screen" style={{ background: "#050510" }}>
      {/* Hero */}
      <section className="section-padding pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">
              Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Insights on{" "}
              <span className="gradient-text">Web Dev, SEO & Modern Tech</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Practical guides, deep dives, and industry perspectives for
              businesses building their digital presence in 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-lg"
                  : "glass-card border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Posts */}
      <section className="section-padding pt-0 pb-24">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-white/40"
              >
                No posts in this category yet.
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured Post */}
                {featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <Link href={`/blog/${featured.slug}`} className="group block">
                      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-300">
                        <div
                          className={`h-2 w-full bg-gradient-to-r ${
                            categoryColors[featured.category] ??
                            "from-indigo-500 to-violet-600"
                          }`}
                        />
                        <div className="p-8 md:p-10">
                          <div className="flex flex-col md:flex-row md:items-start gap-8">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                    categoryBadgeColors[featured.category] ??
                                    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                  }`}
                                >
                                  {featured.category}
                                </span>
                                <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">
                                  Featured
                                </span>
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
                                {featured.title}
                              </h2>
                              <p className="text-white/60 leading-relaxed mb-5 text-base">
                                {featured.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {featured.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/40 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/40">
                                <span>{featured.date}</span>
                                <span>·</span>
                                <span>{featured.readTime}</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 flex items-center">
                              <span
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${
                                  categoryColors[featured.category] ??
                                  "from-indigo-500 to-violet-600"
                                } text-white font-semibold text-sm group-hover:opacity-90 group-hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap`}
                              >
                                Read Article
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
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Rest of posts */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block h-full"
                        >
                          <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full flex flex-col">
                            <div
                              className={`h-1 w-full bg-gradient-to-r ${
                                categoryColors[post.category] ??
                                "from-indigo-500 to-violet-600"
                              }`}
                            />
                            <div className="p-6 flex flex-col flex-1">
                              <div className="mb-3">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                    categoryBadgeColors[post.category] ??
                                    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                  }`}
                                >
                                  {post.category}
                                </span>
                              </div>
                              <h2 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug flex-1">
                                {post.title}
                              </h2>
                              <p className="text-white/50 text-sm leading-relaxed mb-4">
                                {post.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/30 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3 text-xs text-white/30">
                                  <span>{post.date}</span>
                                  <span>·</span>
                                  <span>{post.readTime}</span>
                                </div>
                                <span className="text-indigo-400 text-xs font-medium group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                                  Read
                                  <svg
                                    className="w-3 h-3"
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
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
