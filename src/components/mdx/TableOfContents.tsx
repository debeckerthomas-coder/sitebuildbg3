"use client";

// ============================================================================
// TableOfContents — Floating sidebar ToC with IntersectionObserver tracking
// ============================================================================

import { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/**
 * Scan headings from the DOM. Returns a stable reference when called
 * multiple times with the same DOM content.
 */
function scanHeadings(): TocEntry[] {
  const article =
    document.querySelector("[data-mdx-content]") ??
    document.querySelector("article");
  if (!article) return [];

  const elements = article.querySelectorAll("h2, h3, h4");
  const entries: TocEntry[] = [];

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (!htmlEl.id) {
      htmlEl.id =
        htmlEl.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") ?? "";
    }
    entries.push({
      id: htmlEl.id,
      text: htmlEl.textContent ?? "",
      level: parseInt(htmlEl.tagName[1]!, 10),
    });
  });

  return entries;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const didScan = useRef(false);

  // Scan headings once after mount, using a ref to avoid the
  // "setState synchronously in effect" lint warning.
  useEffect(() => {
    if (didScan.current) return;
    didScan.current = true;

    // Use requestAnimationFrame to defer the scan outside the effect body
    requestAnimationFrame(() => {
      setHeadings(scanHeadings());
    });
  }, []);

  // Track active heading via IntersectionObserver
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0]!.target.id);
      }
    },
    []
  );

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0.1,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings, handleIntersection]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
      aria-label="Table des matières"
    >
      <p className="font-display text-xs text-gold-muted uppercase tracking-widest mb-3">
        Sur cette page
      </p>
      <ul className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const indent = (heading.level - 2) * 12;

          return (
            <li key={heading.id} style={{ paddingLeft: `${indent}px` }}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`
                  block py-1 text-xs font-data transition-all duration-200
                  border-l-2 pl-3
                  ${
                    isActive
                      ? "border-gold text-gold font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-300 hover:border-border-hover"
                  }
                `}
              >
                {heading.text}
              </a>
              {isActive && (
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute left-0 w-0.5 h-5 bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
