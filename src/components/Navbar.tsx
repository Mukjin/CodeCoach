'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Code2,
    BookOpen,
    Map,
    Swords,
    History,
    Brain,
} from 'lucide-react';

const navItems = [
    { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
    { href: '/review', label: '코드 리뷰', icon: Code2 },
    { href: '/concepts', label: '개념 노트', icon: BookOpen },
    { href: '/roadmap', label: '로드맵', icon: Map },
    { href: '/history', label: '히스토리', icon: History },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed left-0 top-0 bottom-0 w-16 md:w-56 bg-zinc-950 border-r border-zinc-800/60 flex flex-col z-50">
            {/* 로고 */}
            <div className="p-4 border-b border-zinc-800/60">
                <a href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-bold text-white">CodeCoach</span>
                </a>
            </div>

            {/* 네비게이션 */}
            <div className="flex-1 py-4 px-2 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(href + '/');
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${isActive
                                ? 'bg-purple-600/20 text-purple-300'
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60'
                                }`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : ''}`} />
                            <span className="hidden md:block text-sm font-medium">{label}</span>
                            {isActive && (
                                <div className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* 하단 */}
            <div className="p-4 border-t border-zinc-800/60">
                <div className="hidden md:flex flex-col gap-1">
                    <p className="text-xs text-zinc-600">AI 학습 코치</p>
                    <p className="text-xs text-zinc-500 font-medium">CodeCoach v1.0</p>
                </div>
            </div>
        </nav>
    );
}
