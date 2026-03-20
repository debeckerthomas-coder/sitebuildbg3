import { NextRequest, NextResponse } from "next/server";

const locales = ["fr", "en"] as const;
const defaultLocale = "fr";

/** Check if the pathname already starts with a locale prefix */
function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/** Extract the preferred locale from Accept-Language header */
function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  // Parse quality values: en-GB;q=0.9,fr;q=0.8 → [["en-gb",0.9],["fr",0.8]]
  const preferred = acceptLang
    .split(",")
    .map((part) => {
      const segments = part.trim().split(";q=");
      const lang = segments[0] ?? "";
      const q = segments[1];
      return [lang.toLowerCase(), q ? parseFloat(q) : 1.0] as const;
    })
    .sort((a, b) => b[1] - a[1]);

  for (const [lang] of preferred) {
    const match = locales.find(
      (l) => lang === l || lang.startsWith(`${l}-`)
    );
    if (match) return match;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if pathname already has a locale
  if (pathnameHasLocale(pathname)) return;

  // Detect preferred locale and redirect
  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match all paths EXCEPT static files, Next.js internals, API routes
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};
