import React from 'react';
import { Section } from '../../types';
import { CodeBlock } from '../../components/Common/CodeBlock';

const category = 'C++ STL (标准模板库)';
const group = '2. 起源与必备语法';

export const stlBasicExercises: Section[] = [
    {
        id: 'stl-ex-1',
        category,
        group,
        title: '习题 1：数组求和与最大值',
        type: 'exercise',
        exerciseData: {
            title: '数组求和与最大值',
            description: '练习目标：复习 `const` 数组参数与引用输出参数。\n\n要求：\n1. 实现 `sumAndMax` 函数，计算数组之和与最大值。\n2. 通过引用参数 `sum` 和 `mx` 返回结果。\n3. 数组参数应设为只读 (`const`)。',
            initialCode: `#include <iostream>
using namespace std;

// TODO: 实现 sumAndMax 函数
// void sumAndMax(const int a[], int n, long long& sum, int& mx) { ... }

int main() {
    int n;
    // 简单的输入处理
    if (!(cin >> n)) return 0;
    
    int a[100];
    for(int i = 0; i < n; ++i) cin >> a[i];
    
    long long sum = 0;
    int mx = 0;
    
    // TODO: 调用 sumAndMax
    
    cout << sum << " " << mx << endl;
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

void sumAndMax(const int a[], int n, long long& sum, int& mx) {
    sum = 0;
    if (n > 0) mx = a[0];
    for(int i = 0; i < n; ++i) {
        sum += a[i];
        if (a[i] > mx) mx = a[i];
    }
}

int main() {
    int n;
    if (cin >> n) {
        int a[100];
        for(int i = 0; i < n; ++i) cin >> a[i];
        
        long long sum = 0;
        int mx = 0;
        
        sumAndMax(a, n, sum, mx);
        
        cout << sum << " " << mx << endl;
    }
    return 0;
}`,
            hints: ['引用参数 (`&`) 允许函数修改外部变量', '`const int a[]` 保证函数内不能修改数组']
        }
    },
    {
        id: 'stl-ex-2',
        category,
        group,
        title: '习题 2：函数模板 myMin',
        type: 'exercise',
        exerciseData: {
            title: '编写 myMin 模板函数',
            description: '练习目标：理解函数模板的基本写法。\n\n要求：\n1. 编写一个模板函数 `myMin`，接受两个类型为 `T` 的参数，返回较小值。\n2. 在 `main` 中分别测试 `int` 和 `double` 类型。',
            initialCode: `#include <iostream>
using namespace std;

// TODO: 写一个函数模板 myMin
// template<typename T> ...

int main() {
    int a = 10, b = 20;
    cout << "Int min: " << myMin(a, b) << endl;
    
    double x = 3.14, y = 2.71;
    cout << "Double min: " << myMin(x, y) << endl;
    
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

template<typename T>
T myMin(T a, T b) {
    return a < b ? a : b;
}

int main() {
    int a = 10, b = 20;
    cout << "Int min: " << myMin(a, b) << endl;
    
    double x = 3.14, y = 2.71;
    cout << "Double min: " << myMin(x, y) << endl;
    
    return 0;
}`,
            hints: ['`template<typename T>`', '返回值类型也是 `T`']
        }
    },
    {
        id: 'stl-ex-3',
        category,
        group,
        title: '习题 3：用 auto 改写循环',
        type: 'exercise',
        exerciseData: {
            title: 'auto 关键字练习',
            description: '练习目标：体验 `auto` 的类型推导。\n\n要求：\n1. 补全代码中的 `for` 循环，使用 `auto` 推导循环变量类型。\n2. 数组元素全部 +1。',
            initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};

    // 传统写法参考:
    // for (int i = 0; i < 5; ++i) a[i] += 1;

    // TODO: 请用 auto 改写上面的逻辑 (注意这里不是 range-based for，而是用 auto 推导下标或指针，或者保持 i 的推导)
    // 题目意图可能是让循环变量 i 的类型用 auto 推导，或者更进一步使用 range-based for。
    // 根据题面 "用 auto 改写循环变量的类型声明"，这里我们演示 auto i = 0;
    
    for (auto i = 0; i < 5; ++i) {
        a[i] += 1;
    }

    for (int i = 0; i < 5; ++i) cout << a[i] << " ";
    cout << endl;
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[5] = {1, 2, 3, 4, 5};

    // 使用 auto 推导循环变量类型
    for (auto i = 0; i < 5; ++i) {
        a[i] += 1;
    }

    for (int i = 0; i < 5; ++i) cout << a[i] << " ";
    cout << endl;
    return 0;
}`,
            hints: ['`auto i = 0;` 编译器会自动推导 `i` 为 `int`']
        }
    },
    {
        id: 'stl-ex-4',
        category,
        group,
        title: '习题 4：range-based for',
        type: 'exercise',
        exerciseData: {
            title: 'Range-based For 循环',
            description: '练习目标：掌握范围 for 循环及其引用用法。\n\n要求：\n1. 使用引用遍历 (`auto&`) 修改数组：每个元素乘 2。\n2. 使用只读引用遍历 (`const auto&`) 输出数组。',
            initialCode: `#include <iostream>
using namespace std;

int main() {
    int a[4] = {10, 20, 30, 40};

    // TODO 1: 使用 range-based for 把每个元素都乘以 2
    // for (... : a) { ... }

    // TODO 2: 使用 const auto& 的 range-based for 输出数组
    // for (... : a) { ... }
    
    cout << endl;
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a[4] = {10, 20, 30, 40};

    // 修改：必须用引用 auto&
    for (auto& x : a) {
        x *= 2;
    }

    // 输出：推荐用 const auto&
    for (const auto& x : a) {
        cout << x << " ";
    }
    
    cout << endl;
    return 0;
}`,
            hints: ['修改需要 `auto&`', '只读推荐 `const auto&`']
        }
    },
    {
        id: 'stl-ex-5',
        category,
        group,
        title: '习题 5：nullptr 与指针判空',
        type: 'exercise',
        exerciseData: {
            title: 'nullptr 的使用',
            description: '练习目标：习惯使用 `nullptr`。\n\n要求：\n1. 实现 `printIfNotNull` 函数。\n2. 如果指针为空输出 "`null`"，否则输出其值。',
            initialCode: `#include <iostream>
using namespace std;

void printIfNotNull(int* p) {
    // TODO: 判断 p 是否为 nullptr
}

int main() {
    int x = 42;
    int* p1 = &x;
    int* p2 = nullptr;

    printIfNotNull(p1);
    printIfNotNull(p2);

    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

void printIfNotNull(int* p) {
    if (p == nullptr) {
        cout << "null" << endl;
    } else {
        cout << *p << endl;
    }
}

int main() {
    int x = 42;
    int* p1 = &x;
    int* p2 = nullptr;

    printIfNotNull(p1);
    printIfNotNull(p2);

    return 0;
}`,
            hints: ['`if (p == nullptr)`']
        }
    },
    {
        id: 'stl-ex-6',
        category,
        group,
        title: '习题 6：using 类型别名',
        type: 'exercise',
        exerciseData: {
            title: 'using 别名简化类型',
            description: '练习目标：使用 `using` 定义别名。\n\n要求：\n1. 定义 `using ll = long long;`\n2. 实现 `sumArray` 函数，返回值为 `ll`。',
            initialCode: `#include <iostream>
using namespace std;

// TODO: using ll = long long;

// TODO: ll sumArray(const int a[], int n) { ... }

int main() {
    int n;
    if(cin >> n) {
        int a[100];
        for(int i=0; i<n; ++i) cin >> a[i];
        
        // cout << sumArray(a, n) << endl;
    }
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

using ll = long long;

ll sumArray(const int a[], int n) {
    ll sum = 0;
    for(int i=0; i<n; ++i) {
        sum += a[i];
    }
    return sum;
}

int main() {
    int n;
    if(cin >> n) {
        int a[100];
        for(int i=0; i<n; ++i) cin >> a[i];
        cout << sumArray(a, n) << endl;
    }
    return 0;
}`,
            hints: ['`using Alias = OriginalType;`']
        }
    },
    {
        id: 'stl-ex-7',
        category,
        group,
        title: '习题 7：模板与Range-For综合',
        type: 'exercise',
        exerciseData: {
            title: '综合练习',
            description: '练习目标：结合模板函数与范围循环。\n\n要求：\n1. 编写模板函数 `addOneToAll(T a[], int n)`。\n2. 在函数内部（或 `main` 中）使用循环将所有元素 +1。\n注意：原生数组作为参数退化为指针，不能直接在函数内对参数使用 range-for，建议在 `main` 中用 range-for 输出验证。',
            initialCode: `#include <iostream>
using namespace std;

// TODO: template<typename T> void addOneToAll(...)

int main() {
    int a[3] = {1, 2, 3};
    
    // 调用 addOneToAll
    
    // TODO: 使用 range-based for 输出结果
    
    return 0;
}`,
            solutionCode: `#include <iostream>
using namespace std;

template<typename T>
void addOneToAll(T a[], int n) {
    for(int i = 0; i < n; ++i) {
        a[i] += 1;
    }
}

int main() {
    int a[3] = {1, 2, 3};
    
    addOneToAll(a, 3);
    
    for(const auto& x : a) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}`,
            hints: ['函数参数中的数组实际上是指针，无法知道长度，所以 range-for 不能直接用于参数 `a`']
        }
    },
    {
        id: 'stl-ex-8',
        category,
        group,
        title: '习题 8：思考题',
        type: 'lesson',
        content: (
            <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4">🤔 深度思考</h3>
                    
                    <div className="space-y-6 text-indigo-800">
                        <div>
                            <h4 className="font-bold mb-2">1. 引用和指针有什么相同点？有什么不同点？</h4>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm text-slate-600">
                                <p className="mb-2"><strong>相同点：</strong> 都可以用来间接访问变量，都能实现“修改外部变量”的效果。</p>
                                <p><strong>不同点：</strong></p>
                                <ul className="list-disc list-inside">
                                    <li>引用必须在定义时初始化，且不能改变指向；指针可以不初始化（虽然不推荐），也可以随时改指别人。</li>
                                    <li>引用不能为空（没有 null reference）；指针可以为 nullptr。</li>
                                    <li>引用不需要解引用符号 *；指针需要。</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">2. 什么时候你更愿意使用 const int& 作为函数参数？</h4>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm text-slate-600">
                                <p>
                                    对于 <code>int</code> 这种小类型，直接传值 (int) 其实效率很高。但对于 <strong>大对象</strong>（如 <code>vector</code>, <code>string</code>, 自定义结构体），拷贝开销很大。
                                </p>
                                <p className="mt-2">
                                    <strong>例子：</strong> <code>void printString(const string& s);</code><br/>
                                    如果不加引用，会拷贝整个字符串；加了 const 引用，既不拷贝，又保证函数内不会修改它。
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">3. 一句话总结各语法解决的“麻烦事”</h4>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm text-slate-600">
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>auto：</strong> 解决了“类型名太长不想写”的麻烦。</li>
                                    <li><strong>range-based for：</strong> 解决了“遍历容器要写繁琐下标/迭代器”的麻烦。</li>
                                    <li><strong>nullptr：</strong> 解决了“NULL 和整数 0 混淆导致重载错误”的麻烦。</li>
                                    <li><strong>using：</strong> 解决了“typedef 语法晦涩、阅读不直观”的麻烦。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];
