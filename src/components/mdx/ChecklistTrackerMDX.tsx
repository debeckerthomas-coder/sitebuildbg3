"use client";

// ============================================================================
// ChecklistTrackerMDX — Lightweight MDX wrapper for build leveling checklists
// Usage: <ChecklistTracker checklistId="leveling_bard">...markdown steps...</ChecklistTracker>
//
// Wraps MDX children and transforms <li> elements into interactive checkboxes
// with localStorage persistence. Does NOT depend on Zustand run state.
// ============================================================================

import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

interface ChecklistTrackerMDXProps {
  readonly checklistId: string;
  readonly children?: ReactNode;
}

const STORAGE_PREFIX = "bg3_checklist_";

function countListItems(children: ReactNode): number {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === "li") {
      count++;
    }
    const props = child.props as Record<string, unknown>;
    if (props.children) {
      count += countListItems(props.children as ReactNode);
    }
  });
  return count;
}

function transformChildren(
  children: ReactNode,
  checked: Record<string, boolean>,
  toggle: (key: string, value: boolean) => void,
  counter: { current: number },
): ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const props = child.props as Record<string, unknown>;

    if (child.type === "li") {
      const idx = `step_${counter.current++}`;
      const isChecked = !!checked[idx];
      return (
        <li
          key={idx}
          className="flex items-start gap-3 py-1.5"
          style={{ listStyle: "none" }}
        >
          <Checkbox.Root
            checked={isChecked}
            onCheckedChange={(v) => toggle(idx, !!v)}
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
              isChecked
                ? "border-gold bg-gold/20 text-gold"
                : "border-gray-500 hover:border-gold/60"
            }`}
          >
            <Checkbox.Indicator>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span
            className={`flex-1 ${isChecked ? "line-through opacity-50" : ""}`}
          >
            {props.children as ReactNode}
          </span>
        </li>
      );
    }

    if (child.type === "ul" || child.type === "ol") {
      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        {
          className: "list-none pl-0 space-y-1",
          style: { paddingLeft: 0, listStyle: "none" },
        },
        transformChildren(
          props.children as ReactNode,
          checked,
          toggle,
          counter,
        ),
      );
    }

    if (props.children) {
      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        {},
        transformChildren(
          props.children as ReactNode,
          checked,
          toggle,
          counter,
        ),
      );
    }

    return child;
  });
}

export function ChecklistTrackerMDX({
  checklistId,
  children,
}: ChecklistTrackerMDXProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${checklistId}`);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, [checklistId]);

  const toggle = useCallback(
    (key: string, value: boolean) => {
      setChecked((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem(
            `${STORAGE_PREFIX}${checklistId}`,
            JSON.stringify(next),
          );
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [checklistId],
  );

  if (!mounted) {
    return (
      <div className="my-4 rounded-card border border-border bg-surface-raised p-4">
        <div className="h-4 w-48 bg-abyss-200 rounded animate-pulse" />
      </div>
    );
  }

  const total = countListItems(children);
  const done = Object.values(checked).filter(Boolean).length;
  const counter = { current: 0 };

  return (
    <div className="my-4 rounded-card border border-border bg-surface-raised overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-display text-gold">
            Progression du Build
          </span>
        </div>
        {total > 0 && (
          <span className="text-xs font-data text-gray-400">
            {done}/{total} complété{done !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="px-4 py-2 text-xs font-data text-gray-500 border-b border-border/30">
        Cochez chaque étape au fur et à mesure de votre progression. Votre
        avancement est sauvegardé automatiquement.
      </div>
      {children && (
        <div className="px-4 py-3">
          {transformChildren(children, checked, toggle, counter)}
        </div>
      )}
    </div>
  );
}
