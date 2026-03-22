import { getGeminiModel } from '@/lib/geminiClient';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { weakPatterns, conceptName } = await req.json();

        const model = getGeminiModel();

        const prompt = `사용자의 약점 패턴: ${JSON.stringify(weakPatterns)}
관련 개념: ${conceptName || '일반'}

이 개념을 연습할 수 있는 코딩 문제를 JSON으로 생성해주세요.
마크다운 없이 순수 JSON만 반환:
{
  "title": "문제 제목",
  "difficulty": "easy 또는 medium 또는 hard",
  "description": "문제 설명",
  "inputFormat": "입력 형식",
  "outputFormat": "출력 형식",
  "examples": [
    { "input": "예시 입력", "output": "예시 출력" }
  ],
  "hints": ["단계별 힌트1", "단계별 힌트2", "단계별 힌트3"],
  "relatedConcept": "연관 개념명",
  "baekjoonLink": "관련 백준 문제 링크 또는 null",
  "programmersLink": "관련 프로그래머스 문제 링크 또는 null"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let challenge;
        try {
            const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            challenge = JSON.parse(cleaned);
        } catch {
            return Response.json({ error: '챌린지 파싱 실패', raw: text }, { status: 500 });
        }

        return Response.json(challenge);
    } catch (error) {
        console.error('Challenge API error:', error);
        return Response.json({ error: '챌린지 생성 중 오류 발생' }, { status: 500 });
    }
}
