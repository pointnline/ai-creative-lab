'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import ToolCard from '@/components/ToolCard';
import ToolModal from '@/components/ToolModal';
import ToastContainer from '@/components/Toast';
import { ALL_TOOLS, ToolDef } from '@/config/tools';
import { getToolComponent } from '@/tools/registry';

export default function Home() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTool, setActiveTool] = useState<ToolDef | null>(null);

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
      <Header searchQuery={search} onSearch={setSearch} toolCount={filtered.length} />
      <CategoryNav current={category} onSelect={setCategory} />

      <main className="mt-[128px] px-8 pb-20 max-w-[1440px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500">검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
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
