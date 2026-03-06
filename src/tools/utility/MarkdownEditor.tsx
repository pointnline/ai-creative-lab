'use client';

import { useState } from 'react';
import { showToast } from '@/components/Toast';

export default function MarkdownEditor() {
  const [md, setMd] = useState('# AI Creative Lab\n\n**마크다운 에디터**에 오신 것을 환영합니다!\n\n## 기능\n- 실시간 미리보기\n- 마크다운 문법 지원\n- 복사 기능\n\n> 이것은 인용문입니다.\n\n```\nconst hello = "world";\n```\n\n---\n\n1. 첫 번째\n2. 두 번째\n3. 세 번째');

  const renderMarkdown = (text: string): string => {
    return text
      .replace(/^### (.*$)/gm, '<h3 style="color:#a5b4fc;margin:12px 0 4px;font-size:15px">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 style="color:#a5b4fc;margin:14px 0 6px;font-size:17px">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 style="color:#a5b4fc;margin:16px 0 8px;font-size:20px">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f59e0b">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:#252540;padding:1px 6px;border-radius:4px;font-size:13px;color:#f59e0b">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:3px solid #6366f1;padding-left:12px;color:#94a3b8;margin:6px 0">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li style="margin:2px 0;margin-left:16px">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li style="margin:2px 0;margin-left:16px;list-style:decimal">$1</li>')
      .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #252540;margin:12px 0">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div>
      <div className="f-row mb-3">
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setMd(md + '\n**볼드**')}>B</button>
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12, fontStyle: 'italic' }} onClick={() => setMd(md + '\n*이탤릭*')}>I</button>
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setMd(md + '\n## 제목')}>H</button>
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setMd(md + '\n- 목록')}>List</button>
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setMd(md + '\n> 인용')}>Quote</button>
        <button className="f-btn" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setMd(md + '\n`코드`')}>Code</button>
        <button className="f-btn f-btn-outline" style={{ padding: '4px 10px', fontSize: 12, marginLeft: 'auto' }}
          onClick={() => { navigator.clipboard.writeText(md); showToast('마크다운 복사됨!'); }}>복사</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 350 }}>
        <textarea className="f-textarea" style={{ height: '100%', minHeight: 350, fontFamily: 'monospace', fontSize: 13, resize: 'none' }}
          value={md} onChange={e => setMd(e.target.value)} />
        <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 16, border: '1px solid #252540', overflowY: 'auto', fontSize: 14, lineHeight: 1.7, color: '#e2e8f0' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
      </div>
    </div>
  );
}
