import React from 'react';
import { Section } from '../../../types/index';
import { CodeBlock } from '../../../components/Common/CodeBlock';
import { ArrowRight } from 'lucide-react';
import { 
    ArrayVisual, 
    ArrayFillVisual, 
    ArraySizeVisual, 
    ArrayAccessVisual, 
    ArraySafetyVisual, 
    ArraySortVisual, 
    ArrayMultiDimVisual, 
    ArrayStackHeapVisual 
} from '../../../components/Visuals/STL/ContainerVisuals';

export const stlArraySections: Section[] = [
    {
        id: 'stl-array',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.1 std::array',
        title: '核心知识',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                {/* 1. Intro & Metaphor */}
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">一、原本的混乱世界 (为什么要升级？)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-800 mb-3 text-lg">🤕 故事引入：乐高灾难</h4>
                            <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                                想象一下，你的乐高积木没有任何盒子，全部散落在地板上。
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                                <li><strong>乱七八糟：</strong> 想找特定的一块很难。</li>
                                <li><strong>容易丢：</strong> 一不小心踢到床底下就找不到了（内存泄漏）。</li>
                                <li><strong>不仅乱，还危险：</strong> 闭着眼睛摸积木，结果摸到了地上的图钉！（越界访问）。</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                            <h4 className="font-bold text-red-800 mb-3 text-lg">🚫 原生数组的坏脾气</h4>
                            <p className="text-sm text-red-700 mb-2"><code>int a[5];</code> 就像乱糟糟的地面：</p>
                            <ul className="list-disc list-inside space-y-2 text-red-700 text-sm">
                                <li>它不知道自己有多大（没有 <code>.size()</code>）。</li>
                                <li>它不会保护你，哪怕你伸手伸到了邻居家（越界），它也不吭声。</li>
                            </ul>
                        </div>
                    </div>

                    <ArrayVisual />
                </div>

                {/* 2. Definition & Initialization */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">二、遇见超级收纳盒 (定义与初始化)</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        为了解决混乱，C++ 魔法师送给我们一个神器——<code>std::array</code>。
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-indigo-700 mb-2">1. 召唤咒语 (头文件)</h4>
                            <CodeBlock code={`#include <array>  // 👈 必须要带上这个魔法卷轴！
#include <iostream>
using namespace std;`} />
                        </div>

                        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-indigo-700 mb-2">2. 打造你的收纳盒</h4>
                            <p className="text-xs text-slate-500 mb-2">这个盒子一旦生产出来，格子的数量就不能变了（这是它和 vector 的区别）。</p>
                            <div className="p-2 bg-slate-100 rounded text-sm font-mono text-slate-600 mb-3">
                                std::array&lt;类型, 格子数量&gt; 名字;
                            </div>
                            <CodeBlock code={`// 打造一个有 3 个格子的盒子，专门放整数
std::array<int, 3> myBox = {10, 20, 30}; 

// 就像老式数组一样，用 {} 直接放入初始宝物`} />
                        </div>
                    </div>
                </div>

                {/* 3. Basic Member Functions */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">三、盒子上的魔法按钮 (基础功能)</h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1">
                                    <h4 className="font-bold text-blue-800 mb-2 text-lg">✨ .fill() 一键填充</h4>
                                    <p className="text-sm text-blue-700 mb-4">把所有格子清空，或者放一样的糖果。</p>
                                    <CodeBlock code={`scores.fill(100); 
// [100, 100, 100]`} />
                                </div>
                                <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                                    <ArrayFillVisual />
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1">
                                    <h4 className="font-bold text-indigo-800 mb-2 text-lg">📏 .size() 自动报数</h4>
                                    <p className="text-sm text-indigo-700 mb-4">盒子侧面的液晶屏，随时显示格子总数。</p>
                                    <CodeBlock code={`cout << scores.size();
// 输出：3`} />
                                </div>
                                <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                                    <ArraySizeVisual />
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-1">
                                    <h4 className="font-bold text-purple-800 mb-2 text-lg">🏁 .front() & .back()</h4>
                                    <p className="text-sm text-purple-700 mb-4">快速通道，直接通向头和尾。</p>
                                    <CodeBlock code={`cout << scores.front();
cout << scores.back();`} />
                                </div>
                                <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                                    <ArrayAccessVisual />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Safety: at() vs [] */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">四、安全卫士 (核心难点：at() vs [])</h3>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl mb-6">
                        <h4 className="font-bold text-amber-900 mb-2 text-lg">老师的口诀：</h4>
                        <p className="text-amber-800 font-medium text-lg">
                            "确定没错用中括号，怕出错一定要用 at！"
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <ArraySafetyVisual />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                                    <span className="text-xl">😵</span> 危险的盲操：[]
                                </h4>
                                <p className="text-sm text-slate-600 mb-3">就像闭着眼睛把手伸进盒子里。越界了也不会告诉你，只会让程序悄悄崩溃。</p>
                                <CodeBlock code={`// ❌ 危险动作！
cout << box[100];  
// 结果：程序可能输出奇怪的数字，或者直接闪退。`} />
                            </div>
                            <div>
                                <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                                    <span className="text-xl">🛡️</span> 智能机械手：.at()
                                </h4>
                                <p className="text-sm text-slate-600 mb-3">带有红外线感应。如果越界，机械臂会立刻发出警报（抛出异常）。</p>
                                <CodeBlock code={`// ✅ 安全动作！
try {
    cout << box.at(100);
} catch (...) {
    cout << "报警啦！越界了！";
}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Iterators & Algorithms */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">五、通用的魔法接口 (迭代器初探)</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        配合 <code>std::sort</code> 等算法，需要告诉裁判“从哪开始”到“从哪结束”。
                    </p>
                    
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4 text-sm font-mono">
                                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">.begin()</span>
                                    <ArrowRight size={16} className="text-slate-300" />
                                    <span className="text-slate-500">跑道起点</span>
                                </div>
                                <div className="flex items-center gap-4 mb-4 text-sm font-mono">
                                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">.end()</span>
                                    <ArrowRight size={16} className="text-slate-300" />
                                    <span className="text-slate-500">跑道终点线外面一点点</span>
                                </div>
                                <CodeBlock code={`#include <algorithm> // 引入算法魔法书

std::array<int, 5> messyBox = {5, 2, 8, 1, 9};

// 呼叫排序裁判 sort
std::sort(messyBox.begin(), messyBox.end());

// 现在的 messyBox 变成了：[1, 2, 5, 8, 9]`} />
                            </div>
                            <div className="flex-shrink-0">
                                <ArraySortVisual />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Advanced Concepts */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">六、进阶知识 (Pro Tips)</h3>
                    
                    {/* Multidimensional Arrays */}
                    <div className="mb-8">
                        <h4 className="font-bold text-indigo-700 mb-3 text-lg">1. 套娃魔法：多维数组</h4>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <p className="text-slate-600 text-sm mb-4">
                                    怎么表示一个 3x3 的棋盘？用 <code>array</code> 套 <code>array</code>！
                                </p>
                                <CodeBlock code={`// 定义一个 3行 3列 的二维数组
std::array<std::array<int, 3>, 3> matrix = {{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
}};

// 访问中间那个数 (5)
cout << matrix[1][1];`} />
                            </div>
                            <ArrayMultiDimVisual />
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="mb-8">
                        <h4 className="font-bold text-indigo-700 mb-3 text-lg">2. 自动比较功能</h4>
                        <p className="text-slate-600 text-sm mb-4">
                            原生数组不能直接比大小（比较的是地址），但 <code>std::array</code> 可以！
                        </p>
                        <CodeBlock code={`std::array<int, 3> a = {1, 2, 3};
std::array<int, 3> b = {1, 2, 3};
std::array<int, 3> c = {4, 5, 6};

if (a == b) cout << "a 和 b 一样！"; // ✅ 输出
if (c > a)  cout << "c 比 a 大！";   // ✅ 输出`} />
                    </div>

                    {/* Performance: Stack vs Heap */}
                    <div className="mb-8">
                         <h4 className="font-bold text-orange-800 mb-3 text-lg">⚡ 性能大揭秘：栈 vs 堆</h4>
                         <ArrayStackHeapVisual />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                             <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-sm text-orange-800">
                                 <ul className="list-disc list-inside space-y-2">
                                     <li><strong>std::array</strong>：住在<strong>栈 (Stack)</strong> 上。分配速度极快。</li>
                                     <li><strong>std::vector</strong>：住在<strong>堆 (Heap)</strong> 上。空间巨大。</li>
                                 </ul>
                                 <div className="mt-2 text-xs bg-white p-2 rounded border border-orange-100">
                                      结论：小且固定 -&gt; array；大或可变 -&gt; vector。
                                  </div>
                             </div>
                             <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm text-red-800">
                                 <h5 className="font-bold mb-1">⚠️ 传参陷阱：拒绝拷贝</h5>
                                 <p className="mb-2"><code>std::array</code> 是对象，传参会<strong>拷贝</strong>！</p>
                                 <CodeBlock code={`// ✅ 推荐：const 引用
void good(const std::array<int, 1000>& a);`} />
                             </div>
                         </div>
                    </div>
                </div>

                {/* 7. Summary & Cheat Sheet */}
                <div className="border-t border-slate-200 pt-8 mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">七、总结 & 速查表</h3>
                    
                    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm mb-6">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3">功能 / 场景</th>
                                    <th className="px-6 py-3">代码示例</th>
                                    <th className="px-6 py-3">关键点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">定义</td>
                                    <td className="px-6 py-4 font-mono">std::array&lt;int, 5&gt; a;</td>
                                    <td className="px-6 py-4">大小固定，不可变</td>
                                </tr>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">获取大小</td>
                                    <td className="px-6 py-4 font-mono">a.size()</td>
                                    <td className="px-6 py-4">编译期常量</td>
                                </tr>
                                <tr className="bg-white border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">安全访问</td>
                                    <td className="px-6 py-4 font-mono">a.at(i)</td>
                                    <td className="px-6 py-4 text-green-600">✅ 越界会抛异常</td>
                                </tr>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">普通访问</td>
                                    <td className="px-6 py-4 font-mono">a[i]</td>
                                    <td className="px-6 py-4 text-red-500">❌ 越界不报错 (快但不安全)</td>
                                </tr>
                                <tr className="bg-white border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">填充</td>
                                    <td className="px-6 py-4 font-mono">a.fill(100)</td>
                                    <td className="px-6 py-4">全部设为同一个值</td>
                                </tr>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <td className="px-6 py-4 font-bold text-indigo-700">排序</td>
                                    <td className="px-6 py-4 font-mono">sort(a.begin(), a.end())</td>
                                    <td className="px-6 py-4">完美支持 STL 算法</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-6 py-4 font-bold text-indigo-700">传参</td>
                                    <td className="px-6 py-4 font-mono">void f(const array&lt;int,5&gt;& a)</td>
                                    <td className="px-6 py-4">一定要用<strong>引用</strong>避免拷贝！</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-indigo-900 text-indigo-100 p-5 rounded-xl shadow-lg">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <span>🧠</span> 核心记忆法：
                        </h4>
                        <p className="leading-relaxed opacity-90">
                            把 <code>std::array</code> 想象成一个<strong>“穿了防弹衣的原生数组”</strong>。
                            它保留了数组的高性能（栈内存、无额外开销），但加上了现代 C++ 的安全护盾（size、at）和通用接口（迭代器）。
                            <br/><br/>
                            <strong>什么时候用？</strong> 只要你知道数组大小固定（比如一周7天、RGB三原色），就永远优先用 <code>std::array</code> 代替 <code>int a[]</code>。
                        </p>
                    </div>
                </div>

                {/* 8. Challenge */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">🎮 终极挑战：制作“智能成绩单”</h3>
                    <p className="text-slate-600 text-sm mb-4">把今天学到的所有魔法组合起来！</p>
                    
                    <CodeBlock code={`#include <iostream>
#include <array>
#include <algorithm> // sort
using namespace std;

int main() {
    // 1. 创建
    array<int, 5> scores = {85, 92, 76, 59, 100};

    // 2. 修改：把 59 改成 60
    scores.at(3) = 60; 

    // 3. 排序
    sort(scores.begin(), scores.end());

    // 4. 展示
    cout << "最低分：" << scores.front() << endl; 
    cout << "最高分：" << scores.back() << endl;  

    // 5. 遍历
    cout << "所有分数：";
    for(int s : scores) {
        cout << s << " ";
    }
    cout << endl;

    // 6. 安全测试
    try {
        int err = scores.at(9); // 故意越界
    } catch (const out_of_range& e) {
        cout << "🔴 警报！越界啦！" << endl;
    }

    return 0;
}`} />
                </div>
            </div>
        )
    },
    {
        id: 'stl-array-ex1',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.1 std::array',
        title: '练习一：钢铁侠的能量腰带',
        type: 'exercise',
        exerciseData: {
            title: '钢铁侠的能量腰带 (基础篇)',
            description: '1. 定义一个能放 5 个整数的 std::array (energy)。\n2. 使用 .fill() 将所有电量设为 100。\n3. 使用 .back() 将最后一个电池电量耗尽改为 0。\n4. 输出总电池数 (.size()) 和第一个电池电量 (.front())。',
            initialCode: `#include <iostream>
#include <array>
using namespace std;

int main() {
    cout << "=== 钢铁侠战甲启动程序 ===" << endl;

    // 1. 定义：5个格子的能量腰带 (energy)
    // TODO
    
    // 2. 充能：全部充满 100%
    // TODO

    cout << "能量填充完毕！当前所有电池电量均为 100%。" << endl;

    // 3. 战斗：最后一个电池耗尽 (设为 0)
    // TODO

    cout << "警告：激光炮发射，最后一节电池已耗尽！" << endl;

    // 4. 汇报状态
    cout << "-----------------------" << endl;
    // TODO: 输出 size(), front(), back()

    return 0;
}`,
            hints: ["array<int, 5> energy;", "energy.fill(100);", "energy.back() = 0;", "energy.size()", "energy.front()"],
            solutionCode: `#include <iostream>
#include <array>
using namespace std;

int main() {
    cout << "=== 钢铁侠战甲启动程序 ===" << endl;

    // 1. 定义：5个格子的能量腰带
    array<int, 5> energy;

    // 2. 充能：全部充满 100%
    energy.fill(100);
    cout << "能量填充完毕！当前所有电池电量均为 100%。" << endl;

    // 3. 战斗：最后一个电池耗尽
    energy.back() = 0; 
    cout << "警告：激光炮发射，最后一节电池已耗尽！" << endl;

    // 4. 汇报状态
    cout << "-----------------------" << endl;
    cout << "电池总数量: " << energy.size() << " 个" << endl;
    cout << "第一节电池电量: " << energy.front() << "%" << endl;
    cout << "最后一节电池电量: " << energy.back() << "%" << endl;

    return 0;
}`
        }
    },
    {
        id: 'stl-array-ex2',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.1 std::array',
        title: '练习二：神秘的宝箱猎人',
        type: 'exercise',
        exerciseData: {
            title: '神秘的宝箱猎人 (进阶与安全篇)',
            description: '1. 创建一个 array<int, 4>，初始金币为 {10, 50, 100, 500}。\n2. 让用户输入 0-3 的编号。\n3. 使用 .at() 安全打开宝箱。\n4. 体验 try-catch 捕获越界错误。',
            initialCode: `#include <iostream>
#include <array>
#include <stdexcept> // 为了捕获异常
using namespace std;

int main() {
    // 1. 布置宝箱: {10, 50, 100, 500}
    array<int, 4> chests = {10, 50, 100, 500};

    int choice;
    cout << "=== 宝箱猎人 ===" << endl;
    cout << "请输入你想打开的宝箱编号 (0-3): ";
    cin >> choice;

    // 2. 安全开箱环节
    try {
        // TODO: 使用 .at(choice) 获取金币
        // cout << "恭喜！你获得了 " ...
    } 
    catch (const out_of_range& e) {
        // 3. 触发陷阱
        cout << "❌ 警报！你选的编号不存在，触发了陷阱！" << endl;
    }

    return 0;
}`,
            hints: ["chests.at(choice)", "catch (const out_of_range& e)"],
            solutionCode: `#include <iostream>
#include <array>
#include <stdexcept> 
using namespace std;

int main() {
    // 1. 布置宝箱
    array<int, 4> chests = {10, 50, 100, 500};

    int choice;
    cout << "=== 宝箱猎人 ===" << endl;
    cout << "面前有 " << chests.size() << " 个宝箱 (编号 0-3)。" << endl;
    cout << "请输入你想打开的宝箱编号: ";
    cin >> choice;

    // 2. 安全开箱环节
    try {
        int gold = chests.at(choice); 
        cout << "恭喜！你获得了 " << gold << " 枚金币！" << endl;
    } 
    catch (const out_of_range& e) {
        cout << "❌ 警报！你选的编号不存在，触发了陷阱！" << endl;
        cout << "安全系统提示: " << e.what() << endl;
    }

    return 0;
}`
        }
    }
];