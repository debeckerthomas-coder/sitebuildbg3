import Link from "next/link";

const FOOTER_I18N = {
  fr: {
    navigation: "Navigation",
    codex: "Codex des Règles",
    legal: "Mentions Légales",
    support: "Soutien",
    supportLink: "\uD83C\uDF77 Offrez-moi une Potion (Ko-fi)",
    copyright: "© 2026 Faerun Tactics. Non affilié à Larian Studios ou Wizards of the Coast.",
  },
  en: {
    navigation: "Navigation",
    codex: "Rules Codex",
    legal: "Legal Notice",
    support: "Support",
    supportLink: "\uD83C\uDF77 Buy me a Potion (Ko-fi)",
    copyright: "© 2026 Faerun Tactics. Not affiliated with Larian Studios or Wizards of the Coast.",
  },
} as const;

export function Footer({ lang = "fr" }: { lang?: string }) {
  const t = FOOTER_I18N[lang as keyof typeof FOOTER_I18N] ?? FOOTER_I18N.fr;
  const prefix = `/${lang}`;

  return (
    <footer className="mt-auto border-t border-[#fbbf24]/10 bg-[#0b0f19]/80 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-3">
              {t.navigation}
            </p>
            <Link
              href={`${prefix}/codex`}
              className="block text-sm text-gray-400 hover:text-theme transition-colors"
            >
              {t.codex}
            </Link>
            <Link
              href={`${prefix}/mentions-legales`}
              className="block text-sm text-gray-400 hover:text-theme transition-colors"
            >
              {t.legal}
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-3">
              {t.support}
            </p>
            <a
              href="https://ko-fi.com/sitebuildbg3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#fbbf24] px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-200 hover:bg-yellow-500 hover:scale-105"
            >
              {t.supportLink}
            </a>
          </div>

          <div className="flex items-end sm:justify-end">
            <p className="text-gray-500 text-sm">
              {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
