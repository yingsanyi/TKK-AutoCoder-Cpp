import React, { useState, useRef, useEffect } from 'react';
import { Pen, Eraser, Trash2, X, MousePointer2, MonitorPlay } from 'lucide-react';

// Custom Cursors
const PEN_ICON = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.25"/>
  </filter>
  <g filter="url(#shadow)">
    <path d="M8.5 24.5L25.5 7.5C26.6 6.4 28.4 6.4 29.5 7.5C30.6 8.6 30.6 10.4 29.5 11.5L12.5 28.5L8.5 24.5Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
    <path d="M8.5 24.5L3.5 29.5L4.5 25.5L8.5 24.5Z" fill="#E2E8F0"/>
    <path d="M3.5 29.5L1 32L4.5 30.5L3.5 29.5Z" fill="#3B82F6"/>
    <path d="M24.5 8.5L28.5 12.5" stroke="#E2E8F0" stroke-width="1"/>
  </g>
</svg>`;

const ERASER_ICON = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
    <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.2"/>
  </filter>
  <g transform="rotate(-20 16 16)" filter="url(#shadow)">
     <rect x="6" y="10" width="20" height="12" rx="2" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1"/>
     <path d="M13 10H6V22H13V10Z" fill="#3B82F6"/>
     <path d="M13 10V22" stroke="#2563EB" stroke-width="1"/>
  </g>
  <circle cx="16" cy="16" r="1.5" fill="#EF4444" fill-opacity="0.8"/>
  <path d="M16 13V19M13 16H19" stroke="#EF4444" stroke-width="1" stroke-opacity="0.5"/>
</svg>`;

const getCursor = (type: 'pen' | 'eraser') => {
    const svg = type === 'pen' ? PEN_ICON : ERASER_ICON;
    const encoded = encodeURIComponent(svg);
    // Pen tip at bottom-left (0, 32), Eraser center (16, 16)
    const hotspot = type === 'pen' ? '0 32' : '16 16';
    return `url('data:image/svg+xml;utf8,${encoded}') ${hotspot}, auto`;
};

export const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isActive, setIsActive] = useState(false); // Is the tool active/visible overlay
  const [color, setColor] = useState('#ef4444'); // Default red
  const [lineWidth, setLineWidth] = useState(4);
   const [penSize, setPenSize] = useState(2);
   const [eraserSize, setEraserSize] = useState(30);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Resize canvas
  useEffect(() => {
    const updateSize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        // Save current content
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Create temp canvas to store content
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0);
        }

        // Resize
        updateSize();

        // Restore content
        if (tempCanvas.width > 0 && tempCanvas.height > 0) {
             ctx.drawImage(tempCanvas, 0, 0);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Initial size
    updateSize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure size is correct when activating
  useEffect(() => {
    if (isActive && canvasRef.current) {
        if (canvasRef.current.width !== window.innerWidth || canvasRef.current.height !== window.innerHeight) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    }
  }, [isActive]);

  // Drawing logic
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { clientX, clientY } = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
    if (tool === 'eraser') {
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = eraserSize;
    } else {
        ctx.strokeStyle = color;
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = penSize;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { clientX, clientY } = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isMenuOpen) {
    return (
        <button
            onClick={() => { setIsMenuOpen(true); setIsActive(true); }}
            className="fixed bottom-6 right-6 z-[10001] p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 flex items-center justify-center group"
            title="开启演示模式 (画笔)"
        >
            <MonitorPlay size={24} className="group-hover:animate-pulse" />
        </button>
    );
  }

  return (
    <>
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[10002] touch-none ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ 
            display: 'block',
            cursor: isActive ? getCursor(tool) : 'default'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Toolbar */}
      <div className="fixed bottom-6 right-6 z-[10003] flex flex-col gap-2 items-end animate-in slide-in-from-bottom-10 fade-in duration-300">
         
         {/* Controls */}
         <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90">
            
            {/* Close */}
            <button 
                onClick={() => { setIsMenuOpen(false); setIsActive(false); }}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 mb-1 border-b border-slate-100 dark:border-slate-700 transition-colors"
                title="关闭演示工具"
            >
                <X size={20} />
            </button>

            {/* Pointer Mode (Interact) */}
            <button
                onClick={() => setIsActive(false)}
                className={`p-2 rounded-lg transition-all ${!isActive ? 'bg-indigo-100 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                title="鼠标模式 (操作页面)"
            >
                <MousePointer2 size={20} />
            </button>

            {/* Pen Mode */}
            <button
                onClick={() => { setIsActive(true); setTool('pen'); }}
                className={`p-2 rounded-lg transition-all ${isActive && tool === 'pen' ? 'bg-indigo-100 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                title="画笔模式"
            >
                <Pen size={20} />
            </button>

             {/* Eraser */}
             <button
                onClick={() => { setIsActive(true); setTool('eraser'); }}
                className={`p-2 rounded-lg transition-all ${isActive && tool === 'eraser' ? 'bg-indigo-100 text-indigo-600 font-bold' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'}`}
                title="橡皮擦"
            >
                <Eraser size={20} />
            </button>

            {/* Clear */}
            <button
                onClick={clearCanvas}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 hover:text-red-500 transition-colors"
                title="清空画布"
            >
                <Trash2 size={20} />
            </button>
            
            {/* Colors */}
            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 w-full"></div>
            
            {/* Size Slider */}
            <div className="flex flex-col items-center gap-1 w-full px-1">
                <span className="text-[10px] text-slate-400 font-mono">
                    {tool === 'eraser' ? `橡皮: ${eraserSize}` : `画笔: ${penSize}`}
                </span>
                <input 
                    type="range" 
                    min="1" 
                    max={tool === 'eraser' ? "100" : "20"} 
                    value={tool === 'eraser' ? eraserSize : penSize}
                    onChange={(e) => tool === 'eraser' ? setEraserSize(Number(e.target.value)) : setPenSize(Number(e.target.value))}
                    className="w-8 h-24 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer writing-mode-vertical accent-indigo-600"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                    title="调整大小"
                />
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 w-full"></div>
            
            <div className="flex flex-col gap-2 items-center p-1">
                {['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#000000'].map(c => (
                    <button
                        key={c}
                        onClick={() => { setColor(c); setIsActive(true); setTool('pen'); }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c && tool === 'pen' ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                        style={{ backgroundColor: c }}
                        title={c}
                    />
                ))}
            </div>

         </div>
      </div>
    </>
  );
};
