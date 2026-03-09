import type { Metadata } from "next";
import { getActe } from "@/data/playthrough";
import { WalkthroughClient } from "../WalkthroughClient";

export const metadata: Metadata = {
  title: "Acte 1 — Survie | BG3 Honor Companion",
  description: "Route Pacifique vers le Niveau 4. Guide pas-à-pas pour l'Acte 1 en Mode Honneur.",
};

export default function Acte1Page() {
  const acte = getActe(1);
  return <WalkthroughClient acte={acte} />;
}
