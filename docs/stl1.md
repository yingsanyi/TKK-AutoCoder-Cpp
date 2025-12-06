从零走进 STL：起源、核心思想和必备语法打底

第 1 天：STL 起源 & 核心思想 + 重要基础语法
学习目标
1. 了解 STL 是什么、解决什么问题。
2. 复习：指针、引用、const 的基本用法。
3. 理解模板函数的基本写法（不讲类模板）。
4. 掌握 4 个关键的 C++11 语法：auto、range-based for、nullptr、using，会用在简单代码里。

---
一、STL 的起源 & 核心思想（用故事来理解）
1. STL 是怎么来的？
a你可以把 C++ 想象成一个“语言 + 标准库”的组合：
- 语言：变量、if、for、函数、指针……
- 标准库：别人帮你写好的各种工具，比如输入输出（cout）、数学库（sqrt）、以及STL。
STL（Standard Template Library，标准模板库）是 C++ 标准库里非常重要的一部分，它主要解决的问题是：
大家写 C++ 时，经常要用到「数组、链表、排序、查找、统计」这些东西，
 一直重复写又麻烦、容易写错，而且性能也不一定好。
于是，程序员们（代表人物 Alexander Stepanov）搞了一个思路：
- 能不能写一套「通用的」数据结构和算法？
- 不管你放的是 int 还是 double，甚至是更复杂的类型，都能用同一套代码？
- 这些代码要经过仔细优化，性能好、使用方便。
于是就有了 STL，它在 1990 年代被接纳进 C++ 标准。

---
2. STL 的三个关键角色：容器 + 算法 + 迭代器
先用一个“工厂”的比喻：
- 容器（Container）
 就是装东西的“仓库”：
  - 像数组的有：以后学的 vector
  - 像链表的有：以后学的 list
  - 像有序集合的有：以后学的 set
  - 像字典/映射的有：以后学的 map
 它们只是“把数据放在哪、怎么存”。
- 算法（Algorithm）
 是工厂里的“机器”：
  - 排序：sort
  - 查找：find
  - 统计：count
  - 求和：accumulate
 算法不关心你是 vector 还是 数组，只要能一个个把元素拿出来就行。
- 迭代器（Iterator）
 是“传送带”：
  - 它指向容器中的某个位置
  - 可以 ++ 移动到下一个位置
  - 可以 * 取出当前元素
 算法通过“迭代器范围”（比如从 begin() 到 end()）来访问容器里的元素。
关键思想：算法和容器解耦
- 排序函数不需要知道你用的是「数组」还是「链表」。
- 只要你提供“从这里到那里”的一段序列（两个迭代器），我就能帮你排序。
- 这样一来，同一套 sort 代码，就可以给不同容器用。

---
二、预备知识复习（一）：指针、引用、const
这些是写 C++ 稍微复杂一点代码（包括 STL）都会用到的，所以先复习一遍。
3. 指针：存“地址”的变量
你可以把“变量在内存里有个门牌号（地址）”这件事记在心里。
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* p = &x;   // p 里装的是 x 的地址

    cout << "x = " << x << "\n";
    cout << "*p = " << *p << "\n";

    *p = 20;       // 通过指针修改 x
    cout << "x = " << x << "\n"; // 变成 20

    return 0;
}
要记的几个符号：
- &x：取变量 x 的地址。
- int* p：p 是“指向 int 的指针”。
- *p：通过指针访问它指向的那个变量。

---
4. 引用：变量的“别名”
可以理解成：给 x 又起了一个新名字 ref，它们指向的是同一个值。
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int& ref = x;   // ref 是 x 的别名

    ref = 20;       // 改 ref，其实就是改 x
    cout << "x = " << x << "\n";   // 20
    cout << "ref = " << ref << "\n";

    return 0;
}
特点：
- 引用在定义时就必须绑定一个变量，不能以后再改绑别的。
- 使用起来就像普通变量，但它代表的就是原来的那个东西。
函数传参时非常常用：
#include <iostream>
using namespace std;

void addOne(int& x) { // x 是实参的引用
    x = x + 1;
}

int main() {
    int a = 5;
    addOne(a);      // a 被改成了 6
    cout << a << "\n";
    return 0;
}

---
3. const：只读的“承诺”
const 的作用：告诉编译器和阅读代码的人：这个东西不能被改。
1）普通变量：
const int x = 10;
// x = 20; // ❌ 报错，不能改
2）函数参数：
#include <iostream>
using namespace std;

void printArray(const int a[], int n) {
    // a[i] = 100; // ❌ 不允许改
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
    }
    cout << "\n";
}

int main() {
    int b[3] = {1, 2, 3};
    printArray(b, 3);
}
这里 const int a[] 表示：在 printArray 里只是“读取”数组，不会改里面的元素。
3）const + 指针（先大致感受一下）
int x = 10;
int y = 20;

int* const p1 = &x;   // p1 本身不能换指向，但 *p1 可以改
*p1 = 15;             // OK
// p1 = &y;           // ❌ 不行

const int* p2 = &x;   // *p2 的内容不能改，但 p2 可以换指向
// *p2 = 15;          // ❌ 不行
p2 = &y;              // OK
暂时不用完全记住所有组合，只需要记住一个常用模式：
函数参数里，有很多 const 类型&，表示“按引用传递，但不会修改”。
后面用 STL 时，比如打印一个数组/容器，经常会看到：
void print(const int a[], int n);
void print(const string& s);

---
三、预备知识复习（二）：函数模板（不讲类模板）
STL 里大量使用“模板函数”。我们先只学函数模板，不碰类。
5. 先用普通函数的方式感受“重复”
int myMaxInt(int a, int b) {
    return a > b ? a : b;
}

double myMaxDouble(double a, double b) {
    return a > b ? a : b;
}
如果还要比较 long long，是不是又得写一个函数？太麻烦了。

---
6. 用函数模板把它变成一套通用代码
#include <iostream>
using namespace std;

// 声明一个模板：有一个类型参数 T
template<typename T>
T myMax(T a, T b) {
    return a > b ? a : b;
}

int main() {
    cout << myMax(3, 5) << "\n";        // 推导出 T 是 int
    cout << myMax(2.5, 3.1) << "\n";    // 推导出 T 是 double

    // 也可以显式写出类型
    cout << myMax<int>(10, 7) << "\n";
    return 0;
}
你可以把它理解为：
template<typename T> 告诉编译器：
 下面这个函数 myMax 不是针对某一种类型，而是“对任意类型 T，只要能用 > 比较，就能工作”。
STL 的 std::max, std::min 也类似。[ref:1,4]
你现在不需要深入理解模板的高级用法，只需要知道：
- 模板就是“泛型”：写一遍代码，多种类型复用。
- template<typename T> 是最基本的语法形式。

---
四、新知识点：auto、range-based for、nullptr、using
这 4 个是 C++11 新增、又和 STL 非常搭配的语法。今天的重点就是把这四个用熟。

---
1. auto：让编译器帮你写类型
1.1 最直观的例子
int main() {
    auto x = 10;      // x 是 int
    auto y = 3.14;    // y 是 double
    auto z = 'A';     // z 是 char
}
auto 不是“动态类型”，只是让编译器在编译时自动推导实际类型。
1.2 为什么在 STL 里尤为好用？
当你以后看到这样的类型时：
// 假设你已经知道 vector<int> 是一个动态数组
vector<int>::iterator it;
// 或者 map<string, int>::iterator it;
写起来非常长，用 auto 直接让编译器帮你写：
auto it = nums.begin();
即使你现在还没学 STL 容器，也可以用数组来体会一下：
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    double b = 3.14;

    auto x = a;   // int
    auto y = b;   // double

    cout << x + y << "\n";
}
1.3 auto + 引用 + const
这个后面配合 range-based for 会一直用到，先感受一下：
int main() {
    int a[3] = {1, 2, 3};

    // 拷贝一份
    for (auto x : a) {  // x 是 int
        x *= 2;         // 不会改到原数组
    }

    // 引用，直接修改数组里的值
    for (auto& x : a) { // x 是 int& 引用
        x *= 2;         // 会修改原数组
    }

    // 只读引用，避免拷贝
    for (const auto& x : a) { // x 是 const int&
        cout << x << " ";
    }
}
简单记忆：
- auto：按值拷贝，可能会有开销。
- auto&：引用，可以修改原来的值。
- const auto&：只读引用，不拷贝，不修改，效率也高。

---
7. range-based for（范围 for 循环）
2.1 基本语法
for (元素类型 变量名 : 数组或容器) {
    // 使用变量名
}
先用数组来练习（你已经熟悉）：
#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};

    // 传统写法：
    for (int i = 0; i < 5; ++i) {
        cout << a[i] << " ";
    }
    cout << "\n";

    // range-based for 写法：
    for (int x : a) {
        cout << x << " ";
    }
    cout << "\n";
}
效果一样，但写法更简洁。
2.2 和引用、auto 一起用
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};

    // 只读
    for (int x : a) {
        cout << x << " ";
    }
    cout << "\n";

    // 修改数组
    for (int& x : a) {
        x *= 2;
    }

    // 再次输出
    for (const auto& x : a) { // const auto& 是 int 的只读引用
        cout << x << " ";
    }
    cout << "\n";
}
你可以把这三个版本都敲一遍，看看输出的变化，强化“值拷贝 vs 引用”的区别。
2.3 哪些东西能用 range-based for？
- 数组：int a[10];
- 很多 STL 容器（以后会学）：vector、string、set、map 等
- 以后你也可以写出“支持 range-based for 的自己的类型”，不过那是后话。

---
3. nullptr：专门用来表示“空指针”
在老的 C/C++ 代码里，你可能看到：
int* p = NULL;
if (p == NULL) { ... }
NULL 本质上是一个 0，可能会产生一点点歧义。
 C++11 引入了关键字 nullptr，专门表示“空指针”。
#include <iostream>
using namespace std;

void foo(int* p) {
    if (p == nullptr) {
        cout << "p is null\n";
    } else {
        cout << "p is not null, *p = " << *p << "\n";
    }
}

int main() {
    int x = 10;
    int* p1 = &x;
    int* p2 = nullptr;

    foo(p1);  // 输出 p is not null...
    foo(p2);  // 输出 p is null
}
结论：
- 以后写 C++，优先使用 nullptr 而不是 NULL 或 0。[ref:4]
- 只要你看到 int* p = nullptr; 就知道：p 现在没指向任何有效的变量。

---
4. using：更舒服的“类型别名”
以前在 C 里我们会写：
typedef long long ll;
typedef int* int_ptr;
C++11 多了一个语法：
using ll = long long;
using int_ptr = int*;
语义更直观：左边是别名，右边是真实类型。
4.1 用来简化类型名
#include <iostream>
using namespace std;

using ll = long long;

ll add(ll a, ll b) {
    return a + b;
}

int main() {
    ll x = 1000000000;
    ll y = 2000000000;
    cout << add(x, y) << "\n";
}
以后学 STL 后会更常用，比如：
using VI = vector<int>;
using VS = vector<string>;

---
五、综合小例子：把今天所有点串起来（不使用结构体和类）
需求：
1. 不停输入整数，直到输入 0 为止（0 不参与后续计算）。
2. 用普通数组暂存（例如最多 100 个数），先不用 STL 容器。
3. 统计： 
  - 一共输入了多少个数
  - 它们的总和
  - 其中的最大值
4. 再把数组里的每个数乘 2，输出新的数组。
5. 在中间演示一次 nullptr 的用法。
6. 大量使用：auto，range-based for，using，const 引用。
代码：
#include <iostream>
using namespace std;

// 类型别名：ll 代表 long long
using ll = long long;

// 打印数组（只读）：用 const 引用防止修改
void printArray(const int a[], int n) {
    cout << "Array: ";
    // 用普通 for
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
    }
    cout << "\n";
}

// 计算和与最大值
void calcSumAndMax(const int a[], int n, ll& sum, int& mx) {
    sum = 0;
    mx = a[0];

    // 用 range-based for + auto 访问数组
    for (int i = 0; i < n; ++i) {
        auto x = a[i]; // auto 推导为 int
        sum += x;
        if (x > mx) mx = x;
    }
}

int main() {
    int a[100];
    int n = 0;

    cout << "输入若干整数，以 0 结束（0 不算在内）:\n";
    while (true) {
        int x;
        cin >> x;
        if (x == 0) break;
        if (n < 100) {
            a[n++] = x;
        }
    }

    if (n == 0) {
        cout << "你没有输入任何非零数字。\n";
        return 0;
    }

    printArray(a, n);

    ll sum;
    int mx;
    calcSumAndMax(a, n, sum, mx);
    cout << "Count = " << n << "\n";
    cout << "Sum = " << sum << "\n";
    cout << "Max = " << mx << "\n";

    // 用 range-based for 的形式修改数组（这里我们用普通 for + 引用来模拟）
    for (int i = 0; i < n; ++i) {
        a[i] *= 2;
    }

    cout << "乘以 2 之后：\n";
    printArray(a, n);

    // nullptr 演示
    int* p = nullptr;      // p 目前不指向任何有效 int
    if (p == nullptr) {
        cout << "指针 p 目前是空指针（nullptr）。\n";
    }

    // 把 p 指向数组的第一个元素
    p = &a[0];
    cout << "p 指向了数组第一个元素，*p = " << *p << "\n";

    return 0;
}
这段代码里，你已经用上了：
- using ll = long long;：类型别名
- const int a[]：只读数组参数
- 引用参数 ll& sum, int& mx：在函数里修改外面的变量
- auto x = a[i];：自动类型推导
- nullptr：安全表示空指针
如果你愿意，我可以在这基础上再加一版「只改成用 range-based for 遍历数组」的版本，让你比较传统写法和新写法的差异。

---