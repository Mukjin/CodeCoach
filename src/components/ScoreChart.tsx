'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface ScoreChartProps {
    data: { date: string; score: number }[];
}

export default function ScoreChart({ data }: ScoreChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                    dataKey="date"
                    tick={{ fill: '#71717a', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    domain={[0, 10]}
                    tick={{ fill: '#71717a', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: 12,
                    }}
                    formatter={(value: any) => [`${value}점`, '코드 품질']}
                />
                <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ fill: '#a855f7', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#d946ef' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
