import React from 'react';
import { CodeBlock } from './CodeBlock';

// Helper component to render description with **bold**, `code` and ```code block``` support
export const DescriptionRenderer: React.FC<{ text: string }> = ({ text }) => {
  // Split text by ```code block```, **bold** or `code` patterns
  // Priority: Triple backticks first
  const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*|`[^`]+?`)/g);

  return (
    <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
      {parts.map((part, index) => {
        // Handle Code Blocks (```language ... ```)
        if (part.startsWith('```') && part.endsWith('```')) {
            const content = part.slice(3, -3);
            // Extract language if specified (e.g. ```cpp)
            const firstLineBreak = content.indexOf('\n');
            let language = 'cpp'; // default
            let code = content;
            
            if (firstLineBreak > -1) {
                const firstLine = content.slice(0, firstLineBreak).trim();
                if (firstLine && !firstLine.includes(' ')) {
                    language = firstLine;
                    code = content.slice(firstLineBreak + 1);
                }
            }
            return (
                <div key={index} className="my-2 not-prose">
                    <CodeBlock code={code.trim()} language={language} />
                </div>
            );
        }

        // Handle Bold (**...**)
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
        }

        // Handle Inline Code (`...`)
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono text-sm border border-slate-200 dark:border-slate-600 mx-0.5">{part.slice(1, -1)}</code>;
        }

        // Handle regular text (preserve newlines if any)
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      })}
    </div>
  );
};