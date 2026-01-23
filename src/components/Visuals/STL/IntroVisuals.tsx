import React from 'react';
import { Layers, Box, ArrowRight, Factory, Cog, Truck, RefreshCw } from 'lucide-react';

// Visualization for STL Architecture
export const STLArchitectureVisual = () => (
    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h4 className="text-center font-bold text-slate-800 mb-6">STL 核心架构：三权分立</h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Container */}
            <div className="flex flex-col items-center p-4 bg-white border-2 border-indigo-100 rounded-xl shadow-sm w-32">
                <Box className="text-indigo-500 mb-2" size={32} />
                <span className="font-bold text-slate-700">容器</span>
                <span className="text-xs text-slate-500 text-center">Container</span>
                <span className="text-xs text-slate-400 mt-1">存数据的盒子</span>
            </div>

            {/* Iterator Connection */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-slate-400">
                    <span className="h-0.5 w-8 bg-slate-300"></span>
                    <ArrowRight size={16} />
                </div>
                <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-bold border border-amber-200 flex items-center gap-1">
                    <RefreshCw size={10} />
                    迭代器 Iterator
                </div>
                <div className="text-xs text-slate-400">粘合剂 / 桥梁</div>
                <div className="flex items-center text-slate-400">
                    <span className="h-0.5 w-8 bg-slate-300"></span>
                    <ArrowRight size={16} />
                </div>
            </div>

            {/* Algorithm */}
            <div className="flex flex-col items-center p-4 bg-white border-2 border-emerald-100 rounded-xl shadow-sm w-32">
                <Layers className="text-emerald-500 mb-2" size={32} />
                <span className="font-bold text-slate-700">算法</span>
                <span className="text-xs text-slate-500 text-center">Algorithm</span>
                <span className="text-xs text-slate-400 mt-1">处理数据的工具</span>
            </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-6 italic">
            算法不知道容器的存在，容器也不知道算法的存在，它们通过<b>迭代器</b>无缝合作。
        </p>
    </div>
);

// Factory Analogy Visual
export const FactoryVisual = () => (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center my-8 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 dashed-border">
        <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 w-full md:w-1/3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-600">
                <Factory size={24} />
            </div>
            <div className="font-bold text-slate-700">容器 (仓库)</div>
            <div className="text-xs text-slate-500 mt-1">负责存储原料</div>
            <div className="text-xs text-slate-400 bg-slate-50 mt-2 py-1 rounded">vector, list, map</div>
        </div>
        <div className="text-slate-300 hidden md:block">
            <ArrowRight size={24} />
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 w-full md:w-1/3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600">
                <Truck size={24} />
            </div>
            <div className="font-bold text-slate-700">迭代器 (传送带)</div>
            <div className="text-xs text-slate-500 mt-1">负责搬运元素</div>
            <div className="text-xs text-slate-400 bg-slate-50 mt-2 py-1 rounded">begin(), end()</div>
        </div>
        <div className="text-slate-300 hidden md:block">
            <ArrowRight size={24} />
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 w-full md:w-1/3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-600">
                <Cog size={24} />
            </div>
            <div className="font-bold text-slate-700">算法 (机器)</div>
            <div className="text-xs text-slate-500 mt-1">负责加工处理</div>
            <div className="text-xs text-slate-400 bg-slate-50 mt-2 py-1 rounded">sort, find, count</div>
        </div>
    </div>
);

// Pointer & Reference Visual
export const PointerReferenceVisual = () => (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 my-12 bg-slate-50 p-8 pt-12 rounded-xl border border-slate-200 overflow-visible">
        {/* Memory Cell x */}
        <div className="relative group">
            <div className="absolute -top-8 left-0 right-0 text-center text-xs text-slate-400 font-mono bg-slate-100 rounded px-1 py-0.5 mx-auto w-fit">0x100</div>
            <div className="w-24 h-24 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-3xl font-bold text-slate-700 shadow-sm relative">
                10
                {/* Reference Label */}
                <div className="absolute -right-8 -top-5 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full border border-emerald-200 transform rotate-12 shadow-sm z-10 whitespace-nowrap">
                    ref (别名)
                </div>
            </div>
            <div className="text-center mt-3 font-bold text-slate-600 font-mono">int x</div>
        </div>

        {/* Arrow for Pointer */}
        <div className="flex flex-col items-center text-indigo-400">
            <div className="text-[10px] mb-1 uppercase tracking-wider">Points To</div>
            <ArrowRight size={24} />
        </div>

        {/* Pointer p */}
        <div className="relative">
             <div className="absolute -top-8 left-0 right-0 text-center text-xs text-slate-400 font-mono bg-slate-100 rounded px-1 py-0.5 mx-auto w-fit">0x200</div>
             <div className="w-24 h-24 bg-indigo-50 border-2 border-indigo-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
                <span className="text-[10px] text-indigo-400 mb-1">存储的地址</span>
                <span className="font-mono text-sm font-bold text-indigo-700">0x100</span>
             </div>
             <div className="text-center mt-3 font-bold text-indigo-600 font-mono">int* p</div>
        </div>
    </div>
);

// Template Visual
export const TemplateVisual = () => (
    <div className="flex flex-col items-center my-6 p-6 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
        <div className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg mb-8 relative">
            <div className="text-sm font-mono">template&lt;T&gt; myMax(T a, T b)</div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800 rotate-45"></div>
            <div className="absolute -right-2 -top-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">模具</div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-16 w-full justify-center relative">
            {/* Connector Lines (CSS only for simplicity) */}
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-8 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl"></div>

            <div className="flex flex-col items-center relative z-10">
                <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded border border-blue-200 text-sm font-mono shadow-sm">
                    <div className="text-[10px] text-blue-400 mb-1">T = int</div>
                    myMax&lt;int&gt;(3, 5)
                </div>
            </div>
            <div className="flex flex-col items-center relative z-10">
                <div className="bg-orange-50 text-orange-800 px-4 py-3 rounded border border-orange-200 text-sm font-mono shadow-sm">
                    <div className="text-[10px] text-orange-400 mb-1">T = double</div>
                    myMax&lt;double&gt;(2.5, 3.1)
                </div>
            </div>
        </div>
        <div className="mt-6 text-xs text-slate-500 italic bg-white px-3 py-1 rounded-full border border-slate-100">
            编译器自动根据 T 生成了两份代码
        </div>
    </div>
);

// Auto Type Visual
export const AutoTypeVisual = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400">赋值</div>
            <div className="bg-slate-100 px-3 py-1 rounded text-slate-700 font-mono text-sm">10</div>
            <ArrowRight size={16} className="text-slate-300 rotate-90 md:rotate-0 my-1" />
            <div className="font-bold text-indigo-600">int</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400">赋值</div>
            <div className="bg-slate-100 px-3 py-1 rounded text-slate-700 font-mono text-sm">3.14</div>
            <ArrowRight size={16} className="text-slate-300 rotate-90 md:rotate-0 my-1" />
            <div className="font-bold text-indigo-600">double</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400">赋值</div>
            <div className="bg-slate-100 px-3 py-1 rounded text-slate-700 font-mono text-sm">nums.begin()</div>
            <ArrowRight size={16} className="text-slate-300 rotate-90 md:rotate-0 my-1" />
            <div className="font-bold text-indigo-600">iterator</div>
        </div>
    </div>
);
