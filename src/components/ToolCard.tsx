'use client';

import { ToolDef } from '@/config/tools';
import { CATEGORIES } from '@/config/categories';

interface ToolCardProps {
  tool: ToolDef;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const cat = CATEGORIES[tool.cat];

  return (
    <div
      onClick={onClick}
      className="group relative bg-[#12121a] border border-white/[0.06] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}15, transparent 70%)` }}
      />

      <div className="relative z-10">
        <span className="text-[11px] font-mono text-slate-600">
          #{String(tool.num).padStart(2, '0')}
        </span>

        <div className="text-3xl mt-2 mb-3">{tool.icon}</div>

        <div className="text-[15px] font-semibold text-slate-200 mb-1.5">{tool.title}</div>
        <div className="text-[13px] text-slate-500 leading-relaxed">{tool.desc}</div>

        <div className="flex items-center gap-2 mt-4">
          <span
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
            style={{ background: `${tool.color}15`, color: tool.color }}
          >
            {cat?.icon} {cat?.name}
          </span>
          {tool.aiPowered && (
            <span className="ai-badge">AI</span>
          )}
        </div>
      </div>
    </div>
  );
}
