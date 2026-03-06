'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

interface Card { q: string; a: string; }

export default function Flashcard() {
  const [text, setText] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 텍스트를 기반으로 플래시카드 8개를 생성해주세요.\n` +
        `반드시 아래 JSON 형식으로만 응답하세요:\n` +
        `[{"q":"질문","a":"답변"},...]`+
        `\n\n텍스트:\n${text}`
      );
      const match = res.match(/\[[\s\S]*\]/);
      if (match) {
        setCards(JSON.parse(match[0]));
        setCurrentIdx(0);
        setFlipped(false);
      }
    } catch {
      setCards([{ q: '오류가 발생했습니다', a: 'API 키를 확인해주세요' }]);
    }
    setLoading(false);
  };

  const card = cards[currentIdx];

  return (
    <div>
      <label className="f-label">학습 텍스트</label>
      <textarea className="f-textarea" rows={6} placeholder="학습할 내용을 붙여넣으세요..." value={text} onChange={e => setText(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={generate} disabled={loading}>{loading ? '생성 중...' : '🃏 AI 플래시카드 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 플래시카드를 만들고 있습니다...</div>}

      {cards.length > 0 && card && (
        <div className="mt-4">
          <div
            onClick={() => setFlipped(!flipped)}
            style={{
              background: flipped ? '#1a2e1a' : '#1e1e2e', border: `1px solid ${flipped ? '#10b98133' : '#252540'}`,
              borderRadius: 16, padding: 32, minHeight: 150, cursor: 'pointer', textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>{flipped ? '답변' : '질문'} (클릭하여 뒤집기)</div>
              <div style={{ fontSize: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{flipped ? card.a : card.q}</div>
            </div>
          </div>
          <div className="f-row mt-3" style={{ justifyContent: 'center' }}>
            <button className="f-btn f-btn-outline" disabled={currentIdx === 0} onClick={() => { setCurrentIdx(currentIdx - 1); setFlipped(false); }}>이전</button>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{currentIdx + 1} / {cards.length}</span>
            <button className="f-btn f-btn-outline" disabled={currentIdx === cards.length - 1} onClick={() => { setCurrentIdx(currentIdx + 1); setFlipped(false); }}>다음</button>
          </div>
        </div>
      )}
    </div>
  );
}
