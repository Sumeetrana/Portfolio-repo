"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-2 mb-3 ${centered ? "justify-center" : "justify-start"}`}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-500" />
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-indigo-400">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-indigo-500" />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-50 leading-[1.15] tracking-tight mb-4">
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="gradient-text">{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-base md:text-lg text-slate-400 leading-relaxed ${
            centered ? "mx-auto text-center" : ""
          }`}
          style={{
            maxWidth: "560px",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
