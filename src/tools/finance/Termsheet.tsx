'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Termsheet() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 텀시트/투자조건 텍스트를 분석하여 핵심 투자조건을 구조화해주세요.\n\n` +
        `## 추출 항목:\n1. 투자 구조 (대출/지분/메자닌 등)\n2. 투자 금액\n3. 금리/수익률 조건\n4. 담보/보증 조건\n5. 상환 조건\n6. 재무약정 (Financial Covenants)\n7. 주요 선행조건\n8. 리스크 요소\n\n` +
        `## 텀시트 내용:\n${text}\n\n표 형식으로 정리하고, 주요 리스크/주의사항을 마지막에 별도로 정리해주세요.`
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
      <label className="f-label">텀시트/투자조건 텍스트</label>
      <textarea className="f-textarea" rows={8} placeholder="텀시트 내용을 붙여넣으세요..." value={text} onChange={e => setText(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '분석 중...' : '📑 AI 텀시트 분석'}</button>
      {loading && <div className="ai-loading">Gemini가 투자조건을 분석 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
