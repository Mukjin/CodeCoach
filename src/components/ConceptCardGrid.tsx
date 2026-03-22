'use client';

import { ConceptCardRaw } from '@/types';
import ConceptCard from './ConceptCard';

interface ConceptCardGridProps {
    cards: ConceptCardRaw[];
    emptyMessage?: string;
}

export default function ConceptCardGrid({ cards, emptyMessage = '저장된 개념 카드가 없습니다.' }: ConceptCardGridProps) {
    if (!cards || cards.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 border-dashed">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
                <ConceptCard key={idx} card={card} />
            ))}
        </div>
    );
}
