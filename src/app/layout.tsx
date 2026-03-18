import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { HydrationProvider } from "@/components/layout/HydrationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BG3 Honor Companion — Le Compagnon du Mode Honneur",
  description:
    "Le guide ultime de Baldur's Gate 3 en Mode Honneur. Builds, walkthroughs interactifs, chaînes de failsafe, et simulations de combat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-gray-200 font-data antialiased min-h-screen">
        <HydrationProvider>
          <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-theme to-theme-dark flex items-center justify-center transition-colors duration-300">
                  <span className="font-display text-xs font-bold text-abyss">BG3</span>
                </div>
                <div>
                  <h1 className="font-display text-sm text-theme tracking-wide group-hover:text-theme-light transition-colors duration-300">
                    Honor Companion
                  </h1>
                  <p className="text-[9px] font-data text-gray-500 -mt-0.5">Mode Honneur — Aucun droit à l&apos;erreur</p>
                </div>
              </Link>
            </div>
          </header>

          <div className="flex max-w-[1600px] mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 p-6">
              {children}
            </main>
          </div>
        </HydrationProvider>
      </body>
    </html>
  );
}
