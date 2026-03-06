'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Brainstorm() {
  const [topic, setTopic] = useState('');
  const [method, setMethod] = useState('scamper');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const methods: Record<string, string> = {
    scamper: 'SCAMPER (대체/결합/적용/수정/다른용도/제거/역발상)',
    sixhat: '6색 모자 (사실/감정/부정/긍정/창의/정리)',
    fivewhys: '5 Whys (근본 원인 분석)',
    mindmap: '마인드맵 (중심→가지→세부)',
    random: '랜덤 연결 (무작위 단어 조합)',
  };

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `"${topic}" 주제로 ${methods[method]} 방법론을 사용하여 브레인스토밍을 진행해주세요.\n\n` +
        `각 관점에서 최소 3개 이상의 아이디어를 제시하고, 실행 가능성을 표시해주세요.\n` +
        `마지막에 Top 3 추천 아이디어를 정리해주세요.\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">주제/문제</label>
      <input className="f-input" placeholder="예: 신규 고객 확보 방법" value={topic} onChange={e => setTopic(e.target.value)} />
      <div className="mt-3">
        <label className="f-label">방법론</label>
        <div className="f-row">
          {Object.entries(methods).map(([key, label]) => (
            <button key={key} className={`f-tab ${method === key ? 'active' : ''}`} onClick={() => setMethod(key)}>
              {label.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '💡 AI 브레인스토밍'}</button>
      {loading && <div className="ai-loading">Gemini가 아이디어를 확산 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
