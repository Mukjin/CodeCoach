'use client';

import { WeakPattern } from '@/types';
import { AlertTriangle, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface WeakPatternBannerProps {
    patterns: WeakPattern[];
}

export default function WeakPatternBanner({ patterns }: WeakPatternBannerProps) {
    const [dismissed, setDismissed] = useState(false);
    const recurringPatterns = patterns.filter((p) => p.status === 'recurring');

    if (dismissed || recurringPatterns.length === 0) return null;

    const topPattern = recurringPatterns[0];

    return (
        <div className="relative bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-4 mb-6">
            <button
                onClick={() => setDismissed(true)}
                className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500/10 rounded-xl shrink-0">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-orange-300 mb-1">
                        🔥 반복 약점 감지!
                    </p>
                    <p className="text-zinc-400 text-sm">
                        <span className="text-white font-medium">"{topPattern.pattern}"</span>를{' '}
                        <span className="text-orange-400 font-bold">{topPattern.count}번</span> 틀렸어요! 집중 복습할까요?
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                        <Link
                            href={`/concepts/${encodeURIComponent(topPattern.pattern)}`}
                            className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors font-medium"
                        >
                            개념 카드 보기 <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            href="/challenges"
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                            챌린지 문제 풀기 <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
                {recurringPatterns.length > 1 && (
                    <div className="shrink-0 text-right">
                        <span className="text-xs text-zinc-500">+{recurringPatterns.length - 1}개 더</span>
                    </div>
                )}
            </div>
        </div>
    );
}
