'use client';

import { useState } from 'react';
import { Search, Flame, Calendar, Star } from 'lucide-react';
import ConceptCardGrid from '@/components/ConceptCardGrid';

const mockCards = [
    {
        name: '클로저(Closure)',
        definition: '함수가 선언될 당시의 렉시컬 환경을 기억하는 함수',
        contextExplanation: '은닉화나 상태 유지를 위해 자주 사용되는 패턴입니다.',
        exampleCode: 'function makeCounter() {\n  let count = 0;\n  return function() {\n    return count++;\n  };\n}',
        studyKeywords: ['렉시컬 스코프', '실행 컨텍스트', '캡슐화'],
        difficulty: 'intermediate' as const,
    },
    {
        name: '호이스팅',
        definition: '변수나 함수 선언 코드가 최상단으로 끌어올려진 것처럼 동작하는 현상',
        contextExplanation: 'var와 let/const의 차이를 이해하는 핵심입니다.',
        exampleCode: 'console.log(a); // undefined\nvar a = 1;\n\nconsole.log(b); // ReferenceError\nlet b = 2;',
        studyKeywords: ['TDZ', '스코프', 'var vs let'],
        difficulty: 'beginner' as const,
    },
    {
        name: '제너레이터',
        definition: '함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능',
        contextExplanation: '비동기 처리나 무한 시퀀스 생성에 유용합니다.',
        exampleCode: 'function* idMaker() {\n  let index = 0;\n  while (true)\n    yield index++;\n}\nconst gen = idMaker();',
        studyKeywords: ['이터레이터', 'yield', '비동기'],
        difficulty: 'advanced' as const,
    }
];

export default function ConceptsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'review' | 'bookmarked'>('all');

    const filteredCards = mockCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.studyKeywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="w-full max-w-[1800px] mx-auto p-4 md:p-8 pb-32">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">개념 노트</h1>
                <p className="text-zinc-400">코드 리뷰에서 수집한 나의 CS/수학 개념 트리입니다.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                {/* 탭 */}
                <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'all' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-300'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <BookOpen className="w-4 h-4" />전체 보기
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'review' ? 'bg-purple-600 border border-purple-500 text-white shadow-sm' : 'text-zinc-400 hover:text-purple-400'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Flame className="w-4 h-4" />오늘의 복습
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('bookmarked')}
                        className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'bookmarked' ? 'bg-zinc-800 text-yellow-400 shadow-sm' : 'text-zinc-400 hover:text-yellow-400'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Star className="w-4 h-4" />중요 표시
                        </div>
                    </button>
                </div>

                {/* 검색창 */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="개념명이나 키워드로 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
                    />
                </div>
            </div>

            <ConceptCardGrid cards={filteredCards} />
        </div>
    );
}

// 아이콘 임포트를 위해 추가
import { BookOpen } from 'lucide-react';
