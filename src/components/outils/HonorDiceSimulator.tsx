"use client";

// ============================================================================
// HonorDiceSimulator — Calculateur de probabilités de jet d20 BG3
// Inputs : Bonus, DD, État (Normal/Avantage/Désavantage)
// Affiche le % exact de réussite + bouton lancer avec résultat visuel
// ============================================================================

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui-system";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Etat = "normal" | "avantage" | "desavantage";

interface ResultatLancer {
  readonly d20: number;
  readonly d20Bis?: number; // second dé si avantage/désavantage
  readonly deUtilise: number;
  readonly total: number;
  readonly reussite: boolean;
  readonly critique: "echec" | "reussite" | null;
}

// ---------------------------------------------------------------------------
// Calcul exact des probabilités
// ---------------------------------------------------------------------------

function calculerProbabiliteReussite(bonus: number, dd: number, etat: Etat): number {
  // Valeur minimale au dé pour réussir (avant nat 1/20)
  const seuilBrut = dd - bonus;

  if (etat === "normal") {
    // P(d20 >= seuil) en tenant compte de nat 1 = échec, nat 20 = réussite
    let reussites = 0;
    for (let d = 1; d <= 20; d++) {
      if (d === 1) continue; // nat 1 = échec critique toujours
      if (d === 20 || d >= seuilBrut) reussites++;
    }
    return reussites / 20;
  }

  if (etat === "avantage") {
    // P(max(d1,d2) réussit)
    // P(max >= seuil) = 1 - P(max < seuil) = 1 - P(d1 < seuil)^2
    // Mais nat 1 = échec seulement si les DEUX sont 1 (max(1,1)=1)
    // nat 20 = réussite si AU MOINS un est 20
    let reussites = 0;
    for (let d1 = 1; d1 <= 20; d1++) {
      for (let d2 = 1; d2 <= 20; d2++) {
        const best = Math.max(d1, d2);
        if (best === 1) continue; // double nat 1
        if (best === 20 || best >= seuilBrut) reussites++;
      }
    }
    return reussites / 400;
  }

  // Désavantage : min(d1, d2)
  let reussites = 0;
  for (let d1 = 1; d1 <= 20; d1++) {
    for (let d2 = 1; d2 <= 20; d2++) {
      const worst = Math.min(d1, d2);
      if (worst === 1) continue;
      if (worst === 20 || worst >= seuilBrut) reussites++;
    }
  }
  return reussites / 400;
}

// ---------------------------------------------------------------------------
// Bouton toggle état
// ---------------------------------------------------------------------------

const ETATS: { value: Etat; label: string; couleur: string }[] = [
  { value: "normal", label: "Normal", couleur: "border-gray-500 text-gray-300" },
  { value: "avantage", label: "Avantage", couleur: "border-green-500 text-green-400" },
  { value: "desavantage", label: "Désavantage", couleur: "border-blood text-blood-light" },
];

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function HonorDiceSimulator() {
  const [bonus, setBonus] = useState(5);
  const [dd, setDd] = useState(15);
  const [etat, setEtat] = useState<Etat>("normal");
  const [resultat, setResultat] = useState<ResultatLancer | null>(null);
  const [lancerKey, setLancerKey] = useState(0);

  const probabilite = useMemo(
    () => calculerProbabiliteReussite(bonus, dd, etat),
    [bonus, dd, etat]
  );

  const handleLancer = useCallback(() => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    let d20Bis: number | undefined;
    let deUtilise = d20;

    if (etat === "avantage") {
      d20Bis = Math.floor(Math.random() * 20) + 1;
      deUtilise = Math.max(d20, d20Bis);
    } else if (etat === "desavantage") {
      d20Bis = Math.floor(Math.random() * 20) + 1;
      deUtilise = Math.min(d20, d20Bis);
    }

    const total = deUtilise + bonus;
    let critique: ResultatLancer["critique"] = null;
    let reussite: boolean;

    if (deUtilise === 1) {
      critique = "echec";
      reussite = false;
    } else if (deUtilise === 20) {
      critique = "reussite";
      reussite = true;
    } else {
      reussite = total >= dd;
    }

    setResultat({ d20, d20Bis, deUtilise, total, reussite, critique });
    setLancerKey((k) => k + 1);
  }, [bonus, dd, etat]);

  const pct = (probabilite * 100).toFixed(1);

  // Couleur de la jauge selon le %
  const jaugeCouleur =
    probabilite >= 0.75
      ? "bg-green-500/60"
      : probabilite >= 0.5
        ? "bg-gold/50"
        : probabilite >= 0.25
          ? "bg-orange-500/50"
          : "bg-blood/50";

  return (
    <div className="space-y-6">
      {/* Explication */}
      <div className="bg-surface-raised border border-border rounded-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-display text-sm text-gold">Ajustement de Lancer — Mode Honneur</h3>
        </div>
        <p className="text-xs font-body text-gray-400 leading-relaxed">
          Calculez vos chances exactes de réussite sur un jet de d20. Un <strong className="text-blood-light">1 naturel</strong> est
          toujours un échec critique. Un <strong className="text-gold">20 naturel</strong> est toujours une réussite critique,
          quel que soit le DD.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Bonus */}
        <div className="bg-surface-raised border border-border rounded-card p-4 space-y-2">
          <label className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
            Bonus Total (caractéristique + maîtrise)
          </label>
          <input
            type="number"
            min={-10}
            max={20}
            value={bonus}
            onChange={(e) => setBonus(Number(e.target.value))}
            className="w-full bg-abyss border border-border rounded px-3 py-2 text-lg font-display text-gold focus:border-gold/50 focus:outline-none text-center"
          />
          <p className="text-[9px] font-data text-gray-600 text-center">Ex : +8 (FOR +5, Maîtrise +3)</p>
        </div>

        {/* DD */}
        <div className="bg-surface-raised border border-border rounded-card p-4 space-y-2">
          <label className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
            Degré de Difficulté (DD)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={dd}
            onChange={(e) => setDd(Math.max(1, Math.min(30, Number(e.target.value))))}
            className="w-full bg-abyss border border-border rounded px-3 py-2 text-lg font-display text-gold focus:border-gold/50 focus:outline-none text-center"
          />
          <p className="text-[9px] font-data text-gray-600 text-center">Mode Honneur : DD typique 15–20</p>
        </div>

        {/* État */}
        <div className="bg-surface-raised border border-border rounded-card p-4 space-y-2">
          <label className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
            État du Lancer
          </label>
          <div className="space-y-1.5 pt-1">
            {ETATS.map((e) => (
              <button
                key={e.value}
                onClick={() => setEtat(e.value)}
                className={`
                  w-full py-1.5 rounded text-xs font-data transition-all border
                  ${etat === e.value
                    ? `${e.couleur} bg-white/5`
                    : "border-border text-gray-600 hover:border-gray-500"}
                `}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Probabilité exacte */}
      <div className="bg-surface-raised border border-border rounded-card p-6">
        <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider text-center mb-3">
          Probabilité Exacte de Réussite
        </p>

        {/* Grande jauge */}
        <div className="relative h-8 bg-abyss rounded-full overflow-hidden border border-border/50 mb-4">
          <motion.div
            className={`h-full rounded-full ${jaugeCouleur}`}
            initial={{ width: 0 }}
            animate={{ width: `${probabilite * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-display text-white drop-shadow-lg">{pct}%</span>
          </div>
        </div>

        {/* Formule */}
        <p className="text-[10px] font-mono text-gray-500 text-center">
          {etat === "normal" && `d20 + ${bonus} ≥ ${dd}`}
          {etat === "avantage" && `max(d20, d20) + ${bonus} ≥ ${dd}`}
          {etat === "desavantage" && `min(d20, d20) + ${bonus} ≥ ${dd}`}
          {" "}| Nat 1 = Échec | Nat 20 = Réussite
        </p>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-border/50">
          <div className="text-center">
            <p className="text-[10px] font-data text-gray-500 uppercase">Seuil au dé</p>
            <p className="text-sm font-display text-gray-300">{Math.max(1, dd - bonus)}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-data text-gray-500 uppercase">P(Nat 1)</p>
            <p className="text-sm font-display text-blood-light">
              {etat === "normal" ? "5%" : etat === "avantage" ? "0.25%" : "9.75%"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-data text-gray-500 uppercase">P(Nat 20)</p>
            <p className="text-sm font-display text-gold">
              {etat === "normal" ? "5%" : etat === "avantage" ? "9.75%" : "0.25%"}
            </p>
          </div>
        </div>
      </div>

      {/* Bouton Lancer */}
      <Button onClick={handleLancer} fullWidth>
        Lancer le Dé (1d20)
      </Button>

      {/* Résultat visuel */}
      <AnimatePresence mode="wait">
        {resultat && (
          <motion.div
            key={lancerKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              bg-surface-raised border-2 rounded-card p-6 text-center space-y-3
              ${resultat.critique === "reussite"
                ? "border-gold bg-gold/5"
                : resultat.critique === "echec"
                  ? "border-blood bg-blood/5"
                  : resultat.reussite
                    ? "border-green-500/50"
                    : "border-blood/30"}
            `}
          >
            {/* Dé(s) lancé(s) */}
            <div className="flex items-center justify-center gap-4">
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.4 }}
                className={`
                  w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-display border-2
                  ${resultat.d20 === resultat.deUtilise
                    ? resultat.deUtilise === 20 ? "border-gold bg-gold/20 text-gold" : resultat.deUtilise === 1 ? "border-blood bg-blood/20 text-blood-light" : "border-border bg-abyss text-gray-200"
                    : "border-border/30 bg-abyss/50 text-gray-600 line-through"}
                `}
              >
                {resultat.d20}
              </motion.div>

              {resultat.d20Bis !== undefined && (
                <motion.div
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`
                    w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-display border-2
                    ${resultat.d20Bis === resultat.deUtilise
                      ? resultat.deUtilise === 20 ? "border-gold bg-gold/20 text-gold" : resultat.deUtilise === 1 ? "border-blood bg-blood/20 text-blood-light" : "border-border bg-abyss text-gray-200"
                      : "border-border/30 bg-abyss/50 text-gray-600 line-through"}
                  `}
                >
                  {resultat.d20Bis}
                </motion.div>
              )}
            </div>

            {/* Total */}
            <div>
              <p className="text-3xl font-display text-gold">{resultat.total}</p>
              <p className="text-xs font-mono text-gray-500">
                d20({resultat.deUtilise}) + bonus({bonus}) vs DD {dd}
              </p>
            </div>

            {/* Verdict */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-lg font-display uppercase tracking-widest ${
                resultat.critique === "reussite"
                  ? "text-gold"
                  : resultat.critique === "echec"
                    ? "text-blood-light"
                    : resultat.reussite
                      ? "text-green-400"
                      : "text-blood-light"
              }`}
            >
              {resultat.critique === "reussite" && "Réussite Critique !"}
              {resultat.critique === "echec" && "Échec Critique !"}
              {!resultat.critique && resultat.reussite && "Réussite"}
              {!resultat.critique && !resultat.reussite && "Échec"}
            </motion.p>

            {resultat.critique && (
              <p className="text-[10px] font-data text-gray-500">
                {resultat.critique === "reussite"
                  ? "Un 20 naturel est TOUJOURS une réussite, quel que soit le DD."
                  : "Un 1 naturel est TOUJOURS un échec, quel que soit le bonus."}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
