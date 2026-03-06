'use client';

import { useState } from 'react';

const STOCKS = [
  { name: '삼성전자', ticker: '005930', sector: 'tech', per: 12.5, pbr: 1.3, cap: 400, div: 2.1 },
  { name: 'SK하이닉스', ticker: '000660', sector: 'tech', per: 8.2, pbr: 1.5, cap: 120, div: 1.0 },
  { name: 'NAVER', ticker: '035420', sector: 'tech', per: 28.5, pbr: 1.8, cap: 40, div: 0.5 },
  { name: '카카오', ticker: '035720', sector: 'tech', per: 35.2, pbr: 2.1, cap: 20, div: 0.2 },
  { name: '현대차', ticker: '005380', sector: 'mfg', per: 6.8, pbr: 0.7, cap: 45, div: 3.5 },
  { name: '기아', ticker: '000270', sector: 'mfg', per: 5.2, pbr: 0.8, cap: 35, div: 4.2 },
  { name: 'KB금융', ticker: '105560', sector: 'finance', per: 5.5, pbr: 0.5, cap: 22, div: 5.0 },
  { name: '신한지주', ticker: '055550', sector: 'finance', per: 5.8, pbr: 0.4, cap: 20, div: 5.2 },
  { name: '하나금융', ticker: '086790', sector: 'finance', per: 4.8, pbr: 0.4, cap: 15, div: 6.0 },
  { name: 'POSCO홀딩스', ticker: '005490', sector: 'mfg', per: 8.5, pbr: 0.6, cap: 20, div: 3.8 },
  { name: 'LG화학', ticker: '051910', sector: 'mfg', per: 22.3, pbr: 1.2, cap: 30, div: 1.5 },
  { name: 'LG전자', ticker: '066570', sector: 'tech', per: 11.2, pbr: 0.8, cap: 15, div: 2.2 },
  { name: 'SK텔레콤', ticker: '017670', sector: 'tech', per: 10.5, pbr: 0.9, cap: 12, div: 4.0 },
  { name: 'KT', ticker: '030200', sector: 'tech', per: 8.8, pbr: 0.6, cap: 8, div: 4.5 },
  { name: '삼성생명', ticker: '032830', sector: 'finance', per: 7.2, pbr: 0.4, cap: 15, div: 3.5 },
  { name: '유한양행', ticker: '000100', sector: 'bio', per: 45.2, pbr: 3.8, cap: 6, div: 0.5 },
  { name: '셀트리온', ticker: '068270', sector: 'bio', per: 38.5, pbr: 4.2, cap: 25, div: 0.3 },
  { name: '카카오뱅크', ticker: '323410', sector: 'finance', per: 30.2, pbr: 2.5, cap: 10, div: 0.0 },
  { name: '크래프톤', ticker: '259960', sector: 'tech', per: 18.5, pbr: 1.8, cap: 12, div: 1.2 },
  { name: 'CJ제일제당', ticker: '097950', sector: 'consumer', per: 12.5, pbr: 0.7, cap: 8, div: 1.5 },
];

export default function StockScreener() {
  const [sector, setSector] = useState('all');
  const [maxPer, setMaxPer] = useState('50');
  const [maxPbr, setMaxPbr] = useState('5');
  const [minDiv, setMinDiv] = useState('0');

  const filtered = STOCKS.filter(s => {
    if (sector !== 'all' && s.sector !== sector) return false;
    if (s.per > parseFloat(maxPer)) return false;
    if (s.pbr > parseFloat(maxPbr)) return false;
    if (s.div < parseFloat(minDiv)) return false;
    return true;
  }).sort((a, b) => b.cap - a.cap);

  return (
    <div>
      <div className="f-grid-2">
        <div>
          <label className="f-label">섹터</label>
          <select className="f-select" value={sector} onChange={e => setSector(e.target.value)}>
            <option value="all">전체</option><option value="tech">테크</option><option value="finance">금융</option>
            <option value="mfg">제조</option><option value="bio">바이오</option><option value="consumer">소비재</option>
          </select>
        </div>
        <div><label className="f-label">PER 최대</label><input className="f-input" type="number" value={maxPer} onChange={e => setMaxPer(e.target.value)} /></div>
        <div><label className="f-label">PBR 최대</label><input className="f-input" type="number" value={maxPbr} onChange={e => setMaxPbr(e.target.value)} /></div>
        <div><label className="f-label">배당률 최소 (%)</label><input className="f-input" type="number" value={minDiv} onChange={e => setMinDiv(e.target.value)} /></div>
      </div>
      <div className="f-result mt-3">
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{filtered.length}개 종목</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #252540' }}>
                {['종목', 'PER', 'PBR', '시총(조)', '배당률'].map(h => (
                  <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color: '#a5b4fc', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.ticker} style={{ borderBottom: '1px solid #1a1a2e' }}>
                  <td style={{ padding: '6px 8px', color: '#e2e8f0' }}>{s.name}</td>
                  <td style={{ padding: '6px 8px', color: s.per < 10 ? '#4ade80' : '#94a3b8' }}>{s.per}</td>
                  <td style={{ padding: '6px 8px', color: s.pbr < 1 ? '#4ade80' : '#94a3b8' }}>{s.pbr}</td>
                  <td style={{ padding: '6px 8px', color: '#94a3b8' }}>{s.cap}조</td>
                  <td style={{ padding: '6px 8px', color: s.div >= 3 ? '#4ade80' : '#94a3b8' }}>{s.div}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
