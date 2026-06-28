export const siteConfig = {
  name: "Sumeet Rana",
  title: "Sumeet Rana — Web, Mobile App & SEO Development Partner",
  description:
    "Senior software engineer helping startups, businesses, and founders turn ideas into fast, modern, SEO-friendly web and mobile experiences.",
  url: "https://sumeetrana.com",
  email: "sumeetsinh28@gmail.com",
  whatsapp: "+971557530615",
  location: "Abu Dhabi, UAE",
  social: {
    github: "https://github.com/Sumeetrana",
    twitter: "https://x.com/sumeetrana28",
  },
};

export const services = [
  {
    slug: "web-development",
    icon: "🌐",
    title: "Web Development",
    shortDesc: "Lightning-fast, SEO-ready websites built with modern frameworks.",
    description:
      "I build high-performance websites and web applications using Next.js, React, and TypeScript. Every project is optimized for speed, SEO, and conversion — delivering measurable results for your business.",
    includes: [
      "Custom website design & development",
      "Next.js / React web applications",
      "E-commerce solutions",
      "CMS integration (Sanity, Contentful, WordPress)",
      "Performance optimization (Core Web Vitals)",
      "Responsive, mobile-first design",
    ],
    idealFor: "Businesses, startups, and entrepreneurs who need a fast, modern, and high-converting online presence.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    slug: "mobile-app-development",
    icon: "📱",
    title: "Mobile App Development",
    shortDesc: "Native-quality mobile apps for iOS & Android.",
    description:
      "I develop cross-platform mobile applications using React Native and Expo that look and perform like native apps. From MVP to production-ready — I handle the full development lifecycle.",
    includes: [
      "React Native & Expo development",
      "iOS & Android apps from one codebase",
      "Push notifications & offline support",
      "App Store & Play Store submission",
      "API integration & backend connection",
      "UI/UX design for mobile",
    ],
    idealFor: "Startups and businesses looking to launch mobile apps without the cost of maintaining two separate codebases.",
    color: "from-purple-500 to-pink-500",
  },
  {
    slug: "backend-development",
    icon: "⚙️",
    title: "Backend Development",
    shortDesc: "Scalable APIs and server-side systems that grow with your business.",
    description:
      "I design and build robust backend systems — REST APIs, GraphQL services, microservices, and real-time systems. Built to scale, secure by default, and documented for your team.",
    includes: [
      "Node.js / Express / NestJS APIs",
      "GraphQL & REST API design",
      "PostgreSQL, MongoDB, Redis databases",
      "Authentication (JWT, OAuth, SSO)",
      "Microservices architecture",
      "API documentation (Swagger/OpenAPI)",
    ],
    idealFor: "Products that need reliable, scalable server-side logic to power web and mobile frontends.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    slug: "seo-optimization",
    icon: "🔍",
    title: "SEO Optimization",
    shortDesc: "Technical and content SEO to rank higher and attract qualified traffic.",
    description:
      "I implement comprehensive SEO strategies — technical audits, on-page optimization, Core Web Vitals, schema markup, and content architecture — to help your website rank on Google.",
    includes: [
      "Technical SEO audit & fixes",
      "Core Web Vitals optimization",
      "On-page SEO & content optimization",
      "JSON-LD structured data",
      "Local SEO (UAE / GCC targeting)",
      "SEO monitoring & reporting",
    ],
    idealFor: "Businesses wanting to increase organic traffic, rank for competitive keywords, and reduce paid ad spend.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    slug: "cloud-devops",
    icon: "☁️",
    title: "Cloud & DevOps",
    shortDesc: "Modern cloud infrastructure and automated deployment pipelines.",
    description:
      "I set up and manage cloud infrastructure on AWS, GCP, and Vercel — with CI/CD pipelines, monitoring, and scaling strategies that keep your application fast and always online.",
    includes: [
      "AWS / GCP / Azure deployment",
      "Docker & Kubernetes",
      "CI/CD pipelines (GitHub Actions)",
      "Auto-scaling & load balancing",
      "Monitoring & alerting (Datadog, Sentry)",
      "SSL, security hardening",
    ],
    idealFor: "Businesses and startups that want reliable, scalable cloud infrastructure without managing it themselves.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    slug: "ai-automation",
    icon: "🤖",
    title: "AI Automation",
    shortDesc: "Intelligent automation that saves hours of manual work every week.",
    description:
      "I build AI-powered automation tools, chatbots, and workflows that save businesses time and money. From content generation pipelines to AI customer support — I integrate AI where it matters most.",
    includes: [
      "OpenAI / Claude API integration",
      "Custom AI chatbots & assistants",
      "Content automation pipelines",
      "Data extraction & processing",
      "LangChain workflows",
      "Slack / WhatsApp bot integrations",
    ],
    idealFor: "Businesses spending too much time on repetitive tasks that AI can handle at a fraction of the cost.",
    color: "from-amber-500 to-orange-500",
  },
  {
    slug: "mvp-development",
    icon: "🚀",
    title: "MVP Development",
    shortDesc: "From idea to launch-ready product in weeks, not months.",
    description:
      "I help startup founders validate their ideas fast by building MVPs that are polished enough to show investors and users — without overbuilding. Ship fast, learn faster.",
    includes: [
      "Product scoping & feature prioritization",
      "Full-stack MVP development",
      "UI/UX design & prototyping",
      "Backend API & database setup",
      "Deployment & launch support",
      "Post-launch iteration",
    ],
    idealFor: "First-time founders and startup teams who need to validate their product idea quickly and cost-effectively.",
    color: "from-rose-500 to-pink-500",
  },
];

export const projects = [
  {
    slug: "dogstudio",
    title: "Dog Studio",
    subtitle: "Premium Creative Agency Website",
    label: "Live",
    liveUrl: "https://dogstudio-sigma.vercel.app",
    problem:
      "Creative agencies struggle to stand out in a commoditised market. A generic portfolio fails to communicate the calibre of work, the team behind it, or the cultural fit clients are looking for before they ever make contact.",
    solution:
      "A premium agency portfolio site that leads with brand identity and craft — immersive scroll experiences, motion-forward design, and a curated case study section that communicates depth of expertise across Brand Identity, Digital Strategy, Motion Design, WebGL/3D, UX Research, and Art Direction.",
    features: [
      "Immersive hero with tagline: 'We Shape Digital Experiences'",
      "Marquee service strip (Brand Identity, WebGL/3D, Motion Design, UX Research, Art Direction)",
      "Four featured case studies — Nexus, Luminary, Axiom, Prism — spanning branding, generative art, motion, and XR",
      "Social proof metrics: 9+ years, 200+ projects, 42 awards, 24-person team",
      "Work, Studio, Journal, and Contact navigation",
      "Scroll-driven animations and parallax depth layers",
      "Cursor interactions and motion-forward transitions",
    ],
    tech: ["Next.js", "Framer Motion", "GSAP", "Three.js / WebGL", "Tailwind CSS", "Vercel"],
    businessValue:
      "Positions the studio as a premium creative partner — not a commodity vendor. The design-forward presentation filters for high-value clients who appreciate craft, reducing sales friction and commanding premium project budgets.",
    color: "from-slate-600 to-slate-900",
    gradient: "from-slate-600/10 to-slate-900/10",
  },
  {
    slug: "3d-portfolio",
    title: "3D Creator Portfolio",
    subtitle: "Animated Personal Portfolio for a 3D Designer",
    label: "Live",
    liveUrl: "https://3d-portfolio-one-vert.vercel.app",
    problem:
      "Freelance 3D designers and motion artists need a portfolio that doesn't just list their work — it has to feel like their work. Static image grids fail to communicate the energy and craft of motion design.",
    solution:
      "A single-page, scroll-driven portfolio for a freelance 3D creator featuring character-by-character text reveals, a parallax motion reel gallery, sticky stacking project cards, and a magnetic hero illustration — all designed to feel as dynamic as the work it showcases.",
    features: [
      "Full-viewport hero with magnetic cursor-following character illustration",
      "Scroll-driven character-by-character text reveal in the About section",
      "Dual-row parallax gallery (rows scroll in opposite directions) showcasing 20+ motion design previews",
      "Five services with giant numbered list layout (3D Modeling, Rendering, Motion Design, Branding, Web Design)",
      "Three sticky stacking project cards with scroll-driven scale animations",
      "Single gradient CTA button (deep purple → magenta → orange) used consistently as the sole accent",
      "Fully responsive with Tailwind CSS utility-first layout",
    ],
    tech: ["React 18", "Vite", "Framer Motion", "Tailwind CSS", "Google Fonts (Kanit)", "Vercel"],
    businessValue:
      "Communicates creative capability through the medium itself — the site IS the portfolio piece. Potential clients experience the designer's motion and interaction sensibility before viewing a single project, dramatically increasing perceived quality and conversion.",
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-600/10 to-pink-600/10",
  },
  {
    slug: "homehub",
    title: "HomeHub",
    subtitle: "UAE Zero-Commission Property Platform",
    label: "Live",
    liveUrl: "https://home-hub-orcin.vercel.app",
    problem:
      "Property buyers and renters in UAE were locked into paying significant agent commissions — often 2–5% of the sale price — just to access listings. There was no direct channel between owners and buyers.",
    solution:
      "A fully functional real estate marketplace where UAE property owners list for free and buyers/renters contact them directly — zero commission, zero subscription, zero hidden fees. Covers all 7 emirates with luxury-to-mid-range listings.",
    features: [
      "Buy/Rent toggle with property type filtering (Apartment, Villa, Penthouse, Studio, Office, Warehouse, Land)",
      "500+ active listings across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ",
      "Sort by newest, price ascending/descending",
      "Free 4-step listing form — no account required",
      "Direct buyer/seller contact (phone, WhatsApp, email)",
      "Paginated property grid with Featured badge system",
      "Top Destinations section with live listing counts per emirate",
    ],
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel", "React"],
    businessValue:
      "Eliminates agent commissions entirely — on a AED 2M property, that saves buyers AED 40,000–100,000. The platform positions itself as the UAE's first truly free direct property marketplace, targeting a market worth over $70B annually.",
    color: "from-violet-500 to-indigo-600",
    gradient: "from-violet-500/10 to-indigo-600/10",
  },
  {
    slug: "genienow",
    title: "GenieNow",
    subtitle: "Service Marketplace Platform",
    label: "Self-initiated concept",
    problem:
      "Local service providers (plumbers, cleaners, electricians) had no unified digital marketplace to reach customers in UAE. Customers had no reliable way to book verified professionals.",
    solution:
      "A two-sided marketplace platform where verified service providers list their services and customers can search, compare, and book — with real-time chat, reviews, and payments.",
    features: [
      "Service provider onboarding & verification",
      "Real-time availability & booking calendar",
      "In-app chat between customer and provider",
      "Stripe & Apple Pay integration",
      "Review & rating system",
      "Admin dashboard & analytics",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Socket.io", "AWS"],
    businessValue:
      "Reduces service booking friction by 80%, increases provider booking rates, and creates a scalable two-sided marketplace with recurring revenue potential.",
    color: "from-indigo-500 to-purple-600",
    gradient: "from-indigo-500/10 to-purple-600/10",
  },
  {
    slug: "ai-content-agent",
    title: "AI Content Agent",
    subtitle: "Automated Content Publishing Pipeline",
    label: "Self-initiated concept",
    problem:
      "Content teams spend 40+ hours per week researching, writing, and publishing articles. Scaling content production was expensive and slow.",
    solution:
      "An AI-powered agent that researches trending topics, generates SEO-optimized articles, adds images, and publishes to WordPress/Ghost CMS — on autopilot.",
    features: [
      "Automated topic research & trending analysis",
      "GPT-4 powered article generation",
      "SEO optimization & meta tag generation",
      "Automatic image sourcing & attribution",
      "WordPress / Ghost CMS publishing",
      "Content calendar & scheduling dashboard",
    ],
    tech: ["Python", "FastAPI", "OpenAI", "LangChain", "PostgreSQL", "Celery", "Redis"],
    businessValue:
      "Reduces content production cost by 70%, enables publishing at 10x the previous velocity, and consistently produces SEO-optimized content that ranks.",
    color: "from-amber-500 to-orange-600",
    gradient: "from-amber-500/10 to-orange-600/10",
  },
  {
    slug: "fleettrack",
    title: "FleetTrack",
    subtitle: "Real-Time Logistics Dashboard",
    label: "Self-initiated concept",
    problem:
      "Logistics companies in UAE had no real-time visibility into their vehicle fleets, leading to inefficient routing, fuel waste, and delayed deliveries.",
    solution:
      "A real-time fleet tracking and logistics management dashboard with live GPS tracking, route optimization, driver performance analytics, and automated reporting.",
    features: [
      "Real-time GPS vehicle tracking",
      "AI-powered route optimization",
      "Driver behaviour scoring",
      "Fuel consumption analytics",
      "Automated delivery reports",
      "Geofencing & alerts",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Google Maps API", "AWS IoT", "WebSockets"],
    businessValue:
      "Reduces fuel costs by 18%, improves on-time delivery rate to 97%, and gives operations teams complete visibility into fleet performance.",
    color: "from-blue-500 to-cyan-600",
    gradient: "from-blue-500/10 to-cyan-600/10",
  },
];

export const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Cache" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "OpenAI", category: "AI" },
  { name: "LangChain", category: "AI" },
];

export const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We start with a deep-dive call to understand your business, goals, target audience, and technical requirements.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "I create a detailed project roadmap, tech stack recommendation, timeline, and pricing proposal tailored to your goals.",
  },
  {
    step: "03",
    title: "Design",
    desc: "High-fidelity wireframes and UI designs are created with your brand identity, reviewed, and approved before any code is written.",
  },
  {
    step: "04",
    title: "Development",
    desc: "I build your product with clean, scalable code — with regular updates and demos so you're always in the loop.",
  },
  {
    step: "05",
    title: "Launch",
    desc: "Rigorous QA testing, performance optimization, SEO setup, and deployment — your product goes live, ready for users.",
  },
  {
    step: "06",
    title: "Growth",
    desc: "Post-launch support, analytics review, iterative improvements, and scaling — we grow together long after launch.",
  },
];

export const blogPosts = [
  {
    slug: "why-uae-businesses-need-fast-website-2026",
    title: "Why Every UAE Business Needs a Fast Website in 2026",
    excerpt:
      "With mobile internet usage in UAE exceeding 95%, slow websites are costing businesses thousands in lost revenue. Here's what to do about it.",
    category: "Web Development",
    readTime: "5 min read",
    date: "June 15, 2026",
    tags: ["UAE", "Web Performance", "Business"],
  },
  {
    slug: "web-development-vs-website-builders",
    title: "Web Development vs Website Builders: What Should Businesses Choose?",
    excerpt:
      "Wix, Squarespace, or custom development? We break down the real costs, limitations, and ROI of each option for UAE businesses.",
    category: "Web Development",
    readTime: "7 min read",
    date: "June 8, 2026",
    tags: ["Web Development", "Business Strategy"],
  },
  {
    slug: "how-mobile-apps-help-local-businesses-grow",
    title: "How Mobile Apps Help Local Businesses Grow",
    excerpt:
      "Mobile apps are no longer just for big brands. Here's how UAE SMEs are using apps to increase customer loyalty and revenue.",
    category: "Mobile Apps",
    readTime: "6 min read",
    date: "May 28, 2026",
    tags: ["Mobile Apps", "UAE Business", "Growth"],
  },
  {
    slug: "why-nextjs-is-great-for-seo",
    title: "Why Next.js Is the Best Framework for SEO in 2026",
    excerpt:
      "Server-side rendering, automatic image optimization, metadata API — Next.js gives your website every advantage in the battle for Google's first page.",
    category: "SEO",
    readTime: "8 min read",
    date: "May 15, 2026",
    tags: ["Next.js", "SEO", "Technical"],
  },
  {
    slug: "how-ai-automation-saves-businesses-time",
    title: "How AI Automation Can Save Businesses 20+ Hours Per Week",
    excerpt:
      "From content creation to customer service, AI tools are transforming how UAE businesses operate. Here's a practical guide to getting started.",
    category: "AI & Automation",
    readTime: "9 min read",
    date: "May 5, 2026",
    tags: ["AI", "Automation", "Productivity"],
  },
];
