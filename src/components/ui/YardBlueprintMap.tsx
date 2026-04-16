"use client";

import { ReactNode } from "react";
import Image from "next/image";

/**
 * 도면 위 각 구역의 % 좌표 (center 기준)
 * - 같은 행(A/B/C)은 동일한 top 값
 * - 같은 열(1~5)은 동일한 left 값
 */
const ROW_TOP: Record<string, string> = { A: "18%", B: "48%", C: "78%" };
const COL_LEFT: Record<number, string> = { 1: "18%", 2: "34%", 3: "50%", 4: "66%", 5: "82%" };

const ZONE_POSITIONS: Record<string, { left: string; top: string }> = {};
for (const row of ["A", "B", "C"]) {
  for (let col = 1; col <= 5; col++) {
    ZONE_POSITIONS[`${row}${col}`] = { left: COL_LEFT[col], top: ROW_TOP[row] };
  }
}

interface ZoneOverlayProps {
  zoneId: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function ZoneOverlay({ zoneId, children, onClick, className = "" }: ZoneOverlayProps) {
  const pos = ZONE_POSITIONS[zoneId];
  if (!pos) return null;

  return (
    <button
      onClick={onClick}
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-105 ${className}`}
      style={{ left: pos.left, top: pos.top }}
    >
      {children}
    </button>
  );
}

interface YardBlueprintMapProps {
  zones: { id: string }[];
  renderZone: (zone: { id: string }, ZoneOverlay: typeof import("./YardBlueprintMap").ZoneOverlay) => ReactNode;
}

export { ZoneOverlay };

export function YardBlueprintMap({ zones, renderZone }: YardBlueprintMapProps) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
      {/* 도면 배경 */}
      <Image
        src="/yard-blueprint.png"
        alt="야적장 도면"
        fill
        className="object-contain pointer-events-none select-none"
        priority
      />
      {/* 구역 오버레이 */}
      {zones.map((zone) => renderZone(zone, ZoneOverlay))}
    </div>
  );
}
