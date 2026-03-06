'use client';

import { useEffect, useRef } from 'react';

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge fade-up">AI-Powered Creative Platform</div>
        <h1 className="hero-title fade-up">
          <span className="hero-gradient">43개 AI 도구</span>로
          <br />
          업무를 자동화하세요
        </h1>
        <p className="hero-desc fade-up">
          이메일 작성, 데이터 분석, 프레젠테이션, 브레인스토밍까지
          <br className="max-md:hidden" />
          Gemini AI가 당신의 생산성을 극대화합니다
        </p>
        <div className="hero-buttons fade-up">
          <button className="hero-btn-primary" onClick={onGetStarted}>
            무료로 시작하기
          </button>
          <a href="#features" className="hero-btn-secondary">
            기능 살펴보기
          </a>
        </div>
        <div className="hero-glow" />
      </section>

      {/* Stats */}
      <section className="stats-section fade-up" ref={statsRef}>
        <div className="stats-grid">
          {[
            { num: '43', label: 'AI 도구', suffix: '개' },
            { num: '6', label: '카테고리', suffix: '개' },
            { num: '22', label: 'AI 기능', suffix: '개' },
            { num: '0', label: '사용 비용', suffix: '원' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-num">
                {s.num}
                <span className="stat-suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <h2 className="section-title fade-up">어떤 도구가 있나요?</h2>
        <p className="section-desc fade-up">6개 카테고리, 43개 도구로 업무 전반을 커버합니다</p>
        <div className="features-grid">
          {[
            {
              icon: '🚀',
              title: '생산성',
              desc: '회의록 요약, 이메일 작성, PPT 아웃라인, 보고서 초안까지 AI가 대신합니다',
              color: '#6366f1',
              count: 7,
            },
            {
              icon: '🎨',
              title: '크리에이티브',
              desc: '컬러 팔레트, 로고 아이디어, CSS 아트, 무드보드를 AI로 생성합니다',
              color: '#ec4899',
              count: 8,
            },
            {
              icon: '💰',
              title: '금융',
              desc: 'DCF 계산, LTV/DSR, 포트폴리오 리밸런싱 등 금융 분석 도구',
              color: '#10b981',
              count: 7,
            },
            {
              icon: '📚',
              title: '학습',
              desc: '논문 요약, 플래시카드, 퀴즈 생성, 코드 설명까지 AI 튜터',
              color: '#f59e0b',
              count: 7,
            },
            {
              icon: '🌿',
              title: '라이프스타일',
              desc: '레시피 추천, 여행 플래너, 와인 매칭, 운동 루틴 AI 코치',
              color: '#8b5cf6',
              count: 7,
            },
            {
              icon: '🔧',
              title: '유틸리티',
              desc: 'JSON 변환, QR 생성, 정규식 빌더, 마크다운 에디터',
              color: '#06b6d4',
              count: 7,
            },
          ].map((f) => (
            <div key={f.title} className="feature-block fade-up" style={{ '--feat-color': f.color } as React.CSSProperties}>
              <div className="feature-block-icon">{f.icon}</div>
              <h3 className="feature-block-title">{f.title}</h3>
              <p className="feature-block-desc">{f.desc}</p>
              <span className="feature-block-count">{f.count}개 도구</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Powered */}
      <section className="ai-section fade-up">
        <div className="ai-section-inner">
          <div className="ai-badge-large">Powered by Gemini AI</div>
          <h2 className="ai-section-title">22개 도구에 AI가 탑재되어 있습니다</h2>
          <p className="ai-section-desc">
            Google Gemini 2.5 Flash 모델이 텍스트 생성, 분석, 요약, 추천을 실시간으로 처리합니다.
            <br />
            빠르고 정확한 AI 응답으로 작업 시간을 획기적으로 줄여보세요.
          </p>
          <div className="ai-features-row">
            {[
              { icon: '⚡', text: '실시간 응답' },
              { icon: '🎯', text: '높은 정확도' },
              { icon: '🔒', text: '서버사이드 보안' },
              { icon: '🌐', text: '한국어 최적화' },
            ].map((item) => (
              <div key={item.text} className="ai-feature-chip">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section fade-up">
        <h2 className="cta-title">지금 바로 시작하세요</h2>
        <p className="cta-desc">회원가입 없이, 무료로, 바로 사용할 수 있습니다</p>
        <button className="hero-btn-primary" onClick={onGetStarted}>
          도구 둘러보기
        </button>
      </section>
    </div>
  );
}
