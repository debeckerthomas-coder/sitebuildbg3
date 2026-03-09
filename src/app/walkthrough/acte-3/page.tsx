import type { Metadata } from "next";
import { getActe } from "@/data/playthrough";
import { WalkthroughClient } from "../WalkthroughClient";

export const metadata: Metadata = {
  title: "Acte 3 — Endgame | BG3 Honor Companion",
  description: "Guide pas-à-pas pour l'Acte 3 en Mode Honneur. Équipement légendaire et bataille finale.",
};

export default function Acte3Page() {
  const acte = getActe(3);
  return <WalkthroughClient acte={acte} />;
}
