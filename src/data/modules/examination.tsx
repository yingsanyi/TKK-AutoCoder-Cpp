import { Section } from '../../types/index';

export const examinationSections: Section[] = [
  {
    id: 'exam-1-quiz',
    category: '套卷练习',
    group: '套卷一',
    title: '第一部分：单项选择题 (25题)',
    type: 'quiz',
    quizData: {
      title: 'C++ 期末模拟试卷（一）- 选择题',
      description: '本部分共 25 题，每题 2 分，共 50 分。请阅读题目并选择正确的答案。',
      questions: [
        {
          id: 1,
          question: '在 OJ 中如果代码使用了 `sqrt` 函数，则需要额外添加哪个头文件？',
          options: ['`cmath`', '`algorithm`', '`random`', '`fstream`', '以上答案都不正确'],
          correctAnswer: 0,
          explanation: '`sqrt` 函数声明在 `<cmath>` 头文件中。'
        },
        {
          id: 2,
          question: '已知已经定义了 `random_device rd;`，要得到一个 `[19,26]` 范围内的随机整数（包含 19 和 26），以下写法正确的是：',
          options: ['`rd() % 19 + 26;`', '`rd() % 8 + 19;`', '`rd() % 26 + 19;`', '`rd() % 8;`', '以上答案都不正确'],
          correctAnswer: 1,
          explanation: '区间长度为 `26 - 19 + 1 = 8`。公式为 `rd() % 长度 + 起始值`，即 `rd() % 8 + 19`。'
        },
        {
          id: 3,
          question: '如下所示有随机无符号整数 `x`，要从中生成一个 `[a,b]`（包含端点，且 `0 <= a <= b`）的随机整数，以下通用写法正确的是：',
          options: ['`x/(b-a)+a`', '`x%(b-a)+b`', '`x%(b-a+1)+b`', '`x%(b-a+1)+a`', '以上答案都不正确'],
          correctAnswer: 3,
          explanation: '通用公式为 `x % (b - a + 1) + a`。'
        },
        {
          id: 4,
          question: '已知 ASCII 码 65 对应字符 `A`。以下代码 `double f(int a){ return (char)a; } cout << f(65);` 的运行结果是：',
          options: ['65', '65.0', 'A', '编译报错', '以上答案都不正确'],
          correctAnswer: 1,
          explanation: '函数返回类型为 `double`，`(char)65` 是 `\'A\'`，隐式转换为 `double` 变为 `65.0`。虽然 `cout` 输出 `double` 时若无小数部分可能显示 65，但从类型和值的角度，`65.0` 更准确。'
        },
        {
          id: 5,
          question: '以下哪个变量名是非法的？',
          options: ['`While`', '`_switch`', '`if_else`', '`A+`', '`xujc20`'],
          correctAnswer: 3,
          explanation: '`A+` 包含非法字符 `+`。`While`（首字母大写）不是关键字，合法；`_switch` 合法；`if_else` 合法。'
        },
        {
          id: 6,
          question: '`bool a = true; int b = 5, c = 4; double d = 8; cout << a + b / c * d;` 的输出结果是：',
          options: ['8', '9', '10', '11', '12'],
          correctAnswer: 1,
          explanation: '`b/c = 5/4 = 1`（整除）； `1*d = 8.0`； `a`为`true`转为1； `1+8.0 = 9`。'
        },
        {
          id: 7,
          question: '`int a = 1; int main() { int a = 2; if (a > 1) { int a = 3; cout << a; } return 0; }` 的运行结果是：',
          options: ['1', '2', '3', '123', '以上皆非'],
          correctAnswer: 2,
          explanation: '局部变量遮蔽外部变量，最内层作用域定义的 `a` 为 3，故输出 3。'
        },
        {
          id: 8,
          question: '以下关于字符串的说法中，正确的是：',
          options: ['使用 `string` 型字符串需要 `#include <string>`', '`#include <String>` 是正确的头文件', '`#include <cstring>` 才能使用 `string` 类', '`#include <CString>` 是正确的头文件', '以上都可以使用 `string` 型字符串'],
          correctAnswer: 0,
          explanation: '`std::string` 定义在 `<string>` 头文件中。`<cstring>` 是 C 风格字符串处理函数。'
        },
        {
          id: 9,
          question: '下面关于 OJ 系统报错信息的说法中，哪一项最可能对应“循环次数太多导致程序一直算不完”？',
          options: ['Compile Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Presentation Error'],
          correctAnswer: 2,
          explanation: '循环过多导致超时，对应 Time Limit Exceeded (TLE)。'
        },
        {
          id: 10,
          question: '`int n = 2; do { cout << n; } while (--n); cout << endl;` 的输出结果是：',
          options: ['2（加换行）', '21（加换行）', '321（加换行）', '210（加换行）', '以上皆非'],
          correctAnswer: 1,
          explanation: '第一次输出 2，`--n` 变为 1，条件真；第二次输出 1，`--n` 变为 0，条件假退出。输出 21。'
        },
        {
          id: 11,
          question: '输入 `3 1 2 3` 时，以下代码 `cout << b;` 的输出结果是（`b`初始0，`while(n--) { cin >> a; b++; }`）：',
          options: ['3', '4', '6', '9', '以上选项都不正确'],
          correctAnswer: 0,
          explanation: '先读入 `n=3`，然后循环 3 次，`b` 自增 3 次，最终 `b=3`。'
        },
        {
          id: 12,
          question: '`for (int i = 0; i < 2; i++) { for (int j = i; j < 2; j++) { cout << i + j; } }` 的运行结果是：',
          options: ['无输出结果', '012', '0112', '01234', '012123234'],
          correctAnswer: 1,
          explanation: '`i=0`: `j=0`(out 0), `j=1`(out 1); `i=1`: `j=1`(out 2). 总输出 012。'
        },
        {
          id: 13,
          question: '当主函数以 `f(\'A\');` 的方式调用函数 `f` 时，需要输出 ABC。下面哪些 `f` 的定义可以实现要求？',
          options: ['`void f() { cout << \'A\' << \'B\' << \'C\'; }`', '`void f() { cout << "ABC"; }`', '`void f(char a) { cout << char(a) << char(a + 1) << char(a + 2); }`', '`void f(char& a) { cout << char(a) << char(a + 1) << char(a + 2); }`', '`void f(char& a) { cout << char(\'a\') << char(\'a\' + 1) << char(\'a\' + 2); }`'],
          correctAnswer: 2,
          explanation: 'A, B 参数不匹配（无参）。E 输出 abc。C 和 D 都可以，C 是传值，D 是传引用，都能正确利用参数 `\'A\'` 输出 ABC。在此选 C 作为代表。'
        },
        {
          id: 14,
          question: '输入 3，`int n; cin >> n; do { cout << n; } while (--n); cout << endl;` 的输出结果是：',
          options: ['3（加换行）', '32（加换行）', '321（加换行）', '3210（加换行）', '以上皆非'],
          correctAnswer: 2,
          explanation: '`n=3`, 输出3, `n->2`; 输出2, `n->1`; 输出1, `n->0` 退出。输出 321。'
        },
        {
          id: 15,
          question: '`int c[10] = {1}; int sum = 0; for (int i = 0; i < 10; i++) sum += c[i];` `sum` 的值是：',
          options: ['1', '9', '10', '11', '一个绝对值很大的负数'],
          correctAnswer: 0,
          explanation: '`int c[10] = {1}` 只初始化第一个元素为 1，其余为 0。总和为 1。'
        },
        {
          id: 16,
          question: '`int b[3]{ 1,1,1 }; for (int i = 1; i < 3; i++) { b[i] = b[i - 1] + 1; }` 执行后数组 `b` 各元素的值是：',
          options: ['`b[0]=1; b[1]=1; b[2]=1;`', '`b[0]=2; b[1]=2; b[2]=2;`', '`b[1]=2; b[2]=2; b[3]=2;`', '`b[0]=1; b[1]=2; b[2]=3;`', '`b[0]=3; b[1]=3; b[2]=3;`'],
          correctAnswer: 3,
          explanation: '`b[0]`不变(1); `i=1`: `b[1] = b[0]+1 = 2`; `i=2`: `b[2] = b[1]+1 = 3`。结果 `{1, 2, 3}`。'
        },
        {
          id: 17,
          question: '`void get(int a) { static int cnt = 0; int s = 0; cnt++; s += a; cout << cnt << s; } main: get(1); get(2);` 输出结果是：',
          options: ['1123', '1212', '1223', '1112', '以上皆非'],
          correctAnswer: 4,
          explanation: '`get(1)`: `cnt(static)=1`, `s=1` -> 输出 11; `get(2)`: `cnt=2`, `s=2` -> 输出 22。总输出 1122。选项中无 1122，故选 E。'
        },
        {
          id: 18,
          question: '`cout << add(1, 2) << endl;` 实际调用的是哪一个 `add`？(`int add(int,int)` vs `int add(double,double)`)',
          options: ['`int add(int,int)`', '`int add(double,double)`', '`char add2(int,char)`', '同时调用两个 `add`，发生二义性', '编译错误'],
          correctAnswer: 0,
          explanation: '实参 1, 2 均为 `int`，精确匹配 `int add(int, int)`。'
        },
        {
          id: 19,
          question: '关于指针和引用，以下定义中能“保存一个 int 变量地址”的是：',
          options: ['`int p;`', '`int &p;`', '`int* p;`', '`double* p;`', '`int p[10];`'],
          correctAnswer: 2,
          explanation: '`int* p` 定义了一个指向 `int` 的指针，可以保存 `int` 变量的地址。'
        },
        {
          id: 20,
          question: '若有 `int* p; int x;`，希望让 `p` 存储 `x` 的地址，下面的语句中正确的是：',
          options: ['`p = x;`', '`p = &x;`', '`*p = &x;`', '`&p = x;`', '`&p = &x;`'],
          correctAnswer: 1,
          explanation: '`p` 是指针，`&x` 是 `x` 的地址。`p = &x` 是正确的赋值。'
        },
        {
          id: 21,
          question: '`int a[3][4] = { {1,2}, {3,4,5}, {6} };` 则 `a[1][2]` 与 `a[2][3]` 的值分别是：',
          options: ['0 0', '2 5', '5 0', '5 6', '以上答案都不正确'],
          correctAnswer: 2,
          explanation: 'Row 0: 1,2,0,0; Row 1: 3,4,5,0; Row 2: 6,0,0,0。`a[1][2]` 是 Row 1 第 3 个元素 (5); `a[2][3]` 是 Row 2 第 4 个元素 (0)。'
        },
        {
          id: 22,
          question: '`void fun(int& a, int* b) { a++; (*b)--; } main: x=5, y=8; fun(x, &y); cout << x << y;` 输出结果是：',
          options: ['67', '57', '68', '58', '以上选项都不正确'],
          correctAnswer: 0,
          explanation: '`a`是`x`的引用(5->6), `b`指向`y`(8->7)。输出 67。'
        },
        {
          id: 23,
          question: '`#define MUL(a,b) (a)*(b)` ... `cout << MUL(4+3, 2+1);` 输出结果是：',
          options: ['11', '21', '27', '编译错误', '以上答案都不正确'],
          correctAnswer: 1,
          explanation: '宏展开为 `(4+3)*(2+1) = 7 * 3 = 21`。'
        },
        {
          id: 24,
          question: '`void f(int a) { if (a > 0) f(a - 1); cout << a; } f(5);` 的输出结果是：',
          options: ['54321', '12345', '543210', '012345', '以上选项都不正确'],
          correctAnswer: 3,
          explanation: '递归深入到 0，然后回溯打印。`f(0)`打印0, `f(1)`打印1... `f(5)`打印5。顺序 012345。'
        },
        {
          id: 25,
          question: '`char c[] = "ABCD"; char* d = c + 1; (*d)++; cout << sizeof(c) << " " << d;` 输出结果是：',
          options: ['5 CCD', '4 CD', '5 CD', '4 BCD', '以上选项都不正确'],
          correctAnswer: 0,
          explanation: '`sizeof(c)` 包含 `\\0` 为 5。`d` 指向 `\'B\'`，`(*d)++` 使其变为 `\'C\'`。`d` 输出字符串 "CCD"。'
        }
      ]
    }
  },
  {
    id: 'exam-1-coding-1',
    category: '套卷练习',
    group: '套卷一',
    title: '编程题 1：交换两个整数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 1：交换两个整数（不能用 swap）',
      description: '输入 2 个整数到变量 `a`、`b` 中，**交换** `a`、`b` 的值，输出 `a` 和 `b`，中间用一个空格隔开。**禁止调用 `std::swap` 函数**。\n\n**样例输入：**\n`5 10`\n\n**样例输出：**\n`10 5`',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // TODO: Input a, b; swap them without using std::swap; output them.
    
    return 0;
}`,
      hints: ['使用一个临时变量 t 来辅助交换', 't = a; a = b; b = t;'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, t;
    if (cin >> a >> b) {
        t = a;
        a = b;
        b = t;
        cout << a << " " << b;
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-1-coding-2',
    category: '套卷练习',
    group: '套卷一',
    title: '编程题 2：统计数值',
    type: 'exercise',
    exerciseData: {
      title: '编程题 2：统计正数、负数和 0 的个数',
      description: '输入 10 个整数，统计其中：\n- 正数的数量\n- 负数的数量\n- 0 的数量\n\n按顺序输出：`正数个数 负数个数 0 的个数`，中间用空格隔开。\n\n**样例输入：**\n`2 5 -3 0 13 -1 0 0 5 10`\n\n**样例输出：**\n`5 2 3`',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    // TODO: Read 10 integers and count positive, negative, and zeros
    
    return 0;
}`,
      hints: ['使用循环读入 10 次', '用三个变量 pos, neg, zero 分别计数', 'if (x > 0) ... else if (x < 0) ... else ...'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int pos = 0, neg = 0, zero = 0;
    int x;
    // Assuming we can read 10 integers from input. 
    // In this environment, we might need to simulate input or check available input.
    // Standard solution:
    for (int i = 0; i < 10; i++) {
        if (cin >> x) {
            if (x > 0) pos++;
            else if (x < 0) neg++;
            else zero++;
        }
    }
    cout << pos << " " << neg << " " << zero;
    return 0;
}`
    }
  },
  {
    id: 'exam-1-coding-3',
    category: '套卷练习',
    group: '套卷一',
    title: '编程题 3：字母矩阵',
    type: 'exercise',
    exerciseData: {
      title: '编程题 3：输出指定形状的字母矩阵',
      description: '输入一个正整数 `n`（保证 `1 <= n <= 26`），输出 `n` 行 `n` 列由大写字母组成的矩阵。\n第 1 行从 `\'A\'` 开始连续输出 `n` 个字母，第 2 行从 `\'B\'` 开始，以此类推，超过 `\'Z\'` 后重新从 `\'A\'` 开始循环。最后一行输出后也需要换行。\n\n**样例输入：**\n`5`\n\n**样例输出：**\n```text\nABCDE\nBCDEA\nCDEAB\nDEABC\nEABCD\n```',
      initialCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        // TODO: Output the matrix
    }
    return 0;
}`,
      hints: ['字符计算：char ch = \'A\' + (i + j) % 26;', '双重循环 i 从 0 到 n-1, j 从 0 到 n-1'],
      solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                char ch = 'A' + (i + j) % 26;
                cout << ch;
            }
            cout << endl;
        }
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-1-coding-4',
    category: '套卷练习',
    group: '套卷一',
    title: '编程题 4：阶乘与排列数',
    type: 'exercise',
    exerciseData: {
      title: '编程题 4：阶乘与排列数（必须使用函数）',
      description: '排列数公式：$ A(n,m) = \\frac{n!}{(n-m)!} $\n\n1. 定义函数 `int getFactorial(int n);` 计算 `n` 的阶乘。\n2. 定义函数 `int getArrange(int n, int m);` 计算从 `n` 个元素中取出 `m` 个元素的排列数。\n3. 在 `main` 函数中输入 `a` 和 `b`（`a >= b`），输出结果。\n\n**要求：必须使用函数，否则只给一半分数。**',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Implement getFactorial
int getFactorial(int n) {
    return 1;
}

// TODO: Implement getArrange using getFactorial
int getArrange(int n, int m) {
    return 0;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << getArrange(a, b);
    }
    return 0;
}`,
      hints: ['阶乘用循环或递归实现', 'A(n,m) = n! / (n-m)!', '注意 integer overflow 问题（本题范围较小暂不考虑）'],
      solutionCode: `#include <iostream>
using namespace std;

int getFactorial(int n) {
    int res = 1;
    for (int i = 1; i <= n; i++)
        res *= i;
    return res;
}

int getArrange(int n, int m) {
    int num = getFactorial(n);
    int den = getFactorial(n - m);
    return num / den;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << getArrange(a, b);
    }
    return 0;
}`
    }
  },
  {
    id: 'exam-1-coding-5',
    category: '套卷练习',
    group: '套卷一',
    title: '编程题 5：递归数列',
    type: 'exercise',
    exerciseData: {
      title: '编程题 5：递归数列（限用递归）',
      description: '数列：`1, 1, 1, 3, 5, 9, 17, 31, ...`\n- 前三项都是 1\n- 从第 4 项开始，每一项等于**前三项之和**\n\n输入一个正整数 `N`，输出该数列的第 `N` 项。\n\n**要求：限用递归计算。**',
      initialCode: `#include <iostream>
using namespace std;

// TODO: Implement recursive function f(n)
int f(int n) {
    return 0;
}

int main() {
    int N;
    if (cin >> N) {
        cout << f(N);
    }
    return 0;
}`,
      hints: ['基准情况：n <= 3 返回 1', '递归公式：f(n) = f(n-1) + f(n-2) + f(n-3)'],
      solutionCode: `#include <iostream>
using namespace std;

int f(int n) {
    if (n <= 3) return 1;
    return f(n - 1) + f(n - 2) + f(n - 3);
}

int main() {
    int N;
    if (cin >> N) {
        cout << f(N);
    }
    return 0;
}`
    }
  }
];
