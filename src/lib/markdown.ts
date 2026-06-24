/**
 * Converts AI-generated markdown to sanitized HTML.
 * Line-by-line state machine — handles single-newline paragraphs, nested lists,
 * fenced code blocks, tables, blockquotes, and mermaid.ink images.
 */
export function markdownToHtml(md: string): string {
  // ── Step 1: hoist fenced code blocks into placeholders ──────────────────────
  const slots: string[] = [];
  const withSlots = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = escapeHtml(code.trimEnd());
    const cls = lang ? ` class="language-${lang}"` : "";
    slots.push(`<pre><code${cls}>${escaped}</code></pre>`);
    return `\x00SLOT${slots.length - 1}\x00`;
  });

  // ── Step 2: line-by-line state machine ──────────────────────────────────────
  const lines = withSlots.split("\n");
  const out: string[] = [];

  type ListType = "ul" | "ol";
  const listStack: ListType[] = [];      // supports one level of nesting
  const paraLines: string[] = [];
  let tableLines: string[] = [];
  let tableHasHeader = false;

  function flushPara() {
    if (!paraLines.length) return;
    out.push(`<p>${inlineMarkdown(paraLines.join(" ").trim())}</p>`);
    paraLines.length = 0;
  }

  function flushLists() {
    while (listStack.length) out.push(`</${listStack.pop()}>`);
  }

  function flushTable() {
    if (!tableLines.length) return;
    const rows = tableLines;
    tableLines = [];
    tableHasHeader = false;

    const html: string[] = [];
    let inBody = false;
    for (const row of rows) {
      if (row === "__SEP__") {
        html.push("</thead><tbody>");
        inBody = true;
        continue;
      }
      const cells = row.slice(1, -1).split("|");
      if (!inBody) {
        html.push(
          `<thead><tr>${cells.map((c) => `<th>${inlineMarkdown(c.trim())}</th>`).join("")}</tr>`
        );
      } else {
        html.push(
          `<tr>${cells.map((c) => `<td>${inlineMarkdown(c.trim())}</td>`).join("")}</tr>`
        );
      }
    }
    if (inBody) html.push("</tbody>");
    out.push(`<div class="prose-table-wrap"><table>${html.join("")}</table></div>`);
  }

  function flush() {
    flushPara();
    flushLists();
    flushTable();
  }

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();

    // ── Code block slot ───────────────────────────────────────────────────────
    if (/^\x00SLOT\d+\x00$/.test(trimmed)) {
      flush();
      const idx = parseInt(trimmed.replace(/\x00SLOT(\d+)\x00/, "$1"), 10);
      out.push(slots[idx]);
      continue;
    }

    // ── Table rows ────────────────────────────────────────────────────────────
    if (trimmed.startsWith("|")) {
      flushPara();
      flushLists();
      if (/^\|[-| :]+\|$/.test(trimmed)) {
        tableLines.push("__SEP__");
        tableHasHeader = true;
      } else {
        tableLines.push(trimmed);
      }
      continue;
    } else if (tableLines.length) {
      flushTable();
    }

    // ── Empty line ────────────────────────────────────────────────────────────
    if (trimmed === "") {
      flushPara();
      // Keep list open across blank lines (common in markdown)
      continue;
    }

    // ── Horizontal rule ───────────────────────────────────────────────────────
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flush();
      out.push("<hr>");
      continue;
    }

    // ── Heading ───────────────────────────────────────────────────────────────
    const hm = trimmed.match(/^(#{1,6}) (.+)/);
    if (hm) {
      flush();
      out.push(`<h${hm[1].length}>${inlineMarkdown(hm[2].trim())}</h${hm[1].length}>`);
      continue;
    }

    // ── Blockquote ────────────────────────────────────────────────────────────
    if (trimmed.startsWith("> ")) {
      flushPara();
      flushLists();
      out.push(`<blockquote><p>${inlineMarkdown(trimmed.slice(2))}</p></blockquote>`);
      continue;
    }

    // ── Unordered list ────────────────────────────────────────────────────────
    const ulm = trimmed.match(/^[*\-] (.+)/);
    if (ulm) {
      flushPara();
      if (!listStack.length || listStack[listStack.length - 1] !== "ul") {
        flushLists();
        out.push("<ul>");
        listStack.push("ul");
      }
      out.push(`<li>${inlineMarkdown(ulm[1])}</li>`);
      continue;
    }

    // ── Ordered list ─────────────────────────────────────────────────────────
    const olm = trimmed.match(/^\d+\. (.+)/);
    if (olm) {
      flushPara();
      if (!listStack.length || listStack[listStack.length - 1] !== "ol") {
        flushLists();
        out.push("<ol>");
        listStack.push("ol");
      }
      out.push(`<li>${inlineMarkdown(olm[1])}</li>`);
      continue;
    }

    // ── Paragraph text ────────────────────────────────────────────────────────
    // Close any open list before accumulating paragraph lines
    if (listStack.length) flushLists();
    paraLines.push(trimmed);
  }

  flush();
  return out.join("\n");
}

// ── Inline markdown ────────────────────────────────────────────────────────────

function toSafeBase64Url(url: string): string {
  // Fix standard base64 in mermaid.ink URLs: + → -, / → _, strip padding
  return url.replace(
    /(https:\/\/mermaid\.ink\/img\/)([A-Za-z0-9+/=]+)/,
    (_, prefix, b64) => prefix + b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
  );
}

function inlineMarkdown(text: string): string {
  return text
    // Images (before links)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const safeSrc = toSafeBase64Url(src);
      return `<img src="${safeSrc}" alt="${alt}" class="prose-img" />`;
    })
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
