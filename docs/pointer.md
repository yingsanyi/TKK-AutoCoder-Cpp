

---

# 一、指针的基本概念

## 1. 指针的本质

**知识点：**

- 指针是一个“变量”，里面存的是“内存地址”，不是普通的数值意义上的数据。
- 指针类型决定：
  - 它可以指向什么类型的对象（`int*` 不能直接指向 `double`）。
  - 做 `++p` / `p + n` 时，前进/后退多少字节（按所指类型大小）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int *p = &x;    // p 里存的是 x 的地址

    cout << "x 的值: " << x << endl;
    cout << "x 的地址: " << &x << endl;
    cout << "p 里的内容(也是地址): " << p << endl;
    cout << "通过 p 访问 x 的值: " << *p << endl;

    return 0;
}
```

**讲解：**

- `x` 是普通变量，`x` 代表它的值，`&x` 代表它的地址。
- `p` 是指针变量，存的是 `&x` 这个地址。
- `*p` 表示“去那个地址把里面的值取出来”，所以等同于 `x`。  
  你可以把“指针”想成地址的“快递单号”，`*` 就是“根据快递单号取快递”。

---

## 2. 指针与普通变量的区别

**知识点：**

- 普通变量 = 直接存值。
- 指针变量 = 存的是某个变量所在的内存地址。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;     // 普通变量
    int *p = &x;    // 指针变量，指向 x

    cout << "x 的值: " << x << endl;
    cout << "p 的值(地址): " << p << endl;

    // 修改 x
    x = 20;
    cout << "修改 x 后，x = " << x << ", *p = " << *p << endl;

    // 通过指针修改 x
    *p = 30;
    cout << "通过 *p 修改后，x = " << x << ", *p = " << *p << endl;
}
```

**讲解：**

- 同一个对象 `x`，你可以用“变量名”直接访问，也可以用“地址 + 指针”间接访问。
- 通过 `*p = 30` 修改的是 `x` 占用的那块内存，所以 `x`、`*p` 一起变。

---

## 3. 指针的常见用途

**知识点：**

- 按地址传参：编写函数时，通过指针修改实参。
- 动态内存：`new` / `delete` 必须用指针接收和释放。
- 动态数据结构：链表、树、图等通常用指针连接节点。
- C 接口：很多 C API 使用指针作为参数或返回值。

**示例 1：按地址传参**

```cpp
#include <iostream>
using namespace std;

void swapByPointer(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main() {
    int x = 1, y = 2;
    swapByPointer(&x, &y);
    cout << "x = " << x << ", y = " << y << endl; // x=2, y=1
}
```

**示例 2：动态申请一个 `int`**

```cpp
#include <iostream>
using namespace std;

int main() {
    int *p = new int(100); // 在堆上申请一个 int，并初始化为 100
    cout << "*p = " << *p << endl;
    delete p;              // 用完记得释放
    p = nullptr;           // 防止变成悬空指针
}
```

**讲解：**

- 指针让函数能“直接操作”外部变量；  
- 指针是“动态内存”的唯一入口；  
- 指针也是连接两个对象（比如链表节点）的“桥”。

---

# 二、指针的定义与声明语法

## 1. 基本指针声明

**知识点：**

- 写法：`T *p;`，读作“`p` 是一个指向 `T` 的指针”。
- `int *p;` 和 `int* p;` 语义一样，只是风格问题。
- `int *p, q;`：`p` 是 `int*`，`q` 是 `int`，容易误解，建议一行只声明一个变量。

**示例：**

```cpp
int *p;       // p 是 int 指针
double* d;    // d 是 double 指针
char *c1, c2; // c1 是 char*，c2 是 char
```

**讲解：**

- 星号 `*` 是“和变量名绑在一起”的：`char *c1, c2;` 中只有 `c1` 是指针。
- 为了避免误会，更推荐：

```cpp
char *c1;
char c2;
```

---

## 2. 初始化方式

**知识点：**

- 好习惯：**定义时就初始化指针**。
- 常见初始化：
  - 指向已有对象：`int x = 10; int *p = &x;`
  - 空指针：`int *p = nullptr;`（C++11 推荐）

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;

    int *p1 = &x;       // 指向已有变量
    int *p2 = nullptr;  // 空指针，当前不指向任何对象

    cout << "*p1 = " << *p1 << endl;  // OK
    if (p2 == nullptr) {
        cout << "p2 是空指针，不能解引用" << endl;
    }

    // int *p3; // 未初始化，值不确定，不能用！

    return 0;
}
```

**讲解：**

- 未初始化的指针就像“随机门牌号”，打开就是炸弹（未定义行为）。
- 初始化为 `nullptr` 至少可以在使用前用 `if (p)` 检查。

---

## 3. 顶层 `const` 与底层 `const`

**知识点：**

- 顶层 `const`：修饰变量本身，表示“这个变量不能被改动”。
- 底层 `const`：修饰指针指向的对象，表示“不能通过这个指针改它指向的内容”。

**示例：顶层 `const`（指针本身是常量）**

```cpp
int x = 10;
int y = 20;

int *const p = &x; // p 一旦指向 x，就不能指向别的

*p = 30;   // OK，修改 x
// p = &y; // 错误，p 是 const，不能改指向
```

**示例：底层 `const`（指向 const 的指针）**

```cpp
int x = 10;
int y = 20;

const int *p = &x; // 或 int const *p = &x;

// *p = 30; // 错误，不能通过 p 修改 x
p = &y;     // OK，可以让 p 指向其他 int
```

**讲解：**

- 记忆小技巧：  
  - “离 `*` 近的 const”一般修饰指向的内容（底层 const，如 `const int *p`）。  
  - “离变量名近的 const”一般修饰变量本身（顶层 const，如 `int *const p`）。

---

## 4. 多级指针

**知识点：**

- `int **pp;`：`pp` 是“指向 `int*` 的指针”（即**指针的指针**）。
- 典型用途：函数需要修改“外层的指针变量本身”。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int *p = &x;    // p -> x
    int **pp = &p;  // pp -> p

    cout << "x = " << x << endl;
    cout << "*p = " << *p << endl;
    cout << "**pp = " << **pp << endl;

    **pp = 20;      // 修改 x
    cout << "修改后 x = " << x << endl;
}
```

**讲解：**

- 一层解引用 `*pp` 得到的是 `p`，再解引用 `**pp` 得到的是 `x`。
- 用多级指针可以修改外层的指针（见后面“指针与函数”部分）。

---

# 三、取地址与解引用运算

## 1. 取地址运算符 `&`

**知识点：**

- `&x`：得到 `x` 的地址，类型是 `T*`。
- 只能对有实际存储的对象取地址，不能是纯右值（比如 `&(x + y)` 非法）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int *p = &x;  // &x 是 int*

    cout << "x 的地址: " << &x << endl;
    cout << "p 的值(也是地址): " << p << endl;

    // &p = x; // 错误，&p 是右值，不能赋值

    return 0;
}
```

**讲解：**

- `&` 在这里的含义是“取地址”，不同于逻辑与 `&&`、按位与 `&`（运算符重用）。
- `&p` 自己就是“p 的地址”，类似于“地址的地址”。

---

## 2. 解引用运算符 `*`

**知识点：**

- `*p`：访问 `p` 指向的对象。
- 可以读值，也可以写值。
- 唯一前提：`p` 必须指向一块**有效存储**。否则 UB（未定义行为）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int *p = &x;

    cout << "*p = " << *p << endl; // 读
    *p = 10;                       // 写
    cout << "x = " << x << endl;

    int *bad = nullptr;
    // cout << *bad << endl; // 未定义行为：解引用空指针

    return 0;
}
```

**讲解：**

- `*p = 10;` = “根据地址去那个地方写一个 10”。
- 解引用空指针、未初始化指针、悬空指针都属于严重错误。

---

## 3. 指针与成员访问

**知识点：**

- 若 `p` 是指向对象的指针：
  - `(*p).member`：先解引用得到对象，再点访问成员。
  - `p->member`：语法糖，等价于 `(*p).member`。
- 经常用于堆对象或通过函数返回的指针。

**示例：**

```cpp
#include <iostream>
using namespace std;

struct Point {
    int x;
    int y;
};

int main() {
    Point pt{1, 2};
    Point *p = &pt;

    cout << "(*p).x = " << (*p).x << ", (*p).y = " << (*p).y << endl;
    cout << "p->x = " << p->x << ", p->y = " << p->y << endl;

    p->x = 10;
    cout << "修改后 pt.x = " << pt.x << endl;
}
```

**讲解：**

- `->` 是指针“访问成员”的专用符号，避免写太多括号。
- 结构体、类、动态分配对象（`new`）都大量使用这种写法。

---

# 四、指针与 `const` 的各种组合

## 1. 指向常量的指针（底层 `const`）

**知识点：**

- 写法：`const int *p;` 或 `int const *p;`
- 含义：不能通过 `p` 修改它指向的对象，但可以改变指针本身的指向。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 20;

    const int *p = &x;  // 指向常量的指针

    cout << "*p = " << *p << endl;
    // *p = 30; // 错误，不能通过 p 改 x

    p = &y;             // OK，可以指向别的 int
    cout << "*p = " << *p << endl;
}
```

---

## 2. 常量指针（顶层 `const`）

**知识点：**

- 写法：`int *const p = &x;`
- 含义：指针本身是常量，不能改指向，但可以通过它改所指对象。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 20;

    int *const p = &x;  // 常量指针

    *p = 30;            // OK，x 变为 30
    cout << "x = " << x << endl;

    // p = &y; // 错误，p 是 const，不能改指向
}
```

---

## 3. 既指向常量又是常量指针

**知识点：**

- 写法：`const int *const p = &x;`
- 含义：既不能改指向，也不能通过它改值。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;

    const int *const p = &x;

    cout << "*p = " << *p << endl;
    // *p = 20; // 错误：指向常量，不能改值
    // p = nullptr; // 错误：p 自身也是 const

    return 0;
}
```

---

## 4. `const` 与多级指针

**知识点：**

- 每一层 `*` 都可以有自己的 `const`：
  - `int * const *pp;`：指向“常量指针”的指针。
  - `int ** const pp;`：`pp` 自己是常量指针，指向 `int*`。
  - `const int **pp;`：`pp` 指向“指向 `const int` 的指针”。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 20;

    int *p = &x;
    int *const cp = &x;    // cp 永远指向 x
    int * const *pp = &cp; // pp 指向一个“常量指针”

    // *cp = 30;   // OK，改 x
    // cp = &y;    // 错误，cp 是 const

    // *pp = &y;   // 错误，*pp 就是 cp，是 const 指针
    **pp = 40;     // 等价于 *cp = 40; 改 x

    cout << "x = " << x << endl;
}
```

**讲解：**

- 读这种声明时“从右向左”读，有助理解是谁是 const，谁是指针。

---

# 五、空指针与指针初始化

## 1. 空指针的表示方式

**知识点：**

- C++11 之后推荐：`nullptr`。
- 旧方式：`NULL` 或 `0`，可能与整数混淆。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int *p1 = nullptr; // 推荐写法
    int *p2 = NULL;    // 旧式，通常是 0
    int *p3 = 0;       // 字面量 0

    cout << std::boolalpha;
    cout << "p1 是否为 null? " << (p1 == nullptr) << endl;
}
```

**讲解：**

- `nullptr` 有独立类型 `std::nullptr_t`，不会被误当成整数参与重载选择，类型更安全 [ref:2]。

---

## 2. 指针初始化策略

**知识点：**

- 最安全的策略：  
  - **定义时初始化**：要么指向实际对象，要么设为 `nullptr`。
  - 避免出现未初始化指针。

**示例（不良示例 + 改进示例）：**

```cpp
void bad() {
    int *p;       // 未初始化
    // *p = 10;   // 未定义行为：随机地址写 10
}

void good() {
    int *p = nullptr;   // 明确表示“当前没指向任何对象”
    if (p) {
        *p = 10;        // 不会执行
    }
}
```

---

## 3. 使用前检查

**知识点：**

- 使用前至少要保证“不为 `nullptr`”，更好的是“明确知道它指向的对象仍然活着”。

**示例：**

```cpp
#include <iostream>
using namespace std;

void printValue(const int *p) {
    if (!p) {
        cout << "空指针，无法打印值\n";
        return;
    }
    cout << "值为: " << *p << endl;
}

int main() {
    int x = 100;
    int *p1 = &x;
    int *p2 = nullptr;

    printValue(p1);
    printValue(p2);
}
```

**讲解：**

- 空指针检查可以防止立刻崩溃，但防不了“悬空指针”（指向已经失效的对象）。

---

# 六、指针运算（算术与比较）

> 这一节理论上经常配合数组来讲，这里只给出小例子并强调规则本身 [ref:1,2,6]。

## 1. 指针加减整数

**知识点：**

- \(p + n\)：向后移动 \(n\) 个元素；\(p - n\)：向前移动 \(n\) 个元素。
- 步长 = 所指类型的 `sizeof(T)`。
- 只有在“指向同一数组元素或尾后”的前提下，这种算术才是定义良好的。

**示例（数组场景便于理解）：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {10, 20, 30};
    int *p = a;        // p 指向 a[0]

    cout << "*p = " << *p << endl;       // 10
    cout << "*(p+1) = " << *(p + 1) << endl; // 20
    cout << "*(p+2) = " << *(p + 2) << endl; // 30
}
```

**警告：**

- 对单个独立对象，如 `int x; int *p = &x; ++p;`，这个 `++p` 就是未定义行为。

---

## 2. 自增 / 自减

**知识点：**

- `++p` 相当于 `p = p + 1`。
- 同样，只应该在指向数组（或某段连续内存）的指针上使用。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};
    int *p = a;

    cout << *p << endl;   // 1
    ++p;
    cout << *p << endl;   // 2
    p++;
    cout << *p << endl;   // 3
}
```

---

## 3. 指针相减

**知识点：**

- \(p - q\) 的结果类型是带符号整数（通常是 `std::ptrdiff_t`）。
- 只有当 `p` 和 `q` 指向同一数组内的元素（或尾后）时才有定义。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[4] = {10, 20, 30, 40};
    int *p = &a[3];
    int *q = &a[1];

    cout << "p - q = " << (p - q) << endl; // 2
}
```

---

## 4. 指针比较

**知识点：**

- 相等比较（`==` / `!=`）：任意两个对象指针都可以比较。
- 大小比较（`<, >, <=, >=`）：只有同一数组内指针比较才有定义。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 1, y = 2;
    int *p = &x;
    int *q = &y;

    cout << boolalpha;
    cout << "p == q ? " << (p == q) << endl; // 一般为 false，合法

    int a[3];
    int *p1 = &a[0];
    int *p2 = &a[2];
    cout << "p1 < p2 ? " << (p1 < p2) << endl; // 合法，有定义
}
```

---

# 七、指针与函数

## 1. 指针作为函数参数（按地址传参）

**知识点：**

- 函数参数为指针时，可以通过它修改调用者的对象。

**示例：**

```cpp
#include <iostream>
using namespace std;

void increment(int *p) {
    if (p) {
        (*p)++; // 等价于 *p = *p + 1;
    }
}

int main() {
    int x = 10;
    increment(&x);
    cout << "x = " << x << endl; // 11
}
```

---

## 2. 指向指针的指针用于修改指针本身

**知识点：**

- 如果函数需要“把一个指针改成别的地址”，就要传“指针的地址”，即 `T**`。

**示例：**

```cpp
#include <iostream>
using namespace std;

void resetToNull(int **pp) {
    *pp = nullptr; // 改变外层指针的值
}

int main() {
    int x = 10;
    int *p = &x;

    cout << "调用前 p == nullptr ? " << boolalpha << (p == nullptr) << endl;
    resetToNull(&p);
    cout << "调用后 p == nullptr ? " << (p == nullptr) << endl;
}
```

---

## 3. 函数指针（基础）

**知识点：**

- 形式：`返回类型 (*指针名)(参数列表)`。
- 可以存放某个普通函数的地址，通过它来调用函数。

**示例：**

```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    // 声明一个函数指针 pf，指向返回 int、参数为(int,int) 的函数
    int (*pf)(int, int) = add;

    cout << pf(2, 3) << endl;      // 5
    cout << (*pf)(4, 5) << endl;   // 9

    return 0;
}
```

---

## 4. 成员函数指针（进阶）

**知识点：**

- 形式：`返回类型 (类名::*指针名)(参数列表)`。
- 调用时必须和对象/对象指针配合使用：`(obj.*pf)(...)` 或 `(pObj->*pf)(...)`。

**示例：**

```cpp
#include <iostream>
using namespace std;

struct Foo {
    void hello(int x) {
        cout << "Hello, x = " << x << endl;
    }
};

int main() {
    void (Foo::*pf)(int) = &Foo::hello; // 成员函数指针

    Foo obj;
    Foo *pObj = &obj;

    (obj.*pf)(10);   // 通过对象调用
    (pObj->*pf)(20); // 通过指针调用
}
```

---

# 八、`void*` 与类型转换

## 1. `void*` 的作用

**知识点：**

- `void*` 可以存储“未知类型”对象的地址。
- 无法直接解引用，因为不知道类型和大小。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    double y = 3.14;

    void *pv1 = &x;
    void *pv2 = &y;

    // cout << *pv1; // 错误：不知道类型，不能解引用
}
```

---

## 2. 从具体类型到 `void*`

**知识点：**

- 对象指针可以隐式转换为 `void*`（不用写转换），但反向不行。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int *p = &x;
    void *pv = p; // 隐式转换，OK

    cout << "pv = " << pv << endl;
}
```

---

## 3. 从 `void*` 恢复具体类型

**知识点：**

- 需要强制转换（推荐 `static_cast<T*>(pv)`）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;
    void *pv = &x;               // 隐式 from int* to void*

    int *p = static_cast<int*>(pv); // 显式 from void* to int*
    *p = 20;

    cout << "x = " << x << endl;     // 20
}
```

---

## 4. `void*` 的局限

**知识点：**

- 不能做算术运算（不知道元素大小）。
- 通常也不和函数指针互转。
- 丧失类型信息，使用时要非常小心。

---

# 九、动态内存与指针

## 1. `new` / `delete` 基本使用

**知识点：**

- `new` 在堆上申请内存，返回一个指针。
- `delete` 释放由 `new` 得到的内存，对应使用。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int *p = new int(5);   // 分配并初始化为 5
    cout << "*p = " << *p << endl;

    *p = 10;
    cout << "*p = " << *p << endl;

    delete p;      // 释放内存
    p = nullptr;   // 防止悬空指针

    return 0;
}
```

---

## 2. 悬空指针（dangling pointer）

**知识点：**

- 悬空指针：指向已经被释放、或生命周期结束的对象。
- 对悬空指针做解引用、算术、比较都可能是 UB。

**示例：**

```cpp
#include <iostream>
using namespace std;

int* getPointer() {
    int x = 10;
    return &x; // 返回局部变量地址 —— 严重错误
}

int main() {
    int *p = getPointer();
    // 此时 x 已经析构，p 成为悬空指针
    // cout << *p << endl; // UB，千万别这样干
}
```

---

## 3. 内存泄漏与指针

**知识点：**

- 有 `new` 没有匹配的 `delete` 就会造成内存泄漏。
- 真实程序中常用智能指针代替裸指针管理资源。

**示例（泄漏）：**

```cpp
void leak() {
    int *p = new int(100);
    // 没有 delete p; 这块堆内存就再也回不来了
}
```

**示例（使用智能指针避免泄漏，略触及）：**

```cpp
#include <memory>
using namespace std;

void safe() {
    auto p = std::make_unique<int>(100); // 自动释放，无需手动 delete
}
```

---

# 十、未定义行为与安全性

## 1. 常见未定义行为场景

**知识点 + 示例：**

1. 解引用未初始化指针：

   ```cpp
   int *p;      // 未初始化
   *p = 10;     // UB
   ```

2. 解引用 `nullptr`：

   ```cpp
   int *p = nullptr;
   // int x = *p; // UB，常见崩溃
   ```

3. 解引用悬空指针：

   ```cpp
   int *p = new int(5);
   delete p;
   // *p = 10;   // UB：指向已释放内存
   ```

4. 越界指针算术或解引用：

   ```cpp
   int a[3] = {1, 2, 3};
   int *p = a + 3;   // 指向尾后位置，指针本身合法
   // int x = *p;    // UB：尾后位置不可解引用
   ```

5. 使用已 `delete` 过的指针参与除与 `nullptr` 比较外的其它操作，也可能 UB。

---

## 2. 安全实践

**知识点：**

- 定义时初始化（指向对象或 `nullptr`）。
- 每次 `delete` 后立即把指针置为 `nullptr`。
- 能用局部变量 / 引用 / 智能指针，就尽量少用裸指针做所有权管理。

**示例（相对安全的写法）：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int *p = nullptr;      // 初始化为 nullptr

    {
        int *q = new int(10);
        p = q;
        cout << *p << endl;
        delete q;
        q = nullptr;
        p = nullptr;       // 同步置空，防止误用
    }

    if (!p) {
        cout << "p 是空指针，安全\n";
    }
}
```

---
