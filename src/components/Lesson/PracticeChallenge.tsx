import React from 'react';
import { CodeBlock } from '../Common/CodeBlock';
import { DescriptionRenderer } from '../Common/DescriptionRenderer';

export const PracticeChallenge = ({ title, desc, code, id }: { title: string, desc: string, code: string, id: number }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    {id}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
            </div>
            
            <div className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                <DescriptionRenderer text={desc} />
            </div>
            
            <div className="relative group-hover:-translate-y-1 transition-transform duration-300">
                <CodeBlock code={code} language="cpp" />
            </div>
        </div>
    </div>
);