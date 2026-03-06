'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function EmailWriter() {
  const [recipient, setRecipient] = useState('boss');
  const [purpose, setPurpose] = useState('request');
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('formal');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const recipientMap: Record<string, string> = { boss: '상사', peer: '동료', client: '거래처', customer: '고객' };
  const purposeMap: Record<string, string> = { request: '요청', report: '보고', thanks: '감사', apology: '사과', info: '안내' };

  const run = async () => {
    if (!content.trim()) { setResult('내용을 입력해주세요.'); return; }
    setLoading(true);
    try {
      const res = await callGemini(
        `비즈니스 이메일을 작성해주세요.\n\n` +
        `- 받는 사람: ${recipientMap[recipient]}\n` +
        `- 목적: ${purposeMap[purpose]}\n` +
        `- 톤: ${tone === 'formal' ? '격식체 (합니다체)' : '친근체 (해요체)'}\n` +
        `- 핵심 내용: ${content}\n\n` +
        `제목과 본문을 포함한 완성된 이메일을 작성해주세요. 마크다운 형식으로 출력하세요.`
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
          <label className="f-label">받는 사람</label>
          <select className="f-select" value={recipient} onChange={e => setRecipient(e.target.value)}>
            <option value="boss">상사</option><option value="peer">동료</option>
            <option value="client">거래처</option><option value="customer">고객</option>
          </select>
        </div>
        <div>
          <label className="f-label">목적</label>
          <select className="f-select" value={purpose} onChange={e => setPurpose(e.target.value)}>
            <option value="request">요청</option><option value="report">보고</option>
            <option value="thanks">감사</option><option value="apology">사과</option>
            <option value="info">안내</option>
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label className="f-label">핵심 내용</label>
        <textarea className="f-textarea" rows={4} placeholder="전달할 주요 내용을 입력하세요..." value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div className="f-row mt-3">
        <label className="f-label" style={{ margin: 0 }}>톤:</label>
        <label className="text-slate-200 text-[13px] cursor-pointer">
          <input type="radio" name="emailTone" value="formal" checked={tone === 'formal'} onChange={() => setTone('formal')} /> 격식체
        </label>
        <label className="text-slate-200 text-[13px] cursor-pointer">
          <input type="radio" name="emailTone" value="casual" checked={tone === 'casual'} onChange={() => setTone('casual')} /> 친근체
        </label>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>
        {loading ? '작성 중...' : '✉️ AI 작성하기'}
      </button>
      {loading && <div className="ai-loading">Gemini가 이메일을 작성 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: simpleMarkdown(result) }} />}
    </div>
  );
}

function simpleMarkdown(t: string): string {
  return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>');
}
