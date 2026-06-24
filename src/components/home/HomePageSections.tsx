"use client";

import dynamic from "next/dynamic";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChooseMe from "@/components/home/WhyChooseMe";
import TechStack from "@/components/home/TechStack";
import ProcessSection from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";
import DigitalPersona from "@/components/home/DigitalPersona";
import ScrollReveal3D from "@/components/ui/ScrollReveal3D";

const AmbientCanvas = dynamic(() => import("@/components/three/AmbientCanvas"), { ssr: false });

export default function HomePageSections() {
  return (
    <div className="relative">
      {/* Neural network particle field behind all sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <AmbientCanvas />
      </div>
      <ScrollReveal3D><DigitalPersona /></ScrollReveal3D>
      <ScrollReveal3D><ServicesPreview /></ScrollReveal3D>
      <ScrollReveal3D><FeaturedProjects /></ScrollReveal3D>
      <ScrollReveal3D><WhyChooseMe /></ScrollReveal3D>
      <ScrollReveal3D><TechStack /></ScrollReveal3D>
      <ScrollReveal3D><ProcessSection /></ScrollReveal3D>
      <ScrollReveal3D><Testimonials /></ScrollReveal3D>
      <ScrollReveal3D><ContactCTA /></ScrollReveal3D>
    </div>
  );
}
