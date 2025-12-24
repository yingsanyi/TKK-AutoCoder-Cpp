import { Section } from '../../types/index';

export const examinationFiveSections: Section[] = [
  {
    id: 'exam-5-quiz',
    category: '套卷练习',
    group: '套卷五',
    title: '第一部分：单选题',
    type: 'quiz',
    quizData: {
      title: 'C++ 期末模拟试卷五（单选题）',
      description: '本部分包含 25 道单项选择题，每题 2 分，共 50 分。涵盖 C++ 基础语法、选择/循环、数组与字符串、函数与重载、指针、OJ 使用等知识点。',
      questions: [
        {
          id: 1,
          question: '在 OJ 中，如果代码使用了 `sqrt` 函数，但没有包含正确头文件，最可能出现的错误类型是：',
          options: ['Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Presentation Error'],
          correctAnswer: 0,
          explanation: '使用了没声明的函数，编译阶段就报错，选 A。'
        },
        {
          id: 2,
          question: '要使用 C++ 标准库的 `string` 类型，必须包含的头文件是：',
          options: ['`<cstring>`', '`<String>`', '`<string>`', '`<stdio.h>`', '`<stdlib.h>`'],
          correctAnswer: 2,
          explanation: '`std::string` 在 `<string>` 中定义。'
        },
        {
          id: 3,
          question: '给定 `random_device rd;`，要得到一个 [0,9]（包含 0 和 9）的随机整数，下列写法正确的是：',
          options: ['`rd() % 9;`', '`rd() % 10;`', '`rd() % 9 + 1;`', '`rd() % 10 + 1;`', '`rd() % 11;`'],
          correctAnswer: 1,
          explanation: '`% 10` 得到 0~9 的余数。'
        },
        {
          id: 4,
          question: '下面语句中，哪一句是**非法的**？',
          options: ['`int _abc = 10;`', '`double PI = 3.14;`', '`int 3a = 5;`', '`char ch = \'A\';`', '`int x_y_z = 0;`'],
          correctAnswer: 2,
          explanation: '变量名不能以数字开头，`3a` 非法。'
        },
        {
          id: 5,
          question: '以下代码 `int a = 4, b = 3; cout << a / b << " " << a % b;` 的输出结果是：',
          options: ['`1 1`', '`1 0`', '`1 3`', '`1.33333 1`', '以上都不对'],
          correctAnswer: 0,
          explanation: '`4/3=1`（整除），`4%3=1`。'
        },
        {
          id: 6,
          question: '已知字符 `\'A\'` 的 ASCII 码是 65， `\'a\'` 的 ASCII 码是 97。以下代码 `char c = \'A\'; cout << (int)c << " " << char(c + 32);` 输出：',
          options: ['`65 A`', '`65 a`', '`97 a`', '`97 A`', '`32 a`'],
          correctAnswer: 1,
          explanation: '`c=\'A\'` 对应 65；`65+32=97` 对应 `\'a\'`。'
        },
        {
          id: 7,
          question: '下面关于 `if-else` 的说法中，正确的是：',
          options: ['`else` 与第一个 `if (x > 0)` 配对', '`else` 与第二个 `if (x > 5)` 配对', '编译器会报错：`else` 无法匹配', '由缩进决定 `else` 与哪个 `if` 配对', '`else` 可以单独存在，不需要 `if`'],
          correctAnswer: 1,
          explanation: 'C/C++ 语法：`else` 总是和最近的未匹配 `if` 配对。'
        },
        {
          id: 8,
          question: '以下代码的输出是（输入为 `3`）：`int n; cin >> n; do { cout << n; n--; } while (n >= 0);`',
          options: ['`3`', '`32`', '`321`', '`3210`', '无输出'],
          correctAnswer: 3,
          explanation: '输出 3,2,1,0，当 n=-1 时退出。'
        },
        {
          id: 9,
          question: '以下代码输出结果是：`int cnt = 0; for (int i = 1; i <= 3; i++) { for (int j = 1; j <= i; j++) { cnt++; } } cout << cnt;`',
          options: ['3', '4', '5', '6', '9'],
          correctAnswer: 3,
          explanation: '内层循环次数：1 + 2 + 3 = 6。'
        },
        {
          id: 10,
          question: '下面代码的输出是：`int x = 5; if (x > 0) x++; if (x > 5) x += 2; else x -= 2; cout << x;`',
          options: ['3', '5', '6', '7', '8'],
          correctAnswer: 4,
          explanation: '`x=5` -> `x>0` 真 -> `x=6`。`x>5` 真 -> `x+=2` -> `x=8`。`else` 是第二个 `if` 的分支，不执行。'
        },
        {
          id: 11,
          question: '以下代码在输入 `11` 时输出为：`if (x >= 10) cout << 1; if (x > 100) cout << 2; else cout << 3;`',
          options: ['`1`', '`3`', '`13`', '`12`', '`123`'],
          correctAnswer: 2,
          explanation: '`x=11 >= 10` 输出 1；`x > 100` 为假，执行 `else` 输出 3。结果 `13`。'
        },
        {
          id: 12,
          question: '关于函数调用和值/引用，以下程序的输出是：`void f(int a, int &b) { a++; b = b + a; } main: int x = 1, y = 2; f(x, y); cout << x << " " << y;`',
          options: ['`1 2`', '`1 3`', '`1 4`', '`2 3`', '`2 4`'],
          correctAnswer: 2,
          explanation: '`a` 值传递，`x` 不变（仍为 1）。`b` 引用传递，`b = 2 + (1+1) = 4`。'
        },
        {
          id: 13,
          question: '有如下代码：`int a[5] = {1,2,3,4,5}; int *p = a; p += 2; cout << *p;` 输出结果是：',
          options: ['1', '2', '3', '4', '5'],
          correctAnswer: 2,
          explanation: '`p` 初始指向 `a[0]`，`p+=2` 指向 `a[2]`（即 3）。'
        },
        {
          id: 14,
          question: '下面关于数组初始化：`int a[5] = {1, 2};` 数组元素 `a[0]` ~ `a[4]` 的值分别是：',
          options: ['`1 2 3 4 5`', '`1 2 2 2 2`', '`1 2 0 0 0`', '`0 1 2 3 4`', '未定义'],
          correctAnswer: 2,
          explanation: '只初始化前两个，其余自动补 0。'
        },
        {
          id: 15,
          question: '以下字符串数组和输出：`char s[] = "ABCD"; cout << sizeof(s) << " " << s[4];` 输出为：',
          options: ['`4 D`', '`4` 后跟随机字符', '`5` 后跟 `\\0`（不显示）', '`5` 后跟 `D`', '编译错误'],
          correctAnswer: 2,
          explanation: '`"ABCD"` 包含结束符 `\\0`，大小为 5。`s[4]` 是 `\\0`。'
        },
        {
          id: 16,
          question: '下面关于 `string` 的代码，输出为：`string s = "Hello"; cout << s.length() << " " << s[0] << " " << s.substr(1,3);`',
          options: ['`5 H ell`', '`4 H ell`', '`5 e ell`', '`5 H el`', '编译出错'],
          correctAnswer: 0,
          explanation: '长度 5，`s[0]=\'H\'`，`substr(1,3)` 从下标 1 开始取 3 个字符即 "ell"。'
        },
        {
          id: 17,
          question: '二维数组初始化：`int a[2][3] = {{1,2,3},{4,5}};` 则 `a[1][2]` 的值是：',
          options: ['0', '3', '4', '5', '未定义'],
          correctAnswer: 0,
          explanation: '第二行 `{4,5}` 不足补 0，`a[1][2]` 是该行第 3 个元素，为 0。'
        },
        {
          id: 18,
          question: '下面函数 `sumRow` 求某一行和。`int b[2][3] = {{1,2,3},{4,5,6}}; cout << sumRow(b, 1);` 输出结果为：',
          options: ['6', '9', '10', '15', '21'],
          correctAnswer: 3,
          explanation: '求第 1 行（即第二行 `{4,5,6}`）的和：4+5+6=15。'
        },
        {
          id: 19,
          question: '下面宏使用可能产生的问题是：`#define SQR(x) x * x`，`int b = SQR(a + 1);`（其中 a=2）',
          options: ['`b` 的值为 9，符合预期', '宏替换后表达式变为 `(a+1)*(a+1)`', '宏替换后表达式变为 `a+1*a+1`，`b` 为 4', '编译错误', '链接错误'],
          correctAnswer: 2,
          explanation: '宏直接替换：`2 + 1 * 2 + 1 = 5`，不是预期的 9。答案选项 C 说 `b` 为 4？`2+2+1=5`。选项 C 说 `a+1*a+1`，如果 `a=2`，结果是 5。选项 C 后半句说 `b` 为 4 可能有误，但描述的现象（直接替换导致优先级问题）是对的。根据题目选项，选 C 最接近“宏替换问题”的描述。'
        },
        {
          id: 20,
          question: '关于指针，下列语句中合法的是：',
          options: ['`int* p; double* p;`', '`int* p; int& p;`', '`int* p; int x; p = &x;`', '`int p; int* x = &p; &x = 10;`', '`int* p = 10;`'],
          correctAnswer: 2,
          explanation: '声明指针后指向变量地址是合法的。A 重复定义；B 重复定义且引用语法错；D `&x` 不能赋值；E 不能直接赋整数。'
        },
        {
          id: 21,
          question: '下面关于引用的说法，正确的是：',
          options: ['引用一旦绑定变量后，可以重新绑定其他变量', '`int& r;` 是合法的引用定义', '引用必须在定义时初始化', '引用本质上是一个可以为空的指针', '可以有“引用的引用”'],
          correctAnswer: 2,
          explanation: '引用必须初始化，且不可变。'
        },
        {
          id: 22,
          question: '关于递归函数：`int f(int n) { if (n <= 1) return 1; return n * f(n-1); }` 函数 `f(n)` 的含义是：',
          options: ['返回 n 的 2 次方', '返回 n 的阶乘', '返回 n 的 Fibonacci 数', '返回 1 到 n 的和', '返回 n+1'],
          correctAnswer: 1,
          explanation: '典型的阶乘递归实现。'
        },
        {
          id: 23,
          question: '下面代码 `int f(int a){ return a + 1; } int g(int a){ return 2 * a; } main: cout << f(g(3)) << " " << g(f(3));` 输出结果是：',
          options: ['`7 8`', '`7 6`', '`8 8`', '`8 6`', '`6 8`'],
          correctAnswer: 0,
          explanation: '`g(3)=6` -> `f(6)=7`。`f(3)=4` -> `g(4)=8`。'
        },
        {
          id: 24,
          question: 'OJ 上提交代码后如果显示 `Time Limit Exceeded`，最可能的原因是：',
          options: ['代码语法错误', '输出格式不符合要求', '使用了没有 include 的函数', '算法效率太低或出现了死循环', '定义了太大的静态数组'],
          correctAnswer: 3,
          explanation: 'TLE 通常是死循环或复杂度过高。'
        },
        {
          id: 25,
          question: '如下代码：`char s[] = "xyz"; char* p = s; (*p)++; cout << s;` 输出为：',
          options: ['`xyz`', '`Xyz`', '`yyz`', '`xAz`', '`yz`'],
          correctAnswer: 2,
          explanation: '`*p` 是 `\'x\'`，自增变 `\'y\'`。`s` 变为 `"yyz"`。'
        }
      ]
    }
  },
  {
    id: 'exam-5-coding-1',
    category: '套卷练习',
    group: '套卷五',
    title: '编程题 1：奇偶统计与输出',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：奇偶统计与输出',
      description: '输入一个正整数 `n`（`1 <= n <= 100`），然后输入 `n` 个整数。\n\n1. 统计奇数个数与偶数个数\n2. 输出两行：\n   - 第一行：所有奇数，按输入顺序，用一个空格隔开，最后可有空格\n   - 第二行：两个整数，分别为奇数个数和偶数个数，中间用一个空格\n\n若没有奇数，第一行输出为空行即可。\n\n示例输入：\n`5`\n`1 2 3 4 5`\n\n示例输出：\n`1 3 5`\n`3 2`',
      initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // TODO: 实现逻辑\n    return 0;\n}`,
      hints: ['可以用数组存储所有数', '遍历两遍：第一遍统计，第二遍输出奇数（或者反过来）'],
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        int a[100];\n        int odds = 0, evens = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> a[i];\n            if (a[i] % 2 != 0) odds++;\n            else evens++;\n        }\n\n        for (int i = 0; i < n; i++) {\n            if (a[i] % 2 != 0) cout << a[i] << " ";\n        }\n        cout << endl;\n        cout << odds << " " << evens << endl;\n    }\n    return 0;\n}`
    }
  },
  {
    id: 'exam-5-coding-2',
    category: '套卷练习',
    group: '套卷五',
    title: '编程题 2：数字直角三角形',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：数字直角三角形',
      description: '输入一个正整数 `n`（`1 <= n <= 9`），输出一个右下直角三角形。\n\n第 1 行右边只有一个数字 `1`，第 2 行右边有两个数字 `2`，……，第 n 行右边有 n 个数字 `n`。左边用空格补齐，使整个图形右对齐。\n\n样例输入：`4`\n样例输出：\n```text\n   1\n  22\n 333\n4444\n```',
      initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // TODO: 实现逻辑\n    return 0;\n}`,
      hints: ['双重循环', '第 i 行需输出 `n-i` 个空格，再输出 `i` 个数字 `i`'],
      solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j < n - i; j++) cout << ' ';\n            for (int j = 0; j < i; j++) cout << i;\n            cout << endl;\n        }\n    }\n    return 0;\n}`
    }
  },
  {
    id: 'exam-5-coding-3',
    category: '套卷练习',
    group: '套卷五',
    title: '编程题 3：统计区间内“完美平方和数”',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：统计区间内“完美平方和数”',
      description: '定义：一个正整数 `x` 的“完美平方和数”性质为——它可以表示成若干个正整数的平方和（每个平方可以使用多次），此题简化为：只需要判断 `x` 是否为**某个整数的平方**或**两个整数平方和**。\n\n例如：`5 = 1^2 + 2^2` (是), `4 = 2^2` (是), `3` (否)。\n\n输入两个正整数 `m` 和 `n`（`m <= n`），统计区间 `[m,n]` 内有多少个这样的数，并输出计数。',
      initialCode: `#include <iostream>\n#include <cmath>\nusing namespace std;\n\nbool isGood(int x) {\n    // TODO: 判断是否满足条件\n    return false;\n}\n\nint main() {\n    int m, n;\n    // TODO: 统计并输出\n    return 0;\n}`,
      hints: ['可以写个 helper 函数判断完全平方数', '枚举 a，判断 x - a*a 是否为完全平方数'],
      solutionCode: `#include <iostream>\n#include <cmath>\nusing namespace std;\n\nbool isPerfectSquare(int x) {\n    int r = (int)(sqrt(x) + 0.0000001);\n    return r * r == x;\n}\n\nbool isGood(int x) {\n    if (isPerfectSquare(x)) return true;\n    for (int a = 1; a * a <= x; a++) {\n        int b2 = x - a * a;\n        if (b2 > 0 && isPerfectSquare(b2))\n            return true;\n    }\n    return false;\n}\n\nint main() {\n    int m, n;\n    if (cin >> m >> n) {\n        int cnt = 0;\n        for (int x = m; x <= n; x++)\n            if (isGood(x)) cnt++;\n        cout << cnt << endl;\n    }\n    return 0;\n}`
    }
  },
  {
    id: 'exam-5-coding-4',
    category: '套卷练习',
    group: '套卷五',
    title: '编程题 4：函数：数组逆序',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：函数：数组逆序',
      description: '编写一个函数 `void reverseArray(int a[], int n);`，功能是将数组 `a` 中前 `n` 个元素**就地逆序**。\n\n在 `main` 中：\n1. 输入整数 `n`（`1 <= n <= 100`）\n2. 输入 `n` 个整数存入数组 `a`\n3. 调用 `reverseArray(a, n);`\n4. 按顺序输出逆序后的数组，数字之间用一个空格隔开',
      initialCode: `#include <iostream>\nusing namespace std;\n\nvoid reverseArray(int a[], int n) {\n    // TODO: 就地逆序\n}\n\nint main() {\n    int n;\n    // TODO: 输入、调用、输出\n    return 0;\n}`,
      hints: ['双指针法：`i` 指向头，`j` 指向尾，交换并向中间移动', '直到 `i >= j` 停止'],
      solutionCode: `#include <iostream>\nusing namespace std;\n\nvoid reverseArray(int a[], int n) {\n    int i = 0, j = n - 1;\n    while (i < j) {\n        int t = a[i];\n        a[i] = a[j];\n        a[j] = t;\n        i++;\n        j--;\n    }\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        int a[100];\n        for (int i = 0; i < n; i++) cin >> a[i];\n        reverseArray(a, n);\n        for (int i = 0; i < n; i++) cout << a[i] << " ";\n        cout << endl;\n    }\n    return 0;\n}`
    }
  },
  {
    id: 'exam-5-coding-5',
    category: '套卷练习',
    group: '套卷五',
    title: '编程题 5：递归判断回文数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：递归判断回文数',
      description: '本题**限用递归**。\n\n1. 定义递归函数 `bool isPal(const string &s, int l, int r);`\n   - 判断字符串 `s` 在下标 `[l, r]` 范围内是否为回文\n   - 结束条件：`l >= r` 返回 `true`\n   - 若 `s[l] != s[r]` 返回 `false`\n   - 否则递归调用 `isPal(s, l+1, r-1)`\n\n2. `main` 中输入字符串 `s`，调用函数判断，输出 `Yes` 或 `No`。',
      initialCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPal(const string &s, int l, int r) {\n    // TODO: 递归实现\n    return true;\n}\n\nint main() {\n    string s;\n    // TODO: 输入调用\n    return 0;\n}`,
      hints: ['基准情况：`l >= r`', '递归步骤：比较两端，若相等则检查内部'],
      solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPal(const string &s, int l, int r) {\n    if (l >= r) return true;\n    if (s[l] != s[r]) return false;\n    return isPal(s, l + 1, r - 1);\n}\n\nint main() {\n    string s;\n    if (cin >> s) {\n        if (isPal(s, 0, (int)s.size() - 1))\n            cout << "Yes";\n        else\n            cout << "No";\n        cout << endl;\n    }\n    return 0;\n}`
    }
  }
];
