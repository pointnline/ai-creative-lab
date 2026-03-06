'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Feynman() {
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!concept.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `"${concept}" 개념을 파인만 기법(Feynman Technique)으로 설명해주세요.\n\n` +
        `## 4단계:\n` +
        `1. **개념 정의** - 전문용어 없이 한 문장으로\n` +
        `2. **쉬운 설명** - 초등학생도 이해할 수 있게\n` +
        `3. **비유/예시** - 일상생활 비유 3가지\n` +
        `4. **핵심 정리** - 3줄 요약\n\n` +
        `한국어로 친근하게 작성하세요. 마크다운 형식.`
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
      <label className="f-label">설명할 개념</label>
      <input className="f-input" placeholder="예: 블록체인, 양자역학, DCF, WACC" value={concept} onChange={e => setConcept(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '설명 생성 중...' : '🧑‍🏫 파인만 설명 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 쉬운 설명을 만들고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
