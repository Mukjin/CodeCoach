'use client';

import { useState } from 'react';
import Link from 'next/link';
import { History, ArrowRight, Code2 } from 'lucide-react';
import { CodeSubmission } from '@/types';

// 더미 데이터
const mockHistory: Partial<CodeSubmission>[] = [
    {
        id: 'sub-1',
        language: 'javascript',
        createdAt: new Date('2026-03-24T10:30:00'),
        reviewResult: {
            score: 6.5,
            summary: '클로저의 활용이 아쉽습니다. 외부 함수의 변수를 내부 함수에서 참조하여 상태를 유지하는 패턴을 익혀보세요.',
            issues: [],
            conceptCards: [],
            weakPatterns: ['클로저(Closure)', '상태 관리'],
            growthInsight: '전역 변수 대신 클로저를 활용하면 더 안전한 코드를 작성할 수 있습니다!'
        }
    },
    {
        id: 'sub-2',
        language: 'typescript',
        createdAt: new Date('2026-03-22T14:15:00'),
        reviewResult: {
            score: 8.5,
            summary: '타입 정의가 명확하고 인터페이스 분리가 잘 되어 있습니다. 다만 제네릭 활용 면에서 개선의 여지가 있습니다.',
            issues: [],
            conceptCards: [],
            weakPatterns: ['제네릭(Generics)'],
            growthInsight: 'any 타입 사용을 줄이고 제네릭으로 유연성을 높여보세요.'
        }
    },
    {
        id: 'sub-3',
        language: 'javascript',
        createdAt: new Date('2026-03-20T09:45:00'),
        reviewResult: {
            score: 4.0,
            summary: '비동기 처리 과정에서 예외 처리가 누락되었습니다. Promise의 reject 상황이나 async/await의 try-catch 패턴 적용이 필요합니다.',
            issues: [],
            conceptCards: [],
            weakPatterns: ['에러 핸들링', '비동기 처리'],
            growthInsight: '네트워크 요청은 항상 실패할 수 있음을 가정하고 코드를 작성해야 합니다.'
        }
    }
];

export default function HistoryPage() {
    const [filterLang, setFilterLang] = useState('all');

    const filteredHistory = mockHistory.filter(h =>
        filterLang === 'all' || h.language === filterLang
    );

    return (
        <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <History className="w-8 h-8 text-blue-400" />
                        제출 히스토리
                    </h1>
                    <p className="text-zinc-400">나의 코드 성장 여정을 한눈에 확인하세요</p>
                </div>

                <select
                    value={filterLang}
                    onChange={(e) => setFilterLang(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none min-w-[140px]"
                >
                    <option value="all">모든 언어</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredHistory.map((item) => (
                    <Link
                        key={item.id}
                        href={`/review/${item.id}`} // 더미 링크, 실제로는 과거 리뷰 상세 페이지
                        className="block bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-800/40 hover:border-zinc-700/60 rounded-2xl p-6 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                                        <Code2 className="w-3 h-3" />
                                        {item.language}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        {item.createdAt?.toLocaleDateString()} {item.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                <p className="text-sm text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                                    {item.reviewResult?.summary}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {item.reviewResult?.weakPatterns?.map((pattern, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-sm">
                                            {pattern}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 shrink-0 md:pl-6 md:border-l border-zinc-800/60">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-white mb-1">
                                        {item.reviewResult?.score.toFixed(1)}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Score</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {filteredHistory.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 border-dashed">
                        <History className="w-8 h-8 text-zinc-700 mb-2" />
                        <p>제출 기록이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
