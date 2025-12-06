import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';

// Helper for Pointer Visualization
const PointerVisual = () => (
  <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8 pt-12 bg-slate-50 rounded-2xl border border-slate-200 my-8 shadow-sm">
     {/* Variable a */}
     <div className="flex flex-col items-center relative group">
        <span className="absolute -top-8 text-xs font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded shadow-sm border border-slate-300">地址: 0x7ffd04</span>
        <div className="w-24 h-24 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-800 shadow-sm relative z-10 group-hover:border-indigo-400 transition-colors">
           10
        </div>
        <span className="mt-3 font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm">int a</span>
     </div>

     {/* Arrow */}
     <div className="flex flex-col items-center text-indigo-400 hidden md:flex">
        <span className="text-xs font-mono mb-1 font-medium">p = &a</span>
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M60 12H0m0 0l10-10m-10 10l10 10" transform="rotate(180 30 12)"/>
        </svg>
     </div>
     
     <div className="md:hidden text-indigo-400 text-2xl">⬇️</div>

     {/* Pointer p */}
     <div className="flex flex-col items-center relative">
        <div className="w-32 h-24 bg-indigo-50 border-2 border-indigo-500 rounded-xl flex items-center justify-center text-sm font-mono font-bold text-indigo-700 shadow-md">
           0x7ffd04
        </div>
        <span className="mt-3 font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">int *p</span>
     </div>
  </div>
);

// New Helper: Array Decay Visualization
const ArrayDecayVisual = () => (
  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl my-6">
    <h4 className="text-sm font-bold text-slate-600 mb-4 text-center">数组名 vs 指针变量</h4>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
       {/* Array a */}
       <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex">
             <div className="w-10 h-10 border border-r-0 border-slate-300 bg-indigo-50 flex items-center justify-center text-xs font-bold">10</div>
             <div className="w-10 h-10 border border-r-0 border-slate-300 bg-indigo-50 flex items-center justify-center text-xs font-bold">20</div>
             <div className="w-10 h-10 border border-slate-300 bg-indigo-50 flex items-center justify-center text-xs font-bold">30</div>
          </div>
          <div className="mt-2 font-mono text-sm font-bold text-indigo-700">int a[3]</div>
          <div className="mt-1 text-xs text-slate-500">a 是常量地址 (0x100)</div>
       </div>

       <div className="text-2xl text-slate-300">≠</div>

       {/* Pointer p */}
       <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="w-24 h-10 border border-slate-300 bg-yellow-50 flex items-center justify-center text-xs font-bold font-mono text-yellow-700">
             0x100
          </div>
          <div className="mt-2 font-mono text-sm font-bold text-yellow-700">int *p = a</div>
          <div className="mt-1 text-xs text-slate-500">p 是变量 (占8字节)</div>
       </div>
    </div>
  </div>
);

// New Helper: Pointer Arithmetic Visualization
const PointerArithmeticVisual = () => (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl my-6 overflow-x-auto">
        <div className="min-w-[500px] flex flex-col items-center">
            <div className="flex gap-1 mb-8">
                {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="relative">
                        <div className="w-16 h-16 border-2 border-slate-300 bg-white flex items-center justify-center text-lg font-bold text-slate-700">
                            {10 * (i + 1)}
                        </div>
                        <div className="absolute -bottom-6 left-0 w-full text-center text-xs font-mono text-slate-400">
                            a[{i}]
                        </div>
                        {i === 1 && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mb-1">p</span>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-600"></div>
                            </div>
                        )}
                        {i === 3 && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mb-1">p+2</span>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-600"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className="text-sm text-slate-600 text-center max-w-md">
                <span className="font-bold text-indigo-600">p + 2</span> 不是加 2 个字节，而是跳过 2 个 <span className="font-mono bg-slate-100 px-1">int</span> (2 × 4 = 8 字节)。
            </p>
        </div>
    </div>
);

// New Helper: Pointer Array vs Row Pointer Visualization
const PointerVsRowPointerVisual = () => (
  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl my-8">
    <h4 className="text-center font-bold text-slate-700 mb-6 text-lg">一图看懂核心区别</h4>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Pointer Array */}
      <div className="flex flex-col items-center">
        <h5 className="font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-1">
          指针数组 <code className="text-sm ml-2 bg-indigo-50 px-2 py-0.5 rounded">int *p[3]</code>
        </h5>
        <div className="relative flex gap-8">
            {/* Array of Pointers */}
            <div className="flex flex-col gap-1">
                {[0, 1, 2].map(i => (
                    <div key={i} className="w-24 h-10 border-2 border-indigo-300 bg-white flex items-center justify-center relative">
                        <span className="text-xs font-mono text-slate-500 absolute left-1 top-0.5">p[{i}]</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        {/* Arrow */}
                        <div className="absolute left-full top-1/2 w-8 h-0.5 bg-indigo-400"></div>
                        <div className="absolute left-[calc(100%+28px)] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-indigo-400 border-y-[4px] border-y-transparent"></div>
                    </div>
                ))}
                <div className="text-center text-xs text-slate-500 mt-1">数组 p (存3个指针)</div>
            </div>

            {/* Targets */}
            <div className="flex flex-col gap-1">
                <div className="w-16 h-10 border border-slate-300 bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">x: 10</div>
                <div className="w-16 h-10 border border-slate-300 bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">y: 20</div>
                <div className="w-16 h-10 border border-slate-300 bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">z: 30</div>
                <div className="text-center text-xs text-slate-500 mt-1">分散的变量</div>
            </div>
        </div>
        <p className="mt-4 text-xs text-slate-600 text-center max-w-[200px]">
            "p 是<strong>数组</strong>，里面每个格子存一个地址，指向不同地方。"
        </p>
      </div>

      {/* Right: Row Pointer */}
      <div className="flex flex-col items-center">
        <h5 className="font-bold text-emerald-700 mb-4 border-b-2 border-emerald-200 pb-1">
          行指针 <code className="text-sm ml-2 bg-emerald-50 px-2 py-0.5 rounded">int (*p)[3]</code>
        </h5>
        
        <div className="flex flex-col items-center gap-4">
            {/* Pointer p */}
            <div className="w-24 h-10 border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center relative rounded shadow-sm">
                <span className="font-bold text-emerald-800">p</span>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 w-0.5 bg-emerald-500"></div>
                <div className="absolute top-[calc(100%+28px)] left-1/2 -translate-x-1/2 w-0 h-0 border-t-[6px] border-t-emerald-500 border-x-[4px] border-x-transparent"></div>
            </div>

            {/* Target Row */}
            <div className="mt-6">
                <div className="flex border-2 border-slate-400 rounded overflow-hidden shadow-sm">
                    <div className="w-12 h-12 border-r border-slate-300 bg-white flex items-center justify-center font-bold text-slate-700">1</div>
                    <div className="w-12 h-12 border-r border-slate-300 bg-white flex items-center justify-center font-bold text-slate-700">2</div>
                    <div className="w-12 h-12 bg-white flex items-center justify-center font-bold text-slate-700">3</div>
                </div>
                <div className="text-center text-xs text-slate-500 mt-1">int[3] (连续内存)</div>
            </div>
        </div>
        <p className="mt-4 text-xs text-slate-600 text-center max-w-[200px]">
            "p 是<strong>指针</strong>，它只指向一整块连续的内存（一行）。"
        </p>
      </div>
    </div>
  </div>
);

// New Helper: Pass by Value vs Pointer Visualization
const PassByValueVsPointerVisual = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
    {/* Pass by Value */}
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-red-100 text-red-800 px-3 py-1 rounded-br-lg text-xs font-bold">
        按值传递 (Copy)
      </div>
      <div className="mt-6 w-full flex flex-col gap-6">
        {/* Main Scope */}
        <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white/50">
          <div className="text-xs text-slate-500 mb-2 text-center">main 函数</div>
          <div className="flex justify-center">
             <div className="w-16 h-16 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-700 shadow-sm">
                10
             </div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-slate-600">int a</div>
        </div>

        {/* Separation */}
        <div className="flex justify-center items-center text-red-400 text-xs font-bold">
            ❌ 复制了一份
            <svg className="w-4 h-4 ml-1 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Func Scope */}
        <div className="border-2 border-dashed border-red-300 p-4 rounded-lg bg-red-100/50">
          <div className="text-xs text-red-500 mb-2 text-center">func(int x)</div>
          <div className="flex justify-center">
             <div className="w-16 h-16 bg-white border-2 border-red-400 flex items-center justify-center font-bold text-red-600 shadow-sm">
                0
             </div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-red-600">x = 0</div>
          <div className="text-center text-[10px] text-red-500 mt-1">(a 还是 10)</div>
        </div>
      </div>
    </div>

    {/* Pass by Pointer */}
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-br-lg text-xs font-bold">
        按地址传递 (Pointer)
      </div>
      <div className="mt-6 w-full flex flex-col gap-6">
        {/* Main Scope */}
        <div className="border-2 border-dashed border-emerald-300 p-4 rounded-lg bg-emerald-100/30">
          <div className="text-xs text-slate-500 mb-2 text-center">main 函数</div>
          <div className="flex justify-center relative">
             <div className="w-16 h-16 bg-white border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 shadow-sm z-10">
                0
             </div>
             <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-white px-1 rounded border">0x100</div>
          </div>
          <div className="text-center text-xs font-mono mt-1 text-emerald-700">int a</div>
        </div>

        {/* Separation */}
        <div className="flex justify-center items-center text-emerald-600 text-xs font-bold">
            ✅ 传了钥匙(地址)
            <svg className="w-4 h-4 ml-1 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Func Scope */}
        <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white/50">
          <div className="text-xs text-slate-500 mb-2 text-center">func(int *p)</div>
          <div className="flex justify-center items-center gap-4">
             <div className="flex flex-col items-center">
                <div className="w-20 h-10 bg-white border-2 border-slate-400 flex items-center justify-center font-bold text-slate-600 text-sm shadow-sm">
                    0x100
                </div>
                <div className="text-center text-xs font-mono mt-1 text-slate-500">p</div>
             </div>
             <div className="text-xs text-emerald-600 font-bold">*p = 0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const pointersSections: Section[] = [
  // ... Lessons ...
  {
    id: 'ptr-basic',
    category: '指针 (Pointers)',
    group: '1. 指针的定义与运算',
    title: '核心讲解',
    type: 'lesson',
    content: (
      <div className="space-y-10">
        {/* 1.1 Concept */}
        <div id="ptr-1-1">
           <h3 className="text-2xl font-bold text-slate-900 mb-4">1.1 指针的概念</h3>
           
           {/* Definition & Metaphor */}
           <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-xl">
             <p className="text-lg text-indigo-900 font-medium mb-4">
               指针本质上就是<span className="bg-white px-2 py-1 rounded mx-1 shadow-sm text-indigo-700 font-bold">存放地址的变量</span>。
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-bold text-indigo-800 mb-2 text-sm">核心特征：</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-indigo-700">
                        <li>普通变量：直接存数值（如 <code>int a = 10</code>）。</li>
                        <li>指针变量：存的是别人的<strong>内存地址</strong>。</li>
                        <li>指针类型：决定了它指向什么类型（<code>int*</code> vs <code>double*</code>）以及运算时的步长。</li>
                    </ul>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-indigo-100">
                    <h5 className="font-bold text-indigo-800 mb-2 text-sm">📦 形象比喻：</h5>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                        把<strong>变量</strong>想象成一个包裹。<br/>
                        <strong>指针</strong>就是这个包裹的<strong>“快递单号”</strong>。<br/>
                        <strong>解引用 (*)</strong> 就是根据单号<strong>“取包裹”</strong>拿到里面的东西。
                    </p>
                </div>
             </div>
           </div>
           
           <PointerVisual />

           {/* Code Example 1: Address & Value */}
           <div className="mb-8">
             <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs">1</span>
                示例：查看地址与值
             </h4>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CodeBlock code={`int x = 42;
int *p = &x;    // p 里存的是 x 的地址

cout << "x 的值: " << x << endl;
cout << "x 的地址: " << &x << endl;
cout << "p 的内容: " << p << endl;
cout << "*p 的值: " << *p << endl;`} />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm flex flex-col justify-center">
                    <p className="mb-2"><strong className="text-slate-700">x</strong>：普通变量，代表值 42。</p>
                    <p className="mb-2"><strong className="text-slate-700">&x</strong>：取地址，得到 x 在内存的门牌号。</p>
                    <p className="mb-2"><strong className="text-slate-700">p</strong>：指针变量，存的就是 &x。</p>
                    <p><strong className="text-slate-700">*p</strong>：去那个地址取值，等同于 x。</p>
                </div>
             </div>
           </div>

           {/* Code Example 2: Modification */}
           <div className="mb-8">
             <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs">2</span>
                示例：通过指针修改变量
             </h4>
             <p className="text-slate-600 text-sm mb-3">同一个对象，既可以用变量名访问，也可以用指针间接访问。</p>
             <CodeBlock code={`int x = 10;
int *p = &x;

// 1. 直接修改
x = 20;
cout << *p; // 输出 20 (p 指向 x，x 变了，*p 自然也变)

// 2. 通过指针修改
*p = 30;
cout << x;  // 输出 30 (通过地址改了那块内存，x 自然也变)`} />
           </div>

           {/* Core Relation Summary */}
           <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🔑</span>
                  核心关系（必背）
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded border border-emerald-100">
                    <code className="font-mono font-bold text-emerald-700 text-lg">p == &a</code>
                    <span className="text-sm text-slate-500">p 等于 a 的地址</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded border border-emerald-100">
                    <code className="font-mono font-bold text-emerald-700 text-lg">*p == a</code>
                    <span className="text-sm text-slate-500">*p 等于 a 的值</span>
                  </div>
                </div>
           </div>
        </div>

        {/* 1.2 Declaration & Init */}
        <div id="ptr-1-2" className="border-t border-slate-200 pt-8">
           <h3 className="text-2xl font-bold text-slate-900 mb-4">1.2 指针的声明与初始化</h3>
           
           <div className="space-y-8">
             {/* 1.2.1 声明 */}
             <div>
               <h4 className="font-bold text-indigo-700 mb-2 text-lg">1.2.1 声明语法</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white p-4 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">星号的位置很灵活：</p>
                    <CodeBlock code={`int *p;    // 常用
int* p;    // 也常用
int * p;   // 合法但不推荐`} />
                 </div>
                 <div className="bg-white p-4 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">注意连续声明：</p>
                    <CodeBlock code={`int *p1, *p2;  // ✅ 两个都是指针
int* p1, p2;   // ❌ p1是指针，p2是int`} />
                 </div>
               </div>
             </div>

             {/* 1.2.2 初始化 */}
             <div>
               <h4 className="font-bold text-indigo-700 mb-2 text-lg">1.2.2 初始化（拒绝悬空！）</h4>
               <p className="text-slate-600 text-sm mb-3">
                 原则：指针定义完<strong>不要悬空</strong>，要么指向一个有效变量，要么赋为 <code>nullptr</code>。
               </p>
               <CodeBlock code={`int a = 10;
int *p1 = &a;         // ✅ 指向已存在变量
int *p2 = nullptr;    // ✅ C++11 推荐的空指针写法
int *p3 = 0;          // 🆗 旧写法`} />
             </div>

             {/* 1.2.3 Const */}
             <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
               <h4 className="font-bold text-amber-800 mb-3 text-lg">1.2.3 指针与 const (三大魔咒)</h4>
               <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start bg-white p-3 rounded border border-amber-100">
                      <div className="min-w-[140px] font-mono font-bold text-amber-700">const int *p</div>
                      <div>
                          <span className="badge bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded mr-2">底层 const</span>
                          <span className="text-sm text-slate-600"><strong>指针自由，内容锁死。</strong>可以改 p 指向别处，但不能通过 *p 改值。</span>
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-start bg-white p-3 rounded border border-amber-100">
                      <div className="min-w-[140px] font-mono font-bold text-amber-700">int *const p</div>
                      <div>
                          <span className="badge bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded mr-2">顶层 const</span>
                          <span className="text-sm text-slate-600"><strong>指针锁死，内容自由。</strong>p 必须指向同一个地址，但可以通过 *p 改那个值。</span>
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-start bg-white p-3 rounded border border-amber-100">
                      <div className="min-w-[140px] font-mono font-bold text-amber-700">const int *const p</div>
                      <div>
                          <span className="badge bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded mr-2">双重锁定</span>
                          <span className="text-sm text-slate-600"><strong>全锁死。</strong>既不能改指向，也不能改值。</span>
                      </div>
                  </div>
               </div>
               <p className="text-xs text-amber-600 mt-3 italic">💡 记忆口诀：const 在 * 左边，内容不变；const 在 * 右边，指针不变。</p>
             </div>

             {/* 1.2.4 多级指针 */}
             <div>
               <h4 className="font-bold text-indigo-700 mb-2 text-lg">1.2.4 多级指针 (套娃)</h4>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeBlock code={`int a = 10;
int *p = &a;    // p -> a
int **pp = &p;  // pp -> p

cout << **pp;   // 输出 10
**pp = 20;      // 修改 a 为 20`} />
                  <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 p-4">
                      <div className="flex gap-2 items-center text-sm">
                         <div className="border border-slate-400 px-2 py-1 rounded bg-white">pp</div>
                         <span>→</span>
                         <div className="border border-slate-400 px-2 py-1 rounded bg-white">p</div>
                         <span>→</span>
                         <div className="border border-slate-400 px-2 py-1 rounded bg-indigo-100 font-bold">a (10)</div>
                      </div>
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* 1.3 Address & Dereference */}
        <div id="ptr-1-3" className="border-t border-slate-200 pt-8">
           <h3 className="text-2xl font-bold text-slate-900 mb-4">1.3 取地址 & 解引用</h3>
           
           <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* 取地址 */}
               <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-b pb-2">
                     <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono text-sm">&</span>
                     取地址操作
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">放在变量前面，获取它在内存中的门牌号。</p>
                  <CodeBlock code={`int a = 42;
cout << &a; // 输出如 0x7ffee4...`} />
               </div>

               {/* 解引用 */}
               <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-b pb-2">
                     <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono text-sm">*</span>
                     解引用操作
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">访问指针指向的那块内存里的值。</p>
                  <CodeBlock code={`int *p = &a;
cout << *p; // 输出 42
*p = 100;   // a 变成了 100`} />
               </div>
             </div>

             {/* 成员访问 */}
             <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                   <span className="text-xl">👉</span> 结构体成员访问 (-&gt;)
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                    如果 p 指向一个对象（结构体/类），要访问成员有两种写法：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-slate-200">
                        <div className="text-xs text-slate-500 mb-1">笨拙写法</div>
                        <code className="text-red-500 font-bold">(*p).age</code>
                        <p className="text-xs text-slate-400 mt-1">先解引用，再点。括号不能少。</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-indigo-200 shadow-sm">
                        <div className="text-xs text-indigo-500 mb-1">优雅写法 (推荐)</div>
                        <code className="text-indigo-600 font-bold">p-&gt;age</code>
                        <p className="text-xs text-slate-400 mt-1">箭头操作符，专门用于指针。</p>
                    </div>
                </div>
             </div>
           </div>
        </div>

        {/* 1.4 Arithmetic */}
        <div id="ptr-1-4" className="border-t border-slate-200 pt-8">
           <h3 className="text-2xl font-bold text-slate-900 mb-4">1.4 指针运算</h3>
           
           <div className="mb-6">
             <h4 className="font-bold text-indigo-700 mb-2">1.4.1 指针 + 整数</h4>
             <p className="text-slate-600 text-sm mb-3">
               <code>p + 1</code> 不是加 1 个字节，而是跳过 <strong>1 个元素类型的大小</strong> (sizeof(T))。
             </p>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                   <span>int* p</span>
                   <span>p+1 (跳4字节)</span>
                </div>
                <div className="flex gap-1">
                   {[0, 1, 2].map(i => (
                      <div key={i} className="flex-1 h-10 bg-indigo-100 border border-indigo-300 flex items-center justify-center text-indigo-700 font-bold text-sm rounded">
                         {i === 0 ? 'p' : `p+${i}`}
                      </div>
                   ))}
                </div>
             </div>
             <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
int *p = a;

cout << *p;       // 10
cout << *(p + 1); // 20 (相当于 a[1])`} />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                 <h4 className="font-bold text-indigo-700 mb-2">1.4.2 自增自减</h4>
                 <CodeBlock code={`int *p = a;
p++;  // 指向 a[1]
p--;  // 回到 a[0]`} />
              </div>
              <div>
                 <h4 className="font-bold text-indigo-700 mb-2">1.4.3 指针比较</h4>
                 <CodeBlock code={`int *p1 = &a[1];
int *p2 = &a[4];
// 同一数组内比较
if (p1 < p2) { ... }`} />
              </div>
              <div>
                 <h4 className="font-bold text-indigo-700 mb-2">1.4.4 指针相减</h4>
                 <div className="text-sm text-slate-600 mb-2">结果是两个指针之间的<strong>元素个数</strong>。</div>
                 <CodeBlock code={`long diff = p2 - p1;
// diff = 3 
// (中间差了3个int)`} />
              </div>
           </div>
        </div>

        {/* 1.5 void* */}
        <div id="ptr-1-5" className="border-t border-slate-200 pt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">1.5 void* 通用指针</h3>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <p className="text-slate-700 mb-4">
                    <code>void*</code> 是一种特殊的指针类型，可以存放<strong>任意对象的地址</strong>，但<strong>不能直接解引用</strong>。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 className="font-bold text-slate-800 text-sm mb-2">🔄 类型转换规则</h5>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                            <li><strong>任意指针 → void*</strong>：隐式转换（自动）。</li>
                            <li><strong>void* → 具体指针</strong>：必须强制转换 (<code>static_cast</code>)。</li>
                        </ul>
                    </div>
                    <CodeBlock code={`int x = 10;
void *pv = &x;   // ✅ 自动转
// cout << *pv;  // ❌ 编译错误！不知道大小

int *p = static_cast<int*>(pv); // ✅ 强转回来
cout << *p;      // 输出 10`} />
                </div>
            </div>
        </div>

        {/* 1.6 Safety */}
        <div id="ptr-1-6" className="border-t border-slate-200 pt-8">
           <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
             <span className="text-3xl">🚨</span> 1.6 指针的安全问题 (必读)
           </h3>
           <p className="text-slate-600 mb-4">C++ 最危险但也最强大的地方。请死记以下场景：</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-red-500 bg-red-50 p-5 rounded-r-xl">
                 <h4 className="font-bold text-red-800 mb-2">😱 野指针 (Wild Pointer)</h4>
                 <p className="text-xs text-red-700 mb-2">未初始化就使用的指针。</p>
                 <CodeBlock code={`int *p;   // ⚠️ 垃圾值
*p = 10;  // 💥 崩溃！`} />
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-5 rounded-r-xl">
                 <h4 className="font-bold text-orange-800 mb-2">👻 悬空指针 (Dangling)</h4>
                 <p className="text-xs text-orange-700 mb-2">指向的对象已经释放了。</p>
                 <CodeBlock code={`int *p = new int(5);
delete p;
*p = 10; // 💥 内存已释放，非法访问`} />
              </div>
           </div>
           
           <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2 text-sm">🛡️ 安全生存指南</h4>
                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                    <li>永远初始化指针（有值就赋地址，没值就 <code>nullptr</code>）。</li>
                    <li><code>delete</code> 之后立刻置空：<code>p = nullptr;</code>。</li>
                    <li>使用前检查有效性：<code>if (p) ...</code>。</li>
                </ul>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'ptr-basic-quiz',
    category: '指针 (Pointers)',
    group: '1. 指针的定义与运算',
    title: '课后练习 (20题)',
    type: 'quiz',
    quizData: {
      title: '指针定义与运算 - 专项练习',
      description: '本测试包含 20 道单选题，涵盖指针定义、取地址、解引用、const、空指针、void* 及多级指针等核心概念。',
      questions: [
        { id: 1, question: '下面哪一行代码正确定义了指向 `int` 的指针 `p`？', options: ["`int p;`", "`int *p;`", "`int &p;`", "`int p*;`", "`int *p();`"], correctAnswer: 1, explanation: "`int *p;` 声明一个指向 `int` 类型的指针变量 `p`。" },
        { id: 2, question: '`int x = 10; int *p;` 哪一行能让 `p` 正确指向 `x`？', options: ["`p = x;`", "`*p = &x;`", "`p = &x;`", "`&p = x;`", "`*p = x;`"], correctAnswer: 2, explanation: "`&x` 的类型是 `int*`，可以赋值给 `p`。" },
        { id: 3, question: '`int x = 5; int *p = &x; *p = 20; std::cout << x;` 输出结果是？', options: ["5", "20", "地址值", "不确定", "编译错误"], correctAnswer: 1, explanation: "`*p = 20;` 相当于给 `x` 赋值 20。" },
        { id: 4, question: '在大多数 64 位系统上，`sizeof(int*)` 与 `sizeof(double*)` 的关系？', options: ["`sizeof(int*) == sizeof(int)`", "`sizeof(int*) == sizeof(double*)`", "`sizeof(int*) < sizeof(double*)`", "`sizeof(int*) > sizeof(double*)`", "由所指类型决定"], correctAnswer: 1, explanation: "同一平台上所有对象指针的大小通常相同（如 8 字节）。" },
        { id: 5, question: '`int *p; *p = 10;` 关于这段代码？', options: ["给某个 `int` 赋值 10", "编译错误", "行为未定义 (UB)", "`p` 自动初始化为 `nullptr`", "`p` 指向全局变量"], correctAnswer: 2, explanation: "未初始化指针解引用是未定义行为。" },
        { id: 6, question: '哪句声明了“指向 `const int` 的指针”？', options: ["`const int *p;`", "`int *const p;`", "`const int *const p;`", "`int const *p;`", "A 和 D"], correctAnswer: 4, explanation: "`const int *p;` 和 `int const *p;` 等价，都是指向常量的指针。" },
        { id: 7, question: '声明“常量指针，永远指向同一个 `int` 对象”？', options: ["`const int *p;`", "`int const *p;`", "`int *const p;`", "`const int *const p;`", "`int &const p;`"], correctAnswer: 2, explanation: "`int *const p;` 是指针本身常量，地址不可改。" },
        { id: 8, question: '声明“指针本身和指向的内容都不可变”？', options: ["`const int *p;`", "`int const *p;`", "`int *const p;`", "`const int *const p;`", "`int const *const p;`"], correctAnswer: 3, explanation: "需要两个 `const`，一个修饰 `int`，一个修饰 `*p`。" },
        { id: 9, question: 'C++11 及之后推荐的空指针写法？', options: ["`0`", "`NULL`", "`nullptr`", "`'\\0'`", "`false`"], correctAnswer: 2, explanation: "`nullptr` 是类型安全的空指针字面量。" },
        { id: 10, question: '`int *p = nullptr; if (!p) { p = &x; } cout << *p;` 输出？', options: ["不确定", "0", "42 (x的值)", "编译错误", "运行时错误"], correctAnswer: 2, explanation: "`p` 初始为空，`if (!p)` 成立，`p` 被赋值为 `&x`，输出 `x` 的值。" },
        { id: 11, question: '正确定义“指向 `int*` 的指针”？', options: ["`int **p;`", "`int *p*;`", "`int &*p;`", "`int *&p;`", "`int **&p;`"], correctAnswer: 0, explanation: "`int **p;` 是指向指针的指针。" },
        { id: 12, question: '`int x=5; int *p=&x; int **pp=&p; **pp=10;` `x` 的值？', options: ["5", "10", "地址值", "不确定", "编译错误"], correctAnswer: 1, explanation: "`**pp` 解引用两次回到 `x`，赋值 10。" },
        { id: 13, question: '关于 `void*` 指针？', options: ["不能存地址", "可直接解引用", "可存任意地址但需转换解引用", "只能指函数", "禁止使用"], correctAnswer: 2, explanation: "`void*` 是通用指针，必须强转类型后才能解引用。" },
        { id: 14, question: '`void *pv = &x;` 如何转回 `int*`？', options: ["`int p = pv;`", "`int *p = pv;`", "`int *p = (int*)pv;`", "`int &p = *pv;`", "`auto p = *pv;`"], correctAnswer: 2, explanation: "需要显式强制类型转换 `(int*)pv`。" },
        { id: 15, question: '`void setZero(int *p) { *p=0; } setZero(&x);` `x`的值？', options: ["5", "0", "随机值", "编译错误", "运行时错误"], correctAnswer: 1, explanation: "传地址调用，函数内修改了外部变量。" },
        { id: 16, question: '`void reset(int **pp) { *pp=nullptr; } reset(&p);` `p`的值？', options: ["不变", "改变x", "变为 `nullptr`", "编译错误", "未定义"], correctAnswer: 2, explanation: "传入指针的地址，函数修改了指针本身指向 `nullptr`。" },
        { id: 17, question: '指针 `p` 和引用 `r` 的区别？', options: ["都可改绑定", "只有指针可改指向", "只有引用可改绑定", "都不可改", "引用需new"], correctAnswer: 1, explanation: "引用一旦初始化不可改变绑定对象，指针可以。" },
        { id: 18, question: '`int x=1; int *p=&x; ++p;` 这种操作？', options: ["安全", "定义良好", "未定义行为 (UB)", "编译错误", "抛异常"], correctAnswer: 2, explanation: "`p` 不在数组中，`++p` 指向非法内存，属未定义行为。" },
        { id: 19, question: '`int *p=&x; int *q=&y; p==q` 的比较？', options: ["未定义", "只能比void*", "合法且定义良好", "必须指同一对象", "拒绝编译"], correctAnswer: 2, explanation: "指针相等比较是合法的。" },
        { id: 20, question: '指针最佳实践？', options: ["自动初始null", "delete后置nullptr", "非空即安全", "不检查空", "复用delete内存"], correctAnswer: 1, explanation: "释放内存后置 `nullptr` 防止悬空指针。" }
      ]
    }
  },
  // ==========================================
  // Group 2: Pointer & Array (Detailed)
  // ==========================================
  {
    id: 'ptr-array-1-memory',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.1 内存布局与定义',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 1. Definition */}
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. 一维数组的定义与内存连续性</h3>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
                <li><strong>定义：</strong> <code>T a[N];</code> (T为类型，N为编译期常量)</li>
                <li><strong>连续存储：</strong> <code>a[0]</code> 紧挨着 <code>a[1]</code>...</li>
                <li><strong>地址步长：</strong> 相邻元素地址相差 <code>sizeof(T)</code> 字节。</li>
            </ul>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 mb-2">内存示意图 (int a[3])</div>
                <div className="flex items-center font-mono text-sm">
                    <div className="flex-1 border border-slate-300 bg-white p-3 text-center border-r-0">
                        <div className="text-indigo-600 font-bold">a[0]</div>
                        <div className="text-slate-400 text-xs">0x100</div>
                    </div>
                    <div className="flex-1 border border-slate-300 bg-white p-3 text-center border-r-0">
                        <div className="text-indigo-600 font-bold">a[1]</div>
                        <div className="text-slate-400 text-xs">0x104</div>
                    </div>
                    <div className="flex-1 border border-slate-300 bg-white p-3 text-center">
                        <div className="text-indigo-600 font-bold">a[2]</div>
                        <div className="text-slate-400 text-xs">0x108</div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
cout << "a[0]: " << &a[0] << endl;
cout << "a[1]: " << &a[1] << endl; // 地址 +4
cout << "Size: " << sizeof(int) << endl;`} />
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-2-decay',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.2 数组名的“衰变”与真相',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 2. Decay */}
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. 数组名到指针的“衰变”</h3>
            <p className="text-slate-600 mb-3">
                在大多数表达式中，数组名 <code>a</code> 会<strong>自动转换 (Decay)</strong> 为指向首元素的指针 <code>int*</code>。
            </p>
            <ArrayDecayVisual />
            <CodeBlock code={`int a[3] = {1, 2, 3};
int *p = a; // a 衰变为 &a[0]`} />
         </div>

         {/* 3. Distinctions */}
         <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">3. 核心区别：a, &a[0], &a</h3>
            <p className="text-sm text-indigo-800 mb-4">虽然打印出来的地址值一样，但<strong>类型完全不同</strong>！</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-indigo-200">
                    <code className="font-bold text-indigo-600">a</code>
                    <p className="text-slate-500 mt-1">衰变为 <code>int*</code></p>
                    <p className="text-slate-400 text-xs">指向首元素</p>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-200">
                    <code className="font-bold text-indigo-600">&a[0]</code>
                    <p className="text-slate-500 mt-1">类型是 <code>int*</code></p>
                    <p className="text-slate-400 text-xs">指向首元素</p>
                </div>
                <div className="bg-white p-3 rounded border border-indigo-200 ring-2 ring-indigo-300">
                    <code className="font-bold text-red-500">&a</code>
                    <p className="text-slate-500 mt-1">类型是 <code>int(*)[3]</code></p>
                    <p className="text-slate-400 text-xs">指向<strong>整个数组</strong></p>
                </div>
            </div>
         </div>

         {/* 8. sizeof */}
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">4. sizeof 的陷阱</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <CodeBlock code={`int a[10];
cout << sizeof(a); 
// 输出 40 (10 * 4)`} />
                 <CodeBlock code={`int *p = a;
cout << sizeof(p);
// 输出 8 (指针本身大小)`} />
             </div>
             <p className="text-sm text-slate-500 mt-2">
                 💡 计算数组长度常用公式：<code>sizeof(a) / sizeof(a[0])</code>
             </p>
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-3-access',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.3 下标与指针运算的本质',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 4. Equivalence */}
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">5. a[i] 与 *(a + i) 的等价性</h3>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center my-4">
                <p className="text-lg text-slate-700 font-mono">
                    <code>a[i]</code> <span className="mx-4 text-slate-300">===</span> <code>*(a + i)</code>
                </p>
            </div>
            <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
cout << a[2];      // 30
cout << *(a + 2);  // 30 (完全等价)`} />
         </div>

         {/* 5. Weird syntax */}
         <div className="opacity-75 hover:opacity-100 transition-opacity">
            <h4 className="font-bold text-slate-600 mb-2 text-sm">🤯 冷知识：1[a]</h4>
            <p className="text-xs text-slate-500 mb-2">因为加法满足交换律 <code>*(a+1) == *(1+a)</code>，所以...</p>
            <CodeBlock code={`cout << 1[a]; // 输出 20 (不要在实际项目中使用！)`} />
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-4-ops',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.4 指针操作数组实战',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         <PointerArithmeticVisual />

         {/* 6. Traverse */}
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">6. 用指针遍历与修改</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-slate-700 mb-2">遍历 (Traversal)</h4>
                     <CodeBlock code={`int a[] = {1, 2, 3, 4, 5};
int *p = a;
int *end = a + 5; // 尾后指针

while (p != end) {
    cout << *p << " ";
    p++; // 移动到下一个 int
}`} />
                 </div>
                 <div>
                     <h4 className="font-bold text-slate-700 mb-2">修改 (Modification)</h4>
                     <CodeBlock code={`int a[3] = {10, 20, 30};
int *p = a;

*p = 100;       // a[0]=100
*(p + 1) = 200; // a[1]=200
p[2] = 300;     // a[2]=300`} />
                 </div>
             </div>
         </div>

         {/* 9, 10, 11 Arithmetic */}
         <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
             <h3 className="text-xl font-bold text-slate-900 mb-3">7. 指针算术与比较</h3>
             <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
                 <li><strong>p + n</strong>：合法范围是 <code>[a, a+N]</code>。</li>
                 <li><strong>p - q</strong>：返回两个指针之间的<strong>元素个数</strong> (<code>ptrdiff_t</code>)。</li>
                 <li><strong>p &lt; q</strong>：只有指向同一数组时才有定义。</li>
             </ul>
             <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
int *p1 = &a[1];
int *p4 = &a[4];

cout << (p4 - p1); // 输出 3 (中间隔3个元素)
cout << (p1 < p4); // true`} />
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-5-params',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.5 数组作为函数参数',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 12. Decay Params */}
         <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">8. 形参的退化</h3>
            <p className="text-slate-600 mb-3">
                以下三种写法在函数参数中<strong>完全等价</strong>，<code>a</code> 都是 <code>int*</code>。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 p-3 rounded text-center font-mono text-sm">void f(int a[])</div>
                <div className="bg-white border border-slate-200 p-3 rounded text-center font-mono text-sm">void f(int a[10])</div>
                <div className="bg-indigo-50 border border-indigo-300 p-3 rounded text-center font-mono text-sm font-bold text-indigo-700">void f(int *a)</div>
            </div>
         </div>

         {/* 13. Length Necessity */}
         <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
             <h4 className="font-bold text-amber-800 mb-2">⚠️ 必须传递长度</h4>
             <p className="text-sm text-amber-700 mb-2">
                 函数内部无法通过 <code>sizeof(a)</code> 获取数组长度（它只会返回指针大小 8 字节）。
             </p>
             <CodeBlock code={`void printArray(const int *a, int n) {
    for(int i=0; i<n; i++) cout << a[i];
}
// 调用: printArray(arr, 5);`} />
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-6-advanced',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.6 进阶：数组指针 vs 指针数组',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 14, 15 Array Pointer */}
         <div>
             <h3 className="text-xl font-bold text-indigo-700 mb-3">9. 数组指针 (指向数组的指针)</h3>
             <p className="text-slate-600 mb-2">
                 <code>int (*p)[3]</code>：p 是一个指针，指向包含 3 个 int 的数组。
             </p>
             <CodeBlock code={`int a[3] = {1, 2, 3};
int (*p)[3] = &a; // 注意取地址 &a

cout << (*p)[0]; // 输出 1 (解引用一次得到数组，再下标访问)`} />
             <p className="text-xs text-slate-500 mt-2">常用于处理多维数组或强制固定长度的函数参数。</p>
         </div>

         {/* 16. Pointer Array */}
         <div>
             <h3 className="text-xl font-bold text-emerald-700 mb-3">10. 指针数组 (存指针的数组)</h3>
             <p className="text-slate-600 mb-2">
                 <code>int *p[3]</code>：p 是一个数组，包含 3 个 int 指针。
             </p>
             <CodeBlock code={`int x=1, y=2, z=3;
int *arr[3]; // 数组

arr[0] = &x;
arr[1] = &y;
arr[2] = &z;

cout << *arr[0]; // 输出 1`} />
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-7-const',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.7 Const 与越界安全',
    type: 'lesson',
    content: (
      <div className="space-y-8">
         {/* 17, 18 Const */}
         <div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">11. Const 的组合</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-slate-700 mb-2">指向常量的指针</h4>
                     <CodeBlock code={`const int *p = a;
// *p = 10; ❌ 禁止修改元素
p++;        // ✅ 指针可动`} />
                 </div>
                 <div>
                     <h4 className="font-bold text-slate-700 mb-2">指向数组的常量指针</h4>
                     <CodeBlock code={`int (*const p)[3] = &a;
(*p)[0] = 10; // ✅ 可改元素
// p = &b;    ❌ 指针不可动`} />
                 </div>
             </div>
         </div>

         {/* 19. Safety */}
         <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
             <h3 className="text-xl font-bold text-red-800 mb-3">12. 越界陷阱 (UB)</h3>
             <ul className="list-disc list-inside text-red-700 text-sm space-y-2">
                 <li><code>a + N</code> (尾后指针) 是合法的，<strong>但不能解引用</strong>。</li>
                 <li><code>a + N + 1</code> 是未定义行为。</li>
             </ul>
             <div className="mt-3">
                 <CodeBlock code={`int a[3] = {1, 2, 3};
int *end = a + 3; // ✅ 合法，用于循环结束判断
// cout << *end;  // 💥 崩溃或乱码`} />
             </div>
         </div>
      </div>
    )
  },
  {
    id: 'ptr-array-8-dynamic',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.8 动态一维数组',
    type: 'lesson',
    content: (
      <div className="space-y-6">
         {/* 20. Dynamic */}
         <h3 className="text-xl font-bold text-slate-900 mb-3">13. new[] 与 delete[]</h3>
         <p className="text-slate-600">
             栈上数组必须是编译期常量大小。如果需要运行时决定大小，必须用堆内存。
         </p>
         <CodeBlock code={`int n;
cin >> n;

// 1. 申请 (返回首元素指针)
int *arr = new int[n];

// 2. 使用
for(int i=0; i<n; i++) arr[i] = i * 10;

// 3. 释放 (必须带 [])
delete[] arr;
arr = nullptr;`} />
      </div>
    )
  },
  {
    id: 'ptr-array-9-quiz',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.9 课后练习 (选择题)',
    type: 'quiz',
    quizData: {
      title: '指针与数组 - 专项练习',
      description: '本测试包含 20 道单选题，涵盖数组名衰变、指针运算、数组遍历、越界安全及动态数组管理等核心知识点。',
      questions: [
        { id: 1, question: '`int a[5] = {1, 2, 3, 4, 5}; int *p = a;` 下列说法正确的是：', options: ["`p` 的类型是 `int`", "`a` 的类型是 `int*`", "`p` 和 `a` 在所有场合都等价", "`p` 和 `&a[0]` 在大多数实现中值相同", "`&a` 的类型是 `int*`"], correctAnswer: 3, explanation: "`p` 的类型是 `int*`，`a` 的类型是 `int[5]`。在表达式中 `a` 会衰变为 `int*` 指向首元素。`p == &a[0]` 通常为真，而 `&a` 是数组指针 `int(*)[5]`。" },
        { id: 2, question: '`int a[4] = {10, 20, 30, 40}; int *p = a;` 下列不等价于 `a[2]` 的是：', options: ["`*(a + 2)`", "`*(p + 2)`", "`p[2]`", "`a + 2`", "`*(2 + a + 0)`"], correctAnswer: 3, explanation: "`a + 2` 是一个指针（地址），而 `a[2]` 是该地址处的值（int）。其他选项根据 C++ 标准定义 `x[y] == *(x+y)` 均等价于 `a[2]`。" },
        { id: 3, question: '`int a[10]; int *p = a;` 在典型 64 位平台下，下列说法正确的是：', options: ["`sizeof(a) == sizeof(p)`", "`sizeof(a) == 10 * sizeof(int)`", "`sizeof(p) == 10 * sizeof(int)`", "`sizeof(p)` 与 `int` 的大小相同", "`sizeof(a[0]) == sizeof(p)`"], correctAnswer: 1, explanation: "`sizeof(a)` 返回整个数组的大小 (40字节)，`sizeof(p)` 返回指针大小 (8字节)。" },
        { id: 4, question: '`int a[3] = {1, 2, 3};` 下列值一定相等的是：', options: ["`a` 与 `&a`", "`a` 与 `&a[0]`", "`&a[0]` 与 `&a[1]`", "`a + 1` 与 `&a`", "`&a[2] + 1` 与 `&a[3]`"], correctAnswer: 1, explanation: "`a` 衰变为指向首元素的指针，即 `&a[0]`。`&a` 是数组指针，虽然数值可能相同，但类型不同。`&a[2]+1` 指向尾后，等价于 `&a[3]`。" },
        { id: 5, question: '`int a[4]... int *p = a; int *q = a + 4; while(p != q) { sum += *p; ++p; }` `sum` 的值是：', options: ["0", "60", "70", "100", "未定义"], correctAnswer: 3, explanation: "`p` 从 `a[0]` 遍历到 `a[3]`，累加 10+20+30+40 = 100。" },
        { id: 6, question: '`int a[5]... int *p = &a[4]; int *q = &a[1]; ptrdiff_t d = p - q;` `d` 的值是：', options: ["2", "3", "4", "5", "未定义"], correctAnswer: 1, explanation: "下标 4 减去下标 1，相差 3 个元素。" },
        { id: 7, question: '`int a[3]... int *p = &a[0]; int *q = &a[2];` 关于 `p < q` 说法正确的是：', options: ["不允许比较指针大小", "结果是未定义行为", "合法且一定为 `true`", "合法但结果不确定", "只有在指针相等时才允许比较"], correctAnswer: 2, explanation: "指向同一数组内元素的指针之间可以进行大小比较，语义良好。" },
        { id: 8, question: '`void foo(int *p, int n);` 调用 `foo(a, 5);` 关于 `foo` 内部形参 `p`：', options: ["`p` 是数组类型 `int[5]`", "`p` 是指针类型 `int*`", "`p` 的大小等于 `5 * sizeof(int)`", "`sizeof(p)` 等于 `sizeof(a)`", "`p` 不能用下标访问元素"], correctAnswer: 1, explanation: "数组传参时退化为指针，`foo` 的形参 `p` 就是 `int*`。" },
        { id: 9, question: '下列函数声明中，与 `void bar(int *p);` 等价的是：', options: ["`void bar(int p[10]);`", "`void bar(int p[]);`", "`void bar(int &p);`", "A 和 B", "A、B 和 C"], correctAnswer: 3, explanation: "形参中的 `int p[10]` 和 `int p[]` 都会退化为 `int*`。" },
        { id: 10, question: '`int a[3]... int *p = a + 3; int x = *p;` 关于这段代码：', options: ["`x` 一定为 0", "`x` 一定为 3", "语法错误", "行为未定义 (UB)", "一定抛出异常"], correctAnswer: 3, explanation: "`a+3` 是尾后指针，合法但不可解引用。`*p` 导致未定义行为。" },
        { id: 11, question: '要在堆上创建一个长度为 `n` 的 `int` 数组并正确释放，写法正确的是：', options: ["`int *p = new int(n); delete p;`", "`int *p = new int[n]; delete p;`", "`int *p = new int[n]; delete[] p;`", "`int p[n]; delete[] p;`", "`int p[n];`"], correctAnswer: 2, explanation: "一维动态数组需使用 `new T[n]` 和 `delete[] p` 配对。" },
        { id: 12, question: '`int n=4; int *p=new int[n]{1,2,3,4}; int *q=p; ... sum+=*q; ++q; delete[] p;` `sum`的值：', options: ["0", "6", "10", "11", "未定义"], correctAnswer: 2, explanation: "正常遍历动态数组，1+2+3+4=10。" },
        { id: 13, question: '`int a[3]={1,2,3}; int *p=a; *p+=10; *(p+1)+=20; p[2]+=30;` 执行后 `a` 为：', options: ["{11, 22, 33}", "{11, 22, 3}", "{11, 22, 33}", "{1, 2, 3}", "{10, 20, 30}"], correctAnswer: 0, explanation: "`a[0]+=10` -> 11, `a[1]+=20` -> 22, `a[2]+=30` -> 33。" },
        { id: 14, question: '`int *arr[3];` ... 下列表达式中，不合法或最不推荐的是：', options: ["`*arr[0]`", "`arr[1][0]`", "`*(arr[2])`", "`**arr`", "`*(arr + 1)`"], correctAnswer: 3, explanation: "`**arr` 语法合法但可读性差，通常建议清晰表达意图。" },
        { id: 15, question: '`int *p = a + 5;` (尾后) 要让 `q` 指向最后一个元素 `a[4]`，正确的是：', options: ["`int *q = p;`", "`int *q = p + 1;`", "`int *q = p - 1;`", "`int *q = &p[4];`", "`int *q = &a[5];`"], correctAnswer: 2, explanation: "尾后指针向前移动一个位置即为最后一个元素。" },
        { id: 16, question: '`void setZero(int *p, int n) { ... }` `main` 中 `a` 的内容变为：', options: ["{1, 2, 3}", "{0, 0, 0}", "{0, 2, 3}", "{1, 0, 0}", "未定义"], correctAnswer: 1, explanation: "传递指针允许函数修改原始数组的内容。" },
        { id: 17, question: '`int a[7]... int n = sizeof(a) / sizeof(a[0]);` `n` 的值：', options: ["依赖平台", "7", "指针大小", "`sizeof(int)`", "非法"], correctAnswer: 1, explanation: "这是 C++ 中计算静态数组元素个数的标准惯用写法。" },
        { id: 18, question: '`int a[3]... int *p = a;` 下列一定不合法（编译错误）的是：', options: ["`*(a + 3)`", "`*(p + 3)`", "`a = p;`", "`p = a + 1;`", "`p = &a[2];`"], correctAnswer: 2, explanation: "数组名 `a` 是不可修改的左值，不能作为赋值的目标。" },
        { id: 19, question: '`int *p = &a[1];` (a={10,20,30,40}) ... `p[1]` 和 `*(p+2)` 分别是：', options: ["20, 30", "30, 40", "30, UB", "40, UB", "行为未定义"], correctAnswer: 1, explanation: "`p` 指向 `a[1]` (20)。`p[1]` 是 `a[2]` (30)。`*(p+2)` 是 `a[3]` (40)。" },
        { id: 20, question: '`int *q = &a[1] + 2;` (a长度3) 关于 `q` 正确的是：', options: ["可以安全解引用", "是尾后指针，不能解引用", "指向数组最后一个元素", "`q` 的值不确定", "无法通过编译"], correctAnswer: 1, explanation: "`q` 指向 `a[3]`，即尾后位置，合法但不可解引用。" }
      ]
    }
  },
  {
    id: 'ptr-array-10-coding-1',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.10 课后练习 (编程题 1)',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：用指针遍历数组并求和',
      description: '编写一个函数 `int sumArray(const int *a, int n)`，要求用 **指针遍历** 一维数组 `a` 中的前 `n` 个元素，返回它们的和。不得使用下标运算符 `[]`。',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Implement sumArray using pointers only (no [])
int sumArray(const int *a, int n) {
    return 0;
}

int main() {
    int arr[] = {10, 20, 30, 40};
    cout << sumArray(arr, 4) << endl; // Expected: 100
    return 0;
}`,
      hints: ["const int *p = a;", "const int *end = a + n;", "while(p != end)"],
      solutionCode: `#include <iostream>
using namespace std;

int sumArray(const int *a, int n) {
    const int *p = a;
    const int *end = a + n;
    int sum = 0;
    while (p != end) {
        sum += *p;
        p++;
    }
    return sum;
}

int main() {
    int arr[] = {10, 20, 30, 40};
    cout << sumArray(arr, 4) << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-array-10-coding-2',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.10 课后练习 (编程题 2)',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：就地反转一维数组',
      description: '编写函数 `void reverseArray(int *a, int n)`，使用 **指针**（或指针算术）就地反转数组 `a` 中的前 `n` 个元素。例如 `{1,2,3,4}` 反转后为 `{4,3,2,1}`。',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Reverse array using pointers
void reverseArray(int *a, int n) {
    
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    reverseArray(arr, 5);
    for(int i=0; i<5; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
      hints: ["int *left = a;", "int *right = a + n - 1;", "while(left < right)"],
      solutionCode: `#include <iostream>
using namespace std;

void reverseArray(int *a, int n) {
    int *left = a;
    int *right = a + n - 1;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    reverseArray(arr, 5);
    for(int i=0; i<5; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-array-10-coding-3',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.10 课后练习 (编程题 3)',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：指针版线性查找',
      description: '编写函数 `int findFirst(const int *a, int n, int value)`，在线性时间内查找 `value` 在数组 `a` 中第一次出现的位置（下标），若不存在返回 `-1`。要求用 **指针遍历**。',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Find first occurrence using pointers, return index or -1
int findFirst(const int *a, int n, int value) {
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 30};
    cout << findFirst(arr, 5, 30) << endl; // Expected: 1 or 2 or 4 based on array content
    cout << findFirst(arr, 5, 99) << endl; // Expected: -1
    return 0;
}`,
      hints: ["for loop with pointer increment", "return current index i"],
      solutionCode: `#include <iostream>
using namespace std;

int findFirst(const int *a, int n, int value) {
    const int *p = a;
    for (int i = 0; i < n; ++i, ++p) {
        if (*p == value) return i;
    }
    return -1;
}

int main() {
    int arr[] = {10, 20, 30, 40, 30};
    cout << findFirst(arr, 5, 30) << endl;
    cout << findFirst(arr, 5, 99) << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-array-10-coding-4',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.10 课后练习 (编程题 4)',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：动态创建一维数组',
      description: '编写一个函数 `void createAndPrint(int n)`，动态分配一个 `int` 数组，长度为 `n`。将数组元素初始化为 `1, 2, ..., n`，然后用指针遍历打印所有元素，最后释放内存。请在 `main` 函数中调用它，例如 `createAndPrint(5)`。',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Implement createAndPrint
void createAndPrint(int n) {
    // 1. new int[n]
    // 2. init
    // 3. print with pointer
    // 4. delete[]
}

int main() {
    createAndPrint(5);
    return 0;
}`,
      hints: ["int *p = new int[n];", "don't forget delete[] p;"],
      solutionCode: `#include <iostream>
using namespace std;

void createAndPrint(int n) {
    if (n <= 0) return;
    int *p = new int[n];
    for(int i=0; i<n; i++) p[i] = i+1;

    int *cur = p; 
    int *end = p + n;
    while(cur != end) {
        cout << *cur << " ";
        cur++;
    }
    cout << endl;
    delete[] p;
}

int main() {
    createAndPrint(5);
    return 0;
}`
    }
  },
  {
    id: 'ptr-array-10-coding-5',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.10 课后练习 (编程题 5)',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：循环右移 (指针版)',
      description: '编写 `void rotateRight(int *a, int n)`，把长度为 `n` 的一维数组 `a` 中的元素循环右移一位：例如 `{1,2,3,4}` -> `{4,1,2,3}`。要求用 **指针或指针运算** 实现，不能使用额外数组。',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Rotate array right by 1 position using pointers
void rotateRight(int *a, int n) {
    
}

int main() {
    int arr[] = {1, 2, 3, 4};
    rotateRight(arr, 4);
    for(int i=0; i<4; i++) cout << arr[i] << " "; // Expected: 4 1 2 3
    cout << endl;
    return 0;
}`,
      hints: ["Store last element", "Shift elements right from end to start", "Put last at beginning"],
      solutionCode: `#include <iostream>
using namespace std;

void rotateRight(int *a, int n) {
    if (n <= 1) return;
    int last = a[n - 1];
    int *p = a + n - 1;
    int *begin = a;
    
    while (p > begin) {
        *p = *(p - 1);
        p--;
    }
    *begin = last;
}

int main() {
    int arr[] = {1, 2, 3, 4};
    rotateRight(arr, 4);
    for(int i=0; i<4; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`
    }
  },  {
    id: 'ptr-array-2d',
    category: '指针 (Pointers)',
    title: '3. 指针与二维数组',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p>二维数组名 <code>a</code> 是行指针 <code>int (*)[3]</code>。</p>
        <CodeBlock code={`int a[2][3];\nint (*p)[3] = a;`} />
      </div>
    )
  },
  {
    id: 'ptr-advanced',
    category: '指针 (Pointers)',
    title: '4. 指针数组与行指针',
    type: 'lesson',
    content: (
      <div className="space-y-12">
        {/* 1. Pointer Array */}
        <div id="ptr-4-1">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">一、指针数组：数组的每个元素都是指针</h3>
            
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 mb-6">
                <p className="text-lg text-indigo-900 font-medium mb-3">
                    通俗理解：
                </p>
                <ul className="list-disc list-inside text-indigo-800 space-y-2 ml-2">
                    <li><strong>普通数组</strong> (<code>int a[3]</code>)：一排“整数格子”。</li>
                    <li><strong>指针数组</strong> (<code>int *p[3]</code>)：一排“指针格子”，每个格子存一个地址。</li>
                </ul>
            </div>

            <div className="space-y-8">
                {/* 1.1 Point to Variables */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">1. 让数组里的每个指针指向不同变量</h4>
                    <CodeBlock code={`int x = 10, y = 20, z = 30;

int *p[3];   // 指针数组：里面放 3 个 int*
p[0] = &x;
p[1] = &y;
p[2] = &z;

cout << *p[0]; // 输出 10 (即 x)`} />
                </div>

                {/* 1.2 Strings */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">2. 经典用法：字符串常量数组</h4>
                    <p className="text-slate-600 mb-3">
                        这是 C 语言风格字符串处理中最常见的模式：
                    </p>
                    <CodeBlock code={`const char *words[3] = {
    "hello",
    "world",
    "C++"
};

// words[0] 指向 "hello"
// words[1] 指向 "world"`} />
                </div>

                {/* 1.3 Ragged Array */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">3. 模拟“二维数组” (非连续内存)</h4>
                    <p className="text-slate-600 mb-3">
                        每行可以独立分配，长度甚至可以不同。
                    </p>
                    <CodeBlock code={`int row1[] = {1, 2, 3};
int row2[] = {4, 5};
int *rows[2] = { row1, row2 };

cout << rows[0][2]; // 3
cout << rows[1][1]; // 5`} />
                </div>
            </div>
        </div>

        {/* 2. Row Pointer */}
        <div id="ptr-4-2" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 border-b pb-2">二、行指针 (数组指针)：指向整个一维数组</h3>
            
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 mb-6">
                <p className="text-lg text-emerald-900 font-medium mb-3">
                    定义形式：<code>int (*p)[3];</code>
                </p>
                <p className="text-emerald-800">
                    这里 <code>(*p)</code> 括号不能少！它表示 p 是一个<strong>指针</strong>，指向一个“包含3个int的数组”。
                </p>
            </div>

            <div className="space-y-8">
                {/* 2.1 Traverse 2D Array */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">1. 遍历二维数组</h4>
                    <p className="text-slate-600 mb-3">
                        对于 <code>int a[2][3]</code>，数组名 <code>a</code> 本质上就是指向“第一行”的行指针。
                    </p>
                    <CodeBlock code={`int a[2][3] = {{1,2,3}, {4,5,6}};
int (*p)[3] = a; // p 指向 a[0] (整个第0行)

// 遍历
for(int i=0; i<2; i++) {
    // p+i 指向第 i 行
    // *(p+i) 拿到第 i 行数组 (退化为 int*)
    for(int j=0; j<3; j++) {
        cout << p[i][j] << " ";
    }
}`} />
                </div>

                {/* 2.2 Function Param */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">2. 作为函数参数</h4>
                    <p className="text-slate-600 mb-3">
                        当函数需要接收二维数组时，必须指定第二维的长度。
                    </p>
                    <CodeBlock code={`// 接收一个 n 行 3 列的数组
void print2D(int (*p)[3], int n) {
    // ...
}

int a[2][3];
print2D(a, 2);`} />
                </div>
            </div>
        </div>

        {/* 3. Comparison */}
        <div id="ptr-4-3" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">三、终极对比：指针数组 vs 行指针</h3>
            
            <PointerVsRowPointerVisual />

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 border border-slate-200 rounded-lg">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th className="px-6 py-3 border-b">特性</th>
                            <th className="px-6 py-3 border-b text-indigo-700">指针数组 int *p[3]</th>
                            <th className="px-6 py-3 border-b text-emerald-700">行指针 int (*p)[3]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <th className="px-6 py-4 font-medium bg-slate-50">本质</th>
                            <td className="px-6 py-4">是一个<strong>数组</strong></td>
                            <td className="px-6 py-4">是一个<strong>指针</strong></td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th className="px-6 py-4 font-medium bg-slate-50">内容</th>
                            <td className="px-6 py-4">存了 3 个指针</td>
                            <td className="px-6 py-4">指向 1 个数组 (长度3)</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th className="px-6 py-4 font-medium bg-slate-50">内存</th>
                            <td className="px-6 py-4">指向的内容通常不连续</td>
                            <td className="px-6 py-4">指向一块连续内存</td>
                        </tr>
                        <tr className="bg-white">
                            <th className="px-6 py-4 font-medium bg-slate-50">适用</th>
                            <td className="px-6 py-4">字符串数组、非规则矩阵</td>
                            <td className="px-6 py-4">处理标准二维数组</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-amber-50 p-5 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">🧠 一眼辨析口诀</h4>
                <ul className="list-disc list-inside text-amber-800 space-y-2">
                    <li><code>*p[3]</code>：优先结合 []，所以是<strong>数组</strong>（元素是指针）。</li>
                    <li><code>(*p)[3]</code>：优先结合 *，所以是<strong>指针</strong>（指向数组）。</li>
                </ul>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'ptr-func',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '核心讲解',
    type: 'lesson',
    content: (
      <div className="space-y-12">
        {/* 5.1 Pass by Pointer */}
        <div id="ptr-5-1">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">一、指针作为函数参数：用地址“改外面”</h3>
            
            <p className="text-lg text-slate-700 mb-4">
                核心区别：传值只是<strong>复制副本</strong>，传指针是<strong>交出钥匙</strong>。
            </p>

            <PassByValueVsPointerVisual />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-red-700 mb-2 text-sm">❌ 值传参 (Pass by Value)</h4>
                    <CodeBlock code={`void setToZero(int x) {
    x = 0; // 改的是副本
}

int a = 10;
setToZero(a);
// a 还是 10`} />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                    <h4 className="font-bold text-emerald-700 mb-2 text-sm">✅ 指针传参 (Pass by Pointer)</h4>
                    <CodeBlock code={`void setToZero(int *p) {
    *p = 0; // 改的是真身
}

int a = 10;
setToZero(&a); // 传地址
// a 变成了 0`} />
                </div>
            </div>

            <div className="mt-6">
                <h4 className="font-bold text-slate-800 mb-3 text-lg">经典应用：交换两个变量 (Swap)</h4>
                <CodeBlock code={`void mySwap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main() {
    int x = 3, y = 5;
    mySwap(&x, &y); // 必须传地址
    cout << x << " " << y; // 5 3
}`} />
            </div>
        </div>

        {/* 5.2 Return Pointer */}
        <div id="ptr-5-2" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">二、指针作为函数返回值</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-emerald-700 mb-2 flex items-center gap-2">
                        ✅ 正确用法
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">返回全局变量、静态变量或堆内存的地址。</p>
                    <CodeBlock code={`int globalVar = 42;

int* getGlobal() {
    return &globalVar; // 安全
}

int* getHeap() {
    return new int(10); // 安全
}`} />
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        🚫 严重错误：返回局部变量地址
                    </h4>
                    <p className="text-xs text-red-700 mb-2">
                        局部变量 <code>x</code> 在函数结束时销毁，返回它的地址会得到<strong>悬空指针</strong>。
                    </p>
                    <CodeBlock code={`int* bad() {
    int x = 10;
    return &x; // 💥 危险！
}`} />
                </div>
            </div>
        </div>

        {/* 5.3 Const Pointer Argument */}
        <div id="ptr-5-3" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">三、const 指针作为参数</h3>
            
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 mb-2 text-lg">1. 只读访问 (const T*)</h4>
                    <p className="text-slate-600 mb-2">
                        最常用的写法。告诉调用者：“我只读你的数据，绝不修改。”
                    </p>
                    <CodeBlock code={`void printArray(const int *a, int n) {
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
        // a[i] = 10; // ❌ 编译错误，禁止修改
    }
}`} />
                </div>
                
                <div className="opacity-75 hover:opacity-100 transition-opacity">
                    <h4 className="font-bold text-slate-600 mb-2 text-sm">2. 固定指针指向 (T* const) - 较少用</h4>
                    <p className="text-xs text-slate-500 mb-2">
                        限制函数内部不能修改指针变量 <code>p</code> 本身（但可以改 <code>*p</code>）。
                    </p>
                    <CodeBlock code={`void foo(int *const p) {
    *p = 100;     // ✅ 可以改值
    // p = nullptr; // ❌ 不能改 p 指向别处
}`} />
                </div>
            </div>
        </div>

        {/* 5.4 Pointer to Pointer Argument */}
        <div id="ptr-5-4" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">四、指向指针的指针 (T**)</h3>
            
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 mb-6">
                <p className="text-indigo-900 font-medium">
                    场景：如果你想在函数里<strong>修改指针变量本身</strong>（比如把它置空，或让它指向新分配的内存）。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-slate-700 mb-2">示例 1：重置指针</h4>
                    <CodeBlock code={`void reset(int **pp) {
    *pp = nullptr; // 改的是外面的指针
}

int *p = &x;
reset(&p); // 传 p 的地址
// p 变成了 nullptr`} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-700 mb-2">示例 2：分配内存</h4>
                    <CodeBlock code={`void alloc(int **pp, int n) {
    *pp = new int[n]; // 把新地址填回去
}

int *arr = nullptr;
alloc(&arr, 5);
// arr 现在指向有效内存`} />
                </div>
            </div>
        </div>

        {/* 5.5 Function Pointer */}
        <div id="ptr-5-5" className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">五、函数指针：指向“代码”的指针</h3>
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
                <p className="text-slate-700 mb-4">
                    变量有地址，<strong>函数也有地址</strong>。指针可以存下这个地址，然后通过指针调用函数。
                </p>
                <div className="p-3 bg-slate-100 rounded font-mono text-sm text-slate-600">
                    返回类型 (*指针名)(参数列表);
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">1. 基本用法</h4>
                    <CodeBlock code={`int add(int a, int b) { return a + b; }

int main() {
    // 定义函数指针 pf
    int (*pf)(int, int) = add;
    
    // 通过指针调用
    int res = pf(2, 3); // 5
}`} />
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">2. 回调函数 (Callback)</h4>
                    <p className="text-slate-600 mb-3">
                        把函数当作参数传给另一个函数，让对方在适当的时候调用。
                    </p>
                    <CodeBlock code={`// 通用处理函数
void transform(int *a, int n, int (*op)(int)) {
    for(int i=0; i<n; i++) 
        a[i] = op(a[i]); // 调用传进来的函数
}

int square(int x) { return x * x; }

int main() {
    int arr[] = {1, 2, 3};
    transform(arr, 3, square); // 传 square 函数
    // arr 变为 {1, 4, 9}
}`} />
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-lg">3. 函数指针数组 (菜单)</h4>
                    <CodeBlock code={`int add(int a, int b) { return a+b; }
int sub(int a, int b) { return a-b; }

// 存了两个函数指针
int (*ops[2])(int, int) = { add, sub };

cout << ops[0](10, 5); // 调用 add -> 15
cout << ops[1](10, 5); // 调用 sub -> 5`} />
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'ptr-func-quiz',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (选择题)',
    type: 'quiz',
    quizData: {
      title: '指针与函数测试',
      description: '包含 20 道选择题，考察传值传址、返回指针、函数指针等概念。',
      questions: [
        { id: 1, question: '`void foo(int *p) { *p = 100; }` 执行 `foo(&x)` 后 `x` 的值？', options: ["`10`", "`0`", "`100`", "未定义", "编译错误"], correctAnswer: 2, explanation: "传地址调用，`*p = 100` 修改了 `x`。" },
        { id: 2, question: '`setZero1(int x)` vs `setZero2(int *x)`，分别传入 `a` 和 `&b`，结果？', options: ["`a=0, b=0`", "`a=5, b=0`", "`a=0, b=5`", "`a=5, b=5`", "编译错误"], correctAnswer: 1, explanation: "`setZero1` 是值传递，不改 `a`；`setZero2` 是指针传递，修改 `b`。" },
        { id: 3, question: '`int* getPtr() { return &a; }` (a为全局变量)，`*p = 20` 后 `a` 的值？', options: ["`10`", "`20`", "未定义", "程序崩溃", "编译错误"], correctAnswer: 1, explanation: "`a` 是全局变量，返回其地址安全，`*p` 修改它。" },
        { id: 4, question: '`int* func() { int x=10; return &x; }` 返回局部变量地址？', options: ["安全", "可能错误但不崩溃", "悬空指针 (UB)", "仅多线程有问题", "无法编译"], correctAnswer: 2, explanation: "局部变量栈内存销毁，返回其地址是悬空指针，解引用未定义。" },
        { id: 5, question: '`void reset(int **pp) { *pp = nullptr; }` 调用 `reset(&p)`？', options: ["`x=0`", "`p=nullptr`", "`x=0, p=0`", "`x=nullptr`", "编译错误"], correctAnswer: 1, explanation: "传入指针的地址，`*pp` 修改的是指针 `p` 本身，使其指向 `nullptr`。" },
        { id: 6, question: '`void print(const int *p) { *p = 10; }`', options: ["合法", "行为未定义", "编译错误", "运行时异常", "仅在 const 对象时错误"], correctAnswer: 2, explanation: "`const int *p` 禁止通过 `p` 修改内容。" },
        { id: 7, question: '`void foo(int *const p) { *p=10; p=nullptr; }`', options: ["都通过", "①通过 ②错误", "①错误 ②通过", "都错误", "仅优化时错误"], correctAnswer: 1, explanation: "`int *const p` 指针本身常量不能改指向，但可以改内容。" },
        { id: 8, question: '定义指向 `int add(int, int)` 的函数指针？', options: ["`int pf(int, int) = add;`", "`int *pf(int, int) = add;`", "`int (*pf)(int, int) = add;`", "`int &pf(int, int) = add;`", "`int pf = add(int, int);`"], correctAnswer: 2, explanation: "函数指针语法：`Ret (*Ptr)(Args)`。" },
        { id: 9, question: '`pf(2,3)` vs `(*pf)(4,5)`', options: ["`2, 4`", "`5, 9`", "`6, 20`", "`9, 20`", "编译错误"], correctAnswer: 2, explanation: "两种调用方式等价，都是调用函数。" },
        { id: 10, question: '`void apply(..., int (*op)(int))` 中 `op` 是？', options: ["`int*`", "函数指针", "返回指针的函数", "不可调用", "`void (*)(int)`"], correctAnswer: 1, explanation: "`op` 是指向 `int(int)` 函数的指针。" },
        { id: 11, question: '`int (*ops[2])(int, int) = {add, sub};` 调用 `ops[0]` 和 `ops[1]`？', options: ["`13, 7`", "`7, 13`", "`10, 3`", "`3, 10`", "编译错误"], correctAnswer: 0, explanation: "`ops[0]` 是 `add`，`ops[1]` 是 `sub`。" },
        { id: 12, question: '`pf = func;` (func 为函数名)', options: ["非法", "类型不匹配", "合法，自动转为指针", "需强转", "必须写 `&func`"], correctAnswer: 2, explanation: "函数名退化为指针，可以直接赋值。" },
        { id: 13, question: '`int (*pf)(int) = nullptr; pf = foo;`', options: ["只能赋值一次", "初始化非法", "只能指 void 函数", "合法，先空后指", "必须定义时赋值"], correctAnswer: 3, explanation: "函数指针可以为空，也可以重新赋值。" },
        { id: 14, question: '`pf = f1` (类型匹配) vs `pf = f2` (类型不匹)', options: ["`pf=f1` 合法", "`pf=f2` 合法", "`pf=&f2` 合法", "强转后合法", "都不合法"], correctAnswer: 0, explanation: "函数指针必须严格匹配参数和返回值类型。" },
        { id: 15, question: '`calc(3, 2, op)` 调用方式？', options: ["`add(3,2)`", "`&add`", "`*add`", "B 和 C", "A B C"], correctAnswer: 3, explanation: "`&add` 和 `*add` (在此处) 都可以得到函数指针，`add(..)` 返回 int。" },
        { id: 16, question: '返回函数指针的函数声明 `int func(int)`？', options: ["`int (*g(int))(int)`", "`int *g(int)(int)`", "`int g(int)(int*)`", "`int g(*int)(int)`", "`int (*g(int*))(int)`"], correctAnswer: 0, explanation: "`g(int)` 返回 `int (*)(int)`。" },
        { id: 17, question: '比较函数原型？', options: ["`bool cmp(int, int)`", "`int cmp(int, int)`", "`void cmp(int*, int*)`", "`int* cmp(int*, int*)`", "`void cmp(void)`"], correctAnswer: 0, explanation: "通常返回 `bool` 表示次序。" },
        { id: 18, question: '`split(57, &h, &l)` 输出参数？', options: ["`5, 7`", "`57, 0`", "`7, 5`", "`0, 57`", "编译错误"], correctAnswer: 0, explanation: "分别取商和余数。" },
        { id: 19, question: '`typedef int (*Op)(int, int);`', options: ["Op 是函数", "Op 是函数指针类型", "pf 不可调用", "必须 `(*pf)`", "无法编译"], correctAnswer: 1, explanation: "typedef 定义了类型别名。" },
        { id: 20, question: '`int calc(..., int (*op)(...) = add)` 默认参数？', options: ["非法", "等价于传 `add`", "等价于传 `mul`", "不支持默认值", "仅 C 支持"], correctAnswer: 1, explanation: "函数指针参数可以有默认值。" }
      ]
    }
  },
  {
    id: 'ptr-func-ex-1',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 1)',
    type: 'exercise',
    exerciseData: {
      title: '交换两个整数',
      description: '编写 `void swapInt(int *a, int *b)` 交换两个整数的值。',
      initialCode: `#include <iostream>
using namespace std;
void swapInt(int *a, int *b) {
    // TODO
}
int main() {
    int x = 3, y = 5;
    swapInt(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
      hints: ["int t = *a; *a = *b; *b = t;"],
      solutionCode: `#include <iostream>
using namespace std;
void swapInt(int *a, int *b) {
    if (a && b) {
        int t = *a;
        *a = *b;
        *b = t;
    }
}
int main() {
    int x = 3, y = 5;
    swapInt(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-func-ex-2',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 2)',
    type: 'exercise',
    exerciseData: {
      title: '指针求数组最大值',
      description: '`int maxInArray(const int *a, int n)`，用指针遍历数组返回最大值。',
      initialCode: `#include <iostream>
using namespace std;
int maxInArray(const int *a, int n) {
    // TODO
    return 0;
}
int main() {
    int arr[] = {3, 8, 2, 9, 4};
    cout << maxInArray(arr, 5) << endl;
    return 0;
}`,
      hints: ["const int *p = a; ... while(p != end)"],
      solutionCode: `#include <iostream>
using namespace std;
int maxInArray(const int *a, int n) {
    if (n <= 0) return 0;
    const int *p = a;
    const int *end = a + n;
    int maxVal = *p;
    while (++p != end) {
        if (*p > maxVal) maxVal = *p;
    }
    return maxVal;
}
int main() {
    int arr[] = {3, 8, 2, 9, 4};
    cout << maxInArray(arr, 5) << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-func-ex-3',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 3)',
    type: 'exercise',
    exerciseData: {
      title: '统计出现次数',
      description: '`int countValue(const int *a, int n, int value)`，统计 value 出现的次数。',
      initialCode: `#include <iostream>
using namespace std;
int countValue(const int *a, int n, int value) {
    // TODO
    return 0;
}
int main() {
    int arr[] = {1, 2, 3, 2, 2};
    cout << countValue(arr, 5, 2) << endl;
    return 0;
}`,
      hints: ["if (*p == value) count++;"],
      solutionCode: `#include <iostream>
using namespace std;
int countValue(const int *a, int n, int value) {
    int count = 0;
    const int *p = a;
    const int *end = a + n;
    while (p != end) {
        if (*p == value) count++;
        p++;
    }
    return count;
}
int main() {
    int arr[] = {1, 2, 3, 2, 2};
    cout << countValue(arr, 5, 2) << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-func-ex-4',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 4)',
    type: 'exercise',
    exerciseData: {
      title: '函数指针选择运算',
      description: '实现 add, mul 和 calc(..., int (*op)(int, int))。',
      initialCode: `#include <iostream>
using namespace std;
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
int calc(int a, int b, int (*op)(int, int)) {
    // TODO
    return 0;
}
int main() {
    cout << calc(2, 3, add) << endl;
    cout << calc(2, 3, mul) << endl;
    return 0;
}`,
      hints: ["return op(a, b);"],
      solutionCode: `#include <iostream>
using namespace std;
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
int calc(int a, int b, int (*op)(int, int)) {
    return op(a, b);
}
int main() {
    cout << calc(2, 3, add) << endl;
    cout << calc(2, 3, mul) << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-func-ex-5',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 5)',
    type: 'exercise',
    exerciseData: {
      title: '函数指针数组菜单',
      description: '用函数指针数组实现 add, sub, mul 的调用。',
      initialCode: `#include <iostream>
using namespace std;
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main() {
    // TODO: 定义函数指针数组 ops
    int choice = 0; // 0:add, 1:sub, 2:mul
    int x = 10, y = 5;
    
    // 调用 ops[choice]
    return 0;
}`,
      hints: ["int (*ops[3])(int, int) = { add, sub, mul };"],
      solutionCode: `#include <iostream>
using namespace std;
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main() {
    int (*ops[3])(int, int) = { add, sub, mul };
    int choice = 0;
    int x = 10, y = 5;
    if (choice >= 0 && choice <= 2) {
        cout << ops[choice](x, y) << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'ptr-func-ex-6',
    category: '指针 (Pointers)',
    group: '5. 指针与函数',
    title: '课后练习 (编程题 6)',
    type: 'exercise',
    exerciseData: {
      title: '拆分整数',
      description: '`void splitNumber(int x, int *high, int *low)` 拆分十位和个位。',
      initialCode: `#include <iostream>
using namespace std;
void splitNumber(int x, int *high, int *low) {
    // TODO
}
int main() {
    int h, l;
    splitNumber(57, &h, &l);
    cout << h << " " << l << endl;
    return 0;
}`,
      hints: ["*high = x / 10;", "*low = x % 10;"],
      solutionCode: `#include <iostream>
using namespace std;
void splitNumber(int x, int *high, int *low) {
    if (high) *high = x / 10;
    if (low) *low = x % 10;
}
int main() {
    int h, l;
    splitNumber(57, &h, &l);
    cout << h << " " << l << endl;
    return 0;
}`
    }
  },
  {
    id: 'ptr-memory',
    category: '指针 (Pointers)',
    title: '6. 动态内存管理',
    type: 'lesson',
    content: (
        <div className="space-y-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800 font-bold">
                    ⚠️ 警告：C++ 最大的威力与最大的坑都在这里。
                </p>
            </div>

            {/* 6.1 New & Delete */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">6.1 new 和 delete</h3>
                <p className="text-slate-600 mb-4">
                    栈内存（局部变量）自动释放；堆内存（<code>new</code> 出来的）必须手动释放。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">单个对象</h4>
                        <CodeBlock code={`int *p = new int(10);
// 使用 *p ...
delete p;  // 释放
p = nullptr; // 安全置空`} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">数组对象</h4>
                        <CodeBlock code={`int *arr = new int[10];
// 使用 arr[i] ...
delete[] arr; // 注意 []
arr = nullptr;`} />
                    </div>
                </div>
            </div>

            {/* 6.2 Memory Leak */}
            <div className="bg-red-50 border border-red-100 p-5 rounded-xl">
                <h3 className="text-xl font-bold text-red-800 mb-2">6.2 内存泄漏 (Memory Leak)</h3>
                <p className="text-sm text-red-700 mb-4">
                    借了不还，再借不难？不，借了不还，内存爆满！
                </p>
                <CodeBlock code={`void bad() {
    int *p = new int[1000000];
    // 忘记 delete p;
    // 函数结束，p 销毁了，但那 100万个 int 还在堆里占用着！
    // 多调几次 bad()，程序就崩了 (OOM)。
}`} />
            </div>

            {/* 6.3 Smart Pointers */}
            <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">6.3 现代 C++ 的救星：智能指针</h3>
                <p className="text-slate-600 text-sm mb-3">
                    尽量少用 <code>new/delete</code>，多用 <code>std::unique_ptr</code>。
                </p>
                <CodeBlock code={`#include <memory>
void good() {
    // 自动管理内存，跳出作用域自动 delete
    std::unique_ptr<int> p = std::make_unique<int>(10);
    // 不用写 delete
}`} />
            </div>
        </div>
    )
  },

  // ==========================================
  // Group: Classroom Exercises
  // ==========================================
  {
    id: 'ex-ptr-basic',
    category: '指针 (Pointers)',
    group: '课堂练习',
    title: '练习 1: 基础操作',
    type: 'exercise',
    exerciseData: {
      title: '使用指针修改变量',
      description: '1. 定义 a=10\n2. 定义 *p 指向 a\n3. 用 *p 修改为 20',
      initialCode: `#include <iostream>
using namespace std;
int main() {
    int a = 10;
    // ...
    cout << a << endl;
    return 0;
}`,
      hints: ["int *p = &a;", "*p = 20;"],
      solutionCode: `#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int *p = &a;
    *p = 20;
    cout << a << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-array',
    category: '指针 (Pointers)',
    group: '课堂练习',
    title: '练习 2: 指针遍历数组',
    type: 'exercise',
    exerciseData: {
      title: '仅用指针运算求和',
      description: '禁止使用 a[i]，只用 *(p+i)',
      initialCode: `#include <iostream>
using namespace std;
int main() {
    int a[5] = {1,2,3,4,5};
    int sum = 0;
    // ...
    cout << sum << endl;
    return 0;
}`,
      hints: ["sum += *(p+i)"],
      solutionCode: `#include <iostream>
using namespace std;
int main() {
    int a[5] = {1,2,3,4,5};
    int *p = a;
    int sum = 0;
    for(int i=0; i<5; ++i) sum += *(p+i);
    cout << sum << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-swap',
    category: '指针 (Pointers)',
    group: '课堂练习',
    title: '练习 3: 交换函数',
    type: 'exercise',
    exerciseData: {
      title: '实现 swap 函数',
      description: 'void mySwap(int *x, int *y)',
      initialCode: `#include <iostream>
using namespace std;
// Implement mySwap
int main() {
    int a=100, b=200;
    // call swap
    cout << a << " " << b << endl;
    return 0;
}`,
      hints: ["传地址"],
      solutionCode: `#include <iostream>
using namespace std;
void mySwap(int *x, int *y) {
    int t = *x; *x = *y; *y = t;
}
int main() {
    int a=100, b=200;
    mySwap(&a, &b);
    cout << a << " " << b << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-row',
    category: '指针 (Pointers)',
    group: '课堂练习',
    title: '练习 4: 行指针遍历',
    type: 'exercise',
    exerciseData: {
      title: '使用行指针遍历二维数组',
      description: '用 int (*p)[3] 遍历 a[2][3]',
      initialCode: `#include <iostream>
using namespace std;
int main() {
    int a[2][3] = {{1,2,3},{4,5,6}};
    // ...
    return 0;
}`,
      hints: ["int (*p)[3] = a;"],
      solutionCode: `#include <iostream>
using namespace std;
int main() {
    int a[2][3] = {{1,2,3},{4,5,6}};
    int (*p)[3] = a;
    for(int i=0; i<2; ++i) {
        for(int j=0; j<3; ++j) cout << p[i][j] << " ";
        cout << endl;
    }
    return 0;
}`
    }
  },

  // ==========================================
  // Group: Unit Test
  // ==========================================
  {
    id: 'quiz-pointers',
    category: '指针 (Pointers)',
    group: '阶段测试 (Unit Test)',
    title: '第一部分：基础选择题',
    type: 'quiz',
    quizData: {
      title: '指针基础测试',
      description: '包含 10 道选择题，考察指针定义、运算、安全及数组关系。',
      questions: [
        { id: 1, question: '`int a = 10; int *p = &a;` 那么 `*p` 的值是？', options: ["`10`", "`a` 的地址", "`p` 的地址", "`0`", "垃圾值"], correctAnswer: 0, explanation: "`*p` 解引用获取 `a` 的值。" },
        { id: 2, question: '`int *p; *p = 10;` 这种操作叫什么？', options: ["合法操作", "野指针写入", "空指针解引用", "内存泄漏", "类型转换"], correctAnswer: 1, explanation: "`p` 未初始化，指向随机地址，写入极其危险。" },
        { id: 3, question: '在 64 位系统下，`sizeof(int*)` 是多少？', options: ["`4`", "`8`", "`2`", "取决于指向的类型", "`16`"], correctAnswer: 1, explanation: "64 位系统地址线宽 64 位，指针占 8 字节。" },
        { id: 4, question: '`int a[5]; int *p = a; *(p+2)` 等价于？', options: ["`a[0]`", "`a[1]`", "`a[2]`", "`a[3]`", "`a[5]`"], correctAnswer: 2, explanation: "`p+2` 指向第 3 个元素。" },
        { id: 5, question: '`int *p = nullptr;` 推荐使用 `nullptr` 而不是 `0` 可以在哪方面提供帮助？', options: ["性能优化", "避免重载歧义", "节省内存", "兼容 C 语言", "无区别"], correctAnswer: 1, explanation: "`nullptr` 是指针类型，`0` 是 `int`，重载函数时有区别。" },
        { id: 6, question: '`double *p; p++` 指针的值增加多少？', options: ["`1`", "`4`", "`8` (sizeof double)", "`2`", "`0`"], correctAnswer: 2, explanation: "指针加法步长等于指向类型的大小。" },
        { id: 7, question: '`int a[2][3]; int (*p)[3] = a;` `p` 指向哪里？', options: ["`a[0][0]`", "整个二维数组", "第 0 行", "第 1 行", "`a[0][1]`"], correctAnswer: 2, explanation: "`p` 是行指针，指向第 0 行（作为一个数组）。" },
        { id: 8, question: '`void f(int *p)` 和 `void f(int p[])` 区别？', options: ["`p[]` 是数组，`*p` 是指针", "完全等价", "`p[]` 传值，`*p` 传址", "`p[]` 不允许修改", "`*p` 更快"], correctAnswer: 1, explanation: "作为函数参数时完全等价，都退化为指针。" },
        { id: 9, question: '`int a = 10; int &r = a; int *p = &r; *p` 是多少？', options: ["`10`", "`r` 的地址", "`a` 的地址", "报错", "`0`"], correctAnswer: 0, explanation: "`r` 是 `a` 的别名，`&r` 就是 `&a`，`*p` 就是 `a` 的值。" },
        { id: 10, question: '`const int *p` 表示？', options: ["`p` 不可变", "`p` 指向的内容不可变", "`p` 和内容都不可变", "`p` 必须初始化为空", "语法错误"], correctAnswer: 1, explanation: "指向常量的指针。" }
      ]
    }
  },
  {
    id: 'ex-ptr-prog-1',
    category: '指针 (Pointers)',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 1 (最值)',
    type: 'exercise',
    exerciseData: {
      title: '查找最大和最小值',
      description: '实现 void findMinMax(int *arr, int n, int *max, int *min)，通过指针返回最大最小值。',
      initialCode: `#include <iostream>
using namespace std;
void findMinMax(int *arr, int n, int *max, int *min) {
    // TODO: 更新 *max 和 *min
}
int main() {
    int a[] = {3, 1, 4, 1, 5, 9, 2};
    int maxVal, minVal;
    findMinMax(a, 7, &maxVal, &minVal);
    cout << "Max: " << maxVal << ", Min: " << minVal << endl;
    return 0;
}`,
      hints: ["初始化 *max = *min = arr[0]", "遍历比较"],
      solutionCode: `#include <iostream>
using namespace std;
void findMinMax(int *arr, int n, int *max, int *min) {
    *max = arr[0];
    *min = arr[0];
    for(int i=1; i<n; ++i) {
        if(arr[i] > *max) *max = arr[i];
        if(arr[i] < *min) *min = arr[i];
    }
}
int main() {
    int a[] = {3, 1, 4, 1, 5, 9, 2};
    int maxVal, minVal;
    findMinMax(a, 7, &maxVal, &minVal);
    cout << "Max: " << maxVal << ", Min: " << minVal << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-prog-2',
    category: '指针 (Pointers)',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 2 (数组反转)',
    type: 'exercise',
    exerciseData: {
      title: '使用指针反转数组',
      description: '只用指针操作（pStart, pEnd）来反转数组。',
      initialCode: `#include <iostream>
using namespace std;
void reverseArray(int *arr, int n) {
    // TODO
}
int main() {
    int a[] = {1, 2, 3, 4, 5};
    reverseArray(a, 5);
    for(int x : a) cout << x << " ";
    return 0;
}`,
      hints: ["pStart=arr, pEnd=arr+n-1", "while(pStart < pEnd) swap"],
      solutionCode: `#include <iostream>
using namespace std;
void reverseArray(int *arr, int n) {
    int *start = arr;
    int *end = arr + n - 1;
    while(start < end) {
        int t = *start;
        *start = *end;
        *end = t;
        start++;
        end--;
    }
}
int main() {
    int a[] = {1, 2, 3, 4, 5};
    reverseArray(a, 5);
    for(int i=0; i<5; ++i) cout << a[i] << " ";
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-prog-3',
    category: '指针 (Pointers)',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 3 (Strlen)',
    type: 'exercise',
    exerciseData: {
      title: '实现 strlen',
      description: '不使用库函数，用指针减法计算字符串长度。size_t my_strlen(const char *s)',
      initialCode: `#include <iostream>
using namespace std;
size_t my_strlen(const char *s) {
    // TODO: 使用指针遍历找到结尾，然后相减
    return 0;
}
int main() {
    cout << my_strlen("Hello") << endl;
    return 0;
}`,
      hints: ["const char *p = s;", "while(*p) p++;", "return p - s;"],
      solutionCode: `#include <iostream>
using namespace std;
size_t my_strlen(const char *s) {
    const char *p = s;
    while(*p != '\\0') p++;
    return p - s;
}
int main() {
    cout << my_strlen("Hello") << endl;
    return 0;
}`
    }
  }
];