import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Highlight, themes } from "prism-react-renderer"

interface CodeBlockProps {
    code: string;
    language?: 'tsx' | 'typescript' | 'javascript' | 'css' | 'html' | 'bash' | string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
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
                theme={themes.vsDark}
                code={code.trim()}
                language="ts"
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={`${className} text-gray-100 font-mono text-sm overflow-x-auto pr-12 rounded-lg`}
                        style={{ ...style, background: 'transparent' }}
                    >
            {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                </div>
            ))}
          </pre>
                )}
            </Highlight>
        </div>
    );
}