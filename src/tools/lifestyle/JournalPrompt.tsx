'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function JournalPrompt() {
  const [category, setCategory] = useState('reflection');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const catMap: Record<string, string> = { reflection: '자기 성찰', gratitude: '감사', goals: '목표/성장', creativity: '창의력', relationships: '관계' };
      const res = await callGemini(
        `"${catMap[category]}" 주제로 저널/일기 쓰기 프롬프트 5개를 만들어주세요.\n\n` +
        `각 프롬프트는:\n1. 질문 (한 문장)\n2. 왜 이 질문이 중요한지 (한 줄 설명)\n3. 작성 팁 (어떻게 답할지 가이드)\n\n` +
        `깊이 있는 성찰을 유도하는 질문으로 만들어주세요. 마크다운 형식.`
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
      <label className="f-label">주제</label>
      <div className="f-row">
        {[
          ['reflection', '성찰'], ['gratitude', '감사'], ['goals', '목표'],
          ['creativity', '창의력'], ['relationships', '관계']
        ].map(([key, label]) => (
          <button key={key} className={`f-tab ${category === key ? 'active' : ''}`} onClick={() => setCategory(key)}>{label}</button>
        ))}
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '📔 AI 프롬프트 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 성찰 질문을 만들고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
