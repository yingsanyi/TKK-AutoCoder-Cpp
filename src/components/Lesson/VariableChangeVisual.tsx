import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight } from 'lucide-react';

export const VariableChangeVisual = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulation state
  const maxSteps = 16; // Total steps in the simulation
  
  // Helper to calculate state based on step
  const getState = (s: number) => {
    // 0: Initial state
    if (s === 0) return { line: 1, i: '?', sum: 0, desc: '初始化 sum = 0' };
    
    // Loop iterations
    // i runs 1 to 5.
    // Each iteration has 3 steps: 
    // 1. Check condition (line 2)
    // 2. Execute body (line 3)
    // 3. Increment (line 2 update)
    
    // Sequence:
    // Step 1: line 2 (init i=1, check 1<=5) -> true
    // Step 2: line 3 (sum += i) -> sum=1
    // Step 3: line 2 (i++, i=2)
    
    // Step 4: line 2 (check 2<=5) -> true
    // Step 5: line 3 (sum += i) -> sum=3
    // Step 6: line 2 (i++, i=3)
    
    // ...
    // i=5
    // Step 13: line 2 (check 5<=5) -> true
    // Step 14: line 3 (sum += i) -> sum=15
    // Step 15: line 2 (i++, i=6)
    
    // End
    // Step 16: line 2 (check 6<=5) -> false, exit
    
    if (s === 1) return { line: 2, i: 1, sum: 0, desc: '初始化 i=1，判断 1<=5 (成立)' };
    if (s === 2) return { line: 3, i: 1, sum: 1, desc: 'sum = sum + 1' };
    if (s === 3) return { line: 2, i: 2, sum: 1, desc: 'i++ (变为2)' };
    
    if (s === 4) return { line: 2, i: 2, sum: 1, desc: '判断 2<=5 (成立)' };
    if (s === 5) return { line: 3, i: 2, sum: 3, desc: 'sum = sum + 2' };
    if (s === 6) return { line: 2, i: 3, sum: 3, desc: 'i++ (变为3)' };
    
    if (s === 7) return { line: 2, i: 3, sum: 3, desc: '判断 3<=5 (成立)' };
    if (s === 8) return { line: 3, i: 3, sum: 6, desc: 'sum = sum + 3' };
    if (s === 9) return { line: 2, i: 4, sum: 6, desc: 'i++ (变为4)' };
    
    if (s === 10) return { line: 2, i: 4, sum: 6, desc: '判断 4<=5 (成立)' };
    if (s === 11) return { line: 3, i: 4, sum: 10, desc: 'sum = sum + 4' };
    if (s === 12) return { line: 2, i: 5, sum: 10, desc: 'i++ (变为5)' };
    
    if (s === 13) return { line: 2, i: 5, sum: 10, desc: '判断 5<=5 (成立)' };
    if (s === 14) return { line: 3, i: 5, sum: 15, desc: 'sum = sum + 5' };
    if (s === 15) return { line: 2, i: 6, sum: 15, desc: 'i++ (变为6)' };
    
    if (s === 16) return { line: 2, i: 6, sum: 15, desc: '判断 6<=5 (不成立) -> 退出循环' };
    
    return { line: 4, i: 6, sum: 15, desc: '循环结束' };
  };

  const currentState = getState(step);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm my-6">
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 border-b border-indigo-100 dark:border-indigo-800 flex justify-between items-center">
        <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
          <RotateCcw size={18} /> 变量变化观察窗
        </h4>
        <div className="flex gap-2">
           <button 
             onClick={() => { setStep(0); setIsPlaying(false); }}
             className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 transition-colors"
             title="重置"
           >
             <RotateCcw size={16} />
           </button>
           <button 
             onClick={() => {
                if (step >= maxSteps) setStep(0);
                setIsPlaying(!isPlaying);
             }}
             className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
           >
             {isPlaying ? '暂停' : step >= maxSteps ? '重放' : '自动播放'}
           </button>
           <button 
             onClick={() => setStep(s => Math.min(s + 1, maxSteps))}
             disabled={isPlaying || step >= maxSteps}
             className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 disabled:opacity-50"
           >
             单步 <ChevronRight size={14} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Code View */}
        <div className="p-4 bg-[#1e1e1e] font-mono text-sm overflow-x-auto">
           <div className={`px-2 py-1 rounded transition-colors ${currentState.line === 1 ? 'bg-indigo-500/30 text-white' : 'text-slate-400'}`}>
             <span className="text-slate-500 mr-4">1</span>int sum = 0;
           </div>
           <div className={`px-2 py-1 rounded transition-colors ${currentState.line === 2 ? 'bg-indigo-500/30 text-white' : 'text-slate-400'}`}>
             <span className="text-slate-500 mr-4">2</span>for (int i = 1; i &lt;= 5; i++) {'{'}
           </div>
           <div className={`px-2 py-1 rounded transition-colors ${currentState.line === 3 ? 'bg-indigo-500/30 text-white' : 'text-slate-400'}`}>
             <span className="text-slate-500 mr-4">3</span>    sum += i;
           </div>
           <div className={`px-2 py-1 rounded transition-colors ${currentState.line === 4 ? 'bg-indigo-500/30 text-white' : 'text-slate-400'}`}>
             <span className="text-slate-500 mr-4">4</span>{'}'}
           </div>
        </div>

        {/* State View */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col justify-center gap-6">
           <div className="flex justify-around items-end">
              {/* Variable i */}
              <div className="flex flex-col items-center gap-2">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Variable i</div>
                 <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 shadow-sm transition-all scale-100 duration-300">
                    {currentState.i}
                 </div>
              </div>

              {/* Variable sum */}
              <div className="flex flex-col items-center gap-2">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Variable sum</div>
                 <div className="w-20 h-20 bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl flex items-center justify-center text-3xl font-bold text-emerald-600 dark:text-emerald-400 shadow-sm transition-all scale-100 duration-300">
                    {currentState.sum}
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
              <span className="text-xs text-slate-400 block mb-1">当前操作</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                 {currentState.desc}
              </span>
           </div>
           
           <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${(step / maxSteps) * 100}%` }}
              />
           </div>
        </div>
      </div>
    </div>
  );
};
