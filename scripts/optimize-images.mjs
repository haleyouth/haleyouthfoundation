/**
 * Image optimisation for static export.
 *
 * Next.js image optimisation is disabled under `output: "export"`, so the
 * browser downloads whatever is in /public at full size. This script
 * pre-compresses the large event photos into WebP at web display sizes,
 * writing them back into public/images/events with a .webp extension.
 *
 * Run automatically before every build (see package.json "prebuild").
 * Safe to re-run: it overwrites the generated .webp files and leaves the
 * original JPEGs in place (kept as a fallback and for the admin/source set).
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public/images");

// Directories to optimise and the max width to resize their images down to.
const TARGETS = [
  { dir: "events", maxWidth: 1600, quality: 72 },
  { dir: "partners", maxWidth: 400, quality: 80 },
];

const RASTER = /\.(jpe?g|png)$/i;

async function optimiseDir({ dir, maxWidth, quality }) {
  const abs = path.join(ROOT, dir);
  let entries;
  try {
    entries = await readdir(abs);
  } catch {
    console.warn(`skip: ${dir} (not found)`);
    return { count: 0, before: 0, after: 0 };
  }

  let count = 0;
  let before = 0;
  let after = 0;

  for (const name of entries) {
    if (!RASTER.test(name)) continue;
    const input = path.join(abs, name);
    const output = path.join(abs, name.replace(RASTER, ".webp"));

    const { size: origSize } = await stat(input);

    const img = sharp(input).rotate(); // respect EXIF orientation
    const meta = await img.metadata();
    const pipeline =
      meta.width && meta.width > maxWidth
        ? img.resize({ width: maxWidth, withoutEnlargement: true })
        : img;

    const info = await pipeline
      .webp({ quality, effort: 5 })
      .toFile(output);

    before += origSize;
    after += info.size;
    count += 1;
    const savedPct = Math.round((1 - info.size / origSize) * 100);
    console.log(
      `  ${name} -> ${path.basename(output)}  ` +
        `${(origSize / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB (-${savedPct}%)`
    );
  }

  return { count, before, after };
}

async function main() {
  console.log("Optimising images to WebP...");
  let totalCount = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const target of TARGETS) {
    console.log(`\n[${target.dir}]`);
    const { count, before, after } = await optimiseDir(target);
    totalCount += count;
    totalBefore += before;
    totalAfter += after;
  }

  console.log(
    `\nDone. ${totalCount} images: ` +
      `${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB ` +
      `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
