'use client';

import { useCallback } from 'react';
import { ToolDef } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';

interface ToolCardProps {
  tool: ToolDef;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const cat = CATEGORIES[tool.cat];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      className="feature-card"
      style={{ '--card-color': tool.color } as React.CSSProperties}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <span className="card-num">#{String(tool.num).padStart(2, '0')}</span>
      <span className="card-icon">{tool.icon}</span>
      <div className="card-title">{tool.title}</div>
      <div className="card-desc">{tool.desc}</div>
      <div className="flex items-center gap-2 mt-3.5">
        <span
          className="card-cat"
          style={{ background: `${tool.color}15`, color: tool.color }}
        >
          {cat?.icon} {cat?.name}
        </span>
        {tool.aiPowered && <span className="ai-badge">AI</span>}
      </div>
    </div>
  );
}
