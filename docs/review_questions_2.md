好的，收到。根据您的要求，我将把50道选择题全部设计为代码阅读理解题（分析输出结果、编译情况或运行行为），并附上10道编程题。内容涵盖您指定的C++知识点。

---
C++ 专项练习题集
第一部分：选择题（50道，代码阅读类）
每题均为五选一，请分析代码段的行为或输出。
A. 函数与调用 (递归、重载、嵌套)
1. 阅读以下代码，输出结果是？
C++
void f(int x) { cout << "INT"; }
void f(double x) { cout << "DBL"; }
int main() {
    f(5);
    f(5.0);
    return 0;
}
A. INT INT
B. DBL DBL
C. INT DBL
D. DBL INT
E. 编译错误
答案：C
解析： 函数重载。5 是 int 字面量匹配第一个，5.0 是 double 字面量匹配第二个。
2. 阅读以下递归代码，输出结果是？
C++
int func(int n) {
    if (n == 0) return 0;
    return n + func(n - 1);
}
int main() { cout << func(5); }
A. 10
B. 15
C. 5
D. 0
E. 120
答案：B
解析： 计算 $5+4+3+2+1+0 = 15$。
3. 阅读以下代码，分析输出：
C++
int x = 1;
int func(int a) { return a + x; }
int main() {
    int x = 5;
    cout << func(x);
}
A. 2
B. 6
C. 10
D. 5
E. 1
答案：B
解析： main 中的局部变量 x 为5，作为参数传给 func 的形参 a。func 内部使用的全局变量 x 为1。返回 $5+1=6$。
4. 如下代码的运行结果是？
C++
void foo(int n) {
    if (n > 0) {
        foo(n - 1);
        cout << n << " ";
    }
}
int main() { foo(3); }
A. 3 2 1
B. 1 2 3
C. 3 2 1 0
D. 0 1 2 3
E. 死循环
答案：B
解析： 递归调用在 cout 之前，因此先深入到最底层 n=0（不输出），回溯时依次输出 1, 2, 3。
5. 关于函数重载的匹配，以下代码会发生什么？
C++
void t(int a, float b) {}
void t(float a, int b) {}
int main() {
    t(10, 10);
}
A. 调用第一个
B. 调用第二个
C. 编译错误（二义性）
D. 运行时崩溃
E. 随机调用
答案：C
解析： 两个参数都是 int，两个重载版本都需要进行一次隐式类型转换，编译器无法判断哪个更优，报二义性错误。
6. 阅读嵌套调用代码：
C++
int sq(int x) { return x * x; }
int add(int a, int b) { return a + b; }
int main() {
    cout << sq(add(2, 3));
}
A. 13
B. 25
C. 10
D. 5
E. 36
答案：B
解析： 先计算 add(2,3) 得到 5，再计算 sq(5) 得到 25。
7. 若函数定义如下，main 中的调用结果是？
C++
int f(int n) {
    return (n <= 1) ? 1 : n * f(n-1);
}
int main() { cout << f(4); }
A. 10
B. 24
C. 12
D. 4
E. 1
答案：B
解析： 计算阶乘 $4! = 4 \times 3 \times 2 \times 1 = 24$。
B. 随机数
8. 假设 rand() 最大值为 32767，以下代码输出值的范围？
C++
cout << rand() % 20 + 10;
A. [0, 19]
B. [10, 30]
C. [10, 29]
D. [10, 20]
E. [11, 30]
答案：C
解析： rand() % 20 范围是 $[0, 19]$，加上 10 后范围是 $[10, 29]$。
9. 连续运行两次以下程序的输出结果是？
C++
int main() {
    srand(1);
    cout << rand();
}
A. 两次输出不同的随机数
B. 两次输出相同的数
C. 第一次输出0，第二次输出1
D. 编译错误
E. 无法确定
答案：B
解析： 种子固定为 1，每次运行程序生成的伪随机序列相同。
10. 阅读代码，分析 x 的可能值：
C++
int x = rand() % 5;
if (x == 5) cout << "Yes";
else cout << "No";
A. 一定输出 Yes
B. 一定输出 No
C. 可能输出 Yes
D. 编译错误
E. 运行时错误
答案：B
解析： % 5 的结果范围是 $[0, 4]$，永远不可能是 5。
C. 变量存储期与生命周期
11. 如下代码输出什么？
C++
void f() {
    static int i = 0;
    cout << ++i << " ";
}
int main() { f(); f(); f(); }
A. 1 1 1
B. 0 0 0
C. 1 2 3
D. 0 1 2
E. 编译错误
答案：C
解析： static 局部变量只初始化一次，后续调用会保留上次的值。
12. 阅读代码，输出结果是？
C++
int a = 10;
int main() {
    int a = 20;
    {
        int a = 30;
        cout << a << " ";
    }
    cout << a;
}
A. 10 10
B. 30 30
C. 30 20
D. 20 20
E. 30 10
答案：C
解析： 块作用域遮蔽。最内层 {} 输出 30，退出内层块后，main 的局部变量 a (20) 恢复可见。
13. 关于静态变量的默认值，以下代码输出？
C++
static int arr[5];
int main() { cout << arr[0]; }
A. 0
B. 垃圾值
C. 编译错误
D. null
E. 1
答案：A
解析： 静态存储期的变量（全局或静态局部）若未显式初始化，编译器自动将其初始化为 0。
14. 以下代码中，变量 y 的生命周期何时结束？
C++
void func() {
    int y = 10; 
    cout << y;
}
A. 程序结束时
B. main 函数结束时
C. func 函数被调用时
D. func 函数返回时
E. 文件关闭时
答案：D
解析： y 是自动变量（栈变量），函数执行完毕弹栈销毁。
D. 数组（默认值 + 访问）
15. 阅读代码，输出结果是？
C++
int a[5] = {1, 2};
cout << a[3];
A. 1
B. 2
C. 0
D. 垃圾值
E. 编译错误
答案：C
解析： 聚合初始化部分元素后，其余元素自动补零。
16. 以下代码会发生什么？
C++
int arr[] = {1, 2, 3};
cout << sizeof(arr) / sizeof(int);
A. 1
B. 3
C. 4
D. 8
E. 编译错误
答案：B
解析： 计算数组元素个数。数组总大小(12) / 单个int大小(4) = 3。
17. 阅读代码，输出是什么？
C++
int a[3][2] = {{1, 2}, {3, 4}, {5, 6}};
cout << a[1][1];
A. 2
B. 3
C. 4
D. 5
E. 6
答案：C
解析： 索引从0开始。a[1] 是第二行 {3, 4}，a[1][1] 是该行第二个元素 4。
18. 如下代码中 p 指向哪里？
C++
int a[4] = {10, 20, 30, 40};
int *p = a + 2;
cout << *p;
A. 10
B. 20
C. 30
D. 40
E. 编译错误
答案：C
解析： 数组名 a 是首地址，+2 偏移两个 int 大小，指向 30。
19. 阅读代码，分析输出：
C++
int arr[5];
// 假设 arr 内存地址是 1000 (十进制), int 占 4 字节// cout << arr + 1; 输出多少？
A. 1001
B. 1004
C. 1000
D. 1005
E. 1008
答案：B
解析： 指针算术运算单位是元素类型的大小。1000 + 1 * 4 = 1004。
20. 二维数组访问，代码如下：
C++
int m[2][3] = {1, 2, 3, 4, 5, 6};
cout << m[0][3]; 
A. 3
B. 4
C. 0
D. 编译错误
E. 尽管越界，但通常输出4（取决于内存布局）
答案：E
解析： 这是一个典型的数组越界（Undefined Behavior）。但在连续内存布局中，m[0][3] 越过了第一行的末尾，恰好访问到了第二行的开头 4。虽然结果通常是4，但这是不安全代码。
21. 未初始化的局部数组：
C++
int main() {
    int arr[5];
    cout << arr[0];
}
A. 0
B. 1
C. 随机值（垃圾值）
D. null
E. 编译错误
答案：C
解析： 局部变量未初始化，内容未定义。
22. 遍历数组的逻辑：
C++
int a[] = {1, 2, 3};
for(int i=0; i<=3; i++) cout << a[i];
A. 123
B. 1230
C. 123 + 垃圾值
D. 编译错误
E. 死循环
答案：C
解析： 循环条件 i<=3 导致访问下标 0, 1, 2, 3。下标 3 越界，输出未定义值。
23. 二维数组部分初始化：
C++
int a[2][2] = {{1}, {2}};
cout << a[0][1] << a[1][1];
A. 1 2
B. 0 0
C. 垃圾值 垃圾值
D. 1 0
E. 0 2
答案：B
解析： 每行只初始化了第一个元素，每行剩余元素补0。
E. 字符串（string & char[]）
24. 阅读代码：
C++
string s = "123";
s += '4';
cout << s;
A. 123
B. 7 (数值相加)
C. 1234
D. 编译错误
E. 127
答案：C
解析： string 重载了 +=，支持字符追加。
26. cin 读取行为：
C++
string s;
// 输入: Hello World
cin >> s;
cout << s;
A. Hello World
B. Hello
C. World
D. Hello\n
E. 编译错误
答案：B
解析： cin 遇空格停止。
28. string 子串操作：
C++
string s = "ABCDEF";
cout << s.substr(2, 2);
A. AB
B. BC
C. CD
D. CDE
E. DE
答案：C
解析： 从索引2 ('C') 开始，截取长度2，得到 "CD"。
25. 查找子串：
C++
string s = "banana";
cout << s.find("na");
A. 1
B. 2
C. 3
D. 4
E. 0
答案：B
解析： 第一次出现 "na" 是在索引 2。
26. 字符串比较：
C++
string s1 = "apple";
string s2 = "banana";
cout << (s1 > s2);
A. 1
B. 0
C. true
D. 编译错误
E. -1
答案：B
解析： 字典序比较，'a' 小于 'b'，所以 s1 > s2 为假（0）。
31. getline 混合使用：
C++
int n; string s;
// 输入:// 10// Hellocin >> n;
getline(cin, s);
cout << s.length();
A. 5
B. 0
C. 1
D. 10
E. 6
答案：B
解析： cin >> n 留下换行符，getline 读到换行符立即结束，读入空串，长度0。
33. string 修改：
C++
string s = "Top";
s[0] = 'P';
cout << s;
A. Pop
B. Top
C. pop
D. 编译错误
E. P
答案：A
解析： 字符串可变，直接修改索引0。
27. 字符拼接：
C++
// string s = "A" + "B"; // 这样写会如何？
A. s为 "AB"
B. 编译错误
C. s为 "BA"
D. 运行时错误
E. s为数字求和
答案：B
解析： 两个C风格字符串字面量不能直接相加。必须至少有一个是 std::string 对象。
28. 访问字符串最后一位：
C++
string s = "Code";
cout << s[s.size() - 1];
A. d
B. e
C. \0
D. 越界
E. o
答案：B
解析： 长度为4，最后一位下标是3，即 'e'。
F. 指针（修改变量、与数组/二维数组关系）
29. 指针基本操作：
C++
int a = 50;
int *p = &a;
*p = 20;
cout << a;
A. 50
B. 20
C. 编译错误
D. 随机值
E. 地址值
答案：B
解析： 通过指针解引用修改了原变量的值。
30. 指针与数组关系：
C++
int a[] = {1, 2, 3};
int *p = a;
cout << *(p + 1);
A. 1
B. 2
C. 3
D. a[0]的地址
E. 编译错误
答案：B
解析： p 指向 1，p+1 指向 2，解引用得到 2。
31. 指针自增操作：
C++
int a[] = {10, 20};
int *p = a;
cout << *p++; 
A. 11
B. 20
C. 10
D. 21
E. 编译错误
答案：C
解析： *p++ 相当于 *(p++)。先取 *p 的值（10），然后指针 p 自增指向下一个元素。输出的是自增前的值。
32. 空指针解引用：
C++
int *p = nullptr;
// cout << *p; // 运行这行会发生什么？
A. 输出 0
B. 输出 null
C. 运行时崩溃 (Segfault)
D. 编译错误
E. 输出随机值
答案：C
解析： 访问非法内存。
33. 指针比较：
C++
int a[5];
int *p1 = &a[1];
int *p2 = &a[3];
cout << (p2 > p1);
A. 0
B. 1
C. false
D. 编译错误
E. 无法确定
答案：B
解析： 同一数组中，高下标元素的地址大于低下标元素的地址。
34. 指针减法：
C++
int a[] = {1, 2, 3, 4, 5};
int *p1 = a;
int *p2 = a + 4;
cout << p2 - p1;
A. 16
B. 4
C. 3
D. 5
E. 编译错误
答案：B
解析： 指针相减返回的是两个指针之间的元素个数，不是字节数。
35. 常量指针：
C++
int a = 10;
const int *p = &a;
// *p = 20; // 这行会怎样？
A. a 变成 20
B. p 变成指向20
C. 编译错误
D. 运行时错误
E. 无效操作但无报错
答案：C
解析： const int * 表示指针指向的内容不可通过该指针修改。
36. 引用与指针区别：
C++
int a = 10;
int &r = a;
r = 20;
cout << a;
A. 10
B. 20
C. 30
D. 编译错误
E. 地址
答案：B
解析： 引用是别名，修改引用即修改原变量。
37. 数组名作函数参数的退化：
C++
void f(int a[100]) {
    // 这里的 a 是什么类型？
}
A. int 数组，大小100
B. int*
C. const int*
D. int&
E. int
答案：B
解析： 函数参数中的数组声明自动退化为指向首元素的指针。

---
第二部分：编程题（10道）
说明： 请根据题目要求编写C++代码。
1. 数组求和与平均值 (基础数值运算)
题目： 输入一个整数 $n$ ($1 \le n \le 100$) 和 $n$ 个整数，计算并输出这些数的总和与平均值（平均值保留一位小数或直接输出浮点数）。
解析：
1. 定义 sum 为 double 或 long long 防止溢出。
2. 循环累加。
3. 平均值为 sum / n，注意隐式类型转换。
C++
#include <iostream>using namespace std;
int main() {
    int n;
    double sum = 0;
    cin >> n;
    int val;
    for(int i=0; i<n; i++) {
        cin >> val;
        sum += val;
    }
    cout << "Sum: " << sum << endl;
    cout << "Avg: " << sum / n << endl;
    return 0;
}
2. 查找特定元素 (线性搜索)
题目： 定义一个包含10个整数的数组 {12, 45, 23, 6, 78, 90, 34, 11, 5, 67}。输入一个数，判断该数是否存在于数组中。若存在，输出其下标（第一次出现）；若不存在，输出 -1。
解析： 遍历数组，比较每个元素。使用标志位或直接 return / break。
C++
#include <iostream>using namespace std;
int main() {
    int arr[10] = {12, 45, 23, 6, 78, 90, 34, 11, 5, 67};
    int target, pos = -1;
    cin >> target;
    for(int i=0; i<10; i++) {
        if(arr[i] == target) {
            pos = i;
            break;
        }
    }
    cout << pos << endl;
    return 0;
}
3. 统计字符串中的数字个数 (字符判断)
题目： 输入一行包含空格的字符串，统计其中数字字符 ('0'-'9') 的个数并输出。
解析： 使用 getline 读取整行，isdigit() 函数或 c >= '0' && c <= '9' 判断。
C++
#include <iostream>#include <string>using namespace std;
int main() {
    string s;
    getline(cin, s);
    int count = 0;
    for(char c : s) {
        if(c >= '0' && c <= '9') {
            count++;
        }
    }
    cout << count << endl;
    return 0;
}
4. 冒泡排序 (排序)
题目： 输入5个整数，使用冒泡排序将其从小到大排序后输出。
解析： 双层循环，外层控制轮数，内层比较相邻元素。
C++
#include <iostream>using namespace std;
int main() {
    int a[5];
    for(int i=0; i<5; i++) cin >> a[i];
    
    for(int i=0; i<4; i++) { // 轮数for(int j=0; j<4-i; j++) { // 比较次数if(a[j] > a[j+1]) {
                int temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    
    for(int i=0; i<5; i++) cout << a[i] << " ";
    return 0;
}
5. 质数判断 (数学判断)
题目： 输入一个整数 $n$，编写函数 bool isPrime(int n) 判断其是否为质数。如果是输出 "Yes"，否则输出 "No"。
解析： 排除 $\le 1$ 的数。循环从 2 到 $\sqrt{n}$，若能整除则不是质数。
C++
#include <iostream>using namespace std;
bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
int main() {
    int n;
    cin >> n;
    if (isPrime(n)) cout << "Yes";
    else cout << "No";
    return 0;
}
6. 随机生成不重复的数 (随机数与数组)
题目： 生成 5 个 $[1, 10]$ 之间的随机整数。（简化版：允许重复） 如果要求不重复，需要检查已生成的数。这里请写出允许重复的版本即可，要求设定时间种子。
解析： srand(time(0))，rand() % 10 + 1。
C++
#include <iostream>#include <cstdlib>#include <ctime>using namespace std;
int main() {
    srand(time(0));
    for(int i=0; i<5; i++) {
        cout << (rand() % 10 + 1) << " ";
    }
    return 0;
}
7. 矩阵转置 (二维数组)
题目： 定义一个 2行3列 的数组并初始化，输出其转置矩阵（3行2列）。
解析： b[j][i] = a[i][j]。
C++
#include <iostream>using namespace std;
int main() {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for(int j=0; j<3; j++) {
        for(int i=0; i<2; i++) {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
8. 字符串反转 (字符串操作)
题目： 输入一个字符串，不使用 reverse 库函数，利用双指针或循环将其反转并输出。
解析： left 指向头，right 指向尾，交换并向中间移动。
C++
#include <iostream>#include <string>using namespace std;
int main() {
    string s;
    cin >> s;
    int n = s.length();
    for(int i=0; i < n/2; i++) {
        char temp = s[i];
        s[i] = s[n-1-i];
        s[n-1-i] = temp;
    }
    cout << s << endl;
    return 0;
}
9. 模板函数实现数组打印 (模板)
题目： 编写一个模板函数 printArray，接收数组指针和长度，能够打印 int 数组或 double 数组。
解析： template <typename T> void printArray(T arr[], int n)。
C++
#include <iostream>using namespace std;
template <typename T>
void printArray(T arr[], int n) {
    for(int i=0; i<n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}
int main() {
    int a[] = {1, 2, 3};
    double b[] = {1.1, 2.2};
    printArray(a, 3);
    printArray(b, 2);
    return 0;
}
10. 递归求斐波那契数列 (函数与递归)
题目： 输入 $n$，输出斐波那契数列的第 $n$ 项。约定 $F(1)=1, F(2)=1$。
解析： $F(n) = F(n-1) + F(n-2)$。
C++
#include <iostream>using namespace std;
int fib(int n) {
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
}
int main() {
    int n;
    cin >> n;
    cout << fib(n);
    return 0;
}
