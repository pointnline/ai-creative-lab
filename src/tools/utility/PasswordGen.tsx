'use client';

import { useState } from 'react';
import { showToast } from '@/components/Toast';

export default function PasswordGen() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) { setPassword('최소 1개 옵션을 선택하세요'); return; }

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, v => chars[v % chars.length]).join('');
    setPassword(pw);
  };

  const strength = () => {
    if (!password || password.includes('선택')) return { label: '-', color: '#64748b', pct: 0 };
    let score = 0;
    if (password.length >= 12) score += 25;
    if (password.length >= 16) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    if (score >= 80) return { label: '매우 강함', color: '#4ade80', pct: score };
    if (score >= 60) return { label: '강함', color: '#6366f1', pct: score };
    if (score >= 40) return { label: '보통', color: '#f59e0b', pct: score };
    return { label: '약함', color: '#f87171', pct: score };
  };

  const s = strength();

  return (
    <div>
      <div className="mb-3">
        <label className="f-label">길이: {length}</label>
        <input type="range" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: '100%' }} />
      </div>
      <div className="f-row mb-3">
        {[
          { label: '대문자', val: upper, set: setUpper },
          { label: '소문자', val: lower, set: setLower },
          { label: '숫자', val: numbers, set: setNumbers },
          { label: '특수문자', val: symbols, set: setSymbols },
        ].map(opt => (
          <label key={opt.label} className="text-[13px] text-slate-200 cursor-pointer">
            <input type="checkbox" checked={opt.val} onChange={() => opt.set(!opt.val)} style={{ marginRight: 4 }} />
            {opt.label}
          </label>
        ))}
      </div>
      <button className="f-btn f-full" onClick={generate}>🔐 생성하기</button>

      {password && (
        <div className="f-result mt-3">
          <div onClick={() => { navigator.clipboard.writeText(password); showToast('복사됨!'); }}
            style={{ background: '#1e1e2e', padding: 14, borderRadius: 10, fontFamily: 'monospace', fontSize: 16, color: '#e2e8f0', cursor: 'pointer', wordBreak: 'break-all', textAlign: 'center' }}>
            {password}
          </div>
          <p style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 4 }}>클릭하여 복사</p>
          <div className="mt-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: '#94a3b8' }}>강도</span>
              <span style={{ color: s.color, fontWeight: 600 }}>{s.label}</span>
            </div>
            <div style={{ height: 6, background: '#1a1a2e', borderRadius: 3, marginTop: 4 }}>
              <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 3, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
