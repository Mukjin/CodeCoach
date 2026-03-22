'use client';

import { Challenge } from '@/types';
import { Code2, ExternalLink, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

interface ChallengeCardProps {
    challenge: Challenge;
    onStart?: (challenge: Challenge) => void;
}

const difficultyConfig = {
    easy: { label: '쉬움', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    medium: { label: '보통', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    hard: { label: '어려움', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

export default function ChallengeCard({ challenge, onStart }: ChallengeCardProps) {
    const diff = difficultyConfig[challenge.difficulty];

    return (
        <div className={`bg-zinc-900/60 border rounded-2xl p-5 transition-all duration-200 hover:border-zinc-600 ${challenge.completed ? 'border-emerald-800/40 bg-emerald-950/10' : 'border-zinc-800'}`}>
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${challenge.completed ? 'bg-emerald-500/10' : 'bg-purple-500/10'}`}>
                        {challenge.completed ? (
                            <Trophy className="w-4 h-4 text-emerald-400" />
                        ) : (
                            <Code2 className="w-4 h-4 text-purple-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-sm mb-1">{challenge.title}</h3>
                        <span className="text-xs text-zinc-500">{challenge.relatedConcept}</span>
                    </div>
                </div>
                <span className={`text-xs px-2 py-0.5 border rounded-full shrink-0 ${diff.color}`}>
                    {diff.label}
                </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                {challenge.description}
            </p>

            <div className="flex items-center gap-2">
                {!challenge.completed && (
                    <button
                        onClick={() => onStart?.(challenge)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium"
                    >
                        <Zap className="w-3 h-3" />
                        풀기 시작
                    </button>
                )}
                {challenge.baekjoonLink && (
                    <a
                        href={challenge.baekjoonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                        백준
                    </a>
                )}
                {challenge.programmersLink && (
                    <a
                        href={challenge.programmersLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                        프로그래머스
                    </a>
                )}
                {challenge.completed && (
                    <span className="text-xs text-emerald-400 font-medium">✓ 완료</span>
                )}
            </div>
        </div>
    );
}
