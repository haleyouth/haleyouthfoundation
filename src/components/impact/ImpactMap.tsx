"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AFRICA_COUNTRIES, NIGERIA_STATES } from "./mapData";
import { ArrowLeft, ChevronRight, Info } from "lucide-react";

/* =====================================================================
   Status taxonomy
   ===================================================================== */

type Status = "active" | "planned" | "aspirational" | "none";

interface StatusStyle {
  label: string;
  fill: string;
  stroke: string;
  description: string;
}

const STATUS: Record<Status, StatusStyle> = {
  active: {
    label: "Active impact",
    fill: "#0B4D2C",
    stroke: "#0B4D2C",
    description: "Programmes delivered and beneficiaries reached today.",
  },
  planned: {
    label: "Planned expansion",
    fill: "#1B7A3E",
    stroke: "#0B4D2C",
    description: "Country or state confirmed for next-cycle programmes.",
  },
  aspirational: {
    label: "Aspirational reach",
    fill: "#F4E7B8",
    stroke: "#A47A00",
    description:
      "Within our medium-term Sub-Saharan-African pathway, in line with the WHO African Region under-supply countries (donations under 10 per 1,000 people).",
  },
  none: {
    label: "No active programmes yet",
    fill: "#FAF7EC",
    stroke: "#C8CBCE",
    description: "Not yet in scope.",
  },
};

/* =====================================================================
   Per-country and per-state metadata
   ===================================================================== */

interface CountryMeta {
  status: Status;
  note?: string;
}

const COUNTRY_META: Record<string, CountryMeta> = {
  // Active
  ng: {
    status: "active",
    note: "Headquarters in Okene, Kogi State. 11 active programmes. Click to see state-level reach.",
  },
  // Planned LIFELINE Year-2 to Year-3 PHC pathway
  gh: { status: "planned", note: "LIFELINE PHC pathway, Year 2 to 3 expansion." },
  ke: { status: "planned", note: "LIFELINE PHC pathway, Year 2 to 3 expansion." },
  tz: { status: "planned", note: "LIFELINE PHC pathway, Year 2 to 3 expansion." },
  za: { status: "planned", note: "LIFELINE PHC pathway, Year 2 to 3 expansion." },
  tn: { status: "planned", note: "LIFELINE PHC pathway, Year 2 to 3 expansion." },
  // Aspirational, the broader WHO African Region under-supply set
  sn: { status: "aspirational" },
  ml: { status: "aspirational" },
  bf: { status: "aspirational" },
  ne: { status: "aspirational" },
  td: { status: "aspirational" },
  cm: { status: "aspirational" },
  bj: { status: "aspirational" },
  tg: { status: "aspirational" },
  ci: { status: "aspirational" },
  lr: { status: "aspirational" },
  sl: { status: "aspirational" },
  gn: { status: "aspirational" },
  gw: { status: "aspirational" },
  cd: { status: "aspirational" },
  cg: { status: "aspirational" },
  cf: { status: "aspirational" },
  ga: { status: "aspirational" },
  gq: { status: "aspirational" },
  ao: { status: "aspirational" },
  zm: { status: "aspirational" },
  zw: { status: "aspirational" },
  mw: { status: "aspirational" },
  mz: { status: "aspirational" },
  ug: { status: "aspirational" },
  rw: { status: "aspirational" },
  bi: { status: "aspirational" },
  et: { status: "aspirational" },
  er: { status: "aspirational" },
  ss: { status: "aspirational" },
  so: { status: "aspirational" },
};

interface StateMeta {
  status: Status;
  programmes?: string[];
}

const STATE_META: Record<string, StateMeta> = {
  "Federal Capital Territory": {
    status: "active",
    programmes: [
      "Pad-a-Girl (Garki, Jabi public schools)",
      "Pad-a-Girl (Karimo)",
      "Career and Mentorship",
      "Digital Skills for Her (Commonwealth Network)",
    ],
  },
  Kogi: {
    status: "active",
    programmes: [
      "Foundation headquarters, Okene",
      "Pad-a-Girl",
      "Back-to-School",
      "STEM Training",
      "Voices of the Middle Belt (LINGUA Africa Ebira corpus)",
      "LIFELINE pilot site (Okene General Hospital)",
    ],
  },
  Kano: {
    status: "active",
    programmes: [
      "Humanitarian Projects",
      "Youth Skill Acquisition",
    ],
  },
  Kaduna: {
    status: "active",
    programmes: [
      "STEM Training",
      "Back-to-School outreach",
    ],
  },
  Lagos: {
    status: "active",
    programmes: [
      "Career and Mentorship outreach",
      "Education support partnerships (e.g. LASUCOM)",
    ],
  },
  Edo: {
    status: "active",
    programmes: ["Career and Mentorship", "Community outreach"],
  },
  Niger: {
    status: "active",
    programmes: ["Pad-a-Girl and community sensitisation"],
  },
  Yobe: {
    status: "active",
    programmes: ["Humanitarian Projects (North-East)"],
  },
  Borno: {
    status: "active",
    programmes: ["Humanitarian Projects (Maiduguri and environs)"],
  },
  "Cross River": {
    status: "active",
    programmes: ["Career and Mentorship", "Community outreach"],
  },
  Oyo: {
    status: "active",
    programmes: ["Career and Mentorship", "STEM Training outreach"],
  },
  Anambra: {
    status: "active",
    programmes: ["Career and Mentorship", "Education partnerships"],
  },
  Nassarawa: { status: "planned", programmes: ["LINGUA Africa Igala / Bassa-Nge pilot pathway"] },
  Benue: { status: "planned" },
  Plateau: { status: "planned" },
};

/* =====================================================================
   Helpers
   ===================================================================== */

function statusFor(iso: string): Status {
  return COUNTRY_META[iso]?.status ?? "none";
}

function stateStatusFor(name: string): Status {
  return STATE_META[name]?.status ?? "none";
}

/* =====================================================================
   Component
   ===================================================================== */

interface HoverInfo {
  x: number;
  y: number;
  title: string;
  status: Status;
  body: string;
  programmes?: string[];
}

export default function ImpactMap() {
  const [view, setView] = useState<"africa" | "nigeria">("africa");
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const mapBoxRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 600 });

  useEffect(() => {
    const node = mapBoxRef.current;
    if (!node) return;
    const update = () => {
      const rect = node.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const tooltipFor = (info: HoverInfo) => {
    const s = STATUS[info.status];
    const tooltipWidth = 264;
    // Keep tooltip inside the map container on the right edge.
    const containerWidth = containerSize.width;
    const wouldOverflowRight = info.x + 14 + tooltipWidth > containerWidth;
    const leftPx = wouldOverflowRight ? info.x - 14 - tooltipWidth : info.x + 14;
    return (
      <div
        className="pointer-events-none absolute z-30 rounded-lg bg-white shadow-xl border border-neutral-200 overflow-hidden"
        style={{
          left: Math.max(8, leftPx),
          top: info.y + 14,
          width: tooltipWidth,
        }}
      >
        <div className="h-1.5" style={{ backgroundColor: s.fill }} />
        <div className="p-3">
          <p className="text-sm font-semibold text-text-primary">{info.title}</p>
          <p
            className="text-[11px] uppercase tracking-wide mt-0.5"
            style={{ color: s.fill }}
          >
            {s.label}
          </p>
          {info.programmes && info.programmes.length > 0 ? (
            <ul className="text-xs text-text-secondary mt-2 space-y-1 leading-relaxed">
              {info.programmes.map((p) => (
                <li key={p} className="flex gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">{info.body}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Header bar with view toggle */}
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h2
            className="text-3xl font-bold text-text-primary"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Geographic Reach
          </h2>
          <p className="text-text-secondary leading-relaxed mt-2 max-w-3xl">
            Haleyouth Foundation operates across African countries, with planned expansion to more active communities across Africa as well as multiple states in Nigeria.
          </p>
          <p className="text-xs text-text-secondary/80 mt-2 italic">
            {view === "africa"
              ? "Click Nigeria to drill into state-level impact."
              : "State-level impact in Nigeria. Hover for programme details."}
          </p>
        </div>
        {view === "nigeria" && (
          <button
            onClick={() => {
              setView("africa");
              setHover(null);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Africa
          </button>
        )}
      </div>

      {/* Map + legend */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary/40 via-white to-bg-secondary/40 border border-neutral-200 shadow-sm">
        <div ref={mapBoxRef} className="relative aspect-[16/11] w-full">
          <AnimatePresence mode="wait">
            {view === "africa" ? (
              <motion.div
                key="africa"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <AfricaView
                  onHover={setHover}
                  onClickCountry={(iso) => {
                    if (iso === "ng") {
                      setHover(null);
                      setView("nigeria");
                    }
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="nigeria"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <NigeriaView onHover={setHover} />
              </motion.div>
            )}
          </AnimatePresence>

          {hover && tooltipFor(hover)}
        </div>

        {/* Legend strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 border-t border-neutral-200 bg-white/80 backdrop-blur-sm">
          {(Object.keys(STATUS) as Status[]).map((key) => {
            const s = STATUS[key];
            return (
              <div key={key} className="inline-flex items-center gap-2">
                <span
                  className="inline-block w-3.5 h-3.5 rounded-sm border"
                  style={{ backgroundColor: s.fill, borderColor: s.stroke }}
                />
                <span className="text-xs text-text-secondary">{s.label}</span>
              </div>
            );
          })}
          <div className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-text-secondary/80">
            <Info size={12} />
            <span>Sources: Natural Earth (public domain); WHO Global Database on Blood Safety, 2024.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   Africa view
   ===================================================================== */

function AfricaView({
  onHover,
  onClickCountry,
}: {
  onHover: (info: HoverInfo | null) => void;
  onClickCountry: (iso: string) => void;
}) {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Africa impact map"
      >
        <defs>
          <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0B4D2C" floodOpacity="0.35" />
          </filter>
          <pattern id="ngPulse" patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="#0B4D2C" />
            <path d="M0 6L6 0" stroke="#D4A017" strokeWidth="0.6" opacity="0.55" />
          </pattern>
        </defs>

        {AFRICA_COUNTRIES.map((c) => {
          const status = statusFor(c.iso);
          const s = STATUS[status];
          const isNigeria = c.iso === "ng";
          return (
            <path
              key={c.iso}
              d={c.d}
              fill={isNigeria ? "url(#ngPulse)" : s.fill}
              stroke={s.stroke}
              strokeWidth={status === "active" ? 1.2 : 0.6}
              className={
                "transition-all duration-200 " +
                (status === "none"
                  ? "opacity-90 hover:opacity-100"
                  : "hover:brightness-105")
              }
              style={{ cursor: isNigeria ? "pointer" : "default" }}
              onMouseMove={(e) => {
                const svg = e.currentTarget.ownerSVGElement;
                if (!svg) return;
                const bounds = svg.getBoundingClientRect();
                const note =
                  COUNTRY_META[c.iso]?.note ?? STATUS[status].description;
                onHover({
                  x: e.clientX - bounds.left,
                  y: e.clientY - bounds.top,
                  title: c.name,
                  status,
                  body: note,
                });
              }}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClickCountry(c.iso)}
            />
          );
        })}
      </svg>

      {/* "Click Nigeria" pulse hint */}
      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
          Click Nigeria to drill in <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}

/* =====================================================================
   Nigeria view
   ===================================================================== */

function NigeriaView({ onHover }: { onHover: (info: HoverInfo | null) => void }) {
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Nigeria state-level impact map"
      >
        {NIGERIA_STATES.map((st) => {
          const status = stateStatusFor(st.name);
          const s = STATUS[status];
          return (
            <path
              key={st.name}
              d={st.d}
              fill={s.fill}
              stroke={s.stroke}
              strokeWidth={status === "active" ? 1.6 : 0.8}
              className="transition-all duration-200 hover:brightness-110"
              style={{ cursor: "default" }}
              onMouseMove={(e) => {
                const svg = e.currentTarget.ownerSVGElement;
                if (!svg) return;
                const bounds = svg.getBoundingClientRect();
                const meta = STATE_META[st.name];
                onHover({
                  x: e.clientX - bounds.left,
                  y: e.clientY - bounds.top,
                  title: st.name === "Federal Capital Territory" ? "Abuja (FCT)" : st.name + " State",
                  status,
                  body: STATUS[status].description,
                  programmes: meta?.programmes,
                });
              }}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}

        {/* State labels for active states only, drawn after paths so they sit on top */}
        {NIGERIA_STATES.filter((s) => stateStatusFor(s.name) === "active").map((st) => {
          // very rough label anchor, place a small dot only; clean names already in tooltip
          return (
            <g key={"label-" + st.name} pointerEvents="none">
              {/* tiny gold ring marker, we don't have centroids without geom math */}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
