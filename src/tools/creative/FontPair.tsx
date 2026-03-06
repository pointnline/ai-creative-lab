'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function FontPair() {
  const [purpose, setPurpose] = useState('blog');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const purposeMap: Record<string, string> = { blog: '블로그/웹사이트', presentation: '프레젠테이션', branding: '브랜딩/로고', document: '비즈니스 문서', app: '모바일 앱' };
      const res = await callGemini(
        `${purposeMap[purpose]} 용도에 최적인 폰트 조합 5종을 추천해주세요.\n\n` +
        `각 조합별로:\n1. 제목 폰트 (이름 + 특징)\n2. 본문 폰트 (이름 + 특징)\n3. 조합 이유\n4. 추천 사이즈 비율\n5. 한글 대안 폰트\n\n` +
        `Google Fonts에서 사용 가능한 폰트 위주로 추천하세요. 마크다운 형식으로 작성하세요.`
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
      <label className="f-label">용도</label>
      <select className="f-select" value={purpose} onChange={e => { setPurpose(e.target.value); }}>
        <option value="blog">블로그/웹사이트</option><option value="presentation">프레젠테이션</option>
        <option value="branding">브랜딩/로고</option><option value="document">비즈니스 문서</option>
        <option value="app">모바일 앱</option>
      </select>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '추천 중...' : '🔤 AI 폰트 추천'}</button>
      {loading && <div className="ai-loading">Gemini가 폰트 조합을 분석 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
