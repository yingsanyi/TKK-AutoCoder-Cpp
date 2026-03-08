import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3846 [GESP样题 一级] 闰年求和

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1101>

## 题目描述

小明刚刚学习了如何判断平年和闰年，他想知道两个年份之间（**不包含起始年份和终止年份**）的闰年年份具体数字之和。你能帮帮他吗？

## 输入格式

输入一行，包含两个整数，分别表示起始年份和终止年份。约定年份在 $1$ 到 $2022$ 之间。

## 输出格式

输出一行，包含一个整数，表示闰年年份具体数字之和。

## 输入输出样例 #1

### 输入 #1

\`\`\`
2018 2022
\`\`\`

### 输出 #1

\`\`\`
2020
\`\`\`


# B3846 闰年求和

## 解题思路

两个要点：

**1. 闰年判断规则：**

$$\\text{闰年} \\iff (year \\bmod 4 = 0 \\text{ 且 } year \\bmod 100 \\neq 0) \\text{ 或 } (year \\bmod 400 = 0)$$

**2. 区间范围：** 题目要求**不包含**起始和终止年份，即枚举范围为 $(start, end)$ 开区间。

---

## 完整代码

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int start, end;
    cin >> start >> end;

    int sum = 0;

    for (int year = start + 1; year < end; year++) {   // 开区间，不含两端
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            sum += year;
        }
    }

    cout << sum << endl;

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| \`year = start + 1\` | 不含起始年份，从下一年开始枚举 |
| \`year < end\` | 不含终止年份，严格小于 |
| \`year % 4 == 0 && year % 100 != 0\` | 能被4整除但不能被100整除：普通闰年 |
| \`|| year % 400 == 0\` | 能被400整除：世纪闰年 |
| \`sum += year\` | 累加闰年的**年份数值**本身 |

---

## 闰年规则速记

\`\`\`
能被 400 整除  →  闰年  ✅  （如 2000）
能被 100 整除  →  平年  ❌  （如 1900）
能被   4 整除  →  闰年  ✅  （如 2024）
其他           →  平年  ❌
\`\`\`

---

## 样例验证

**样例：** 输入 \`2018 2022\`，枚举范围为 $2019, 2020, 2021$

| 年份 | 判断 | 结果 |
|:---:|:---:|:---:|
| 2019 | $2019 \\bmod 4 = 3 \\neq 0$ | 平年 ❌ |
| 2020 | $2020 \\bmod 4 = 0$ 且 $2020 \\bmod 100 \\neq 0$ | 闰年 ✅ |
| 2021 | $2021 \\bmod 4 = 1 \\neq 0$ | 平年 ❌ |

$$\\text{sum} = 2020$$

输出 **2020** ✅
`;

export const luoguGespB3846Section: Section = {
  id: 'luogu-gesp-b3846',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3846 [GESP样题 一级] 闰年求和',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
