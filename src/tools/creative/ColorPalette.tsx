'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';
import { showToast } from '@/components/Toast';

export default function ColorPalette() {
  const [mood, setMood] = useState('');
  const [colors, setColors] = useState<{ hex: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `"${mood}" 무드에 맞는 컬러 팔레트 5개를 생성해주세요.\n` +
        `반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만:\n` +
        `[{"hex":"#FF5733","name":"색상 한국어 이름"},...]`
      );
      const match = res.match(/\[[\s\S]*\]/);
      if (match) {
        setColors(JSON.parse(match[0]));
      }
    } catch {
      setColors([
        { hex: '#6366f1', name: '인디고' }, { hex: '#ec4899', name: '핑크' },
        { hex: '#f59e0b', name: '앰버' }, { hex: '#10b981', name: '에메랄드' }, { hex: '#06b6d4', name: '시안' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      <label className="f-label">무드 키워드</label>
      <div className="f-row">
        <input className="f-input" style={{ flex: 1 }} placeholder="예: 따뜻한 카페, 미래적인, 자연" value={mood} onChange={e => setMood(e.target.value)} />
        <button className="f-btn" onClick={run} disabled={loading}>{loading ? '...' : '🎨 생성'}</button>
      </div>

      {colors.length > 0 && (
        <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {colors.map((c, i) => (
            <div key={i} onClick={() => { navigator.clipboard.writeText(c.hex); showToast(`${c.hex} 복사됨!`); }}
              style={{ height: 72, borderRadius: 10, background: c.hex, cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6 }}
              className="hover:scale-105">
              <span style={{ background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'monospace', color: '#fff' }}>{c.hex}</span>
            </div>
          ))}
        </div>
      )}
      {colors.length > 0 && (
        <div className="mt-2" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {colors.map((c, i) => (
            <span key={i} style={{ fontSize: 11, color: '#94a3b8' }}>{c.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
