'use client';

interface HeaderProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  toolCount: number;
  theme: string;
  onToggleTheme: () => void;
}

export default function Header({ searchQuery, onSearch, toolCount, theme, onToggleTheme }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-[100] flex items-center justify-between px-8 max-md:px-4 max-md:h-14"
      style={{ background: 'var(--header-bg)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center">
        <span className="text-[22px] max-md:text-[18px] font-extrabold bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
          AI Creative Lab
        </span>
        <span className="max-md:hidden text-[11px] ml-2.5 font-medium px-2.5 py-0.5 rounded-full"
          style={{ color: 'var(--text-muted)', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          v2.0
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[280px] max-md:w-[160px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none" style={{ color: 'var(--text-dim)' }}>🔍</span>
          <input
            type="text"
            placeholder="도구 검색... (/ 키)"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            className="search-input w-full rounded-xl py-2.5 pl-9 pr-4 text-[13px] outline-none transition-all font-[inherit]"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-input)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        <span className="text-xs font-medium max-md:hidden" style={{ color: 'var(--text-muted)' }}>{toolCount}개 기능</span>
        <span className="max-md:hidden text-[11px] px-2 py-0.5 rounded font-mono"
          style={{ color: 'var(--text-dim)', background: 'var(--bg-input)', border: '1px solid var(--border-input)' }}>
          /
        </span>
        <button
          onClick={onToggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all text-lg"
          style={{ background: 'var(--bg-input)', border: '1px solid var(--border-input)' }}
          title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
