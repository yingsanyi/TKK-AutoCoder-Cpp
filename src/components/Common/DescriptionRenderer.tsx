import React from 'react';

// Helper component to render description with **bold** and `code` support
export const DescriptionRenderer: React.FC<{ text: string }> = ({ text }) => {
  // Split text by **bold** or `code` patterns
  // Pattern: (\*\*.*?\*\*|`.*?`) captures the delimiters and content
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return (
    <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed inline">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-indigo-700 dark:text-indigo-300 font-mono text-sm border border-slate-200 dark:border-slate-600 mx-0.5">{part.slice(1, -1)}</code>;
        }
        return part;
      })}
    </div>
  );
};