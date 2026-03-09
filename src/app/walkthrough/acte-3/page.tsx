import type { Metadata } from "next";
import { getActe } from "@/data/playthrough";
import { Acte3Client } from "./Acte3Client";

export const metadata: Metadata = {
  title: "Acte 3 — La Porte de Baldur & Le Cerveau Vénérable | BG3 Honor Companion",
  description: "Guide pas-à-pas pour l'Acte 3 en Mode Honneur. Gortash, Orin, Raphaël, Ansur et le Cerveau Vénérable.",
};

export default function Acte3Page() {
  const acte = getActe(3);
  return <Acte3Client acte={acte} />;
}
