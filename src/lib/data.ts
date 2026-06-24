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
    slug: "genienow",
    title: "GenieNow",
    subtitle: "Service Marketplace Platform",
    label: "Portfolio concept / self-initiated project",
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
    title: "AI Content Publishing Agent",
    subtitle: "Automated Content Pipeline",
    label: "Portfolio concept / self-initiated project",
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
    slug: "quickbite",
    title: "QuickBite",
    subtitle: "Restaurant Ordering Platform",
    label: "Portfolio concept / self-initiated project",
    problem:
      "Restaurants were paying 30% commission to food delivery apps like Talabat and Zomato, significantly eating into thin margins.",
    solution:
      "A white-label online ordering platform that restaurants can own — with a branded app, direct orders, zero commission, and full customer data ownership.",
    features: [
      "Branded restaurant web app",
      "Real-time order management system",
      "Table QR code ordering",
      "Kitchen display system (KDS)",
      "Loyalty points & promotions",
      "Multi-location management",
    ],
    tech: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Stripe", "Firebase", "GCP"],
    businessValue:
      "Eliminates third-party commission fees, increases average order value by 25% through upsells, and builds direct customer relationships with first-party data.",
    color: "from-rose-500 to-pink-600",
    gradient: "from-rose-500/10 to-pink-600/10",
  },
  {
    slug: "fitflow",
    title: "FitFlow",
    subtitle: "Gym Management SaaS",
    label: "Portfolio concept / self-initiated project",
    problem:
      "Small to mid-size gyms were using spreadsheets or outdated software to manage memberships, attendance, and billing — leading to revenue leakage.",
    solution:
      "A modern SaaS platform for gym management — with biometric check-in, automated billing, trainer scheduling, and member-facing mobile app.",
    features: [
      "Biometric & QR check-in system",
      "Automated subscription billing",
      "Class & trainer scheduling",
      "Member mobile app (iOS & Android)",
      "Revenue analytics dashboard",
      "Multi-branch management",
    ],
    tech: ["Next.js", "React Native", "NestJS", "PostgreSQL", "Stripe", "AWS", "Redis"],
    businessValue:
      "Reduces admin time by 60%, eliminates billing errors, and provides data-driven insights that help gym owners increase member retention by 35%.",
    color: "from-emerald-500 to-teal-600",
    gradient: "from-emerald-500/10 to-teal-600/10",
  },
  {
    slug: "fleettrack",
    title: "FleetTrack",
    subtitle: "Logistics Dashboard",
    label: "Portfolio concept / self-initiated project",
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
  {
    slug: "homehub",
    title: "HomeHub",
    subtitle: "Real Estate Portal",
    label: "Portfolio concept / self-initiated project",
    problem:
      "Property buyers and renters in UAE found it hard to find verified listings with accurate pricing, virtual tours, and neighborhood data in one place.",
    solution:
      "A premium real estate portal with AI-powered property matching, virtual 360° tours, neighborhood analytics, mortgage calculators, and agent CRM.",
    features: [
      "AI property recommendation engine",
      "360° virtual property tours",
      "Neighborhood insights & analytics",
      "Mortgage & ROI calculators",
      "Agent CRM & lead management",
      "Multi-language (English & Arabic)",
    ],
    tech: ["Next.js", "Python", "PostgreSQL", "Elasticsearch", "AWS", "Three.js", "Mapbox"],
    businessValue:
      "Increases qualified lead conversion by 45%, reduces time-on-market for listings, and creates a premium property search experience that builds agent trust.",
    color: "from-violet-500 to-indigo-600",
    gradient: "from-violet-500/10 to-indigo-600/10",
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
