import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies — In-Depth Project Breakdowns | Sumeet Rana",
  description:
    "Deep-dive case studies showing how I design, architect, and build real-world web and mobile products — from problem discovery to production.",
  openGraph: {
    title: "Case Studies — In-Depth Project Breakdowns | Sumeet Rana",
    description:
      "Deep-dive case studies showing how I design, architect, and build real-world web and mobile products.",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
