'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function PaperSummary() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 논문/학술 텍스트를 분석하여 구조화된 요약을 작성해주세요.\n\n` +
        `## 출력 형식:\n1. **제목/주제**\n2. **연구 목적**\n3. **방법론**\n4. **핵심 발견/결과**\n5. **결론 및 시사점**\n6. **키워드** (5-7개)\n7. **한줄 요약**\n\n` +
        `## 논문 내용:\n${text}`
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
      <label className="f-label">논문/학술 텍스트</label>
      <textarea className="f-textarea" rows={8} placeholder="논문 내용을 붙여넣으세요..." value={text} onChange={e => setText(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '분석 중...' : '📄 AI 논문 요약'}</button>
      {loading && <div className="ai-loading">Gemini가 논문을 분석 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
