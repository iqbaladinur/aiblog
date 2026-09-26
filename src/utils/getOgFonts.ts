/**
 * Font untuk OG image (satori).
 *
 * Satori TIDAK bisa parse woff2 (`Unsupported OpenType signature wOF2`), jadi OG
 * pakai TTF statis terpisah di src/assets/fonts/og/ (di luar pipeline web — halaman
 * tetap memakai woff2 via astro:assets Font = 48KB, bukan TTF = 65KB).
 *
 * Sumber TTF: legacy Google Fonts CSS API (`css?family=...` tanpa UA woff2) — SIL OFL.
 * Font face: display = Archivo Black, body = Inter (lihat ~/design-system/tokens.json).
 */
import { readFileSync } from "node:fs";
import type { Buffer } from "node:buffer";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { SatoriOptions } from "satori";

/**
 * Astro mem-bundle endpoint ini ke dist/.prerender/, jadi `import.meta.url`
 * TIDAK menunjuk ke src/. Pakai cwd (root project saat build) dengan fallback
 * ke lokasi relatif source, supaya jalan di build maupun dev.
 */
const candidates = [
  join(process.cwd(), "src/assets/fonts/og"),
  fileURLToPath(new URL("../assets/fonts/og/", import.meta.url)),
];
const dir = candidates.find(d => existsSync(d));
if (!dir) {
  throw new Error(`Folder font OG tidak ditemukan. Dicoba: ${candidates.join(", ")}`);
}

// satori butuh Buffer (bukan Uint8Array) — jangan di-convert
const read = (file: string): Buffer => readFileSync(join(dir, file));

/** Tipe font face mengikuti satori supaya `weight` tidak jadi number biasa. */
export type OgFont = SatoriOptions["fonts"][number];

/** Daftar font face siap-pakai untuk opsi `fonts: [...]` satori. */
export function getOgFonts(): OgFont[] {
  return [
    {
      name: "Display",
      data: read("archivo-black-400.ttf"),
      weight: 400,
      style: "normal",
    },
    { name: "Body", data: read("inter-500.ttf"), weight: 500, style: "normal" },
    { name: "Body", data: read("inter-700.ttf"), weight: 700, style: "normal" },
  ];
}
