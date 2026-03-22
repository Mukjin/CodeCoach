import { getGeminiModel } from '@/lib/geminiClient';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { submissions, conceptCards, weakPatterns } = await req.json();

        const model = getGeminiModel();

        const prompt = `다음은 사용자의 코드 학습 데이터입니다.

제출 이력 요약:
${JSON.stringify(submissions, null, 2)}

누적 개념 카드:
${JSON.stringify(conceptCards, null, 2)}

반복 약점 패턴:
${JSON.stringify(weakPatterns, null, 2)}

이 데이터를 기반으로 개인화된 학습 로드맵을 JSON으로 생성해주세요.
마크다운 없이 순수 JSON만 반환:
{
  "currentLevel": "beginner 또는 intermediate 또는 advanced",
  "summary": "현재 실력 요약 2줄",
  "strengths": ["잘하는 것 3가지"],
  "weaknesses": ["약한 것 3가지"],
  "roadmap": [
    {
      "step": 순서번호,
      "topic": "학습 주제",
      "reason": "왜 이게 필요한지 (사용자 데이터 기반)",
      "estimatedDays": 예상학습기간숫자,
      "status": "locked 또는 current 또는 completed",
      "relatedConcepts": ["관련 개념 카드명 배열"]
    }
  ],
  "nextAction": "지금 당장 해야 할 것 1가지"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // JSON 파싱
        let roadmap;
        try {
            const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            roadmap = JSON.parse(cleaned);
        } catch {
            return Response.json({ error: '로드맵 파싱 실패', raw: text }, { status: 500 });
        }

        return Response.json(roadmap);
    } catch (error) {
        console.error('Roadmap API error:', error);
        return Response.json({ error: '로드맵 생성 중 오류 발생' }, { status: 500 });
    }
}
