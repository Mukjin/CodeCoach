'use client';

import { useState } from 'react';
import { Issue, ReviewResult, ConceptCardRaw } from '@/types';
import ConceptCard from './ConceptCard';
import { AlertCircle, AlertTriangle, Lightbulb, TrendingUp, Star } from 'lucide-react';

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

    return (
        <div className="space-y-6">
            {/* 섹션1: 종합 평가 */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex flex-col items-center">
                        <span className={`text-5xl font-bold ${scoreColor(result.score)}`}>
                            {result.score}
                        </span>
                        <span className="text-xs text-zinc-500 mt-1">/ 10</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-zinc-400 mb-1">종합 평가</h3>
                        <p className="text-white text-base leading-relaxed">{result.summary}</p>
                    </div>
                    {/* 점수 바 */}
                    <div className="w-2 h-16 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="w-full rounded-full transition-all duration-700"
                            style={{
                                height: `${result.score * 10}%`,
                                background:
                                    result.score >= 8
                                        ? '#34d399'
                                        : result.score >= 6
                                            ? '#fbbf24'
                                            : '#f87171',
                                marginTop: `${(10 - result.score) * 10}%`,
                            }}
                        />
                    </div>
                </div>

                {/* 성장 인사이트 */}
                <div className="flex items-start gap-2 mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <TrendingUp className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <p className="text-purple-300 text-sm">{result.growthInsight}</p>
                </div>
            </div>

            {/* 섹션2: 문제점 & 개선 제안 */}
            {result.issues && result.issues.length > 0 && (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        문제점 & 개선 제안 ({result.issues.length}개)
                    </h3>
                    <div className="space-y-3">
                        {result.issues.map((issue: Issue, idx: number) => {
                            const config = severityConfig[issue.severity];
                            const Icon = config.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${config.bg}`}
                                >
                                    <button
                                        className="w-full text-left p-4 flex items-start gap-3"
                                        onClick={() => {
                                            setExpandedIssue(expandedIssue === idx ? null : idx);
                                            if (issue.lineNumber) onLineClick?.(issue.lineNumber);
                                        }}
                                    >
                                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-semibold ${config.color}`}>
                                                    {config.label}
                                                </span>
                                                {issue.lineNumber && (
                                                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                                                        {issue.lineNumber}번 줄
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-300">{issue.description}</p>
                                        </div>
                                    </button>
                                    {expandedIssue === idx && issue.improvedCode && (
                                        <div className="px-4 pb-4">
                                            <p className="text-xs text-zinc-500 mb-2">개선된 코드:</p>
                                            <pre className="bg-zinc-950/80 rounded-lg p-3 text-xs text-emerald-300 overflow-x-auto">
                                                {issue.improvedCode}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 섹션3: 개념 카드 */}
            {result.conceptCards && result.conceptCards.length > 0 && (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        학습 개념 카드 ({result.conceptCards.length}개)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.conceptCards.map((card: ConceptCardRaw, idx: number) => (
                            <ConceptCard key={idx} card={card} compact />
                        ))}
                    </div>
                </div>
            )}

            {/* 약점 패턴 태그 */}
            {result.weakPatterns && result.weakPatterns.length > 0 && (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                    <p className="text-xs text-zinc-500 mb-2">감지된 약점 패턴</p>
                    <div className="flex flex-wrap gap-2">
                        {result.weakPatterns.map((pattern: string, idx: number) => (
                            <span
                                key={idx}
                                className="text-xs px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full"
                            >
                                {pattern}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
