import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Sumeet Rana — Senior Software Engineer & Development Partner | UAE",
  description:
    "Sumeet Rana is a Senior Software Engineer based in Abu Dhabi, UAE with 5+ years of experience building scalable web apps, mobile apps, backend systems, cloud infrastructure, and AI automation tools.",
  alternates: {
    canonical: "https://sumeetrana.com/about",
  },
  openGraph: {
    title: "About Sumeet Rana — Senior Software Engineer & Development Partner | UAE",
    description:
      "Sumeet Rana is a Senior Software Engineer based in Abu Dhabi, UAE with 5+ years of experience building scalable web apps, mobile apps, backend systems, and AI automation tools.",
    url: "https://sumeetrana.com/about",
    siteName: "Sumeet Rana",
    type: "profile",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sumeet Rana — Senior Software Engineer & Development Partner | UAE",
    description:
      "Senior Software Engineer based in Abu Dhabi, UAE. 5+ years building scalable web apps, mobile apps, backend systems, and AI tools.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sumeet Rana",
            jobTitle: "Senior Software Engineer",
            url: "https://sumeetrana.com",
            email: "sumeetsinh28@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abu Dhabi",
              addressCountry: "AE",
            },
            sameAs: [
              "https://github.com/Sumeetrana",
              
              "https://x.com/sumeetrana28",
            ],
            knowsAbout: [
              "Web Development",
              "Mobile App Development",
              "Backend Development",
              "Cloud Infrastructure",
              "AI Automation",
              "SEO Optimization",
              "Next.js",
              "React",
              "React Native",
              "Node.js",
              "TypeScript",
              "AWS",
            ],
            description:
              "Senior Software Engineer based in Abu Dhabi, UAE with 5+ years of experience building scalable web apps, mobile apps, backend systems, cloud infrastructure, and AI automation tools.",
          }),
        }}
      />
      <AboutClient />
    </>
  );
}
