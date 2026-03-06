'use client';

import { useState } from 'react';

interface Task { text: string; quadrant: number; }

export default function PriorityMatrix() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const classify = () => {
    if (!input.trim()) return;
    const lines = input.split('\n').filter(l => l.trim());
    const urgentKw = ['긴급','오늘','즉시','ASAP','마감','급한','지금','바로','당장'];
    const importKw = ['중요','핵심','전략','매출','성장','목표','KPI','필수','결정'];

    const classified = lines.map(line => {
      const isUrgent = urgentKw.some(k => line.includes(k));
      const isImportant = importKw.some(k => line.includes(k));
      let q = 4;
      if (isUrgent && isImportant) q = 1;
      else if (!isUrgent && isImportant) q = 2;
      else if (isUrgent && !isImportant) q = 3;
      return { text: line.trim(), quadrant: q };
    });
    setTasks(classified);
  };

  const qLabels = ['', '긴급 + 중요 (즉시 실행)', '중요 + 비긴급 (계획 수립)', '긴급 + 비중요 (위임)', '비긴급 + 비중요 (제거/보류)'];
  const qColors = ['', 'rgba(239,68,68,0.15)', 'rgba(59,130,246,0.15)', 'rgba(245,158,11,0.15)', 'rgba(107,114,128,0.15)'];
  const qBorders = ['', 'rgba(239,68,68,0.4)', 'rgba(59,130,246,0.4)', 'rgba(245,158,11,0.4)', 'rgba(107,114,128,0.4)'];

  return (
    <div>
      <label className="f-label">할 일 목록 (줄바꿈으로 구분)</label>
      <textarea className="f-textarea" rows={6} placeholder={"긴급 마감 보고서 작성\n전략 회의 준비\n이메일 회신\n책상 정리"} value={input} onChange={e => setInput(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={classify}>✅ 분류하기</button>

      {tasks.length > 0 && (
        <div className="mt-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[1, 2, 3, 4].map(q => (
            <div key={q} style={{ background: qColors[q], border: `1px solid ${qBorders[q]}`, borderRadius: 10, padding: 12, minHeight: 100 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: qBorders[q], marginBottom: 8 }}>{qLabels[q]}</div>
              {tasks.filter(t => t.quadrant === q).map((t, i) => (
                <div key={i} style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 6, margin: '3px 0', fontSize: 12, color: '#e2e8f0' }}>
                  {t.text}
                </div>
              ))}
              {tasks.filter(t => t.quadrant === q).length === 0 && (
                <div style={{ fontSize: 11, color: '#64748b' }}>항목 없음</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
