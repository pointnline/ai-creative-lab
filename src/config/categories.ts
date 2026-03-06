export interface CategoryConfig {
  name: string;
  color: string;
  icon: string;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  productivity: { name: '생산성', color: '#6366f1', icon: '🧠' },
  creative: { name: '크리에이티브', color: '#ec4899', icon: '🎨' },
  finance: { name: '금융/투자', color: '#10b981', icon: '📊' },
  learning: { name: '학습/리서치', color: '#f59e0b', icon: '📚' },
  lifestyle: { name: '라이프스타일', color: '#06b6d4', icon: '🏠' },
  utility: { name: '유틸리티', color: '#8b5cf6', icon: '🔧' },
};
