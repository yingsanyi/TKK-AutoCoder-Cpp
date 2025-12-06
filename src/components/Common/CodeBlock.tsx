import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'cpp', label }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e] dark:border-slate-600 shadow-lg">
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
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};