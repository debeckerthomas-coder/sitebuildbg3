// ============================================================================
// MDX Table Overrides — Styled table elements for markdown tables
// Replaces plain HTML tables with glassmorphism design matching the site theme.
// ============================================================================

import type { ComponentPropsWithoutRef } from "react";

export function MDXTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gold/20 bg-[#111520]/60 backdrop-blur-md">
      <table
        {...props}
        className="w-full border-collapse text-sm font-data"
      />
    </div>
  );
}

export function MDXThead(props: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      {...props}
      className="border-b border-gold/30 bg-gold/5"
    />
  );
}

export function MDXTh(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className="px-4 py-3 text-left text-xs font-heading uppercase tracking-wider text-gold"
    />
  );
}

export function MDXTr(props: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      {...props}
      className="border-b border-border/30 transition-colors hover:bg-white/[0.03] last:border-b-0"
    />
  );
}

export function MDXTd(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className="px-4 py-3 text-gray-300 leading-relaxed"
    />
  );
}
