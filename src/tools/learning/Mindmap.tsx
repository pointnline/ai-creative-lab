'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Mindmap() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `"${topic}" 주제로 마인드맵을 만들어주세요.\n\n` +
        `## 구조:\n- 중심 주제\n  - 가지 1 (4-5개 하위 항목)\n  - 가지 2 (4-5개 하위 항목)\n  - 가지 3 (4-5개 하위 항목)\n  - 가지 4 (4-5개 하위 항목)\n  - 가지 5 (4-5개 하위 항목)\n\n` +
        `각 가지는 다른 관점/측면을 다뤄주세요.\n들여쓰기 형식의 텍스트 마인드맵으로 작성하세요. 마크다운 형식.`
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
      <label className="f-label">마인드맵 주제</label>
      <input className="f-input" placeholder="예: 부동산 PF 투자 분석" value={topic} onChange={e => setTopic(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '🧠 AI 마인드맵 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 마인드맵을 구성 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
