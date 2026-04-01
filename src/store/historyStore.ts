import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReviewResult, ConceptCardRaw } from '@/types';

export interface Submission {
    id: string;
    code: string;
    language: string;
    result: ReviewResult;
    timestamp: string;
}

interface HistoryStore {
    submissions: Submission[];
    addSubmission: (submission: Omit<Submission, 'id' | 'timestamp'>) => void;
    getAllConcepts: () => ConceptCardRaw[];
    getWeakPatternsFrequency: () => { pattern: string; count: number }[];
}

export const useHistoryStore = create<HistoryStore>()(
    persist(
        (set, get) => ({
            submissions: [],

            addSubmission: (submission) => set((state) => {
                const newId = `sub-${Date.now()}`;
                const newSubmission: Submission = {
                    ...submission,
                    id: newId,
                    timestamp: new Date().toISOString()
                };
                return { submissions: [newSubmission, ...state.submissions] };
            }),

            getAllConcepts: () => {
                const allConcepts: ConceptCardRaw[] = [];
                const seen = new Set<string>();

                get().submissions.forEach(sub => {
                    sub.result.conceptCards.forEach(card => {
                        if (!seen.has(card.name)) {
                            seen.add(card.name);
                            allConcepts.push(card);
                        }
                    });
                });
                return allConcepts;
            },

            getWeakPatternsFrequency: () => {
                const patternsMap = new Map<string, number>();

                get().submissions.forEach(sub => {
                    sub.result.weakPatterns.forEach(patternStr => {
                        patternsMap.set(patternStr, (patternsMap.get(patternStr) || 0) + 1);
                    });
                });

                return Array.from(patternsMap.entries())
                    .map(([pattern, count]) => ({ pattern, count }))
                    .sort((a, b) => b.count - a.count);
            }
        }),
        {
            name: 'codecoach-history-storage',
        }
    )
);
