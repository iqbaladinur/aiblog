# blog.iqbaldev.my.id

Blog statis pribadi — Astro 7 + tema [AstroPaper](https://github.com/satnaing/astro-paper) + Cloudflare Pages.

## Stack

| Bagian | Pilihan |
|---|---|
| Framework | Astro 7 (zero JS by default, MDX, content collections) |
| Tema | AstroPaper v6 (tipografi, dark mode, SEO, pagefind search) |
| Konten | Markdown/MDX di `src/content/posts/` |
| Hosting | Cloudflare Pages (CDN global, HTTPS otomatis) |
| Package manager | Bun (lokal), npm (di Cloudflare Pages) |

## Nulis post baru

1. Copy file post yang ada di `src/content/posts/` (mis. `selamat-datang.md`)
2. Ganti frontmatter: `title`, `pubDatetime`, `description`, `tags`
3. Tulis isinya (Markdown/MDX biasa)
4. Local preview: `bun run dev` → http://localhost:4321
5. Push → Cloudflare Pages auto-deploy

## Local dev

```bash
bun install
bun run dev        # dev server :4321
bun run build      # astro check + build + pagefind → dist/
```

Build butuh Node >= 22.12 (lokal: node 24 via nvm, `export PATH="$HOME/.bun/bin:$PATH"`).

## Deploy ke Cloudflare Pages

### Opsi A — Git integration (recommended, auto-deploy tiap push)

1. `git init && git add -A && git commit -m "init blog"`
2. Bikin repo GitHub: `iqbaladinur/aiblog` (via dashboard github.com)
3. `git remote add origin git@github.com:iqbaladinur/aiblog.git && git push -u origin main`
4. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
   → pilih repo `iqbaladinur/aiblog`
5. **Build settings**:
   - Build command: `npm install && npm run build`
   - Build output: `dist`
   - Env vars: `NODE_VERSION=24`
6. **Custom domains** → add `blog.iqbaldev.my.id` (zone iqbaldev.my.id udah di Cloudflare,
   DNS otomatis di-manage Pages, proxy oranye)

### Opsi B — Wrangler CLI (butuh CF API token)

```bash
export CLOUDFLARE_API_TOKEN=<token>
export CLOUDFLARE_ACCOUNT_ID=<account-id>
bunx wrangler pages project create blog --production-branch main
bunx wrangler pages deploy dist --project-name blog
# lalu attach custom domain via dashboard atau:
bunx wrangler pages project ... (domain attach manual di dashboard)
```

## Struktur penting

```
astro-paper.config.ts   # config utama: site, socials, features
src/content/posts/      # semua tulisan (markdown)
src/content/pages/      # halaman statis (about)
src/i18n/lang/id.ts     # UI string Bahasa Indonesia
public/                 # asset statis (favicon, og image)
dist/                   # hasil build (jangan di-commit)
```
