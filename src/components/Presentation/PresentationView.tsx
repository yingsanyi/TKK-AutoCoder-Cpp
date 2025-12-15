import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Hash, Maximize2, Minimize2 } from 'lucide-react';
import { Section } from '../../types';
import { ExerciseArea } from '../Exercise/ExerciseArea';
import { QuizArea } from '../Quiz/QuizArea';

interface PresentationViewProps {
  sections: Section[];
  initialSectionId: string;
  onClose: () => void;
  onSectionChange?: (id: string) => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ 
  sections, 
  initialSectionId, 
  onClose,
  onSectionChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = sections.findIndex(s => s.id === initialSectionId);
    return idx >= 0 ? idx : 0;
  });

  const [subSlideIndex, setSubSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSection = sections[currentIndex];

  // Flatten the content into slides
  const slides = useMemo(() => {
    // If it's an exercise, we just return one slide with the ExerciseArea
    if (currentSection.type === 'exercise' && currentSection.exerciseData) {
        return [<ExerciseArea data={currentSection.exerciseData} />];
    }

    // If it's a quiz, we just return one slide with the QuizArea
    if (currentSection.type === 'quiz' && currentSection.quizData) {
        return [<QuizArea data={currentSection.quizData} />];
    }

    if (!currentSection.content) return [];
    
    // Check if content is a React Element (div) with children
    const content = currentSection.content as React.ReactElement;
    
    // If it's a simple string or single element, return as one slide
    if (!content.props || !content.props.children) {
        return [content];
    }

    const children = React.Children.toArray(content.props.children);
    
    // If children is empty or just one item, return as one slide
    if (children.length <= 1) {
        return [content];
    }

    // Try to group logical chunks
    // Strategy:
    // 1. First slide: Intro text + Illustrations (if any)
    // 2. Subsequent slides: Divs that look like sections (e.g. have SectionHeader)
    
    const generatedSlides: React.ReactNode[] = [];
    let currentSlideBuffer: React.ReactNode[] = [];

    children.forEach((child: any) => {
        // Check if this child is a major section block (usually a div)
        // In basics.tsx, major sections are divs containing SectionHeader
        // But we can't easily check internal props of children.
        // Heuristic: If it's a 'div' and not the first couple of items (intro), make it a new slide.
        // Actually, basics.tsx structure is:
        // <div space-y-8>
        //    <p>Intro...</p>
        //    <Illustration />
        //    <div><SectionHeader ... /> ... </div>
        //    <div><SectionHeader ... /> ... </div>
        // </div>
        
        // So we can group the initial intro items into the first slide, 
        // and then each subsequent div becomes a slide.
        
        const isDiv = child.type === 'div';
        // We assume major sections are wrapped in divs in the content array.
        // Intro paragraphs are usually <p> or components.
        
        if (isDiv && generatedSlides.length > 0) {
            // If we already have a first slide (intro), and this is a div, treat it as a new slide
            // But we need to be careful not to split too aggressively.
            // Let's check if we should flush the buffer
            if (currentSlideBuffer.length > 0) {
                generatedSlides.push(<div className="space-y-8">{currentSlideBuffer}</div>);
                currentSlideBuffer = [];
            }
            generatedSlides.push(child);
        } else {
            currentSlideBuffer.push(child);
        }
    });

    if (currentSlideBuffer.length > 0) {
        // If we haven't pushed anything yet (e.g. only intro items), or remaining items
        if (generatedSlides.length === 0) {
             generatedSlides.push(<div className="space-y-8">{currentSlideBuffer}</div>);
        } else {
             // Append to the last slide? No, probably a new slide if it was trailing content
             generatedSlides.push(<div className="space-y-8">{currentSlideBuffer}</div>);
        }
    }
    
    // Special case: If only 1 slide generated but it was just a wrapper, 
    // it means the splitting logic didn't work well or content is small. 
    // Return original content as 1 slide.
    if (generatedSlides.length === 0) return [content];

    return generatedSlides;
  }, [currentSection]);

  // Reset sub-slide when section changes
  useEffect(() => {
    setSubSlideIndex(0);
  }, [currentIndex]);

  // Sync with parent when index changes
  useEffect(() => {
    const currentId = sections[currentIndex].id;
    if (onSectionChange) {
      onSectionChange(currentId);
    }
  }, [currentIndex, sections, onSectionChange]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }
  };

  const goToNext = useCallback(() => {
    if (subSlideIndex < slides.length - 1) {
        setSubSlideIndex(prev => prev + 1);
    } else if (currentIndex < sections.length - 1) {
        setCurrentIndex(prev => prev + 1);
        // subSlideIndex will reset via useEffect
    }
  }, [subSlideIndex, slides.length, currentIndex, sections.length]);

  const goToPrev = useCallback(() => {
    if (subSlideIndex > 0) {
        setSubSlideIndex(prev => prev - 1);
    } else if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        // We should probably go to the *last* slide of the previous section?
        // For simplicity, let's go to the start of previous section. 
        // User can click through. Or we can calc logic to go to last sub-slide.
        // Let's keep it simple: go to start of prev section.
    }
  }, [subSlideIndex, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
             // Let browser handle escape for fullscreen exit, but we need to update state
             // Actually browser consumes ESC. We might need to listen to fullscreenchange event.
        } else {
             onClose();
        }
      }
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [goToNext, goToPrev, onClose]);

  // Scroll to top when slide changes
  useEffect(() => {
    const container = document.getElementById('slide-content-container');
    if (container) container.scrollTop = 0;
  }, [currentIndex, subSlideIndex]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 text-white flex flex-col animate-in fade-in duration-300">
      
      {/* Top Bar (Controls) */}
      <div className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
            <Hash size={14} />
            {currentIndex + 1}.{subSlideIndex + 1} / {sections.length}
          </span>
          <span className="hidden md:inline truncate max-w-md opacity-75">
            {currentSection.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
            <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
              title="Exit Presentation (Esc)"
            >
              <X size={24} />
            </button>
        </div>
      </div>

      {/* Style Overrides for Presentation Mode */}
      <style>{`
        .presentation-content .text-sm { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .presentation-content .text-xs { font-size: 1rem !important; line-height: 1.5rem !important; }
        .presentation-content .text-base { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .presentation-content .text-lg { font-size: 1.5rem !important; line-height: 2rem !important; }
        .presentation-content .text-xl { font-size: 1.75rem !important; line-height: 2.25rem !important; }
        .presentation-content h1 { font-size: 2.5rem !important; }
        .presentation-content h2 { font-size: 2.25rem !important; }
        .presentation-content h3 { font-size: 2rem !important; }
        .presentation-content h4 { font-size: 1.75rem !important; }
        .presentation-content code { font-size: 1.1em !important; }
      `}</style>

      {/* Main Slide Content */}
      <div 
        id="slide-content-container"
        className="flex-1 overflow-hidden relative"
      >
        <div className="h-full w-full flex flex-col items-center justify-center p-2 md:p-4">
          <div className="w-full h-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col">
             
             {/* Slide Header */}
             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 md:p-8 text-white shrink-0">
                <div className="flex items-center gap-3 mb-2 opacity-80 text-sm font-bold tracking-widest uppercase">
                    {currentSection.category}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                    {currentSection.title}
                </h1>
             </div>

             {/* Slide Body */}
             <div className="p-6 md:p-8 text-slate-800 dark:text-slate-200 text-lg md:text-xl leading-relaxed flex-1 flex flex-col overflow-y-auto min-h-0">
                 {/* 
                    Injecting a specific class to allow overriding styles for presentation mode 
                    e.g., larger text, hidden specialized components if needed 
                 */}
                 <div className="prose prose-slate dark:prose-invert prose-xl max-w-none presentation-content flex-1 h-full">
                    {/* Render specific slide content */}
                    {slides[subSlideIndex]}
                 </div>
             </div>
             
             {/* Slide Progress Dots (if multiple slides in section) */}
             {slides.length > 1 && (
                 <div className="p-4 flex justify-center gap-2 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
                     {slides.map((_, idx) => (
                         <div 
                            key={idx} 
                            className={`w-2 h-2 rounded-full transition-all ${idx === subSlideIndex ? 'bg-indigo-500 w-6' : 'bg-slate-300 dark:bg-slate-600'}`}
                         />
                     ))}
                 </div>
             )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="p-6 flex justify-center items-center gap-8 pb-8">
        <button 
          onClick={goToPrev}
          disabled={currentIndex === 0 && subSlideIndex === 0}
          className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 transition-all text-white shadow-lg border border-slate-700"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="h-1.5 w-64 bg-slate-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex * slides.length + subSlideIndex + 1) / (sections.length * slides.length)) * 100}%` }} // Approx progress
            />
        </div>

        <button 
          onClick={goToNext}
          disabled={currentIndex === sections.length - 1 && subSlideIndex === slides.length - 1}
          className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 transition-all text-white shadow-lg border border-slate-700"
        >
          <ChevronRight size={32} />
        </button>
      </div>

    </div>
  );
};
