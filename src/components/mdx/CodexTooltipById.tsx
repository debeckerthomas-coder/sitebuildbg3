"use client";

// ============================================================================
// CodexTooltipById — MDX wrapper for CodexTooltip, resolves entry by ID
// Enriches tooltip with flavourText from item data when available.
// Usage: <CodexTooltipById id="elixir_colline" text="Élixir de Force" />
// ============================================================================

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getEntry } from "@/data/database";
import { getItem } from "@/data/items/items";
import { getBg3WikiIconUrl } from "@/lib/iconHelper";

// ---------------------------------------------------------------------------
// Codex ID → English wiki name mapping for official icon resolution
// ---------------------------------------------------------------------------

const WIKI_ICON_NAMES: Record<string, string> = {
  markoheshkir: "Markoheshkir",
  nyrulna: "Nyrulna",
  baldurans_giantslayer: "Balduran's Giantslayer",
  helmet_of_balduran: "Helm of Balduran",
  everburn_blade: "Everburn Blade",
  epee_flammes_eternelles: "Everburn Blade",
  flail_of_ages: "Flail of Ages",
  helldusk_armour: "Helldusk Armour",
  elixir_geant_collines: "Elixir of Hill Giant Strength",
  etincelle_electrique: "The Sparkle Hands",
  ombrecoeur: "Shar's Spear of Evening",
  sang_de_lathandre: "The Blood of Lathander",
  lanterne_lunaire: "Moonlantern",
  hallebarde_vigilance: "Halberd of Vigilance",
  gants_maitre_armes: "Gloves of the Automaton",
  anneau_regeneration: "Ring of Regeneration",
  heritage_maitres: "Legacy of the Masters",
  casque_acuite_arcanique: "Helmet of Arcane Acuity",
  robe_de_la_trame: "Robe of the Weave",
  // Sorts
  divine_smite: "Divine Smite",
  haste: "Haste",
  eldritch_blast: "Eldritch Blast",
  counterspell: "Counterspell",
  vow_of_enmity: "Vow of Enmity",
  great_weapon_master: "Great Weapon Master",
  sanctuary: "Sanctuary",
  injonction: "Command",
  fletrir: "Blight",
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
  liberte_de_mouvement: "Freedom of Movement",
  eclair: "Lightning Bolt",
  // MDX-referenced IDs (common aliases)
  shield_spell: "Shield",
  magic_missile: "Magic Missile",
  command: "Command",
  hold_person: "Hold Person",
  hold_monster: "Hold Monster",
  banishing_smite: "Banishing Smite",
  chain_lightning: "Chain Lightning",
  scorching_ray: "Scorching Ray",
  // Objets MDX
  titanstring_bow: "Titanstring Bow",
  club_hill_giant: "Club of Hill Giant Strength",
  cowl_weaved: "Cowl of the Thorm",
  armor_agility: "Armour of Agility",
  bhaalist_armor: "Bhaalist Armour",
  gloves_archery: "Gloves of Archery",
  legacy_masters: "Legacy of the Masters",
  ring_risky: "Ring of Risk",
  helmet_arcane_acuity: "Helmet of Arcane Acuity",
  ring_mystic_scoundrel: "Ring of the Mystic Scoundrel",
  gontr_mael: "Gontr Mael",
  gloves_dexterity: "Gloves of Dexterity",
  phalar_aluve: "Phalar Aluve",
  duellists_prerogative: "Duellist's Prerogative",
  crimson_mischief: "Crimson Mischief",
  bloodthirst: "Bloodthirst",
  giantslayer: "Balduran's Giantslayer",
  armor_persistence: "Armour of Persistence",
  helm_balduran: "Helm of Balduran",
  ring_protection: "Ring of Protection",
  risky_ring: "Ring of Risk",
  staff_spellpower: "Staff of Spell Power",
  hood_weave: "Hood of the Weave",
  amulet_devout: "Amulet of the Devout",
  luminous_armor: "Luminous Armour",
  luminous_gloves: "Luminous Gloves",
  coruscation_ring: "Coruscation Ring",
  blood_lathander: "The Blood of Lathander",
  holy_lance_helm: "Holy Lance Helm",
  hat_fire_acuity: "Hat of Fire Acuity",
  spellmight_gloves: "Spellmight Gloves",
  // Lockadin
  diadem_arcane_synergy: "Diadem of Arcane Synergy",
  sword_of_chaos: "Sword of Chaos",
};

interface CodexTooltipByIdProps {
  readonly id: string;
  readonly text?: string;
  readonly children?: ReactNode;
}

export function CodexTooltipById({ id, text, children }: CodexTooltipByIdProps) {
  const entry = getEntry(id);
  const item = getItem(id);

  const label = children ?? text ?? id;

  // Resolve the best icon URL: wiki icon (via English name) or local fallback
  const wikiName = WIKI_ICON_NAMES[id];
  const iconUrl = wikiName
    ? getBg3WikiIconUrl(wikiName)
    : entry?.iconUrl ?? "";

  if (!entry) {
    return (
      <CodexTooltip
        name={String(text ?? id)}
        icon={iconUrl}
        rarity="common"
        description="Entree non referencee dans le Codex."
      >
        {label}
      </CodexTooltip>
    );
  }

  return (
    <CodexTooltip
      name={entry.name}
      icon={iconUrl}
      rarity={entry.rarity}
      description={entry.description}
      flavourText={item?.flavourText}
      stats={entry.stats}
      tags={entry.tags}
    >
      {label}
    </CodexTooltip>
  );
}
