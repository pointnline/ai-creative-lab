'use client';

import { useState } from 'react';

export default function TextDiff() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diff, setDiff] = useState<{ type: string; text: string }[]>([]);

  const compare = () => {
    const a = textA.split('\n');
    const b = textB.split('\n');
    const result: { type: string; text: string }[] = [];
    const max = Math.max(a.length, b.length);

    for (let i = 0; i < max; i++) {
      const la = a[i] ?? '';
      const lb = b[i] ?? '';
      if (la === lb) {
        result.push({ type: 'same', text: la });
      } else {
        if (la) result.push({ type: 'del', text: la });
        if (lb) result.push({ type: 'add', text: lb });
      }
    }
    setDiff(result);
  };

  return (
    <div>
      <div className="f-grid-2">
        <div>
          <label className="f-label">원본 텍스트</label>
          <textarea className="f-textarea" rows={8} placeholder="원본 텍스트..." value={textA} onChange={e => setTextA(e.target.value)} />
        </div>
        <div>
          <label className="f-label">수정된 텍스트</label>
          <textarea className="f-textarea" rows={8} placeholder="수정된 텍스트..." value={textB} onChange={e => setTextB(e.target.value)} />
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={compare}>🔍 비교하기</button>

      {diff.length > 0 && (
        <div className="f-result mt-3">
          <h4 style={{ color: '#a5b4fc', marginBottom: 8, fontSize: 13 }}>비교 결과</h4>
          {diff.map((d, i) => (
            <div key={i} style={{
              padding: '2px 6px', fontFamily: 'monospace', fontSize: 12, borderRadius: 3, margin: '1px 0',
              background: d.type === 'add' ? 'rgba(34,197,94,0.12)' : d.type === 'del' ? 'rgba(239,68,68,0.12)' : 'transparent',
              color: d.type === 'add' ? '#4ade80' : d.type === 'del' ? '#f87171' : '#94a3b8',
            }}>
              {d.type === 'add' ? '+ ' : d.type === 'del' ? '- ' : '  '}{d.text || '(빈 줄)'}
            </div>
          ))}
          <p style={{ color: '#64748b', fontSize: 11, marginTop: 10 }}>
            추가: {diff.filter(d => d.type === 'add').length}줄 / 삭제: {diff.filter(d => d.type === 'del').length}줄 / 동일: {diff.filter(d => d.type === 'same').length}줄
          </p>
        </div>
      )}
    </div>
  );
}
