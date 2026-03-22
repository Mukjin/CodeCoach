'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lightbulb } from 'lucide-react';

interface HintSystemProps {
    hints: string[];
}

export default function HintSystem({ hints }: HintSystemProps) {
    const [revealedCount, setRevealedCount] = useState(0);

    if (!hints || hints.length === 0) return null;

    return (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    힌트 ({revealedCount}/{hints.length})
                </h3>
                {revealedCount < hints.length && (
                    <button
                        onClick={() => setRevealedCount((c) => c + 1)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                    >
                        <Eye className="w-3 h-3" />
                        다음 힌트
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {hints.map((hint, idx) => (
                    <div key={idx} className="relative">
                        {idx < revealedCount ? (
                            <div className="flex gap-3 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
                                <span className="text-xs font-bold text-yellow-500 shrink-0">
                                    {idx + 1}.
                                </span>
                                <p className="text-sm text-zinc-300">{hint}</p>
                            </div>
                        ) : (
                            <div className="flex gap-3 p-3 bg-zinc-800/40 border border-zinc-700/40 rounded-xl items-center">
                                <span className="text-xs font-bold text-zinc-600 shrink-0">{idx + 1}.</span>
                                <div className="flex-1 flex items-center justify-center py-1">
                                    <EyeOff className="w-3 h-3 text-zinc-600 mr-2" />
                                    <span className="text-xs text-zinc-600">힌트 숨김</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
