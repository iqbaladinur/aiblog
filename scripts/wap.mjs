// Generator versi WAP ringan (khusus device lawas Nokia E63).
// Baca semua post markdown → tulis HTML minimal text-first ke dist/wap/.
// Dipanggil otomatis di akhir `bun run build` / `npm run build`.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = join(ROOT, "src", "content", "posts");
const OUT = join(ROOT, "dist", "wap");

const CSS = `body{background:#f5f5f5;color:#000;font:18px/1.45 sans-serif;margin:0;padding:10px}
h1{font-size:22px;margin:.5em 0} h2{font-size:19px;margin:1em 0 .4em} h3{font-size:17px}
a{color:#0000cc} img{max-width:100%;height:auto;margin:6px 0}
pre{background:#e8e8e8;padding:8px;overflow-x:auto;white-space:pre-wrap;font-size:15px}
blockquote{background:#e8e8e8;padding:6px 10px;margin:8px 0;border-left:4px solid #999}
table{border-collapse:collapse;width:100%;margin:8px 0} th,td{border:1px solid #888;padding:4px;font-size:15px;text-align:left}
.meta{color:#555;font-size:15px;margin:2px 0 10px}
.nav{margin:0 0 10px;font-size:16px}
.foot{margin-top:18px;padding-top:8px;border-top:1px solid #999;font-size:14px;color:#555}
code{font-family:monospace;font-size:15px} hr{border:0;border-top:1px solid #999;margin:14px 0}`;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return out;
}

function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;
  const flushPara = () => {
    if (buf) { out.push(`<p>${inline(buf)}</p>`); buf = ""; }
  };
  let buf = "";
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (t.startsWith("```")) {
      flushPara();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { code.push(lines[i]); i++; }
      i++;
      out.push(`<pre>${esc(code.join("\n"))}</pre>`);
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(t)) { flushPara(); out.push("<hr>"); i++; continue; }
    if (/^#{1,6}\s/.test(t)) {
      flushPara();
      const level = t.match(/^(#{1,6})\s/)[1].length;
      out.push(`<h${level}>${inline(t.replace(/^#{1,6}\s*/, ""))}</h${level}>`);
      i++; continue;
    }
    if (t.startsWith(">")) {
      flushPara();
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s/.test(t) || /^\d+\.\s/.test(t)) {
      flushPara();
      const ordered = /^\d+\.\s/.test(t);
      const items = [];
      while (i < lines.length) {
        const lt = lines[i].trim();
        if (ordered ? /^\d+\.\s/.test(lt) : /^[-*]\s/.test(lt)) {
          items.push(`<li>${inline(lt.replace(/^(\d+\.|[-*])\s*/, ""))}</li>`);
          i++;
        } else if (lt === "") { i++; break; }
        else { break; }
      }
      out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`);
      continue;
    }
    if (t.startsWith("|") && t.endsWith("|")) {
      flushPara();
      const rows = [];
      while (i < lines.length) {
        const lt = lines[i].trim();
        if (!(lt.startsWith("|") && lt.endsWith("|"))) break;
        rows.push(lt);
        i++;
      }
      const cells = (r) => r.slice(1, -1).split("|").map((c) => c.trim());
      let table = "<table>";
      let headerDone = false;
      for (const r of rows) {
        const cs = cells(r);
        if (!headerDone && cs.every((c) => /^:?-{2,}:?$/.test(c))) { headerDone = true; continue; }
        const tag = headerDone ? "td" : "th";
        table += `<tr>${cs.map((c) => `<${tag}>${inline(c)}</${tag}>`).join("")}</tr>`;
        headerDone = true;
      }
      out.push(table + "</table>");
      continue;
    }
    if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(t)) {
      flushPara();
      const m = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      const alt = m[1] || "gambar";
      out.push(`<img src="${m[2]}" alt="${esc(alt)}">`);
      i++; continue;
    }
    if (t === "") { flushPara(); i++; continue; }
    buf += (buf ? " " : "") + t;
    i++;
  }
  flushPara();
  return out.join("\n");
}

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: md.slice(m[0].length).replace(/^\r?\n/, "") };
}

function page(title, bodyHtml) {
  return `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=320">
<title>${esc(title)} — AIBlog (WAP)</title>
<style>${CSS}</style></head>
<body>${bodyHtml}
<p class="foot">AIBlog — versi ringan untuk device lama • <a href="/wap/">Beranda</a> • <a href="/wap/about/">Tentang</a></p>
</body></html>`;
}

const nav = (label) => `<p class="nav"><a href="/wap/">Beranda</a>${label ? " • " + label : ""}</p>`;

const files = readdirSync(POSTS_DIR).filter(
  (f) => f.endsWith(".md") && !f.startsWith("_") && !f.endsWith(".mdx")
);
mkdirSync(OUT, { recursive: true });
const posts = [];
for (const f of files) {
  const md = readFileSync(join(POSTS_DIR, f), "utf8");
  const { meta, body } = parseFrontmatter(md);
  if (meta.draft === "true") continue;
  const slug = meta.slug || f.replace(/\.md$/, "");
  const date = meta.pubDatetime ? new Date(meta.pubDatetime) : new Date(0);
  posts.push({ slug, meta, body, date, file: f });
}
posts.sort((a, b) => b.date - a.date);

// --- index (daftar semua post) ---
let list = "";
for (const p of posts) {
  const d = p.date.toISOString().slice(0, 10);
  const desc = p.meta.description ? `<span class="meta"> — ${esc(p.meta.description)}</span>` : "";
  list += `<p><a href="/wap/posts/${p.slug}/"><strong>${esc(p.meta.title || p.slug)}</strong></a><br><span class="meta">${d}${desc}</span></p>`;
}
writeFileSync(join(OUT, "index.html"), page("Beranda", nav("") + `<h1>Beranda</h1><p class="meta">${posts.length} tulisan — versi WAP (text-first).</p>` + list));

// --- tiap post ---
for (const p of posts) {
  const d = p.date.toISOString().slice(0, 10);
  const tagHtml = p.meta.tags ? `<span class="meta"> • ${esc(p.meta.tags)}</span>` : "";
  const body = mdToHtml(p.body);
  const dir = join(OUT, "posts", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(p.meta.title || p.slug, nav(`<a href="/wap/posts/">Tulisan</a>`) + `<h1>${esc(p.meta.title || p.slug)}</h1><p class="meta">${d}${tagHtml}</p>` + body));
}

// --- about ---
try {
  const md = readFileSync(join(ROOT, "src", "content", "pages", "about.md"), "utf8");
  const { meta, body } = parseFrontmatter(md);
  const dir = join(OUT, "about");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(meta.title || "Tentang", nav(`<a href="/wap/">Beranda</a>`) + `<h1>${esc(meta.title || "Tentang")}</h1>` + mdToHtml(body)));
} catch {}

console.log(`[wap] ${posts.length} posts → dist/wap/`);
