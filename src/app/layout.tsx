import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeCoach - AI 코드 학습 코치',
  description: '코드를 제출할수록 나의 약점을 파악하고 개인화된 학습 로드맵을 제공하는 AI 코드 학습 코치 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-white antialiased`}>
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1 ml-16 md:ml-56 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
