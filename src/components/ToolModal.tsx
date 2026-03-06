'use client';

import { useEffect, useCallback } from 'react';
import { ToolDef } from '@/config/tools';

interface ToolModalProps {
  tool: ToolDef | null;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function ToolModal({ tool, onClose, children }: ToolModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (tool) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [tool, handleKey]);

  if (!tool) return null;

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <span className="text-[26px]">{tool.icon}</span>
            <div>
              <h2 className="text-[18px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{tool.title}</h2>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
            </div>
            {tool.aiPowered && <span className="ai-badge">Gemini AI</span>}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
