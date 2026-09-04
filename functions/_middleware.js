// Cloudflare Pages Functions middleware — khusus Nokia E63
// Kalau User-Agent = Nokia E63 → redirect ke versi WAP ringan (/wap/...).
// Device lain / asset statis → jalan normal.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const p = url.pathname;

  // jangan sentuh: halaman wap itu sendiri, asset, dan path internal CF
  if (
    p.startsWith("/wap") ||
    p.startsWith("/cdn-cgi/") ||
    p.startsWith("/_astro/") ||
    p.startsWith("/pagefind/") ||
    /\.(png|jpe?g|gif|svg|webp|css|js|xml|txt|json|ico|woff2?|ttf|pdf|map)$/i.test(p)
  ) {
    return context.next();
  }

  const ua = (context.request.headers.get("user-agent") || "").toLowerCase();
  // khusus E63 doang (bukan semua Symbian)
  const isE63 = /nokia ?e63/i.test(ua);

  if (isE63) {
    const target = p === "/" ? "/wap/" : "/wap" + p + (p.endsWith("/") ? "" : "/");
    url.pathname = target;
    return Response.redirect(url.toString(), 302);
  }

  return context.next();
}
