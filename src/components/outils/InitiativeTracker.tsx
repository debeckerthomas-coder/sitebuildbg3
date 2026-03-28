"use client";

// ============================================================================
// InitiativeTracker — Calculateur d'initiative BG3 (d4, pas d20 !)
// Avec probabilités exactes de jouer en même temps (initiative partagée)
// ============================================================================

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rollPartyInitiative, analyzeFirstTurnProbabilities } from "@/engine/InitiativeSyncCalculator";
import { Button } from "@/components/ui-system";
import type { InitiativeActor, InitiativeResult } from "@/types";

// ---------------------------------------------------------------------------
// Types internes
// ---------------------------------------------------------------------------

interface PersonnageConfig {
  readonly id: string;
  nom: string;
  dexterite: number;
  donAlerte: boolean;
  bonusEquipement: number;
}

const PERSONNAGES_DEFAUT: PersonnageConfig[] = [
  { id: "p1", nom: "Paladin (Joueur)", dexterite: 10, donAlerte: false, bonusEquipement: 0 },
  { id: "p2", nom: "Astarion", dexterite: 17, donAlerte: false, bonusEquipement: 0 },
  { id: "p3", nom: "Shadowheart", dexterite: 13, donAlerte: false, bonusEquipement: 0 },
  { id: "p4", nom: "Gale", dexterite: 13, donAlerte: false, bonusEquipement: 0 },
];

function modDex(dex: number): number {
  return Math.floor((dex - 10) / 2);
}

// ---------------------------------------------------------------------------
// Carte Personnage
// ---------------------------------------------------------------------------

interface PersonnageCardProps {
  config: PersonnageConfig;
  onChange: (updated: PersonnageConfig) => void;
}

function PersonnageCard({ config, onChange }: PersonnageCardProps) {
  const mod = modDex(config.dexterite);
  const totalBonus = mod + (config.donAlerte ? 5 : 0) + config.bonusEquipement;

  return (
    <div className="bg-surface-raised border border-border rounded-card p-4 space-y-3">
      {/* Nom */}
      <input
        type="text"
        value={config.nom}
        onChange={(e) => onChange({ ...config, nom: e.target.value })}
        className="w-full bg-abyss border border-border rounded px-3 py-1.5 text-sm font-data text-gold focus:border-gold/50 focus:outline-none"
      />

      {/* Dextérité */}
      <div className="space-y-1">
        <label className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
          Dextérité (score)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={30}
            value={config.dexterite}
            onChange={(e) => onChange({ ...config, dexterite: Math.max(1, Math.min(30, Number(e.target.value))) })}
            className="w-20 bg-abyss border border-border rounded px-2 py-1 text-sm font-data text-gray-200 focus:border-gold/50 focus:outline-none"
          />
          <span className="text-xs font-data text-gray-400">
            Mod : <span className={`font-bold ${mod >= 0 ? "text-gold" : "text-blood-light"}`}>{mod >= 0 ? "+" : ""}{mod}</span>
          </span>
        </div>
      </div>

      {/* Bonus Équipement */}
      <div className="space-y-1">
        <label className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
          Bonus Équipement
        </label>
        <input
          type="number"
          min={0}
          max={10}
          value={config.bonusEquipement}
          onChange={(e) => onChange({ ...config, bonusEquipement: Math.max(0, Math.min(10, Number(e.target.value))) })}
          className="w-20 bg-abyss border border-border rounded px-2 py-1 text-sm font-data text-gray-200 focus:border-gold/50 focus:outline-none"
          placeholder="0"
        />
        <p className="text-[9px] font-data text-gray-600">Ex : +3 Arc de la Frappe Préventive</p>
      </div>

      {/* Don Alerte */}
      <button
        onClick={() => onChange({ ...config, donAlerte: !config.donAlerte })}
        className={`
          w-full py-1.5 rounded text-xs font-data transition-all border
          ${config.donAlerte
            ? "bg-gold/20 border-gold text-gold"
            : "bg-transparent border-border text-gray-500 hover:border-gray-500"}
        `}
      >
        Don Alerte {config.donAlerte ? "(+5)" : "(inactif)"}
      </button>

      {/* Résumé */}
      <div className="bg-abyss rounded px-3 py-2 border border-border/50 text-center">
        <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Initiative Totale</p>
        <p className="text-lg font-display text-gold">
          1d4 {totalBonus >= 0 ? "+" : ""}{totalBonus}
        </p>
        <p className="text-[10px] font-mono text-gray-500">
          Min : {1 + totalBonus} — Max : {4 + totalBonus}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Barre de probabilité
// ---------------------------------------------------------------------------

function ProbabilityBar({ nom, probability, isFirst }: { nom: string; probability: number; isFirst: boolean }) {
  const pct = (probability * 100).toFixed(1);
  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs font-data w-36 truncate ${isFirst ? "text-gold font-medium" : "text-gray-400"}`}>
        {nom}
      </span>
      <div className="flex-1 h-5 bg-abyss rounded overflow-hidden border border-border/50">
        <motion.div
          className={`h-full rounded ${isFirst ? "bg-gold/40" : "bg-gray-700"}`}
          initial={{ width: 0 }}
          animate={{ width: `${probability * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className={`text-xs font-data w-14 text-right ${isFirst ? "text-gold" : "text-gray-500"}`}>
        {pct}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant Principal
// ---------------------------------------------------------------------------

export function InitiativeTracker() {
  const [personnages, setPersonnages] = useState<PersonnageConfig[]>([...PERSONNAGES_DEFAUT]);
  const [resultat, setResultat] = useState<InitiativeResult | null>(null);

  const handleChange = useCallback((index: number, updated: PersonnageConfig) => {
    setPersonnages((prev) => prev.map((p, i) => (i === index ? updated : p)));
  }, []);

  // Convertir en InitiativeActor pour le moteur
  const actors: InitiativeActor[] = useMemo(
    () => personnages.map((p) => ({
      name: p.nom,
      dexterity: p.dexterite,
      bonuses: p.bonusEquipement,
      hasAlertFeat: p.donAlerte,
    })),
    [personnages]
  );

  // Probabilités exactes (pure math, pas de RNG)
  const probPremier = useMemo(() => analyzeFirstTurnProbabilities(actors), [actors]);

  // Analyse des égalités potentielles
  const analyseEgalites = useMemo(() => {
    const n = actors.length;
    const totalOutcomes = Math.pow(4, n);

    const staticBonuses = actors.map((a) => {
      const dexMod = Math.floor((a.dexterity - 10) / 2);
      const alert = a.hasAlertFeat ? 5 : 0;
      return dexMod + a.bonuses + alert;
    });

    let egaliteCount = 0;

    for (let mask = 0; mask < totalOutcomes; mask++) {
      let temp = mask;
      const totals: number[] = [];
      for (let i = 0; i < n; i++) {
        const d4Roll = (temp % 4) + 1;
        temp = Math.floor(temp / 4);
        totals.push(d4Roll + staticBonuses[i]!);
      }
      // Vérifier s'il y a des doublons
      const unique = new Set(totals);
      if (unique.size < totals.length) egaliteCount++;
    }

    return {
      probabiliteEgalite: egaliteCount / totalOutcomes,
      probabiliteOrdreGaranti: 1 - egaliteCount / totalOutcomes,
    };
  }, [actors]);

  const handleLancer = useCallback(() => {
    setResultat(rollPartyInitiative(actors));
  }, [actors]);

  // Trier les probs pour afficher le favori en premier
  const probsSorted = useMemo(
    () => Object.entries(probPremier).sort((a, b) => b[1] - a[1]),
    [probPremier]
  );

  return (
    <div className="space-y-6">
      {/* Explication */}
      <div className="bg-surface-raised border border-border rounded-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">⚡</span>
          <h3 className="font-display text-sm text-gold">Rappel : Initiative BG3</h3>
        </div>
        <p className="text-xs font-body text-gray-400 leading-relaxed">
          Baldur&apos;s Gate 3 utilise un <strong className="text-gold">d4</strong> pour l&apos;initiative (pas un d20 !).
          Cela crée de fréquentes égalités d&apos;initiative — les personnages à égalité jouent dans un ordre aléatoire
          à chaque tour. Le Don Alerte (+5) est extrêmement puissant dans ce système.
        </p>
      </div>

      {/* Cartes des personnages */}
      <div className="grid sm:grid-cols-2 gap-4">
        {personnages.map((p, i) => (
          <PersonnageCard key={p.id} config={p} onChange={(u) => handleChange(i, u)} />
        ))}
      </div>

      {/* Analyse probabiliste (live, pas de RNG) */}
      <div className="bg-surface-raised border border-border rounded-card p-5 space-y-4">
        <h3 className="font-display text-base text-gold">Analyse Probabiliste</h3>

        <div className="space-y-2">
          <p className="text-xs font-data text-gray-500 uppercase tracking-wider">Probabilité de jouer en premier</p>
          {probsSorted.map(([nom, prob], i) => (
            <ProbabilityBar key={nom} nom={nom} probability={prob} isFirst={i === 0} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
          <div className="text-center">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Ordre Garanti</p>
            <p className="text-xl font-display text-gold">{(analyseEgalites.probabiliteOrdreGaranti * 100).toFixed(1)}%</p>
            <p className="text-[10px] font-data text-gray-600">Aucune égalité d&apos;initiative</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Risque d&apos;Égalité</p>
            <p className="text-xl font-display text-blood-light">{(analyseEgalites.probabiliteEgalite * 100).toFixed(1)}%</p>
            <p className="text-[10px] font-data text-gray-600">Au moins 2 personnages à égalité</p>
          </div>
        </div>
      </div>

      {/* Bouton Lancer */}
      <Button onClick={handleLancer} fullWidth>
        Lancer l&apos;Initiative (1d4)
      </Button>

      {/* Résultat du lancer */}
      <AnimatePresence mode="wait">
        {resultat && (
          <motion.div
            key={resultat.order.map((o) => o.total).join("-")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-surface-raised border border-border rounded-card p-5 space-y-4"
          >
            <h3 className="font-display text-base text-gold">Résultat du Lancer</h3>

            {/* Ordre d'initiative */}
            <div className="space-y-2">
              {resultat.order.map((entry, i) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-abyss rounded-card px-4 py-2.5 border border-border/50"
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold ${i === 0 ? "bg-gold/20 text-gold" : "bg-abyss-200 text-gray-500"}`}>
                    {i + 1}
                  </span>
                  <span className={`flex-1 text-sm font-data ${i === 0 ? "text-gold" : "text-gray-300"}`}>
                    {entry.name}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-display text-gold">{entry.total}</span>
                    <span className="text-[10px] font-mono text-gray-500 ml-2">(d4={entry.roll})</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Groupes d'initiative partagée */}
            {resultat.sharedInitiativeGroups.length > 0 && (
              <div className="bg-blood-dark/10 border border-blood/20 rounded-card p-3">
                <p className="text-xs font-data text-blood-light font-bold uppercase tracking-wider mb-1">
                  Initiative Partagée Détectée
                </p>
                {resultat.sharedInitiativeGroups.map((group, i) => (
                  <p key={i} className="text-xs font-data text-gray-400">
                    {group.join(" & ")} — <span className="text-gray-500">ordre aléatoire à chaque tour</span>
                  </p>
                ))}
              </div>
            )}

            <p className="text-[10px] font-data text-gray-600 text-center">
              Probabilité de cet ordre exact : {(resultat.probabilityOfExactOrder * 100).toFixed(2)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
