'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flame, Target, ArrowRight, Sparkles, BookOpen, Code2 } from 'lucide-react';
import HeatMap from '@/components/HeatMap';
import ScoreChart from '@/components/ScoreChart';
import WeakPatternBanner from '@/components/WeakPatternBanner';
import ConceptCard from '@/components/ConceptCard';
import { useHistoryStore } from '@/store/historyStore';
import { useMemo } from 'react';

export default function DashboardPage() {
    const { submissions, getAllConcepts, getWeakPatternsFrequency } = useHistoryStore();

    // 통계 파생
    const stats = useMemo(() => {
        const totalSubmissions = submissions.length;
        const totalConceptCards = getAllConcepts().length;
        const averageScore = totalSubmissions > 0
            ? (submissions.reduce((acc, sub) => acc + sub.result.score, 0) / totalSubmissions).toFixed(1)
            : 0;

        // 임의의 스트릭 계산 (오늘부터 연속 제출일)
        const currentStreak = totalSubmissions > 0 ? 1 : 0; // 심화 로직은 추후 구현

        return { totalSubmissions, totalConceptCards, averageScore, currentStreak };
    }, [submissions, getAllConcepts]);

    // 히트맵 파생
    const heatMapData = useMemo(() => {
        const dataMap = new Map<string, number>();
        submissions.forEach(sub => {
            const dateStr = new Date(sub.timestamp).toISOString().split('T')[0];
            dataMap.set(dateStr, (dataMap.get(dateStr) || 0) + 1);
        });

        return Array.from({ length: 365 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (365 - i));
            const dateStr = date.toISOString().split('T')[0];
            return {
                date: dateStr,
                count: dataMap.get(dateStr) || 0,
            };
        });
    }, [submissions]);

    // 스코어 차트 파생 (최근 14개)
    const scoreData = useMemo(() => {
        const recentSubmissions = [...submissions].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).slice(-14);
        return recentSubmissions.map(sub => {
            const d = new Date(sub.timestamp);
            return {
                date: `${d.getMonth() + 1}/${d.getDate()}`,
                score: sub.result.score
            };
        });
    }, [submissions]);

    // 약점 배너 데이터 생성
    const weakPatterns = getWeakPatternsFrequency().map((wp, idx) => ({
        id: `wp-${idx}`,
        userId: 'local',
        pattern: wp.pattern,
        count: wp.count,
        status: 'recurring' as const,
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
    }));

    // 최근 추가된 개념 카드 3개
    const recentConcepts = getAllConcepts().slice(0, 3);

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

            {weakPatterns.length > 0 && <WeakPatternBanner patterns={weakPatterns} />}

            {/* 핵심 지표 4개 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
                <StatCard
                    icon={Code2}
                    label="총 제출 횟수"
                    value={stats.totalSubmissions}
                    suffix="회"
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                />
                <StatCard
                    icon={BookOpen}
                    label="누적 개념 카드"
                    value={stats.totalConceptCards}
                    suffix="장"
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                />
                <StatCard
                    icon={Target}
                    label="평균 코드 품질"
                    value={stats.averageScore}
                    suffix="점"
                    color="text-emerald-400"
                    bg="bg-emerald-500/10"
                />
                <StatCard
                    icon={Flame}
                    label="현재 학습 스트릭"
                    value={stats.currentStreak}
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
                        <HeatMap data={heatMapData} />
                    </div>

                    {/* 점수 추이 차트 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-base font-semibold text-white mb-6">최근 코드 품질 추이</h2>
                        {scoreData.length > 0 ? (
                            <ScoreChart data={scoreData} />
                        ) : (
                            <div className="flex items-center justify-center py-10 text-zinc-500">
                                아직 제출된 리뷰가 없어 차트를 그릴 수 없습니다.
                            </div>
                        )}
                    </div>
                </div>

                {/* 우측: 로드맵, 복습, 챌린지 */}
                <div className="space-y-6">
                    {/* 오늘의 복습 카드 */}
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-semibold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                최근 수집한 개념
                            </h2>
                            <Link href="/concepts" className="text-xs text-zinc-500 hover:text-white transition-colors">전체 보기 &rarr;</Link>
                        </div>
                        <div className="space-y-4">
                            {recentConcepts.length > 0 ? recentConcepts.map((card, idx) => (
                                <ConceptCard key={idx} card={card} compact />
                            )) : (
                                <div className="text-sm text-zinc-500 py-4 text-center">
                                    리뷰를 통해 새로운 개념 카드를 모아보세요!
                                </div>
                            )}
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
