import type { Metadata } from "next";
import { ArsenalGrid } from "./ArsenalGrid";

export const metadata: Metadata = {
  title: "L'Armurerie : Vestiges de Faerûn | BG3 Honor Companion",
  description:
    "Les meilleurs équipements Best-in-Slot de Baldur's Gate 3 pour le Mode Honneur. Armes légendaires, armures épiques, et accessoires qui définissent la méta.",
};

export default function ArsenalPage() {
  return (
    <div className="max-w-7xl space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs font-data uppercase tracking-[0.3em] text-gold/50">
          Best-in-Slot — Mode Honneur
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-amber-600">
          L&apos;Armurerie : Vestiges de Faerûn
        </h1>
        <p className="text-sm font-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Les équipements qui définissent les 9 builds Tier S. Chaque objet a
          été sélectionné pour son impact décisif en Mode Honneur — de l&apos;Acte 1
          jusqu&apos;au Cerveau Vénérable.
        </p>
        <div className="flex justify-center">
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-2" />
        </div>
      </div>
      <ArsenalGrid />
    </div>
  );
}
