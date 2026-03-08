import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3838 [GESP202306 一级] 时间规划

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1123>

## 题目描述

小明在为自己规划学习时间。现在他想知道两个时刻之间有多少分钟，你能通过编程帮他做到吗？

## 输入格式

输入 $4$ 行，第一行为开始时刻的小时，第二行为开始时刻的分钟，第三行为结束时刻的小时，第四行为结束时刻的分钟。输入保证两个时刻是同一天，开始时刻一定在结束时刻之前。时刻使用 $24$ 小时制，即小时在 $0$ 到 $23$ 之间，分钟在 $0$ 到 $59$ 之间。

## 输出格式

输出一行，包含一个整数，从开始时刻到结束时刻之间有多少分钟。

## 输入输出样例 #1

### 输入 #1

\`\`\`
9
5
9
6
\`\`\`

### 输出 #1

\`\`\`
1
\`\`\`

## 输入输出样例 #2

### 输入 #2

\`\`\`
9
5
10
0
\`\`\`

### 输出 #2

\`\`\`
55
\`\`\`


# B3838 时间规划

## 解题思路

将两个时刻都换算成**从 0 时 0 分起的总分钟数**，相减即得结果：

$$\\text{答案} = (h_2 \\times 60 + m_2) - (h_1 \\times 60 + m_1)$$

---

## 完整代码

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int h1, m1, h2, m2;
    cin >> h1 >> m1 >> h2 >> m2;

    int start  = h1 * 60 + m1;
    int finish = h2 * 60 + m2;

    cout << finish - start << endl;

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| \`h1 * 60 + m1\` | 将开始时刻换算为从 0:00 起的总分钟数 |
| \`h2 * 60 + m2\` | 将结束时刻换算为从 0:00 起的总分钟数 |
| \`finish - start\` | 两者相减即为间隔分钟数 |

> 题目已保证开始时刻严格早于结束时刻，且在同一天内，因此结果一定为**正整数**，无需额外判断。

---

## 样例验证

**样例1：** 输入 \`9 5 9 6\`

$$9 \\times 60 + 6 - (9 \\times 60 + 5) = 546 - 545 = \\mathbf{1} \\checkmark$$

**样例2：** 输入 \`9 5 10 0\`

$$10 \\times 60 + 0 - (9 \\times 60 + 5) = 600 - 545 = \\mathbf{55} \\checkmark$$
`;

export const luoguGespB3838Section: Section = {
  id: 'luogu-gesp-b3838',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3838 [GESP202306 一级] 时间规划',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
