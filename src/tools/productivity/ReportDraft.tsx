'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function ReportDraft() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [format, setFormat] = useState('business');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const formatMap: Record<string, string> = { business: '비즈니스 보고서', research: '리서치 보고서', proposal: '제안서', memo: '업무 메모' };
      const res = await callGemini(
        `${formatMap[format]} 초안을 작성해주세요.\n\n` +
        `- 주제: ${topic}\n- 키워드/데이터: ${keywords || '없음'}\n\n` +
        `구조:\n1. 제목\n2. 요약 (Executive Summary)\n3. 배경/현황\n4. 분석/본론 (데이터 기반)\n5. 결론 및 제언\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">보고서 주제</label>
      <input className="f-input" placeholder="예: 2026년 부동산 PF 시장 전망" value={topic} onChange={e => setTopic(e.target.value)} />
      <div className="mt-3">
        <label className="f-label">키워드/핵심 데이터</label>
        <textarea className="f-textarea" rows={3} placeholder="포함할 키워드나 수치 (쉼표 구분)" value={keywords} onChange={e => setKeywords(e.target.value)} />
      </div>
      <div className="mt-3">
        <label className="f-label">보고서 유형</label>
        <select className="f-select" value={format} onChange={e => setFormat(e.target.value)}>
          <option value="business">비즈니스 보고서</option><option value="research">리서치 보고서</option>
          <option value="proposal">제안서</option><option value="memo">업무 메모</option>
        </select>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '작성 중...' : '📝 보고서 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 보고서를 작성 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
