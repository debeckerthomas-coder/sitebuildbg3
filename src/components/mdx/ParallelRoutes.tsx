// ============================================================================
// ParallelRoutes — Side-by-side strategy comparison for MDX walkthroughs
//
// Usage in MDX:
//   <ParallelRoutes>
//     <Route type="peaceful" title="Voie Pacifique">...markdown...</Route>
//     <Route type="assault" title="Assaut Frontal">...markdown...</Route>
//   </ParallelRoutes>
// ============================================================================

import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Route type configuration
// ---------------------------------------------------------------------------

const ROUTE_STYLES = {
  peaceful: {
    border: "border-emerald-500/25",
    bg: "bg-emerald-950/20",
    glow: "shadow-[inset_0_0_30px_rgba(16,185,129,0.06)]",
    titleColor: "text-emerald-400",
    accentBar: "from-emerald-500/60 via-emerald-400/40 to-emerald-500/60",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8" />
        <path d="M8 14h4" />
      </svg>
    ),
    label: "Pacifique",
  },
  assault: {
    border: "border-red-500/25",
    bg: "bg-red-950/20",
    glow: "shadow-[inset_0_0_30px_rgba(220,38,38,0.06)]",
    titleColor: "text-red-400",
    accentBar: "from-red-500/60 via-red-400/40 to-red-500/60",
    iconBg: "bg-red-500/10 border-red-500/20",
    iconColor: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14.5 2L20 7.5 7.5 20 2 14.5 14.5 2z" />
        <path d="M17 7l-10 10" />
        <path d="M2 22l4-4" />
        <path d="M15 4l5 5" />
      </svg>
    ),
    label: "Assaut",
  },
  neutral: {
    border: "border-gold/20",
    bg: "bg-gold/5",
    glow: "shadow-[inset_0_0_30px_rgba(212,175,55,0.04)]",
    titleColor: "text-gold",
    accentBar: "from-gold/50 via-gold/30 to-gold/50",
    iconBg: "bg-gold/10 border-gold/20",
    iconColor: "text-gold",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Alternatif",
  },
} as const;

// ---------------------------------------------------------------------------
// <Route> — Individual strategy card
// ---------------------------------------------------------------------------

interface RouteProps {
  readonly title: string;
  readonly type: "peaceful" | "assault" | "neutral";
  readonly children?: ReactNode;
}

export function Route({ title, type, children }: RouteProps) {
  const style = ROUTE_STYLES[type];

  return (
    <div
      className={`relative p-6 rounded-xl border backdrop-blur-md overflow-hidden ${style.border} ${style.bg} ${style.glow}`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${style.accentBar}`}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${style.iconBg} ${style.iconColor}`}
        >
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-display text-sm leading-tight ${style.titleColor}`}>
              {title}
            </h3>
          </div>
          <span
            className={`text-[9px] font-data uppercase tracking-widest ${style.iconColor} opacity-60`}
          >
            {style.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="text-sm font-body text-gray-400 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:space-y-1 [&>ul]:list-disc [&>ul]:pl-4 [&_strong]:text-gray-300 [&_a]:text-blue-400 [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// <ParallelRoutes> — Grid container
// ---------------------------------------------------------------------------

interface ParallelRoutesProps {
  readonly children?: ReactNode;
}

export function ParallelRoutes({ children }: ParallelRoutesProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      {children}
    </div>
  );
}
