'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Recipe() {
  const [ingredients, setIngredients] = useState('');
  const [maxCal, setMaxCal] = useState('500');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await callGemini(
        `한식 레시피를 추천해주세요.\n\n` +
        `- 사용 가능한 재료: ${ingredients || '특별히 없음 (아무거나 추천)'}\n` +
        `- 칼로리 제한: ${maxCal}kcal 이하\n\n` +
        `3개 레시피를 추천하고, 각각:\n1. 요리명\n2. 칼로리\n3. 재료 목록\n4. 간단한 조리법 (5단계 이내)\n5. 팁\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">사용 가능한 재료 (쉼표 구분)</label>
      <input className="f-input" placeholder="예: 닭가슴살, 양파, 계란" value={ingredients} onChange={e => setIngredients(e.target.value)} />
      <div className="mt-3">
        <label className="f-label">최대 칼로리 (kcal)</label>
        <input className="f-input" type="number" value={maxCal} onChange={e => setMaxCal(e.target.value)} />
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '추천 중...' : '🍳 AI 레시피 추천'}</button>
      {loading && <div className="ai-loading">Gemini가 레시피를 찾고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
