import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://sumeetrana.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sumeet Rana — Web, Mobile App & SEO Development Partner",
    template: "%s | Sumeet Rana",
  },
  description:
    "Sumeet Rana is a senior software engineer offering web development, mobile app development, backend systems, SEO, cloud & DevOps, and AI automation services in UAE.",
  keywords: [
    "Sumeet Rana",
    "Sumeet Rana developer",
    "Sumeet Rana web developer",
    "Sumeet Rana software engineer",
    "freelance web developer UAE",
    "web development UAE",
    "mobile app development UAE",
    "web developer Abu Dhabi",
    "Next.js developer UAE",
    "custom website development UAE",
    "software development services UAE",
  ],
  authors: [{ name: "Sumeet Rana", url: siteUrl }],
  creator: "Sumeet Rana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sumeet Rana",
    title: "Sumeet Rana — Web, Mobile App & SEO Development Partner",
    description:
      "I help startups, businesses, and founders turn ideas into fast, modern, SEO-friendly web and mobile experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sumeet Rana — Software Engineer & Development Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumeet Rana — Web, Mobile App & SEO Development Partner",
    description:
      "Senior software engineer helping businesses build digital products — web, mobile, backend, SEO, and AI automation.",
    images: ["/og-image.png"],
    creator: "@sumeetrana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#050510] text-slate-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
