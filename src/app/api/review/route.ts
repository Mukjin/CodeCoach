import { getGeminiModel } from '@/lib/geminiClient';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `당신은 시니어 개발자이자 CS 교육자입니다.
코드를 리뷰할 때 단순히 문제를 지적하는 것이 아니라,
해당 코드와 연관된 핵심 CS 개념을 함께 설명해서
개발자가 코드를 고치면서 동시에 개념도 학습할 수 있게 도와줍니다.
반드시 아래 JSON 스키마로만 반환. 마크다운 없이 순수 JSON.`;

export async function POST(req: NextRequest) {
    try {
        const { code, language } = await req.json();

        if (!code || code.trim().length === 0) {
            return new Response(JSON.stringify({ error: '코드를 입력해주세요.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const model = getGeminiModel();

        const userPrompt = `${SYSTEM_PROMPT}

다음 ${language} 코드를 리뷰해주세요.

\`\`\`${language}
${code}
\`\`\`

아래 JSON 스키마로만 반환 (마크다운 코드블록 없이 순수 JSON):
{
  "score": 1~10 사이 숫자,
  "summary": "한 줄 총평",
  "issues": [
    {
      "lineNumber": 숫자 또는 null,
      "description": "문제 설명",
      "severity": "critical 또는 warning 또는 suggestion",
      "improvedCode": "개선 코드 또는 null"
    }
  ],
  "conceptCards": [
    {
      "name": "개념명",
      "definition": "한 줄 정의 (쉬운 말로)",
      "contextExplanation": "이 코드에서 왜 중요한지",
      "exampleCode": "예제 코드 5줄 이내",
      "studyKeywords": ["키워드1", "키워드2", "키워드3"],
      "difficulty": "beginner 또는 intermediate 또는 advanced"
    }
  ],
  "weakPatterns": ["이번 코드에서 감지된 약점 패턴 키워드 배열"],
  "growthInsight": "성장 포인트 한 줄"
}`;

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const result = await model.generateContentStream(userPrompt);
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        controller.enqueue(encoder.encode(text));
                    }
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error) {
        console.error('Review API error:', error);
        return new Response(
            JSON.stringify({ error: '리뷰 생성 중 오류가 발생했습니다.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
