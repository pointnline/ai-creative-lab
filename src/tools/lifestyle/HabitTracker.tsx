'use client';

import { useState, useEffect } from 'react';

interface HabitData { [date: string]: boolean; }

export default function HabitTracker() {
  const [habits, setHabits] = useState<string[]>(['운동', '독서', '명상']);
  const [newHabit, setNewHabit] = useState('');
  const [data, setData] = useState<Record<string, HabitData>>({});
  const [selectedHabit, setSelectedHabit] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('habit-tracker');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHabits(parsed.habits || ['운동', '독서', '명상']);
      setData(parsed.data || {});
    }
  }, []);

  const save = (h: string[], d: Record<string, HabitData>) => {
    localStorage.setItem('habit-tracker', JSON.stringify({ habits: h, data: d }));
  };

  const addHabit = () => {
    if (!newHabit.trim() || habits.includes(newHabit.trim())) return;
    const next = [...habits, newHabit.trim()];
    setHabits(next);
    setNewHabit('');
    save(next, data);
  };

  const toggleDay = (date: string) => {
    const habit = habits[selectedHabit];
    const next = { ...data };
    if (!next[habit]) next[habit] = {};
    next[habit][date] = !next[habit][date];
    setData(next);
    save(habits, next);
  };

  const today = new Date();
  const days: string[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  const habitData = data[habits[selectedHabit]] || {};
  const streak = (() => {
    let count = 0;
    for (let i = 0; i < days.length; i++) {
      const d = days[days.length - 1 - i];
      if (habitData[d]) count++;
      else break;
    }
    return count;
  })();

  return (
    <div>
      <div className="f-row mb-3">
        {habits.map((h, i) => (
          <button key={h} className={`f-tab ${selectedHabit === i ? 'active' : ''}`} onClick={() => setSelectedHabit(i)}>{h}</button>
        ))}
      </div>
      <div className="f-row mb-3">
        <input className="f-input" style={{ flex: 1 }} placeholder="새 습관 추가..." value={newHabit} onChange={e => setNewHabit(e.target.value)} onKeyDown={e => e.key === 'Enter' && addHabit()} />
        <button className="f-btn" onClick={addHabit}>추가</button>
      </div>

      <div className="f-result">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{habits[selectedHabit]}</span>
          <span style={{ fontSize: 13, color: streak > 0 ? '#4ade80' : '#94a3b8' }}>🔥 {streak}일 연속</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {['월', '화', '수', '목', '금', '토', '일'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 10, color: '#64748b', paddingBottom: 4 }}>{d}</div>
          ))}
          {days.map(d => (
            <div key={d} onClick={() => toggleDay(d)}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: 4, cursor: 'pointer', transition: 'all 0.2s',
                background: habitData[d] ? '#4ade80' : '#1a1a2e',
                opacity: habitData[d] ? 0.9 : 0.4,
              }}
              title={d}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
