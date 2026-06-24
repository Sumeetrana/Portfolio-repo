import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — Web, Mobile App, SEO & AI Development | Sumeet Rana",
  description:
    "Full-stack development services by Sumeet Rana: Web Development, Mobile App Development, Backend APIs, SEO Optimization, Cloud & DevOps, AI Automation, and MVP Development. Based in Abu Dhabi, UAE.",
  alternates: {
    canonical: "https://sumeetrana.com/services",
  },
  openGraph: {
    title: "Services — Web, Mobile App, SEO & AI Development | Sumeet Rana",
    description:
      "One expert partner for every layer of your digital product. Web, mobile, backend, SEO, cloud, AI automation, and MVP development — all from a Senior Software Engineer in Abu Dhabi, UAE.",
    url: "https://sumeetrana.com/services",
    siteName: "Sumeet Rana",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Web, Mobile App, SEO & AI Development | Sumeet Rana",
    description:
      "One expert partner for every layer of your digital product. Web, mobile, backend, SEO, cloud, AI & MVP development.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Sumeet Rana",
            url: "https://sumeetrana.com",
            email: "sumeetsinh28@gmail.com",
            description:
              "Senior Software Engineer offering full-stack web and mobile development services in Abu Dhabi, UAE.",
            areaServed: {
              "@type": "Country",
              name: "UAE",
            },
            serviceType: [
              "Web Development",
              "Mobile App Development",
              "Backend Development",
              "SEO Optimization",
              "Cloud & DevOps",
              "AI Automation",
              "MVP Development",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abu Dhabi",
              addressCountry: "AE",
            },
            priceRange: "$$",
          }),
        }}
      />
      <ServicesClient />
    </>
  );
}
