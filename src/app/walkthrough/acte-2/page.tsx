import type { Metadata } from "next";
import { getActe } from "@/data/playthrough";
import { WalkthroughClient } from "../WalkthroughClient";

export const metadata: Metadata = {
  title: "Acte 2 — Les Terres Maudites | BG3 Honor Companion",
  description: "Guide pas-à-pas pour l'Acte 2 en Mode Honneur. Protéger l'Auberge de la Dernière Lumière.",
};

export default function Acte2Page() {
  const acte = getActe(2);
  return <WalkthroughClient acte={acte} />;
}
