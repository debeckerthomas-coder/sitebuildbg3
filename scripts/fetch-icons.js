#!/usr/bin/env node

// ============================================================================
// fetch-icons.js — Download BG3 Wiki icons for all Codex entries
//
// Usage: node scripts/fetch-icons.js
//
// Reads the database entries, builds wiki URLs, downloads icons to
// /public/assets/icons/. Uses native fetch (Node 18+) and fs.
// ============================================================================

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const OUTPUT_DIR = path.join(__dirname, "..", "public", "assets", "icons");
const DATABASE_PATH = path.join(__dirname, "..", "src", "data", "database.ts");

// Mapping from codex entry ID → English wiki name for URL generation.
// The wiki uses English names with underscores.
const ICON_MAP = {
  // Objects
  markoheshkir: "Markoheshkir",
  nyrulna: "Nyrulna",
  baldurans_giantslayer: "Balduran's Giantslayer",
  helmet_of_balduran: "Helmet of Balduran",
  everburn_blade: "Everburn Blade",
  epee_flammes_eternelles: "Everburn Blade",
  flail_of_ages: "Flail of Ages",
  helldusk_armour: "Helldusk Armour",
  elixir_geant_collines: "Elixir of Hill Giant Strength",
  etincelle_electrique: "The Sparkle Hands",
  ombrecoeur: "Shar's Spear of Evening",
  hallebarde_vigilance: "Halberd of Vigilance",
  sang_de_lathandre: "The Blood of Lathander",
  lanterne_lunaire: "Moonlantern",
  gants_maitre_armes: "Gloves of the Automaton",
  anneau_regeneration: "Ring of Regeneration",
  heritage_maitres: "Legacy of the Masters",
  casque_acuite_arcanique: "Helmet of Arcane Acuity",

  // Spells
  divine_smite: "Divine Smite",
  haste: "Haste",
  eldritch_blast: "Eldritch Blast",
  counterspell: "Counterspell",
  injonction: "Command",
  fletrir: "Blight",
  sanctuary: "Sanctuary",
  silence: "Silence",
  tenebres: "Darkness",
  invisibilite: "Invisibility",
  cecite: "Blindness",
  pas_brumeux: "Misty Step",
  doigt_de_mort: "Finger of Death",
  lumiere_du_jour: "Daylight",
  globe_invulnerabilite: "Globe of Invulnerability",
  delivrance_maledictions: "Remove Curse",
  immobilisation_personne: "Hold Person",
  projectile_magique: "Magic Missile",
  shield_of_faith: "Shield of Faith",

  // Abilities
  vow_of_enmity: "Vow of Enmity",
  great_weapon_master: "Great Weapon Master",
};

// ---------------------------------------------------------------------------
// URL builder
// ---------------------------------------------------------------------------

function buildWikiUrl(englishName) {
  const formatted = englishName
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("_");

  // Handle apostrophes in names
  const cleaned = formatted.replace(/'/g, "%27");

  return `https://bg3.wiki/wiki/Special:FilePath/${cleaned}_Icon.png`;
}

// ---------------------------------------------------------------------------
// Download helper with retry
// ---------------------------------------------------------------------------

async function downloadIcon(id, englishName) {
  const url = buildWikiUrl(englishName);
  const ext = ".png";
  const outPath = path.join(OUTPUT_DIR, `${id}${ext}`);

  // Skip if already downloaded
  if (fs.existsSync(outPath)) {
    console.log(`  [SKIP] ${id} — already exists`);
    return { id, status: "skipped" };
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "BG3HonorCompanion/1.0 (private use)" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(outPath, buffer);
      console.log(`  [OK]   ${id} — ${buffer.length} bytes`);
      return { id, status: "ok" };
    } catch (err) {
      if (attempt === 3) {
        console.error(`  [FAIL] ${id} — ${err.message} (${url})`);
        return { id, status: "failed", error: err.message };
      }
      // Exponential backoff
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== BG3 Icon Fetcher ===\n");

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries = Object.entries(ICON_MAP);
  console.log(`Found ${entries.length} entries to download.\n`);

  const results = [];

  // Process sequentially to be polite to the wiki server
  for (const [id, name] of entries) {
    const result = await downloadIcon(id, name);
    results.push(result);

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 300));
  }

  // Summary
  const ok = results.filter((r) => r.status === "ok").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "failed").length;

  console.log(`\n=== Done ===`);
  console.log(`  Downloaded: ${ok}`);
  console.log(`  Skipped:    ${skipped}`);
  console.log(`  Failed:     ${failed}`);

  if (failed > 0) {
    console.log("\nFailed entries:");
    results
      .filter((r) => r.status === "failed")
      .forEach((r) => console.log(`  - ${r.id}: ${r.error}`));
  }
}

main().catch(console.error);
