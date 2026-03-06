'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/Toast';

export default function CssArt() {
  const [artType, setArtType] = useState('gradient');
  const [color1, setColor1] = useState('#6366f1');
  const [complexity, setComplexity] = useState(50);
  const [cssCode, setCssCode] = useState('');
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => { render(); }, [artType, color1, complexity]);

  const render = () => {
    let css: React.CSSProperties = {};
    let code = '';

    if (artType === 'gradient') {
      css = { background: `conic-gradient(from ${complexity * 3.6}deg, ${color1}, ${color1}88, #ec4899, ${color1})`, borderRadius: `${complexity}%` };
      code = `background: conic-gradient(from ${complexity * 3.6}deg, ${color1}, ${color1}88, #ec4899, ${color1});\nborder-radius: ${complexity}%;`;
    } else if (artType === 'pattern') {
      css = {
        background: `repeating-linear-gradient(${complexity * 1.8}deg, ${color1}22 0px, ${color1}22 ${2 + complexity / 10}px, transparent ${2 + complexity / 10}px, transparent ${4 + complexity / 5}px)`,
        backgroundColor: '#1a1a2e',
      };
      code = `background: repeating-linear-gradient(...);\nbackground-color: #1a1a2e;`;
    } else if (artType === 'shadow') {
      const shadows = Array.from({ length: Math.floor(complexity / 10) + 3 }, (_, i) => {
        const x = Math.sin(i * 0.8) * (i * 4);
        const y = Math.cos(i * 0.8) * (i * 4);
        return `${x}px ${y}px 0 ${color1}${(80 - i * 5).toString(16).padStart(2, '0')}`;
      }).join(', ');
      css = { width: 40, height: 40, borderRadius: '50%', background: color1, boxShadow: shadows, margin: '80px auto' };
      code = `box-shadow: ${shadows.slice(0, 100)}...;`;
    } else {
      css = {
        background: `radial-gradient(circle at ${complexity}% ${100 - complexity}%, ${color1}, transparent 50%), radial-gradient(circle at ${100 - complexity}% ${complexity}%, #ec4899, transparent 50%)`,
        backgroundColor: '#0a0a1a', borderRadius: 12,
      };
      code = `background: radial-gradient(...), radial-gradient(...);\nbackground-color: #0a0a1a;`;
    }

    setStyle(css);
    setCssCode(code);
  };

  return (
    <div>
      <div style={{ ...style, width: '100%', height: 180, borderRadius: style.borderRadius || 12, transition: 'all 0.3s' }} />
      <div className="f-row mt-3">
        <select className="f-select" style={{ width: 'auto' }} value={artType} onChange={e => setArtType(e.target.value)}>
          <option value="gradient">그라디언트</option><option value="pattern">패턴</option>
          <option value="shadow">쉐도우</option><option value="blend">블렌드</option>
        </select>
        <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: 36, height: 36, border: 'none', borderRadius: 8, cursor: 'pointer' }} />
        <input type="range" min={0} max={100} value={complexity} onChange={e => setComplexity(Number(e.target.value))} style={{ flex: 1 }} />
        <button className="f-btn" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => { navigator.clipboard.writeText(cssCode); showToast('CSS 복사됨!'); }}>복사</button>
      </div>
      <pre style={{ background: '#1e1e2e', padding: 10, borderRadius: 8, fontSize: 11, overflowX: 'auto', marginTop: 10, whiteSpace: 'pre-wrap', color: '#a5b4fc' }}>
        {cssCode}
      </pre>
    </div>
  );
}
