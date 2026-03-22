'use client';

import { RoadmapStep } from '@/types';
import { Check, Lock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface RoadmapTimelineProps {
    steps: RoadmapStep[];
}

const statusConfig = {
    completed: {
        icon: Check,
        dot: 'bg-emerald-500 border-emerald-400',
        card: 'border-emerald-800/40 bg-emerald-950/20',
        line: 'bg-emerald-600',
    },
    current: {
        icon: Zap,
        dot: 'bg-purple-500 border-purple-400 ring-4 ring-purple-500/20 animate-pulse',
        card: 'border-purple-700/60 bg-purple-950/30',
        line: 'bg-zinc-700',
    },
    locked: {
        icon: Lock,
        dot: 'bg-zinc-700 border-zinc-600',
        card: 'border-zinc-800 bg-zinc-900/40 opacity-60',
        line: 'bg-zinc-700',
    },
};

export default function RoadmapTimeline({ steps }: RoadmapTimelineProps) {
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <div className="relative">
            {steps.map((step, idx) => {
                const config = statusConfig[step.status];
                const Icon = config.icon;
                const isLast = idx === steps.length - 1;

                return (
                    <div key={idx} className="flex gap-4">
                        {/* 왼쪽 타임라인 */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${config.dot}`}
                            >
                                <Icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            {!isLast && (
                                <div className={`w-0.5 flex-1 mt-1 ${config.line}`} style={{ minHeight: '32px' }} />
                            )}
                        </div>

                        {/* 오른쪽 카드 */}
                        <div className={`flex-1 mb-4 border rounded-xl overflow-hidden ${config.card}`}>
                            <button
                                className="w-full text-left p-4"
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                disabled={step.status === 'locked'}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-zinc-500">Step {step.step}</span>
                                            <span className="text-xs text-zinc-600">•</span>
                                            <span className="text-xs text-zinc-500">{step.estimatedDays}일</span>
                                        </div>
                                        <h3 className="font-semibold text-white text-sm">{step.topic}</h3>
                                    </div>
                                    {step.status !== 'locked' && (
                                        expanded === idx
                                            ? <ChevronUp className="w-4 h-4 text-zinc-500" />
                                            : <ChevronDown className="w-4 h-4 text-zinc-500" />
                                    )}
                                </div>
                            </button>

                            {expanded === idx && step.status !== 'locked' && (
                                <div className="px-4 pb-4 space-y-3">
                                    <div className="p-3 bg-zinc-900/60 rounded-lg">
                                        <p className="text-xs text-zinc-500 mb-1 font-medium">왜 배워야 하나요?</p>
                                        <p className="text-sm text-zinc-300">{step.reason}</p>
                                    </div>
                                    {step.relatedConcepts.length > 0 && (
                                        <div>
                                            <p className="text-xs text-zinc-500 mb-2 font-medium">관련 개념</p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.relatedConcepts.map((c, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full"
                                                    >
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
