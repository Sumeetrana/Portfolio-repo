import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Start Your Project | Sumeet Rana",
  description:
    "Get in touch with Sumeet Rana to discuss your web development, mobile app, SEO, or AI automation project. Based in Abu Dhabi, UAE. Available for remote projects worldwide.",
  alternates: { canonical: "https://sumeetrana.com/contact" },
  openGraph: {
    title: "Contact Sumeet Rana — Let's Build Your Digital Product",
    description:
      "Ready to build something great? Reach out via the contact form, WhatsApp, or email.",
    url: "https://sumeetrana.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
