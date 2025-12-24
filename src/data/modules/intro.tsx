import React, { useState, useEffect } from 'react';
import { Section } from '../../types/index';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { 
  Zap, 
  Cpu, 
  Briefcase, 
  Gamepad2, 
  TrendingUp, 
  Languages, 
  Binary, 
  FileCode, 
  ArrowRight, 
  Play, 
  Layers, 
  GitBranch, 
  RotateCw, 
  Terminal, 
  Keyboard,
  Monitor,
  Search,
  Bot,
  FileCog,
  Cog,
  Package,
  CheckCircle2,
  AlertCircle,
  Code2
} from 'lucide-react';

// --- Helper Components ---

const CompilationPipeline = () => {
  const [step, setStep] = useState(0); // 0: Idle, 1: Compiling, 2: Linking, 3: Running, 4: Done
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

  const runBuild = () => {
    if (step !== 0 && step !== 4) return;
    setStep(1);
    setLogs(['> g++ hello.cpp -o hello.exe']);
    
    // Step 1: Compiling
    setTimeout(() => {
        addLog('Compiling source code...');
    }, 500);

    // Step 2: Linking
    setTimeout(() => {
        setStep(2);
        addLog('Linking object files...');
    }, 2000);

    // Step 3: Running
    setTimeout(() => {
        setStep(3);
        addLog('Build successful!');
        addLog('Running executable...');
    }, 3500);

    // Done
    setTimeout(() => {
        setStep(4);
    }, 5000);
  };

  const reset = () => {
      setStep(0);
      setLogs([]);
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                <div className="w-3 h-3 rounded-full bg-green-500"/>
            </div>
            <div className="flex gap-2">
                 <button 
                    onClick={runBuild}
                    disabled={step !== 0 && step !== 4}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all
                        ${step === 0 || step === 4 
                            ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                    `}
                 >
                    <Play size={12} fill="currentColor" />
                    Build & Run
                 </button>
                 {step === 4 && (
                    <button 
                        onClick={reset}
                        className="px-3 py-1.5 rounded text-xs font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                    >
                        Reset
                    </button>
                 )}
            </div>
        </div>

        {/* Visual Area */}
        <div className="relative h-48 bg-slate-900/50 flex items-center justify-center p-8 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

            {/* Pipeline Container */}
            <div className="relative flex items-center gap-8 z-10 w-full justify-center max-w-lg">
                
                {/* 1. Source Code */}
                <div className={`
                    flex flex-col items-center gap-2 transition-all duration-500
                    ${step > 0 ? 'translate-x-12 opacity-0 scale-50 absolute' : 'opacity-100'}
                `}>
                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center text-blue-400">
                        <FileCode size={24} />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">hello.cpp</span>
                </div>

                {/* Arrow 1 */}
                <div className={`text-slate-600 transition-opacity duration-300 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <ArrowRight size={20} />
                </div>

                {/* 2. Compiler Machine */}
                <div className={`
                    relative flex flex-col items-center gap-2 transition-all duration-500
                    ${step === 0 ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}
                `}>
                     {/* Particles */}
                     {step === 1 && (
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 border-2 border-indigo-500 rounded-full animate-ping opacity-20"></div>
                         </div>
                     )}
                    <div className={`
                        w-16 h-16 bg-indigo-500/20 border border-indigo-500/50 rounded-xl flex items-center justify-center text-indigo-400
                        ${step === 1 ? 'animate-pulse ring-2 ring-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : ''}
                    `}>
                        <Cog size={32} className={step === 1 ? 'animate-spin-slow' : ''} />
                    </div>
                    <span className="text-xs text-indigo-400 font-mono font-bold">Compiler</span>
                </div>

                {/* Arrow 2 */}
                 <div className={`text-slate-600 transition-opacity duration-300 ${step >= 2 ? 'text-indigo-500' : ''}`}>
                    <ArrowRight size={20} />
                </div>

                {/* 3. Linker */}
                <div className={`
                    flex flex-col items-center gap-2 transition-all duration-500
                    ${step < 2 ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}
                `}>
                    <div className={`
                        w-12 h-12 bg-purple-500/20 border border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 relative
                        ${step === 2 ? 'animate-bounce' : ''}
                    `}>
                        <GitBranch size={24} />
                        {step === 2 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>}
                    </div>
                    <span className="text-xs text-purple-400 font-mono">Linker</span>
                </div>

                {/* Arrow 3 */}
                <div className={`text-slate-600 transition-opacity duration-300 ${step >= 3 ? 'text-purple-500' : ''}`}>
                    <ArrowRight size={20} />
                </div>

                {/* 4. Executable */}
                 <div className={`
                    flex flex-col items-center gap-2 transition-all duration-500 transform
                    ${step < 3 ? 'opacity-30 scale-90' : 'opacity-100 scale-110'}
                `}>
                    <div className={`
                        w-14 h-14 bg-green-500/20 border-2 border-green-500 rounded-xl flex items-center justify-center text-green-400 shadow-xl
                        ${step >= 3 ? 'shadow-[0_0_30px_rgba(74,222,128,0.4)]' : ''}
                    `}>
                        {step === 4 ? <CheckCircle2 size={32} /> : <Terminal size={28} />}
                    </div>
                    <span className="text-xs text-green-400 font-mono font-bold">hello.exe</span>
                </div>

            </div>

             {/* Floating Labels for Process */}
             <div className="absolute bottom-4 left-0 right-0 text-center">
                 {step === 1 && <span className="text-xs font-mono text-indigo-400 animate-pulse">Translating to Machine Code...</span>}
                 {step === 2 && <span className="text-xs font-mono text-purple-400 animate-pulse">Linking Libraries...</span>}
                 {step === 3 && <span className="text-xs font-mono text-green-400 animate-pulse">Launching Program...</span>}
             </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/50 p-4 font-mono text-xs h-32 overflow-y-auto custom-scrollbar border-t border-slate-800">
             {logs.length === 0 ? (
                 <span className="text-slate-600">Ready to build. Click "Build & Run" to start.</span>
             ) : (
                 <div className="space-y-1">
                     {logs.map((log, i) => (
                         <div key={i} className="flex gap-2 text-slate-300">
                             <span className="text-slate-600">{new Date().toLocaleTimeString().split(' ')[0]}</span>
                             <span className={i === logs.length - 1 ? 'text-white' : ''}>{log}</span>
                         </div>
                     ))}
                     {step === 4 && (
                         <div className="mt-2 p-2 bg-green-900/20 border border-green-900/50 rounded text-green-400">
                             Hello, World!
                         </div>
                     )}
                 </div>
             )}
        </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TimelineItem = ({ number, title, desc, icon: Icon }: any) => (
  <div className="relative pl-8 pb-8 border-l-2 border-indigo-100 last:border-0 last:pb-0">
    <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
      {number}
    </div>
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={16} className="text-indigo-600" />}
        <h4 className="font-bold text-slate-900">{title}</h4>
      </div>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  </div>
);

const ProcessStep = ({ step, title, desc, icon: Icon }: any) => (
  <div className="flex-1 min-w-[200px] bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={48} />
    </div>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
        {step}
      </div>
      <h4 className="font-bold text-slate-900">{title}</h4>
    </div>
    <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
  </div>
);

const AlgorithmVisualizer = () => {
  const [activeTab, setActiveTab] = useState<'sequence' | 'selection' | 'loop'>('sequence');
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey(prev => prev + 1);
    setIsPlaying(true);
  };

  useEffect(() => {
    setIsPlaying(true);
  }, [activeTab]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[460px]">
      {/* Sidebar / Tabs */}
      <div className="w-full md:w-48 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-row md:flex-col shrink-0">
        <button 
          onClick={() => setActiveTab('sequence')}
          className={`flex-1 md:flex-none p-4 text-left border-l-4 transition-all hover:bg-slate-100 ${activeTab === 'sequence' ? 'border-blue-500 bg-white font-bold text-blue-700' : 'border-transparent text-slate-600'}`}
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Structure 1</div>
          <div>顺序结构</div>
        </button>
        <button 
          onClick={() => setActiveTab('selection')}
          className={`flex-1 md:flex-none p-4 text-left border-l-4 transition-all hover:bg-slate-100 ${activeTab === 'selection' ? 'border-green-500 bg-white font-bold text-green-700' : 'border-transparent text-slate-600'}`}
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Structure 2</div>
          <div>选择结构</div>
        </button>
        <button 
          onClick={() => setActiveTab('loop')}
          className={`flex-1 md:flex-none p-4 text-left border-l-4 transition-all hover:bg-slate-100 ${activeTab === 'loop' ? 'border-orange-500 bg-white font-bold text-orange-700' : 'border-transparent text-slate-600'}`}
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Structure 3</div>
          <div>循环结构</div>
        </button>
      </div>

      {/* Visual Area */}
      <div className="flex-1 relative bg-slate-50/50 flex items-center justify-center overflow-hidden">
        {/* Replay Button */}
        <button 
            onClick={replay}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm border border-slate-200 text-slate-400 hover:text-slate-600 hover:scale-110 transition-all z-20"
            title="Replay Animation"
        >
            <RotateCw size={16} />
        </button>

        {/* Canvas Container: Fixed size 400x400 for precise coordinate mapping */}
        <div className="relative w-[400px] h-[400px]">
            
            {activeTab === 'sequence' && (
                <div key={`seq-${key}`} className="absolute inset-0">
                    {/* Step A: Center (200, 50), Size 120x60 */}
                    <div className="absolute left-[140px] top-[50px] w-[120px] h-[60px] bg-blue-100 border-2 border-blue-500 rounded-lg flex items-center justify-center font-bold text-blue-700 z-10 shadow-sm">
                        Step A
                    </div>

                    {/* Step B: Center (200, 250), Size 120x60 */}
                    <div className="absolute left-[140px] top-[250px] w-[120px] h-[60px] bg-blue-100 border-2 border-blue-500 rounded-lg flex items-center justify-center font-bold text-blue-700 z-10 shadow-sm">
                        Step B
                    </div>

                    {/* SVG Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <defs>
                             <marker id="arrow-blue" markerWidth="3" markerHeight="3" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 9 6">
                                <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                            </marker>
                        </defs>
                        {/* Line from A(200, 110) to B(200, 250) */}
                        <line x1="200" y1="110" x2="200" y2="240" className="stroke-slate-200 stroke-[4px]" strokeLinecap="round" />
                        <path d="M 200 240 l -4 -8 l 8 0 z" className="fill-slate-300" />

                        {/* Trail Animation */}
                        <line x1="200" y1="110" x2="200" y2="240" 
                            className="stroke-blue-500 stroke-[4px]" 
                            strokeLinecap="round"
                            strokeDasharray="130"
                            strokeDashoffset="130"
                            markerEnd="url(#arrow-blue)"
                            style={{ animation: 'sequence-trail 2s ease-in-out infinite' }}
                        />
                    </svg>

                    {/* Particle */}
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50 z-20 animate-[sequence-flow_2s_ease-in-out_infinite]"></div>

                    <style>{`
                        @keyframes sequence-flow {
                            0% { left: 200px; top: 80px; opacity: 0; transform: translate(-50%, -50%); }
                            10% { opacity: 1; }
                            30% { top: 80px; } /* At A */
                            70% { top: 280px; } /* At B */
                            90% { opacity: 1; }
                            100% { left: 200px; top: 280px; opacity: 0; transform: translate(-50%, -50%); }
                        }
                        @keyframes sequence-trail {
                            0%, 30% { stroke-dashoffset: 130; opacity: 0; }
                            31% { opacity: 1; }
                            70%, 100% { stroke-dashoffset: 0; opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

            {activeTab === 'selection' && (
                <div key={`sel-${key}`} className="absolute inset-0">
                    {/* Condition (Diamond): Center (200, 80) */}
                    {/* Rotated square: size 64x64 => diagonal ~90 */}
                    <div className="absolute left-[168px] top-[48px] w-16 h-16 bg-green-100 border-2 border-green-500 rotate-45 flex items-center justify-center z-10 shadow-sm">
                        <span className="-rotate-45 font-bold text-green-800 text-xs">Cond?</span>
                    </div>

                    {/* True Branch (Left): Action 1 at (100, 220) */}
                    <div className="absolute left-[50px] top-[200px] w-[100px] h-[50px] bg-green-50 border border-green-300 rounded flex items-center justify-center text-xs text-green-700 font-bold shadow-sm z-10">
                        Action 1
                    </div>
                    <span className="absolute left-[130px] top-[140px] text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded z-10">True</span>

                    {/* False Branch (Right): Action 2 at (300, 220) */}
                    <div className="absolute left-[250px] top-[200px] w-[100px] h-[50px] bg-red-50 border border-red-300 rounded flex items-center justify-center text-xs text-red-700 font-bold shadow-sm z-10">
                        Action 2
                    </div>
                    <span className="absolute right-[130px] top-[140px] text-[10px] text-red-500 font-bold bg-red-50 px-1 rounded z-10">False</span>

                    {/* SVG Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                         <defs>
                             <marker id="arrow-green" markerWidth="3" markerHeight="3" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 9 6">
                                <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                            </marker>
                        </defs>
                        {/* Base Lines */}
                        {/* True Path: Bottom(200, 115) -> (200, 160) -> (100, 160) -> (100, 200) */}
                        <path d="M 200 115 L 200 160 L 100 160 L 100 200" className="stroke-slate-200 stroke-[4px] fill-none" />
                        {/* False Path: Bottom(200, 115) -> (200, 160) -> (300, 160) -> (300, 200) */}
                        <path d="M 200 115 L 200 160 L 300 160 L 300 200" className="stroke-slate-200 stroke-[4px] fill-none" />

                        {/* Active Trail (True Path Only for demo) */}
                        <path d="M 200 115 L 200 160 L 100 160 L 100 195" 
                            className="stroke-green-500 stroke-[4px] fill-none"
                            strokeDasharray="200"
                            strokeDashoffset="200"
                            markerEnd="url(#arrow-green)"
                            style={{ animation: 'selection-trail 3s ease-in-out infinite' }}
                        />
                    </svg>

                    {/* Particle */}
                    <div className="absolute w-4 h-4 bg-green-600 rounded-full shadow-lg shadow-green-500/50 z-20 animate-[selection-flow_3s_ease-in-out_infinite]"></div>

                    <style>{`
                        @keyframes selection-flow {
                            0% { left: 200px; top: 40px; opacity: 0; transform: translate(-50%, -50%); }
                            10% { opacity: 1; }
                            30% { left: 200px; top: 80px; } /* In Diamond */
                            40% { left: 200px; top: 115px; } /* Leave Diamond */
                            55% { left: 200px; top: 160px; } /* Junction */
                            70% { left: 100px; top: 160px; } /* Turn */
                            90% { left: 100px; top: 225px; opacity: 1; } /* End Action 1 */
                            100% { left: 100px; top: 225px; opacity: 0; transform: translate(-50%, -50%); }
                        }
                        @keyframes selection-trail {
                            0%, 40% { stroke-dashoffset: 200; opacity: 0; }
                            41% { opacity: 1; }
                            90%, 100% { stroke-dashoffset: 0; opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

            {activeTab === 'loop' && (
                <div key={`loop-${key}`} className="absolute inset-0">
                     {/* Condition (Diamond): Center (200, 80) */}
                    <div className="absolute left-[168px] top-[48px] w-16 h-16 bg-orange-100 border-2 border-orange-500 rotate-45 flex items-center justify-center z-10 shadow-sm">
                        <span className="-rotate-45 font-bold text-orange-800 text-xs">i&lt;3?</span>
                    </div>

                    {/* Body: Center (200, 220) */}
                    <div className="absolute left-[150px] top-[195px] w-[100px] h-[50px] bg-orange-50 border border-orange-300 rounded flex items-center justify-center text-sm text-orange-700 font-bold relative z-10 shadow-sm">
                        Print(i)
                    </div>

                    {/* End Circle: Center (320, 220) */}
                    <div className="absolute left-[300px] top-[200px] w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[10px] text-slate-500 z-10">
                        End
                    </div>

                    {/* SVG Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                         <defs>
                             <marker id="arrow-orange" markerWidth="3" markerHeight="3" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 9 6">
                                <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
                            </marker>
                        </defs>
                        {/* 1. Enter Loop: (200, 115) -> (200, 195) */}
                        <line x1="200" y1="115" x2="200" y2="195" className="stroke-slate-200 stroke-[4px]" />
                        
                        {/* 2. Loop Back: Body Bottom(200, 245) -> (200, 280) -> (80, 280) -> (80, 80) -> (168, 80) */}
                        <path d="M 200 245 L 200 280 L 80 280 L 80 80 L 164 80" className="stroke-slate-200 stroke-[4px] fill-none" />

                        {/* 3. Exit Loop: Right Vertex(232, 80) -> (320, 80) -> (320, 200) */}
                        <path d="M 232 80 L 320 80 L 320 195" className="stroke-slate-200 stroke-[4px] fill-none" />

                        {/* Active Trails */}
                        {/* T1: Enter Body */}
                        <path d="M 200 115 L 200 190" 
                            className="stroke-orange-500 stroke-[4px]" 
                            strokeDasharray="80" strokeDashoffset="80"
                            markerEnd="url(#arrow-orange)"
                            style={{ animation: 'loop-trail-1 4s linear infinite' }}
                        />
                         {/* T2: Loop Back */}
                        <path d="M 200 245 L 200 280 L 80 280 L 80 80 L 160 80" 
                            className="stroke-orange-500 stroke-[4px] fill-none"
                            strokeDasharray="500" strokeDashoffset="500"
                            markerEnd="url(#arrow-orange)"
                            style={{ animation: 'loop-trail-2 4s linear infinite' }}
                        />
                         {/* T3: Exit */}
                        <path d="M 232 80 L 320 80 L 320 195" 
                            className="stroke-orange-500 stroke-[4px] fill-none"
                            strokeDasharray="250" strokeDashoffset="250"
                            markerEnd="url(#arrow-orange)"
                            style={{ animation: 'loop-trail-3 4s linear infinite' }}
                        />
                    </svg>

                    {/* Particle */}
                    <div className="absolute w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 z-20 animate-[loop-flow_4s_linear_infinite]"></div>

                    <style>{`
                        @keyframes loop-flow {
                            0% { left: 200px; top: 40px; opacity: 0; transform: translate(-50%, -50%); }
                            5% { opacity: 1; }
                            /* Enter Diamond */
                            10% { left: 200px; top: 80px; }
                            /* Enter Body */
                            20% { left: 200px; top: 220px; }
                            /* Start Loop Back */
                            30% { left: 200px; top: 280px; }
                            40% { left: 80px; top: 280px; }
                            50% { left: 80px; top: 80px; }
                            60% { left: 200px; top: 80px; } /* Back at Diamond */
                            /* Second Pass - Exit */
                            70% { left: 200px; top: 80px; }
                            80% { left: 320px; top: 80px; }
                            90% { left: 320px; top: 220px; opacity: 1; }
                            100% { left: 320px; top: 220px; opacity: 0; transform: translate(-50%, -50%); }
                        }
                        /* Trail Animations */
                        @keyframes loop-trail-1 {
                            0%, 10% { stroke-dashoffset: 80; opacity: 0; }
                            11% { opacity: 1; }
                            20%, 100% { stroke-dashoffset: 0; opacity: 1; }
                        }
                        @keyframes loop-trail-2 {
                            0%, 20% { stroke-dashoffset: 500; opacity: 0; }
                            21% { opacity: 1; }
                            60%, 100% { stroke-dashoffset: 0; opacity: 1; }
                        }
                        @keyframes loop-trail-3 {
                            0%, 70% { stroke-dashoffset: 250; opacity: 0; }
                            71% { opacity: 1; }
                            90%, 100% { stroke-dashoffset: 0; opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

const InputSimulator = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  
  return (
    <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 shadow-xl max-w-lg mx-auto">
      <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-slate-500">Calculator.exe</span>
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-green-400">root@tkk:~$</span> ./calculator
        </div>
        <div className="flex items-center gap-2">
          <span>请输入a的值：</span>
          <input 
            type="number" 
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="bg-transparent border-b border-slate-600 w-16 focus:outline-none focus:border-green-500 text-white"
            placeholder="?"
          />
        </div>
        {a && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
            <span>请输入b的值：</span>
            <input 
              type="number" 
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="bg-transparent border-b border-slate-600 w-16 focus:outline-none focus:border-green-500 text-white"
              placeholder="?"
            />
          </div>
        )}
        {a && b && (
          <div className="mt-4 p-2 bg-slate-800 rounded border-l-4 border-green-500 animate-in fade-in zoom-in duration-300">
            <span className="text-green-400">Result: </span> 
            <span className="text-white font-bold">a + b = {Number(a) + Number(b)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Sections ---

export const introSections: Section[] = [
  {
    id: 'why-cpp',
    category: 'C++编程绪论',
    title: '1. 为什么我们要学 C++？',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Zap className="text-indigo-600" />
            自动化的“神兵利器”
          </h3>
          <p className="text-indigo-800 mb-6 leading-relaxed">
            你可能听说过 Python 简单好用，也听说过 Java 流行度高，但在自动化专业，
            <strong className="bg-white px-2 py-0.5 rounded text-indigo-700 mx-1 shadow-sm">C++ 是不可撼动的基石</strong>。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-yellow-500" size={20}/>
                    <span className="font-bold text-slate-900">不仅要快</span>
                </div>
                <p className="text-sm text-slate-600">自动化系统处理复杂的信号和控制任务，需要极高的运行效率。C++ 是编译型语言，速度极快。</p>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Cpu className="text-blue-500" size={20}/>
                    <span className="font-bold text-slate-900">还要稳</span>
                </div>
                <p className="text-sm text-slate-600">你需要直接操作硬件接口（内存、指针）。C++ 允许你进行底层的“微操”。</p>
             </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-100 rounded-lg text-center text-indigo-900 text-sm font-medium">
             比喻：如果说 Python 是全自动的“预制菜”，C++ 就是给你一把精密的“手术刀”，让你精准地控制每一个细节。
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Briefcase className="text-slate-700" />
            广阔的“钱”景
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Cpu}
              color="bg-orange-500"
              title="嵌入式/硬件开发"
              desc="无人机、智能摄像头、医疗设备（薪资 15k-50k）。"
            />
            <FeatureCard 
              icon={Gamepad2}
              color="bg-purple-500"
              title="游戏开发"
              desc="像腾讯、网易的游戏后台，C++ 是高性能游戏的首选。"
            />
             <FeatureCard 
              icon={TrendingUp}
              color="bg-green-500"
              title="金融科技"
              desc="高频交易系统，毫秒级的速度优势至关重要。"
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'what-is-language',
    category: 'C++编程绪论',
    title: '2. 什么是程序设计语言？',
    type: 'lesson',
    content: (
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
                计算机只认识 <strong className="text-indigo-600 font-mono">0</strong> 和 <strong className="text-indigo-600 font-mono">1</strong>（二进制），我们人类说的是自然语言。
                <br/>
                程序设计语言就是这两者之间的<span className="inline-block px-2 py-1 bg-yellow-100 -rotate-2 mx-1 rounded border border-yellow-200 shadow-sm font-bold text-yellow-800">翻译官</span>。
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Evolution */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="text-green-500" />
                    2.1 语言的进化阶梯
                </h3>
                <div className="space-y-2">
                    <TimelineItem 
                        number="1" 
                        title="机器语言" 
                        desc="全是 010101，计算机直接读，但人类看天书。" 
                        icon={Binary}
                    />
                    <TimelineItem 
                        number="2" 
                        title="汇编语言" 
                        desc="用符号（如 ADD）代替 01，稍微好懂一点，但还是很繁琐。" 
                        icon={FileCode}
                    />
                    <TimelineItem 
                        number="3" 
                        title="高级语言" 
                        desc="接近人类语言（如 x = x + y），C++ 就属于这一类。" 
                        icon={Languages}
                    />
                </div>
            </div>

            {/* Translation Types */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Languages className="text-blue-500" />
                    2.2 翻译的两种方式
                </h3>
                <div className="space-y-4">
                    <div className="group p-4 rounded-lg bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-orange-900">解释型 (Python)</h4>
                            <span className="text-xs px-2 py-1 bg-white rounded-full text-orange-600 border border-orange-200">同声传译</span>
                        </div>
                        <p className="text-sm text-orange-800">读一句，翻一句，执行一句。灵活但稍慢。</p>
                    </div>
                    
                    <div className="group p-4 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-8 opacity-5">
                             <Zap size={100} />
                        </div>
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <h4 className="font-bold text-indigo-900">编译型 (C++)</h4>
                            <span className="text-xs px-2 py-1 bg-white rounded-full text-indigo-600 border border-indigo-200">笔译</span>
                        </div>
                        <p className="text-sm text-indigo-800 relative z-10">把整本书（源程序）一次性翻译成机器码。执行时不需要再翻译，所以<strong className="text-indigo-700">速度飞快</strong>。</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'how-cpp-works',
    category: 'C++编程绪论',
    title: '3. C++ 程序是如何诞生的？',
    type: 'lesson',
    content: (
      <div className="space-y-10">
         <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Layers className="text-purple-500" />
                3.1 开发四部曲
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
               写好代码只是第一步，要让它跑起来，需要经历从源代码到可执行文件的华丽转身。
            </p>
            <CompilationPipeline />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <FileCode size={18} className="text-blue-600"/>
                        <span className="font-bold text-blue-900 text-sm">1. 编写源代码</span>
                    </div>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        你写下的如 <code className="bg-white px-1 rounded">.cpp</code> 文件，是人类可读的逻辑描述。
                    </p>
                </div>
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Cog size={18} className="text-indigo-600"/>
                        <span className="font-bold text-indigo-900 text-sm">2. 编译 (Compile)</span>
                    </div>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                        编译器检查语法，将代码翻译成计算机能理解的目标代码 <code className="bg-white px-1 rounded">.o</code>。
                    </p>
                </div>
                 <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <GitBranch size={18} className="text-purple-600"/>
                        <span className="font-bold text-purple-900 text-sm">3. 链接 (Link)</span>
                    </div>
                    <p className="text-xs text-purple-700 leading-relaxed">
                        把你的代码和系统库（如输入输出库）“拼装”在一起。
                    </p>
                </div>
                 <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Play size={18} className="text-green-600"/>
                        <span className="font-bold text-green-900 text-sm">4. 生成可执行文件</span>
                    </div>
                    <p className="text-xs text-green-700 leading-relaxed">
                        最终生成的 <code className="bg-white px-1 rounded">.exe</code>，双击即可运行。
                    </p>
                </div>
            </div>
         </div>

         <div className="space-y-8">
            <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="text-yellow-500" />
                    3.2 程序的灵魂公式
                </h3>
                <div className="bg-slate-900 p-8 rounded-xl text-center flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                    <div className="text-3xl md:text-4xl font-bold text-white font-mono relative z-10">
                        程序 = <span className="text-indigo-400">算法</span> + <span className="text-purple-400">数据结构</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-4 max-w-xs relative z-10">
                        — Niklaus Wirth (图灵奖得主)
                    </p>
                    <div className="mt-6 flex gap-4 text-sm relative z-10">
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                            <span className="text-indigo-300 block text-xs mb-1">算法</span>
                            <span className="text-white">做菜的菜谱 (Steps)</span>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                            <span className="text-purple-300 block text-xs mb-1">数据结构</span>
                            <span className="text-white">做菜的食材 (Data)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <GitBranch className="text-orange-500" />
                    3.3 算法的三种基本逻辑
                </h3>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-600 mb-6 leading-relaxed">
                    无论多复杂的程序，其底层逻辑都逃不过这三种基本结构的组合：
                </p>
                <AlgorithmVisualizer />
                <div className="mt-6 p-4 bg-red-50 text-red-800 text-sm rounded-lg border border-red-100 flex items-start gap-3">
                    <AlertCircle className="shrink-0 text-red-500" size={20} />
                    <div>
                        <strong className="font-bold block mb-1">新手避坑指南</strong>
                        在使用循环结构时，必须确保有一个明确的<span className="font-bold">退出条件</span>（Exit Condition）。否则程序将陷入死循环（Infinite Loop），导致程序卡死。
                    </div>
                </div>
            </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'first-program',
    category: 'C++编程绪论',
    title: '4. 动手实践：我的第一个 C++ 程序',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Monitor className="text-slate-700" />
                4.1 认识开发环境 (IDE)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg">VS</div>
                    <div>
                        <h4 className="font-bold text-slate-900">Visual Studio 2022</h4>
                        <p className="text-sm text-slate-600 mt-1">微软出品，功能强大，是本次课程推荐的专业工具。</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-lg">Dev</div>
                    <div>
                        <h4 className="font-bold text-slate-900">Dev C++</h4>
                        <p className="text-sm text-slate-600 mt-1">小巧简单，适合初学者快速上手。</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-3">环境搭建参考图</h4>
                 <div className="rounded-lg overflow-hidden border border-slate-100">
                    <img 
                        src="/images/WechatIMG448.jpg" 
                        alt="编程环境搭建参考" 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'p-8 text-center text-slate-400 bg-slate-50 text-sm';
                            errorMsg.innerText = '图片未找到。请将 WechatIMG448.jpg 上传至 public/images/ 目录';
                            e.currentTarget.parentElement?.appendChild(errorMsg);
                        }}
                    />
                 </div>
                 <p className="text-xs text-slate-500 mt-2 text-center">图示：环境配置参考</p>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">4.2 Hello World 代码详解</h3>
            <p className="text-slate-600 mb-4">这是每个程序员的“成人礼”：</p>
            <CodeBlock 
                code={`#include <iostream>      // 1. 预处理：我要用输入输出工具箱
using namespace std;     // 2. 命名空间：使用标准工具箱的名字

int main()               // 3. 主函数：程序的入口，一切从这里开始
{
    cout << "Hello World!" << endl; // 4. 输出：在屏幕上打印文字并换行
    return 0;            // 5. 结束：返回0代表程序顺利跑完了
}`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                <div className="p-3 bg-slate-100 rounded border border-slate-200">
                    <code className="text-indigo-600 font-bold">cout</code>
                    <p className="text-slate-600 text-xs mt-1">标准输出（屏幕），配合 <code className="bg-slate-200 px-1 rounded">&lt;&lt;</code> 像个喇叭一样把东西送出去。</p>
                </div>
                <div className="p-3 bg-slate-100 rounded border border-slate-200">
                    <code className="text-indigo-600 font-bold">endl</code>
                    <p className="text-slate-600 text-xs mt-1">End Line，换行。</p>
                </div>
                <div className="p-3 bg-slate-100 rounded border border-slate-200">
                    <code className="text-green-600 font-bold">//</code>
                    <p className="text-slate-600 text-xs mt-1">注释，写给人看的笔记，计算机会忽略它。</p>
                </div>
            </div>
        </div>


        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Keyboard className="text-slate-700" />
                4.3 变量与输入
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <p className="text-slate-700">程序不能只输出，还得能存数据、收数据。</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 bg-white p-3 rounded shadow-sm border border-slate-100">
                            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">变量</div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">就像一个贴了标签的盒子</p>
                                <code className="text-xs text-slate-500 bg-slate-50 px-1 py-0.5 rounded block mt-1">int a; // 声明一个叫 a 的整数盒子</code>
                                <code className="text-xs text-slate-500 bg-slate-50 px-1 py-0.5 rounded block mt-0.5">a = 5; // 把 5 放进盒子</code>
                            </div>
                        </li>
                         <li className="flex items-start gap-3 bg-white p-3 rounded shadow-sm border border-slate-100">
                            <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">cin</div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">标准输入（键盘）</p>
                                <p className="text-xs text-slate-600 mt-1">配合 <code className="bg-slate-100 px-1 rounded">&gt;&gt;</code> 把键盘敲入的数据送到变量里。</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                {/* Simulator */}
                <div>
                     <div className="text-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interactive Demo</span>
                     </div>
                     <InputSimulator />
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'resources',
    category: 'C++编程绪论',
    title: '5. 学习资源与考核',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Search className="text-blue-500" />
                5.1 哪里刷题？
            </h3>
            <p className="text-slate-600 mb-4">学编程最重要的是动手！</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://www.xujcoj.com/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-colors group">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 block">校内平台</span>
                    <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                        XUJC Online Judge
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                    </h4>
                    <p className="text-xs text-indigo-700 mt-1">专门为同学们准备的练习场</p>
                </a>
                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">校外平台</span>
                    <div className="flex gap-2 flex-wrap">
                        <a href="https://leetcode.cn/" target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium hover:bg-slate-200 transition-colors">LeetCode</a>
                        <a href="https://www.nowcoder.com/" target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium hover:bg-slate-200 transition-colors">牛客网</a>
                        <a href="https://www.luogu.com.cn/" target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium hover:bg-slate-200 transition-colors">洛谷</a>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Bot className="text-purple-500" />
                5.2 遇到问题问谁？
            </h3>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Bot size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">AI 助教随时待命</h4>
                        <p className="text-purple-100 text-sm mb-4">
                            除了问老师，你还有强大的 AI 助教。它们可以帮你解释代码、查错、生成算法思路。
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>ChatGPT</span>
                            </a>
                            <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Claude</span>
                            </a>
                            <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Gemini</span>
                            </a>
                            <a href="https://kimi.moonshot.cn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Kimi</span>
                            </a>
                            <a href="https://www.deepseek.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>DeepSeek</span>
                            </a>
                            <a href="https://www.doubao.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>豆包</span>
                            </a>
                            <a href="https://tongyi.aliyun.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>千问</span>
                            </a>
                            <a href="https://grok.x.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Grok</span>
                            </a>
                            <a href="https://chatglm.cn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>ChatGLM</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Code2 className="text-emerald-500" />
                5.3 AI 编程工具
            </h3>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Code2 size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2">下一代 IDE 体验</h4>
                        <p className="text-emerald-50 text-sm mb-4">
                            工欲善其事，必先利其器。这些集成了 AI 的现代编辑器能极大提升你的编程效率。
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="https://www.trae.cn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Trae (大陆版)</span>
                            </a>
                            <a href="https://www.trae.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Trae (国际版)</span>
                            </a>
                            <a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Cursor</span>
                            </a>
                            <a href="https://kiro.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Kiro</span>
                            </a>
                            <a href="https://codeium.com/windsurf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Windsurf</span>
                            </a>
                            <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Claude Code</span>
                            </a>
                            <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <span>Antigravity</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
];
