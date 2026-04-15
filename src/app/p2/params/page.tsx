"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FieldHeader } from "@/components/ui/FieldHeader";
import { DataTable } from "@/components/ui/DataTable";

const EQUIPMENT_IDS = ["TG-01", "TG-02", "TG-03", "TG-04", "TG-05", "TG-06", "TG-07"];

interface ParamSpec {
  name: string;
  unit: string;
  min: number;
  max: number;
  key: string;
}

const PARAM_SPECS: ParamSpec[] = [
  { name: "용접 온도", unit: "\u00B0C", min: 800, max: 1200, key: "temperature" },
  { name: "용접 압력", unit: "MPa", min: 2.0, max: 4.5, key: "pressure" },
  { name: "이송 속도", unit: "m/min", min: 8.0, max: 18.0, key: "speed" },
  { name: "와이어 장력", unit: "N", min: 150, max: 400, key: "tension" },
  { name: "용접 전류", unit: "A", min: 300, max: 500, key: "current" },
  { name: "용접 시간", unit: "ms", min: 10, max: 50, key: "weldTime" },
];

interface ParamRecord {
  id: string;
  equipment: string;
  timestamp: string;
  temperature: number;
  pressure: number;
  speed: number;
  tension: number;
  current: number;
  weldTime: number;
  operator: string;
}

const MOCK_HISTORY: ParamRecord[] = [
  { id: "PM-0415-012", equipment: "TG-01", timestamp: "14:30:00", temperature: 1050, pressure: 3.2, speed: 12.4, tension: 285, current: 420, weldTime: 28, operator: "Kim JH" },
  { id: "PM-0415-011", equipment: "TG-01", timestamp: "13:30:00", temperature: 1045, pressure: 3.1, speed: 12.5, tension: 280, current: 418, weldTime: 28, operator: "Kim JH" },
  { id: "PM-0415-010", equipment: "TG-01", timestamp: "12:30:00", temperature: 1060, pressure: 3.3, speed: 12.3, tension: 290, current: 425, weldTime: 29, operator: "Kim JH" },
  { id: "PM-0415-009", equipment: "TG-01", timestamp: "11:30:00", temperature: 1040, pressure: 3.2, speed: 12.6, tension: 275, current: 415, weldTime: 27, operator: "Kim JH" },
  { id: "PM-0415-008", equipment: "TG-01", timestamp: "10:30:00", temperature: 1055, pressure: 3.2, speed: 12.4, tension: 282, current: 422, weldTime: 28, operator: "Kim JH" },
  { id: "PM-0415-007", equipment: "TG-01", timestamp: "09:30:00", temperature: 1230, pressure: 3.4, speed: 12.2, tension: 295, current: 430, weldTime: 30, operator: "Kim JH" },
  { id: "PM-0415-006", equipment: "TG-01", timestamp: "08:30:00", temperature: 1035, pressure: 3.1, speed: 12.5, tension: 278, current: 416, weldTime: 27, operator: "Kim JH" },
  { id: "PM-0415-005", equipment: "TG-02", timestamp: "14:30:00", temperature: 980, pressure: 2.8, speed: 11.8, tension: 245, current: 380, weldTime: 24, operator: "Park SY" },
  { id: "PM-0415-004", equipment: "TG-02", timestamp: "13:30:00", temperature: 975, pressure: 2.7, speed: 11.9, tension: 240, current: 378, weldTime: 24, operator: "Park SY" },
  { id: "PM-0415-003", equipment: "TG-04", timestamp: "14:30:00", temperature: 920, pressure: 2.4, speed: 13.1, tension: 210, current: 345, weldTime: 20, operator: "Lee MJ" },
  { id: "PM-0415-002", equipment: "TG-04", timestamp: "13:30:00", temperature: 915, pressure: 2.5, speed: 13.0, tension: 215, current: 348, weldTime: 21, operator: "Lee MJ" },
  { id: "PM-0415-001", equipment: "TG-06", timestamp: "14:30:00", temperature: 990, pressure: 2.7, speed: 14.2, tension: 260, current: 375, weldTime: 25, operator: "Choi DH" },
];

const HISTORY_COLUMNS = [
  { key: "timestamp", label: "시간" },
  { key: "id", label: "기록 ID" },
  { key: "temperature", label: "온도 (\u00B0C)" },
  { key: "pressure", label: "압력 (MPa)" },
  { key: "speed", label: "속도 (m/min)" },
  { key: "tension", label: "장력 (N)" },
  { key: "current", label: "전류 (A)" },
  { key: "weldTime", label: "용접 (ms)" },
  { key: "operator", label: "작업자" },
];

export default function P2ParamsPage() {
  const [selectedEquip, setSelectedEquip] = useState("TG-01");
  const [formValues, setFormValues] = useState<Record<string, string>>({
    temperature: "",
    pressure: "",
    speed: "",
    tension: "",
    current: "",
    weldTime: "",
  });

  const filteredHistory = MOCK_HISTORY.filter((r) => r.equipment === selectedEquip);

  const isOutOfRange = (key: string, value: number) => {
    const spec = PARAM_SPECS.find((s) => s.key === key);
    if (!spec) return false;
    return value < spec.min || value > spec.max;
  };

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const outOfRange = PARAM_SPECS.filter((spec) => {
      const val = parseFloat(formValues[spec.key]);
      return !isNaN(val) && (val < spec.min || val > spec.max);
    });

    if (outOfRange.length > 0) {
      const warnings = outOfRange.map((s) => `${s.name}: ${formValues[s.key]} (range: ${s.min}-${s.max} ${s.unit})`).join("\n");
      if (!confirm(`범위 이탈 값이 감지되었습니다:\n${warnings}\n\n그래도 등록하시겠습니까?`)) return;
    }

    alert(`Parameters recorded for ${selectedEquip}`);
    setFormValues({ temperature: "", pressure: "", speed: "", tension: "", current: "", weldTime: "" });
  };

  return (
    <div>
      <PageHeader
        title="2공정 TG"
        accent="파라미터"
        nodeRef="SCR-P2-008"
        description="TG기의 공정 파라미터(온도, 압력, 속도, 장력 등)를 기록합니다. 규격 범위 이탈 시 자동 경고됩니다."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Parameter Input */}
        <div className="lg:col-span-1">
          <FieldHeader title="파라미터 기록" moduleRef="PARAM.INPUT" />

          <div className="mb-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-2">
              설비
            </label>
            <select
              value={selectedEquip}
              onChange={(e) => setSelectedEquip(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 text-sm font-headline text-on-surface focus:border-primary-accent focus:outline-none"
            >
              {EQUIPMENT_IDS.map((eq) => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {PARAM_SPECS.map((spec) => {
              const val = parseFloat(formValues[spec.key]);
              const oor = !isNaN(val) && isOutOfRange(spec.key, val);
              return (
                <div key={spec.key}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {spec.name} ({spec.unit})
                    </label>
                    <span className="font-label text-[11px] tracking-widest text-on-surface-variant opacity-60">
                      {spec.min} ~ {spec.max}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={formValues[spec.key]}
                    onChange={(e) => handleChange(spec.key, e.target.value)}
                    step={spec.key === "pressure" || spec.key === "speed" ? "0.1" : "1"}
                    placeholder={String((spec.min + spec.max) / 2)}
                    className={`w-full bg-surface-container-lowest px-3 py-2 text-sm font-headline text-on-surface focus:outline-none tabular-nums placeholder:text-on-surface-variant/30 border ${
                      oor
                        ? "border-2 border-error bg-error/5 text-error"
                        : "border-outline-variant/20 focus:border-primary-accent"
                    }`}
                  />
                  {oor && (
                    <p className="mt-1 font-label text-[11px] uppercase tracking-widest text-error">
                      범위 이탈 ({spec.min} ~ {spec.max} {spec.unit})
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full bg-primary-accent text-on-primary px-4 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors mt-6"
            >
              파라미터 기록
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2">
          <DataTable
            title={`파라미터 이력 - ${selectedEquip}`}
            columns={HISTORY_COLUMNS}
            data={filteredHistory.map((r) => ({
              timestamp: r.timestamp,
              id: r.id,
              temperature: isOutOfRange("temperature", r.temperature)
                ? `\u26A0 ${r.temperature}`
                : String(r.temperature),
              pressure: String(r.pressure),
              speed: String(r.speed),
              tension: String(r.tension),
              current: String(r.current),
              weldTime: String(r.weldTime),
              operator: r.operator,
            }))}
            bufferCount={filteredHistory.length}
          />

          {/* Parameter Ranges Reference */}
          <section className="mt-6 bg-surface-container-lowest">
            <div className="p-4 bg-surface-container-highest/30 border-l-4 border-tertiary">
              <h3 className="font-headline font-black text-xs uppercase tracking-widest">
                파라미터 규격
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PARAM_SPECS.map((spec) => (
                  <div key={spec.key} className="flex flex-col gap-1">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                      {spec.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-headline text-sm tabular-nums font-bold text-tertiary">
                        {spec.min}
                      </span>
                      <div className="flex-1 h-1 bg-surface-container relative">
                        <div className="absolute inset-0 bg-tertiary/30" />
                      </div>
                      <span className="font-headline text-sm tabular-nums font-bold text-tertiary">
                        {spec.max}
                      </span>
                      <span className="font-label text-[11px] text-on-surface-variant opacity-60">
                        {spec.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
