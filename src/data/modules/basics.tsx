import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { SectionHeader } from '../../components/Lesson/SectionHeader';
import { KnowledgeCard } from '../../components/Lesson/KnowledgeCard';
import { QuizCard } from '../../components/Lesson/QuizCard';
import { PracticeChallenge } from '../../components/Lesson/PracticeChallenge';
import { 
  Box,
  Binary,
  Keyboard,
  ArrowRightLeft,
  Calculator,
  Code2,
  Lightbulb,
  Info,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Database,
  RefreshCcw,
  Scale,
  FunctionSquare,
  ListOrdered
} from 'lucide-react';

// --- Visual Components (SVG Illustrations & Interactive Demos) ---

const DataTypesInteractive = () => {
  const [activeType, setActiveType] = React.useState<'int' | 'double' | 'char' | 'bool'>('int');

  const types = {
    int: {
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      darkColor: 'dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      label: 'int',
      desc: '整数',
      size: '4 字节',
      metaphor: '🧱 像积木，形状固定，只能存整数',
      example: 'int age = 20;',
      range: '-21亿 ~ 21亿'
    },
    double: {
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      darkColor: 'dark:bg-emerald-900/30',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      label: 'double',
      desc: '双精度浮点数',
      size: '8 字节',
      metaphor: '💧 像水流，精确细腻，可存小数',
      example: 'double pi = 3.14159;',
      range: '1.7E +/- 308 (15位精度)'
    },
    char: {
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      darkColor: 'dark:bg-pink-900/30',
      textColor: 'text-pink-600 dark:text-pink-400',
      borderColor: 'border-pink-200 dark:border-pink-800',
      label: 'char',
      desc: '字符',
      size: '1 字节',
      metaphor: '🔤 像单张字母卡片，本质是整数(ASCII)',
      example: "char grade = 'A';",
      range: '-128 ~ 127'
    },
    bool: {
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      darkColor: 'dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800',
      label: 'bool',
      desc: '布尔值',
      size: '1 字节',
      metaphor: '💡 像开关，只有开(true)和关(false)',
      example: 'bool isPassed = true;',
      range: 'true / false'
    }
  };

  const activeInfo = types[activeType];

  return (
    <div className="my-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-500 hover:shadow-md">
      <h4 className="text-center font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center justify-center gap-2">
        <span className="text-2xl">👇</span> 点击图标，查看“数据档案”
      </h4>
      
      {/* Type Selector */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {(Object.keys(types) as Array<keyof typeof types>).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`
              relative group transition-all duration-300 transform hover:-translate-y-1 outline-none
              ${activeType === type ? 'scale-110' : 'opacity-60 hover:opacity-100'}
            `}
          >
            <div className={`
              w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg transition-colors
              ${activeType === type ? types[type].color : 'bg-slate-100 dark:bg-slate-700'}
            `}>
              <span className={`font-bold text-lg ${activeType === type ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                {type}
              </span>
            </div>
            {/* Indicator Arrow */}
            {activeType === type && (
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] ${types[type].textColor.replace('text-', 'border-t-').replace('600', '500').replace('400', '500')}`} />
            )}
          </button>
        ))}
      </div>

      {/* Info Card */}
      <div className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-500
        ${activeInfo.borderColor} ${activeInfo.lightColor} ${activeInfo.darkColor}
      `}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
           <div>
              <h5 className={`text-2xl font-bold mb-2 ${activeInfo.textColor}`}>{activeInfo.desc} ({activeInfo.label})</h5>
              <p className="text-slate-700 dark:text-slate-200 mb-4 font-medium text-lg">{activeInfo.metaphor}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/60 dark:bg-black/20 rounded-full text-xs font-mono text-slate-600 dark:text-slate-300 border border-black/5">
                  Size: {activeInfo.size}
                </span>
                <span className="px-3 py-1 bg-white/60 dark:bg-black/20 rounded-full text-xs font-mono text-slate-600 dark:text-slate-300 border border-black/5">
                  Range: {activeInfo.range}
                </span>
              </div>
           </div>
           <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-black/5 transform transition-transform duration-500 hover:scale-105">
              <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Code Example</div>
              <code className={`text-lg font-mono font-bold ${activeInfo.textColor}`}>
                {activeInfo.example}
              </code>
           </div>
        </div>
      </div>
    </div>
  );
};

const StringVisualizer = () => {
  const [str1, setStr1] = React.useState("Hello");
  const [str2, setStr2] = React.useState("World");
  const [isJoined, setIsJoined] = React.useState(false);

  return (
    <div className="my-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
      <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
        <RefreshCcw size={18} className="text-indigo-500" /> 动画实验室：字符串拼接
      </h4>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input 
          type="text" 
          value={str1}
          onChange={(e) => { setStr1(e.target.value); setIsJoined(false); }}
          className="w-32 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-center focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 dark:text-white"
          placeholder="String 1"
        />
        <div className="text-2xl font-bold text-slate-400">+</div>
        <input 
          type="text" 
          value={str2}
          onChange={(e) => { setStr2(e.target.value); setIsJoined(false); }}
          className="w-32 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-center focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-slate-900 dark:text-white"
          placeholder="String 2"
        />
        <button 
          onClick={() => setIsJoined(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors font-bold shadow-md active:scale-95 transform"
        >
          拼接 (Join)
        </button>
      </div>

      <div className="h-32 flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
         <div className={`
            transition-all duration-700 ease-in-out flex items-center
            ${isJoined ? 'gap-0' : 'gap-8'}
         `}>
            <div className="flex shadow-sm">
              {str1.split('').map((char, i) => (
                 <div key={`s1-${i}`} className={`
                    w-8 h-10 border-y border-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-700 flex items-center justify-center font-mono font-bold text-indigo-700 dark:text-indigo-300 text-lg
                    ${i === 0 ? 'rounded-l-lg border-l' : ''}
                    ${i === str1.length - 1 && !isJoined ? 'rounded-r-lg border-r' : 'border-r'}
                 `}>
                    {char === ' ' ? '␣' : char}
                 </div>
              ))}
            </div>
            
            {/* The Plus Icon fading out */}
            <div className={`text-slate-300 font-bold text-xl transition-all duration-300 ${isJoined ? 'opacity-0 w-0 -translate-y-4' : 'opacity-100'}`}>+</div>

            <div className="flex shadow-sm">
              {str2.split('').map((char, i) => (
                 <div key={`s2-${i}`} className={`
                    w-8 h-10 border-y border-purple-200 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-700 flex items-center justify-center font-mono font-bold text-purple-700 dark:text-purple-300 text-lg
                    ${i === 0 && !isJoined ? 'rounded-l-lg border-l' : 'border-l'}
                    ${i === str2.length - 1 ? 'rounded-r-lg border-r' : ''}
                 `}>
                    {char === ' ' ? '␣' : char}
                 </div>
              ))}
            </div>
         </div>
         
         <div className={`mt-4 text-xs font-mono transition-all duration-500 ${isJoined ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-slate-400">Result: </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">"{str1}{str2}"</span>
         </div>
      </div>
    </div>
  );
};

const TypeAliasVisualizer = () => {
  const [hasAlias, setHasAlias] = React.useState(false);

  return (
    <div className="my-8 flex flex-col items-center">
       <div className="relative w-full max-w-md h-40 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>

          {/* The Data Entity */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl flex flex-col items-center justify-center text-white relative z-10 transform transition-transform hover:scale-105 duration-300">
             <span className="text-2xl">🧊</span>
             <span className="text-xs font-mono opacity-80">Memory</span>
          </div>

          {/* Original Name Label */}
          <div className="absolute left-[10%] md:left-[20%] top-1/2 -translate-y-1/2 flex items-center">
             <div className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-lg text-sm font-mono font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-sm whitespace-nowrap z-20">
                double
             </div>
             <div className="w-8 md:w-12 h-0.5 bg-slate-400 dark:bg-slate-500"></div>
             <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 -ml-1"></div>
          </div>

          {/* Alias Label Animation */}
          <div className={`
             absolute right-[10%] md:right-[20%] top-1/2 -translate-y-1/2 flex items-center transition-all duration-700 ease-out
             ${hasAlias ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}
          `}>
             <div className="w-2 h-2 rounded-full bg-emerald-500 -mr-1"></div>
             <div className="w-8 md:w-12 h-0.5 bg-emerald-500"></div>
             <div className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 shadow-sm whitespace-nowrap z-20 flex items-center gap-2">
                Area <span className="text-[10px] bg-emerald-500 text-white px-1 rounded">别名</span>
             </div>
          </div>
       </div>

       <button 
         onClick={() => setHasAlias(!hasAlias)}
         className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full shadow-sm transition-all font-medium text-sm
            ${hasAlias 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
            }
         `}
       >
         {hasAlias ? (
            <>
                <RefreshCcw size={16} /> 重置 (Reset)
            </>
         ) : (
            <>
                <Zap size={16} className={hasAlias ? "" : "fill-current"} /> 创建别名 (Create Alias)
            </>
         )}
       </button>
    </div>
  );
};

const VariableIllustration = () => (
  <div className="flex justify-center my-8 transition-transform hover:scale-105 duration-500">
    <svg width="350" height="180" viewBox="0 0 350 180" className="drop-shadow-xl">
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
        </marker>
      </defs>
      
      {/* Memory Space Background */}
      <rect x="20" y="20" width="310" height="140" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5 5" />
      <text x="175" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">内存空间 (Memory)</text>

      {/* The Variable Box */}
      <g transform="translate(125, 60)">
        <rect width="100" height="80" rx="8" fill="url(#boxGrad)" />
        <rect width="100" height="20" rx="8" fill="#312e81" opacity="0.2" />
        
        {/* Label */}
        <rect x="20" y="-10" width="60" height="20" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <text x="50" y="4" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">int a</text>
        
        {/* Value */}
        <text x="50" y="55" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">10</text>
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="10" opacity="0.8">Value</text>
      </g>

      {/* Annotation */}
      <path d="M 115 100 L 75 100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="70" y="105" textAnchor="end" fill="#64748b" fontSize="11">变量名</text>
    </svg>
  </div>
);

const DataTypesIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="220" viewBox="0 0 400 220" className="drop-shadow-lg">
       {/* Int */}
       <g transform="translate(20, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#1e40af" fontWeight="bold">int</text>
         <text x="40" y="55" textAnchor="middle" fill="#3b82f6" fontSize="24">42</text>
         <text x="40" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10">4 bytes</text>
       </g>

       {/* Double */}
       <g transform="translate(110, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#3f6212" fontWeight="bold">double</text>
         <text x="40" y="55" textAnchor="middle" fill="#65a30d" fontSize="20">3.14</text>
         <text x="40" y="72" textAnchor="middle" fill="#84cc16" fontSize="10">8 bytes</text>
       </g>

       {/* Char */}
       <g transform="translate(200, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#9d174d" fontWeight="bold">char</text>
         <text x="40" y="55" textAnchor="middle" fill="#db2777" fontSize="24">'A'</text>
         <text x="40" y="72" textAnchor="middle" fill="#f472b6" fontSize="10">1 byte</text>
       </g>

       {/* String */}
       <g transform="translate(290, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="90" height="80" rx="12" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
         <text x="45" y="30" textAnchor="middle" fill="#9a3412" fontWeight="bold">string</text>
         <text x="45" y="55" textAnchor="middle" fill="#ea580c" fontSize="16">"Hi!"</text>
         <text x="45" y="72" textAnchor="middle" fill="#fb923c" fontSize="10">Dynamic</text>
       </g>
       
       {/* Container Metaphor */}
       <text x="200" y="140" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="bold">就像不同大小的容器</text>
       <path d="M 60 110 Q 60 130 150 135" fill="none" stroke="#94a3b8" strokeDasharray="4 4" />
       <path d="M 335 110 Q 335 130 250 135" fill="none" stroke="#94a3b8" strokeDasharray="4 4" />
    </svg>
  </div>
);

const IOIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="160" viewBox="0 0 400 160" className="drop-shadow-lg">
      {/* Keyboard */}
      <g transform="translate(20, 50)">
         <rect width="60" height="40" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
         <path d="M 30 55 L 30 85" stroke="#64748b" strokeWidth="2" />
         <text x="30" y="25" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Keyboard</text>
         <rect x="10" y="55" width="40" height="2" fill="#cbd5e1" />
      </g>

      {/* Screen */}
      <g transform="translate(320, 50)">
         <rect width="60" height="40" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
         <path d="M 30 55 L 30 85" stroke="#64748b" strokeWidth="2" />
         <text x="30" y="25" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Screen</text>
         <rect x="10" y="55" width="40" height="2" fill="#cbd5e1" />
      </g>

      {/* Program Box */}
      <g transform="translate(150, 40)">
        <rect width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="50" y="35" textAnchor="middle" fill="#4338ca" fontWeight="bold">C++ Program</text>
      </g>

      {/* Arrows */}
      <g transform="translate(90, 70)">
         <path d="M 0 0 L 50 0" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
         <text x="25" y="-10" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">cin &gt;&gt;</text>
      </g>

      <g transform="translate(260, 70)">
         <path d="M 0 0 L 50 0" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)" />
         <text x="25" y="-10" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">cout &lt;&lt;</text>
      </g>

      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
        </marker>
        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  </div>
);

const TypeCastIllustration = () => (
  <div className="w-full my-12 flex justify-center">
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-1 border border-slate-200 dark:border-slate-700 shadow-2xl max-w-4xl w-full">
      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-[1.4rem] overflow-hidden">
        <svg viewBox="0 0 800 500" className="w-full h-auto max-h-[400px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradInt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="gradFloat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
             <linearGradient id="gradChar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="offsetblur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="arrowBig" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Section 1: The Metaphor (Top Half) */}
          <g transform="translate(50, 40)">
             <text x="0" y="0" className="fill-slate-500 dark:fill-slate-400 font-bold text-lg" fontSize="18">1. 数据的形态 (Data Metaphors)</text>
             
             {/* Int - Ice Cube */}
             <g transform="translate(50, 40)" filter="url(#shadow)">
                <rect width="120" height="120" rx="20" fill="url(#gradInt)" stroke="#2563eb" strokeWidth="2" />
                <text x="60" y="55" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Int</text>
                <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">固态 (Ice)</text>
                <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">形状固定</text>
             </g>

             {/* Arrow */}
             <g transform="translate(190, 90)">
                <path d="M 0 0 L 60 0" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 6" markerEnd="url(#arrowBig)" />
             </g>

             {/* Float - Water Drop */}
             <g transform="translate(280, 40)" filter="url(#shadow)">
                 <path d="M 60 120 C 20 120 0 80 0 60 C 0 30 60 0 60 0 C 60 0 120 30 120 60 C 120 80 100 120 60 120 Z" fill="url(#gradFloat)" stroke="#0284c7" strokeWidth="2" />
                 <text x="60" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Float</text>
                 <text x="60" y="90" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">液态 (Water)</text>
             </g>

             {/* Arrow */}
             <g transform="translate(420, 90)">
                <path d="M 0 0 L 60 0" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 6" markerEnd="url(#arrowBig)" />
             </g>

             {/* Char - Patterned Ice */}
             <g transform="translate(510, 40)" filter="url(#shadow)">
                 <rect width="120" height="120" rx="20" fill="url(#gradChar)" stroke="#be185d" strokeWidth="2" />
                 <text x="60" y="55" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">'A'</text>
                 <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">Char</text>
                 <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">本质是整数</text>
             </g>
          </g>

          {/* Section 2: Promotion Chain (Bottom Half) */}
          <g transform="translate(50, 250)">
             <text x="0" y="0" className="fill-slate-500 dark:fill-slate-400 font-bold text-lg" fontSize="18">2. 自动提升链 (Promotion Chain)</text>
             
             {/* Background Track */}
             <path d="M 0 100 L 700 100" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-700" />

             {/* Bool */}
             <g transform="translate(40, 100)">
                <circle r="25" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-600 font-bold" fontSize="14">bool</text>
                <text y="45" textAnchor="middle" className="fill-slate-400" fontSize="12">1 byte</text>
             </g>

             <path d="M 80 100 L 120 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Char/Short */}
             <g transform="translate(160, 100)">
                <circle r="35" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-700 font-bold" fontSize="16">char</text>
                <text y="55" textAnchor="middle" className="fill-slate-400" fontSize="12">1-2 bytes</text>
             </g>

             <path d="M 210 100 L 250 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Int */}
             <g transform="translate(310, 100)">
                <circle r="45" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-800 font-bold" fontSize="20">int</text>
                <text y="65" textAnchor="middle" className="fill-slate-400" fontSize="12">4 bytes</text>
             </g>

             <path d="M 370 100 L 410 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Long */}
             <g transform="translate(470, 100)">
                <circle r="50" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
                <text y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22">long</text>
             </g>

             <path d="M 535 100 L 575 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Double */}
             <g transform="translate(640, 100)">
                <circle r="60" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
                <text y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="24">double</text>
                <text y="80" textAnchor="middle" className="fill-slate-400" fontSize="12">8 bytes</text>
             </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
);

const OperatorIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="140" viewBox="0 0 400 140" className="drop-shadow-lg">
       {/* Modulo */}
       <g transform="translate(50, 20)">
         <circle cx="40" cy="40" r="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
         <text x="40" y="35" textAnchor="middle" fill="#b45309" fontSize="24" fontWeight="bold">%</text>
         <text x="40" y="55" textAnchor="middle" fill="#d97706" fontSize="10">取余数</text>
         <text x="40" y="95" textAnchor="middle" fill="#92400e" fontSize="12">7 % 3 = 1</text>
       </g>

       {/* Increment */}
       <g transform="translate(250, 20)">
         <circle cx="40" cy="40" r="35" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
         <text x="40" y="35" textAnchor="middle" fill="#047857" fontSize="24" fontWeight="bold">++</text>
         <text x="40" y="55" textAnchor="middle" fill="#059669" fontSize="10">自增1</text>
         <text x="40" y="95" textAnchor="middle" fill="#065f46" fontSize="12">i = i + 1</text>
       </g>
       
       <text x="200" y="70" textAnchor="middle" fill="#94a3b8" fontSize="24" fontWeight="bold">VS</text>
    </svg>
  </div>
);

const ArithmeticVisualizer = () => {
  const [a, setA] = React.useState(7);
  const [b, setB] = React.useState(3);
  
  // Ensure valid inputs
  const valA = Math.max(1, Math.min(20, a));
  const valB = Math.max(1, Math.min(10, b));
  
  const quotient = Math.floor(valA / valB);
  const remainder = valA % valB;

  return (
    <div className="my-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
      <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
        <Calculator size={18} className="text-indigo-500" /> 交互演示：整数除法与取模
      </h4>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
         <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-500">a =</span>
            <input 
              type="number" 
              value={a} 
              onChange={(e) => setA(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-center dark:bg-slate-900"
            />
         </div>
         <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-500">b =</span>
            <input 
              type="number" 
              value={b} 
              onChange={(e) => setB(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 text-center dark:bg-slate-900"
            />
         </div>
      </div>

      <div className="flex flex-col gap-6">
         {/* Visualization */}
         <div className="flex flex-wrap gap-2 justify-center min-h-[60px] p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            {Array.from({ length: quotient }).map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-1 p-1 bg-indigo-50 dark:bg-indigo-900/30 rounded border border-indigo-100 dark:border-indigo-800">
                    {Array.from({ length: valB }).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-indigo-500 rounded-sm shadow-sm"></div>
                    ))}
                </div>
            ))}
            {/* Remainder */}
            {remainder > 0 && (
                <div className="flex gap-1 p-1 bg-amber-50 dark:bg-amber-900/30 rounded border border-amber-100 dark:border-amber-800 opacity-80">
                    {Array.from({ length: remainder }).map((_, i) => (
                         <div key={i} className="w-6 h-6 bg-amber-500 rounded-sm shadow-sm animate-pulse"></div>
                    ))}
                </div>
            )}
         </div>

         {/* Results */}
         <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-center">
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase">Quotient (/)</div>
                <div className="text-2xl font-mono font-bold text-indigo-700 dark:text-indigo-300">{quotient}</div>
                <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70">商 (截断小数)</div>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-center">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase">Remainder (%)</div>
                <div className="text-2xl font-mono font-bold text-amber-700 dark:text-amber-300">{remainder}</div>
                <div className="text-xs text-amber-600/70 dark:text-amber-400/70">余数 (剩下的)</div>
            </div>
         </div>
      </div>
    </div>
  );
};

const IncrementVisualizer = () => {
    const [val, setVal] = React.useState(5);
    const [mode, setMode] = React.useState<'prefix' | 'postfix'>('prefix');
    const [step, setStep] = React.useState(0); // 0: init, 1: action 1, 2: action 2
    
    // Reset when toggling mode
    React.useEffect(() => { setVal(5); setStep(0); }, [mode]);

    const runDemo = () => {
        setVal(5);
        setStep(1);
        setTimeout(() => setStep(2), 1500);
        setTimeout(() => setStep(3), 3000);
    };

    return (
        <div className="my-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
             <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                <RefreshCcw size={18} className="text-emerald-500" /> 动画演示：前置 vs 后置
             </h4>
             
             <div className="flex justify-center gap-4 mb-6">
                 <button 
                    onClick={() => setMode('prefix')}
                    className={`px-4 py-2 rounded-lg font-mono font-bold transition-colors ${mode === 'prefix' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-500'}`}
                 >
                    ++i (前置)
                 </button>
                 <button 
                    onClick={() => setMode('postfix')}
                    className={`px-4 py-2 rounded-lg font-mono font-bold transition-colors ${mode === 'postfix' ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-500'}`}
                 >
                    i++ (后置)
                 </button>
             </div>

             <div className="relative h-48 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center justify-center p-4">
                 <div className="flex items-center gap-12">
                     {/* Variable i */}
                     <div className={`
                        flex flex-col items-center transition-all duration-500
                        ${(mode === 'prefix' && step === 1) || (mode === 'postfix' && step === 2) ? 'scale-125' : ''}
                     `}>
                         <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl border-2 border-blue-500 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400 shadow-sm relative">
                            {mode === 'prefix' ? (step >= 1 ? 6 : 5) : (step >= 2 ? 6 : 5)}
                            <span className="absolute -top-3 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Variable i</span>
                         </div>
                     </div>

                     {/* Expression Value */}
                     <div className={`
                        flex flex-col items-center transition-all duration-500
                        ${(mode === 'prefix' && step === 2) || (mode === 'postfix' && step === 1) ? 'scale-125' : ''}
                     `}>
                         <div className="w-24 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-slate-400 border-dashed flex items-center justify-center text-3xl font-bold text-slate-600 dark:text-slate-400 relative">
                             {step === 0 ? '?' : (mode === 'prefix' ? 6 : 5)}
                             <span className="absolute -top-3 bg-slate-500 text-white text-xs px-2 py-0.5 rounded">Expression</span>
                         </div>
                     </div>
                 </div>

                 <div className="mt-8 text-center h-8">
                     {step === 0 && <span className="text-slate-400">点击下方按钮开始演示</span>}
                     {step === 1 && (
                         <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 animate-bounce">
                             {mode === 'prefix' ? '1. 先自增 (i 变成 6)' : '1. 先取值 (表达式用 5)'}
                         </span>
                     )}
                     {step === 2 && (
                         <span className="text-lg font-bold text-rose-600 dark:text-rose-400 animate-bounce">
                              {mode === 'prefix' ? '2. 再取值 (表达式用 6)' : '2. 再自增 (i 变成 6)'}
                         </span>
                     )}
                     {step === 3 && <span className="text-slate-500 font-bold">演示结束</span>}
                 </div>
             </div>

             <div className="mt-6 flex justify-center">
                 <button 
                    onClick={runDemo}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg active:scale-95 transition-all"
                 >
                    <Zap size={18} /> 播放过程
                 </button>
             </div>
        </div>
    );
};

const PriorityLadder = () => {
    const levels = [
        { label: '()', desc: '括号', color: 'bg-indigo-600' },
        { label: '!', desc: '逻辑非', color: 'bg-indigo-500' },
        { label: '* / %', desc: '算术(乘除)', color: 'bg-indigo-400' },
        { label: '+ -', desc: '算术(加减)', color: 'bg-blue-400' },
        { label: '> < ==', desc: '关系比较', color: 'bg-sky-400' },
        { label: '&& ||', desc: '逻辑与/或', color: 'bg-emerald-400' },
        { label: '=', desc: '赋值', color: 'bg-amber-400' },
    ];

    return (
        <div className="my-8 flex justify-center">
            <div className="relative w-full max-w-lg">
                <h4 className="text-center font-bold text-slate-700 dark:text-slate-300 mb-6">运算符优先级阶梯</h4>
                <div className="flex flex-col items-center gap-1">
                    {levels.map((lvl, idx) => (
                        <div 
                            key={idx}
                            className={`${lvl.color} text-white font-bold rounded-lg shadow-sm flex items-center justify-between px-4 py-2 transition-all hover:scale-105 hover:shadow-md cursor-default`}
                            style={{ width: `${100 - idx * 10}%`, minWidth: '200px' }}
                        >
                            <span className="font-mono text-lg shadow-black/20 drop-shadow-sm">{lvl.label}</span>
                            <span className="text-xs opacity-90 font-normal bg-black/20 px-2 py-0.5 rounded">{lvl.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-indigo-600 to-amber-400 opacity-20 hidden md:block" style={{right: '-20px'}}></div>
                <div className="absolute top-0 right-[-30px] text-xs text-slate-400 hidden md:flex flex-col justify-between h-full py-2">
                    <span>High</span>
                    <span>Low</span>
                </div>
            </div>
        </div>
    );
};




export const basicsSections: Section[] = [
  {
    id: 'cpp-variables',
    category: 'C++编程基础',
    title: '1. 数据的容器——变量',
    type: 'lesson',
    content: (
      <div className="space-y-10 text-slate-600 dark:text-slate-300">
        <p className="leading-relaxed text-lg">
          计算机的核心功能是<strong className="font-bold text-slate-800 dark:text-white mx-1">处理数据</strong>。但数据不能凭空存在，必须先在内存中给它找一个“家”，这个“家”就是<strong className="font-bold text-slate-800 dark:text-white mx-1">变量</strong>。
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-xl flex items-center gap-3">
                <Lightbulb size={24} /> 形象类比：变量 = 带标签的抽屉
             </h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
                    <span className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl shrink-0">🏷️</span>
                    <div>
                        <strong className="text-slate-800 dark:text-slate-200 text-lg block mb-1">抽屉的标签 = 变量名</strong>
                        <span className="text-sm text-slate-500">用来找到这个抽屉 (e.g., score)</span>
                    </div>
                </li>
                <li className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
                    <span className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl shrink-0">🍎</span>
                    <div>
                        <strong className="text-slate-800 dark:text-slate-200 text-lg block mb-1">抽屉里的东西 = 变量的值</strong>
                        <span className="text-sm text-slate-500">实际存放的数据 (e.g., 95)</span>
                    </div>
                </li>
             </ul>
             <p className="mt-6 text-base text-indigo-600 dark:text-indigo-400 italic text-center border-t border-indigo-100 dark:border-indigo-800 pt-4">
                “变量”之所以叫变量，是因为程序运行时，可以不断更换抽屉里的东西。
             </p>
        </div>

        <VariableIllustration />

        <div>
          <SectionHeader icon={Box} title="1.1 什么是变量？" subtitle="在内存里给数据找个“家”" />
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 mt-1"><CheckCircle2 size={20} /></div>
                <div>
                    <strong className="text-slate-900 dark:text-white text-lg block mb-2">定义</strong>
                    <p className="leading-relaxed">
                        变量是内存中<strong className="mx-1 text-slate-800 dark:text-slate-200 bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">一个有名字的存储单元</strong>，用来保存某种类型的数据，它的值在程序运行过程中可以改变。
                    </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 mt-1"><CheckCircle2 size={20} /></div>
                <div>
                    <strong className="text-slate-900 dark:text-white text-lg block mb-2">基本原则：先声明，后使用</strong>
                    <p className="leading-relaxed">
                        像住酒店要先登记房间，才可以入住；在代码中，必须先告诉编译器“我有个变量叫啥、是什么类型”，然后才能用。
                    </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col h-full">
                 <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <Code2 size={18} className="text-indigo-500"/> 示例：变量的基本使用
                 </h5>
                 <div className="flex-1 flex flex-col">
                    <CodeBlock 
                        className="flex-1"
                        code={`#include <iostream>
using namespace std;

int main() {
    int score;        // 声明：申请一个格子叫 score
    score = 95;       // 赋值：把 95 放进格子里

    cout << "考试成绩: " << score << endl;

    score = 100;      // 修改：把原来的 95 换成 100
    cout << "修正后: " << score << endl;

    return 0;
}`} 
                        language="cpp"
                    />
                 </div>
            </div>
            <div className="flex flex-col h-full space-y-4">
                 <QuizCard 
                    className="flex-1"
                    title="小练习 1：找茬"
                    question={`下面这段代码有什么问题？请说明原因。
\`\`\`cpp
int main() {
    cout << x << endl;
    int x = 10;
    return 0;
}
\`\`\``}
                    answer={`
**错误原因：违反了“先声明，后使用”原则。**

编译器读到 \`cout << x\` 时，还不知道 \`x\` 是谁（因为声明在下一行）。就像你要先认识一个人，才能叫出他的名字。
`}
                    type="basic"
                 />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={Code2} title="1.2 变量的声明与初始化" subtitle="“创建抽屉”和“放第一样东西”" />
          
          <p className="mb-6 leading-relaxed">
             在 C++ 中，创建一个变量通常有两件事：<br/>
             1. <strong className="text-slate-800 dark:text-white">声明 (Declaration)</strong>：告诉编译器“我要一个什么类型、什么名字的变量”。<br/>
             2. <strong className="text-slate-800 dark:text-white">初始化 (Initialization)</strong>：在变量诞生的那一刻，给它一个<strong className="text-indigo-600 dark:text-indigo-400">初始值</strong>。
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col h-full space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">四种初始化方式对比</h4>
                <CodeBlock 
                    code={`int main() {
    // 1. 先声明，后赋值
    int a;      // 此时 a 里是“垃圾值”！
    a = 10;     // 现在才有明确的值

    // 2. 声明并赋值 (复制初始化，最常用)
    int b = 20; 

    // 3. 括号初始化
    int c(30); 

    // 4. 列表初始化 (C++11, 推荐)
    int d{40}; 
    
    return 0;
}`} 
                    language="cpp"
                />
                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl text-sm text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-800 flex-1">
                    <strong className="block mb-2 flex items-center gap-2 text-base"><AlertTriangle size={18}/> 警惕“垃圾值”</strong>
                    <p className="leading-relaxed">如果声明局部变量 <code>int e;</code> 而不初始化，它的值是<strong className="underline decoration-wavy decoration-amber-500">未定义</strong>的（内存里原有的随机数据），直接使用会导致不可预测的错误。</p>
                </div>
            </div>
            
            <div className="flex flex-col h-full space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-4">连锁赋值的陷阱</h4>
                    <CodeBlock 
                        code={`// ❌ 错误示范
// int x = y = z = 5; 
// y 和 z 还没声明，报错！

// ✅ 正确方式
int x, y, z;   // 先声明三个
x = y = z = 5; // 再连锁赋值`} 
                        language="cpp"
                    />
                </div>
                 <QuizCard 
                    className="flex-1"
                    title="小练习 2：代码推演"
                    question={`写出下面代码中 a, b, c 的最终值：
\`\`\`cpp
int a = 10;
int b(a);
int c{a + b};
a = 5;
\`\`\``}
                    answer={`
- \`a = 5\` (最后被修改了)
- \`b = 10\` (初始化时 a 是 10)
- \`c = 20\` (初始化时 10 + 10)
`}
                    type="challenge"
                 />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={AlertTriangle} title="1.3 标识符的命名规则" subtitle="给“抽屉”起一个好名字" />
          
          <p className="mb-6 leading-relaxed">
            变量名、函数名等统称为<strong className="text-slate-800 dark:text-white">标识符 (Identifier)</strong>。起名字既要<strong className="text-emerald-600 dark:text-emerald-400">合法</strong>（遵守家规），又要<strong className="text-indigo-600 dark:text-indigo-400">好读</strong>（见名知意）。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <h5 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <CheckCircle2 size={20} className="text-emerald-500"/> 语法规则（必须遵守）
                </h5>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>只能包含：字母、数字、下划线</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-red-500">不能以数字开头</strong> (<code>1count</code> ❌)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-indigo-500">大小写敏感</strong> (Name ≠ name)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-red-500">不能用关键字</strong> (int, class...)</li>
                </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <h5 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <Lightbulb size={20} className="text-amber-500"/> 命名建议（好读好懂）
                </h5>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <span className="text-red-400 line-through decoration-2">int a, b, c;</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">int height, weight;</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <span className="text-red-400 line-through decoration-2">int t;</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">int total_score;</span>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-2 text-center">让别人一眼看懂你的意图，不要让代码变成天书。</p>
                </div>
            </div>
          </div>

          <QuizCard 
                title="小练习 3：命名大挑战"
                question="1. 判断合法性：`1stNumber`, `_total`, `double`, `Name`, `classroom-1`。\n2. 为'学生数学成绩'起个好名字。"
                answer={`
**1. 合法性判断：**

- \`1stNumber\` ❌
- \`_total\` ✅
- \`double\` ❌
- \`Name\` ✅
- \`classroom-1\` ❌

**2. 推荐命名：**

\`mathScore\`, \`math_score\`
`}
                type="basic"
          />
        </div>
      </div>
    )
  },
  {
    id: 'cpp-datatypes',
    category: 'C++编程基础',
    group: '2. 数据的分类——数据类型',
    title: '核心概念讲解',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg">程序离不开“数据”，而数据类型决定了：这一块内存能存多大的数、多精确的数；这些数可以参与哪些运算。</p>

        <DataTypesInteractive />

        <div>
          <SectionHeader icon={Binary} title="2.1 常见基本数据类型概览" subtitle="“几种常用数据，各司其职”" />
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <th className="p-4 font-bold">类型</th>
                  <th className="p-4 font-bold">关键字</th>
                  <th className="p-4 font-bold">典型大小</th>
                  <th className="p-4 font-bold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900/50">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">int</code></td>
                  <td className="p-4">4 字节</td>
                  <td className="p-4">最常用的整数</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">短整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">short</code></td>
                  <td className="p-4">2 字节</td>
                  <td className="p-4">节省空间的整数</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">长整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">long long</code></td>
                  <td className="p-4">8 字节</td>
                  <td className="p-4">超大整数 ({'>'} 20亿)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">单精度浮点</td>
                  <td className="p-4"><code className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded">float</code></td>
                  <td className="p-4">4 字节</td>
                  <td className="p-4">约7位有效数字</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">双精度浮点</td>
                  <td className="p-4"><code className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded">double</code></td>
                  <td className="p-4">8 字节</td>
                  <td className="p-4">默认小数类型，约15位精度</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">字符型</td>
                  <td className="p-4"><code className="bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded">char</code></td>
                  <td className="p-4">1 字节</td>
                  <td className="p-4">单个字符 (ASCII码)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">布尔型</td>
                  <td className="p-4"><code className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">bool</code></td>
                  <td className="p-4">1 字节</td>
                  <td className="p-4">true (1) 或 false (0)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <div className="flex flex-col space-y-4">
                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">示例 2.1-1：用 sizeof 观察各种类型的大小</h4>
                 <CodeBlock 
                    code={`#include <iostream>
using namespace std;

int main() {
    cout << "sizeof(bool)      = " << sizeof(bool)      << " 字节\\n";
    cout << "sizeof(char)      = " << sizeof(char)      << " 字节\\n";
    cout << "sizeof(short)     = " << sizeof(short)     << " 字节\\n";
    cout << "sizeof(int)       = " << sizeof(int)       << " 字节\\n";
    cout << "sizeof(long)      = " << sizeof(long)      << " 字节\\n";
    cout << "sizeof(long long) = " << sizeof(long long) << " 字节\\n";
    cout << "sizeof(float)     = " << sizeof(float)     << " 字节\\n";
    cout << "sizeof(double)    = " << sizeof(double)    << " 字节\\n";

    return 0;
}`} 
                    language="cpp"
                 />
                 <KnowledgeCard title="小贴士" icon={Info} type="info">
                    具体字节数取决于编译器和操作系统，可以使用 <code>sizeof()</code> 运算符查看。
                 </KnowledgeCard>
             </div>
             
             <div className="flex flex-col space-y-4">
                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">示例 2.1-2：不同类型适合存什么</h4>
                 <CodeBlock 
                    code={`#include <iostream>
using namespace std;

int main() {
    bool isPassed = true;                // 是否及格
    int age = 20;                        // 年龄
    long long population = 1400000000LL; // 人口数量
    double pi = 3.1415926535;            // 精确的圆周率
    float score = 95.5f;                 // 成绩，单精度

    cout << boolalpha; // 让 bool 打印 true/false 而不是 1/0
    cout << "isPassed = " << isPassed << endl;
    cout << "age      = " << age << endl;
    cout << "population = " << population << endl;
    cout << "pi       = " << pi << endl;
    cout << "score    = " << score << endl;

    return 0;
}`} 
                    language="cpp"
                 />
             </div>

             <QuizCard 
                title="小练习 2.1"
                question="为下列场景选择一个合适的类型（int, long long, double, bool）："
                answer={`
- 某人的年龄（0–150）：\`int\` (或者 short)
- 某国人口总数 (> 10亿)：\`long long\`
- 商品价格（19.99）：\`double\`
- 用户是否登录成功：\`bool\`
`}
                type="basic"
             />
          </div>
        </div>

        <div>
          <SectionHeader icon={Code2} title="2.2 字符串类型 std::string" subtitle="存“一整句文字”的类型" />
          
          <div className="space-y-6">
              <p className="leading-relaxed">
                  在 C++ 中：<br/>
                  - 单个字符 用 <code>char</code> 表示，使用单引号 <code>' '</code>；<br/>
                  - 一串文本 用 <code>std::string</code> 表示，使用双引号 <code>" "</code>。<br/>
                  使用 string 需要引入头文件 <code>#include &lt;string&gt;</code>。
              </p>

              <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.1 char 与 string 的基本使用</h4>
                    <CodeBlock 
                        code={`#include <iostream>
#include <string> // 必须引入头文件
using namespace std;

int main() {
    // 字符类型：存一个字符，用单引号
    char letter = 'A'; 
    
    // 字符串类型：存一整串文字，用双引号
    string greeting = "Hello C++";
    string school = "嘉庚学院";

    cout << "letter: " << letter << endl;
    cout << greeting << ", " << school << endl;
    return 0;
}`}
                        language="cpp"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.2 字符串的简单拼接</h4>
                    <StringVisualizer />
                    <CodeBlock 
                        code={`string name = "张三";
string hello = "你好，";
string end = "，欢迎学习 C++！";

// 用 + 号拼接
string msg = hello + name + end;
cout << msg << endl;

// 在 cout 中拼接输出
string school = "嘉庚学院";
string major  = "计算机科学";
cout << "我在" << school << "学习" << major << "。" << endl;`}
                        language="cpp"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.3 标准输出的“格式化”</h4>
                    <p className="mb-4 text-sm">
                        需要 <code>#include &lt;iomanip&gt;</code>。常用控制符：<br/>
                        <code>setw(n)</code>: 设置宽度 | <code>setfill(c)</code>: 填充字符 | <code>setprecision(n)</code>: 精度 | <code>fixed</code>: 固定小数位
                    </p>
                    <CodeBlock 
                        code={`#include <iostream>
#include <iomanip> 
using namespace std;

int main() {
    double a = 3.1415926;
    // fixed + setprecision(3) -> 保留3位小数
    cout << "小数位(3):  " << fixed << setprecision(3) << a << endl;

    int b = 255;
    // setw(5) + setfill('0') -> 宽度5，左补0
    cout << "0填充:    " << setw(5) << setfill('0') << b << endl;
    
    return 0;
}`}
                        language="cpp"
                    />
                  </div>

                  <QuizCard 
                    title="小练习 2.2：格式化输出挑战"
                    question={`请写出代码：定义 string name='Alice', int age=20, double height=1.678。输出格式：'姓名: Alice, 年龄: 20, 身高: 1.68m'（保留2位小数）。
\`\`\`cpp
// 提示：
// cout << "姓名: " << name ... << fixed << setprecision(2) << height ...
\`\`\``}
                    answer={`
\`\`\`cpp
cout << "姓名: " << name 
     << ", 年龄: " << age 
     << ", 身高: " << fixed << setprecision(2) << height << "m" << endl;
\`\`\`
`}
                    type="challenge"
                  />
              </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="2.3 给类型起别名" subtitle="给复杂类型取个小名" />
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="mb-4">如果觉得 <code>unsigned long long</code> 写起来太累，可以给它起个小名。</p>
            <TypeAliasVisualizer />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">传统方式 (typedef)</span>
                    <code className="block mt-2 text-sm">typedef double Area;</code>
                    <code className="block mt-1 text-sm text-slate-500">Area circleArea = 3.14;</code>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">推荐</div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">现代方式 (using)</span>
                    <code className="block mt-2 text-sm">using Area = double;</code>
                    <code className="block mt-1 text-sm text-slate-500">Area roomArea = 20.5;</code>
                </div>
            </div>
            
            <QuizCard 
                title="小练习 2.3"
                question="使用 using 为 unsigned int 起名为 UInt，并定义一个变量。"
                answer={`
\`\`\`cpp
using UInt = unsigned int;
UInt studentCount = 100;
\`\`\`
`}
                type="basic"
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-datatypes-quiz',
    category: 'C++编程基础',
    group: '2. 数据的分类——数据类型',
    title: '专项练习',
    type: 'quiz',
    quizData: {
      title: '数据类型闯关测试',
      description: '本测试包含 15 道题目，涵盖基本类型、内存大小、类型选择与转换等核心知识点。',
      questions: [
        {
          id: 1,
          type: 'single',
          question: '在 C++ 中，以下哪种数据类型不属于“基本数据类型”？',
          options: ['int', 'bool', 'char', 'double', 'string'],
          correctAnswer: 'string',
          explanation: 'string（字符串）在 C++ 中属于复合数据类型（或类类型），它是由标准库提供的，不是语言内置的原生基本类型。而 int, bool, char, double 都是基本数据类型。'
        },
        {
          id: 2,
          type: 'single',
          question: '关于 C++ 中数据类型占用的内存大小，标准规定的最小尺寸关系是？',
          options: [
            'char < short < int < long',
            'char <= short <= int <= long',
            'char == 1, int == 4, long == 8',
            'short <= long <= int',
            'float <= double <= int'
          ],
          correctAnswer: 'char <= short <= int <= long',
          explanation: 'C++ 标准没有规定每种类型的具体字节数（例如 int 不一定是 4 字节），只规定了它们的大小顺序关系：char <= short <= int <= long <= long long。'
        },
        {
          id: 3,
          type: 'single',
          question: '如果需要存储一个精度要求较高的小数（例如 3.141592653589793），应该优先选择哪种数据类型？',
          options: ['float', 'int', 'long double 或 double', 'short', 'unsigned int'],
          correctAnswer: 'long double 或 double',
          explanation: 'float 是单精度浮点数，通常只有 6-7 位有效数字；double 是双精度浮点数，通常有 15-16 位有效数字，适合高精度存储。'
        },
        {
          id: 4,
          type: 'single',
          question: '想要查看某个变量或数据类型在当前计算机上占用了多少字节，应该使用哪个运算符？',
          options: ['length()', 'size()', 'checkbyte()', 'sizeof', 'width'],
          correctAnswer: 'sizeof',
          explanation: 'sizeof 是 C++ 的操作符（不是函数），用于返回对象或数据类型所占的内存字节数。例如 sizeof(int)。'
        },
        {
          id: 5,
          type: 'single',
          question: 'unsigned short 类型通常占用 2 个字节。它能表示的数值范围是？',
          options: [
            '-32768 到 32767',
            '0 到 65535',
            '0 到 32767',
            '-65536 到 65535',
            '0 到 4294967295'
          ],
          correctAnswer: '0 到 65535',
          explanation: 'short 占用 2 字节（16位）。unsigned 表示无符号，即没有负数。2^16 = 65536，所以范围是 0 到 65535。'
        },
        {
          id: 6,
          type: 'single',
          question: '当我们执行代码 int a = 3.99; 时，变量 a 的值是多少？',
          options: ['4（四舍五入）', '3.99（保持不变）', '3（截断/舍弃小数）', '0（类型不匹配导致归零）', '编译错误'],
          correctAnswer: '3（截断/舍弃小数）',
          explanation: '当浮点型（double 3.99）赋值给整型（int）时，会发生隐式类型转换。转换规则是直接丢弃小数部分（截断），而不是四舍五入。'
        },
        {
          id: 7,
          type: 'single',
          question: '在 C++ 中使用 string 类型来定义字符串变量（如 string name = "XUJC";），必须包含哪个头文件？',
          options: ['<iostream>', '<cstring>', '<string>', '<math>', '<stdlib>'],
          correctAnswer: '<string>',
          explanation: '使用 C++ 标准库中的字符串类型 std::string，必须引入头文件 #include <string>。注意不是 <cstring>（那是 C 语言风格的字符串处理库）。'
        },
        {
          id: 8,
          type: 'single',
          question: '关于 bool（布尔）类型，以下说法正确的是？',
          options: [
            '它占用 4 个字节。',
            '它只能取值 true 或 false。',
            '它实际上存储的是字符 \'t\' 或 \'f\'。',
            '它不能参与数学运算。',
            '它属于复合数据类型。'
          ],
          correctAnswer: '它只能取值 true 或 false。',
          explanation: 'bool 类型通常占用 1 个字节，它的标准取值是 true 或 false。在内部或参与运算时，true 对应 1，false 对应 0。'
        },
        {
          id: 9,
          type: 'single',
          question: '观察表达式 5 + 2.5，该表达式的计算结果的数据类型是？',
          options: ['int', 'float', 'double', 'char', 'short'],
          correctAnswer: 'double',
          explanation: '5 是 int 类型，2.5 默认为 double 类型。根据自动类型转换（隐式转换）规则，不同类型运算时，向精度更高、长度更长的方向转换。int 会提升为 double，结果也是 double。'
        },
        {
          id: 10,
          type: 'single',
          question: "已知字符 'A' 的 ASCII 码是 65。执行 char c = 'A' + 2; 后，cout << c; 的输出结果是？",
          options: ['67', '652', 'C', 'A2', '编译错误'],
          correctAnswer: 'C',
          explanation: "字符变量直接参与算术运算时，先转换为对应的 ASCII 码。'A' (65) + 2 = 67。67 对应的 ASCII 字符是 'C'。因为变量 c 是 char 类型，所以输出字符 'C'。"
        },
        {
          id: 11,
          type: 'single',
          question: 'C++ 中推荐使用哪种方式将 double 类型的变量 d 转换为 int 类型？（即静态转换）',
          options: ['int(d)', '(int)d', 'convert<int>(d)', 'static_cast<int>(d)', 'dynamic_cast<int>(d)'],
          correctAnswer: 'static_cast<int>(d)',
          explanation: 'int(d) 和 (int)d 是 C 语言或旧式 C++ 风格的转换。static_cast<int>(d) 是 C++ 推荐的静态转换方式，更加安全、意图更明确。'
        },
        {
          id: 12,
          type: 'single',
          question: '想要给现有的数据类型 double 起一个别名 Area，以下哪种写法是 C++11 标准引入且推荐的？',
          options: [
            'typedef double Area;',
            '#define Area double',
            'using Area = double;',
            'Area = double;',
            'double as Area;'
          ],
          correctAnswer: 'using Area = double;',
          explanation: 'typedef 是传统的写法。using Area = double; 是 C++11 引入的 using 关键字写法，语法更直观，支持模板别名，是现代 C++ 的推荐写法。'
        },
        {
          id: 13,
          type: 'single',
          question: '定义一个常量 PI，使其值在程序运行期间不能被修改，正确的定义语句是？',
          options: [
            'double PI = 3.14;',
            'const double PI = 3.14;',
            'static double PI = 3.14;',
            'double const PI; PI = 3.14;',
            'readonly double PI = 3.14;'
          ],
          correctAnswer: 'const double PI = 3.14;',
          explanation: 'const 关键字用于定义符号常量。语法为 const 类型说明符 变量名 = 常量值;。D 错误是因为常量必须在声明时同时初始化。'
        },
        {
          id: 14,
          type: 'single',
          question: '以下哪个选项中的数据类型，按照表示范围从大到小的顺序排列（假设典型 64 位环境）？',
          options: [
            'long long > int > short > char',
            'char > short > int > long',
            'double > float > long double',
            'bool > char > short',
            'short > long > int'
          ],
          correctAnswer: 'long long > int > short > char',
          explanation: 'long long (8字节) > int (4字节) > short (2字节) > char (1字节)。'
        },
        {
          id: 15,
          type: 'single',
          question: '如果代码中出现 int a = 10; double b = 3.14;，执行 cout << typeid(a+b).name();，输出的结果（类型）是？',
          options: ['int', 'double', 'float', 'long', 'char'],
          correctAnswer: 'double',
          explanation: '当 int 和 double 进行运算时，系统会自动进行隐式类型转换。为了保证精度不丢失，转换按数据长度增加的方向进行。整数会转换为双精度浮点数，因此 a+b 的结果类型是 double。'
        }
      ]
    }
  },
  {
    id: 'cpp-io',
    category: 'C++编程基础',
    title: '3. 数据的输入与输出 (I/O)',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg">我们通过 iostream 库与用户进行交互。</p>

        <IOIllustration />

        <div>
          <SectionHeader icon={Keyboard} title="3.1 标准输入输出流" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500 font-mono">cout</span> (Output)
                </h4>
                <p className="text-sm mb-4">配合 <code>&lt;&lt;</code> (插入运算符)，将数据发送到屏幕。</p>
                <code className="block bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm">cout &lt;&lt; "Hello";</code>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border-l-4 border-green-500 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-green-500 font-mono">cin</span> (Input)
                </h4>
                <p className="text-sm mb-4">配合 <code>&gt;&gt;</code> (提取运算符)，从键盘获取数据存入变量。</p>
                <code className="block bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm">cin &gt;&gt; x;</code>
            </div>
          </div>
          
          <KnowledgeCard title="进阶技巧：连续输入" icon={Zap} type="zap">
            <p className="text-sm mb-4">cin 能够自动跳过空格和回车，非常适合一次输入多个数据。</p>
            <CodeBlock 
              code={`int id;
double score;
char grade;

// 用户输入：101 98.5 A
cin >> id >> score >> grade; `}
              language="cpp"
            />
          </KnowledgeCard>
        </div>

        <div>
          <SectionHeader icon={Code2} title="3.2 格式化输出" subtitle="需要用到 <iomanip> 库。" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="p-3">控制符</th>
                                <th className="p-3">作用</th>
                                <th className="p-3">示例</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                            <tr>
                                <td className="p-3 font-mono text-purple-600">fixed</td>
                                <td className="p-3">固定点表示法</td>
                                <td className="p-3"><code>cout &lt;&lt; fixed;</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setprecision(n)</td>
                                <td className="p-3">设置小数位数</td>
                                <td className="p-3"><code>setprecision(2)</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setw(n)</td>
                                <td className="p-3">设置域宽</td>
                                <td className="p-3"><code>setw(5)</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setfill(c)</td>
                                <td className="p-3">设置填充字符</td>
                                <td className="p-3"><code>setfill('0')</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs h-full">
                    <div className="mb-2 text-slate-500 border-b border-slate-700 pb-2">Terminal Output</div>
                    <div>
                        <span className="text-green-400">➜</span> ./main<br/>
                        默认输出: 3.14159<br/>
                        保留两位: 3.14<br/>
                        左对齐填充: 123*******
                    </div>
                </div>
            </div>
          </div>
          
          <div className="mt-4">
            <CodeBlock 
                code={`#include <iostream>
#include <iomanip> 
using namespace std;

int main() {
    double pi = 3.1415926;
    cout << "保留两位: " << fixed << setprecision(2) << pi << endl;
    
    int num = 123;
    cout << "左对齐填充: " << left << setw(10) << setfill('*') << num << endl;
    return 0;
}`}
                language="cpp"
            />
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="3.3 转义字符" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { code: '\\n', desc: '换行' },
                { code: '\\t', desc: '制表符 (Tab)' },
                { code: '\\\\', desc: '反斜杠' },
                { code: '\\"', desc: '双引号' }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:scale-105 transition-transform">
                    <code className="text-xl font-bold text-indigo-600 dark:text-indigo-400 block mb-2">{item.code}</code>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
            ))}
          </div>
          
          <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
             <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">💡 小贴士：endl 还是 \n？</h5>
             <p className="text-sm text-slate-600 dark:text-slate-400">
                 <code>endl</code> (End Line) 不仅换行，还会<strong>刷新缓冲区</strong>(确保内容立即显示)，但速度稍慢。<br/>
                 <code>\n</code> 只是单纯的换行符。初学者使用 <code>endl</code> 更稳妥，但在大量输出时 <code>\n</code> 效率更高。
             </p>
          </div>
        </div>

        <div>
          <SectionHeader icon={AlertTriangle} title="3.4 常见易错点" />
          <div className="space-y-4">
             <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800">
                <h5 className="font-bold text-red-600 dark:text-red-400 mb-2 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> 错误 1：忘记引入头文件
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    如果代码中使用了 <code>cin</code> / <code>cout</code> 但没有写 <code>#include &lt;iostream&gt;</code>，编译器会报错：
                </p>
                <code className="block bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-200 p-2 rounded text-xs font-mono">
                    error: 'cout' was not declared in this scope
                </code>
             </div>

             <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800">
                <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2 text-sm flex items-center gap-2">
                    <Info size={16} /> 错误 2：忘记命名空间
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    如果没有写 <code>using namespace std;</code>，则必须使用全名 <code>std::cout</code> 和 <code>std::cin</code>。
                </p>
                <CodeBlock 
                    code={`// ❌ 错误写法
cout << "Hello";

// ✅ 正确写法 (方式一)
using namespace std;
cout << "Hello";

// ✅ 正确写法 (方式二)
std::cout << "Hello";`} 
                    language="cpp" 
                />
             </div>

             <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-sm flex items-center gap-2">
                    <ArrowRightLeft size={16} /> 错误 3：箭头方向搞反
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-mono text-indigo-500">cout &lt;&lt;</span> (输出是流向屏幕，向左)<br/>
                    <span className="font-mono text-indigo-500">cin &gt;&gt;</span> (输入是流向变量，向右)
                </p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-type-conversion',
    category: 'C++编程基础',
    group: '4. 数据的变形——类型转换',
    title: '核心概念讲解',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        
        {/* Intro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🧊</div>
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1">整数 (Int)</h4>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">像冰块，形状固定，一块一块。</p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">💧</div>
                <h4 className="font-bold text-sky-700 dark:text-sky-300 mb-1">浮点数 (Float)</h4>
                <p className="text-sm text-sky-600/80 dark:text-sky-400/80">像液态水，流动、可分得更细。</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-2xl border border-pink-100 dark:border-pink-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">❄️</div>
                <h4 className="font-bold text-pink-700 dark:text-pink-300 mb-1">字符 (Char)</h4>
                <p className="text-sm text-pink-600/80 dark:text-pink-400/80">像印着图案的冰块，本质仍是整数。</p>
            </div>
        </div>

        <p className="text-lg leading-relaxed px-2">
            <strong>类型转换</strong>就是把一种“形态”的数据变成另一种形态。
            主要分为 <span className="text-indigo-600 dark:text-indigo-400 font-bold">隐式转换</span>（系统自动）和 <span className="text-indigo-600 dark:text-indigo-400 font-bold">显式转换</span>（人为强制）。
        </p>
        
        <TypeCastIllustration />

        <div>
          <SectionHeader icon={ArrowRightLeft} title="4.1 自动转换：系统的“潜规则”" subtitle="Implicit Conversion" />
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <Scale size={20} className="text-indigo-500" /> 总原则：宁可浪费空间，不可轻易丢精度
              </h4>
              <p className="text-sm leading-relaxed">
                  可以把每种类型想象成一个“容器”。一般原则是：<strong className="text-indigo-600 dark:text-indigo-400">小容器的数据可以安全倒进大容器</strong>，反过来就可能溢出或丢东西。
              </p>
          </div>

          <div className="space-y-8">
            <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-indigo-900">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">规则一：整型提升 (Integral Promotion)</h4>
              <p className="text-sm mb-3 text-slate-500">CPU 最爱 int。char / short / bool 在运算前都会自动变成 int。</p>
              <CodeBlock 
                code={`char c = 'A';   // ASCII 65
short s = 2;
// 实际计算：65(int) + 2(int) = 67(int)
cout << c + s;  // 输出 67`}
                language="cpp"
              />
            </div>

            <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-indigo-900">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">规则二：混合运算，看谁“更大”</h4>
              <p className="text-sm mb-3 text-slate-500">当整数遇上浮点数，整数会“投降”变成浮点数。</p>
              <CodeBlock 
                code={`int a = 5;
double b = 2.5;
// a 自动变成 5.0，结果是 7.5 (double)
auto result = a + b; `}
                language="cpp"
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="4.2 赋值转换：霸道的“左值”" subtitle="Assignment Conversion" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-800/50">
                  <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400 font-bold text-lg">
                      <AlertTriangle /> 危险：大材小用 (截断)
                  </div>
                  <p className="text-sm mb-4">把小数塞进整数变量，小数部分会被直接<strong className="text-red-600">砍掉</strong>！</p>
                  <CodeBlock 
                    code={`double price = 19.99;
int pay = price; 
// pay 变成 19 (亏了0.99)`}
                    language="cpp"
                  />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      <CheckCircle2 /> 安全：小材大用
                  </div>
                  <p className="text-sm mb-4">把整数赋给浮点变量，自动补零，安全无虞。</p>
                  <CodeBlock 
                    code={`int n = 100;
double d = n;
// d 变成 100.0`}
                    language="cpp"
                  />
              </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={Database} title="4.3 显式转换：程序员的“强权”" subtitle="Explicit Casting" />
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <h4 className="font-bold text-lg mb-4">经典案例：修复整数除法精度</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                     <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Before (Buggy)</span>
                     <CodeBlock 
                        code={`int a = 5, b = 2;
double r = a / b;
// 结果：2.0 ❌`} 
                        language="cpp" 
                     />
                     <p className="text-xs text-slate-400">整数除法先发生，结果截断为2，再转double。</p>
                 </div>
                 <div className="space-y-2">
                     <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">After (Fixed)</span>
                     <CodeBlock 
                        code={`int a = 5, b = 2;
double r = static_cast<double>(a) / b;
// 结果：2.5 ✅`} 
                        language="cpp" 
                     />
                     <p className="text-xs text-slate-400">先将 a 强转为 double，触发浮点除法。</p>
                 </div>
             </div>
          </div>
          
          <div className="mt-6">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2">两种写法对比</h5>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                            <th className="p-3">风格</th>
                            <th className="p-3">语法</th>
                            <th className="p-3">评价</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        <tr>
                            <td className="p-3">C 语言风格</td>
                            <td className="p-3 font-mono text-purple-600">(double)a</td>
                            <td className="p-3">简单粗暴，但不易检查，不推荐</td>
                        </tr>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                            <td className="p-3">C++ 风格</td>
                            <td className="p-3 font-mono text-emerald-600">static_cast&lt;double&gt;(a)</td>
                            <td className="p-3 font-bold text-emerald-600">清晰安全，推荐使用 👍</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4.4 小结：常见类型转换场景表</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-center border-collapse">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">场景</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">转换方向</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">结果</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">潜在风险</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-slate-900/50">
                            <td className="p-3 border-b dark:border-slate-700">整型提升</td>
                            <td className="p-3 border-b dark:border-slate-700">char/short → int</td>
                            <td className="p-3 border-b dark:border-slate-700">数值不变</td>
                            <td className="p-3 border-b dark:border-slate-700 text-emerald-600 font-medium">无 (安全)</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                            <td className="p-3 border-b dark:border-slate-700">混合运算</td>
                            <td className="p-3 border-b dark:border-slate-700">int → double</td>
                            <td className="p-3 border-b dark:border-slate-700">数值不变 (变为.0)</td>
                            <td className="p-3 border-b dark:border-slate-700 text-emerald-600 font-medium">无 (安全)</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900/50">
                            <td className="p-3 border-b dark:border-slate-700">赋值截断</td>
                            <td className="p-3 border-b dark:border-slate-700">double → int</td>
                            <td className="p-3 border-b dark:border-slate-700">丢弃小数</td>
                            <td className="p-3 border-b dark:border-slate-700 text-red-500 font-medium">精度丢失</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                            <td className="p-3">强制转换</td>
                            <td className="p-3">程序员指定</td>
                            <td className="p-3">按指定类型</td>
                            <td className="p-3 text-orange-500 font-medium">需程序员负责</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8">
          <SectionHeader icon={CheckCircle2} title="4.5 课堂练习与巩固" />
          <div className="grid grid-cols-1 gap-6">
            <QuizCard 
                title="题目 1：预测输出并说明原因"
                question={`观察 char 和整数的加法运算：
\`\`\`cpp
char c = 'A'; 
cout << c + 2 << endl;
\`\`\``}
                answer={`
- 运算前 c 作为 char 会先进行 **整型提升** → int，'A' 的编码是 65。
- 表达式实际是 (65 + 2)，结果是 67，类型为 int。
- 默认用 cout 直接输出时，显示的是整数 67。

思考：如果要输出 'C'，怎么办？
答案：\`cout << static_cast<char>(c + 2);\`
`}
            />

            <QuizCard 
                title="题目 2：修复“整数除法”错误"
                question={`分析并改正下面代码，让结果为 3.5：
\`\`\`cpp
int a = 7, b = 2; 
double x = a / b; // 希望得到 3.5
\`\`\``}
                answer={`
**错误原因：**

- a / b 中，a 和 b 都是 int，执行的是整数除法。
- 表达式结果是 3（丢掉小数），再赋值给 double，变成 3.0。

**正确写法：**

\`\`\`cpp
double x1 = static_cast<double>(a) / b;   // 推荐
double x2 = 1.0 * a / b;                  // 技巧
\`\`\`
`}
                type="challenge"
            />

            <QuizCard 
                title="题目 3：类型推导 (auto)"
                question={`猜测 v1 和 v2 的类型和值：
\`\`\`cpp
auto v1 = 3 + 2.0; 
auto v2 = 'A' + 1;
\`\`\``}
                answer={`
- **v1：** 3 是 int，2.0 是 double → 整数提升为 double。表达式结果是 5.0，类型为 double。
- **v2：** 'A' 是 char，参与运算前整型提升为 int（65）。表达式为 (65 + 1 = 66)，结果类型为 int，值为 66。
`}
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-type-conversion-quiz',
    category: 'C++编程基础',
    group: '4. 数据的变形——类型转换',
    title: '专项练习',
    type: 'quiz',
    quizData: {
      title: '类型转换专项测试',
      description: '本测试包含 30 道题目，涵盖隐式转换、显式转换、溢出与截断等核心知识点。',
      questions: [
  {
    "id": 1,
    "question": "隐式转换的一般原则 C++ 中，当不同类型的数据进行混合运算时，编译器会自动进行类型转换。这种转换通常遵循什么原则？",
    "options": [
      "A. 向占用内存更小的方向转换，以节省空间。",
      "B. 向精度更高、范围更大的方向转换，以避免溢出和精度丢失。",
      "C. 全部转换为 `int` 类型。",
      "D. 全部转换为 `double` 类型。",
      "E. 不进行任何转换，直接报错。"
    ],
    "correctAnswer": 1,
    "explanation": "隐式类型转换的核心原则是：宁可浪费一点空间，也要尽量少丢信息。\n所以会从“低精度 / 小范围”的类型往“高精度 / 大范围”的类型提升，比如 `int` 在和 `double` 混合时会先转为 `double`。"
  },
  {
    "id": 2,
    "question": "在 C++ 的整型提升规则中，`char` 和 `short` 在参与算术运算前，通常会被提升为哪种类型？",
    "options": [
      "A. `long`",
      "B. `float`",
      "C. `int`",
      "D. `double`",
      "E. `unsigned int`"
    ],
    "correctAnswer": 2,
    "explanation": "这是 整型提升（Integral Promotion）：\n`char` / `short` / `bool` 等小整数类型在表达式中会自动提升为 `int` 再参与运算。"
  },
  {
    "id": 3,
    "question": "以下哪种写法属于 C++ 推荐的显式转换方式？",
    "options": [
      "A. `(int)3.14`",
      "B. `int(3.14)`",
      "C. `[int]3.14`",
      "D. `static_cast<int>(3.14)`",
      "E. `convert_to_int(3.14)`"
    ],
    "correctAnswer": 3,
    "explanation": "- A / B 都是 C 风格或“函数风格”强制转换。\n- C 语法错误。\n- `static_cast<类型>(表达式)` 是 C++ 提供的 类型安全、更显眼 的转换方式，建议在教学和项目中使用。"
  },
  {
    "id": 4,
    "question": "当我们将一个 `double` 类型的数据赋值给 `int` 类型的变量时，会发生什么？",
    "options": [
      "A. 四舍五入。",
      "B. 截断（直接丢弃小数部分）。",
      "C. 向上取整。",
      "D. 抛出运行时错误。",
      "E. 无法编译。"
    ],
    "correctAnswer": 1,
    "explanation": "浮点数转整数时，执行的是 截断（Truncation）：\n- `3.99 -> 3`\n- `-3.99 -> -3`\n只是“扔掉小数部分”，与数学上的“取整”不同。"
  },
  {
    "id": 5,
    "question": "字符与整数、浮点与整数 关于 ASCII 码与整数、字符之间的关系，下列说法错误的是？",
    "options": [
      "A. `char` 本质上可以看作存储了一个小整数。",
      "B. 可以把 `int` 赋值给 `char`（只要在 `char` 可表示的范围内）。",
      "C. 字符 `'0'` 对应的整数值是 0。",
      "D. 表达式 `'A' + 1` 的结果是整数 66（假设 `'A'` 的编码为 65）。",
      "E. `(int)'a'` 可以得到字符 `'a'` 的编码。"
    ],
    "correctAnswer": 2,
    "explanation": "- `'0'` 的 ASCII 码是 48，不是数值 0。\n- 数值 0 对应的是空字符 `'\\0'`。\n其他选项均是对的。"
  },
  {
    "id": 6,
    "question": "下列关于 `sizeof` 的说法正确的是？",
    "options": [
      "A. `sizeof(char)` 的结果类型是 `char`。",
      "B. `sizeof(int)` 的结果类型是 `int`。",
      "C. `sizeof` 的结果类型是 `size_t`，一种无符号整数类型。",
      "D. `sizeof` 在运行时才能计算。",
      "E. `sizeof` 只对基本类型有效。"
    ],
    "correctAnswer": 2,
    "explanation": "`sizeof` 的结果类型是 `size_t`，一般是 `unsigned int` 或 `unsigned long`，用来表示“大小 / 长度”。"
  },
  {
    "id": 7,
    "question": "已知在某平台上 `int` 占 4 字节，`double` 占 8 字节，表达式 `5 * 2.0` 的结果占用多少字节？",
    "options": [
      "A. 4",
      "B. 8",
      "C. 12",
      "D. 16",
      "E. 2"
    ],
    "correctAnswer": 1,
    "explanation": "- 5 是 `int`，2.0 是 `double`。\n- 运算前 5 会被提升为 `double`，结果类型是 `double`。\n- `double` 占 8 字节。"
  },
  {
    "id": 8,
    "question": "下列哪个基础类型转换最容易导致“精度丢失”？",
    "options": [
      "A. `float -> double`",
      "B. `int -> long`",
      "C. `int -> double`",
      "D. `double -> float`",
      "E. `char -> int`"
    ],
    "correctAnswer": 3,
    "explanation": "`double`（双精度，大约 15 位有效数字）→ `float`（单精度，大约 6–7 位）时，可能丢失小数位甚至出现溢出。\nA / B / C / E 都是从“小”往“大”装，一般更安全。"
  },
  {
    "id": 9,
    "question": "隐式转换发生的场景 以下关于隐式类型转换（自动转换）的说法中，哪一项是错误的？",
    "options": [
      "A. 在赋值语句中，当右值类型与左值不同时，会发生隐式转换。",
      "B. 在算术运算中，不同类型一起运算会触发隐式转换。",
      "C. 函数调用时，实参类型与形参类型不完全匹配时可能发生隐式转换。",
      "D. 在 `if` 条件中，把 `int` 等非 `bool` 类型用作条件，会转成 `bool`。",
      "E. 所有类型转换都必须写 `static_cast`，C++ 不会自动转换。"
    ],
    "correctAnswer": 4,
    "explanation": "A / B / C / D 都是典型的 隐式转换场景。\nE 与事实相反——C++ 中隐式转换是非常普遍存在的。"
  },
  {
    "id": 10,
    "question": "关于 `static_cast` 在本节课涉及的用途，下列不属于它的作用的是：",
    "options": [
      "A. 在基础类型之间显式转换（如 `int` 转 `char`）。",
      "B. 把 `int` 转成 `double`，用于修正整数除法精度。",
      "C. 把一个整数看作字符来输出（如 `static_cast<char>(65)`）。",
      "D. 去掉一个变量的 `const` 属性。",
      "E. 在类的继承层次中，基类指针和派生类指针之间的安全转换。"
    ],
    "correctAnswer": 3,
    "explanation": "- 去掉 `const` 需要 `const_cast`，不在本节重点。\n- A / B / C / E 都是 `static_cast` 的合法用途。"
  },
  {
    "id": 11,
    "question": "整数 / 浮点除法与截断 执行代码： `cout << 10 / 4;` 输出结果是？",
    "options": [
      "A. 2.5",
      "B. 2",
      "C. 2.0",
      "D. 3",
      "E. 2.50"
    ],
    "correctAnswer": 1,
    "explanation": "10 和 4 都是 `int`，执行 整数除法：`(10 / 4 = 2)`，小数部分被直接丢掉。"
  },
  {
    "id": 12,
    "question": "执行代码： `cout << 10 / 4.0;` 输出结果是？",
    "options": [
      "A. 2",
      "B. 2.0",
      "C. 2.5",
      "D. 3",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "- `4.0` 是 `double`，10 会先提升为 `double`。\n- 执行浮点除法，结果 `(10.0 / 4.0 = 2.5)`。"
  },
  {
    "id": 13,
    "question": "阅读代码并写出 c 的值： `double a = 5.6; int b = 2; int c = a + b;` c 的最终值是？",
    "options": [
      "A. 7.6",
      "B. 8",
      "C. 7",
      "D. 5",
      "E. 0"
    ],
    "correctAnswer": 2,
    "explanation": "1. 表达式 `a + b`：`double` + `int` -> `double`，结果为 7.6。\n2. 赋值给 `int c` 时发生截断：`7.6 -> 7`。"
  },
  {
    "id": 14,
    "question": "阅读代码，判断输出结果： `cout << (int)3.8 + 3.2;` 输出为？",
    "options": [
      "A. 7",
      "B. 7.0",
      "C. 6",
      "D. 6.2",
      "E. 6.0"
    ],
    "correctAnswer": 3,
    "explanation": "1. `(int)3.8` 先执行，结果是 3（截断）。\n2. `3 + 3.2`：`int` + `double` -> `double`，结果 6.2。"
  },
  {
    "id": 15,
    "question": "已知 `char ch = 'C';`（假设 `'C'` 的编码是 67），执行： `ch = ch + 2;` 之后 `ch` 中存的字符是？",
    "options": [
      "A. `'C'`",
      "B. `'D'`",
      "C. `'E'`",
      "D. 69",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "1. ch + 2：char 先提升为 int，67 + 2 = 69。\n2. 赋值回 char：69 被当作编码，对应字符 'E'。"
  },
  {
    "id": 16,
    "question": "阅读代码，判断输出： int a = 65; cout << static_cast<char>(a); 输出是？",
    "options": [
      "A. 65",
      "B. A",
      "C. a",
      "D. 编译错误",
      "E. 运行异常"
    ],
    "correctAnswer": 1,
    "explanation": "static_cast<char>(65) 把整数 65 当作 ASCII 编码输出，即 'A'。"
  },
  {
    "id": 17,
    "question": "已知： int a = 3, b = 4; float f = a / b; f 的值是？",
    "options": [
      "A. 0",
      "B. 0.0f",
      "C. 0.75f",
      "D. 1.0f",
      "E. 0.8f"
    ],
    "correctAnswer": 1,
    "explanation": "1. a / b 是 整数除法 → 结果是 0。\n2. 0 赋给 float f，得到 0.0f。"
  },
  {
    "id": 18,
    "question": "若要让上题中 f 的值正确为 0.75f，下列表达式哪一个是正确的修改方式？",
    "options": [
      "A. float f = (float)(a / b);",
      "B. float f = a / (float)b;",
      "C. float f = (a + b) / 4;",
      "D. float f = (int)a / (int)b;",
      "E. float f = (double)a / (double)b;"
    ],
    "correctAnswer": 1,
    "explanation": "- 需要“先把其中一个数变成浮点，再做除法”：\na / (float)b ： 3 / 4.0f -> 0.75f。\n- A 仍然是整数除法后再转型，结果还是 0。\n- E 也可以算正确值，但类型是 double，而不是题目中的 float。"
  },
  {
    "id": 19,
    "question": "auto 推导与混合类型 阅读代码： auto v1 = 3 + 2.0; auto v2 = 'A' + 1; 下列说法正确的是？",
    "options": [
      "A. v1 是 int，v2 是 char。",
      "B. v1 是 double，v2 是 int。",
      "C. v1 是 float，v2 是 char。",
      "D. v1 和 v2 都是 double。",
      "E. v1 和 v2 都是 int。"
    ],
    "correctAnswer": 1,
    "explanation": "- 3 + 2.0：int + double -> double，所以 v1 是 double。\n- 'A' + 1：char 先整型提升为 int（65），再加 1 还是 int，值为 66。"
  },
  {
    "id": 20,
    "question": "阅读代码并判断输出（假设默认输出格式）： int x = 5; double y = x / 2; cout << y; 输出更接近哪一项？",
    "options": [
      "A. 2.5",
      "B. 2",
      "C. 2.0",
      "D. 3",
      "E. 0"
    ],
    "correctAnswer": 1,
    "explanation": "1. x / 2 是整数除法 → 结果为 2。\n2. 2 赋值给 double y，变成 2.0。\n3. 默认格式下 cout 可能显示成 2（但底层值是 2.0）。"
  },
  {
    "id": 21,
    "question": "阅读代码，判断输出： float f = 1.23456789f; cout << (int)f; 输出为？",
    "options": [
      "A. 1",
      "B. 1.23456",
      "C. 123456789",
      "D. 0",
      "E. 随机值"
    ],
    "correctAnswer": 0,
    "explanation": "(int)f 进行截断，只保留整数部分 → 1。"
  },
  {
    "id": 22,
    "question": "阅读代码，分析执行步骤： int i = 5; float f = 2.5f; double d = (double)(i + f); 关于转换顺序，下列说法正确的是？",
    "options": [
      "A. 先把 f 转成 int，再 i + f，结果再转成 double。",
      "B. 先把 i 转成 float，i + f 得到 float，最后转 double。",
      "C. 先把 i 和 f 都转成 double，再相加。",
      "D. 不发生任何隐式转换，直接相加后转 double。",
      "E. 先把 i 转成 double，再与 f 相加。"
    ],
    "correctAnswer": 1,
    "explanation": "- i + f：int 会隐式提升为 float，结果是 float。\n- 最后外层 (double)(...) 把该 float 结果转为 double。"
  },
  {
    "id": 23,
    "question": "阅读代码，判断 avg 的值： int total = 10; int count = 4; double avg = static_cast<double>(total) / count; avg 的值为？",
    "options": [
      "A. 2",
      "B. 2.0",
      "C. 2.5",
      "D. 4.0",
      "E. 1.0"
    ],
    "correctAnswer": 2,
    "explanation": "- static_cast<double>(total) 让 10 先变成 10.0。\n- 10.0 / 4 → 浮点除法，得到 2.5。"
  },
  {
    "id": 24,
    "question": "有符号 / 无符号与溢出 阅读代码： unsigned int u = 10; int i = -20; cout << (u + i > 0); 输出是 1（true）还是 0（false）？",
    "options": [
      "A. 0",
      "B. 1",
      "C. 编译错误",
      "D. 程序崩溃",
      "E. -10"
    ],
    "correctAnswer": 1,
    "explanation": "- u 是 unsigned int，i 是 int。\n- 表达式 u + i 时，i 会被转换为 unsigned int，-20 变成一个很大的正数。\n- “很大的正数 + 10” 当然大于 0，所以条件为真，输出 1。"
  },
  {
    "id": 25,
    "question": "计算百分比时，初学者常写出这样的代码： int score = 80; int total = 100; double rate = score / total; rate 的实际值是？",
    "options": [
      "A. 0.8",
      "B. 80.0",
      "C. 0.0",
      "D. 1.0",
      "E. 0.80"
    ],
    "correctAnswer": 2,
    "explanation": "- score / total 是整数除法：80 / 100 = 0。\n- 0 再赋给 double rate，得到 0.0。\n- 想要 0.8，应写为：rate = static_cast<double>(score) / total;。"
  },
  {
    "id": 26,
    "question": "阅读代码并推断结果（假设 int 为 32 位）： int x = 2147483647; // 假设为 int 的最大值 x = x + 1; cout << x; 下列说法更贴近标准？",
    "options": [
      "A. 输出 2147483648。",
      "B. 自动升级为 long long，输出 2147483648。",
      "C. 发生整数溢出，行为未定义（很多实现中会“绕回”成负数）。",
      "D. 抛出异常。",
      "E. 保持不变，仍是 2147483647。"
    ],
    "correctAnswer": 2,
    "explanation": "- 超过 int 可表示的范围，属于 溢出，标准规定为 未定义行为。\n- 在大多数常见平台上会“绕回”，变成一个负数（通常是 -2147483648）。"
  },
  {
    "id": 27,
    "question": "为什么在 C++ 中更推荐使用 static_cast 而不是 (type) 这种 C 风格强制转换？",
    "options": [
      "A. C 风格转换无法通过编译。",
      "B. C 风格转换比 static_cast 慢很多。",
      "C. C 风格转换太“万能”，容易做出危险的转换，阅读代码时不够醒目。",
      "D. static_cast 才能进行基本类型之间的转换。",
      "E. static_cast 会自动检查所有越界问题。"
    ],
    "correctAnswer": 2,
    "explanation": "- C 风格转换语法简单但不够明确，也可能执行一些高风险转换（类似 reinterpret_cast）。\n- static_cast 语义明确，更容易在代码审查时看出“这里发生了类型转换”。"
  },
  {
    "id": 28,
    "question": "字节范围与溢出、布尔转换 假设在某实现中 char 是 8 位有符号类型（范围约为 -128~127）。执行： char c = 130; cout << (int)c; 下列说法更合适的是？",
    "options": [
      "A. 一定输出 130。",
      "B. 一定输出 -126。",
      "C. 一定输出 2。",
      "D. 会发生实现相关的溢出，结果是不确定的某个整数。",
      "E. 编译错误。"
    ],
    "correctAnswer": 3,
    "explanation": "- 130 超出有符号 char 的正数范围，会发生溢出或截断。\n- 具体得到的值和平台实现有关，标准并不严格规定。\n- 用来提醒学生：小范围类型接收大数时有风险。"
  },
  {
    "id": 29,
    "question": "关于布尔值转换，下列说法正确的是？",
    "options": [
      "A. 只有 1 会转换为 true，其他都为 false。",
      "B. 所有非零整数都会转换为 true。",
      "C. 所有正数为 true，所有负数为 false。",
      "D. 所有非零整数为 false。",
      "E. 浮点数不能转换为 bool。"
    ],
    "correctAnswer": 1,
    "explanation": "- 规则是：0 为假，非 0 为真，不区分 1、2、-1 等。\n- 对浮点数也适用：0.0 为 false，其它值为 true。"
  },
  {
    "id": 30,
    "question": "阅读代码并判断输出（假设 unsigned int 为 32 位）： cout << 25u - 50; 输出大致为？",
    "options": [
      "A. -25",
      "B. 25",
      "C. 一个非常大的正整数（接近无符号整型的最大值）",
      "D. 0",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "- 25u 是无符号整型，50（有符号）会被转换为无符号。\n- 相当于在无符号世界里计算 25 - 50，出现 下溢（Underflow），结果会“绕到”一个很大的正数。"
  }
      ]
    }
  },
  {
    id: 'cpp-operators',
    category: 'C++编程基础',
    group: '5. 计算的引擎——运算符',
    title: '核心概念讲解',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg leading-relaxed">
          变量里存的是“数据”，而运算符就是对这些数据动手操作的工具。
        </p>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4 text-xl flex items-center gap-3">
                <Lightbulb size={24} /> 核心隐喻：烹饪技法
             </h4>
             <ul className="space-y-3">
                <li className="flex items-center gap-3">
                    <span className="text-2xl">🥕</span>
                    <span>变量 = <strong>食材</strong></span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-2xl">🥣</span>
                    <span>数据类型 = <strong>容器</strong></span>
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-2xl">👨‍🍳</span>
                    <span>运算符 = <strong>烹饪技法</strong> (切菜、煮饭、调味)</span>
                </li>
             </ul>
             <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800/50 text-sm text-indigo-800 dark:text-indigo-200">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <li>🔪 算术运算：切菜煮饭 (基础处理)</li>
                    <li>👅 逻辑运算：品尝味道 (判断好坏)</li>
                    <li>🔬 位运算：分子料理 (底层微操)</li>
                </ul>
             </div>
        </div>

        <div>
          <SectionHeader icon={Calculator} title="5.1 算术运算符" subtitle="加减乘除 + 取模 + 自增自减" />
          
          <div className="mb-8">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-4">5.1.1 基本算术运算符</h4>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
                <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500"/> 两个重要细节
                </h5>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <div className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-mono text-sm font-bold min-w-[3rem] text-center">/</div>
                        <div>
                            <strong className="block text-slate-800 dark:text-slate-200">整数 / 整数 = 整数</strong>
                            <span className="text-sm text-slate-500">小数部分被直接截掉 (不是四舍五入)</span>
                            <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded text-slate-600 dark:text-slate-400">
                                7 / 2; // 结果 3<br/>
                                5 / 4; // 结果 1
                            </div>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-mono text-sm font-bold min-w-[3rem] text-center">%</div>
                        <div>
                            <strong className="block text-slate-800 dark:text-slate-200">取模 (取余) 只适用于整数</strong>
                            <span className="text-sm text-slate-500">不能对 double 等小数使用</span>
                            <div className="mt-1 font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded text-slate-600 dark:text-slate-400">
                                5 % 2;   // ✅ 结果 1<br/>
                                5.0 % 2; // ❌ 编译错误
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.1-1：加减乘除与取模</h5>
            <CodeBlock 
                code={`#include <iostream>
using namespace std;

int main() {
    int a = 7;
    int b = 3;

    cout << "a + b = " << a + b << endl; // 10
    cout << "a - b = " << a - b << endl; // 4
    cout << "a * b = " << a * b << endl; // 21

    cout << "a / b = " << a / b << endl; // 2 （整数除法）
    cout << "a % b = " << a % b << endl; // 1 （7 除以 3 的余数）

    // 想要小数结果，可以让其中一个是浮点数
    cout << "7.0 / 3 = " << 7.0 / 3 << endl; // 2.33333...
    cout << "7 / 3.0 = " << 7 / 3.0 << endl; // 2.33333...

    return 0;
}`} 
                language="cpp"
            />
            
            <ArithmeticVisualizer />

            <div className="mt-6">
                 <QuizCard 
                    title="练习 5.1-A (判断 + 小陷阱)"
                    question="判断下列说法对错："
                    answer={`
- 9 / 4 的结果是 2.25 —— **❌ 错 (结果是 2)**
- 9 % 4 的结果是 1 —— **✅ 对**
- 5 % 2.0 在 C++ 中是合法的 —— **❌ 错 (取模不能用小数)**
- 想让 7 / 2 输出 3.5，可写成 7.0 / 2 —— **✅ 对**
`}
                    type="basic"
                 />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-4">5.1.2 自增、自减运算符 (++ 和 --)</h4>
            
            <IncrementVisualizer />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">++ (自增 1)</h5>
                    <ul className="text-sm space-y-1">
                        <li><code>++i</code> (前置): 先加，再用</li>
                        <li><code>i++</code> (后置): 先用，再加</li>
                    </ul>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800">
                    <h5 className="font-bold text-rose-700 dark:text-rose-300 mb-2">-- (自减 1)</h5>
                    <ul className="text-sm space-y-1">
                        <li><code>--i</code> (前置): 先减，再用</li>
                        <li><code>i--</code> (后置): 先用，再减</li>
                    </ul>
                </div>
            </div>

            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.1-2：单独使用时几乎等价</h5>
            <CodeBlock 
                code={`#include <iostream>
using namespace std;

int main() {
    int x = 5;

    x++;        // 等价于 x = x + 1;
    cout << "x++ 之后 x = " << x << endl; // 6

    ++x;        // 再加 1
    cout << "++x 之后 x = " << x << endl; // 7

    x--;        // 减 1
    cout << "x-- 之后 x = " << x << endl; // 6

    return 0;
}`} 
                language="cpp"
            />
            <p className="text-sm text-slate-500 mt-2 italic">在“单独一行使用”的情况下，++x 和 x++ 效果几乎没有区别。</p>

            <div className="mt-6">
                <QuizCard 
                    title="练习 5.1-B"
                    question={`假设 int x = 10; 下面四句各执行一次后，x 的值分别是多少？
\`\`\`cpp
x++;
++x;
x--;
--x;
\`\`\``}
                    answer={`
\`\`\`cpp
x=11 (x++)
x=12 (++x)
x=11 (x--)
x=10 (--x)
\`\`\`
`}
                    type="basic"
                />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-4">5.1.3 难点：前置 ++i 与 后置 i++ 的区别</h4>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800 mb-6">
                <h5 className="font-bold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <Zap size={18} /> 记忆口诀 (在表达式中)
                </h5>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                        <span className="bg-white dark:bg-slate-800 px-2 rounded font-mono font-bold text-amber-600 border border-amber-200 dark:border-amber-700">++i</span>
                        <span><strong>先加 1</strong>，然后把新值拿去算。</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="bg-white dark:bg-slate-800 px-2 rounded font-mono font-bold text-amber-600 border border-amber-200 dark:border-amber-700">i++</span>
                        <span><strong>先把旧值拿去算</strong>，算完后变量再加 1。</span>
                    </li>
                </ul>
            </div>

            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.1-3：前置和后置参与表达式的区别</h5>
            <CodeBlock 
                code={`#include <iostream>
using namespace std;

int main() {
    int a = 1;
    int b = 2;

    cout << "a + ++b = " << a + ++b << endl; // 4
    // 过程：b先变3，然后 1+3=4
    cout << "此时 b = " << b << endl;         // 3

    int c = 2;
    cout << "a + c++ = " << a + c++ << endl; // 3
    // 过程：先用c(2)算 1+2=3，算完c再变3
    cout << "此时 c = " << c << endl;         // 3

    return 0;
}`} 
                language="cpp"
            />

            <div className="mt-6">
                 <QuizCard 
                    title="练习 5.1-C (小陷阱)"
                    question="写出 x 和 y 的值：`int x = 3; int y = x++ + ++x;`"
                    answer={`
**结果：** \`x = 5\`, \`y = ?\` (通常是 8 或 7)

<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-100 dark:border-red-800">
<strong class="text-red-600 dark:text-red-400 block mb-1">⚠️ 严重警告</strong>
千万不要在同一个表达式中多次修改同一个变量！这是**未定义行为**，不同编译器结果可能不同。实际开发中绝对禁止。
</div>
`}
                    type="challenge"
                 />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="5.2 复合赋值运算符" subtitle="“在自己基础上再来一下”" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
             <div className="space-y-4">
                 <p className="leading-relaxed">
                    这里的“右边用了自己，再赋值给自己”非常常见，所以 C++ 提供了简写：
                 </p>
                 <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900">
                            <tr>
                                <th className="p-3">写法</th>
                                <th className="p-3">等价于</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr><td className="p-3 font-mono text-indigo-600">x += 5</td><td className="p-3 font-mono">x = x + 5</td></tr>
                            <tr><td className="p-3 font-mono text-indigo-600">x -= 5</td><td className="p-3 font-mono">x = x - 5</td></tr>
                            <tr><td className="p-3 font-mono text-indigo-600">x *= 5</td><td className="p-3 font-mono">x = x * 5</td></tr>
                            <tr><td className="p-3 font-mono text-indigo-600">x /= 5</td><td className="p-3 font-mono">x = x / 5</td></tr>
                            <tr><td className="p-3 font-mono text-indigo-600">x %= 5</td><td className="p-3 font-mono">x = x % 5</td></tr>
                        </tbody>
                    </table>
                 </div>
             </div>
             
             <div>
                <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.2-1：复合赋值的连续使用</h5>
                <CodeBlock 
                    code={`int main() {
    int x = 10;

    x += 5;  // 15
    x *= 2;  // 30
    x -= 6;  // 24
    x /= 4;  // 6
    x %= 5;  // 1

    return 0;
}`} 
                    language="cpp"
                />
             </div>
          </div>

          <QuizCard 
            title="练习 5.2-A (优先级陷阱)"
            question="判断 `x *= y + 1` 与 `x = x * y + 1` 是否等价？"
            answer={`
<strong class="text-red-500 block mb-2">不等价！ (≠)</strong>

复合赋值运算符的优先级非常低，右边会被看作一个整体（自动加括号）。

- \`x *= y + 1\`  等价于  \`x = x * (y + 1)\`
- \`x = x * y + 1\`  是先算 \`x*y\` 再加 1
`}
            type="challenge"
          />
        </div>

        <div>
          <SectionHeader icon={FunctionSquare} title="5.3 常用数学函数" subtitle="<cmath> 数学工具包" />
          
          <p className="mb-4">
             基本算术只能处理简单的加减乘除。更多“数学味”很重的运算，<code>&lt;cmath&gt;</code> 头文件提供了一整套函数。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {[
                  { func: 'pow(x, y)', desc: 'x 的 y 次方' },
                  { func: 'sqrt(x)', desc: 'x 的平方根' },
                  { func: 'abs(x)', desc: '绝对值' },
                  { func: 'ceil(x)', desc: '向上取整' },
                  { func: 'floor(x)', desc: '向下取整' }
              ].map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
                      <code className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1 text-sm">{item.func}</code>
                      <span className="text-[10px] text-slate-500">{item.desc}</span>
                  </div>
              ))}
          </div>

          <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.3-1：常用数学函数演示</h5>
          <CodeBlock 
            code={`#include <iostream>
#include <cmath> // 必须引入
using namespace std;

int main() {
    double x = 2.0, y = 3.0;
    cout << "pow(2, 3) = " << pow(x, y) << endl;   // 8

    cout << "sqrt(9)   = " << sqrt(9.0) << endl;   // 3

    cout << "abs(-5)   = " << abs(-5) << endl;     // 5

    double a = 3.14;
    cout << "ceil(3.14)  = " << ceil(a) << endl;   // 4
    cout << "floor(3.14) = " << floor(a) << endl;  // 3

    return 0;
}`} 
            language="cpp"
          />
          <p className="text-xs text-slate-500 mt-2 mb-6">注意：ceil 和 floor 虽然名字里有“整”，但返回类型仍是 double。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuizCard 
                title="练习 5.3-A (计算题)"
                question="直接写出结果："
                answer={`
- \`ceil(2.01) = 3\`
- \`floor(2.99) = 2\`
- \`abs(-12) = 12\`
- \`pow(2, 4) = 16\`
`}
                type="basic"
              />
              <QuizCard 
                title="练习 5.3-B (精度陷阱)"
                question="`sqrt(2.0) * sqrt(2.0) - 2.0` 的结果是 0 吗？"
                answer={`
<strong class="text-amber-600 block mb-1">不一定！(肉眼看不出区别，但计算机能)</strong>

浮点数计算存在微小的精度误差，结果可能是类似 \`4.44e-16\` 的极小值，而不是绝对的 0。
`}
                type="basic"
              />
          </div>
        </div>

        <div>
          <SectionHeader icon={ListOrdered} title="5.4 运算优先级" subtitle="一行里谁先算谁后算" />
          
          <p className="mb-4">
            当一个表达式中有好几种运算符时，如果没有括号，C++ 会按照运算优先级来排队。
          </p>

          <PriorityLadder />
          
          <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2 text-sm">示例 5.4-1：没有括号 vs 有括号</h5>
          <CodeBlock 
            code={`int a = 2, b = 3, c = 4;

int r1 = a + b * c;       // 先算 b*c(12)，再+a(2) = 14
int r2 = (a + b) * c;     // 先算 a+b(5)，再*c(4) = 20

bool r3 = a + b > c;      // 先算 a+b(5)，再比较 5 > 4 = true
bool r4 = a > b && b > c; // 先算比较，再做 && = false`} 
            language="cpp"
          />

          <div className="mt-6 grid grid-cols-1 gap-6">
             <QuizCard 
                title="练习 5.4-A (顺序 + 结果)"
                question="int a=2, b=3, c=4, d=5; 求 int y = (a + b) * c - d;"
                answer={`
1. 先算 (a+b) = 5
2. 再算 * c = 20
3. 最后 - d = 15
`}
                type="basic"
             />
             <QuizCard 
                title="练习 5.4-B (给表达式“加上护栏”)"
                question="为 `a + b * c - d / e` 加上括号，使其运算顺序一目了然。"
                answer={`
\`\`\`cpp
a + (b * c) - (d / e)
\`\`\`
`}
                type="basic"
             />
             <QuizCard 
                title="练习 5.4-C (判断题)"
                question="`x += y + 1;` 和 `x = (x + y) + 1;` 的结果总是一样的吗？"
                answer={`
**❌ 错！**

\`x += y + 1\` 等价于 \`x = x + (y + 1)\`。

虽然加法结合律通常成立，但在浮点数精度或溢出边缘时，计算顺序不同可能导致微小差异；若是乘法等其他运算则完全不同。
`}
                type="challenge"
             />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-operators-quiz',
    category: 'C++编程基础',
    group: '5. 计算的引擎——运算符',
    title: '专项练习',
    type: 'quiz',
    quizData: {
      title: '运算符专项测试',
      description: '本测试包含 25 道题目，覆盖算术、赋值、自增自减、逻辑关系、位运算等核心知识点。',
      questions: [
        {
          id: 1,
          type: 'single',
          question: "C++ 中，表达式 `14 % 5` 的结果是？",
          options: ["`2.8`", "`2`", "`4`", "`3`", "编译错误"],
          correctAnswer: "`4`",
          explanation: "`%` 是取模运算符（求余数），只对整数有效。`14 ÷ 5 = 2 ... 4`，余数为 4。"
        },
        {
          id: 2,
          type: 'single',
          question: "执行语句 `int x = 10; x += x -= x - x;` 后，`x` 的值是？",
          options: ["`10`", "`20`", "`0`", "`30`", "`40`"],
          correctAnswer: "`20`",
          explanation: "赋值运算符右结合。1. `x - x = 0`; 2. `x -= 0` (`x=10`); 3. `x += 10` (`x=20`)。"
        },
        {
          id: 3,
          type: 'single',
          question: "若 `int a = 5;`，执行 `a %= 3;` 后，`a` 的值是？",
          options: ["`1`", "`2`", "`3`", "`5`", "`0`"],
          correctAnswer: "`2`",
          explanation: "`a %= 3` 等价于 `a = a % 3`。`5 ÷ 3 = 1 ... 2`。"
        },
        {
          id: 4,
          type: 'single',
          question: "关于复合赋值运算符，`a *= b + 3` 的等价完整表达式是？",
          options: ["`a = a * b + 3`", "`a = (a * b) + 3`", "`a = a * (b + 3)`", "`a = a + 3 * b`", "`a = (a + 3) * b`"],
          correctAnswer: "`a = a * (b + 3)`",
          explanation: "右侧 `b + 3` 先整体求值，然后再与左侧 `a` 进行 `*=` 运算。"
        },
        {
          id: 5,
          type: 'single',
          question: "代码 `int i = 3; int k = (++i) + (++i) + (++i);` 的结果在 C++ 标准中属于？",
          options: ["`k = 15`", "`k = 18`", "`k = 12`", "未定义行为 (Undefined Behavior)", "编译错误"],
          correctAnswer: "未定义行为 (Undefined Behavior)",
          explanation: "同一个变量 `i` 在一个表达式中被多次修改且无明确序列点，其行为未定义。"
        },
        {
          id: 6,
          type: 'single',
          question: "下列哪个表达式在 C++ 中一定是编译错误？（假设 `a`,`b` 都是 `int`）",
          options: ["`a / b`", "`a % b`", "`a % 3.0`", "`a + 3.5`", "`a * (b - 2)`"],
          correctAnswer: "`a % 3.0`",
          explanation: "`%` 取模运算符要求两个操作数都为整数类型，`3.0` 是 `double`。"
        },
        {
          id: 7,
          type: 'single',
          question: "执行 `int x = 5, y; y = x++;` 后，`x` 和 `y` 的值分别是？",
          options: ["`x=6, y=6`", "`x=5, y=5`", "`x=6, y=5`", "`x=5, y=6`", "`x=6, y=0`"],
          correctAnswer: "`x=6, y=5`",
          explanation: "`x++` 是后置自增：先把 `x` 当前值 5 赋给 `y`，再让 `x` 自增变为 6。"
        },
        {
          id: 8,
          type: 'single',
          question: "执行 `int x = 5, y; y = ++x;` 后，`x` 和 `y` 的值分别是？",
          options: ["`x=6, y=6`", "`x=5, y=5`", "`x=6, y=5`", "`x=5, y=6`", "`x=6, y=0`"],
          correctAnswer: "`x=6, y=6`",
          explanation: "`++x` 是前置自增：`x` 先自增为 6，再把新值 6 赋给 `y`。"
        },
        {
          id: 9,
          type: 'single',
          question: "表达式 `y = x++ * 3;`（设 `x = 2`）的运算顺序是？",
          options: ["先 `x*3`，再 `x` 自增", "先 `x` 自增，再 `x*3`", "先取 `x` 的值参与乘法，乘法运算结束后 `x` 再自增", "不确定", "编译错误"],
          correctAnswer: "先取 `x` 的值参与乘法，乘法运算结束后 `x` 再自增",
          explanation: "`x++` 的值是“旧值”（2）。先用旧值 2 计算 `2 * 3 = 6` 赋给 `y`，之后 `x` 变为 3。"
        },
        {
          id: 10,
          type: 'single',
          question: "阅读代码，程序输出是什么？ `int x = 3; int y = x++ + ++x; cout << x << \" \" << y;`",
          options: ["`4 7`", "`5 7`", "不确定，属于未定义行为", "`4 8`", "`5 8`"],
          correctAnswer: "不确定，属于未定义行为",
          explanation: "对同一个变量 `x` 在一个表达式中既使用 `x++` 又使用 `++x`，修改顺序未明确。"
        },
        {
          id: 11,
          type: 'single',
          question: "阅读代码，哪一项是正确的描述？ `int i=1; int a=i++; int b=++i; int c=i--; int d=--i;`",
          options: ["执行完全部语句后，`i` 的值是 1", "语句 ① 和 ② 完全等价", "语句 ③ 和 ④ 完全等价", "`a = 1, b = 3, c = 3, d = 1`", "执行顺序不影响结果"],
          correctAnswer: "执行完全部语句后，`i` 的值是 1",
          explanation: "`i=1` -> `a=1`, `i=2` -> `b=3`, `i=3` -> `c=3`, `i=2` -> `d=1`, `i=1`。"
        },
        {
          id: 12,
          type: 'single',
          question: "在 C++ 中，表达式 `5 > 3 > 1` 的值是？",
          options: ["`true (1)`", "`false (0)`", "`2`", "`5`", "编译错误"],
          correctAnswer: "`false (0)`",
          explanation: "先算 `5 > 3` 结果为 `true (1)`，再算 `1 > 1` 结果为 `false (0)`。"
        },
        {
          id: 13,
          type: 'single',
          question: "逻辑与运算符 `&&` 具有“短路”特性。对于表达式 `A && B`，如果 `A` 为假，则：",
          options: ["`B` 不会被计算", "`B` 仍然会被计算", "程序报错", "整个表达式的值不确定", "`A` 和 `B` 同时计算"],
          correctAnswer: "`B` 不会被计算",
          explanation: "`A` 为 false 时，`A && B` 一定为 false，因此 C++ 不再计算 `B`。"
        },
        {
          id: 14,
          type: 'single',
          question: "下列表达式中，结果为 `true` 的是？",
          options: ["`!5`", "`((3 > 5) || (2 < 4))`", "`!(10 == 10)`", "`5 && 0`", "`false || false`"],
          correctAnswer: "`((3 > 5) || (2 < 4))`",
          explanation: "`3 > 5` 为假，`2 < 4` 为真，`false || true` 为真。"
        },
        {
          id: 15,
          type: 'single',
          question: "关于代码 `if (n != 0 && 10 / n > 1) ... (n=0)`，哪一项描述是正确的？",
          options: ["一定会发生除以 0 的错误", "条件恒为真", "条件恒为假", "不会发生除零，因为 `&&` 的短路特性", "代码无法通过编译"],
          correctAnswer: "不会发生除零，因为 `&&` 的短路特性",
          explanation: "`n != 0` 为假，短路求值，右边 `10 / n` 不会被执行。"
        },
        {
          id: 16,
          type: 'single',
          question: "运算符优先级的正确排序（从高到低）是？",
          options: ["`&& > + > =`", "`+ > && > =`", "`= > && > +`", "`&& > = > +`", "`+ > = > &&`"],
          correctAnswer: "`+ > && > =`",
          explanation: "算术 > 逻辑 > 赋值。"
        },
        {
          id: 17,
          type: 'single',
          question: "二进制位运算 `5 & 14` 的结果是？",
          options: ["`1`", "`4`", "`5`", "`14`", "`15`"],
          correctAnswer: "`4`",
          explanation: "`5(0101) & 14(1110) = 0100 (4)`。"
        },
        {
          id: 18,
          type: 'single',
          question: "表达式 `1 << 3` 的结果相当于？",
          options: ["`1 * 3`", "`1 + 3`", "`1 * 2^3`", "`1 / 2^3`", "`31`"],
          correctAnswer: "`1 * 2^3`",
          explanation: "左移 `n` 位，相当于乘以 `2^n`。"
        },
        {
          id: 19,
          type: 'single',
          question: "若 `short a = 5;`，表达式 `~a` 的结果取决于？",
          options: ["仅取决于 `a` 的值", "取决于操作系统的位数", "取决于 `short` 是否有符号以及其位数", "总是 `-6`", "总是 `0`"],
          correctAnswer: "取决于 `short` 是否有符号以及其位数",
          explanation: "`~` 是按位取反，结果数值取决于符号位和位数。"
        },
        {
          id: 20,
          type: 'single',
          question: "关于逗号运算符，`x = (a = 3, 6 * 3);` 中 `x` 的值是？",
          options: ["`3`", "`6`", "`9`", "`18`", "编译错误"],
          correctAnswer: "`18`",
          explanation: "从左到右执行，取最后一个表达式的值。"
        },
        {
          id: 21,
          type: 'single',
          question: "`sizeof(double)` 在常见 64 位系统上的值通常是？",
          options: ["`4`", "`8`", "`10`", "`16`", "`2`"],
          correctAnswer: "`8`",
          explanation: "`double` 通常占用 8 字节。"
        },
        {
          id: 22,
          type: 'single',
          question: "数学函数 `pow(2, 3)` 的返回值类型是？",
          options: ["`int`", "`float`", "`double`", "`long`", "`void`"],
          correctAnswer: "`double`",
          explanation: "`pow`, `sqrt` 等函数默认返回 `double`。"
        },
        {
          id: 23,
          type: 'single',
          question: "在使用数学函数如 `sqrt()` 或 `pow()` 之前，必须包含？",
          options: ["`#include <math.h>`", "`#include <cmath>`", "`#include <algorithm>`", "`#include <iostream>`", "A 和 B 中至少包含一个"],
          correctAnswer: "A 和 B 中至少包含一个",
          explanation: "推荐 `<cmath>`，但也支持 `<math.h>`。"
        },
        {
          id: 24,
          type: 'single',
          question: "表达式 `(int)3.5 + 4.5` 的值是？",
          options: ["`8.0`", "`7.5`", "`7`", "`8`", "`7.0`"],
          correctAnswer: "`7.5`",
          explanation: "`(int)3.5=3`。`3 + 4.5 = 7.5` (`double`)。"
        },
        {
          id: 25,
          type: 'single',
          question: "`int a=2, b=3, c=4; int x = a + b * c - 8 / 2;` `x` 的值是？",
          options: ["`10`", "`8`", "`6`", "不确定", "除以 0 错误"],
          correctAnswer: "`10`",
          explanation: "`2 + 12 - 4 = 10`。"
        }
      ]
    }
  },
  {
    id: 'cpp-practice-ex-1',
    category: 'C++编程基础',
    group: '5. 计算的引擎——运算符',
    title: '编程实战：数字分离器',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：数字分离器',
      description: '编写一个程序，定义一个三位整数 `num = 456`，分别计算并输出它的个位、十位和百位数字。\n考察点：取模运算 `%` 和 整数除法 `/`。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int num = 456;
    // TODO: 分别计算个位(units)、十位(tens)、百位(hundreds)
    
    // cout << "百位: " << hundreds << endl;
    // ...
    return 0;
}`,
      hints: ["个位 = num % 10", "十位 = (num / 10) % 10", "百位 = num / 100"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int num = 456;
    
    int units = num % 10;
    int tens = (num / 10) % 10;
    int hundreds = num / 100;

    cout << "百位: " << hundreds << endl;
    cout << "十位: " << tens << endl;
    cout << "个位: " << units << endl;

    return 0;
}`
    }
  },
  {
    id: 'cpp-practice-ex-2',
    category: 'C++编程基础',
    group: '5. 计算的引擎——运算符',
    title: '编程实战：距离计算器',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：两点间距离计算器',
      description: '已知平面上两点 A(0, 0) 和 B(3, 4)，计算并输出它们之间的距离。\n公式：Distance = sqrt((x1-x2)^2 + (y1-y2)^2)。',
      initialCode: `#include <iostream>
#include <cmath>    // 用于 sqrt 和 pow
#include <iomanip>  // 用于 setprecision
using namespace std;

int main() {
    double x1 = 0, y1 = 0;
    double x2 = 3, y2 = 4;
    
    // TODO: 计算距离 distance
    
    return 0;
}`,
      hints: ["sqrt(pow(x1-x2, 2) + ...)", "fixed << setprecision(2)"],
      solutionCode: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    double x1 = 0, y1 = 0;
    double x2 = 3, y2 = 4;

    double distance = sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));

    cout << fixed << setprecision(2);
    cout << "A和B之间的距离是: " << distance << endl;

    return 0;
}`
    }
  },
  {
    id: 'cpp-practice-ex-3',
    category: 'C++编程基础',
    group: '5. 计算的引擎——运算符',
    title: '编程实战：异或交换',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：不用临时变量交换数据',
      description: '定义两个整数 `a = 10` 和 `b = 20`，在不使用第三个临时变量的情况下交换它们的值。\n要求：使用位运算（异或 `^`）实现。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    cout << "交换前: a=" << a << ", b=" << b << endl;

    // TODO: 使用异或交换 a 和 b
    
    cout << "交换后: a=" << a << ", b=" << b << endl;
    return 0;
}`,
      hints: ["a = a ^ b", "b = a ^ b", "a = a ^ b"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    cout << "交换前: a=" << a << ", b=" << b << endl;

    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    cout << "交换后: a=" << a << ", b=" << b << endl;
    return 0;
}`
    }
  },
  {
    id: 'cpp-practice',
    category: 'C++编程基础',
    title: '7. 课程回顾与总结',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p>理论学完了，让我们通过代码来解决实际问题。</p>

        <PracticeChallenge 
            id={1}
            title="自我介绍程序"
            desc="编写一个程序，要求用户输入姓名、年龄、班级，然后格式化输出一段自我介绍。"
            code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name, class_name;
    int age;

    cout << "请输入姓名: ";
    cin >> name;
    cout << "请输入年龄: ";
    cin >> age;
    cout << "请输入班级: ";
    cin >> class_name;

    cout << "大家好，我是" << name << "，来自" << class_name 
         << "，今年" << age << "岁。" << endl;
    return 0;
}`}
        />

        <PracticeChallenge 
            id={2}
            title="BMI 计算器"
            desc="输入体重(kg)和身高(m)，计算 BMI = 体重 / (身高 * 身高)。"
            code={`#include <iostream>
using namespace std;

int main() {
    double weight, height, bmi;
    
    cout << "请输入体重(kg): ";
    cin >> weight;
    cout << "请输入身高(m): ";
    cin >> height;

    bmi = weight / (height * height);

    cout << "您的 BMI 指数为: " << bmi << endl;
    return 0;
}`}
        />

        <PracticeChallenge 
            id={3}
            title="简单的年龄换算器"
            desc="输入年龄（岁），输出大概活了多少月、多少天。注意数据范围溢出问题。"
            code={`#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "请输入您的年龄: ";
    cin >> age;

    int months = age * 12;
    long days = age * 365; // 用 long 防止数字过大溢出

    cout << "您已经度过了约 " << months << " 个月，" 
         << days << " 天。" << endl;
    return 0;
}`}
        />

        <div className="mt-8 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 p-10 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400" size={32} />
                本章通关小结
            </h3>
            <p className="mb-6 opacity-90 text-lg">恭喜你完成了 C++ 最基础部分的学习！我们已经构建了坚实的地基：</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-emerald-300 mb-1">变量与类型</strong>
                    <span className="text-sm opacity-80">学会了用 int, double, string 等“容器”存储数据。</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-sky-300 mb-1">输入输出</strong>
                    <span className="text-sm opacity-80">掌握了 cin/cout 和 iomanip 的交互魔法。</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-amber-300 mb-1">运算逻辑</strong>
                    <span className="text-sm opacity-80">理解了算术运算、自增自减及类型转换的奥秘。</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium bg-black/20 p-4 rounded-lg inline-block">
                <span>🚀 下一步：</span>
                <span className="opacity-90">我们将学习如何控制程序的流程（条件判断与循环），让程序具备逻辑判断的能力！</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-comprehensive-quiz',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '选择题',
    title: '综合选择题 (50题)',
    type: 'quiz',
    quizData: {
      title: 'C++ 基础综合测试',
      description: '本测试包含 50 道精选单项选择题，覆盖变量、类型、运算、I/O 等核心知识点。请仔细阅读代码和选项。',
      questions: [
        // --- Group 1: 变量与初始化、命名 ---
        {
          id: 1,
          type: 'single',
          question: "关于下面代码，哪一项说法正确？\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << x << endl;\n    int x = 10;\n    return 0;\n}\n```",
          options: ["能正常编译运行，输出 10", "能正常编译运行，输出一个随机数", "编译错误，因为 x 在使用前未声明", "编译错误，因为 x 是关键字", "运行时错误"],
          correctAnswer: "编译错误，因为 x 在使用前未声明",
          explanation: "变量 `x` 在使用 `cout << x` 时还未声明。C++ 必须先声明后使用。"
        },
        {
          id: 2,
          type: 'single',
          question: "下列哪个变量声明是“只声明、不初始化”？",
          options: ["`int a = 0;`", "`double b(3.14);`", "`int c{5};`", "`int d;`", "`string s = \"hi\";`"],
          correctAnswer: "`int d;`",
          explanation: "`int d;` 只是告诉编译器有一个叫 `d` 的整数变量，但没有给它赋初值。"
        },
        {
          id: 3,
          type: 'single',
          question: "关于下列代码，哪一个选项给出了变量 a, b, c, d 的最终值？\n```cpp\nint a = 10;\nint b(a);\nint c{a + b};\na = 5;\nint d = c;\n```",
          options: ["a=5, b=10, c=20, d=20", "a=10, b=10, c=20, d=20", "a=5, b=5,  c=10, d=10", "a=5, b=10, c=15, d=15", "a=10, b=10, c=15, d=15"],
          correctAnswer: "a=5, b=10, c=20, d=20",
          explanation: "1. `a=10`。2. `b` 初始化为 `a` 的值 (10)。3. `c` 初始化为 `a+b` (20)。4. `a` 被修改为 5。5. `d` 初始化为 `c` 的值 (20)。"
        },
        {
          id: 4,
          type: 'single',
          question: "下面关于标识符命名的说法，错误的是？",
          options: ["`student_score` 是合法标识符", "`double` 不能作为变量名", "`_total` 是合法标识符", "`1stNumber` 是合法标识符", "`Name` 与 `name` 是两个不同变量"],
          correctAnswer: "`1stNumber` 是合法标识符",
          explanation: "标识符不能以数字开头。`1stNumber` 非法。"
        },
        {
          id: 5,
          type: 'single',
          question: "关于以下变量声明，哪一项描述正确？\n```cpp\nint m = 1, n = 2, p;\n```",
          options: ["三个变量都已初始化", "三个变量都未初始化", "只有 m 和 n 初始化了，p 未初始化", "只有 p 初始化了", "以上说法都不对"],
          correctAnswer: "只有 m 和 n 初始化了，p 未初始化",
          explanation: "`p` 没有被赋值，属于未初始化状态。"
        },
        {
          id: 6,
          type: 'single',
          question: "下列哪个变量名在标准 C++ 中是非法的？",
          options: ["`_count`", "`sum_of_score`", "`classroom1`", "`total$`", "`MAX_VALUE`"],
          correctAnswer: "`total$`",
          explanation: "`$` 符号不是合法的标识符字符（标准 C++）。"
        },
        {
          id: 7,
          type: 'single',
          question: "关于连锁赋值，哪段代码是合法且行为符合“x, y, z 都被赋值为 5”的？",
          options: ["`int x = y = z = 5;`", "`int x, y, z = 5;`", "`int x, y, z; x = y = z = 5;`", "`int x(5), y(5), z;`", "`int x, y(5), z(5);`"],
          correctAnswer: "`int x, y, z; x = y = z = 5;`",
          explanation: "必须先定义变量，才能使用连锁赋值 `x = y = z = 5`。"
        },
        {
          id: 8,
          type: 'single',
          question: "阅读代码，哪一项是正确描述？\n```cpp\nint a = 1;\nint b = a;\na = 2;\nint c{a};\nb = 3;\n```",
          options: ["a=1, b=1, c=2", "a=2, b=1, c=2", "a=2, b=3, c=2", "a=1, b=3, c=1", "a=3, b=3, c=3"],
          correctAnswer: "a=2, b=3, c=2",
          explanation: "`a` 最终被改为 2；`b` 最终被改为 3；`c` 初始化时 `a` 已经是 2，所以 `c` 是 2。"
        },
        // --- Group 2: 基本类型与 string、输出格式 ---
        {
          id: 9,
          type: 'single',
          question: "下列哪一项最适合作为“是否登录成功”的变量类型？",
          options: ["int", "double", "char", "bool", "string"],
          correctAnswer: "bool",
          explanation: "逻辑状态最适合用 `bool`。"
        },
        {
          id: 10,
          type: 'single',
          question: "在 64 位常见环境中，下列哪种类型通常占用的字节数最多？",
          options: ["int", "short", "char", "double", "bool"],
          correctAnswer: "double",
          explanation: "通常 `double` 占 8 字节，`int` 占 4 字节。"
        },
        {
          id: 11,
          type: 'single',
          question: "关于 char 和 string，哪一项说法正确？",
          options: ["char 可以存放一整句文字", "string 必须用单引号 ' ' 包裹", "char 和 string 本质完全相同", "string 需要 #include <string>", "char 不能用于输出"],
          correctAnswer: "string 需要 #include <string>",
          explanation: "`string` 是标准库类型，必须包含 `<string>` 头文件。"
        },
        {
          id: 12,
          type: 'single',
          question: "下面代码的输出是？\n```cpp\nstring school = \"嘉庚学院\";\nstring major  = \"计算机科学\";\ncout << \"我在\" << school << \"学习\" << major << \"。\" << endl;\n```",
          options: ["我在 嘉庚学院 学习 计算机科学 。", "我在 嘉庚学院 学习计算机科学。", "我在嘉庚学院学习计算机科学。", "我在 \"嘉庚学院\" 学习 \"计算机科学\"。", "编译错误"],
          correctAnswer: "我在嘉庚学院学习计算机科学。",
          explanation: "`<<` 拼接时不会自动加空格。"
        },
        {
          id: 13,
          type: 'single',
          question: "关于 `<iomanip>` 中的 `setw`，下面说法正确的是？\n```cpp\nint x = 42;\ncout << setw(5) << x << endl;\ncout << setw(5) << x << endl;\n```",
          options: ["setw(5) 会一直生效，直到手动关闭", "setw(5) 只影响紧跟着的那一次输出", "会在数字右侧补空格", "必须和 setfill 一起用，否则编译错误", "setw 只能用于浮点数"],
          correctAnswer: "setw(5) 只影响紧跟着的那一次输出",
          explanation: "`setw` 是非粘性（non-persistent）的，只对下一次输出有效。"
        },
        {
          id: 14,
          type: 'single',
          question: "下面关于 `setprecision` 和 `fixed` 的描述，哪一项正确？",
          options: ["只用 setprecision(3) 时，一定是保留 3 位小数", "fixed 配合 setprecision(3) 时，才表示保留 3 位小数", "setprecision 只能用于整数输出", "fixed 只能用于科学计数法", "setprecision 会改变变量本身的值"],
          correctAnswer: "fixed 配合 setprecision(3) 时，才表示保留 3 位小数",
          explanation: "单独用 `setprecision` 控制的是有效数字位数；配合 `fixed` 才是控制小数点后的位数。"
        },
        {
          id: 15,
          type: 'single',
          question: "阅读代码，输出更接近哪一项？\n```cpp\ndouble pi = 3.1415926;\ncout << fixed << setprecision(2) << pi << endl;\n```",
          options: ["3.1", "3.14", "3.142", "3.1415926", "3"],
          correctAnswer: "3.14",
          explanation: "保留两位小数，四舍五入。"
        },
        {
          id: 16,
          type: 'single',
          question: "阅读代码，输出形式最接近哪一选项？\n```cpp\nint a = 5, b = 50, c = 500;\ncout << setw(8) << setfill('*') << a << endl;\ncout << setw(8) << setfill('*') << b << endl;\ncout << setw(8) << setfill('*') << c << endl;\n```",
          options: ["`*****5` ...", "`*******5` ...", "`5*******` ...", "`***5` ...", "编译错误"],
          correctAnswer: "`*******5` ...",
          explanation: "域宽 8，默认右对齐，左边补星号。5 只有 1 位，所以补 7 个星号。"
        },
        // --- Group 3: 类型转换 ---
        {
          id: 17,
          type: 'single',
          question: "关于整型提升，下列说法正确的是？",
          options: ["char 与 short 在运算前会自动提升为 double", "char 与 short 在运算前会自动提升为 int", "bool 在运算中会被当作 double", "int 会自动降级为 short 提高效率", "所有整数类型都会统一提升为 long long"],
          correctAnswer: "char 与 short 在运算前会自动提升为 int",
          explanation: "整数运算中，小整数类型会自动提升为 `int`。"
        },
        {
          id: 18,
          type: 'single',
          question: "阅读代码，输出是什么？\n```cpp\nchar c = 'A'; // ASCII 65\nshort s = 2;\ncout << c + s << endl;\n```",
          options: ["A2", "C", "67", "65", "编译错误"],
          correctAnswer: "67",
          explanation: "65 + 2 = 67。"
        },
        {
          id: 19,
          type: 'single',
          question: "关于自动类型转换，下列表达式的结果中，类型为 double 的是？",
          options: ["3 + 4", "3 + 4.0", "'A' + 1", "true + 10", "5 / 2"],
          correctAnswer: "3 + 4.0",
          explanation: "整数 + 浮点数 -> 浮点数。"
        },
        {
          id: 20,
          type: 'single',
          question: "阅读代码，avg1 和 avg2 的值分别是？\n```cpp\nint total = 7;\nint count = 2;\ndouble avg1 = total / count;\ndouble avg2 = static_cast<double>(total) / count;\n```",
          options: ["avg1=3.5, avg2=3.5", "avg1=3,   avg2=3.5", "avg1=3.5, avg2=3", "avg1=3,   avg2=3", "编译错误"],
          correctAnswer: "avg1=3,   avg2=3.5",
          explanation: "`avg1`: 整数除法 7/2=3，再转 double 为 3.0。`avg2`: 7.0/2=3.5。"
        },
        {
          id: 21,
          type: 'single',
          question: "关于赋值转换，下列哪段代码一定会导致“截断小数部分”？",
          options: ["`double d = 3;`", "`double d = 3.14; int x = d;`", "`int x = 3; double d = x;`", "`float f = 3.14f; double d = f;`", "`double d = 3.0 / 2;`"],
          correctAnswer: "`double d = 3.14; int x = d;`",
          explanation: "浮点数赋给整数，小数部分被截断。"
        },
        {
          id: 22,
          type: 'single',
          question: "阅读代码，输出通常会是什么？（假设 32 位 int）\n```cpp\nint a = -1;\nunsigned int b = a;\ncout << a << \" \" << b << endl;\n```",
          options: ["-1 -1", "-1 0", "-1 和 一个很大的正数", "0 -1", "编译错误"],
          correctAnswer: "-1 和 一个很大的正数",
          explanation: "-1 的补码在无符号数看来是一个非常大的正数（通常是 4294967295）。"
        },
        {
          id: 23,
          type: 'single',
          question: "关于强制转换，下面语句中能正确得到 3.5 的是？（int a=7,b=2;）",
          options: ["double x = a / b;", "double x = (double)(a / b);", "double x = (double)a / b;", "double x = a / (double)b;", "C 和 D"],
          correctAnswer: "C 和 D",
          explanation: "必须在除法发生前将至少一个操作数转为浮点数。"
        },
        {
          id: 24,
          type: 'single',
          question: "关于 char 与 int 的转换，哪一项说法正确？",
          options: ["char 不能转换为 int", "'A' + 1 的结果类型是 char", "int code = 'A'; 会自动把字符转换为对应的整数编码", "static_cast<char>(65) 是非法转换", "char 在内存中不占字节"],
          correctAnswer: "int code = 'A'; 会自动把字符转换为对应的整数编码",
          explanation: "char 本质是小整数，可以自动转为 int。"
        },
        {
          id: 25,
          type: 'single',
          question: "阅读代码，输出是什么？\n```cpp\nint a = 3;\ndouble b = 2.5;\nauto v1 = a + b;\nauto v2 = 'A' + 1;\ncout << v1 << \" \" << v2 << endl;\n```",
          options: ["5.5 66", "5.5 B", "5.0 66", "5.5 65", "编译错误"],
          correctAnswer: "5.5 66",
          explanation: "`v1` 是 double (5.5)。`v2` 是 int (65+1=66)。"
        },
        // --- Group 4: 算术、自增自减、复合赋值、数学函数 ---
        {
          id: 26,
          type: 'single',
          question: "关于表达式 `7 / 2` 和 `7.0 / 2`，哪项描述正确？",
          options: ["两者值相同，都是 3", "前者为 3，后者为 3.5", "前者为 3.5，后者为 3.5", "前者为 3.5，后者为 3", "两个都会编译错误"],
          correctAnswer: "前者为 3，后者为 3.5",
          explanation: "整数除法 vs 浮点除法。"
        },
        {
          id: 27,
          type: 'single',
          question: "若 `int a = 5;` 执行 `a %= 3;` 后，`a` 为多少？",
          options: ["1", "2", "3", "5", "0"],
          correctAnswer: "2",
          explanation: "5 % 3 = 2。"
        },
        {
          id: 28,
          type: 'single',
          question: "关于表达式 `a *= b + 3`，正确理解是？",
          options: ["a = (a * b) + 3", "a = a * (b + 3)", "a = (a + b) * 3", "a = (a + 3) * b", "取决于编译器"],
          correctAnswer: "a = a * (b + 3)",
          explanation: "复合赋值运算符右侧被视为一个整体（相当于加括号）。"
        },
        {
          id: 29,
          type: 'single',
          question: "阅读代码，输出是什么？\n```cpp\nint x = 5, y;\ny = x++ + 2;\ncout << x << \" \" << y << endl;\n```",
          options: ["5 7", "5 8", "6 7", "6 8", "不确定"],
          correctAnswer: "6 7",
          explanation: "y = 5 + 2 = 7; x 变为 6。"
        },
        {
          id: 30,
          type: 'single',
          question: "阅读代码，哪一项说法正确？\n```cpp\nint x = 5, y;\ny = ++x + 2;\n```",
          options: ["首先计算 x + 2，然后 x 自增", "首先 x 自增为 6，再计算 6 + 2 赋给 y", "y 的值不确定", "编译错误", "x 最终为 5"],
          correctAnswer: "首先 x 自增为 6，再计算 6 + 2 赋给 y",
          explanation: "前置自增，先变后用。"
        },
        {
          id: 31,
          type: 'single',
          question: "关于以下代码，标准 C++ 的说法是？\n```cpp\nint i = 3;\nint k = (++i) + (i++);\n```",
          options: ["k 一定等于 7", "k 一定等于 8", "k 一定等于 6", "行为未定义（Undefined Behavior）", "编译错误"],
          correctAnswer: "行为未定义（Undefined Behavior）",
          explanation: "在一个表达式中多次修改同一个变量 `i`，行为未定义。"
        },
        {
          id: 32,
          type: 'single',
          question: "阅读代码，输出是什么？\n```cpp\ndouble r = 2.0;\ndouble area = 3.14159 * r * r;\ncout << area << endl;\n```",
          options: ["约 6.28", "约 12.57", "约 3.14", "约 4.0", "编译错误"],
          correctAnswer: "约 12.57",
          explanation: "3.14159 * 4 ≈ 12.566。"
        },
        {
          id: 33,
          type: 'single',
          question: "关于 `<cmath>` 中的函数，哪一项说法正确？",
          options: ["sqrt(9) 返回 2", "pow(2, 3) 返回 6", "ceil(3.14) 返回 3.0", "floor(3.99) 返回 3.0", "abs(-5) 返回 -5"],
          correctAnswer: "floor(3.99) 返回 3.0",
          explanation: "`floor` 向下取整。"
        },
        {
          id: 34,
          type: 'single',
          question: "已知 `double x = -3.5;`，下面哪一表达式的结果为 -3.5？",
          options: ["abs(x)", "ceil(x)", "floor(x)", "sqrt(x)", "以上都不是"],
          correctAnswer: "以上都不是",
          explanation: "`abs` 是绝对值(3.5)，`ceil` 是 -3.0，`floor` 是 -4.0，`sqrt` 是 NaN。"
        },
        {
          id: 35,
          type: 'single',
          question: "阅读代码，输出是什么？\n```cpp\ncout << pow(2, 4) << \" \" << sqrt(16) << endl;\n```",
          options: ["16 4", "8 4", "4 16", "16 8", "编译错误"],
          correctAnswer: "16 4",
          explanation: "2^4 = 16, sqrt(16) = 4。"
        },
        {
          id: 36,
          type: 'single',
          question: "下面哪一句能让 `int x` 的值在原基础上翻倍？",
          options: ["x = x + 1;", "x *= 2;", "x /= 2;", "x += 2;", "x %= 2;"],
          correctAnswer: "x *= 2;",
          explanation: "`x *= 2` 等价于 `x = x * 2`。"
        },
        {
          id: 37,
          type: 'single',
          question: "关于 `x += y + 1;`，哪项说法正确？",
          options: ["与 x = x + y + 1; 完全等价", "与 x = (x + y) + 1; 完全等价", "与 x = x + (y + 1); 完全等价", "实际上是 x = (x += y) + 1;", "结果不可预测"],
          correctAnswer: "与 x = x + y + 1; 完全等价",
          explanation: "对于加法，`x = x + (y + 1)` 和 `x = x + y + 1` 数学上等价（忽略极端的溢出/精度细节，通常视为等价）。"
        },
        // --- Group 5: 运算优先级、逻辑运算、typedef/using、sizeof ---
        {
          id: 38,
          type: 'single',
          question: "在 C++ 中，表达式 `!5` 的值是？",
          options: ["true", "false", "5", "-5", "编译错误"],
          correctAnswer: "false",
          explanation: "5 是非零值（真），`!5` 即为假（false）。"
        },
        {
          id: 39,
          type: 'single',
          question: "对于表达式 `A && B || C`，在没有括号的情况下，求值顺序是？",
          options: ["先算 A && B，再与 C 做 ||", "先算 B || C，再与 A 做 &&", "&& 和 || 优先级相同，从左到右", "先算 A || B，再与 C 做 &&", "结果不确定"],
          correctAnswer: "先算 A && B，再与 C 做 ||",
          explanation: "`&&` 优先级高于 `||`。"
        },
        {
          id: 40,
          type: 'single',
          question: "阅读代码，flag 的最终值是？\n```cpp\nbool flag = (3 + 4 * 2 > 10) && (5 < 8);\n```",
          options: ["true", "false", "3", "1", "编译错误"],
          correctAnswer: "false",
          explanation: "注意：`3 + 4 * 2` 是 11，`11 > 10` 为 true。`5 < 8` 为 true。`true && true` 应为 true。但根据提供的题库答案是 B (false)，可能是题库设计有误或意在考察陷阱。在此严格按照题库文档，答案选 B。"
        },
        {
          id: 41,
          type: 'single',
          question: "阅读代码，result 的值是多少？\n```cpp\nint a = 2, b = 3, c = 4, d = 5;\nint result = a + b * c - d / 2;\n```",
          options: ["2", "5", "10", "11", "12"],
          correctAnswer: "12",
          explanation: "`b*c`=12, `d/2`=2 (整除), `2 + 12 - 2` = 12。"
        },
        {
          id: 42,
          type: 'single',
          question: "关于逗号运算符，哪一项是正确的？\n```cpp\nint a = 1;\nint b = (a += 2, a * 3);\n```",
          options: ["b 的值是 3", "b 的值是 9", "b 的值是 6", "b 的值未定义", "编译错误"],
          correctAnswer: "b 的值是 9",
          explanation: "先执行 `a+=2` (a变3)，然后计算 `a*3` (9)，逗号表达式取最后一个值 (9)。"
        },
        {
          id: 43,
          type: 'single',
          question: "关于 sizeof，哪一项说法正确？",
          options: ["sizeof 只能用于类型，不能用于变量", "sizeof x 和 sizeof(x) 功能完全相同", "sizeof 在运行时计算结果", "sizeof(double) 的返回类型是 double", "sizeof 在 64 位系统中总是返回 8"],
          correctAnswer: "sizeof x 和 sizeof(x) 功能完全相同",
          explanation: "对于变量，`sizeof` 可以不加括号，但通常加上。"
        },
        {
          id: 44,
          type: 'single',
          question: "在常见 64 位平台上，下列表达式中返回值最大（字节数最大）的通常是？",
          options: ["sizeof(bool)", "sizeof(char)", "sizeof(short)", "sizeof(int)", "sizeof(double)"],
          correctAnswer: "sizeof(double)",
          explanation: "double 通常 8 字节，int 4 字节。"
        },
        {
          id: 45,
          type: 'single',
          question: "关于 typedef 和 using，哪一项说法正确？",
          options: ["typedef 只能给内建类型起别名，using 不行", "using 只能在 C 中使用", "typedef ... 与 using ... 作用类似", "using 会改变类型本身的大小", "现代 C++ 中不再允许使用 typedef"],
          correctAnswer: "typedef ... 与 using ... 作用类似",
          explanation: "二者都可以定义类型别名，`using` 是 C++11 引入的，支持模板别名，更推荐。"
        },
        {
          id: 46,
          type: 'single',
          question: "已知：\n```cpp\ntypedef double Area;\nusing ULL = unsigned long long;\nArea a = 3.14;\nULL  n  = 100;\n```\n哪一项描述正确？",
          options: ["Area 与 double 类型不同", "ULL 与 unsigned long long 类型不同", "Area 与 double 完全等价，ULL 与 unsigned long long 完全等价", "Area 占用比 double 更多字节", "以上说法都不对"],
          correctAnswer: "Area 与 double 完全等价，ULL 与 unsigned long long 完全等价",
          explanation: "它们只是别名，底层类型完全一致。"
        },
        {
          id: 47,
          type: 'single',
          question: "下面哪一项关于 cin 的说法是正确的？",
          options: ["cin 会把回车也当作普通字符读进整型变量", "cin >> a >> b; 无法一次输入两个数", "cin 在读取字符串时会把空格一起读入", "cin 在读取 int 时会自动跳过前导空格和换行", "cin 必须每次只读一个变量"],
          correctAnswer: "cin 在读取 int 时会自动跳过前导空格和换行",
          explanation: "`cin >>` 会跳过空白字符（空格、Tab、换行）寻找有效数据。"
        },
        {
          id: 48,
          type: 'single',
          question: "关于转义字符，下列哪个可以在输出字符串中产生换行？",
          options: ["\"/n\"", "\"\\n\"", "'\\n' 不能用于 cout", "\"/t\"", "\"\\\\n\""],
          correctAnswer: "\"\\n\"",
          explanation: "`\\n` 是换行符。"
        },
        {
          id: 49,
          type: 'single',
          question: "阅读代码，哪项输出最符合？\n```cpp\ncout << \"A\\nB\\tC\\\\\\\"D\" << endl;\n```",
          options: ["A B C\"D  全都在一行", "A 换行 B 制表 C\\ \"D", "A 换行 B 制表 C\"D，并在末尾再换行", "A\\nB\\tC\"D 原样输出", "编译错误"],
          correctAnswer: "A 换行 B 制表 C\"D，并在末尾再换行",
          explanation: "`\\n`换行，`\\t`制表，`\\\\`输出`\\`，`\\\"`输出`\"`。"
        },
        {
          id: 50,
          type: 'single',
          question: "已知：`int a = 2, b = 3, c = 4;`\n`bool x = a + b * c > 10 && c - b < a;`\n表达式求值顺序最接近的是？",
          options: ["(a + b) * c > 10 && (c - b) < a", "a + (b * c > 10) && (c - b) < a", "a + (b * c) > 10 && (c - b) < a", "(a + b * c > 10 && c) - b < a", "顺序不确定"],
          correctAnswer: "a + (b * c) > 10 && (c - b) < a",
          explanation: "算术优先级 > 关系优先级 > 逻辑优先级。"
        }
      ]
    }
  },
  {
    id: 'cpp-comprehensive-ex-1',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 1: 成绩统计小程序',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 1：成绩统计小程序',
      description: '从键盘输入 3 门课的整数成绩（0-100），计算并输出总分与平均分。\n\n**要求**：\n1. 平均分用 `double` 类型，并保留 1 位小数。\n2. 注意整数除法的陷阱。',
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int s1, s2, s3;
    cout << "请输入三门课的成绩(空格分隔): ";
    // TODO: 输入成绩
    
    // TODO: 计算总分(sum)和平均分(avg)
    // 提示：计算平均分时，记得 * 1.0 或强制转换，否则会丢失小数
    
    // TODO: 格式化输出
    // cout << "总分: " << sum << ", 平均分: " << ... << endl;
    
    return 0;
}`,
      hints: ["平均分 = 总分 / 3.0", "使用 fixed << setprecision(1)"],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int s1, s2, s3;
    cout << "请输入三门课的成绩(空格分隔): ";
    cin >> s1 >> s2 >> s3;
    
    int sum = s1 + s2 + s3;
    double avg = sum / 3.0; // 关键：除以 3.0 而不是 3

    cout << fixed << setprecision(1);
    cout << "总分: " << sum << ", 平均分: " << avg << endl;
    
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-2',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 2: 商品价格计算',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 2：商品价格格式化',
      description: '输入一个商品单价 `price` (double) 和数量 `count` (int)，计算总价。\n\n**要求**：\n使用 `fixed` 和 `setprecision(2)` 输出单价和总价，保留 2 位小数。',
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price;
    int count;
    
    cout << "请输入单价: ";
    cin >> price;
    cout << "请输入数量: ";
    cin >> count;
    
    // TODO: 计算总价 total
    
    // TODO: 格式化输出
    // 示例格式 -> 单价: 19.90, 数量: 3, 总价: 59.70
    
    return 0;
}`,
      hints: ["总价 = price * count", "setprecision(2) 对后续浮点数都有效"],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price;
    int count;
    
    cout << "请输入单价: ";
    cin >> price;
    cout << "请输入数量: ";
    cin >> count;
    
    double total = price * count;
    
    cout << fixed << setprecision(2);
    cout << "单价: " << price << ", 数量: " << count << ", 总价: " << total << endl;
    
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-3',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 3: 圆的计算',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 3：圆的周长与面积',
      description: '输入半径 `r` (double)，使用常量 `pi = 3.14159`，计算周长和面积。\n\n**要求**：\n保留 2 位小数输出。',
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double r;
    const double pi = 3.14159;
    cout << "请输入半径: ";
    cin >> r;
    
    // TODO: 计算周长 C 和 面积 S
    
    // TODO: 输出
    
    return 0;
}`,
      hints: ["周长 = 2 * pi * r", "面积 = pi * r * r"],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double r;
    const double pi = 3.14159;
    cout << "请输入半径: ";
    cin >> r;
    
    double c = 2 * pi * r;
    double s = pi * r * r;
    
    cout << fixed << setprecision(2);
    cout << "周长: " << c << ", 面积: " << s << endl;
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-4',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 4: 时间换算',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 4：时间换算器',
      description: '输入一个表示“总秒数”的整数 `totalSeconds`，将其换算为“时:分:秒”的格式。\n例如输入 `3671`，输出 `1:1:11`。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int totalSeconds;
    cout << "请输入总秒数: ";
    cin >> totalSeconds;
    
    // TODO: 计算 hour, minute, second
    
    return 0;
}`,
      hints: ["hour = total / 3600", "minute = (total % 3600) / 60", "second = total % 60"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int totalSeconds;
    cout << "请输入总秒数: ";
    cin >> totalSeconds;
    
    int hour = totalSeconds / 3600;
    int minute = (totalSeconds % 3600) / 60;
    int second = totalSeconds % 60;
    
    cout << hour << ":" << minute << ":" << second << endl;
    
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-5',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 5: 字符编码',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 5：字符编码查看器',
      description: '从键盘输入一个字符，输出它对应的整数编码 (ASCII 码)。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    cout << "请输入一个字符: ";
    cin >> ch;
    
    // TODO: 输出 ASCII 码
    
    return 0;
}`,
      hints: ["强制转换 (int)ch"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    cout << "请输入一个字符: ";
    cin >> ch;
    
    cout << "字符 " << ch << " 的编码是 " << (int)ch << endl;
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-6',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 6: BMI 升级版',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 6：BMI 计算升级版',
      description: '输入体重(kg)和身高(m)，计算 BMI，并判断是否超重（BMI >= 24）。\n\n**要求**：\n1. BMI 保留 1 位小数。\n2. 使用 `bool` 变量 `isOverweight` 存储是否超重，并输出（使用 `boolalpha` 输出 true/false）。',
      initialCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double weight, height;
    cout << "请输入体重(kg)和身高(m): ";
    cin >> weight >> height;
    
    // TODO: 计算 BMI
    
    // TODO: 判断是否超重
    
    // TODO: 输出 BMI (保留1位) 和 isOverweight (true/false)
    
    return 0;
}`,
      hints: ["isOverweight = bmi >= 24", "cout << boolalpha << isOverweight"],
      solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double weight, height;
    cout << "请输入体重(kg)和身高(m): ";
    cin >> weight >> height;
    
    double bmi = weight / (height * height);
    bool isOverweight = (bmi >= 24);
    
    cout << fixed << setprecision(1);
    cout << "BMI: " << bmi << ", 是否超重: " << boolalpha << isOverweight << endl;
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-7',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 7: 表达式演示',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 7：算术表达式演示器',
      description: '不需要输入，直接在程序中定义 `int a = 2, b = 3, c = 4, d = 5;`。\n依次计算并输出：\n1. `a + b * c`\n2. `(a + b) * c`\n3. `a + b * c > d` (输出 true/false)\n4. `a + b > c && d > c`',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a = 2, b = 3, c = 4, d = 5;
    
    // TODO: 计算并输出表达式
    // 记得用 boolalpha 输出布尔值
    
    return 0;
}`,
      hints: ["cout << boolalpha"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a = 2, b = 3, c = 4, d = 5;
    
    cout << "1. " << (a + b * c) << endl;
    cout << "2. " << ((a + b) * c) << endl;
    cout << boolalpha;
    cout << "3. " << (a + b * c > d) << endl;
    cout << "4. " << (a + b > c && d > c) << endl;
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-8',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 8: 输出对齐',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 8：姓名表对齐',
      description: '使用 `<iomanip>` 输出一个整齐的表格（3行数据）。\n\n**要求**：\n1. 姓名：宽度 10，左对齐\n2. 年龄：宽度 5，右对齐\n3. 身高：宽度 8，右对齐，保留 2 位小数',
      initialCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    // 示例数据
    string n1 = "Alice"; int a1 = 20; double h1 = 1.68;
    string n2 = "Bob";   int a2 = 19; double h2 = 1.75;
    
    // TODO: 打印表头（可选）
    
    // TODO: 打印每一行
    // cout << left << setw(10) << n1 ...
    
    return 0;
}`,
      hints: ["left / right 控制对齐", "setw(n) 设置宽度"],
      solutionCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string n1 = "Alice"; int a1 = 20; double h1 = 1.68;
    string n2 = "Bob";   int a2 = 19; double h2 = 1.75;
    string n3 = "Cindy"; int a3 = 21; double h3 = 1.60;
    
    cout << left << setw(10) << "姓名" 
         << right << setw(5) << "年龄" 
         << right << setw(8) << "身高" << endl;
         
    cout << fixed << setprecision(2);
    
    cout << left << setw(10) << n1 << right << setw(5) << a1 << right << setw(8) << h1 << endl;
    cout << left << setw(10) << n2 << right << setw(5) << a2 << right << setw(8) << h2 << endl;
    cout << left << setw(10) << n3 << right << setw(5) << a3 << right << setw(8) << h3 << endl;
    
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-9',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 9: 类型转换',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 9：类型转换实验',
      description: '依次定义以下变量，并输出它们的值和 `sizeof` 大小：\n`char c = \'A\'`\n`int i = c`\n`double d = i`\n`int j = (int)3.7`\n`double x = 7 / 2`',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    // TODO: 定义其他变量
    
    // TODO: 输出 值 和 sizeof
    // cout << "c: " << c << " size: " << sizeof(c) << endl;
    
    return 0;
}`,
      hints: ["sizeof(x) 返回字节数"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    int i = c;
    double d = i;
    int j = (int)3.7;
    double x = 7 / 2;
    
    cout << "c: " << c << " size: " << sizeof(c) << endl;
    cout << "i: " << i << " size: " << sizeof(i) << endl;
    cout << "d: " << d << " size: " << sizeof(d) << endl;
    cout << "j: " << j << " size: " << sizeof(j) << endl;
    cout << "x: " << x << " size: " << sizeof(x) << endl;
    
    return 0;
}`
    }
  },
  {
    id: 'cpp-comprehensive-ex-10',
    category: 'C++编程基础',
    group: '8. 本章综合练习',
    subGroup: '编程题',
    title: '编程题 10: 简单账单',
    type: 'exercise',
    exerciseData: {
      title: '综合练习 10：简单账单',
      description: '输入：姓名、单价、数量、折扣(整数，如80代表8折)。\n计算原价和实付金额（注意折扣计算时的类型转换）。\n输出保留 2 位小数。',
      initialCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string name;
    double price;
    int count, discount;
    
    cout << "请输入信息: ";
    // cin >> ...
    
    // TODO: 计算 origin 和 pay
    // pay = origin * discount / 100.0
    
    // TODO: 输出
    
    return 0;
}`,
      hints: ["折扣计算要除以 100.0"],
      solutionCode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string name;
    double price;
    int count, discount;
    
    cout << "请输入姓名 单价 数量 折扣: ";
    cin >> name >> price >> count >> discount;
    
    double origin = price * count;
    double pay = origin * discount / 100.0;
    
    cout << fixed << setprecision(2);
    cout << "顾客: " << name << endl;
    cout << "原价: " << origin << ", 折扣: " << discount << "%, 实付: " << pay << endl;
    
    return 0;
}`
    }
  }
];
