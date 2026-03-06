'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

export default function Workout() {
  const [goal, setGoal] = useState('weight-loss');
  const [equipment, setEquipment] = useState('home');
  const [level, setLevel] = useState('beginner');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const goalMap: Record<string, string> = { 'weight-loss': '체중 감량', muscle: '근육 증가', endurance: '체력 향상', flexibility: '유연성' };
      const equipMap: Record<string, string> = { home: '홈트레이닝 (맨몸)', gym: '헬스장', band: '밴드/덤벨' };
      const levelMap: Record<string, string> = { beginner: '초보', intermediate: '중급', advanced: '상급' };
      const res = await callGemini(
        `주간 운동 프로그램을 만들어주세요.\n\n` +
        `- 목표: ${goalMap[goal]}\n- 장비: ${equipMap[equipment]}\n- 수준: ${levelMap[level]}\n\n` +
        `월~금 5일 프로그램:\n각 날짜별로:\n1. 운동 부위\n2. 운동 목록 (세트 x 횟수)\n3. 휴식 시간\n4. 예상 소요시간\n5. 주의사항\n\n마크다운 형식으로 작성하세요.`
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
          <label className="f-label">목표</label>
          <select className="f-select" value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="weight-loss">체중 감량</option><option value="muscle">근육 증가</option>
            <option value="endurance">체력 향상</option><option value="flexibility">유연성</option>
          </select>
        </div>
        <div>
          <label className="f-label">장비</label>
          <select className="f-select" value={equipment} onChange={e => setEquipment(e.target.value)}>
            <option value="home">홈트 (맨몸)</option><option value="gym">헬스장</option><option value="band">밴드/덤벨</option>
          </select>
        </div>
      </div>
      <div className="mt-3">
        <label className="f-label">수준</label>
        <div className="f-row">
          {['beginner', 'intermediate', 'advanced'].map(l => (
            <button key={l} className={`f-tab ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>
              {l === 'beginner' ? '초보' : l === 'intermediate' ? '중급' : '상급'}
            </button>
          ))}
        </div>
      </div>
      <button className="f-btn f-full mt-3" onClick={run} disabled={loading}>{loading ? '생성 중...' : '💪 AI 루틴 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 운동 루틴을 만들고 있습니다...</div>}
      {result && !loading && <div className="f-result ai-content" dangerouslySetInnerHTML={{ __html: result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gm, '<h3>$1</h3>').replace(/^## (.*$)/gm, '<h2>$1</h2>').replace(/\n/g, '<br/>') }} />}
    </div>
  );
}
