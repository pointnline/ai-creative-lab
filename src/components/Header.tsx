'use client';

interface HeaderProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  toolCount: number;
}

export default function Header({ searchQuery, onSearch, toolCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-8"
      style={{ background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3">
        <span className="text-[22px] font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
          AI Creative Lab
        </span>
        <span className="text-[11px] text-slate-500 font-medium px-2.5 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/10">
          v2.0 Full-Stack
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[280px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="도구 검색... (/ 키)"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            className="w-full bg-[#12121a]/80 border border-[#252540] rounded-xl py-2.5 pl-9 pr-4 text-slate-200 text-[13px] outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all font-[inherit]"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{toolCount}개 기능</span>
        <span className="text-[11px] text-slate-600 bg-[#1a1a2e] px-2 py-0.5 rounded border border-[#252540] font-mono">/</span>
      </div>
    </header>
  );
}
