import React from 'react';
import { CodeBlock } from './CodeBlock';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Helper component to render description with **bold**, `code`, ```code block``` and $math$ support
export const DescriptionRenderer: React.FC<{ text: string; className?: string; inline?: boolean }> = ({ text, className = '', inline = false }) => {
  // Split text by ```code block```, **bold**, `code` or $math$ patterns
  // Priority: Triple backticks first
  const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*|`[^`]+?`|\$[^$]+?\$)/g);

  const Wrapper = inline ? 'span' : 'div';
  const defaultClasses = inline ? '' : 'text-slate-700 dark:text-slate-300 leading-relaxed space-y-2';

  return (
    <Wrapper className={`${defaultClasses} ${className}`.trim()}>
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
                    <CodeBlock code={code} language={language} />
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

        // Handle Math ($...$)
        if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            try {
                const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
                return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="inline-math mx-1" />;
            } catch (e) {
                return <span key={index}>{part}</span>;
            }
        }

        // Handle regular text (preserve newlines if any)
        return <span key={index} className={inline ? "" : "whitespace-pre-wrap"}>{part}</span>;
      })}
    </Wrapper>
  );
};
