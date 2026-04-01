'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import ReviewResultPanel from '@/components/ReviewResult';
import { Sparkles, History, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useHistoryStore, Submission } from '@/store/historyStore';

export default function ReviewDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { submissions } = useHistoryStore();
    const [data, setData] = useState<Submission | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Zustand Persist 상태가 Hydrate된 이후에 찾도록 useEffect에서 처리
        const found = submissions.find(sub => sub.id === id);
        setData(found || null);
        setIsLoading(false);
    }, [id, submissions]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
                <p className="text-zinc-400">학습 기록을 불러오는 중입니다...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">기록을 찾을 수 없습니다.</h2>
                <p className="text-zinc-400 mb-6">해당 ID({id})의 리뷰 기록이 존재하지 않거나 브라우저에서 삭제되었습니다.</p>
                <button
                    onClick={() => router.push('/history')}
                    className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                    히스토리 문서로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-4 md:p-6 h-screen flex flex-col md:flex-row gap-6 pb-24 md:pb-8">
            {/* 1컬럼: 코드 에디터 (읽기 전용) */}
            <div className="flex-1 flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50 gap-3">
                    <div className="flex items-center gap-3">
                        <Link href="/history" className="p-1.5 bg-zinc-800/50 hover:bg-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h2 className="text-sm font-semibold text-white">과거 제출 코드</h2>
                            <span className="text-xs text-zinc-500">
                                {new Date(data.timestamp).toLocaleDateString()} {new Date(data.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-2 py-1">
                            {data.language}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium px-3 py-1.5 bg-zinc-800/50 rounded-lg">
                            <History className="w-3.5 h-3.5" />
                            읽기 전용
                        </span>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <CodeEditor
                        value={data.code}
                        onChange={() => { }}
                        language={data.language}
                        height="100%"
                        readOnly={true}
                    />
                </div>
            </div>

            {/* 2컬럼: 리뷰 결과 */}
            <div className="flex-1 flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/40">
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        AI 리뷰 & 학습 코칭 결과
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <ReviewResultPanel
                        result={data.result}
                        onLineClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}
