---
author: Iqbal Adi
pubDatetime: 2026-09-04T00:00:00.000Z
modDatetime: 2026-09-04T00:00:00.000Z
title: "Selamat datang di blog ini"
slug: selamat-datang
featured: true
draft: false
tags:
  - blog
  - astro
description: Postingan pertama blog gw — kenapa blog ini ada, stack-nya apa, dan gimana caranya bikin blog statis yang enak dibaca.
---

Halo! Ini postingan pertama blog gw. Setelah sekian lama cuma nyimpen catatan di wiki pribadi, gw pengen ada tempat buat nulis yang lebih publik & terkurasi — tulisan yang udah dirapiin, bukan sekadar catatan mentah.

## Kenapa blog statis?

Blog ini **tanpa server, tanpa database, tanpa CMS**. Cuma file Markdown yang di-build jadi HTML statis. Hasilnya:

- **Cepet** — gak ada backend yang nge-render, murni file statis dari CDN
- **Aman** — gak ada yang bisa di-hack karena gak ada yang jalan di server
- **Gratis** — hosting di Cloudflare Pages, bandwidth 100 GB/bulan tanpa bayar
- **Fokus nulis** — nulis cukup `.md`, sisanya beres sendiri

> Blog statis itu kayak buku cetak: begitu keluar dari percetakan (build), isinya gak bisa diubah-ubah siapa-siapa — dan gak ada yang bisa nge-bobol percetakannya.

## Stack yang dipake

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | Astro 7 | Zero JS default, islands, content collections |
| Tema | AstroPaper | Tipografi enak, dark mode, SEO-ready |
| Konten | Markdown/MDX | Fokus nulis, gak ribet |
| Hosting | Cloudflare Pages | CDN global, HTTPS otomatis, deploy dari git |
| Font | System stack | Gak ada request ekstra, loading instant |

## Contoh formatting

Buat mastiin tipografinya enak, ini beberapa elemen yang sering dipake:

### Kode

```js
// baca file markdown, jadiin halaman
const posts = await getCollection("posts");
const html = await render(post);
```

### List & kutipan

1. Tulis draft di `src/content/posts/`
2. Build & preview lokal
3. `git push` → Cloudflare Pages auto-deploy

> [!NOTE]
> Mau nambah tulisan baru? Tinggal copy post ini, ganti frontmatter-nya, tulis isinya. Gak perlu sentuh kode sama sekali.

## Kedepannya

Rencana ke depan: tulisan seputar **dev & microservices**, **finansial/IDX**, dan kadang **hal random** yang gw pelajari. Kalau ada yang pengen dibahas, gw terbuka — kolom komentar bisa nyusul via Giscus nanti.

Sampai ketemu di tulisan berikutnya. 👋
