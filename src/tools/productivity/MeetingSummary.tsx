'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function MeetingSummary() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!text.trim()) { setResult('<p style="color:#94a3b8">회의 내용을 입력해주세요.</p>'); return; }
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 회의 내용을 분석하여 한국어로 요약해주세요.\n\n` +
        `## 출력 형식:\n1. **핵심 요약** (3-5개 bullet point)\n2. **주요 결정사항**\n3. **액션 아이템** (담당자가 있으면 포함)\n4. **다음 단계**\n\n` +
        `## 회의 내용:\n${text}`
      );
      setResult(res);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'API 호출 실패';
      setResult(`<p style="color:#f87171">오류: ${msg}</p>`);
    }
    setLoading(false);
  };

  return (
    <div>
      <label className="f-label">회의 내용</label>
      <textarea className="f-textarea" rows={8} placeholder="회의 내용을 붙여넣으세요..." value={text} onChange={e => setText(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>
        {loading ? '분석 중...' : '📋 AI 요약하기'}
      </button>
      {loading && <div className="ai-loading">Gemini가 분석 중입니다...</div>}
      {result && !loading && (
        <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: formatMarkdown(result) }} />
      )}
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    .replace(/\n/g, '<br/>');
}
