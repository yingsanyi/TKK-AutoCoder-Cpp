import React, { useState, useEffect, useRef } from 'react';
import { ExerciseData } from '../../types';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Terminal, Loader2, XCircle, Trash2 } from 'lucide-react';
import { CodeBlock } from '../Common/CodeBlock';
import { DescriptionRenderer } from '../Common/DescriptionRenderer';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';

interface ExerciseAreaProps {
  data: ExerciseData;
}

interface ExecutionResult {
  stdout: string;
  stderr: string;
  code: number | null;
  signal: string | null;
}

export const ExerciseArea: React.FC<ExerciseAreaProps> = ({ data }) => {
  const [userCode, setUserCode] = useState(data.initialCode);
  const [stdin, setStdin] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'solution'>('edit');
  
  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [runtime, setRuntime] = useState<{ language: string; version: string } | null>(null);
  const [runtimeLoading, setRuntimeLoading] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Reset state when exercise changes
  useEffect(() => {
    setUserCode(data.initialCode);
    setStdin('');
    setActiveTab('edit');
    setOutput(null);
    setExecutionError(null);
  }, [data]);

  useEffect(() => {
    const fetchRuntimes = async () => {
      setRuntimeLoading(true);
      try {
        const res = await fetch('https://emkc.org/api/v2/piston/runtimes');
        const arr = await res.json();
        const match = Array.isArray(arr)
          ? arr.find((rt: any) => {
              const aliases: string[] = Array.isArray(rt.aliases) ? rt.aliases : [];
              return rt.language === 'cpp' || aliases.includes('cpp') || aliases.includes('c++');
            })
          : null;
        if (match) {
          setRuntime({ language: match.language, version: match.version });
        } else {
          setRuntime({ language: 'cpp', version: '10.2.0' });
        }
      } catch {
        setRuntime({ language: 'cpp', version: '10.2.0' });
      } finally {
        setRuntimeLoading(false);
      }
    };
    fetchRuntimes();
  }, []);

  // Auto-scroll to console when output updates
  useEffect(() => {
    if ((output || isRunning || executionError) && activeTab === 'edit') {
      setTimeout(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [output, isRunning, executionError, activeTab]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setExecutionError(null);
    setActiveTab('edit');

    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15000);
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: runtime?.language ?? 'cpp',
          version: runtime?.version ?? '10.2.0',
          files: [
            {
              content: userCode
            }
          ],
          stdin: stdin,
          compile_timeout: 10000,
          run_timeout: 4000,
        }),
        signal: controller.signal,
      });
      clearTimeout(t);

      if (!response.ok) {
        let msg = `服务不可用（HTTP ${response.status}）`;
        try {
          const err = await response.json();
          if (err && err.message) {
            msg = `${err.message}（HTTP ${response.status}）`;
          }
        } catch {}
        throw new Error(msg);
      }

      const result = await response.json();
      
      // Piston API returns { run: { stdout, stderr, code, signal, ... } }
      if (result.run) {
        setOutput({
          stdout: result.run.stdout,
          stderr: result.run.stderr,
          code: result.run.code,
          signal: result.run.signal
        });
      } else {
        throw new Error('无法解析服务器响应');
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? /AbortError/i.test(err.name)
            ? '请求超时或网络异常，请重试'
            : err.message
          : '运行代码时发生未知错误';
      setExecutionError(msg);
    } finally {
      setIsRunning(false);
    }
  };

  const getSignalDescription = (signal: string) => {
    switch (signal) {
      case 'SIGSEGV': return 'Segmentation Fault (访问了非法内存)';
      case 'SIGFPE': return 'Floating Point Exception (除以零等)';
      case 'SIGILL': return 'Illegal Instruction (非法指令)';
      case 'SIGABRT': return 'Aborted (程序中止)';
      case 'SIGKILL': return 'Process Killed (可能超时或内存溢出)';
      default: return signal;
    }
  };

  return (
    <div className="flex flex-col min-h-full max-w-[95%] mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">
            练习模式
          </span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{data.title}</h2>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm prose prose-slate dark:prose-invert max-w-none">
          <DescriptionRenderer text={data.description} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'edit'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            编写代码
          </button>
          <button
            onClick={() => {
              setActiveTab('solution');
            }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'solution'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            查看参考答案
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setUserCode(data.initialCode)}
            className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm flex items-center gap-1 transition-colors px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            disabled={isRunning}
          >
            <RotateCcw size={14} /> 重置
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white shadow-md transition-all
              ${isRunning 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:transform active:scale-95'}
            `}
          >
            {isRunning ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                编译中...
              </>
            ) : (
              <>
                <Play size={18} fill="currentColor" />
                运行代码
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor & Content Area */}
      <div className="flex-1 flex flex-col gap-4">
        {activeTab === 'edit' ? (
          <>
            <div className="min-h-[400px] relative rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner group flex flex-col bg-[#1e1e1e]">
               <div className="bg-[#1e1e1e] text-slate-400 text-xs px-4 py-2 flex items-center justify-between border-b border-slate-700 select-none">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="ml-2 text-slate-300 font-mono">main.cpp</span>
                  </span>
                  <span className="text-slate-500">C++ {runtime?.version ?? '10.2.0'}</span>
               </div>
               <Editor
                value={userCode}
                onValueChange={code => setUserCode(code)}
                highlight={code => (
                  <Highlight theme={themes.vsDark} code={code} language="cpp">
                    {({ tokens, getLineProps, getTokenProps }) => (
                      <>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </Highlight>
                )}
                padding={16}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 14,
                  backgroundColor: '#1e1e1e',
                  color: '#f8f8f2',
                  minHeight: '100%',
                }}
                className="font-mono text-sm leading-relaxed"
                textareaClassName="focus:outline-none"
              />
            </div>

            {/* Standard Input Area */}
            <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm flex flex-col bg-white dark:bg-slate-800">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Terminal size={12} />
                        标准输入 (Stdin)
                    </div>
                    {data.testCases && data.testCases.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-end">
                            <span className="hidden sm:inline text-slate-400 font-normal normal-case mr-1">预设输入:</span>
                            {data.testCases.map((tc, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setStdin(tc.input)}
                                    className="px-2 py-0.5 text-[10px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors"
                                    title={tc.description ? `${tc.description}\n输入内容:\n${tc.input}` : `输入内容:\n${tc.input}`}
                                >
                                    用例 {idx + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <textarea 
                    className="w-full h-24 bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-200 p-3 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    placeholder="如果程序包含 cin，请在此处输入数据（例如：10 20）..."
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                />
            </div>

            {/* Terminal Output Area */}
            {(output || isRunning || executionError) && (
              <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="bg-slate-800 text-slate-300 px-4 py-2 text-xs font-mono flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} />
                    <span>控制台输出 (Console)</span>
                  </div>
                  {!isRunning && output && (
                    <button 
                      onClick={() => setOutput(null)}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="清空输出"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div className="bg-[#0d1117] p-4 font-mono text-sm min-h-[120px] max-h-[300px] overflow-y-auto">
                  {isRunning && (
                    <div className="text-slate-400 dark:text-slate-400 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      正在编译和运行...
                    </div>
                  )}
                  
                  {executionError && (
                    <div className="text-red-400 flex items-start gap-2">
                       <XCircle size={16} className="mt-0.5 shrink-0" />
                       <div>
                         <p className="font-bold">执行错误</p>
                         <p>{executionError}</p>
                       </div>
                    </div>
                  )}

                  {output && (
                    <>
                      {output.stderr && (
                        <div className="text-red-400 whitespace-pre-wrap mb-2 pb-2 border-b border-slate-800/50">
                          <div className="font-bold text-xs uppercase mb-1 opacity-75">标准错误 (stderr) / 编译信息:</div>
                          {output.stderr}
                        </div>
                      )}
                      
                      {output.stdout ? (
                        <div className="text-green-400 whitespace-pre-wrap">
                          {output.stdout}
                        </div>
                      ) : (
                        !output.stderr && !output.signal && <div className="text-slate-500 italic">程序运行成功，但没有输出 (stdout 为空)</div>
                      )}
                      
                      <div className="mt-4 pt-2 border-t border-slate-800 text-xs text-slate-500 flex flex-wrap gap-4">
                        <span>Exit Code: {output.code}</span>
                        {output.signal && (
                          <span className="text-amber-500 font-semibold">
                            Signal: {getSignalDescription(output.signal)}
                          </span>
                        )}
                        <span className="text-slate-600">
                           {output.code === 0 && !output.signal ? '运行成功' : '运行异常'}
                        </span>
                      </div>
                    </>
                  )}
                  <div ref={consoleEndRef} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="min-h-[400px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
             <CodeBlock code={data.solutionCode} label="参考答案" />
             <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg mt-4 mx-2">
                <div className="flex gap-2">
                    <CheckCircle2 className="text-green-600 dark:text-green-500 shrink-0" size={20} />
                    <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-300 text-sm">解析</h4>
                        <p className="text-green-800 dark:text-green-400 text-sm mt-1">
                            仔细对比你的代码和参考答案。
                            <br/>
                            <button 
                                onClick={() => {
                                    setUserCode(data.solutionCode);
                                    setActiveTab('edit');
                                    setOutput(null);
                                }}
                                className="text-green-700 dark:text-green-400 underline hover:text-green-900 dark:hover:text-green-300 mt-2 font-medium"
                            >
                                复制答案到编辑器并运行
                            </button>
                        </p>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* Hints */}
        {activeTab === 'edit' && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4 mt-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-300 text-sm mb-2">解题思路提示</h4>
                <ul className="list-disc list-inside space-y-1">
                  {data.hints.map((hint, idx) => (
                    <li key={idx} className="text-amber-800 dark:text-amber-400 text-sm">
                      <DescriptionRenderer text={hint} inline={true} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
