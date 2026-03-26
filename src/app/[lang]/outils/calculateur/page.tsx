import type { Metadata } from "next";
import type { Locale } from "@/dictionaries";
import DamageCalculator from "@/components/tools/DamageCalculator";

export const metadata: Metadata = {
  title: "Theorycraft Engine : Calculateur de Dégâts | BG3 Honor Companion",
  description:
    "Calculez vos dégâts min, max et moyens en Mode Honneur. Paramétrez vos dés, modificateurs et bonus pour optimiser chaque attaque.",
};

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function CalculateurPage({ params }: PageProps) {
  const { lang } = await params;
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          Theorycraft Engine : Calculateur de Dégâts
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {lang === "fr"
            ? "Paramétrez vos dés, modificateurs de caractéristique et bonus d\u2019enchantement pour visualiser vos dégâts en temps réel."
            : "Configure your dice, ability modifiers and enchantment bonuses to visualize your damage in real time."}
        </p>
      </div>
      <DamageCalculator lang={lang} />
    </div>
  );
}
