"use client";

// ============================================================================
// ChecklistItem — Persistent checkbox backed by useProgressStore (localStorage)
// Usage: <ChecklistItem id="nautiloid-zhalk">Kill Commander Zhalk for his sword.</ChecklistItem>
// ============================================================================

import { useState, useEffect, type ReactNode } from "react";
import { useProgressStore } from "@/store/useProgressStore";

interface ChecklistItemProps {
  readonly id: string;
  readonly children: ReactNode;
}

export function ChecklistItem({ id, children }: ChecklistItemProps) {
  const [isMounted, setIsMounted] = useState(false);
  const checked = useProgressStore((s) => s.checkedItems[id] ?? false);
  const toggle = useProgressStore((s) => s.toggleItem);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // SSR / pre-hydration: render unchecked to match server output
  const isChecked = isMounted && checked;

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(id);
        }
      }}
      className="group my-3 flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all hover:bg-white/5"
    >
      {/* Checkbox square */}
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
          isChecked
            ? "border-[#fbbf24] bg-[#fbbf24]"
            : "border-gray-500 bg-transparent"
        }`}
      >
        {isChecked && (
          <svg
            className="h-3 w-3 text-black"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span
        className={`text-sm leading-relaxed transition-all duration-300 ${
          isChecked
            ? "text-gray-500 line-through opacity-70"
            : "text-gray-200"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
