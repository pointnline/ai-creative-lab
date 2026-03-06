'use client';

import { CATEGORIES } from '@/config/categories';

interface CategoryNavProps {
  current: string;
  onSelect: (cat: string) => void;
}

export default function CategoryNav({ current, onSelect }: CategoryNavProps) {
  return (
    <nav
      className="fixed top-16 max-md:top-14 left-0 right-0 z-[99] flex gap-2 px-8 max-md:px-4 py-3 overflow-x-auto"
      style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border-subtle)', scrollbarWidth: 'none' }}
    >
      <button
        onClick={() => onSelect('all')}
        className={`cat-pill ${current === 'all' ? 'active' : ''}`}
        style={current === 'all' ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderColor: 'transparent', color: 'white', boxShadow: '0 2px 12px rgba(99,102,241,0.3)' } : undefined}
      >
        🎯 전체
      </button>
      {Object.entries(CATEGORIES).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`cat-pill ${current === key ? 'active' : ''}`}
          style={current === key ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, borderColor: 'transparent', color: 'white', boxShadow: `0 2px 12px ${cat.color}44` } : undefined}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </nav>
  );
}
