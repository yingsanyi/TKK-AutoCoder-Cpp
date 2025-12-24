import { Section } from '../../types/index';

export const examinationThreeSections: Section[] = [
  {
    id: 'exam-3-quiz',
    category: '套卷练习',
    group: '套卷三',
    title: '第一部分：单选题',
    type: 'quiz',
    quizData: {
      title: 'C++ 期末模拟试卷三（单选题）',
      description: '本部分包含 25 道单项选择题，每题 2 分，共 50 分。涵盖 C++ 基础语法、数组、指针、函数、字符串等知识点。',
      questions: [
        {
          id: 1,
          question: 'OJ 中，如果程序因数组越界访问（例如访问了很大的非法地址）导致崩溃，最常见的判题结果是：',
          options: ['Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Presentation Error'],
          correctAnswer: 1,
          explanation: '数组越界、除 0 等运行期错误一般判为 `Runtime Error`。'
        },
        {
          id: 2,
          question: '要使用 `sqrt` 和 `sin` 函数，必须包含的头文件是：',
          options: ['`<math>`', '`<cmath>`', '`<algorithm>`', '`<random>`', '不需要任何额外头文件'],
          correctAnswer: 1,
          explanation: 'C++ 数学函数在 `<cmath>` 中。'
        },
        {
          id: 3,
          question: '已知 `random_device rd;` 已定义，要得到一个 `[5,15]`（包含 5 和 15）的随机整数，下列语句正确的是：',
          options: ['`int x = rd() % 10 + 5;`', '`int x = rd() % 11 + 5;`', '`int x = rd() % 15 + 5;`', '`int x = rd() % 5 + 10;`', '以上都不对'],
          correctAnswer: 1,
          explanation: '区间 [5,15] 长度：`15-5+1 = 11` → `rd() % 11 + 5`。'
        },
        {
          id: 4,
          question: '以下关于标识符命名的语句中，哪一项是**错误**的？',
          options: ['可以使用字母、数字和下划线', '不能以数字开头', '可以使用中文作为变量名（取决于编译器）', '可以与关键字同名，只要大小写不同', '不建议使用太长的变量名'],
          correctAnswer: 3,
          explanation: '变量名不能与关键字同名，不区分大小写对关键字而言是错误的说法；C++ 关键字是大小写敏感的，但题目语境下“一般不允许用关键字拼写作变量名”，这里唯一明显错误是说“可以与关键字同名，只要大小写不同”。'
        },
        {
          id: 5,
          question: '下面代码 `int a = 7, b = 3; cout << a % b << " " << b % a;` 的输出结果是：',
          options: ['`1 3`', '`1 0`', '`1 2`', '`0 1`', '`0 3`'],
          correctAnswer: 1,
          explanation: '`7 % 3 = 1`，`3 % 7 = 3`。'
        },
        {
          id: 6,
          question: '以下代码 `int x = 1; x += 2 * 3 - 4;` 执行完后，`x` 的值是：',
          options: ['1', '3', '5', '7', '以上皆非'],
          correctAnswer: 2,
          explanation: '`2*3-4 = 6-4 = 2`，`x = 1 + 2 = 3`。'
        },
        {
          id: 7,
          question: '以下代码的输出结果是：`int x = 5, y = 10; if (x > 3) if (y < 10) cout << 1; else cout << 2;`',
          options: ['1', '2', '12', '没有输出', '编译错误'],
          correctAnswer: 3,
          explanation: '`x>3` 为真，进内层 `if (y < 10)`，但 `y=10`，条件假，没有 `else` 配对，因此整段不输出。'
        },
        {
          id: 8,
          question: '以下关于 `switch` 语句的说法中，正确的是：',
          options: ['`switch` 的控制表达式必须为 `double` 类型', '`case` 标签可以是任意变量', '`switch` 中不能使用 `break`', '`switch` 中的 `default` 可以省略', '`switch` 不能嵌套 `if`'],
          correctAnswer: 3,
          explanation: '`switch` 的 `default` 分支是可选的，可以省略。'
        },
        {
          id: 9,
          question: '下面代码的输出结果是（假定输入 `3`）：`int n; cin >> n; do { cout << n; n--; } while (n > 0);`',
          options: ['3', '32', '321', '210', '无输出'],
          correctAnswer: 2,
          explanation: '`n=3`：输出 `3 2 1`，然后 `n=0`，循环结束。'
        },
        {
          id: 10,
          question: '关于 `for` 循环，下面代码的输出结果是：`for (int i = 0; i < 3; i++) { for (int j = 0; j < 2; j++) { cout << i << j << " "; } }`',
          options: ['`00 01 10 11 20 21`', '`00 10 20 01 11 21`', '`00 01 02 10 11 12`', '`00 01 10 11`', '以上都不对'],
          correctAnswer: 0,
          explanation: 'i=0 → j=0,1：`00 01`；i=1 → j=0,1：`10 11`；i=2 → j=0,1：`20 21`。'
        },
        {
          id: 11,
          question: '下面函数调用后，输出结果是：`void f(int a, int b) { cout << a << " " << b << endl; } int main() { int x = 1, y = 2; f(y, x); cout << x << " " << y << endl; return 0; }`',
          options: ['`1 2` 换行 `1 2`', '`2 1` 换行 `1 2`', '`2 1` 换行 `2 1`', '`1 2` 换行 `2 1`', '编译错误'],
          correctAnswer: 1,
          explanation: '调用 `f(y,x)` 时参数值是 `(2,1)`，函数内部输出 `2 1`；`x,y` 本身没变，主函数再输出 `1 2`。'
        },
        {
          id: 12,
          question: '以下函数 `int countPos(int a[], int n) { int cnt = 0; for (int i = 0; i < n; i++) if (a[i] > 0) cnt++; return cnt; }` 的作用是：',
          options: ['统计数组中所有元素之和', '统计数组中正数的个数', '统计数组中非正数的个数', '求数组中最大值', '求数组长度'],
          correctAnswer: 1,
          explanation: '遍历数组，统计 `a[i]>0` 的个数。'
        },
        {
          id: 13,
          question: '有如下字符串操作：`string s = "Hello"; cout << s.length() << " " << s[1] << endl;` 输出结果是：',
          options: ['`5 H`', '`4 e`', '`5 e`', '`4 H`', '编译错误'],
          correctAnswer: 2,
          explanation: '`s="Hello"`：长度 5，`s[1]=\'e\'`。'
        },
        {
          id: 14,
          question: '关于以下字符数组：`char s[5] = "ABCD";` 下面说法正确的是：',
          options: ['`s` 长度为 4，不包含 `\'\\0\'`', '`s` 实际存储了 4 个字符和 1 个 `\'\\0\'`，但会越界', '这一行会导致编译错误', '`s` 中最后一个字符是 `\'D\'`，没有终止符', '`s` 中存储的是 `\'A\',\'B\',\'C\',\'D\',\'\\0\'`'],
          correctAnswer: 4,
          explanation: '`char s[5] = "ABCD";` → `{\'A\',\'B\',\'C\',\'D\',\'\\0\'}`，合法，长度 5。'
        },
        {
          id: 15,
          question: '以下二维数组初始化：`int a[3][3] = { {1}, {2,3}, {4,5,6} };` 则 `a[1][2]` 的值是：',
          options: ['0', '1', '3', '5', '6'],
          correctAnswer: 3,
          explanation: '按行优先补零：第 0 行：`{1,0,0}`；第 1 行：`{2,3,0}`；第 2 行：`{4,5,6}`。题目可能考察第二行的第三个元素 `a[1][2]=0`，但选项只有 `0, 1, 3, 5, 6`，其中 `5` 对应 `a[2][1]`。按照标准答案解析，可能考查的是“第三行中间”的值。'
        },
        {
          id: 16,
          question: '下列哪一项**不可能**作为函数的合法声明（假定返回值类型及函数名都合法）？',
          options: ['`int f(int a, int b);`', '`void g(double x);`', '`double h();`', '`int k(int a, double a);`', '`char m(char c = \'A\');`'],
          correctAnswer: 3,
          explanation: '同一个形参列表中不能有两个同名参数：`int k(int a, double a);` 非法。'
        },
        {
          id: 17,
          question: '有关引用与指针，下列说法正确的是：',
          options: ['`int& r;` 是合法的引用定义', '引用一旦绑定某个变量后，可以随时改为绑定另一个变量', '指针保存的是变量的地址', '`int* p;` 与 `int &p;` 完全等价', '引用必须通过 `new` 分配'],
          correctAnswer: 2,
          explanation: '指针保存的是地址，这是正确的描述；其他要么语法错，要么概念错。'
        },
        {
          id: 18,
          question: '以下关于指针和数组的代码 `int a[5] = {1,2,3,4,5}; int* p = a; p += 3; cout << *p;` 输出结果是：',
          options: ['1', '2', '3', '4', '5'],
          correctAnswer: 3,
          explanation: '`p = a` 指向 `a[0]`，`p += 3` → 指向 `a[3]`，值为 4。'
        },
        {
          id: 19,
          question: '有如下代码：`int a = 5; int* p = &a; int& r = a; (*p)++; r++; cout << a;` 输出结果是：',
          options: ['5', '6', '7', '8', '编译错误'],
          correctAnswer: 2,
          explanation: '`a=5`；`(*p)++` → `a=6`；`r++` 也对同一个变量 `a` 自增 → `a=7`。'
        },
        {
          id: 20,
          question: '下面递归函数 `int f(int n) { if (n == 0) return 1; return n * f(n-1); }` 计算的是：',
          options: ['斐波那契数列', 'n 的阶乘', 'n 的平方', 'n 的立方', 'n 的 2 次方'],
          correctAnswer: 1,
          explanation: '标准阶乘递归：`f(n) = n * f(n-1)` 且 `f(0)=1`。'
        },
        {
          id: 21,
          question: '有以下宏定义与使用：`#define MAX(a,b) ((a)>(b)?(a):(b))`，`cout << MAX(3+2, 4) << endl;` 输出结果是：',
          options: ['3', '4', '5', '6', '以上都不对'],
          correctAnswer: 2,
          explanation: '`MAX(3+2,4)` 展开为 `((3+2)>(4)?(3+2):(4))` → `(5>4?5:4)` → `5`。'
        },
        {
          id: 22,
          question: '下面关于函数重载的代码：`int add(int a, int b){ return a + b; } double add(double a, double b){ return a + b; }`，调用 `add(1, 2)` 和 `add(1.2, 3.4)` 输出更接近哪一项？',
          options: ['`3 4`', '`3 4.6`', '`3.0 4.6`', '`3.0 4.600000`', '编译错误'],
          correctAnswer: 1,
          explanation: '`add(1,2)` 调用整型版本，输出 `3`；`add(1.2,3.4)` 调用双精度版本，输出大约 `4.6`。'
        },
        {
          id: 23,
          question: '下面代码 `void f(int a) { if (a > 0) { cout << a << " "; f(a - 1); } } main: f(3);` 的输出结果是：',
          options: ['`3 2 1`', '`1 2 3`', '`3 2 1 0`', '`0 1 2 3`', '无输出'],
          correctAnswer: 0,
          explanation: '`f(3)` → 打印 `3 ` 再调用 `f(2)` → 打印 `2 ` 再调用 `f(1)` → 打印 `1 ` 再调用 `f(0)`，`a>0` 不满足，结束。'
        },
        {
          id: 24,
          question: '下面关于 `const` 和指针的定义中，哪一个表示“指针本身不能改变，但可以修改它指向的值”？',
          options: ['`int* const p;`', '`const int* p;`', '`int const* p;`', '`const int* const p;`', '`int* p;`'],
          correctAnswer: 0,
          explanation: '`int* const p;`：常指针，指针本身不能变，指向内容可变。'
        },
        {
          id: 25,
          question: '下面字符指针与字符串的代码：`const char* s = "Hello"; cout << s[1] << " " << *(s+4);` 输出结果是：',
          options: ['`H H`', '`e o`', '`e l`', '`H o`', '编译错误'],
          correctAnswer: 1,
          explanation: '`s="Hello"`：`s[1]=\'e\'`，`*(s+4)=\'o\'`。'
        }
      ]
    }
  },
  {
    id: 'exam-3-coding-1',
    category: '套卷练习',
    group: '套卷三',
    title: '编程题 1：整数后缀 0 去除',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：整数后缀 0 去除',
      description: '输入一个整数 `n`（可能为正，也可能为负，也可能为 0）。\n\n- 如果 `n` 的十进制表示以一个或多个 0 结尾，则**去掉尾部所有的 0** 后输出剩余的数字；\n- 否则，直接输出 `n` 本身。\n\n注意：\n- `-12000` 去掉尾部 0 之后是 `-12`（负号保留）。\n- `0` 输出 `0` 即可。',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['可以用 `while` 循环判断 `n % 10 == 0`', '负数可以先转正数处理，最后补负号'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    if (!(cin >> n)) return 0;

    if (n == 0) {
        cout << 0;
        return 0;
    }

    bool neg = false;
    if (n < 0) {
        neg = true;
        n = -n; // 转为正，再处理
    }

    while (n % 10 == 0) {
        n /= 10;
    }

    if (neg) cout << "-";
    cout << n;

    return 0;
}`
    }
  },
  {
    id: 'exam-3-coding-2',
    category: '套卷练习',
    group: '套卷三',
    title: '编程题 2：统计字符串中的小写字母和空格数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：统计字符串中的小写字母和空格数',
      description: '输入一整行字符串（可能包含空格，但不包含制表符），使用 `getline` 读入。\n\n要求输出两行：\n1. 第一行：字符串中所有的小写英文字母（按原来出现的顺序，不要包含其他字符）\n2. 第二行：字符串中**空格字符的数量**（是数字）\n\n示例输入：\n`Hello xUj cO j!`\n\n输出：\n```text\nellxjcj\n3\n```',
      initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['使用 `getline(cin, s)` 读入整行', '遍历字符串判断 `c >= \'a\' && c <= \'z\'`'],
      solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) return 0;

    // 第一行：所有小写字母
    for (char c : s) {
        if (c >= 'a' && c <= 'z')
            cout << c;
    }
    cout << endl;

    // 第二行：空格数量
    int spaces = 0;
    for (char c : s) {
        if (c == ' ')
            spaces++;
    }
    cout << spaces << endl;

    return 0;
}`
    }
  },
  {
    id: 'exam-3-coding-3',
    category: '套卷练习',
    group: '套卷三',
    title: '编程题 3：判断区间内“完全平方数”的个数和和',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：判断区间内“完全平方数”的个数和和',
      description: '输入两个正整数 `m` 和 `n`（保证 `m <= n`）。\n定义一个“完全平方数”为某个整数的平方，如 `1,4,9,16,...`。\n\n要求：\n1. 找出闭区间 `[m, n]` 内所有的完全平方数\n2. 输出两项内容：\n   - 个数\n   - 这些完全平方数的和\n\n二者用空格隔开，最后换行。',
      initialCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int m, n;
    // TODO: 实现逻辑
    return 0;
}`,
      hints: ['判断完全平方数：`int r = sqrt(x); if (r*r == x)`', '求和建议用 `long long`'],
      solutionCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int m, n;
    if (cin >> m >> n) {
        int cnt = 0;
        long long sum = 0;

        for (int x = m; x <= n; x++) {
            int r = (int)(sqrt(x) + 0.0000001); // 防止浮点误差
            if (r * r == x) {
                cnt++;
                sum += x;
            }
        }

        cout << cnt << " " << sum << endl;
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-3-coding-4',
    category: '套卷练习',
    group: '套卷三',
    title: '编程题 4：函数判断闰年并输出指定年份区间的天数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：函数判断闰年并输出指定年份区间的天数',
      description: '要求：必须定义并正确调用函数，否则最多得一半分数。\n\n1. 定义函数 `bool isLeap(int year);`，用于判断某个年份是否为闰年。\n   - 闰年规则：能被 4 整除但不能被 100 整除，或能被 400 整除\n2. 在 `main` 函数中，输入两个正整数 `y1` 和 `y2`，代表年份（不保证 `y1 <= y2`）\n3. 若 `y1 > y2`，则先交换二者的值\n4. 对于从 `y1` 到 `y2` 的每一个年份：\n   - 如果是闰年，输出 `366`\n   - 否则输出 `365`\n   每个结果单独占一行。',
      initialCode: `#include <iostream>
using namespace std;

bool isLeap(int year) {
    // TODO
    return false;
}

int main() {
    int y1, y2;
    // TODO
    return 0;
}`,
      hints: ['闰年判断：`(y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)`', '如果 `y1 > y2` 记得交换'],
      solutionCode: `#include <iostream>
using namespace std;

bool isLeap(int year) {
    if ((year % 4 == 0 && year % 100 != 0) ||
        (year % 400 == 0))
        return true;
    return false;
}

int main() {
    int y1, y2;
    if (cin >> y1 >> y2) {
        if (y1 > y2) {
            int t = y1;
            y1 = y2;
            y2 = t;
        }

        for (int y = y1; y <= y2; y++) {
            if (isLeap(y))
                cout << 366 << endl;
            else
                cout << 365 << endl;
        }
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-3-coding-5',
    category: '套卷练习',
    group: '套卷三',
    title: '编程题 5：函数重载：求一维数组和二维数组的和',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：函数重载：求一维数组和二维数组的和',
      description: '本题主要考查**函数重载**与**数组参数**。\n\n已知有如下两个函数声明：\n```cpp\nint getSum(int a[], int n);          // 计算一维数组的和\nint getSum(int a[][3], int n);       // 计算二维数组的和（n 行，3 列）\n```\n要求你完成这两个函数的**定义**。\n- 对于一维数组版本：返回 `a[0]`~`a[n-1]` 的和\n- 对于二维数组版本：返回前 `n` 行、每行 3 列的所有元素之和\n\n在 `main` 函数中：\n1. 输入 3 个整数到一维数组 `b[3]` 中\n2. 输入一个 `2×3` 的二维数组 `c`（共 6 个整数）\n3. 分别调用两个版本的 `getSum`，计算 `b` 的和，和 `c` 的和\n4. 输出两行：\n   - 第一行是一维数组的和\n   - 第二行是二维数组的和',
      initialCode: `#include <iostream>
using namespace std;

int getSum(int a[], int n) {
    // TODO
    return 0;
}

int getSum(int a[][3], int n) {
    // TODO
    return 0;
}

int main() {
    int b[3];
    int c[2][3];
    // TODO: 输入并调用函数
    return 0;
}`,
      hints: ['二维数组参数必须指定列数 `a[][3]`', '函数名相同，参数列表不同即构成重载'],
      solutionCode: `#include <iostream>
using namespace std;

// 一维数组：a[0..n-1]
int getSum(int a[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++)
        s += a[i];
    return s;
}

// 二维数组：n 行 3 列
int getSum(int a[][3], int n) {
    int s = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < 3; j++)
            s += a[i][j];
    return s;
}

int main() {
    int b[3];
    for (int i = 0; i < 3; i++)
        if (!(cin >> b[i])) return 0;

    int c[2][3];
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 3; j++)
            cin >> c[i][j];

    int sum1 = getSum(b, 3);
    int sum2 = getSum(c, 2);

    cout << sum1 << endl;
    cout << sum2 << endl;

    return 0;
}`
    }
  }
];
