"use client";

import { useEffect } from "react";

/** Updates the <html lang> attribute to match the current route locale */
export function LangUpdater({ lang }: { readonly lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
