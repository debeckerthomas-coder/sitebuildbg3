import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
      <body className="text-gray-200 font-data antialiased flex flex-col min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
