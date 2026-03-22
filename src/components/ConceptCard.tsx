'use client';

import { useState } from 'react';
import { ConceptCardRaw } from '@/types';
import { BookOpen, Code2, Tag, ChevronRight } from 'lucide-react';

interface ConceptCardProps {
    card: ConceptCardRaw;
    compact?: boolean;
    appearedCount?: number;
}

const difficultyConfig = {
    beginner: { label: '초급', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    intermediate: { label: '중급', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    advanced: { label: '고급', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

export default function ConceptCard({ card, compact = false, appearedCount }: ConceptCardProps) {
    const [flipped, setFlipped] = useState(false);
    const diff = difficultyConfig[card.difficulty] || difficultyConfig.beginner;

    return (
        <div
            className="relative cursor-pointer"
            style={{ perspective: '1000px', height: compact ? '180px' : '240px' }}
            onClick={() => setFlipped((f) => !f)}
        >
            <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* 앞면 */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-5 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                                <h3 className="font-bold text-white text-sm leading-tight">{card.name}</h3>
                            </div>
                            {appearedCount && appearedCount > 1 && (
                                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full shrink-0">
                                    ×{appearedCount}
                                </span>
                            )}
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">{card.definition}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 border rounded-full ${diff.color}`}>
                            {diff.label}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-600 text-xs">
                            <span>뒤집기</span>
                            <ChevronRight className="w-3 h-3" />
                        </div>
                    </div>
                </div>

                {/* 뒷면 */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-indigo-950 border border-indigo-800/50 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <Code2 className="w-3 h-3 text-indigo-400 shrink-0" />
                            <p className="text-xs text-indigo-300 font-semibold">예제 코드</p>
                        </div>
                        <pre className="text-xs text-zinc-300 bg-zinc-950/60 rounded-lg p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                            {card.exampleCode}
                        </pre>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {card.studyKeywords?.map((kw: string, i: number) => (
                            <span
                                key={i}
                                className="flex items-center gap-1 text-xs px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full"
                            >
                                <Tag className="w-2.5 h-2.5" />
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
