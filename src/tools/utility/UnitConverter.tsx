'use client';

import { useState } from 'react';

const UNITS: Record<string, { name: string; conversions: { label: string; factor: number }[] }> = {
  length: {
    name: '길이',
    conversions: [
      { label: 'm (미터)', factor: 1 }, { label: 'km', factor: 0.001 }, { label: 'cm', factor: 100 },
      { label: 'mm', factor: 1000 }, { label: 'ft (피트)', factor: 3.28084 }, { label: 'in (인치)', factor: 39.3701 },
      { label: '리 (里)', factor: 0.000255 }, { label: '자 (尺)', factor: 3.3 },
    ],
  },
  weight: {
    name: '무게',
    conversions: [
      { label: 'kg', factor: 1 }, { label: 'g', factor: 1000 }, { label: 'lb (파운드)', factor: 2.20462 },
      { label: 'oz (온스)', factor: 35.274 }, { label: '근 (斤)', factor: 1.667 }, { label: '관 (貫)', factor: 0.2667 },
    ],
  },
  area: {
    name: '면적',
    conversions: [
      { label: 'm²', factor: 1 }, { label: '평', factor: 0.3025 }, { label: '㎢', factor: 0.000001 },
      { label: 'ha (헥타르)', factor: 0.0001 }, { label: 'ft²', factor: 10.7639 }, { label: '에이커', factor: 0.000247 },
    ],
  },
  temperature: {
    name: '온도',
    conversions: [], // handled separately
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('1');
  const [tempUnit, setTempUnit] = useState<'C' | 'F' | 'K'>('C');

  const renderConversions = () => {
    const v = parseFloat(value) || 0;
    if (category === 'temperature') {
      let c: number, f: number, k: number;
      if (tempUnit === 'C') { c = v; f = v * 9 / 5 + 32; k = v + 273.15; }
      else if (tempUnit === 'F') { c = (v - 32) * 5 / 9; f = v; k = (v - 32) * 5 / 9 + 273.15; }
      else { c = v - 273.15; f = (v - 273.15) * 9 / 5 + 32; k = v; }
      return [
        { label: '°C (섭씨)', value: c.toFixed(2) },
        { label: '°F (화씨)', value: f.toFixed(2) },
        { label: 'K (켈빈)', value: k.toFixed(2) },
      ];
    }
    const unit = UNITS[category];
    return unit.conversions.map(c => ({ label: c.label, value: (v * c.factor).toFixed(4).replace(/\.?0+$/, '') }));
  };

  return (
    <div>
      <div className="f-row mb-3">
        {Object.entries(UNITS).map(([key, u]) => (
          <button key={key} className={`f-tab ${category === key ? 'active' : ''}`} onClick={() => setCategory(key)}>{u.name}</button>
        ))}
      </div>
      <div className="f-row">
        <input className="f-input" type="number" style={{ flex: 1 }} value={value} onChange={e => setValue(e.target.value)} />
        {category === 'temperature' && (
          <select className="f-select" style={{ width: 'auto' }} value={tempUnit} onChange={e => setTempUnit(e.target.value as 'C' | 'F' | 'K')}>
            <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
          </select>
        )}
      </div>
      <div className="f-result mt-3">
        {renderConversions().map((c, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1a1a2e', fontSize: 13 }}>
            <span style={{ color: '#94a3b8' }}>{c.label}</span>
            <span style={{ color: '#e2e8f0', fontWeight: 600, fontFamily: 'monospace' }}>{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
