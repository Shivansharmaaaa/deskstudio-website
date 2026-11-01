/**
 * List boards, or download a board's pin images into public/reel/pinterest/.
 *   node scripts/pinterest/fetch-board.mjs boards
 *   node scripts/pinterest/fetch-board.mjs <BOARD_ID> [limit=24]
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv, api } from "./lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "public/reel/pinterest");

const biggestImage = (pin) => {
  const imgs = pin?.media?.images;
  if (!imgs) return null;
  // pick the largest available size by pixel width
  const order = ["1200x", "1200x800", "originals", "600x", "400x300", "150x150"];
  for (const k of order) if (imgs[k]?.url) return imgs[k].url;
  // fallback: any
  const any = Object.values(imgs).find((v) => v?.url);
  return any?.url || null;
};

const main = async () => {
  const env = await loadEnv();
  const arg = process.argv[2];

  if (!arg || arg === "boards") {
    const data = await api(env, "/boards?page_size=50");
    console.log("\nYour boards:\n");
    for (const b of data.items || []) console.log(`  ${b.id}\t${b.name}`);
    console.log("\nThen: node scripts/pinterest/fetch-board.mjs <BOARD_ID> 24\n");
    return;
  }

  const boardId = arg;
  const limit = parseInt(process.argv[3] || "24", 10);
  await fs.mkdir(OUT, { recursive: true });

  let pins = [];
  let bookmark = "";
  while (pins.length < limit) {
    const qs = new URLSearchParams({ page_size: "25" });
    if (bookmark) qs.set("bookmark", bookmark);
    const data = await api(env, `/boards/${boardId}/pins?${qs.toString()}`);
    pins.push(...(data.items || []));
    bookmark = data.bookmark;
    if (!bookmark) break;
  }
  pins = pins.slice(0, limit);

  const manifest = [];
  let i = 1;
  for (const pin of pins) {
    const url = biggestImage(pin);
    if (!url) continue;
    const ext = (url.split("?")[0].match(/\.(jpg|jpeg|png|webp)$/i) || [".jpg"])[0];
    const file = `pin-${String(i).padStart(2, "0")}${ext}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  skip ${file} (${res.status})`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(path.join(OUT, file), buf);
    manifest.push({
      file: `reel/pinterest/${file}`,
      title: pin.title || pin.grid_title || "",
      link: pin.link || `https://pinterest.com/pin/${pin.id}/`,
    });
    console.log(`  ✓ ${file}`);
    i++;
  }

  await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Saved ${manifest.length} images to public/reel/pinterest/  (+ manifest.json)\n`);
};

main().catch((e) => {
  console.error("\n✗ " + (e.message || e) + "\n");
  process.exit(1);
});
