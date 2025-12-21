import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';
import { MarkdownRenderer } from '../../components/Common/MarkdownRenderer';
import { SectionHeader } from '../../components/Lesson/SectionHeader';
import { QuizCard } from '../../components/Lesson/QuizCard';
import { RecursionVisual } from '../../components/Lesson/RecursionVisual';
import { 
  FunctionSquare,
  AlertTriangle,
  ArrowRight,
  Repeat,
  Layers,
  Box,
  GitMerge,
  Cpu,
  RefreshCw,
  Sigma,
  MousePointer2,
  ListTree,
  Variable,
  FileType,
  Binary,
  Scale,
  CheckSquare
} from 'lucide-react';

const PascalTriangleDemo: React.FC<{ rows?: number }> = ({ rows = 6 }) => {
  const data: number[][] = [];
  let prev: number[] = [];
  for (let i = 0; i < rows; i++) {
    const cur = Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      cur[j] = prev[j - 1] + prev[j];
    }
    data.push(cur);
    prev = cur;
  }
  return (
    <div className="space-y-1">
      {data.map((row, i) => (
        <div key={i} className="flex justify-center gap-2">
          {row.map((val, j) => (
            <div
              key={j}
              className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-mono"
            >
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const GridPathTable: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 5 }) => {
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || j === 0) dp[i][j] = 1;
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 8 }}>
      {dp.map((row, i) =>
        row.map((val, j) => (
          <div
            key={`${i}-${j}`}
            className={`p-2 rounded text-center text-xs font-mono border ${
              i === 0 || j === 0
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {val}
          </div>
        ))
      )}
    </div>
  );
};

export const functionsSections: Section[] = [
  {
    id: 'functions-def',
    category: '函数',
    title: '1. 函数的定义与构成',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <p>
          <strong>函数 (Function)</strong> 由多条语句构成，用于实现特定功能。
          <code>main</code> 是程序入口的主函数，自定义函数需在被调用前定义。
        </p>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={FunctionSquare} title="语法结构" />
            <div className="my-4">
                <CodeBlock code={`返回值类型 函数名(参数列表) { 
    函数体 
}`} />
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside">
                <li><strong>返回值类型</strong>：
                    <ul className="pl-6 list-[circle]">
                        <li><strong>具体类型</strong>：如 <code>int</code>, <code>double</code> 等，表示函数计算并传回一个数值。</li>
                        <li><strong>void类型</strong>：表示函数不返回任何值，通常用于只执行动作（如输出）。</li>
                    </ul>
                </li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-call',
    category: '函数',
    title: '2. 函数的调用',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={MousePointer2} title="调用规则" />
            <p className="mb-4 text-sm">任何函数都不能调用 <code>main</code> 函数。</p>
            
            <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2">两种调用方式</h5>
            <ul className="space-y-4 text-sm">
                <li className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-indigo-600 block mb-1">无返回值调用</span>
                    <code>函数名(实参);</code> 只能单独作为一条语句使用。
                </li>
                <li className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-indigo-600 block mb-1">有返回值调用</span>
                    可以作为右值使用，出现在赋值语句、逻辑判断或输出语句中。
                    <br/>
                    <span className="text-xs text-slate-500 mt-1 block">例如：<code>int c = f(10);</code></span>
                </li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-params',
    category: '函数',
    title: '3. 参数传递：值传递与引用传递',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={GitMerge} title="形参与实参" />
            <ul className="space-y-2 text-sm list-disc list-inside mb-6">
                <li><strong>形参</strong>（形式参数）：函数定义时的变量。</li>
                <li><strong>实参</strong>（实际参数）：函数调用时传入的具体值。</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <h5 className="font-bold text-indigo-600 mb-2">非引用形参（值传递）</h5>
                    <p className="text-sm mb-2">默认方式。形参拷贝实参的值。</p>
                    <p className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-900 p-2 rounded">形参的改变 <strong>不影响</strong> 实参。</p>
                </div>
                <div className="p-4 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <h5 className="font-bold text-indigo-600 mb-2">引用形参（引用传递）</h5>
                    <p className="text-sm mb-2">在形参类型后加 <code>&</code> (如 <code>int& a</code>)。</p>
                    <p className="text-sm text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded">形参成为实参的别名，修改形参 <strong>会直接改变</strong> 实参的值。</p>
                    <p className="text-xs text-slate-500 mt-2">* 引用形参对应的实参必须是左值。</p>
                </div>
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'functions-return',
    category: '函数',
    title: '4. 函数的返回值',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={ArrowRight} title="Return 语句" />
            <ul className="space-y-4 text-sm">
                <li>
                    <span className="font-bold text-slate-900 dark:text-white block">必须匹配</span>
                    有返回值的函数必须通过 <code>return</code> 返回具体值，且类型需匹配。
                </li>
                <li>
                    <span className="font-bold text-slate-900 dark:text-white block">立即结束</span>
                    函数一旦执行到 <code>return</code> 语句，会立即结束运行，无论后续代码是否执行完。
                </li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-scope',
    category: '函数',
    title: '5. 变量的作用域',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Box} title="作用域类型" />
            <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                    <span className="font-bold text-indigo-600 whitespace-nowrap">局部作用域</span>
                    <span>在函数（包括 <code>main</code>）内部定义的变量，仅在该函数内有效。</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold text-indigo-600 whitespace-nowrap">块级作用域</span>
                    <span>在 <code>if</code>、<code>for</code> 等语句块内定义的变量，仅在该块内有效。</span>
                </li>
                <li className="flex gap-3">
                    <span className="font-bold text-indigo-600 whitespace-nowrap">生命周期</span>
                    <span>通常变量出了作用域会被销毁，内存被回收。</span>
                </li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-static',
    category: '函数',
    title: '6. 静态变量 (Static)',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        
        {/* 1. 什么是函数静态变量 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Layers} title="1. 什么是“函数静态变量”" />
            <p className="mb-4 text-sm">
                在 <strong>C++</strong> 里，<strong>函数内部用 <code>static</code> 修饰的局部变量</strong>叫“函数静态变量”（更准确：<em>static storage duration 的局部变量</em>）。
            </p>
            
            <h5 className="font-bold text-indigo-600 mb-2">关键性质</h5>
            <ul className="space-y-2 text-sm list-disc list-inside mb-4">
                <li><strong>作用域 (scope)</strong>：仍然是局部的，只能在该函数（或该语句块）内访问。</li>
                <li><strong>生命周期 (lifetime)</strong>：具有静态存储期，程序结束才销毁（不是函数返回就销毁）。</li>
                <li><strong>初始化</strong>：只初始化一次——<strong>第一次执行到声明处</strong>时进行初始化；之后每次调用沿用上一次的值。</li>
            </ul>
            <p className="text-sm text-slate-500 mb-4 ml-4">
                * C++11 起：这种初始化是<strong>线程安全</strong>的（保证只初始化一次）。
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h6 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm mb-2">形象类比</h6>
                <ul className="list-disc list-inside text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                    <li>普通局部变量像“<strong>一次性便签</strong>”：每次进函数重新写，出函数就没了。</li>
                    <li>函数静态变量像“<strong>抽屉里的本子</strong>”：只在这个房间（函数）里能拿到，但每次进来都会翻到同一本，内容会保留。</li>
                </ul>
            </div>
        </div>

        {/* 2. 最经典用途 */}
        <div className="space-y-4">
             <SectionHeader icon={RefreshCw} title="2. 最经典用途：记住上一次调用的状态" />
             <p className="text-sm">C++ 示例：计数器（每调用一次就 +1）</p>
             <CodeBlock code={`#include <iostream>

void visit() {
    static int count = 0;  // 只初始化一次
    ++count;
    std::cout << "visit count = " << count << '\\n';
}

int main() {
    visit(); // 1
    visit(); // 2
    visit(); // 3
}`} />
             <p className="text-sm text-slate-500">
                 如果去掉 <code>static</code>，那么每次进入 <code>visit()</code> 都会重新创建并初始化 <code>count</code>，输出永远是 1。
             </p>
        </div>

        {/* 3. 作用域 vs 生命周期 */}
        <div className="space-y-4">
            <SectionHeader icon={Box} title="3. 作用域 vs 生命周期" />
            <p className="text-sm">容易混淆的点：“看不见”但“还活着”。</p>
            <CodeBlock code={`#include <iostream>

void f() {
    static int x = 10;
    x += 5;
    std::cout << x << '\\n';
}

int main() {
    // std::cout << x << '\\n'; // 编译错误：x 在这里不可见（作用域只在 f 内）
    f(); // 15
    f(); // 20
}`} />
        </div>

        {/* 4. 初始化细节 */}
        <div className="space-y-4">
            <SectionHeader icon={Cpu} title="4. 初始化细节 (C++ 常考点)" />
            <div className="space-y-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">4.1 默认初始化为 0（静态存储期的对象）</h6>
                    <CodeBlock code={`#include <iostream>

void g() {
    static int a; // 静态存储期：零初始化 -> a 初始为 0
    ++a;
    std::cout << a << '\\n';
}

int main() {
    g(); // 1
    g(); // 2
}`} />
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">4.2 初始化只发生一次（C++11 起线程安全）</h6>
                    <CodeBlock code={`#include <iostream>

int foo() {
    static int v = [] { return 100; }(); // 该 lambda 只会执行一次
    return v++;
}

int main() {
    std::cout << foo() << '\\n'; // 100
    std::cout << foo() << '\\n'; // 101
}`} />
                    <p className="text-xs text-slate-500 mt-2">
                        &gt; C++11 起，函数内静态变量的初始化由标准保证“只初始化一次”，并且在多线程下是安全的（不会并发初始化多次）。
                    </p>
                </div>
            </div>
        </div>

        {/* 5. 和“全局变量”的区别 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <SectionHeader icon={GitMerge} title="5. 和“全局变量”的区别" />
            <table className="w-full text-sm text-left mt-4 border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2 px-4 font-bold text-slate-700 dark:text-slate-200">项目</th>
                        <th className="py-2 px-4 font-bold text-slate-700 dark:text-slate-200">函数静态变量 (局部 static)</th>
                        <th className="py-2 px-4 font-bold text-slate-700 dark:text-slate-200">全局变量</th>
                    </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300">
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-2 px-4 font-medium">可见范围</td>
                        <td className="py-2 px-4">仅函数/块内部</td>
                        <td className="py-2 px-4">全局可见（取决于声明与链接）</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-2 px-4 font-medium">生命周期</td>
                        <td className="py-2 px-4">程序全程</td>
                        <td className="py-2 px-4">程序全程</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 font-medium">典型用途</td>
                        <td className="py-2 px-4">把状态封装在函数里（外部不可直接访问）</td>
                        <td className="py-2 px-4">共享状态（更容易耦合）</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-sm text-slate-500 mt-4">
                函数静态变量常用来 <strong>封装状态</strong>：外部访问不到，更不容易被误改。
            </p>
        </div>

        {/* 6. 更形象的例子 */}
        <div className="space-y-4">
             <SectionHeader icon={Binary} title="6. 更形象的例子：生成递增 ID（取号机）" />
             <CodeBlock code={`#include <iostream>

int next_id() {
    static int id = 1000;
    return id++; // 每次调用返回不同 id
}

int main() {
    std::cout << next_id() << '\\n'; // 1000
    std::cout << next_id() << '\\n'; // 1001
    std::cout << next_id() << '\\n'; // 1002
}`} />
        </div>

        {/* 7. 常见坑与最佳实践 */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
            <h6 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 text-sm mb-2">
                <AlertTriangle size={16} />
                7. 常见坑与最佳实践 (C++ 视角)
            </h6>
            <ul className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
                <li>
                    <strong>坑 1：状态“忘了重置”</strong>
                    <br/>
                    <span className="text-amber-600/80 dark:text-amber-400/80">静态变量会一直保留，导致测试用例之间相互影响。</span>
                    <br/>
                    <span className="font-semibold">思路</span>：提供显式重置函数/参数，或改为把状态放进对象里（由对象管理生命周期）。
                </li>
                <li>
                    <strong>坑 2：并发下的共享状态</strong>
                    <br/>
                    <span className="text-amber-600/80 dark:text-amber-400/80">初始化虽线程安全，但对静态变量的<strong>读写操作</strong>未必安全（例如 <code>++count</code> 不是原子操作）。</span>
                    <br/>
                    <span className="font-semibold">思路</span>：用 <code>std::atomic&lt;int&gt;</code> 或互斥锁 <code>std::mutex</code> 保护。
                </li>
                <li>
                    <strong>坑 3：函数变得“不纯”</strong>
                    <br/>
                    <span className="text-amber-600/80 dark:text-amber-400/80">函数结果依赖历史调用，推理难、复用难。</span>
                    <br/>
                    <span className="font-semibold">思路</span>：能用参数/返回值表达的状态，尽量别藏在静态变量里。
                </li>
            </ul>
        </div>

        {/* 8. 小练习 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <SectionHeader icon={FunctionSquare} title="8. 小练习 (C++ 版)" />
             <div className="space-y-6 mt-4">
                <QuizCard 
                    title="练习 1：预测输出"
                    question={`\`\`\`cpp
#include <iostream>

void p() {
    static int x = 1;
    int y = 1;
    x += 2;
    y += 2;
    std::cout << "x=" << x << " y=" << y << '\\n';
}

int main() {
    p();
    p();
    p();
}
\`\`\`
三次输出分别是什么？`}
                    answer={`第一次调用：x(1->3), y(1->3) => x=3 y=3
第二次调用：x(3->5), y(1->3) => x=5 y=3
第三次调用：x(5->7), y(1->3) => x=7 y=3

所以三行依次是：
\`\`\`
x=3 y=3 
x=5 y=3 
x=7 y=3
\`\`\``}
                    type="basic"
                />
                
                <QuizCard 
                    title="练习 2：只在第一次打印欢迎语"
                    question={`需求：多次调用 \`welcome()\`, 只有第一次打印 \`Hello!\`。
提示：\`static bool printed = false;\``}
                    answer={`\`\`\`cpp
#include <iostream> 
 
void welcome() { 
    static bool printed = false; 
    if (!printed) { 
        std::cout << "Hello!\\n"; 
        printed = true; 
    } 
} 
 
int main() { 
    welcome(); // 打印 
    welcome(); // 不打印 
    welcome(); // 不打印 
}
\`\`\``}
                    type="basic"
                />
                
                <QuizCard 
                    title="练习 3：实现一个“限流器”"
                    question={`每 3 次放行一次（返回 true 并清零），否则返回 false。
调用 7 次，返回序列应是：\`false false true false false true false\`
`}
                    answer={`\`\`\`cpp
#include <iostream> 
 
bool allow() { 
    static int c = 0; 
    ++c; 
    if (c == 3) { 
        c = 0; 
        return true; 
    } 
    return false; 
} 
 
int main() { 
    for (int i = 0; i < 7; ++i) { 
        std::cout << std::boolalpha << allow() << ' '; 
    } 
    std::cout << '\\n'; 
}
\`\`\`
输出应为：
\`false false true false false true false\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 4（进阶）：把静态状态改成外部传入"
                    question={`把练习 3 改写成：\`bool allow_with_state(int& state);\`
这样函数不依赖静态变量，更容易测试，也更利于并发场景下的状态隔离。`}
                    answer={`\`\`\`cpp
#include <iostream> 
 
bool allow_with_state(int& state) { 
    ++state; 
    if (state == 3) { 
        state = 0; 
        return true; 
    } 
    return false; 
} 
 
int main() { 
    int state = 0; 
    for (int i = 0; i < 7; ++i) { 
        std::cout << std::boolalpha << allow_with_state(state) << ' '; 
    } 
    std::cout << '\\n'; 
}
\`\`\``}
                    type="basic"
                />
             </div>
        </div>

      </div>
    )
  },
  {
    id: 'functions-default-args',
    category: '函数',
    title: '7. 形参默认值',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Variable} title="默认参数" />
            <p className="text-sm mb-4">定义函数时可为形参指定默认值。若调用时不传参，则使用默认值。</p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                <h6 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 text-sm mb-2">
                    <AlertTriangle size={16} />
                    重要限制
                </h6>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                    有默认值的形参必须放在参数列表的 <strong>最后</strong>。
                </p>
                <CodeBlock code={`void func(int a, int b = 10); // 正确
// void func(int a = 1, int b); // 错误`} />
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'functions-declaration',
    category: '函数',
    title: '8. 函数声明',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={FileType} title="函数声明 (Prototypes)" />
            <ul className="space-y-3 text-sm list-disc list-inside">
                <li><strong>作用</strong>：允许将函数定义写在 <code>main</code> 函数之后。</li>
                <li><strong>语法</strong>：<code>返回值类型 函数名(参数类型);</code>
                    <br/>
                    <span className="text-slate-500 ml-6">即把函数头单独写并加分号。</span>
                </li>
                <li><strong>规则</strong>：声明的形参类型和数量必须与定义一致，但形参名可以省略或不同。</li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-nested',
    category: '函数',
    title: '9. 函数嵌套调用',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        
        {/* 1. 什么是嵌套调用 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={ListTree} title="1. 什么是函数嵌套调用" />
            <p className="mb-4 text-sm">
                <strong>函数嵌套调用</strong>：一个函数在执行过程中调用另一个函数，被调用的函数还可以继续调用更多函数，形成<strong>调用链</strong>。
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h6 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm mb-2">形象类比</h6>
                <ul className="list-disc list-inside text-sm text-indigo-700 dark:text-indigo-300 space-y-2">
                    <li><strong>办事窗口</strong>：你到 A 办事，A 让你去 B 盖章，B 让你去 C 缴费；缴费完成再一路返回。</li>
                    <li><strong>做菜流水线</strong>：<code>make_dinner()</code> 调 <code>wash()</code>、<code>cut()</code>、<code>cook()</code>；<code>cook()</code> 又调 <code>heat_pan()</code>、<code>add_oil()</code>。</li>
                </ul>
            </div>
        </div>

        {/* 2. 调用栈 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Layers} title="2. 调用栈 (Call Stack)" />
            <p className="mb-4 text-sm">
                C++ 每次调用函数，都会创建一个“<strong>栈帧（stack frame）</strong>”，包含形参、局部变量、返回地址等。
            </p>
            <p className="text-sm mb-2">嵌套调用时栈的变化像“<strong>叠盘子</strong>”：</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                <li>调用时：新盘子（新函数）叠在旧盘子上面。</li>
                <li>返回时：最上面的盘子先拿走（<strong>LIFO：后进先出</strong>）。</li>
            </ul>
        </div>

        {/* 3. 代码示例 */}
        <div className="space-y-4">
            <SectionHeader icon={Binary} title="3. 示例：三层嵌套调用" />
            <p className="text-sm">通过打印观察“深入”与“返回”的顺序：</p>
            <CodeBlock code={`#include <iostream>

int add(int a, int b) {
    std::cout << "  enter add(" << a << ", " << b << ")\\n";
    int r = a + b;
    std::cout << "  leave add -> " << r << "\\n";
    return r;
}

int double_sum(int x, int y) {
    std::cout << " enter double_sum(" << x << ", " << y << ")\\n";
    int s = add(x, y);           // 嵌套调用
    int r = 2 * s;
    std::cout << " leave double_sum -> " << r << "\\n";
    return r;
}

int main() {
    std::cout << "enter main\\n";
    int ans = double_sum(3, 4);  // 嵌套调用
    std::cout << "ans = " << ans << "\\n";
    std::cout << "leave main\\n";
}`} />
        </div>

        {/* 4. 常见结构 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={GitMerge} title="4. 常见嵌套结构" />
            
            <div className="space-y-6 mt-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">4.1 流水线式</h6>
                    <p className="text-sm mb-2 text-slate-500">每个函数像一个“工序”，输入原料，输出半成品。</p>
                    <CodeBlock code={`int make_meal(int ingredient) {
    int a = wash(ingredient);
    int b = cut(a);
    int c = cook(b);
    return serve(c);
}`} />
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">4.2 表达式嵌套</h6>
                    <p className="text-sm mb-2 text-slate-500">写得短，但调试不如流水线直观（无法直接看中间值）。</p>
                    <CodeBlock code={`int make_meal_short(int ingredient) {
    return serve(cook(cut(wash(ingredient))));
}`} />
                </div>
            </div>
        </div>

        {/* 5. 求值顺序与坑 */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
            <h6 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 text-sm mb-2">
                <AlertTriangle size={16} />
                5. 关键注意：求值顺序 (Order of Evaluation)
            </h6>
            <div className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
                <p>
                    即使你写 <code>foo(f(), g())</code>，C++ 标准<strong>并不保证</strong> <code>f()</code> 一定先于 <code>g()</code> 执行。
                </p>
                <p>
                    <strong>风险</strong>：如果两个函数有副作用（如打印、修改同一个全局变量），不同编译器下结果可能不同。
                </p>
                <p className="font-semibold">
                    建议：如果有副作用，请拆成多行写，明确顺序。
                </p>
                <CodeBlock code={`// 推荐写法
auto a = f();
auto b = g();
foo(a, b);`} />
            </div>
        </div>

        {/* 6. 常见坑总结 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={AlertTriangle} title="6. 常见坑与最佳实践" />
            <ul className="space-y-3 text-sm list-disc list-inside mt-4">
                <li>
                    <strong>调用链过长</strong>：会导致阅读和调试困难。
                    <br/><span className="text-slate-500 ml-6">建议：拆分成语义明确的函数，或减少不必要的层级。</span>
                </li>
                <li>
                    <strong>副作用隐藏</strong>：深层函数修改了引用参数或全局变量。
                    <br/><span className="text-slate-500 ml-6">建议：函数尽量“输入明确、输出明确”，少改状态。</span>
                </li>
                <li>
                    <strong>性能问题</strong>：过深的嵌套可能引发栈溢出（Stack Overflow），特别是在递归时。
                </li>
            </ul>
        </div>

        {/* 7. 小练习 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <SectionHeader icon={FunctionSquare} title="7. 小练习" />
             <div className="space-y-6 mt-4">
                <QuizCard 
                    title="练习 1：写出输出顺序"
                    question={`\`\`\`cpp
#include <iostream>

void C() { std::cout << "C1 "; std::cout << "C2 "; }
void B() { std::cout << "B1 "; C(); std::cout << "B2 "; }
void A() { std::cout << "A1 "; B(); std::cout << "A2 "; }

int main() { A(); }
\`\`\`
最终输出是什么？`}
                    answer={`\`\`\`
A1 B1 C1 C2 B2 A2 
\`\`\`
执行顺序：A1 -> 进入 B -> B1 -> 进入 C -> C1 -> C2 -> C 返回 -> B2 -> B 返回 -> A2`}
                    type="basic"
                />

                <QuizCard 
                    title="练习 2：重构为流水线"
                    question={`给定嵌套调用：
\`\`\`cpp
int h(int x) { return f(g(x)); }
\`\`\`
请将其改写为多行形式，并打印中间结果（假设 f, g 已定义）。`}
                    answer={`\`\`\`cpp
int h(int x) {
    int t = g(x);
    std::cout << "after g: " << t << '\\n';
    int r = f(t);
    std::cout << "after f: " << r << '\\n';
    return r;
}
\`\`\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 3：实现结账系统"
                    question={`实现 \`total(price, count)\`，内部依次调用：
1. \`subtotal\`: 计算小计
2. \`discount\`: 满 100 减 20
3. \`tax\`: 加 8% 税 (整数计算)
并打印每一步结果。`}
                    answer={`\`\`\`cpp
int total(int price, int count) {
    int sub = subtotal(price, count);
    std::cout << "subtotal: " << sub << '\\n';

    int after_disc = discount(sub);
    std::cout << "after discount: " << after_disc << '\\n';

    int t = tax(after_disc);
    std::cout << "tax: " << t << '\\n';

    int grand = after_disc + t;
    std::cout << "total: " << grand << '\\n';
    return grand;
}
\`\`\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 4：画出调用栈返回值"
                    question={`\`\`\`cpp
int m(int x) { return x + 1; }
int n(int y) { return m(y) + 10; }
int k(int z) { return n(z) * 2; }
\`\`\`
计算 \`k(5)\` 时，各函数返回值的顺序和数值是？`}
                    answer={`1. \`m(5)\` 返回 \`6\`
2. \`n(5)\` 接收 6，加 10，返回 \`16\`
3. \`k(5)\` 接收 16，乘 2，返回 \`32\`

最终结果：32`}
                    type="basic"
                />
             </div>
        </div>

      </div>
    )
  },
  {
    id: 'functions-overload',
    category: '函数',
    title: '10. 函数重载 (Overloading)',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        
        {/* 1. 什么是函数重载 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Repeat} title="1. 什么是函数重载" />
            <p className="mb-4 text-sm">
                <strong>函数重载</strong>：在同一作用域中，允许存在<strong>同名函数</strong>，但它们的<strong>参数列表不同</strong>（数量、类型、顺序）。
            </p>
            <p className="mb-4 text-sm">
                编译器会在<strong>编译期</strong>根据实参决定调用哪一个，这叫<strong>重载决议 (Overload Resolution)</strong>。
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h6 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm mb-2">形象类比</h6>
                <ul className="list-disc list-inside text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                    <li>同一个“按钮”叫 <code>print</code>，给它 <code>int</code> 就走“打印整数”通道，给 <code>string</code> 就走“打印字符串”通道。</li>
                    <li>像“同名窗口”：都叫“办理业务”，但递上去的是“身份证”或“护照”，工作人员会导向不同流程。</li>
                </ul>
            </div>
        </div>

        {/* 2. 重载成立条件 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={GitMerge} title="2. 重载成立的条件" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <h6 className="font-bold text-green-600 dark:text-green-400 text-sm mb-2">✅ 允许的不同点</h6>
                    <ul className="space-y-2 text-sm list-disc list-inside text-slate-600 dark:text-slate-300">
                        <li>参数<strong>个数</strong>不同</li>
                        <li>参数<strong>类型</strong>不同</li>
                        <li>参数<strong>顺序</strong>不同</li>
                        <li><code>const</code> 限定对引用/指针形参可形成重载</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-red-600 dark:text-red-400 text-sm mb-2">❌ 不允许的不同点</h6>
                    <ul className="space-y-2 text-sm list-disc list-inside text-slate-600 dark:text-slate-300">
                        <li>仅<strong>返回值类型</strong>不同</li>
                        <li>仅形参名不同</li>
                        <li>仅值传递的 <code>const</code> 差异（如 <code>int</code> vs <code>const int</code>）</li>
                    </ul>
                </div>
            </div>
            <div className="mt-4">
                <CodeBlock code={`// 错误示例：仅返回值不同
int  foo(int x);
double foo(int x); // ❌ 编译错误`} />
            </div>
        </div>

        {/* 3. 代码示例 */}
        <div className="space-y-4">
            <SectionHeader icon={Binary} title="3. 示例：同名函数处理不同类型" />
            <CodeBlock code={`#include <iostream>
#include <string>

void print(int x) {
    std::cout << "int: " << x << '\\n';
}

void print(double x) {
    std::cout << "double: " << x << '\\n';
}

void print(const std::string& s) {
    std::cout << "string: " << s << '\\n';
}

int main() {
    print(42);                 // 调 print(int)
    print(3.14);               // 调 print(double)
    print(std::string("Hi"));  // 调 print(const string&)
}`} />
        </div>

        {/* 4. 常见坑与难点 */}
        <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                <h6 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 text-sm mb-2">
                    <AlertTriangle size={16} />
                    难点 1：引用与 const 重载
                </h6>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                    <code>int&</code> (可改) 与 <code>const int&</code> (只读) 可以重载。
                </p>
                <CodeBlock code={`void g(int& x)       { cout << "g(int&)"; }
void g(const int& x) { cout << "g(const int&)"; }

int a = 5;
g(a);   // 调 g(int&)
g(10);  // 10 是右值，只能调 g(const int&)`} />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                <h6 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 text-sm mb-2">
                    <AlertTriangle size={16} />
                    难点 2：二义性 (Ambiguity)
                </h6>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                    如果编译器发现“两个都行，且一样好”，就会报错。
                </p>
                <CodeBlock code={`void p(int x, int y = 0);
void p(int x);

// p(1); // ❌ 二义性！p(int) 和 p(int, int=0) 都能匹配`} />
            </div>
        </div>

        {/* 5. 小练习 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <SectionHeader icon={FunctionSquare} title="5. 小练习" />
             <div className="space-y-6 mt-4">
                <QuizCard 
                    title="练习 1：判断能否构成重载"
                    question={`以下每组声明是否能共存？
1. \`void a(int);\` vs \`void a(double);\`
2. \`int b(int);\` vs \`double b(int);\`
3. \`void c(int);\` vs \`void c(const int);\`
4. \`void d(int&);\` vs \`void d(const int&);\``}
                    answer={`1. ✅ 能（参数类型不同）
2. ❌ 不能（仅返回值不同）
3. ❌ 不能（值传递 int 与 const int 等价）
4. ✅ 能（引用类型不同，const int& 可绑定右值）`}
                    type="basic"
                />

                <QuizCard 
                    title="练习 2：预测调用结果"
                    question={`\`\`\`cpp
void f(int)    { cout << "int"; }
void f(double) { cout << "double"; }

f(1);
f(1.0);
f('A');
\`\`\`
依次输出什么？`}
                    answer={`\`\`\`
int
double
int
\`\`\`
解释：
- \`f(1)\` 精确匹配 int
- \`f(1.0)\` 精确匹配 double
- \`f('A')\` char 提升为 int，匹配 f(int)`}
                    type="basic"
                />

                <QuizCard 
                    title="练习 3：修复二义性"
                    question={`\`\`\`cpp
void r(long);
void r(double);

r(1); // 二义性！
\`\`\`
写出两种修复调用的方法。`}
                    answer={`方法一：使用后缀
\`r(1L);\` (调 long)
\`r(1.0);\` (调 double)

方法二：强制转换
\`r((long)1);\`
\`r((double)1);\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 4：设计重载函数"
                    question={`实现 \`area(...)\` 函数：
1. 计算圆面积 (参数 r)
2. 计算矩形面积 (参数 w, h)
3. 计算正方形面积 (参数 a)
`}
                    answer={`\`\`\`cpp
double area(double r) {
    return 3.14159 * r * r;
}

double area(double w, double h) {
    return w * h;
}

// 正方形：复用矩形逻辑
double area_square(double a) {
    return area(a, a);
}
// 注：若想正方形也叫 area，需用 tag 分发或类封装，否则和圆参数冲突 (都是1个double)
\`\`\``}
                    type="basic"
                />
             </div>
        </div>

      </div>
    )
  },
  {
    id: 'functions-template',
    category: '函数',
    title: '11. 函数模板 (Templates)',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        
        {/* 1. 什么是函数模板 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Box} title="1. 什么是函数模板" />
            <p className="mb-4 text-sm">
                <strong>函数模板</strong>：把“类型”当作参数写进函数，使一个函数的逻辑可以适用于多种类型。
                编译器会在用到时根据实参<strong>自动推导</strong>模板参数并生成对应类型的函数（实例化）。
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h6 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm mb-2">形象类比</h6>
                <ul className="list-disc list-inside text-sm text-indigo-700 dark:text-indigo-300 space-y-2">
                    <li>普通函数像“<strong>做一双 42 码鞋</strong>”：只能给特定尺码的人穿。</li>
                    <li>函数模板像“<strong>鞋的纸样</strong>”：你给我尺码（类型），我按纸样裁出对应尺码的鞋（生成对应版本函数）。</li>
                </ul>
            </div>
        </div>

        {/* 2. 基础语法与推导 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Binary} title="2. 基础语法与调用" />
            <CodeBlock code={`template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    add(1, 2);      // 自动推导 T=int
    add(1.5, 2.3);  // 自动推导 T=double
    
    // add(1, 2.5); // ❌ 错误！推导冲突：T既要是int又要double
    add<double>(1, 2.5); // ✅ 显式指定 T=double，1 会被转为 double
}`} />
            <p className="text-sm text-slate-500 mt-4">
                注：<code>typename T</code> 和 <code>class T</code> 在这里是等价的。
            </p>
        </div>

        {/* 3. 模板与重载 */}
        <div className="space-y-4">
            <SectionHeader icon={GitMerge} title="3. 模板与普通函数重载" />
            <p className="text-sm">
                当普通函数和模板都能匹配时，编译器通常<strong>优先选择普通函数</strong>（非模板版本）。
            </p>
            <CodeBlock code={`void print(int x) {
    cout << "普通函数: " << x << endl;
}

template <typename T>
void print(T x) {
    cout << "模板函数: " << x << endl;
}

print(10);   // 调普通函数
print(3.14); // 调模板函数 (T=double)`} />
        </div>

        {/* 4. C++17 if constexpr */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Cpu} title="4. 编译期分支 (C++17)" />
            <p className="text-sm mb-4">
                使用 <code>if constexpr</code> 可以让模板根据类型在编译期选择不同分支，不走的分支甚至不会被编译。
            </p>
            <CodeBlock code={`template <typename T>
void describe(T x) {
    if constexpr (std::is_integral_v<T>) {
        cout << "是整数: " << x << endl;
    } else {
        cout << "不是整数: " << x << endl;
    }
}`} />
        </div>

        {/* 5. 小练习 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <SectionHeader icon={FunctionSquare} title="5. 小练习" />
             <div className="space-y-6 mt-4">
                <QuizCard 
                    title="练习 1：推导结果判断"
                    question={`\`\`\`cpp
template <typename T>
T max2(T a, T b) { return (a > b) ? a : b; }

max2(3, 7);
max2(2.5, 1.2);
max2(1, 2.5);
\`\`\`
能否通过编译？结果是什么？`}
                    answer={`1. \`max2(3, 7)\`: T=int，返回 7
2. \`max2(2.5, 1.2)\`: T=double，返回 2.5
3. \`max2(1, 2.5)\`: ❌ 编译失败（推导冲突，T 不能同时是 int 和 double）
   修复：\`max2<double>(1, 2.5)\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 2：实现支持不同类型的 max"
                    question={`实现 \`max_any(a, b)\`，支持不同类型比较（如 int 和 double），返回公共类型。
提示：使用双模板参数和 \`std::common_type_t\`。`}
                    answer={`\`\`\`cpp
#include <type_traits>

template <typename A, typename B>
auto max_any(A a, B b) -> std::common_type_t<A, B> {
    return (a > b) ? a : b;
}
\`\`\``}
                    type="basic"
                />

                <QuizCard 
                    title="练习 3：模板 vs 普通函数"
                    question={`\`\`\`cpp
void show(int) { cout << "A"; }

template <typename T>
void show(T) { cout << "B"; }

show(10);
show(3.14);
\`\`\`
输出什么？`}
                    answer={`AB
- \`show(10)\`：int 精确匹配普通函数，输出 A
- \`show(3.14)\`：普通函数不匹配（需转换），模板精确匹配 T=double，输出 B`}
                    type="basic"
                />

                <QuizCard 
                    title="练习 4：使用 if constexpr"
                    question={`补全函数：如果是整型打印 "int"，否则打印 "other"。
\`\`\`cpp
template <typename T>
void tag(T x) {
    // TODO
}
\`\`\``}
                    answer={`\`\`\`cpp
template <typename T>
void tag(T x) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "int\\n";
    } else {
        std::cout << "other\\n";
    }
}
\`\`\``}
                    type="basic"
                />
             </div>
        </div>

      </div>
    )
  },
  {
    id: 'functions-auto',
    category: '函数',
    title: '12. 自动类型推断 (Auto)',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Cpu} title="Auto 关键字" />
            <ul className="space-y-3 text-sm list-disc list-inside">
                <li><strong>变量推断</strong>：<code>auto</code> 关键字根据初始值自动推断变量类型。</li>
                <li><strong>返回值推断</strong>：函数的返回值类型可设为 <code>auto</code>，由编译器根据 <code>return</code> 的值自动推断（C++14特性）。</li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-lambda',
    category: '函数',
    title: '13. 匿名函数 (Lambda)',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Binary} title="Lambda 表达式" />
            <div className="my-4">
                <CodeBlock code={`[捕捉列表](参数)->返回值 {
    函数体
}`} />
            </div>
            <ul className="space-y-3 text-sm list-disc list-inside">
                <li><strong>捕捉列表</strong>：
                    <ul className="pl-6 mt-1 space-y-1 list-[circle]">
                        <li><code>[=]</code>：传值捕捉外部变量。</li>
                        <li><code>[&]</code>：引用捕捉外部变量。</li>
                    </ul>
                </li>
                <li><strong>特性</strong>：定义在函数内部，仅在所在作用域可见，常用于临时逻辑。</li>
            </ul>
        </div>
      </div>
    )
  },
  {
    id: 'functions-recursion',
    category: '函数',
    title: '14. 递归函数',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        
        {/* 1.1 递归函数是什么 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Box} title="1.1 递归函数是什么" />
            <p className="mb-4 text-sm">
                C++ 允许函数<strong>调用它自身</strong>。这种“自己调用自己”的嵌套调用称为<strong>递归调用</strong>，包含递归调用的函数称为<strong>递归函数</strong>。
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 mb-4">
                <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    <strong>约束提示</strong>：<code>main()</code> 一般不作为递归函数来写（课程/规范中通常要求递归发生在 <code>main</code> 之外的普通函数中）。
                </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">形象理解</h6>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    递归像“套娃”。每一层把问题缩小一点，直到最小问题能直接解决，再一层层返回答案。
                </p>
            </div>
        </div>

        {/* 1.2 递归函数的基本结构 */}
        <div className="space-y-4">
            <SectionHeader icon={FileType} title="1.2 递归函数的基本结构" />
            <p className="text-sm">递归函数与普通函数形式相同，只是函数体内部出现对自身的调用。</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.2.1 无返回值 (void)</h6>
                    <CodeBlock code={`void f(...) {
    // 处理当前层的一些事情（可选）
    f(...);  // 递归调用
    // 处理返回后的事情（可选）
}`} />
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.2.2 有返回值 (int/double...)</h6>
                    <CodeBlock code={`int f(...) {
    // 处理当前层的一些事情（可选）
    int a = f(...);  // 递归得到子问题结果
    // 利用 a 计算当前层结果
    return ...;
}`} />
                </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                <h6 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-2">课堂提醒：递归调用位置会影响输出顺序</h6>
                <ul className="space-y-1 text-sm list-disc list-inside text-amber-700 dark:text-amber-300">
                    <li><strong>递归前处理/输出</strong>：先做当前层，再深入</li>
                    <li><strong>递归后处理/输出</strong>：先深入到最底，再回溯处理</li>
                </ul>
            </div>
        </div>

        {/* 1.3 递归的两个核心要素（缺一不可） */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={GitMerge} title="1.3 递归的两个核心要素（缺一不可）" />
            <div className="space-y-4 mt-4">
                <div>
                    <h6 className="font-bold text-indigo-600 mb-1">1.3.1 递推公式（把大问题变小）</h6>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        描述问题如何拆分为更小的子问题，例如 f(n) 与 f(n-1) 的关系。
                    </p>
                </div>
                <div>
                    <h6 className="font-bold text-indigo-600 mb-1">1.3.2 退出条件（递归出口）</h6>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        当问题小到可以直接得到答案时停止递归，防止无限递归。
                    </p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-sm text-indigo-800 dark:text-indigo-200 font-bold text-center">
                    口诀：有递推，更要有出口。
                </div>
            </div>
        </div>

        {/* 补充：递归编写三步法（实战心法） */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800">
            <SectionHeader icon={CheckSquare} title="实战心法：递归编写三步走" />
            <div className="space-y-4 mt-4">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                    写递归代码时，建议按以下三个步骤思考，缺一不可：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">1</span>
                            <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm">明确功能</h6>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            先定义函数是做什么的（如 <code>f(n)</code> 是求阶乘），不要跳进递归细节。
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">2</span>
                            <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm">寻找出口</h6>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            找到最小规模问题的答案（如 <code>n=1</code> 时返回 1），防止死循环。
                        </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">3</span>
                            <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm">找出递推</h6>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            建立大问题与小问题的关系（如 <code>f(n) = n * f(n-1)</code>）。
                        </p>
                    </div>
                </div>
                <div className="text-center text-xs font-mono text-amber-700 dark:text-amber-300 mt-2">
                    Summary: Define Function {'->'} Base Case {'->'} Recursive Relation
                </div>
            </div>
        </div>

        {/* 1.4 常见错误：无限递归 */}
        <div className="space-y-4">
            <SectionHeader icon={AlertTriangle} title="1.4 常见错误：无限递归" />
            <p className="text-sm">没有设置退出条件或规模没有变小，会导致递归永远停不下来，最终出现<strong>栈溢出</strong>。</p>
            
            <div className="space-y-4">
                <div>
                    <h6 className="font-bold text-red-600 dark:text-red-400 text-sm mb-2">1.4.1 错误示例：“从前有一座山……”</h6>
                    <CodeBlock code={`#include <iostream>
using namespace std;

void f() {
    cout << "从前有一座山……\\n";
    f(); // 无条件调用自身：永远不会停
}

int main() {
    f();
    return 0;
}`} />
                </div>
                <div>
                    <h6 className="font-bold text-green-600 dark:text-green-400 text-sm mb-2">1.4.2 修正：加入参数并设置出口</h6>
                    <CodeBlock code={`#include <iostream>
using namespace std;

void f(int t) {
    cout << "从前有一座山……\\n";
    t++;
    if (t < 100) {  // 退出条件
        f(t);       // 递推：t 逐步增加，最终到达出口
    }
}

int main() {
    f(0);
    return 0;
}`} />
                </div>
            </div>
        </div>

        {/* 1.5 经典案例 1：阶乘 (Factorial) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={ListTree} title="1.5 经典案例 1：阶乘 (Factorial)" />
            <div className="space-y-4 mt-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.5.1 问题描述</h6>
                    <p className="text-sm">计算 n!，规定 0!=1。</p>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.5.2 递推公式与退出条件</h6>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm">
                        <MarkdownRenderer content={`$$
f(n) = \\begin{cases} 
1 & n=0 \\\\ 
n \\times f(n-1) & n>0 
\\end{cases}
$$`} />
                    </div>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.5.3 代码实现</h6>
                    <CodeBlock code={`#include <iostream>
using namespace std;

long long fact(int n) {
    if (n == 0) return 1;            // 退出条件
    return 1LL * n * fact(n - 1);    // 递推
}

int main() {
    int n;
    cin >> n;
    cout << fact(n) << endl;
    return 0;
}`} />
                </div>
                
                {/* Visualizer for Factorial */}
                <RecursionVisual 
                    code={`long long fact(int n) {
    if (n == 0) return 1;
    return 1LL * n * fact(n - 1);
}`}
                    steps={[
                        { step: 1, line: 1, stack: [{id: '1', func: 'fact', args: 'n=3'}], desc: '调用 fact(3)，入栈' },
                        { step: 2, line: 2, stack: [{id: '1', func: 'fact', args: 'n=3'}], desc: '3 != 0，不满足基准条件' },
                        { step: 3, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}], desc: '遇到递归调用 fact(2)，入栈' },
                        { step: 4, line: 2, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}], desc: '2 != 0，不满足基准条件' },
                        { step: 5, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1'}], desc: '遇到递归调用 fact(1)，入栈' },
                        { step: 6, line: 2, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1'}], desc: '1 != 0，不满足基准条件' },
                        { step: 7, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1'}, {id: '4', func: 'fact', args: 'n=0'}], desc: '遇到递归调用 fact(0)，入栈' },
                        { step: 8, line: 2, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1'}, {id: '4', func: 'fact', args: 'n=0'}], desc: '0 == 0，满足基准条件' },
                        { step: 9, line: 2, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1'}, {id: '4', func: 'fact', args: 'n=0', isReturning: true, returnVal: 1}], desc: 'fact(0) 返回 1，出栈' },
                        { step: 10, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2'}, {id: '3', func: 'fact', args: 'n=1', isReturning: true, returnVal: 1}], desc: 'fact(1) 收到 1，计算 1*1=1，返回 1，出栈' },
                        { step: 11, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3'}, {id: '2', func: 'fact', args: 'n=2', isReturning: true, returnVal: 2}], desc: 'fact(2) 收到 1，计算 2*1=2，返回 2，出栈' },
                        { step: 12, line: 3, stack: [{id: '1', func: 'fact', args: 'n=3', isReturning: true, returnVal: 6}], desc: 'fact(3) 收到 2，计算 3*2=6，返回 6，出栈' },
                    ]}
                    title="阶乘调用栈演示 (fact(3))"
                />
            </div>
        </div>

        {/* 1.6 经典案例 2：斐波那契数列 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={ListTree} title="1.6 经典案例 2：斐波那契数列 (Fibonacci)" />
            <div className="space-y-4 mt-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.6.1 问题描述</h6>
                    <p className="text-sm">数列：1, 1, 2, 3, 5, 8, 13, … 求第 n 项。</p>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.6.2 递推公式与退出条件</h6>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm">
                        <MarkdownRenderer content={`$$
f(n) = \\begin{cases} 
1 & n=1 \\text{ 或 } n=2 \\\\ 
f(n-1) + f(n-2) & n>2 
\\end{cases}
$$`} />
                    </div>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.6.3 代码实现</h6>
                    <CodeBlock code={`#include <iostream>
using namespace std;

int fib(int n) {
    if (n == 1 || n == 2) {      // 退出条件
        return 1;
    } else {                      // 递推公式
        return fib(n - 1) + fib(n - 2);
    }
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}`} />
                </div>
                <div className="text-sm text-slate-500">
                    <strong>课堂提示（性能）</strong>：该递归写法直观，但会产生大量重复计算，n 稍大就会变慢。后续可用循环或动态规划优化。
                </div>
            </div>
        </div>

        {/* 1.7 经典案例 3：网格路径数 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Layers} title="1.7 经典案例 3：网格路径数（杨辉三角思想）" />
            <div className="space-y-4 mt-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.7.1 问题描述</h6>
                    <p className="text-sm">一只蚂蚁从 (1,1) 走到 (x,y)，只能<strong>向右</strong>或<strong>向下</strong>，求不同走法数量。</p>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.7.2 分析（边界 + 递推）</h6>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm mb-3">
                        <MarkdownRenderer content={`$$
f(x,y) = \\begin{cases} 
1 & x=1 \\text{ 或 } y=1 \\\\ 
f(x-1,y) + f(x,y-1) & \\text{其他}
\\end{cases}
$$`} />
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li><strong>边界</strong>：第一行或第一列都只有 1 种走法</li>
                        <li><strong>递推</strong>：到达某格子的走法 = 从上面来 + 从左边来</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.7.3 示意图（杨辉三角）</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
                            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">杨辉三角（前 6 行）</div>
                            <PascalTriangleDemo rows={6} />
                        </div>
                        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">网格 DP 表（5×5）</div>
                            <GridPathTable rows={5} cols={5} />
                        </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                        <span className="mr-2">每个数 = 上方 + 左侧</span>
                        <MarkdownRenderer content={`$C(x+y-2,\\ x-1)$`} />
                    </div>
                </div>
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1.7.4 代码实现</h6>
                    <CodeBlock code={`#include <iostream>
using namespace std;

int paths(int x, int y) {
    if (x == 1 || y == 1) {      // 退出条件（边界）
        return 1;
    } else {                      // 递推公式
        return paths(x - 1, y) + paths(x, y - 1);
    }
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << paths(x, y) << endl;
    return 0;
}`} />
                </div>
                <div className="text-sm text-slate-500">
                    课堂提示：该写法同样会重复计算；当 x,y 较大时会很慢，后续可用表格法优化。
                </div>
            </div>
        </div>

        {/* 1.8 递归的优缺点 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={Scale} title="1.8 递归的优缺点（小结）" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <h6 className="font-bold text-green-600 dark:text-green-400 text-sm mb-2">1.8.1 优点</h6>
                    <ul className="space-y-2 text-sm list-disc list-inside text-slate-600 dark:text-slate-300">
                        <li>思路自然：适合“结构相同、规模变小”的问题</li>
                        <li>代码简洁：贴合数学定义</li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-red-600 dark:text-red-400 text-sm mb-2">1.8.2 缺点</h6>
                    <ul className="space-y-2 text-sm list-disc list-inside text-slate-600 dark:text-slate-300">
                        <li>可能很慢：重复计算多</li>
                        <li>可能栈溢出：递归层数过深</li>
                        <li>调试不直观：调用层级多</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* 2. 课堂练习 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <SectionHeader icon={FunctionSquare} title="2. 课堂练习（含答案）" />
             <div className="space-y-6 mt-4">
                <div>
                    <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">2.0 递归代码阅读题（5 选 1）</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <QuizCard 
                            title="阅读题 1：全局变量 + 递归"
                            question={`阅读代码，输出结果是：
\`\`\`cpp
#include <iostream>
using namespace std;

int x = 1;

void f(int n) {
    if (n == 0) return;
    x *= 2;
    f(n - 1);
}

int main() {
    f(3);
    cout << x << endl;
    return 0;
}
\`\`\`
A. 3
B. 6
C. 8
D. 16
E. 运行时错误`}
                            answer={`正确答案：\`C\`。调用 \`f(3)\` 会将 \`x\` 乘以 2 共 3 次：\`1 → 2 → 4 → 8\`。`}
                            type="challenge"
                        />
                        <QuizCard 
                            title="阅读题 2：递归中修改参数（前后输出混合）"
                            question={`阅读代码，输出结果是：
\`\`\`cpp
#include <iostream>
using namespace std;

void g(int n) {
    if (n <= 0) return;
    cout << n << " ";
    g(n - 2);
    cout << n << " ";
}

int main() {
    g(5);
    return 0;
}
\`\`\`
A. 5 3 1 1 3 5
B. 5 4 3 2 1
C. 5 3 1 3 5
D. 1 3 5 5 3 1
E. 5 1 3 5 3 1`}
                            answer={`正确答案：\`A\`。递归前序输出 \`5 3 1\`，回溯阶段再输出 \`1 3 5\`。`}
                            type="challenge"
                        />
                        <QuizCard 
                            title="阅读题 3：返回值不是斐波那契（递归层数判断）"
                            question={`阅读代码，输出结果是：
\`\`\`cpp
#include <iostream>
using namespace std;

int h(int n) {
    if (n < 10) return 1;
    return 1 + h(n / 10);
}

int main() {
    cout << h(2025) << endl;
    return 0;
}
\`\`\`
A. 1
B. 2
C. 3
D. 4
E. 5`}
                            answer={`正确答案：\`D\`。这是“位数统计”：\`2025\` 有 4 位，返回 \`4\`。`}
                            type="challenge"
                        />
                        <QuizCard 
                            title="阅读题 4：递归求最大值（数组）"
                            question={`阅读代码，输出结果是：
\`\`\`cpp
#include <iostream>
using namespace std;

int mx(int a[], int n) {
    if (n == 1) return a[0];
    int m = mx(a, n - 1);
    return (m > a[n - 1]) ? m : a[n - 1];
}

int main() {
    int a[5] = {7, -2, 7, 3, 0};
    cout << mx(a, 5) << endl;
    return 0;
}
\`\`\`
A. -2
B. 0
C. 3
D. 7
E. 14`}
                            answer={`正确答案：\`D\`。递归比较前 \`n-1\` 项的最大值与最后一项，最大值为 \`7\`。`}
                            type="challenge"
                        />
                        <QuizCard 
                            title="阅读题 5：递归与静态变量（调用次数）"
                            question={`阅读代码，输出结果是：
\`\`\`cpp
#include <iostream>
using namespace std;

int cnt(int n) {
    static int s = 0;
    s++;
    if (n == 0) return s;
    return cnt(n - 1);
}

int main() {
    cout << cnt(2) << " " << cnt(1) << endl;
    return 0;
}
\`\`\`
A. 3 2
B. 3 5
C. 2 3
D. 3 3
E. 编译错误`}
                            answer={`正确答案：\`B\`。\`static\` 变量在函数多次调用间共享：第一次链路返回 \`3\`，第二次再递增返回 \`5\`。`}
                            type="challenge"
                        />
                    </div>
                </div>
                <QuizCard 
                    title="2.1 练习 1：求和 1+2+...+n"
                    question={`题目：用递归计算 1 到 n 的和。`}
                    answer={`\`\`\`cpp
#include <iostream>
using namespace std;

long long sumN(int n) {
    if (n == 1) return 1;         // 退出条件
    return sumN(n - 1) + n;       // 递推
}

int main() {
    int n;
    cin >> n;
    cout << sumN(n) << endl;
    return 0;
}
\`\`\``}
                    type="basic"
                />

                <QuizCard 
                    title="2.2 练习 2：倒序输出数字"
                    question={`题目：输入正整数 n（不含前导 0），递归输出其从右到左的每一位。
例：输入 12345 输出 54321。`}
                    answer={`\`\`\`cpp
#include <iostream>
using namespace std;

void printRev(int n) {
    cout << (n % 10);
    if (n >= 10) printRev(n / 10); // 出口：n<10 时停止递归
}

int main() {
    int n;
    cin >> n;
    printRev(n);
    cout << endl;
    return 0;
}
\`\`\``}
                    type="basic"
                />

                <QuizCard 
                    title="2.3 练习 3：网格路径数"
                    question={`题目：输入 m、n，输出从 (1,1) 到 (m,n) 只能向右/向下的路径数。`}
                    answer={`参考答案：调用本讲 paths(m,n)（见 1.7.4）。`}
                    type="basic"
                />
             </div>
        </div>

        {/* 3. 递归写作自检清单 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <SectionHeader icon={CheckSquare} title="3. 递归写作自检清单" />
            <ul className="space-y-3 text-sm list-decimal list-inside mt-4">
                <li>出口条件是什么？（何时停止）</li>
                <li>每次递归规模是否变小？（是否保证能到达出口）</li>
                <li>子问题结果如何合成当前结果？（返回值怎么用）</li>
                <li>数据范围多大？（会不会慢/会不会栈溢出）</li>
            </ul>
        </div>

      </div>
    )
  },
  {
    id: 'functions-random',
    category: '函数',
    title: '15. 随机函数应用',
    type: 'lesson',
    content: (
      <div className="space-y-8 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={Sigma} title="随机函数的应用（综合版：<random> 与 rand/srand 两条路线）" />
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">一、教学目标</h4>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>理解真随机数与伪随机数的概念与差异，知道计算机通常生成的是伪随机数。</li>
                <li>了解评价伪随机数发生器的重要指标——周期。</li>
                <li>掌握两种常见随机数生成方式：方式 A（<code>&lt;random&gt;</code> + <code>random_device</code>）与方式 B（<code>rand()</code>/<code>srand()</code>）。</li>
                <li>能用“取模 + 平移”生成指定区间整数与特定格式的小数，并完成基础练习题。</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
                <h5 className="font-bold text-indigo-800 dark:text-indigo-200 text-sm mb-2">二、重点与难点</h5>
                <ul className="list-disc list-inside text-xs space-y-1 text-indigo-700 dark:text-indigo-300">
                  <li>重点：伪随机/真随机与种子（seed）的作用，区间整数公式。</li>
                  <li>难点：无符号与有符号类型转换；<code>rand()</code> 的范围与 <code>RAND_MAX</code>。</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">三、知识讲解</h5>
                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>伪随机：看似随机，来源于算法；相同种子 → 相同序列；可预见。</li>
                  <li>真随机：来自非确定物理过程；不可重复、不可预见（工程成本高）。</li>
                  <li>周期：序列最终循环重复；周期越长越不易显露规律。</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">教学建议</div>
              <div className="text-xs text-amber-700 dark:text-amber-300">
                先讲“取模 + 平移”统一思想，再分别在方式 A 与方式 B 中落地实现，让学生建立迁移能力。
              </div>
            </div>
          </div>
        </div>

        {/* 方式 A：<random> + random_device */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-3">方式 A：使用 &lt;random&gt;（现代 C++ 推荐）</h3>
          <div className="space-y-4">
            <div>
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1）random_device 与 rd()</h6>
              <CodeBlock code={`#include <iostream>
#include <random>
using namespace std;

int main() {
    random_device rd;
    for (int i = 0; i < 20; i++) {
        cout << rd() << endl;
    }
    return 0;
}`} />
              <div className="text-xs text-slate-500 mt-2">说明：<code>rd()</code> 产生一个无符号整数；实现可能提供非确定性随机，也可能退化为伪随机。</div>
            </div>

            <div>
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">2）用取模控制范围（核心：取模 + 平移）</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 A-2：0~99</div>
                  <CodeBlock code={`random_device rd;
cout << (int)(rd() % 100) << endl; // 0..99`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 A-3：-20~10</div>
                  <CodeBlock code={`random_device rd;
cout << (int)(rd() % 31) - 20 << endl; // -20..10`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 A-4：a~b（包含端点）</div>
                  <CodeBlock code={`random_device rd;
cout << (int)(rd() % (b - a + 1)) + a << endl; // a..b`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 A-5：1.0~9.9（保留 1 位小数）</div>
                  <CodeBlock code={`random_device rd;
cout << (rd() % 90 + 10) / 10.0 << endl; // 1.0..9.9`} />
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-2">建议：<code>rd()</code> 是无符号类型，先取余再转 <code>int</code>，避免类型理解偏差。</div>
            </div>
          </div>
        </div>

        {/* 方式 B：rand/srand */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-3">方式 B：使用 rand()/srand()（传统方案，课件常见）</h3>
          <div className="space-y-4">
            <div>
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">1）需要的头文件</h6>
              <CodeBlock code={`#include <cstdlib> // rand, srand, RAND_MAX
#include <ctime>   // time`} />
            </div>

            <div>
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">2）生成随机数的三步法</h6>
              <CodeBlock code={`#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));           // 步骤②：设置种子（通常只调用一次）
    int x = rand();           // 步骤③：调用 rand()，得到 0..RAND_MAX
    cout << x << endl;
    return 0;
}`} />
              <div className="text-xs text-slate-500 mt-2">提示：<code>time(0)</code> 返回当前时间戳秒数，用于产生不同序列；很多实现中 <code>RAND_MAX</code> 至少为 <code>32767</code>。</div>
            </div>

            <div>
              <h6 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">3）用 rand() 生成指定范围</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 B-2：0~99</div>
                  <CodeBlock code={`srand(time(0));
int x = rand() % 100; // 0..99`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 B-3：-20~10</div>
                  <CodeBlock code={`srand(time(0));
int x = rand() % 31 - 20; // -20..10`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 B-4：a~b（包含端点）</div>
                  <CodeBlock code={`srand(time(0));
int x = rand() % (b - a + 1) + a; // a..b`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">案例 B-5：1.0~9.9（保留 1 位小数）</div>
                  <CodeBlock code={`srand(time(0));
double x = (rand() % 90 + 10) / 10.0; // 1.0..9.9`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 对照小结 */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <h4 className="font-bold text-indigo-800 dark:text-indigo-200 text-lg mb-2">两种方式对照小结（统一迁移公式）</h4>
          <ul className="list-disc list-inside text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
            <li>方式 A：<code>random_device rd; rd()</code> → 无符号整数，用 <code>%</code> 控制范围</li>
            <li>方式 B：<code>srand(time(0)); rand()</code> → 先设种子，再用 <code>%</code> 控制范围</li>
          </ul>
          <div className="mt-3 text-sm">
            <span className="font-bold">统一公式：</span>
            <span className="ml-2"><MarkdownRenderer content={'`X % (b - a + 1) + a`'} /></span>
            <span className="ml-2 text-slate-500 text-xs">其中 <code>X</code> 可以是 <code>rd()</code> 或 <code>rand()</code>。</span>
          </div>
        </div>

        {/* 课堂练习（含答案） */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={Sigma} title="课堂练习（含答案）" />
          <div className="space-y-4 mt-4">
            <QuizCard
              title="练习 1：生成 50~80 的随机整数（包含端点）"
              question="分别用 rand 和 rd 完成。"
              answer={`\`\`\`cpp
// 用 rand()
int x1 = rand() % 31 + 50;
// 用 rd()
random_device rd;
int x2 = (int)(rd() % 31) + 50;
\`\`\``}
              type="basic"
            />
            <QuizCard
              title="练习 2：生成 -3~3 的随机整数"
              question="分别用 rand 和 rd 完成。"
              answer={`\`\`\`cpp
// 用 rand()
int x1 = rand() % 7 - 3;
// 用 rd()
random_device rd;
int x2 = (int)(rd() % 7) - 3;
\`\`\``}
              type="basic"
            />
            <QuizCard
              title="练习 3：生成 2.5~7.5，步长 0.1（保留 1 位小数）"
              question="提示：先生成 25..75 的整数，再除以 10.0。"
              answer={`\`\`\`cpp
// 用 rand()
double x1 = (rand() % 51 + 25) / 10.0;
// 用 rd()
random_device rd;
double x2 = (rd() % 51 + 25) / 10.0;
\`\`\``}
              type="basic"
            />
          </div>
        </div>

        {/* 课后小结 */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-2">课后小结</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>计算机通常生成伪随机数；真随机数依赖物理过程。</li>
            <li>伪随机的重要指标之一是周期。</li>
            <li><code>rd()</code> 与 <code>rand()</code> 都可配合“取模 + 平移”生成指定范围随机数。</li>
            <li><code>rand()</code> 方案要记得：先 <code>srand(time(0))</code> 再 <code>rand()</code>，且 <code>srand</code> 通常只调用一次。</li>
          </ul>
        </div>
      </div>
    )
  }
];
