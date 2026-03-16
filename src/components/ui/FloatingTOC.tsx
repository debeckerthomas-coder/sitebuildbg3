"use client";

// ============================================================================
// FloatingTOC — Fixed floating table of contents with active heading tracking
// Scans all <h2> elements from the article and highlights the visible one
// ============================================================================

import { useEffect, useState, useRef, useCallback } from "react";

interface TocEntry {
  id: string;
  text: string;
}

export function FloatingTOC() {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const didScan = useRef(false);

  // Scan h2 elements once after mount
  useEffect(() => {
    if (didScan.current) return;
    didScan.current = true;

    requestAnimationFrame(() => {
      const article =
        document.querySelector("[data-mdx-content]") ??
        document.querySelector("article");
      if (!article) return;

      const elements = article.querySelectorAll("h2");
      const entries: TocEntry[] = [];

      elements.forEach((el) => {
        if (!el.id) {
          el.id =
            el.textContent
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") ?? "";
        }
        entries.push({ id: el.id, text: el.textContent ?? "" });
      });

      setHeadings(entries);
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
    [],
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
      className="fixed right-4 top-32 hidden xl:block w-64 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin z-30"
      aria-label="Sommaire"
    >
      <p className="font-display text-[10px] text-gold-muted uppercase tracking-[0.3em] mb-3">
        Sommaire
      </p>
      <ul className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id} className="relative">
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
                  flex items-center gap-2 py-1.5 text-xs font-data transition-all duration-200
                  border-l-2 pl-3
                  ${
                    isActive
                      ? "border-gold text-gold font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-300 hover:border-border-hover"
                  }
                `}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                )}
                <span className="truncate">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
