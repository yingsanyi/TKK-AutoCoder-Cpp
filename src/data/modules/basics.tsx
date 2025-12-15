import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { SectionHeader } from '../../components/Lesson/SectionHeader';
import { KnowledgeCard } from '../../components/Lesson/KnowledgeCard';
import { QuizCard } from '../../components/Lesson/QuizCard';
import { PracticeChallenge } from '../../components/Lesson/PracticeChallenge';
import { 
  Box,
  Binary,
  Keyboard,
  ArrowRightLeft,
  Calculator,
  Code2,
  Lightbulb,
  Info,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Database,
  RefreshCcw,
  Scale,
  FunctionSquare,
  ListOrdered
} from 'lucide-react';

// --- Visual Components (SVG Illustrations) ---

const VariableIllustration = () => (
  <div className="flex justify-center my-8 transition-transform hover:scale-105 duration-500">
    <svg width="350" height="180" viewBox="0 0 350 180" className="drop-shadow-xl">
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
        </marker>
      </defs>
      
      {/* Memory Space Background */}
      <rect x="20" y="20" width="310" height="140" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5 5" />
      <text x="175" y="45" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">内存空间 (Memory)</text>

      {/* The Variable Box */}
      <g transform="translate(125, 60)">
        <rect width="100" height="80" rx="8" fill="url(#boxGrad)" />
        <rect width="100" height="20" rx="8" fill="#312e81" opacity="0.2" />
        
        {/* Label */}
        <rect x="20" y="-10" width="60" height="20" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <text x="50" y="4" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">int a</text>
        
        {/* Value */}
        <text x="50" y="55" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">10</text>
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="10" opacity="0.8">Value</text>
      </g>

      {/* Annotation */}
      <path d="M 115 100 L 75 100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="70" y="105" textAnchor="end" fill="#64748b" fontSize="11">变量名</text>
    </svg>
  </div>
);

const DataTypesIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="220" viewBox="0 0 400 220" className="drop-shadow-lg">
       {/* Int */}
       <g transform="translate(20, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#1e40af" fontWeight="bold">int</text>
         <text x="40" y="55" textAnchor="middle" fill="#3b82f6" fontSize="24">42</text>
         <text x="40" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10">4 bytes</text>
       </g>

       {/* Double */}
       <g transform="translate(110, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#3f6212" fontWeight="bold">double</text>
         <text x="40" y="55" textAnchor="middle" fill="#65a30d" fontSize="20">3.14</text>
         <text x="40" y="72" textAnchor="middle" fill="#84cc16" fontSize="10">8 bytes</text>
       </g>

       {/* Char */}
       <g transform="translate(200, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="80" height="80" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
         <text x="40" y="30" textAnchor="middle" fill="#9d174d" fontWeight="bold">char</text>
         <text x="40" y="55" textAnchor="middle" fill="#db2777" fontSize="24">'A'</text>
         <text x="40" y="72" textAnchor="middle" fill="#f472b6" fontSize="10">1 byte</text>
       </g>

       {/* String */}
       <g transform="translate(290, 20)" className="hover:translate-y-[-4px] transition-all duration-300" style={{cursor: 'pointer'}}>
         <rect width="90" height="80" rx="12" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
         <text x="45" y="30" textAnchor="middle" fill="#9a3412" fontWeight="bold">string</text>
         <text x="45" y="55" textAnchor="middle" fill="#ea580c" fontSize="16">"Hi!"</text>
         <text x="45" y="72" textAnchor="middle" fill="#fb923c" fontSize="10">Dynamic</text>
       </g>
       
       {/* Container Metaphor */}
       <text x="200" y="140" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="bold">就像不同大小的容器</text>
       <path d="M 60 110 Q 60 130 150 135" fill="none" stroke="#94a3b8" strokeDasharray="4 4" />
       <path d="M 335 110 Q 335 130 250 135" fill="none" stroke="#94a3b8" strokeDasharray="4 4" />
    </svg>
  </div>
);

const IOIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="160" viewBox="0 0 400 160" className="drop-shadow-lg">
      {/* Keyboard */}
      <g transform="translate(20, 50)">
         <rect width="60" height="40" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
         <path d="M 30 55 L 30 85" stroke="#64748b" strokeWidth="2" />
         <text x="30" y="25" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Keyboard</text>
         <rect x="10" y="55" width="40" height="2" fill="#cbd5e1" />
      </g>

      {/* Screen */}
      <g transform="translate(320, 50)">
         <rect width="60" height="40" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
         <path d="M 30 55 L 30 85" stroke="#64748b" strokeWidth="2" />
         <text x="30" y="25" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">Screen</text>
         <rect x="10" y="55" width="40" height="2" fill="#cbd5e1" />
      </g>

      {/* Program Box */}
      <g transform="translate(150, 40)">
        <rect width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="50" y="35" textAnchor="middle" fill="#4338ca" fontWeight="bold">C++ Program</text>
      </g>

      {/* Arrows */}
      <g transform="translate(90, 70)">
         <path d="M 0 0 L 50 0" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" />
         <text x="25" y="-10" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="bold">cin &gt;&gt;</text>
      </g>

      <g transform="translate(260, 70)">
         <path d="M 0 0 L 50 0" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)" />
         <text x="25" y="-10" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">cout &lt;&lt;</text>
      </g>

      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
        </marker>
        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  </div>
);

const TypeCastIllustration = () => (
  <div className="w-full my-12 flex justify-center">
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-1 border border-slate-200 dark:border-slate-700 shadow-2xl max-w-4xl w-full">
      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-[1.4rem] overflow-hidden">
        <svg viewBox="0 0 800 500" className="w-full h-auto max-h-[400px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradInt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="gradFloat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
             <linearGradient id="gradChar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="offsetblur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="arrowBig" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Section 1: The Metaphor (Top Half) */}
          <g transform="translate(50, 40)">
             <text x="0" y="0" className="fill-slate-500 dark:fill-slate-400 font-bold text-lg" fontSize="18">1. 数据的形态 (Data Metaphors)</text>
             
             {/* Int - Ice Cube */}
             <g transform="translate(50, 40)" filter="url(#shadow)">
                <rect width="120" height="120" rx="20" fill="url(#gradInt)" stroke="#2563eb" strokeWidth="2" />
                <text x="60" y="55" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Int</text>
                <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">固态 (Ice)</text>
                <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">形状固定</text>
             </g>

             {/* Arrow */}
             <g transform="translate(190, 90)">
                <path d="M 0 0 L 60 0" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 6" markerEnd="url(#arrowBig)" />
             </g>

             {/* Float - Water Drop */}
             <g transform="translate(280, 40)" filter="url(#shadow)">
                 <path d="M 60 120 C 20 120 0 80 0 60 C 0 30 60 0 60 0 C 60 0 120 30 120 60 C 120 80 100 120 60 120 Z" fill="url(#gradFloat)" stroke="#0284c7" strokeWidth="2" />
                 <text x="60" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">Float</text>
                 <text x="60" y="90" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">液态 (Water)</text>
             </g>

             {/* Arrow */}
             <g transform="translate(420, 90)">
                <path d="M 0 0 L 60 0" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="6 6" markerEnd="url(#arrowBig)" />
             </g>

             {/* Char - Patterned Ice */}
             <g transform="translate(510, 40)" filter="url(#shadow)">
                 <rect width="120" height="120" rx="20" fill="url(#gradChar)" stroke="#be185d" strokeWidth="2" />
                 <text x="60" y="55" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">'A'</text>
                 <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">Char</text>
                 <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">本质是整数</text>
             </g>
          </g>

          {/* Section 2: Promotion Chain (Bottom Half) */}
          <g transform="translate(50, 250)">
             <text x="0" y="0" className="fill-slate-500 dark:fill-slate-400 font-bold text-lg" fontSize="18">2. 自动提升链 (Promotion Chain)</text>
             
             {/* Background Track */}
             <path d="M 0 100 L 700 100" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-700" />

             {/* Bool */}
             <g transform="translate(40, 100)">
                <circle r="25" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-600 font-bold" fontSize="14">bool</text>
                <text y="45" textAnchor="middle" className="fill-slate-400" fontSize="12">1 byte</text>
             </g>

             <path d="M 80 100 L 120 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Char/Short */}
             <g transform="translate(160, 100)">
                <circle r="35" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-700 font-bold" fontSize="16">char</text>
                <text y="55" textAnchor="middle" className="fill-slate-400" fontSize="12">1-2 bytes</text>
             </g>

             <path d="M 210 100 L 250 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Int */}
             <g transform="translate(310, 100)">
                <circle r="45" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
                <text y="5" textAnchor="middle" className="fill-slate-800 font-bold" fontSize="20">int</text>
                <text y="65" textAnchor="middle" className="fill-slate-400" fontSize="12">4 bytes</text>
             </g>

             <path d="M 370 100 L 410 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Long */}
             <g transform="translate(470, 100)">
                <circle r="50" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
                <text y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="22">long</text>
             </g>

             <path d="M 535 100 L 575 100" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowBig)" />

             {/* Double */}
             <g transform="translate(640, 100)">
                <circle r="60" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
                <text y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="24">double</text>
                <text y="80" textAnchor="middle" className="fill-slate-400" fontSize="12">8 bytes</text>
             </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
);

const OperatorIllustration = () => (
  <div className="flex justify-center my-8">
    <svg width="400" height="140" viewBox="0 0 400 140" className="drop-shadow-lg">
       {/* Modulo */}
       <g transform="translate(50, 20)">
         <circle cx="40" cy="40" r="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
         <text x="40" y="35" textAnchor="middle" fill="#b45309" fontSize="24" fontWeight="bold">%</text>
         <text x="40" y="55" textAnchor="middle" fill="#d97706" fontSize="10">取余数</text>
         <text x="40" y="95" textAnchor="middle" fill="#92400e" fontSize="12">7 % 3 = 1</text>
       </g>

       {/* Increment */}
       <g transform="translate(250, 20)">
         <circle cx="40" cy="40" r="35" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
         <text x="40" y="35" textAnchor="middle" fill="#047857" fontSize="24" fontWeight="bold">++</text>
         <text x="40" y="55" textAnchor="middle" fill="#059669" fontSize="10">自增1</text>
         <text x="40" y="95" textAnchor="middle" fill="#065f46" fontSize="12">i = i + 1</text>
       </g>
       
       <text x="200" y="70" textAnchor="middle" fill="#94a3b8" fontSize="24" fontWeight="bold">VS</text>
    </svg>
  </div>
);




export const basicsSections: Section[] = [
  {
    id: 'cpp-variables',
    category: 'C++编程基础',
    title: '1. 数据的容器——变量',
    type: 'lesson',
    content: (
      <div className="space-y-10 text-slate-600 dark:text-slate-300">
        <p className="leading-relaxed text-lg">
          计算机的核心功能是<strong className="font-bold text-slate-800 dark:text-white mx-1">处理数据</strong>。但数据不能凭空存在，必须先在内存中给它找一个“家”，这个“家”就是<strong className="font-bold text-slate-800 dark:text-white mx-1">变量</strong>。
        </p>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm">
             <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-xl flex items-center gap-3">
                <Lightbulb size={24} /> 形象类比：变量 = 带标签的抽屉
             </h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
                    <span className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl shrink-0">🏷️</span>
                    <div>
                        <strong className="text-slate-800 dark:text-slate-200 text-lg block mb-1">抽屉的标签 = 变量名</strong>
                        <span className="text-sm text-slate-500">用来找到这个抽屉 (e.g., score)</span>
                    </div>
                </li>
                <li className="flex items-start gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-indigo-900/50">
                    <span className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl shrink-0">🍎</span>
                    <div>
                        <strong className="text-slate-800 dark:text-slate-200 text-lg block mb-1">抽屉里的东西 = 变量的值</strong>
                        <span className="text-sm text-slate-500">实际存放的数据 (e.g., 95)</span>
                    </div>
                </li>
             </ul>
             <p className="mt-6 text-base text-indigo-600 dark:text-indigo-400 italic text-center border-t border-indigo-100 dark:border-indigo-800 pt-4">
                “变量”之所以叫变量，是因为程序运行时，可以不断更换抽屉里的东西。
             </p>
        </div>

        <VariableIllustration />

        <div>
          <SectionHeader icon={Box} title="1.1 什么是变量？" subtitle="在内存里给数据找个“家”" />
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 mt-1"><CheckCircle2 size={20} /></div>
                <div>
                    <strong className="text-slate-900 dark:text-white text-lg block mb-2">定义</strong>
                    <p className="leading-relaxed">
                        变量是内存中<strong className="mx-1 text-slate-800 dark:text-slate-200 bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">一个有名字的存储单元</strong>，用来保存某种类型的数据，它的值在程序运行过程中可以改变。
                    </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 mt-1"><CheckCircle2 size={20} /></div>
                <div>
                    <strong className="text-slate-900 dark:text-white text-lg block mb-2">基本原则：先声明，后使用</strong>
                    <p className="leading-relaxed">
                        像住酒店要先登记房间，才可以入住；在代码中，必须先告诉编译器“我有个变量叫啥、是什么类型”，然后才能用。
                    </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col h-full">
                 <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <Code2 size={18} className="text-indigo-500"/> 示例：变量的基本使用
                 </h5>
                 <div className="flex-1 flex flex-col">
                    <CodeBlock 
                        className="flex-1"
                        code={`#include <iostream>
using namespace std;

int main() {
    int score;        // 声明：申请一个格子叫 score
    score = 95;       // 赋值：把 95 放进格子里

    cout << "考试成绩: " << score << endl;

    score = 100;      // 修改：把原来的 95 换成 100
    cout << "修正后: " << score << endl;

    return 0;
}`} 
                        language="cpp"
                    />
                 </div>
            </div>
            <div className="flex flex-col h-full space-y-4">
                 <QuizCard 
                    className="flex-1"
                    title="小练习 1：找茬"
                    question="下面这段代码有什么问题？请说明原因。"
                    code={`int main() {
              cout << x << endl;
              int x = 10;
              return 0;
          }`}
                    answer={
                        <div className="text-sm">
                            <strong className="text-red-500 block mb-2 text-base">错误原因：违反了“先声明，后使用”原则。</strong>
                            <p className="leading-relaxed">编译器读到 <code>cout &lt;&lt; x</code> 时，还不知道 <code>x</code> 是谁（因为声明在下一行）。就像你要先认识一个人，才能叫出他的名字。</p>
                        </div>
                    }
                    type="basic"
                 />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={Code2} title="1.2 变量的声明与初始化" subtitle="“创建抽屉”和“放第一样东西”" />
          
          <p className="mb-6 leading-relaxed">
             在 C++ 中，创建一个变量通常有两件事：<br/>
             1. <strong className="text-slate-800 dark:text-white">声明 (Declaration)</strong>：告诉编译器“我要一个什么类型、什么名字的变量”。<br/>
             2. <strong className="text-slate-800 dark:text-white">初始化 (Initialization)</strong>：在变量诞生的那一刻，给它一个<strong className="text-indigo-600 dark:text-indigo-400">初始值</strong>。
          </p>

          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col h-full space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">四种初始化方式对比</h4>
                <CodeBlock 
                    code={`int main() {
    // 1. 先声明，后赋值
    int a;      // 此时 a 里是“垃圾值”！
    a = 10;     // 现在才有明确的值

    // 2. 声明并赋值 (复制初始化，最常用)
    int b = 20; 

    // 3. 括号初始化
    int c(30); 

    // 4. 列表初始化 (C++11, 推荐)
    int d{40}; 
    
    return 0;
}`} 
                    language="cpp"
                />
                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl text-sm text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-800 flex-1">
                    <strong className="block mb-2 flex items-center gap-2 text-base"><AlertTriangle size={18}/> 警惕“垃圾值”</strong>
                    <p className="leading-relaxed">如果声明局部变量 <code>int e;</code> 而不初始化，它的值是<strong className="underline decoration-wavy decoration-amber-500">未定义</strong>的（内存里原有的随机数据），直接使用会导致不可预测的错误。</p>
                </div>
            </div>
            
            <div className="flex flex-col h-full space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-4">连锁赋值的陷阱</h4>
                    <CodeBlock 
                        code={`// ❌ 错误示范
// int x = y = z = 5; 
// y 和 z 还没声明，报错！

// ✅ 正确方式
int x, y, z;   // 先声明三个
x = y = z = 5; // 再连锁赋值`} 
                        language="cpp"
                    />
                </div>
                 <QuizCard 
                    className="flex-1"
                    title="小练习 2：代码推演"
                    question="写出下面代码中 a, b, c 的最终值："
                    code={`int a = 10;
int b(a);
int c{a + b};
a = 5;`}
                    answer={
                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li><code>a = 5</code> (最后被修改了)</li>
                            <li><code>b = 10</code> (初始化时 a 是 10)</li>
                            <li><code>c = 20</code> (初始化时 10 + 10)</li>
                        </ul>
                    }
                    type="challenge"
                 />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={AlertTriangle} title="1.3 标识符的命名规则" subtitle="给“抽屉”起一个好名字" />
          
          <p className="mb-6 leading-relaxed">
            变量名、函数名等统称为<strong className="text-slate-800 dark:text-white">标识符 (Identifier)</strong>。起名字既要<strong className="text-emerald-600 dark:text-emerald-400">合法</strong>（遵守家规），又要<strong className="text-indigo-600 dark:text-indigo-400">好读</strong>（见名知意）。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <h5 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <CheckCircle2 size={20} className="text-emerald-500"/> 语法规则（必须遵守）
                </h5>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>只能包含：字母、数字、下划线</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-red-500">不能以数字开头</strong> (<code>1count</code> ❌)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-indigo-500">大小写敏感</strong> (Name ≠ name)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div><strong className="text-red-500">不能用关键字</strong> (int, class...)</li>
                </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <h5 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <Lightbulb size={20} className="text-amber-500"/> 命名建议（好读好懂）
                </h5>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <span className="text-red-400 line-through decoration-2">int a, b, c;</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">int height, weight;</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <span className="text-red-400 line-through decoration-2">int t;</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">int total_score;</span>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-2 text-center">让别人一眼看懂你的意图，不要让代码变成天书。</p>
                </div>
            </div>
          </div>

          <QuizCard 
                title="小练习 3：命名大挑战"
                question="1. 判断合法性：1stNumber, _total, double, Name, classroom-1。2. 为'学生数学成绩'起个好名字。"
                answer={
                    <div className="text-sm space-y-3">
                        <div>
                            <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">1. 合法性判断：</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded text-red-700 dark:text-red-300">
                                    <code>1stNumber</code> <span>❌</span>
                                </div>
                                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded text-emerald-700 dark:text-emerald-300">
                                    <code>_total</code> <span>✅</span>
                                </div>
                                <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded text-red-700 dark:text-red-300">
                                    <code>double</code> <span>❌</span>
                                </div>
                                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded text-emerald-700 dark:text-emerald-300">
                                    <code>Name</code> <span>✅</span>
                                </div>
                                <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded text-red-700 dark:text-red-300">
                                    <code>classroom-1</code> <span>❌</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                            <p className="font-bold text-slate-700 dark:text-slate-300">2. 推荐命名：</p>
                            <p className="mt-1 text-indigo-600 dark:text-indigo-400 font-mono">mathScore, math_score</p>
                        </div>
                    </div>
                }
                type="basic"
          />
        </div>
      </div>
    )
  },
  {
    id: 'cpp-datatypes',
    category: 'C++编程基础',
    title: '2. 数据的分类——数据类型',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg">程序离不开“数据”，而数据类型决定了：这一块内存能存多大的数、多精确的数；这些数可以参与哪些运算。</p>

        <DataTypesIllustration />

        <div>
          <SectionHeader icon={Binary} title="2.1 常见基本数据类型概览" subtitle="“几种常用数据，各司其职”" />
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <th className="p-4 font-bold">类型</th>
                  <th className="p-4 font-bold">关键字</th>
                  <th className="p-4 font-bold">典型大小</th>
                  <th className="p-4 font-bold">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900/50">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">int</code></td>
                  <td className="p-4">4 字节</td>
                  <td className="p-4">最常用的整数</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">短整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">short</code></td>
                  <td className="p-4">2 字节</td>
                  <td className="p-4">节省空间的整数</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">长整型</td>
                  <td className="p-4"><code className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">long long</code></td>
                  <td className="p-4">8 字节</td>
                  <td className="p-4">超大整数 ({'>'} 20亿)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">单精度浮点</td>
                  <td className="p-4"><code className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded">float</code></td>
                  <td className="p-4">4 字节</td>
                  <td className="p-4">约7位有效数字</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">双精度浮点</td>
                  <td className="p-4"><code className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded">double</code></td>
                  <td className="p-4">8 字节</td>
                  <td className="p-4">默认小数类型，约15位精度</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">字符型</td>
                  <td className="p-4"><code className="bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded">char</code></td>
                  <td className="p-4">1 字节</td>
                  <td className="p-4">单个字符 (ASCII码)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900 dark:text-white">布尔型</td>
                  <td className="p-4"><code className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">bool</code></td>
                  <td className="p-4">1 字节</td>
                  <td className="p-4">true (1) 或 false (0)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <div className="flex flex-col space-y-4">
                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">示例 2.1-1：用 sizeof 观察各种类型的大小</h4>
                 <CodeBlock 
                    code={`#include <iostream>
using namespace std;

int main() {
    cout << "sizeof(bool)      = " << sizeof(bool)      << " 字节\\n";
    cout << "sizeof(char)      = " << sizeof(char)      << " 字节\\n";
    cout << "sizeof(short)     = " << sizeof(short)     << " 字节\\n";
    cout << "sizeof(int)       = " << sizeof(int)       << " 字节\\n";
    cout << "sizeof(long)      = " << sizeof(long)      << " 字节\\n";
    cout << "sizeof(long long) = " << sizeof(long long) << " 字节\\n";
    cout << "sizeof(float)     = " << sizeof(float)     << " 字节\\n";
    cout << "sizeof(double)    = " << sizeof(double)    << " 字节\\n";

    return 0;
}`} 
                    language="cpp"
                 />
                 <KnowledgeCard title="小贴士" icon={Info} type="info">
                    具体字节数取决于编译器和操作系统，可以使用 <code>sizeof()</code> 运算符查看。
                 </KnowledgeCard>
             </div>
             
             <div className="flex flex-col space-y-4">
                 <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">示例 2.1-2：不同类型适合存什么</h4>
                 <CodeBlock 
                    code={`#include <iostream>
using namespace std;

int main() {
    bool isPassed = true;                // 是否及格
    int age = 20;                        // 年龄
    long long population = 1400000000LL; // 人口数量
    double pi = 3.1415926535;            // 精确的圆周率
    float score = 95.5f;                 // 成绩，单精度

    cout << boolalpha; // 让 bool 打印 true/false 而不是 1/0
    cout << "isPassed = " << isPassed << endl;
    cout << "age      = " << age << endl;
    cout << "population = " << population << endl;
    cout << "pi       = " << pi << endl;
    cout << "score    = " << score << endl;

    return 0;
}`} 
                    language="cpp"
                 />
             </div>

             <QuizCard 
                title="小练习 2.1"
                question="为下列场景选择一个合适的类型（int, long long, double, bool）："
                answer={
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>某人的年龄（0–150）：<code>int</code> (或者 short)</li>
                        <li>某国人口总数（{'>'} 10亿）：<code>long long</code></li>
                        <li>商品价格（19.99）：<code>double</code></li>
                        <li>用户是否登录成功：<code>bool</code></li>
                    </ul>
                }
                type="basic"
             />
          </div>
        </div>

        <div>
          <SectionHeader icon={Code2} title="2.2 字符串类型 std::string" subtitle="存“一整句文字”的类型" />
          
          <div className="space-y-6">
              <p className="leading-relaxed">
                  在 C++ 中：<br/>
                  - 单个字符 用 <code>char</code> 表示，使用单引号 <code>' '</code>；<br/>
                  - 一串文本 用 <code>std::string</code> 表示，使用双引号 <code>" "</code>。<br/>
                  使用 string 需要引入头文件 <code>#include &lt;string&gt;</code>。
              </p>

              <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.1 char 与 string 的基本使用</h4>
                    <CodeBlock 
                        code={`#include <iostream>
#include <string> // 必须引入头文件
using namespace std;

int main() {
    // 字符类型：存一个字符，用单引号
    char letter = 'A'; 
    
    // 字符串类型：存一整串文字，用双引号
    string greeting = "Hello C++";
    string school = "嘉庚学院";

    cout << "letter: " << letter << endl;
    cout << greeting << ", " << school << endl;
    return 0;
}`}
                        language="cpp"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.2 字符串的简单拼接</h4>
                    <CodeBlock 
                        code={`string name = "张三";
string hello = "你好，";
string end = "，欢迎学习 C++！";

// 用 + 号拼接
string msg = hello + name + end;
cout << msg << endl;

// 在 cout 中拼接输出
string school = "嘉庚学院";
string major  = "计算机科学";
cout << "我在" << school << "学习" << major << "。" << endl;`}
                        language="cpp"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">2.2.3 标准输出的“格式化”</h4>
                    <p className="mb-4 text-sm">
                        需要 <code>#include &lt;iomanip&gt;</code>。常用控制符：<br/>
                        <code>setw(n)</code>: 设置宽度 | <code>setfill(c)</code>: 填充字符 | <code>setprecision(n)</code>: 精度 | <code>fixed</code>: 固定小数位
                    </p>
                    <CodeBlock 
                        code={`#include <iostream>
#include <iomanip> 
using namespace std;

int main() {
    double a = 3.1415926;
    // fixed + setprecision(3) -> 保留3位小数
    cout << "小数位(3):  " << fixed << setprecision(3) << a << endl;

    int b = 255;
    // setw(5) + setfill('0') -> 宽度5，左补0
    cout << "0填充:    " << setw(5) << setfill('0') << b << endl;
    
    return 0;
}`}
                        language="cpp"
                    />
                  </div>

                  <QuizCard 
                    title="小练习 2.2：格式化输出挑战"
                    question="请写出代码：定义 string name='Alice', int age=20, double height=1.678。输出格式：'姓名: Alice, 年龄: 20, 身高: 1.68m'（保留2位小数）。"
                    code={`// 提示：
// cout << "姓名: " << name ... << fixed << setprecision(2) << height ...`}
                    answer={
                        <CodeBlock 
                            code={`cout << "姓名: " << name 
     << ", 年龄: " << age 
     << ", 身高: " << fixed << setprecision(2) << height << "m" << endl;`} 
                            language="cpp" 
                        />
                    }
                    type="challenge"
                  />
              </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="2.3 给类型起别名" subtitle="给复杂类型取个小名" />
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">传统方式 (typedef)</span>
                    <code className="block mt-2 text-sm">typedef double Area;</code>
                    <code className="block mt-1 text-sm text-slate-500">Area circleArea = 3.14;</code>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">推荐</div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">现代方式 (using)</span>
                    <code className="block mt-2 text-sm">using Area = double;</code>
                    <code className="block mt-1 text-sm text-slate-500">Area roomArea = 20.5;</code>
                </div>
            </div>
            
            <QuizCard 
                title="小练习 2.3"
                question="使用 using 为 unsigned int 起名为 UInt，并定义一个变量。"
                answer={
                    <div className="font-mono text-sm">
                        using UInt = unsigned int;<br/>
                        UInt studentCount = 100;
                    </div>
                }
                type="basic"
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-io',
    category: 'C++编程基础',
    title: '3. 数据的输入与输出 (I/O)',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p className="text-lg">我们通过 iostream 库与用户进行交互。</p>

        <IOIllustration />

        <div>
          <SectionHeader icon={Keyboard} title="3.1 标准输入输出流" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-blue-500 font-mono">cout</span> (Output)
                </h4>
                <p className="text-sm mb-4">配合 <code>&lt;&lt;</code> (插入运算符)，将数据发送到屏幕。</p>
                <code className="block bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm">cout &lt;&lt; "Hello";</code>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border-l-4 border-green-500 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-green-500 font-mono">cin</span> (Input)
                </h4>
                <p className="text-sm mb-4">配合 <code>&gt;&gt;</code> (提取运算符)，从键盘获取数据存入变量。</p>
                <code className="block bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm">cin &gt;&gt; x;</code>
            </div>
          </div>
          
          <KnowledgeCard title="进阶技巧：连续输入" icon={Zap} type="zap">
            <p className="text-sm mb-4">cin 能够自动跳过空格和回车，非常适合一次输入多个数据。</p>
            <CodeBlock 
              code={`int id;
double score;
char grade;

// 用户输入：101 98.5 A
cin >> id >> score >> grade; `}
              language="cpp"
            />
          </KnowledgeCard>
        </div>

        <div>
          <SectionHeader icon={Code2} title="3.2 格式化输出" subtitle="需要用到 <iomanip> 库。" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="p-3">控制符</th>
                                <th className="p-3">作用</th>
                                <th className="p-3">示例</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                            <tr>
                                <td className="p-3 font-mono text-purple-600">fixed</td>
                                <td className="p-3">固定点表示法</td>
                                <td className="p-3"><code>cout &lt;&lt; fixed;</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setprecision(n)</td>
                                <td className="p-3">设置小数位数</td>
                                <td className="p-3"><code>setprecision(2)</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setw(n)</td>
                                <td className="p-3">设置域宽</td>
                                <td className="p-3"><code>setw(5)</code></td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-purple-600">setfill(c)</td>
                                <td className="p-3">设置填充字符</td>
                                <td className="p-3"><code>setfill('0')</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs h-full">
                    <div className="mb-2 text-slate-500 border-b border-slate-700 pb-2">Terminal Output</div>
                    <div>
                        <span className="text-green-400">➜</span> ./main<br/>
                        默认输出: 3.14159<br/>
                        保留两位: 3.14<br/>
                        左对齐填充: 123*******
                    </div>
                </div>
            </div>
          </div>
          
          <div className="mt-4">
            <CodeBlock 
                code={`#include <iostream>
#include <iomanip> 
using namespace std;

int main() {
    double pi = 3.1415926;
    cout << "保留两位: " << fixed << setprecision(2) << pi << endl;
    
    int num = 123;
    cout << "左对齐填充: " << left << setw(10) << setfill('*') << num << endl;
    return 0;
}`}
                language="cpp"
            />
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="3.3 转义字符" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { code: '\\n', desc: '换行' },
                { code: '\\t', desc: '制表符 (Tab)' },
                { code: '\\\\', desc: '反斜杠' },
                { code: '\\"', desc: '双引号' }
            ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:scale-105 transition-transform">
                    <code className="text-xl font-bold text-indigo-600 dark:text-indigo-400 block mb-2">{item.code}</code>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-type-conversion',
    category: 'C++编程基础',
    group: '4. 数据的变形——类型转换',
    title: '核心概念讲解',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        
        {/* Intro Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🧊</div>
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1">整数 (Int)</h4>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">像冰块，形状固定，一块一块。</p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">💧</div>
                <h4 className="font-bold text-sky-700 dark:text-sky-300 mb-1">浮点数 (Float)</h4>
                <p className="text-sm text-sky-600/80 dark:text-sky-400/80">像液态水，流动、可分得更细。</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-5 rounded-2xl border border-pink-100 dark:border-pink-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">❄️</div>
                <h4 className="font-bold text-pink-700 dark:text-pink-300 mb-1">字符 (Char)</h4>
                <p className="text-sm text-pink-600/80 dark:text-pink-400/80">像印着图案的冰块，本质仍是整数。</p>
            </div>
        </div>

        <p className="text-lg leading-relaxed px-2">
            <strong>类型转换</strong>就是把一种“形态”的数据变成另一种形态。
            主要分为 <span className="text-indigo-600 dark:text-indigo-400 font-bold">隐式转换</span>（系统自动）和 <span className="text-indigo-600 dark:text-indigo-400 font-bold">显式转换</span>（人为强制）。
        </p>
        
        <TypeCastIllustration />

        <div>
          <SectionHeader icon={ArrowRightLeft} title="4.1 自动转换：系统的“潜规则”" subtitle="Implicit Conversion" />
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <Scale size={20} className="text-indigo-500" /> 总原则：宁可浪费空间，不可轻易丢精度
              </h4>
              <p className="text-sm leading-relaxed">
                  可以把每种类型想象成一个“容器”。一般原则是：<strong className="text-indigo-600 dark:text-indigo-400">小容器的数据可以安全倒进大容器</strong>，反过来就可能溢出或丢东西。
              </p>
          </div>

          <div className="space-y-8">
            <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-indigo-900">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">规则一：整型提升 (Integral Promotion)</h4>
              <p className="text-sm mb-3 text-slate-500">CPU 最爱 int。char / short / bool 在运算前都会自动变成 int。</p>
              <CodeBlock 
                code={`char c = 'A';   // ASCII 65
short s = 2;
// 实际计算：65(int) + 2(int) = 67(int)
cout << c + s;  // 输出 67`}
                language="cpp"
              />
            </div>

            <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-indigo-900">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">规则二：混合运算，看谁“更大”</h4>
              <p className="text-sm mb-3 text-slate-500">当整数遇上浮点数，整数会“投降”变成浮点数。</p>
              <CodeBlock 
                code={`int a = 5;
double b = 2.5;
// a 自动变成 5.0，结果是 7.5 (double)
auto result = a + b; `}
                language="cpp"
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="4.2 赋值转换：霸道的“左值”" subtitle="Assignment Conversion" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-800/50">
                  <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400 font-bold text-lg">
                      <AlertTriangle /> 危险：大材小用 (截断)
                  </div>
                  <p className="text-sm mb-4">把小数塞进整数变量，小数部分会被直接<strong className="text-red-600">砍掉</strong>！</p>
                  <CodeBlock 
                    code={`double price = 19.99;
int pay = price; 
// pay 变成 19 (亏了0.99)`}
                    language="cpp"
                  />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      <CheckCircle2 /> 安全：小材大用
                  </div>
                  <p className="text-sm mb-4">把整数赋给浮点变量，自动补零，安全无虞。</p>
                  <CodeBlock 
                    code={`int n = 100;
double d = n;
// d 变成 100.0`}
                    language="cpp"
                  />
              </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={Database} title="4.3 显式转换：程序员的“强权”" subtitle="Explicit Casting" />
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <h4 className="font-bold text-lg mb-4">经典案例：修复整数除法精度</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                     <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Before (Buggy)</span>
                     <CodeBlock 
                        code={`int a = 5, b = 2;
double r = a / b;
// 结果：2.0 ❌`} 
                        language="cpp" 
                     />
                     <p className="text-xs text-slate-400">整数除法先发生，结果截断为2，再转double。</p>
                 </div>
                 <div className="space-y-2">
                     <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">After (Fixed)</span>
                     <CodeBlock 
                        code={`int a = 5, b = 2;
double r = static_cast<double>(a) / b;
// 结果：2.5 ✅`} 
                        language="cpp" 
                     />
                     <p className="text-xs text-slate-400">先将 a 强转为 double，触发浮点除法。</p>
                 </div>
             </div>
          </div>
          
          <div className="mt-6">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2">两种写法对比</h5>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                            <th className="p-3">风格</th>
                            <th className="p-3">语法</th>
                            <th className="p-3">评价</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        <tr>
                            <td className="p-3">C 语言风格</td>
                            <td className="p-3 font-mono text-purple-600">(double)a</td>
                            <td className="p-3">简单粗暴，但不易检查，不推荐</td>
                        </tr>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                            <td className="p-3">C++ 风格</td>
                            <td className="p-3 font-mono text-emerald-600">static_cast&lt;double&gt;(a)</td>
                            <td className="p-3 font-bold text-emerald-600">清晰安全，推荐使用 👍</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4.4 小结：常见类型转换场景表</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-center border-collapse">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">场景</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">转换方向</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">结果</th>
                            <th className="p-3 border-b dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">潜在风险</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-slate-900/50">
                            <td className="p-3 border-b dark:border-slate-700">整型提升</td>
                            <td className="p-3 border-b dark:border-slate-700">char/short → int</td>
                            <td className="p-3 border-b dark:border-slate-700">数值不变</td>
                            <td className="p-3 border-b dark:border-slate-700 text-emerald-600 font-medium">无 (安全)</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                            <td className="p-3 border-b dark:border-slate-700">混合运算</td>
                            <td className="p-3 border-b dark:border-slate-700">int → double</td>
                            <td className="p-3 border-b dark:border-slate-700">数值不变 (变为.0)</td>
                            <td className="p-3 border-b dark:border-slate-700 text-emerald-600 font-medium">无 (安全)</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-900/50">
                            <td className="p-3 border-b dark:border-slate-700">赋值截断</td>
                            <td className="p-3 border-b dark:border-slate-700">double → int</td>
                            <td className="p-3 border-b dark:border-slate-700">丢弃小数</td>
                            <td className="p-3 border-b dark:border-slate-700 text-red-500 font-medium">精度丢失</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/30">
                            <td className="p-3">强制转换</td>
                            <td className="p-3">程序员指定</td>
                            <td className="p-3">按指定类型</td>
                            <td className="p-3 text-orange-500 font-medium">需程序员负责</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8">
          <SectionHeader icon={CheckCircle2} title="4.5 课堂练习与巩固" />
          <div className="grid grid-cols-1 gap-6">
            <QuizCard 
                title="题目 1：预测输出并说明原因"
                question="观察 char 和整数的加法运算："
                code={`char c = 'A'; \ncout << c + 2 << endl;`}
                answer={
                    <ul className="list-disc list-inside space-y-2">
                        <li>运算前 c 作为 char 会先进行<strong>整型提升</strong> → int，'A' 的编码是 65。</li>
                        <li>表达式实际是 (65 + 2)，结果是 67，类型为 int。</li>
                        <li>默认用 cout 直接输出时，显示的是整数 67。</li>
                        <li className="text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">思考：如果要输出 'C'，怎么办？<br/>答案：<code>cout &lt;&lt; static_cast&lt;char&gt;(c + 2);</code></li>
                    </ul>
                }
            />

            <QuizCard 
                title="题目 2：修复“整数除法”错误"
                question="分析并改正下面代码，让结果为 3.5："
                code={`int a = 7, b = 2; \ndouble x = a / b; // 希望得到 3.5`}
                answer={
                    <div className="space-y-3">
                        <div>
                            <span className="font-bold text-red-500">错误原因：</span>
                            <ul className="list-disc list-inside mt-1">
                                <li>a / b 中，a 和 b 都是 int，执行的是整数除法。</li>
                                <li>表达式结果是 3（丢掉小数），再赋值给 double，变成 3.0。</li>
                            </ul>
                        </div>
                        <div>
                            <span className="font-bold text-emerald-600">正确写法：</span>
                            <CodeBlock 
                                code={`double x1 = static_cast<double>(a) / b;   // 推荐
double x2 = 1.0 * a / b;                  // 技巧`}
                                language="cpp"
                            />
                        </div>
                    </div>
                }
                type="challenge"
            />

            <QuizCard 
                title="题目 3：类型推导 (auto)"
                question="猜测 v1 和 v2 的类型和值："
                code={`auto v1 = 3 + 2.0; \nauto v2 = 'A' + 1;`}
                answer={
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>v1：</strong> 3 是 int，2.0 是 double → 整数提升为 double。表达式结果是 5.0，类型为 double。</li>
                        <li><strong>v2：</strong> 'A' 是 char，参与运算前整型提升为 int（65）。表达式为 (65 + 1 = 66)，结果类型为 int，值为 66。</li>
                    </ul>
                }
            />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-type-conversion-quiz',
    category: 'C++编程基础',
    group: '4. 数据的变形——类型转换',
    title: '专项练习',
    type: 'quiz',
    quizData: {
      title: '类型转换专项测试',
      description: '本测试包含 30 道题目，涵盖隐式转换、显式转换、溢出与截断等核心知识点。',
      questions: [
  {
    "id": 1,
    "question": "隐式转换的一般原则 C++ 中，当不同类型的数据进行混合运算时，编译器会自动进行类型转换。这种转换通常遵循什么原则？",
    "options": [
      "A. 向占用内存更小的方向转换，以节省空间。",
      "B. 向精度更高、范围更大的方向转换，以避免溢出和精度丢失。",
      "C. 全部转换为 int 类型。",
      "D. 全部转换为 double 类型。",
      "E. 不进行任何转换，直接报错。"
    ],
    "correctAnswer": 1,
    "explanation": "隐式类型转换的核心原则是：宁可浪费一点空间，也要尽量少丢信息。\n所以会从“低精度 / 小范围”的类型往“高精度 / 大范围”的类型提升，比如 int 在和 double 混合时会先转为 double。"
  },
  {
    "id": 2,
    "question": "在 C++ 的整型提升规则中，char 和 short 在参与算术运算前，通常会被提升为哪种类型？",
    "options": [
      "A. long",
      "B. float",
      "C. int",
      "D. double",
      "E. unsigned int"
    ],
    "correctAnswer": 2,
    "explanation": "这是 整型提升（Integral Promotion）：\nchar / short / bool 等小整数类型在表达式中会自动提升为 int 再参与运算。"
  },
  {
    "id": 3,
    "question": "以下哪种写法属于 C++ 推荐的显式转换方式？",
    "options": [
      "A. (int)3.14",
      "B. int(3.14)",
      "C. [int]3.14",
      "D. static_cast<int>(3.14)",
      "E. convert_to_int(3.14)"
    ],
    "correctAnswer": 3,
    "explanation": "- A / B 都是 C 风格或“函数风格”强制转换。\n- C 语法错误。\n- static_cast<类型>(表达式) 是 C++ 提供的 类型安全、更显眼 的转换方式，建议在教学和项目中使用。"
  },
  {
    "id": 4,
    "question": "当我们将一个 double 类型的数据赋值给 int 类型的变量时，会发生什么？",
    "options": [
      "A. 四舍五入。",
      "B. 截断（直接丢弃小数部分）。",
      "C. 向上取整。",
      "D. 抛出运行时错误。",
      "E. 无法编译。"
    ],
    "correctAnswer": 1,
    "explanation": "浮点数转整数时，执行的是 截断（Truncation）：\n- 3.99 -> 3\n- -3.99 -> -3\n只是“扔掉小数部分”，与数学上的“取整”不同。"
  },
  {
    "id": 5,
    "question": "字符与整数、浮点与整数 关于 ASCII 码与整数、字符之间的关系，下列说法错误的是？",
    "options": [
      "A. char 本质上可以看作存储了一个小整数。",
      "B. 可以把 int 赋值给 char（只要在 char 可表示的范围内）。",
      "C. 字符 '0' 对应的整数值是 0。",
      "D. 表达式 'A' + 1 的结果是整数 66（假设 'A' 的编码为 65）。",
      "E. (int)'a' 可以得到字符 'a' 的编码。"
    ],
    "correctAnswer": 2,
    "explanation": "- '0' 的 ASCII 码是 48，不是数值 0。\n- 数值 0 对应的是空字符 '\\0'。\n其他选项均是对的。"
  },
  {
    "id": 6,
    "question": "下列关于 sizeof 的说法正确的是？",
    "options": [
      "A. sizeof(char) 的结果类型是 char。",
      "B. sizeof(int) 的结果类型是 int。",
      "C. sizeof 的结果类型是 size_t，一种无符号整数类型。",
      "D. sizeof 在运行时才能计算。",
      "E. sizeof 只对基本类型有效。"
    ],
    "correctAnswer": 2,
    "explanation": "sizeof 的结果类型是 size_t，一般是 unsigned int 或 unsigned long，用来表示“大小 / 长度”。"
  },
  {
    "id": 7,
    "question": "已知在某平台上 int 占 4 字节，double 占 8 字节，表达式 5 * 2.0 的结果占用多少字节？",
    "options": [
      "A. 4",
      "B. 8",
      "C. 12",
      "D. 16",
      "E. 2"
    ],
    "correctAnswer": 1,
    "explanation": "- 5 是 int，2.0 是 double。\n- 运算前 5 会被提升为 double，结果类型是 double。\n- double 占 8 字节。"
  },
  {
    "id": 8,
    "question": "下列哪个基础类型转换最容易导致“精度丢失”？",
    "options": [
      "A. float -> double",
      "B. int -> long",
      "C. int -> double",
      "D. double -> float",
      "E. char -> int"
    ],
    "correctAnswer": 3,
    "explanation": "double（双精度，大约 15 位有效数字）→ float（单精度，大约 6–7 位）时，可能丢失小数位甚至出现溢出。\nA / B / C / E 都是从“小”往“大”装，一般更安全。"
  },
  {
    "id": 9,
    "question": "隐式转换发生的场景 以下关于隐式类型转换（自动转换）的说法中，哪一项是错误的？",
    "options": [
      "A. 在赋值语句中，当右值类型与左值不同时，会发生隐式转换。",
      "B. 在算术运算中，不同类型一起运算会触发隐式转换。",
      "C. 函数调用时，实参类型与形参类型不完全匹配时可能发生隐式转换。",
      "D. 在 if 条件中，把 int 等非 bool 类型用作条件，会转成 bool。",
      "E. 所有类型转换都必须写 static_cast，C++ 不会自动转换。"
    ],
    "correctAnswer": 4,
    "explanation": "A / B / C / D 都是典型的 隐式转换场景。\nE 与事实相反——C++ 中隐式转换是非常普遍存在的。"
  },
  {
    "id": 10,
    "question": "关于 static_cast 在本节课涉及的用途，下列不属于它的作用的是：",
    "options": [
      "A. 在基础类型之间显式转换（如 int 转 char）。",
      "B. 把 int 转成 double，用于修正整数除法精度。",
      "C. 把一个整数看作字符来输出（如 static_cast<char>(65)）。",
      "D. 去掉一个变量的 const 属性。",
      "E. 在类的继承层次中，基类指针和派生类指针之间的安全转换。"
    ],
    "correctAnswer": 3,
    "explanation": "- 去掉 const 需要 const_cast，不在本节重点。\n- A / B / C / E 都是 static_cast 的合法用途。"
  },
  {
    "id": 11,
    "question": "整数 / 浮点除法与截断 执行代码： cout << 10 / 4; 输出结果是？",
    "options": [
      "A. 2.5",
      "B. 2",
      "C. 2.0",
      "D. 3",
      "E. 2.50"
    ],
    "correctAnswer": 1,
    "explanation": "10 和 4 都是 int，执行 整数除法：(10 / 4 = 2)，小数部分被直接丢掉。"
  },
  {
    "id": 12,
    "question": "执行代码： cout << 10 / 4.0; 输出结果是？",
    "options": [
      "A. 2",
      "B. 2.0",
      "C. 2.5",
      "D. 3",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "- 4.0 是 double，10 会先提升为 double。\n- 执行浮点除法，结果 (10.0 / 4.0 = 2.5)。"
  },
  {
    "id": 13,
    "question": "阅读代码并写出 c 的值： double a = 5.6; int b = 2; int c = a + b; c 的最终值是？",
    "options": [
      "A. 7.6",
      "B. 8",
      "C. 7",
      "D. 5",
      "E. 0"
    ],
    "correctAnswer": 2,
    "explanation": "1. 表达式 a + b：double + int -> double，结果为 7.6。\n2. 赋值给 int c 时发生截断：7.6 -> 7。"
  },
  {
    "id": 14,
    "question": "阅读代码，判断输出结果： cout << (int)3.8 + 3.2; 输出为？",
    "options": [
      "A. 7",
      "B. 7.0",
      "C. 6",
      "D. 6.2",
      "E. 6.0"
    ],
    "correctAnswer": 3,
    "explanation": "1. (int)3.8 先执行，结果是 3（截断）。\n2. 3 + 3.2：int + double -> double，结果 6.2。"
  },
  {
    "id": 15,
    "question": "已知 char ch = 'C';（假设 'C' 的编码是 67），执行： ch = ch + 2; 之后 ch 中存的字符是？",
    "options": [
      "A. 'C'",
      "B. 'D'",
      "C. 'E'",
      "D. 69",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "1. ch + 2：char 先提升为 int，67 + 2 = 69。\n2. 赋值回 char：69 被当作编码，对应字符 'E'。"
  },
  {
    "id": 16,
    "question": "阅读代码，判断输出： int a = 65; cout << static_cast<char>(a); 输出是？",
    "options": [
      "A. 65",
      "B. A",
      "C. a",
      "D. 编译错误",
      "E. 运行异常"
    ],
    "correctAnswer": 1,
    "explanation": "static_cast<char>(65) 把整数 65 当作 ASCII 编码输出，即 'A'。"
  },
  {
    "id": 17,
    "question": "已知： int a = 3, b = 4; float f = a / b; f 的值是？",
    "options": [
      "A. 0",
      "B. 0.0f",
      "C. 0.75f",
      "D. 1.0f",
      "E. 0.8f"
    ],
    "correctAnswer": 1,
    "explanation": "1. a / b 是 整数除法 → 结果是 0。\n2. 0 赋给 float f，得到 0.0f。"
  },
  {
    "id": 18,
    "question": "若要让上题中 f 的值正确为 0.75f，下列表达式哪一个是正确的修改方式？",
    "options": [
      "A. float f = (float)(a / b);",
      "B. float f = a / (float)b;",
      "C. float f = (a + b) / 4;",
      "D. float f = (int)a / (int)b;",
      "E. float f = (double)a / (double)b;"
    ],
    "correctAnswer": 1,
    "explanation": "- 需要“先把其中一个数变成浮点，再做除法”：\na / (float)b ： 3 / 4.0f -> 0.75f。\n- A 仍然是整数除法后再转型，结果还是 0。\n- E 也可以算正确值，但类型是 double，而不是题目中的 float。"
  },
  {
    "id": 19,
    "question": "auto 推导与混合类型 阅读代码： auto v1 = 3 + 2.0; auto v2 = 'A' + 1; 下列说法正确的是？",
    "options": [
      "A. v1 是 int，v2 是 char。",
      "B. v1 是 double，v2 是 int。",
      "C. v1 是 float，v2 是 char。",
      "D. v1 和 v2 都是 double。",
      "E. v1 和 v2 都是 int。"
    ],
    "correctAnswer": 1,
    "explanation": "- 3 + 2.0：int + double -> double，所以 v1 是 double。\n- 'A' + 1：char 先整型提升为 int（65），再加 1 还是 int，值为 66。"
  },
  {
    "id": 20,
    "question": "阅读代码并判断输出（假设默认输出格式）： int x = 5; double y = x / 2; cout << y; 输出更接近哪一项？",
    "options": [
      "A. 2.5",
      "B. 2",
      "C. 2.0",
      "D. 3",
      "E. 0"
    ],
    "correctAnswer": 1,
    "explanation": "1. x / 2 是整数除法 → 结果为 2。\n2. 2 赋值给 double y，变成 2.0。\n3. 默认格式下 cout 可能显示成 2（但底层值是 2.0）。"
  },
  {
    "id": 21,
    "question": "阅读代码，判断输出： float f = 1.23456789f; cout << (int)f; 输出为？",
    "options": [
      "A. 1",
      "B. 1.23456",
      "C. 123456789",
      "D. 0",
      "E. 随机值"
    ],
    "correctAnswer": 0,
    "explanation": "(int)f 进行截断，只保留整数部分 → 1。"
  },
  {
    "id": 22,
    "question": "阅读代码，分析执行步骤： int i = 5; float f = 2.5f; double d = (double)(i + f); 关于转换顺序，下列说法正确的是？",
    "options": [
      "A. 先把 f 转成 int，再 i + f，结果再转成 double。",
      "B. 先把 i 转成 float，i + f 得到 float，最后转 double。",
      "C. 先把 i 和 f 都转成 double，再相加。",
      "D. 不发生任何隐式转换，直接相加后转 double。",
      "E. 先把 i 转成 double，再与 f 相加。"
    ],
    "correctAnswer": 1,
    "explanation": "- i + f：int 会隐式提升为 float，结果是 float。\n- 最后外层 (double)(...) 把该 float 结果转为 double。"
  },
  {
    "id": 23,
    "question": "阅读代码，判断 avg 的值： int total = 10; int count = 4; double avg = static_cast<double>(total) / count; avg 的值为？",
    "options": [
      "A. 2",
      "B. 2.0",
      "C. 2.5",
      "D. 4.0",
      "E. 1.0"
    ],
    "correctAnswer": 2,
    "explanation": "- static_cast<double>(total) 让 10 先变成 10.0。\n- 10.0 / 4 → 浮点除法，得到 2.5。"
  },
  {
    "id": 24,
    "question": "有符号 / 无符号与溢出 阅读代码： unsigned int u = 10; int i = -20; cout << (u + i > 0); 输出是 1（true）还是 0（false）？",
    "options": [
      "A. 0",
      "B. 1",
      "C. 编译错误",
      "D. 程序崩溃",
      "E. -10"
    ],
    "correctAnswer": 1,
    "explanation": "- u 是 unsigned int，i 是 int。\n- 表达式 u + i 时，i 会被转换为 unsigned int，-20 变成一个很大的正数。\n- “很大的正数 + 10” 当然大于 0，所以条件为真，输出 1。"
  },
  {
    "id": 25,
    "question": "计算百分比时，初学者常写出这样的代码： int score = 80; int total = 100; double rate = score / total; rate 的实际值是？",
    "options": [
      "A. 0.8",
      "B. 80.0",
      "C. 0.0",
      "D. 1.0",
      "E. 0.80"
    ],
    "correctAnswer": 2,
    "explanation": "- score / total 是整数除法：80 / 100 = 0。\n- 0 再赋给 double rate，得到 0.0。\n- 想要 0.8，应写为：rate = static_cast<double>(score) / total;。"
  },
  {
    "id": 26,
    "question": "阅读代码并推断结果（假设 int 为 32 位）： int x = 2147483647; // 假设为 int 的最大值 x = x + 1; cout << x; 下列说法更贴近标准？",
    "options": [
      "A. 输出 2147483648。",
      "B. 自动升级为 long long，输出 2147483648。",
      "C. 发生整数溢出，行为未定义（很多实现中会“绕回”成负数）。",
      "D. 抛出异常。",
      "E. 保持不变，仍是 2147483647。"
    ],
    "correctAnswer": 2,
    "explanation": "- 超过 int 可表示的范围，属于 溢出，标准规定为 未定义行为。\n- 在大多数常见平台上会“绕回”，变成一个负数（通常是 -2147483648）。"
  },
  {
    "id": 27,
    "question": "为什么在 C++ 中更推荐使用 static_cast 而不是 (type) 这种 C 风格强制转换？",
    "options": [
      "A. C 风格转换无法通过编译。",
      "B. C 风格转换比 static_cast 慢很多。",
      "C. C 风格转换太“万能”，容易做出危险的转换，阅读代码时不够醒目。",
      "D. static_cast 才能进行基本类型之间的转换。",
      "E. static_cast 会自动检查所有越界问题。"
    ],
    "correctAnswer": 2,
    "explanation": "- C 风格转换语法简单但不够明确，也可能执行一些高风险转换（类似 reinterpret_cast）。\n- static_cast 语义明确，更容易在代码审查时看出“这里发生了类型转换”。"
  },
  {
    "id": 28,
    "question": "字节范围与溢出、布尔转换 假设在某实现中 char 是 8 位有符号类型（范围约为 -128~127）。执行： char c = 130; cout << (int)c; 下列说法更合适的是？",
    "options": [
      "A. 一定输出 130。",
      "B. 一定输出 -126。",
      "C. 一定输出 2。",
      "D. 会发生实现相关的溢出，结果是不确定的某个整数。",
      "E. 编译错误。"
    ],
    "correctAnswer": 3,
    "explanation": "- 130 超出有符号 char 的正数范围，会发生溢出或截断。\n- 具体得到的值和平台实现有关，标准并不严格规定。\n- 用来提醒学生：小范围类型接收大数时有风险。"
  },
  {
    "id": 29,
    "question": "关于布尔值转换，下列说法正确的是？",
    "options": [
      "A. 只有 1 会转换为 true，其他都为 false。",
      "B. 所有非零整数都会转换为 true。",
      "C. 所有正数为 true，所有负数为 false。",
      "D. 所有非零整数为 false。",
      "E. 浮点数不能转换为 bool。"
    ],
    "correctAnswer": 1,
    "explanation": "- 规则是：0 为假，非 0 为真，不区分 1、2、-1 等。\n- 对浮点数也适用：0.0 为 false，其它值为 true。"
  },
  {
    "id": 30,
    "question": "阅读代码并判断输出（假设 unsigned int 为 32 位）： cout << 25u - 50; 输出大致为？",
    "options": [
      "A. -25",
      "B. 25",
      "C. 一个非常大的正整数（接近无符号整型的最大值）",
      "D. 0",
      "E. 编译错误"
    ],
    "correctAnswer": 2,
    "explanation": "- 25u 是无符号整型，50（有符号）会被转换为无符号。\n- 相当于在无符号世界里计算 25 - 50，出现 下溢（Underflow），结果会“绕到”一个很大的正数。"
  }
      ]
    }
  },
  {
    id: 'cpp-operators',
    category: 'C++编程基础',
    title: '5. 计算的引擎——运算符',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        
        <OperatorIllustration />

        <div>
          <SectionHeader icon={Calculator} title="5.1 算术运算符" />
          <p className="mb-4">除了 <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>，还有两个特别重要的：</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <span className="text-xl bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm">%</span> 取模 (求余)
                </h4>
                <p className="text-sm">只对整数有效，返回除法后的余数。</p>
                <div className="mt-2 bg-white dark:bg-slate-800 p-2 rounded border border-amber-100 dark:border-amber-900/50 font-mono text-sm">
                    7 % 3 = 1
                </div>
            </div>
            
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <span className="text-xl bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm">++</span> 自增
                </h4>
                <p className="text-sm">让变量的值加 1，分为前置和后置。</p>
                <div className="mt-2 bg-white dark:bg-slate-800 p-2 rounded border border-emerald-100 dark:border-emerald-900/50 font-mono text-sm">
                    i++; ++i;
                </div>
            </div>
          </div>

          <div className="mt-6">
            <KnowledgeCard title="难点解析：前置与后置的区别" icon={AlertTriangle} type="warning">
                <CodeBlock 
                code={`int a = 1;
int b = 2;
// ++b 是前置：b先变为3，然后 1 + 3 = 4
cout << "a + ++b = " << a + ++b << endl; // 输出 4，此时 b=3

int c = 2;
// c++ 是后置：先取c的值(2)参与计算 (1+2=3)，计算完后 c 再变为 3
cout << "a + c++ = " << a + c++ << endl; // 输出 3，此时 c=3`}
                language="cpp"
                />
            </KnowledgeCard>
          </div>
        </div>

        <div>
          <SectionHeader icon={RefreshCcw} title="5.2 复合赋值运算符" subtitle="这是一种简写形式，让代码更简洁。" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['+=', '-=', '*=', '/='].map((op) => (
                <div key={op} className="p-3 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1">x {op} y</div>
                    <div className="text-xs text-slate-500">等价于 x = x {op.charAt(0)} y</div>
                </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader icon={FunctionSquare} title="5.3 常用数学函数" subtitle="使用 <cmath> 头文件可以进行高级数学计算。" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
                { func: 'pow(x, y)', desc: 'x 的 y 次方' },
                { func: 'sqrt(x)', desc: 'x 的平方根' },
                { func: 'abs(x)', desc: '绝对值' },
                { func: 'ceil(x)', desc: '向上取整' },
                { func: 'floor(x)', desc: '向下取整' },
                { func: 'round(x)', desc: '四舍五入' }
            ].map((item, i) => (
                <div key={i} className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow">
                    <code className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">{item.func}</code>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader icon={ListOrdered} title="5.4 运算优先级" />
          <KnowledgeCard title="记住关键口诀" icon={CheckCircle2} type="note">
            <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded border border-indigo-100 dark:border-indigo-900/50">
                    <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                    <span className="font-medium">括号 <code>()</code> 永远是老大</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded border border-indigo-100 dark:border-indigo-900/50">
                    <span className="w-6 h-6 rounded-full bg-indigo-400 text-white flex items-center justify-center text-xs font-bold">2</span>
                    <span className="font-medium">非 <code>!</code> &gt; 算术 <code>* / % + -</code> &gt; 关系 <code>&gt; &lt; ==</code></span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded border border-indigo-100 dark:border-indigo-900/50">
                    <span className="w-6 h-6 rounded-full bg-indigo-300 text-white flex items-center justify-center text-xs font-bold">3</span>
                    <span className="font-medium">逻辑与 <code>&&</code> &gt; 逻辑或 <code>||</code></span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded border border-indigo-100 dark:border-indigo-900/50">
                    <span className="w-6 h-6 rounded-full bg-indigo-200 text-slate-600 flex items-center justify-center text-xs font-bold">4</span>
                    <span className="font-medium">赋值 <code>=</code> 总是最后才执行</span>
                </div>
            </div>
          </KnowledgeCard>
        </div>
      </div>
    )
  },
  {
    id: 'cpp-practice',
    category: 'C++编程基础',
    title: '6. 实战练习——上机题目',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <p>理论学完了，让我们通过代码来解决实际问题。</p>

        <PracticeChallenge 
            id={1}
            title="自我介绍程序"
            desc="编写一个程序，要求用户输入姓名、年龄、班级，然后格式化输出一段自我介绍。"
            code={`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name, class_name;
    int age;

    cout << "请输入姓名: ";
    cin >> name;
    cout << "请输入年龄: ";
    cin >> age;
    cout << "请输入班级: ";
    cin >> class_name;

    cout << "大家好，我是" << name << "，来自" << class_name 
         << "，今年" << age << "岁。" << endl;
    return 0;
}`}
        />

        <PracticeChallenge 
            id={2}
            title="BMI 计算器"
            desc="输入体重(kg)和身高(m)，计算 BMI = 体重 / (身高 * 身高)。"
            code={`#include <iostream>
using namespace std;

int main() {
    double weight, height, bmi;
    
    cout << "请输入体重(kg): ";
    cin >> weight;
    cout << "请输入身高(m): ";
    cin >> height;

    bmi = weight / (height * height);

    cout << "您的 BMI 指数为: " << bmi << endl;
    return 0;
}`}
        />

        <PracticeChallenge 
            id={3}
            title="简单的年龄换算器"
            desc="输入年龄（岁），输出大概活了多少月、多少天。注意数据范围溢出问题。"
            code={`#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "请输入您的年龄: ";
    cin >> age;

    int months = age * 12;
    long days = age * 365; // 用 long 防止数字过大溢出

    cout << "您已经度过了约 " << months << " 个月，" 
         << days << " 天。" << endl;
    return 0;
}`}
        />

        <div className="mt-8 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 p-10 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400" size={32} />
                本章通关小结
            </h3>
            <p className="mb-6 opacity-90 text-lg">恭喜你完成了 C++ 最基础部分的学习！我们已经构建了坚实的地基：</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-emerald-300 mb-1">变量与类型</strong>
                    <span className="text-sm opacity-80">学会了用 int, double, string 等“容器”存储数据。</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-sky-300 mb-1">输入输出</strong>
                    <span className="text-sm opacity-80">掌握了 cin/cout 和 iomanip 的交互魔法。</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <strong className="block text-amber-300 mb-1">运算逻辑</strong>
                    <span className="text-sm opacity-80">理解了算术运算、自增自减及类型转换的奥秘。</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium bg-black/20 p-4 rounded-lg inline-block">
                <span>🚀 下一步：</span>
                <span className="opacity-90">我们将学习如何控制程序的流程（条件判断与循环），让程序具备逻辑判断的能力！</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
];
