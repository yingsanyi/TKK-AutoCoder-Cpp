import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';
import { LoopTraceVisual, TraceStep } from '../../../../components/Lesson/LoopTraceVisual';
import { Monitor, Terminal, Layout, Code2, BookOpen, Calculator, Database } from 'lucide-react';

// --- Visual Components ---

const KnowledgeBlockCard = ({ icon: Icon, title, items, colorClass }: { icon: any, title: string, items: string[], colorClass: string }) => (
  <div className={`p-4 rounded-xl border ${colorClass} bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg ${colorClass.replace('border', 'bg').replace('200', '100')} text-slate-700 dark:text-slate-200`}>
        <Icon size={20} />
      </div>
      <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
    </div>
    <ul className="space-y-1.5">
      {items.map((item, idx) => (
        <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
          <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- Data for Interactive Examples ---

const loopSumCode = `int n = 3, sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;
}
cout << sum;`;

const loopSumSteps: TraceStep[] = [
  { step: 0, line: 1, variables: { n: 3, sum: 0, i: '?' }, desc: '初始化变量 n=3, sum=0' },
  { step: 1, line: 2, variables: { n: 3, sum: 0, i: 1 }, desc: '循环开始：初始化 i=1，判断 1<=3 (成立)' },
  { step: 2, line: 3, variables: { n: 3, sum: 1, i: 1 }, desc: '执行累加：sum = 0 + 1 = 1' },
  { step: 3, line: 2, variables: { n: 3, sum: 1, i: 2 }, desc: 'i自增变为2，判断 2<=3 (成立)' },
  { step: 4, line: 3, variables: { n: 3, sum: 3, i: 2 }, desc: '执行累加：sum = 1 + 2 = 3' },
  { step: 5, line: 2, variables: { n: 3, sum: 3, i: 3 }, desc: 'i自增变为3，判断 3<=3 (成立)' },
  { step: 6, line: 3, variables: { n: 3, sum: 6, i: 3 }, desc: '执行累加：sum = 3 + 3 = 6' },
  { step: 7, line: 2, variables: { n: 3, sum: 6, i: 4 }, desc: 'i自增变为4，判断 4<=3 (不成立) -> 退出' },
  { step: 8, line: 5, variables: { n: 3, sum: 6, i: 4 }, desc: '输出最终结果', output: '6' },
];

const oddEvenCode = `int n = 5;
if (n % 2 == 0) {
    cout << "偶数";
} else {
    cout << "奇数";
}`;

const oddEvenSteps: TraceStep[] = [
  { step: 0, line: 1, variables: { n: 5 }, desc: '初始化 n = 5' },
  { step: 1, line: 2, variables: { n: 5 }, desc: '判断 5 % 2 == 0 ? (1 == 0 False)' },
  { step: 2, line: 4, variables: { n: 5 }, desc: '条件为假，跳转到 else' },
  { step: 3, line: 5, variables: { n: 5 }, desc: '执行 else 分支输出', output: '奇数' },
];

// --- Content Parts ---

const introMd = `# C++ 编程一级考试标准

## 一、考试题型与分值

| 题型 | 题数 | 每题分值 | 小计 |
|:---:|:---:|:---:|:---:|
| 单选题 | 15 道 | 2 分 | 30 分 |
| 判断题 | 10 道 | 2 分 | 20 分 |
| 编程题 | 2 道 | 25 分 | 50 分 |
| **合计** | **27 道** | — | **100 分** |

> 🕐 考试时间：**120 分钟**

---

## 二、知识块总览
`;

const knowledgeDetailMd1 = `
---

## 三、知识点详述

### 📌 1. 计算机基础知识

- 计算机的基本构成：**CPU、内存、I/O 设备**等硬件组成
- 了解 **Windows、Linux** 等操作系统的基本概念与常见操作
- 了解计算机的**发展历程**及在现代社会中的常见应用

### 📌 2. 集成开发环境（如 Dev C++）

- 创建文件、编辑文件、保存文件
- 编译、解释、调试程序

### 📌 3. 结构化程序设计

| 结构 | 说明 |
|:---:|---|
| **顺序结构** | 语句按书写顺序依次执行 |
| **分支结构** | 根据条件选择不同执行路径 |
| **循环结构** | 重复执行某段代码直到条件不满足 |

### 📌 4. 程序的基本语句

**输入输出语句：**

\`\`\`cpp
cin >> a;           // 标准输入
cout << a;          // 标准输出
scanf("%d", &a);    // C 风格输入
printf("%d", a);    // C 风格输出
\`\`\`

**控制语句：**

\`\`\`cpp
// 分支
if (...) { } else { }
switch (...) { case ...: break; }

// 循环
for (int i = 0; i < n; i++) { }
while (...) { }
do { } while (...);

// 循环控制
continue;   // 跳过本次循环
break;      // 跳出循环
\`\`\`
`;

const knowledgeDetailMd2 = `
### 📌 5. 程序的基本概念

| 概念 | 说明 |
|---|---|
| **标识符** | 变量/函数名，由字母/数字/下划线组成，**数字不能开头** |
| **关键字** | 系统保留词 (int, if, return...)，不可作标识符 |
| **常量** | 值不变的量 (3.14, 'A') |
| **变量** | 值可变的量，需定义后使用 |
| **表达式** | 操作数+运算符，计算出一个值 |

### 📌 6. 基本运算

**算术运算：** \`+\`, \`-\`, \`*\`, \`/\` (整除), \`%\` (求余)
**关系运算：** \`>\`, \`>=\`, \`<\`, \`<=\`, \`==\` (等于), \`!=\` (不等于)
**逻辑运算：** \`&&\` (与), \`||\` (或), \`!\` (非)

### 📌 7. 基本数据类型

| 类型 | 说明 | 范围/精度 |
|:---:|---|---|
| \`int\` | 整数 | $\\approx \\pm 2.1 \\times 10^9$ |
| \`long long\` | 长整数 | $\\approx \\pm 9 \\times 10^{18}$ |
| \`float\` | 单精度 | 6-7位有效数字 |
| \`double\` | 双精度 | 15-16位有效数字 |
| \`char\` | 字符 | 单个字符 (ASCII) |
| \`bool\` | 布尔 | true / false |

---

## 四、综合编程题示例与互动演示
`;

const exampleMd = `
### 示例一：分支结构（奇偶判断）
输入一个整数，判断是奇数还是偶数。
`;

const exampleMd2 = `
### 示例二：循环结构（累加求和）
计算 $1 + 2 + 3 + \\dots + n$ 的和。
`;

const summaryMd = `
---

## 五、常见易错点总结

| 易错点 | 错误写法 | 正确写法 |
|---|:---:|:---:|
| 赋值与相等混淆 | \`if (a = 5)\` | \`if (a == 5)\` |
| 整数除法丢精度 | \`1 / 2\` → \`0\` | \`1.0 / 2\` → \`0.5\` |
| switch 漏 break | 穿透执行 | 每个 case 加 \`break\` |
| scanf 漏取地址 | \`scanf("%d", a)\` | \`scanf("%d", &a)\` |
| 变量未初始化 | \`int a; cout << a;\` | \`int a = 0; cout << a;\` |
`;

export const luoguGespLevel1Section: Section = {
  id: 'luogu-gesp-level1',
  category: '洛谷习题解析',
  group: 'GESP',
  title: '1. GESP 一级考试标准与大纲',
  type: 'lesson',
  content: (
    <div className="space-y-8">
      {/* 1. Header & Intro */}
      <MarkdownRenderer content={introMd} />

      {/* 2. Visual Knowledge Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KnowledgeBlockCard 
          icon={Monitor} 
          title="1. 计算机基础" 
          colorClass="border-blue-200"
          items={['硬件组成 (CPU/内存)', '操作系统 (Win/Linux)', '发展历程']}
        />
        <KnowledgeBlockCard 
          icon={Terminal} 
          title="2. 集成开发环境" 
          colorClass="border-indigo-200"
          items={['Dev C++ 使用', '文件操作', '编译与调试']}
        />
        <KnowledgeBlockCard 
          icon={Layout} 
          title="3. 结构化设计" 
          colorClass="border-purple-200"
          items={['顺序结构', '分支结构', '循环结构']}
        />
        <KnowledgeBlockCard 
          icon={Code2} 
          title="4. 基本语句" 
          colorClass="border-pink-200"
          items={['cin/cout', 'if/switch', 'for/while']}
        />
        <KnowledgeBlockCard 
          icon={BookOpen} 
          title="5. 基本概念" 
          colorClass="border-rose-200"
          items={['标识符/关键字', '常量/变量', '表达式/注释']}
        />
        <KnowledgeBlockCard 
          icon={Calculator} 
          title="6. 基本运算" 
          colorClass="border-orange-200"
          items={['算术 (+ - * / %)', '关系 (> < ==)', '逻辑 (&& || !)']}
        />
        <KnowledgeBlockCard 
          icon={Database} 
          title="7. 数据类型" 
          colorClass="border-emerald-200"
          items={['int / long long', 'float / double', 'char / bool']}
        />
      </div>

      {/* 3. Detailed Knowledge */}
      <MarkdownRenderer content={knowledgeDetailMd1} />
      <MarkdownRenderer content={knowledgeDetailMd2} />

      {/* 4. Interactive Examples */}
      <MarkdownRenderer content={exampleMd} />
      <LoopTraceVisual 
        title="奇偶判断执行追踪" 
        code={oddEvenCode} 
        steps={oddEvenSteps} 
      />

      <MarkdownRenderer content={exampleMd2} />
      <LoopTraceVisual 
        title="累加求和循环追踪 (n=3)" 
        code={loopSumCode} 
        steps={loopSumSteps} 
      />

      {/* 5. Summary */}
      <MarkdownRenderer content={summaryMd} />
    </div>
  )
};
