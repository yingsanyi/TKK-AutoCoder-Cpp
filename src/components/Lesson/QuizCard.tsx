import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { DescriptionRenderer } from '../Common/DescriptionRenderer';

export const QuizCard = ({ title, question, code, answer, type = 'basic', className = '' }: { title: string, question: string, code?: string, answer: React.ReactNode, type?: 'basic' | 'challenge', className?: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className={`rounded-xl border transition-all duration-300 ${
      type === 'challenge' 
        ? 'bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-900 border-indigo-200 dark:border-indigo-800' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
    } shadow-sm hover:shadow-md ${className}`}>
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-3">
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                {type === 'challenge' && <Zap size={18} className="text-indigo-500" />}
                {title}
            </h4>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 font-medium">
            <DescriptionRenderer text={question} />
        </div>
        
        {code && (
            <div className="mb-4 text-sm">
                 <code className="block bg-slate-100 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-slate-700 dark:text-slate-300">
                    <div dangerouslySetInnerHTML={{ __html: code }} />
                 </code>
            </div>
        )}

        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
            {isOpen ? '收起答案' : '查看答案'}
            <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800/50 text-sm text-slate-600 dark:text-slate-400">
                    {typeof answer === 'string' ? <DescriptionRenderer text={answer} /> : answer}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};