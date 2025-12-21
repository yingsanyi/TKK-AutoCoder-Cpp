import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { SectionHeader } from '../../components/Lesson/SectionHeader';
import { KnowledgeCard } from '../../components/Lesson/KnowledgeCard';
import { QuizCard } from '../../components/Lesson/QuizCard';
import { LoopTraceVisual } from '../../components/Lesson/LoopTraceVisual';
import { 
  GitBranch, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Scale,
  ListOrdered,
  FunctionSquare
} from 'lucide-react';

// --- Visual Components ---

const AndIcon = () => <span className="font-mono font-bold text-lg">&amp;&amp;</span>;
const OrIcon = () => <span className="font-mono font-bold text-lg">||</span>;
const NotIcon = () => <span className="font-mono font-bold text-lg">!</span>;

const ComparisonVisual = () => {
    const [a, setA] = React.useState(10);
    const [b, setB] = React.useState(20);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-6">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Scale size={18} /> 实时比较器
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                    <label className="text-xs text-slate-500 mb-1">变量 a</label>
                    <input 
                        type="number" 
                        value={a}
                        onChange={(e) => setA(Number(e.target.value))}
                        className="w-20 p-2 text-center rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono font-bold"
                    />
                </div>
                <div className="text-slate-400 font-bold">VS</div>
                <div className="flex flex-col items-center">
                    <label className="text-xs text-slate-500 mb-1">变量 b</label>
                    <input 
                        type="number" 
                        value={b}
                        onChange={(e) => setB(Number(e.target.value))}
                        className="w-20 p-2 text-center rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-mono font-bold"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                {[
                    { op: '>', label: '大于', res: a > b },
                    { op: '<', label: '小于', res: a < b },
                    { op: '==', label: '等于', res: a === b },
                    { op: '!=', label: '不等于', res: a !== b },
                    { op: '>=', label: '大于等于', res: a >= b },
                    { op: '<=', label: '小于等于', res: a <= b },
                ].map((item, idx) => (
                    <div key={idx} className={`
                        flex items-center justify-between p-3 rounded border
                        ${item.res 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' 
                            : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'}
                    `}>
                        <span className="font-mono font-bold">{item.op}</span>
                        <span className="text-xs opacity-80">{item.label}</span>
                        <span className="font-bold text-sm">{item.res ? 'true' : 'false'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LogicGateVisual = () => {
    const [s1, setS1] = React.useState(false);
    const [s2, setS2] = React.useState(false);
    const [mode, setMode] = React.useState<'AND' | 'OR' | 'NOT'>('AND');

    const result = mode === 'AND' ? (s1 && s2) 
                 : mode === 'OR' ? (s1 || s2) 
                 : !s1;

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-6">
             <div className="flex gap-2 mb-6 justify-center">
                {(['AND', 'OR', 'NOT'] as const).map(m => (
                    <button
                        key={m}
                        onClick={() => { setMode(m); setS1(false); setS2(false); }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                            mode === m 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300'
                        }`}
                    >
                        {m === 'AND' && '&& (与)'}
                        {m === 'OR' && '|| (或)'}
                        {m === 'NOT' && '! (非)'}
                    </button>
                ))}
             </div>

             <div className="flex items-center justify-center gap-8">
                 {/* Inputs */}
                 <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => setS1(!s1)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                            s1 ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-slate-100 border-slate-300 text-slate-400'
                        }`}
                    >
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${s1 ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${s1 ? 'left-4.5' : 'left-0.5'}`} style={{ left: s1 ? '18px' : '2px' }} />
                        </div>
                        <span className="text-xs font-bold">{mode === 'NOT' ? '输入' : '开关 A'}</span>
                    </button>

                    {mode !== 'NOT' && (
                        <button 
                            onClick={() => setS2(!s2)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                s2 ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-slate-100 border-slate-300 text-slate-400'
                            }`}
                        >
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${s2 ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${s2 ? 'left-4.5' : 'left-0.5'}`} style={{ left: s2 ? '18px' : '2px' }} />
                            </div>
                            <span className="text-xs font-bold">开关 B</span>
                        </button>
                    )}
                 </div>

                 {/* Operator Visual */}
                 <div className="flex flex-col items-center">
                     <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full border-2 border-indigo-200 flex items-center justify-center text-xl font-bold text-indigo-600 shadow-sm">
                        {mode === 'AND' && '&&'}
                        {mode === 'OR' && '||'}
                        {mode === 'NOT' && '!'}
                     </div>
                 </div>

                 {/* Output */}
                 <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        result 
                        ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] text-yellow-900 scale-110' 
                        : 'bg-slate-200 text-slate-400 grayscale'
                    }`}>
                        <Lightbulb size={24} fill={result ? "currentColor" : "none"} />
                    </div>
                    <span className="text-xs font-bold mt-2 text-slate-500">
                        {result ? '灯亮 (true)' : '灯灭 (false)'}
                    </span>
                 </div>
             </div>
             
             <p className="text-center text-xs text-slate-500 mt-6 bg-slate-100 dark:bg-slate-800 py-2 rounded">
                 {mode === 'AND' && '两个开关都打开，灯才会亮'}
                 {mode === 'OR' && '只要有一个开关打开，灯就会亮'}
                 {mode === 'NOT' && '开关打开灯灭，开关关闭灯亮'}
             </p>
        </div>
    );
};

const SelectionVisual = ({ type = 'if-else', labels = { true: '执行 A', false: '执行 B' } }) => {
  const [condition, setCondition] = React.useState(true);

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 w-full">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setCondition(true)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${condition ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          True (成立)
        </button>
        <button 
          onClick={() => setCondition(false)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${!condition ? 'bg-rose-500 text-white shadow-md scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          False (不成立)
        </button>
      </div>

      <div className="relative w-full max-w-[320px] h-48">
        {/* Start Line */}
        <div className="absolute top-1/2 left-0 w-16 h-1 bg-slate-300 -translate-y-1/2 rounded-full" />
        
        {/* Decision Diamond */}
        <div className={`absolute top-1/2 left-16 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 shadow-sm z-10 flex items-center justify-center transition-colors duration-300
            ${condition ? 'bg-emerald-100 border-emerald-400' : 'bg-rose-100 border-rose-400'}
        `}>
            <span className="-rotate-45 text-sm font-bold text-slate-700">?</span>
        </div>

        {/* If Path (Up) */}
        <div className={`absolute top-1/2 left-16 w-32 h-32 border-t-4 border-r-4 rounded-tr-3xl transition-all duration-500 origin-bottom-left
            ${condition ? 'border-emerald-500 opacity-100' : 'border-slate-200 opacity-20'}
        `} style={{ transform: 'translateY(-100%) scaleY(0.6)' }}></div>
        
        {/* True Label & Box */}
        <div className={`absolute top-0 right-8 transition-all duration-500 ${condition ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'}`}>
             <div className="bg-emerald-100 text-emerald-800 text-sm px-4 py-2 rounded-lg border border-emerald-200 font-bold whitespace-nowrap shadow-sm">
                {labels.true}
             </div>
        </div>

        {/* Else Path / Direct Path */}
        {type === 'if-else' ? (
            <>
                <div className={`absolute top-1/2 left-16 w-32 h-32 border-b-4 border-r-4 rounded-br-3xl transition-all duration-500 origin-top-left
                    ${!condition ? 'border-rose-500 opacity-100' : 'border-slate-200 opacity-20'}
                `} style={{ transform: 'scaleY(0.6)' }}></div>
                <div className={`absolute bottom-0 right-8 transition-all duration-500 ${!condition ? 'opacity-100 translate-y-0' : 'opacity-30 -translate-y-2'}`}>
                    <div className="bg-rose-100 text-rose-800 text-sm px-4 py-2 rounded-lg border border-rose-200 font-bold whitespace-nowrap shadow-sm">
                        {labels.false}
                    </div>
                </div>
            </>
        ) : (
            <>
                {/* Straight line for False in single IF */}
                <div className={`absolute top-1/2 left-20 w-48 h-1 bg-slate-300 -translate-y-1/2 transition-all duration-500
                    ${!condition ? 'opacity-100 bg-rose-400' : 'opacity-30'}
                `}></div>
                <div className={`absolute top-[55%] left-32 text-xs text-slate-400 ${!condition ? 'opacity-100' : 'opacity-0'}`}>
                    (什么都不做)
                </div>
            </>
        )}
        
        {/* End Point */}
        <div className="absolute top-1/2 right-0 w-4 h-4 bg-slate-400 rounded-full -translate-y-1/2" />
      </div>
    </div>
  );
};

const MultiBranchVisual = () => {
  const [score, setScore] = React.useState(75);
  
  const getResult = (s: number) => {
      if (s < 0 || s > 100) return { label: '数据错误', color: 'bg-red-500' };
      if (s >= 90) return { label: '重度用户', color: 'bg-purple-500' };
      if (s >= 60) return { label: '活跃用户', color: 'bg-indigo-500' };
      if (s >= 30) return { label: '一般用户', color: 'bg-blue-500' };
      return { label: '沉睡用户', color: 'bg-slate-500' };
  };

  const result = getResult(score);

  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 w-full">
        <div className="mb-8 flex flex-col items-center w-full max-w-sm">
            <label className="text-sm font-bold text-slate-500 mb-3">输入活跃度: {score}</label>
            <input 
                type="range" min="-10" max="110" value={score} 
                onChange={e => setScore(Number(e.target.value))}
                className="w-full accent-indigo-600 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        <div className="flex flex-col gap-3 w-full max-w-[280px]">
            {[
                { label: '异常 (<0 or >100)', check: (s: number) => s < 0 || s > 100 },
                { label: '重度 (>= 90)', check: (s: number) => s >= 90 && s <= 100 },
                { label: '活跃 (>= 60)', check: (s: number) => s >= 60 && s < 90 },
                { label: '一般 (>= 30)', check: (s: number) => s >= 30 && s < 60 },
                { label: '沉睡 (其他)', check: (s: number) => s >= 0 && s < 30 },
            ].map((rule, idx) => {
                const isActive = rule.check(score);
                return (
                    <div key={idx} className={`
                        flex items-center justify-between p-4 rounded-lg border transition-all duration-300
                        ${isActive 
                            ? 'bg-white dark:bg-slate-800 shadow-md border-indigo-200 dark:border-indigo-800 scale-105 z-10' 
                            : 'bg-slate-100/50 dark:bg-slate-800/50 border-transparent opacity-60 grayscale'}
                    `}>
                        <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">{rule.label}</span>
                        {isActive && <CheckCircle2 size={20} className="text-emerald-500" />}
                    </div>
                )
            })}
        </div>
        
        <div className={`mt-8 px-6 py-3 rounded-full text-white font-bold text-base shadow-lg transition-all ${result.color}`}>
            输出：{result.label}
        </div>
    </div>
  );
};

const SwitchVisual = () => {
  const [option, setOption] = React.useState<number | 'def'>(1);
  
  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 w-full">
        <div className="flex gap-4 mb-10">
            {[1, 2, 3, 'def'].map(v => (
                <button
                    key={v}
                    onClick={() => setOption(v as any)}
                    className={`w-14 h-14 rounded-xl font-bold flex items-center justify-center transition-all shadow-sm border text-lg
                        ${option === v 
                            ? 'bg-amber-500 text-white border-amber-600 shadow-amber-200 scale-110' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
                    `}
                >
                    {v === 'def' ? '?' : v}
                </button>
            ))}
        </div>

        <div className="relative w-full max-w-[360px] h-48">
            {/* Input Pipe */}
            <div className="absolute top-0 left-1/2 w-6 h-14 bg-slate-300 -translate-x-1/2 rounded-t-lg" />
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-600 z-10">输入</div>

            {/* Switch Machine */}
            <div className="absolute top-14 left-0 w-full h-16 bg-slate-200 rounded-xl flex items-center justify-around px-4 border-2 border-slate-300 shadow-inner">
                {[1, 2, 3, 'def'].map((k) => (
                    <div key={k} className={`
                        w-12 h-4 rounded-full transition-all duration-300
                        ${option === k ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,1)] scale-110' : 'bg-slate-400/50'}
                    `} />
                ))}
            </div>

            {/* Output Pipes */}
            <div className="absolute top-28 left-0 w-full flex justify-around px-2">
                {[
                    { val: 1, text: '中文' }, 
                    { val: 2, text: 'English' }, 
                    { val: 3, text: '日本語' }, 
                    { val: 'def', text: 'Error' }
                ].map((item, i) => {
                    const isActive = option === item.val;
                    return (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className={`w-3 h-10 transition-colors ${isActive ? 'bg-amber-400' : 'bg-slate-200'}`} />
                            <div className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all border ${isActive ? 'bg-amber-100 border-amber-200 text-amber-800 scale-110 shadow-sm' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                                {item.text}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
};

const LoopVisual = () => {
  const [count, setCount] = React.useState(1);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval: any;
    if (isRunning && count <= 5) {
      interval = setInterval(() => {
        setCount(c => c + 1);
      }, 800);
    } else if (count > 5) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, count]);

  // Calculate position of the runner dot
  // map 1..6 to 0..360?
  // 1->0, 6->360? Or just 1..5 fills it?
  // Let's make 1..6 cover the circle. 
  // At 1: 0 deg. At 6: 360 deg.
  // angle = ((count - 1) / 5) * 360
  const progress = Math.min((count - 1) / 5, 1);
  const angle = progress * 360;
  
  const radius = 50; 
  const x = Math.sin((angle * Math.PI) / 180) * radius;
  const y = -Math.cos((angle * Math.PI) / 180) * radius;

  return (
    <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 mt-4">
       <div className="flex gap-4 mb-4">
        <button 
          onClick={() => { setCount(1); setIsRunning(true); }}
          disabled={isRunning}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {count > 5 ? '再跑一次' : isRunning ? '跑步中...' : '开始跑圈'}
        </button>
      </div>

      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Track */}
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
        
        {/* Progress Track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle 
                cx="64" cy="64" r="50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4"
                className="text-emerald-500 transition-all duration-500 ease-linear"
                strokeDasharray="314" 
                strokeDashoffset={314 - (314 * progress)}
                strokeLinecap="round"
            />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">{count > 5 ? 'Done' : count}</span>
            <span className="text-[10px] text-slate-400">/ 5 圈</span>
        </div>

        {/* Runner Dot */}
         <div className="absolute w-6 h-6 bg-white border-2 border-emerald-500 rounded-full shadow-md z-20 flex items-center justify-center text-[10px] transition-all duration-500 ease-linear"
             style={{ 
                 transform: `translate(${x}px, ${y}px)`
             }}
         >
             🏃
         </div>
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center h-5">
        {count <= 5 ? `i = ${count} (<= 5)，继续跑` : `i = ${count} (> 5)，条件不满足，停止`}
      </p>
    </div>
  );
};

// --- Trace Data for LoopTraceVisual ---

const whileLoopCode = `int i = 1;
while (i <= 3) {
    cout << i << " ";
    i++;
}`;

const whileLoopSteps = [
    { step: 0, line: 1, variables: { i: 1 }, desc: "初始化 i = 1" },
    { step: 1, line: 2, variables: { i: 1 }, desc: "判断 1 <= 3 (成立)" },
    { step: 2, line: 3, variables: { i: 1 }, desc: "输出 i", output: "1 " },
    { step: 3, line: 4, variables: { i: 2 }, desc: "i 自增变为 2" },
    { step: 4, line: 2, variables: { i: 2 }, desc: "判断 2 <= 3 (成立)" },
    { step: 5, line: 3, variables: { i: 2 }, desc: "输出 i", output: "1 2 " },
    { step: 6, line: 4, variables: { i: 3 }, desc: "i 自增变为 3" },
    { step: 7, line: 2, variables: { i: 3 }, desc: "判断 3 <= 3 (成立)" },
    { step: 8, line: 3, variables: { i: 3 }, desc: "输出 i", output: "1 2 3 " },
    { step: 9, line: 4, variables: { i: 4 }, desc: "i 自增变为 4" },
    { step: 10, line: 2, variables: { i: 4 }, desc: "判断 4 <= 3 (不成立)", output: "1 2 3 " }
];

const forLoopCode = `int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum += i;
}`;

const forLoopSteps = [
    { step: 0, line: 1, variables: { sum: 0, i: '?' }, desc: "初始化 sum = 0" },
    { step: 1, line: 2, variables: { sum: 0, i: 1 }, desc: "初始化 i = 1" },
    { step: 2, line: 2, variables: { sum: 0, i: 1 }, desc: "判断 1 <= 3 (成立)" },
    { step: 3, line: 3, variables: { sum: 1, i: 1 }, desc: "sum += 1" },
    { step: 4, line: 2, variables: { sum: 1, i: 2 }, desc: "i++ (变为 2)" },
    { step: 5, line: 2, variables: { sum: 1, i: 2 }, desc: "判断 2 <= 3 (成立)" },
    { step: 6, line: 3, variables: { sum: 3, i: 2 }, desc: "sum += 2" },
    { step: 7, line: 2, variables: { sum: 3, i: 3 }, desc: "i++ (变为 3)" },
    { step: 8, line: 2, variables: { sum: 3, i: 3 }, desc: "判断 3 <= 3 (成立)" },
    { step: 9, line: 3, variables: { sum: 6, i: 3 }, desc: "sum += 3" },
    { step: 10, line: 2, variables: { sum: 6, i: 4 }, desc: "i++ (变为 4)" },
    { step: 11, line: 2, variables: { sum: 6, i: 4 }, desc: "判断 4 <= 3 (不成立)" }
];

export const selectionLoopsSections: Section[] = [
  {
    id: 'sl-intro',
    category: '选择与循环',
    title: '导读：程序的“思考”与“耐力”',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <p className="text-lg leading-relaxed">
          在程序设计的基础中，代码并不是永远只是一条直线走到底（顺序结构）。为了解决复杂问题，程序需要具备两个核心能力：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <GitBranch size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. 判断能力 (选择结构)</h3>
                </div>
                <p>像人一样，遇到分岔路口知道往哪走。根据条件（真/假）选择不同的路径。</p>
                <SelectionVisual />
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <RotateCw size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. 坚持能力 (循环结构)</h3>
                </div>
                <p>重复做同一件事，直到任务完成。赋予程序不知疲倦的“耐力”。</p>
                <LoopVisual />
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'sl-logic',
    category: '选择与循环',
    title: '1. 教会程序“判断是非”',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg">在做决定之前，程序首先要学会比较。</p>
        
        <div>
            <SectionHeader icon={Scale} title="1.1 关系运算：比大小" />
            <p className="mb-4">就像数学里的大小比较，用来告诉程序两个东西的关系。</p>
            <ComparisonVisual />
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
                <ul className="space-y-2">
                    <li className="flex items-center gap-2"><span className="font-mono font-bold text-indigo-600">&gt;</span> 大于</li>
                    <li className="flex items-center gap-2"><span className="font-mono font-bold text-indigo-600">&lt;</span> 小于</li>
                    <li className="flex items-center gap-2"><span className="font-mono font-bold text-indigo-600">==</span> 等于 (注意是两个等号！)</li>
                    <li className="flex items-center gap-2"><span className="font-mono font-bold text-indigo-600">!=</span> 不等于</li>
                </ul>
            </div>
            
            <div className="mb-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">结果只有两种：</h4>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li><strong className="text-indigo-600">真 (true)</strong>：在 C/C++ 中通常可以当作 1</li>
                    <li><strong className="text-indigo-600">假 (false)</strong>：通常当作 0</li>
                </ul>
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-sm flex items-center gap-2">
                        <Lightbulb size={16} /> 知识回顾：bool 与 int
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        在 C++ 中，<code>bool</code> 类型本质上就是整数。
                        <br/>虽然我们写代码时用 true/false，但计算机底层是这样理解的：
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center text-sm">
                        <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm">
                            <code className="text-emerald-600 font-bold">true</code>
                            <div className="text-slate-400 text-xs mt-1">⬇️</div>
                            <code className="text-slate-700 dark:text-slate-300 font-bold">1</code>
                            <div className="text-[10px] text-slate-400 mt-1">(非0即真)</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm">
                            <code className="text-rose-600 font-bold">false</code>
                            <div className="text-slate-400 text-xs mt-1">⬇️</div>
                            <code className="text-slate-700 dark:text-slate-300 font-bold">0</code>
                            <div className="text-[10px] text-slate-400 mt-1">(严格为0)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-amber-800 dark:text-amber-200 mb-8">
                <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                <div>
                    <strong className="block mb-1">致命陷阱</strong>
                    <ul className="list-disc list-inside text-sm">
                        <li><code>=</code> 是赋值（给变量新的值）</li>
                        <li><code>==</code> 才是判断相等</li>
                    </ul>
                    <p className="mt-1 text-sm">写错一个符号，程序逻辑就会完全跑偏。</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.1.1 关系运算例子 1：成绩比较</h4>
                    <CodeBlock code={`int score = 85;

bool isPass = score >= 60;   // 大于等于 60 算及格 (true)
bool isFull = score == 100;  // 是否满分 (false)
bool isOut  = score > 150;   // 成绩是否非法 (false)`} />
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                     <QuizCard 
                        title="小练习 1.1-1"
                        question={`每个表达式的结果是 true 还是 false？
\`\`\`cpp
int a = 10;
int b = 20;

bool r1 = a > b;         // ?
bool r2 = a * 2 == b;    // ?
bool r3 = b - a != 10;   // ?
bool r4 = a + b >= 30;   // ?
\`\`\``}
                        answer={`
- \`r1 = false\` (10 > 20)
- \`r2 = true\` (20 == 20)
- \`r3 = false\` (10 != 10)
- \`r4 = true\` (30 >= 30)
`}
                        type="basic"
                     />
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.1.2 关系运算例子 2：年龄判断</h4>
                    <CodeBlock code={`int age = 17;

bool isAdult   = age >= 18;              // 是否成年 (false)
bool isTeenage = age >= 13 && age <= 19; // 是否青少年
bool isBaby    = age < 3;                // 是否婴儿 (false)`} />
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                    <QuizCard 
                        title="小练习 1.1-2"
                        question={`写成关系表达式：
1. 分数不低于 90
2. 温度小于 0
3. 年份不是 2024`}
                        answer={`
1. \`score >= 90\`
2. \`temperature < 0\`
3. \`year != 2024\`
`}
                        type="basic"
                    />
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.1.3 关系运算例子 3：= 和 == 搞混的危险</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                            <strong className="text-red-600 block mb-2">❌ 错误写法</strong>
                            <CodeBlock code={`if (x = 0) {
    // 永远不会执行！
    // 且 x 变成了 0
}`} />
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                            <strong className="text-emerald-600 block mb-2">✅ 正确写法</strong>
                            <CodeBlock code={`if (x == 0) {
    // 判断 x 是否等于 0
}`} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <QuizCard 
                            title="小练习 1.1-3"
                            question={`下面两段代码，哪一段是“永远不会进 if”？它们有什么区别？
\`\`\`cpp
// 代码 A
int n = 1;
if (n == 0) { ... }

// 代码 B
int n = 1;
if (n = 0) { ... }
\`\`\``}
                            answer={`
- **代码 A**：\`n == 0\` 结果是 false，if 不执行，n 还是 1。
- **代码 B**：\`n = 0\` 把 n 改成 0，整个表达式的值是 0 (false)，也不执行，但 **n 已经变成 0**。
- **结论**：两段都不会进 if，但 B 更危险，因为悄悄改了变量的值。
`}
                            type="challenge"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <SectionHeader icon={GitBranch} title="1.2 逻辑运算：组合拳" />
            <p className="mb-4">有时候判断条件不止一个。比如：“只要你是男生 <strong>或者</strong> 你的分数大于90分”。</p>
            
            <LogicGateVisual />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <KnowledgeCard 
                    title="&& (AND)"
                    icon={AndIcon}
                    type="info"
                >
                    <p className="font-bold mb-2">逻辑与：必须全对才是对。</p>
                    <p className="text-sm opacity-80">例子：只有“有电” 并且 “开关打开”，灯才会亮。</p>
                </KnowledgeCard>
                
                <KnowledgeCard 
                    title="|| (OR)"
                    icon={OrIcon}
                    type="tip"
                >
                    <p className="font-bold mb-2">逻辑或：只要有一个对就是对。</p>
                    <p className="text-sm opacity-80">例子：只要“带了钥匙” 或者 “家里有人”，都能进家门。</p>
                </KnowledgeCard>

                <KnowledgeCard 
                    title="! (NOT)"
                    icon={NotIcon}
                    type="warning"
                >
                    <p className="font-bold mb-2">逻辑非：唱反调。</p>
                    <p className="text-sm opacity-80">真变假，假变真。</p>
                </KnowledgeCard>
            </div>

            <div className="space-y-8">
                {/* 1.2.1 AND */}
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.2.1 逻辑与 &&：必须都满足</h4>
                    <p className="text-sm text-slate-600 mb-2">只有“有电” 并且 “开关打开”，灯才会亮。</p>
                    <CodeBlock code={`bool hasPower = true;
bool isOn = false;
bool lightOn = hasPower && isOn; // false`} />
                    <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                        <QuizCard 
                            title="小练习 1.2-1"
                            question={`判断下面每行代码中变量的值是 true 还是 false：
\`\`\`cpp
- true && false
- (5 > 3) && (2 > 1)
- (5 > 3) && (2 > 10)
\`\`\``}
                            answer={`
- \`false\`
- \`true\`
- \`false\`
`}
                            type="basic"
                        />
                    </div>
                </div>

                {/* 1.2.2 OR */}
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.2.2 逻辑或 ||：满足一个就行</h4>
                    <p className="text-sm text-slate-600 mb-2">只要“带了钥匙” 或者 “家里有人”，都能进家门。</p>
                    <CodeBlock code={`bool hasKey = false;
bool someoneHome = true;
bool canEnter = hasKey || someoneHome; // true`} />
                    <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                        <QuizCard 
                            title="小练习 1.2-2"
                            question={`判断每个表达式的结果：
\`\`\`cpp
- false || true
- (3 < 1) || (4 == 4)
- (10 > 20) || (5 > 9)
\`\`\``}
                            answer={`
- \`true\`
- \`true\`
- \`false\`
`}
                            type="basic"
                        />
                    </div>
                </div>

                {/* 1.2.3 NOT */}
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">1.2.3 逻辑非 !：唱反调</h4>
                    <CodeBlock code={`bool isWeekend = false;
bool goToSchool = !isWeekend; // true`} />
                    <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm">
                        <QuizCard 
                            title="小练习 1.2-3"
                            question={`写出下面每行的结果：
\`\`\`cpp
- !true
- !false
- !(3 > 1)
\`\`\``}
                            answer={`
- \`false\`
- \`true\`
- \`false\`
`}
                            type="basic"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <SectionHeader icon={Lightbulb} title="1.3 聪明的小技巧：短路运算" />
                <p className="text-sm mb-4 leading-relaxed">
                    C++ 很“懒”。<br/>
                    对于 <code>A && B</code>：如果 A 已经是假，结果一定是假，它不会再去算 B。<br/>
                    对于 <code>A || B</code>：如果 A 已经是真，结果一定是真，它不会再去算 B。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="font-bold text-sm mb-2">例子 1：(i &gt; 3) && (i++)</h5>
                        <CodeBlock code={`int i = 3;
// i > 3 为 false，(i++) 不执行
bool res = (i > 3) && (i++);
// i 还是 3`} />
                    </div>
                    <div>
                        <h5 className="font-bold text-sm mb-2">例子 2：防止除零</h5>
                        <CodeBlock code={`int x = 0;
// x != 0 为 false，10/x 不执行
if (x != 0 && 10 / x > 1) {
    // 安全！
}`} />
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-indigo-200 dark:border-indigo-800">
                    <h5 className="font-bold text-sm mb-3">【小练习 1.3-1】猜猜结果</h5>
                    <div className="space-y-4 text-sm">
                        <QuizCard 
                            title="代码片段一"
                            question="bool r1 = (a > 0) && (++a > 0); (其中 a=0)"
                            answer={`
\`a > 0\` (0 > 0) 为 **false**。

👉 触发 && 短路，后面的 \`++a\` 不执行。
最终：a 还是 0，r1 为 false。
`}
                            type="basic"
                        />
                        <QuizCard 
                            title="代码片段二"
                            question="bool r2 = (b >= 0) || (++b > 0); (其中 b=0)"
                            answer={`
\`b >= 0\` (0 >= 0) 为 **true**。

👉 触发 || 短路，后面的 \`++b\` 不执行。
最终：b 还是 0，r2 为 true。
`}
                            type="basic"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'sl-selection',
    category: '选择与循环',
    title: '2. 选择结构 —— 程序的“大脑”',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p>
          会了“真/假判断”之后，程序还要学会：
          <br />
          碰到不同情况，走不同路线 —— 这就是<strong>选择结构（分支）</strong>。
        </p>
        <p>
          下面用更贴近日常 + 稍微“高级”一点的场景来讲：<strong>网络登录、推荐内容、计费、权限控制</strong>等。
        </p>

        {/* 2.1 单分支 */}
        <div className="space-y-8">
            <SectionHeader icon={GitBranch} title="2.1 单分支：直肠子 (if)" />
            
            {/* 2.1.1 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                    只关注一种情况：“如果发生了，就处理一下；否则就当没发生，保持现状。”
                </p>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.1.1 场景：用户首次登录送新人礼包</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 某 App 想在用户第一次登录时送一份新人礼包，以后再登录就不要重复送了。</li>
                    <li><strong>逻辑：</strong> 如果是首次登录：发放礼包；否则：什么都不做，按正常流程走。</li>
                </ul>
                <CodeBlock code={`bool isFirstLogin = true; // 从数据库查出来的标记\n\nif (isFirstLogin) {\n    giveWelcomeGift();   // 发新人礼包\n    // 后面一般还会把 isFirstLogin 改成 false，防止重复送\n}`} />
                <p className="mt-2 text-sm text-slate-500">不满足条件时：if 里的代码直接跳过，程序继续执行后面的逻辑。</p>
            </div>

            {/* 可视化动画 */}
            <div className="flex justify-center">
                <SelectionVisual type="if" labels={{ true: '发放礼包', false: '' }} />
            </div>

            {/* 2.1.2 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.1.2 现实生活例子：办公楼刷卡</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 进办公室需要刷门禁卡。</li>
                    <li><strong>逻辑：</strong> 如果刷卡失败：响一声“滴”、提示重刷；否则：不提示，默认就当你进去了。</li>
                </ul>
                <CodeBlock code={`bool authFailed = true; // 校验门禁卡失败\n\nif (authFailed) {\n    cout << "刷卡失败，请重试" << endl;\n}`} />
                <p className="mt-2 text-sm text-slate-500">只有“出问题”时才需要打断流程，正常情况什么也不说，这就是典型单分支 if。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuizCard 
                    title="小练习 2.1 - 编程"
                    question="1. 用单分支 if 写出逻辑：“如果用户余额小于 0，就输出 账户欠费，请及时充值”。变量名 `balance`。"
                    answer={`\`\`\`cpp\nif (balance < 0) {\n    cout << "账户欠费，请及时充值" << endl;\n}\n\`\`\``}
                />
                <QuizCard 
                    title="小练习 2.1 - 读代码"
                    question={`2. 看代码：\`score = 90\` 时会不会输出东西？\n\`\`\`cpp\nint score = 90;\nif (score > 100) {\n    cout << "你太强了" << endl;\n}\n\`\`\``}
                    answer="条件 `score > 100` 为 `false`，所以不会输出任何内容。"
                />
            </div>
        </div>

        {/* 2.2 双分支 */}
        <div className="space-y-8 mt-12">
            <SectionHeader icon={GitBranch} title="2.2 双分支：二选一 (if-else)" />
            
            {/* 2.2.1 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                    有了两套方案，必须二选一。“如果满足条件，走方案 A；否则一定走方案 B。”
                </p>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.2.1 场景：白天模式 / 夜间模式</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 根据时间自动切换 App 主题。</li>
                    <li><strong>逻辑：</strong> 白天（7点-19点）：浅色模式；否则：深色模式。</li>
                </ul>
                <CodeBlock code={`int hour = 21; // 24 小时制，0~23\n\nif (hour >= 7 && hour < 19) {\n    setLightTheme();  // 白天：浅色主题\n} else {\n    setDarkTheme();   // 其余时间：深色主题\n}`} />
                <p className="mt-2 text-sm text-slate-500">无论几点钟，一定会走其中一个分支。</p>
            </div>

            {/* 可视化动画 */}
            <div className="flex justify-center">
                <SelectionVisual type="if-else" labels={{ true: '浅色模式', false: '深色模式' }} />
            </div>

            {/* 2.2.2 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.2.2 场景：判定请求是“内部访问”还是“外部访问”</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 服务端根据 IP 判断，这是公司内网还是外网访问。</li>
                    <li><strong>逻辑：</strong> 如果 IP 在内网网段：输出“内部访问”；否则：输出“外部访问”。</li>
                </ul>
                <CodeBlock code={`bool isIntranetIP = checkIntranet(ip); // 假设这是一个函数\n\nif (isIntranetIP) {\n    cout << "内部访问" << endl;\n} else {\n    cout << "外部访问" << endl;\n}`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuizCard 
                    title="小练习 2.2 - 编程"
                    question="1. 写一个 if-else：“如果用户是 VIP，运费为 0；否则运费为 10 元”。变量：`bool isVIP; int shippingFee;`"
                    answer={`\`\`\`cpp\nif (isVIP) {\n    shippingFee = 0;\n} else {\n    shippingFee = 10;\n}\n\`\`\``}
                />
                <QuizCard 
                    title="小练习 2.2 - 读代码"
                    question={`2. 当 \`age = 65\` 时，这段代码会输出什么？\n\`\`\`cpp\nint age = 65;\nif (age < 60) {\n    cout << "普通票" << endl;\n} else {\n    cout << "老年优惠票" << endl;\n}\n\`\`\``}
                    answer={`\`age < 60\` 为 \`false\`，走 \`else\`，输出：\n\`\`\`\n老年优惠票\n\`\`\``}
                />
            </div>
        </div>

        {/* 2.3 多分支 */}
        <div className="space-y-8 mt-12">
            <SectionHeader icon={ListOrdered} title="2.3 多分支：层层筛选 (if - else if - else)" />
            
            {/* 2.3.1 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                    一个条件不够用时，需要多级决策。可以想象成：从“总控台”一路往下查，先排除特殊情况，再分类处理。
                </p>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.3.1 场景：推荐内容等级（个性化推荐）</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 根据用户活跃度打标签。</li>
                    <li><strong>逻辑：</strong> 异常 -&gt; 重度 -&gt; 活跃 -&gt; 一般 -&gt; 沉睡。</li>
                </ul>
                <CodeBlock code={`int activeScore = 72; // 0~100，系统统计的活跃度分数\n\nif (activeScore < 0 || activeScore > 100) {\n    cout << "活跃度数据错误" << endl;\n} else if (activeScore >= 90) {\n    cout << "重度用户" << endl;\n} else if (activeScore >= 60) {\n    cout << "活跃用户" << endl;\n} else if (activeScore >= 30) {\n    cout << "一般用户" << endl;\n} else {\n    cout << "沉睡用户" << endl;\n}`} />
                <p className="mt-2 text-sm text-slate-500">理解关键点：只会命中第一个满足条件的分支。范围式判断时，推荐从“更严格、范围更高”往下写。</p>
            </div>

            {/* 可视化动画 */}
            <div className="flex justify-center">
                <MultiBranchVisual />
            </div>

            {/* 2.3.2 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.3.2 场景：计费规则（网约车简化版）</h4>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li><strong>场景：</strong> 根据里程给出计费策略。</li>
                    <li><strong>规则：</strong> 里程≤3：起步价10元；≤10：每公里2元；&gt;10：每公里1.5元。</li>
                </ul>
                <CodeBlock code={`double distance = 8.5; // 单位：公里\ndouble price = 0;\n\nif (distance < 0) {\n    cout << "里程数据错误" << endl;\n} else if (distance <= 3) {\n    price = 10;\n} else if (distance <= 10) {\n    price = 10 + (distance - 3) * 2; // 超出部分每公里 2 元\n} else {\n    price = 10 + (10 - 3) * 2 + (distance - 10) * 1.5;\n}\n\ncout << "本次车费：" << price << " 元" << endl;`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuizCard 
                    title="小练习 2.3 - 编程"
                    question={`1. 设定一个变量 \`int cpuUsage\` (0-100)，按下面规则输出：\n<0或>100：数据错误\n0-30：空闲\n31-70：正常\n71-90：繁忙\n91-100：过载警告`}
                    answer={`\`\`\`cpp\nif (cpuUsage < 0 || cpuUsage > 100) {\n    cout << "数据错误" << endl;\n} else if (cpuUsage <= 30) {\n    cout << "空闲" << endl;\n} else if (cpuUsage <= 70) {\n    cout << "正常" << endl;\n} else if (cpuUsage <= 90) {\n    cout << "繁忙" << endl;\n} else {\n    cout << "过载警告" << endl;\n}\n\`\`\``}
                />
                <QuizCard 
                    title="小练习 2.3 - 思考"
                    question={`2. 思考：如果你把“空闲”（0-30）那一行写成 \`else if (cpuUsage >= 0)\` 并放在最前面，会发生什么？`}
                    answer={`只要数据合法(\`>=0\`)，永远会先命中这一行，后面“正常 / 繁忙 / 过载”都永远不会执行。\n说明：多分支时，条件顺序非常重要。`}
                />
            </div>
        </div>

        {/* 2.4 Switch 语句 */}
        <div className="space-y-8 mt-12">
            <SectionHeader icon={ListOrdered} title="2.4 Switch 语句：对号入座" />
            
            {/* 2.4.1 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                    当“条件”是几个固定选项（例如状态码、菜单编号、操作类型）时，switch 比一长串 if-else 更清爽。
                    你可以把它理解成“多路开关”：值是多少，就自动切换到哪一路。
                </p>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.4.1 场景：根据状态码打印提示</h4>
                <CodeBlock code={`int code = 401;\n\nswitch (code) {\ncase 200:\n    cout << "请求成功" << endl;\n    break;\ncase 400:\n    cout << "参数错误" << endl;\n    break;\ncase 401:\n    cout << "未登录或登录已失效" << endl;\n    break;\ncase 500:\n    cout << "服务器内部错误" << endl;\n    break;\ndefault:\n    cout << "未知错误，错误码：" << code << endl;\n    break;\n}`} />
            </div>

            {/* 可视化动画 */}
            <div className="flex justify-center">
                <SwitchVisual />
            </div>

            {/* 2.4.2 场景 */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2.4.2 场景：键盘快捷键处理（简化版）</h4>
                <CodeBlock code={`char cmd = 'S';\n\nswitch (cmd) {\ncase 'N':\n    cout << "新建文件" << endl;\n    break;\ncase 'S':\n    cout << "保存文件" << endl;\n    break;\ncase 'Q':\n    cout << "退出程序" << endl;\n    break;\ndefault:\n    cout << "无效命令" << endl;\n    break;\n}`} />

                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 mt-6">2.4.3 break 的“穿透”效果</h4>
                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-amber-800 dark:text-amber-200 mb-4">
                    <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                    <div>
                        <strong>如果不写 break：</strong> switch 会从命中的 case 一路往下执行，直到遇到 break 或 switch 结束。
                    </div>
                </div>
                <CodeBlock code={`int level = 2;\n\nswitch (level) {\ncase 1:\n    cout << "青铜权限" << endl;\ncase 2:\n    cout << "白银权限" << endl;\ncase 3:\n    cout << "黄金权限" << endl;\n}`} />
                <p className="mt-2 text-sm text-slate-500">level == 2，从 case 2 开始执行，先打印“白银权限”，接着没有 break，往下执行 case 3，再打印“黄金权限”。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuizCard 
                    title="小练习 2.4 - 编程"
                    question={`1. 用 switch 实现一个“语言选择”菜单：\n输入 1：中文\n输入 2：English\n输入 3：日本語\n其他：Unsupported language`}
                    answer={`\`\`\`cpp\nswitch (lang) {\ncase 1:\n    cout << "中文" << endl;\n    break;\ncase 2:\n    cout << "English" << endl;\n    break;\ncase 3:\n    cout << "日本語" << endl;\n    break;\ndefault:\n    cout << "Unsupported language" << endl;\n    break;\n}\n\`\`\``}
                />
                <QuizCard 
                    title="小练习 2.4 - 思考"
                    question="2. 用一句话说明：什么时候你更推荐用 switch 而不是 if-else？"
                    answer="当判断条件是有限个离散值（如状态码、菜单号、字符指令），并且只是做“对号入座”式的处理时，用 `switch` 比长串 `if-else` 更清晰、更易读。"
                />
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'sl-loops',
    category: '选择与循环',
    title: '3. 循环结构 —— 程序的“耐力”',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-lg leading-relaxed mb-4">
                当我们想让程序<strong>重复做事情</strong>（比如输出 1 到 100、统计 1000 条数据），不可能一条一条写，这就需要循环。
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200">
                <strong className="block mb-1">循环的核心：</strong>
                “只要条件还成立，就一直干下去”。
            </div>
        </div>

        {/* 3.1 while */}
        <div className="space-y-6">
            <SectionHeader icon={RotateCw} title="3.1 while 循环：谨慎的跑者" />
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">口诀</span>
                    <span className="font-bold text-lg text-slate-800 dark:text-white">先判断，后执行</span>
                </div>
                
                <ul className="list-disc list-inside space-y-2 mb-4 text-sm">
                    <li>先看条件是不是成立；</li>
                    <li>如果成立，就执行一次循环体，然后再回去继续判断；</li>
                    <li>如果一开始条件就不满足，它<strong>一次都不会执行</strong>。</li>
                </ul>

                <CodeBlock code={`while (条件) {
    // 循环体：要重复做的事
    // 记得在这里让“条件”慢慢变成 false，否则就死循环
}`} />
            </div>

            {/* 可视化动画：Trace Table */}
            <div className="flex justify-center w-full">
                <LoopTraceVisual code={whileLoopCode} steps={whileLoopSteps} title="while 循环变量追踪" />
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.1.1 场景：重复输入直到合法（输入校验）</h4>
                    <CodeBlock code={`int score;
cout << "请输入一个 1~100 之间的分数: ";
cin >> score;

while (score < 1 || score > 100) { 
    // 条件不合法就进循环
    cout << "输入不合法，请重新输入: ";
    cin >> score;
}
cout << "你输入的分数是: " << score << endl;`} />
                    <p className="mt-2 text-xs text-slate-500">特点：如果第一次输入就合法，while 体一次都不会执行（前门保安：先检查，再放行）。</p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.1.2 场景：从数据库分页拉取数据</h4>
                    <CodeBlock code={`int page = 1;
int count = fetchPage(page); 

while (count == 100) {
    // 只要这一页是满的，说明后面可能还有
    page++;
    count = fetchPage(page);
}
// 数量 < 100，说明是最后一页，循环结束`} />
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <QuizCard 
                    title="小练习 3.1"
                    question={`1. 用 while 输出从 1 到 5 的所有整数。
2. 指出这段代码的 bug（逻辑错误）：
\`\`\`cpp
int i = 1;
while (i <= 5) {
    cout << i << endl;
    // 少了什么？
}
\`\`\``}
                    answer={`
1. 
\`\`\`cpp
int i = 1;
while (i <= 5) {
    cout << i << endl;
    i++; // 别忘了递增
}
\`\`\`

2. **死循环**：忘记写 \`i++\`，\`i\` 永远是 1，条件 \`i <= 5\` 一直为真。
`}
                    type="basic"
                />
            </div>
        </div>

        {/* 3.2 do-while */}
        <div className="space-y-6">
            <SectionHeader icon={RotateCw} title="3.2 do-while 循环：冲动的跑者" />
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">口诀</span>
                    <span className="font-bold text-lg text-slate-800 dark:text-white">先执行，后判断</span>
                </div>
                
                <ul className="list-disc list-inside space-y-2 mb-4 text-sm">
                    <li>先不管三七二十一，<strong>先做一次</strong>；</li>
                    <li>做完再检查条件；</li>
                    <li>条件满足就继续做；不满足就停止。</li>
                </ul>

                <CodeBlock code={`do {
    // 循环体：先干一遍
} while (条件); // 注意这里有分号`} />
                
                <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm">
                    <strong>和 while 的核心区别：</strong>
                    <ul className="list-disc list-inside mt-1 text-slate-600 dark:text-slate-400">
                        <li>while：可能一次也不执行</li>
                        <li>do-while：<strong>至少会执行一次</strong></li>
                    </ul>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.2.1 场景：登录重试</h4>
                    <p className="text-xs text-slate-500 mb-2">不管怎样，登录界面至少要出现一次。</p>
                    <CodeBlock code={`bool success = false;
char retry = 'n';

do {
    success = login(); 
    if (!success) {
        cout << "登录失败，重试？(y/n): ";
        cin >> retry;
    }
} while (!success && retry == 'y');`} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.2.2 场景：菜单至少显示一次</h4>
                    <CodeBlock code={`int choice;

do {
    cout << "1. 开始游戏\\n";
    cout << "2. 设置\\n";
    cout << "3. 退出\\n";
    cin >> choice;

    handle(choice); 

} while (choice != 3);`} />
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <QuizCard 
                    title="小练习 3.2"
                    question={`1. 用 do-while 实现：让用户输入密码，如果不是 "123456"，就提示错误并重试，直到输入正确。
2. 用一句话说出 while 和 do-while 最大的区别是什么？`}
                    answer={`
1. 
\`\`\`cpp
string pwd;
do {
    cout << "请输入密码: ";
    cin >> pwd;
    if (pwd != "123456") cout << "错误" << endl;
} while (pwd != "123456");
\`\`\`

2. **while 可能一次都不执行，do-while 至少执行一次。**
`}
                    type="basic"
                />
            </div>
        </div>

        {/* 3.3 for */}
        <div className="space-y-6">
            <SectionHeader icon={RotateCw} title="3.3 for 循环：专业的运动员" />
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">最常用的循环形式，<strong>计数清晰、结构紧凑</strong>。</p>
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded mb-4 font-mono text-sm border-l-4 border-indigo-500">
                    for (初始化; 条件; 更新) &#123; ... &#125;
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">初始化<br/><span className="text-xs opacity-70">从哪跑 (起点)</span></div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">条件<br/><span className="text-xs opacity-70">跑到哪 (终点)</span></div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">更新<br/><span className="text-xs opacity-70">怎么跑 (步频)</span></div>
                </div>
            </div>

            {/* 可视化动画：Trace Table */}
            <div className="flex justify-center w-full">
                <LoopTraceVisual code={forLoopCode} steps={forLoopSteps} title="for 循环变量追踪" />
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.3.1 场景：累加求和 (1-100)</h4>
                    <CodeBlock code={`int sum = 0;

for (int i = 1; i <= 100; i++) {
    sum += i; 
}

cout << "和是: " << sum << endl;`} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.3.2 场景：倒计时发射</h4>
                    <CodeBlock code={`// 模拟火箭发射倒计时
for (int i = 10; i > 0; i--) {
    cout << i << "..." << endl;
}
cout << "发射！" << endl;`} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                 <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.3.3 场景：生成星号图形 (嵌套循环)</h4>
                 <CodeBlock code={`for (int i = 1; i <= 4; i++) {      // 行
    for (int j = 1; j <= 4; j++) {  // 列
        cout << "* ";
    }
    cout << endl;
}`} />
                 <pre className="mt-2 bg-slate-900 text-slate-300 p-2 rounded text-xs font-mono">
* * * *<br/>
* * * *<br/>
* * * *<br/>
* * * *
                 </pre>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <QuizCard 
                    title="小练习 3.3"
                    question={`1. 用 for 输出 2 到 10 之间的所有偶数。
2. 用 for 计算 1 到 5 的阶乘 (1 * 2 * 3 * 4 * 5)。`}
                    answer={`
1. 
\`\`\`cpp
for (int i = 2; i <= 10; i += 2) {
    cout << i << " ";
}
\`\`\`

2. 
\`\`\`cpp
int fact = 1;
for (int i = 1; i <= 5; i++) {
    fact *= i;
}
cout << fact; // 120
\`\`\`
`}
                    type="basic"
                />
            </div>
        </div>

        {/* 3.4 Control */}
        <div className="space-y-6">
            <SectionHeader icon={AlertTriangle} title="3.4 循环的控制：刹车与跳过" />
            
            <div className="space-y-4">
                <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
                    <strong className="text-red-700 dark:text-red-400 block mb-2 text-lg">break</strong>
                    <div className="text-sm opacity-80 mb-2">紧急刹车</div>
                    <p className="text-sm">直接跳出<strong>当前这层</strong>循环，后面的都不执行了。</p>
                </div>
                <div className="p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-2 text-lg">continue</strong>
                    <div className="text-sm opacity-80 mb-2">跳过本轮</div>
                    <p className="text-sm">这一圈剩下的代码不跑了，直接回到起点<strong>开始下一圈</strong>。</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.4.1 break：找到目标就停止</h4>
                    <CodeBlock code={`// 寻找 100 以后第一个能被 7 整除的数
for (int i = 100; i < 200; i++) {
    if (i % 7 == 0) {
        cout << "找到了: " << i << endl;
        break; // 找到一个就退出，不需要再找了
    }
}`} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.4.2 continue：只跳过特定情况</h4>
                    <p className="text-xs text-slate-500 mb-2">例子：输出 1-10，跳过 5。</p>
                    <CodeBlock code={`for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        continue; // 跳过 5
    }
    cout << i << " ";
}`} />
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <QuizCard 
                    title="小练习 3.4"
                    question={`1. 用 for+break：从 1 加到 100，一旦和超过 50 就停止，输出最后的和。
2. 用 for+continue：输出 1 到 20 中所有 **不是 3 的倍数** 的数字。`}
                    answer={`
1. 
\`\`\`cpp
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
    if (sum > 50) break;
}
cout << sum;
\`\`\`

2. 
\`\`\`cpp
for (int i = 1; i <= 20; i++) {
    if (i % 3 == 0) continue;
    cout << i << " ";
}
\`\`\`
`}
                    type="challenge"
                />
            </div>
        </div>

        {/* 3.5 Scope */}
        <div className="space-y-6">
            <SectionHeader icon={Lightbulb} title="3.5 for 循环中的变量作用域：在哪儿“看得见”？" />
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="mb-4">
                    在 for 循环里，我们经常这样写：<code>for (int i = 1; i &lt;= 10; i++)</code>。
                    这里有一个容易被忽视但非常重要的点：
                    <strong>在 for 初始化语句中声明的变量，只在这个 for 循环的内部有效。</strong>
                </p>

                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">3.5.1 作用域是什么？</h4>
                <p className="mb-2 text-sm">
                    作用域（scope）：简单理解就是——这个变量“从哪一行开始能被看到，到哪一行就看不到了”。
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    <li>只在这个 for 循环的大括号 <code>&#123; ... &#125;</code> 里面能用；</li>
                    <li>循环结束后，<code>i</code> 就“失效”了，外面再用会报错。</li>
                </ul>

                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">3.5.2 错误示例：在循环外使用 i</h4>
                <CodeBlock code={`int s = 0;

for (int i = 1; i <= 10; i++) {
    s += i;
}

cout << "sum = " << s << endl;
cout << "i = " << i << endl;  // ❌ ERROR：这里已经访问不到 i 了`} />
                <p className="mt-2 text-sm text-slate-500">
                    一旦 for 执行完，<code>i</code> 就被销毁，编译器会提示“未定义的标识符 i”。
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.5.3 正确写法 1：只在循环里用 i</h4>
                    <p className="text-xs text-slate-500 mb-2">如果你只在循环里用 i，循环外不需要访问它。</p>
                    <CodeBlock code={`int s = 0;

for (int i = 1; i <= 10; i++) {
    s += i;   // 在这里安全使用 i
}

cout << "sum = " << s << endl; // OK
// 这里不要再用 i`} />
                    <div className="mt-2 text-xs bg-emerald-50 text-emerald-700 p-2 rounded">
                        <strong>优点：</strong> i 只在需要的地方存在，命名更干净。
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">3.5.4 正确写法 2：循环外也要用 i</h4>
                    <p className="text-xs text-slate-500 mb-2">如果你需要在循环结束后，知道“循环跑到了第几个”。</p>
                    <CodeBlock code={`int s = 0;
int i;              // 先在外面声明

for (i = 1; i <= 10; i++) {
    s += i;
}

cout << "sum = " << s << endl;
cout << "循环结束时 i = " << i << endl;  // OK`} />
                    <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded">
                        <strong>说明：</strong> for 里没有再写 int，而是用了外面声明的 i。
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">3.5.5 再举两个小例子</h4>
                
                <div className="space-y-6">
                    <div>
                        <h5 className="font-bold text-sm mb-2">例子 1：只在循环里用 k</h5>
                        <CodeBlock code={`int n = 5;
int sum = 0;

for (int k = 1; k <= n; k++) {
    sum += k;
}

cout << "sum = " << sum << endl;
// cout << k; // 编译错误`} />
                    </div>
                    <div>
                        <h5 className="font-bold text-sm mb-2">例子 2：想知道“最后一个下标”</h5>
                        <CodeBlock code={`int n = 5;
int sum = 0;
int k; // 提前声明

for (k = 1; k <= n; k++) {
    sum += k;
}

cout << "sum = " << sum << endl;
cout << "循环结束时 k = " << k << endl;`} />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                <QuizCard 
                    title="小练习 3.5"
                    question={`1. 判断下面代码是否能通过编译？如果不能，错误在哪里？
\`\`\`cpp
for (int j = 0; j < 3; j++) {
    cout << j << " ";
}
cout << j << endl;
\`\`\`

2. 改写这段代码，使它可以在循环外输出 j 的最终值。`}
                    answer={`
1. **不能通过编译**：
   - \`int j = 0\` 声明的 \`j\` 只在 for 循环内部可见；
   - 循环结束后，\`cout << j\` 这行访问了一个“已经不在作用域里的变量”，编译器会报错。

2. **一种改法**：
\`\`\`cpp
int j;                          // 在外面声明

for (j = 0; j < 3; j++) {
    cout << j << " ";
}
cout << endl;
cout << "循环结束时 j = " << j << endl;
\`\`\``}
                    type="basic"
                />
            </div>
            
            <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-amber-800 dark:text-amber-200">
                <Lightbulb className="shrink-0 mt-0.5" size={20} />
                <div>
                    <strong className="block mb-1">记住一句</strong>
                    <p className="text-sm">在 <code>for (int i = ... )</code> 里声明的 <code>i</code>，只在这个 for 循环里有效，跑完就没了。</p>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'sl-nested',
    category: '选择与循环',
    title: '4. 进阶 —— 循环嵌套',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <p>循环嵌套就是“圈里套圈”。最经典的例子是打印图形或乘法表。</p>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold mb-4">例子：打印 5x5 星星矩阵</h4>
            <ul className="list-disc list-inside mb-4 text-sm space-y-1">
                <li><strong>外层循环：</strong> 控制行数（管你有几行）。</li>
                <li><strong>内层循环：</strong> 控制每一行打印几个星星。</li>
            </ul>
            <CodeBlock code={`for (int i = 1; i <= 5; i++) {      // 外层：第1行到第5行
    for (int j = 1; j <= 5; j++) {  // 内层：每行打5个星
        cout << "*";
    }
    cout << "\\n"; // 每行打完要换行
}`} />
        </div>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-sm">
             <strong>提示：</strong> 如果想打印三角形（第一行1个，第二行2个...），只需要修改内层循环的条件为 <code>j &lt;= i</code>。
        </div>
      </div>
    )
  },
  {
    id: 'sl-summary',
    category: '选择与循环',
    title: '总结',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <h3 className="text-xl font-bold">通过这节课，我们学会了如何指挥计算机：</h3>
        <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Scale size={20} />
                </div>
                <div>
                    <strong className="block text-slate-900 dark:text-white">看清世界</strong>
                    <p className="text-sm opacity-80">使用关系运算符 (&gt;, &lt;, ==) 和逻辑运算符 (&&, ||, !)。</p>
                </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                    <GitBranch size={20} />
                </div>
                <div>
                    <strong className="block text-slate-900 dark:text-white">做决定</strong>
                    <p className="text-sm opacity-80">使用 if 和 switch 根据不同情况执行不同代码。</p>
                </div>
            </div>

            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                    <RotateCw size={20} />
                </div>
                <div>
                    <strong className="block text-slate-900 dark:text-white">不知疲倦</strong>
                    <p className="text-sm opacity-80">使用 while 和 for 循环重复执行任务。</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
];
