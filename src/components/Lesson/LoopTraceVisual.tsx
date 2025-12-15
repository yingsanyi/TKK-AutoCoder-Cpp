import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ChevronRight, Pause, Table2 } from 'lucide-react';

export interface TraceStep {
  step: number;
  line: number; // 1-based line number
  variables: Record<string, string | number>;
  desc: string;
  output?: string;
}

interface LoopTraceVisualProps {
  code: string;
  steps: TraceStep[];
  title?: string;
}

export const LoopTraceVisual: React.FC<LoopTraceVisualProps> = ({ code, steps, title = "变量追踪表" }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const codeLines = code.split('\n');
  const maxSteps = steps.length - 1;
  const currentStepData = steps[currentStepIndex];

  // Get all unique variable names from the first step (or scan all steps if vars appear dynamically)
  // Assuming all vars are present in all steps for table consistency, or at least in the last step?
  // Let's scan all steps to get a superset of keys
  const variableNames: string[] = Array.from(new Set(steps.flatMap(s => Object.keys(s.variables))));

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000); // 1 second per step
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps]);

  // Auto-scroll table to bottom when step changes
  useEffect(() => {
    if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [currentStepIndex]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm my-6 flex flex-col">
      {/* Header */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 border-b border-indigo-100 dark:border-indigo-800 flex flex-wrap gap-4 justify-between items-center shrink-0">
        <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
          <Table2 size={18} /> {title}
        </h4>
        <div className="flex gap-2">
           <button 
             onClick={() => { setCurrentStepIndex(0); setIsPlaying(false); }}
             className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 transition-colors"
             title="重置"
           >
             <RotateCcw size={16} />
           </button>
           <button 
             onClick={() => {
                if (currentStepIndex >= maxSteps) setCurrentStepIndex(0);
                setIsPlaying(!isPlaying);
             }}
             className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
           >
             {isPlaying ? <><Pause size={14}/> 暂停</> : <><Play size={14}/> {currentStepIndex >= maxSteps ? '重放' : '自动播放'}</>}
           </button>
           <button 
             onClick={() => setCurrentStepIndex(s => Math.min(s + 1, maxSteps))}
             disabled={isPlaying || currentStepIndex >= maxSteps}
             className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 disabled:opacity-50"
           >
             单步 <ChevronRight size={14} />
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[400px]"> {/* Fixed height for scroll areas */}
        
        {/* Code View (Left) */}
        <div className="flex-1 bg-[#1e1e1e] font-mono text-sm overflow-auto p-4 border-r border-slate-700">
           {codeLines.map((lineContent, idx) => {
             const lineNum = idx + 1;
             const isCurrent = currentStepData.line === lineNum;
             return (
               <div 
                key={idx} 
                className={`px-2 py-0.5 rounded transition-colors flex ${isCurrent ? 'bg-indigo-500/40 text-white' : 'text-slate-400'}`}
               >
                 <span className="text-slate-600 w-6 shrink-0 text-right mr-4 select-none">{lineNum}</span>
                 <span className="whitespace-pre">{lineContent}</span>
               </div>
             );
           })}
        </div>

        {/* Trace Table (Right) */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 flex flex-col min-w-0">
           {/* Table Header */}
           <div className="grid bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border-b border-slate-300 dark:border-slate-700 shrink-0"
                style={{ gridTemplateColumns: `3rem 3rem ${variableNames.map(() => '1fr').join(' ')} 1.5fr` }}>
              <div className="p-2 text-center border-r border-slate-300 dark:border-slate-700">步数</div>
              <div className="p-2 text-center border-r border-slate-300 dark:border-slate-700">行号</div>
              {variableNames.map(v => (
                  <div key={v} className="p-2 text-center border-r border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">{v}</div>
              ))}
              <div className="p-2 pl-4">说明/输出</div>
           </div>

           {/* Table Body (Scrollable) */}
           <div ref={tableContainerRef} className="overflow-y-auto flex-1 p-0 scroll-smooth">
              {steps.slice(0, currentStepIndex + 1).map((step, idx) => {
                  const isLast = idx === currentStepIndex;
                  return (
                    <div 
                        key={idx} 
                        className={`grid text-xs transition-colors border-b border-slate-200 dark:border-slate-700/50 ${isLast ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        style={{ gridTemplateColumns: `3rem 3rem ${variableNames.map(() => '1fr').join(' ')} 1.5fr` }}
                    >
                        <div className="p-2 text-center text-slate-500 border-r border-slate-200 dark:border-slate-700/50">{idx}</div>
                        <div className="p-2 text-center font-mono text-slate-500 border-r border-slate-200 dark:border-slate-700/50">{step.line}</div>
                        {variableNames.map(v => (
                            <div key={v} className="p-2 text-center font-mono font-bold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700/50">
                                {step.variables[v] ?? '-'}
                            </div>
                        ))}
                        <div className="p-2 pl-4 text-slate-600 dark:text-slate-400">
                            <div>{step.desc}</div>
                            {step.output && (
                                <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded inline-block">
                                    out: {step.output}
                                </div>
                            )}
                        </div>
                    </div>
                  );
              })}
           </div>
        </div>
      </div>
    </div>
  );
};
