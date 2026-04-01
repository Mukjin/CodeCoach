'use client';

import { useState } from 'react';
import { useReviewStore } from '@/store/reviewStore';
import { useHistoryStore } from '@/store/historyStore';
import CodeEditor from '@/components/CodeEditor';
import ReviewResultPanel from '@/components/ReviewResult';
import { Play, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const LANGUAGE_OPTIONS = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
];

export default function ReviewPage() {
    const {
        code,
        language,
        isLoading,
        reviewResult,
        streamingText,
        error,
        setCode,
        setLanguage,
        setLoading,
        setReviewResult,
        setStreamingText,
        appendStreamingText,
        setError,
        reset,
    } = useReviewStore();

    const [highlightLine, setHighlightLine] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!code.trim()) {
            setError('코드를 입력해주세요.');
            return;
        }

        reset();
        setLoading(true);
        setStreamingText('');

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language }),
            });

            if (!response.ok) {
                throw new Error(`API 오류: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    fullText += chunk;
                    appendStreamingText(chunk);
                }
            }

            // 스트리밍이 끝나면 JSON 파싱 시도
            try {
                const cleaned = fullText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const parsed = JSON.parse(cleaned);
                setReviewResult(parsed);

                // 실제 제출 데이터 히스토리 저장
                useHistoryStore.getState().addSubmission({
                    code,
                    language,
                    result: parsed,
                });
            } catch (e) {
                console.error('JSON 파싱 실패:', fullText);
                setError('리뷰 결과 형식이 올바르지 않습니다.');
            }
        } catch (err: any) {
            setError(err.message || '리뷰 생성 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto p-4 md:p-6 h-screen flex flex-col md:flex-row gap-6 pb-24 md:pb-8">
            {/* 1컬럼: 코드 입력 */}
            <div className="flex-1 flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold text-white">코드 에디터</h2>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isLoading}
                            className="bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none min-w-[120px]"
                        >
                            {LANGUAGE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !code.trim()}
                        className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                분석 중...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                리뷰 받기
                            </>
                        )}
                    </button>
                </div>

                <div className="flex-1 relative">
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language={language}
                        height="100%"
                        highlightLine={highlightLine}
                        readOnly={isLoading}
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
                    {!isLoading && !reviewResult && !streamingText && !error && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <Sparkles className="w-12 h-12 text-zinc-600 mb-4" />
                            <p className="text-zinc-400 text-sm">
                                코드를 입력하고 분석을 시작해보세요.<br />
                                약점을 파악하고 성장을 도와드립니다.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* 스트리밍 중일 때 원시 텍스트 표시 */}
                    {isLoading && !reviewResult && streamingText && (
                        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 font-mono text-xs text-zinc-300 whitespace-pre-wrap">
                            <span className="streaming-cursor">{streamingText}</span>
                        </div>
                    )}

                    {/* 파싱된 리뷰 결과 표시 */}
                    {reviewResult && (
                        <ReviewResultPanel
                            result={reviewResult}
                            onLineClick={(line) => setHighlightLine(line)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
