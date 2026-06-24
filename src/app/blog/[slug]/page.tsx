import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { getPublishedBySlug } from "@/lib/repositories/published.repo";
import { markdownToHtml } from "@/lib/markdown";

// Allow slugs not in generateStaticParams (DB posts)
export const dynamicParams = true;
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Static post
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      title: `${staticPost.title} | Sumeet Rana`,
      description: staticPost.excerpt,
      keywords: staticPost.tags.join(", "),
      openGraph: {
        title: staticPost.title,
        description: staticPost.excerpt,
        type: "article",
        publishedTime: staticPost.date,
        authors: ["Sumeet Rana"],
        tags: staticPost.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: staticPost.title,
        description: staticPost.excerpt,
      },
    };
  }

  // DB post
  try {
    const dbPost = await getPublishedBySlug(slug);
    if (dbPost) {
      return {
        title: `${dbPost.title} | Sumeet Rana`,
        description: dbPost.metaDescription,
        keywords: dbPost.tags.join(", "),
        openGraph: {
          title: dbPost.title,
          description: dbPost.metaDescription,
          type: "article",
          publishedTime: dbPost.publishedAt.toISOString(),
          authors: ["Sumeet Rana"],
          tags: dbPost.tags,
        },
        twitter: {
          card: "summary_large_image",
          title: dbPost.title,
          description: dbPost.metaDescription,
        },
      };
    }
  } catch {
    // DB unavailable — fall through to notFound
  }

  return { title: "Not Found" };
}

const categoryBadgeColors: Record<string, string> = {
  "Web Development": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  SEO: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Mobile Apps": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "AI & Automation": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

// --- STATIC ARTICLE CONTENT ---

function ArticleUAEFastWebsite() {
  return (
    <div className="prose-custom">
      <p className="lead">
        If your website takes longer than three seconds to load, you are losing
        customers right now. In the UAE — one of the most mobile-connected
        markets on the planet — a slow website is not just a technical problem.
        It is a revenue problem.
      </p>

      <h2>UAE&apos;s Mobile-First Reality</h2>
      <p>
        The UAE has one of the highest smartphone penetration rates in the
        world, exceeding 95% of the population. According to Statista, mobile
        internet usage in the UAE accounts for over 70% of all web traffic —
        higher than the global average of 58%. This means that when someone
        finds your business online, they are almost certainly on a mobile
        device.
      </p>
      <p>
        Mobile networks, even on 5G, introduce latency that desktop broadband
        does not. A page that loads instantly on your office Wi-Fi might crawl
        on a user commuting on the Dubai Metro. And that user? They will leave.
        Google&apos;s own research shows that 53% of mobile visitors abandon a
        site that takes longer than 3 seconds to load.
      </p>

      <h2>How Google Punishes Slow Websites</h2>
      <p>
        Since 2021, Google has used Core Web Vitals as a confirmed ranking
        signal. These three metrics determine whether your site is considered
        &quot;fast&quot; or &quot;slow&quot; in Google&apos;s eyes:
      </p>
      <ul>
        <li>
          <strong>Largest Contentful Paint (LCP):</strong> How long does the
          main content take to appear? Good is under 2.5 seconds. Poor is over
          4 seconds.
        </li>
        <li>
          <strong>Cumulative Layout Shift (CLS):</strong> Does your page jump
          around as it loads? A CLS score above 0.1 is considered poor and
          frustrates users.
        </li>
        <li>
          <strong>Interaction to Next Paint (INP):</strong> How quickly does
          your page respond to clicks and taps? Over 500ms is poor.
        </li>
      </ul>
      <p>
        If your website fails these metrics, you are not just providing a bad
        experience — you are actively being deprioritised in Google Search
        results. For competitive UAE markets like real estate, hospitality,
        healthcare, and e-commerce, this can mean the difference between being
        on page one and being invisible.
      </p>

      <h2>The Direct Revenue Impact of Slow Pages</h2>
      <p>
        Speed is not just an SEO metric — it directly impacts conversion rates.
        The data is unambiguous:
      </p>
      <ul>
        <li>
          Amazon found that every 100ms of latency cost them 1% in sales.
        </li>
        <li>
          Walmart reported a 2% increase in conversions for every 1 second of
          improved load time.
        </li>
        <li>
          A Deloitte study found that a 0.1s improvement in site speed
          increased retail conversions by 8.4%.
        </li>
      </ul>
      <p>
        Scale these numbers to a UAE business generating AED 500,000 per year
        online. A 2-second speed improvement could realistically add AED 40,000
        to AED 100,000 in annual revenue without increasing your ad spend.
      </p>

      <h2>Why UAE Businesses Are Particularly at Risk</h2>
      <p>
        Many UAE businesses were built on WordPress themes, page builders like
        Elementor, or early e-commerce platforms that were never optimised for
        performance. These platforms load dozens of plugins, heavy CSS
        frameworks, and unoptimised images by default.
      </p>
      <p>
        The result? PageSpeed Insights scores in the 20–40 range. In a market
        where competitors are investing in modern tech stacks, this gap becomes
        a serious competitive disadvantage.
      </p>

      <h2>How to Fix a Slow Website</h2>
      <p>
        The good news is that most speed problems are solvable. Here are the
        highest-impact improvements in order of priority:
      </p>
      <ul>
        <li>
          <strong>Migrate to a modern framework:</strong> Next.js, Nuxt, or
          Astro deliver server-rendered pages that load significantly faster
          than client-heavy SPAs or bloated WordPress installs.
        </li>
        <li>
          <strong>Optimise and convert images:</strong> Use WebP or AVIF format.
          Lazy-load images below the fold. Set explicit width and height
          attributes to prevent layout shift.
        </li>
        <li>
          <strong>Use a CDN:</strong> Cloudflare or AWS CloudFront caches your
          content at edge servers close to your UAE users, cutting latency
          dramatically.
        </li>
        <li>
          <strong>Remove render-blocking scripts:</strong> Load third-party
          scripts (analytics, chat widgets, pixels) asynchronously or defer
          them until after the page is interactive.
        </li>
        <li>
          <strong>Enable HTTP/2 and Brotli compression:</strong> Modern servers
          compress text assets and multiplex requests to reduce transfer sizes.
        </li>
        <li>
          <strong>Audit your plugins:</strong> Every WordPress plugin adds
          overhead. Audit ruthlessly — if a plugin can be replaced with a
          lightweight custom solution, replace it.
        </li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        In 2026, a fast website is not a nice-to-have for UAE businesses — it
        is table stakes. Your competitors are investing in performance. Google
        is rewarding performance. Your customers are demanding performance.
      </p>
      <p>
        A thorough performance audit typically identifies 70–80% of speed
        problems within the first hour. The question is not whether you can
        afford to fix your website. It is whether you can afford not to.
      </p>
    </div>
  );
}

function ArticleWebDevVsBuilders() {
  return (
    <div className="prose-custom">
      <p className="lead">
        You need a website. You open your browser and within minutes you have
        three tabs open: Wix, Squarespace, and a quote from a web developer.
        The prices are wildly different. The promises sound similar. So which
        one is actually right for your UAE business?
      </p>
      <p>
        The honest answer is: it depends. But the full picture is more nuanced
        than most people realise — and the &quot;cheaper&quot; option often
        turns out to be more expensive in the long run.
      </p>

      <h2>What Website Builders Actually Offer</h2>
      <p>
        Wix, Squarespace, and WordPress.com are all-in-one platforms that
        handle hosting, design templates, and basic functionality in a monthly
        subscription. They are marketed as empowering — you can launch a
        website without writing a single line of code.
      </p>
      <p>
        For many use cases, they genuinely work well. A freelancer building a
        portfolio, a local bakery adding an online presence, or a yoga studio
        with a class schedule — these are ideal builder use cases. The speed to
        launch is real, and the cost at entry level is low.
      </p>

      <h2>The Hidden Costs of Website Builders</h2>
      <p>
        Where the story changes is when you look at total cost of ownership over
        2–3 years, and when you consider performance and growth ceiling:
      </p>
      <ul>
        <li>
          <strong>Subscription escalation:</strong> Wix&apos;s Business plan
          starts at ~$27/month, but to remove ads, add e-commerce, and unlock
          SEO tools you climb to $36–$159/month. Over 3 years, that&apos;s
          $1,300–$5,700 with nothing to own at the end.
        </li>
        <li>
          <strong>Performance ceiling:</strong> Builder-generated sites
          consistently score poorly on Core Web Vitals. Wix sites average a
          Google PageSpeed score of 45–60 on mobile. This directly affects your
          search rankings.
        </li>
        <li>
          <strong>Lock-in:</strong> Your content, design, and structure live
          inside the platform. If Wix raises prices (they have) or you outgrow
          it, migrating is painful and expensive — often requiring a full
          rebuild.
        </li>
        <li>
          <strong>Limited customisation:</strong> When your business needs
          something the template doesn&apos;t support — a custom booking flow,
          a CRM integration, a multi-language experience — you hit a wall.
        </li>
        <li>
          <strong>Time cost:</strong> Most business owners spend 10–20 hours
          initially building and then ongoing hours maintaining a builder site.
          At your hourly rate, that time has real monetary value.
        </li>
      </ul>

      <h2>What Custom Development Offers</h2>
      <p>
        A custom-built website developed with Next.js or a similar modern
        framework is a different type of investment entirely. You are not buying
        a tool — you are commissioning an asset.
      </p>
      <ul>
        <li>
          <strong>Performance from day one:</strong> Custom-built Next.js sites
          routinely score 90+ on Google PageSpeed, with sub-second load times
          that directly improve SEO and conversions.
        </li>
        <li>
          <strong>Complete flexibility:</strong> Any feature, any integration,
          any design. Your website grows with your business, not against it.
        </li>
        <li>
          <strong>You own it:</strong> The code, the design, the hosting
          relationship — all yours. No vendor dependency, no rent, no surprises.
        </li>
        <li>
          <strong>Lower ongoing costs:</strong> Hosting a Next.js site on Vercel
          or Netlify can cost as little as $20/month, with no per-feature
          premium pricing.
        </li>
      </ul>

      <h2>TCO Comparison: 3-Year View for a UAE Business</h2>
      <ul>
        <li>
          <strong>Wix Business Plan:</strong> ~AED 1,600/year subscription +
          AED 3,000 initial design time = AED 7,800 over 3 years. Limited SEO,
          performance constraints, no code ownership.
        </li>
        <li>
          <strong>WordPress + Elementor:</strong> AED 4,000–8,000 upfront +
          AED 800/year hosting/plugins. Risk of plugin bloat, security
          vulnerabilities, and ongoing maintenance overhead.
        </li>
        <li>
          <strong>Custom Next.js website:</strong> AED 8,000–18,000 upfront +
          AED 800/year hosting. Owned asset, high performance, full control,
          compounding SEO returns.
        </li>
      </ul>

      <h2>The Right Framework for UAE Businesses</h2>
      <p>
        <strong>Choose a website builder if:</strong> You need a simple
        informational site quickly, your budget is under AED 3,000, and growth
        or performance are not priorities.
      </p>
      <p>
        <strong>Choose custom development if:</strong> You are serious about SEO
        and organic growth, you need specific features or integrations, your
        website is a primary revenue channel, or you intend to scale.
      </p>
      <p>
        For most established UAE businesses, the answer is clear. A website is
        not a cost centre — it is your highest-leverage marketing asset. Invest
        in it accordingly.
      </p>
    </div>
  );
}

function ArticleMobileApps() {
  return (
    <div className="prose-custom">
      <p className="lead">
        Five years ago, mobile apps were the domain of large corporations and
        well-funded startups. Today, UAE small and medium businesses across
        retail, food, fitness, healthcare, and services are launching their own
        apps — and seeing tangible results in customer retention and revenue.
      </p>
      <p>
        This is not hype. The economics have changed. Cross-platform development
        with React Native means a business can have a fully functional iOS and
        Android app for a fraction of what it used to cost. And the business
        impact is measurable.
      </p>

      <h2>The Problem with Web-Only Presence</h2>
      <p>
        A website is essential, but it has one critical limitation: it requires
        active intent. A customer has to remember your URL, open a browser, and
        navigate to you. Every step is friction that reduces the chance of
        repeat engagement.
      </p>
      <p>
        An app removes that friction. Your brand lives on their home screen. You
        can reach them proactively. You know exactly who they are. This
        asymmetry in engagement is why app-based businesses consistently report
        higher customer lifetime value.
      </p>

      <h2>Loyalty Programs That Actually Work</h2>
      <p>
        Digital loyalty programs in apps outperform physical stamp cards by a
        significant margin. Why? Because an app-based loyalty program can be
        personalised, automated, and gamified in ways a paper card never can.
      </p>
      <p>
        A UAE café chain that moved from physical loyalty cards to an app-based
        points system reported a 40% increase in repeat visit frequency within
        six months. The app could identify a customer&apos;s favourite order,
        remind them when they were close to a free drink, and send personalised
        offers on their birthday — all automatically.
      </p>

      <h2>Direct Push Notifications: Your Own Marketing Channel</h2>
      <p>
        Email open rates have declined to 20–25% for most industries. Social
        media reach is pay-to-play. Push notifications, sent to app users who
        have opted in, achieve open rates of 40–70%.
      </p>

      <h2>In-App Ordering and Appointment Booking</h2>
      <p>
        The friction between intent and transaction is where most revenue is
        lost. An app with native in-app ordering or booking removes that
        friction completely.
      </p>

      <h2>First-Party Data Ownership</h2>
      <p>
        This is the underappreciated advantage of owning your own app. Every
        interaction a customer has with your app generates data that you own:
        what they browse, what they buy, when they visit, what they skip.
      </p>

      <h2>Getting Started: What to Expect</h2>
      <p>
        A well-scoped MVP mobile app for a UAE local business typically takes
        6–10 weeks to build and launch on both iOS and Android. The investment
        ranges from AED 25,000 to AED 60,000 depending on features.
      </p>
    </div>
  );
}

function ArticleNextJsSEO() {
  return (
    <div className="prose-custom">
      <p className="lead">
        Choosing the right framework for your website is one of the most
        consequential technical decisions you will make — and when SEO is a
        priority, Next.js has established itself as the clear leader.
      </p>

      <h2>The SEO Problem with Client-Side Rendering</h2>
      <p>
        Traditional React applications render entirely in the browser. When
        Google&apos;s crawler visits a client-rendered page, it initially receives
        an almost empty HTML document. Server-side rendering solves this at the root.
      </p>

      <h2>Next.js Metadata API</h2>
      <p>
        Next.js 13+ introduced a dedicated Metadata API that makes managing
        SEO tags clean, type-safe, and dynamic.
      </p>

      <h2>Core Web Vitals: Built for Performance</h2>
      <p>
        Next.js was designed from the ground up with performance as a first
        principle. Font optimisation, automatic code splitting, streaming SSR,
        and static generation by default all contribute to exceptional scores.
      </p>
    </div>
  );
}

function ArticleAIAutomation() {
  return (
    <div className="prose-custom">
      <p className="lead">
        The businesses that will win in the next five years are not necessarily
        the ones with the biggest teams or the largest budgets. They are the
        ones that learn to leverage AI automation to operate with a
        disproportionate output-to-headcount ratio.
      </p>

      <h2>What AI Automation Actually Means for Small Businesses</h2>
      <p>
        AI automation is not about replacing people. It is about eliminating the
        repetitive, low-cognitive work that consumes hours of your team&apos;s
        time every week.
      </p>
    </div>
  );
}

const articleContent: Record<string, React.ReactNode> = {
  "why-uae-businesses-need-fast-website-2026": <ArticleUAEFastWebsite />,
  "web-development-vs-website-builders": <ArticleWebDevVsBuilders />,
  "how-mobile-apps-help-local-businesses-grow": <ArticleMobileApps />,
  "why-nextjs-is-great-for-seo": <ArticleNextJsSEO />,
  "how-ai-automation-saves-businesses-time": <ArticleAIAutomation />,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // ── Static post ──────────────────────────────────────────────────────────────
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    const content = articleContent[slug];
    if (!content) notFound();

    const relatedPosts = blogPosts
      .filter(
        (p) =>
          p.slug !== slug &&
          (p.category === staticPost.category ||
            p.tags.some((t) => staticPost.tags.includes(t)))
      )
      .slice(0, 3);

    const categoryBadge =
      categoryBadgeColors[staticPost.category] ??
      "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: staticPost.title,
      description: staticPost.excerpt,
      author: { "@type": "Person", name: "Sumeet Rana", url: "https://sumeetrana.com" },
      datePublished: staticPost.date,
      publisher: { "@type": "Person", name: "Sumeet Rana" },
      keywords: staticPost.tags.join(", "),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostShell
          title={staticPost.title}
          excerpt={staticPost.excerpt}
          date={staticPost.date}
          readTime={staticPost.readTime}
          tags={staticPost.tags}
          categoryBadge={categoryBadge}
          category={staticPost.category}
          relatedPosts={relatedPosts.map((r) => ({
            slug: r.slug,
            title: r.title,
            category: r.category,
            readTime: r.readTime,
          }))}
        >
          {content}
        </PostShell>
      </>
    );
  }

  // ── DB (AI-generated) post ───────────────────────────────────────────────────
  let dbPost;
  try {
    dbPost = await getPublishedBySlug(slug);
  } catch {
    notFound();
  }
  if (!dbPost) notFound();

  const htmlContent = markdownToHtml(dbPost.content);
  const dateStr = dbPost.publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readTime = `${dbPost.readingTime} min read`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dbPost.title,
    description: dbPost.metaDescription,
    author: { "@type": "Person", name: "Sumeet Rana", url: "https://sumeetrana.com" },
    datePublished: dbPost.publishedAt.toISOString(),
    publisher: { "@type": "Person", name: "Sumeet Rana" },
    keywords: dbPost.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostShell
        title={dbPost.title}
        excerpt={dbPost.excerpt}
        date={dateStr}
        readTime={readTime}
        tags={dbPost.tags}
        categoryBadge="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
        category="Engineering"
        relatedPosts={[]}
      >
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </PostShell>
    </>
  );
}

// ── Shared layout shell ───────────────────────────────────────────────────────

function PostShell({
  title,
  excerpt,
  date,
  readTime,
  tags,
  category,
  categoryBadge,
  relatedPosts,
  children,
}: {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  categoryBadge: string;
  relatedPosts: { slug: string; title: string; category: string; readTime: string }[];
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen" style={{ background: "#050510" }}>
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60 line-clamp-1">{title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryBadge}`}>
                {category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8">{excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  SR
                </div>
                <span className="text-white/60 font-medium">Sumeet Rana</span>
              </div>
              <span>·</span>
              <span>{date}</span>
              <span>·</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container-custom pb-24">
        <div className="flex flex-col xl:flex-row gap-12">
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/40 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {children}

            {/* Author Box */}
            <div className="mt-16 glass-card rounded-2xl p-8 border border-indigo-500/20">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  SR
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1">Sumeet Rana</h3>
                  <p className="text-indigo-400 text-sm mb-3">Senior Software Engineer · Abu Dhabi, UAE</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    I help businesses and founders build fast, modern, and
                    SEO-optimised web and mobile products. With experience
                    across full-stack development, performance optimisation,
                    and AI integration, I focus on building digital products
                    that deliver measurable results.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-all"
                  >
                    Work with me
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="xl:w-72 flex-shrink-0">
            <div className="xl:sticky xl:top-32 space-y-6">
              {relatedPosts.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                        <div className="p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2 ${
                              categoryBadgeColors[related.category] ??
                              "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                            }`}
                          >
                            {related.category}
                          </span>
                          <h4 className="text-white text-sm font-medium leading-snug group-hover:text-indigo-300 transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-white/30 text-xs mt-1">{related.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium mt-4"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    All articles
                  </Link>
                </div>
              )}

              <div className="glass-card rounded-2xl p-6 border border-indigo-500/20">
                <h3 className="text-white font-bold mb-2">Need help with your project?</h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                  I&apos;m available for web, mobile, and AI automation projects. Let&apos;s have a quick call.
                </p>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
