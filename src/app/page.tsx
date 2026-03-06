'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Landing from '@/components/Landing';
import ToolCard from '@/components/ToolCard';
import ToolModal from '@/components/ToolModal';
import ToastContainer from '@/components/Toast';
import { ALL_TOOLS, ToolDef } from '@/config/tools';
import { getToolComponent } from '@/tools/registry';

export default function Home() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTool, setActiveTool] = useState<ToolDef | null>(null);
  const [theme, setTheme] = useState('dark');
  const [showLanding, setShowLanding] = useState(true);
  const toolsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);

    const visited = localStorage.getItem('visited');
    if (visited) setShowLanding(false);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    localStorage.setItem('visited', '1');
    setTimeout(() => {
      toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_TOOLS.filter(t => {
      const catMatch = category === 'all' || t.cat === category;
      const searchMatch = !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.id.includes(q);
      return catMatch && searchMatch;
    });
  }, [category, search]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault();
      document.querySelector<HTMLInputElement>('.search-input')?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <>
      <Header searchQuery={search} onSearch={setSearch} toolCount={filtered.length} theme={theme} onToggleTheme={toggleTheme} />

      {showLanding && <Landing onGetStarted={handleGetStarted} />}

      {!showLanding && <CategoryNav current={category} onSelect={setCategory} />}

      <main
        ref={toolsRef}
        className={`px-8 max-md:px-4 pb-20 max-w-[1440px] mx-auto ${showLanding ? 'mt-8' : 'mt-[128px] max-md:mt-[110px]'}`}
        style={showLanding ? { display: 'none' } : undefined}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ gridColumn: '1 / -1' }}>
            <div className="text-[56px] mb-4" style={{ filter: 'grayscale(0.5)' }}>🔍</div>
            <p className="text-[15px] font-medium" style={{ color: 'var(--text-dim)' }}>검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="grid gap-4 max-md:gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
            {filtered.map(tool => (
              <ToolCard key={tool.id} tool={tool} onClick={() => setActiveTool(tool)} />
            ))}
          </div>
        )}
      </main>

      <ToolModal tool={activeTool} onClose={() => setActiveTool(null)}>
        {ToolComponent && <ToolComponent />}
      </ToolModal>

      <ToastContainer />
    </>
  );
}
