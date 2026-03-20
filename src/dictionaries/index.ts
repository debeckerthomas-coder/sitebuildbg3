import type frDict from "./fr.json";

export type Locale = "fr" | "en";
export type Dictionary = typeof frDict;

export const i18n = {
  defaultLocale: "fr" as const,
  locales: ["fr", "en"] as const,
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./fr.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.fr;
  return loader();
}
