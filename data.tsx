import React from 'react';
import { Section } from './types';
import { CodeBlock } from './components/CodeBlock';

// Helper to render a simple table for the "Grade Table" example
const GradeTable = () => (
  <div className="overflow-x-auto my-6">
    <table className="w-full text-sm text-left text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
      <thead className="text-xs text-slate-700 uppercase bg-slate-100">
        <tr>
          <th className="px-6 py-3 border-b"></th>
          <th className="px-6 py-3 border-b font-bold">语文</th>
          <th className="px-6 py-3 border-b font-bold">数学</th>
          <th className="px-6 py-3 border-b font-bold">英语</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b hover:bg-slate-50">
          <th className="px-6 py-4 font-medium text-slate-900 bg-slate-50">张三</th>
          <td className="px-6 py-4 text-center">90</td>
          <td className="px-6 py-4 text-center">95</td>
          <td className="px-6 py-4 text-center">88</td>
        </tr>
        <tr className="bg-white hover:bg-slate-50">
          <th className="px-6 py-4 font-medium text-slate-900 bg-slate-50">李四</th>
          <td className="px-6 py-4 text-center">85</td>
          <td className="px-6 py-4 text-center">80</td>
          <td className="px-6 py-4 text-center">92</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Helper for visualization of char arrays
const CharMemory = ({ chars, highlight }: { chars: string[], highlight?: number }) => (
    <div className="flex flex-wrap gap-1 my-4 justify-center md:justify-start">
        {chars.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
                <div className={`
                    w-10 h-10 border-2 flex items-center justify-center font-mono font-bold rounded transition-all duration-300
                    ${c === '\\0' ? 'bg-slate-100 text-slate-400 border-slate-200' : 
                      highlight === i ? 'bg-indigo-100 border-indigo-500 text-indigo-700 scale-110 shadow-md' : 'bg-white border-slate-300 text-slate-800'}
                `}>
                    {c}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">{i}</span>
            </div>
        ))}
    </div>
);

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

// New Helper: Array Memory Visualization
const ArrayMemoryVisual = ({ offset = 0 }: { offset?: number }) => {
    const data = [10, 20, 30, 40, 50];
    const addresses = ["0x100", "0x104", "0x108", "0x10C", "0x110"];
    
    return (
        <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto">
            <div className="flex items-end gap-2 min-w-max pb-8">
                {data.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center relative">
                        {/* Pointer Arrow */}
                        {idx === offset && (
                            <div className="absolute -top-12 flex flex-col items-center text-indigo-600 animate-bounce">
                                <span className="text-xs font-bold font-mono bg-indigo-100 px-2 py-0.5 rounded mb-1">p + {idx}</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22L2 12h20L12 22z"/></svg>
                            </div>
                        )}
                        
                        {/* Memory Box */}
                        <div className={`
                            w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg shadow-sm transition-colors
                            ${idx === offset ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-300 text-slate-700'}
                        `}>
                            {val}
                        </div>
                        
                        {/* Index */}
                        <span className="text-xs text-slate-400 font-mono mt-2">a[{idx}]</span>
                        {/* Address */}
                        <span className="text-[10px] text-slate-300 font-mono mt-0.5">{addresses[idx]}</span>
                    </div>
                ))}
            </div>
            <div className="text-center text-xs text-slate-500 italic">
                * 假设 int 占 4 字节，地址每次 +4
            </div>
        </div>
    );
};

export const sections: Section[] = [
  // ==========================================
  // Part 1: 2D Arrays
  // ==========================================
  {
    id: 'intro',
    category: '二维数组',
    title: '什么是二维数组？',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-slate-700">
          可以把<strong className="text-indigo-600">二维数组</strong>简单理解成一个"表格"：
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
          <li><strong>行 (row)</strong> → 横着的一排</li>
          <li><strong>列 (column)</strong> → 竖着的一列</li>
        </ul>
        <p className="text-slate-700">
            比如学校里的"成绩表"就是一个典型的二维表格：
        </p>
        <GradeTable />
        <p className="text-slate-700">
            在 C++ 里，我们就可以用二维数组来存这样的表格数据。
        </p>
      </div>
    )
  },
  {
    id: 'syntax',
    category: '二维数组',
    title: '基本定义语法',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-700">最常见的定义写法是：</p>
        <CodeBlock code="类型 数组名[行数][列数];" label="通用语法" />
        
        <h3 className="text-xl font-bold text-slate-900 mt-8">举个例子</h3>
        <CodeBlock code="int a[3][4];" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold text-indigo-600 mb-2">拆解分析</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                    <li><code className="bg-slate-100 px-1 rounded text-slate-800">int</code>：里面存的是整数</li>
                    <li><code className="bg-slate-100 px-1 rounded text-slate-800">a</code>：数组的名字</li>
                    <li><code className="bg-slate-100 px-1 rounded text-slate-800">[3]</code>：有 3 行</li>
                    <li><code className="bg-slate-100 px-1 rounded text-slate-800">[4]</code>：每行有 4 列</li>
                </ul>
            </div>
            <div className="flex items-center justify-center bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-center text-indigo-800">
                想象成：<br/>一个 3 行 4 列的整型表格
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'init',
    category: '二维数组',
    title: '初始化（赋初值）',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">1. 全写展开（推荐，最清晰）</h3>
            <p className="text-slate-600 mb-2">按行的样子把数据写出来：</p>
            <CodeBlock code={`int a[2][3] = {
    {1, 2, 3},    // 第 0 行
    {4, 5, 6}     // 第 1 行
};`} />
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">2. 省略一层大括号</h3>
            <p className="text-slate-600 mb-2">机器会按顺序一行一行填，但人看着累：</p>
            <CodeBlock code="int a[2][3] = {1, 2, 3, 4, 5, 6};" />
        </div>

        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">3. 只给部分赋值</h3>
            <p className="text-slate-600 mb-2">没写的默认补 0：</p>
            <CodeBlock code="int a[2][3] = {1, 2};" />
            <div className="mt-4 p-4 bg-slate-100 rounded-lg text-sm font-mono">
                结果内存里是：<br/>
                第一行: 1, 2, 0<br/>
                第二行: 0, 0, 0
            </div>
        </div>
      </div>
    )
  },
  {
    id: 'access',
    category: '二维数组',
    title: '访问元素',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">就像去电影院找座位一样，你需要<strong>行号</strong>和<strong>列号</strong>。</p>
        
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r shadow-sm">
            <p className="text-amber-800 font-medium">⚠️ 关键记忆点</p>
            <p className="text-amber-700 mt-1">计算机从 <strong>0</strong> 开始计数！</p>
            <ul className="ml-4 mt-2 list-disc text-amber-800 text-sm">
                <li>行下标：0 到 (行数-1)</li>
                <li>列下标：0 到 (列数-1)</li>
            </ul>
        </div>

        <CodeBlock code={`int a[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

int x = a[0][1];  // 取第 0 行第 1 列 → 也就是第一行的第二个元素 (2)
int y = a[1][2];  // 取第 1 行第 2 列 → 也就是第二行的第三个元素 (6)`} />
      </div>
    )
  },
  {
    id: 'loop',
    category: '二维数组',
    title: '循环遍历',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">二维数组通常配合<strong>两层 for 循环</strong>使用。</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-bold text-slate-900 mb-2">口诀</h4>
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg">
                    <p className="text-xl font-bold mb-4">外层管行 (i)</p>
                    <p className="text-xl font-bold opacity-90">内层管列 (j)</p>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 mb-2">代码模板</h4>
                <CodeBlock code={`for (int i = 0; i < 行数; ++i) {
    for (int j = 0; j < 列数; ++j) {
        cout << a[i][j] << " ";
    }
    cout << endl; // 换行
}`} />
            </div>
        </div>

        <div className="mt-6">
            <h4 className="font-bold text-slate-900 mb-2">完整示例</h4>
            <CodeBlock code={`#include <iostream>
using namespace std;

int main() {
    int a[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}`} />
        </div>
      </div>
    )
  },
  {
    id: 'pitfalls',
    category: '二维数组',
    title: '常见小坑',
    type: 'lesson',
    content: (
        <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <h3 className="text-red-800 font-bold text-lg flex items-center gap-2 mb-4">
                    1. 越界访问 (最常见!)
                </h3>
                <CodeBlock code={`int a[2][3]; // 只有 2 行，3 列

a[2][0] = 10; // ❌ 错！行只有 0 和 1
a[0][3] = 10; // ❌ 错！列只有 0, 1, 2`} />
                <p className="text-red-700 text-sm mt-2">
                    写代码时一定要看清楚循环条件是 <code>&lt; N</code> 还是 <code>&lt;= N-1</code>。
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-slate-800 font-bold text-lg mb-4">
                    2. 定义时省略维度
                </h3>
                <p className="text-slate-600 mb-2">
                    可以偷懒不写行数（让编译器自己数），但<strong>绝对不能</strong>不写列数。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-100 rounded border border-green-200 text-green-800 text-sm">
                        ✅ <code>int a[][3] = ...</code>
                    </div>
                    <div className="p-3 bg-red-100 rounded border border-red-200 text-red-800 text-sm">
                        ❌ <code>int a[2][] = ...</code>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: 'ex1',
    category: '二维数组',
    title: '练习 1: 入门定义与输出',
    type: 'exercise',
    exerciseData: {
      title: '定义并输出 3x3 矩阵',
      description: `1. 定义一个 3 行 3 列 的整型二维数组 a
2. 用下面这个数据初始化它：
   1  2  3
   4  5  6
   7  8  9
3. 用两层 for 循环，把它打印出来，每行换行。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    // 在这里写你的代码
    
    return 0;
}`,
      hints: [
        "定义语法: int a[3][3] = { ... };",
        "外层循环 i 从 0 到 2",
        "内层循环 j 从 0 到 2",
        "每输出完一行 (内层循环结束) 记得 cout << endl;"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    // 1. 定义并初始化
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // 2. 遍历打印
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << a[i][j] << " ";
        }
        cout << endl; // 换行
    }

    return 0;
}`
    }
  },
  {
    id: 'ex2',
    category: '二维数组',
    title: '练习 2: 求和',
    type: 'exercise',
    exerciseData: {
      title: '计算所有元素的总和',
      description: `1. 定义一个 2 行 4 列 的数组，内容为：
   1  3  5  7
   2  4  6  8
2. 用两层 for 循环把所有元素加起来，输出总和。
(预期结果: 36)`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    // 定义数组
    int a[2][4] = {
        {1, 3, 5, 7},
        {2, 4, 6, 8}
    };
    
    int sum = 0;
    
    // 请补全循环求和逻辑
    
    cout << "Sum = " << sum << endl;
    return 0;
}`,
      hints: [
        "需要定义一个累加器变量 int sum = 0;",
        "在循环内部执行 sum += a[i][j];",
        "注意行是 2，列是 4"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[2][4] = {
        {1, 3, 5, 7},
        {2, 4, 6, 8}
    };

    int sum = 0;

    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 4; ++j) {
            sum += a[i][j];
        }
    }

    cout << sum << endl; // 输出 36
    return 0;
}`
    }
  },
  {
    id: 'ex3',
    category: '二维数组',
    title: '练习 3: 找最大值',
    type: 'exercise',
    exerciseData: {
      title: '找出最大值及其坐标',
      description: `1. 使用如下 3行4列 数组：
   {5,  3,  9,  1}
   {7, 11,  2,  8}
   {6, 10,  4, 12}
2. 找出数值最大的元素，记录它的值以及它的行号、列号。
3. 输出格式: max = 12, row = 2, col = 3`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {5,  3,  9,  1},
        {7, 11,  2,  8},
        {6, 10,  4, 12}
    };
    
    // 假设第一个数是最大的
    int maxVal = a[0][0];
    int maxRow = 0;
    int maxCol = 0;
    
    // 编写循环进行打擂台比较
    
    
    cout << "max = " << maxVal << ", row = " << maxRow << ", col = " << maxCol << endl;
    return 0;
}`,
      hints: [
        "先假设 a[0][0] 是最大的",
        "遍历整个数组，如果发现 a[i][j] > maxVal，就更新 maxVal, maxRow, maxCol",
        "不需要交换位置，只需要记录值和下标"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {5,  3,  9,  1},
        {7, 11,  2,  8},
        {6, 10,  4, 12}
    };

    int maxVal = a[0][0];
    int maxRow = 0;
    int maxCol = 0;

    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 4; ++j) {
            if (a[i][j] > maxVal) {
                maxVal = a[i][j];
                maxRow = i;
                maxCol = j;
            }
        }
    }

    cout << "max = " << maxVal << ", row = " << maxRow << ", col = " << maxCol << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex4',
    category: '二维数组',
    title: '练习 4: 行之和',
    type: 'exercise',
    exerciseData: {
      title: '计算每一行的和',
      description: `1. 使用和练习 3 一样的 3x4 数组。
2. 分别求出每一行的和。
3. 逐行输出结果。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {5,  3,  9,  1},
        {7, 11,  2,  8},
        {6, 10,  4, 12}
    };
    
    for (int i = 0; i < 3; ++i) {
        // 在这一行开始前，先把计数器清零
        int rowSum = 0;
        
        // 遍历这一行的列
        
        cout << "row " << i << " sum = " << rowSum << endl;
    }
    
    return 0;
}`,
      hints: [
        "关键点：rowSum 必须在第一层循环里定义（或清零），不能定义在最外面",
        "外层循环每走一次，表示换了一行",
        "内层循环负责把这一行的数全加起来"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {5,  3,  9,  1},
        {7, 11,  2,  8},
        {6, 10,  4, 12}
    };

    for (int i = 0; i < 3; ++i) {
        int rowSum = 0; // 每一行重新开始累计
        for (int j = 0; j < 4; ++j) {
            rowSum += a[i][j];
        }
        cout << "row " << i << " sum = " << rowSum << endl;
    }

    return 0;
}`
    }
  },

  // ==========================================
  // Part 2: Character Arrays & Strings
  // ==========================================
  {
    id: 'char-intro',
    category: '字符数组 & Strings',
    title: '字符与 C 风格字符串',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">1. 最小单位：字符 char</h3>
          <p className="text-slate-700 mb-2">可以把字符想象成“一格小方块里装一个符号”。</p>
          <CodeBlock code={`char ch = 'A';
char digit = '9';
char symbol = '#';`} />
          <ul className="list-disc list-inside space-y-1 ml-2 text-slate-700 text-sm">
            <li>字符必须用<strong>单引号</strong>：<code>'A'</code>, <code>'b'</code></li>
            <li>char 本质上是一个整数，底层存的是 ASCII 码</li>
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">2. C 风格字符串：char 数组 + '\0'</h3>
          <p className="text-slate-700">
            这是 C 语言的写法，但在 C++ 中也很常见。
          </p>
          <CodeBlock code='char s[10] = "hello";' />
          
          <p className="text-sm text-slate-600 mb-2">它在内存里长这样：</p>
          <CharMemory chars={['h', 'e', 'l', 'l', 'o', '\\0', '?', '?', '?', '?']} />
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded text-sm text-amber-900">
             <strong>关键点：</strong> 字符串结尾自动加一个结束符 <code>'\0'</code> (ASCII 0)。
             这个符号告诉程序“字符串到这里结束了”。
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="font-bold text-slate-800">常见定义方式：</h4>
            <CodeBlock code={`char s1[] = "hello";           // 编译器自动算长度：6（含 '\\0'）
char s2[10] = "hi";            // hi\\0 + 后面多的空间
char s3[5] = {'h','e','l','l','o'}; // ❌ 错！没有 '\\0'，不能当正常字符串用`} />
          </div>
          
          <p className="text-slate-700 italic mt-4">
             对初学者建议：知道 C 风格字符串是什么就够了，实际写代码时优先用 <code>std::string</code>。
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'string-basics',
    category: '字符数组 & Strings',
    title: 'std::string 基础与输入输出',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">std::string (推荐)</h3>
          <p className="text-slate-700 mb-2">
            这是 C++ 提供的神器，像一个“会自动扩容的字符串容器”。
            <br/>不用操心长度，也不用管 <code>\0</code>。
          </p>
          <CodeBlock code={`#include <string> // 必须加这个头文件
using namespace std;

string s1 = "hello";
string s2("world");
string s3; // 空字符串`} />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">输入与输出</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-white rounded border shadow-sm">
                <h4 className="font-bold text-indigo-600 mb-2">方法 1: cin</h4>
                <p className="text-xs text-slate-500 mb-2">遇到空格就停止</p>
                <CodeBlock code={`string name;
cin >> name;`} />
                <p className="text-xs text-slate-500 mt-2">
                  输入 "Li Hua" → 只能存进 "Li"
                </p>
             </div>
             
             <div className="p-4 bg-white rounded border shadow-sm">
                <h4 className="font-bold text-indigo-600 mb-2">方法 2: getline (读一行)</h4>
                <p className="text-xs text-slate-500 mb-2">读到换行符为止</p>
                <CodeBlock code={`string line;
getline(cin, line);`} />
                <p className="text-xs text-slate-500 mt-2">
                  输入 "Li Hua" → 存进 "Li Hua"
                </p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'string-ops',
    category: '字符数组 & Strings',
    title: '拼接、长度与遍历',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. 拼接 ( + )</h3>
          <CodeBlock code={`string s1 = "Hello";
string s2 = "World";

// 拼接
string s3 = s1 + ", " + s2 + "!"; 
// s3 变成 "Hello, World!"

// 追加
s1 += " C++"; 
// s1 变成 "Hello C++"`} />
        </div>

        <div>
           <h3 className="text-lg font-bold text-slate-900 mb-2">2. 长度</h3>
           <p className="text-slate-700 text-sm mb-2"><code>size()</code> 和 <code>length()</code> 几乎一样。</p>
           <CodeBlock code={`string s = "hello";
cout << s.size();   // 输出 5`} />
        </div>

        <div>
           <h3 className="text-lg font-bold text-slate-900 mb-2">3. 遍历 (访问每个字符)</h3>
           
           <h4 className="font-bold text-slate-700 text-sm mt-4">方法 A: 下标遍历 (像数组一样)</h4>
           <CodeBlock code={`string s = "C++";
for (int i = 0; i < s.size(); ++i) {
    cout << s[i] << endl;
}`} />

           <h4 className="font-bold text-slate-700 text-sm mt-4">方法 B: 增强型 for 循环 (Range-based for loop) - 推荐</h4>
           <p className="text-slate-600 text-sm mb-2">这种写法更简洁，读作“对于字符串 s 中的每一个字符 c”。</p>
           <CodeBlock code={`string s = "hello";
for (char c : s) {
    cout << c << " ";
}
// 输出: h e l l o`} />
        </div>
      </div>
    )
  },
  {
    id: 'string-adv',
    category: '字符数组 & Strings',
    title: '比较、查找与常用函数',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
           <h3 className="text-lg font-bold text-slate-900 mb-2">1. 字符串比较</h3>
           <p className="text-slate-700 text-sm mb-2">可以直接用 <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>。按字典序比较。</p>
           <CodeBlock code={`string a = "apple";
string b = "banana";

if (a < b) {
    cout << "apple 在 banana 前面";
}`} />
        </div>

        <div>
           <h3 className="text-lg font-bold text-slate-900 mb-2">2. 常用黑科技函数</h3>
           <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-mono text-indigo-700 font-bold">substr(pos, len)</span>
                  <p className="text-sm text-slate-600 mt-1">截取子串。从 pos 开始，取 len 个。</p>
                  <CodeBlock code={`string s = "hello world";
string sub = s.substr(0, 5); // "hello"`} />
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-mono text-indigo-700 font-bold">find(str)</span>
                  <p className="text-sm text-slate-600 mt-1">查找子串。没找到会返回 <code>string::npos</code>。</p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded p-3 my-2 text-sm text-indigo-900">
                    💡 <strong>小知识：</strong><br/>
                    <code>npos</code> 是 "no position" 的缩写。<br/>
                    你可以把它想象成<strong>查找失败时的错误码</strong>（类似于网页的 404），或者理解为<strong>“查无此人”</strong>。
                  </div>
                  <CodeBlock code={`string s = "I love C++";
size_t pos = s.find("C++"); 

if (pos != string::npos) {
    cout << "找到了!";
} else {
    cout << "没找到 (查无此人)";
}`} />
              </div>
              
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="font-mono text-indigo-700 font-bold">push_back / pop_back</span>
                  <p className="text-sm text-slate-600 mt-1">在末尾增删一个字符。</p>
                  <CodeBlock code={`s.push_back('!'); // 加一个感叹号
s.pop_back();     // 删掉最后一个字符`} />
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'ex-str-1',
    category: '字符数组 & Strings',
    title: '练习 1: 简单的问候',
    type: 'exercise',
    exerciseData: {
      title: '读入名字并输出',
      description: `1. 使用 std::string
2. 读入一个名字（不含空格，用 cin 即可）
3. 输出格式为：Hello, <名字>!`,
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "请输入你的名字：";
    
    // 在这里写输入和输出代码
    
    return 0;
}`,
      hints: [
        "使用 cin >> name; 读取输入",
        "使用 cout << ... 拼接输出"
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "请输入你的名字：";
    cin >> name;

    cout << "Hello, " << name << "!" << endl;

    return 0;
}`
    }
  },
  {
    id: 'ex-str-2',
    category: '字符数组 & Strings',
    title: '练习 2: 长度与逐字符',
    type: 'exercise',
    exerciseData: {
      title: '统计长度并逐行打印',
      description: `1. 用 getline 读入一整行（可能包含空格）
2. 输出这行的长度
3. 再把这一行的每个字符一行一个地打印出来`,
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "请输入一行文本：" << endl;
    
    // 1. 使用 getline 读入
    
    // 2. 输出 line.size()
    
    // 3. 循环遍历输出每个字符
    
    return 0;
}`,
      hints: [
        "getline(cin, line);",
        "for (int i = 0; i < line.size(); ++i) { ... }"
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "请输入一行文本：" << endl;
    getline(cin, line);

    cout << "长度为：" << line.size() << endl;

    cout << "逐字符输出：" << endl;
    for (size_t i = 0; i < line.size(); ++i) {
        cout << "第 " << i << " 个字符：'" << line[i] << "'" << endl;
    }

    return 0;
}`
    }
  },
  {
    id: 'ex-str-3',
    category: '字符数组 & Strings',
    title: '练习 3: 回文串判断',
    type: 'exercise',
    exerciseData: {
      title: '判断是否为回文串',
      description: `回文串：从左往右读和从右往左读一样的字符串（如 "level", "abba"）。

要求：
1. 输入一个不含空格的字符串
2. 判断是否为回文串
3. 输出 "YES" 或 "NO"`,
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    bool isPalin = true;
    
    // 方法：
    // 可以倒着拼出一个新字符串，看和原来的是不是一样？
    // 也可以用左右两个指针向中间靠拢。
    
    if (isPalin) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
    }

    return 0;
}`,
      hints: [
        "新手方法：string s2 = \"\"; for(...) s2 += s[i]; 然后比较 if (s == s2)",
        "进阶方法：left = 0, right = s.size() - 1; while (left < right) { ... }"
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cout << "请输入一个字符串：";
    cin >> s;

    // --- 方法 1：新手友好写法 (倒着拼) ---
    string reversedS = "";
    // 从最后一个字符 (size-1) 开始，倒着遍历到 0
    for (int i = s.size() - 1; i >= 0; --i) {
        reversedS += s[i];
    }
    
    if (s == reversedS) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
    }
    
    /* 
    // --- 方法 2：双指针 (进阶，更高效) ---
    bool isPalin = true;
    int left = 0;
    int right = s.size() - 1;

    while (left < right) {
        if (s[left] != s[right]) {
            isPalin = false;
            break;
        }
        ++left;
        --right;
    }
    // ... 输出逻辑 ...
    */

    return 0;
}`
    }
  },
  {
    id: 'ex-str-4',
    category: '字符数组 & Strings',
    title: '练习 4: 字符统计',
    type: 'exercise',
    exerciseData: {
      title: '统计某字符出现的次数',
      description: `1. 用 getline 读入一整行字符串（可能包含空格）
2. 再用 cin 读入一个字符 ch
3. 统计 ch 在这一行中出现了多少次并输出`,
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line); // 读入一行

    char ch;
    cin >> ch; // 读入要找的字符

    int cnt = 0;
    
    // 遍历 line，如果字符等于 ch，计数器+1
    
    cout << "出现次数：" << cnt << endl;
    return 0;
}`,
      hints: [
        "可以用增强型 for 循环: for (char c : line)",
        "if (c == ch) cnt++;"
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "请输入一行文本：" << endl;
    getline(cin, line);

    char ch;
    cout << "请输入要统计的字符：";
    cin >> ch;

    int cnt = 0;
    for (char c : line) {
        if (c == ch) {
            ++cnt;
        }
    }

    cout << "字符 '" << ch << "' 出现了 " << cnt << " 次。" << endl;

    return 0;
}`
    }
  },
  {
    id: 'ex-str-5',
    category: '字符数组 & Strings',
    title: '练习 5 (进阶): 单词倒排 (数组版)',
    type: 'exercise',
    exerciseData: {
      title: '单词顺序反转',
      description: `输入一整行，只包含英文单词和空格，如 "I love C++"。
输出时把单词顺序颠倒，单词内部不变。
输出："C++ love I"

要求：
1. **不要使用 vector**，尝试使用字符串数组 string words[100];
2. 用一个变量 count 记录存了多少个单词。
3. 倒序遍历数组输出。`,
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    // 定义一个足够大的数组来存单词
    string words[100];
    int count = 0; // 记录目前存了几个单词
    
    string currentWord;
    
    // 1. 手动拆分单词，存入 words[count++]
    
    // 2. 倒序输出 words 数组
    
    return 0;
}`,
      hints: [
        "words[count] = currentWord; count++;",
        "vector 的 push_back 其实就是 words[count++] = ...",
        "倒序遍历：for (int i = count - 1; i >= 0; i--)"
      ],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    cout << "请输入一句话：" << endl;
    getline(cin, line);

    string words[100]; // 假设单词不超过100个
    int count = 0;     // 单词计数器

    string word;

    // --- 步骤 1: 拆分单词 ---
    for (size_t i = 0; i <= line.size(); ++i) {
        // 如果还没到结尾 且 不是空格
        if (i < line.size() && line[i] != ' ') {
            word += line[i]; 
        } else {
            // 遇到空格 或 结尾
            if (!word.empty()) {
                words[count] = word; // 存入数组
                count++;             // 计数器+1
                word = "";           // 清空临时单词，准备下一个
            }
        }
    }

    // --- 步骤 2: 反向输出数组 ---
    for (int i = count - 1; i >= 0; --i) {
        cout << words[i];
        if (i > 0) cout << ' ';
    }
    cout << endl;

    return 0;
}`
    }
  },

  // ==========================================
  // Part 3: Pointers
  // ==========================================
  {
    id: 'ptr-basic',
    category: '指针 (Pointers)',
    title: '1. 指针的定义与运算',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        {/* 1.1 Concept */}
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-3">1.1 指针的概念</h3>
           <p className="text-slate-700 mb-4 leading-relaxed">
             指针本质上就是<strong className="text-indigo-600">“存放地址的变量”</strong>。<br/>
             就像我们每个人都有一个家庭住址一样，程序里的每个变量在内存中也有一个地址。
             指针变量里装的不是普通数据，而是这些地址。
           </p>
           
           <PointerVisual />

           <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
               <h4 className="font-bold text-slate-800 mb-2 text-sm">基本代码示例</h4>
               <CodeBlock code={`int a = 10;
int *p = &a;  // p 中存的是 a 的地址`} />
           </div>
           
           <div className="mt-6 bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
               <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                   ⭐️ 核心关系（必须背下来）
               </h4>
               <ul className="space-y-3 font-mono text-indigo-800">
                   <li className="flex items-center gap-4 bg-white/50 p-2 rounded">
                       <span className="font-bold min-w-[80px]">p == &a</span>
                       <span className="text-sm text-indigo-600">// p 里放的是 a 的地址</span>
                   </li>
                   <li className="flex items-center gap-4 bg-white/50 p-2 rounded">
                       <span className="font-bold min-w-[80px]">*p == a</span>
                       <span className="text-sm text-indigo-600">// *p 表示“通过地址访问真正的数据”</span>
                   </li>
               </ul>
           </div>
           <p className="mt-4 text-slate-600 text-sm">
               <strong>常见误区：</strong> 很多初学者以为 <code>*p</code> 是定义指针时的特殊写法。
               其实在定义之后，<code>*p</code> 的意思是“解引用”，也就是“跑腿去那个地址拿数据”。
           </p>
        </div>

        {/* 1.2 Declaration & Init */}
        <div className="border-t border-slate-200 pt-8">
           <h3 className="text-xl font-bold text-slate-900 mb-3">1.2 指针的声明与初始化</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <h4 className="font-bold text-slate-700 text-sm mb-2">声明语法</h4>
                  <CodeBlock code={`int *p;    // 推荐
int* p;    // 也行
int *p1, *p2; // 两个都是指针`} />
                  <p className="text-xs text-slate-500 mt-2">注意：星号位置随意，建议紧挨着变量名。</p>
              </div>
              <div>
                  <h4 className="font-bold text-slate-700 text-sm mb-2">不同类型指针</h4>
                  <CodeBlock code={`int    *pi; // 指向 int
double *pd; // 指向 double
char   *pc; // 指向 char`} />
              </div>
           </div>

           <div className="mt-6">
               <h4 className="font-bold text-slate-700 text-sm mb-2">初始化的几种方式</h4>
               <CodeBlock code={`int a = 10;
int *p1 = &a;         // 指向已存在变量（最常见）
int *p2 = nullptr;    // C++11 推荐的空指针写法
int *p3 = 0;          // 旧写法，也表示空指针`} />
               <div className="mt-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded inline-block">
                   <strong>原则：</strong> 指针定义完“不要悬空”，要么指向一个有效变量，要么赋为 nullptr。
               </div>
           </div>
        </div>

        {/* 1.3 Operators */}
        <div className="border-t border-slate-200 pt-8">
           <h3 className="text-xl font-bold text-slate-900 mb-3">1.3 取地址 (&) 与 解引用 (*)</h3>
           
           <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-1">取地址符 <code>&</code></h4>
                  <p className="text-sm text-slate-600 mb-2">放在变量前面，意思是“告诉我你的内存地址”。</p>
                  <CodeBlock code={`int a = 42;
cout << &a << endl;  // 输出类似 0x7ffee4 的地址`} />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-1">解引用符 <code>*</code></h4>
                  <p className="text-sm text-slate-600 mb-2">放在指针前面，意思是“我要去这个地址里拿数据（或者改数据）”。</p>
                  <CodeBlock code={`int a = 42;
int *p = &a;

cout << *p << endl;  // 输出 42
*p = 100;            // 把 a 的值改成了 100`} />
              </div>
           </div>
        </div>

        {/* 1.4 Arithmetic */}
        <div className="border-t border-slate-200 pt-8">
           <h3 className="text-xl font-bold text-slate-900 mb-3">1.4 指针运算</h3>
           
           <h4 className="font-bold text-slate-700 text-sm mt-4 mb-2">指针 + 整数</h4>
           <p className="text-slate-600 text-sm mb-2">
               这是指针最神奇的地方：<code>p + 1</code> 并不是把地址值加 1，而是<strong>向后跳过一个元素</strong>。
           </p>
           <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
int *p = a;            // p 指向 a[0] (10)

cout << *p << endl;        // 10
cout << *(p + 1) << endl;  // 20，相当于 a[1]
cout << *(p + 2) << endl;  // 30，相当于 a[2]`} />
           <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
               <div className="bg-blue-50 p-2 rounded text-blue-900">
                   <strong>int* 指针：</strong><br/>
                   加 1 跳过 4 个字节 (sizeof(int))
               </div>
               <div className="bg-purple-50 p-2 rounded text-purple-900">
                   <strong>double* 指针：</strong><br/>
                   加 1 跳过 8 个字节 (sizeof(double))
               </div>
           </div>

           <h4 className="font-bold text-slate-700 text-sm mt-6 mb-2">自增与比较</h4>
           <CodeBlock code={`int *p = a;
p++;                 // p 现在指向 a[1]

int *p1 = &a[1];
int *p2 = &a[4];
if (p1 < p2) { ... } // 可以比较前后顺序`} />
        </div>

        {/* 1.5 Safety */}
        <div className="border-t border-slate-200 pt-8">
           <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
               <span className="text-2xl">⚠️</span> 1.5 指针的安全问题
           </h3>
           <p className="text-slate-600 mb-4">这里是新手最容易写出 Bug 甚至导致程序崩溃（Crash）的地方。</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r">
                   <h4 className="font-bold text-red-900 mb-1">野指针 (Wild Pointer)</h4>
                   <p className="text-xs text-red-800 mb-2">定义了指针但没初始化，它指向哪里完全是随机的。</p>
                   <CodeBlock code={`int *p;   // 里面是垃圾地址
*p = 10;  // 💥 崩溃！写入了未知内存`} />
               </div>
               
               <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r">
                   <h4 className="font-bold text-amber-900 mb-1">悬空指针 (Dangling Pointer)</h4>
                   <p className="text-xs text-amber-800 mb-2">指向的房子已经被拆迁了（生命周期结束），但指针手里还拿着旧钥匙。</p>
                   <CodeBlock code={`int *p = nullptr;
{
    int a = 10;
    p = &a;
} // a 死了
// p 指向已释放的内存`} />
               </div>
           </div>
        </div>
      </div>
    )
  },
  
  // ==========================================
  // Expanded Part: Pointer & 1D Array
  // ==========================================
  {
    id: 'ptr-1d-core',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.1 核心原理：数组名即指针',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <div>
           <p className="text-lg leading-relaxed text-slate-700">
             这是 C++ 中最著名的规则之一：<br/>
             <strong className="text-indigo-600 text-xl">数组名 ≈ 指向首元素的指针</strong>
           </p>
           <p className="text-slate-600 mt-2">
             当你把数组名 <code>a</code> 用在表达式里时，编译器会自动把它看作 <code>&a[0]</code>。
           </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm my-4">
             <h4 className="font-bold text-slate-800 mb-4">内存视角</h4>
             <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-mono mb-1">a[0]</span>
                    <div className="w-12 h-12 bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center font-bold">1</div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">0x100</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-mono mb-1">a[1]</span>
                    <div className="w-12 h-12 bg-white border border-slate-300 flex items-center justify-center">2</div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">0x104</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-mono mb-1">a[2]</span>
                    <div className="w-12 h-12 bg-white border border-slate-300 flex items-center justify-center">3</div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">0x108</span>
                </div>
             </div>
             
             <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-100 font-mono text-sm text-slate-700">
                <p>int a[3] = {'{1, 2, 3}'};</p>
                <p className="mt-2 text-indigo-600">// 下面两行完全等价：</p>
                <p>int *p = a;</p>
                <p>int *p = &a[0];</p>
             </div>
        </div>
      </div>
    )
  },
  {
    id: 'ptr-1d-calc',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.2 指针运算图解',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">指哪打哪：指针加减法</h3>
           <p className="text-slate-700">
             因为内存是连续的，我们可以通过<strong>给指针做加法</strong>来访问数组后面的元素。
           </p>
           
           <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
              <p className="text-amber-900 font-bold">公式：</p>
              <p className="text-amber-800 font-mono text-lg mt-1">*(p + i) 等价于 p[i]</p>
           </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
           <h4 className="font-bold text-slate-800">动态演示：p + i</h4>
           <ArrayMemoryVisual offset={2} />
           
           <CodeBlock code={`int a[5] = {10, 20, 30, 40, 50};
int *p = a;

cout << *p;       // 10
cout << *(p + 1); // 20
cout << *(p + 2); // 30 (如上图)`} />
        </div>
      </div>
    )
  },
  {
    id: 'ptr-1d-traverse',
    category: '指针 (Pointers)',
    group: '2. 指针与一维数组',
    title: '2.3 进阶：三种遍历方式',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <p className="text-slate-700">现在我们用 3 种不同的写法来遍历同一个数组。</p>

        <div>
           <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
             1. 下标法 (最传统)
           </h4>
           <CodeBlock code={`for (int i = 0; i < 5; ++i) {
    cout << a[i] << " ";
}`} />
        </div>

        <div>
           <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
             2. 指针偏移法 (最常见)
           </h4>
           <p className="text-sm text-slate-600 mb-1">指针 <code>p</code> 不动，通过 <code>i</code> 计算偏移量。</p>
           <CodeBlock code={`int *p = a;
for (int i = 0; i < 5; ++i) {
    cout << *(p + i) << " ";
}`} />
        </div>

        <div>
           <h4 className="font-bold text-indigo-700 mb-2 flex items-center gap-2">
             3. 指针移动法 (最高效)
           </h4>
           <p className="text-sm text-slate-600 mb-1">直接改变指针 <code>p</code> 的指向，像推土机一样往前推。</p>
           <CodeBlock code={`int *p = a;
for (int i = 0; i < 5; ++i) {
    cout << *p << " ";
    p++;  // 指针真的向前走了一步
}`} />
           <div className="mt-2 text-xs bg-slate-100 p-2 rounded text-slate-500">
             注意：循环结束后，p 已经指向数组外面了，不要再解引用它！
           </div>
        </div>
      </div>
    )
  },

  {
    id: 'ptr-array-2d',
    category: '指针 (Pointers)',
    title: '3. 指针与二维数组',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">二维数组在内存中是<strong>线性连续</strong>存储的，并没有真正的“格子”。</p>
        <div className="bg-slate-100 p-3 rounded font-mono text-xs text-slate-600 break-all">
           [0,0] [0,1] [0,2] [1,0] [1,1] [1,2] ... 挨着排
        </div>

        <div className="mt-4">
           <h3 className="text-xl font-bold text-slate-900 mb-4">数组名 vs 行指针 (重点)</h3>
           <p className="text-slate-600 text-sm mb-3">
               假设有 <code>int a[2][3]</code>，这里的类型关系非常重要：
           </p>
           
           <ul className="space-y-4">
               <li className="bg-white border-l-4 border-indigo-500 p-4 shadow-sm">
                   <div className="flex items-center gap-2 mb-1">
                       <code className="bg-slate-100 px-2 rounded font-bold">a</code>
                       <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">int (*)[3]</span>
                   </div>
                   <p className="text-sm text-slate-700">
                       指向<strong>第 0 行</strong>（这一行是个包含3个int的数组）。<br/>
                       <code>a + 1</code> 会跳过整整一行（3个int）。
                   </p>
               </li>
               
               <li className="bg-white border-l-4 border-emerald-500 p-4 shadow-sm">
                   <div className="flex items-center gap-2 mb-1">
                       <code className="bg-slate-100 px-2 rounded font-bold">a[0]</code>
                       <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">int *</span>
                   </div>
                   <p className="text-sm text-slate-700">
                       指向<strong>第 0 行的首元素</strong>。<br/>
                       <code>a[0] + 1</code> 只跳过一个 int。
                   </p>
               </li>
           </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
           <h3 className="text-xl font-bold text-slate-900 mb-2">简单指针访问法</h3>
           <p className="text-sm text-slate-600 mb-2">如果你只用一个普通的 <code>int *p</code> 指向开头，就可以像遍历一维数组一样遍历它。</p>
           <CodeBlock code={`int a[2][3] = { {1,2,3}, {4,5,6} };

int *p = a[0];  // 指向开头 (1)

// 因为内存连续，可以一直加
cout << *(p + 3); // 输出 4 (第二行第一个)`} />
        </div>
      </div>
    )
  },
  {
    id: 'ptr-advanced',
    category: '指针 (Pointers)',
    title: '4. 指针数组与行指针',
    type: 'lesson',
    content: (
      <div className="space-y-8">
        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">4.1 指针数组 (Array of Pointers)</h3>
           <p className="text-slate-700 mb-2">
               本质是<strong>数组</strong>，只是每个格子里装的是<strong>地址</strong>。
           </p>
           <CodeBlock code={`int a=10, b=20, c=30;
int *arr[3]; // 定义一个数组，里面存 3 个 int*

arr[0] = &a;
arr[1] = &b;
arr[2] = &c;

cout << *arr[0]; // 10`} />
           <p className="text-sm text-slate-600 mt-2">常用于存储 C 风格字符串列表：<code>{`const char *strs[3] = {"C++", "is", "cool"};`}</code></p>
        </div>

        <div className="border-t border-slate-200 pt-6">
           <h3 className="text-xl font-bold text-slate-900 mb-2">4.2 数组指针 / 行指针 (Pointer to Array)</h3>
           <p className="text-slate-700 mb-2">
               本质是<strong>指针</strong>，它专门用来指向<strong>“一行”</strong>（定长数组）。
           </p>
           <CodeBlock code={`int a[2][3] = { {1,2,3}, {4,5,6} };

// p 是一个指针，指向“包含3个int的数组”
int (*p)[3] = a; 

// 遍历
for(int i=0; i<2; ++i) {
    for(int j=0; j<3; ++j) {
        cout << *(*(p+i)+j) << " "; // 等价于 p[i][j]
    }
}`} />
           <div className="bg-amber-50 p-4 border-l-4 border-amber-400 mt-4 text-sm text-amber-900">
               <strong>看括号识类型：</strong>
               <ul className="list-disc list-inside mt-2 ml-2 font-mono">
                   <li><code>int *p[3]</code>  → [] 优先级高 → 是数组 (存指针)</li>
                   <li><code>int (*p)[3]</code> → () 优先级高 → 是指针 (指数组)</li>
               </ul>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'ptr-func',
    category: '指针 (Pointers)',
    title: '5. 指针与函数',
    type: 'lesson',
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
            这是指针在工程中最常用的场景：<strong>在函数里修改外面的数据</strong>，或者传递大数组（避免拷贝）。
        </p>

        <div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">5.1 修改实参 (Swap 例子)</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded border border-red-100">
                 <h4 className="font-bold text-red-800 text-sm mb-2">❌ 传值 (Copy)</h4>
                 <CodeBlock code={`void swap(int x, int y) {
    int t=x; x=y; y=t;
}
// 只有函数里的 x,y 变了
// 外面的变量没变`} />
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-100">
                 <h4 className="font-bold text-green-800 text-sm mb-2">✅ 传地址 (Pointer)</h4>
                 <CodeBlock code={`void swap(int *x, int *y) {
    int t=*x; *x=*y; *y=t;
}
// 调用: swap(&a, &b)
// 直接修改内存中的值`} />
              </div>
           </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
           <h3 className="text-xl font-bold text-slate-900 mb-2">5.2 传递数组</h3>
           <p className="text-slate-700 mb-2">
               传递数组时，函数参数写 <code>int *p</code> 或 <code>int p[]</code> 是一样的，它们都会退化成指针。
           </p>
           <CodeBlock code={`void printArray(int *p, int n) {
    for(int i=0; i<n; ++i)
        cout << p[i] << " ";
}

int main() {
    int a[5] = {1,2,3,4,5};
    printArray(a, 5); // 传首地址 + 长度
}`} />
        </div>
      </div>
    )
  },
  {
    id: 'ex-ptr-basic',
    category: '指针 (Pointers)',
    title: '练习 1: 基础操作',
    type: 'exercise',
    exerciseData: {
      title: '使用指针修改变量',
      description: `1. 定义一个整型变量 a = 10;
2. 定义一个指针 p 指向 a;
3. 通过指针 p 将 a 的值修改为 20;
4. 输出 a 的值 (应该是 20)。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    
    // 1. 定义指针 p 指向 a
    
    // 2. 通过 p 修改 a 的值为 20
    
    
    cout << "a = " << a << endl;
    return 0;
}`,
      hints: [
        "定义指针: int *p = &a;",
        "解引用修改: *p = 20;"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10;
    
    // 1. 定义指针 p 指向 a
    int *p = &a;
    
    // 2. 通过 p 修改 a 的值为 20
    *p = 20;
    
    cout << "a = " << a << endl; // 输出 20
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-array',
    category: '指针 (Pointers)',
    title: '练习 2: 指针遍历数组',
    type: 'exercise',
    exerciseData: {
      title: '仅用指针运算求和',
      description: `定义 int a[5] = {1, 2, 3, 4, 5};
要求：
1. 定义一个指针 p 指向数组首地址。
2. 使用 for 循环遍历。
3. 在循环中 **禁止使用 a[i]**，只能使用指针加减法 (如 *(p+i)) 来获取值并累加。
4. 输出总和。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    int sum = 0;
    
    // 定义指针
    
    for (int i = 0; i < 5; ++i) {
        // 使用指针运算累加 sum
        
    }
    
    cout << "Sum = " << sum << endl;
    return 0;
}`,
      hints: [
        "int *p = a;",
        "sum += *(p + i);"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    int *p = a;
    int sum = 0;
    
    for (int i = 0; i < 5; ++i) {
        sum += *(p + i);
    }
    
    cout << "Sum = " << sum << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-swap',
    category: '指针 (Pointers)',
    title: '练习 3: 交换函数',
    type: 'exercise',
    exerciseData: {
      title: '实现 swap 函数',
      description: `编写一个函数 void mySwap(int *x, int *y);
功能：交换两个整数的值。

在 main 函数中：
1. 定义 a = 100, b = 200;
2. 调用 mySwap 交换它们;
3. 输出结果。`,
      initialCode: `#include <iostream>
using namespace std;

// 在这里实现 mySwap 函数
// void mySwap(...) { ... }

int main() {
    int a = 100;
    int b = 200;
    
    cout << "Before: a=" << a << ", b=" << b << endl;
    
    // 调用函数
    
    
    cout << "After:  a=" << a << ", b=" << b << endl;
    return 0;
}`,
      hints: [
        "函数参数要是 int *",
        "函数内部要用临时变量 int temp = *x;",
        "调用时记得传地址: mySwap(&a, &b);"
      ],
      solutionCode: `#include <iostream>
using namespace std;

void mySwap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 100;
    int b = 200;
    
    cout << "Before: a=" << a << ", b=" << b << endl;
    
    mySwap(&a, &b);
    
    cout << "After:  a=" << a << ", b=" << b << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-ptr-row',
    category: '指针 (Pointers)',
    title: '练习 4: 行指针遍历',
    type: 'exercise',
    exerciseData: {
      title: '使用行指针遍历二维数组',
      description: `int a[2][3] = { {1,2,3}, {4,5,6} };
要求：
1. 定义一个行指针 int (*p)[3] 指向数组 a。
2. 使用两层循环，通过 p 来访问并打印所有元素。
3. 访问方式可以使用 p[i][j] 或者 *(*(p+i)+j)。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[2][3] = { {1,2,3}, {4,5,6} };
    
    // 定义行指针 p
    
    
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            // 输出 p 指向的元素
            
        }
        cout << endl;
    }
    
    return 0;
}`,
      hints: [
        "int (*p)[3] = a;",
        "cout << p[i][j] << ' ';"
      ],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[2][3] = { {1,2,3}, {4,5,6} };
    
    // p 是指向“长度为3的数组”的指针
    int (*p)[3] = a;
    
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 3; ++j) {
            // 写法 1: 比较直观
            cout << p[i][j] << " ";
            
            // 写法 2: 纯指针运算 (供参考)
            // cout << *(*(p+i)+j) << " ";
        }
        cout << endl;
    }
    
    return 0;
}`
    }
  }
];