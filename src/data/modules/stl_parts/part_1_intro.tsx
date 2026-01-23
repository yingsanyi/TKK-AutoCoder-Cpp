import React from 'react';
import { Section } from '../../../types/index';
import { STLArchitectureVisual } from '../../../components/Visuals/STL/IntroVisuals';

export const stlIntroSection: Section = {
    id: 'stl-intro',
    category: 'C++ STL (标准模板库)',
    title: '1. STL 概览与学习路线',
    type: 'lesson',
    content: (
        <div className="space-y-10">
            {/* 1. What & Why */}
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">一、STL 是什么？为什么要学？</h3>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-indigo-900 mb-2 text-lg">STL 的起源与必备 & 核心思想</h4>
                    <ul className="list-disc list-inside space-y-2 text-indigo-800 text-sm">
                        <li><strong>全名：</strong> Standard Template Library（标准模板库）。</li>
                        <li><strong>设计者：</strong> Alexander Stepanov 等人，后纳入 C++ 标准。</li>
                        <li><strong>一句话概括：</strong> 一套现成的、经过多年优化和验证的“数据结构 + 算法工具箱”。</li>
                    </ul>
                </div>

                <STLArchitectureVisual />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border border-slate-200 p-4 rounded-lg bg-white shadow-sm">
                        <h5 className="font-bold text-slate-800 mb-2 border-b pb-2">四大核心组件</h5>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li>📦 <strong>容器 (Containers)</strong><br/>保存数据的通用“盒子”（如 vector 动态数组、map 字典）。</li>
                            <li>🛠️ <strong>算法 (Algorithms)</strong><br/>做操作的“工具”（如排序、查找、统计）。</li>
                            <li>🔗 <strong>迭代器 (Iterators)</strong><br/>连接容器和算法的“指针加强版”。</li>
                            <li>⚡ <strong>函数对象 / Lambda</strong><br/>可以像变量一样传来传去的“可调用东西”。</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-lg bg-white shadow-sm flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white">
                        <h5 className="font-bold text-slate-800 mb-2">为什么要学？</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            ❌ <strong>手写链表/排序：</strong> 容易写错指针，容易内存泄漏，效率不一定高。<br/><br/>
                            ✅ <strong>使用 STL：</strong> 
                            <span className="block mt-1 font-semibold text-green-700">std::list + std::sort</span>
                            <span className="block mt-1">代码少、Bug 少、性能通常是最优的。</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Roadmap */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">二、整体学习路线概览 (推荐顺序)</h3>
                
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">0</div>
                            <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-slate-800">预备知识</h4>
                            <p className="text-sm text-slate-600 mt-1">
                                引用、指针、const、模板基础、C++11 新特性 (auto, nullptr, range-for)。
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
                            <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-indigo-700">第一阶段：必须掌握 (生存必备)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div className="bg-white border border-slate-200 p-3 rounded text-sm">
                                    <span className="font-bold block mb-1">📦 容器</span>
                                    vector, string, array, pair
                                </div>
                                <div className="bg-white border border-slate-200 p-3 rounded text-sm">
                                    <span className="font-bold block mb-1">🛠️ 算法</span>
                                    sort, reverse, min/max_element, find
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                            <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-blue-700">第二阶段：常用顺序/关联容器</h4>
                            <p className="text-sm text-slate-600 mt-1 mb-2">掌握这些，可以应付 90% 的业务逻辑。</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">deque</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">list</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">map</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">set</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs">unordered_map</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">3</div>
                            <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-purple-700">第三阶段：适配器与技巧</h4>
                            <p className="text-sm text-slate-600 mt-1">
                                stack (栈), queue (队列), priority_queue (优先队列), Lambda 表达式。
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">4</div>
                        </div>
                        <div>
                            <h4 className="font-bold text-emerald-700">第四阶段：进阶思想</h4>
                            <p className="text-sm text-slate-600 mt-1">
                                二分算法 (lower_bound), 修改类算法 (remove/unique), 复杂度意识。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Knowledge Checklist (Collapsed/Table view) */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">三、知识点速览清单</h3>
                <p className="text-slate-500 text-sm mb-4">
                    这是一个“字典级”的大纲，方便你快速检索自己是否掌握了某个模块。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">1. 基础与总览</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li>STL 六大组件 (容器, 算法, 迭代器...)</li>
                            <li>基础语法 (模板, auto, nullptr, 引用)</li>
                            <li>Lambda 表达式基础</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">2. 顺序容器</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li><strong>vector (动态数组) - 重点</strong></li>
                            <li>array (固定数组)</li>
                            <li>deque (双端队列)</li>
                            <li>list (双向链表)</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">3. 关联容器 (有序)</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li>set / multiset (集合)</li>
                            <li>map / multimap (字典/映射)</li>
                            <li>底层原理：红黑树 (O(log n))</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">4. 无序容器 (哈希)</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li>unordered_set / map</li>
                            <li>底层原理：哈希表 (O(1))</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">5. 容器适配器</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li>stack (栈)</li>
                            <li>queue (队列)</li>
                            <li>priority_queue (优先队列)</li>
                        </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-2">6. 常用算法</h5>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 text-xs">
                            <li>排序 (sort) 与 二分 (lower_bound)</li>
                            <li>查找 (find) 与 统计 (count)</li>
                            <li>最值 (min/max_element)</li>
                            <li>数值计算 (accumulate)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};