'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function LogoIdeas() {
  const [brand, setBrand] = useState('');
  const [style, setStyle] = useState('minimal');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!brand.trim()) return;
    setLoading(true);
    try {
      const styleMap: Record<string, string> = { minimal: '미니멀', bold: '볼드/강렬', elegant: '엘레건트', playful: '플레이풀' };
      const res = await callGemini(
        `"${brand}" 브랜드의 ${styleMap[style]} 스타일 로고 컨셉 4종을 제안해주세요.\n\n` +
        `각 컨셉별로:\n1. 컨셉명\n2. 디자인 설명 (형태, 레이아웃)\n3. 추천 컬러 (HEX 코드 포함)\n4. 추천 폰트\n5. 브랜드 메시지와의 연결\n\n마크다운 형식으로 작성하세요.`
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
      <label className="f-label">브랜드명</label>
      <input className="f-input" placeholder="예: Point & Line" value={brand} onChange={e => setBrand(e.target.value)} />
      <div className="mt-3">
        <label className="f-label">스타일</label>
        <div className="f-row">
          {['minimal', 'bold', 'elegant', 'playful'].map(s => (
            <button key={s} className={`f-tab ${style === s ? 'active' : ''}`} onClick={() => setStyle(s)}>
              {s === 'minimal' ? '미니멀' : s === 'bold' ? '볼드' : s === 'elegant' ? '엘레건트' : '플레이풀'}
            </button>
          ))}
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '✏️ 로고 아이디어 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 로고 컨셉을 구상 중입니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
