import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Web Development, SEO & Tech Insights | Sumeet Rana",
  description:
    "Practical guides and deep dives on web development, SEO, mobile apps, and AI automation for UAE businesses in 2026.",
  openGraph: {
    title: "Blog — Web Development, SEO & Tech Insights | Sumeet Rana",
    description:
      "Practical guides and deep dives on web development, SEO, mobile apps, and AI automation for UAE businesses.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
