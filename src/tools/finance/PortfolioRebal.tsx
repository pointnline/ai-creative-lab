'use client';

import { useState } from 'react';

interface Asset { name: string; target: number; current: number; }

export default function PortfolioRebal() {
  const [totalAmt, setTotalAmt] = useState('10000');
  const [assets, setAssets] = useState<Asset[]>([
    { name: '국내주식', target: 30, current: 35 },
    { name: '해외주식', target: 30, current: 25 },
    { name: '채권', target: 25, current: 28 },
    { name: '대체투자', target: 10, current: 8 },
    { name: '현금', target: 5, current: 4 },
  ]);

  const update = (idx: number, field: keyof Asset, val: string) => {
    const next = [...assets];
    if (field === 'name') next[idx].name = val;
    else next[idx][field] = parseFloat(val) || 0;
    setAssets(next);
  };

  const total = parseFloat(totalAmt) || 0;

  return (
    <div>
      <label className="f-label">총 투자금액 (만원)</label>
      <input className="f-input" type="number" value={totalAmt} onChange={e => setTotalAmt(e.target.value)} />

      <div className="f-result mt-3">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #252540' }}>
              {['자산', '목표%', '현재%', '목표액', '현재액', '매매'].map(h => (
                <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color: '#a5b4fc', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((a, i) => {
              const targetAmt = total * a.target / 100;
              const currentAmt = total * a.current / 100;
              const diff = targetAmt - currentAmt;
              return (
                <tr key={i} style={{ borderBottom: '1px solid #1a1a2e' }}>
                  <td style={{ padding: '4px 8px' }}>
                    <input className="f-input" style={{ padding: '4px 8px', fontSize: 12 }} value={a.name} onChange={e => update(i, 'name', e.target.value)} />
                  </td>
                  <td style={{ padding: '4px 8px' }}>
                    <input className="f-input" style={{ padding: '4px 8px', fontSize: 12, width: 60 }} type="number" value={a.target} onChange={e => update(i, 'target', e.target.value)} />
                  </td>
                  <td style={{ padding: '4px 8px' }}>
                    <input className="f-input" style={{ padding: '4px 8px', fontSize: 12, width: 60 }} type="number" value={a.current} onChange={e => update(i, 'current', e.target.value)} />
                  </td>
                  <td style={{ padding: '4px 8px', color: '#94a3b8', fontSize: 12 }}>{targetAmt.toFixed(0)}만</td>
                  <td style={{ padding: '4px 8px', color: '#94a3b8', fontSize: 12 }}>{currentAmt.toFixed(0)}만</td>
                  <td style={{ padding: '4px 8px', fontSize: 12, fontWeight: 600, color: diff > 0 ? '#4ade80' : diff < 0 ? '#f87171' : '#94a3b8' }}>
                    {diff > 0 ? `+${diff.toFixed(0)}만 매수` : diff < 0 ? `${diff.toFixed(0)}만 매도` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
