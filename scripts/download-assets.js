/**
 * download-assets.js — Télécharge les icônes BG3 Wiki vers public/assets/items/
 *
 * Usage: node scripts/download-assets.js
 *
 * 1. Collecte tous les wikiName uniques depuis arsenal.ts et CodexTooltipById.tsx
 * 2. Tente de télécharger chaque icône depuis bg3.wiki
 * 3. Si le téléchargement échoue, génère un placeholder SVG de qualité
 * 4. Sauvegarde dans public/assets/items/{Formatted}_Icon.png (ou .svg)
 *
 * Pour re-télécharger les vraies images plus tard :
 *   node scripts/download-assets.js --force
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "assets", "items");
const FORCE = process.argv.includes("--force");

// ---------------------------------------------------------------------------
// 1. Collect all unique wiki names from source files
// ---------------------------------------------------------------------------

function extractWikiNames() {
  const names = new Set();

  // From arsenal.ts — wikiName: "..."
  const arsenalPath = path.join(ROOT, "src/data/arsenal.ts");
  const arsenalSrc = fs.readFileSync(arsenalPath, "utf-8");
  const wikiNameRe = /wikiName:\s*"([^"]+)"/g;
  let m;
  while ((m = wikiNameRe.exec(arsenalSrc)) !== null) {
    names.add(m[1]);
  }

  // From CodexTooltipById.tsx — values of WIKI_ICON_NAMES
  const codexPath = path.join(ROOT, "src/components/mdx/CodexTooltipById.tsx");
  const codexSrc = fs.readFileSync(codexPath, "utf-8");
  const blockMatch = codexSrc.match(
    /const WIKI_ICON_NAMES[\s\S]*?=\s*\{([\s\S]*?)\};/
  );
  if (blockMatch) {
    const block = blockMatch[1];
    const mapValueRe = /:\s*"([^"]+)",?\s*$/gm;
    let v;
    while ((v = mapValueRe.exec(block)) !== null) {
      names.add(v[1]);
    }
  }

  return [...names];
}

// ---------------------------------------------------------------------------
// 2. Download helper with redirect support
// ---------------------------------------------------------------------------

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteBuildBG3/1.0)" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      }
    );
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${url}`));
    });
  });
}

// ---------------------------------------------------------------------------
// 3. SVG placeholder generator
// ---------------------------------------------------------------------------

function generatePlaceholderSvg(name) {
  const initial = name.charAt(0).toUpperCase();
  // Deterministic color from name hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffff;
  }
  const hue = hash % 360;
  const bg1 = `hsl(${hue}, 40%, 15%)`;
  const bg2 = `hsl(${hue}, 50%, 25%)`;
  const border = `hsl(${hue}, 60%, 45%)`;
  const text = `hsl(${hue}, 70%, 75%)`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="96" height="96" rx="8" fill="url(#bg)" stroke="${border}" stroke-width="2"/>
  <text x="48" y="56" text-anchor="middle" font-family="serif" font-size="40" font-weight="700" fill="${text}">${initial}</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------

async function main() {
  const names = extractWikiNames();
  console.log(`Found ${names.length} unique wiki names.\n`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let placeholders = 0;

  for (const name of names) {
    const formatted = name.trim().replace(/\s+/g, "_");
    const pngFilename = `${formatted}_Icon.png`;
    const svgFilename = `${formatted}_Icon.svg`;
    const pngDest = path.join(OUT_DIR, pngFilename);
    const svgDest = path.join(OUT_DIR, svgFilename);

    // Skip if PNG already exists (real image) unless --force
    if (fs.existsSync(pngDest) && !FORCE) {
      console.log(`  SKIP  ${pngFilename} (real image exists)`);
      downloaded++;
      continue;
    }

    // Try downloading the real image
    try {
      await download(
        `https://bg3.wiki/wiki/Special:FilePath/${formatted}_Icon.png`,
        pngDest
      );
      const size = fs.statSync(pngDest).size;
      console.log(`  DL    ${pngFilename} (${(size / 1024).toFixed(1)} KB)`);
      downloaded++;
      // Remove placeholder SVG if it existed
      if (fs.existsSync(svgDest)) fs.unlinkSync(svgDest);
    } catch {
      // Generate placeholder SVG
      fs.writeFileSync(svgDest, generatePlaceholderSvg(name));
      console.log(`  SVG   ${svgFilename} (placeholder)`);
      placeholders++;
      // Clean up failed PNG
      if (fs.existsSync(pngDest)) fs.unlinkSync(pngDest);
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\nDone: ${downloaded} real images, ${placeholders} placeholders.`);
  console.log(`Assets directory: ${OUT_DIR}`);
  if (placeholders > 0) {
    console.log(
      `\nRe-run with network access to replace placeholders:\n  node scripts/download-assets.js --force`
    );
  }
}

main().catch(console.error);
