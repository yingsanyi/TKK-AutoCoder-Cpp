import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, BookOpen, Code2, ChevronRight, ChevronDown, GraduationCap, Home, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { sections } from './data/index';
import { ExerciseArea } from './components/Exercise/ExerciseArea';
import { QuizArea } from './components/Quiz/QuizArea';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/Theme/ThemeToggle';
import { DrawingCanvas } from './components/Presentation/DrawingCanvas';

// --- Components ---

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-slate-50">
    <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-600 text-sm font-medium backdrop-blur-sm mx-auto">
        <Sparkles size={14} className="text-indigo-500" />
        <span>Interactive C++ Mastery</span>
      </div>

      {/* Hero Text */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: '-0.02em' }}>
          TKK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AutoCoder</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          沉浸式 C++ 编程教学与练习平台。<br/>
          从入门到精通，构建坚实的编程思维。
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-medium transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[200px] justify-center"
        >
          开始学习
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>

        <a 
          href="https://www.xujcoj.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full text-lg font-medium transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:scale-105 hover:shadow-lg active:scale-95 min-w-[200px] justify-center"
        >
          <span>校内 OJ 平台</span>
          <ExternalLink size={20} className="text-slate-400 group-hover:text-slate-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
        {[
          { title: '可视化图解', desc: '复杂的内存模型，一图胜千言。' },
          { title: '在线编译运行', desc: '无需配置环境，浏览器内即刻运行代码。' },
          { title: '循序渐进', desc: '从基础语法到指针进阶，科学的课程体系。' }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-12 text-slate-400 text-sm">
        Designed for Modern Learning
      </div>
    </div>
  </div>
);

function AppContent() {
  const { theme } = useTheme();
  const [activeSectionId, setActiveSectionId] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Sidebar resizing state
  const [sidebarWidth, setSidebarWidth] = useState(288); // Default 18rem (288px)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Get unique categories
  const categories = Array.from(new Set(sections.map(s => s.category)));

  // State for expanded categories - Default EMPTY (All closed)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // State for expanded groups within categories
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // State for expanded sub-groups within groups
  const [expandedSubGroups, setExpandedSubGroups] = useState<string[]>([]);

  const activeSection = sections.find(s => s.id === activeSectionId);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupKey) 
        ? prev.filter(g => g !== groupKey) 
        : [...prev, groupKey]
    );
  };

  const toggleSubGroup = (subGroupKey: string) => {
    setExpandedSubGroups(prev =>
      prev.includes(subGroupKey) 
        ? prev.filter(g => g !== subGroupKey) 
        : [...prev, subGroupKey]
    );
  };

  // Auto-expand the category and group of the active section when it changes (but only if not home)
  useEffect(() => {
    if (activeSection) {
      // Expand Category
      setExpandedCategories(prev => {
        if (!prev.includes(activeSection.category)) {
          return [...prev, activeSection.category];
        }
        return prev;
      });
      
      // Expand Group (if exists)
      if (activeSection.group) {
        const groupKey = `${activeSection.category}-${activeSection.group}`;
        setExpandedGroups(prev => {
            if (!prev.includes(groupKey)) return [...prev, groupKey];
            return prev;
        });

        // Expand SubGroup (if exists)
        if (activeSection.subGroup) {
          const subGroupKey = `${groupKey}-${activeSection.subGroup}`;
          setExpandedSubGroups(prev => {
              if (!prev.includes(subGroupKey)) return [...prev, subGroupKey];
              return prev;
          });
        }
      }
    }
  }, [activeSectionId, activeSection]);

  // Resizing Logic
  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);
  const resize = useCallback((mouseMoveEvent: MouseEvent) => {
    if (isResizing) {
      const newWidth = mouseMoveEvent.clientX;
      if (newWidth > 200 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden select-none md:select-auto font-sans">
      <DrawingCanvas />
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        style={{ width: isSidebarOpen ? '100%' : undefined }}
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0 flex flex-col border-r 
          ${isSidebarOpen ? 'translate-x-0 w-[80%]' : '-translate-x-full'}
          ${theme === 'dark' ? 'dark bg-[#0f172a] text-slate-300 border-slate-800' : 'bg-white text-slate-600 border-slate-200'}
        `}
      >
        {/* Desktop dynamic width wrapper */}
        <div 
           className="flex flex-col h-full w-full"
           style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${sidebarWidth}px` : '100%' }}
        >
            <div className={`p-6 border-b shrink-0 flex justify-between items-center ${theme === 'dark' ? 'border-slate-800 bg-[#0f172a]' : 'border-slate-200 bg-white'}`}>
              <h1 className={`text-xl font-bold flex items-center gap-2 whitespace-nowrap overflow-hidden tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <GraduationCap className="text-indigo-400 shrink-0" />
                <span className="truncate">TKK AutoCoder</span>
              </h1>
              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
              {/* Home Button */}
              <button
                onClick={() => {
                  setActiveSectionId('home');
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-4
                  ${activeSectionId === 'home' 
                    ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'bg-indigo-50 text-indigo-700') 
                    : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}
                `}
              >
                <Home size={16} className="shrink-0" />
                <span>首页</span>
              </button>

              {/* Categories */}
              {categories.map(category => {
                const isExpanded = expandedCategories.includes(category);
                const categorySections = sections.filter(s => s.category === category);
                const isActiveCategory = activeSection?.category === category;
                
                // Track rendered groups within this category loop to avoid duplicates
                const renderedGroups = new Set<string>();

                return (
                  <div key={category} className="mb-1">
                    <button
                      onClick={() => toggleCategory(category)}
                      title={category}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                        ${isActiveCategory 
                          ? (theme === 'dark' ? 'text-slate-100 bg-slate-800/80' : 'text-slate-900 bg-slate-100') 
                          : (theme === 'dark' ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')}
                      `}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-xs font-bold uppercase tracking-wider truncate">{category}</span>
                      </div>
                      {isExpanded 
                        ? <ChevronDown size={14} className="shrink-0 opacity-50" /> 
                        : <ChevronRight size={14} className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                      }
                    </button>

                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out border-l ml-4
                      ${isExpanded ? 'max-h-[1000px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}
                      ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}
                    `}>
                      <div className="space-y-0.5 pl-3">
                        {categorySections.map((section) => {
                          // --- Group Logic ---
                          if (section.group) {
                             // If this group has already been rendered in this loop, skip the individual section
                             if (renderedGroups.has(section.group)) return null;
                             renderedGroups.add(section.group);

                             const groupSections = categorySections.filter(s => s.group === section.group);
                             const groupKey = `${category}-${section.group}`;
                             const isGroupExpanded = expandedGroups.includes(groupKey);

                             return (
                               <div key={groupKey} className="my-1">
                                 <button
                                   onClick={() => toggleGroup(groupKey)}
                                   className={`
                                     w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors
                                     ${isGroupExpanded 
                                       ? (theme === 'dark' ? 'text-slate-200' : 'text-slate-900') 
                                       : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50')}
                                   `}
                                 >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <BookOpen size={14} className={`shrink-0 ${isGroupExpanded ? 'text-indigo-400' : 'opacity-70'}`} />
                                        <span className="truncate font-medium">{section.group}</span>
                                    </div>
                                    {isGroupExpanded ? <ChevronDown size={12} className="shrink-0 opacity-70"/> : <ChevronRight size={12} className="shrink-0 opacity-70"/>}
                                 </button>
                                 
                                 <div className={`
                                    overflow-hidden transition-all duration-300 ease-in-out border-l ml-3.5
                                    ${isGroupExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                                    ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                                 `}>
                                   <div className="space-y-0.5 pl-2">
                                     {(() => {
                                        const renderedSubGroups = new Set<string>();
                                        return groupSections.map(gs => {
                                           // --- SubGroup Logic ---
                                           if (gs.subGroup) {
                                              if (renderedSubGroups.has(gs.subGroup)) return null;
                                              renderedSubGroups.add(gs.subGroup);

                                              const subGroupSections = groupSections.filter(s => s.subGroup === gs.subGroup);
                                              const subGroupKey = `${groupKey}-${gs.subGroup}`;
                                              const isSubGroupExpanded = expandedSubGroups.includes(subGroupKey);

                                              return (
                                                <div key={subGroupKey} className="my-1">
                                                   <button
                                                      onClick={() => toggleSubGroup(subGroupKey)}
                                                      className={`
                                                        w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors
                                                        ${isSubGroupExpanded
                                                          ? (theme === 'dark' ? 'text-slate-300' : 'text-slate-800')
                                                          : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700')}
                                                      `}
                                                   >
                                                       <div className="flex items-center gap-2 overflow-hidden">
                                                           <div className="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
                                                           <span className="truncate font-medium">{gs.subGroup}</span>
                                                       </div>
                                                       {isSubGroupExpanded ? <ChevronDown size={10} className="shrink-0 opacity-70"/> : <ChevronRight size={10} className="shrink-0 opacity-70"/>}
                                                   </button>

                                                   <div className={`
                                                      overflow-hidden transition-all duration-300 ease-in-out border-l ml-3.5
                                                      ${isSubGroupExpanded ? 'max-h-[500px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}
                                                      ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                                                   `}>
                                                      <div className="space-y-0.5 pl-2">
                                                         {subGroupSections.map(sgs => (
                                                            <button
                                                              key={sgs.id}
                                                              title={sgs.title}
                                                              onClick={() => {
                                                                 setActiveSectionId(sgs.id);
                                                                 if (window.innerWidth < 768) setIsSidebarOpen(false);
                                                              }}
                                                              className={`
                                                                w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors
                                                                ${activeSectionId === sgs.id
                                                                  ? (theme === 'dark' ? 'text-indigo-400 font-medium bg-indigo-500/10' : 'text-indigo-600 font-medium bg-indigo-50')
                                                                  : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}
                                                              `}
                                                            >
                                                              {sgs.type === 'lesson' ? <BookOpen size={14} className="shrink-0 opacity-70" /> : sgs.type === 'quiz' ? <BookOpen size={14} className="shrink-0 opacity-70 text-purple-400" /> : <Code2 size={14} className="shrink-0 opacity-70" />}
                                                              <span className="truncate">{sgs.title}</span>
                                                            </button>
                                                         ))}
                                                      </div>
                                                   </div>
                                                </div>
                                              );
                                           }

                                           // --- Normal Item (No SubGroup) ---
                                           return (
                                             <button
                                               key={gs.id}
                                               title={gs.title}
                                               onClick={() => {
                                                  setActiveSectionId(gs.id);
                                                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                                               }}
                                               className={`
                                                 w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors
                                                 ${activeSectionId === gs.id
                                                   ? (theme === 'dark' ? 'text-indigo-400 font-medium bg-indigo-500/10' : 'text-indigo-600 font-medium bg-indigo-50')
                                                   : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}
                                               `}
                                             >
                                               {gs.type === 'lesson' ? <BookOpen size={14} className="shrink-0 opacity-70" /> : gs.type === 'quiz' ? <BookOpen size={14} className="shrink-0 opacity-70 text-purple-400" /> : <Code2 size={14} className="shrink-0 opacity-70" />}
                                               <span className="truncate">{gs.title}</span>
                                             </button>
                                           );
                                        });
                                     })()}
                                   </div>
                                 </div>
                               </div>
                             );
                          }

                          // --- Normal Section Rendering (No Group) ---
                          return (
                            <button
                              key={section.id}
                              title={section.title}
                              onClick={() => {
                                setActiveSectionId(section.id);
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                              }}
                              className={`
                                w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors
                                ${activeSectionId === section.id 
                                  ? (theme === 'dark' ? 'text-indigo-400 font-medium bg-indigo-500/10' : 'text-indigo-600 font-medium bg-indigo-50')
                                  : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')}
                              `}
                            >
                              {section.type === 'lesson' ? <BookOpen size={14} className="shrink-0 opacity-70" /> : section.type === 'quiz' ? <BookOpen size={14} className="shrink-0 opacity-70 text-purple-400" /> : <Code2 size={14} className="shrink-0 opacity-70" />}
                              <span className="truncate leading-tight">{section.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
        </div>

        {/* Drag Handle */}
        <div 
          className="hidden md:block absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-indigo-500/50 transition-colors z-40 active:bg-indigo-500"
          onMouseDown={startResizing}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative bg-white">
        {/* Top Mobile Bar */}
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <h2 className="font-semibold text-slate-800 truncate pr-4">{activeSection ? activeSection.title : 'TKK AutoCoder'}</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 shrink-0">
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Desktop Theme Toggle (Floating) */}
        <div className="hidden md:block absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-white scroll-smooth">
          {activeSectionId === 'home' ? (
             <LandingPage onStart={() => {
                setActiveSectionId(sections[0].id);
             }} />
          ) : activeSection ? (
             activeSection.type === 'lesson' ? (
              <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in duration-500">
                 <div className="mb-10 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-2 text-indigo-600 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded text-indigo-700 border border-indigo-100">
                        {activeSection.category}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 break-words tracking-tight">{activeSection.title}</h1>
                 </div>
                 
                 <div className="prose prose-slate prose-lg max-w-none 
                    prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-slate-600 prose-p:leading-8
                    prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                    prose-strong:text-slate-900 prose-strong:font-semibold">
                    {activeSection.content}
                 </div>
  
                 {/* Navigation Footer */}
                 <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
                    <div className="text-sm text-slate-400 font-medium">
                      TKK AutoCoder C++
                    </div>
                    {(() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSectionId);
                      const nextSection = sections[currentIndex + 1];
                      if (nextSection) {
                        return (
                          <button 
                            onClick={() => setActiveSectionId(nextSection.id)}
                            className="group flex items-center gap-2 pl-4 pr-3 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all hover:pr-2"
                          >
                            下一节: {nextSection.title} 
                            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </button>
                        )
                      }
                      return null;
                    })()}
                 </div>
              </div>
            ) : activeSection.type === 'quiz' && activeSection.quizData ? (
              <QuizArea data={activeSection.quizData} />
            ) : (
              activeSection.exerciseData && <ExerciseArea data={activeSection.exerciseData} />
            )
          ) : (
            <div className="p-8 text-center text-slate-500">Section not found</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}