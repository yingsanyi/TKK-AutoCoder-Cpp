import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3844 [GESP样题 二级] 画正方形

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1102>

## 题目描述

输入一个正整数 $n$，要求输出一个 $n$ 行 $n$ 列的正方形图案（参考样例输入输出）。图案由大写字母组成。

其中，第 $1$ 行以大写字母 $\\texttt A$ 开头，第 $2$ 行以大写字母 $\\texttt B$ 开头，以此类推；在每行中，第 $2$ 列为第 $1$ 列的下一个字母，第 $3$ 列为第 $2$ 列的下一个字母，以此类推；特别的，规定大写字母 $\\texttt Z$ 的下一个字母为大写字母 $\\texttt A$。

## 输入格式

输入一行，包含一个正整数 $n$。约定 $2 \\le n \\le 40$。

## 输出格式

输出符合要求的正方形图案。

## 输入输出样例 #1

### 输入 #1

\`\`\`
3
\`\`\`

### 输出 #1

\`\`\`
ABC
BCD
CDE
\`\`\`

## 输入输出样例 #2

### 输入 #2

\`\`\`
5
\`\`\`

### 输出 #2

\`\`\`
ABCDE
BCDEF
CDEFG
DEFGH
EFGHI
\`\`\`


# B3844 画正方形

## 解题思路

观察规律：第 $i$ 行第 $j$ 列的字母，是从 \`A\` 开始偏移了 $(i + j)$ 个位置（$i, j$ 均从 $0$ 开始），并对 $26$ 取模以实现 \`Z\` → \`A\` 的循环：

$$\\text{字符} = \\texttt{'A'} + (i + j) \\bmod 26$$

以样例1（$n=3$）验证：

| | $j=0$ | $j=1$ | $j=2$ |
|:---:|:---:|:---:|:---:|
| $i=0$ | $(0+0)\\%26=0$ → \`A\` | $(0+1)\\%26=1$ → \`B\` | $(0+2)\\%26=2$ → \`C\` |
| $i=1$ | $(1+0)\\%26=1$ → \`B\` | $(1+1)\\%26=2$ → \`C\` | $(1+2)\\%26=3$ → \`D\` |
| $i=2$ | $(2+0)\\%26=2$ → \`C\` | $(2+1)\\%26=3$ → \`D\` | $(2+2)\\%26=4$ → \`E\` |

---

## 完整代码

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << static_cast<char>('A' + (i + j) % 26);
        }
        cout << '\\n';
    }

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| \`(i + j) % 26\` | 计算偏移量，对 26 取模实现 \`Z\` 后回到 \`A\` 的循环 |
| \`'A' + ...\` | 利用字符的 ASCII 值做偏移，\`'A'\` 的 ASCII 为 65 |
| \`static_cast<char>(...)\` | 将整数显式转换为字符，符合 C++ 类型规范 |
| \`cout << '\\n'\` | 每行结束后换行 |

---

## 样例验证

**样例2：** $n=5$，偏移超过 26 的情况（$i+j$ 最大为 $4+4=8$，未超过 26，不触发循环）

若 $n=40$，最大偏移为 $39+39=78$，$78 \\bmod 26 = 0$，回到 \`A\`，循环机制正常工作 ✅

**极端验证：** $n=40$ 时第 40 行第 40 列：

$$( 39 + 39 ) \\bmod 26 = 78 \\bmod 26 = 0 \\rightarrow \\texttt{A} \\checkmark$$
`;

export const luoguGespB3844Section: Section = {
  id: 'luogu-gesp-b3844',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3844 [GESP样题 二级] 画正方形',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
