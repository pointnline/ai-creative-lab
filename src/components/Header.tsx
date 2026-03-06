'use client';

import { useState, useRef } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  toolCount: number;
  theme: string;
  onToggleTheme: () => void;
}

export default function Header({ searchQuery, onSearch, toolCount, theme, onToggleTheme }: HeaderProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="header-bar">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="header-logo">AI Creative Lab</span>
        <span className="header-version max-md:hidden">v2.0</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className={`header-search ${focused ? 'focused' : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-search-icon">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="search-input"
          />
          {!searchQuery && (
            <kbd className="header-kbd max-md:hidden">/</kbd>
          )}
          {searchQuery && (
            <button
              className="header-search-clear"
              onClick={(e) => { e.stopPropagation(); onSearch(''); }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Tool count */}
        <span className="header-count max-md:hidden">{toolCount}개</span>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="header-theme-btn"
          title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
