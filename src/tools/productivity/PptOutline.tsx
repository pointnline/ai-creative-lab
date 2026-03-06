'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function PptOutline() {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState('10');
  const [audience, setAudience] = useState('business');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `프레젠테이션 슬라이드 구성안을 만들어주세요.\n\n` +
        `- 주제: ${topic}\n- 슬라이드 수: ${slides}장\n- 대상: ${audience === 'business' ? '비즈니스/경영진' : audience === 'tech' ? '기술팀/개발자' : '일반 대중'}\n\n` +
        `각 슬라이드별로:\n1. 슬라이드 번호와 제목\n2. 핵심 메시지 (1문장)\n3. 포함할 내용 bullet points (3-4개)\n4. 추천 비주얼 (차트, 이미지 등)\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">발표 주제</label>
      <input className="f-input" placeholder="예: AI가 금융산업에 미치는 영향" value={topic} onChange={e => setTopic(e.target.value)} />
      <div className="f-grid-2 mt-3">
        <div>
          <label className="f-label">슬라이드 수</label>
          <select className="f-select" value={slides} onChange={e => setSlides(e.target.value)}>
            <option value="5">5장</option><option value="10">10장</option><option value="15">15장</option><option value="20">20장</option>
          </select>
        </div>
        <div>
          <label className="f-label">대상</label>
          <select className="f-select" value={audience} onChange={e => setAudience(e.target.value)}>
            <option value="business">경영진</option><option value="tech">기술팀</option><option value="general">일반</option>
          </select>
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '📊 아웃라인 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 구성안을 만들고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
