/**
 * One-shot image optimisation.
 *
 * Photography was uploaded as PNG which is the wrong format — PNGs encode
 * each pixel exactly which is great for diagrams/screenshots but horrendous
 * for photographs (4-5 MB per shot vs 200-400 KB at JPEG q85, with no
 * visible difference at typical web rendering sizes).
 *
 * What this script does:
 *   1. Walks /public/images/photography/*.png
 *   2. For each PNG, writes a .jpg sibling at quality 82 (mozjpeg = better
 *      compression than libjpeg-turbo, no perceptible quality loss).
 *   3. Verifies the JPEG is at least 50% smaller; otherwise keeps the PNG.
 *   4. Deletes the original PNG once the JPEG exists.
 *
 * Idempotent — running twice is safe (the PNG won't exist on the 2nd run).
 *
 * After the script: a separate codemod pass updates code references from
 * `.png` to `.jpg` for the photography paths. See update-image-refs.mjs.
 *
 * Why only photography/ — infographics/, brand/, install-drawings/, and
 * product-cutaways/ are SVG (already optimal) or graphic PNGs where the
 * colour-flatness rewards PNG. We don't touch those.
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'C:/Users/user/uniwater-web/uniwater';
const DIRS = [
  `${ROOT}/public/images/photography`,
];

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

for (const dir of DIRS) {
  const files = await readdir(dir);
  for (const f of files) {
    if (!f.endsWith('.png')) continue;
    const pngPath = join(dir, f);
    const jpgPath = pngPath.replace(/\.png$/, '.jpg');

    const before = (await stat(pngPath)).size;
    totalBefore += before;

    // Convert: rotate per EXIF, flatten to white background (no alpha in JPEG),
    // resize down if absurdly large, mozjpeg encode, progressive.
    await sharp(pngPath)
      .rotate()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize({ width: 2400, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(jpgPath);

    const after = (await stat(jpgPath)).size;

    if (after >= before * 0.5) {
      // Less than 50% saving — likely a graphic that needs PNG. Keep PNG, drop JPG.
      await unlink(jpgPath);
      console.log(`  SKIP ${f}: jpg=${(after/1024).toFixed(0)}KB vs png=${(before/1024).toFixed(0)}KB (saving < 50%)`);
      totalAfter += before;
      skipped++;
      continue;
    }

    totalAfter += after;
    await unlink(pngPath);
    console.log(`  ${f.replace('.png','')}: ${(before/1024).toFixed(0)} KB PNG → ${(after/1024).toFixed(0)} KB JPG  (${Math.round((1-after/before)*100)}% smaller)`);
    converted++;
  }
}

console.log(`\nTotal: ${converted} converted, ${skipped} kept as PNG`);
console.log(`Before: ${(totalBefore/1024/1024).toFixed(1)} MB  →  After: ${(totalAfter/1024/1024).toFixed(1)} MB`);
console.log(`Saved:  ${((totalBefore-totalAfter)/1024/1024).toFixed(1)} MB (${Math.round((1-totalAfter/totalBefore)*100)}%)`);
