import React from 'react';
import { Section } from '../../../types/index';
import { MarkdownRenderer } from '../../../components/Common/MarkdownRenderer';
import { 
    SortVisual, 
    BinarySearchVisual, 
    HeapVisual, 
    PermutationVisual, 
    RotateShuffleVisual 
} from '../../../components/Visuals/STL/AlgorithmVisuals';

export const stlAlgorithmSortingSection: Section = {
    id: 'stl-algorithms-sorting',
    category: 'C++ STL (标准模板库)',
    group: '4. 算法：非修改 & 修改 & 数值算法',
    title: '4.3 排序与重排算法',
    type: 'lesson',
    content: (
        <div>
            <MarkdownRenderer content={`
# 排序与重排算法（改变顺序的大法）

这一章讲的算法会**改变元素的顺序**，但通常**不改变元素本身的值**。  
核心分几类：

- 排序：\`sort\` / \`stable_sort\` / \`partial_sort\` / \`nth_element\`
- 二分查找辅助：\`lower_bound\` / \`upper_bound\` / \`equal_range\` / \`binary_search\`
- 堆操作：\`make_heap\` / \`push_heap\` / \`pop_heap\` / \`sort_heap\`
- 重排：\`next_permutation\` / \`prev_permutation\` / \`rotate\` / \`shuffle\`

我会先讲**原理（直观理解）**，再给**代码例子**。

---

## 1. 排序算法
`} />
            <SortVisual />
            <MarkdownRenderer content={`
### 1.1 \`sort\`：快速排序（混合实现）

**作用：** 把区间 \`[first, last)\` 排成**升序**（默认）或你指定的顺序。

**典型实现思想：快速排序 + 插入排序 + 堆排序混合**（具体实现依赖库实现，但这类混合是最常见的）：

1. **快速排序的核心：分区（partition）**
   - 选一个元素作为“枢轴”（pivot），例如选中间元素
   - 扫描区间，把
     - 所有 \`< pivot\` 的移动到左侧
     - 所有 \`> pivot\` 的移动到右侧
   - 枢轴就落在了**最终正确位置**（左边都不大于它，右边都不小于它）

2. **递归处理左右两边**
   - 对左半边、右半边重复这个过程
   - 直到区间很小（例如长度 < 16）

3. **小区间用插入排序**
   - 小范围里插入排序非常快，常数小

4. **防止极端退化：改用堆排序**
   - 如果递归太深（说明数据很坏，比如已经接近有序但 pivot 选得不好），就切换为 \`heap sort\`，保证 \`O(n log n)\`

**重要特性：**

- 平均时间复杂度：\`O(n log n)\`
- **不稳定**：相等元素的相对顺序可能改变
- 需要随机访问迭代器（一般用于 \`vector\`, \`deque\`, 原始数组）

**例子：基本使用**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {5, 1, 4, 2, 3};

    // 默认升序
    sort(a.begin(), a.end());

    cout << "升序: ";
    for (int x : a) cout << x << " ";
    cout << "\\n";

    // 自定义降序
    sort(a.begin(), a.end(), [](int x, int y) {
        return x > y;  // “返回 true 表示 x 应排在 y 前面”
    });

    cout << "降序: ";
    for (int x : a) cout << x << " ";
    cout << "\\n";
}
\`\`\`

---

### 1.2 \`stable_sort\`：稳定归并排序

**作用：** 排序，但**保持相等元素的相对次序不变**。

**稳定性含义：**

- 若 \`a[i] == a[j]\` 且 \`i < j\`
- 稳定排序后，\`a[i]\` 仍然出现在 \`a[j]\` 之前

**典型实现思想：归并排序（merge sort）**

1. **分治：**
   - 把数组对半分成两部分
   - 分别对左右两半排序（递归）
2. **合并：**
   - 用两个指针分别指向左右有序数组的开头
   - 每次取**较小的那个**放入结果数组
   - 若相等，**总是先取左边的** → 保证稳定

复杂度通常也是 \`O(n log n)\`，但需要额外空间用于合并。

**何时一定要用 \`stable_sort\`？**

- 你要**多次排序**，每次按不同关键字，但想模拟“多关键字排序”：
  - 先按次要关键字稳定排序
  - 再按主要关键字稳定排序
  - 稳定性保证次要关键字的相对顺序被保留

**例子：二级排序（先班级再分数）**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Student {
    string name;
    int clazz;
    int score;
};

int main() {
    vector<Student> v = {
        {"A", 2, 80},
        {"B", 1, 90},
        {"C", 1, 85},
        {"D", 2, 95},
        {"E", 1, 90}
    };

    // 先按班级排（次要关键字）
    stable_sort(v.begin(), v.end(), [](const Student& x, const Student& y) {
        return x.clazz < y.clazz;
    });

    // 再按分数降序排（主要关键字）
    stable_sort(v.begin(), v.end(), [](const Student& x, const Student& y) {
        return x.score > y.score;
    });

    for (auto& s : v) {
        cout << s.name << " 班" << s.clazz << " 分数" << s.score << "\\n";
    }
}
\`\`\`

---

### 1.3 \`partial_sort\`：只排前几名

**作用：** 只把区间中**最小的 k 个元素**（或按你定义的“最靠前的 k 个”）排好序，放在 \`[first, middle)\` ；其余元素在 \`[middle, last)\` 区间，顺序不保证。

- 函数原型：\`partial_sort(first, middle, last, comp)\`
- 效果：  
  - \`[first, middle)\` 有序，且都“最小”
  - \`[middle, last)\` 乱序，无保证

**典型实现思想：堆 + 选择**

常见做法（求最大 k 个时）：

1. 在前 k 个元素上构建一个“小堆”（或大堆，视比较器而定）
2. 从剩余元素里依次看：
   - 如果新元素“更小/更优”，替换堆顶，并调整堆
3. 扫描结束后，堆中是“前 k 优”
4. 最后对这 k 个元素排序

时间复杂度：大致 \`O(n log k)\`，当 \`k << n\` 时，比 \`sort\` 快。

**例子：取前 3 个最大值**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {7, 2, 9, 4, 1, 8, 3, 6, 5};

    // 取最大三名放到前面，并排好序
    partial_sort(a.begin(), a.begin() + 3, a.end(), greater<int>());

    cout << "前3最大：";
    for (int i = 0; i < 3; ++i) cout << a[i] << " ";
    cout << "\\n整个数组：";
    for (int x : a) cout << x << " ";
    cout << "\\n";
}
\`\`\`

---

### 1.4 \`nth_element\`：只把第 n 个放对位置

**作用：** 重排区间使得：

- 位置 \`nth\` 上的元素是**按排序后本应在该位置的元素**
- \`[first, nth)\` 都不大于 \`*nth\`（按默认 \`<\`）
- \`[nth+1, last)\` 都不小于 \`*nth\`
- 但两边**不保证有序**

可以用来：

- 快速求第 k 小（或第 k 大）元素
- 快速找到中位数
- 快速划分“前 10%”、“后 90%”等

**典型实现思想：快速选择（quickselect）**

与快速排序类似，但只深入到包含第 n 个元素的那一侧：

1. 选择一个 pivot，做 partition
2. 得到 pivot 的最终位置 \`p\`
3. - 若 \`p == n\`，结束
   - 若 \`p > n\`，只在左半边递归
   - 若 \`p < n\`，只在右半边递归

平均复杂度 \`O(n)\`。

**例子：找中位数**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {7, 2, 9, 4, 1, 8, 3, 6, 5};

    int n = a.size() / 2;
    nth_element(a.begin(), a.begin() + n, a.end());
    int median = a[n];

    cout << "中位数候选: " << median << "\\n";

    // 验证性质
    int smaller = 0, larger = 0;
    for (int x : a) {
        if (x < median) smaller++;
        if (x > median) larger++;
    }
    cout << "比它小的个数: " << smaller << "\\n";
    cout << "比它大的个数: " << larger << "\\n";
}
\`\`\`

---

## 2. 二分查找相关算法（基于有序序列）

这些都要求区间已经按同一比较器**有序**。

### 2.1 \`lower_bound\` / \`upper_bound\` / \`equal_range\`

设有序数组：\`v = {1, 2, 4, 4, 4, 7, 9}\`，我们找值 \`4\`。

- \`lower_bound(v.begin(), v.end(), 4)\`  
  → 第一个 **不小于 4** 的位置（第一个 \`>=4\`）→ 指向 \`v[2]\`
- \`upper_bound(v.begin(), v.end(), 4)\`  
  → 第一个 **大于 4** 的位置（第一个 \`>4\`）→ 指向 \`v[5]\`
- \`equal_range(v.begin(), v.end(), 4)\`  
  → 返回 pair \`{lower_bound, upper_bound}\`，表示所有等于 4 的区间 \`[2, 5)\`

**用途：**

- 统计某值出现次数：\`count = upper - lower\`
- 查找“插入位置”：
  - 要保持有序插入一个 4，可以插在 \`lower_bound\` 或 \`upper_bound\` 处（分别表示插到现有 4 的最前面或最后面）
`} />
            <BinarySearchVisual />
            <MarkdownRenderer content={`
**例子：统计元素出现次数**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 4, 4, 4, 7, 9};
    int x = 4;

    auto lb = lower_bound(v.begin(), v.end(), x);
    auto ub = upper_bound(v.begin(), v.end(), x);

    cout << "第一个>=4的位置: " << (lb - v.begin()) << "\\n";
    cout << "第一个>4的位置: "  << (ub - v.begin()) << "\\n";
    cout << "4 出现次数: " << (ub - lb) << "\\n";

    // equal_range 一步到位
    auto range = equal_range(v.begin(), v.end(), x);
    cout << "equal_range: [" 
         << (range.first  - v.begin()) << ", "
         << (range.second - v.begin()) << ")\\n";
}
\`\`\`

---

### 2.2 \`binary_search\`：是否存在？

**作用：** 在有序区间中，用二分法判断某个值**是否存在**，只返回 \`true/false\`。

内部实现相当于：

\`\`\`cpp
return lower_bound(first, last, value) != last &&
       !comp(value, *lower_bound(...)) && !comp(*lower_bound(...), value);
\`\`\`

**例子：彩票号码是否中奖**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> tickets = {101, 105, 108, 112, 120, 125};
    int mine = 112;

    bool ok = binary_search(tickets.begin(), tickets.end(), mine);
    cout << mine << (ok ? " 中奖了\\n" : " 没中\\n");
}
\`\`\`

---

## 3. 堆算法（优先队列的底层）

堆是一个用数组实现的**完全二叉树结构**，常见为**大顶堆**：

- \`a[0]\` 是最大元素
- 对每个下标 \`i\`：
  - 左子节点：\`2*i + 1\`
  - 右子节点：\`2*i + 2\`
- 性质：父节点永远 ≥ 子节点

堆最适合：

- 随时取最大/最小值（\`O(1)\`）
- 插入/删除最大值（\`O(log n)\`）

STL 的这组算法把普通区间当成“堆”来维护。
`} />
            <HeapVisual />
            <MarkdownRenderer content={`
### 3.1 \`make_heap\`：把数组变成堆

**作用：** 在区间上就地建一个大顶堆（默认用 \`<\` 比较）。

思路（自底向上调整）：

- 从最后一个非叶子结点开始，执行“向下调整”（sift down）
- 直到根结点

**例子：**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 5, 2, 4};

    make_heap(v.begin(), v.end());  // 默认大顶堆

    cout << "建堆后数组: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";
    cout << "堆顶(最大值): " << v.front() << "\\n";
}
\`\`\`

---

### 3.2 \`push_heap\` / \`pop_heap\`：插入和弹出堆顶

**配合 vector 使用模式：**

- 要**插入**一个新值：
  1. \`v.push_back(x);\`
  2. \`push_heap(v.begin(), v.end());\`  // 调整成合法堆

- 要**删除堆顶（最大值）**：
  1. \`pop_heap(v.begin(), v.end());\`  
     这一步会把当前最大值交换到末尾位置 \`v.back()\`，并在 \`[begin, end-1)\` 上重新维护堆
  2. \`v.pop_back();\`  // 真正删除最大值

**例子：用堆维护一组整数的最大值**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> h;

    // 插入若干元素
    int arr[] = {5, 1, 9, 3, 7};
    for (int x : arr) {
        h.push_back(x);
        push_heap(h.begin(), h.end());  // 每次插入后保持堆性质
    }

    cout << "当前堆顶(最大值): " << h.front() << "\\n";

    // 删除堆顶
    pop_heap(h.begin(), h.end());  // 最大值被放到末尾
    int top = h.back();
    h.pop_back();                  // 删除它

    cout << "弹出的最大值: " << top << "\\n";
    cout << "剩余堆: ";
    for (int x : h) cout << x << " ";
    cout << "\\n";
}
\`\`\`

---

### 3.3 \`sort_heap\`：把堆完全排序

**作用：** 在已有堆上反复 \`pop_heap\`，最终得到一个**升序数组**。

过程（大顶堆时）：

1. 堆顶最大元素与末尾交换，缩小堆大小
2. 在缩小后的区间再次调整为堆
3. 重复直到堆大小为 1

最终结果：整个数组升序（因为最大元素被依次放在尾部）。

**例子：**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 5, 2, 4};

    make_heap(v.begin(), v.end());
    sort_heap(v.begin(), v.end());  // 从堆转为有序序列

    cout << "排序后: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";
}
\`\`\`

---

## 4. 排列与重排

### 4.1 \`next_permutation\` / \`prev_permutation\`：下一个/上一个排列

这两个算法在**“字典序”**意义下生成下一个/上一个排列。  
字典序就是按“从左到右比较大小”，类似给字符串排字典顺序。

对数组 \`1 2 3\` 所有排列按照字典序排序：

\`123 < 132 < 213 < 231 < 312 < 321\`

- \`next_permutation\` 会把当前排列变为“**紧接着的那个更大排列**”，如果已经是最大排列，则变为最小排列并返回 \`false\`
- \`prev_permutation\` 则相反

**\`next_permutation\` 的核心原理（生成下一个更大的排列）：**

给定当前序列，例如 \`1 3 5 4 2\`：

1. 从右往左找到**第一对** \`a[i] < a[i+1]\`  
   - 在例子中：\`3 < 5\`，因此 \`i\` 是 \`1\`（下标）
   - 右边 \`5 4 2\` 是一个**最长降序后缀**

2. 在后缀中，从右往左找到**第一个大于 \`a[i]\` 的元素**，记为 \`a[j]\`  
   - 右边：\`5 4 2\` 中，从右往左找第一个 > 3 的，是 \`4\`

3. 交换 \`a[i]\` 和 \`a[j]\`：  
   - \`1 4 5 3 2\`

4. 把 \`i+1\` 之后的后缀**整体翻转**（因为原来是降序，翻转后变为最小升序）  
   - 后缀 \`5 3 2\` 变成 \`2 3 5\`  
   - 最终得到：\`1 4 2 3 5\`，这是**仅比原序列大的最小序列**

**例子：枚举所有排列**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3};

    // 按字典序生成所有排列，前提是一开始是最小排列
    sort(a.begin(), a.end());

    int cnt = 0;
    do {
        for (int x : a) cout << x;
        cout << "\\n";
        ++cnt;
    } while (next_permutation(a.begin(), a.end()));

    cout << "总排列数: " << cnt << "\\n";
}
\`\`\`
`} />
            <PermutationVisual />
            <MarkdownRenderer content={`
---

### 4.2 \`rotate\`：循环左移

**作用：** 将 \`[first, middle)\` 部分旋到后面，整体向左转；\`[middle, last)\` 变成前半部分。

更具体地：

\`\`\`text
原序列: [A B C D E F G]
          ^     ^
        first  middle

rotate(first, middle, last) 之后：
        [D E F G A B C]
          ^       ^
        new first
\`\`\`

原理可以理解为三次反转：

1. 反转前半段 \`[first, middle)\`
2. 反转后半段 \`[middle, last)\`
3. 反转整个 \`[first, last)\`

**例子：让第 3 个元素变成第一个**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3, 4, 5};

    // 让元素 3（下标2）成为新的开头
    rotate(a.begin(), a.begin() + 2, a.end());

    // 结果：3 4 5 1 2
    for (int x : a) cout << x << " ";
    cout << "\\n";
}
\`\`\`

---

### 4.3 \`shuffle\`：随机打乱

现代 C++ 推荐使用 \`std::shuffle\`（需要 \`<random>\`），它使用一个**显式随机数引擎**，实现 Fisher–Yates 洗牌算法：

**Fisher–Yates 洗牌原理：**

对数组下标从后往前 \`i = n-1 .. 1\`：

- 随机生成一个 \`j\`，满足 \`0 ≤ j ≤ i\`
- 交换 \`a[i]\` 与 \`a[j]\`

这样可以保证每个排列出现的概率完全相同。

**例子：洗牌一副牌**

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
using namespace std;

int main() {
    vector<int> cards(52);
    iota(cards.begin(), cards.end(), 1);  // 1..52

    random_device rd;
    mt19937 gen(rd());  // 梅森旋转引擎

    shuffle(cards.begin(), cards.end(), gen);

    cout << "洗牌后: ";
    for (int i = 0; i < 10; ++i) cout << cards[i] << " ";
    cout << "...\\n";
}
\`\`\`
`} />
            <RotateShuffleVisual />
            <MarkdownRenderer content={`
---

### 小结与使用建议

- **完全排序：** 用 \`sort\`，如果需要稳定性就用 \`stable_sort\`
- **只要前 k 个有序：** 用 \`partial_sort\`
- **只要第 k 个正确、两侧粗分区：** 用 \`nth_element\`
- **已排序 + 查找：** 用 \`lower_bound\` / \`upper_bound\` / \`binary_search\`
- **需要优先队列行为：** 用堆算法或直接用 \`priority_queue\`
- **枚举排列：** 用 \`next_permutation\`
- **循环移动：** 用 \`rotate\`
- **随机打乱：** 用 \`shuffle\`

如果你希望，我可以单独画图讲某一个算法的原理（比如 \`nth_element\` 或 \`heap\`）更细一点。
            `} />
        </div>
    )
};
