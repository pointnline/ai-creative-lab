'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Moodboard() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `"${keyword}" 키워드로 무드보드를 구성해주세요.\n\n` +
        `다음 요소를 포함해주세요:\n` +
        `1. **컬러 팔레트**: 5개 색상 (HEX 코드 + 색상명)\n` +
        `2. **타이포그래피**: 추천 폰트 3종 (제목/본문/포인트)\n` +
        `3. **패턴/텍스처**: 어울리는 패턴 설명 3개\n` +
        `4. **이미지 키워드**: 스톡 이미지 검색용 키워드 5개\n` +
        `5. **무드 설명**: 전체 분위기를 3문장으로\n` +
        `6. **적용 예시**: 이 무드를 활용할 수 있는 분야 3개\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">무드 키워드</label>
      <input className="f-input" placeholder="예: 북유럽 미니멀, 빈티지 카페, 사이버펑크" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '🎭 무드보드 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 무드보드를 구성 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
