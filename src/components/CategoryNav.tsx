'use client';

import { CATEGORIES } from '@/config/categories';

interface CategoryNavProps {
  current: string;
  onSelect: (cat: string) => void;
}

export default function CategoryNav({ current, onSelect }: CategoryNavProps) {
  return (
    <nav className="fixed top-16 left-0 right-0 z-40 flex gap-2 px-8 py-3 overflow-x-auto"
      style={{ background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all cursor-pointer ${
          current === 'all'
            ? 'bg-gradient-to-r from-indigo-500 to-violet-500 border-transparent text-white shadow-[0_2px_12px_rgba(99,102,241,0.3)]'
            : 'border-[#252540] text-slate-400 hover:border-indigo-500/40 hover:text-slate-200 hover:bg-indigo-500/8 bg-transparent'
        }`}
      >
        🎯 전체
      </button>
      {Object.entries(CATEGORIES).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all cursor-pointer ${
            current === key
              ? 'border-transparent text-white shadow-lg'
              : 'border-[#252540] text-slate-400 hover:border-indigo-500/40 hover:text-slate-200 bg-transparent'
          }`}
          style={current === key ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` } : undefined}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </nav>
  );
}
