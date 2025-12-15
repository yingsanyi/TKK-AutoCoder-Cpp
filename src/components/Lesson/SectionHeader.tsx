import React from 'react';

export const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
    <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Icon size={28} />
            </div>
            {title}
        </h3>
        {subtitle && <p className="mt-2 text-slate-500 dark:text-slate-400 ml-1">{subtitle}</p>}
    </div>
);
