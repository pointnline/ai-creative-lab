'use client';

import { useState } from 'react';

export default function LtvDsr() {
  const [propertyVal, setPropertyVal] = useState('10');
  const [loanAmt, setLoanAmt] = useState('6');
  const [rate, setRate] = useState('4.5');
  const [term, setTerm] = useState('30');
  const [income, setIncome] = useState('8000');
  const [result, setResult] = useState<{ ltv: number; dsr: number; monthly: number; totalInterest: number } | null>(null);

  const calc = () => {
    const pv = parseFloat(propertyVal) || 0;
    const la = parseFloat(loanAmt) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseInt(term) || 30) * 12;
    const inc = parseFloat(income) || 0;
    if (!pv || !la) return;

    const ltv = (la / pv) * 100;
    const monthly = r > 0 ? (la * 10000 * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : (la * 10000) / n;
    const totalInterest = monthly * n - la * 10000;
    const annualRepay = monthly * 12;
    const dsr = inc > 0 ? (annualRepay / (inc * 10000)) * 100 : 0;

    setResult({ ltv, dsr, monthly: Math.round(monthly), totalInterest: Math.round(totalInterest) });
  };

  return (
    <div>
      <div className="f-grid-2">
        <div><label className="f-label">자산가치 (억)</label><input className="f-input" type="number" value={propertyVal} onChange={e => setPropertyVal(e.target.value)} /></div>
        <div><label className="f-label">대출금액 (억)</label><input className="f-input" type="number" value={loanAmt} onChange={e => setLoanAmt(e.target.value)} /></div>
        <div><label className="f-label">금리 (%)</label><input className="f-input" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} /></div>
        <div><label className="f-label">대출기간 (년)</label><input className="f-input" type="number" value={term} onChange={e => setTerm(e.target.value)} /></div>
      </div>
      <div className="mt-3"><label className="f-label">연소득 (만원)</label><input className="f-input" type="number" value={income} onChange={e => setIncome(e.target.value)} /></div>
      <button className="f-btn f-full mt-3" onClick={calc}>🏦 시뮬레이션</button>
      {result && (
        <div className="f-result">
          <div className="res-grid">
            <div className="res-card"><div className="res-val">{result.ltv.toFixed(1)}%</div><div className="res-label">LTV</div></div>
            <div className="res-card"><div className="res-val">{result.dsr.toFixed(1)}%</div><div className="res-label">DSR</div></div>
            <div className="res-card"><div className="res-val">{result.monthly.toLocaleString()}원</div><div className="res-label">월 상환액</div></div>
            <div className="res-card"><div className="res-val">{(result.totalInterest / 10000).toFixed(0)}만원</div><div className="res-label">총 이자</div></div>
          </div>
          <div style={{ fontSize: 11, color: result.ltv > 70 ? '#f87171' : result.ltv > 60 ? '#f59e0b' : '#4ade80', marginTop: 8 }}>
            LTV {result.ltv.toFixed(1)}% - {result.ltv > 70 ? '위험: 규제 초과 가능' : result.ltv > 60 ? '주의: 규제 근접' : '안전 범위'}
          </div>
          <div style={{ fontSize: 11, color: result.dsr > 40 ? '#f87171' : result.dsr > 30 ? '#f59e0b' : '#4ade80' }}>
            DSR {result.dsr.toFixed(1)}% - {result.dsr > 40 ? '위험: 상환 부담 과다' : result.dsr > 30 ? '주의: 상환 부담 높음' : '안전 범위'}
          </div>
        </div>
      )}
    </div>
  );
}
