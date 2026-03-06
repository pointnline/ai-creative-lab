'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function GiftRecommender() {
  const [relation, setRelation] = useState('friend');
  const [age, setAge] = useState('30');
  const [budget, setBudget] = useState('5');
  const [occasion, setOccasion] = useState('birthday');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const relMap: Record<string, string> = { friend: '친구', partner: '연인', parent: '부모님', colleague: '직장동료', boss: '상사' };
      const occMap: Record<string, string> = { birthday: '생일', anniversary: '기념일', holiday: '명절', thanks: '감사', housewarming: '집들이' };
      const res = await callGemini(
        `선물을 추천해주세요.\n\n` +
        `- 대상: ${relMap[relation]} (${age}대)\n- 예산: ${budget}만원\n- 상황: ${occMap[occasion]}\n\n` +
        `5가지를 추천하고, 각각:\n1. 선물명\n2. 가격대\n3. 추천 이유\n4. 구매처/브랜드\n5. 포장/전달 팁\n\n마크다운 형식으로 작성하세요.`
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
      <div className="f-grid-2">
        <div>
          <label className="f-label">관계</label>
          <select className="f-select" value={relation} onChange={e => setRelation(e.target.value)}>
            <option value="friend">친구</option><option value="partner">연인</option>
            <option value="parent">부모님</option><option value="colleague">직장동료</option><option value="boss">상사</option>
          </select>
        </div>
        <div>
          <label className="f-label">연령대</label>
          <select className="f-select" value={age} onChange={e => setAge(e.target.value)}>
            <option value="20">20대</option><option value="30">30대</option>
            <option value="40">40대</option><option value="50">50대</option><option value="60">60대+</option>
          </select>
        </div>
        <div>
          <label className="f-label">예산 (만원)</label>
          <select className="f-select" value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="1">~1만원</option><option value="3">~3만원</option><option value="5">~5만원</option>
            <option value="10">~10만원</option><option value="30">~30만원</option><option value="50">50만원+</option>
          </select>
        </div>
        <div>
          <label className="f-label">상황</label>
          <select className="f-select" value={occasion} onChange={e => setOccasion(e.target.value)}>
            <option value="birthday">생일</option><option value="anniversary">기념일</option>
            <option value="holiday">명절</option><option value="thanks">감사</option><option value="housewarming">집들이</option>
          </select>
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '추천 중...' : '🎁 AI 선물 추천'}</button>
      {loading && <div className="ai-loading">Gemini가 선물을 고르고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
