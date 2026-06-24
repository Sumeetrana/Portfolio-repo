import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HomePageSections from "@/components/home/HomePageSections";

export const metadata: Metadata = {
  title: "Sumeet Rana — Web, Mobile App & SEO Development Partner for Modern Businesses",
  description:
    "Sumeet Rana is a senior software engineer in UAE offering web development, mobile app development, backend systems, SEO optimization, cloud & DevOps, and AI automation services. Available for freelance projects.",
  alternates: { canonical: "https://sumeetrana.com" },
  openGraph: {
    title: "Sumeet Rana — Web, Mobile App & SEO Development Partner",
    description:
      "I help startups, businesses, and founders turn ideas into fast, modern, SEO-friendly web and mobile experiences.",
    url: "https://sumeetrana.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomePageSections />
    </>
  );
}
