import React, { useState, useEffect } from 'react';
import { RefreshCw, Search, Calculator, CheckCircle2, AlertTriangle, GitMerge, Copy, PaintBucket, RefreshCcw, Trash2, Minimize2, Wand2, ArrowUp, Layers, Plus, ArrowRight } from 'lucide-react';

// Answer Revealer
export const AnswerRevealer = ({ children }: { children: React.ReactNode }) => {
    const [revealed, setRevealed] = useState(false);
    return (
        <div className="my-4 border border-indigo-100 rounded-lg overflow-hidden">
            <button 
                onClick={() => setRevealed(!revealed)}
                className="w-full px-4 py-3 bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-between hover:bg-indigo-100 transition-colors"
            >
                <span>👉 点击查看答案解析</span>
                <span>{revealed ? '收起 ▲' : '展开 ▼'}</span>
            </button>
            {revealed && (
                <div className="p-4 bg-slate-50 border-t border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    {children}
                </div>
            )}
        </div>
    );
};

// ForEach Visual
export const ForEachVisual = () => {
    const [step, setStep] = useState(-1);
    const fruits = ["🍎 苹果", "🍌 香蕉", "🍊 橙子", "🍇 葡萄"];
    
    useEffect(() => {
        if (step >= 0 && step < fruits.length) {
            const timer = setTimeout(() => setStep(s => s + 1), 1000);
            return () => clearTimeout(timer);
        } else if (step >= fruits.length) {
            const timer = setTimeout(() => setStep(-1), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <RefreshCw size={18} className="text-indigo-600"/> 
                for_each 点名器
            </h4>
            
            <div className="flex gap-4 mb-6">
                {fruits.map((fruit, i) => (
                    <div key={i} className={`
                        relative w-20 h-20 rounded-lg flex items-center justify-center text-2xl shadow-sm border-2 transition-all duration-300
                        ${step === i 
                            ? 'bg-indigo-100 border-indigo-500 scale-110 z-10' 
                            : 'bg-white border-slate-200 text-slate-400 grayscale'}
                    `}>
                        {fruit.split(' ')[0]}
                        {step === i && (
                            <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                                到!
                            </div>
                        )}
                        <div className="absolute -bottom-6 text-xs text-slate-500 whitespace-nowrap">
                            {fruit.split(' ')[1]}
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => setStep(0)} 
                disabled={step >= 0}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-indigo-700 transition-colors"
            >
                {step >= 0 ? "点名中..." : "开始点名"}
            </button>
        </div>
    );
};

// Find Visual
export const FindVisual = () => {
    const [target, setTarget] = useState(25);
    const [step, setStep] = useState(-1); // -1: idle, 0..N: checking, N+1: found/not found
    const nums = [10, 25, 30, 25, 40];
    
    useEffect(() => {
        if (step >= 0 && step < nums.length) {
            if (nums[step] === target) {
                // Found! Stop here.
            } else {
                const timer = setTimeout(() => setStep(s => s + 1), 800);
                return () => clearTimeout(timer);
            }
        }
    }, [step, target]);

    const isFound = step >= 0 && step < nums.length && nums[step] === target;
    const isNotFound = step === nums.length;

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Search size={18} className="text-emerald-600"/> 
                find 寻宝猎人
            </h4>

            <div className="flex gap-4 items-center mb-6">
                <span className="text-sm text-slate-600">寻找目标:</span>
                <input 
                    type="number" 
                    value={target} 
                    onChange={e => {
                        setTarget(Number(e.target.value));
                        setStep(-1);
                    }}
                    className="w-16 px-2 py-1 border border-slate-300 rounded text-center font-mono text-sm"
                />
                <button 
                    onClick={() => setStep(0)}
                    disabled={step >= 0 && !isFound && !isNotFound}
                    className="px-3 py-1 bg-emerald-600 text-white rounded text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
                >
                    开始寻找
                </button>
            </div>

            <div className="flex gap-2">
                {nums.map((n, i) => (
                    <div key={i} className={`
                        w-12 h-12 rounded-lg flex items-center justify-center font-bold font-mono border-2 transition-all duration-300
                        ${step === i 
                            ? (n === target ? 'bg-green-100 border-green-500 text-green-700 scale-110' : 'bg-red-50 border-red-300 text-red-300')
                            : (step > i ? 'bg-slate-100 border-slate-200 text-slate-300' : 'bg-white border-slate-300 text-slate-600')
                        }
                    `}>
                        {n}
                    </div>
                ))}
            </div>
            
            <div className="h-6 mt-4 text-sm font-bold">
                {isFound && <span className="text-green-600">🎉 找到了！在下标 {step}</span>}
                {isNotFound && <span className="text-slate-400">💨 找遍了也没找到...</span>}
                {step >= 0 && !isFound && !isNotFound && <span className="text-slate-500">正在检查下标 {step}...</span>}
            </div>
        </div>
    );
};

// Count Visual
export const CountVisual = () => {
    const [step, setStep] = useState(-1);
    const [count, setCount] = useState(0);
    const items = ['red', 'blue', 'red', 'green', 'red', 'blue'];
    
    useEffect(() => {
        if (step >= 0 && step < items.length) {
            if (items[step] === 'red') {
                setCount(c => c + 1);
            }
            const timer = setTimeout(() => setStep(s => s + 1), 800);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const reset = () => {
        setStep(0);
        setCount(0);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calculator size={18} className="text-amber-600"/> 
                count 计数器
            </h4>
            
            <p className="text-xs text-slate-500 mb-4">任务：数一数有多少个 <span className="font-bold text-red-500">红色</span> 糖果</p>

            <div className="flex gap-2 mb-6">
                {items.map((color, i) => (
                    <div key={i} className={`
                        w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-sm
                        ${color === 'red' ? 'bg-red-100 border-red-400' : (color === 'blue' ? 'bg-blue-100 border-blue-400' : 'bg-green-100 border-green-400')}
                        ${step === i ? 'scale-125 ring-4 ring-amber-100' : (step > i ? 'opacity-50' : 'opacity-100')}
                    `}>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-6">
                <div className="text-2xl font-bold font-mono bg-white px-6 py-2 rounded-lg border border-slate-200 shadow-inner flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Count</span>
                    <span className="text-amber-600">{count}</span>
                </div>
                
                <button 
                    onClick={reset} 
                    disabled={step >= 0 && step < items.length}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-amber-700 transition-colors"
                >
                    {step >= 0 && step < items.length ? "数数中..." : "开始数数"}
                </button>
            </div>
        </div>
    );
};

// Check Visual (all_of / any_of / none_of)
export const CheckVisual = () => {
    const [result, setResult] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const [type, setType] = useState<'all' | 'any' | 'none'>('all');
    
    // 模拟学生交作业：1=交了，0=没交
    const students = [1, 1, 0, 1, 1]; 
    
    const check = (checkType: 'all' | 'any' | 'none') => {
        setType(checkType);
        setChecking(true);
        setResult(null);
        
        setTimeout(() => {
            setChecking(false);
            if (checkType === 'all') setResult(students.every(s => s === 1));
            if (checkType === 'any') setResult(students.some(s => s === 1));
            if (checkType === 'none') setResult(students.every(s => s === 0));
        }, 1500);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-600"/> 
                作业检查官
            </h4>
            
            <div className="flex gap-4 mb-6">
                {students.map((s, i) => (
                    <div key={i} className={`
                        w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300
                        ${checking ? 'animate-pulse bg-slate-100 border-slate-300' : 
                          (s === 1 ? 'bg-green-100 border-green-500 text-green-600' : 'bg-red-100 border-red-500 text-red-600')
                        }
                    `}>
                        {checking ? '?' : (s === 1 ? '✓' : '✗')}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mb-4">
                <button onClick={() => check('all')} disabled={checking} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50">
                    all_of (全部?)
                </button>
                <button onClick={() => check('any')} disabled={checking} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50">
                    any_of (有人?)
                </button>
                <button onClick={() => check('none')} disabled={checking} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50">
                    none_of (没人?)
                </button>
            </div>

            <div className="h-8 flex items-center">
                {result !== null && !checking && (
                    <div className={`px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {result ? <CheckCircle2 size={14}/> : <AlertTriangle size={14}/>}
                        {type === 'all' && (result ? "是！全部都交了" : "否！有人没交")}
                        {type === 'any' && (result ? "是！至少有一个人交了" : "否！一个交的都没有")}
                        {type === 'none' && (result ? "是！确实没人交" : "否！有人交了")}
                    </div>
                )}
                {checking && <span className="text-slate-400 text-sm">检查中...</span>}
            </div>
        </div>
    );
};

// Compare Visual (equal / mismatch)
export const CompareVisual = () => {
    const [mode, setMode] = useState<'equal' | 'mismatch'>('equal');
    const [step, setStep] = useState(-1);
    
    // Equal: [1, 2, 3] vs [1, 2, 3]
    // Mismatch: [1, 2, 3] vs [1, 2, 4]
    const seq1 = [1, 2, 3, 4];
    const seq2 = mode === 'equal' ? [1, 2, 3, 4] : [1, 2, 9, 4];
    
    useEffect(() => {
        if (step >= 0 && step < seq1.length) {
            if (seq1[step] !== seq2[step]) {
                // Found difference, stop here
            } else {
                const timer = setTimeout(() => setStep(s => s + 1), 600);
                return () => clearTimeout(timer);
            }
        }
    }, [step, mode]);

    const start = (m: 'equal' | 'mismatch') => {
        setMode(m);
        setStep(0);
    };

    const isMismatchFound = step >= 0 && step < seq1.length && seq1[step] !== seq2[step];
    const isAllEqual = step === seq1.length;

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
             <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GitMerge size={18} className="text-purple-600"/> 
                序列对比器
            </h4>

            <div className="flex flex-col gap-2 mb-6">
                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">我的答案</span>
                    {seq1.map((n, i) => (
                        <div key={i} className={`w-8 h-8 flex items-center justify-center border rounded bg-white
                            ${step === i ? 'border-purple-500 ring-2 ring-purple-100' : 'border-slate-200'}
                        `}>{n}</div>
                    ))}
                </div>
                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">标准答案</span>
                    {seq2.map((n, i) => (
                        <div key={i} className={`w-8 h-8 flex items-center justify-center border rounded bg-white
                            ${step === i ? 'border-purple-500 ring-2 ring-purple-100' : 'border-slate-200'}
                            ${isMismatchFound && step === i ? 'bg-red-100 text-red-600 border-red-500' : ''}
                        `}>{n}</div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                 <button onClick={() => start('equal')} disabled={step >= 0 && !isAllEqual && !isMismatchFound} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50">
                    演示 equal (完全相同)
                </button>
                <button onClick={() => start('mismatch')} disabled={step >= 0 && !isAllEqual && !isMismatchFound} className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded text-xs hover:bg-slate-50">
                    演示 mismatch (找不同)
                </button>
            </div>

            <div className="h-6 text-sm font-bold">
                {isAllEqual && <span className="text-green-600">✅ 恭喜！equal 返回 true</span>}
                {isMismatchFound && <span className="text-red-600">❌ 发现不同！mismatch 返回位置 {step}</span>}
                {step >= 0 && !isAllEqual && !isMismatchFound && <span className="text-slate-500">正在比对第 {step} 个...</span>}
            </div>
        </div>
    );
};

// Search Visual (search)
export const SearchVisual = () => {
    const [step, setStep] = useState(-1);
    const text = "HELLO WORLD";
    const pattern = "WOR";
    
    useEffect(() => {
        if (step >= 0 && step <= text.length - pattern.length) {
            // Check match at current step
            const sub = text.substring(step, step + pattern.length);
            if (sub === pattern) {
                // Found! Stop.
            } else {
                const timer = setTimeout(() => setStep(s => s + 1), 800);
                return () => clearTimeout(timer);
            }
        }
    }, [step]);

    const isFound = step >= 0 && text.substring(step, step + pattern.length) === pattern;

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
             <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Search size={18} className="text-orange-600"/> 
                search 关键词搜索
            </h4>

            <div className="relative mb-12">
                {/* Text */}
                <div className="flex gap-1">
                    {text.split('').map((char, i) => (
                        <div key={i} className={`w-8 h-8 flex items-center justify-center border bg-white rounded text-sm font-bold
                            ${isFound && i >= step && i < step + pattern.length ? 'bg-green-100 border-green-500 text-green-700' : 'border-slate-200 text-slate-600'}
                        `}>
                            {char === ' ' ? '␣' : char}
                        </div>
                    ))}
                </div>

                {/* Sliding Window */}
                {step >= 0 && (
                    <div 
                        className="absolute top-10 left-0 flex gap-1 transition-all duration-500"
                        style={{ transform: `translateX(${step * 36}px)` }} // 32w + 4gap = 36
                    >
                        {pattern.split('').map((char, i) => (
                            <div key={i} className="w-8 h-8 flex items-center justify-center border-2 border-orange-400 bg-orange-50 text-orange-700 rounded text-sm font-bold shadow-lg">
                                {char}
                            </div>
                        ))}
                        <div className="absolute -top-6 left-0 text-[10px] bg-orange-500 text-white px-1 rounded whitespace-nowrap">
                            正在比对...
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setStep(0)} 
                    disabled={step >= 0 && !isFound}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-orange-700 transition-colors"
                >
                    开始搜索 "WOR"
                </button>
                {isFound && <span className="text-green-600 font-bold text-sm">🎉 找到了！在下标 {step}</span>}
            </div>
        </div>
    );
 };

// Copy Visual
export const CopyVisual = () => {
    const [step, setStep] = useState(-1);
    const source = [1, 2, 3, 4, 5];
    
    useEffect(() => {
        if (step >= 0 && step < source.length) {
            const timer = setTimeout(() => setStep(s => s + 1), 600);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Copy size={18} className="text-blue-600"/> 
                copy 复印机
            </h4>
            
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">原件</span>
                    {source.map((n, i) => (
                        <div key={i} className={`w-10 h-10 flex items-center justify-center border rounded bg-white
                            ${step === i ? 'border-blue-500 ring-2 ring-blue-100 scale-110' : 'border-slate-200'}
                            transition-all duration-300
                        `}>{n}</div>
                    ))}
                </div>
                
                <div className="flex justify-center text-blue-300">
                    <ArrowRight className="rotate-90" />
                </div>

                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">副本</span>
                    {source.map((n, i) => (
                        <div key={i} className={`w-10 h-10 flex items-center justify-center border rounded 
                            ${step >= i ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-slate-100 border-dashed border-slate-300 text-transparent'}
                            transition-all duration-300
                        `}>
                            {step >= i ? n : '?'}
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={() => setStep(0)} 
                disabled={step >= 0 && step < source.length}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
                {step >= 0 && step < source.length ? "复印中..." : "开始复印"}
            </button>
        </div>
    );
};

// Fill Visual
export const FillVisual = () => {
    const [step, setStep] = useState(-1);
    const size = 5;
    
    useEffect(() => {
        if (step >= 0 && step < size) {
            const timer = setTimeout(() => setStep(s => s + 1), 500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PaintBucket size={18} className="text-pink-600"/> 
                fill 油漆刷
            </h4>
            
            <div className="flex gap-2 mb-6">
                {Array.from({length: size}).map((_, i) => (
                    <div key={i} className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg text-lg font-bold transition-all duration-300
                        ${step >= i ? 'bg-pink-100 border-pink-500 text-pink-600' : 'bg-white border-slate-200 text-slate-300'}
                    `}>
                        {step >= i ? '0' : '?'}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => setStep(0)} 
                disabled={step >= 0 && step < size}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-pink-700 transition-colors"
            >
                {step >= 0 && step < size ? "刷漆中..." : "全部刷成 0"}
            </button>
        </div>
    );
};

// Replace Visual
export const ReplaceVisual = () => {
    const [step, setStep] = useState(-1);
    const initial = [1, 0, 1, 0, 0, 1];
    
    useEffect(() => {
        if (step >= 0 && step < initial.length) {
            const timer = setTimeout(() => setStep(s => s + 1), 600);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <RefreshCcw size={18} className="text-orange-600"/> 
                replace 换灯泡
            </h4>
            
            <p className="text-xs text-slate-500 mb-4">把坏灯泡 (0) 换成新的 (1)</p>

            <div className="flex gap-2 mb-6">
                {initial.map((n, i) => (
                    <div key={i} className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all duration-500 relative
                        ${step === i ? 'scale-110 z-10' : ''}
                        ${step > i 
                            ? (n === 0 ? 'bg-yellow-100 border-yellow-500 text-yellow-600' : 'bg-white border-slate-200 text-slate-400')
                            : (n === 0 ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-white border-slate-200 text-slate-400')
                        }
                    `}>
                        {/* Old Value */}
                        <span className={`absolute transition-opacity duration-300 ${step > i && n === 0 ? 'opacity-0' : 'opacity-100'}`}>
                            {n === 0 ? '💡' : '💡'}
                        </span>
                        {/* New Value */}
                        <span className={`absolute transition-opacity duration-300 ${step > i && n === 0 ? 'opacity-100' : 'opacity-0'}`}>
                            ✨
                        </span>
                        
                        {n === 0 && <span className="absolute -bottom-6 text-[10px] text-slate-400">{step > i ? 'Fixed' : 'Broken'}</span>}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => setStep(0)} 
                disabled={step >= 0 && step < initial.length}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-orange-700 transition-colors"
            >
                开始维修
            </button>
        </div>
    );
};

// Remove Visual
export const RemoveVisual = () => {
    const [step, setStep] = useState(0); // 0: init, 1: remove, 2: erase
    const [data, setData] = useState([1, 2, 1, 2, 1]);
    const [validCount, setValidCount] = useState(5);
    
    const handleRemove = () => {
        // Logically remove 2 (move 1s to front)
        // Original: 1 2 1 2 1
        // Removed:  1 1 1 ? ?
        setData([1, 1, 1, 2, 1]); // Show the result of remove (garbage at end)
        setValidCount(3);
        setStep(1);
    };
    
    const handleErase = () => {
        setData([1, 1, 1]);
        setStep(2);
    };

    const reset = () => {
        setData([1, 2, 1, 2, 1]);
        setValidCount(5);
        setStep(0);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trash2 size={18} className="text-red-600"/> 
                remove 删除陷阱
            </h4>
            
            <p className="text-xs text-slate-500 mb-4">目标：移除所有的 2 (香蕉)</p>

            <div className="flex gap-2 mb-8 relative">
                {data.map((n, i) => (
                    <div key={i} className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg text-xl transition-all duration-500
                        ${i >= validCount ? 'opacity-30 border-dashed border-slate-400 bg-slate-100' : 'bg-white border-slate-200'}
                    `}>
                        {n === 1 ? '🍎' : '🍌'}
                        {i === validCount && step === 1 && (
                            <div className="absolute -top-10 left-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
                                新结尾 (return)
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-600"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={handleRemove} 
                    disabled={step !== 0}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-indigo-200 transition-colors"
                >
                    1. remove(2)
                </button>
                <button 
                    onClick={handleErase} 
                    disabled={step !== 1}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-red-200 transition-colors"
                >
                    2. erase(...)
                </button>
                <button 
                    onClick={reset} 
                    disabled={step === 0}
                    className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors"
                >
                    重置
                </button>
            </div>
            
            <div className="mt-4 text-xs text-slate-500 h-6">
                {step === 0 && "数组里有苹果和香蕉"}
                {step === 1 && "remove 只是把苹果移到了前面，并没有真正删除香蕉！"}
                {step === 2 && "配合 erase 才是真正的删除！"}
            </div>
        </div>
    );
};

// Unique Visual
export const UniqueVisual = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState([1, 1, 2, 2, 3]);
    const [validCount, setValidCount] = useState(5);

    const handleUnique = () => {
        // Original: 1 1 2 2 3
        // Unique:   1 2 3 ? ?
        setData([1, 2, 3, 2, 3]);
        setValidCount(3);
        setStep(1);
    };
    
    const handleErase = () => {
        setData([1, 2, 3]);
        setStep(2);
    };

    const reset = () => {
        setData([1, 1, 2, 2, 3]);
        setValidCount(5);
        setStep(0);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Minimize2 size={18} className="text-purple-600"/> 
                unique 去重
            </h4>
            
            <div className="flex gap-2 mb-8 relative">
                {data.map((n, i) => (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-500
                        ${i >= validCount ? 'opacity-30 border-dashed border-slate-400 bg-slate-100' : 'bg-white border-purple-200 text-purple-700'}
                    `}>
                        {n}
                        {i === validCount && step === 1 && (
                            <div className="absolute -top-10 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
                                新结尾
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-purple-600"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={handleUnique} 
                    disabled={step !== 0}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-purple-200 transition-colors"
                >
                    unique()
                </button>
                <button 
                    onClick={handleErase} 
                    disabled={step !== 1}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-red-200 transition-colors"
                >
                    erase()
                </button>
                <button 
                    onClick={reset} 
                    disabled={step === 0}
                    className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors"
                >
                    重置
                </button>
            </div>
        </div>
    );
};

// Transform Visual
export const TransformVisual = () => {
    const [step, setStep] = useState(-1);
    const source = [1, 2, 3, 4];
    
    useEffect(() => {
        if (step >= 0 && step < source.length) {
            const timer = setTimeout(() => setStep(s => s + 1), 600);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Wand2 size={18} className="text-indigo-600"/> 
                transform 魔法变换
            </h4>
            
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">原值</span>
                    {source.map((n, i) => (
                        <div key={i} className={`w-10 h-10 flex items-center justify-center border rounded bg-white
                            ${step === i ? 'border-indigo-500 ring-2 ring-indigo-100 scale-110' : 'border-slate-200'}
                        `}>{n}</div>
                    ))}
                </div>
                
                <div className="flex justify-center text-indigo-500 font-bold text-sm">
                    ↓ × 2 (变身!)
                </div>

                <div className="flex gap-2 items-center">
                    <span className="w-16 text-xs text-slate-500 text-right">结果</span>
                    {source.map((n, i) => (
                        <div key={i} className={`w-10 h-10 flex items-center justify-center border rounded font-bold
                            ${step >= i ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-dashed border-slate-200 text-transparent'}
                            transition-all duration-300
                        `}>
                            {step >= i ? n * 2 : '?'}
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={() => setStep(0)} 
                disabled={step >= 0 && step < source.length}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-indigo-700 transition-colors"
            >
                开始变换
            </button>
        </div>
    );
};

// Reverse Visual
export const ReverseVisual = () => {
    const [isReversed, setIsReversed] = useState(false);
    
    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <RefreshCw size={18} className="text-teal-600"/> 
                reverse 乾坤大挪移
            </h4>
            
            <div className="flex gap-2 mb-8 perspective-1000">
                {[1, 2, 3, 4, 5].map((n, i) => {
                    // Calculate position based on reversed state
                    // Index: 0 1 2 3 4
                    // Value: 1 2 3 4 5
                    // RevVal:5 4 3 2 1
                    
                    return (
                        <div key={i} className={`
                            w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold text-xl bg-white border-teal-200 text-teal-700 shadow-sm
                            transition-all duration-700 transform
                            ${isReversed ? 'rotate-y-180' : ''}
                        `}
                        style={{
                            order: isReversed ? 5-i : i
                        }}
                        >
                            {n}
                        </div>
                    );
                })}
            </div>
            
            <button 
                onClick={() => setIsReversed(!isReversed)} 
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-bold hover:bg-teal-700 transition-colors"
            >
                {isReversed ? "还原" : "翻转 (Reverse)"}
            </button>
        </div>
    );
};

// Sort Visual
export const SortVisual = () => {
    const [nums, setNums] = useState([5, 2, 8, 1, 9, 3]);
    const [sorting, setSorting] = useState(false);

    const shuffle = () => {
        setNums([...nums].sort(() => Math.random() - 0.5));
    };

    const runSort = (desc = false) => {
        setSorting(true);
        const newNums = [...nums];
        newNums.sort((a, b) => desc ? b - a : a - b);
        
        // Simple animation simulation
        setTimeout(() => {
            setNums(newNums);
            setSorting(false);
        }, 500);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ArrowUp size={18} className="text-blue-600"/> 
                sort 排序模拟
            </h4>
            
            <div className="flex items-end gap-2 mb-8 h-32 border-b border-slate-300 pb-2 px-4">
                {nums.map((n, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 transition-all duration-500" style={{ order: i }}>
                        <div 
                            className={`w-8 rounded-t-lg transition-all duration-500 ${sorting ? 'bg-blue-300' : 'bg-blue-500'}`}
                            style={{ height: `${n * 10}px` }}
                        ></div>
                        <span className="text-xs font-mono font-bold text-slate-600">{n}</span>
                    </div>
                ))}
            </div>
            
            <div className="flex gap-2">
                <button onClick={shuffle} disabled={sorting} className="px-3 py-1 bg-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-300">
                    打乱
                </button>
                <button onClick={() => runSort(false)} disabled={sorting} className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700">
                    从小到大
                </button>
                <button onClick={() => runSort(true)} disabled={sorting} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm font-bold hover:bg-indigo-700">
                    从大到小
                </button>
            </div>
        </div>
    );
};

// Binary Search Visual
export const BinarySearchVisual = () => {
    const nums = [1, 3, 5, 7, 9, 11, 13, 15];
    const [target, setTarget] = useState(7);
    const [result, setResult] = useState<number | null>(null);
    const [searching, setSearching] = useState(false);

    const search = () => {
        setSearching(true);
        setResult(null);
        setTimeout(() => {
            const idx = nums.indexOf(target);
            setResult(idx !== -1 ? idx : -1);
            setSearching(false);
        }, 500);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Search size={18} className="text-emerald-600"/> 
                binary_search 二分查找
            </h4>
            
            <div className="flex gap-2 mb-6">
                {nums.map((n, i) => (
                    <div key={i} className={`
                        w-10 h-10 flex items-center justify-center border-2 rounded-lg font-mono font-bold transition-all duration-300
                        ${result === i ? 'bg-emerald-100 border-emerald-500 text-emerald-700 scale-110' : 'bg-white border-slate-200 text-slate-500'}
                    `}>
                        {n}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-4 items-center">
                <input 
                    type="number" 
                    value={target} 
                    onChange={e => setTarget(Number(e.target.value))}
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-center"
                />
                <button 
                    onClick={search} 
                    disabled={searching}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
                >
                    查找
                </button>
            </div>
            {result === -1 && <p className="mt-2 text-sm text-red-500">没找到！</p>}
        </div>
    );
};

// Heap Visual
export const HeapVisual = () => {
    const [heap, setHeap] = useState([30, 20, 10, 5]); // Max heap
    
    const push = () => {
        if (heap.length >= 7) return;
        const val = Math.floor(Math.random() * 50) + 1;
        const newHeap = [...heap, val].sort((a, b) => b - a); // Cheating for visual simplicity
        setHeap(newHeap);
    };

    const pop = () => {
        if (heap.length === 0) return;
        const newHeap = heap.slice(1);
        setHeap(newHeap);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-amber-600"/> 
                Heap 堆 (优先队列)
            </h4>
            
            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex justify-center">
                    {heap.length > 0 && (
                        <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-amber-200 z-10">
                            {heap[0]}
                        </div>
                    )}
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                    {heap.slice(1).map((n, i) => (
                        <div key={i} className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold border-2 border-amber-300">
                            {n}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-slate-500">老大永远在最上面 (vector[0])</p>
            </div>
            
            <div className="flex gap-2">
                <button onClick={push} className="px-3 py-1 bg-green-600 text-white rounded text-sm font-bold hover:bg-green-700 flex items-center gap-1">
                    <Plus size={14} /> push_heap
                </button>
                <button onClick={pop} className="px-3 py-1 bg-red-600 text-white rounded text-sm font-bold hover:bg-red-700 flex items-center gap-1">
                    <Trash2 size={14} /> pop_heap
                </button>
            </div>
        </div>
    );
};

// Permutation Visual
export const PermutationVisual = () => {
    const [nums, setNums] = useState([1, 2, 3]);
    
    // Simple next_permutation implementation for 3 elements
    const next = () => {
        const s = nums.join('');
        const map: Record<string, number[]> = {
            '123': [1, 3, 2], '132': [2, 1, 3], '213': [2, 3, 1],
            '231': [3, 1, 2], '312': [3, 2, 1], '321': [1, 2, 3]
        };
        setNums(map[s] || [1, 2, 3]);
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GitMerge size={18} className="text-purple-600"/> 
                next_permutation 全排列
            </h4>
            
            <div className="flex gap-2 mb-6 text-3xl font-mono font-bold text-slate-700 bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200">
                {nums.map((n, i) => (
                    <span key={i} className="w-8 text-center">{n}</span>
                ))}
            </div>
            
            <button 
                onClick={next} 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
                下一个排列 <ArrowRight size={16} />
            </button>
        </div>
    );
};

// Rotate Shuffle Visual
export const RotateShuffleVisual = () => {
    const [nums, setNums] = useState([1, 2, 3, 4, 5]);

    const rotateArr = () => {
        const newNums = [...nums];
        // Rotate left by 1
        const first = newNums.shift();
        if (first !== undefined) newNums.push(first);
        setNums(newNums);
    };

    const shuffleArr = () => {
        setNums([...nums].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <RefreshCcw size={18} className="text-orange-600"/> 
                Rotate & Shuffle
            </h4>
            
            <div className="flex gap-2 mb-6">
                {nums.map((n, i) => (
                    <div key={n} className="w-10 h-10 bg-white border-2 border-orange-200 text-orange-700 rounded-lg flex items-center justify-center font-bold shadow-sm">
                        {n}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-2">
                <button onClick={rotateArr} className="px-3 py-1 bg-orange-600 text-white rounded text-sm font-bold hover:bg-orange-700">
                    rotate (旋转)
                </button>
                <button onClick={shuffleArr} className="px-3 py-1 bg-slate-600 text-white rounded text-sm font-bold hover:bg-slate-700">
                    shuffle (洗牌)
                </button>
            </div>
        </div>
    );
};
