import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Highlight, themes } from "prism-react-renderer"

interface CodeBlockProps {
    code: string;
    language?: 'tsx' | 'typescript' | 'javascript' | 'css' | 'html' | 'bash' | string;
    highlightedLines?: number[]; // 1-based line numbers to highlight
    wrap?: boolean; // wrap long lines to avoid horizontal scroll
    maxHeightClass?: string; // allow controlling max height
}

export function CodeBlock({ code, language = 'typescript', highlightedLines = [], wrap = true, maxHeightClass }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error('Copy failed');
        }
    };

    return (
        <div className="relative bg-gray-900 rounded-xl p-6">
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
                aria-label="Copy to clipboard"
            >
                {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                )}
            </button>

            <Highlight
                theme={themes.nightOwl}
                code={code.trim()}
                language={language as any}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={`${className} text-gray-100 font-mono leading-6 text-[13px] md:text-sm ${wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'} ${wrap ? 'overflow-x-hidden' : 'overflow-x-auto'} pr-12 rounded-lg ${maxHeightClass ?? ''}`}
                        style={{ ...style, background: 'transparent' }}
                    >
            {tokens.map((line, i) => {
                const isHighlighted = highlightedLines.includes(i + 1);
                const lineProps = getLineProps({ line, key: i });
                const lineClassName = `${lineProps.className ?? ''} ${isHighlighted ? 'bg-gray-800/60 ring-1 ring-blue-500/40 -mx-6 px-6' : ''}`.trim();
                return (
                    <div key={i} {...lineProps} className={lineClassName}>
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                );
            })}
          </pre>
                )}
            </Highlight>
        </div>
    );
}