import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BG3 Honor Companion",
  description:
    "The ultimate Baldur's Gate 3 Honor Mode companion — builds, walkthroughs, failsafes, and combat simulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts: Cinzel (display), Lora (body), Inter (data) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-abyss text-gray-200 font-data antialiased min-h-screen">
        <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-display text-xs font-bold text-abyss">
                  BG3
                </span>
              </div>
              <h1 className="font-display text-sm text-gold tracking-wide">
                Honor Companion
              </h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-xs font-data text-gray-400 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/walkthrough/act3-walkthrough"
                className="text-xs font-data text-gray-400 hover:text-gold transition-colors"
              >
                Walkthrough
              </Link>
              <Link
                href="/dice"
                className="text-xs font-data text-gray-400 hover:text-gold transition-colors"
              >
                Dice
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
