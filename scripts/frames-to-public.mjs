/**
 * Copies a rendered Remotion PNG sequence into public/frames as 1.png..N.png
 * so it plugs straight into the scroll animation.
 *
 *   1) npm run frames        (renders the sequence into out/frames)
 *   2) it then runs this automatically
 *
 * Or run manually:  node scripts/frames-to-public.mjs out/frames
 */
import { promises as fs } from "fs";
import path from "path";

const srcDir = process.argv[2] || "out/frames";
const destDir = "public/frames";

const num = (name) => {
  const m = name.match(/(\d+)/g);
  return m ? parseInt(m[m.length - 1], 10) : 0;
};

async function main() {
  let entries;
  try {
    entries = await fs.readdir(srcDir);
  } catch {
    console.error(`\n✗ Could not read "${srcDir}". Render the sequence first:`);
    console.error("    npm run frames\n");
    process.exit(1);
  }

  const pngs = entries.filter((f) => f.toLowerCase().endsWith(".png")).sort(
    (a, b) => num(a) - num(b)
  );
  if (pngs.length === 0) {
    console.error(`\n✗ No .png files found in "${srcDir}".\n`);
    process.exit(1);
  }

  await fs.mkdir(destDir, { recursive: true });
  // clear old numbered frames (keep README.md and anything non-numeric)
  for (const f of await fs.readdir(destDir)) {
    if (/^\d+\.png$/i.test(f)) await fs.unlink(path.join(destDir, f));
  }

  let i = 1;
  for (const f of pngs) {
    await fs.copyFile(path.join(srcDir, f), path.join(destDir, `${i}.png`));
    i++;
  }

  const total = pngs.length;
  console.log(`\n✓ Copied ${total} frames -> ${destDir}/1.png .. ${total}.png`);
  console.log(
    `\n→ Set TOTAL_FRAMES = ${total} in components/ScrollLine.js\n`
  );
}

main();
