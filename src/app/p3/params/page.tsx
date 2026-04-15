"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";

const PARAM_HISTORY = [
  { id: "PRM-0415-001", time: "14:30", temp: "185", pressure: "42.5", speed: "12.8", operator: "Kim J.", status: "정상" },
  { id: "PRM-0415-002", time: "13:15", temp: "190", pressure: "43.1", speed: "12.5", operator: "Park S.", status: "정상" },
  { id: "PRM-0415-003", time: "12:00", temp: "198", pressure: "46.2", speed: "11.9", operator: "Kim J.", status: "경고" },
  { id: "PRM-0415-004", time: "10:45", temp: "182", pressure: "41.8", speed: "13.0", operator: "Lee H.", status: "정상" },
  { id: "PRM-0415-005", time: "09:30", temp: "187", pressure: "42.0", speed: "12.6", operator: "Park S.", status: "정상" },
  { id: "PRM-0414-012", time: "17:00", temp: "210", pressure: "48.5", speed: "10.2", operator: "Kim J.", status: "알람" },
];

const TABLE_COLUMNS = [
  { key: "id", label: "기록 ID" },
  { key: "time", label: "시간" },
  { key: "temp", label: "온도 (\u00B0C)" },
  { key: "pressure", label: "압력 (MPa)" },
  { key: "speed", label: "속도 (m/min)" },
  { key: "operator", label: "작업자" },
  { key: "status", label: "상태" },
];

const SPEC_LIMITS = {
  temp: { min: 170, max: 200, unit: "\u00B0C", label: "온도" },
  pressure: { min: 38, max: 45, unit: "MPa", label: "압력" },
  speed: { min: 10, max: 15, unit: "m/min", label: "속도" },
};

export default function P3ParamsPage() {
  const [temp, setTemp] = useState("185");
  const [pressure, setPressure] = useState("42.5");
  const [speed, setSpeed] = useState("12.8");
  const [equipment, setEquipment] = useState("EQ-FRM-001");

  const getParamStatus = (value: number, spec: { min: number; max: number }) => {
    if (value < spec.min || value > spec.max) return "error";
    if (value < spec.min + (spec.max - spec.min) * 0.1 || value > spec.max - (spec.max - spec.min) * 0.1) return "warning";
    return "running";
  };

  return (
    <div>
      <PageHeader
        title="성형"
        accent="파라미터 기록"
        nodeRef="P3-PRM-001"
        status="MONITORING"
        description="성형 설비의 공정 파라미터(온도, 압력, 속도)를 기록합니다. 규격 이탈 시 경고가 표시됩니다."
      />

      {/* Equipment & Current Values */}
      <section className="mb-8">
        <div className="bg-surface-container-lowest p-6 md:p-8">
          <div className="mb-6">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block mb-3">
              설비
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-4 py-5 text-lg font-headline text-on-surface appearance-none cursor-pointer transition-colors"
            >
              <option value="EQ-FRM-001" className="bg-surface-container">EQ-FRM-001 - 성형 프레스 #1</option>
              <option value="EQ-FRM-002" className="bg-surface-container">EQ-FRM-002 - 성형 프레스 #2</option>
              <option value="EQ-FRM-003" className="bg-surface-container">EQ-FRM-003 - 성형 프레스 #3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Parameter Inputs */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Temperature */}
        <div className="bg-surface-container-lowest p-6 md:p-8 border-l-4 border-primary-accent">
          <div className="flex justify-between items-start mb-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              온도
            </label>
            <StatusBadge
              type={getParamStatus(parseFloat(temp) || 0, SPEC_LIMITS.temp)}
              label={getParamStatus(parseFloat(temp) || 0, SPEC_LIMITS.temp) === "running" ? "정상" : getParamStatus(parseFloat(temp) || 0, SPEC_LIMITS.temp) === "warning" ? "경고" : "알람"}
            />
          </div>
          <input
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-0 py-3 text-5xl font-black font-headline tabular-nums text-on-surface transition-colors"
          />
          <div className="flex justify-between mt-3">
            <span className="font-label text-xs text-on-surface-variant">
              규격: {SPEC_LIMITS.temp.min}-{SPEC_LIMITS.temp.max} {SPEC_LIMITS.temp.unit}
            </span>
            <span className="font-label text-xs text-on-surface-variant tabular-nums">
              {SPEC_LIMITS.temp.unit}
            </span>
          </div>
          {/* Mini trend bar */}
          <div className="flex items-end gap-1 h-12 mt-4">
            {[185, 190, 198, 182, 187, parseFloat(temp) || 0].map((v, i) => (
              <div
                key={i}
                className={`flex-1 transition-all ${
                  v > SPEC_LIMITS.temp.max ? "bg-error" : v > SPEC_LIMITS.temp.max - 3 ? "bg-[#f59e0b]" : "bg-primary-accent/60"
                }`}
                style={{ height: `${((v - 160) / 60) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-surface-container-lowest p-6 md:p-8 border-l-4 border-tertiary">
          <div className="flex justify-between items-start mb-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              압력
            </label>
            <StatusBadge
              type={getParamStatus(parseFloat(pressure) || 0, SPEC_LIMITS.pressure)}
              label={getParamStatus(parseFloat(pressure) || 0, SPEC_LIMITS.pressure) === "running" ? "정상" : "경고"}
            />
          </div>
          <input
            type="number"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
            step="0.1"
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-0 py-3 text-5xl font-black font-headline tabular-nums text-on-surface transition-colors"
          />
          <div className="flex justify-between mt-3">
            <span className="font-label text-xs text-on-surface-variant">
              규격: {SPEC_LIMITS.pressure.min}-{SPEC_LIMITS.pressure.max} {SPEC_LIMITS.pressure.unit}
            </span>
            <span className="font-label text-xs text-on-surface-variant tabular-nums">
              {SPEC_LIMITS.pressure.unit}
            </span>
          </div>
          <div className="flex items-end gap-1 h-12 mt-4">
            {[42.5, 43.1, 46.2, 41.8, 42.0, parseFloat(pressure) || 0].map((v, i) => (
              <div
                key={i}
                className={`flex-1 transition-all ${
                  v > SPEC_LIMITS.pressure.max ? "bg-error" : v > SPEC_LIMITS.pressure.max - 1 ? "bg-[#f59e0b]" : "bg-tertiary/60"
                }`}
                style={{ height: `${((v - 35) / 15) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Speed */}
        <div className="bg-surface-container-lowest p-6 md:p-8 border-l-4 border-[#f59e0b]">
          <div className="flex justify-between items-start mb-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              속도
            </label>
            <StatusBadge
              type={getParamStatus(parseFloat(speed) || 0, SPEC_LIMITS.speed)}
              label={getParamStatus(parseFloat(speed) || 0, SPEC_LIMITS.speed) === "running" ? "정상" : "경고"}
            />
          </div>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            step="0.1"
            className="w-full bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary-accent outline-none px-0 py-3 text-5xl font-black font-headline tabular-nums text-on-surface transition-colors"
          />
          <div className="flex justify-between mt-3">
            <span className="font-label text-xs text-on-surface-variant">
              규격: {SPEC_LIMITS.speed.min}-{SPEC_LIMITS.speed.max} {SPEC_LIMITS.speed.unit}
            </span>
            <span className="font-label text-xs text-on-surface-variant tabular-nums">
              {SPEC_LIMITS.speed.unit}
            </span>
          </div>
          <div className="flex items-end gap-1 h-12 mt-4">
            {[12.8, 12.5, 11.9, 13.0, 12.6, parseFloat(speed) || 0].map((v, i) => (
              <div
                key={i}
                className={`flex-1 transition-all ${
                  v < SPEC_LIMITS.speed.min ? "bg-error" : v < SPEC_LIMITS.speed.min + 1 ? "bg-[#f59e0b]" : "bg-[#f59e0b]/60"
                }`}
                style={{ height: `${((v - 8) / 10) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Record Button */}
      <section className="mb-8">
        <button className="w-full bg-primary-accent text-white px-8 py-5 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-accent/80 transition-colors active:scale-95">
          파라미터 기록
        </button>
      </section>

      {/* History Table */}
      <DataTable
        title="파라미터 이력"
        columns={TABLE_COLUMNS}
        data={PARAM_HISTORY}
        bufferCount={PARAM_HISTORY.length}
      />
    </div>
  );
}
