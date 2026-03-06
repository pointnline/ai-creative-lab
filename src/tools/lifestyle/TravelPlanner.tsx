'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function TravelPlanner() {
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('3');
  const [style, setStyle] = useState('balanced');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!dest.trim()) return;
    setLoading(true);
    try {
      const styleMap: Record<string, string> = { relaxed: '여유로운', balanced: '균형 잡힌', active: '활동적인', foodie: '미식 중심' };
      const res = await callGemini(
        `${dest} ${days}일 여행 일정을 만들어주세요.\n\n` +
        `- 스타일: ${styleMap[style]}\n\n` +
        `각 날짜별로:\n1. 오전/오후/저녁 일정\n2. 추천 장소 (구체적 이름)\n3. 예상 소요시간\n4. 이동 방법\n5. 예상 비용\n6. 맛집 추천\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">여행지</label>
      <input className="f-input" placeholder="예: 교토, 방콕, 제주도" value={dest} onChange={e => setDest(e.target.value)} />
      <div className="f-grid-2 mt-3">
        <div>
          <label className="f-label">일수</label>
          <select className="f-select" value={days} onChange={e => setDays(e.target.value)}>
            {[1,2,3,4,5,7,10,14].map(d => <option key={d} value={d}>{d}일</option>)}
          </select>
        </div>
        <div>
          <label className="f-label">스타일</label>
          <select className="f-select" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="relaxed">여유</option><option value="balanced">균형</option>
            <option value="active">활동적</option><option value="foodie">미식</option>
          </select>
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '일정 생성 중...' : '✈️ AI 일정 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 여행 일정을 만들고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
