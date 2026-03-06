'use client';

import { useState } from 'react';

export default function FinancialRatios() {
  const [revenue, setRevenue] = useState('1000');
  const [cogs, setCogs] = useState('600');
  const [opIncome, setOpIncome] = useState('150');
  const [netIncome, setNetIncome] = useState('100');
  const [totalAssets, setTotalAssets] = useState('2000');
  const [totalEquity, setTotalEquity] = useState('800');
  const [totalDebt, setTotalDebt] = useState('1200');
  const [currentAssets, setCurrentAssets] = useState('500');
  const [currentLiab, setCurrentLiab] = useState('300');

  const r = parseFloat(revenue) || 1;
  const ni = parseFloat(netIncome) || 0;
  const ta = parseFloat(totalAssets) || 1;
  const te = parseFloat(totalEquity) || 1;
  const td = parseFloat(totalDebt) || 0;

  const ratios = [
    { label: '매출총이익률', value: ((r - (parseFloat(cogs) || 0)) / r * 100).toFixed(1) + '%', color: '#4ade80' },
    { label: '영업이익률', value: ((parseFloat(opIncome) || 0) / r * 100).toFixed(1) + '%', color: '#6366f1' },
    { label: '순이익률', value: (ni / r * 100).toFixed(1) + '%', color: '#ec4899' },
    { label: 'ROA', value: (ni / ta * 100).toFixed(1) + '%', color: '#f59e0b' },
    { label: 'ROE', value: (ni / te * 100).toFixed(1) + '%', color: '#06b6d4' },
    { label: '부채비율', value: (td / te * 100).toFixed(1) + '%', color: td / te > 2 ? '#f87171' : '#4ade80' },
    { label: '유동비율', value: ((parseFloat(currentAssets) || 0) / (parseFloat(currentLiab) || 1) * 100).toFixed(1) + '%', color: '#8b5cf6' },
    { label: '자기자본비율', value: (te / ta * 100).toFixed(1) + '%', color: '#10b981' },
  ];

  return (
    <div>
      <div className="f-grid-2">
        <div><label className="f-label">매출 (억)</label><input className="f-input" type="number" value={revenue} onChange={e => setRevenue(e.target.value)} /></div>
        <div><label className="f-label">매출원가 (억)</label><input className="f-input" type="number" value={cogs} onChange={e => setCogs(e.target.value)} /></div>
        <div><label className="f-label">영업이익 (억)</label><input className="f-input" type="number" value={opIncome} onChange={e => setOpIncome(e.target.value)} /></div>
        <div><label className="f-label">순이익 (억)</label><input className="f-input" type="number" value={netIncome} onChange={e => setNetIncome(e.target.value)} /></div>
        <div><label className="f-label">총자산 (억)</label><input className="f-input" type="number" value={totalAssets} onChange={e => setTotalAssets(e.target.value)} /></div>
        <div><label className="f-label">자기자본 (억)</label><input className="f-input" type="number" value={totalEquity} onChange={e => setTotalEquity(e.target.value)} /></div>
        <div><label className="f-label">총부채 (억)</label><input className="f-input" type="number" value={totalDebt} onChange={e => setTotalDebt(e.target.value)} /></div>
        <div><label className="f-label">유동자산 (억)</label><input className="f-input" type="number" value={currentAssets} onChange={e => setCurrentAssets(e.target.value)} /></div>
      </div>
      <div className="mt-1"><label className="f-label">유동부채 (억)</label><input className="f-input" type="number" value={currentLiab} onChange={e => setCurrentLiab(e.target.value)} /></div>

      <div className="f-result mt-3">
        <div className="res-grid">
          {ratios.map((r, i) => (
            <div key={i} className="res-card">
              <div className="res-val" style={{ color: r.color }}>{r.value}</div>
              <div className="res-label">{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
