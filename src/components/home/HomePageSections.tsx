"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChooseMe from "@/components/home/WhyChooseMe";
import TechStack from "@/components/home/TechStack";
import ProcessSection from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";
import DigitalPersona from "@/components/home/DigitalPersona";
import ScaleReveal from "@/components/effects/ScaleReveal";

const AmbientCanvas = dynamic(() => import("@/components/three/AmbientCanvas"), { ssr: false });

function ScrollColorMorph() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [
      "radial-gradient(ellipse at 50% 0%, #0d0720 0%, #050510 60%)",
      "radial-gradient(ellipse at 80% 30%, #07051a 0%, #050510 60%)",
      "radial-gradient(ellipse at 20% 60%, #060518 0%, #050510 60%)",
      "radial-gradient(ellipse at 70% 70%, #080520 0%, #050510 60%)",
      "radial-gradient(ellipse at 30% 80%, #06051c 0%, #050510 60%)",
      "radial-gradient(ellipse at 50% 100%, #050510 0%, #050510 60%)",
    ]
  );
  return (
    <motion.div
      style={{ background: bg }}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function HomePageSections() {
  return (
    <div className="relative">
      <ScrollColorMorph />

      {/* Neural network particle field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <AmbientCanvas />
      </div>

      <ScaleReveal><DigitalPersona /></ScaleReveal>
      <ScaleReveal><ServicesPreview /></ScaleReveal>
      <FeaturedProjects />
      <ScaleReveal><WhyChooseMe /></ScaleReveal>
      <ScaleReveal><TechStack /></ScaleReveal>
      <ScaleReveal><ProcessSection /></ScaleReveal>
      <ScaleReveal><Testimonials /></ScaleReveal>
      <ScaleReveal><ContactCTA /></ScaleReveal>
    </div>
  );
}
