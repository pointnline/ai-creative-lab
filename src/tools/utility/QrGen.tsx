'use client';

import { useState, useRef, useEffect } from 'react';

export default function QrGen() {
  const [text, setText] = useState('https://pointnline.ai');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (text) generate(); }, [text]);

  const generate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;
    const ctx = canvas.getContext('2d')!;
    const size = 256;
    canvas.width = size; canvas.height = size;

    // Simple QR-like pattern (visual representation)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const modules = 25;
    const moduleSize = size / modules;

    // Generate deterministic pattern from text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = '#000000';

    // Position patterns (corners)
    const drawFinder = (x: number, y: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            ctx.fillRect((x + c) * moduleSize, (y + r) * moduleSize, moduleSize, moduleSize);
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    // Data modules
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8)) continue;
        const seed = (hash + r * 31 + c * 37 + r * c) & 0x7fffffff;
        if (seed % 3 !== 0) {
          ctx.fillRect(c * moduleSize, r * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'qrcode.png';
    a.href = canvas.toDataURL();
    a.click();
  };

  return (
    <div>
      <label className="f-label">텍스트 또는 URL</label>
      <input className="f-input" placeholder="https://..." value={text} onChange={e => setText(e.target.value)} />
      <div className="f-result mt-3" style={{ textAlign: 'center' }}>
        <canvas ref={canvasRef} style={{ width: 200, height: 200, borderRadius: 8, imageRendering: 'pixelated' }} />
        <div className="mt-3">
          <button className="f-btn" onClick={download}>📱 다운로드</button>
        </div>
        <p style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>* 시각적 QR 패턴입니다. 실제 스캔용은 qrcode 라이브러리를 추가하세요.</p>
      </div>
    </div>
  );
}
