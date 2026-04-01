'use client';

import { useState } from 'react';
import { Issue, ReviewResult, ConceptCardRaw } from '@/types';
import ConceptCard from './ConceptCard';
import {
    AlertCircle,
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Star,
    CheckCircle2,
    FileText,
    Sparkles
} from 'lucide-react';

interface ReviewResultPanelProps {
    result: ReviewResult;
    streamingText?: string;
    isStreaming?: boolean;
    onLineClick?: (line: number) => void;
}

const severityConfig = {
    critical: {
        icon: AlertCircle,
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        label: '치명적',
    },
    warning: {
        icon: AlertTriangle,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10 border-yellow-500/20',
        label: '경고',
    },
    suggestion: {
        icon: Lightbulb,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        label: '제안',
    },
};

const scoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
};

export default function ReviewResultPanel({
    result,
    onLineClick,
}: ReviewResultPanelProps) {
    const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'concepts'>('overview');

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* 상단 통합 헤더 (점수 및 약점) */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                    <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-zinc-800"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className={scoreColor(result.score)}
                                strokeDasharray={`${result.score * 10}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className={`text-xl font-bold ${scoreColor(result.score)}`}>{result.score.toFixed(1)}</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg mb-1.5 flex items-center gap-2">
                            {result.score >= 8 ? '훌륭한 코드입니다!' : result.score >= 6 ? '조금 더 다듬어볼까요?' : '개선이 필요한 코드입니다.'}
                        </h2>
                        {result.weakPatterns && result.weakPatterns.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {result.weakPatterns.map((pattern, idx) => (
                                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-sm">
                                        {pattern}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-xs text-zinc-500 mt-1 block">감지된 특이 패턴이 없습니다.</span>
                        )}
                    </div>
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 shrink-0">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'}`}
                >
                    <FileText className="w-4 h-4" /> AI 총평
                </button>
                <button
                    onClick={() => setActiveTab('issues')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'issues' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'}`}
                >
                    <AlertCircle className="w-4 h-4" /> 상세 분석
                    {result.issues?.length > 0 && <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">{result.issues.length}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('concepts')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'concepts' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'}`}
                >
                    <Star className="w-4 h-4" /> 학습 카드
                    {result.conceptCards?.length > 0 && <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">{result.conceptCards.length}</span>}
                </button>
            </div>

            {/* 탭 컨텐츠 영역 (스크롤 가능하게 처리) */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
                {/* 탭 1: AI 총평 */}
                {activeTab === 'overview' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
                        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400" /> 종합 코멘트
                            </h3>
                            <p className="text-zinc-300 text-[15px] leading-loose break-keep">
                                {result.summary}
                            </p>
                        </div>
                        <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-purple-400 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> 성장 인사이트
                            </h3>
                            <p className="text-zinc-300 text-[14px] leading-relaxed break-keep">
                                {result.growthInsight}
                            </p>
                        </div>
                    </div>
                )}

                {/* 탭 2: 상세 분석 (이슈) */}
                {activeTab === 'issues' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
                        {!result.issues || result.issues.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center bg-zinc-900/40 rounded-2xl border border-zinc-800 border-dashed">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500/50 mb-3" />
                                <p className="text-zinc-400 text-sm">발견된 문제점이나 개선 사항이 없습니다.<br />아주 훌륭해요!</p>
                            </div>
                        ) : (
                            result.issues.map((issue: Issue, idx: number) => {
                                const config = severityConfig[issue.severity] || severityConfig.suggestion;
                                const Icon = config.icon;
                                const isExpanded = expandedIssue === idx;

                                return (
                                    <div
                                        key={idx}
                                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-zinc-900 border-zinc-700 shadow-lg' : config.bg}`}
                                    >
                                        <button
                                            className="w-full text-left p-4 md:p-5 flex items-start gap-4 transition-colors hover:bg-white/[0.02]"
                                            onClick={() => {
                                                setExpandedIssue(isExpanded ? null : idx);
                                                if (issue.lineNumber) onLineClick?.(issue.lineNumber);
                                            }}
                                        >
                                            <div className={`p-2 rounded-lg bg-zinc-950/50 shrink-0 ${config.color}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`text-[11px] font-bold tracking-wider uppercase ${config.color}`}>
                                                        {config.label}
                                                    </span>
                                                    {issue.lineNumber && (
                                                        <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded shadow-inner">
                                                            Line {issue.lineNumber}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-zinc-200 leading-relaxed font-medium">{issue.description}</p>
                                            </div>
                                        </button>

                                        {/* 개선된 코드 (토글) */}
                                        {isExpanded && issue.improvedCode && (
                                            <div className="px-5 pb-5 pt-2 animate-in fade-in slide-in-from-top-2">
                                                <div className="bg-black/40 rounded-xl p-4 border border-zinc-800/80">
                                                    <p className="text-[11px] font-bold tracking-wider text-emerald-500 mb-3 flex items-center gap-2 uppercase">
                                                        <Sparkles className="w-3 h-3" /> 추천 코드
                                                    </p>
                                                    <pre className="text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed custom-scrollbar">
                                                        {issue.improvedCode}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* 탭 3: 학습 개념 카드 */}
                {activeTab === 'concepts' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pb-4">
                        {!result.conceptCards || result.conceptCards.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center bg-zinc-900/40 rounded-2xl border border-zinc-800 border-dashed">
                                <Star className="w-10 h-10 text-yellow-500/30 mb-3" />
                                <p className="text-zinc-400 text-sm">이번 코드에서 추출할 만한<br />새로운 학습 카드가 없습니다.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {result.conceptCards.map((card: ConceptCardRaw, idx: number) => (
                                    <ConceptCard key={idx} card={card} compact={false} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
