import React, { useState } from 'react';
import { Section } from '../../types/index';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { QuizCard } from '../../components/Lesson/QuizCard';

// New Helper: Pointer Definition and Usage Visualization
const PointerDefinitionVisual = () => {
  const [step, setStep] = useState(0);
  const [targetValue, setTargetValue] = useState(123);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 0));
  const handleReset = () => {
      setStep(0);
      setTargetValue(123);
  };

  const steps = [
      { code: 'int a = 123;', desc: '定义变量 a，它有自己的地址和值。' },
      { code: 'int* p;', desc: '定义指针 p，现在它里面是垃圾值 (随机)。' },
      { code: 'p = &a;', desc: '把 a 的地址 (0x100) 抄写到 p 里面。p 现在“指向”了 a。' },
      { code: '*p = 20;', desc: '通过 p 找到 a，把里面的值改成 20。' }
  ];

  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl my-6">
        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
                <button onClick={handleReset} className="px-3 py-1.5 text-xs font-bold rounded bg-white border border-slate-300 text-slate-600 hover:bg-slate-50">重置</button>
                <button onClick={handlePrev} disabled={step === 0} className="px-3 py-1.5 text-xs font-bold rounded bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50">上一步</button>
                <button onClick={handleNext} disabled={step === 3} className="px-3 py-1.5 text-xs font-bold rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">下一步</button>
            </div>
            <div className="text-sm font-mono bg-slate-200 px-3 py-1 rounded text-slate-700">
                {steps[step].code}
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center min-h-[200px]">
            {/* Variable a */}
            <div className={`relative transition-all duration-500 ${step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-24 h-24 bg-white border-2 rounded-xl flex items-center justify-center text-3xl font-bold shadow-sm transition-colors duration-300
                    ${step === 3 ? 'text-indigo-600 border-indigo-400 bg-indigo-50 scale-110' : 'text-slate-800 border-slate-300'}
                `}>
                    <span key={step === 3 ? 'val-20' : 'val-123'} className={step === 3 ? 'animate-in zoom-in spin-in-1' : ''}>
                        {step === 3 ? 20 : 123}
                    </span>
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded border border-slate-200 font-mono whitespace-nowrap">
                    地址: 0x100
                </div>
                <div className="mt-3 text-center font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm">
                    int a
                </div>
            </div>

            {/* Connection Arrow Area */}
            <div className={`relative transition-all duration-500 flex flex-col items-center justify-center ${step >= 2 ? 'opacity-100 w-48' : 'opacity-0 w-0'}`}>
                
                {/* Action Label Badge - Positioned above the line */}
                <div className={`absolute -top-6 transition-all duration-300 z-10
                    ${step === 2 || step === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}>
                    {step === 2 && (
                        <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-2">
                            <span>p = &a</span>
                            <span className="text-[10px] text-indigo-400 font-normal border-l border-indigo-200 pl-2">存入地址</span>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="bg-indigo-600 border border-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-2">
                            <span>*p = 20</span>
                            <span className="text-[10px] text-indigo-200 font-normal border-l border-indigo-500 pl-2">写入值</span>
                        </div>
                    )}
                </div>

                {/* Address Value - Positioned below the line */}
                <div className={`absolute -bottom-6 font-mono text-xs text-slate-400 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    0x100
                </div>

                {/* The Arrow Line */}
                <div className="w-full h-12 flex items-center justify-center relative">
                     {/* Base Line (Dashed) */}
                     <div className="w-full h-0.5 border-t-2 border-dashed border-slate-300 absolute"></div>
                     
                     {/* Active Line (Solid) - Grows from right to left */}
                     <div className={`absolute right-0 h-0.5 bg-indigo-500 transition-all duration-700 ease-out
                         ${step >= 2 ? 'w-full' : 'w-0'}
                     `}></div>

                     {/* Arrow Head */}
                     <div className={`absolute left-0 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-indigo-500 transition-opacity duration-300
                         ${step >= 2 ? 'opacity-100' : 'opacity-0'}
                     `}></div>

                     {/* Data Particle Animation (Only for Step 3) */}
                     {step === 3 && (
                         <div className="absolute w-3 h-3 bg-indigo-600 rounded-full shadow-sm z-20 animate-flow-left"></div>
                     )}
                     
                     <style>{`
                        @keyframes flow-left {
                            0% { right: 0; opacity: 0; transform: scale(0.5); }
                            20% { opacity: 1; transform: scale(1); }
                            80% { opacity: 1; transform: scale(1); }
                            100% { right: 100%; opacity: 0; transform: scale(0.5); }
                        }
                        .animate-flow-left {
                            animation: flow-left 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
                        }
                     `}</style>
                </div>
            </div>

            {/* Pointer p */}
            <div className={`relative transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className={`w-32 h-24 bg-indigo-50 border-2 border-indigo-500 rounded-xl flex items-center justify-center text-sm font-mono font-bold shadow-md transition-all duration-500
                     ${step >= 2 ? 'text-indigo-700' : 'text-slate-400 italic'}
                     ${step === 3 ? 'ring-4 ring-indigo-200' : ''}
                `}>
                    {step >= 2 ? '0x100' : '???'}
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-500 text-xs px-2 py-0.5 rounded border border-indigo-200 font-mono whitespace-nowrap">
                    地址: 0x990
                </div>
                <div className="mt-3 text-center font-mono font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm">
                    int* p
                </div>
            </div>
        </div>

        <p className="text-center text-slate-600 mt-8 text-sm h-6">
            {steps[step].desc}
        </p>
    </div>
  );
};

// New Helper: Const Pointer Visualization
const ConstPointerVisual = () => {
    const [mode, setMode] = useState<'none' | 'ptr_to_const' | 'const_ptr'>('none');
    const [target, setTarget] = useState<'a' | 'b'>('a');
    const [valA, setValA] = useState(10);
    const [valB, setValB] = useState(20);
    const [msg, setMsg] = useState('');
    const [shake, setShake] = useState(false);
    const [highlightVal, setHighlightVal] = useState(false);

    const reset = () => {
        setTarget('a');
        setValA(10);
        setValB(20);
        setMsg('');
        setShake(false);
        setHighlightVal(false);
    };

    const handleModeChange = (m: 'none' | 'ptr_to_const' | 'const_ptr') => {
        setMode(m);
        reset();
    };

    const tryMove = () => {
        if (mode === 'const_ptr') {
            setMsg('❌ 错误：指针常量 (int* const) 的指向不能修改！');
            setShake(true);
            setTimeout(() => setShake(false), 500);
        } else {
            setTarget(t => t === 'a' ? 'b' : 'a');
            setMsg('✅ 成功：指针指向改变了');
        }
    };

    const tryModify = () => {
        if (mode === 'ptr_to_const') {
            setMsg('❌ 错误：指向常量的指针 (const int*) 不能通过指针修改值！');
            setShake(true);
            setTimeout(() => setShake(false), 500);
        } else {
            if (target === 'a') {
                setValA(v => v + 10);
            } else {
                setValB(v => v + 10);
            }
            setHighlightVal(true);
            setTimeout(() => setHighlightVal(false), 300);
            setMsg('✅ 成功：通过指针修改了值');
        }
    };

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl my-6 shadow-sm relative">
            <button 
                onClick={reset}
                className="absolute top-4 right-4 px-2 py-1 text-xs text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 rounded transition-all"
                title="重置状态"
            >
                ↺ 重置
            </button>
            <h4 className="font-bold text-slate-800 mb-4 text-center">const 指针大乱斗</h4>
            
            <div className="flex justify-center gap-2 mb-6">
                <button 
                    onClick={() => handleModeChange('none')}
                    className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${mode === 'none' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    普通指针 (int*)
                </button>
                <button 
                    onClick={() => handleModeChange('ptr_to_const')}
                    className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${mode === 'ptr_to_const' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    指向常量的指针 (const int*)
                </button>
                <button 
                    onClick={() => handleModeChange('const_ptr')}
                    className={`px-3 py-1.5 text-xs font-bold rounded border transition-all ${mode === 'const_ptr' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    指针常量 (int* const)
                </button>
            </div>

            <div className="flex justify-center items-center gap-16 min-h-[180px] relative">
                {/* Pointer p */}
                <div className={`flex flex-col items-center relative z-10 transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
                    <div className={`w-28 h-12 border-2 flex items-center justify-center font-mono font-bold rounded-lg bg-white shadow-sm relative
                        ${mode === 'const_ptr' ? 'border-amber-500 text-amber-700' : 'border-slate-300 text-slate-600'}
                    `}>
                        {target === 'a' ? '0x100' : '0x200'}
                        {mode === 'const_ptr' && (
                            <div className="absolute -top-3 -right-3 bg-amber-100 text-amber-600 text-xs px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 shadow-sm">
                                🔒 指向锁死
                            </div>
                        )}
                        
                        {/* Arrow (SVG) - Moved inside to align with box center */}
                        <div className="absolute left-full top-1/2 w-0 h-0 z-0">
                            <svg className="overflow-visible -translate-y-1/2" width="64" height="140">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                                    </marker>
                                </defs>
                                <line 
                                    x1="0" 
                                    y1="70" 
                                    x2="56" 
                                    y2={target === 'a' ? 28 : 140} 
                                    stroke="#94a3b8" 
                                    strokeWidth="2" 
                                    markerEnd="url(#arrowhead)"
                                    className="transition-all duration-300 ease-in-out"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-600 font-mono">
                        {mode === 'none' && 'int* p'}
                        {mode === 'ptr_to_const' && 'const int* p'}
                        {mode === 'const_ptr' && 'int* const p'}
                    </div>
                </div>

                {/* Variables */}
                <div className="flex flex-col gap-8">
                    {/* Variable a */}
                    <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 border-2 rounded-xl flex items-center justify-center text-2xl font-bold bg-white shadow-sm transition-all duration-300
                            ${target === 'a' ? 'ring-4 ring-indigo-100 border-indigo-500' : 'border-slate-200 opacity-50'}
                            ${highlightVal && target === 'a' ? 'scale-110 bg-indigo-50 text-indigo-700' : ''}
                        `}>
                            {valA}
                            {mode === 'ptr_to_const' && target === 'a' && (
                                <div className="absolute -top-3 -right-3 bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1 shadow-sm z-20">
                                    🔒 只读
                                </div>
                            )}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                            int a<br/>(0x100)
                        </div>
                    </div>

                    {/* Variable b */}
                    <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 border-2 rounded-xl flex items-center justify-center text-2xl font-bold bg-white shadow-sm transition-all duration-300
                            ${target === 'b' ? 'ring-4 ring-indigo-100 border-indigo-500' : 'border-slate-200 opacity-50'}
                            ${highlightVal && target === 'b' ? 'scale-110 bg-indigo-50 text-indigo-700' : ''}
                        `}>
                            {valB}
                            {mode === 'ptr_to_const' && target === 'b' && (
                                <div className="absolute -top-3 -right-3 bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1 shadow-sm z-20">
                                    🔒 只读
                                </div>
                            )}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                            int b<br/>(0x200)
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <button 
                    onClick={tryMove}
                    className="px-4 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 font-mono text-sm shadow-sm active:scale-95 transition-transform"
                >
                    p = {target === 'a' ? '&b' : '&a'} (修改指向)
                </button>
                <button 
                    onClick={tryModify}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-mono text-sm shadow-sm active:scale-95 transition-transform"
                >
                    *p = {target === 'a' ? valA + 10 : valB + 10} (修改值)
                </button>
            </div>

            <div className={`mt-4 text-center text-sm h-6 transition-colors duration-300 font-bold ${msg.includes('❌') ? 'text-red-500' : 'text-emerald-600'}`}>
                {msg}
            </div>
            
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

// New Helper: Null Pointer Visualization
const NullPointerVisual = () => {
    const [pState, setPState] = useState<'valid' | 'null'>('valid');
    const [xValue, setXValue] = useState(10);
    const [crash, setCrash] = useState(false);
    const [log, setLog] = useState('');

    const reset = () => {
        setPState('valid');
        setXValue(10);
        setCrash(false);
        setLog('');
    };

    const handleSetValid = () => {
        setPState('valid');
        setCrash(false);
        setLog('p = &x; // p 现在指向 x (0x200)');
    };

    const handleSetNull = () => {
        setPState('null');
        setCrash(false);
        setLog('p = nullptr; // p 现在谁都不指 (空)');
    };

    const handleDereference = () => {
        if (pState === 'valid') {
            setXValue(999);
            setLog('*p = 999; // 成功！通过 p 修改了 x');
        } else {
            setCrash(true);
            setLog('CRASH! 试图解引用空指针！程序崩溃！');
        }
    };

    return (
        <div className={`p-6 border-2 rounded-xl my-6 transition-colors duration-200 relative ${crash ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-200'}`}>
             <button 
                 onClick={reset}
                 className="absolute top-4 right-4 px-2 py-1 text-xs text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-300 rounded transition-all"
                 title="重置状态"
             >
                 ↺ 重置
             </button>
            <div className="flex justify-center gap-4 mb-8">
                <button onClick={handleSetValid} disabled={crash} className="px-3 py-1.5 text-xs font-bold rounded bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50">
                    p = &x
                </button>
                <button onClick={handleSetNull} disabled={crash} className="px-3 py-1.5 text-xs font-bold rounded bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50">
                    p = nullptr
                </button>
                <button onClick={handleDereference} disabled={crash} className="px-3 py-1.5 text-xs font-bold rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
                    *p = 999
                </button>
                {crash && <button onClick={reset} className="px-3 py-1.5 text-xs font-bold rounded bg-red-600 text-white hover:bg-red-700 animate-pulse">
                    重启程序 (Reset)
                </button>}
            </div>

            <div className="flex justify-center items-center gap-16 min-h-[160px]">
                {/* Pointer p */}
                <div className="flex flex-col items-center">
                    <div className={`w-28 h-16 border-2 flex items-center justify-center font-mono font-bold transition-all duration-300 relative
                        ${pState === 'valid' ? 'bg-indigo-50 border-indigo-400 text-indigo-700' : 'bg-slate-100 border-slate-300 text-slate-400'}
                    `}>
                        {pState === 'valid' ? '0x200' : 'nullptr'}
                        
                        {/* Connection Line */}
                        <div className={`absolute top-1/2 left-full h-0.5 bg-indigo-500 transition-all duration-300 origin-left
                            ${pState === 'valid' ? 'w-16 opacity-100' : 'w-0 opacity-0'}
                        `}></div>
                         <div className={`absolute top-1/2 left-[calc(100%+64px)] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-indigo-500 -translate-y-1/2 transition-all duration-300
                            ${pState === 'valid' ? 'opacity-100' : 'opacity-0'}
                        `}></div>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-600">int* p</div>
                </div>

                {/* Variable x */}
                <div className={`flex flex-col items-center transition-all duration-100 ${crash ? 'translate-x-1 translate-y-1 rotate-3 opacity-50 grayscale' : ''}`}>
                    <div className="relative">
                        <div className={`w-24 h-24 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-800 shadow-sm
                             ${xValue === 999 ? 'text-indigo-600 border-indigo-400 bg-indigo-50' : ''}
                        `}>
                            {xValue}
                        </div>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-500 text-[10px] px-1 rounded border border-slate-200 font-mono">
                            0x200
                        </div>
                        
                        {/* Crash Overlay */}
                        {crash && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-5xl animate-bounce">💥</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-600">int x</div>
                </div>
            </div>
            
            <div className={`mt-6 p-3 rounded text-sm font-mono text-center transition-colors
                ${crash ? 'bg-red-100 text-red-700 font-bold' : 'bg-slate-100 text-slate-600'}
            `}>
                {log || '请操作指针...'}
            </div>
        </div>
    );
};







// New Helper: Pass by Value vs Pointer Visualization
const PassByValueVsPointerVisual = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
    {/* Pass by Value */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-red-100 text-red-800 px-3 py-1 rounded-br-lg text-xs font-bold">
        按值传递 (Copy)
      </div>
      <div className="mt-6 w-full flex flex-col gap-6">
        {/* Main Scope */}
        <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white/50">
          <div className="text-xs text-slate-500 mb-2 text-center">main 函数</div>
          <div className="flex justify-center">
             <div className="w-16 h-16 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 shadow-sm">
                10
             </div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-slate-600">int a</div>
        </div>

        {/* Separation */}
        <div className="flex justify-center items-center text-red-400 text-xs font-bold">
            ❌ 复制了一份
            <svg className="w-4 h-4 ml-1 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Func Scope */}
        <div className="border-2 border-dashed border-red-300 p-4 rounded-lg bg-red-100/50">
          <div className="text-xs text-red-500 mb-2 text-center">func(int x)</div>
          <div className="flex justify-center">
             <div className="w-16 h-16 bg-white border-2 border-red-400 flex items-center justify-center font-bold text-red-600 shadow-sm">
                0
             </div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-red-600">x = 0</div>
          <div className="text-center text-[10px] text-red-500 mt-1">(a 还是 10)</div>
        </div>
      </div>
    </div>

    {/* Pass by Pointer */}
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-br-lg text-xs font-bold">
        按地址传递 (Pointer)
      </div>
      <div className="mt-6 w-full flex flex-col gap-6">
        {/* Main Scope */}
        <div className="border-2 border-dashed border-emerald-300 p-4 rounded-lg bg-emerald-100/30">
          <div className="text-xs text-slate-500 mb-2 text-center">main 函数</div>
          <div className="flex justify-center relative">
             <div className="w-16 h-16 bg-white border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 shadow-sm z-10">
                0
             </div>
             <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-white px-1 rounded border">0x100</div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-emerald-700">int a</div>
        </div>

        {/* Separation */}
        <div className="flex justify-center items-center text-emerald-600 text-xs font-bold">
            ✅ 传了钥匙(地址)
            <svg className="w-4 h-4 ml-1 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Func Scope */}
        <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white/50">
          <div className="text-xs text-slate-500 mb-2 text-center">func(int *p)</div>
          <div className="flex justify-center items-center gap-4">
             <div className="flex flex-col items-center">
                <div className="w-20 h-10 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-600 text-sm shadow-sm">
                    0x100
                </div>
                <div className="text-center text-xs font-mono mt-1 text-slate-500">p</div>
             </div>
             <div className="text-xs text-emerald-600 font-bold">*p = 0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// New Helper: Pointer Assignment Visualization (Example 3)
const PointerAssignmentVisual = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { label: 'int x = 10; int *p, *q;', desc: '声明变量 x 和两个指针 p, q' },
        { label: 'p = &x;', desc: 'p 指向 x (p 保存 x 的地址)' },
        { label: 'q = p;', desc: '把 p 的值赋给 q (q 也指向 x)' },
        { label: 'cout << *p << *q;', desc: '解引用：都访问同一个 x' }
    ];

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
            <h4 className="font-bold text-slate-800 mb-4 text-lg">指针变量之间的赋值</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <CodeBlock code={`#include<iostream> 
using namespace std; 
int main() 
{ 
    int x = 10; 
    int* p, * q; 
    p = &x; 
    q = p; 
    cout << *p << endl; 
    cout << *q << endl; 
    return 0; 
}`} />
                </div>
                
                <div className="flex flex-col">
                     {/* Controls */}
                    <div className="flex justify-end gap-2 mb-4">
                         <button 
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded hover:bg-slate-200 disabled:opacity-50"
                         >
                            上一步
                         </button>
                         <button 
                            onClick={() => setStep(Math.min(3, step + 1))}
                            disabled={step === 3}
                            className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                         >
                            下一步
                         </button>
                    </div>

                    <div className="flex flex-col gap-8 justify-center items-center flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[200px]">
                        {/* Variable x */}
                        <div className="flex flex-col items-center relative">
                             <div className="w-16 h-16 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-xl font-bold text-slate-700 shadow-sm z-10">
                                 10
                             </div>
                             <div className="mt-1 font-mono text-xs text-slate-500">int x (0x100)</div>
                        </div>

                        {/* Pointers Container */}
                        <div className="flex gap-4">
                            {/* Pointer p */}
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-20 h-10 border-2 flex items-center justify-center font-mono text-xs font-bold bg-indigo-50 border-indigo-300 text-indigo-700 transition-all duration-300`}>
                                    {step >= 1 ? '0x100' : '???'}
                                </div>
                                <div className="font-mono text-[10px] text-indigo-600">int* p</div>
                                <div className={`text-[10px] text-indigo-400 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>↓ p=&x</div>
                            </div>

                            {/* Pointer q */}
                            <div className="flex flex-col items-center gap-1">
                                 <div className={`w-20 h-10 border-2 flex items-center justify-center font-mono text-xs font-bold bg-purple-50 border-purple-300 text-purple-700 transition-all duration-300`}>
                                    {step >= 2 ? '0x100' : '???'}
                                </div>
                                <div className="font-mono text-[10px] text-purple-600">int* q</div>
                                <div className={`text-[10px] text-purple-400 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>↓ q=p</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-indigo-50 p-2 rounded text-xs text-indigo-800 font-mono text-center">
                        {steps[step].label}
                        <div className="text-slate-500 font-sans mt-1">{steps[step].desc}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// New Helper: Double Pointer Visualization (Example 4)
const DoublePointerVisual = () => {
    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
             <h4 className="font-bold text-slate-800 mb-4 text-lg">指针类型的匹配 (double*)</h4>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                 <div>
                    <CodeBlock code={`#include<iostream> 
using namespace std; 
int main() 
{ 
    double x = 2.5; 
    double* p; 
    p = &x; 
    cout << p << endl; 
    cout << *p << endl; 
    return 0; 
}`} />
                 </div>
            
                <div className="flex flex-col items-center gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4 animate-in zoom-in duration-500">
                        {/* Double Variable */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-12 bg-blue-50 border-2 border-blue-400 rounded-lg flex items-center justify-center text-lg font-bold text-blue-800 shadow-sm relative group">
                                2.5
                                <div className="absolute -top-3 left-1 bg-blue-100 text-blue-600 text-[9px] px-1 rounded border border-blue-200">
                                    0x200 (8B)
                                </div>
                            </div>
                            <div className="mt-1 font-mono text-xs text-blue-600 font-bold">double x</div>
                        </div>

                        {/* Arrow */}
                        <div className="text-slate-300">←</div>

                        {/* Double Pointer */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-10 bg-slate-50 border-2 border-slate-400 border-dashed rounded flex items-center justify-center font-mono text-xs text-slate-600">
                                0x200
                            </div>
                            <div className="mt-1 font-mono text-xs text-slate-600 font-bold">double* p</div>
                        </div>
                    </div>

                    <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded">
                        <strong>注意：</strong> <code>int*</code> 和 <code>double*</code> 不能混用，否则解引用时读取的字节数不同。
                    </div>
                </div>
            </div>
        </div>
    );
};

// New Helper: Pointer Modification Visualization (Example 5)
const PointerModificationVisual = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
             <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-800 text-lg">通过指针修改变量</h4>
                <button 
                    onClick={() => setStep(s => s === 0 ? 1 : 0)}
                    className={`px-3 py-1 text-xs font-bold rounded transition-colors ${step === 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    {step === 0 ? '运行 *p = 12' : '重置'}
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <CodeBlock code={`#include<iostream> 
using namespace std; 
int main() 
{ 
    int x = 10; 
    int* p; 
    p = &x; 
    *p = 12; 
    cout << x << ' ' << *p; 
    return 0; 
}`} />
                </div>

                <div className="flex justify-center items-center gap-8 bg-slate-50 rounded-xl border border-slate-100 p-4 min-h-[160px]">
                    {/* Pointer p */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-10 bg-indigo-50 border-2 border-indigo-400 rounded flex items-center justify-center font-mono font-bold text-indigo-700 shadow-sm relative text-xs">
                            0x300
                            {/* Arrow */}
                             <div className="absolute left-full top-1/2 w-8 h-0.5 bg-indigo-400"></div>
                             <div className="absolute left-[calc(100%+28px)] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-indigo-400 border-y-[4px] border-y-transparent"></div>
                        </div>
                        <div className="mt-1 font-mono text-xs text-slate-600">int* p</div>
                    </div>

                    {/* Variable x */}
                    <div className="flex flex-col items-center relative">
                        <div className={`w-20 h-20 bg-white border-4 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-500 shadow-sm
                            ${step === 1 ? 'border-indigo-500 text-indigo-600 scale-110 bg-indigo-50' : 'border-slate-300 text-slate-700'}
                        `}>
                            <span key={step} className={step === 1 ? 'animate-in zoom-in spin-in-1' : ''}>
                                {step === 1 ? 12 : 10}
                            </span>
                        </div>
                        <div className="absolute -top-3 right-0 bg-slate-100 text-slate-500 text-[9px] px-1 rounded border border-slate-200 font-mono">
                            0x300
                        </div>
                        <div className="mt-2 font-mono text-xs text-slate-600">int x</div>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-center text-xs text-slate-500">
                {step === 0 ? '点击按钮执行代码' : '执行完毕：通过 *p 成功修改了 x'}
            </div>
        </div>
    );
};

// New Helper: Swap Visualization (Example 6)
const SwapVisual = () => {
    const [step, setStep] = useState(0);
    const [vals, setVals] = useState({ a: 10, b: 50, temp: null as number | null });

    const steps = [
        { label: '准备工作', desc: 'main 函数定义变量 a=10, b=50' },
        { label: '传址调用', desc: 'swap(&a, &b) -> x 指向 a, y 指向 b' },
        { label: 't = *x', desc: '保存 *x (a的值 10) 到临时变量 t' },
        { label: '*x = *y', desc: '把 *y (b的值 50) 写入 *x (a)' },
        { label: '*y = t', desc: '把 t (原a的值 10) 写入 *y (b)' },
        { label: '完成', desc: '交换结束，a=50, b=10' }
    ];

    const nextStep = () => {
        if (step >= 5) {
            setStep(0);
            setVals({ a: 10, b: 50, temp: null });
        } else {
            const next = step + 1;
            setStep(next);
            if (next === 2) setVals(v => ({ ...v, temp: 10 }));
            if (next === 3) setVals(v => ({ ...v, a: 50 }));
            if (next === 4) setVals(v => ({ ...v, b: 10 }));
        }
    };

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
             <h4 className="font-bold text-slate-800 mb-4 text-lg">利用指针交换变量的值</h4>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div>
                     <CodeBlock code={`#include<iostream> 
using namespace std; 
void swap(int* x, int* y) 
{ 
    int t; 
    t=*x; *x=*y;*y=t; 
} 
int main() 
{ 
    int a=10,b=50; 
    swap(&a, &b); 
    cout<<a<<" "<<b; 
    return 0; 
}`} highlightLines={
    step === 0 ? [8] : 
    step === 1 ? [9] :
    step === 2 ? [5] :
    step === 3 ? [6] :
    step === 4 ? [6] : []
} />
                 </div>

                 <div className="flex flex-col">
                     <div className="flex justify-end mb-4">
                         <button 
                            onClick={nextStep}
                            className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                         >
                            {step === 5 ? '重置演示' : '下一步'}
                         </button>
                     </div>

                     <div className="bg-slate-50 p-6 pt-20 rounded-xl border border-slate-100 flex-1 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
                         {/* Memory Area */}
                         <div className="flex gap-12 items-end">
                             {/* Var a */}
                             <div className="flex flex-col items-center relative">
                                 <div className={`w-20 h-20 bg-white border-2 rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm transition-all duration-500 z-10
                                     ${step === 3 ? 'border-indigo-500 text-indigo-600 scale-110' : 'border-slate-300 text-slate-700'}
                                 `}>
                                     {vals.a}
                                 </div>
                                 <div className="mt-2 font-mono text-xs text-slate-500">int a (0x100)</div>
                                 {/* Pointer x */}
                                 <div className={`absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                                     <div className="font-mono text-xs text-indigo-600 mb-1">int* x</div>
                                     <div className="w-0.5 h-8 bg-indigo-400"></div>
                                     <div className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-indigo-400"></div>
                                 </div>
                             </div>

                             {/* Var b */}
                             <div className="flex flex-col items-center relative">
                                 <div className={`w-20 h-20 bg-white border-2 rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm transition-all duration-500 z-10
                                     ${step === 4 ? 'border-indigo-500 text-indigo-600 scale-110' : 'border-slate-300 text-slate-700'}
                                 `}>
                                     {vals.b}
                                 </div>
                                 <div className="mt-2 font-mono text-xs text-slate-500">int b (0x104)</div>
                                  {/* Pointer y */}
                                 <div className={`absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                                     <div className="font-mono text-xs text-indigo-600 mb-1">int* y</div>
                                     <div className="w-0.5 h-8 bg-indigo-400"></div>
                                     <div className="w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-indigo-400"></div>
                                 </div>
                             </div>
                         </div>

                         {/* Temp Var */}
                         <div className={`flex flex-col items-center transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                             <div className="w-16 h-12 bg-amber-50 border-2 border-amber-300 border-dashed rounded flex items-center justify-center font-bold text-amber-800">
                                 {vals.temp ?? '?'}
                             </div>
                             <div className="mt-1 font-mono text-xs text-amber-600">int t</div>
                         </div>
                     </div>

                     <div className="mt-4 text-center font-mono text-xs text-indigo-800 bg-indigo-50 p-2 rounded">
                         {steps[step].label}: {steps[step].desc}
                     </div>
                 </div>
             </div>
        </div>
    );
};

// New Helper: Sort Visualization (Example 7)
const SortVisual = () => {
    const [step, setStep] = useState(0);
    const [nums, setNums] = useState([30, 10, 20]);
    const [activePair, setActivePair] = useState<[number, number] | null>(null);

    // Initial: 30, 10, 20
    const sequence = [
        { desc: '主函数: 输入 a=30, b=10, c=20', pair: null, action: null, line: 12 },
        { desc: '主函数: 调用 sort(&a, &b, &c)', pair: null, action: null, line: 13 },
        { desc: '比较 *x1(30) > *x2(10)? 是 -> 交换', pair: [0, 1], action: () => setNums([10, 30, 20]), line: 5 },
        { desc: '比较 *x1(10) > *x3(20)? 否 -> 不变', pair: [0, 2], action: null, line: 6 },
        { desc: '比较 *x2(30) > *x3(20)? 是 -> 交换', pair: [1, 2], action: () => setNums([10, 20, 30]), line: 7 },
        { desc: '主函数: 输出 10 20 30', pair: null, action: null, line: 14 },
    ];

    const nextStep = () => {
        if (step >= 5) {
            setStep(0);
            setNums([30, 10, 20]);
            setActivePair(null);
        } else {
            const next = step + 1;
            setStep(next);
            setActivePair(sequence[next].pair as [number, number] | null);
            if (sequence[next].action) sequence[next].action!();
        }
    };

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
             <h4 className="font-bold text-slate-800 mb-4 text-lg">利用指针对 3 个数字进行排序</h4>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div>
                     <CodeBlock code={`#include<iostream> 
using namespace std; 
void sort(int* x1,int* x2,int* x3) 
{ 
    if(*x1>*x2) swap(x1,x2); 
    if(*x1>*x3) swap(x1,x3); 
    if(*x2>*x3) swap(x2,x3); 
}
int main() 
{ 
    int a,b,c; 
    cin>>a>>b>>c; 
    sort(&a,&b,&c); 
    cout<<a<<'\\t'<<b<<'\\t'<<c<<endl; 
    return 0; 
}`} highlightLines={
    [sequence[step].line]
} />
                 </div>

                 <div className="flex flex-col">
                     <div className="flex justify-end mb-4">
                         <button 
                            onClick={nextStep}
                            className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                         >
                            {step === 5 ? '重置演示' : '下一步'}
                         </button>
                     </div>

                     <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex-1 flex flex-col items-center justify-center">
                         <div className="flex gap-4">
                             {nums.map((n, i) => {
                                 const isActive = activePair?.includes(i);
                                 return (
                                     <div key={i} className={`flex flex-col items-center transition-all duration-500
                                         ${isActive ? 'scale-110' : 'scale-100'}
                                     `}>
                                         <div className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center text-xl font-bold shadow-sm transition-colors duration-300
                                             ${isActive ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-700'}
                                         `}>
                                             {n}
                                         </div>
                                         <div className="mt-2 font-mono text-xs text-slate-500">
                                             {i === 0 ? '*x1' : i === 1 ? '*x2' : '*x3'}
                                         </div>
                                     </div>
                                 );
                             })}
                         </div>
                         
                         {/* Connection Line for Active Pair */}
                         <div className="h-8 mt-2 relative w-full max-w-[200px]">
                             {activePair && (
                                 <div className={`absolute bottom-0 h-4 border-b-2 border-x-2 border-indigo-400 rounded-b-lg transition-all duration-300
                                     ${activePair[0] === 0 && activePair[1] === 1 ? 'left-[15%] w-[35%]' : ''}
                                     ${activePair[0] === 0 && activePair[1] === 2 ? 'left-[15%] w-[70%]' : ''}
                                     ${activePair[0] === 1 && activePair[1] === 2 ? 'left-[50%] w-[35%]' : ''}
                                 `}></div>
                             )}
                         </div>
                     </div>

                     <div className="mt-4 text-center font-mono text-xs text-indigo-800 bg-indigo-50 p-2 rounded">
                         {sequence[step].desc}
                     </div>
                 </div>
             </div>
        </div>
    );
};

// New Helper: Detailed Code Analysis for Swap
const SwapCodeDetailedAnalysis = () => (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
        <h4 className="font-bold text-slate-800 mb-4">深入分析：Swap 函数的三步走</h4>
        
        {/* Asterisk Explanation */}
        <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h5 className="font-bold text-indigo-700 mb-3 text-sm border-b pb-2">同一个 *，不同的身份</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <code className="block bg-slate-100 p-2 rounded text-slate-800 text-xs mb-2">
                        void swap(int<span className="bg-yellow-200 text-yellow-800 font-bold px-1 rounded mx-0.5">*</span>x, int<span className="bg-yellow-200 text-yellow-800 font-bold px-1 rounded mx-0.5">*</span>y)
                    </code>
                    <div className="text-xs text-slate-600">
                        <span className="font-bold text-yellow-700">定义指针变量：</span><br/>
                        告诉编译器 x 和 y 是<span className="font-bold">指针类型</span>。
                        <br/>(只在声明变量时出现)
                    </div>
                </div>
                <div className="relative">
                    <code className="block bg-slate-100 p-2 rounded text-slate-800 text-xs mb-2">
                        int t = <span className="bg-green-200 text-green-800 font-bold px-1 rounded mx-0.5">*</span>x;
                    </code>
                    <div className="text-xs text-slate-600">
                        <span className="font-bold text-green-700">解引用运算符：</span><br/>
                        <span className="font-bold">动作</span>：去 x 指向的地址里<span className="font-bold">取值</span>。
                        <br/>(在代码执行逻辑中出现)
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-4">
             <div className="flex gap-4 items-start">
                 <div className="min-w-[150px] font-mono text-sm bg-white p-2 rounded border border-slate-300 text-slate-700 shadow-sm">
                     int t = *x;
                 </div>
                 <div className="text-sm text-slate-600">
                     <strong>第一步：备份 (Backup)</strong><br/>
                     "顺着网线(指针 x)爬过去"，找到变量 a，把它的值(10)抄一份存在临时变量 t 里。<br/>
                     <span className="text-xs text-slate-400 font-mono">Memory: a=10, b=50, t=10</span>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="min-w-[150px] font-mono text-sm bg-white p-2 rounded border border-slate-300 text-slate-700 shadow-sm">
                     *x = *y;
                 </div>
                 <div className="text-sm text-slate-600">
                     <strong>第二步：覆盖 (Overwrite)</strong><br/>
                     "顺着 y 找到 b(50)"，"顺着 x 找到 a"，把 b 的值填入 a 的位置。a 原来的 10 被覆盖了。<br/>
                     <span className="text-xs text-slate-400 font-mono">Memory: a=50, b=50, t=10</span>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <div className="min-w-[150px] font-mono text-sm bg-white p-2 rounded border border-slate-300 text-slate-700 shadow-sm">
                     *y = t;
                 </div>
                 <div className="text-sm text-slate-600">
                     <strong>第三步：回填 (Restore)</strong><br/>
                     把 t 里保存的旧值(10)，"顺着 y 填入 b 的位置"。交换完成。<br/>
                     <span className="text-xs text-slate-400 font-mono">Memory: a=50, b=10, t=10</span>
                 </div>
             </div>
        </div>
        <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 text-sm rounded border border-indigo-100 flex gap-2">
             <span className="text-lg">💡</span>
             <div>
                 <strong>为什么要用 * (解引用)？</strong><br/>
                 如果写 <code>x = y</code>，只是把 x 指针指向了 b，<strong>并没有改变 a 和 b 里面的数值</strong>。我们要改的是“指针指向的那个房间里的内容”，所以必须用 <code>*x</code> 和 <code>*y</code>。
             </div>
        </div>
    </div>
);

// New Helper: Swap Function Analysis (Exercise 1)
const SwapFunctionAnalysis = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const functions = [
        {
            id: 1,
            title: 'swap1 (值传递)',
            code: `void swap1(int a, int b) {
    int p;
    p=a; a=b; b=p;
}`,
            result: '❌ 失败',
            desc: '这是“值传递”。函数里的 a, b 只是外面变量的“复印件”，改了复印件，不影响原件。',
            status: 'error'
        },
        {
            id: 2,
            title: 'swap2 (指针传递)',
            code: `void swap2(int* a, int* b) {
    int p;
    p=*a; *a=*b; *b=p;
}`,
            result: '✅ 成功',
            desc: '正确！传入了地址，函数通过 *a 和 *b 直接修改了外面的内存。',
            status: 'success'
        },
        {
            id: 3,
            title: 'swap3 (引用传递)',
            code: `void swap3(int &a, int &b) {
    int p;
    p=a; a=b; b=p;
}`,
            result: '✅ 成功',
            desc: '正确！引用是别名，操作 a 和 b 就是操作外面的变量本身。',
            status: 'success'
        },
        {
            id: 4,
            title: 'swap4 (错误指针)',
            code: `void swap4(int* a, int* b) {
    int* p;
    *p=*a; *a=*b; *b=*p;
}`,
            result: '💥 崩溃',
            desc: '错误！定义了指针 p 但没初始化 (野指针)，直接 *p = ... 会导致程序崩溃。',
            status: 'error'
        }
    ];

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm my-6">
            <h4 className="font-bold text-slate-800 mb-4 text-lg">练习 1：以下哪几个函数能实现交换？</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {functions.map((func) => (
                    <div 
                        key={func.id}
                        onClick={() => setSelected(func.id)}
                        className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md
                            ${selected === func.id 
                                ? (func.status === 'success' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-red-500 bg-red-50 ring-1 ring-red-500')
                                : 'border-slate-200 hover:border-indigo-300'
                            }
                        `}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-sm text-slate-700">{func.title}</span>
                            {selected === func.id && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded
                                    ${func.status === 'success' ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}
                                `}>
                                    {func.result}
                                </span>
                            )}
                        </div>
                        <CodeBlock code={func.code} />
                        {selected === func.id && (
                             <div className={`mt-2 text-xs p-2 rounded animate-in fade-in slide-in-from-top-1
                                 ${func.status === 'success' ? 'text-emerald-800' : 'text-red-800'}
                             `}>
                                 {func.desc}
                             </div>
                        )}
                    </div>
                ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">点击代码块查看分析结果</p>
        </div>
    );
};

// New Helper: Dynamic Memory Visualization
const DynamicMemoryVisual = () => {
  const [step, setStep] = useState(0);
  const [heapVal, setHeapVal] = useState(10);

  const steps = [
      { 
          code: 'int* p;', 
          desc: '1. 在栈上定义指针 p。此时 p 未初始化，指向随机地址 (野指针)。',
          state: 'decl'
      },
      { 
          code: 'p = new int(10);', 
          desc: '2. 在堆区申请 4 字节，存入 10，并把首地址 (0x900) 返回给 p。',
          state: 'alloc'
      },
      { 
          code: '*p = 20;', 
          desc: '3. 通过 p 找到堆区的这块内存，把值修改为 20。',
          state: 'modify'
      },
      { 
          code: 'delete p;', 
          desc: '4. 归还这块堆内存。注意：p 里的地址没变！p 成了“悬空指针”。',
          state: 'delete'
      },
      { 
          code: 'p = nullptr;', 
          desc: '5. 为了安全，把 p 置空。现在 p 不指任何人，安全了。',
          state: 'null'
      }
  ];

  const handleNext = () => {
      if (step < 4) {
          setStep(step + 1);
          if (step + 1 === 1) setHeapVal(10);
          if (step + 1 === 2) setHeapVal(20);
      } else {
          setStep(0); // Reset
      }
  };

  const handleReset = () => {
      setStep(0);
      setHeapVal(10);
  };

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl my-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-800 text-lg">动态内存生命周期演示</h4>
          <div className="flex gap-2">
              <button 
                  onClick={handleReset}
                  className="px-3 py-2 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded hover:bg-slate-50 transition-colors"
              >
                  重置
              </button>
              <button 
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded hover:bg-indigo-700 transition-colors shadow-sm"
              >
                  {step === 4 ? '重新开始' : '下一步'}
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Code & Explanation */}
          <div className="flex flex-col gap-4">
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 shadow-inner">
                  {steps.map((s, i) => (
                      <div key={i} className={`transition-all duration-300 p-1 rounded
                          ${step === i ? 'bg-indigo-900/50 text-white font-bold border-l-2 border-indigo-400 pl-2' : 'opacity-50'}
                      `}>
                          {s.code}
                      </div>
                  ))}
              </div>
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-indigo-900 text-sm min-h-[80px] flex items-center">
                  {steps[step].desc}
              </div>
              
              {step === 3 && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-700 text-xs font-bold flex items-center gap-2 animate-bounce">
                      <span>⚠️ 危险：</span>
                      <span>p 还是 0x900，但那个房子已经退租了！千万别再访问 *p！</span>
                  </div>
              )}
          </div>

          {/* Right: Memory Visualization */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-8 justify-center relative min-h-[240px]">
              
              {/* Stack Region */}
              <div className="flex flex-col items-center z-10">
                  <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Stack (栈)</div>
                  <div className="bg-white border-2 border-slate-300 p-4 rounded-lg shadow-sm w-32 flex flex-col items-center gap-2 relative">
                      <div className={`w-24 h-10 border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-500
                          ${step === 0 ? 'bg-slate-100 text-slate-400 border-dashed border-slate-300' : ''}
                          ${step >= 1 && step <= 3 ? 'bg-indigo-50 text-indigo-700 border-indigo-500' : ''}
                          ${step === 4 ? 'bg-slate-100 text-slate-500 border-slate-300' : ''}
                      `}>
                          {step === 0 ? '???' : step === 4 ? 'nullptr' : '0x900'}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">int* p</div>

                      {/* Connection Line */}
                      <div className={`absolute top-1/2 left-full w-24 h-0.5 bg-indigo-400 transition-all duration-500 origin-left
                          ${step >= 1 && step <= 3 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                          ${step === 3 ? 'bg-red-400 border-t border-red-400 border-dashed' : ''}
                      `}></div>
                      <div className={`absolute top-1/2 left-[calc(100%+90px)] -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-indigo-400 border-y-[4px] border-y-transparent transition-all duration-500
                          ${step >= 1 && step <= 3 ? 'opacity-100' : 'opacity-0'}
                          ${step === 3 ? 'border-l-red-400' : ''}
                      `}></div>
                  </div>
              </div>

              {/* Heap Region */}
              <div className="flex flex-col items-center z-10 ml-16">
                   <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Heap (堆)</div>
                   <div className="border-2 border-slate-200 border-dashed rounded-lg p-4 w-40 h-40 flex items-center justify-center bg-slate-100/50 relative">
                       
                       {/* Allocated Block */}
                       <div className={`w-24 h-24 bg-white border-2 rounded-xl flex flex-col items-center justify-center shadow-sm transition-all duration-500 absolute
                           ${step === 0 ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                           ${step === 3 ? 'border-red-300 bg-red-50 grayscale opacity-50' : 'border-emerald-500 bg-emerald-50'}
                           ${step === 4 ? 'opacity-20 grayscale' : ''}
                       `}>
                           <div className={`text-xs font-mono px-1 rounded mb-1
                               ${step === 3 ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-600'}
                           `}>
                               {step >= 3 ? 'Freed' : '0x900'}
                           </div>
                           <div className={`text-2xl font-bold transition-all duration-300
                               ${step === 3 ? 'text-red-300 line-through' : 'text-emerald-800'}
                           `}>
                               {heapVal}
                           </div>
                       </div>

                       {/* Empty State Text */}
                       <div className="text-xs text-slate-300 font-bold uppercase tracking-widest pointer-events-none">
                           Free Space
                       </div>
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
};

// New Helper: Reference Visualization
const ReferenceVisual = () => (
    <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl my-6 flex justify-center">
        <div className="relative w-40 h-32 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center text-4xl font-bold text-slate-700 shadow-sm group hover:border-indigo-400 transition-colors">
            10
            {/* Variable a label */}
            <span className="absolute -top-3 left-4 bg-slate-100 border border-slate-300 text-slate-600 text-xs px-2 py-0.5 rounded font-mono">int a</span>
            
            {/* Reference r label - looks like a sticky note or tag */}
            <div className="absolute -right-6 -top-4 rotate-12 bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1.5 rounded shadow-md transform group-hover:scale-110 transition-transform origin-bottom-left z-10">
                <span className="text-xs font-bold block font-mono">int& r</span>
                <span className="text-[10px] opacity-75 leading-none">别名</span>
            </div>

            {/* Another reference maybe? */}
            <div className="absolute -left-6 -bottom-4 -rotate-6 bg-pink-100 border border-pink-300 text-pink-800 px-3 py-1.5 rounded shadow-md transform group-hover:scale-110 transition-transform origin-top-right z-10">
                <span className="text-xs font-bold block font-mono">int& r2</span>
            </div>
        </div>
    </div>
);

// New Helper: Memory Corridor Visualization
const MemoryCorridorVisual = () => {
    const [variables, setVariables] = useState<{name: string, type: string, size: number, address: number, value: string, color: string}[]>([]);
    const [highlightAddr, setHighlightAddr] = useState<number | null>(null);
    
    // Simulate memory addresses from 100 to 119
    const startAddr = 100;
    const endAddr = 120;
    const memoryCells = Array.from({ length: endAddr - startAddr }, (_, i) => startAddr + i);

    const handleDeclare = () => {
        if (variables.length > 0) return; // Already declared
        setVariables([
            { name: 'c', type: 'char', size: 1, address: 100, value: "'A'", color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
            { name: 'x', type: 'int', size: 4, address: 104, value: '10', color: 'bg-blue-100 border-blue-400 text-blue-800' },
            { name: 'd', type: 'double', size: 8, address: 112, value: '2.5', color: 'bg-purple-100 border-purple-400 text-purple-800' },
        ]);
        setHighlightAddr(null);
    };

    const handleReset = () => {
        setVariables([]);
        setHighlightAddr(null);
    };

    // Helper to check if an address is occupied by a variable
    const getOccupant = (addr: number) => {
        return variables.find(v => addr >= v.address && addr < v.address + v.size);
    };

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl my-6 overflow-hidden h-80 flex flex-col">
             <div className="flex justify-between items-center mb-6 shrink-0">
                 <h4 className="font-bold text-slate-700">内存长走廊 (Memory Corridor)</h4>
                 <div className="flex gap-2">
                     <button 
                        onClick={handleDeclare}
                        disabled={variables.length > 0}
                        className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${variables.length > 0 ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                     >
                        声明变量
                     </button>
                     <button 
                        onClick={handleReset}
                        disabled={variables.length === 0}
                        className="px-3 py-1.5 text-xs font-bold rounded bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
                     >
                        重置
                     </button>
                 </div>
             </div>

             {/* Legend */}
             <div className="flex gap-4 mb-4 text-xs shrink-0">
                 <div className="flex items-center gap-1">
                     <div className="w-3 h-3 bg-yellow-100 border border-yellow-400 rounded"></div>
                     <span>char (1字节)</span>
                 </div>
                 <div className="flex items-center gap-1">
                     <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded"></div>
                     <span>int (4字节)</span>
                 </div>
                 <div className="flex items-center gap-1">
                     <div className="w-3 h-3 bg-purple-100 border border-purple-400 rounded"></div>
                     <span>double (8字节)</span>
                 </div>
             </div>

             {/* & Operator Controls */}
             {variables.length > 0 && (
                <div className="flex gap-3 mb-4 items-center shrink-0 animate-in fade-in slide-in-from-top-2">
                    <span className="text-xs font-bold text-slate-500">取地址:</span>
                    {variables.map(v => (
                        <button
                            key={v.name}
                            onClick={() => setHighlightAddr(v.address)}
                            className={`px-2 py-1 text-xs font-mono rounded border transition-all active:scale-95
                                ${highlightAddr === v.address 
                                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-bold ring-2 ring-indigo-200' 
                                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            &{v.name}
                        </button>
                    ))}
                    {highlightAddr !== null && (
                         <span className="text-xs font-mono font-bold text-indigo-600 ml-2 animate-in fade-in">
                             → {highlightAddr}
                         </span>
                    )}
                </div>
             )}

             {/* Corridor */}
             <div className="overflow-x-auto h-32 flex items-center scrollbar-hide shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 <style>{`
                     .scrollbar-hide::-webkit-scrollbar {
                         display: none;
                     }
                 `}</style>
                 <div className="flex gap-0.5 min-w-max px-2">
                     {memoryCells.map((addr) => {
                         const occupant = getOccupant(addr);
                         const isStart = occupant && occupant.address === addr;
                         const isOccupied = !!occupant;
                         const isHighlighted = highlightAddr === addr;

                         return (
                             <div key={addr} className="relative flex flex-col items-center group">
                                 {/* Address Label */}
                                 <span className={`text-[10px] font-mono mb-1 select-none transition-colors duration-300
                                     ${isHighlighted ? 'text-indigo-600 font-bold scale-110' : 'text-slate-400'}
                                 `}>{addr}</span>
                                 
                                 {/* Box */}
                                 <div className={`w-10 h-12 border flex items-center justify-center transition-all duration-500 relative
                                     ${isOccupied 
                                         ? `${occupant.color} ${isStart ? 'border-l-2' : 'border-l-0'} border-y-2 border-r-0 last:border-r-2` 
                                         : 'bg-white border-slate-200'
                                     }
                                     ${isHighlighted ? 'ring-2 ring-indigo-500 ring-offset-2 z-10' : ''}
                                 `}>
                                     {isStart && (
                                         <span className="text-xs font-bold animate-in zoom-in">{occupant.value}</span>
                                     )}
                                     
                                     {/* Highlight Tooltip */}
                                     {isHighlighted && (
                                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 animate-pulse pointer-events-none"></div>
                                     )}
                                 </div>

                                 {/* Variable Name Label (Only at start) */}
                                 {isStart && (
                                     <div className={`absolute top-full mt-1 text-xs font-bold bg-white px-1 rounded shadow-sm border z-10 whitespace-nowrap transition-colors
                                         ${isHighlighted ? 'text-indigo-700 border-indigo-200 bg-indigo-50' : 'text-slate-700 border-slate-200'}
                                     `}>
                                         {occupant.type} {occupant.name}
                                     </div>
                                 )}
                             </div>
                         );
                     })}
                 </div>
             </div>
             <p className="text-xs text-slate-500 mt-auto text-center">
                 每个格子代表 1 个字节 (Byte)。使用 <span className="font-mono bg-slate-100 px-1 rounded">&</span> 按钮查看变量的首地址。
             </p>
        </div>
    );
};

// New Helper: Type Cast Visualization
const TypeCastVisual = () => {
    const [endian, setEndian] = useState<'little' | 'big'>('little');
    const bytes = endian === 'little' 
        ? ['78', '56', '34', '12'] 
        : ['12', '34', '56', '78'];
    
    const result = endian === 'little' ? '0x78 (120)' : '0x12 (18)';

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl my-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-800 text-lg">强转后的内存视图</h4>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">模式：</span>
                    <button 
                        onClick={() => setEndian('little')}
                        className={`px-3 py-1 rounded border transition-colors ${endian === 'little' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        小端 (Little Endian)
                    </button>
                    <button 
                        onClick={() => setEndian('big')}
                        className={`px-3 py-1 rounded border transition-colors ${endian === 'big' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        大端 (Big Endian)
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8">
                {/* Memory Grid */}
                <div className="relative">
                    {/* Top Label: int x */}
                    <div className="absolute -top-8 left-0 w-full text-center border-b-2 border-indigo-300 pb-1">
                        <span className="font-mono font-bold text-indigo-700 text-sm">int x = 0x12345678 (4字节)</span>
                    </div>

                    <div className="flex border-2 border-slate-400 rounded-lg overflow-hidden mt-2">
                        {bytes.map((byte, i) => (
                            <div key={i} className={`w-16 h-16 flex items-center justify-center font-mono text-lg font-bold border-r border-slate-300 last:border-r-0 relative
                                ${i === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-50 text-slate-400'}
                            `}>
                                {byte}
                                <span className="absolute bottom-1 left-1 text-[9px] text-slate-400 font-normal">0x{100 + i}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Label: char* q */}
                    <div className="absolute -bottom-10 left-0 w-16 flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-amber-500"></div>
                        <div className="bg-amber-100 border border-amber-300 text-amber-800 text-xs px-2 py-0.5 rounded font-mono font-bold whitespace-nowrap">
                            char* q
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 w-full max-w-md">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3">
                         <span className="text-sm font-bold text-slate-600">读取操作 (*q)</span>
                         <span className="font-mono text-sm text-slate-500">只读第 1 个字节</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">结果 (int y)：</span>
                        <span className="font-mono font-bold text-xl text-indigo-600">{result}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 text-right">
                        {endian === 'little' ? '大多数个人电脑 (Intel/AMD) 都是小端' : '某些网络协议或旧设备是大端'}
                    </div>
                </div>
            </div>
        </div>
    );
};

// New Helper: Rvalue Reference Visualization
const RvalueVisual = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="bg-white p-6 border border-slate-200 rounded-xl my-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6 text-lg">普通赋值 vs 右值引用</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Case 1: Normal Assignment */}
                <div className="flex flex-col items-center">
                    <h5 className="font-bold text-slate-600 mb-4 text-sm">普通赋值 (int ra = a + 1)</h5>
                    <div className="relative h-48 w-full flex flex-col items-center justify-center">
                        {/* Temp Object */}
                        <div className={`absolute top-0 w-24 h-16 bg-slate-100 border-2 border-slate-300 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-500 transition-all duration-700
                            ${step >= 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
                        `}>
                            <span className="text-xs">临时对象</span>
                            <span className="font-bold text-lg">11</span>
                        </div>

                        {/* Copy Animation */}
                        <div className={`absolute top-16 text-xs text-slate-400 font-bold transition-all duration-500 ${step === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            ⬇️ 复制 (Copy)
                        </div>

                        {/* Variable ra */}
                        <div className="absolute bottom-0 w-24 h-16 bg-white border-2 border-slate-400 rounded-lg flex flex-col items-center justify-center text-slate-700 shadow-sm">
                            <span className="text-xs">int ra</span>
                            <span className={`font-bold text-lg transition-all duration-500 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>11</span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 text-center">
                        需要先生成临时对象，复制值，再销毁临时对象。
                    </p>
                </div>

                {/* Case 2: Rvalue Reference */}
                <div className="flex flex-col items-center">
                    <h5 className="font-bold text-indigo-600 mb-4 text-sm">右值引用 (int &&ra = a + 1)</h5>
                    <div className="relative h-48 w-full flex flex-col items-center justify-center">
                        {/* Temp Object / ra */}
                        <div className={`absolute w-24 h-16 bg-indigo-50 border-2 border-indigo-500 rounded-lg flex flex-col items-center justify-center text-indigo-700 shadow-sm transition-all duration-700 top-1/2 -translate-y-1/2`}>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs transition-all duration-500 ${step === 1 ? 'line-through text-slate-400 opacity-50' : ''}`}>临时对象</span>
                                {step === 1 && <span className="text-xs font-bold bg-indigo-100 px-1 rounded animate-in zoom-in">ra</span>}
                            </div>
                            <span className="font-bold text-lg">11</span>
                        </div>
                        
                        {/* Binding Animation */}
                        <div className={`absolute -right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-500 bg-white px-2 py-1 rounded border border-indigo-200 shadow-sm transition-all duration-500
                            ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                        `}>
                            直接绑定!
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-indigo-600 text-center font-bold">
                        ra 直接“接管”了临时对象的地址，没有复制，也没有立即销毁。
                    </p>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button 
                    onClick={() => setStep(s => s === 0 ? 1 : 0)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold text-sm shadow-sm"
                >
                    {step === 0 ? '执行赋值' : '重置'}
                </button>
            </div>
        </div>
    );
};

export const pointersSections: Section[] = [
  // 1. 变量的地址与内存
  {
    id: 'ptr-basics-1',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '1. 变量的地址与内存',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-4">1.1 先把画面立起来</h3>
           <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
               <p className="text-lg text-indigo-900 leading-relaxed">
                   把内存想成一条<strong>长走廊</strong>，走廊上是一格一格的<strong>柜子</strong>。<br/>
                   每格柜子都有自己的<strong>编号（地址）</strong>。一个柜子装 1 字节。<br/>
                   你声明一个变量，相当于在走廊里“占了一段连续柜子”。<br/>
                   <span className="font-bold bg-white px-2 py-1 rounded text-indigo-700 mt-2 inline-block">变量的地址 = 这段柜子的第一个编号。</span>
               </p>
               <div className="mt-4 flex items-center gap-2 text-sm text-indigo-800 bg-indigo-100/50 p-3 rounded-lg border border-indigo-200">
                   <span className="font-bold bg-indigo-200 px-1.5 py-0.5 rounded text-indigo-700">&</span>
                   <span>取地址运算符：用来获取变量的地址（门牌号）。</span>
               </div>
           </div>
           
           <MemoryCorridorVisual />
        </div>
        
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-4">1.2 代码：看看“占了几格”和“从哪一格开始”</h3>
           <CodeBlock code={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    double d = 2.5;

    cout << "x: sizeof=" << sizeof(x) << " addr=" << &x << "\\n";
    cout << "d: sizeof=" << sizeof(d) << " addr=" << &d << "\\n";
    return 0;
}`} />

           <div className="mt-8 space-y-6">
                <QuizCard 
                    title="小练习 1.1：基础概念" 
                    question={`1. 变量的地址通常指的是：
A. 最后一个字节的地址
B. 第一个字节的地址
C. 变量的值

2. \`sizeof(char)\` 一定是多少？
A. 1
B. 2
C. 4

3. 取地址运算符是？
4. \`sizeof(x)\` 的单位是？`}
                    answer={`1. **B** (第一个字节的地址)
2. **A** (标准规定 char 为 1 字节)
3. **&**
4. **字节 (byte)**`}
                />

                <QuizCard 
                    title="小练习 1.2：避坑判断" 
                    question={`判断对错：
1. 同一个变量在同一次运行中，它的地址通常不变。
2. \`cout << &c\` (c 是 char) 一定会打印出一个地址。`}
                    answer={`1. **正确** (通常不变)
2. **错误** (可能会被当成字符串打印，需转 \`(void*)\`)`}
                />

                <QuizCard 
                    title="编程挑战：观察地址" 
                    question={`定义 \`char c\`, \`int x\`, \`double d\` 各一个，打印它们的地址与 sizeof，观察地址之间的差值。`}
                    answer={`\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    int x = 10;
    double d = 2.5;

    // 注意 &c 需要强转 void* 否则会乱码
    cout << "c: sizeof=" << sizeof(c) << " addr=" << (void*)&c << endl;
    cout << "x: sizeof=" << sizeof(x) << " addr=" << &x << endl;
    cout << "d: sizeof=" << sizeof(d) << " addr=" << &d << endl;
    return 0;
}
\`\`\`
`}
                />
           </div>
        </div>
      </div>
    )
  },


  // 2. 指针变量的定义与使用
  {
    id: 'ptr-basics-2',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '2. 指针变量的定义与使用',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">2.1 先把画面立起来</h3>
            <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-6">
                <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                    变量的地址用<strong>指针</strong>保存。指针也是一种变量，和 <code>int</code>、<code>char</code> 等变量一样存放在内存中。<br/>
                    为区别指针与普通变量，我们称之为<strong>指针</strong>或<strong>指针变量</strong>。<br/>
                    指针可以理解成<strong>“地址标签”</strong>：它不装数据本体，它装的是<strong>数据在哪</strong>。
                </p>
                <div className="flex items-center gap-4 text-sm bg-slate-50 p-4 rounded">
                    <code className="bg-white border px-2 py-1 rounded font-bold text-indigo-600">int* p</code>
                    <span>这张标签上写的是“某个 int 住在哪里”。</span>
                </div>
            </div>
            <PointerDefinitionVisual />
        </div>

        <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">2.2 代码：标签写上地址，再按地址去取值</h3>
            <CodeBlock code={`int a = 123;
int* p = &a;  // &a: 取变量 a 的地址

cout << "p=" << p << "\\n";     // 地址标签上的内容 (如 0x7ffee4...)
cout << "*p=" << *p << "\\n";   // *p: 去地址处把值拿出来 (123)`} />
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
             <h4 className="font-bold text-red-800 text-sm mb-2">🚨 避坑指南</h4>
             <p className="text-sm text-red-700 mb-2">
                 <code>int* p, q;</code> 这种写法，只有 <code>p</code> 是指针，<code>q</code> 是普通 int！<br/>
                 <strong>建议：</strong> 永远拆开写。
             </p>
             <p className="text-sm text-red-700">
                 指针类型要对上：别把 <code>double</code> 的地址给 <code>int*</code>，强转更是埋雷。
             </p>
        </div>

        <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">2.3 const 修饰指针：谁被锁了？</h3>
            <p className="text-slate-600 mb-4">
                <code>const</code> 和 <code>*</code> 的位置决定了它是“只读指针”还是“指针常量”。<br/>
                口诀：<strong>“左定值，右定向”</strong>（const 在 * 左边锁定值，在 * 右边锁定指向）。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                    <h4 className="font-bold text-indigo-800 mb-2">1. 指向常量的指针 (Pointer to Const)</h4>
                    <CodeBlock code={`const int* p = &a; 
// 或 int const* p = &a;`} />
                    <ul className="list-disc list-inside text-sm text-indigo-700 mt-2 space-y-1">
                        <li><strong>限制：</strong> 不能通过 <code>*p</code> 修改值 (<code>*p = 10</code> ❌)。</li>
                        <li><strong>自由：</strong> <code>p</code> 可以指向别人 (<code>p = &b</code> ✅)。</li>
                        <li><strong>理解：</strong> “我只看不改”。</li>
                    </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-800 mb-2">2. 指针常量 (Const Pointer)</h4>
                    <CodeBlock code={`int* const p = &a;`} />
                    <ul className="list-disc list-inside text-sm text-amber-700 mt-2 space-y-1">
                        <li><strong>限制：</strong> <code>p</code> 不能指向别人 (<code>p = &b</code> ❌)。</li>
                        <li><strong>自由：</strong> 可以通过 <code>*p</code> 修改值 (<code>*p = 10</code> ✅)。</li>
                        <li><strong>理解：</strong> “我就认准你了”。</li>
                    </ul>
                </div>
            </div>
            <ConstPointerVisual />
        </div>

        <div className="mt-8 space-y-6">
            <QuizCard 
                title="小练习 2.1：指针定义" 
                question={`1. \`int* p;\` 的含义是：
A. p 是 int 变量
B. p 保存 int 的地址
C. p 保存 double 的地址

2. 哪个表达式是在“取值”（解引用）？
A. &a
B. *p
C. sizeof(p)`}
                answer={`1. **B** (p 保存 int 的地址)
2. **B** (*p)`}
            />

            <QuizCard 
                title="小练习 2.2：理解指针" 
                question={`1. 把 a 的地址交给 p，正确的写法是？
2. 指针变量的大小通常和什么更相关？(所指类型 / 平台位数)
3. 判断：\`double*\` 可以直接指向 \`int\` 的地址且完全没问题。`}
                answer={`1. \`p = &a;\`
2. **平台位数** (32位通常4字节，64位通常8字节)
3. **错误** (类型不匹配，解引用时会出错)`}
            />

            <QuizCard 
                title="编程挑战：指针大小" 
                question={`声明 \`int*\`, \`double*\`, \`char*\` 各一个，打印 sizeof，验证它们在当前环境下是否相同。`}
                answer={`\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int* p1;
    double* p2;
    char* p3;
    
    cout << sizeof(p1) << endl;
    cout << sizeof(p2) << endl;
    cout << sizeof(p3) << endl;
    // 通常在同一平台下它们的大小是相同的
    return 0;
}
\`\`\``}
            />
        </div>
      </div>
    )
  },


  // 3. 通过指针修改值与空指针
  {
    id: 'ptr-basics-3',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '3. 通过指针修改值与空指针',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-4">3.1 修改值与判空</h3>
           <p className="text-slate-600 mb-4">
               <code>*p = 12</code> 就像：你拿着地址标签找到那个柜子，直接把柜子里的东西换成 12。
           </p>
           <NullPointerVisual />
           <CodeBlock code={`int x = 10;
int* p = &x;

*p = 12;  // 通过指针修改 x
cout << x; // 输出 12

int* q = nullptr; // 空指针
if (q != nullptr) {
    cout << *q;
} else {
    cout << "q is null"; // 安全
}`} />
        </div>

        <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">3.2 更多指针操作示例</h3>
            
            <div className="space-y-8">
               <PointerAssignmentVisual />
               <DoublePointerVisual />
               <PointerModificationVisual />
            </div>
         </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
            <h4 className="font-bold text-amber-800 mb-2">⚠️ 关键注意事项：未赋值指针与空指针</h4>
            <div className="space-y-3 text-sm text-amber-900">
                <p>
                    <strong>1. 不能对未赋值的指针使用 * 运算符：</strong><br/>
                    如果指针不指向任何数据（未初始化或为空），对其解引用是极其危险的。
                </p>
                <CodeBlock code={`// ❌ 错误用法：
int* p; 
*p = 10; // p 是野指针，不知道指哪去了，会导致崩溃或数据损坏

// ✅ 正确用法 1：指向现有变量
int a = 10; 
int* p; 
p = &a; 
*p = 11;

// ✅ 正确用法 2：指向动态分配的内存
int* p = new int(); 
*p = 10;`} />
                <p>
                    <strong>2. 空指针 (nullptr)：</strong><br/>
                    定义后未赋值的指针最好初始化为 <code>nullptr</code>。不能对空指针使用 <code>*</code> 运算符。
                </p>
            </div>
        </div>


        <div className="mt-8 space-y-6">
            <QuizCard 
                title="小练习 3.1：修改值与判空" 
                question={`1. \`*p = 12;\` 的意思是：
A. 改 p 的地址
B. 改 p 指向位置的值
C. 让 p 为空

2. 推荐表示空指针的是：
A. 0
B. NULL
C. nullptr`}
                answer={`1. **B** (改 p 指向位置的值)
2. **C** (nullptr)`}
            />

            <QuizCard 
                title="小练习 3.2：指针安全" 
                question={`1. 判断：未初始化指针如果“碰巧”指到有效地址，解引用就没问题。
2. “野指针/悬空指针”常见来源包括？
A. 未初始化
B. 指向已释放内存
C. 两者都有`}
                answer={`1. **错误** (这是未定义行为，必须初始化)
2. **C** (两者都有)`}
            />
        </div>
      </div>
    )
  },


  // 4. 指针作为函数参数
  {
    id: 'ptr-basics-4',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '4. 指针作为函数参数',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         <PassByValueVsPointerVisual />
         
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">4.1 核心原理</h3>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
                <li><strong>值传递：</strong> 像“给你一张复印件”；你在复印件上涂改，不影响原件。</li>
                <li><strong>地址传递：</strong> 像“把钥匙/门牌号给你”；你一改，改的是原来的那份。</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                <h4 className="font-bold text-blue-800 mb-2 text-sm">💡 关键点：同一个星号 (*)，两种用法</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <code className="bg-white px-2 py-1 rounded border border-blue-200 text-blue-700 font-bold">int* x</code>
                        <p className="mt-1 text-blue-900">
                            <strong>定义指针变量</strong><br/>
                            出现在类型名（如 <code>int</code>）后面。表示 x 是一个指针，用来存地址。
                        </p>
                    </div>
                    <div>
                        <code className="bg-white px-2 py-1 rounded border border-blue-200 text-blue-700 font-bold">*x = ...</code>
                        <p className="mt-1 text-blue-900">
                            <strong>解引用（取值）</strong><br/>
                            出现在变量名（如 <code>x</code>）前面。表示“顺藤摸瓜”，去那个地址找东西（读/写）。
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-8">
                <SwapVisual />
                <SwapCodeDetailedAnalysis />
                <SortVisual />
                <SwapFunctionAnalysis />
            </div>
         </div>

         <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
             <h4 className="font-bold text-amber-800 text-sm mb-2">💡 容易踩的坑</h4>
             <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                 <li><strong>忘了取地址：</strong> 把 <code>swap(a, b)</code> 写成值传递，函数里改不动外面。</li>
                 <li><strong>判空：</strong> 指针参数允不允许为 <code>nullptr</code>？要在接口里讲清楚，或者在使用前检查，不然容易崩溃。</li>
             </ul>
         </div>

         <div className="mt-8 space-y-6">
            <QuizCard 
                title="小练习 4.1：地址传递" 
                question={`1. \`mySwap(&a, &b)\` 传进去的是：
A. 值
B. 地址
C. 引用
D. 常量

2. \`void f(int* p)\` 中的 p 是：
A. 外部变量本体
B. 外部变量别名
C. 地址的一份拷贝（指向同一处）`}
                answer={`1. **B** (地址)
2. **C** (地址的一份拷贝)`}
            />

            <QuizCard 
                title="小练习 4.2：函数修改外部变量" 
                question={`1. 判断：用指针做参数，函数内部可以修改外部变量。
2. 判断：\`mySwap(nullptr, &b)\` 一定安全。`}
                answer={`1. **正确** (有了地址，就能进屋改东西)
2. **错误** (如果不判空，解引用 nullptr 会崩溃)`}
            />

            <QuizCard 
                title="编程挑战 1：自增函数" 
                question={`写 \`void inc(int* p)\`：如果不为空就让 \`*p\` 自增。`}
                answer={`\`\`\`cpp
void inc(int* p) {
    if (p) {
        (*p)++;
    }
}
\`\`\`
`}
            />

            <QuizCard 
                title="编程挑战 2：Clamp Min" 
                question={`写 \`void clampMin(int* p, int minVal)\`：把 \`*p\` 至少变成 \`minVal\`（例如 \`*p=5\`, \`minVal=10\`, 则 \`*p\` 变为 10）。记得判空。`}
                answer={`\`\`\`cpp
void clampMin(int* p, int minVal) {
    if (!p) return;
    if (*p < minVal) {
        *p = minVal;
    }
}
\`\`\`
`}
            />
         </div>
      </div>
    )
  },

  // 5. 动态内存 (new/delete)
  {
    id: 'ptr-basics-5',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '5. 动态内存 (new/delete)',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">5.1 为什么要自己管内存？</h3>
             <p className="text-slate-600 mb-6 leading-relaxed">
                 普通的变量（如 <code>int a = 10;</code>）都在<strong>栈 (Stack)</strong> 上，它们的命由系统定——出了作用域自动消失。<br/>
                 但有时我们需要<strong>堆 (Heap)</strong>：它的命由你定。你想什么时候申请就申请，想什么时候释放就释放，用来存那些“不知道要存多久”或“特别大”的数据。
             </p>
             
             <DynamicMemoryVisual />
             
             <div className="mt-8">
                <h4 className="font-bold text-slate-800 mb-4 text-lg">栈 (Stack) vs 堆 (Heap) 全方位对比</h4>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">特性</th>
                                <th className="px-6 py-3">栈 (Stack)</th>
                                <th className="px-6 py-3">堆 (Heap)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">管理方式</td>
                                <td className="px-6 py-4 text-emerald-600 font-bold">全自动 (系统管)</td>
                                <td className="px-6 py-4 text-indigo-600 font-bold">手动 (你管: new/delete)</td>
                            </tr>
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">空间大小</td>
                                <td className="px-6 py-4">较小 (MB级别)</td>
                                <td className="px-6 py-4">很大 (GB级别)</td>
                            </tr>
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">分配速度</td>
                                <td className="px-6 py-4 text-emerald-600">极快</td>
                                <td className="px-6 py-4 text-amber-600">较慢 (需要找空地)</td>
                            </tr>
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">生命周期</td>
                                <td className="px-6 py-4">函数结束/出作用域即销毁</td>
                                <td className="px-6 py-4">直到 delete 或程序结束</td>
                            </tr>
                            <tr className="bg-white hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-slate-700">常见问题</td>
                                <td className="px-6 py-4">栈溢出 (Stack Overflow)</td>
                                <td className="px-6 py-4">内存泄漏 (Memory Leak)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                 <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                     <span className="text-xl">👻</span> 悬空指针 (Dangling Pointer)
                 </h4>
                 <p className="text-sm text-red-700 leading-relaxed mb-2">
                     <code>delete p;</code> 之后，p 里的地址（门牌号）还在，但那个房子已经不归你了。
                 </p>
                 <div className="bg-white/50 p-2 rounded text-xs font-mono text-red-800 border border-red-200">
                     // 危险！<br/>
                     *p = 20; // 可能会改写别人的数据！
                 </div>
                 <p className="mt-2 text-xs font-bold text-red-600">
                     ✅ 解决：delete 后立刻 p = nullptr;
                 </p>
             </div>

             <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                 <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                     <span className="text-xl">�</span> 内存泄漏 (Memory Leak)
                 </h4>
                 <p className="text-sm text-amber-800 leading-relaxed mb-2">
                     只管 <code>new</code> 不管 <code>delete</code>。像借了书不还，久而久之图书馆（堆）就被借空了，程序崩溃。
                 </p>
                 <div className="bg-white/50 p-2 rounded text-xs font-mono text-amber-800 border border-amber-200">
                     while(true) &#123;<br/>
                     &nbsp;&nbsp;int* p = new int[1000];<br/>
                     &nbsp;&nbsp;// 没 delete!<br/>
                     &#125;
                 </div>
             </div>
         </div>

         <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
             <h4 className="font-bold text-indigo-800 text-sm mb-2">💡 现代 C++ 建议</h4>
             <p className="text-sm text-indigo-700">
                 手动管理 <code>new/delete</code> 很难，现代 C++ 推荐使用 <strong>智能指针</strong> (<code>std::unique_ptr</code>, <code>std::shared_ptr</code>) 或容器 (<code>std::vector</code>)，让 RAII 机制自动帮你管理内存。
             </p>
         </div>

         <div className="mt-8 space-y-6">
                <QuizCard 
                    title="小练习 5.1：动态内存管理" 
                    question={`1. \`delete\` 应该用于：
A. 任意指针
B. 指向栈变量的指针
C. new 得到的指针或空指针

2. 忘记 \`delete\` 的结果通常是：
A. 编译失败
B. 内存泄漏
C. 自动回收`}
                    answer={`1. **C** (delete 只能释放 new 分配的内存，或者 delete nullptr)
2. **B** (内存泄漏)`}
                />

                <QuizCard 
                    title="小练习 5.2：new/delete 规则" 
                    question={`判断对错：
1. 同一个指针 delete 两次也没关系。
2. \`new\` 失败一定返回 \`nullptr\`。`}
                    answer={`1. **错误** (Double Free 是未定义行为，通常导致崩溃)
2. **错误** (标准 C++ 中 new 失败默认抛出异常)`}
                />

                <QuizCard 
                    title="编程挑战 1：单个 int 动态管理" 
                    question={`动态申请一个 int，读入值，输出其两倍，然后释放。`}
                    answer={`\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int* p = new int;
    cin >> *p;
    cout << (*p) * 2 << endl;
    delete p;
    return 0;
}
\`\`\``}
                />

                <QuizCard 
                    title="编程挑战 2：动态数组求和" 
                    question={`读入 n，动态申请 n 个 int 的数组，读入 n 个数并求和，最后释放。`}
                    answer={`\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n && n > 0) {
        int* arr = new int[n];
        long long sum = 0;
        for (int i = 0; i < n; ++i) {
            cin >> arr[i];
            sum += arr[i];
        }
        cout << sum << endl;
        delete[] arr; // 必须配对使用 delete[]
    }
    return 0;
}
\`\`\``}
                />
           </div>
      </div>
    )
  },


  // 6. 强制类型转换 (Cast)
  {
    id: 'ptr-basics-6',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '6. 强制类型转换 (Cast)',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">6.1 指针的本质是“看法”</h3>
             <p className="text-slate-600 mb-4">
                 内存里只有 0 和 1。<code>int*</code> 只是告诉编译器“我认为这里是 int”。<br/>
                 <strong>强制类型转换</strong>就是强行改变这种看法：就像把“衣服标签”硬贴在“鞋盒”上——可能暂时能用，但很容易出问题（如大小端、对齐问题）。
             </p>
             <CodeBlock code={`#include<iostream> 
using namespace std; 
int main() 
{ 
    int x = 0x12345678; 
    int *p = &x; 
    char* q = (char*)p; // 强行把 int* 转为 char*
    int y = *q;         // 此时 *q 只读 1 个字节
    cout << hex << y; 
    return 0; 
}`} />
         </div>

         <TypeCastVisual />

         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">6.2 为什么结果是 78 (或者 12)？</h3>
             <p className="text-slate-600 mb-4 leading-relaxed">
                 这取决于你的机器是<strong>小端 (Little Endian)</strong> 还是 <strong>大端 (Big Endian)</strong>。<br/>
                 我们常用的 PC (Intel/AMD) 都是小端模式：<strong>低位字节存低地址</strong>。<br/>
                 所以 <code>0x12345678</code> 在内存里是倒着存的：<code>78 56 34 12</code>。指针 <code>q</code> 指向第一个字节，所以读出来是 <code>78</code>。
             </p>
         </div>

         <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
             <h4 className="font-bold text-amber-800 text-sm mb-2">💡 容易踩的坑</h4>
             <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                 <li><strong>慎用强转：</strong> <code>(char*)</code> 这种 C 风格强转（或者 C++ 的 <code>reinterpret_cast</code>）是最危险的，不到万不得已不要用。</li>
                 <li><strong>移植性差：</strong> 代码在你的电脑上跑是 78，换台大端服务器可能就是 12，这种 bug 极难排查。</li>
             </ul>
         </div>

         <div className="mt-8 space-y-6">
                <QuizCard 
                    title="小练习 6.1：void* 的使用" 
                    question={`1. \`void* p\` 可以指向：
A. 只有 int
B. 只有 char
C. 任何类型
D. 只能为空

2. 对 \`void* p\` 解引用的正确方式是：
A. \`*p\`
B. \`(int)p\`
C. \`*(int*)p\` (假设指向 int)`}
                    answer={`1. **C** (万能指针)
2. **C** (必须先转为具体类型的指针)`}
                />

                <QuizCard 
                    title="小练习 6.2：强转风险" 
                    question={`判断对错：通过强转读“第一个字节”的结果在所有机器上都一样。`}
                    answer={`**错误** (受大小端影响)`}
                />
         </div>
      </div>
    )
  },

  // 7. 扩展：引用 (Reference)
  {
    id: 'ptr-basics-7',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '7. 扩展知识：引用',
    type: 'lesson',
    content: (
      <div className="space-y-12">
         {/* 7.1 左值引用 */}
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">7.1 左值引用 (Lvalue Reference)</h3>
             <p className="text-slate-600 mb-4">
                 左值引用 <code>&</code> 相当于给变量起了一个“外号”。
             </p>
             <ReferenceVisual />
             <CodeBlock code={`#include<iostream> 
using namespace std; 
int main() 
{ 
    int a = 3; 
    int &b = a; // 左值引用，a 和 b 相当于同一个变量 
    a = 4; 
    cout << b << endl;      // 4
    cout << &a << endl;     // 0x... (地址相同)
    cout << &b << endl;     // 0x... (地址相同)
    return 0; 
}`} />
             <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                 <h4 className="font-bold text-red-800 text-sm mb-2">❌ 错误写法</h4>
                 <p className="text-sm text-red-700 mb-2">
                     左值引用必须绑定到<strong>左值</strong>（有名字、有地址的变量），不能绑定到右值（临时结果）。
                 </p>
                 <CodeBlock code={`int a = 3; 
// int &b = a*a; // ❌ 错误！a*a 是右值(临时结果)`} />
             </div>
             <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                 <h4 className="font-bold text-emerald-800 text-sm mb-2">✅ 特例：const 引用</h4>
                 <p className="text-sm text-emerald-700 mb-2">
                     <code>const</code> 左值引用是个特例，它允许绑定到右值（会延长临时对象的生命周期）。
                 </p>
                 <CodeBlock code={`int a = 3; 
const int &b = a*a; // ✅ 允许
// b = 9, 且不管 a 以后怎么变，b 都是 9 (因为 b 绑定的是那个计算出来的临时结果)`} />
             </div>
         </div>

         {/* 7.2 右值引用 */}
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">7.2 右值引用 (Rvalue Reference)</h3>
             <p className="text-slate-600 mb-4">
                 C++11 引入了右值引用 <code>&&</code>，专门用来“接管”即将销毁的临时对象（右值）。
             </p>
             
             <RvalueVisual />

             <CodeBlock code={`#include <iostream> 
using namespace std; 
int main() 
{ 
    int a = 10; 
    int &&ra = a + 1; // 右值引用
    cout << ra;       // 11
    return 0; 
}`} />
             
             <div className="mt-6">
                 <h4 className="font-bold text-slate-800 mb-2">💡 为什么需要右值引用？</h4>
                 <p className="text-slate-600 text-sm leading-relaxed mb-4">
                     无论是 <code>int ra = a + 1;</code> 还是 <code>int &&ra = a + 1;</code>，计算 <code>a+1</code> 时都会产生一个<strong>临时对象</strong>。
                 </p>
                 <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg">
                     <li><strong>普通赋值：</strong> 需要把临时对象的值<strong>复制</strong>给变量，然后销毁临时对象。（多一次复制）</li>
                     <li><strong>右值引用：</strong> 直接把变量的地址<strong>绑定</strong>到这个临时对象的地址上。就像直接把临时对象的“房产证”过户给了变量，省去了搬家（复制）的过程。</li>
                 </ul>
             </div>

             <div className="mt-6">
                 <h4 className="font-bold text-slate-800 mb-2">示例：接管函数返回值</h4>
                 <CodeBlock code={`#include<iostream> 
using namespace std; 
int f(int n) 
{ 
    return 2 * n; 
} 
int main() 
{ 
    int &&a = f(4); // a 的地址直接变成了 f(4) 返回值临时对象的地址
    cout << a;      // 8 
    return 0; 
}`} />
             </div>
         </div>
      </div>
    )
  },

  // 8. 综合测试 (选择题)
  {
    id: 'ptr-basics-8-quiz',
    category: '指针 (Pointers)',
    group: '指针基础',
    title: '8. 综合自测 (选择题)',
    type: 'quiz',
    quizData: {
      title: '指针基础综合测试',
      description: '本测试共 30 道选择题，涵盖指针定义、运算、数组指针、引用、const 指针、动态内存等核心知识点。',
      questions: [
        // 1-5
        {
          id: 1,
          question: "以下哪几个函数能实现交换？\n```cpp\nvoid swap1(int a, int b) { int p=a; a=b; b=p; }\nvoid swap2(int* a, int* b) { int p=*a; *a=*b; *b=p; }\nvoid swap3(int &a, int &b) { int p=a; a=b; b=p; }\nvoid swap4(int* a, int* b) { int* p; *p=*a; *a=*b; *b=*p; }\n```",
          options: ["swap1, swap2", "swap2, swap3", "swap3, swap4", "swap1, swap4"],
          correctAnswer: 1,
          explanation: "swap1 是值传递；swap2 是指针传递；swap3 是引用传递；swap4 中 p 未初始化（野指针），会导致崩溃。"
        },
        {
          id: 2,
          question: "double a; 定义指针 p 指向 a，正确的是：",
          options: ["int p = &a;", "double p = &a;", "int* p = a;", "double* p = &a;"],
          correctAnswer: 3,
          explanation: "指针类型必须与指向的变量类型一致，且 p 必须是指针类型 (double*)。"
        },
        {
          id: 3,
          question: "p 指向 a，以下哪个表达式表示 a 的地址？",
          options: ["p", "&p", "a", "*p"],
          correctAnswer: 0,
          explanation: "p 存储的就是 a 的地址；&p 是指针自己的地址；a 是值；*p 是值。"
        },
        {
          id: 4,
          question: "int a; int* p; 则 &a 和 p 的数据类型分别是：",
          options: ["int*, int*", "int&, int*", "int*, int", "int&, int"],
          correctAnswer: 0,
          explanation: "&a 取地址得到指针类型 int*；p 定义为 int*。"
        },
        {
          id: 5,
          question: "32位系统，p 为 char*, q 为 int*，sizeof(p) 和 sizeof(q) 的值分别为：",
          options: ["1, 1", "1, 4", "4, 1", "4, 4"],
          correctAnswer: 3,
          explanation: "32位系统中，所有类型的指针大小都是 4 字节。"
        },
        // 6-10
        {
          id: 6,
          question: "32位系统，sizeof(int)=4。int* ip; char* cp; sizeof(ip) 和 sizeof(cp) 是？",
          options: ["1, 1", "4, 1", "4, 4", "8, 8"],
          correctAnswer: 2,
          explanation: "同上，指针大小只与系统位数有关，与指向的类型无关。"
        },
        {
          id: 7,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 2, *p = &a;\n(*p)++;\ncout << *p;\n```",
          options: ["2", "0", "地址值", "3"],
          correctAnswer: 3,
          explanation: "(*p)++ 先解引用得到 a (2)，然后自增，a 变为 3。"
        },
        {
          id: 8,
          question: "下列函数定义中，有语法错误的是？",
          options: ["int f(int x, int* y) { x *= *y; return x; }", "int f(int x, int* y) { *y *= *y; return x; }", "int f(int* x, int y) { *x += y; return *x; }", "以上都没有语法错误"],
          correctAnswer: 3,
          explanation: "前三个函数在语法上都是合法的 C++ 代码。"
        },
        {
          id: 9,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 5;\nint *p = &a;\nint **pp = &p;\n**pp = 10;\ncout << a;\n```",
          options: ["5", "10", "地址值", "编译错误"],
          correctAnswer: 1,
          explanation: "**pp 等价于 *(*pp) 即 *p 即 a。所以 a 被修改为 10。"
        },

        // 11-15
        {
          id: 11,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 10, b = 20;\nint *p = &a;\n*p = 30;\np = &b;\n*p = 40;\ncout << a << \" \" << b;\n```",
          options: ["10 20", "30 20", "30 40", "40 30"],
          correctAnswer: 2,
          explanation: "先通过 p 把 a 改为 30；然后 p 指向 b，把 b 改为 40。"
        },
        {
          id: 12,
          question: "关于 NULL 和 nullptr，下列说法正确的是：",
          options: ["NULL 和 nullptr 完全相同", "nullptr 是 C++11 引入的类型安全空指针", "NULL 只能用于指针，不能用于整数", "nullptr 可以隐式转换为 int 类型"],
          correctAnswer: 1,
          explanation: "nullptr 是为了解决 NULL 本质是 0 (整数) 带来的重载歧义问题。"
        },

        {
          id: 14,
          question: "关于引用，下列说法**错误**的是：",
          options: ["引用必须在定义时初始化", "引用一旦绑定就不能改变绑定的对象", "可以定义指向引用的指针 (int& *)", "引用本身不是对象，不占独立内存地址"],
          correctAnswer: 2,
          explanation: "C++ 不允许定义“指向引用的指针”。(但可以有“指针的引用”)。"
        },
        {
          id: 15,
          question: "执行以下代码后输出什么？\n```cpp\nint x = 5;\nint &r = x;\nr = 10;\nint y = 20;\nr = y;\ncout << x << \" \" << y;\n```",
          options: ["5 20", "10 20", "20 20", "10 10"],
          correctAnswer: 2,
          explanation: "r 始终绑定 x。r=10 使 x=10。r=y 是赋值操作，使 x=20。y 保持 20。"
        },
        // 16-20
        {
          id: 16,
          question: "`const int* const p;` 表示：",
          options: ["p 是常量指针 (指向不变)", "p 指向的内容不可通过 p 修改", "p 的指向和 p 指向的内容都不可修改", "以上都不对"],
          correctAnswer: 2,
          explanation: "第一个 const 修饰 int (内容不可改)，第二个 const 修饰 p (指向不可改)。"
        },

        {
          id: 18,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 5;\nint *p = &a;\nint *q = p;\n*q = 20;\ncout << a;\n```",
          options: ["5", "20", "地址值", "不确定"],
          correctAnswer: 1,
          explanation: "q 和 p 都指向 a。通过 *q 修改 a 为 20。"
        },

        {
          id: 20,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 10;\nint &ref = a;\nint *p = &ref;\n*p = 20;\ncout << a << \" \" << ref;\n```",
          options: ["10 10", "10 20", "20 20", "编译错误"],
          correctAnswer: 2,
          explanation: "&ref 取得的是 a 的地址。p 指向 a。*p=20 修改 a。ref 是 a 的别名，也输出 20。"
        },
        // 21-25

        {
          id: 22,
          question: "关于指针运算，下列说法**错误**的是：",
          options: ["两个指针可以相减 (同类型)", "指针可以加上一个整数", "两个指针可以相加", "指针可以进行关系运算 (比较大小)"],
          correctAnswer: 2,
          explanation: "指针相加 (地址+地址) 没有意义，是非法的。"
        },

        {
          id: 24,
          question: "关于函数参数中的 `const 引用` (const T&)，下列说法正确的是：",
          options: ["可以绑定到临时对象 (右值)", "可以通过引用修改传入的实参", "不能绑定到非 const 对象", "效率总是低于值传递"],
          correctAnswer: 0,
          explanation: "const 引用是“万能引用”的一种，既接左值也接右值 (临时对象)，且避免拷贝，效率高。"
        },
        {
          id: 25,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 5;\nconst int *p = &a;\na = 10;\ncout << *p;\n```",
          options: ["5", "10", "编译错误", "不确定"],
          correctAnswer: 1,
          explanation: "p 是底层 const (指向常量的指针)，不能通过 p 改 a。但 a 本身不是 const，可以直接改。a 变 10 后，*p 读出来也是 10。"
        },
        // 26-30



        {
          id: 29,
          question: "执行以下代码后输出什么？\n```cpp\nint a = 10, b = 20;\nint *p = &a, *q = &b;\n*p = *p + *q;\ncout << a << \" \" << b;\n```",
          options: ["10 20", "30 20", "30 30", "10 30"],
          correctAnswer: 1,
          explanation: "*p = 10 + 20 = 30。a 变为 30。b 没变 (20)。"
        },
        {
          id: 30,
          question: "关于野指针，下列说法正确的是：",
          options: ["野指针是指向 NULL 的指针", "野指针是未初始化或指向已释放内存的指针", "野指针可以安全使用", "所有指针默认都是野指针"],
          correctAnswer: 1,
          explanation: "野指针指向未知的、非法的内存，非常危险。"
        }
      ]
    }
  }
];
