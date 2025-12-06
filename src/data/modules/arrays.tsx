import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';

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

export const arraysSections: Section[] = [
  // ... Lessons (No Group) ...
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

int x = a[0][1];  // 取第 0 行第 1 列 → (2)
int y = a[1][2];  // 取第 1 行第 2 列 → (6)`} />
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
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-slate-800 font-bold text-lg mb-4">
                    2. 定义时省略维度
                </h3>
                <p className="text-slate-600 mb-2">
                    可以偷懒不写行数，但<strong>绝对不能</strong>不写列数。
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

  // ==========================================
  // Group: Classroom Exercises
  // ==========================================
  {
    id: 'ex1',
    category: '二维数组',
    group: '课堂练习',
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
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

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
    group: '课堂练习',
    title: '练习 2: 求和',
    type: 'exercise',
    exerciseData: {
      title: '计算所有元素的总和',
      description: `1. 定义一个 2 行 4 列 的数组，内容为：
   1  3  5  7
   2  4  6  8
2. 用两层 for 循环把所有元素加起来，输出总和。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[2][4] = {
        {1, 3, 5, 7},
        {2, 4, 6, 8}
    };
    int sum = 0;
    
    // 请补全循环求和逻辑
    
    cout << "Sum = " << sum << endl;
    return 0;
}`,
      hints: ["sum += a[i][j];"],
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
    group: '课堂练习',
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
    
    int maxVal = a[0][0];
    int maxRow = 0;
    int maxCol = 0;
    
    // 编写循环进行打擂台比较
    
    cout << "max = " << maxVal << ", row = " << maxRow << ", col = " << maxCol << endl;
    return 0;
}`,
      hints: ["如果 a[i][j] > maxVal，就更新 maxVal, maxRow, maxCol"],
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
    group: '课堂练习',
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
        // 记得在这里清零
        int rowSum = 0;
        
        // 遍历列
        
        cout << "row " << i << " sum = " << rowSum << endl;
    }
    
    return 0;
}`,
      hints: ["rowSum 必须在第一层循环里定义或清零"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {5,  3,  9,  1},
        {7, 11,  2,  8},
        {6, 10,  4, 12}
    };

    for (int i = 0; i < 3; ++i) {
        int rowSum = 0; 
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
  // Group: Unit Test
  // ==========================================
  {
    id: 'quiz-arrays',
    category: '二维数组',
    group: '阶段测试 (Unit Test)',
    title: '第一部分：基础选择题',
    type: 'quiz',
    quizData: {
      title: '二维数组基础测试',
      description: '本测试包含 10 道选择题，主要考察定义、内存布局、访问越界等知识点。',
      questions: [
        {
          id: 1,
          question: '`int a[3][4];` 定义了一个什么样的数组？',
          options: ["3 行 4 列", "4 行 3 列", "3 个元素", "4 个元素", "未知大小"],
          correctAnswer: 0,
          explanation: "第一个方括号是行数，第二个是列数。"
        },
        {
          id: 2,
          question: '二维数组在内存中是如何存放的？',
          options: ["按列存放", "按行连续存放", "随机存放", "链式存放", "网格状结构"],
          correctAnswer: 1,
          explanation: "C++ 二维数组是按行优先（Row-major）连续存储的。"
        },
        {
          id: 3,
          question: '`int a[2][2] = {{1}, {2,3}};` 那么 `a[0][1]` 的值是？',
          options: ["1", "2", "3", "0", "垃圾值"],
          correctAnswer: 3,
          explanation: "第一行只给了 `{1}`，剩下的元素自动补 0。"
        },
        {
          id: 4,
          question: '`int a[3][4];` 下列哪个下标访问是合法的？',
          options: ["`a[3][0]`", "`a[0][4]`", "`a[2][3]`", "`a[-1][0]`", "`a[0][-1]`"],
          correctAnswer: 2,
          explanation: "行下标范围 0~2，列下标范围 0~3。C 选项合法。"
        },
        {
          id: 5,
          question: '如果 `int` 占 4 字节，`int a[3][4];` 占用多少内存？',
          options: ["12", "24", "48", "64", "16"],
          correctAnswer: 2,
          explanation: "`3 * 4 * 4 = 48` 字节。"
        },
        {
          id: 6,
          question: '下列定义哪个是合法的？',
          options: ["`int a[2][] = {1,2,3,4};`", "`int a[][2] = {1,2,3,4};`", "`int a[][] = {1,2,3,4};`", "`int a[2][2] = {1,2,3,4,5};`", "`int a[0][0];`"],
          correctAnswer: 1,
          explanation: "初始化时可以省略行数，但必须指定列数。"
        },
        {
          id: 7,
          question: '`int a[2][3];` 表达式 `a[1]` 的类型相当于？',
          options: ["`int`", "`int*`", "`int**`", "`int[2]`", "`void*`"],
          correctAnswer: 1,
          explanation: "`a[1]` 是第 1 行的首地址，退化为 `int*`。"
        },
        {
          id: 8,
          question: '遍历二维数组时，通常的外层循环变量控制的是？',
          options: ["列下标", "行下标", "总元素个数", "内存地址", "随机"],
          correctAnswer: 1,
          explanation: "习惯上外层循环控制行 (row)，内层控制列 (col)。"
        },
        {
          id: 9,
          question: '`int a[3][3];` `a[1][1]` 的地址和 `a[1][0]` 的地址相差多少个字节（`int`为4字节）？',
          options: ["1", "3", "4", "8", "12"],
          correctAnswer: 2,
          explanation: "相邻的两个 `int` 元素，地址相差 `sizeof(int) = 4`。"
        },
        {
          id: 10,
          question: '全局定义的 `int a[10][10];` 初始值是？',
          options: ["全 0", "全 1", "垃圾值", "不确定", "报错"],
          correctAnswer: 0,
          explanation: "全局变量默认初始化为 0。"
        }
      ]
    }
  },
  {
    id: 'ex-array-prog-1',
    category: '二维数组',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 1 (矩阵转置)',
    type: 'exercise',
    exerciseData: {
      title: '3x3 矩阵转置',
      description: `定义一个 3x3 数组并初始化。
将它的行和列互换（转置）。
例如：
1 2 3      1 4 7
4 5 6  ->  2 5 8
7 8 9      3 6 9
提示：只需要交换 a[i][j] 和 a[j][i]，注意循环范围。`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    // 转置逻辑
    // 提示：for (int i = 0; i < 3; ++i)
    //         for (int j = i + 1; j < 3; ++j)
    //             swap(a[i][j], a[j][i]);
    
    // 打印结果
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}`,
      hints: ["内层循环 j 从 i+1 开始，避免重复交换变回原样"],
      solutionCode: `#include <iostream>
#include <algorithm> // for swap
using namespace std;

int main() {
    int a[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int i = 0; i < 3; ++i) {
        for (int j = i + 1; j < 3; ++j) {
            swap(a[i][j], a[j][i]);
        }
    }

    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'ex-array-prog-2',
    category: '二维数组',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 2 (对角线之和)',
    type: 'exercise',
    exerciseData: {
      title: '主对角线元素之和',
      description: `给定一个 4x4 的整数矩阵，计算主对角线（从左上到右下）上所有元素的和。
即计算 a[0][0] + a[1][1] + ...`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[4][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 1, 2, 3},
        {4, 5, 6, 7}
    };
    
    int sum = 0;
    // 你的代码
    
    cout << "Sum = " << sum << endl;
    return 0;
}`,
      hints: ["只需要一层循环: for(int i=0; i<4; ++i) sum += a[i][i];"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[4][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 1, 2, 3},
        {4, 5, 6, 7}
    };

    int sum = 0;
    for (int i = 0; i < 4; ++i) {
        sum += a[i][i];
    }

    cout << "Sum = " << sum << endl;
    return 0;
}`
    }
  },
  {
    id: 'ex-array-prog-3',
    category: '二维数组',
    group: '阶段测试 (Unit Test)',
    title: '第二部分：编程题 3 (最大行元素)',
    type: 'exercise',
    exerciseData: {
      title: '每行的最大值',
      description: `给定一个 3x4 的矩阵，找出每一行的最大值，并依次输出。
例如：
1 5 3 2 -> Max: 5
9 1 1 1 -> Max: 9
2 4 6 8 -> Max: 8`,
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {1, 5, 3, 2},
        {9, 1, 1, 1},
        {2, 4, 6, 8}
    };
    
    for (int i = 0; i < 3; ++i) {
        int maxInRow = a[i][0];
        // 遍历这一行剩下的元素，更新 maxInRow
        
        cout << "Row " << i << " Max: " << maxInRow << endl;
    }
    return 0;
}`,
      hints: ["内层循环 j 从 1 到 3", "if (a[i][j] > maxInRow) maxInRow = a[i][j];"],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[3][4] = {
        {1, 5, 3, 2},
        {9, 1, 1, 1},
        {2, 4, 6, 8}
    };

    for (int i = 0; i < 3; ++i) {
        int maxInRow = a[i][0];
        for (int j = 1; j < 4; ++j) {
            if (a[i][j] > maxInRow) {
                maxInRow = a[i][j];
            }
        }
        cout << "Row " << i << " Max: " << maxInRow << endl;
    }
    return 0;
}`
    }
  }
];