'use client';

import { useState } from 'react';
import { RoadmapStep } from '@/types';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import { Map, Sparkles, Wand2 } from 'lucide-react';

const mockSteps: RoadmapStep[] = [
    {
        step: 1,
        topic: '자바스크립트 실행 컨텍스트 완벽 이해',
        reason: '클로저와 호이스팅 관련 오답이 3회 발생했습니다. 코드가 언제, 어떻게 실행되는지 근본적인 이해가 필요합니다.',
        estimatedDays: 3,
        status: 'completed',
        relatedConcepts: ['실행 컨텍스트', '렉시컬 환경', '호이스팅'],
    },
    {
        step: 2,
        topic: '클로저의 활용과 메모리 누수 방지',
        reason: '가장 자주 틀리는 패턴입니다! 실행 컨텍스트를 이해했다면 이제 클로저를 제대로 활용해봅시다.',
        estimatedDays: 2,
        status: 'current',
        relatedConcepts: ['클로저', '가비지 컬렉션'],
    },
    {
        step: 3,
        topic: '콜백에서 프로미스, 그리고 async/await',
        reason: '비동기 처리 코드에서 콜백 레벨의 코드가 자주 등장합니다. 모던 자바스크립트 비동기 처리에 익숙해질 차례입니다.',
        estimatedDays: 4,
        status: 'locked',
        relatedConcepts: ['Promise', 'async/await', '이벤트 루프'],
    },
    {
        step: 4,
        topic: '배열/객체 고차 함수를 활용한 심화 리팩토링',
        reason: 'for 문의 사용 빈도가 높습니다. map, filter, reduce를 조합하여 간결하고 선언적인 코드를 작성해봅시다.',
        estimatedDays: 3,
        status: 'locked',
        relatedConcepts: ['고차 함수', '불변성', '순수 함수'],
    }
];

export default function RoadmapPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateClick = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 pb-32">
            {/* 헤더 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-2 flex items-center gap-3">
                        <Map className="w-8 h-8 text-purple-400" />
                        나만의 학습 로드맵
                    </h1>
                    <p className="text-zinc-400">나의 제출 데이터와 약점을 분석해 AI가 생성한 1:1 커리큘럼</p>
                </div>

                <button
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-purple-500/50 hover:bg-zinc-800 text-white font-medium rounded-xl transition-all group"
                >
                    {isGenerating ? (
                        <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                    ) : (
                        <Wand2 className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                    )}
                    {isGenerating ? 'AI가 분석 중...' : '로드맵 다시 생성'}
                </button>
            </div>

            {/* 종합 요약 */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <p className="text-xs text-purple-400 font-bold tracking-wider mb-2">CURRENT LEVEL</p>
                        <h2 className="text-2xl font-bold text-white mb-4">Intermediate (중급)</h2>
                        <p className="text-zinc-300 leading-relaxed text-sm">
                            전반적인 기본기는 잘 잡혀 있으나, 고급 자바스크립트 개념(클로저, 실행 컨텍스트)과
                            모던 비동기 처리에서 어려움을 겪는 모습이 보입니다. 우선 실행 컨텍스트의 이해를
                            바탕으로 클로저를 확실히 마스터하는 것을 목표로 합니다.
                        </p>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-xs text-emerald-400 font-bold mb-2">강점 (Strengths)</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-md">기본 문법</span>
                                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-md">DOM 조작</span>
                                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-md">배열/객체 기초</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-orange-400 font-bold mb-2">보완점 (Weaknesses)</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-md">클로저 스코프</span>
                                <span className="text-xs px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-md">이벤트 루프</span>
                                <span className="text-xs px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-md">상태 관리</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2 md:px-6">
                <h3 className="text-lg font-bold text-white mb-8">학습 스텝</h3>
                <RoadmapTimeline steps={mockSteps} />
            </div>

        </div>
    );
}
