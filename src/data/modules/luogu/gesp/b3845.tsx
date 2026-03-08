import React from 'react';
import { Section } from '../../../../types/index';
import { MarkdownRenderer } from '../../../../components/Common/MarkdownRenderer';

const content = `# B3845 [GESP样题 二级] 勾股数

## 题目背景

对应的选择、判断题：<https://ti.luogu.com.cn/problemset/1102>

## 题目描述

勾股数是很有趣的数学概念。如果三个正整数 $a,b,c$，满足 $a^2+b^2=c^2$，而且 $1 \\le a \\le b \\le c$，我们就将 $a, b, c$ 组成的三元组 $(a,b,c)$ 称为勾股数。你能通过编程，数数有多少组勾股数，能够满足 $c \\le n$ 吗？

## 输入格式

输入一行，包含一个正整数 $n$。约定 $1 \\le n \\le 1000$。

## 输出格式

输出一行，包含一个整数 $C$，表示有 $C$ 组满足条件的勾股数。

## 输入输出样例 #1

### 输入 #1

\`\`\`
5
\`\`\`

### 输出 #1

\`\`\`
1
\`\`\`

## 输入输出样例 #2

### 输入 #2

\`\`\`
13
\`\`\`

### 输出 #2

\`\`\`
3
\`\`\`

## 说明/提示

【样例解释 1】

满足 $c \\leq 5$ 的勾股数只有 $(3,4,5)$ 一组。

【样例解释 2】

满足 $c \\le 13$ 的勾股数有 $3$ 组，即 $(3,4,5)$、$(6,8,10)$ 和 $(5,12,13)$。


# B3845 勾股数

## 解题思路

直接**三层枚举** $a, b, c$，检查是否满足 $a^2 + b^2 = c^2$：

- $a$ 的范围：$1 \\leq a \\leq n$
- $b$ 的范围：$a \\leq b \\leq n$（保证 $a \\leq b$）
- $c$ 的范围：$b \\leq c \\leq n$（保证 $b \\leq c$）

满足 $a^2 + b^2 = c^2$ 则计数加一。

---

## 完整代码

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int count = 0;

    for (int a = 1; a <= n; a++) {
        for (int b = a; b <= n; b++) {
            for (int c = b; c <= n; c++) {
                if (a * a + b * b == c * c) {
                    count++;
                }
            }
        }
    }

    cout << count << endl;

    return 0;
}
\`\`\`

---

## 优化版本：消去第三层循环

已知 $a$ 和 $b$，$c = \\sqrt{a^2 + b^2}$，只需验证 $c$ 是否为整数且 $c \\leq n$：

\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;

    int count = 0;

    for (int a = 1; a <= n; a++) {
        for (int b = a; b <= n; b++) {
            int c2 = a * a + b * b;
            int c  = static_cast<int>(round(sqrt(c2)));  // 四舍五入避免浮点误差
            if (c <= n && c >= b && c * c == c2) {        // 整数验证回代
                count++;
            }
        }
    }

    cout << count << endl;

    return 0;
}
\`\`\`

---

## 代码解析

| 代码片段 | 说明 |
|---|---|
| \`b\` 从 \`a\` 开始 | 保证 $a \\leq b$，避免重复计数 |
| \`c\` 从 \`b\` 开始 | 保证 $b \\leq c$，避免重复计数 |
| \`a * a + b * b == c * c\` | 直接整数运算，无浮点误差 |
| \`round(sqrt(c2))\` | 对浮点开方结果四舍五入，消除浮点误差 |
| \`c * c == c2\` | **回代验证**：确认 $c$ 确实是精确整数解，而非近似值 |

> ⚠️ 使用 \`sqrt\` 时必须配合**回代验证** \`c * c == c2\`，否则浮点误差可能导致错误结果。

---

## 复杂度对比

| 版本 | 时间复杂度 | $n=1000$ 时运算次数 |
|---|---|---|
| 三层循环 | $O(n^3)$ | 约 $1.67 \\times 10^8$，略慢 |
| 优化版本 | $O(n^2)$ | 约 $5 \\times 10^5$，很快 |

> 💡 本题 $n \\leq 1000$，三层循环约 $1.67 \\times 10^8$ 次，可能超时，**推荐使用优化版本**。

---

## 样例验证

**样例1：** $n=5$

| $a$ | $b$ | $c^2=a^2+b^2$ | $c$ | 是否整数且 $\\leq 5$ |
|:---:|:---:|:---:|:---:|:---:|
| 3 | 4 | 25 | 5 | ✅ |

输出 **1** ✅

**样例2：** $n=13$

| $a$ | $b$ | $c^2$ | $c$ | 合法 |
|:---:|:---:|:---:|:---:|:---:|
| 3 | 4 | 25 | 5 | ✅ |
| 5 | 12 | 169 | 13 | ✅ |
| 6 | 8 | 100 | 10 | ✅ |

输出 **3** ✅
`;

export const luoguGespB3845Section: Section = {
  id: 'luogu-gesp-b3845',
  category: '洛谷习题解析',
  group: 'GESP',
  title: 'B3845 [GESP样题 二级] 勾股数',
  type: 'lesson',
  content: <MarkdownRenderer content={content} />
};
