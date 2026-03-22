import Link from 'next/link';
import { ArrowRight, Code2, Brain, Zap, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-zinc-950 px-4 md:px-0 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-32 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">
          <SparklesIcon className="w-4 h-4" />
          <span>단순한 리뷰를 넘어선 AI 학습 코치</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mb-8">
          Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Coach</span>와 함께
          <br />
          <span className="text-zinc-300">알고리즘 마스터하기</span>
        </h1>

        <p className="text-zinc-400 text-center max-w-2xl text-lg md:text-xl mb-12">
          코드만 제출하세요. 약점을 분석하고, 맞춤형 개념을 알려주며, 당신만의 완벽한 학습 로드맵을 그려드립니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">대시보드로 시작하기</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/review"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white font-medium rounded-2xl transition-all"
          >
            <Code2 className="w-5 h-5" />
            <span>바로 코드 리뷰받기</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto w-full pb-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Brain}
            title="스마트 개념 카드"
            description="코드에 사용된 핵심 CS 개념을 추출하여 자동으로 공부 노트를 만들어줍니다. 망각 곡선에 맞춘 복습까지!"
            color="text-purple-400"
            bg="bg-purple-500/10"
            border="border-purple-500/20"
          />
          <FeatureCard
            icon={Target}
            title="반복 약점 분석"
            description="자주 틀리는 패턴을 AI가 귀신같이 찾아냅니다. 나의 진짜 약점이 무엇인지 데이터로 확인하세요."
            color="text-indigo-400"
            bg="bg-indigo-500/10"
            border="border-indigo-500/20"
          />
          <FeatureCard
            icon={Zap}
            title="맞춤형 로드맵 & 챌린지"
            description="나의 실력과 패턴에 딱 맞는 다음 학습 스텝을 제안하고, 약점 극복을 위한 특별 챌린지를 생성합니다."
            color="text-emerald-400"
            bg="bg-emerald-500/10"
            border="border-emerald-500/20"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, bg, border }: any) {
  return (
    <div className={`p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:bg-zinc-900/60 hover:border-zinc-700`}>
      <div className={`w-14 h-14 rounded-2xl ${bg} ${border} border flex items-center justify-center mb-6`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
