/**
 * Pass-2 recompress for the JPGs that were uploaded oversized.
 * Same mozjpeg/q82/max-2400px pipeline as optimize-images.mjs, but for
 * source JPGs (where the optimize-images PNG converter wouldn't have touched).
 * Skips anything already under 500 KB or where recompress saves <15%.
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const dir = 'C:/Users/user/uniwater-web/uniwater/public/images/photography';
const files = (await readdir(dir)).filter(f => f.endsWith('.jpg'));

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;

for (const f of files) {
  const src = join(dir, f);
  const before = (await stat(src)).size;
  if (before < 500_000) continue;

  const tmp = src + '.tmp';
  await sharp(src)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(tmp);
  const after = (await stat(tmp)).size;

  if (after >= before * 0.85) {
    await unlink(tmp);
    continue;
  }
  await rename(tmp, src);
  totalBefore += before;
  totalAfter += after;
  converted++;
  console.log(`  ${f}: ${(before/1024).toFixed(0)} → ${(after/1024).toFixed(0)} KB (${Math.round((1-after/before)*100)}% smaller)`);
}
console.log(`\n${converted} files recompressed.`);
console.log(`Before: ${(totalBefore/1024/1024).toFixed(2)} MB  After: ${(totalAfter/1024/1024).toFixed(2)} MB`);
