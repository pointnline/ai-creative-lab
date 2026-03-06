'use client';

import { useState } from 'react';

export default function CapRate() {
  const [revenue, setRevenue] = useState('120');
  const [vacancy, setVacancy] = useState('5');
  const [opex, setOpex] = useState('30');
  const [value, setValue] = useState('1500');
  const [result, setResult] = useState<{ egi: number; noi: number; capRate: number; noiYield: number } | null>(null);

  const calc = () => {
    const rev = parseFloat(revenue) || 0;
    const vac = (parseFloat(vacancy) || 0) / 100;
    const op = parseFloat(opex) || 0;
    const val = parseFloat(value) || 0;
    if (!rev || !val) return;

    const egi = rev * (1 - vac);
    const noi = egi - op;
    const capRate = (noi / val) * 100;
    const noiYield = (noi / rev) * 100;
    setResult({ egi, noi, capRate, noiYield });
  };

  return (
    <div>
      <div className="f-grid-2">
        <div><label className="f-label">연간 임대수익 (억)</label><input className="f-input" type="number" value={revenue} onChange={e => setRevenue(e.target.value)} /></div>
        <div><label className="f-label">공실률 (%)</label><input className="f-input" type="number" value={vacancy} onChange={e => setVacancy(e.target.value)} /></div>
        <div><label className="f-label">운영비용 (억)</label><input className="f-input" type="number" value={opex} onChange={e => setOpex(e.target.value)} /></div>
        <div><label className="f-label">자산가치 (억)</label><input className="f-input" type="number" value={value} onChange={e => setValue(e.target.value)} /></div>
      </div>
      <button className="f-btn f-full mt-3" onClick={calc}>🏢 분석하기</button>
      {result && (
        <div className="f-result">
          <div className="res-grid">
            <div className="res-card"><div className="res-val">{result.capRate.toFixed(2)}%</div><div className="res-label">Cap Rate</div></div>
            <div className="res-card"><div className="res-val">{result.noi.toFixed(1)}억</div><div className="res-label">NOI</div></div>
            <div className="res-card"><div className="res-val">{result.egi.toFixed(1)}억</div><div className="res-label">EGI</div></div>
            <div className="res-card"><div className="res-val">{result.noiYield.toFixed(1)}%</div><div className="res-label">NOI 수익률</div></div>
          </div>
        </div>
      )}
    </div>
  );
}
