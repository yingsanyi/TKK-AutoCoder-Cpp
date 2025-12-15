import React from 'react';

export const KnowledgeCard = ({ title, icon: Icon, children, type = 'info', className = '' }: { title?: string, icon: any, children: React.ReactNode, type?: 'info' | 'tip' | 'warning' | 'danger' | 'note' | 'zap', className?: string }) => {
  const styles = {
    info: 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 border-blue-200 dark:border-blue-800/50',
    tip: 'bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-900 border-emerald-200 dark:border-emerald-800/50',
    warning: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-900 border-amber-200 dark:border-amber-800/50',
    danger: 'bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-slate-900 border-red-200 dark:border-red-800/50',
    note: 'bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-900 border-indigo-200 dark:border-indigo-800/50',
    zap: 'bg-gradient-to-br from-violet-50 to-white dark:from-violet-900/20 dark:to-slate-900 border-violet-200 dark:border-violet-800/50',
  };

  const iconStyles = {
    info: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    tip: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30',
    warning: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
    danger: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    note: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30',
    zap: 'text-violet-500 bg-violet-100 dark:bg-violet-900/30',
  };

  const currentStyle = styles[type as keyof typeof styles] || styles.info;
  const currentIconStyle = iconStyles[type as keyof typeof iconStyles] || iconStyles.info;

  return (
    <div className={`group relative p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${currentStyle} ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${currentIconStyle} shrink-0`}>
           <Icon size={24} />
        </div>
        <div className="flex-1">
            {title && (
            <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {title}
            </h4>
            )}
            <div className="text-sm leading-relaxed opacity-90 text-slate-600 dark:text-slate-300">
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};