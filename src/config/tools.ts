export interface ToolDef {
  id: string;
  num: number;
  title: string;
  desc: string;
  icon: string;
  cat: string;
  color: string;
  aiPowered?: boolean;
}

export const ALL_TOOLS: ToolDef[] = [
  // === Productivity (1-7) ===
  { id: 'meeting-summary', num: 1, title: 'AI 회의록 요약기', desc: '텍스트 붙여넣기 -> 핵심 요약 + 액션아이템 추출', icon: '📋', cat: 'productivity', color: '#6366f1', aiPowered: true },
  { id: 'email-writer', num: 2, title: '이메일 작성기', desc: '상황/톤 입력 -> 비즈니스 이메일 초안 생성', icon: '✉️', cat: 'productivity', color: '#6366f1', aiPowered: true },
  { id: 'ppt-outline', num: 3, title: '프레젠테이션 아웃라인', desc: '주제 입력 -> 슬라이드 구성안 자동 생성', icon: '📊', cat: 'productivity', color: '#6366f1', aiPowered: true },
  { id: 'report-draft', num: 4, title: '보고서 초안 생성기', desc: '키워드/데이터 -> 구조화된 보고서 초안', icon: '📝', cat: 'productivity', color: '#6366f1', aiPowered: true },
  { id: 'priority-matrix', num: 5, title: '할 일 우선순위 매트릭스', desc: '할 일 목록 -> 긴급/중요 매트릭스 자동 분류', icon: '✅', cat: 'productivity', color: '#6366f1' },
  { id: 'brainstorm', num: 6, title: '브레인스토밍 파트너', desc: '주제 + 방법론 -> 다양한 아이디어 확산', icon: '💡', cat: 'productivity', color: '#6366f1', aiPowered: true },
  { id: 'text-diff', num: 7, title: '텍스트 비교/차이점 분석기', desc: '두 텍스트 -> 차이점 하이라이트', icon: '🔍', cat: 'productivity', color: '#6366f1' },

  // === Creative (8-15) ===
  { id: 'gen-art', num: 8, title: 'Generative Art Studio', desc: '인터랙티브 제너러티브 아트 4가지 모드', icon: '🎨', cat: 'creative', color: '#ec4899' },
  { id: 'color-palette', num: 9, title: 'AI 컬러 팔레트 생성기', desc: '무드 키워드 -> 5색 팔레트 + HEX 코드', icon: '🎨', cat: 'creative', color: '#ec4899', aiPowered: true },
  { id: 'logo-ideas', num: 10, title: '로고 아이디어 제안기', desc: '브랜드명/스타일 -> SVG 로고 컨셉 4종', icon: '✏️', cat: 'creative', color: '#ec4899', aiPowered: true },
  { id: 'css-art', num: 11, title: 'CSS Art Generator', desc: '타입/색상 선택 -> 라이브 CSS 아트 생성', icon: '🖼️', cat: 'creative', color: '#ec4899' },
  { id: 'font-pair', num: 12, title: '글꼴 조합 추천기', desc: '용도별 최적 폰트 조합 5종 미리보기', icon: '🔤', cat: 'creative', color: '#ec4899', aiPowered: true },
  { id: 'infographic', num: 13, title: '인포그래픽 빌더', desc: '데이터 입력 -> SVG 차트 자동 생성', icon: '📊', cat: 'creative', color: '#ec4899' },
  { id: 'ascii-art', num: 14, title: '아스키 아트 생성기', desc: '텍스트 입력 -> 대형 ASCII 문자 아트', icon: '🔠', cat: 'creative', color: '#ec4899' },
  { id: 'moodboard', num: 15, title: 'Moodboard 메이커', desc: '키워드 -> 컬러+패턴+타이포 무드보드', icon: '🎭', cat: 'creative', color: '#ec4899', aiPowered: true },

  // === Finance (16-22) ===
  { id: 'dcf-calc', num: 16, title: 'DCF 계산기', desc: 'FCF/성장률/할인율 -> 기업가치 산출', icon: '💰', cat: 'finance', color: '#10b981' },
  { id: 'cap-rate', num: 17, title: 'Cap Rate/NOI 분석기', desc: '임대수익/비용/가치 -> NOI, Cap Rate 산출', icon: '🏢', cat: 'finance', color: '#10b981' },
  { id: 'ltv-dsr', num: 18, title: 'LTV/DSR 시뮬레이터', desc: '대출조건 입력 -> LTV%, DSR%, 상환액 계산', icon: '🏦', cat: 'finance', color: '#10b981' },
  { id: 'stock-screener', num: 19, title: '주식 스크리너', desc: '30개 한국 주식 PER/PBR/섹터 필터링', icon: '📈', cat: 'finance', color: '#10b981' },
  { id: 'portfolio-rebal', num: 20, title: '포트폴리오 리밸런싱', desc: '자산배분 입력 -> 리밸런싱 매매 산출', icon: '⚖️', cat: 'finance', color: '#10b981' },
  { id: 'termsheet', num: 21, title: '텀시트 요약기', desc: '텀시트 텍스트 -> 핵심 투자조건 추출', icon: '📑', cat: 'finance', color: '#10b981', aiPowered: true },
  { id: 'financial-ratios', num: 22, title: '재무비율 대시보드', desc: '재무데이터 -> 주요 재무비율 시각화', icon: '📊', cat: 'finance', color: '#10b981' },

  // === Learning (23-29) ===
  { id: 'paper-summary', num: 23, title: '논문 요약기', desc: '논문 텍스트 -> 구조화된 요약 + 키워드 추출', icon: '📄', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'flashcard', num: 24, title: '플래시카드 생성기', desc: '텍스트 -> Q&A 플래시카드 자동 생성', icon: '🃏', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'feynman', num: 25, title: '파인만 기법 설명기', desc: '개념 -> 4단계 쉬운 설명 자동 생성', icon: '🧑‍🏫', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'quiz-maker', num: 26, title: '퀴즈 메이커', desc: '텍스트 -> 5문제 객관식 퀴즈 + 채점', icon: '❓', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'mindmap', num: 27, title: '마인드맵 생성기', desc: '주제 -> SVG 방사형 마인드맵 자동 생성', icon: '🧠', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'code-explain', num: 28, title: '코드 설명기', desc: '코드 -> 줄별 한국어 주석 자동 생성', icon: '💻', cat: 'learning', color: '#f59e0b', aiPowered: true },
  { id: 'stats-sim', num: 29, title: '통계 시뮬레이터', desc: '정규분포/히스토그램/회귀분석 인터랙티브', icon: '📐', cat: 'learning', color: '#f59e0b' },

  // === Lifestyle (30-36) ===
  { id: 'recipe', num: 30, title: '식단/레시피 추천기', desc: '재료/칼로리 -> 한식 레시피 추천', icon: '🍳', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },
  { id: 'travel-planner', num: 31, title: '여행 일정 플래너', desc: '목적지/일수 -> 일별 여행 일정 생성', icon: '✈️', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },
  { id: 'habit-tracker', num: 32, title: '습관 트래커', desc: '습관 입력 -> 캘린더 히트맵 + 연속 기록', icon: '📅', cat: 'lifestyle', color: '#06b6d4' },
  { id: 'wine-match', num: 33, title: '와인/위스키 매칭', desc: '음식/분위기 -> 주류 추천 + 페어링', icon: '🍷', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },
  { id: 'workout', num: 34, title: '운동 루틴 생성기', desc: '목표/장비 -> 주간 운동 프로그램', icon: '💪', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },
  { id: 'gift-recommender', num: 35, title: '선물 추천기', desc: '대상/예산/관계 -> 맞춤 선물 아이디어', icon: '🎁', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },
  { id: 'journal-prompt', num: 36, title: '일기/저널 프롬프트', desc: '랜덤 성찰 질문으로 일기 쓰기 도움', icon: '📔', cat: 'lifestyle', color: '#06b6d4', aiPowered: true },

  // === Utility (37-43) ===
  { id: 'json-csv', num: 37, title: 'JSON/CSV 변환기', desc: 'JSON <-> CSV 양방향 변환', icon: '🔄', cat: 'utility', color: '#8b5cf6' },
  { id: 'qr-gen', num: 38, title: 'QR코드 생성기', desc: '텍스트/URL -> QR 패턴 생성', icon: '📱', cat: 'utility', color: '#8b5cf6' },
  { id: 'regex-builder', num: 39, title: '정규식 빌더', desc: '자연어 -> 정규식 생성 + 테스트', icon: '🔧', cat: 'utility', color: '#8b5cf6', aiPowered: true },
  { id: 'password-gen', num: 40, title: '비밀번호 생성기', desc: '길이/옵션 -> 강력한 비밀번호 + 강도 측정', icon: '🔐', cat: 'utility', color: '#8b5cf6' },
  { id: 'unit-converter', num: 41, title: '단위 변환기', desc: '길이/무게/온도/면적 한국 단위(평,근) 포함', icon: '📏', cat: 'utility', color: '#8b5cf6' },
  { id: 'pomodoro', num: 42, title: '타이머/뽀모도로', desc: '집중 타이머 + 세션 관리 + 알림', icon: '⏱️', cat: 'utility', color: '#8b5cf6' },
  { id: 'markdown-editor', num: 43, title: '마크다운 에디터', desc: '분할 화면 실시간 미리보기 + 툴바', icon: '📝', cat: 'utility', color: '#8b5cf6' },
];
