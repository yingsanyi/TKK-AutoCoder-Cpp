import React from 'react';
import { Section } from '../../../types/index';
import { CodeBlock } from '../../../components/Common/CodeBlock';
import { 
    FactoryVisual, 
    PointerReferenceVisual, 
    TemplateVisual 
} from '../../../components/Visuals/STL/IntroVisuals';

export const stlFundamentalsSection: Section = {
    id: 'stl-fundamentals',
    category: 'C++ STL (标准模板库)',
    group: '2. 预备知识',
    title: '2.1 课程核心内容',
    type: 'lesson',
    content: (
        <div className="space-y-10">
            {/* 1. STL Origins & Core Concepts */}
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">一、STL 的起源 & 核心思想（用故事来理解）</h3>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-indigo-900 mb-2">1. STL 是怎么来的？</h4>
                    <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                        你可以把 C++ 想象成一个<strong>“语言 + 标准库”</strong>的组合：
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-indigo-800 text-sm mb-4">
                        <li><strong>语言：</strong> 变量、if、for、函数、指针……</li>
                        <li><strong>标准库：</strong> 别人帮你写好的各种工具，比如输入输出（cout）、数学库（sqrt）、以及 STL。</li>
                    </ul>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                        STL（Standard Template Library）主要解决的问题是：大家写 C++ 时，经常要用到「数组、链表、排序、查找、统计」这些东西。
                        一直重复写又麻烦、容易写错，而且性能也不一定好。
                        于是，程序员们（代表人物 Alexander Stepanov）搞了一套「通用的」数据结构和算法，不管你放的是 int 还是 double，都能用同一套代码。
                    </p>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-slate-800 mb-2">2. STL 的三个关键角色：容器 + 算法 + 迭代器</h4>
                    <p className="text-sm text-slate-600 mb-4">先用一个“工厂”的比喻：</p>
                    <FactoryVisual />
                </div>
                
                <div className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm text-sm text-slate-600">
                    <p className="mb-2 font-bold text-emerald-700">关键思想：算法和容器解耦</p>
                    <p>
                        排序函数不需要知道你用的是「数组」还是「链表」。
                        只要你提供“从这里到那里”的一段序列（两个迭代器），我就能帮你排序。
                        这样一来，同一套 <code>sort</code> 代码，就可以给不同容器用。
                    </p>
                </div>
            </div>

            {/* 2. Prerequisite Review 1: Pointer, Reference, const */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">二、预备知识复习（一）：指针、引用、const</h3>
                <p className="text-slate-600 text-sm mb-6">这些是写 C++ 稍微复杂一点代码（包括 STL）都会用到的，所以先复习一遍。</p>
                
                <PointerReferenceVisual />

                <div className="space-y-6">
                    {/* Pointer */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <h4 className="font-bold text-slate-800 mb-2">1. 指针：存“地址”的变量</h4>
                        <p className="text-xs text-slate-500 mb-2">记住：“变量在内存里有个门牌号（地址）”。</p>
                        <CodeBlock code={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* p = &x;   // p 里装的是 x 的地址

    cout << "x = " << x << "\\n";
    cout << "*p = " << *p << "\\n";

    *p = 20;       // 通过指针修改 x
    cout << "x = " << x << "\\n"; // 变成 20

    return 0;
}`} />
                        <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
                            <strong>符号要点：</strong><br/>
                            <code>&x</code>：取变量 x 的地址。<br/>
                            <code>int* p</code>：p 是“指向 int 的指针”。<br/>
                            <code>*p</code>：通过指针访问它指向的那个变量。
                        </div>
                    </div>

                    {/* Reference */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <h4 className="font-bold text-slate-800 mb-2">2. 引用：变量的“别名”</h4>
                        <p className="text-xs text-slate-500 mb-2">给 x 又起了一个新名字 ref，它们指向的是同一个值。</p>
                        <CodeBlock code={`int x = 10;
int& ref = x;   // ref 是 x 的别名
ref = 20;       // 改 ref，其实就是改 x

// 函数传参常用：
void addOne(int& x) { // x 是实参的引用
    x = x + 1;
}
int a = 5;
addOne(a);      // a 被改成了 6`} />
                    </div>

                    {/* const */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <h4 className="font-bold text-slate-800 mb-2">3. const：只读的“承诺”</h4>
                        <p className="text-xs text-slate-500 mb-2">告诉编译器和阅读代码的人：这个东西不能被改。</p>
                        <CodeBlock code={`// 1) 普通变量
const int x = 10;
// x = 20; // ❌ 报错

// 2) 函数参数 (最常用)
// const int a[] 表示：在函数里只是“读取”数组，不会改里面的元素。
void printArray(const int a[], int n) {
    for (int i = 0; i < n; ++i) cout << a[i] << " ";
}

// 3) 常用模式：按引用传递但不修改
void print(const string& s);`} />
                    </div>
                </div>
            </div>

            {/* 3. Prerequisite Review 2: Function Templates */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">三、预备知识复习（二）：函数模板</h3>
                <p className="text-slate-600 text-sm mb-4">STL 里大量使用“模板函数”。我们先只学函数模板，不碰类。</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-2">😣 以前的痛点</h4>
                        <p className="text-xs text-slate-500 mb-2">如果要比较 int, double, long long... 得写好几个函数。</p>
                        <CodeBlock code={`int myMax(int a, int b) { ... }
double myMax(double a, double b) { ... }
// ... 重复劳动`} />
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <h4 className="font-bold text-emerald-800 mb-2">😎 用模板解决</h4>
                        <p className="text-xs text-emerald-600 mb-2">写一遍代码，多种类型复用。</p>
                        <CodeBlock code={`template<typename T>
T myMax(T a, T b) {
    return a > b ? a : b;
}

// 自动推导 T
cout << myMax(3, 5);      // T=int
cout << myMax(2.5, 3.1);  // T=double`} />
                    </div>
                </div>
                
                <TemplateVisual />
            </div>

            {/* 4. C++11 New Syntax */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">四、新知识点：auto、范围 for 循环、nullptr、using</h3>
                <p className="text-slate-600 text-sm mb-6">这 4 个是 C++11 新增、又和 STL 非常搭配的语法。</p>

                <div className="space-y-12">
                    {/* auto */}
                    <div>
                        <h4 className="font-bold text-indigo-700 mb-4 text-lg">1. auto：让编译器帮你写类型</h4>
                        {/* Visual Animation for Auto */}
                        <div className="mb-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                               {/* Left: Programmer writing code */}
                               <div className="text-center">
                                   <div className="text-sm text-slate-500 mb-2">你写的代码</div>
                                   <div className="bg-white p-3 border-2 border-indigo-200 rounded-lg shadow-sm font-mono text-sm">
                                       <span className="text-purple-600">auto</span> x = <span className="text-orange-600">3.14</span>;
                                   </div>
                               </div>
                               
                               {/* Arrow Animation */}
                               <div className="flex flex-col items-center">
                                   <span className="text-xs text-slate-400 mb-1">编译器推导</span>
                                   <div className="w-12 h-0.5 bg-slate-300 relative">
                                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45"></div>
                                   </div>
                               </div>

                               {/* Right: Compiler sees */}
                               <div className="text-center">
                                   <div className="text-sm text-slate-500 mb-2">编译器看到的</div>
                                   <div className="bg-slate-800 text-white p-3 border-2 border-slate-700 rounded-lg shadow-sm font-mono text-sm relative overflow-hidden group">
                                       <span className="text-yellow-400">double</span> x = 3.14;
                                       <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                   </div>
                               </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <CodeBlock code={`// 1. 基础类型推导
auto x = 10;        // x 是 int
auto y = 3.14;      // y 是 double
auto z = 'A';       // z 是 char
auto s = "Hello";   // s 是 const char*

// 2. 迭代器类型（最常用！）
// 原本要写：std::vector<int>::iterator it = nums.begin(); 
auto it = nums.begin(); // ✅ 极其清爽`} />
                            </div>
                            <div className="flex-1 bg-amber-50 p-5 rounded-xl border border-amber-100 text-sm">
                                <p className="font-bold text-amber-800 mb-3 text-base">⚠️ 关键细节：引用与 const</p>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex gap-2">
                                        <span className="font-mono bg-white px-1 rounded border border-amber-200 text-amber-700">auto</span>
                                        <span><strong>按值拷贝</strong>：会复制一份新的变量。修改新变量不影响原变量。</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-mono bg-white px-1 rounded border border-amber-200 text-amber-700">auto&</span>
                                        <span><strong>引用</strong>：给原变量起别名。修改它 = 修改原变量。</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-mono bg-white px-1 rounded border border-amber-200 text-amber-700">const auto&</span>
                                        <span><strong>只读引用</strong>：效率最高（无拷贝），且安全（不可修改）。</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* range-based for */}
                    <div>
                        <h4 className="font-bold text-indigo-700 mb-4 text-lg">2. 范围 for 循环 (Range-based for)</h4>
                        <p className="text-slate-600 mb-4">C++11 最受欢迎的语法糖，用来遍历“任何原本能遍历的东西”（数组、容器等）。</p>
                        
                        {/* Visual Comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl">
                                <div className="text-xs font-bold text-red-400 uppercase mb-2">Old School (传统写法)</div>
                                <div className="font-mono text-sm text-slate-600 bg-white p-3 rounded border border-red-100">
                                    for (int i = 0; i &lt; nums.size(); ++i) <br/>
                                    &nbsp;&nbsp; cout &lt;&lt; nums[i];
                                </div>
                                <p className="text-xs text-red-400 mt-2">❌ 容易写错下标，容易越界，代码啰嗦</p>
                            </div>
                            <div className="p-4 bg-green-50/50 border border-green-100 rounded-xl">
                                <div className="text-xs font-bold text-green-500 uppercase mb-2">Modern C++ (推荐写法)</div>
                                <div className="font-mono text-sm text-slate-600 bg-white p-3 rounded border border-green-100">
                                    for (int x : nums) <br/>
                                    &nbsp;&nbsp; cout &lt;&lt; x;
                                </div>
                                <p className="text-xs text-green-600 mt-2">✅ 语义清晰：“对于 nums 里的每个 x...”</p>
                            </div>
                        </div>

                        <CodeBlock code={`int a[] = {1, 2, 3, 4, 5};
vector<int> v = {10, 20, 30};
string s = "Hello";

// 1. 遍历数组
for (int x : a) cout << x << " "; 

// 2. 遍历容器 (vector)
for (auto x : v) cout << x << " ";

// 3. 遍历字符串 (char)
for (char c : s) cout << c << "-"; // H-e-l-l-o-

// 4.【重点】修改元素（必须用引用）
for (auto& x : v) {
    x *= 2; // 原容器 v 里的元素真的变了
}

// 5.【重点】只读遍历（避免大对象拷贝）
for (const auto& x : v) {
    // x = 100; // ❌ 编译报错，不能修改
    cout << x;
}`} />
                    </div>

                    {/* nullptr & using */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">3</span>
                                nullptr
                            </h4>
                            <p className="text-sm text-slate-600 mb-4">
                                <strong>空指针专用关键字</strong>。用来彻底取代 <code>NULL</code>。
                            </p>
                            <div className="bg-slate-50 p-3 rounded border border-slate-100 mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-red-500 line-through">NULL</span>
                                    <span className="text-slate-400">本质是 0 (整数)</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-green-600">nullptr</span>
                                    <span className="text-green-700">专门的空指针类型</span>
                                </div>
                            </div>
                            <CodeBlock code={`int* p = nullptr; // ✅ 推荐
if (p == nullptr) { 
    // 安全判断
}`} />
                        </div>
                        
                        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">4</span>
                                using
                            </h4>
                            <p className="text-sm text-slate-600 mb-4">
                                <strong>类型别名</strong>。比 <code>typedef</code> 更直观，像赋值一样。
                            </p>
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 opacity-75">
                                    <span>typedef long long ll;</span>
                                    <span className="text-red-400">← 旧写法</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-mono text-slate-800 font-bold">
                                    <span>using ll = long long;</span>
                                    <span className="text-green-500">← 新写法</span>
                                </div>
                            </div>
                            <CodeBlock code={`// 定义别名
using ll = long long;
using MapType = map<string, int>;

ll a = 1000000000;`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Comprehensive Exercise */}
            <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">五、综合实战：把今天所有点串起来</h3>
                <div className="mb-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-sm text-slate-700">
                    <p className="font-bold mb-2">📚 需求：</p>
                    <ol className="list-decimal list-inside space-y-1 ml-1 text-slate-600">
                        <li>不停输入整数，直到输入 0 为止（0 不参与后续计算）。</li>
                        <li>用普通数组暂存（例如最多 100 个数），先不用 STL 容器。</li>
                        <li>统计：一共输入了多少个数、它们的总和、其中的最大值。</li>
                        <li>再把数组里的每个数乘 2，输出新的数组。</li>
                        <li>在中间演示一次 <code>nullptr</code> 的用法。</li>
                    </ol>
                    <p className="font-bold mt-3 mb-1">🛠️ 技术要求：</p>
                    <p className="text-slate-500">大量使用：<code>auto</code>，<code>range-based for</code>，<code>using</code>，<code>const 引用</code>。</p>
                </div>

                <div className="bg-slate-900 rounded-xl p-1 shadow-lg">
                    <div className="bg-slate-800 text-slate-300 px-4 py-2 text-xs font-mono rounded-t-lg flex justify-between">
                        <span>main.cpp</span>
                        <span>综合示例</span>
                    </div>
                    <CodeBlock code={`#include <iostream>
using namespace std;

// 类型别名：ll 代表 long long
using ll = long long;

// 打印数组（只读）：用 const 引用防止修改
void printArray(const int a[], int n) {
    cout << "Array: ";
    // 用普通 for
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
    }
    cout << "\\n";
}

// 计算和与最大值
void calcSumAndMax(const int a[], int n, ll& sum, int& mx) {
    sum = 0;
    mx = a[0];

    // 用 range-based for + auto 访问数组
    for (int i = 0; i < n; ++i) {
        auto x = a[i]; // auto 推导为 int
        sum += x;
        if (x > mx) mx = x;
    }
}

int main() {
    int a[100];
    int n = 0;

    cout << "输入若干整数，以 0 结束（0 不算在内）:\\n";
    while (true) {
        int x;
        cin >> x;
        if (x == 0) break;
        if (n < 100) {
            a[n++] = x;
        }
    }

    if (n == 0) {
        cout << "你没有输入任何非零数字。\\n";
        return 0;
    }

    printArray(a, n);

    ll sum;
    int mx;
    calcSumAndMax(a, n, sum, mx);
    cout << "Count = " << n << "\\n";
    cout << "Sum = " << sum << "\\n";
    cout << "Max = " << mx << "\\n";

    // 用 range-based for 的形式修改数组（这里我们用普通 for + 引用来模拟）
    for (int i = 0; i < n; ++i) {
        a[i] *= 2;
    }

    cout << "乘以 2 之后：\\n";
    printArray(a, n);

    // nullptr 演示
    int* p = nullptr;      // p 目前不指向任何有效 int
    if (p == nullptr) {
        cout << "指针 p 目前是空指针（nullptr）。\\n";
    }

    // 把 p 指向数组的第一个元素
    p = &a[0];
    cout << "p 指向了数组第一个元素，*p = " << *p << "\\n";

    return 0;
}`} />
                </div>

                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
                    <p className="font-bold mb-2">💡 代码复盘：你已经用上了</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><code>using ll = long long;</code>：类型别名，让代码更简洁。</li>
                        <li><code>const int a[]</code>：只读数组参数，安全且清晰。</li>
                        <li><code>ll& sum, int& mx</code>：引用参数，实现函数“多返回值”。</li>
                        <li><code>auto x = a[i];</code>：自动类型推导，少写代码。</li>
                        <li><code>nullptr</code>：现代 C++ 安全空指针的标准写法。</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};