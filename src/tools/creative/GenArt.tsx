'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'flow' | 'particle' | 'wave' | 'spiral';

export default function GenArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [mode, setMode] = useState<Mode>('flow');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 400 * 2;
    ctx.scale(2, 2);
    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth, h = 400;
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, w, h);
      t += 0.02;

      if (mode === 'flow') {
        for (let i = 0; i < 50; i++) {
          const x = (Math.sin(t + i * 0.3) * 0.5 + 0.5) * w;
          const y = (Math.cos(t * 0.7 + i * 0.2) * 0.5 + 0.5) * h;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${(t * 30 + i * 7) % 360}, 70%, 60%)`;
          ctx.fill();
        }
      } else if (mode === 'particle') {
        for (let i = 0; i < 30; i++) {
          const angle = t + (i / 30) * Math.PI * 2;
          const r = 50 + Math.sin(t * 2 + i) * 30;
          const x = w / 2 + Math.cos(angle) * r;
          const y = h / 2 + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${i * 12}, 80%, 65%)`;
          ctx.fill();
        }
      } else if (mode === 'wave') {
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          const y = h / 2 + Math.sin(x * 0.02 + t) * 40 + Math.sin(x * 0.01 + t * 1.5) * 20;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsl(${(t * 50) % 360}, 70%, 60%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        for (let i = 0; i < 200; i++) {
          const angle = i * 0.1 + t;
          const r = i * 0.8;
          const x = w / 2 + Math.cos(angle) * r;
          const y = h / 2 + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${i + t * 20}, 70%, 60%)`;
          ctx.fill();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mode]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'generative-art.png';
    a.href = canvas.toDataURL();
    a.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 400, borderRadius: 10, background: '#000', display: 'block' }} />
      <div className="f-row mt-3">
        {(['flow', 'particle', 'wave', 'spiral'] as Mode[]).map(m => (
          <button key={m} className={`f-tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
            {m === 'flow' ? '플로우' : m === 'particle' ? '파티클' : m === 'wave' ? '웨이브' : '스파이럴'}
          </button>
        ))}
        <button className="f-btn" style={{ marginLeft: 'auto', padding: '6px 14px', fontSize: 12 }} onClick={download}>📸 저장</button>
      </div>
    </div>
  );
}
