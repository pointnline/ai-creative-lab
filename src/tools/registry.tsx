'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Lazy load all tools for performance
const toolComponents: Record<string, ComponentType> = {
  // Productivity
  'meeting-summary': dynamic(() => import('./productivity/MeetingSummary')),
  'email-writer': dynamic(() => import('./productivity/EmailWriter')),
  'ppt-outline': dynamic(() => import('./productivity/PptOutline')),
  'report-draft': dynamic(() => import('./productivity/ReportDraft')),
  'priority-matrix': dynamic(() => import('./productivity/PriorityMatrix')),
  'brainstorm': dynamic(() => import('./productivity/Brainstorm')),
  'text-diff': dynamic(() => import('./productivity/TextDiff')),

  // Creative
  'gen-art': dynamic(() => import('./creative/GenArt')),
  'color-palette': dynamic(() => import('./creative/ColorPalette')),
  'logo-ideas': dynamic(() => import('./creative/LogoIdeas')),
  'css-art': dynamic(() => import('./creative/CssArt')),
  'font-pair': dynamic(() => import('./creative/FontPair')),
  'infographic': dynamic(() => import('./creative/Infographic')),
  'ascii-art': dynamic(() => import('./creative/AsciiArt')),
  'moodboard': dynamic(() => import('./creative/Moodboard')),

  // Finance
  'dcf-calc': dynamic(() => import('./finance/DcfCalc')),
  'cap-rate': dynamic(() => import('./finance/CapRate')),
  'ltv-dsr': dynamic(() => import('./finance/LtvDsr')),
  'stock-screener': dynamic(() => import('./finance/StockScreener')),
  'portfolio-rebal': dynamic(() => import('./finance/PortfolioRebal')),
  'termsheet': dynamic(() => import('./finance/Termsheet')),
  'financial-ratios': dynamic(() => import('./finance/FinancialRatios')),

  // Learning
  'paper-summary': dynamic(() => import('./learning/PaperSummary')),
  'flashcard': dynamic(() => import('./learning/Flashcard')),
  'feynman': dynamic(() => import('./learning/Feynman')),
  'quiz-maker': dynamic(() => import('./learning/QuizMaker')),
  'mindmap': dynamic(() => import('./learning/Mindmap')),
  'code-explain': dynamic(() => import('./learning/CodeExplain')),
  'stats-sim': dynamic(() => import('./learning/StatsSim')),

  // Lifestyle
  'recipe': dynamic(() => import('./lifestyle/Recipe')),
  'travel-planner': dynamic(() => import('./lifestyle/TravelPlanner')),
  'habit-tracker': dynamic(() => import('./lifestyle/HabitTracker')),
  'wine-match': dynamic(() => import('./lifestyle/WineMatch')),
  'workout': dynamic(() => import('./lifestyle/Workout')),
  'gift-recommender': dynamic(() => import('./lifestyle/GiftRecommender')),
  'journal-prompt': dynamic(() => import('./lifestyle/JournalPrompt')),

  // Utility
  'json-csv': dynamic(() => import('./utility/JsonCsv')),
  'qr-gen': dynamic(() => import('./utility/QrGen')),
  'regex-builder': dynamic(() => import('./utility/RegexBuilder')),
  'password-gen': dynamic(() => import('./utility/PasswordGen')),
  'unit-converter': dynamic(() => import('./utility/UnitConverter')),
  'pomodoro': dynamic(() => import('./utility/Pomodoro')),
  'markdown-editor': dynamic(() => import('./utility/MarkdownEditor')),
};

export function getToolComponent(id: string): ComponentType | null {
  return toolComponents[id] || null;
}
