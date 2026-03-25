import Link from "next/link";

// ============================================================================
// 404 — Critical Miss (Dark Fantasy themed)
// Bilingual FR/EN since not-found.tsx has no access to [lang] params
// ============================================================================

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Critical Miss — the dreaded natural 1 */}
      <span className="mb-4 text-9xl font-bold text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">
        1
      </span>

      <h1 className="text-3xl font-bold tracking-widest text-gray-200">
        ÉCHEC CRITIQUE / CRITICAL MISS
      </h1>

      <p className="mt-2 mb-8 max-w-md text-gray-400">
        Cette page a été engloutie par l&apos;Ombreterre.
        <br />
        This page was swallowed by the Underdark.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-[#fbbf24] px-6 py-3 text-sm font-bold text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-200 hover:scale-105 hover:bg-yellow-500"
      >
        🎲 Relancer les dés (Retour à l&apos;accueil)
      </Link>
    </main>
  );
}
