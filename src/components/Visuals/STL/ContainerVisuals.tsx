import React, { useState } from 'react';
import { ArrowLeftRight, ArrowRight, ChevronDown, GitMerge, Plus, RefreshCw, Trash2 } from 'lucide-react';

// Visualization for std::array
export const ArrayVisual = () => (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-center font-bold text-slate-800 mb-6 text-lg">std::array vs 原生数组</h4>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Raw Array */}
            <div className="flex-1 bg-white p-5 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 px-3 py-1 rounded-bl text-xs font-bold">原生数组</div>
                <h5 className="font-mono text-slate-700 font-bold mb-4 border-b pb-2">int a[3];</h5>
                
                <div className="flex gap-2 justify-center mb-6">
                    {[10, 20, 30].map((val, i) => (
                        <div key={i} className="w-12 h-12 border-2 border-slate-300 flex items-center justify-center text-slate-400 font-mono text-sm relative">
                            {val}
                            <span className="absolute -bottom-5 text-[10px] text-slate-400">{i}</span>
                        </div>
                    ))}
                    <div className="w-12 h-12 border-2 border-red-200 border-dashed flex items-center justify-center bg-red-50 text-red-300 font-mono text-sm relative animate-pulse">
                        ?
                        <span className="absolute -bottom-5 text-[10px] text-red-300">3(越界)</span>
                    </div>
                </div>

                <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2 text-red-500">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">!</span>
                        <span>不知道自己多大 (.size() ❌)</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-500">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">!</span>
                        <span>越界访问不报错 (Danger)</span>
                    </div>
                </div>
            </div>

            {/* std::array */}
            <div className="flex-1 bg-indigo-50/50 p-5 rounded-lg border-2 border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl text-xs font-bold">std::array</div>
                <h5 className="font-mono text-indigo-900 font-bold mb-4 border-b border-indigo-200 pb-2">array&lt;int, 3&gt; a;</h5>
                
                <div className="flex gap-2 justify-center mb-6">
                    {[10, 20, 30].map((val, i) => (
                        <div key={i} className="w-12 h-12 bg-white border-2 border-indigo-400 flex items-center justify-center text-indigo-700 font-bold font-mono text-sm relative shadow-sm">
                            {val}
                            <span className="absolute -bottom-5 text-[10px] text-indigo-400">{i}</span>
                        </div>
                    ))}
                    
                    {/* Guard Rail */}
                    <div className="w-2 h-12 bg-red-400/20 border-l-2 border-red-400 flex items-center justify-center relative group cursor-not-allowed">
                        <div className="absolute left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            .at(3) 抛出异常!
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-xs text-indigo-800">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center">✓</span>
                        <span>知道自己大小 (.size() ✅)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center">✓</span>
                        <span>.at() 安全检查 (Safe)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center">✓</span>
                        <span>支持算法 (.begin(), .end())</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Visualization for List Structure
export const ListStructureVisual = () => (
    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h4 className="text-center font-bold text-slate-800 mb-6">排队 (Vector) vs 寻宝 (List)</h4>
        <div className="flex flex-col gap-8">
            {/* Vector */}
            <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-slate-500 mb-2 w-full text-left pl-4">std::vector (连续存储)</div>
                <div className="flex gap-0.5 bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                    {[1, 2, 3, 4, 5].map((n, i) => (
                        <div key={i} className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center font-bold text-sm border-r border-indigo-400 last:border-0 first:rounded-l last:rounded-r shadow-sm">
                            {n}
                        </div>
                    ))}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">邻居紧挨着，找人方便，插队麻烦</div>
            </div>

            {/* List */}
            <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-slate-500 mb-2 w-full text-left pl-4">std::list (链式存储)</div>
                <div className="flex gap-4 items-center flex-wrap justify-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 border-dashed w-full">
                    {[1, 2, 3, 4, 5].map((n, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-emerald-500 text-white flex items-center justify-center font-bold text-sm rounded-full shadow-sm relative group cursor-help">
                                    {n}
                                    <span className="absolute -top-6 text-[10px] text-emerald-600 bg-emerald-100 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Addr: 0x{100 + i*40}</span>
                                </div>
                            </div>
                            {i < 4 && <ArrowLeftRight size={16} className="text-emerald-300" />}
                        </React.Fragment>
                    ))}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">分散在各地，靠指针联系，增删随意</div>
            </div>
        </div>
    </div>
);

// Visualization for List Operations
export const ListOperationVisual = () => {
    const [list, setList] = useState([1, 2, 3]);

    const pushFront = () => setList([Math.floor(Math.random() * 10), ...list]);
    const pushBack = () => setList([...list, Math.floor(Math.random() * 10)]);
    const popFront = () => setList(list.slice(1));
    const popBack = () => setList(list.slice(0, -1));

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="text-center font-bold text-slate-800 mb-6">List 增删模拟器</h4>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex flex-col gap-2">
                    <button onClick={pushFront} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold hover:bg-indigo-200 transition-colors flex items-center gap-1">
                        <Plus size={14} /> push_front
                    </button>
                    <button onClick={popFront} className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200 transition-colors flex items-center gap-1">
                        <Trash2 size={14} /> pop_front
                    </button>
                </div>
                
                <div className="flex flex-col gap-2">
                    <button onClick={pushBack} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold hover:bg-indigo-200 transition-colors flex items-center gap-1">
                        <Plus size={14} /> push_back
                    </button>
                    <button onClick={popBack} className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200 transition-colors flex items-center gap-1">
                        <Trash2 size={14} /> pop_back
                    </button>
                </div>
            </div>

            {/* List Visualization */}
            <div className="flex flex-wrap gap-2 items-center justify-center min-h-[60px] p-4 border border-dashed border-slate-300 rounded-lg w-full bg-white">
                {list.length === 0 ? (
                    <span className="text-slate-400 text-sm italic">空链表 (Empty List)</span>
                ) : (
                    list.map((val, i) => (
                        <React.Fragment key={i}>
                             <div className="w-10 h-10 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 rounded-full shadow-sm">
                                {val}
                            </div>
                            {i < list.length - 1 && <ArrowLeftRight size={16} className="text-slate-300" />}
                        </React.Fragment>
                    ))
                )}
            </div>
            <p className="text-xs text-slate-400 mt-2">
                注意：在 list 中，头尾增删的时间复杂度都是 O(1)！
            </p>
        </div>
    );
};

// Visualization for List Insert/Erase (Principle Level)
export const ListInsertVisual = () => {
    const [step, setStep] = useState(0); // 0: Initial, 1: Alloc, 2: Link New, 3: Relink Old, 4: Done
    const [mode, setMode] = useState<'insert' | 'erase'>('insert');

    // Code lines highlighting
    const getActiveLines = () => {
        if (mode === 'insert') {
            if (step === 1) return [1]; // newNode = new Node
            if (step === 2) return [2, 3]; // new->next = it; new->prev = prev
            if (step === 3) return [4, 5]; // prev->next = new; it->prev = new
            if (step === 4) return [];
        } else {
            if (step === 1) return [1]; // target = it
            if (step === 2) return [2]; // it++
            if (step === 3) return [3, 4]; // prev->next = next; next->prev = prev
            if (step === 4) return [5]; // delete target
        }
        return [];
    };

    const reset = (newMode: 'insert' | 'erase') => {
        setMode(newMode);
        setStep(0);
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    // Positions
    // Insert: A(0), B(2). New(1)
    // Erase: A(0), B(1), C(2). Erase B.
    
    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="text-center font-bold text-slate-800 mb-6">
                {mode === 'insert' ? '链表插入原理演示 (Insert)' : '链表删除原理演示 (Erase)'}
            </h4>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
                <div className="flex bg-slate-200 rounded p-1">
                    <button 
                        onClick={() => reset('insert')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === 'insert' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                    >
                        插入模式
                    </button>
                    <button 
                        onClick={() => reset('erase')}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === 'erase' ? 'bg-white shadow text-red-600' : 'text-slate-500'}`}
                    >
                        删除模式
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <button onClick={prevStep} disabled={step === 0} className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold hover:bg-slate-50 disabled:opacity-50">
                        上一步
                    </button>
                    <button onClick={nextStep} disabled={step === 4} className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 disabled:opacity-50">
                        {step === 4 ? '完成' : '下一步'}
                    </button>
                </div>
            </div>

            {/* Code Display */}
            <div className="w-full max-w-md bg-slate-800 text-slate-300 p-4 rounded-lg font-mono text-xs mb-8 shadow-sm">
                {mode === 'insert' ? (
                    <>
                        <div className={step === 1 ? 'bg-indigo-900/50 text-white font-bold -mx-4 px-4' : ''}>1. Node* newNode = new Node(99);</div>
                        <div className={step === 2 ? 'bg-indigo-900/50 text-white font-bold -mx-4 px-4' : ''}>2. newNode-&gt;next = it;</div>
                        <div className={step === 2 ? 'bg-indigo-900/50 text-white font-bold -mx-4 px-4' : ''}>3. newNode-&gt;prev = it-&gt;prev;</div>
                        <div className={step === 3 ? 'bg-indigo-900/50 text-white font-bold -mx-4 px-4' : ''}>4. it-&gt;prev-&gt;next = newNode;</div>
                        <div className={step === 3 ? 'bg-indigo-900/50 text-white font-bold -mx-4 px-4' : ''}>5. it-&gt;prev = newNode;</div>
                    </>
                ) : (
                    <>
                        <div className="text-slate-500">// 假设 it 指向要删的节点 B</div>
                        <div className={step === 1 ? 'bg-red-900/30 text-white font-bold -mx-4 px-4' : ''}>1. Node* target = it;</div>
                        <div className={step === 2 ? 'bg-red-900/30 text-white font-bold -mx-4 px-4' : ''}>2. it++; // 迭代器移到 C (防止失效)</div>
                        <div className={step === 3 ? 'bg-red-900/30 text-white font-bold -mx-4 px-4' : ''}>3. target-&gt;prev-&gt;next = target-&gt;next;</div>
                        <div className={step === 3 ? 'bg-red-900/30 text-white font-bold -mx-4 px-4' : ''}>4. target-&gt;next-&gt;prev = target-&gt;prev;</div>
                        <div className={step === 4 ? 'bg-red-900/30 text-white font-bold -mx-4 px-4' : ''}>5. delete target;</div>
                    </>
                )}
            </div>

            {/* Animation Canvas */}
            <div className="relative w-full h-40 bg-white border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center select-none">
                
                {mode === 'insert' && (
                    <>
                        {/* Node A */}
                        <div className={`absolute transition-all duration-700 top-1/2 -translate-y-1/2 ${step === 4 ? 'left-[20%]' : 'left-[25%]'}`}>
                            <div className="w-12 h-12 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 rounded-lg z-10 relative">A</div>
                            <div className="text-xs text-slate-400 text-center mt-1">prev</div>
                        </div>

                        {/* Node B (it) */}
                        <div className={`absolute transition-all duration-700 top-1/2 -translate-y-1/2 ${step === 4 ? 'left-[80%]' : 'left-[75%]'}`}>
                            <div className="w-12 h-12 bg-amber-50 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-800 rounded-lg z-10 relative">
                                B
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-600 text-xs font-bold flex flex-col items-center">
                                    <span>it</span>
                                    <ChevronDown size={14}/>
                                </div>
                            </div>
                        </div>

                        {/* New Node */}
                        <div className={`absolute transition-all duration-700 ${
                            step === 0 ? 'opacity-0 top-0 left-[50%]' : 
                            step < 4 ? 'opacity-100 top-[20%] left-[50%] -translate-x-1/2' : 
                            'opacity-100 top-1/2 -translate-y-1/2 left-[50%] -translate-x-1/2'
                        }`}>
                            <div className="w-12 h-12 bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 rounded-lg shadow-lg z-20 relative">99</div>
                        </div>

                        {/* SVG Arrows */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                                </marker>
                                <marker id="arrowhead-new" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                                </marker>
                            </defs>

                            {/* A -> B (Original) */}
                            {step < 3 && (
                                <line x1="33%" y1="50%" x2="67%" y2="50%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray={step > 1 ? "4" : ""} opacity={step > 2 ? 0 : 1} />
                            )}
                            
                            {/* New -> B & New -> A */}
                            {step >= 2 && step < 4 && (
                                <>
                                    <path d="M 53% 35% L 72% 45%" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-new)" fill="none" />
                                    <path d="M 47% 35% L 28% 45%" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-new)" fill="none" />
                                </>
                            )}

                            {/* A -> New & B -> New (Final) */}
                            {step >= 3 && (
                                <>
                                    {/* A next -> New */}
                                    <line x1={step === 4 ? "25%" : "30%"} y1="50%" x2="45%" y2={step === 4 ? "50%" : "35%"} stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-new)" />
                                    {/* New next -> B */}
                                    <line x1="55%" y1={step === 4 ? "50%" : "35%"} x2={step === 4 ? "75%" : "70%"} y2="50%" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-new)" />
                                </>
                            )}
                        </svg>
                    </>
                )}

                {mode === 'erase' && (
                    <>
                        {/* Nodes: A, B, C */}
                        {/* A */}
                        <div className={`absolute transition-all duration-700 top-1/2 -translate-y-1/2 -translate-x-1/2 ${step === 4 ? 'left-[35%]' : 'left-[20%]'}`}>
                            <div className="w-12 h-12 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 rounded-lg z-10 relative">A</div>
                        </div>
                        {/* B (Target) */}
                        <div className={`absolute left-[50%] -translate-x-1/2 top-1/2 -translate-y-1/2 transition-all duration-500 ${step === 4 ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                            <div className={`w-12 h-12 border-2 flex items-center justify-center font-bold rounded-lg z-10 relative ${step >= 1 ? 'bg-red-50 border-red-400 text-red-800' : 'bg-white border-slate-400 text-slate-700'}`}>
                                B
                                {step === 0 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-600 text-xs font-bold flex flex-col items-center">
                                        <span>it</span>
                                        <ChevronDown size={14}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* C */}
                        <div className={`absolute transition-all duration-700 top-1/2 -translate-y-1/2 -translate-x-1/2 ${step === 4 ? 'left-[65%]' : 'left-[80%]'}`}>
                            <div className="w-12 h-12 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 rounded-lg z-10 relative">
                                C
                                {step >= 2 && step < 4 && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-600 text-xs font-bold flex flex-col items-center animate-bounce">
                                        <span>it</span>
                                        <ChevronDown size={14}/>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Arrows */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                             <defs>
                                <marker id="arrowhead-del" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                                </marker>
                                <marker id="arrowhead-bypass" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                                </marker>
                            </defs>
                            
                            {/* Normal Links A->B->C */}
                            <line x1="26%" y1="50%" x2="44%" y2="50%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-del)" opacity={step >= 3 || step === 4 ? 0 : 1} />
                            <line x1="56%" y1="50%" x2="74%" y2="50%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-del)" opacity={step >= 3 || step === 4 ? 0 : 1} />

                            {/* Bypass Links A->C (Step 3) */}
                            {step === 3 && (
                                <path d="M 26% 40% Q 50% 20% 74% 40%" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-bypass)" />
                            )}

                            {/* Final Link A->C (Step 4) */}
                            {step === 4 && (
                                <line x1="41%" y1="50%" x2="59%" y2="50%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-del)" />
                            )}
                        </svg>
                    </>
                )}

            </div>
            
             <p className="text-xs text-slate-500 mt-4 text-center max-w-md bg-slate-100 p-2 rounded">
                {mode === 'insert' 
                    ? "原理：只修改了指针指向，A 和 B 在内存中的位置完全不需要移动！" 
                    : "原理：让 A 和 C 互指，B 就被“孤立”了，然后安全释放 B 的内存。"}
            </p>
        </div>
    );
};

// Visualization for List Splice
export const ListSpliceVisual = () => {
    const [step, setStep] = useState(0); // 0: Initial, 1: Connecting
    
    // Initial: List1: 1->2->3, List2: 10->20->30
    // Target: splice(list1.begin(), list2) -> 10->20->30->1->2->3
    // list1.begin() points to '1'. insert BEFORE '1'.
    
    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="text-center font-bold text-slate-800 mb-4">Splice: 链表接轨魔法</h4>
            
            <div className="relative w-full h-40 bg-white border border-dashed border-slate-300 rounded-lg overflow-hidden flex items-center justify-center select-none mb-6">
                
                {/* List 1 (Blue) */}
                <div className={`absolute transition-all duration-1000 top-1/2 -translate-y-1/2 flex items-center gap-2 ${step === 0 ? 'left-[60%]' : 'left-[55%]'}`}>
                    <div className="w-10 h-10 bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700 rounded-full shadow-sm z-10">1</div>
                    <ArrowLeftRight size={16} className="text-slate-300"/>
                    <div className="w-10 h-10 bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700 rounded-full shadow-sm z-10">2</div>
                    <ArrowLeftRight size={16} className="text-slate-300"/>
                    <div className="w-10 h-10 bg-blue-100 border-2 border-blue-500 flex items-center justify-center font-bold text-blue-700 rounded-full shadow-sm z-10">3</div>
                </div>

                {/* List 2 (Orange) */}
                <div className={`absolute transition-all duration-1000 top-1/2 -translate-y-1/2 flex items-center gap-2 ${step === 0 ? 'left-[10%]' : 'left-[15%]'}`}>
                    <div className="w-10 h-10 bg-orange-100 border-2 border-orange-500 flex items-center justify-center font-bold text-orange-700 rounded-full shadow-sm z-10">10</div>
                    <ArrowLeftRight size={16} className="text-slate-300"/>
                    <div className="w-10 h-10 bg-orange-100 border-2 border-orange-500 flex items-center justify-center font-bold text-orange-700 rounded-full shadow-sm z-10">20</div>
                    <ArrowLeftRight size={16} className="text-slate-300"/>
                    <div className="w-10 h-10 bg-orange-100 border-2 border-orange-500 flex items-center justify-center font-bold text-orange-700 rounded-full shadow-sm z-10">30</div>
                </div>

                {/* Connection Arrow */}
                <div className={`absolute left-[47%] top-1/2 -translate-y-1/2 transition-opacity duration-1000 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
                     <ArrowLeftRight size={24} className="text-emerald-500 animate-pulse"/>
                </div>
            </div>

            <button 
                onClick={() => setStep(s => s === 0 ? 1 : 0)}
                className={`px-4 py-2 text-xs font-bold rounded transition-colors flex items-center gap-2 ${step === 1 ? 'bg-slate-200 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
                <GitMerge size={14} />
                {step === 1 ? "复原 (Undo)" : "执行 splice(list1.begin(), list2)"}
            </button>
            <p className="text-xs text-slate-400 mt-2 text-center">
                {step === 1 
                    ? "List 2 的整列火车直接开到了 List 1 车头前面。零拷贝，只需修改指针！" 
                    : "点击按钮，把橙色火车接轨到蓝色火车前面"}
            </p>
        </div>
    );
};

// Visualization for List Remove/Unique/Sort
export const ListMagicVisual = () => {
    const [nums, setNums] = useState([4, 1, 1, 3, 2, 2, 5]);
    
    const reset = () => setNums([4, 1, 1, 3, 2, 2, 5]);
    const doSort = () => setNums([...nums].sort((a,b) => a-b));
    const doUnique = () => {
        // Simple unique for sorted array simulation
        const res = [];
        if(nums.length > 0) res.push(nums[0]);
        for(let i=1; i<nums.length; i++) {
            if(nums[i] !== nums[i-1]) res.push(nums[i]);
        }
        setNums(res);
    };
    const doReverse = () => setNums([...nums].reverse());
    const doRemove2 = () => setNums(nums.filter(n => n !== 2));

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="text-center font-bold text-slate-800 mb-6">List 魔法工具箱</h4>
            
            <div className="flex flex-wrap gap-2 justify-center mb-8">
                <button onClick={reset} className="px-3 py-1 bg-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-300">
                    重置
                </button>
                <button onClick={doRemove2} className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs font-bold hover:bg-red-200">
                    remove(2)
                </button>
                <button onClick={doSort} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded text-xs font-bold hover:bg-indigo-200">
                    sort()
                </button>
                <button onClick={doUnique} className="px-3 py-1 bg-amber-100 text-amber-600 rounded text-xs font-bold hover:bg-amber-200">
                    unique()
                </button>
                <button onClick={doReverse} className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-xs font-bold hover:bg-purple-200">
                    reverse()
                </button>
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-center min-h-[60px] p-4 border border-dashed border-slate-300 rounded-lg w-full bg-white transition-all">
                {nums.map((n, i) => (
                    <React.Fragment key={i}>
                        <div className={`w-10 h-10 flex items-center justify-center font-bold rounded-full shadow-sm border-2 transition-all duration-500 ${
                            n === 2 ? 'bg-red-50 border-red-200 text-red-400' : 'bg-white border-slate-300 text-slate-700'
                        }`}>
                            {n}
                        </div>
                        {i < nums.length - 1 && <ArrowLeftRight size={16} className="text-slate-300" />}
                    </React.Fragment>
                ))}
            </div>
            
            <p className="text-xs text-slate-400 mt-4 text-center">
                提示：unique (去重) 只能去除<strong>相邻</strong>的重复元素，所以通常要先 sort (排序)！
            </p>
        </div>
    );
};

// 1. Array Fill Animation
export const ArrayFillVisual = () => {
    const [filled, setFilled] = useState(false);
    return (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
             onClick={() => setFilled(prev => !prev)}>
            <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center border-2 rounded transition-all duration-500 ${
                        filled ? 'bg-blue-500 border-blue-600 text-white scale-110' : 'bg-slate-100 border-slate-300 text-slate-400'
                    }`}>
                        {filled ? '100' : '?'}
                    </div>
                ))}
            </div>
            <button className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold hover:bg-blue-200 transition-colors">
                {filled ? '已填充 (.fill(100))' : '点击填充 (.fill(100))'}
            </button>
        </div>
    );
};

// 2. Array Size Visual
export const ArraySizeVisual = () => (
    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center gap-6 relative overflow-hidden">
        <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 bg-indigo-100 border border-indigo-300 rounded"></div>)}
        </div>
        <div className="absolute -right-2 top-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-l shadow-lg animate-bounce">
            .size() = 3
        </div>
        <p className="text-xs text-slate-500 mt-12">大小是刻在骨子里的（编译期常量）</p>
    </div>
);

// 3. Front & Back Visual
export const ArrayAccessVisual = () => (
    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-2">
        <div className="flex gap-4 items-end">
            <div className="flex flex-col items-center gap-1 group">
                <span className="text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">.front()</span>
                <div className="w-10 h-10 bg-purple-100 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-700 rounded shadow-sm group-hover:scale-110 transition-transform cursor-pointer">
                    10
                </div>
            </div>
            <div className="w-8 h-0.5 bg-slate-200 rounded-full"></div>
            <div className="w-8 h-0.5 bg-slate-200 rounded-full"></div>
            <div className="flex flex-col items-center gap-1 group">
                <span className="text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">.back()</span>
                <div className="w-10 h-10 bg-purple-100 border-2 border-purple-500 flex items-center justify-center font-bold text-purple-700 rounded shadow-sm group-hover:scale-110 transition-transform cursor-pointer">
                    50
                </div>
            </div>
        </div>
        <p className="text-xs text-slate-400">悬停查看首尾</p>
    </div>
);

// 4. Safety Visual (.at vs [])
export const ArraySafetyVisual = () => {
    const [mode, setMode] = useState<'safe' | 'unsafe'>('safe');
    return (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-4">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                <button onClick={() => setMode('unsafe')} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === 'unsafe' ? 'bg-red-500 text-white' : 'text-slate-500'}`}>[] 模式</button>
                <button onClick={() => setMode('safe')} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === 'safe' ? 'bg-green-500 text-white' : 'text-slate-500'}`}>.at() 模式</button>
            </div>
            <div className="flex items-center gap-1 relative">
                {[0, 1, 2].map(i => <div key={i} className="w-10 h-10 border border-slate-300 flex items-center justify-center bg-slate-50 text-slate-400">{i}</div>)}
                <div className="w-10 h-10 border border-dashed border-red-300 flex items-center justify-center bg-red-50 relative group">
                    <span className="text-red-300 text-xs">3</span>
                    {/* Hand */}
                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${mode === 'safe' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                            🛑 异常拦截!
                        </div>
                    </div>
                    <div className={`absolute -top-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${mode === 'unsafe' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                            💥 内存爆炸
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Sort Visual
export const ArraySortVisual = () => {
    const [sorted, setSorted] = useState(false);
    return (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-4">
            <div className="flex gap-2 relative items-end h-32">
                {(sorted ? [1, 2, 5, 8, 9] : [5, 2, 8, 1, 9]).map((val, i) => (
                    <div key={i} className="w-8 bg-indigo-50 border border-indigo-200 flex items-end justify-center rounded overflow-hidden transition-all duration-700" style={{height: `${val * 10 + 20}px`}}>
                        <span className="text-xs font-bold text-indigo-600 mb-1">{val}</span>
                    </div>
                ))}
            </div>
            <button onClick={() => setSorted(!sorted)} className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-200 transition-colors">
                {sorted ? '重置' : 'sort(begin, end)'}
            </button>
        </div>
    );
};

// 6. MultiDim Visual
export const ArrayMultiDimVisual = () => (
    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-100 rounded">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div key={i} className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold ${i === 5 ? 'bg-indigo-500 text-white scale-110 shadow-lg' : 'bg-white text-slate-400'}`}>
                    {i}
                </div>
            ))}
        </div>
        <div className="ml-4 text-xs text-slate-500">
            matrix[1][1] = <span className="text-indigo-600 font-bold text-sm">5</span>
        </div>
    </div>
);

// 7. Stack vs Heap Visual
export const ArrayStackHeapVisual = () => (
    <div className="flex gap-4 w-full text-xs">
        <div className="flex-1 bg-green-50 border border-green-200 p-3 rounded flex flex-col items-center gap-2">
            <div className="font-bold text-green-700">栈 (Stack)</div>
            <div className="w-full h-20 bg-green-100 rounded border border-green-300 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-400 opacity-20 animate-pulse"></div>
                <div className="absolute bottom-2 left-2 right-2 bg-white/80 p-1 rounded text-center shadow-sm text-green-800">
                    std::array<br/>(快但小)
                </div>
            </div>
        </div>
        <div className="flex-1 bg-blue-50 border border-blue-200 p-3 rounded flex flex-col items-center gap-2">
            <div className="font-bold text-blue-700">堆 (Heap)</div>
            <div className="w-full h-20 bg-blue-100 rounded border border-blue-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-400 opacity-10"></div>
                <div className="absolute top-2 left-2 right-2 bg-white/80 p-1 rounded text-center shadow-sm text-blue-800">
                    std::vector<br/>(大但稍慢)
                </div>
                {/* Connecting line representing pointer */}
                <div className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-slate-400"></div>
            </div>
        </div>
    </div>
);

// Visualization for Josephus Problem
export const JosephusVisual = () => {
    const [total, setTotal] = useState(8);
    const [m, setM] = useState(3);
    const [people, setPeople] = useState<number[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [count, setCount] = useState(1); // 1..m
    const [logs, setLogs] = useState<number[]>([]);
    const [isOver, setIsOver] = useState(false);
    
    // Init
    const init = () => {
        setPeople(Array.from({length: total}, (_, i) => i + 1));
        setCurrentIdx(0);
        setCount(1);
        setLogs([]);
        setIsOver(false);
    };

    // Initialize on load
    useState(() => {
        init();
    });

    const nextStep = () => {
        if (isOver || people.length === 1) return;

        // Current person
        const person = people[currentIdx];

        // If count == m, eliminate
        if (count === m) {
            const newPeople = [...people];
            newPeople.splice(currentIdx, 1);
            setPeople(newPeople);
            setLogs([...logs, person]);
            
            // After delete, currentIdx is now pointing to the next person automatically
            // But if we deleted the last person, we need to wrap around to 0
            if (currentIdx >= newPeople.length) {
                setCurrentIdx(0);
            }
            // Count resets to 1 for the *next* person
            setCount(1);

            if (newPeople.length === 1) {
                setIsOver(true);
            }
        } else {
            // Just move to next
            setCount(c => c + 1);
            setCurrentIdx(idx => (idx + 1) % people.length);
        }
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="text-center font-bold text-slate-800 mb-2">约瑟夫环模拟器 (N={total}, M={m})</h4>
            <p className="text-xs text-slate-500 mb-6">每报数到 {m} 的人出局，最后剩下谁？</p>

            {/* Controls */}
            <div className="flex gap-4 mb-8">
                <button onClick={init} className="px-4 py-2 bg-slate-200 text-slate-700 rounded text-xs font-bold hover:bg-slate-300 transition-colors flex items-center gap-2">
                    <RefreshCw size={14} /> 重置
                </button>
                <button onClick={nextStep} disabled={isOver} className="px-4 py-2 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                    {isOver ? '游戏结束' : `报数 (${count}/${m})`} <ArrowRight size={14} />
                </button>
            </div>

            {/* Circle Visual */}
            <div className="relative w-64 h-64 border-4 border-slate-100 rounded-full flex items-center justify-center mb-8">
                {people.map((p, i) => {
                    // Calculate position on circle
                    // We want the current list to be distributed evenly
                    // BUT for visual stability, maybe we should keep original positions?
                    // For simplicity, let's distribute current people evenly.
                    const angle = (i / people.length) * 2 * Math.PI - Math.PI / 2; // Start from top
                    const radius = 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    const isCurrent = i === currentIdx;
                    
                    return (
                        <div 
                            key={p}
                            className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500
                                ${isCurrent 
                                    ? 'bg-indigo-500 border-indigo-600 text-white scale-125 z-10 shadow-lg' 
                                    : 'bg-white border-slate-300 text-slate-600'
                                }`}
                            style={{
                                transform: `translate(${x}px, ${y}px)`
                            }}
                        >
                            {p}
                            {isCurrent && (
                                <div className="absolute -top-8 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                                    报 {count}
                                </div>
                            )}
                        </div>
                    );
                })}
                {people.length === 0 && <div className="text-slate-300">空</div>}
            </div>

            {/* Logs */}
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">淘汰记录 (Out):</div>
                <div className="flex flex-wrap gap-2">
                    {logs.map((p, i) => (
                        <span key={i} className="px-2 py-1 bg-red-50 text-red-500 rounded text-xs border border-red-100">
                            {p}
                        </span>
                    ))}
                    {isOver && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs border border-green-200 font-bold">
                            👑 幸存者: {people[0]}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
