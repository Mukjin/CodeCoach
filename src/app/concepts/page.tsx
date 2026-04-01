'use client';

import { useState } from 'react';
import { Search, Flame, Calendar, Star, BookOpen } from 'lucide-react';
import ConceptCardGrid from '@/components/ConceptCardGrid';
import { useHistoryStore } from '@/store/historyStore';

export default function ConceptsPage() {
    const { getAllConcepts } = useHistoryStore();
    const mockCards = getAllConcepts();

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
