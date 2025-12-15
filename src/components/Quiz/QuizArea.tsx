import React, { useState } from 'react';
import { QuizData } from '../../types';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { DescriptionRenderer } from '../Common/DescriptionRenderer';

interface QuizAreaProps {
  data: QuizData;
}

export const QuizArea: React.FC<QuizAreaProps> = ({ data }) => {
  // Store selected option index for each question: { questionIndex: optionIndex }
  const [selections, setSelections] = useState<Record<number, number>>({});
  // Store submitted state for each question
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (submitted[qIndex]) return; // Prevent changing after submit
    setSelections(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleSubmit = (qIndex: number) => {
    setSubmitted(prev => ({ ...prev, [qIndex]: true }));
  };

  const resetQuiz = () => {
    setSelections({});
    setSubmitted({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCorrect = (qIndex: number) => {
    const q = data.questions[qIndex];
    const selected = selections[qIndex];
    
    // 如果是基于索引的答案（旧版数据）
    if (typeof q.correctAnswer === 'number') {
      return selected === q.correctAnswer;
    }
    
    // 如果是基于字符串内容的答案（新版数据）
    if (typeof q.correctAnswer === 'string') {
      // 找到选项文本匹配正确答案的索引
      const correctIndex = q.options.findIndex(opt => {
        // 移除选项前缀如 "A. " 或 "1. " 进行比较，或者直接比较
        // 这里假设 options 数组中的字符串直接包含答案内容，或者包含前缀
        // 简单起见，我们假设 options 中的内容包含正确答案字符串
        return opt.includes(q.correctAnswer as string);
      });
      return selected === correctIndex;
    }
    
    return false;
  };

  const getCorrectIndex = (qIndex: number) => {
    const q = data.questions[qIndex];
    if (typeof q.correctAnswer === 'number') return q.correctAnswer;
    
    if (typeof q.correctAnswer === 'string') {
      return q.options.findIndex(opt => opt.includes(q.correctAnswer as string));
    }
    
    return -1;
  };

  const getScore = () => {
    let correct = 0;
    data.questions.forEach((q, idx) => {
      if (isCorrect(idx)) correct++;
    });
    return correct;
  };

  const isAllSubmitted = Object.keys(submitted).length === data.questions.length;

  return (
    <div className="max-w-[95%] mx-auto p-6 md:p-12">
      <div className="mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider">
            阶段测试
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{data.title}</h1>
        {data.description && (
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{data.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {data.questions.map((q, qIndex) => {
          const isSubmitted = submitted[qIndex];
          const correctIdx = getCorrectIndex(qIndex);
          const isCurrentCorrect = selections[qIndex] === correctIdx;
          
          return (
            <div key={q.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-bold text-sm">
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                    <DescriptionRenderer text={q.question} inline={true} />
                  </h3>
                  
                  {/* Options */}
                  <div className="space-y-3">
                    {q.options.map((option, oIndex) => {
                      let optionClass = "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700";
                      let icon = null;

                      if (selections[qIndex] === oIndex) {
                        optionClass = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 ring-1 ring-indigo-500";
                      }

                      if (isSubmitted) {
                        if (oIndex === correctIdx) {
                          optionClass = "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-300 ring-1 ring-green-500";
                          icon = <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />;
                        } else if (selections[qIndex] === oIndex && oIndex !== correctIdx) {
                          optionClass = "border-red-300 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-300";
                          icon = <XCircle size={16} className="text-red-500 dark:text-red-400" />;
                        } else {
                          optionClass = "border-slate-100 dark:border-slate-700 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelect(qIndex, oIndex)}
                          disabled={isSubmitted}
                          className={`
                            w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between
                            ${optionClass}
                          `}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs opacity-70">
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <span className="flex-1">
                              <DescriptionRenderer text={option} inline={true} />
                            </span>
                          </span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Footer / Explanation */}
                  <div className="mt-4 flex items-center justify-between">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleSubmit(qIndex)}
                        disabled={selections[qIndex] === undefined}
                        className={`
                          px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${selections[qIndex] !== undefined
                            ? 'bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-700'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'}
                        `}
                      >
                        提交答案
                      </button>
                    ) : (
                      <div className={`flex items-start gap-3 p-4 rounded-lg w-full ${
                        isCurrentCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                      }`}>
                        {isCurrentCorrect ? (
                           <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                        ) : (
                           <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        )}
                        <div>
                           <p className="font-bold text-sm mb-1">{isCurrentCorrect ? '回答正确' : '回答错误'}</p>
                           <div className="text-sm opacity-90">
                             <DescriptionRenderer text={q.explanation} />
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAllSubmitted && (
        <div className="mt-12 p-8 bg-slate-900 dark:bg-slate-800 rounded-2xl text-center text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="text-6xl font-bold mb-2">{getScore()} / {data.questions.length}</div>
           <p className="text-slate-300 dark:text-slate-400 mb-6">最终得分</p>
           <button 
             onClick={resetQuiz}
             className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
           >
             <RefreshCw size={18} />
             重新测试
           </button>
        </div>
      )}
    </div>
  );
};