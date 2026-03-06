'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function WineMatch() {
  const [food, setFood] = useState('');
  const [mood, setMood] = useState('romantic');
  const [type, setType] = useState('wine');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!food.trim()) return;
    setLoading(true);
    try {
      const moodMap: Record<string, string> = { romantic: '로맨틱', party: '파티', business: '비즈니스', relaxed: '편안한 홈' };
      const res = await callGemini(
        `${type === 'wine' ? '와인' : '위스키'} 추천을 해주세요.\n\n` +
        `- 음식: ${food}\n- 분위기: ${moodMap[mood]}\n\n` +
        `3가지를 추천하고, 각각:\n1. 이름 (원산지/지역)\n2. 특징 (맛/향 프로필)\n3. 페어링 이유\n4. 가격대\n5. 대안 옵션 1개\n\n마크다운 형식으로 작성하세요.`
      );
      setResult(res);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'API 호출 실패';
      setResult(`오류: ${msg}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <label className="f-label">음식/안주</label>
      <input className="f-input" placeholder="예: 스테이크, 치즈, 한우" value={food} onChange={e => setFood(e.target.value)} />
      <div className="f-grid-2 mt-3">
        <div>
          <label className="f-label">종류</label>
          <select className="f-select" value={type} onChange={e => setType(e.target.value)}>
            <option value="wine">와인</option><option value="whiskey">위스키</option>
          </select>
        </div>
        <div>
          <label className="f-label">분위기</label>
          <select className="f-select" value={mood} onChange={e => setMood(e.target.value)}>
            <option value="romantic">로맨틱</option><option value="party">파티</option>
            <option value="business">비즈니스</option><option value="relaxed">편안한 홈</option>
          </select>
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '추천 중...' : '🍷 AI 매칭'}</button>
      {loading && <div className="ai-loading">Gemini가 페어링을 분석 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
