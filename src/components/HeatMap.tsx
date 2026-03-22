'use client';

import { useMemo } from 'react';

interface HeatMapProps {
    data: { date: string; count: number }[];
}

function getDaysInYear() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1);
    const days = [];
    const curr = new Date(start);
    while (curr <= today) {
        days.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
    }
    return days;
}

function getColor(count: number) {
    if (count === 0) return 'bg-zinc-800';
    if (count === 1) return 'bg-purple-900';
    if (count === 2) return 'bg-purple-700';
    if (count >= 3) return 'bg-purple-500';
    return 'bg-zinc-800';
}

export default function HeatMap({ data }: HeatMapProps) {
    const dataMap = useMemo(() => {
        const map = new Map<string, number>();
        data.forEach(({ date, count }) => map.set(date, count));
        return map;
    }, [data]);

    const days = useMemo(() => getDaysInYear(), []);

    // 주 단위로 그룹화
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    days.forEach((day) => {
        if (day.getDay() === 0 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(day);
    });
    if (currentWeek.length > 0) weeks.push(currentWeek);

    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, dIdx) => {
                            const day = week.find((d) => d.getDay() === dIdx);
                            if (!day) return <div key={dIdx} className="w-3 h-3" />;
                            const dateStr = day.toISOString().split('T')[0];
                            const count = dataMap.get(dateStr) || 0;
                            return (
                                <div
                                    key={dIdx}
                                    className={`w-3 h-3 rounded-sm ${getColor(count)} transition-colors hover:opacity-80`}
                                    title={`${dateStr}: ${count}회 제출`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-zinc-600">적음</span>
                {[0, 1, 2, 3].map((c) => (
                    <div key={c} className={`w-3 h-3 rounded-sm ${getColor(c)}`} />
                ))}
                <span className="text-xs text-zinc-600">많음</span>
            </div>
        </div>
    );
}
