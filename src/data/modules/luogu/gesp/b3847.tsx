import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3847 [GESP样题 一级] 当天的第几秒

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1101>

## 题目描述

小明刚刚学习了小时、分和秒的换算关系。他想知道一个给定的时刻是这一天的第几秒，你能编写一个程序帮帮他吗？

## 输入格式

输入一行，包含三个整数和一个字符。三个整数分别表示时刻的时、分、秒；字符有两种取值，大写字母 \`A\` 表示上午，大写字母 \`P\` 表示下午。

## 输出格式

输出一行，包含一个整数，表示输入时刻是当天的第几秒。

## 输入输出样例 #1

### 输入 #1

\`\`\`
0 0 0 A
\`\`\`

### 输出 #1

\`\`\`
0
\`\`\`

## 输入输出样例 #2

### 输入 #2

\`\`\`
11 59 59 P
\`\`\`

### 输出 #2

\`\`\`
86399
\`\`\`


# B3847 当天的第几秒

## 解题思路

先理解 \`A\`/\`P\` 对小时的影响（**12小时制转24小时制**）：

| 输入 | 含义 | 转换规则 |
|:---:|:---:|:---:|
| \`A\`（上午） | 0:00 ~ 11:59 | 小时不变 |
| \`P\`（下午） | 12:00 ~ 23:59 | 小时 $+12$ |

转换后按公式计算：

$$\\text{答案} = h \\times 3600 + m \\times 60 + s$$

---

## 完整代码

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int h, m, s;
    char c;
    cin >> h >> m >> s >> c;

    if (c == 'P') {
        h += 12;    // 下午：小时加 12
    }

    cout << h * 3600 + m * 60 + s << endl;

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| \`char c\` | 读取 \`A\` 或 \`P\` 字符 |
| \`if (c == 'P') h += 12\` | 下午则小时加12，转为24小时制 |
| \`h * 3600 + m * 60 + s\` | 换算为总秒数：1小时=3600秒，1分=60秒 |

---

## 样例验证

**样例1：** 输入 \`0 0 0 A\`

- 上午，小时不变，$h=0$
- $0 \\times 3600 + 0 \\times 60 + 0 = \\mathbf{0}$ ✅

**样例2：** 输入 \`11 59 59 P\`

- 下午，$h = 11 + 12 = 23$
- $23 \\times 3600 + 59 \\times 60 + 59 = 82800 + 3540 + 59 = \\mathbf{86399}$ ✅

> 💡 一天共 $24 \\times 3600 = 86400$ 秒，最后一秒编号为 $86399$，与样例2吻合。
`;

export const luoguGespB3847Section: Section = {
  id: 'luogu-gesp-b3847',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3847 [GESP样题 一级] 当天的第几秒',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
