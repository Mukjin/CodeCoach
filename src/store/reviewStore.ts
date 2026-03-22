import { create } from 'zustand';
import { ReviewResult } from '@/types';

interface ReviewStore {
    code: string;
    language: string;
    tags: string[];
    isLoading: boolean;
    reviewResult: ReviewResult | null;
    streamingText: string;
    error: string | null;
    setCode: (code: string) => void;
    setLanguage: (language: string) => void;
    setTags: (tags: string[]) => void;
    setLoading: (loading: boolean) => void;
    setReviewResult: (result: ReviewResult | null) => void;
    setStreamingText: (text: string) => void;
    appendStreamingText: (text: string) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
    code: '',
    language: 'javascript',
    tags: [],
    isLoading: false,
    reviewResult: null,
    streamingText: '',
    error: null,
    setCode: (code) => set({ code }),
    setLanguage: (language) => set({ language }),
    setTags: (tags) => set({ tags }),
    setLoading: (isLoading) => set({ isLoading }),
    setReviewResult: (reviewResult) => set({ reviewResult }),
    setStreamingText: (streamingText) => set({ streamingText }),
    appendStreamingText: (text) =>
        set((state) => ({ streamingText: state.streamingText + text })),
    setError: (error) => set({ error }),
    reset: () =>
        set({
            isLoading: false,
            reviewResult: null,
            streamingText: '',
            error: null,
        }),
}));
