'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function CodeExplain() {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('auto');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 코드를 한국어로 상세히 설명해주세요.\n` +
        `언어: ${lang === 'auto' ? '자동 감지' : lang}\n\n` +
        `## 출력 형식:\n1. **언어/프레임워크** 감지 결과\n2. **전체 요약** (이 코드가 하는 일)\n3. **줄별 설명** (주요 줄마다 한국어 주석)\n4. **핵심 개념** (사용된 패턴/알고리즘)\n5. **개선 제안** (있다면)\n\n` +
        `\`\`\`\n${code}\n\`\`\``
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
      <div className="f-row mb-3">
        <label className="f-label" style={{ margin: 0 }}>언어:</label>
        {['auto', 'python', 'javascript', 'typescript', 'java', 'sql'].map(l => (
          <button key={l} className={`f-tab ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
            {l === 'auto' ? '자동' : l}
          </button>
        ))}
      </div>
      <textarea className="f-textarea" rows={8} placeholder="설명할 코드를 붙여넣으세요..." value={code} onChange={e => setCode(e.target.value)} style={{ fontFamily: 'monospace', fontSize: 13 }} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '분석 중...' : '💻 AI 코드 설명'}</button>
      {loading && <div className="ai-loading">Gemini가 코드를 분석 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
