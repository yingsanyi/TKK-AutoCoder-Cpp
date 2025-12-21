import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ChevronRight, Pause, Layers, ChevronLeft, Sliders, Timer, Image } from 'lucide-react';

export interface StackFrame {
  id: string;
  func: string; // e.g. "fact"
  args: string; // e.g. "n=5"
  returnVal?: string | number;
  isReturning?: boolean;
}

export interface RecursionStep {
  step: number;
  line: number; // 1-based line number in code
  stack: StackFrame[];
  desc: string;
}

interface TraceNode {
  id: string;
  func: string;
  args: string;
  depth: number;
  parentId: string | null;
  children: string[];
  callStep: number;
  returnStep: number;
  returnVal?: string | number;
}

interface RecursionVisualProps {
  code: string;
  steps: RecursionStep[];
  title?: string;
}

export const RecursionVisual: React.FC<RecursionVisualProps> = ({ code, steps, title = "递归调用栈演示" }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1500);
  const [showDiagram, setShowDiagram] = useState(true);
  const [lastChange, setLastChange] = useState<'push' | 'pop' | 'none'>('none');
  const prevLenRef = useRef<number>(steps[0]?.stack.length ?? 0);
  
  const codeLines = code.split('\n');
  const maxSteps = steps.length > 0 ? steps.length - 1 : 0;
  const currentStep = steps[currentStepIndex] || { step: 0, line: 0, stack: [], desc: '' };

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
      }, animationSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, animationSpeed]);

  // Build trace tree
  const traceNodes = React.useMemo(() => {
    const nodesMap = new Map<string, TraceNode>();
    const roots: TraceNode[] = [];
    
    steps.forEach((step, stepIdx) => {
      step.stack.forEach((frame, depth) => {
        if (!nodesMap.has(frame.id)) {
          const parentId = depth > 0 ? step.stack[depth - 1].id : null;
          const node: TraceNode = {
            id: frame.id,
            func: frame.func,
            args: frame.args,
            depth: depth,
            parentId: parentId,
            children: [],
            callStep: stepIdx,
            returnStep: -1
          };
          nodesMap.set(frame.id, node);
          if (parentId) {
            const parent = nodesMap.get(parentId);
            if (parent && !parent.children.includes(frame.id)) {
              parent.children.push(frame.id);
            }
          } else {
            roots.push(node);
          }
        }
        
        const node = nodesMap.get(frame.id)!;
        if (frame.isReturning) {
           if (node.returnStep === -1) node.returnStep = stepIdx;
           node.returnVal = frame.returnVal;
        }
      });
    });
    
    // Flatten for easy rendering
    const flatList: TraceNode[] = [];
    const traverse = (node: TraceNode) => {
      flatList.push(node);
      node.children.forEach(childId => {
        const child = nodesMap.get(childId);
        if (child) traverse(child);
      });
    };
    roots.forEach(traverse);
    return flatList;
  }, [steps]);

  useEffect(() => {
    const prevLen = prevLenRef.current;
    const currLen = currentStep.stack.length;
    if (currLen > prevLen) setLastChange('push');
    else if (currLen < prevLen) setLastChange('pop');
    else setLastChange('none');
    prevLenRef.current = currLen;
  }, [currentStepIndex]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm my-6 flex flex-col">
      {/* Header */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 border-b border-indigo-100 dark:border-indigo-800 flex flex-wrap gap-4 justify-between items-center shrink-0">
        <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
          <Layers size={18} /> {title}
        </h4>
        <div className="flex gap-2 flex-wrap items-center">
           <button 
             onClick={() => { setCurrentStepIndex(0); setIsPlaying(false); }}
             className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 transition-colors"
             title="重置"
           >
             <RotateCcw size={16} />
           </button>
           <button 
             onClick={() => setCurrentStepIndex(s => Math.max(s - 1, 0))}
             disabled={isPlaying || currentStepIndex <= 0}
             className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 disabled:opacity-50"
           >
             单步 <ChevronLeft size={14} />
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
             className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 disabled:opacity-50"
           >
             单步 <ChevronRight size={14} />
           </button>
           <div className="flex items-center gap-2 ml-2">
             <Sliders size={14} className="text-slate-500" />
             <input 
               type="range" 
               min={500} 
               max={3000} 
               step={100} 
               value={animationSpeed} 
               onChange={(e) => setAnimationSpeed(Number(e.target.value))}
               className="w-32 accent-indigo-600"
             />
             <span className="text-xs text-slate-500">{(animationSpeed / 1000).toFixed(1)}s/步</span>
           </div>
           <div className="flex items-center gap-2 ml-2">
             <Timer size={14} className="text-slate-500" />
             <input 
               type="range" 
               min={0} 
               max={maxSteps} 
               value={currentStepIndex} 
               onChange={(e) => { setCurrentStepIndex(Number(e.target.value)); setIsPlaying(false); }} 
               className="w-40 accent-indigo-600"
             />
             <span className="text-xs text-slate-500">{currentStepIndex + 1}/{maxSteps + 1}</span>
           </div>
           <button 
             onClick={() => setShowDiagram(s => !s)}
             className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
           >
             <Image size={14} /> 示意图 {showDiagram ? '开' : '关'}
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[450px]">
        
        {/* Code View (Left) */}
        <div className="flex-1 bg-[#1e1e1e] font-mono text-sm overflow-auto p-4 border-r border-slate-700">
           {codeLines.map((lineContent, idx) => {
             const lineNum = idx + 1;
             const isCurrent = currentStep.line === lineNum;
             return (
               <div 
                key={idx} 
                className={`px-2 py-0.5 rounded transition-colors flex ${isCurrent ? 'bg-indigo-500/40 text-white' : 'text-slate-500'}`}
               >
                 <span className="w-6 inline-block text-slate-600 select-none text-right mr-3 text-xs opacity-50">{lineNum}</span>
                 <pre className="whitespace-pre">{lineContent}</pre>
               </div>
             )
           })}
        </div>

        {/* Stack View (Right) */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 flex flex-col">
            <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                <span>Call Stack (LIFO)</span>
                <span className="text-indigo-600 dark:text-indigo-400">Depth: {currentStep.stack.length}</span>
            </div>
            
            {/* Stack Container - items stack from bottom */}
            <div className="flex-1 flex flex-col-reverse gap-2 overflow-auto p-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 relative">
                {currentStep.stack.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        Empty Stack
                    </div>
                )}
                
                {currentStep.stack.map((frame, idx) => {
                    // Highlight the top frame (active)
                    const isTop = idx === currentStep.stack.length - 1;
                    return (
                        <div 
                            key={frame.id}
                            className={`
                                relative p-3 rounded-lg border-2 shadow-sm transition-all duration-300 transform translate-y-0 opacity-100
                                ${frame.isReturning 
                                    ? 'bg-green-50 border-green-400 dark:bg-green-900/20 dark:border-green-600' 
                                    : isTop 
                                        ? 'bg-white border-indigo-500 dark:bg-slate-800 dark:border-indigo-500 scale-[1.02]' 
                                        : 'bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-600 text-slate-500 scale-95'}
                            `}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`font-bold font-mono ${frame.isReturning ? 'text-green-700 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {frame.func}({frame.args})
                                </span>
                                {frame.isReturning && (
                                    <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
                                        Return: {frame.returnVal}
                                    </span>
                                )}
                            </div>
                            {isTop && !frame.isReturning && (
                                <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 animate-pulse">
                                    Executing...
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Description Box */}
            <div className="mt-4 min-h-[60px] p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 shadow-sm">
                <span className="font-bold text-indigo-600 mr-2">Step {currentStep.step}:</span>
                {currentStep.desc}
            </div>
        </div>

      </div>
      {showDiagram && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
            <span>示意图：调用栈入栈/出栈</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {lastChange === 'push' ? '入栈 ↓' : lastChange === 'pop' ? '出栈 ↑' : '保持'} · Depth: {currentStep.stack.length}
            </span>
          </div>
          {(() => {
            // Render Tree Diagram
            const nodeW = 120;
            const nodeH = 30;
            const gapY = 50;
            const pad = 40;
            
            // Calculate max depth for canvas height
            const maxDepth = traceNodes.length > 0 ? Math.max(...traceNodes.map(n => n.depth)) : 0;
            const width = 400; // Fixed width for now, could be dynamic
            const height = Math.max(300, (maxDepth + 1) * (nodeH + gapY) + pad * 2);
            
            return (
              <div className="flex justify-center overflow-x-auto">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                  <rect x={0} y={0} width={width} height={height} rx={10} fill="transparent" />
                  
                  {traceNodes.map(node => {
                    const isVisible = currentStepIndex >= node.callStep;
                    if (!isVisible) return null;
                    
                    const isReturned = node.returnStep !== -1 && currentStepIndex >= node.returnStep;
                    const isActive = !isReturned && currentStep.stack[currentStep.stack.length - 1]?.id === node.id;
                    
                    // Simple layout: centered
                    const x = width / 2 - nodeW / 2;
                    const y = pad + node.depth * (nodeH + gapY);
                    
                    // Draw connection to parent
                    let connection = null;
                    if (node.parentId) {
                      const parent = traceNodes.find(n => n.id === node.parentId);
                      if (parent) {
                        const px = width / 2;
                        const py = pad + parent.depth * (nodeH + gapY) + nodeH;
                        const cx = width / 2;
                        const cy = y;
                        connection = (
                          <g>
                             {/* Call Arrow (Down) */}
                             <line x1={px} y1={py} x2={cx} y2={cy} stroke="#334155" strokeWidth={1.5} markerEnd="url(#arrowhead)" />
                             
                             {/* Return Arrow (Curved Up) */}
                             {isReturned && (
                               <path 
                                 d={`M ${cx - 10} ${cy} Q ${cx - 60} ${(py + cy)/2} ${px - 10} ${py + 5}`} 
                                 fill="none" 
                                 stroke="#16a34a" 
                                 strokeWidth={1.5} 
                                 strokeDasharray="4,2"
                                 markerEnd="url(#arrowhead-green)"
                               />
                             )}
                             {isReturned && node.returnVal !== undefined && (
                               <text x={cx - 65} y={(py + cy)/2} fontSize={10} fill="#166534" textAnchor="end">
                                 return {node.returnVal}
                               </text>
                             )}
                          </g>
                        );
                      }
                    }

                    return (
                      <g key={node.id}>
                        {connection}
                        
                        {/* Node Box */}
                        <rect 
                          x={x} 
                          y={y} 
                          width={nodeW} 
                          height={nodeH} 
                          rx={4} 
                          fill={isActive ? '#fef08a' : isReturned ? '#dcfce7' : '#ffffff'} 
                          stroke={isActive ? '#eab308' : isReturned ? '#16a34a' : '#94a3b8'} 
                          strokeWidth={isActive ? 2 : 1} 
                        />
                        <text x={x + nodeW/2} y={y + 19} fontSize={12} textAnchor="middle" fill="#1e293b" fontFamily="monospace">
                          {node.func}({node.args})
                        </text>
                        
                        {/* Step Label */}
                        <text x={x + nodeW + 10} y={y + 19} fontSize={10} fill="#64748b">
                           {isReturned ? `Step ${node.returnStep}: return` : `Step ${node.callStep}: call`}
                        </text>
                      </g>
                    );
                  })}
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
                    </marker>
                    <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#16a34a" />
                    </marker>
                  </defs>
                </svg>
              </div>
            );
          })()}
          <div className="text-xs text-slate-500 mt-2">
            图例：黄色高亮为当前执行节点，绿色为已返回节点；实线表示调用，虚线表示返回。
          </div>
        </div>
      )}
    </div>
  );
};
