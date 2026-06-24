"use client";

import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";

const TechOrbsScene = dynamic(() => import("@/components/three/TechOrbsScene"), { ssr: false });

export default function TechStack() {
  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby="tech-heading">
      <div aria-hidden="true" className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools I Use to "
          highlight="Build Great Products"
          subtitle="A modern, battle-tested toolkit — hover to explore the full sphere."
          className="mb-6"
        />

        {/* 3D interactive tech orb sphere */}
        <div className="relative h-[420px] md:h-[520px] w-full max-w-3xl mx-auto">
          <TechOrbsScene />
        </div>

        <p className="text-center text-xs text-slate-600 mt-2">
          Drag / hover to interact · 16 technologies
        </p>
      </div>
    </section>
  );
}
