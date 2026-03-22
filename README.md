# 🚀 CodeCoach - AI-Powered Code Learning Platform

> 단순한 코드 피드백을 넘어, 개발자의 지속적인 성장을 돕는 **AI 코드 학습 코치 플랫폼**입니다. 사용자가 코드를 제출하면 퀄리티 점수와 리뷰뿐만 아니라, 부족한 CS/수학 개념을 '개념 카드' 형태로 수집해주고, 이를 바탕으로 맞춤형 학습 로드맵과 챌린지를 제공합니다.

<img width="1914" height="957" alt="스크린샷 2026-03-23 오전 2 48 47" src="https://github.com/user-attachments/assets/ad4235b3-d73f-4fb6-8307-c142c463a3b4" />


https://github.com/user-attachments/assets/e12754ab-86c9-426a-bfbd-b997c2d8409a



## ✨ 주요 기능 (Features)

- **📝 실시간 AI 코드 리뷰**: Monaco 에디터 상에서 코드를 작성하고 제출하면, Gemini AI가 라인별 분석 결과와 개선 코드를 실시간 스트리밍으로 제공합니다.

- **📚 맞춤형 개념 노트 (Concept Cards)**: 리뷰 중 파악된 핵심 개념과 약점을 인터랙티브한 '플립 애니메이션 카드'로 발급받아 모아볼 수 있습니다.

- **📈 성취도 시각화 대시보드**: 깃허브 잔디(HeatMap) 스타일의 학습 빈도 시각화 및 누적된 코드 퀄리티 점수를 차트로 보여줍니다.

- **🗺️ 개인화된 학습 로드맵**: 수집된 개념 카드와 약점 패턴을 분석하여, 내가 앞으로 공부해야 할 방향을 타임라인 형태의 커리큘럼으로 제공받습니다.

- **⚔️ 타겟팅 코딩 챌린지**: 반복적으로 틀리는 약점 패턴(Weak Patterns)을 극복할 수 있도록, AI가 관련 알고리즘 문제를 출제하고 단계별 힌트를 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State Management:** Zustand
- **Components:** Monaco Editor (`@monaco-editor/react`), Recharts, Lucide Icons

### Backend & AI & DB
- **Database / Auth:** Firebase (Firestore, Firebase Admin)
- **AI Model:** Google Gemini API (`gemini-2.5-flash`)
- **API Architecture:** Next.js Route Handlers (Serverless Functions)

---

## ⚙️ 시작하기 (Getting Started)

### 1. 레포지토리 클론 및 의존성 설치
```bash
git clone https://github.com/your-username/codecoach.git
cd codecoach
npm install
```

### 2. 환경 변수 설정
루트 디렉토리에 `.env.local` 파일을 생성하고 아래의 템플릿을 참고하여 키를 기입해주세요.

```bash
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key

# Firebase Client (Auth, Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (서버 사이드 접근 권한용)
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`에 접속하여 플랫폼을 확인할 수 있습니다.

---

## 📡 API 문서화 (API Reference)

### 1. `POST /api/review`
제출된 코드를 평가하고 리뷰 데이터를 **스트리밍(Streaming) JSON** 형태로 반환합니다.
- **Body:** `{ "code": "string", "language": "string" }`
- **Response Format:**
  ```json
  {
    "score": 8.5,
    "summary": "전반적인 코드 구조는 좋으나 에러 핸들링이 부족합니다.",
    "issues": [{ "lineNumber": 12, "description": "...", "severity": "warning", "improvedCode": "..." }],
    "conceptCards": [{ "name": "Error Handling", "definition": "...", "exampleCode": "..." }],
    "weakPatterns": ["예외 처리 누락"],
    "growthInsight": "안전한 코드 작성을 위해 try-catch 패턴을 도입해보세요."
  }
  ```

### 2. `GET /api/roadmap`
사용자의 누적된 활동, 개념 카드, 약점 데이터를 기반으로 다음 학습 패스를 추천합니다.
- **Response Format:**
  ```json
  [
    {
      "title": "비동기 프로그래밍 기초",
      "description": "최근 잦은 오류가 발견된 비동기 처리를 정복하세요.",
      "estimatedHours": 3,
      "tag": "needs-review"
    }
  ]
  ```

### 3. `GET /api/challenge`
현재 사용자의 약점 패턴(`weakPatterns`)을 공략하는 코딩 테스트 문제를 출제합니다.
- **Response Format:**
  ```json
  {
    "title": "안전한 비동기 데이터 패치 구현하기",
    "description": "주어진 외부 API 호출 함수를 try-catch 포맷으로 래핑하세요.",
    "difficulty": "medium",
    "hints": ["Promise 체이닝을 사용할지 async/await을 사용할지 결정하세요.", "catch 블록에서 에러 로그를 남기세요."]
  }
  ```

---

## 💡 향후 개선 사항 (Future Roadmap)

- [ ] **실제 Firebase / Supabase DB 연동 완료:** 현재 설계된 인터페이스와 API를 바탕으로, 실제 FireStore Read/Write 로직과 사용자 인증(Auth)의 프론트 연동.
- [ ] **GitHub 연동(OAuth):** 사용자가 PR을 올릴 때 자동으로 CodeCoach가 동작하여 리뷰 코멘트를 달아주는 CI/CD 봇 기능.
- [ ] **커뮤니티 기능 & 랭킹보드:** 다른 코치 파트너들과 코드 리뷰 결과를 공유하고, 일일 스트릭(Streak)을 겨루는 소셜 플랫폼.
- [ ] **에디터 환경 고도화:** VSC 수준의 인텔리센스 및 다중 파일 프로젝트 샌드박스 지원.

---

<p align="center">
  Built with ❤️ by <b>CodeCoach Team</b>
</p>
