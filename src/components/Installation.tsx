import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function Installation() {
  const [copied, setCopied] = useState(false);

  const installCommand = 'npm install @mixin-ui/be-interop';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="installation" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Installation
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Get started with @mixin-ui/be-interop in your Angular project
        </p>

        <div className="bg-gray-900 rounded-xl p-6 relative">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
            <code>{installCommand}</code>
          </pre>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              Angular ≥ 19.0.0
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              RxJS ≥ 7.0.0
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              @mixin-ui/cdk ≥ 0.0.1-alpha.1
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
