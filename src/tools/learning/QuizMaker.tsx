'use client';

import { useState } from 'react';
import { callGemini } from '@/lib/gemini';

interface Quiz { question: string; options: string[]; answer: number; explanation: string; }

export default function QuizMaker() {
  const [text, setText] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await callGemini(
        `다음 텍스트를 기반으로 객관식 퀴즈 5문제를 만들어주세요.\n` +
        `반드시 아래 JSON 형식으로만 응답하세요:\n` +
        `[{"question":"질문","options":["1번","2번","3번","4번"],"answer":0,"explanation":"해설"},...]\n` +
        `answer는 0부터 시작하는 인덱스입니다.\n\n텍스트:\n${text}`
      );
      const match = res.match(/\[[\s\S]*\]/);
      if (match) {
        setQuizzes(JSON.parse(match[0]));
        setAnswers({});
        setShowResults(false);
      }
    } catch {
      setQuizzes([]);
    }
    setLoading(false);
  };

  const score = quizzes.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <div>
      <label className="f-label">학습 텍스트</label>
      <textarea className="f-textarea" rows={6} placeholder="퀴즈를 만들 내용을 붙여넣으세요..." value={text} onChange={e => setText(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={generate} disabled={loading}>{loading ? '생성 중...' : '❓ AI 퀴즈 생성'}</button>
      {loading && <div className="ai-loading">Gemini가 퀴즈를 만들고 있습니다...</div>}

      {quizzes.length > 0 && (
        <div className="mt-4">
          {quizzes.map((q, qi) => (
            <div key={qi} style={{ background: '#1e1e2e', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #252540' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 10 }}>Q{qi + 1}. {q.question}</div>
              {q.options.map((opt, oi) => (
                <label key={oi} style={{
                  display: 'block', padding: '6px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 13, margin: '3px 0',
                  background: showResults ? (oi === q.answer ? 'rgba(34,197,94,0.15)' : answers[qi] === oi ? 'rgba(239,68,68,0.15)' : 'transparent') : (answers[qi] === oi ? 'rgba(99,102,241,0.15)' : 'transparent'),
                  color: '#e2e8f0',
                }}>
                  <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} onChange={() => !showResults && setAnswers({ ...answers, [qi]: oi })} style={{ marginRight: 8 }} />
                  {opt}
                </label>
              ))}
              {showResults && <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 8, padding: '6px 10px', background: 'rgba(245,158,11,0.08)', borderRadius: 6 }}>{q.explanation}</div>}
            </div>
          ))}
          {!showResults ? (
            <button className="f-btn f-full" onClick={() => setShowResults(true)}>채점하기</button>
          ) : (
            <div style={{ textAlign: 'center', padding: 16, background: '#1e1e2e', borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: score >= 4 ? '#4ade80' : score >= 3 ? '#f59e0b' : '#f87171' }}>{score} / {quizzes.length}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{score >= 4 ? '훌륭합니다!' : score >= 3 ? '좋아요!' : '다시 도전해보세요!'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
