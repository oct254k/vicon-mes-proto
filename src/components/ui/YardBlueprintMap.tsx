"use client";

import { ReactNode, useRef, useState, useCallback } from "react";
import Image from "next/image";

const ROW_TOP: Record<string, string> = { A: "18%", B: "48%", C: "78%" };
const COL_LEFT: Record<number, string> = { 1: "18%", 2: "34%", 3: "50%", 4: "66%", 5: "82%" };

const DEFAULT_POSITIONS: Record<string, { left: string; top: string }> = {};
for (const row of ["A", "B", "C"]) {
  for (let col = 1; col <= 5; col++) {
    DEFAULT_POSITIONS[`${row}${col}`] = { left: COL_LEFT[col], top: ROW_TOP[row] };
  }
}

interface ZoneOverlayProps {
  zoneId: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function ZoneOverlay({ zoneId, children, onClick, className = "" }: ZoneOverlayProps) {
  const pos = DEFAULT_POSITIONS[zoneId];
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

interface DraggableZoneOverlayProps {
  zoneId: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  position: { left: string; top: string };
  onDragEnd: (zoneId: string, left: string, top: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function DraggableZoneOverlay({ zoneId, children, onClick, className = "", position, onDragEnd, containerRef }: DraggableZoneOverlayProps) {
  const dragging = useRef(false);
  const didMove = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    didMove.current = false;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    didMove.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const left = ((e.clientX - rect.left) / rect.width) * 100;
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    const cLeft = Math.max(2, Math.min(98, left));
    const cTop = Math.max(2, Math.min(98, top));
    onDragEnd(zoneId, `${cLeft.toFixed(1)}%`, `${cTop.toFixed(1)}%`);
  }, [zoneId, onDragEnd, containerRef]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    if (!didMove.current && onClick) {
      onClick();
    }
    e.preventDefault();
  }, [onClick]);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ left: position.left, top: position.top }}
    >
      {children}
    </div>
  );
}

interface YardBlueprintMapProps {
  zones: { id: string }[];
  renderZone: (zone: { id: string }, Overlay: typeof ZoneOverlay) => ReactNode;
  draggable?: boolean;
  renderDraggableZone?: (zone: { id: string }, pos: { left: string; top: string }, containerRef: React.RefObject<HTMLDivElement | null>, onDragEnd: (id: string, l: string, t: string) => void) => ReactNode;
}

export { ZoneOverlay, DraggableZoneOverlay };

export function YardBlueprintMap({ zones, renderZone, draggable, renderDraggableZone }: YardBlueprintMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { left: string; top: string }>>(() => ({ ...DEFAULT_POSITIONS }));

  const handleDragEnd = useCallback((zoneId: string, left: string, top: string) => {
    setPositions((prev) => ({ ...prev, [zoneId]: { left, top } }));
  }, []);

  const handleReset = useCallback(() => {
    setPositions({ ...DEFAULT_POSITIONS });
  }, []);

  return (
    <div>
      <div ref={containerRef} className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
        <Image
          src="/yard-blueprint.png"
          alt="야적장 도면"
          fill
          className="object-contain pointer-events-none select-none"
          priority
        />
        {draggable && renderDraggableZone
          ? zones.map((zone) => renderDraggableZone(zone, positions[zone.id] || DEFAULT_POSITIONS[zone.id], containerRef, handleDragEnd))
          : zones.map((zone) => renderZone(zone, ZoneOverlay))
        }
      </div>
      {draggable && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleReset}
            className="bg-surface-container border border-outline-variant/20 px-4 py-2 font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            위치 초기화
          </button>
        </div>
      )}
    </div>
  );
}
