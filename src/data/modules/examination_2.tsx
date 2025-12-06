import { Section } from '../../types';

export const examinationTwoSections: Section[] = [
  {
    id: 'exam-2-quiz',
    category: '套卷练习',
    group: '套卷二',
    title: '第一部分：单选题',
    type: 'quiz',
    quizData: {
      title: 'C++ 期末模拟试卷二（单选题）',
      description: '本部分包含 25 道单项选择题，每题 2 分，共 50 分。涵盖 C++ 基础语法、流程控制、数组、函数、指针等核心知识点。',
      questions: [
        {
          id: 1,
          question: '关于 OJ 中“编译失败”的错误类型，下列哪一项对应“代码无法通过编译（语法错误、缺少头文件等）”？',
          options: ['Wrong Answer', 'Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded'],
          correctAnswer: 1,
          explanation: 'OJ 中编译失败通常显示为 `Compile Error`。'
        },
        {
          id: 2,
          question: '要使用 `random_device` 和 `mt19937` 生成随机数，以下哪一行头文件包含是**必需的**？',
          options: ['`#include <random>`', '`#include <ctime>`', '`#include <algorithm>`', '`#include <cmath>`', '`#include <cstring>`'],
          correctAnswer: 0,
          explanation: '`random_device` 和 `mt19937` 都在头文件 `<random>` 中。'
        },
        {
          id: 3,
          question: '有如下代码片段：`int a = 5, b = 3; cout << a / b << " " << a / (double)b;` 程序输出是：',
          options: ['`1 1`', '`1 1.66667`（或类似小数）', '`1.66667 1`', '`1.66667 1.66667`', '编译错误'],
          correctAnswer: 1,
          explanation: '`a / b` 是整除：`5/3 == 1`，`a / (double)b` 是浮点除法，大约 `1.66667`。'
        },
        {
          id: 4,
          question: '已知 ASCII 码 97 对应字符 `\'a\'`。以下代码 `char c = \'a\'; cout << (int)c << " " << char(c - 32);` 的输出结果是：',
          options: ['`65 A`', '`65 a`', '`97 A`', '`97 a`', '以上都不对'],
          correctAnswer: 2,
          explanation: '`\'a\'` 的 ASCII 为 97，`c-32` 对应 `\'A\'`；输出 `97 A`。'
        },
        {
          id: 5,
          question: '以下哪个是合法的变量定义？',
          options: ['`int 3a = 3;`', '`double long = 3.14;`', '`int _sum = 0;`', '`char a b = \'x\';`', '`int-if = 1;`'],
          correctAnswer: 2,
          explanation: '变量名不能以数字开头，不能是关键字，不能包含特殊符号（如下划线以外）。`int _sum = 0;` 合法。'
        },
        {
          id: 6,
          question: '下面关于 `if-else` 结构及缩进的描述，哪个是**正确**的？',
          options: ['`else` 总是和最近的、尚未匹配 `else` 的 `if` 配对', '`else` 总是和第一个 `if` 配对', '只要缩进对齐，`else` 就会和视觉上最近的 `if` 配对', '一个 `if` 可以同时有两个 `else`', '`if` 可以单独使用但 `else` 也可以单独使用'],
          correctAnswer: 0,
          explanation: 'C/C++ 语法规定 `else` 必须和**最近的、尚未匹配的 `if`** 配对，和缩进无关。'
        },
        {
          id: 7,
          question: '以下代码的输出结果是：`int x = 10; if (x > 0) if (x > 5) cout << 1; else cout << 2;`',
          options: ['1', '2', '12', '没有输出', '编译错误'],
          correctAnswer: 0,
          explanation: '`x=10 > 0` 为真，进入外层 `if`，再判断 `x>5` 为真，输出 `1`。内层 `else` 与内层 `if` 配对，没有执行。'
        },
        {
          id: 8,
          question: '下面关于 `do...while` 的描述中，正确的是：',
          options: ['循环条件放在前面，可能一次也不执行循环体', '循环条件放在后面，循环体至少执行一次', '`do...while` 与 `while` 完全等价，只是写法不同', '`do...while` 中的 `while` 后面不能有分号', '`do...while` 中不能使用 `break`'],
          correctAnswer: 1,
          explanation: '`do...while` 循环体执行后再判断条件，至少执行一次。'
        },
        {
          id: 9,
          question: '下面代码的输出结果是（假定输入 `3`）：`int n; cin >> n; while (n--) { cout << n; }`',
          options: ['210', '321', '210（最后换行）', '321（最后换行）', '无输出'],
          correctAnswer: 0,
          explanation: '`n` 初始为 3：第 1 次循环前 `n--` 使用 3，条件真，输出 2；第 2 次输出 1；第 3 次输出 0。'
        },
        {
          id: 10,
          question: '如下代码的输出结果是：`int a = 2, b = 3; cout << (a & b) << " " << (a | b);`',
          options: ['`2 3`', '`0 0`', '`1 1`', '`0 3`', '`2 1`'],
          correctAnswer: 0,
          explanation: '二进制：`2 = 10`, `3 = 11`。`a & b = 10` (2)，`a | b = 11` (3)。'
        },
        {
          id: 11,
          question: '已知函数 `void f(int x, int &y) { x++; y += x; }`，`main` 中 `int a = 1, b = 2; f(a, b); cout << a << " " << b;` 输出结果是：',
          options: ['`1 3`', '`1 4`', '`2 3`', '`2 4`', '以上都不对'],
          correctAnswer: 1,
          explanation: '`x` 值传递不影响 `a`，`y` 引用传递绑定 `b`。函数内 `x` 变 2，`y += 2` 变 4。输出 `1 4`。'
        },
        {
          id: 12,
          question: '关于下面数组初始化的代码：`int a[5] = {1, 2};` 执行结束后，数组元素 `a[0]`~`a[4]` 的值分别是：',
          options: ['`1 2 3 4 5`', '`1 2 0 0 0`', '`0 0 1 2 0`', '`1 1 1 1 1`', '未定义行为'],
          correctAnswer: 1,
          explanation: '只给前两项初始化，其余自动补 0。'
        },
        {
          id: 13,
          question: '以下代码的输出结果是：`char s[] = "abcde"; cout << s[2] << " " << s[5];`',
          options: ['`c e`', '`c` 后面跟一个随机字符', '`c` 后面是 `\\0`（什么也不显示）', '`e` 后面是 `\\0`', '编译错误'],
          correctAnswer: 2,
          explanation: '`s[2]` 是 `\'c\'`。`s[5]` 是结束符 `\'\\0\'`，输出时不显示。'
        },
        {
          id: 14,
          question: '以下关于 `string` 的说法中，哪一项是正确的？',
          options: ['`string` 类型可以用 `+` 实现字符串拼接', '`string` 数组必须以 `\'\\0\'` 结尾', '不能用 `[]` 访问 `string` 中的单个字符', '`string` 不能与 `char` 一起使用', '`string` 不能比较大小'],
          correctAnswer: 0,
          explanation: '`string` 支持 `+` 运算连接两个字符串。'
        },
        {
          id: 15,
          question: '下面二维数组的定义和初始化：`int a[2][3] = {{1,2,3},{4,5}};` 则 `a[1][2]` 的值是：',
          options: ['0', '3', '4', '5', '未定义'],
          correctAnswer: 0,
          explanation: '二维数组按行优先：`{ {1,2,3},{4,5,0} }`，因此 `a[1][2] = 0`。'
        },
        {
          id: 16,
          question: '以下函数的功能是：`int f(int a[], int n) { int s = 0; for(int i = 0; i < n; i++) s += a[i]; return s; }`',
          options: ['计算数组中最大值', '计算数组中最小值', '计算数组中所有元素的和', '计算数组中正数的个数', '计算数组长度'],
          correctAnswer: 2,
          explanation: '循环中对所有 `a[i]` 累加后返回，是求数组元素总和。'
        },
        {
          id: 17,
          question: '以下关于指针的说法中，正确的是：',
          options: ['`int* p;` 定义了一个整型变量 `p`', '`int* p;` 定义了一个指向 `int` 的指针', '`int& p;` 定义了一个指针', '`double* p;` 可以保存 `int` 变量的地址', '`int p[10];` 可以当作指针变量使用'],
          correctAnswer: 1,
          explanation: '`int* p;` 是“指向 `int` 的指针”。'
        },
        {
          id: 18,
          question: '给定如下代码：`int a = 10; int* p = &a; (*p)++; cout << a;` 输出结果是：',
          options: ['9', '10', '11', '一个地址', '编译错误'],
          correctAnswer: 2,
          explanation: '`p` 指向 `a`，`(*p)++` 是对 `a` 自增 → `a=11`。'
        },
        {
          id: 19,
          question: '关于递归函数，以下哪个说法是正确的？',
          options: ['递归函数中不能使用 `if`', '递归函数必须有一个“结束条件”', '递归函数不能调用自己', '递归函数不能有返回值', '递归函数不会造成栈空间消耗'],
          correctAnswer: 1,
          explanation: '递归函数必须有结束条件（基例），否则会无限递归导致栈溢出。'
        },
        {
          id: 20,
          question: '有以下函数 `int f(int n) { if (n <= 3) return 1; return f(n-1) + f(n-2) + f(n-3); }` 则 `f(4)` 的值是：',
          options: ['1', '2', '3', '4', '以上都不对'],
          correctAnswer: 2,
          explanation: '`f(4) = f(3) + f(2) + f(1) = 1 + 1 + 1 = 3`。'
        },
        {
          id: 21,
          question: '关于如下宏定义与使用：`#define SQR(x) ((x)*(x))`，`cout << SQR(1+2);` 输出结果是：',
          options: ['3', '5', '9', '1+2*1+2', '以上都不对'],
          correctAnswer: 2,
          explanation: '`SQR(1+2)` 展开为 `((1+2)*(1+2))` → `9`。'
        },
        {
          id: 22,
          question: '函数重载的前提条件是：',
          options: ['函数名不同、参数相同', '函数名相同、参数列表不同', '函数名相同、返回值不同即可', '函数体不同即可', '只要在不同文件中，函数名可以随意重复'],
          correctAnswer: 1,
          explanation: '函数重载：函数名相同，但**参数列表不同**（参数个数或类型不同）。'
        },
        {
          id: 23,
          question: '给出如下函数：`void g(int a, int b = 5) { cout << a << " " << b; }`，`main` 中 `g(3);` 输出结果是：',
          options: ['`3 0`', '`3 3`', '`3 5`', '`0 5`', '编译错误'],
          correctAnswer: 2,
          explanation: '`g(3)` 等价于 `g(3, 5)`，默认参数 `b=5`。'
        },
        {
          id: 24,
          question: '下面关于 `const` 的说法中，正确的是：',
          options: ['`const int a = 5;` 中的 `a` 的值不能被修改', '`const` 只能修饰整型', '被 `const` 修饰的变量一定存放在只读存储区', '`const` 变量必须在运行时才能初始化', '`const` 变量不能用于表达式运算'],
          correctAnswer: 0,
          explanation: '`const int a = 5;` 中 `a` 的值在之后代码中不能被修改。'
        },
        {
          id: 25,
          question: '下面的代码：`char c[] = "xyz"; char* p = c; p[1] = \'A\'; cout << c;` 输出结果是：',
          options: ['`xyz`', '`xAz`', '`xA`', '`Ayz`', '编译出错'],
          correctAnswer: 1,
          explanation: '`p[1] = \'A\'` 把 `\'y\'` 改为 `\'A\'`，数组内容变 `"xAz"`。'
        }
      ]
    }
  },
  {
    id: 'exam-2-coding-1',
    category: '套卷练习',
    group: '套卷二',
    title: '编程题 1：判断大小写并输出整行字母',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：判断大小写并输出整行字母',
      description: '输入一个字符 `ch`：\n- 若 `ch` 是大写字母（`\'A\'`~`\'Z\'`），则输出从 `\'A\'` 到 `\'Z\'` 的所有大写字母，最后换行；\n- 若 `ch` 是小写字母（`\'a\'`~`\'z\'`），则输出从 `\'a\'` 到 `\'z\'` 的所有小写字母，最后换行；\n- 若 `ch` 是其他字符，则什么都不要输出。\n\n**要求：必须使用循环语句实现输出。**',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['使用 `if` 判断字符范围', '使用 `for` 循环输出字母'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    if (!(cin >> ch)) return 0;

    if (ch >= 'A' && ch <= 'Z') {
        for (char c = 'A'; c <= 'Z'; c++)
            cout << c;
        cout << endl;
    } else if (ch >= 'a' && ch <= 'z') {
        for (char c = 'a'; c <= 'z'; c++)
            cout << c;
        cout << endl;
    }
    // 其他字符：什么都不输出

    return 0;
}`
    }
  },
  {
    id: 'exam-2-coding-2',
    category: '套卷练习',
    group: '套卷二',
    title: '编程题 2：星号右下直角三角形',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：星号右下直角三角形',
      description: '输入一个正整数 `n`，输出如下形式的由 `*` 组成的右下直角三角形（共 `n` 行）：\n\n例如输入 `4`：\n```text\n   *\n  **\n ***\n****\n```\n\n**要求：**\n- 每行先输出若干个空格，再输出若干个星号\n- 必须使用循环结构实现',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['外层循环 `i` 控制行', '内层循环 `j` 先打空格，再打星号', '空格数量 `n-i`，星号数量 `i`'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        for (int i = 1; i <= n; i++) {
            // 先输出空格：第 i 行有 n - i 个空格
            for (int j = 0; j < n - i; j++)
                cout << ' ';
            // 再输出星号：第 i 行有 i 个星号
            for (int j = 0; j < i; j++)
                cout << '*';
            cout << endl;
        }
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-2-coding-3',
    category: '套卷练习',
    group: '套卷二',
    title: '编程题 3：统计区间内素数的个数与和',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：统计区间内素数的个数与和',
      description: '输入两个正整数 `m` 和 `n`（保证 `m <= n`），统计从 `m` 到 `n`（含两端）之间的所有素数：\n\n- 输出两项内容：\n  - 该区间内素数的**个数**\n  - 该区间内素数的**和**\n\n二者用一个空格分隔，最后换行。',
      initialCode: `#include <iostream>
using namespace std;

// 建议实现 isPrime 函数
bool isPrime(int x) {
    // TODO
    return false;
}

int main() {
    int m, n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['素数判断：循环到 `sqrt(x)`', '注意 `1` 不是素数', '求和变量建议用 `long long`'],
      solutionCode: `#include <iostream>
using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++) {
        if (x % i == 0) return false;
    }
    return true;
}

int main() {
    int m, n;
    if (cin >> m >> n) {
        int cnt = 0;
        long long sum = 0;

        for (int i = m; i <= n; i++) {
            if (isPrime(i)) {
                cnt++;
                sum += i;
            }
        }
        cout << cnt << " " << sum << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-2-coding-4',
    category: '套卷练习',
    group: '套卷二',
    title: '编程题 4：数组最大值、最小值与平均值',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：数组最大值、最小值与平均值',
      description: '输入 10 个整数存入数组 `a` 中，要求：\n1. 计算并输出数组中的最大值\n2. 计算并输出数组中的最小值\n3. 计算并输出数组元素的平均值（用 `double`，保留 2 位小数）\n\n输出格式为：`max min avg`，中间以**一个空格**分隔，最后换行。',
      initialCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    int a[10];
    // TODO: 输入与计算
    return 0;
}`,
      hints: ['`max` 和 `min` 初始化为 `a[0]`', '平均值用 `sum / 10.0`', '保留小数可用 `printf("%.2lf", avg)`'],
      solutionCode: `#include <iostream>
#include <cstdio>
using namespace std;

int main() {
    int a[10];
    for (int i = 0; i < 10; i++) {
        if (!(cin >> a[i])) return 0;
    }

    int mx = a[0], mn = a[0];
    long long sum = 0;

    for (int i = 0; i < 10; i++) {
        if (a[i] > mx) mx = a[i];
        if (a[i] < mn) mn = a[i];
        sum += a[i];
    }

    double avg = sum / 10.0;
    printf("%d %d %.2lf\\n", mx, mn, avg);

    return 0;
}`
    }
  },
  {
    id: 'exam-2-coding-5',
    category: '套卷练习',
    group: '套卷二',
    title: '编程题 5：下一个“各位互不相同”的整数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：下一个“各位互不相同”的整数',
      description: '定义两个函数：\n```cpp\nbool isDiff(int n);     // 判断正整数 n 各位数字是否互不相同\nint getNextDiff(int n); // 返回比 n 大的、各位数字互不相同的下一个整数\n```\n- `isDiff`：若 `n` 的十进制表示中每一位都不重复，返回 `true`\n- `getNextDiff`：从 `n+1` 开始往上找第一个满足 `isDiff` 为 `true` 的数\n\n**输入**：一个正整数 `a`\n**输出**：调用 `getNextDiff(a)` 的返回值',
      initialCode: `#include <iostream>
using namespace std;

bool isDiff(int n) {
    // TODO
    return true;
}

int getNextDiff(int n) {
    // TODO
    return n;
}

int main() {
    int a;
    if (cin >> a) {
        cout << getNextDiff(a) << endl;
    }
    return 0;
}`,
      hints: ['`isDiff` 中可用布尔数组标记数字是否出现过', '`getNextDiff` 中使用 `while(true)` 循环查找'],
      solutionCode: `#include <iostream>
using namespace std;

bool isDiff(int n) {
    bool used[10] = {false};
    if (n == 0) used[0] = true;

    while (n > 0) {
        int d = n % 10;
        if (used[d]) return false;
        used[d] = true;
        n /= 10;
    }
    return true;
}

int getNextDiff(int n) {
    int x = n + 1;
    while (true) {
        if (isDiff(x)) return x;
        x++;
    }
}

int main() {
    int a;
    if (cin >> a) {
        cout << getNextDiff(a) << endl;
    }
    return 0;
}`
    }
  }
];
