'use client';

import { useState } from 'react';
import { showToast } from '@/components/Toast';

export default function JsonCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [direction, setDirection] = useState<'json2csv' | 'csv2json'>('json2csv');

  const convert = () => {
    try {
      if (direction === 'json2csv') {
        const data = JSON.parse(input);
        const arr = Array.isArray(data) ? data : [data];
        if (arr.length === 0) { setOutput('빈 데이터'); return; }
        const headers = Object.keys(arr[0]);
        const csv = [headers.join(','), ...arr.map(row => headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
        setOutput(csv);
      } else {
        const lines = input.trim().split('\n');
        if (lines.length < 2) { setOutput('최소 2줄 필요 (헤더 + 데이터)'); return; }
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        const json = lines.slice(1).map(line => {
          const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
          return obj;
        });
        setOutput(JSON.stringify(json, null, 2));
      }
    } catch {
      setOutput('변환 오류: 입력 형식을 확인하세요.');
    }
  };

  return (
    <div>
      <div className="f-row mb-3">
        <button className={`f-tab ${direction === 'json2csv' ? 'active' : ''}`} onClick={() => setDirection('json2csv')}>JSON → CSV</button>
        <button className={`f-tab ${direction === 'csv2json' ? 'active' : ''}`} onClick={() => setDirection('csv2json')}>CSV → JSON</button>
      </div>
      <label className="f-label">{direction === 'json2csv' ? 'JSON 입력' : 'CSV 입력'}</label>
      <textarea className="f-textarea" rows={6} style={{ fontFamily: 'monospace', fontSize: 12 }}
        placeholder={direction === 'json2csv' ? '[{"name":"홍길동","age":30}]' : 'name,age\n홍길동,30'}
        value={input} onChange={e => setInput(e.target.value)} />
      <button className="f-btn f-full mt-3" onClick={convert}>🔄 변환</button>
      {output && (
        <div className="mt-3">
          <div className="f-row mb-2">
            <label className="f-label" style={{ margin: 0 }}>결과</label>
            <button className="f-btn f-btn-outline" style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}
              onClick={() => { navigator.clipboard.writeText(output); showToast('복사됨!'); }}>복사</button>
          </div>
          <pre style={{ background: '#1e1e2e', padding: 12, borderRadius: 8, fontSize: 12, overflowX: 'auto', color: '#e2e8f0', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{output}</pre>
        </div>
      )}
    </div>
  );
}
