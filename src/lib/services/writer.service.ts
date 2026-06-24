import { groq } from "@/lib/groq/client";

export type Tone = "technical" | "thought-leadership" | "beginner-friendly";

export interface GeneratedPost {
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  tags: string[];
  keywords: string[];
  readingTime: number;
  sources: string[];
}

export interface SocialPosts {
  twitter: string;
  linkedin: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripFences(text: string): string {
  return text.replace(/^```(?:json|markdown)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();
}

function safeJson<T>(raw: string): T {
  // 1. Direct parse (model returned clean JSON)
  try { return JSON.parse(raw); } catch {}

  // 2. Strip code fences then parse
  const stripped = stripFences(raw);
  try { return JSON.parse(stripped); } catch {}

  // 3. Extract the outermost {...} block and parse
  const match = stripped.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch {}

    // 4. Fix unescaped newlines ONLY inside string values, not structural whitespace
    try {
      const fixed = match[0].replace(
        /("(?:[^"\\]|\\.)*")/g,
        (str) => str
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t")
      );
      return JSON.parse(fixed);
    } catch {}
  }

  throw new Error("Invalid JSON from AI — try again");
}

/** Replace ```mermaid blocks with mermaid.ink PNG image links (URL-safe base64) */
function renderDiagrams(content: string): string {
  return content.replace(/```mermaid\n([\s\S]*?)```/g, (_m, code: string) => {
    try {
      // base64url: no +, no /, no padding — safe in URL path segments
      const b64url = Buffer.from(code.trim()).toString("base64url");
      return `![System Design Diagram](https://mermaid.ink/img/${b64url})`;
    } catch { return _m; }
  });
}

async function llm(
  system: string,
  user: string,
  opts: { temp?: number; tokens?: number; json?: boolean } = {}
): Promise<string> {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: opts.temp ?? 0.6,
    max_tokens: opts.tokens ?? 3000,
    ...(opts.json ? { response_format: { type: "json_object" } } : {}),
  });
  return res.choices[0]?.message?.content ?? "";
}

// ── Tone ──────────────────────────────────────────────────────────────────────

const TONE: Record<Tone, string> = {
  technical:
    "Senior engineers & architects. Be precise and go deep. Production code with error handling, real benchmarks with numbers, failure modes, security attack vectors. Reference Google, Netflix, Stripe decisions. Include 'When NOT to use this'.",
  "thought-leadership":
    "CTOs, founders, engineering leaders. Open with a counterintuitive insight. Take strong stances. Dismantle misconceptions with evidence. Reference real case studies. End with a call to rethink something the reader takes for granted.",
  "beginner-friendly":
    "Junior developers. Define every acronym. Use real-world analogies. Start with WHY before WHAT. One concept per code snippet. Include a 'Common Questions' section and 'What to learn next' roadmap.",
};

// ── Stage 1: Research ─────────────────────────────────────────────────────────

export async function researchTopic(topic: string): Promise<string> {
  return llm(
    `You are a world-class technical researcher. Produce a dense, fact-filled research brief.
Rules: specific numbers only (never vague), name real companies, include real failure stories, cite actual papers or engineering blog posts by name.`,
    `Research: "${topic}"

Cover ALL of these — be extremely specific:
1. How it works internally (data structures, algorithms, protocols)
2. Real deployments — specific companies and exactly what they built
3. Benchmarks — numbers, hardware, conditions (e.g. "8ms P99 at 50k RPS on c5.2xlarge")
4. Known failure modes with root causes from real incidents
5. Security: specific attack vectors + mitigations
6. Evolution: what existed before, why this emerged, what replaced it
7. Production code patterns engineers use
8. Top 5 mistakes engineers make (specific, from real incidents)
9. Vs top 3 alternatives — decision criteria for each
10. Interview questions senior engineers face on this topic`,
    { temp: 0.2, tokens: 2000 }
  );
}

// ── Stage 2: Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata(
  topic: string,
  research: string
): Promise<{ title: string; slug: string; metaDescription: string; excerpt: string; keywords: string[]; tags: string[] }> {
  const raw = await llm(
    `You generate SEO metadata for engineering blog posts. Return ONLY a valid JSON object, nothing else.`,
    `Topic: "${topic}"
Research summary: ${research.slice(0, 500)}

Return this JSON object:
{
  "title": "Specific SEO title 50-70 chars",
  "slug": "lowercase-hyphenated-slug",
  "metaDescription": "150-160 chars with primary keyword",
  "excerpt": "3-4 sentence preview that makes engineers want to read",
  "keywords": ["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8"],
  "tags": ["tag1","tag2","tag3","tag4","tag5"]
}`,
    { temp: 0.3, tokens: 500, json: true }
  );
  return safeJson(raw);
}

// ── Stage 3: Section-by-section writing ──────────────────────────────────────
// Each section is generated in its own API call so nothing gets truncated.

const WRITER_SYSTEM = (tone: Tone, topic: string, research: string) => `
You are a world-class software architect writing one section of an engineering blog post for Sumeet Rana (sumeetrana.com, senior engineer, Abu Dhabi, UAE). Write in first person as Sumeet.

Topic: ${topic}
Tone: ${TONE[tone]}

Research brief (use these facts, numbers, companies throughout):
${research}

Rules:
- Every claim must use specific numbers or named examples from the research brief.
- No filler. Every sentence must teach something.
- Production-quality code: correct syntax, realistic names, error handling, language tag on every fence.
- Short paragraphs (max 4 sentences).
- Write ONLY the section requested. Do not add other sections.
`.trim();

async function writeSection(
  system: string,
  instruction: string,
  tokens = 2500
): Promise<string> {
  return llm(system, instruction, { temp: 0.65, tokens });
}

// ── Orchestrator ──────────────────────────────────────────────────────────────

export async function generateBlogPost(
  topic: string,
  tone: Tone = "technical",
  onProgress?: (step: string, message: string) => void
): Promise<GeneratedPost> {
  const emit = (step: string, msg: string) => onProgress?.(step, msg);

  // 1. Research
  emit("research", "🔍 Deep-researching the topic — gathering benchmarks, case studies, failure modes…");
  const research = await researchTopic(topic);

  // 2. Metadata
  emit("metadata", "🏷️  Generating SEO title, slug, and keywords…");
  const meta = await generateMetadata(topic, research);

  const sys = WRITER_SYSTEM(tone, topic, research);

  // 3. Write sections in batches (each call < 3000 tokens out, well under 12k TPM)
  emit("section1", "✍️  Writing introduction and background…");
  const sec1 = await writeSection(sys, `Write these two sections in full markdown:

## Introduction
Hook the reader with a surprising statistic or a scenario they've lived through. Explain clearly what problem this post solves and exactly what the reader will learn. 3-4 substantial paragraphs.

## Table of Contents
Markdown list linking to all sections of the article.

## Background / Why This Matters
History and context. What existed before? Why did this emerge? Who is affected and how badly? Reference real incidents or industry shifts. 3-4 paragraphs.`);

  emit("section2", "✍️  Writing core concepts with system design diagram…");
  const sec2 = await writeSection(sys, `Write this section in full markdown:

## Core Concepts

Explain the fundamental ideas from first principles. Define all terms before using them.

Then include a Mermaid architecture diagram showing the system design:
\`\`\`mermaid
[write an appropriate architecture/flow diagram for this topic]
\`\`\`

Then explain each component shown in the diagram in detail. 4-5 paragraphs minimum.`);

  emit("section3", "✍️  Writing deep technical dive with code examples…");
  const sec3 = await writeSection(sys, `Write this section in full markdown:

## Deep Dive: How It Works

Walk through the internals step by step. Include at least two complete, production-quality code examples with:
- Realistic variable names
- Error handling
- Inline comments on non-obvious lines
- Language tag on the code fence

Explain what happens at each step and WHY. 500+ words minimum.`, 3000);

  emit("section4", "✍️  Writing real-world implementation…");
  const sec4 = await writeSection(sys, `Write this section in full markdown:

## Real-World Implementation

A full, realistic production scenario. Show the messy parts: error handling, retries, observability, edge cases. Include a complete code sample (not a toy example). Name a real company that does something similar and explain their approach. 400+ words.`);

  emit("section5", "✍️  Writing performance, scalability, and security…");
  const sec5 = await writeSection(sys, `Write these sections in full markdown:

## Performance & Scalability Considerations

Use specific numbers and benchmarks from the research brief. Discuss: at what scale does this approach break down? What should you monitor in production? Include a second Mermaid diagram if helpful for showing a scalability architecture.

## Security Considerations

Name the specific attack vectors. For each: describe the attack, show a vulnerable code example, then show the secure version. Concrete and actionable.`);

  emit("section6", "✍️  Writing mistakes, best practices, and comparisons…");
  const sec6 = await writeSection(sys, `Write these sections in full markdown:

## Common Mistakes and How to Avoid Them

List exactly 5 specific mistakes engineers make (not generic advice — real mistakes from real incidents). For each: what they do wrong, why it's wrong, what to do instead.

## Best Practices

8 numbered, actionable best practices. Each must be specific and concrete — not "write tests" but "write integration tests that verify X with Y".

## Comparison / Alternatives

A markdown table comparing this approach vs its top 3 alternatives. Columns: Approach | Best for | Avoid when | Performance | Complexity. Then 2-3 paragraphs explaining when to choose each.`);

  emit("section7", "✍️  Writing interview questions, takeaways, and conclusion…");
  const sec7 = await writeSection(sys, `Write these sections in full markdown:

## Interview Questions

5 questions senior engineers actually get asked about this topic in FAANG/high-growth company interviews. For each question, provide a one-paragraph model answer that would impress an interviewer.

## Key Takeaways

7 bullet points capturing the most important insights from this entire article. Written so someone who only reads this section gets the core message.

## Conclusion

Restate the central insight in a fresh way. End with a specific, actionable call to action — what should the reader do TODAY with this knowledge? Close with a memorable thought from Sumeet's perspective as a practising engineer.`, 2000);

  // 4. Combine all sections
  emit("diagrams", "🎨 Rendering system design diagrams as images…");
  const fullContent = [sec1, sec2, sec3, sec4, sec5, sec6, sec7]
    .join("\n\n")
    .trim();
  const contentWithImages = renderDiagrams(fullContent);

  const wordCount = contentWithImages.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return {
    ...meta,
    content: contentWithImages,
    readingTime,
    sources: [],
  };
}

// ── Social Posts ──────────────────────────────────────────────────────────────

export async function generateSocialPosts(
  title: string,
  excerpt: string,
  slug: string
): Promise<SocialPosts> {
  const url = `https://sumeetrana.com/blog/${slug}`;
  const raw = await llm(
    `Generate social media posts. Return ONLY a valid JSON object, nothing else.`,
    `Blog post by Sumeet Rana (senior engineer, Abu Dhabi).
Title: ${title}
Summary: ${excerpt}
URL: ${url}

JSON:
{
  "twitter": "Under 270 chars. Lead with the most compelling insight. 2-3 hashtags. End with URL.",
  "linkedin": "4-5 short paragraphs. Bold opening claim. Expand with insight. Practical takeaway. Call to action. URL at end. Max 3 hashtags."
}`,
    { temp: 0.8, tokens: 800, json: true }
  );
  return safeJson<SocialPosts>(raw);
}
