
---

# 一、一维数组的基本概念与内存布局

## 1. 一维数组的定义与内存连续性

**知识点：**

- 一维数组定义：`T a[N];`  
  - `T` 是元素类型，`N` 是编译期常量表达式（传统 C 风格数组）。
- 数组在内存中是**连续存储**的：
  - `a[0]` 紧挨着 `a[1]`，以此类推…
  - 相邻元素地址相差 `sizeof(T)` 字节。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {10, 20, 30, 40, 50};

    cout << "a[0] 的地址: " << &a[0] << endl;
    cout << "a[1] 的地址: " << &a[1] << endl;
    cout << "a[2] 的地址: " << &a[2] << endl;

    cout << "每个元素占字节数: " << sizeof(int) << endl;
}
```

**讲解：**

- 输出的地址会按固定步长增加，例如在 32 位 `int` 上，相邻元素地址差通常是 4。
- 这是**指针与数组融合**的基础：指针可以利用“连续性”做运算。

---

# 二、数组名与指针的关系（数组名衰变）

## 2. 数组名到指针的“衰变”规则

**知识点：**

- 在大多数表达式中，一维数组名 `a` 会**自动转换（衰变）为**指向首元素的指针 `T*`。
- 例外：`sizeof(a)`、`&a`、初始化内置数组等地方，`a` 保持“数组类型”。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};

    int *p = a;       // a 衰变为 int*，指向 a[0]
    cout << "p == &a[0]? " << boolalpha << (p == &a[0]) << endl;

    cout << "sizeof(a) = " << sizeof(a) << endl;    // 整个数组大小
    cout << "sizeof(p) = " << sizeof(p) << endl;    // 指针大小

    return 0;
}
```

**讲解：**

- `int *p = a;` 等价于 `int *p = &a[0];`。
- `sizeof(a)` 是整个数组的字节数，例如 `3 * sizeof(int)`；  
  `sizeof(p)` 只是一个指针的大小（在 64 位通常是 8 字节）。
- 这说明“数组”和“指针”在类型上是不同的，只是在很多表达式里数组名会退化成指针。

---

## 3. `a`、`&a`、`&a[0]` 三者的区别

**知识点：**

- 对 `int a[3];`：
  - `a`：在大多数表达式中衰变为 `int*`，指向 `a[0]`。
  - `&a[0]`：类型是 `int*`，也指向首元素。
  - `&a`：类型是 `int (*)[3]`，指向“整个数组”的指针（数组指针）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};

    int *p1 = a;        // int*
    int *p2 = &a[0];    // int*

    int (*pArr)[3] = &a; // 指向整个数组的指针，类型不同

    cout << boolalpha;
    cout << "p1 == p2? " << (p1 == p2) << endl; // true
    cout << "&a[0] == a? " << (&a[0] == a) << endl; // true (都当作 int*)

    cout << "&a = " << &a << endl;
    cout << "a   = " << a   << endl;
}
```

**讲解：**

- `&a` 的类型是“指向 3 个 `int` 组成的数组”的指针，与 `int*` 不同。
- 但在打印时它们最终都会以地址形式输出，看起来近似，只是**类型含义不同**。

---

# 三、数组元素访问：下标与指针运算的等价性

## 4. `a[i]` 与 `*(a + i)` 的等价关系

**知识点：**

- 定义：`a[i]` 在语义上等价于 `*(a + i)`。
- 对于指针 `p`，`p[i]` 也等价于 `*(p + i)`。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;

    cout << "a[2]      = " << a[2] << endl;
    cout << "*(a + 2)  = " << *(a + 2) << endl;
    cout << "p[2]      = " << p[2] << endl;
    cout << "*(p + 2)  = " << *(p + 2) << endl;
}
```

**讲解：**

- `a + 2` 是指向 `a[2]` 的指针。
- `*(a + 2)` 解引用得到 `a[2]`。
- 完全一样的逻辑也适用于 `p`（只要 `p` 指向这个数组或同样的连续内存）。

---

## 5. `1[a]` 语法的本质（理解而不推荐使用）

**知识点：**

- 标准规定：`x[y]` 被定义为 `*(x + y)`。
- 于是 `a[1]` 等价于 `*(a + 1)`，也等价于 `*(1 + a)`，也就是 `1[a]`。
- 写 `1[a]` 虽然合法，但严重影响可读性，不建议使用，只作为理解下标运算的“数学本质”。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {10, 20, 30};

    cout << "a[1]  = " << a[1] << endl;
    cout << "1[a]  = " << 1[a] << endl;  // 不推荐，但确实等价

    return 0;
}
```

---

# 四、指针与数组元素地址

## 6. 用指针遍历一维数组

**知识点：**

- 常见写法：用一个 `T*` 从 `a` 走到 `a + N`，通过 `*p` 访问元素。
- `p` 从 `a` 增加到 `a + N`，类似于下标从 0 到 N-1。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};

    int *p = a;            // 指向 a[0]
    int *end = a + 5;      // 指向尾后位置 a[5] (不可解引用)

    while (p != end) {
        cout << *p << " ";
        ++p;               // 指向下一个元素
    }
    cout << endl;
}
```

**讲解：**

- `end` 是“尾后指针”，常见于 STL 的 `begin`/`end` 模式。
- `p` 每次 `++` 都移动一个元素（不是一个字节，是 `sizeof(int)` 个字节）。

---

## 7. 通过指针修改数组元素

**知识点：**

- 只要指针指向该数组的元素，就可以通过 `*p` 修改对应元素。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {10, 20, 30};
    int *p = a;  // 指向 a[0]

    *p = 100;        // a[0] = 100
    *(p + 1) = 200;  // a[1] = 200
    p[2] = 300;      // a[2] = 300

    cout << a[0] << " " << a[1] << " " << a[2] << endl;
}
```

**讲解：**

- 下标访问、指针偏移、解引用三种写法本质一样。
- 注意不要越界：`p + i` 必须确保在 `[a, a + N)` 范围内。

---

# 五、数组与 `sizeof`、指针与 `sizeof` 的区别

## 8. `sizeof(a)` vs `sizeof(p)`

**知识点：**

- 对 `int a[10];`：
  - `sizeof(a)` = `10 * sizeof(int)`。
- 若 `int *p = a;`：
  - `sizeof(p)` = 指针大小，与数组长度无关（例如 8 字节）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[10];

    int *p = a;

    cout << "sizeof(a) = " << sizeof(a) << endl;
    cout << "sizeof(p) = " << sizeof(p) << endl;
    cout << "数组长度 = sizeof(a) / sizeof(a[0]) = "
         << sizeof(a) / sizeof(a[0]) << endl;
}
```

**讲解：**

- 常见写法：`int n = sizeof(a) / sizeof(a[0]);` 来得到编译期数组长度。
- **一旦数组被传给函数或存到指针里，就再也拿不到原始长度了**（只能由调用者单独传入）。

---

# 六、指针与数组上的算术运算

## 9. 指针加减整数在数组中的合法用法

**知识点：**

- 对 `int a[N]; int *p = a;`
  - `p + i` 合法范围是从 `a` 到 `a + N`（尾后指针）。
  - 超出这个区间就属于未定义行为。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[4] = {10, 20, 30, 40};
    int *p = a;

    cout << "*(p + 0) = " << *(p + 0) << endl; // 10
    cout << "*(p + 1) = " << *(p + 1) << endl; // 20
    cout << "*(p + 2) = " << *(p + 2) << endl; // 30
    cout << "*(p + 3) = " << *(p + 3) << endl; // 40

    int *end = a + 4; // 尾后指针，不能解引用
    cout << boolalpha << "end == &a[4]? (非法访问) : " << (end == &a[4]) << endl;
}
```

**讲解：**

- `a + 4` 是合法的“尾后指针”，只能做比较或用作循环终止条件，**不能** `*end`。
- 指针的算术运算与数组的内存连续性是紧密绑定的。

---

## 10. 指针相减得到元素个数

**知识点：**

- 若 `p` 和 `q` 指向同一数组中的元素（或尾后），`p - q` 的结果为它们之间相差的元素个数（`ptrdiff_t`）。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {10, 20, 30, 40, 50};

    int *p = &a[4];  // 指向 a[4]
    int *q = &a[1];  // 指向 a[1]

    cout << "p - q = " << (p - q) << endl; // 3 (a[4] 和 a[1] 之间隔着 3 个元素)
}
```

**讲解：**

- `p - q == 3` 意味着：从 `a[1]` 走到 `a[4]` 需要前进 3 次。
- 只允许同一数组中的指针做这样的减法，跨对象减法是未定义行为。

---

## 11. 数组内指针的比较

**知识点：**

- 若两个指针指向同一数组中的元素或尾后位置，`<, <=, >, >=` 的比较是有定义的。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};

    int *p = &a[0];
    int *q = &a[2];

    cout << boolalpha;
    cout << "p < q ? " << (p < q) << endl; // true
    cout << "p == q ? " << (p == q) << endl; // false
}
```

**讲解：**

- STL 容器迭代器就是利用这种“在同一序列中的指针比较”来判断遍历是否结束。

---

# 七、数组作为函数参数：指针与数组形参

## 12. 一维数组形参退化为指针

**知识点：**

- 函数形参写法：
  - `void foo(int a[]);`
  - `void foo(int a[10]);`
  - `void foo(int *a);`
- 三种写法在函数内部**本质完全一样**：`a` 都是 `int*`。

**示例：**

```cpp
#include <iostream>
using namespace std;

void print1(int a[], int n) {
    for (int i = 0; i < n; ++i) cout << a[i] << " ";
    cout << endl;
}

void print2(int a[10], int n) {
    for (int i = 0; i < n; ++i) cout << a[i] << " ";
    cout << endl;
}

void print3(int *a, int n) {
    for (int i = 0; i < n; ++i) cout << a[i] << " ";
    cout << endl;
}

int main() {
    int a[5] = {1, 2, 3, 4, 5};
    print1(a, 5);
    print2(a, 5);
    print3(a, 5);
}
```

**讲解：**

- 形参中的 `[]` 和具体数字只是“阅读提示”，对类型没影响。
- 在函数体内用 `sizeof(a)` 得到的是指针大小，而非数组大小。

---

## 13. 传递数组长度的必要性

**知识点：**

- 函数中只知道一个 `int*`，不知道它指向数组有多长。
- 必须额外传长度（或者用终止标记，比如 C 字符串的 `\0`）。

**示例：**

```cpp
#include <iostream>
using namespace std;

void printArray(const int *a, int n) {
    for (int i = 0; i < n; ++i) {
        cout << a[i] << " ";
    }
    cout << endl;
}

int main() {
    int a[4] = {10, 20, 30, 40};
    printArray(a, 4); // 需要把长度一起传进去
}
```

**讲解：**

- 这就是 C 风格数组的一个缺点：**长度信息与数据本身是分离的**。

---

# 八、指向数组的指针（数组指针）

> 这是“指针与数组”中相对进阶但很考察语法功底的知识点。

## 14. 指向一维数组的指针的声明

**知识点：**

- 对 `int a[3];`：
  - `int (*p)[3] = &a;`：`p` 是“指向含 3 个 `int` 的数组”的指针。
- 括号必须加：`int *p[3];` 是“指针数组”，而不是“数组指针”。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};

    int (*p)[3] = &a;  // p 是数组指针

    cout << "(*p)[0] = " << (*p)[0] << endl;
    cout << "(*p)[1] = " << (*p)[1] << endl;
    cout << "(*p)[2] = " << (*p)[2] << endl;
}
```

**讲解：**

- `*p` 的类型是 `int[3]`，因此 `(*p)[i]` 就是数组下标访问。
- 对比：`int *q[3];` 是“有 3 个 `int*` 的数组”，和上面的完全不同。

---

## 15. 数组指针常见使用场景（比如函数参数）

**知识点：**

- 当函数需要知道“数组的精确长度”（尤其是多维数组第二维及之后），会用“数组指针”作为参数。

**示例（接收一维数组的数组指针）**：

```cpp
#include <iostream>
using namespace std;

// 接收一个指向长度为3的一维数组的指针
void printArr3(int (*p)[3]) {
    for (int i = 0; i < 3; ++i) {
        cout << (*p)[i] << " ";
    }
    cout << endl;
}

int main() {
    int a[3] = {10, 20, 30};
    printArr3(&a);
}
```

**讲解：**

- 这种写法可以让函数“知道数组长度就是 3”，从而不需要额外传长度（但也失去泛化能力）。
- 对多维数组 `int a[2][3];` 来说，形参常写成 `void foo(int (*p)[3]);`，第二维必须写出来。

---

# 九、指针数组（数组的每个元素是指针）

> 这一块属于“指针与一维数组”交叉的另一个方向——数组本身是由指针组成。

## 16. 指针数组的定义与使用

**知识点：**

- `T *a[N];`：这是一个“有 N 个指针元素的数组”。
- 每个元素都是 `T*`，可以指向不同的对象。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10, y = 20, z = 30;

    int *arr[3];  // 指针数组：包含3个 int*

    arr[0] = &x;
    arr[1] = &y;
    arr[2] = &z;

    for (int i = 0; i < 3; ++i) {
        cout << *arr[i] << " ";
    }
    cout << endl;
}
```

**讲解：**

- `arr` 的类型是“数组”，但它的每个元素是 `int*`。
- 这和“数组指针”`int (*p)[3]` 完全不同；一个是“数组”，一个是“指针”。

---

# 十、`const` 指针与数组

## 17. 指向常量元素的指针遍历数组

**知识点：**

- `const int *p = a;` 表示：不能通过 `p` 修改数组元素。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};
    const int *p = a;

    // *p = 10; // 错误，不能改数组元素
    for (int i = 0; i < 3; ++i) {
        cout << p[i] << " ";
    }
    cout << endl;
}
```

**讲解：**

- 常见于“只读访问”的接口，防止函数意外修改数组。

---

## 18. 指向数组的常量指针（不能改变指向）

**知识点：**

- `int (*const p)[3] = &a;`：`p` 自身是 const，不能改成指向别的数组。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};
    int b[3] = {4, 5, 6};

    int (*const p)[3] = &a;

    (*p)[0] = 10;   // 可以通过 p 修改 a
    // p = &b;      // 错误，p 是 const

    for (int i = 0; i < 3; ++i) {
        cout << (*p)[i] << " ";
    }
    cout << endl;
}
```

---

# 十一、数组中的指针算术越界与未定义行为

## 19. 尾后指针合法，越界解引用非法

**知识点：**

- `a + N` 是合法的尾后指针，但不能解引用。
- `a + N + 1` 甚至连作为指针值都是未定义行为。

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[3] = {1, 2, 3};
    int *end = a + 3;   // 尾后指针，合法

    // int x = *end;    // 未定义行为：越界访问

    // int *bad = a + 4; // 语义上就已经越出数组范围（UB）
}
```

**讲解：**

- 标准允许你创建一个指向“尾后位置”的指针（常用作循环终止条件），  
  但**绝不允许**对那个位置进行解引用。

---

# 十二、一维动态数组与指针（`new[]` / `delete[]`）

## 20. 用指针管理一维动态数组

**知识点：**

- 动态分配一维数组：`T *p = new T[N];`
- 释放：`delete[] p;`

**示例：**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int *p = new int[n];  // 动态数组

    for (int i = 0; i < n; ++i) {
        p[i] = (i + 1) * 10;   // 和普通数组一样用下标
    }

    for (int i = 0; i < n; ++i) {
        cout << p[i] << " ";
    }
    cout << endl;

    delete[] p;    // 对应 new[]
    p = nullptr;

    return 0;
}
```

**讲解：**

- 动态一维数组在语法上与静态数组类似（`p[i]`、指针遍历等都一样）。
- 区别在于：它的生命周期由你控制，必须手动 `delete[]`，否则内存泄漏。

---

