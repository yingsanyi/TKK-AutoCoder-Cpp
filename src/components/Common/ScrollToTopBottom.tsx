import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ScrollToTopBottomProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export const ScrollToTopBottom: React.FC<ScrollToTopBottomProps> = ({ targetRef }) => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const container = targetRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Show "To Top" if scrolled down more than 300px
      setShowTop(container.scrollTop > 300);

      // Show "To Bottom" if not at the very bottom (with some buffer)
      // clientHeight + scrollTop === scrollHeight (approximately)
      const isAtBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 50;
      // Show bottom button if we can scroll down more and the content is actually scrollable
      setShowBottom(!isAtBottom && container.scrollHeight > container.clientHeight);
    };

    // Initial check
    handleScroll();

    container.addEventListener('scroll', handleScroll);
    // Also listen to resize in case content changes
    window.addEventListener('resize', handleScroll);
    
    // Use ResizeObserver to detect content size changes
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  const scrollToTop = () => {
    targetRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    targetRef.current?.scrollTo({
      top: targetRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (!targetRef.current) return null;

  return (
    <div className="fixed bottom-6 right-24 flex flex-col gap-3 z-50 pointer-events-none">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/30 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4"
          title="回到顶部"
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} strokeWidth={2.5} />
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="pointer-events-auto p-3 bg-white/90 hover:bg-white text-indigo-600 rounded-full shadow-lg shadow-indigo-500/10 backdrop-blur-sm border border-indigo-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4"
          title="回到底部"
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={22} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
