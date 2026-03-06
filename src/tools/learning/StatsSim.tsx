'use client';

import { useState, useRef, useEffect } from 'react';

export default function StatsSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'normal' | 'histogram' | 'regression'>('normal');
  const [mean, setMean] = useState(50);
  const [std, setStd] = useState(15);

  useEffect(() => { draw(); }, [mode, mean, std]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const w = canvas.offsetWidth, h = 300;
    canvas.width = w * 2; canvas.height = h * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, w, h);

    // axes
    ctx.strokeStyle = '#252540';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, h - 30); ctx.lineTo(w - 10, h - 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 10); ctx.lineTo(40, h - 30); ctx.stroke();

    if (mode === 'normal') {
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < w - 50; x++) {
        const xVal = (x / (w - 50)) * 100;
        const z = (xVal - mean) / std;
        const yVal = Math.exp(-0.5 * z * z) / (std * Math.sqrt(2 * Math.PI));
        const py = h - 30 - yVal * std * (h - 50) * 0.4;
        x === 0 ? ctx.moveTo(40 + x, py) : ctx.lineTo(40 + x, py);
      }
      ctx.stroke();

      // fill area
      ctx.fillStyle = 'rgba(99,102,241,0.15)';
      ctx.beginPath();
      ctx.moveTo(40, h - 30);
      for (let x = 0; x < w - 50; x++) {
        const xVal = (x / (w - 50)) * 100;
        const z = (xVal - mean) / std;
        const yVal = Math.exp(-0.5 * z * z) / (std * Math.sqrt(2 * Math.PI));
        const py = h - 30 - yVal * std * (h - 50) * 0.4;
        ctx.lineTo(40 + x, py);
      }
      ctx.lineTo(w - 10, h - 30); ctx.closePath(); ctx.fill();

      ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter';
      ctx.fillText(`μ=${mean}`, mean / 100 * (w - 50) + 35, h - 14);
      ctx.fillText(`σ=${std}`, 50, 20);
    } else if (mode === 'histogram') {
      const data: number[] = [];
      for (let i = 0; i < 500; i++) {
        let u = 0; for (let j = 0; j < 12; j++) u += Math.random();
        data.push((u - 6) * std + mean);
      }
      const bins = 20;
      const counts = new Array(bins).fill(0);
      data.forEach(d => { const b = Math.floor(((d - (mean - 3 * std)) / (6 * std)) * bins); if (b >= 0 && b < bins) counts[b]++; });
      const maxC = Math.max(...counts, 1);
      const bw = (w - 50) / bins;
      counts.forEach((c, i) => {
        const bh = (c / maxC) * (h - 50);
        ctx.fillStyle = `hsl(${240 + i * 3}, 70%, 60%)`;
        ctx.fillRect(40 + i * bw, h - 30 - bh, bw - 1, bh);
      });
    } else {
      const points: [number, number][] = [];
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 80 + 10;
        const y = x * 0.7 + (Math.random() - 0.5) * std + 10;
        points.push([x, y]);
      }
      points.forEach(([px, py]) => {
        const sx = 40 + (px / 100) * (w - 50);
        const sy = h - 30 - (py / 100) * (h - 50);
        ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899'; ctx.fill();
      });
      // regression line
      const n = points.length;
      const sx = points.reduce((s, p) => s + p[0], 0);
      const sy = points.reduce((s, p) => s + p[1], 0);
      const sxy = points.reduce((s, p) => s + p[0] * p[1], 0);
      const sx2 = points.reduce((s, p) => s + p[0] * p[0], 0);
      const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
      const intercept = (sy - slope * sx) / n;
      ctx.beginPath(); ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2;
      const y0 = slope * 0 + intercept, y100 = slope * 100 + intercept;
      ctx.moveTo(40, h - 30 - (y0 / 100) * (h - 50));
      ctx.lineTo(w - 10, h - 30 - (y100 / 100) * (h - 50));
      ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter';
      ctx.fillText(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(1)}`, 50, 20);
    }
  };

  return (
    <div>
      <div className="f-row mb-3">
        {(['normal', 'histogram', 'regression'] as const).map(m => (
          <button key={m} className={`f-tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
            {m === 'normal' ? '정규분포' : m === 'histogram' ? '히스토그램' : '회귀분석'}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 300, borderRadius: 10, background: '#0a0a0f' }} />
      {mode !== 'regression' && (
        <div className="f-grid-2 mt-3">
          <div>
            <label className="f-label">평균 (μ): {mean}</label>
            <input type="range" min={10} max={90} value={mean} onChange={e => setMean(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div>
            <label className="f-label">표준편차 (σ): {std}</label>
            <input type="range" min={5} max={30} value={std} onChange={e => setStd(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>
      )}
      {mode === 'regression' && (
        <button className="f-btn f-full mt-3" onClick={draw}>새 데이터 생성</button>
      )}
    </div>
  );
}
