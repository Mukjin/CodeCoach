'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import type * as Monaco from 'monaco-editor';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#1e1e1e] animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-zinc-500 text-sm">에디터 로딩 중...</span>
        </div>
    ),
});

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    height?: string;
    highlightLine?: number | null;
    readOnly?: boolean;
}

export default function CodeEditor({
    value,
    onChange,
    language = 'javascript',
    height = '500px',
    highlightLine,
    readOnly = false,
}: CodeEditorProps) {
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

    const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
    };

    // 특정 라인 하이라이트
    if (editorRef.current && highlightLine) {
        editorRef.current.revealLineInCenter(highlightLine);
        editorRef.current.deltaDecorations(
            [],
            [
                {
                    range: {
                        startLineNumber: highlightLine,
                        startColumn: 1,
                        endLineNumber: highlightLine,
                        endColumn: 1,
                    },
                    options: {
                        isWholeLine: true,
                        className: 'bg-yellow-500/20',
                        glyphMarginClassName: 'bg-yellow-500',
                    },
                },
            ]
        );
    }

    return (
        <MonacoEditor
            height={height}
            language={language}
            value={value}
            theme="vs-dark"
            onChange={(val) => onChange(val || '')}
            onMount={handleEditorDidMount}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                roundedSelection: true,
                cursorBlinking: 'smooth',
                readOnly,
                padding: { top: 16, bottom: 16 },
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
            }}
        />
    );
}
