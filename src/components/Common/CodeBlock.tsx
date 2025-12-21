import React from 'react';
import { Copy } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'cpp', label, className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-4 rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e] dark:border-slate-600 shadow-lg ${className}`}>
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] dark:bg-[#252525] border-b border-slate-700 dark:border-slate-600">
        <span className="text-xs font-mono text-slate-300 uppercase">{label || language}</span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
        >
          <Copy size={14} />
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <Highlight
        theme={themes.vsDark}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              fontFamily:
                'Courier New, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
              fontVariantLigatures: 'none',
              letterSpacing: 0
            }}
            className="p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
