import React from 'react';
import { Section } from '../../../types/index';
import { MarkdownRenderer } from '../../../components/Common/MarkdownRenderer';
import { 
    AnswerRevealer,
    ForEachVisual, 
    FindVisual, 
    CountVisual, 
    CheckVisual, 
    CompareVisual, 
    SearchVisual 
} from '../../../components/Visuals/STL/AlgorithmVisuals';

export const stlAlgorithmNonModifyingSection: Section = {
    id: 'stl-algorithms-non-modifying',
    category: 'C++ STL (标准模板库)',
    group: '4. 算法：非修改 & 修改 & 数值算法',
    title: '4.1 非修改序列算法',
    type: 'lesson',
    content: (
        <div>
            <MarkdownRenderer content={`
# 🎒 非修改序列算法：只读不改的安全魔法

在 STL 的世界中，最基础的操作是读取数据而不修改它。本节我们将探索**非修改序列算法**（Non-modifying Sequence Algorithms）。

这些算法只会**查看**数据，绝对不会**改变**容器中的元素内容。它们非常安全，是你探索数据、统计信息的好帮手。

---

## 🎨 Part 0：本节算法一览表

| 算法名称 | 作用 | 生活比喻 |
|----------|------|----------|
| \`for_each\` | 对每个元素执行操作 | 点名，每个人喊"到" |
| \`find\` / \`find_if\` | 找到第一个符合条件的 | 在书架上找一本书 |
| \`count\` / \`count_if\` | 数数有多少个符合条件 | 数糖果有几颗红色的 |
| \`all_of\` / \`any_of\` / \`none_of\` | 检查是否全部/任意/没有符合条件 | 检查作业是否全交了 |
| \`equal\` | 比较两个序列是否相同 | 对答案 |
| \`mismatch\` | 找出两个序列第一个不同的地方 | 找不同游戏 |
| \`search\` | 在大序列中找小序列 | 在文章中找关键词 |

> ⚠️ **温馨提示**：你可能会在下面的代码里看到 \`[](...){...}\` 这种写法。这叫 **Lambda 表达式**（匿名函数）。我们目前**暂未正式学习**这两个概念，所以现在你只需要把它当成一个“临时的、随手写的小函数”来理解即可。

---

## 1. 遍历魔法：\`for_each\`（点名器）

### 📖 生活场景

上课了，老师要点名。每喊到一个名字，那个同学就要站起来喊"到！"

\`for_each\` 就是这样——它会**依次访问**每一个元素，对每个元素**执行你指定的操作**。
`} />
            <ForEachVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

### 💻 基础用法：打印每个元素

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<string> students = {"小明", "小红", "小刚", "小丽"};
    
    cout << "开始点名：" << endl;
    
    // 咒语：for_each(开始, 结束, 对每个元素要做的事)
    for_each(students.begin(), students.end(), [](const string& name) {
        cout << name << "：到！" << endl;
    });
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
开始点名：
小明：到！
小红：到！
小刚：到！
小丽：到！
\`\`\`

### 💻 进阶用法：统计信息

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78, 95, 88};
    
    int sum = 0;
    int count = 0;
    
    // 用 for_each 计算总分（虽然 accumulate 更适合，但这里演示用法）
    for_each(scores.begin(), scores.end(), [&sum, &count](int score) {
        sum += score;
        count++;
        cout << "第" << count << "个分数: " << score << "，当前总分: " << sum << endl;
    });
    
    cout << "平均分: " << (double)sum / count << endl;
    
    return 0;
}
\`\`\`

### ⚠️ 小提示

虽然 \`for_each\` 可以在 Lambda 里修改外部变量（用 \`&\` 捕获），但它**不会修改数组本身的元素**，所以仍然属于"非修改序列算法"。

---

## 2. 查找魔法：\`find\` 家族（寻宝猎人）

### 📖 生活场景

你的书架上有一排书，你想找到《哈利波特》在哪里。你会从左边开始，一本一本看过去，直到找到为止。
`} />
            <FindVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

---

### 2.1 \`find\`（精确查找）

**🔍 作用：** 找到**第一个**等于指定值的元素。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {10, 25, 30, 25, 40, 25};
    
    // 找数字 25
    auto it = find(numbers.begin(), numbers.end(), 25);
    
    if (it != numbers.end()) {
        cout << "找到了 25！" << endl;
        cout << "位置（下标）: " << (it - numbers.begin()) << endl;
        cout << "值: " << *it << endl;
    } else {
        cout << "没找到 25" << endl;
    }
    
    // 找一个不存在的数字
    auto it2 = find(numbers.begin(), numbers.end(), 100);
    if (it2 == numbers.end()) {
        cout << "100 不在数组里" << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
找到了 25！
位置（下标）: 1
值: 25
100 不在数组里
\`\`\`

---

### 2.2 \`find_if\`（条件查找）

**🔍 作用：** 找到**第一个**满足条件的元素。

**📖 场景：** 不是找某个具体的数，而是找"第一个及格的分数"、"第一个偶数"等。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {45, 55, 62, 78, 80};
    
    // 找第一个及格的分数（>= 60）
    auto it = find_if(scores.begin(), scores.end(), [](int score) {
        return score >= 60;  // 条件：分数 >= 60
    });
    
    if (it != scores.end()) {
        cout << "第一个及格的分数是: " << *it << endl;
        cout << "它是第 " << (it - scores.begin() + 1) << " 个人的成绩" << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
第一个及格的分数是: 62
它是第 3 个人的成绩
\`\`\`

---

### 2.3 \`find_if_not\`（反向条件查找）

**🔍 作用：** 找到**第一个不满足**条件的元素。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 90, 78, 55, 92};
    
    // 找第一个不及格的分数（第一个不满足 >= 60 的）
    auto it = find_if_not(scores.begin(), scores.end(), [](int score) {
        return score >= 60;
    });
    
    if (it != scores.end()) {
        cout << "第一个不及格的分数是: " << *it << endl;
    } else {
        cout << "全班都及格了！" << endl;
    }
    
    return 0;
}
\`\`\`

---

### 2.4 \`find_first_of\`（找任意一个匹配）

**🔍 作用：** 在第一个序列中，找到**第一个**出现在第二个序列中的元素。

**📖 场景：** 就像找"第一个元音字母"——只要是 a、e、i、o、u 中的任何一个就行。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string text = "hello world";
    string vowels = "aeiou";  // 元音字母
    
    // 找 text 中第一个元音字母
    auto it = find_first_of(text.begin(), text.end(), vowels.begin(), vowels.end());
    
    if (it != text.end()) {
        cout << "第一个元音字母是: " << *it << endl;
        cout << "位置: " << (it - text.begin()) << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
第一个元音字母是: e
位置: 1
\`\`\`

---

### 2.5 \`adjacent_find\`（找相邻重复）

**🔍 作用：** 找到**第一对相邻且相等**的元素。

**📖 场景：** 检查数据是否有连续重复，比如检测"连续输入了两次相同的密码"。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> data = {1, 2, 3, 3, 4, 5, 5, 5, 6};
    
    auto it = adjacent_find(data.begin(), data.end());
    
    if (it != data.end()) {
        cout << "发现相邻重复！" << endl;
        cout << "值: " << *it << endl;
        cout << "位置: " << (it - data.begin()) << " 和 " << (it - data.begin() + 1) << endl;
    }
    
    // 继续找下一个相邻重复
    auto it2 = adjacent_find(it + 1, data.end());
    if (it2 != data.end()) {
        cout << "还有一个相邻重复: " << *it2 << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
发现相邻重复！
值: 3
位置: 2 和 3
还有一个相邻重复: 5
\`\`\`

---

## 3. 计数魔法：\`count\` 家族（数数专家）

### 📖 生活场景

一袋彩色糖果，你想知道里面有多少颗红色的糖果。你会把每颗糖果都看一遍，遇到红色的就数一下。
`} />
            <CountVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

---

### 3.1 \`count\`（精确计数）

**🔍 作用：** 数数有多少个元素**等于**指定值。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> dice_results = {3, 5, 6, 3, 2, 3, 6, 3, 1};
    
    // 数一数扔出了多少个 3
    int count_of_3 = count(dice_results.begin(), dice_results.end(), 3);
    
    cout << "扔骰子的结果: ";
    for (int d : dice_results) cout << d << " ";
    cout << endl;
    
    cout << "其中有 " << count_of_3 << " 个 3" << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
扔骰子的结果: 3 5 6 3 2 3 6 3 1
其中有 4 个 3
\`\`\`

---

### 3.2 \`count_if\`（条件计数）

**🔍 作用：** 数数有多少个元素**满足条件**。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 45, 92, 58, 76, 55, 88, 60};
    
    // 数一数有多少人及格（>= 60）
    int pass_count = count_if(scores.begin(), scores.end(), [](int score) {
        return score >= 60;
    });
    
    // 数一数有多少人不及格
    int fail_count = count_if(scores.begin(), scores.end(), [](int score) {
        return score < 60;
    });
    
    cout << "全班 " << scores.size() << " 人" << endl;
    cout << "及格: " << pass_count << " 人" << endl;
    cout << "不及格: " << fail_count << " 人" << endl;
    cout << "及格率: " << (100.0 * pass_count / scores.size()) << "%" << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
全班 8 人
及格: 5 人
不及格: 3 人
及格率: 62.5%
\`\`\`

---

## 4. 判断魔法：\`all_of\` / \`any_of\` / \`none_of\`（检查官）

### 📖 生活场景

老师检查作业：
- **全部交了吗？** (\`all_of\`) —— 每个人都要交
- **有人交了吗？** (\`any_of\`) —— 至少有一个人交就行
- **没人交吗？** (\`none_of\`) —— 一个人都没交
`} />
            <CheckVisual />
            <MarkdownRenderer content={`
### 💻 代码演示

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 72, 90, 65, 78};
    
    // 检查是否全班都及格了
    bool all_passed = all_of(scores.begin(), scores.end(), [](int s) {
        return s >= 60;
    });
    cout << "全班都及格了吗？" << (all_passed ? "是" : "否") << endl;
    
    // 检查是否有人考了 90 分以上
    bool has_excellent = any_of(scores.begin(), scores.end(), [](int s) {
        return s >= 90;
    });
    cout << "有人考90分以上吗？" << (has_excellent ? "有" : "没有") << endl;
    
    // 检查是否没有人不及格
    bool no_fail = none_of(scores.begin(), scores.end(), [](int s) {
        return s < 60;
    });
    cout << "没有人不及格吗？" << (no_fail ? "是" : "否") << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
全班都及格了吗？是
有人考90分以上吗？有
没有人不及格吗？是
\`\`\`

### 💡 记忆技巧

| 魔法 | 问题 | 返回 true 的条件 |
|------|------|------------------|
| \`all_of\` | 是不是**全部**都满足？ | 每一个都满足 |
| \`any_of\` | 是不是**有任何一个**满足？ | 至少有一个满足 |
| \`none_of\` | 是不是**一个都没有**满足？ | 没有任何一个满足 |

---

## 5. 比较魔法：\`equal\` & \`mismatch\`（对答案专家）

### 📖 生活场景

考试结束后，你和同桌对答案：
- **\`equal\`**：答案完全一样吗？
- **\`mismatch\`**：第几题开始不一样？
`} />
            <CompareVisual />
            <MarkdownRenderer content={`
---

### 5.1 \`equal\`（完全相同吗？）

**🔍 作用：** 判断两个序列是否**完全相同**。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> my_answers = {1, 3, 2, 4, 1};
    vector<int> standard_answers = {1, 3, 2, 4, 1};
    vector<int> friend_answers = {1, 3, 3, 4, 1};
    
    // 和标准答案对比
    if (equal(my_answers.begin(), my_answers.end(), standard_answers.begin())) {
        cout << "恭喜！我的答案和标准答案完全一样！" << endl;
    }
    
    // 和朋友的答案对比
    if (!equal(my_answers.begin(), my_answers.end(), friend_answers.begin())) {
        cout << "我和朋友的答案不完全一样" << endl;
    }
    
    return 0;
}
\`\`\`

---

### 5.2 \`mismatch\`（找出第一个不同）

**🔍 作用：** 找出两个序列**第一个不同**的位置。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> my_answers = {1, 3, 2, 4, 1};
    vector<int> friend_answers = {1, 3, 3, 4, 2};
    
    // 找出第一个不同的地方
    auto result = mismatch(my_answers.begin(), my_answers.end(), friend_answers.begin());
    
    if (result.first != my_answers.end()) {
        int position = result.first - my_answers.begin();
        cout << "第 " << (position + 1) << " 题答案不同！" << endl;
        cout << "我的答案: " << *result.first << endl;
        cout << "朋友的答案: " << *result.second << endl;
    } else {
        cout << "答案完全相同！" << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
第 3 题答案不同！
我的答案: 2
朋友的答案: 3
\`\`\`

---

## 6. 搜索魔法：\`search\`（关键词搜索）

### 📖 生活场景

在一篇文章中搜索关键词"魔法"，看看它出现在哪里。
`} />
            <SearchVisual />
            <MarkdownRenderer content={`
---

### 6.1 \`search\`（找子序列）

**🔍 作用：** 在一个大序列中，找到一个小序列第一次出现的位置。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> data = {1, 2, 3, 4, 5, 3, 4, 5, 6};
    vector<int> pattern = {3, 4, 5};  // 要找的模式
    
    // 找 pattern 在 data 中第一次出现的位置
    auto it = search(data.begin(), data.end(), pattern.begin(), pattern.end());
    
    if (it != data.end()) {
        cout << "找到了！" << endl;
        cout << "模式 [3,4,5] 第一次出现在下标: " << (it - data.begin()) << endl;
    }
    
    // 继续找下一个
    auto it2 = search(it + 1, data.end(), pattern.begin(), pattern.end());
    if (it2 != data.end()) {
        cout << "第二次出现在下标: " << (it2 - data.begin()) << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
找到了！
模式 [3,4,5] 第一次出现在下标: 2
第二次出现在下标: 5
\`\`\`

---

### 6.2 \`search_n\`（找连续重复）

**🔍 作用：** 找到连续 n 个相同的元素。

**📖 场景：** 检测数据中是否有"连续3次相同的结果"。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> results = {1, 2, 5, 5, 5, 3, 5, 5};
    
    // 找连续 3 个 5
    auto it = search_n(results.begin(), results.end(), 3, 5);
    
    if (it != results.end()) {
        cout << "找到连续3个5！位置: " << (it - results.begin()) << endl;
    }
    
    // 找连续 4 个 5（找不到）
    auto it2 = search_n(results.begin(), results.end(), 4, 5);
    if (it2 == results.end()) {
        cout << "没有连续4个5" << endl;
    }
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
找到连续3个5！位置: 2
没有连续4个5
\`\`\`

---

## 📊 本章魔法总结表

| 魔法 | 功能 | 返回值 | 记忆口诀 |
|------|------|--------|----------|
| \`for_each\` | 遍历每个元素 | 无 | 点名器 |
| \`find\` | 找等于某值的第一个 | 迭代器 | 精确寻宝 |
| \`find_if\` | 找满足条件的第一个 | 迭代器 | 条件寻宝 |
| \`find_if_not\` | 找不满足条件的第一个 | 迭代器 | 反向寻宝 |
| \`find_first_of\` | 找属于某集合的第一个 | 迭代器 | 多目标寻宝 |
| \`adjacent_find\` | 找相邻重复的第一对 | 迭代器 | 找双胞胎 |
| \`count\` | 数等于某值的个数 | 整数 | 精确数数 |
| \`count_if\` | 数满足条件的个数 | 整数 | 条件数数 |
| \`all_of\` | 是否全部满足 | bool | 全班都... |
| \`any_of\` | 是否有任一满足 | bool | 有没有人... |
| \`none_of\` | 是否全不满足 | bool | 没有人... |
| \`equal\` | 两序列是否相同 | bool | 对答案 |
| \`mismatch\` | 第一个不同在哪 | pair<迭代器,迭代器> | 找不同 |
| \`search\` | 找子序列位置 | 迭代器 | 搜关键词 |
| \`search_n\` | 找连续n个相同 | 迭代器 | 找连号 |

---

## ✏️ 课后小练习

### 练习 1：统计成绩
**题目：** 成绩数组 \`{78, 92, 55, 88, 45, 90, 62, 58}\`
**要求：**
1. 用 \`count_if\` 统计及格人数（≥60）
2. 用 \`find_if\` 找到第一个满分或接近满分（≥90）的位置
3. 用 \`all_of\` 判断是否全班都及格了
`} />
            <AnswerRevealer>
                <MarkdownRenderer content={`
\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {78, 92, 55, 88, 45, 90, 62, 58};
    
    // 1. 及格人数
    int pass_count = count_if(scores.begin(), scores.end(), [](int s) {
        return s >= 60;
    });
    cout << "及格人数: " << pass_count << endl;  // 5
    
    // 2. 第一个90分以上
    auto it = find_if(scores.begin(), scores.end(), [](int s) {
        return s >= 90;
    });
    if (it != scores.end()) {
        cout << "第一个90+的位置: " << (it - scores.begin()) << "，分数: " << *it << endl;
    }
    
    // 3. 是否全班及格
    bool all_pass = all_of(scores.begin(), scores.end(), [](int s) {
        return s >= 60;
    });
    cout << "全班都及格了吗？" << (all_pass ? "是" : "否") << endl;  // 否
    
    return 0;
}
\`\`\`
`} />
            </AnswerRevealer>
            <MarkdownRenderer content={`
### 练习 2：密码检测
**题目：** 检查密码 \`"MyPassword123"\` 是否：
1. 包含数字（用 \`any_of\` 和 \`isdigit\`）
2. 全是字母（用 \`all_of\` 和 \`isalpha\`）
3. 有没有连续重复的字符（用 \`adjacent_find\`）
`} />
            <AnswerRevealer>
                <MarkdownRenderer content={`
\`\`\`cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

int main() {
    string password = "MyPassword123";
    
    // 1. 是否包含数字
    bool has_digit = any_of(password.begin(), password.end(), [](char c) {
        return isdigit(c);
    });
    cout << "包含数字？" << (has_digit ? "是" : "否") << endl;  // 是
    
    // 2. 是否全是字母
    bool all_alpha = all_of(password.begin(), password.end(), [](char c) {
        return isalpha(c);
    });
    cout << "全是字母？" << (all_alpha ? "是" : "否") << endl;  // 否
    
    // 3. 有没有连续重复字符
    auto it = adjacent_find(password.begin(), password.end());
    if (it != password.end()) {
        cout << "有连续重复字符: " << *it << endl;  // s
    } else {
        cout << "没有连续重复字符" << endl;
    }
    
    return 0;
}
\`\`\`
`} />
            </AnswerRevealer>
            <MarkdownRenderer content={`
---

## 🏆 综合挑战：小小数据分析师

**背景：** 你是一名数据分析师，需要分析一组销售数据。

**数据：** 过去 10 天的销售额 \`{150, 200, 180, 220, 220, 250, 180, 300, 280, 350}\`

**任务：**
1. **高峰检测：** 找出第一天销售额超过 250 的是哪一天
2. **稳定性检查：** 有没有连续两天销售额相同？
3. **目标达成：** 是否每天销售额都超过 100？是否有任何一天超过 300？
4. **统计：** 有多少天销售额在 200-300 之间（含）？
5. **对比：** 给定目标 \`{150, 200, 180, 220, 220, 250, 180, 300, 280, 350}\`，检查是否完成目标
`} />
            <AnswerRevealer>
                <MarkdownRenderer content={`
\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> sales = {150, 200, 180, 220, 220, 250, 180, 300, 280, 350};
    vector<int> target = {150, 200, 180, 220, 220, 250, 180, 300, 280, 350};
    
    cout << "=== 销售数据分析报告 ===" << endl << endl;
    
    // 1. 高峰检测
    auto peak = find_if(sales.begin(), sales.end(), [](int s) {
        return s > 250;
    });
    if (peak != sales.end()) {
        cout << "1. 第一次销售额超过250: 第" << (peak - sales.begin() + 1) 
             << "天，销售额: " << *peak << endl;
    }
    
    // 2. 稳定性检查
    auto same = adjacent_find(sales.begin(), sales.end());
    if (same != sales.end()) {
        cout << "2. 发现连续两天销售额相同: 第" << (same - sales.begin() + 1)
             << "天和第" << (same - sales.begin() + 2) << "天，都是" << *same << endl;
    }
    
    // 3. 目标达成
    bool all_over_100 = all_of(sales.begin(), sales.end(), [](int s) {
        return s > 100;
    });
    bool any_over_300 = any_of(sales.begin(), sales.end(), [](int s) {
        return s > 300;
    });
    cout << "3. 每天都超过100？" << (all_over_100 ? "是" : "否") << endl;
    cout << "   有任何一天超过300？" << (any_over_300 ? "是" : "否") << endl;
    
    // 4. 统计
    int count_200_300 = count_if(sales.begin(), sales.end(), [](int s) {
        return s >= 200 && s <= 300;
    });
    cout << "4. 销售额在200-300之间的天数: " << count_200_300 << "天" << endl;
    
    // 5. 对比
    bool reached_target = equal(sales.begin(), sales.end(), target.begin());
    cout << "5. 是否完成销售目标？" << (reached_target ? "是" : "否") << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
=== 销售数据分析报告 ===

1. 第一次销售额超过250: 第8天，销售额: 300
2. 发现连续两天销售额相同: 第4天和第5天，都是220
3. 每天都超过100？是
   有任何一天超过300？是
4. 销售额在200-300之间的天数: 6天
5. 是否完成销售目标？是
\`\`\`
`} />
            </AnswerRevealer>
            <MarkdownRenderer content={`
---

🎉 **本节学习完成！**

你已经掌握了所有"只看不动"的魔法。这些魔法虽然不会改变数据，但它们是编程中最常用的工具——毕竟在动手修改之前，我们总要先**了解**数据是什么样的！

**下一节预告：** 我们将学习**修改序列算法**，开始真正动手改变数据！🔧
            `} />
        </div>
    )
};
