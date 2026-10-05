/*
 * Builds the guide: every content/NN-name.md becomes _site/name.html (the
 * first becomes index.html), wrapped in one page template with the hub's
 * look and a navigation list in file order.
 *
 *   npm ci && npm run build      → _site/
 *
 * To add a page, add content/NN-name.md whose first line is "# Title".
 * Link between pages with their .html names: [the harness](harness.html).
 */

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "_site");

const pages = fs.readdirSync(path.join(ROOT, "content"))
  .filter((f) => /^\d+-[a-z0-9-]+\.md$/.test(f))
  .sort()
  .map((f, i) => {
    const md = fs.readFileSync(path.join(ROOT, "content", f), "utf8");
    const title = (md.match(/^#\s+(.+)$/m) || [, f])[1].trim();
    const slug = i === 0 ? "index" : f.replace(/^\d+-/, "").replace(/\.md$/, "");
    return { file: f, md, title, slug };
  });

/* Headings get ids, so sections can be linked to. */
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
marked.use({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;
    },
  },
});

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function page(p) {
  const nav = pages.map((q) =>
    `<a href="${q.slug === "index" ? "./" : q.slug + ".html"}"${q === p ? ' aria-current="page"' : ""}>${esc(q.title)}</a>`).join("\n        ");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)} · Chimera Hub guide</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
</head>
<body>
  <header class="top">
    <a class="brand" href="./">Chimera Hub <span>guide</span></a>
    <a class="hub" href="https://project-chimera-hub.github.io/ChimeraHub/">Open the hub ↗</a>
  </header>
  <div class="layout">
    <nav class="side" aria-label="Guide pages">
        ${nav}
    </nav>
    <main>
${marked.parse(p.md)}
    </main>
  </div>
  <footer>Edit this page: <a href="https://github.com/Project-Chimera-Hub/guide/blob/main/content/${p.file}">content/${p.file}</a></footer>
</body>
</html>
`;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, "assets"))) {
  fs.copyFileSync(path.join(ROOT, "assets", f), path.join(OUT, "assets", f));
}
for (const p of pages) fs.writeFileSync(path.join(OUT, p.slug + ".html"), page(p));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log(`Built ${pages.length} pages into _site/`);
