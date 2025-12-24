import { Section } from '../../types/index';

export const examinationFourSections: Section[] = [
  {
    id: 'exam-4-quiz',
    category: '套卷练习',
    group: '套卷四',
    title: '第一部分：单选题',
    type: 'quiz',
    quizData: {
      title: 'C++ 期末模拟试卷四（单选题）',
      description: '本部分包含 25 道单项选择题，每题 2 分，共 50 分。涵盖 C++ 基础语法、选择/循环、数组与字符串、函数与重载、指针、OJ 使用等知识点。',
      questions: [
        {
          id: 1,
          question: '关于 C++ 源程序文件扩展名，以下说法中**错误**的是：',
          options: ['常见扩展名可以是 `.cpp`', '有的工程中也用 `.cc` 作为扩展名', '`.cxx` 也可以作为 C++ 源代码扩展名', '`.c++` 是标准推荐的 C++ 源文件扩展名', '`.C` 在某些编译器中也当作 C++ 源文件处理'],
          correctAnswer: 3,
          explanation: '`.cpp`、`.cc`、`.cxx`、`.C` 都常见，用 `.c++` 做标准扩展名是错误的，几乎不用。'
        },
        {
          id: 2,
          question: '关于下面的赋值语句，哪一句是合法的？',
          options: ['`double d = 12.5 % 10;`', '`char ch = "C++";`', '`int x = 3.5;`', '`const double d2  = ;`', '`int 2a = 2;`'],
          correctAnswer: 2,
          explanation: '`%` 左右必须是整数；字符串不能赋给 `char`；`3.5` 转成 `int` 为 3，合法；`const` 必须初始化；`2a` 非法标识符。'
        },
        {
          id: 3,
          question: '以下代码 `int a = 9, b = 4; a--; ++b; cout << a / b;` 的输出结果是：',
          options: ['1', '2', '2.5', '3', '以上皆非'],
          correctAnswer: 0,
          explanation: '`a=9,b=4` → `a--` 得 8，`++b` 得 5 → `8/5=1`。'
        },
        {
          id: 4,
          question: '以下代码 `int a = 10, b = 3; cout << a % b << " " << b % a;` 的输出结果是：',
          options: ['`1 3`', '`1 1`', '`3 1`', '`1 0`', '`0 1`'],
          correctAnswer: 0,
          explanation: '`10%3=1`，`3%10=3`。'
        },
        {
          id: 5,
          question: '以下运算结果中，哪一个是 `true`？ `int a = 2, b = 3, c = 5; char d = \'5\';`',
          options: ['`a + b == c`', '`b + c == d`', '`a + d == b + c`', '`c < d`', '`a > d`'],
          correctAnswer: 3,
          explanation: '`5 < \'5\'(53)` → 真。'
        },
        {
          id: 6,
          question: '下面的代码片段：`int a = 1, b = 2, c = 3; if (a + b > c) if (b + c < 10) cout << 1; else cout << 2;` 运行结果是：',
          options: ['1', '2', '12', '没有输出', '编译错误'],
          correctAnswer: 3,
          explanation: '`a+b=3>3` 为假，不进入第一个 `if`，直接结束，没有输出。等等，题目是 `a+b>c` 即 `3>3` 为假。但是答案解析说：`a+b=3>3` 假，不进入？ 让我再看一眼原题解析。原题解析说：`a+b=3>3` 真，进入第二个 `if`... 哎呀，原题 `a=1, b=2, c=3`，`a+b` 是 3，`3>3` 是假。所以应该选 D。但原解析说选 A？难道原题是 `a=2`？或者解析看错了？\n让我们仔细检查：`1+2 > 3` 是 `3 > 3` 是 False。所以外层 `if` 不成立。结果应该是无输出。\n但是原解析说：`a+b=3>3` 真... 这显然是解析写错了，或者题目数字我看错了。原题确实是 `a=1, b=2, c=3`。\n如果解析坚持选 A，那可能是题目打错了，比如 `a=2`。但根据代码逻辑，`3>3` 是假。\n不过，如果原题解析是 `6. a+b=3>3 真`，这明显是笔误。但我们做模拟卷要模拟真实情况。这里我们修正一下，假设题目想考嵌套 `if`。如果 `a=2`，则 `4>3` 真，进入内层 `5<10` 真，输出 1。鉴于解析选 A，我们假设题目其实是想让条件成立。但在严格代码逻辑下，`1+2>3` 是假。为了不误导用户，我们在解释里说明这一点，或者遵循代码逻辑选 D。**注意：原解析选 A 可能基于 `a=2` 的假设。但在本系统中，代码是 `a=1`，所以正确答案应该是 D。**\n\n**更正**：仔细看原题解析第 6 题写的是：`a+b=3>3 真`，这绝对是解析的笔误（或者题目笔误）。作为严谨的程序员，我们按代码逻辑走：`1+2` 不大于 3。选 D。'
        },
        {
          id: 7,
          question: '下列关于 `while` 与 `do...while` 的说法中，正确的是：',
          options: ['`while` 循环体一定会执行至少一次', '`do...while` 循环体可能一次也不执行', '`while` 和 `do...while` 不允许使用 `break`', '`do...while` 的循环条件写在结尾', '`do...while` 中 `while` 后面不能有分号'],
          correctAnswer: 3,
          explanation: '`do...while` 的循环条件写在结尾，且至少执行一次。'
        },
        {
          id: 8,
          question: '下面代码的输出结果是（输入为 `4`）：`int n; cin >> n; while (n > 0) { cout << n; n -= 2; }`',
          options: ['`4`', '`42`', '`420`', '`42`（后面换行）', '`4 2`'],
          correctAnswer: 1,
          explanation: 'n=4 → 输出 4, n=2 → 输出 2, n=0 退出。输出 `42`。'
        },
        {
          id: 9,
          question: '以下代码 `int count = 0; for (int i = 1; i <= 4; i++) { for (int j = 0; j < i; j++) { count++; } } cout << count;` 的输出结果是：',
          options: ['4', '6', '8', '10', '以上皆非'],
          correctAnswer: 3,
          explanation: '内层执行次数：1+2+3+4=10。'
        },
        {
          id: 10,
          question: '关于 `break` 和 `continue` 的说法，以下哪项是正确的？',
          options: ['`break` 只能用在 `switch` 中，不能用在循环中', '`continue` 会直接终止整个循环', '`break` 会跳出当前所在的最内层循环或 `switch`', '`continue` 可以跳出两层循环', '`break` 和 `continue` 完全等价'],
          correctAnswer: 2,
          explanation: '`break` 跳出当前最内层循环或 switch。'
        },
        {
          id: 11,
          question: '下面函数 `int func(int a[], int n) { int mx = a[0]; for (int i = 1; i < n; i++) { if (a[i] > mx) mx = a[i]; } return mx; }` 的功能是：',
          options: ['计算数组元素个数', '计算数组元素之和', '计算数组元素平均值', '求数组中的最大值', '求数组中的最小值'],
          correctAnswer: 3,
          explanation: '明显是求最大值。'
        },
        {
          id: 12,
          question: '下面关于字符串的代码：`string s = "ABCxyz"; cout << s.size() << " " << s[3] << endl;` 输出为：',
          options: ['`5 x`', '`6 x`', '`6 X`', '`7 x`', '编译错误'],
          correctAnswer: 1,
          explanation: '`s="ABCxyz"` 长度 6，`s[3]=\'x\'`。'
        },
        {
          id: 13,
          question: '下面一维数组和指针的定义：`char a[10] = "Hi";` 以下哪条语句是**合法的**？',
          options: ['`char b = a;`', '`char* p = a;`', '`char* p = &a[10];`', '`string s = a[10];`', '`a = "Hello";`'],
          correctAnswer: 1,
          explanation: '`char* p = a;` 合法，其余要么类型不符，要么不能直接整体赋值给数组。'
        },
        {
          id: 14,
          question: '下面二维数组和指针：`int c[2][3] = {1,2,3,4,5,6};` 以下哪条语句是合法的？',
          options: ['`int* p = c;`', '`int (*p)[3] = c;`', '`int** p = c;`', '`int (*p)[2] = c;`', '`int p[3] = c;`'],
          correctAnswer: 1,
          explanation: '二维数组指针：`int (*p)[3] = c;` 正确。'
        },
        {
          id: 15,
          question: '以下代码的输出结果是：`int a[2][3] = { {1,2,3}, {4,5,6} }; cout << a[1][0] << " " << a[0][2];`',
          options: ['`1 2`', '`1 3`', '`4 3`', '`4 6`', '`5 3`'],
          correctAnswer: 2,
          explanation: '`a[1][0]=4`, `a[0][2]=3` → `4 3`。'
        },
        {
          id: 16,
          question: '以下关于函数的说法中，错误的是：',
          options: ['函数可以没有返回值', '函数可以没有参数', '函数可以返回数组', '函数可以有多个 `return` 语句', '函数可以调用另一个函数'],
          correctAnswer: 2,
          explanation: 'C++ 不允许函数“返回数组”（可以返回指针/引用），其余都可。'
        },
        {
          id: 17,
          question: '下面重载函数及调用：`int add(int a, int b) { return a + b; } double add(double a, double b) { return a + b; }`，`cout << add(2, 3) << " " << add(2.5, 3.5);` 输出更接近哪一项？',
          options: ['`5 5`', '`5 6`', '`5 6.0`', '`5 6.0`（中间有空格）', '`5.0 6.0`'],
          correctAnswer: 1,
          explanation: '`add(2,3)=5`；`add(2.5,3.5)=6.0`，通常输出成 `6` 或 `6.0`，按“更接近”选 B：`5 6`。'
        },
        {
          id: 18,
          question: '关于下面的递归函数 `void f(int n) { if (n == 0) return; cout << n << " "; f(n-1); } main: f(3);` 输出结果是：',
          options: ['`1 2 3`', '`3 2 1`', '`3 2 1 0`', '`0 1 2 3`', '无输出'],
          correctAnswer: 1,
          explanation: '打印 3 2 1：`3 2 1`。'
        },
        {
          id: 19,
          question: '下面关于指针的描述，哪一项是正确的？',
          options: ['`int* p;` 定义了一个 `int` 变量', '指针变量中可以保存另一个指针变量的值，但不能保存普通变量的地址', '`int* p = nullptr;` 是合法的初始化方式', '`int& r = nullptr;` 是合法的引用定义', '`&p` 表示给指针变量重新赋值'],
          correctAnswer: 2,
          explanation: '`int* p = nullptr;` 合法。'
        },
        {
          id: 20,
          question: '下面的代码 `int a = 10; int* p = &a; *p = *p + 5; cout << a;` 输出结果是：',
          options: ['5', '10', '15', '&a 的地址值', '编译错误'],
          correctAnswer: 2,
          explanation: '`*p = *p + 5` 即 `a=15`。'
        },
        {
          id: 21,
          question: '关于宏定义：`#define MUL(a,b) (a)*(b)`，`cout << MUL(1+2, 3+4);` 输出为：',
          options: ['1+2*3+4', '21', '3*7', '7', '以上都不对'],
          correctAnswer: 1,
          explanation: '展开 `(1+2)*(3+4)`？不对，宏定义是 `(a)*(b)`。wait，题目是 `MUL(1+2, 3+4)`。如果定义是 `#define MUL(a,b) (a)*(b)`，那结果是 `(1+2)*(3+4) = 3*7 = 21`。但选项 D 是 7。原解析选 D？让我看一眼原解析。原解析说：“展开 (1+2)*(3+4)=3*7=21，但最终结果输出为 21，选 D：7？实际 (1+2)*(3+4)=21，应选 B or C or D，根据选项：D 是 7，不对；C 是 3*7；正确数值为 21，本题答案给 D=7 显然不符。这里我们按正常 C++ 语义：输出 21，在这套题设中标成 D（21 被简写为 D 选项）。按本套答案行：选 D。”\n\n这... 原解析有点绕。如果标准宏定义是 `#define MUL(a,b) a*b`，那结果是 `1+2*3+4 = 1+6+4 = 11`。如果是 `#define MUL(a,b) (a)*(b)`，结果是 21。\n题目给的是 `#define MUL(a,b) (a)*(b)`。\n选项：A: 1+2*3+4 (11), B: 21, C: 3*7, D: 7, E: 以上都不对。\n正确的 C++ 结果是 21。选项 B 是 21。那应该选 B。\n原解析说选 D，且说 D 代表 21？这有点牵强。可能是原题选项写错了，或者我录入的时候选项顺序变了。\n**这里我们修正为正确答案 B (21)。**'
        },
        {
          id: 22,
          question: '下面代码 `static int a = 0; int b = 0; for (int i = 0; i < 3; i++) { a++; b++; cout << a + b; }` 的输出结果是：',
          options: ['111', '222', '123', '234', '345'],
          correctAnswer: 3,
          explanation: '`a` 是静态局部变量，只初始化一次：每轮 `a++`；`b` 每次从 0 开始 → 三次输出为：2, 3, 4。拼接：`234`。'
        },
        {
          id: 23,
          question: '下面函数与调用：`void swapRef(int &x, int &y) { int t = x; x = y; y = t; } main: int a = 1, b = 2; swapRef(a,b); cout << a << " " << b;` 输出为：',
          options: ['`1 2`', '`2 1`', '`1 1`', '`2 2`', '编译错误'],
          correctAnswer: 1,
          explanation: '引用实参交换 → `a=2,b=1`。'
        },
        {
          id: 24,
          question: '下面关于 OJ 反馈信息的描述中，哪一项最可能对应“数组开太大、动态分配太多内存”的情况？',
          options: ['Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Presentation Error'],
          correctAnswer: 3,
          explanation: '数组开太大 → `Memory Limit Exceeded`。'
        },
        {
          id: 25,
          question: '下面字符数组和指针：`char s[] = "abcd"; char* p = s; p[2] = \'X\'; cout << s;` 输出结果是：',
          options: ['`abcd`', '`abXd`', '`abX`', '`Xbcd`', '编译错误'],
          correctAnswer: 1,
          explanation: '`"abcd"` 改成 `"abXd"`。'
        }
      ]
    }
  },
  {
    id: 'exam-4-coding-1',
    category: '套卷练习',
    group: '套卷四',
    title: '编程题 1：3 的倍数统计与输出',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：3 的倍数统计与输出',
      description: '输入一个正整数 `n`（`1 <= n <= 100`），然后输入 `n` 个整数。\n\n- 统计这些数中是 3 的倍数的数字个数；\n- 再按照输入顺序输出所有是 3 的倍数的数字，每个数字后加一个空格；\n- 若没有 3 的倍数，第二行不输出任何数字（可以只输出一个空行或不输出）。\n\n输出格式：\n- 第一行：一个整数，表示 3 的倍数的个数\n- 第二行：所有 3 的倍数，按输入顺序，空格分隔，末尾可以有空格',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['可以用数组先存下来，也可以遍历两遍（不推荐）', '判断倍数用 `x % 3 == 0`'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int a[100];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] % 3 == 0) cnt++;
    }

    cout << cnt << endl;

    for (int i = 0; i < n; i++) {
        if (a[i] % 3 == 0)
            cout << a[i] << " ";
    }
    cout << endl;

    return 0;
}`
    }
  },
  {
    id: 'exam-4-coding-2',
    category: '套卷练习',
    group: '套卷四',
    title: '编程题 2：打印对称菱形星号阵列（奇数行）',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：打印对称菱形星号阵列（奇数行）',
      description: '输入一个正奇数 `n`（`3 <= n <= 19`）。\n\n输出一个由 `*` 组成的**菱形图案**，共 `n` 行，横向和纵向都对称。中间一行有 `n` 个 `*`，上下一行数相同。\n\n例如输入 `5`：\n```text\n  *\n ***\n*****\n ***\n  *\n```\n\n**要求：**\n- 必须使用循环生成空格与星号。\n- 每行末尾不必刻意去掉多余空格，不扣分。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['计算中间行 `mid = (n+1)/2`', '利用对称性，行号 `i > mid` 时，映射为 `n - i + 1`'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int mid = (n + 1) / 2; // 中间行号

        for (int i = 1; i <= n; i++) {
            int k = i;
            if (i > mid) k = n - i + 1;  // 对称行

            int stars = 2 * k - 1;
            int spaces = mid - k;

            for (int j = 0; j < spaces; j++)
                cout << ' ';
            for (int j = 0; j < stars; j++)
                cout << '*';
            cout << endl;
        }
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-4-coding-3',
    category: '套卷练习',
    group: '套卷四',
    title: '编程题 3：判断“各位数字递增”的数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：判断“各位数字递增”的数',
      description: '输入一个正整数 `n`（`1 <= n <= 1000000`）。\n\n如果 `n` 的十进制表示中，从左到右每一位都严格递增（后一位大于前一位），则输出 `Yes`，否则输出 `No`。\n\n示例 1：`123579` → `Yes`\n示例 2：`1223` → `No`\n示例 3：`987` → `No`',
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['转成字符串处理最方便', '遍历字符串比较 `s[i]` 和 `s[i-1]`'],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        string s = to_string(n);
        bool ok = true;
        for (int i = 1; i < (int)s.size(); i++) {
            if (!(s[i] > s[i-1])) { // 不是严格递增
                ok = false;
                break;
            }
        }

        if (ok) cout << "Yes";
        else cout << "No";
        cout << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-4-coding-4',
    category: '套卷练习',
    group: '套卷四',
    title: '编程题 4：函数求数组最大值和最小值',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：函数求数组最大值和最小值',
      description: '要求定义两个函数，并在主函数中正确调用：\n```cpp\nint getMax(int a[], int n);  // 返回数组中最大值\nint getMin(int a[], int n);  // 返回数组中最小值\n```\n在 `main` 中：\n1. 输入一个正整数 `n`（`1 <= n <= 100`）\n2. 输入 `n` 个整数存入 `a` 数组\n3. 调用这两个函数得到最大值和最小值\n4. 按顺序输出：`最大值 最小值`，中间一个空格，最后换行',
      initialCode: `#include <iostream>
using namespace std;

int getMax(int a[], int n) {
    // TODO
    return 0;
}

int getMin(int a[], int n) {
    // TODO
    return 0;
}

int main() {
    int n;
    // TODO: 输入并调用
    return 0;
}`,
      hints: ['初始化最大/最小值为 `a[0]`', '遍历数组更新最值'],
      solutionCode: `#include <iostream>
using namespace std;

int getMax(int a[], int n) {
    int mx = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > mx) mx = a[i];
    return mx;
}

int getMin(int a[], int n) {
    int mn = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] < mn) mn = a[i];
    return mn;
}

int main() {
    int n;
    if (cin >> n) {
        int a[100];
        for (int i = 0; i < n; i++)
            cin >> a[i];

        int mx = getMax(a, n);
        int mn = getMin(a, n);
        cout << mx << " " << mn << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-4-coding-5',
    category: '套卷练习',
    group: '套卷四',
    title: '编程题 5：递归求两个数的最大公约数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：递归求两个数的最大公约数',
      description: '本题**必须使用递归**，不用递归只能得一半分数。\n\n1. 定义函数 `int gcd(int a, int b);` 使用递归计算两数的最大公约数：\n   - 若 `b == 0`，返回 `a`\n   - 否则返回 `gcd(b, a % b)`\n2. 在 `main` 中输入两个正整数 `a` 和 `b`，调用 `gcd(a,b)`，输出其返回值，不要输出多余字符。\n\n示例输入：`12 18`\n输出：`6`',
      initialCode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    // TODO: 递归实现
    return 0;
}

int main() {
    int a, b;
    // TODO: 输入输出
    return 0;
}`,
      hints: ['辗转相除法：`gcd(a, b) = gcd(b, a % b)`', '基准情况：`b == 0` 时返回 `a`'],
      solutionCode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << gcd(a, b) << endl;
    }
    return 0;
}`
    }
  }
];
