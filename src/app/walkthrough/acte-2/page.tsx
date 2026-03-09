import type { Metadata } from "next";
import { getActe } from "@/data/playthrough";
import { Acte2Client } from "./Acte2Client";

export const metadata: Metadata = {
  title: "Acte 2 — Les Terres Maudites & L'Apôtre de Myrkul | BG3 Honor Companion",
  description: "Guide pas-à-pas pour l'Acte 2 en Mode Honneur. Balthazar, l'Apôtre de Myrkul, et la gestion de la lumière.",
};

export default function Acte2Page() {
  const acte = getActe(2);
  return <Acte2Client acte={acte} />;
}
