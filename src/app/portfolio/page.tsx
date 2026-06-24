import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio — Web & Mobile App Projects | Sumeet Rana",
  description:
    "Explore portfolio projects by Sumeet Rana — a service marketplace, AI content agent, restaurant ordering platform, gym SaaS, fleet tracker, and real estate portal. Built to demonstrate full-stack engineering depth.",
  alternates: {
    canonical: "https://sumeetrana.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Web & Mobile App Projects | Sumeet Rana",
    description:
      "Full-stack portfolio projects showcasing Next.js, React Native, Node.js, AI integrations, and cloud deployments. Built by Sumeet Rana, Senior Software Engineer in Abu Dhabi, UAE.",
    url: "https://sumeetrana.com/portfolio",
    siteName: "Sumeet Rana",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Web & Mobile App Projects | Sumeet Rana",
    description:
      "Full-stack portfolio projects showcasing Next.js, React Native, Node.js, AI integrations, and cloud deployments.",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
