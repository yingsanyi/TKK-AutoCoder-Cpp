import React from 'react';
import { CodeBlock } from './CodeBlock';
import { ExternalLink } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Inline parser for bold, code, links, and math
const renderInline = (text: string): React.ReactNode[] => {
  // Regex for different tokens
  // Math: $...$ or $$...$$
  // Link: [text](url) or https://...
  // Bold: **text**
  // Code: `text`
  
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 0. Check for Math ($...$ or $$...$$)
    // Need to handle escaped dollar signs? Assuming standard markdown
    // Inline Math: $...$
    // Block Math: $$...$$ (though usually handled as block, sometimes inline)
    
    // Check for $$...$$
    if (remaining.startsWith('$$')) {
      const endIdx = remaining.indexOf('$$', 2);
      if (endIdx !== -1) {
        const math = remaining.slice(2, endIdx);
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          tokens.push(
            <span key={key++} dangerouslySetInnerHTML={{ __html: html }} className="inline-math" />
          );
        } catch (e) {
          tokens.push(<span key={key++}>$$ {math} $$</span>);
        }
        remaining = remaining.slice(endIdx + 2);
        continue;
      }
    }

    // Check for $...$
    if (remaining.startsWith('$')) {
      // Find closing $, ensuring it's not escaped (simple check)
      const endIdx = remaining.indexOf('$', 1);
      if (endIdx !== -1) {
        const math = remaining.slice(1, endIdx);
        // Ensure not empty
        if (math.trim()) {
           try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            tokens.push(
              <span key={key++} dangerouslySetInnerHTML={{ __html: html }} className="inline-math" />
            );
          } catch (e) {
            tokens.push(<span key={key++}>$ {math} $</span>);
          }
          remaining = remaining.slice(endIdx + 1);
          continue;
        }
      }
    }

    // 1. Check for Markdown Link [text](url)
    const mdLinkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (mdLinkMatch) {
      tokens.push(
        <a 
          key={key++} 
          href={mdLinkMatch[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
        >
          {mdLinkMatch[1]} <ExternalLink size={12} />
        </a>
      );
      remaining = remaining.slice(mdLinkMatch[0].length);
      continue;
    }

    // 2. Check for Raw URL https://...
    const rawUrlMatch = remaining.match(/^(https?:\/\/[^\s]+)/);
    if (rawUrlMatch) {
      tokens.push(
        <a 
          key={key++} 
          href={rawUrlMatch[1]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5 break-all"
        >
          {rawUrlMatch[1]} <ExternalLink size={12} />
        </a>
      );
      remaining = remaining.slice(rawUrlMatch[0].length);
      continue;
    }

    // 3. Check for Bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      tokens.push(
        <strong key={key++} className="font-bold text-slate-900 dark:text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 4. Check for Inline Code `text`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      tokens.push(
        <code key={key++} className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono text-sm border border-slate-200 dark:border-slate-600 mx-0.5">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 6. Plain Text (until next special char)
    // Find index of next possible start
    const nextSpecial = remaining.search(/(\$|\[|https?:|\*\*|`)/);
    if (nextSpecial === -1) {
      tokens.push(<span key={key++}>{remaining}</span>);
      remaining = '';
    } else if (nextSpecial === 0) {
      // If we matched a special char but it didn't match a rule (e.g. single * or incomplete link or single $ not closed), skip one char
      tokens.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    } else {
      tokens.push(<span key={key++}>{remaining.slice(0, nextSpecial)}</span>);
      remaining = remaining.slice(nextSpecial);
    }
  }

  return tokens;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // 1. Split by Code Blocks first (Triple backticks)
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className={`space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed ${className}`}>
      {parts.map((part, index) => {
        // Handle Code Blocks
        if (part.startsWith('```') && part.endsWith('```')) {
          const content = part.slice(3, -3);
          const firstLineBreak = content.indexOf('\n');
          let language = 'cpp'; 
          let code = content;
          
          if (firstLineBreak > -1) {
            const firstLine = content.slice(0, firstLineBreak).trim();
            // Normalize language names if needed
            if (firstLine && !firstLine.includes(' ')) {
              language = firstLine.toLowerCase();
              if (language === 'c++') language = 'cpp';
              code = content.slice(firstLineBreak + 1);
            }
          }
          return (
            <div key={index} className="not-prose">
              <CodeBlock code={code.trim()} language={language} />
            </div>
          );
        }

        // Handle Non-Code Blocks (Markdown Text)
        if (!part.trim()) return null;

    // List parsing logic
    const renderList = (lines: string[], keyPrefix: number) => {
      interface ListNode {
        type: 'ul' | 'ol';
        content: string;
        level: number;
        start?: number;
        children: ListNode[];
      }

      const root: ListNode[] = [];
      const stack: ListNode[] = [];

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const leadingSpaces = line.search(/\S|$/);
        let type: 'ul' | 'ol' = 'ul';
        let content = '';
        let start: number | undefined;

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          type = 'ul';
          content = trimmed.slice(2).trim();
        } else {
          const match = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (match) {
            type = 'ol';
            start = parseInt(match[1], 10);
            content = match[2].trim();
          } else {
            if (stack.length > 0) {
              const lastNode = stack[stack.length - 1];
              lastNode.content += ' ' + trimmed;
              return;
            }
            return;
          }
        }

        const node: ListNode = { type, content, level: leadingSpaces, start, children: [] };

        // Find parent
        while (stack.length > 0 && stack[stack.length - 1].level >= leadingSpaces) {
          stack.pop();
        }

        if (stack.length === 0) {
          root.push(node);
        } else {
          stack[stack.length - 1].children.push(node);
        }
        stack.push(node);
      });

      const renderNodes = (nodes: ListNode[]): React.ReactNode => {
        if (nodes.length === 0) return null;

        const groups: ListNode[][] = [];
        let currentGroup: ListNode[] = [];

        nodes.forEach((node) => {
          if (currentGroup.length === 0) {
            currentGroup.push(node);
          } else {
            if (node.type === currentGroup[0].type) {
              currentGroup.push(node);
            } else {
              groups.push(currentGroup);
              currentGroup = [node];
            }
          }
        });
        if (currentGroup.length > 0) groups.push(currentGroup);

        return groups.map((group, i) => {
          const Tag = group[0].type;
          const className = Tag === 'ul' 
            ? "list-disc list-outside ml-5 space-y-1" 
            : "list-decimal list-outside ml-5 space-y-1";
          
          return (
            <Tag key={i} className={className} start={group[0].start}>
              {group.map((node, j) => (
                <li key={j} className="pl-1">
                  {renderInline(node.content)}
                  {node.children.length > 0 && renderNodes(node.children)}
                </li>
              ))}
            </Tag>
          );
        });
      };

      return <div key={keyPrefix} className="my-2">{renderNodes(root)}</div>;
    };

    // Table parsing logic
    const renderTable = (lines: string[], keyPrefix: number) => {
      if (lines.length < 2) return null;
      
      const headerLine = lines[0];
      const separatorLine = lines[1];
      const bodyLines = lines.slice(2);
      
      const parseRow = (line: string) => {
        return line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
      };
      
      const headers = parseRow(headerLine);
      const alignments = parseRow(separatorLine).map(cell => {
        const c = cell.trim();
        if (c.startsWith(':') && c.endsWith(':')) return 'center';
        if (c.endsWith(':')) return 'right';
        return 'left';
      });
      
      const getAlignClass = (align: string) => {
        switch(align) {
            case 'center': return 'text-center';
            case 'right': return 'text-right';
            default: return 'text-left';
        }
      };
      
      return (
        <div key={`table-${keyPrefix}`} className="overflow-x-auto my-4 border rounded-lg border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className={`px-4 py-2 font-semibold text-slate-900 dark:text-slate-100 ${getAlignClass(alignments[i])}`}>
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {bodyLines.map((line, i) => {
                const cells = parseRow(line);
                return (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    {cells.map((cell, j) => (
                      <td key={j} className={`px-4 py-2 ${getAlignClass(alignments[j])}`}>
                        {renderInline(cell)}
                      </td>
                    ))}
                     {/* Fill missing cells */}
                     {Array.from({ length: Math.max(0, headers.length - cells.length) }).map((_, j) => (
                         <td key={cells.length + j} className="px-4 py-2"></td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    // Split text into lines to handle block elements (Headers, Lists, Quotes)
        const lines = part.split('\n');
        const renderedBlocks: React.ReactNode[] = [];
        let listLines: string[] = [];
        let tableLines: string[] = [];

        const flushList = (keyPrefix: number) => {
            if (listLines.length > 0) {
                renderedBlocks.push(renderList(listLines, keyPrefix));
                listLines = [];
            }
        };

        const flushTable = (keyPrefix: number) => {
            if (tableLines.length > 0) {
                renderedBlocks.push(renderTable(tableLines, keyPrefix));
                tableLines = [];
            }
        };

        const flushAll = (keyPrefix: number) => {
            flushList(keyPrefix);
            flushTable(keyPrefix);
        };

        lines.forEach((line, lineIdx) => {
            const trimmed = line.trim();
            
            // Check if inside table
            if (tableLines.length > 0) {
                if (line.trim().includes('|')) {
                    tableLines.push(line);
                    return;
                } else {
                    flushTable(lineIdx);
                }
            }

            if (!trimmed) {
                if (listLines.length > 0) {
                    listLines.push(line);
                } else {
                    flushAll(lineIdx);
                }
                return;
            }

            // Check for new table start
            if (trimmed.includes('|')) {
                const nextLine = lines[lineIdx + 1];
                if (nextLine && nextLine.trim().match(/^[\s|:-]+$/) && nextLine.includes('-')) {
                    flushAll(lineIdx);
                    tableLines.push(line);
                    return;
                }
            }

            // Headers
            if (trimmed.startsWith('#')) {
                flushAll(lineIdx);
                const level = trimmed.match(/^#+/)?.[0].length || 1;
                const text = trimmed.slice(level).trim();
                const HeaderTag = `h${Math.min(level + 2, 6)}` as React.ElementType; // Start from h3
                
                let headerClass = "font-bold text-slate-900 dark:text-white mt-6 mb-3";
                if (level === 1) headerClass += " text-2xl border-b pb-2";
                else if (level === 2) headerClass += " text-xl";
                else headerClass += " text-lg";

                renderedBlocks.push(
                    <HeaderTag key={`${index}-${lineIdx}`} className={headerClass}>
                        {renderInline(text)}
                    </HeaderTag>
                );
                return;
            }

            // Blockquotes
            if (trimmed.startsWith('>')) {
                flushAll(lineIdx);
                const text = trimmed.slice(1).trim();
                renderedBlocks.push(
                    <div key={`${index}-${lineIdx}`} className="border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800/50 p-4 my-4 rounded-r-lg italic text-slate-600 dark:text-slate-400">
                        {renderInline(text)}
                    </div>
                );
                return;
            }

            // Lists
            // Check if it's a list item
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s+/.test(trimmed)) {
                // If there's a pending table, flush it first
                flushTable(lineIdx);
                
                // Add to list lines
                listLines.push(line);
                return;
            }
            
            // Check if it's an indented line following a list item (multiline list item content)
            if (listLines.length > 0 && /^\s+/.test(line)) {
                listLines.push(line);
                return;
            }
            
            // Horizontal Rule
            if (trimmed === '---' || trimmed === '***') {
                flushAll(lineIdx);
                renderedBlocks.push(
                    <hr key={`${index}-${lineIdx}`} className="my-6 border-slate-200 dark:border-slate-700" />
                );
                return;
            }

            // Regular Paragraph
            flushAll(lineIdx);
            renderedBlocks.push(
                <p key={`${index}-${lineIdx}`} className="my-2">
                    {renderInline(trimmed)}
                </p>
            );
        });

        flushAll(lines.length);

        return <div key={index}>{renderedBlocks}</div>;
      })}
    </div>
  );
};
