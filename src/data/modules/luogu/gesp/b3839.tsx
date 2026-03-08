import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3839 [GESP202306 一级] 累计相加

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1123>

## 题目描述

输入一个正整数 $n$，求形如：

$1+(1+2)+(1+2+3)+(1+2+3+4)+ \\cdots  +(1+2+3+4+5+ \\cdots  +n)$ 的累计相加。

## 输入格式

输入一个正整数 $n$。约定 $1<n \\le 100$。

## 输出格式

输出累计相加的结果。

## 输入输出样例 #1

### 输入 #1

\`\`\`
3
\`\`\`

### 输出 #1

\`\`\`
10
\`\`\`

## 输入输出样例 #2

### 输入 #2

\`\`\`
4
\`\`\`

### 输出 #2

\`\`\`
20
\`\`\`

## 输入输出样例 #3

### 输入 #3

\`\`\`
10
\`\`\`

### 输出 #3

\`\`\`
220
\`\`\`


# B3839 累计相加

## 解题思路

观察表达式结构：

$$S = \\sum_{i=1}^{n} \\left(\\sum_{j=1}^{i} j\\right) = \\sum_{i=1}^{n} \\frac{i(i+1)}{2}$$

其中每一项 $\\displaystyle\\sum_{j=1}^{i} j = \\frac{i(i+1)}{2}$ 是前 $i$ 项的三角数。

有两种实现方式：

| 方式 | 思路 |
|---|---|
| **双层循环** | 外层枚举 $i$，内层累加 $1 \\sim i$，直观易懂 |
| **公式化简** | 直接用 $\\dfrac{i(i+1)}{2}$ 计算每项，一层循环 |

---

## 完整代码

### 方式一：双层循环（直观）

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int total = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            total += j;          // 累加每个括号内的值
        }
    }

    cout << total << endl;

    return 0;
}
\`\`\`

### 方式二：公式优化（一层循环）

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int total = 0;
    for (int i = 1; i <= n; i++) {
        total += i * (i + 1) / 2;   // 第 i 项 = 前 i 个自然数之和
    }

    cout << total << endl;

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| 外层 \`i\` 从 1 到 \`n\` | 枚举每个括号，第 $i$ 个括号内有 $i$ 项 |
| 内层 \`j\` 从 1 到 \`i\` | 累加括号内 $1+2+\\cdots+i$ |
| \`i * (i + 1) / 2\` | 等差数列求和公式，先乘后整除不会丢精度（$i(i+1)$ 必为偶数）|

> 💡 $i(i+1)$ 是两个相邻整数之积，其中必有一个偶数，所以 \`i * (i + 1) / 2\` **整除结果精确**，不存在截断问题。

---

## 样例验证

**样例1：** $n=3$

$$\\underbrace{1}_{i=1} + \\underbrace{(1+2)}_{i=2} + \\underbrace{(1+2+3)}_{i=3} = 1 + 3 + 6 = \\mathbf{10} \\checkmark$$

**样例2：** $n=4$

$$1 + 3 + 6 + 10 = \\mathbf{20} \\checkmark$$

**样例3：** $n=10$

$$\\sum_{i=1}^{10} \\frac{i(i+1)}{2} = 1+3+6+10+15+21+28+36+45+55 = \\mathbf{220} \\checkmark$$

---

## 进阶：纯公式推导（无循环）

对整个求和式进一步化简：

$$S = \\sum_{i=1}^{n} \\frac{i(i+1)}{2} = \\frac{1}{2}\\sum_{i=1}^{n}(i^2+i) = \\frac{1}{2}\\left(\\frac{n(n+1)(2n+1)}{6} + \\frac{n(n+1)}{2}\\right)$$

整理得：

$$\\boxed{S = \\frac{n(n+1)(n+2)}{6}}$$

验证：$n=10$ 时，$S = \\dfrac{10 \\times 11 \\times 12}{6} = \\dfrac{1320}{6} = 220$ ✅
`;

export const luoguGespB3839Section: Section = {
  id: 'luogu-gesp-b3839',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3839 [GESP202306 一级] 累计相加',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
