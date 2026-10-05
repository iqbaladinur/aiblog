/**
 * Extract the first image path from a post's markdown source.
 * Scans for `![alt](/images/filename.jpg)` pattern in the raw .md file.
 * Returns null if no image found.
 */
import fs from "node:fs";
import path from "node:path";

export function getPostThumbnail(
  filePath: string | undefined
): string | null {
  if (!filePath) return null;

  const mdPath = path.resolve(filePath);
  try {
    const content = fs.readFileSync(mdPath, "utf-8");
    // match ![alt](/images/filename.ext) — first occurrence
    const match = content.match(
      /!\[.*?\]\(\/images\/([^"'\s)]+)\)/
    );
    if (match) {
      return `/images/${match[1]}`;
    }
  } catch {
    // file not readable — return null
  }

  return null;
}
