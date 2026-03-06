'use client';

import { useState } from 'react';

export default function DcfCalc() {
  const [fcf, setFcf] = useState('100');
  const [gr, setGr] = useState('5');
  const [wacc, setWacc] = useState('10');
  const [yr, setYr] = useState('10');
  const [tg, setTg] = useState('2');
  const [result, setResult] = useState<{ ev: number; pvSum: number; pvTV: number; tvRatio: number; cashflows: { yr: number; cf: string; pv: string }[] } | null>(null);

  const calc = () => {
    const f = parseFloat(fcf) || 0, g = (parseFloat(gr) || 0) / 100, w = (parseFloat(wacc) || 10) / 100, y = parseInt(yr) || 10, t = (parseFloat(tg) || 2) / 100;
    if (!f) return;
    let pvSum = 0;
    const cfs: { yr: number; cf: string; pv: string }[] = [];
    for (let i = 1; i <= y; i++) {
      const cf = f * Math.pow(1 + g, i);
      const pv = cf / Math.pow(1 + w, i);
      pvSum += pv;
      cfs.push({ yr: i, cf: cf.toFixed(1), pv: pv.toFixed(1) });
    }
    const termCF = f * Math.pow(1 + g, y) * (1 + t);
    const tv = termCF / (w - t);
    const pvTV = tv / Math.pow(1 + w, y);
    const ev = pvSum + pvTV;
    setResult({ ev, pvSum, pvTV, tvRatio: (pvTV / ev) * 100, cashflows: cfs });
  };

  return (
    <div>
      <div className="f-grid-2">
        <div><label className="f-label">FCF (억원)</label><input className="f-input" type="number" value={fcf} onChange={e => setFcf(e.target.value)} /></div>
        <div><label className="f-label">성장률 (%)</label><input className="f-input" type="number" value={gr} onChange={e => setGr(e.target.value)} /></div>
        <div><label className="f-label">WACC (%)</label><input className="f-input" type="number" value={wacc} onChange={e => setWacc(e.target.value)} /></div>
        <div><label className="f-label">추정기간 (년)</label><input className="f-input" type="number" value={yr} onChange={e => setYr(e.target.value)} /></div>
      </div>
      <div className="mt-3"><label className="f-label">영구성장률 (%)</label><input className="f-input" type="number" value={tg} onChange={e => setTg(e.target.value)} /></div>
      <button className="f-btn f-full mt-3" onClick={calc}>💰 DCF 계산</button>
      {result && (
        <div className="f-result">
          <div className="res-grid">
            <div className="res-card"><div className="res-val">{result.ev.toFixed(0)}억</div><div className="res-label">기업가치 (EV)</div></div>
            <div className="res-card"><div className="res-val">{result.pvSum.toFixed(0)}억</div><div className="res-label">추정기간 PV</div></div>
            <div className="res-card"><div className="res-val">{result.pvTV.toFixed(0)}억</div><div className="res-label">잔존가치 PV</div></div>
            <div className="res-card"><div className="res-val">{result.tvRatio.toFixed(1)}%</div><div className="res-label">잔존가치 비중</div></div>
          </div>
          <h4 style={{ color: '#a5b4fc', fontSize: 13, marginBottom: 8 }}>연도별 현금흐름</h4>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {result.cashflows.map(c => (
              <div key={c.yr} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', fontSize: 12, color: '#94a3b8' }}>
                <span>{c.yr}년차</span><span>FCF: {c.cf}억</span><span>PV: {c.pv}억</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
