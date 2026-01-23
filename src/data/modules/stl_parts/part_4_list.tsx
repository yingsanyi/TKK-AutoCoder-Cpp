import React from 'react';
import { Section } from '../../../types/index';
import { CodeBlock } from '../../../components/Common/CodeBlock';
import { AlertTriangle, RefreshCw, ArrowRight } from 'lucide-react';
import { 
    ListStructureVisual, 
    ListOperationVisual, 
    ListInsertVisual, 
    ListSpliceVisual, 
    ListMagicVisual,
    JosephusVisual
} from '../../../components/Visuals/STL/ContainerVisuals';

export const stlListSections: Section[] = [
    {
        id: 'stl-list',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.4 std::list (双向链表)',
        title: '核心知识',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                {/* 1. What is list */}
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">一、什么是 list？(排队 vs 寻宝)</h3>
                    <ListStructureVisual />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-indigo-700 mb-2">vector (数组)</h4>
                            <p className="text-sm text-slate-600">就像大家排队做操。紧挨着，知道第3个是谁。缺点是有人插队时，后面所有人都得往后退。</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-emerald-700 mb-2">list (链表)</h4>
                            <p className="text-sm text-slate-600">就像寻宝游戏。大家分散在各地，每个人手里有张纸条写着“下一个人在哪”。插入删除很方便，只要改纸条。</p>
                        </div>
                    </div>
                    
                    {/* Structure Characteristics */}
                    <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-6">
                        <h4 className="font-bold text-amber-900 mb-4 text-lg">2. 结构特点 (核心性质)</h4>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 text-amber-600"><AlertTriangle size={20} /></div>
                                <div>
                                    <strong className="text-amber-800">非连续存储</strong>
                                    <p className="text-sm text-amber-700 mt-1">就像寻宝点散落在校园各处，内存地址是不连续的。这也是它不支持随机访问的原因。</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 text-amber-600"><RefreshCw size={20} /></div>
                                <div>
                                    <strong className="text-amber-800">双向迭代器</strong>
                                    <p className="text-sm text-amber-700 mt-1">我们可以从头走到尾，也可以从尾走到头 (<code>++</code> 和 <code>--</code> 都可以)。</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 text-amber-600"><ArrowRight size={20} /></div>
                                <div>
                                    <strong className="text-amber-800">不支持随机访问</strong>
                                    <p className="text-sm text-amber-700 mt-1">
                                        想要找到第10个寻宝点，不能直接“传送” (<code>l[9]</code> ❌)，必须顺着线索一个一个找过去。
                                    </p>
                                    <div className="mt-2 bg-white/80 p-3 rounded border border-amber-200">
                                        <CodeBlock code={`list<int> l = {1, 2, 3};
// l[1]; // ❌ 报错！不支持下标访问
// auto it = l.begin() + 2; // ❌ 报错！不支持随机跳跃

auto it = l.begin();
it++; it++; // ✅ 只能一步步走`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Basic Operations */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">二、基本操作 (贪吃蛇)</h3>
                    <div className="space-y-6">
                         <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2">1. 创建与增删</h4>
                            <ListOperationVisual />
                            <CodeBlock code={`#include <list>
list<int> snake = {1, 2, 3};

snake.push_front(0); // 头长: 0, 1, 2, 3
snake.push_back(4);  // 尾长: 0, 1, 2, 3, 4

snake.pop_front();   // 头断
snake.pop_back();    // 尾断`} />
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2">2. 中间插入 (重点)</h4>
                            <p className="text-xs text-slate-500 mb-2">插入和删除都不会移动其他元素，只修改指针。</p>
                            <ListInsertVisual />
                            <CodeBlock code={`// 找到要插入的位置（比如要在开头之后插入）
list<int>::iterator it = snake.begin();
it++; // 移动到第2个位置

// 在 it 指向的位置 *之前* 插入 99
snake.insert(it, 99); 

// 删除 it 指向的位置
// 注意：删除后，it 就失效了（纸条撕了），不能再用旧的 it
snake.erase(it);`} />
                            
                            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900">
                                <h5 className="font-bold text-lg mb-2">🤔 拆解：list&lt;int&gt;::iterator it</h5>
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-bold bg-white px-1 rounded">1. list&lt;int&gt;</span> —— “娃娃机箱子”
                                        <p className="text-xs opacity-80 mt-1">表示我们要操作的是一个装满整数（int）的链表。</p>
                                    </div>
                                    <div>
                                        <span className="font-bold bg-white px-1 rounded">2. ::</span> —— “的” (所属关系)
                                        <p className="text-xs opacity-80 mt-1">读作“里面的”。表示后面要说的东西，是专门属于这个 list 的。</p>
                                    </div>
                                    <div>
                                        <span className="font-bold bg-white px-1 rounded">3. iterator</span> —— “机械爪” (专用工具)
                                        <p className="text-xs opacity-80 mt-1">链表没有下标，必须用这个专用工具，顺着线索一个一个抓。</p>
                                    </div>
                                    <div>
                                        <span className="font-bold bg-white px-1 rounded">4. it</span> —— “爪子的名字”
                                        <p className="text-xs opacity-80 mt-1">给这个变量起的名字。后面代码用到 it 时，就是叫这个爪子干活。</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-indigo-200">
                                    <p className="font-bold mb-1">💡 连起来读：</p>
                                    <p className="italic mb-3">我要申请一个【装整数的链表】专用的【机械爪】，名字叫【it】。</p>
                                    
                                    <p className="font-bold mb-1">⚡️ 偷懒小技巧：auto</p>
                                    <p className="text-xs mb-2">写这么长太累了？现代 C++ 可以让电脑自己猜！</p>
                                    <div className="bg-white p-2 rounded border border-indigo-100 font-mono text-xs">
                                        <span className="text-slate-400">// 电脑看到右边是 begin()，自动推导 it 是迭代器</span><br/>
                                        <span className="text-purple-600">auto</span> it = myList.begin(); 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Magic Functions */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">三、list 的特有魔法 (25分钟)</h3>
                    <p className="text-slate-600 text-sm mb-6">list 自带了很多超级方便的函数，vector 可没有哦！</p>
                    
                    {/* 1. Splice */}
                    <div className="mb-8">
                        <h4 className="font-bold text-indigo-800 mb-3 text-lg">1. 魔法合体：splice (拼接)</h4>
                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg mb-4">
                            <p className="text-sm text-indigo-900 mb-2">
                                想象有两条贪吃蛇，我们要把第二条蛇直接接到第一条蛇身上，或者把别人的一部分“偷”过来。
                            </p>
                            <div className="flex items-center gap-2 text-xs text-indigo-700">
                                <span className="bg-white px-2 py-1 rounded border border-indigo-200 font-bold">生活例子</span>
                                <span>两列小火车接轨。</span>
                            </div>
                        </div>
                        
                        <ListSpliceVisual />

                        <CodeBlock code={`list<int> list1 = {1, 2, 3};
list<int> list2 = {10, 20, 30};

// 把 list2 的所有元素，全部移动到 list1 的开头
// list2 变空了！
list1.splice(list1.begin(), list2);`} />
                    </div>

                    {/* 2. Remove */}
                    <div className="mb-8">
                        <h4 className="font-bold text-red-800 mb-3 text-lg">2. 魔法消除：remove 和 remove_if</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 mb-4 space-y-1">
                            <li><strong>remove：</strong> 比如要把所有数字为 2 的节点删掉。</li>
                            <li><strong>remove_if：</strong> 比如要把所有“小于60分”的成绩删掉。</li>
                        </ul>
                        
                        <CodeBlock code={`list<int> scores = {90, 55, 88, 55, 70};
scores.remove(55); // 删除所有55

// 高级魔法：删除所有小于60的 (了解即可，可以用lambda表达式)
scores.remove_if([](int n){ return n < 60; });`} />
                    </div>

                    {/* 3. Unique/Sort/Reverse */}
                    <div>
                        <h4 className="font-bold text-purple-800 mb-3 text-lg">3. 魔法整理：unique, sort, reverse</h4>
                        
                        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm mb-6">
                            <ListMagicVisual />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                             <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <div className="font-bold text-slate-700 mb-1">sort()</div>
                                <div className="text-xs text-slate-500">list 不能用通用的 std::sort，必须用它自带的 .sort()。</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <div className="font-bold text-slate-700 mb-1">unique()</div>
                                <div className="text-xs text-slate-500">消除相邻的重复元素（就像消消乐）。</div>
                            </div>
                             <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <div className="font-bold text-slate-700 mb-1">reverse()</div>
                                <div className="text-xs text-slate-500">贪吃蛇掉头跑。</div>
                            </div>
                        </div>

                        <CodeBlock code={`list<int> nums = {4, 1, 1, 3, 2, 2, 5};

nums.sort();    // 必须先排序：1, 1, 2, 2, 3, 4, 5
nums.unique();  // 去重：1, 2, 3, 4, 5
nums.reverse(); // 反转：5, 4, 3, 2, 1`} />
                    </div>
                </div>

                {/* 4. Safe Delete */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">四、难点：安全删除</h3>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-slate-700">
                        <p className="font-bold text-red-700 mb-2">⚠️ 危险动作</p>
                        <p>删除了当前节点后，迭代器就失效了（纸条撕了），不能再 <code>it++</code>！</p>
                    </div>
                    <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 text-sm text-slate-700">
                        <p className="font-bold text-green-700 mb-2">✅ 正确姿势 (背诵)</p>
                        <CodeBlock code={`for(auto it = myList.begin(); it != myList.end(); ) {
    if(*it == 5) {
        it = myList.erase(it); // erase 返回下一个位置
    } else {
        ++it;
    }
}`} />
                    </div>
                </div>

                {/* 5. forward_list */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">五、了解 forward_list (单向链表)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <h4 className="font-bold text-slate-800 mb-2">它是谁？</h4>
                             <p className="text-sm text-slate-600">list 的简易版弟弟。为了省内存，每个节点只存“下一个在哪”，不存“上一个”。</p>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <h4 className="font-bold text-slate-800 mb-2">怪异的操作</h4>
                             <p className="text-sm text-slate-600">因为不知道上一个是谁，所以只能操作“后面”的元素：<code>insert_after</code>, <code>erase_after</code>。</p>
                         </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="border-t border-slate-200 pt-8">
                     <div className="bg-indigo-900 text-indigo-100 p-6 rounded-xl shadow-lg">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span>🧠</span> 课后总结口诀
                        </h4>
                        <ul className="space-y-2 text-sm opacity-90 font-mono">
                            <li>链表就像贪吃蛇，内存分散随意搁。</li>
                            <li>增删快如闪电侠，查找慢像蜗牛爬。</li>
                            <li>拼接去重自带挂，删除遍历小心踏。</li>
                            <li>forward_list 单向跑，省地省力也不差。</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'stl-list-ex1',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.4 std::list (双向链表)',
        title: '练习一：图书整理',
        type: 'exercise',
        exerciseData: {
            title: '图书整理 (链表操作)',
            description: '1. 创建书单: "C++", "Python", "C++", "Algorithm"。\n2. 去重 (删除重复的 "C++")。\n3. 在 "Algorithm" 前插入 "DataStruct"。\n4. 倒序打印所有书名。',
            initialCode: `#include <iostream>
#include <list>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    list<string> books = {"C++", "Python", "C++", "Algorithm"};
    
    // 1. 去重 (提示：unique需要先排序)
    // TODO
    
    // 2. 查找并插入
    // TODO: 找到 "Algorithm" 的位置，然后在它前面插入 "DataStruct"
    
    // 3. 倒序打印
    // TODO: 使用 rbegin() 和 rend()
    
    return 0;
}`,
            hints: ["books.sort(); books.unique();", "it = find(books.begin(), books.end(), \"Algorithm\");", "books.insert(it, \"DataStruct\");"],
            solutionCode: `#include <iostream>
#include <list>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    list<string> books = {"C++", "Python", "C++", "Algorithm"};
    
    // 1. 去重
    books.sort();
    books.unique();
    
    // 2. 插入
    auto it = find(books.begin(), books.end(), "Algorithm");
    if (it != books.end()) {
        books.insert(it, "DataStruct");
    }
    
    // 3. 倒序打印
    for (auto it = books.rbegin(); it != books.rend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    return 0;
}`
        }
    },
    {
        id: 'stl-list-ex2',
        category: 'C++ STL (标准模板库)',
        group: '3. 核心容器',
        subGroup: '3.4 std::list (双向链表)',
        title: '练习二：约瑟夫环',
        type: 'exercise',
        content: (
            <div>
                <JosephusVisual />
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-800 mt-6">
                    <p className="font-bold mb-2">💡 编程思路提示：</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>围成圈：</strong> 用 <code>list</code> 模拟。</li>
                        <li><strong>报数：</strong> 用迭代器 <code>it</code> 移动。如果走到 <code>end()</code>，就让它回到 <code>begin()</code>。</li>
                        <li><strong>出局：</strong> 报到 M 时，用 <code>erase(it)</code> 删除。记得接住返回值（下一个人的位置）。</li>
                    </ul>
                </div>
            </div>
        ),
        exerciseData: {
            title: '约瑟夫环模拟 (Josephus Problem)',
            description: 'N 个小朋友围成一圈 (1-N)，从第 1 个开始报数，报到 M 的人出局。问最后剩下的人是多少？\n提示：当迭代器走到 end() 时，要让它回到 begin()。',
            initialCode: `#include <iostream>
#include <list>
using namespace std;

int main() {
    int N = 10; // 10个人
    int M = 3;  // 报到3出局
    list<int> kids;
    for(int i=1; i<=N; i++) kids.push_back(i);

    auto it = kids.begin();
    
    while(kids.size() > 1) {
        // TODO: 报数 M 次 (移动 M-1 步，删除第 M 个)
        // 注意处理 it == kids.end() 的情况
        
        // TODO: 输出淘汰的人
        // cout << "淘汰: " << ...
        
        // TODO: 删除节点，并更新 it
    }

    cout << "最后的大赢家是: " << kids.front() << endl;
    return 0;
}`,
            hints: ["循环 M-1 次 it++", "如果 it == end() 则 it = begin()", "erase 返回下一个位置"],
            solutionCode: `#include <iostream>
#include <list>
using namespace std;

int main() {
    int N = 10;
    int M = 3;
    list<int> kids;
    for(int i=1; i<=N; i++) kids.push_back(i);

    auto it = kids.begin();
    
    while(kids.size() > 1) {
        // 报数 (移动 M-1 次)
        for(int count = 1; count < M; count++) {
            it++;
            if(it == kids.end()) it = kids.begin();
        }

        cout << "淘汰: " << *it << endl;
        
        // 删除
        it = kids.erase(it);
        if(it == kids.end()) it = kids.begin();
    }

    cout << "最后的大赢家是: " << kids.front() << endl;
    return 0;
}`
        }
    }
];