import React from 'react';
import { Section } from '../../../types/index';
import { MarkdownRenderer } from '../../../components/Common/MarkdownRenderer';
import { 
    AnswerRevealer,
    CopyVisual, 
    FillVisual, 
    ReplaceVisual, 
    RemoveVisual, 
    UniqueVisual, 
    TransformVisual, 
    ReverseVisual 
} from '../../../components/Visuals/STL/AlgorithmVisuals';

export const stlAlgorithmModifyingSection: Section = {
    id: 'stl-algorithms-modifying',
    category: 'C++ STL (标准模板库)',
    group: '4. 算法：非修改 & 修改 & 数值算法',
    title: '4.2 修改序列算法',
    type: 'lesson',
    content: (
        <div>
            <MarkdownRenderer content={`
# 🔧 修改序列算法：数据改造师

在掌握了数据的读取与查询之后，接下来我们将进入更具挑战性的领域——修改数据。本节的主题是**修改序列算法**（Modifying Sequence Algorithms）。

与上一节不同，这里的算法会**直接修改**容器中的内容，或者**生成**新的内容。就像房间整理师一样，它们负责复制、替换、删除和重新排列数据。

---

## 🎨 Part 0：本节算法一览表

| 算法类型 | 算法名称 | 作用 | 生活比喻 |
|----------|----------|------|----------|
| **复制类** | \`copy\` / \`copy_if\` | 复制元素到新位置 | 复印文件 |
| | \`copy_n\` | 复制前 n 个 | 复印前几页 |
| | \`copy_backward\` | 从后往前复制 | 倒着搬家 |
| **移动类** | \`move\` | 移动元素（转移所有权） | 搬家（不是复印） |
| **填充类** | \`fill\` / \`fill_n\` | 用同一个值填满 | 刷油漆 |
| **生成类** | \`generate\` / \`generate_n\` | 用函数生成值 | 自动售货机 |
| **替换类** | \`replace\` / \`replace_if\` | 替换指定元素 | 换灯泡 |
| **删除类** | \`remove\` / \`remove_if\` | 移除指定元素 | 挑出坏苹果 |
| **去重类** | \`unique\` | 去除相邻重复 | 压缩连拍照片 |
| **变换类** | \`transform\` | 对每个元素做变换 | 批量修图 |
| **翻转类** | \`reverse\` | 颠倒顺序 | 翻转照片墙 |
| **交换类** | \`swap\` / \`swap_ranges\` | 交换元素 | 换座位 |

---

## 1. 复制魔法：\`copy\` 家族（复印机）

### 📖 生活场景

你有一份重要的作业，想复印一份给同桌看。你可以：
- 全部复印（\`copy\`）
- 只复印前几页（\`copy_n\`）
- 只复印满足条件的页（\`copy_if\`）
- 从后往前复印（\`copy_backward\`）
`} />
            <CopyVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

\`\`\`
原数组:    [1] [2] [3] [4] [5]
            ↓   ↓   ↓   ↓   ↓
           复制 复制 复制 复制 复制
            ↓   ↓   ↓   ↓   ↓
新数组:    [1] [2] [3] [4] [5]

原数组不变！新数组是副本！
\`\`\`

---

### 1.1 \`copy\`（全部复制）

**🔍 作用：** 把一个范围内的所有元素复制到另一个位置。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> original = {1, 2, 3, 4, 5};
    vector<int> backup(5);  // 准备一个同样大小的空间
    
    // 咒语：copy(源开始, 源结束, 目标开始)
    copy(original.begin(), original.end(), backup.begin());
    
    cout << "原数组: ";
    for (int x : original) cout << x << " ";
    cout << endl;
    
    cout << "备份数组: ";
    for (int x : backup) cout << x << " ";
    cout << endl;
    
    // 修改备份，不影响原数组
    backup[0] = 100;
    cout << "修改备份后，原数组第一个元素仍是: " << original[0] << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原数组: 1 2 3 4 5
备份数组: 1 2 3 4 5
修改备份后，原数组第一个元素仍是: 1
\`\`\`

---

### 1.2 \`copy_n\`（复制前 N 个）

**🔍 作用：** 只复制前 n 个元素。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> source = {10, 20, 30, 40, 50, 60, 70};
    vector<int> dest(3);  // 只准备 3 个空间
    
    // 咒语：copy_n(源开始, 复制几个, 目标开始)
    copy_n(source.begin(), 3, dest.begin());
    
    cout << "只复制前3个: ";
    for (int x : dest) cout << x << " ";
    cout << endl;
    // 输出: 10 20 30
    
    return 0;
}
\`\`\`

---

### 1.3 \`copy_if\`（条件复制）

**🔍 作用：** 只复制满足条件的元素。

**📖 场景：** 从一堆成绩中，只复制及格的成绩。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> all_scores = {85, 45, 92, 58, 76, 30, 88};
    vector<int> pass_scores;  // 用来存及格的成绩
    
    // 咒语：copy_if(源开始, 源结束, 目标, 条件)
    // 用 back_inserter 可以自动扩容
    copy_if(all_scores.begin(), all_scores.end(), 
            back_inserter(pass_scores),  // 自动在末尾添加
            [](int score) { return score >= 60; });
    
    cout << "所有成绩: ";
    for (int x : all_scores) cout << x << " ";
    cout << endl;
    
    cout << "及格成绩: ";
    for (int x : pass_scores) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
所有成绩: 85 45 92 58 76 30 88
及格成绩: 85 92 76 88
\`\`\`

---

### 1.4 \`copy_backward\`（从后往前复制）

**🔍 作用：** 从后往前复制，适合目标和源有重叠的情况。

**📖 场景：** 把数组元素整体向后移动。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> data = {1, 2, 3, 4, 5, 0, 0};
    //                               ↑ 空出两个位置
    
    // 把前5个元素向后移动2位
    // copy_backward(源开始, 源结束, 目标结束)
    copy_backward(data.begin(), data.begin() + 5, data.end());
    
    cout << "移动后: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    // 输出: 1 2 1 2 3 4 5
    
    return 0;
}
\`\`\`

---

## 2. 填充魔法：\`fill\` & \`fill_n\`（油漆刷）

### 📖 生活场景

你买了一面新墙，要把整面墙都刷成蓝色。
- \`fill\`：把整面墙刷成蓝色
- \`fill_n\`：只刷墙的一部分（前 n 个单位）
`} />
            <FillVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

### 💻 代码演示

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // ========== fill：填满整个范围 ==========
    vector<int> wall(10);  // 10个格子的墙
    
    // 全部刷成蓝色（用数字 1 代表蓝色）
    fill(wall.begin(), wall.end(), 1);
    
    cout << "fill 后: ";
    for (int x : wall) cout << x << " ";
    cout << endl;
    // 输出: 1 1 1 1 1 1 1 1 1 1
    
    // ========== fill_n：只填充前 n 个 ==========
    vector<int> wall2(10, 0);  // 10个格子，初始都是0
    
    // 只刷前 5 个格子为红色（用数字 2 代表红色）
    fill_n(wall2.begin(), 5, 2);
    
    cout << "fill_n 后: ";
    for (int x : wall2) cout << x << " ";
    cout << endl;
    // 输出: 2 2 2 2 2 0 0 0 0 0
    
    return 0;
}
\`\`\`

---

## 3. 生成魔法：\`generate\` & \`generate_n\`（自动售货机）

### 📖 生活场景

自动售货机每按一次按钮，就吐出一个商品。
\`generate\` 就像这样——每个位置都会调用一次"生成函数"来产生一个值。

### 🎨 工作原理图解

\`\`\`
生成器: [按一下] → 1
       [按一下] → 2
       [按一下] → 3
         ↓
数组:   [1] [2] [3]
\`\`\`

### 💻 代码演示

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>  // for rand
#include <ctime>    // for time
using namespace std;

int main() {
    // ========== 生成递增序列 ==========
    vector<int> sequence(5);
    int counter = 1;
    
    // generate(开始, 结束, 生成函数)
    generate(sequence.begin(), sequence.end(), [&counter]() {
        return counter++;  // 每次返回 counter，然后 counter 加 1
    });
    
    cout << "递增序列: ";
    for (int x : sequence) cout << x << " ";
    cout << endl;
    // 输出: 1 2 3 4 5
    
    // ========== 生成随机数 ==========
    srand(time(0));  // 初始化随机种子
    vector<int> random_nums(5);
    
    generate(random_nums.begin(), random_nums.end(), []() {
        return rand() % 100;  // 生成 0-99 的随机数
    });
    
    cout << "随机数: ";
    for (int x : random_nums) cout << x << " ";
    cout << endl;
    
    // ========== 生成斐波那契数列 ==========
    vector<int> fib(10);
    int a = 0, b = 1;
    
    generate(fib.begin(), fib.end(), [&a, &b]() {
        int next = a + b;
        a = b;
        b = next;
        return a;
    });
    
    cout << "斐波那契: ";
    for (int x : fib) cout << x << " ";
    cout << endl;
    // 输出: 1 1 2 3 5 8 13 21 34 55
    
    return 0;
}
\`\`\`

---

## 4. 替换魔法：\`replace\` 家族（换灯泡）

### 📖 生活场景

家里有些灯泡坏了（值为 0），你要把所有坏灯泡换成新的（值为 1）。
`} />
            <ReplaceVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

---

### 4.1 \`replace\`（精确替换）

**🔍 作用：** 把所有等于某个值的元素，替换成新值。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> lights = {1, 0, 1, 0, 0, 1, 0};
    
    cout << "替换前（0是坏灯泡）: ";
    for (int x : lights) cout << x << " ";
    cout << endl;
    
    // 把所有的 0 替换成 1
    // replace(开始, 结束, 旧值, 新值)
    replace(lights.begin(), lights.end(), 0, 1);
    
    cout << "替换后（全部修好）: ";
    for (int x : lights) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
替换前（0是坏灯泡）: 1 0 1 0 0 1 0
替换后（全部修好）: 1 1 1 1 1 1 1
\`\`\`

---

### 4.2 \`replace_if\`（条件替换）

**🔍 作用：** 把所有满足条件的元素替换成新值。

**📖 场景：** 把所有不及格的分数（<60）替换成 60（保底分）。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 45, 92, 58, 30, 76, 55};
    
    cout << "原始成绩: ";
    for (int x : scores) cout << x << " ";
    cout << endl;
    
    // 把不及格的都改成 60 分（保底）
    replace_if(scores.begin(), scores.end(), 
               [](int s) { return s < 60; },  // 条件
               60);  // 新值
    
    cout << "保底后: ";
    for (int x : scores) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原始成绩: 85 45 92 58 30 76 55
保底后: 85 60 92 60 60 76 60
\`\`\`

---

### 4.3 \`replace_copy\` & \`replace_copy_if\`（替换并复制）

**🔍 作用：** 不改变原数组，而是把替换后的结果复制到新数组。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> original = {1, 0, 1, 0, 0};
    vector<int> fixed(5);
    
    // 原数组不变，结果放到新数组
    replace_copy(original.begin(), original.end(), fixed.begin(), 0, 1);
    
    cout << "原数组（不变）: ";
    for (int x : original) cout << x << " ";
    cout << endl;
    
    cout << "新数组（修复后）: ";
    for (int x : fixed) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

---

## 5. 删除魔法：\`remove\` 家族（挑苹果）

### 📖 生活场景

一篮子苹果里有几个坏的，你要把坏苹果挑出来扔掉。

### 🎨 工作原理图解（重要！）

**⚠️ 这是最容易搞错的地方！**

\`remove\` **并不真正删除元素**，它只是把"不要的"元素移到后面，然后告诉你"新的结尾在哪"。
`} />
            <RemoveVisual />
            <MarkdownRenderer content={`
### 💻 代码演示

### 5.1 \`remove\`（移除指定值）

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> fruits = {1, 2, 1, 2, 1};  // 1=苹果, 2=香蕉
    
    cout << "原来有 " << fruits.size() << " 个水果" << endl;
    cout << "原数组: ";
    for (int x : fruits) cout << x << " ";
    cout << endl;
    
    // remove 返回"新结尾"的位置
    auto new_end = remove(fruits.begin(), fruits.end(), 2);  // 移除香蕉
    
    cout << "remove后数组: ";
    for (int x : fruits) cout << x << " ";
    cout << endl;
    // 可能输出: 1 1 1 2 1（后面的是垃圾数据）
    
    cout << "有效元素个数: " << (new_end - fruits.begin()) << endl;
    
    // 真正删除！用 erase
    fruits.erase(new_end, fruits.end());
    
    cout << "erase后数组: ";
    for (int x : fruits) cout << x << " ";
    cout << endl;
    cout << "现在有 " << fruits.size() << " 个水果" << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原来有 5 个水果
原数组: 1 2 1 2 1
remove后数组: 1 1 1 2 1
有效元素个数: 3
erase后数组: 1 1 1
现在有 3 个水果
\`\`\`

---

### 5.2 经典写法：\`erase-remove\` 惯用法 ⭐

**这是 C++ 中最常用的删除元素的方法！**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 2, 4, 2, 5};
    
    cout << "删除前: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    
    // 一行搞定：移除所有的 2
    nums.erase(remove(nums.begin(), nums.end(), 2), nums.end());
    
    cout << "删除后: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
删除前: 1 2 3 2 4 2 5
删除后: 1 3 4 5
\`\`\`

---

### 5.3 \`remove_if\`（条件删除）

**📖 场景：** 删除所有不及格的成绩。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 45, 92, 58, 76, 30, 88};
    
    cout << "原始成绩: ";
    for (int x : scores) cout << x << " ";
    cout << endl;
    
    // 删除所有不及格的（< 60）
    scores.erase(
        remove_if(scores.begin(), scores.end(), [](int s) { return s < 60; }),
        scores.end()
    );
    
    cout << "删除不及格后: ";
    for (int x : scores) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原始成绩: 85 45 92 58 76 30 88
删除不及格后: 85 92 76 88
\`\`\`

---

## 6. 去重魔法：\`unique\`（压缩照片）

### 📖 生活场景

你用手机连拍了很多照片，结果很多都是重复的。
\`unique\` 可以把**连续重复**的照片压缩成一张。
`} />
            <UniqueVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

**⚠️ 注意：只去除"相邻"的重复！**

### 💻 代码演示

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> photos = {1, 1, 1, 2, 2, 3, 3, 3, 3, 2};
    
    cout << "原始（有连续重复）: ";
    for (int x : photos) cout << x << " ";
    cout << endl;
    
    // unique + erase 惯用法
    photos.erase(unique(photos.begin(), photos.end()), photos.end());
    
    cout << "去重后: ";
    for (int x : photos) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原始（有连续重复）: 1 1 1 2 2 3 3 3 3 2
去重后: 1 2 3 2
\`\`\`

### 💡 如果想去除所有重复（不只是相邻的）

先排序，再去重！

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 2, 1, 3, 2, 1, 3};
    
    cout << "原始: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    
    // 第一步：排序（让相同的元素相邻）
    sort(nums.begin(), nums.end());
    
    cout << "排序后: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    
    // 第二步：去重
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    
    cout << "去重后: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原始: 3 1 2 1 3 2 1 3
排序后: 1 1 1 2 2 3 3 3
去重后: 1 2 3
\`\`\`

---

## 7. 变换魔法：\`transform\`（批量修图）

### 📖 生活场景

你有一堆照片，想给每张照片都加一个滤镜。
\`transform\` 就是批量处理的魔法——对每个元素应用一个"变换函数"。
`} />
            <TransformVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解 (如上图所示)

### 7.1 单数组变换

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> prices = {100, 200, 150, 300};
    vector<int> discounted(4);
    
    cout << "原价: ";
    for (int x : prices) cout << x << " ";
    cout << endl;
    
    // 所有价格打 8 折
    // transform(源开始, 源结束, 目标开始, 变换函数)
    transform(prices.begin(), prices.end(), discounted.begin(), [](int p) {
        return p * 0.8;  // 乘以 0.8
    });
    
    cout << "打折后: ";
    for (int x : discounted) cout << x << " ";
    cout << endl;
    
    // 也可以直接修改原数组
    transform(prices.begin(), prices.end(), prices.begin(), [](int p) {
        return p * 0.8;
    });
    
    cout << "原数组也被修改了: ";
    for (int x : prices) cout << x << " ";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原价: 100 200 150 300
打折后: 80 160 120 240
原数组也被修改了: 80 160 120 240
\`\`\`

---

### 7.2 双数组变换（两个数组合并计算）

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> quantities = {2, 3, 1};    // 数量
    vector<int> prices = {50, 30, 100};    // 单价
    vector<int> totals(3);                  // 小计
    
    // 计算每种商品的小计：数量 × 单价
    // transform(源1开始, 源1结束, 源2开始, 目标开始, 二元函数)
    transform(quantities.begin(), quantities.end(), 
              prices.begin(), 
              totals.begin(), 
              [](int q, int p) { return q * p; });
    
    cout << "数量:  ";
    for (int x : quantities) cout << x << "\\t";
    cout << endl;
    
    cout << "单价:  ";
    for (int x : prices) cout << x << "\\t";
    cout << endl;
    
    cout << "小计:  ";
    for (int x : totals) cout << x << "\\t";
    cout << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
数量:  2	3	1
单价:  50	30	100
小计:  100	90	100
\`\`\`

---

### 7.3 实用案例：字符串大小写转换

\`\`\`cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

int main() {
    string text = "Hello World!";
    
    cout << "原始: " << text << endl;
    
    // 转换为大写
    transform(text.begin(), text.end(), text.begin(), ::toupper);
    cout << "大写: " << text << endl;
    
    // 转换为小写
    transform(text.begin(), text.end(), text.begin(), ::tolower);
    cout << "小写: " << text << endl;
    
    return 0;
}
\`\`\`

**输出：**
\`\`\`
原始: Hello World!
大写: HELLO WORLD!
小写: hello world!
\`\`\`

---

## 8. 翻转魔法：\`reverse\`（照片墙翻转）

### 📖 生活场景

你把照片墙上的照片从左到右排好了，现在想把顺序完全颠倒。
`} />
            <ReverseVisual />
            <MarkdownRenderer content={`
### 🎨 工作原理图解

\`\`\`
翻转前: [1] [2] [3]
          ↘ ↑ ↙
            ╳
          ↙ ↓ ↘
翻转后: [3] [2] [1]
\`\`\`

### 💻 代码演示

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    
    // reverse(开始, 结束)
    reverse(nums.begin(), nums.end());
    
    cout << "翻转后: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    // 输出: 5 4 3 2 1
    
    return 0;
}
\`\`\`

---

## ✏️ 课后小练习

### 练习 1：去除脏数据
**题目：** 数组 \`{10, 0, 20, 0, 30, 0, 40}\`，其中 0 是脏数据。
**要求：** 用 \`erase-remove\` 惯用法把 0 全部删掉。

### 练习 2：成绩调整
**题目：** 成绩 \`{55, 60, 45, 80}\`。
**要求：** 用 \`transform\` 给每个人加 5 分。

### 练习 3：字符串回文判断
**题目：** 判断字符串 \`"racecar"\` 是否是回文。
**提示：** 复制一份字符串，\`reverse\` 翻转它，然后比较原字符串和翻转后的字符串是否相等。
`} />
            <AnswerRevealer>
                <MarkdownRenderer content={`
\`\`\`cpp
// 练习 1：去除脏数据
vector<int> v = {10, 0, 20, 0, 30, 0, 40};
v.erase(remove(v.begin(), v.end(), 0), v.end());

// 练习 2：成绩调整
vector<int> scores = {55, 60, 45, 80};
transform(scores.begin(), scores.end(), scores.begin(), [](int s) {
    return s + 5;
});

// 练习 3：回文判断
string s = "racecar";
string reversed_s = s;
reverse(reversed_s.begin(), reversed_s.end());
if (s == reversed_s) {
    cout << "是回文！" << endl;
}
\`\`\`
`} />
            </AnswerRevealer>
        </div>
    )
};
