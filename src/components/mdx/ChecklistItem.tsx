"use client";

// ============================================================================
// ChecklistItem — Persistent checkbox backed by useProgressStore (localStorage)
// Usage: <ChecklistItem id="nautiloid-zhalk">Kill Commander Zhalk for his sword.</ChecklistItem>
// ============================================================================

import { useState, useEffect, type ReactNode } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import { Checkbox } from "@/components/ui-system";

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
    <div className="my-3 rounded-lg p-3 transition-all hover:bg-white/5">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => toggle(id)}
      >
        {children}
      </Checkbox>
    </div>
  );
}
