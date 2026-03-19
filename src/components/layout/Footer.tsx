import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#fbbf24]/10 bg-[#0b0f19]/80 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Navigation secondaire */}
          <div className="space-y-2">
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-3">
              Navigation
            </p>
            <Link
              href="/codex"
              className="block text-sm text-gray-400 hover:text-theme transition-colors"
            >
              Codex des Regles
            </Link>
            <Link
              href="/mentions-legales"
              className="block text-sm text-gray-400 hover:text-theme transition-colors"
            >
              Mentions Legales
            </Link>
          </div>

          {/* Soutien */}
          <div className="space-y-2">
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-3">
              Soutien
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-theme/70 hover:text-theme transition-colors"
            >
              <span aria-hidden>&#x2764;</span>
              Soutenir la Taverne (Ko-fi)
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-end sm:justify-end">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Faerun Tactics. Non affilie a Larian Studios ou Wizards of the Coast.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
