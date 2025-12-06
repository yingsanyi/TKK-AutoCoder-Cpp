下面给出**一套全新的完整模拟卷**（第 5 套），风格、难度和考点分布尽量贴合你提供的历年试卷：  

- 单选题：25 题 × 2 分  
- 编程题：5 题 × 10 分  

我先给**题目**，再给**标准答案与解析**，最后给**编程题参考代码**。  

---  

## 一、单项选择题（共 25 题，每题 2 分）  

> 默认已包含  
> `#include <iostream>`  
> `using namespace std;`  
> 浮点数类型为 `double`。  

---  

### 1  
在 OJ 中，如果代码使用了 `sqrt` 函数，但没有包含正确头文件，最可能出现的错误类型是：  
(A) Compile Error  
(B) Runtime Error  
(C) Time Limit Exceeded  
(D) Memory Limit Exceeded  
(E) Presentation Error  

---  

### 2  
要使用 C++ 标准库的 `string` 类型，必须包含的头文件是：  
(A) `<cstring>`  
(B) `<String>`  
(C) `<string>`  
(D) `<stdio.h>`  
(E) `<stdlib.h>`  

---  

### 3  
给定 `random_device rd;`，要得到一个 [0,9]（包含 0 和 9）的随机整数，下列写法正确的是：  
(A) `rd() % 9;`  
(B) `rd() % 10;`  
(C) `rd() % 9 + 1;`  
(D) `rd() % 10 + 1;`  
(E) `rd() % 11;`  

---  

### 4  
下面语句中，哪一句是**非法的**？  
(A) `int _abc = 10;`  
(B) `double PI = 3.14;`  
(C) `int 3a = 5;`  
(D) `char ch = 'A';`  
(E) `int x_y_z = 0;`  

---  

### 5  
以下代码的输出结果是：  
```cpp  
int a = 4, b = 3;  
cout << a / b << " " << a % b;  
```  
(A) `1 1`  
(B) `1 0`  
(C) `1 3`  
(D) `1.33333 1`  
(E) 以上都不对  

---  

### 6  
已知字符 `'A'` 的 ASCII 码是 65， `'a'` 的 ASCII 码是 97。以下代码输出：  
```cpp  
char c = 'A';  
cout << (int)c << " " << char(c + 32);  
```  
(A) `65 A`  
(B) `65 a`  
(C) `97 a`  
(D) `97 A`  
(E) `32 a`  

---  

### 7  
下面关于 `if-else` 的说法中，正确的是：  
```cpp  
if (x > 0)  
    if (x > 5)  
        cout << 1;  
    else  
        cout << 2;  
```  
(A) `else` 与第一个 `if (x > 0)` 配对  
(B) `else` 与第二个 `if (x > 5)` 配对  
(C) 编译器会报错：`else` 无法匹配  
(D) 由缩进决定 `else` 与哪个 `if` 配对  
(E) `else` 可以单独存在，不需要 `if`  

---  

### 8  
以下代码的输出是（输入为 `3`）：  
```cpp  
int n;  
cin >> n;  
do  
{  
    cout << n;  
    n--;  
} while (n >= 0);  
```  
(A) `3`  
(B) `32`  
(C) `321`  
(D) `3210`  
(E) 无输出  

---  

### 9  
以下代码输出结果是：  
```cpp  
int cnt = 0;  
for (int i = 1; i <= 3; i++)  
{  
    for (int j = 1; j <= i; j++)  
    {  
        cnt++;  
    }  
}  
cout << cnt;  
```  
(A) 3  
(B) 4  
(C) 5  
(D) 6  
(E) 9  

---  

### 10  
下面代码的输出是：  
```cpp  
int x = 5;  
if (x > 0)  
    x++;  
if (x > 5)  
    x += 2;  
else  
    x -= 2;  
cout << x;  
```  
(A) 3  
(B) 5  
(C) 6  
(D) 7  
(E) 8  

---  

### 11  
以下代码在输入 `11` 时输出为：  
```cpp  
int x;  
cin >> x;  
if (x >= 10)  
{  
    cout << 1;  
}  
if (x > 100)  
{  
    cout << 2;  
}  
else  
{  
    cout << 3;  
}  
```  
(A) `1`  
(B) `3`  
(C) `13`  
(D) `12`  
(E) `123`  

---  

### 12  
关于函数调用和值/引用，以下程序的输出是：  
```cpp  
void f(int a, int &b)  
{  
    a++;  
    b = b + a;  
}  
int main()  
{  
    int x = 1, y = 2;  
    f(x, y);  
    cout << x << " " << y;  
    return 0;  
}  
```  
(A) `1 2`  
(B) `1 3`  
(C) `1 4`  
(D) `2 3`  
(E) `2 4`  

---  

### 13  
有如下代码：  
```cpp  
int a[5] = {1,2,3,4,5};  
int *p = a;  
p += 2;  
cout << *p;  
```  
输出结果是：  
(A) 1  
(B) 2  
(C) 3  
(D) 4  
(E) 5  

---  

### 14  
下面关于数组初始化：  
```cpp  
int a[5] = {1, 2};  
```  
数组元素 `a[0]` ~ `a[4]` 的值分别是：  
(A) `1 2 3 4 5`  
(B) `1 2 2 2 2`  
(C) `1 2 0 0 0`  
(D) `0 1 2 3 4`  
(E) 未定义  

---  

### 15  
以下字符串数组和输出：  
```cpp  
char s[] = "ABCD";  
cout << sizeof(s) << " " << s[4];  
```  
输出为：  
(A) `4 D`  
(B) `4` 后跟随机字符  
(C) `5` 后跟 `\0`（不显示）  
(D) `5` 后跟 `D`  
(E) 编译错误  

---  

### 16  
下面关于 `string` 的代码，输出为：  
```cpp  
#include <string>  
using namespace std;  
int main()  
{  
    string s = "Hello";  
    cout << s.length() << " " << s[0] << " " << s.substr(1,3);  
    return 0;  
}  
```  
(A) `5 H ell`  
(B) `4 H ell`  
(C) `5 e ell`  
(D) `5 H el`  
(E) 编译出错  

---  

### 17  
二维数组初始化：  
```cpp  
int a[2][3] = {{1,2,3},{4,5}};  
```  
则 `a[1][2]` 的值是：  
(A) 0  
(B) 3  
(C) 4  
(D) 5  
(E) 未定义  

---  

### 18  
下面函数：  
```cpp  
int sumRow(int a[][3], int row)  
{  
    int s = 0;  
    for (int j = 0; j < 3; j++)  
        s += a[row][j];  
    return s;  
}  
```  
若在主函数中有：  
```cpp  
int b[2][3] = {{1,2,3},{4,5,6}};  
cout << sumRow(b, 1);  
```  
则输出结果为：  
(A) 6  
(B) 9  
(C) 10  
(D) 15  
(E) 21  

---  

### 19  
下面宏使用可能产生的问题是：  
```cpp  
#define SQR(x) x * x  
int a = 2;  
int b = SQR(a + 1);  
```  
(A) `b` 的值为 9，符合预期  
(B) 宏替换后表达式变为 `(a+1)*(a+1)`  
(C) 宏替换后表达式变为 `a+1*a+1`，`b` 为 4  
(D) 编译错误  
(E) 链接错误  

---  

### 20  
关于指针，下列语句中合法的是：  
(A) `int* p; double* p;`  
(B) `int* p; int& p;`  
(C) `int* p; int x; p = &x;`  
(D) `int p; int* x = &p; &x = 10;`  
(E) `int* p = 10;`  

---  

### 21  
下面关于引用的说法，正确的是：  
(A) 引用一旦绑定变量后，可以重新绑定其他变量  
(B) `int& r;` 是合法的引用定义  
(C) 引用必须在定义时初始化  
(D) 引用本质上是一个可以为空的指针  
(E) 可以有“引用的引用”  

---  

### 22  
关于递归函数：  
```cpp  
int f(int n)  
{  
    if (n <= 1) return 1;  
    return n * f(n-1);  
}  
```  
函数 `f(n)` 的含义是：  
(A) 返回 n 的 2 次方  
(B) 返回 n 的阶乘  
(C) 返回 n 的 Fibonacci 数  
(D) 返回 1 到 n 的和  
(E) 返回 n+1  

---  

### 23  
下面代码的输出结果是：  
```cpp  
#include <iostream>  
using namespace std;  
int f(int a){ return a + 1; }  
int g(int a){ return 2 * a; }  
int main()  
{  
    int a = 3;  
    cout << f(g(a)) << " " << g(f(a));  
    return 0;  
}  
```  
(A) `7 8`  
(B) `7 6`  
(C) `8 8`  
(D) `8 6`  
(E) `6 8`  

---  

### 24  
OJ 上提交代码后如果显示 `Time Limit Exceeded`，最可能的原因是：  
(A) 代码语法错误  
(B) 输出格式不符合要求  
(C) 使用了没有 include 的函数  
(D) 算法效率太低或出现了死循环  
(E) 定义了太大的静态数组  

---  

### 25  
如下代码：  
```cpp  
char s[] = "xyz";  
char* p = s;  
(*p)++;  
cout << s;  
```  
输出为：  
(A) `xyz`  
(B) `Xyz`  
(C) `yyz`  
(D) `xAz`  
(E) `yz`  

---  

## 二、编程题（共 5 题，每题 10 分）  

> 均需写完整程序（含头文件和 `main`），与历年试卷一致要求。  

---  

### 编程题 1：奇偶统计与输出  

输入一个正整数 `n`（`1 <= n <= 100`），然后输入 `n` 个整数。  

1. 统计奇数个数与偶数个数  
2. 输出两行：  
   - 第一行：所有奇数，按输入顺序，用一个空格隔开，最后可有空格  
   - 第二行：两个整数，分别为奇数个数和偶数个数，中间用一个空格  

若没有奇数，第一行输出为空行即可。  

示例：  
输入：  
`5`  
`1 2 3 4 5`  

输出：  
```text  
1 3 5   
3 2  
```  

---  

### 编程题 2：数字直角三角形  

输入一个正整数 `n`（`1 <= n <= 9`），输出一个右下直角三角形。  

第 1 行右边只有一个数字 `1`，第 2 行右边有两个数字 `2`，……，第 n 行右边有 n 个数字 `n`。左边用空格补齐，使整个图形右对齐。  

样例输入：  
`4`  

样例输出：  
```text  
   1  
  22  
 333  
4444  
```  

---  

### 编程题 3：统计区间内“完美平方和数”  

定义：一个正整数 `x` 的“完美平方和数”性质为——它可以表示成若干个正整数的平方和（每个平方可以使用多次），此题简化为：只需要判断 `x` 是否为**某个整数的平方**或**两个整数平方和**。  

例如：  
- `5 = 1^2 + 2^2` → 是  
- `4 = 2^2` → 是  
- `3` 不能表示为一个平方或两个平方和 → 否  

输入两个正整数 `m` 和 `n`（`m <= n`，且均不大于 10000），统计区间 `[m,n]` 内有多少个这样的数，并输出计数。  

只需输出整数个数，不换行格式不作严格要求（一般加换行即可）。  

---  

### 编程题 4：函数：数组逆序（必须使用函数）  

编写一个函数：  

```cpp  
void reverseArray(int a[], int n);  
```  

功能：将数组 `a` 中前 `n` 个元素**就地逆序**。  

在 `main` 中：  

1. 输入整数 `n`（`1 <= n <= 100`）  
2. 输入 `n` 个整数存入数组 `a`  
3. 调用 `reverseArray(a, n);`  
4. 按顺序输出逆序后的数组，数字之间用一个空格隔开，行末可有空格，最后换行  

要求：  
- 必须使用该函数逆序，否则最多给一半分。  

---  

### 编程题 5：递归判断回文数（限用递归）  

本题限用递归，否则最多得一半分。  

1. 定义一个递归函数：  
   ```cpp  
   bool isPal(const string &s, int l, int r);  
   ```  
   - 判断字符串 `s` 在下标 `[l, r]` 范围内是否为回文（正着读和反着读相同）  
   - 结束条件：`l >= r` 则返回 `true`  
   - 若 `s[l] != s[r]` 则返回 `false`  
   - 否则递归调用 `isPal(s, l+1, r-1)`  

2. `main` 中：  
   - 输入一个只包含数字字符的字符串 `s`（不超过 100 位）  
   - 调用 `isPal(s, 0, s.size()-1)`  
   - 若返回 `true`，输出 `Yes`，否则输出 `No`  

示例：  
- 输入：`12321` → 输出：`Yes`  
- 输入：`123210` → 输出：`No`  

---  

# 标准答案与解析（单选）  

1. A — 使用了没声明的函数，编译阶段就报错。  
2. C — `std::string` 在 `<string>`。  
3. B — `rd()%10` 给 0~9。  
4. C — 变量名不能以数字开头。  
5. A — `4/3=1`，`4%3=1`。  
6. B — `c='A'(65)`，`char(c+32)='a'`。  
7. B — C/C++ 语法：`else` 总是和最近的未匹配 `if` 配对。  
8. D — 输出 3,2,1,0 → `3210`。  
9. D — 内层次数 1+2+3=6。  
10. C — `x=5→6→>5? +2 →8`？看仔细：  
    - 初始 x=5  
    - `if(x>0)` → 真 → x=6  
    - 再判断 `if(x>5)`：此处已是 6 → 真 → x+=2 → 8，**但题目中 else 对的是第二个 if**  
    答案应 8，但选项无 8？我给的是 E=8，因此**选 E**（列表中 E=8）。  
11. C — 第一个 if 输出 1；第二个 if 条件 `x>100` 为假，走它的 else 输出 3 → `13`。  
12. C — `a` 为值传递；`b` 是引用：  
    - `a` 变 2，不影响 `x`  
    - `y = y + a(2)` → 4 → `1 4`。  
13. C — `p` 指向 `a[2]` → 值为 3。  
14. C — 只前两项给初值，其余补 0：`1,2,0,0,0`。  
15. C — `"ABCD"` 实际是 5 个字符包含 `\0`，`sizeof(s)=5`，`s[4]='\0'`，不显示。  
16. A — 长度 5，`s[0]='H'`，`substr(1,3)="ell"`。  
17. A — 第二行 `{4,5,0}`，`a[1][2]=0`。  
18. D — 第二行和为 `4+5+6=15`。  
19. C — 宏直接替换成 `a+1*a+1` → `2+1*2+1=5`。  
20. C — 声明指针后再让它指向某个变量地址。  
21. C — 引用必须在定义时初始化，且不能重新绑定。  
22. B — 明显是阶乘。  
23. A — `g(3)=6`，`f(6)=7`；`f(3)=4`，`g(4)=8` → `7 8`。  
24. D — 一般是算法太慢或死循环。  
25. B — `(*p)++` 把 `'x'` 改为 `'y'` → `xyz` 变为 `yyz`？注意：`p=s` 指向首元素 `'x'`，`(*p)++`：`'x'`→`'y'`，数组变 `"y y z"`？其实内容是 `'y','y','z','\0'`，输出：`yyz`，但我选项写法 B=`Xyz`，C=`yyz`，应该是 `yyz`，对应选项 C，如果你按上面选项写的是 B= `Xyz` 那就选 C。按本套给出的选项：**选 C（`yyz`）**。  

（上面我已经在选项中把 B 设为 `Xyz`、C 为 `yyz`，因此标准答案为 C。）  

---  

# 编程题参考代码  

### 1. 奇偶统计与输出  

```cpp  
#include <iostream>  
using namespace std;  

int main()  
{  
    int n;  
    cin >> n;  
    int x;  
    int odds = 0, evens = 0;  
    int a[100];  

    for (int i = 0; i < n; i++)  
    {  
        cin >> a[i];  
        if (a[i] % 2 != 0) odds++;  
        else evens++;  
    }  

    // 第一行：所有奇数  
    for (int i = 0; i < n; i++)  
    {  
        if (a[i] % 2 != 0)  
            cout << a[i] << " ";  
    }  
    cout << endl;  

    // 第二行：奇数个数 偶数个数  
    cout << odds << " " << evens << endl;  

    return 0;  
}  
```  

---  

### 2. 数字直角三角形  

```cpp  
#include <iostream>  
using namespace std;  

int main()  
{  
    int n;  
    cin >> n;  

    for (int i = 1; i <= n; i++)  
    {  
        for (int j = 0; j < n - i; j++)  
            cout << ' ';  
        for (int j = 0; j < i; j++)  
            cout << i;  
        cout << endl;  
    }  

    return 0;  
}  
```  

---  

### 3. 区间内“完美平方和数”的个数  

判断 `x` 是否是一个平方，或两个平方和：  

```cpp  
#include <iostream>  
#include <cmath>  
using namespace std;  

bool isPerfectSquare(int x)  
{  
    int r = (int)(sqrt(x) + 0.0000001);  
    return r * r == x;  
}  

// 判断是否为某个平方或两个平方和  
bool isGood(int x)  
{  
    if (isPerfectSquare(x)) return true;  
    for (int a = 1; a * a <= x; a++)  
    {  
        int b2 = x - a * a;  
        if (b2 > 0 && isPerfectSquare(b2))  
            return true;  
    }  
    return false;  
}  

int main()  
{  
    int m, n;  
    cin >> m >> n;  
    int cnt = 0;  
    for (int x = m; x <= n; x++)  
        if (isGood(x)) cnt++;  
    cout << cnt << endl;  
    return 0;  
}  
```  

---  

### 4. 函数：数组逆序  

```cpp  
#include <iostream>  
using namespace std;  

void reverseArray(int a[], int n)  
{  
    int i = 0, j = n - 1;  
    while (i < j)  
    {  
        int t = a[i];  
        a[i] = a[j];  
        a[j] = t;  
        i++;  
        j--;  
    }  
}  

int main()  
{  
    int n;  
    cin >> n;  
    int a[100];  
    for (int i = 0; i < n; i++)  
        cin >> a[i];  

    reverseArray(a, n);  

    for (int i = 0; i < n; i++)  
        cout << a[i] << " ";  
    cout << endl;  

    return 0;  
}  
```  

---  

### 5. 递归判断回文数  

```cpp  
#include <iostream>  
#include <string>  
using namespace std;  

bool isPal(const string &s, int l, int r)  
{  
    if (l >= r) return true;  
    if (s[l] != s[r]) return false;  
    return isPal(s, l + 1, r - 1);  
}  

int main()  
{  
    string s;  
    cin >> s;  
    if (isPal(s, 0, (int)s.size() - 1))  
        cout << "Yes";  
    else  
        cout << "No";  
    return 0;  
}  
```  

---  

