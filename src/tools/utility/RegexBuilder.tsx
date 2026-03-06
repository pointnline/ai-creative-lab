'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function RegexBuilder() {
  const [desc, setDesc] = useState('');
  const [testStr, setTestStr] = useState('');
  const [regex, setRegex] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 설명에 맞는 정규식(RegExp)을 만들어주세요.\n\n설명: ${desc}\n\n` +
        `반드시 아래 JSON 형식으로만 응답하세요:\n{"regex":"정규식 패턴","flags":"gi","explanation":"설명"}`
      );
      const match = res.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setRegex(parsed.regex);
        if (testStr) testRegex(parsed.regex, parsed.flags || 'g');
      }
    } catch {
      setRegex('오류 발생');
    }
    setLoading(false);
  };

  const testRegex = (pattern?: string, flags?: string) => {
    try {
      const re = new RegExp(pattern || regex, flags || 'g');
      const found = testStr.match(re) || [];
      setMatches(found);
    } catch {
      setMatches(['정규식 오류']);
    }
  };

  return (
    <div>
      <label className="f-label">자연어 설명</label>
      <input className="f-input" placeholder="예: 이메일 주소를 찾아줘, 한국 전화번호 패턴" value={desc} onChange={e => setDesc(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={generate} disabled={loading}>{loading ? '생성 중...' : '🔧 AI 정규식 생성'}</button>

      {regex && (
        <div className="f-result mt-3">
          <label className="f-label">생성된 정규식</label>
          <code style={{ display: 'block', background: '#1e1e2e', padding: 10, borderRadius: 8, fontSize: 14, color: '#f59e0b', fontFamily: 'monospace' }}>/{regex}/g</code>

          <div className="mt-3">
            <label className="f-label">테스트 문자열</label>
            <textarea className="f-textarea" rows={3} placeholder="테스트할 텍스트..." value={testStr} onChange={e => setTestStr(e.target.value)} />
            <button className="f-btn mt-2" onClick={() => testRegex()}>테스트</button>
          </div>

          {matches.length > 0 && (
            <div className="mt-3">
              <label className="f-label">매치 결과 ({matches.length}개)</label>
              <div className="f-row">
                {matches.map((m, i) => (
                  <span key={i} style={{ background: 'rgba(99,102,241,0.15)', padding: '2px 8px', borderRadius: 6, fontSize: 12, color: '#a5b4fc' }}>{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
