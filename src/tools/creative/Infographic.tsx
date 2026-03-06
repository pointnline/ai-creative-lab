'use client';

import { useState } from 'react';

export default function Infographic() {
  const [dataInput, setDataInput] = useState('매출 45\n비용 30\n이익 15\n투자 10');
  const [chartType, setChartType] = useState('bar');

  const parseData = () => {
    return dataInput.split('\n').filter(l => l.trim()).map(l => {
      const parts = l.trim().split(/\s+/);
      const val = parseFloat(parts[parts.length - 1]) || 0;
      const label = parts.slice(0, -1).join(' ') || 'N/A';
      return { label, value: val };
    });
  };

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ef4444', '#84cc16'];
  const data = parseData();
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const total = data.reduce((s, d) => s + d.value, 0);

  const renderBar = () => (
    <svg viewBox="0 0 400 200" style={{ width: '100%', maxHeight: 300 }}>
      {data.map((d, i) => {
        const w = 400 / data.length - 10;
        const h = (d.value / maxVal) * 150;
        const x = i * (400 / data.length) + 5;
        return (
          <g key={i}>
            <rect x={x} y={180 - h} width={w} height={h} fill={colors[i % colors.length]} rx={4} opacity={0.85} />
            <text x={x + w / 2} y={195} textAnchor="middle" fill="#94a3b8" fontSize={10}>{d.label}</text>
            <text x={x + w / 2} y={175 - h} textAnchor="middle" fill="#e2e8f0" fontSize={10}>{d.value}</text>
          </g>
        );
      })}
    </svg>
  );

  const renderPie = () => {
    let cumAngle = 0;
    return (
      <svg viewBox="0 0 300 300" style={{ width: '100%', maxHeight: 300 }}>
        {data.map((d, i) => {
          const angle = (d.value / total) * 360;
          const startAngle = cumAngle;
          cumAngle += angle;
          const r = 120, cx = 150, cy = 150;
          const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
          const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
          const x2 = cx + r * Math.cos((startAngle + angle - 90) * Math.PI / 180);
          const y2 = cy + r * Math.sin((startAngle + angle - 90) * Math.PI / 180);
          const large = angle > 180 ? 1 : 0;
          const midAngle = (startAngle + angle / 2 - 90) * Math.PI / 180;
          const lx = cx + (r + 20) * Math.cos(midAngle);
          const ly = cy + (r + 20) * Math.sin(midAngle);
          return (
            <g key={i}>
              <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`} fill={colors[i % colors.length]} opacity={0.85} />
              <text x={lx} y={ly} textAnchor="middle" fill="#e2e8f0" fontSize={9}>{d.label} {((d.value / total) * 100).toFixed(0)}%</text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div>
      <label className="f-label">데이터 (이름 값, 줄바꿈 구분)</label>
      <textarea className="f-textarea" rows={5} value={dataInput} onChange={e => setDataInput(e.target.value)} />
      <div className="f-row mt-3">
        <button className={`f-tab ${chartType === 'bar' ? 'active' : ''}`} onClick={() => setChartType('bar')}>막대</button>
        <button className={`f-tab ${chartType === 'pie' ? 'active' : ''}`} onClick={() => setChartType('pie')}>파이</button>
      </div>
      <div className="f-result mt-3">
        {chartType === 'bar' ? renderBar() : renderPie()}
      </div>
    </div>
  );
}
