
---

# C++编程绪论

## 1. 什么是 C++？

**知识点：**

- C++ 是一门功能强大且灵活的编程语言。
- 它既可以进行低级的系统编程，也可以进行高级的应用开发。
- 由 Bjarne Stroustrup 在 1979 年于贝尔实验室开始设计开发。

**示例：**

```cpp
// 典型的 C++ 代码风格
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    for(int i : v) {
        std::cout << i << " ";
    }
    return 0;
}
```

## 2. 第一个 C++ 程序

**知识点：**

- `main` 函数是程序的入口。
- `#include <iostream>` 用于引入输入输出流库。
- `std::cout` 用于输出。

**代码：**

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```
