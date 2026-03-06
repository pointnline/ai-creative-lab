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
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[5vh] pb-[5vh]"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08]"
        style={{ background: '#12121a', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: 'rgba(18,18,26,0.95)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-slate-200">{tool.title}</h2>
              <p className="text-xs text-slate-500">{tool.desc}</p>
            </div>
            {tool.aiPowered && <span className="ai-badge">Gemini AI</span>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all cursor-pointer text-lg"
          >
            x
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
