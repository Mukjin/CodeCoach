'use client';

import { useState } from 'react';
import { Swords, Filter } from 'lucide-react';
import ChallengeCard from '@/components/ChallengeCard';
import { Challenge } from '@/types';

// 더미 데이터
const mockChallenges: Challenge[] = [
    {
        id: 'c1',
        title: '비동기 커피 메이커 구현',
        difficulty: 'medium',
        description: '원두 갈기(2초), 샷 추출(3초), 우유 데우기(2초) 과정을 비동기로 처리하세요. 단, 우유는 샷 추출과 동시에 데워야 합니다.',
        hints: [
            'Promise.all을 활용해 병렬 처리가 가능한 작업을 파악해보세요.',
            'async/await 구문 안에서 독립적인 비동기 함수 호출은 직렬로 실행됩니다.'
        ],
        relatedConcept: '비동기 병렬 처리',
        completed: false,
        programmersLink: 'https://programmers.co.kr/learn/courses/30/lessons/1234'
    },
    {
        id: 'c2',
        title: '나만의 useState 구현하기',
        difficulty: 'hard',
        description: '클로저를 활용하여 React의 useState 훅과 유사하게 동작하는 함수를 작성하세요. 컴포넌트 리렌더링은 고려하지 않아도 됩니다.',
        hints: [
            '상태값을 유지하기 위해 함수 외부에 값을 보관해야 합니다.',
            '배열 구조 분해 할당을 통해 반환되는 [상태, 세터함수]의 형태를 만들어보세요.'
        ],
        relatedConcept: '클로저(Closure)',
        completed: false,
    },
    {
        id: 'c3',
        title: '안전한 객체 복사 함수 만들기',
        difficulty: 'easy',
        description: '객체의 깊은 복사(Deep Copy)를 수행하는 함수를 구현하세요. 순환 참조는 고려하지 않습니다.',
        hints: [
            'JSON 메소드를 사용하는 방법이 가장 간단하지만 단점이 있습니다.',
            '재귀 함수를 활용하여 객체 내부의 모든 프로퍼티를 복사하는 방법도 있습니다.'
        ],
        relatedConcept: '깊은 복사/얕은 복사',
        completed: true,
    }
];

export default function ChallengesPage() {
    const [filter, setFilter] = useState<'all' | 'todo' | 'completed'>('all');

    const filteredChallenges = mockChallenges.filter(c => {
        if (filter === 'todo') return !c.completed;
        if (filter === 'completed') return c.completed;
        return true;
    });

    return (
        <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Swords className="w-8 h-8 text-emerald-400" />
                        코드 챌린지
                    </h1>
                    <p className="text-zinc-400">나의 약점 개념을 완벽하게 마스터할 맞춤형 트레이닝</p>
                </div>

                {/* 모바일 최적화 필터 */}
                <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                            }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setFilter('todo')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'todo' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-emerald-400'
                            }`}
                    >
                        미완료
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'completed' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                            }`}
                    >
                        완료됨
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        onStart={(c) => console.log('Start challenge:', c.id)}
                    />
                ))}
            </div>

            {filteredChallenges.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 border-dashed mt-6">
                    <Filter className="w-8 h-8 text-zinc-700 mb-2" />
                    <p>해당하는 챌린지가 없습니다.</p>
                </div>
            )}
        </div>
    );
}
