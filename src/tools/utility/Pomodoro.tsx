'use client';

import { useState, useEffect, useRef } from 'react';

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            setMinutes(m => {
              if (m === 0) {
                setIsRunning(false);
                if (mode === 'focus') {
                  setSessions(s => s + 1);
                  setMode('break');
                  setMinutes(5);
                } else {
                  setMode('focus');
                  setMinutes(25);
                }
                return 0;
              }
              return m - 1;
            });
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode]);

  const reset = (focusMin: number) => {
    setIsRunning(false);
    setMode('focus');
    setMinutes(focusMin);
    setSeconds(0);
  };

  const pct = mode === 'focus'
    ? 1 - (minutes * 60 + seconds) / (25 * 60)
    : 1 - (minutes * 60 + seconds) / (5 * 60);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 20px' }}>
        <svg viewBox="0 0 200 200" style={{ width: 200, height: 200 }}>
          <circle cx={100} cy={100} r={90} fill="none" stroke="#252540" strokeWidth={8} />
          <circle cx={100} cy={100} r={90} fill="none" stroke={mode === 'focus' ? '#6366f1' : '#10b981'} strokeWidth={8}
            strokeDasharray={565.5} strokeDashoffset={565.5 * (1 - pct)} strokeLinecap="round"
            transform="rotate(-90 100 100)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: '#e2e8f0', fontFamily: 'monospace' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 12, color: mode === 'focus' ? '#6366f1' : '#10b981', fontWeight: 600 }}>
            {mode === 'focus' ? '집중' : '휴식'}
          </div>
        </div>
      </div>

      <div className="f-row" style={{ justifyContent: 'center' }}>
        <button className="f-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '⏸ 일시정지' : '▶ 시작'}
        </button>
        <button className="f-btn f-btn-outline" onClick={() => reset(25)}>리셋</button>
      </div>

      <div className="f-row mt-3" style={{ justifyContent: 'center' }}>
        {[15, 25, 45, 60].map(m => (
          <button key={m} className="f-tab" onClick={() => reset(m)}>{m}분</button>
        ))}
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: '#94a3b8' }}>
        완료 세션: <span style={{ color: '#4ade80', fontWeight: 600 }}>{sessions}</span>
      </div>
    </div>
  );
}
