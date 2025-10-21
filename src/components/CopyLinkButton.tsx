import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyLinkButtonProps {
  stepNumber: number;
  onCopy: (stepNumber: number) => void;
  className?: string;
}

export function CopyLinkButton({ stepNumber, onCopy, className = '' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(stepNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors ${className}`}
      title={`Copy link to Step ${stepNumber}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy link</span>
        </>
      )}
    </button>
  );
}
