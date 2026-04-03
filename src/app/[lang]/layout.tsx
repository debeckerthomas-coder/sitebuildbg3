import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { HydrationProvider } from "@/components/layout/HydrationProvider";
import { PanicButton } from "@/components/ui/PanicButton";
import { Footer } from "@/components/layout/Footer";
import { LangUpdater } from "@/components/layout/LangUpdater";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { GlobalSearch } from "@/components/ui/SearchPalette";
import { HeaderBuildSelector } from "@/components/ui/HeaderBuildSelector";
import { i18n, getDictionary, type Locale } from "@/dictionaries";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <HydrationProvider>
      <LangUpdater lang={lang} />
      <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-theme to-theme-dark flex items-center justify-center transition-colors duration-300">
              <span className="font-display text-xs font-bold text-abyss">BG3</span>
            </div>
            <div>
              <h1 className="font-display text-sm text-theme tracking-wide group-hover:text-theme-light transition-colors duration-300">
                Honor Companion
              </h1>
              <p className="text-[9px] font-data text-gray-500 -mt-0.5">{dict.header.subtitle}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <HeaderBuildSelector />
            <GlobalSearch />
            {/* Hidden on mobile — language switcher lives in mobile sidebar instead */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6">
          {children}
        </main>
      </div>
      <Footer lang={lang} />
      <PanicButton />
    </HydrationProvider>
  );
}
