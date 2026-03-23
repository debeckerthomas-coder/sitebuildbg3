"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const LOCALES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
] as const;

/** Simple FR | EN toggle that swaps the /lang/ prefix in the current URL */
export function LanguageSwitcher() {
  const pathname = usePathname();

  // Extract current locale from pathname (e.g. "/fr/builds/lockadin" → "fr")
  const segments = pathname.split("/");
  const currentLocale = segments[1] === "en" ? "en" : "fr";

  function buildHref(targetLocale: string): string {
    const newSegments = [...segments];
    newSegments[1] = targetLocale;
    return newSegments.join("/") || "/";
  }

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-surface/60 p-0.5">
      {LOCALES.map(({ code, label }) => {
        const isActive = currentLocale === code;
        return (
          <Link
            key={code}
            href={buildHref(code)}
            className={`px-2 py-0.5 rounded text-xs font-data transition-colors duration-200 ${
              isActive
                ? "bg-theme/20 text-theme font-semibold"
                : "text-gray-500 hover:text-gray-300"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
