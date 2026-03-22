import { WeakPattern } from '@/types';

const RECURRING_THRESHOLD = 3;

export function analyzeWeakPatterns(
    allPatterns: { pattern: string; lastSeenAt: Date }[][]
): Map<string, { count: number; lastSeenAt: Date; firstSeenAt: Date }> {
    const patternMap = new Map<
        string,
        { count: number; lastSeenAt: Date; firstSeenAt: Date }
    >();

    for (const submissionPatterns of allPatterns) {
        for (const { pattern, lastSeenAt } of submissionPatterns) {
            if (!pattern) continue;
            const existing = patternMap.get(pattern);
            if (existing) {
                existing.count += 1;
                if (lastSeenAt > existing.lastSeenAt) {
                    existing.lastSeenAt = lastSeenAt;
                }
            } else {
                patternMap.set(pattern, {
                    count: 1,
                    lastSeenAt,
                    firstSeenAt: lastSeenAt,
                });
            }
        }
    }

    return patternMap;
}

export function classifyPatternStatus(
    pattern: WeakPattern,
    recentSubmissionPatterns: string[][]
): WeakPattern['status'] {
    // 최근 2회 제출에서 해당 패턴이 없으면 "improving"
    const recentTwo = recentSubmissionPatterns.slice(-2);
    const appearsInRecent = recentTwo.some((patterns) =>
        patterns.includes(pattern.pattern)
    );

    if (!appearsInRecent && pattern.count >= RECURRING_THRESHOLD) {
        return 'improving';
    }

    if (pattern.count >= RECURRING_THRESHOLD) {
        return 'recurring';
    }

    return 'improving';
}

export function getTopWeakPatterns(
    patterns: WeakPattern[],
    limit = 3
): WeakPattern[] {
    return patterns
        .filter((p) => p.status === 'recurring')
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

export const RECURRING_THRESHOLD_VALUE = RECURRING_THRESHOLD;
