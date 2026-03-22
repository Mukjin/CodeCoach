'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Code2,
    BookOpen,
    Flame,
    Target,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import HeatMap from '@/components/HeatMap';
import ScoreChart from '@/components/ScoreChart';
import WeakPatternBanner from '@/components/WeakPatternBanner';
import ConceptCard from '@/components/ConceptCard';
import ChallengeCard from '@/components/ChallengeCard';

// 더미 데이터
const mockStats = {
    totalSubmissions: 42,
    totalConceptCards: 128,
    averageScore: 7.4,
    currentStreak: 5,
};

const mockHeatMapData = Array.from({ length: 365 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (365 - i));
    return {
        date: date.toISOString().split('T')[0],
        count: Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0,
    };
});

const mockScoreData = Array.from({ length: 14 }).map((_, i) => ({
    date: `3/${i + 1}`,
    score: 5 + Math.random() * 4,
}));

const mockWeakPatterns = [
    {
        id: '1',
        userId: 'user1',
        pattern: '클로저(Closure)',
        count: 4,
        status: 'recurring' as const,
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
    }
];

const mockTodayCards = [
    {
        name: '메모이제이션',
        definition: '이전에 계산한 값을 식별자에 저장해 두었다가, 또 다시 계산하지 않고 꺼내 쓰는 기법',
        contextExplanation: '재귀 함수나 복잡한 계산을 수행할 때 불필요한 중복 계산을 방지합니다.',
        exampleCode: 'const memo = {};\nfunction fib(n) {\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  return memo[n] = fib(n-1) + fib(n-2);\n}',
        studyKeywords: ['동적 계획법', '캐싱', '성능 최적화'],
        difficulty: 'intermediate' as const,
    },
    {
        name: '이벤트 위임',
        definition: '하위 요소에 각각 이벤트를 붙이지 않고, 상위 요소에서 하위 요소의 이벤트를 제어하는 방식',
        contextExplanation: '동적으로 추가되는 요소들의 이벤트를 효율적으로 관리할 수 있습니다.',
        exampleCode: 'document.getElementById("menu").addEventListener("click", function(e) {\n  if(e.target && e.target.nodeName == "LI") {\n    console.log("List item clicked!");\n  }\n});',
        studyKeywords: ['이벤트 버블링', 'DOM 조작', '성능 개선'],
        difficulty: 'beginner' as const,
    }
];

const mockChallenges = [
    {
        id: 'c1',
        title: '클로저를 활용한 카운터 구현',
        difficulty: 'medium' as const,
        description: '전역 변수를 사용하지 않고 독립적인 상태를 가지는 카운터 함수를 작성하세요.',
        hints: ['반환되는 내부 함수가 외부 함수의 변수를 참조해야 합니다.'],
        relatedConcept: '클로저(Closure)',
        completed: false,
    }
];

export default function DashboardPage() {
    return (
        <div className="w-full max-w-[1800px] mx-auto p-4 md:p-8 space-y-8 pb-32">
            {/* 헤더 */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-2">
                        코드 코치 대시보드
                    </h1>
                    <p className="text-zinc-400">환영합니다! 오늘도 코딩 근육을 키워볼까요?</p>
                </div>
                <Link
                    href="/review"
                    className="hidden md:flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors"
                >
                    <Code2 className="w-5 h-5" />
                    새 코드 제출하기
                </Link>
            </div>

            <WeakPatternBanner patterns={mockWeakPatterns} />

            {/* 핵심 지표 4개 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
                <StatCard
                    icon={Code2}
                    label="총 제출 횟수"
                    value={mockStats.totalSubmissions}
                    suffix="회"
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                />
                <StatCard
                    icon={BookOpen}
                    label="누적 개념 카드"
                    value={mockStats.totalConceptCards}
                    suffix="장"
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                />
                <StatCard
                    icon={Target}
                    label="평균 코드 품질"
                    value={mockStats.averageScore}
                    suffix="점"
                    color="text-emerald-400"
                    bg="bg-emerald-500/10"
                />
                <StatCard
                    icon={Flame}
                    label="현재 학습 스트릭"
                    value={mockStats.currentStreak}
                    suffix="일"
                    color="text-orange-400"
                    bg="bg-orange-500/10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 중앙: 대시보드 차트 영역 */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 활동 잔디 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-base font-semibold text-white">연간 학습 활동</h2>
                            <span className="text-xs text-zinc-500">최근 1년 잔디밭</span>
                        </div>
                        <HeatMap data={mockHeatMapData} />
                    </div>

                    {/* 점수 추이 차트 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-base font-semibold text-white mb-6">최근 코드 품질 추이</h2>
                        <ScoreChart data={mockScoreData} />
                    </div>
                </div>

                {/* 우측: 로드맵, 복습, 챌린지 */}
                <div className="space-y-6">
                    {/* 오늘의 복습 카드 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-semibold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                오늘의 복습
                            </h2>
                            <Link href="/concepts" className="text-xs text-zinc-500 hover:text-white transition-colors">전체 보기 &rarr;</Link>
                        </div>
                        <div className="space-y-4">
                            {mockTodayCards.map((card, idx) => (
                                <ConceptCard key={idx} card={card} compact />
                            ))}
                        </div>
                    </div>

                    {/* 추천 챌린지 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-semibold text-white">약점 맞춤 챌린지</h2>
                            <Link href="/challenges" className="text-xs text-zinc-500 hover:text-white transition-colors">더 보기 &rarr;</Link>
                        </div>
                        <div className="space-y-3">
                            {mockChallenges.map((challenge) => (
                                <ChallengeCard key={challenge.id} challenge={challenge} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 모바일 하단 고정 버튼 */}
            <div className="fixed bottom-6 right-6 md:hidden z-50">
                <Link
                    href="/review"
                    className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg shadow-purple-600/30"
                >
                    <Code2 className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, suffix, color, bg }: any) {
    return (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-zinc-400">{label}</span>
                <div className={`p-2 rounded-xl ${bg}`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                </div>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{value}</span>
                <span className="text-sm text-zinc-500 font-medium">{suffix}</span>
            </div>
        </div>
    );
}
