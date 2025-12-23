一、选择题（50 题，五选一，代码阅读）
1.1 递归终止条件
#include <iostream>
using namespace std;

int f(int n){
    if(n==0) return 0;
    return f(n-1) + n;
}
int main(){
    cout << f(4);
}
A. 6  B. 8  C. 10  D. 12  E. 无限递归
答案：C
解析： 递归求和 (1+2+3+4=10)，终止条件 n==0。

---
1.2 递归返回值
#include <iostream>
using namespace std;

int g(int n){
    if(n<=1) return 1;
    return n * g(n-2);
}
int main(){
    cout << g(6);
}
A. 36  B. 48  C. 72  D. 120  E. 240
答案：C
解析： (g(6)=6g(4)=64g(2)=642g(0)=481=48)？注意 n<=1 return 1，所以 (g(0)=1)，结果 (642=48)。但 g(2)=2*g(0)=2，最终 (64*2=48)。选项里无 48？有 B=48，应选 B。
答案：B
解析： 同上，递归步长为 2[ref:2,5]。

---
1.3 递归与栈深度（读输出）
#include <iostream>
using namespace std;

void p(int n){
    if(n==0) return;
    cout << n;
    p(n-1);
    cout << n;
}
int main(){ p(3); }
A. 123321  B. 321123  C. 123123  D. 332211  E. 321321
答案：A
解析： 先序输出 3 2 1，回溯再输出 1 2 3[ref:2,5]。

---
1.4 重载：仅返回值不同？
#include <iostream>
using namespace std;

int h(int x){ return x; }
double h(int x){ return x + 0.5; }

int main(){
    cout << h(3);
}
A. 输出 3
 B. 输出 3.5
 C. 编译通过但运行时二义性
 D. 编译错误：无法仅以返回值重载
 E. 编译错误：main 里调用非法
答案：D
解析： C++ 不能只靠返回值区分重载，参数列表需不同[ref:2,5]。

---
1.5 参数个数不同
#include <iostream>
using namespace std;

int add(int a,int b){ return a+b; }
int add(int a,int b,int c){ return a+b+c; }

int main(){ cout << add(1,2) << " " << add(1,2,3); }
A. 3 6
 B. 6 3
 C. 3 5
 D. 5 6
 E. 编译二义性
答案：A
解析： 参数个数不同可重载，分别调用对应版本[ref:7,5]。

---
1.6 嵌套调用：返回值作实参
#include <iostream>
using namespace std;

int inc(int x){ return x+1; }
int mul(int a,int b){ return a*b; }

int main(){
    cout << mul(inc(2), inc(3));
}
A. 9  B. 12  C. 16  D. 20  E. 24
答案：B
解析： inc(2)=3,inc(3)=4，乘积 12[ref:2,5]。

---
1.7 嵌套调用与可读性
#include <iostream>
using namespace std;

int a(){ cout<<"A"; return 1; }
int b(){ cout<<"B"; return 2; }
int add(int x,int y){ return x+y; }

int main(){
    cout << add(a(), b());
}
A. AB3  B. BA3  C. AB12  D. BA12  E. 输出顺序不确定
答案：E
解析： 函数实参求值顺序在标准中可能不保证固定（不同标准/实现差异），但结果数值为 3[ref:2,5]。

---
1.8 静态局部变量（只初始化一次）
#include <iostream>
using namespace std;

int foo(){
    static int x = 0;
    return ++x;
}
int main(){
    cout << foo() << foo() << foo();
}
A. 000  B. 111  C. 123  D. 321  E. 234
答案：C
解析： static 局部变量生命周期贯穿程序，仅初始化一次，连续累加[ref:2,5]。

---
1.9 非静态局部变量（每次重建）
#include <iostream>
using namespace std;

int foo(){
    int x = 0;
    return ++x;
}
int main(){
    cout << foo() << foo() << foo();
}
A. 123  B. 111  C. 000  D. 321  E. 222
答案：B
解析： 每次调用 x 都重新创建并初始化为 0[ref:2,5]。

---
1.10 一维数组访问
#include <iostream>
using namespace std;

int main(){
    int a[5] = {1,2,3};
    cout << a[3] << a[4];
}
A. 00  B. 30  C. 03  D. 12  E. 未定义
答案：A
解析： 部分初始化，剩余元素自动置 0（同一声明中显式初始化）[ref:2,5]。

---
1.11 自动存储期未初始化
#include <iostream>
using namespace std;

int main(){
    int a[3];
    cout << a[0];
}
A. 一定是 0
 B. 一定是 1
 C. 一定是 -1
 D. 未定义值（不确定）
 E. 编译错误
答案：D
解析： 自动存储期的未初始化局部变量/数组元素值不确定。

---
1.12 数组名退化为指针（读输出）
#include <iostream>
using namespace std;

int main(){
    int a[3]={10,20,30};
    int* p=a;
    cout << *(p+1);
}
A. 10  B. 20  C. 30  D. 地址值  E. 未定义
答案：B
解析： p+1 指向 a[1]，解引用为 20[ref:2,5]。

---
1.13 下标与指针等价
#include <iostream>
using namespace std;

int main(){
    int a[4]={5,6,7,8};
    int* p=a;
    cout << p[2];
}
A. 5  B. 6  C. 7  D. 8  E. 编译错误
答案：C
解析： p[i] 等价 *(p+i)[ref:2,5]。

---
1.14 越界访问
#include <iostream>
using namespace std;

int main(){
    int a[2]={1,2};
    cout << a[2];
}
A. 0  B. 1  C. 2  D. 3  E. 未定义行为
答案：E
解析： 越界访问导致未定义行为[ref:2,5]。

---
1.15 二维数组内存按行连续
#include <iostream>
using namespace std;

int main(){
    int a[2][3]={{1,2,3},{4,5,6}};
    cout << *(*(a+1)+2);
}
A. 3  B. 4  C. 5  D. 6  E. 未定义
答案：D
解析： a+1 指向第 2 行，+2 到该行第 3 列元素。

---
1.16 二维数组部分初始化的默认值
#include <iostream>
using namespace std;

int main(){
    int a[2][3]={{1},{4,5}};
    cout << a[0][2] << a[1][2];
}
A. 15  B. 10  C. 00  D. 05  E. 未定义
答案：C
解析： 同一声明中部分初始化，其余元素补 0[ref:2,5]。

---
1.17 行指针类型
#include <iostream>
using namespace std;

int main(){
    int a[2][3]={{1,2,3},{4,5,6}};
    int (*p)[3] = a;
    cout << p[1][0];
}
A. 1  B. 2  C. 3  D. 4  E. 编译错误
答案：D
解析： p 是指向“含 3 个 int 的数组”的指针，p[1] 为第 2 行。

---
1.19 通过指针修改外部变量
#include <iostream>
using namespace std;

void setv(int* p){ *p = 9; }

int main(){
    int x=1;
    setv(&x);
    cout << x;
}
A. 1  B. 9  C. 0  D. 未定义  E. 编译错误
答案：B
解析： 传入地址，函数内解引用修改原变量[ref:2,5]。

---

---
1.21 string 拼接
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s="ab";
    s += "cd";
    cout << s;
}
A. ab  B. cd  C. abcd  D. 编译错误  E. 未定义
答案：C
解析： std::string 支持 += 追加拼接[ref:2,5]。

---
1.23 substring 越界参数
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s="abcd";
    cout << s.substr(2, 10);
}
A. cd  B. c  C. 空  D. 抛异常  E. 编译错误
答案：A
解析： substr(pos,len) 会截到字符串末尾（pos 合法时）[ref:2,5]。

---
1.27 find 未找到
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s="abcd";
    cout << (s.find("e")==string::npos);
}
A. 0  B. 1  C. -1  D. npos  E. 编译错误
答案：B
解析： 未找到返回 string::npos，比较为真输出 1。

---
1.28 从指定位置查找
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s="ababa";
    cout << s.find("ba", 2);
}
A. 1  B. 2  C. 3  D. 4  E. npos
答案：C
解析： 从下标 2 开始找，"ba" 出现在位置 3[ref:2,5]。

---
1.29 反向查找 rfind
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s="ababa";
    cout << s.rfind("aba");
}
A. 0  B. 1  C. 2  D. 3  E. npos
答案：C
解析： 最后一次出现 "aba" 起点为 2[ref:2,5]。

---
1.30 rand 区间映射（概念结果）
int x = rand() % 6 + 1;
x 的可能范围是：
 A. [0,6]  B. [1,6]  C. [1,7]  D. [0,5]  E. 不确定
答案：B
解析： rand()%6 得 0..5，加 1 得 1..6（均匀性仍可能受取模影响。

---
1.31 srand 作用
#include <iostream>
#include <cstdlib>
using namespace std;

int main(){
    srand(1);
    cout << rand() << " " << rand();
}
A. 每次运行都不同
 B. 每次运行相同序列
 C. rand() 恒为 1
 D. 编译错误
 E. 未定义
答案：B
解析： 固定种子会产生可复现的伪随机序列[ref:10,1]。

---
1.33 a>b 的区间映射（读输出）
#include <iostream>
using namespace std;

int main(){
    int a=10,b=3;
    if(a>b){ int t=a; a=b; b=t; }
    cout << a << " " << b;
}
A. 10 3  B. 3 10  C. 13  D. 7  E. 未定义
答案：B
解析： 交换确保区间端点有序，便于生成 [a,b][ref:10,1]。

---
1.34 指针算术与输出
#include <iostream>
using namespace std;

int main(){
    int a[]={1,4,9,16};
    int* p=a+3;
    cout << *(p-2);
}
A. 1  B. 4  C. 9  D. 16  E. 未定义
答案：C
解析： p 指向 a[3]，p-2 指向 a[1]？等等：3-2=1，是 4。应选 B。
答案：B
解析： *(a+1)=4[ref:2,5]。

---
1.35 指针修改数组元素
#include <iostream>
using namespace std;

int main(){
    int a[3]={1,2,3};
    int* p=a;
    *(p+1)=9;
    cout << a[1];
}
A. 2  B. 3  C. 9  D. 未定义  E. 编译错误
答案：C
解析： 指针指向数组，修改第二个元素[ref:2,5]。

---
1.37 二维数组传参：列数必须固定
#include <iostream>
using namespace std;

void print(int a[][]){ cout << a[0][0]; }

int main(){
    int x[2][3]={{1,2,3},{4,5,6}};
    print(x);
}
A. 输出 1
 B. 输出 4
 C. 编译错误
 D. 运行错误
 E. 未定义
答案：C
解析： 形参二维数组必须给出第二维（列数）以确定寻址[ref:2,5]。

---
1.39 正确的行指针形参
#include <iostream>
using namespace std;

void print(int (*a)[3]){ cout << a[1][2]; }

int main(){
    int x[2][3]={{1,2,3},{4,5,6}};
    print(x);
}
A. 3  B. 4  C. 5  D. 6  E. 编译错误
答案：D
解析： 访问第 2 行第 3 列元素 6[ref:2,5]。

---
1.41 string 内容比较
#include <iostream>
#include <string>
using namespace std;

int main(){
    string a="hi", b="hi";
    cout << (a==b);
}
A. 0  B. 1  C. hi  D. 编译错误  E. 未定义
答案：B
解析： std::string 的 == 比较内容。

---
1.42 getline 读取空格
#include <iostream>
#include <string>
using namespace std;

int main(){
    string s;
    getline(cin,s);
    cout << s.size();
}
输入：a b
 A. 1  B. 2  C. 3  D. 4  E. 5
答案：C
解析： 包含空格整行读取，"a␠b" 长度 3[ref:2,5]。

---
1.43 递归：缺少终止条件
#include <iostream>
using namespace std;

int f(int n){
    return f(n-1) + 1;
}
int main(){ cout << f(3); }
A. 3  B. 0  C. 4  D. 编译错误  E. 运行时无限递归/栈溢出
答案：E
解析： 无终止条件，递归不会停止，导致栈溢出[ref:2,5]。

---

---
1.45 数组遍历边界
#include <iostream>
using namespace std;

int main(){
    int a[3]={1,2,3};
    for(int i=0;i<=3;i++) cout<<a[i];
}
A. 123  B. 1230  C. 1233  D. 未定义行为  E. 编译错误
答案：D
解析： i==3 时越界访问[ref:2,5]。

---
1.49 嵌套调用与重载（返回类型匹配）
#include <iostream>
using namespace std;

int t(double x){ return (int)(x*2); }
double t(int x){ return x/2.0; }

int main(){
    cout << t(t(3));
}
A. 1  B. 2  C. 3  D. 6  E. 12
答案：B
解析： 内层 t(3) 选 double t(int) 得 1.5；外层 t(1.5) 选 int t(double) 得 3，但输出为 3？选项 C。重新算：(int)(1.5*2)=(int)3.0=3，应选 C。
答案：C
解析： 嵌套时关注返回类型触发的重载选择[ref:2,5]。

---
二、编程题（10 题，给出题目要求；可按需再要参考答案）
1. 数组逆序输出（无尾随空格）：输入 n 与 n 个整数，按逆序输出，元素间空格分隔，末尾无多余空格[ref:2,5]。
2. 二维数组行列输出格式：输入 r,c 与矩阵，按原矩阵输出，每行元素空格分隔、行末换行[ref:2,5]。
3. 统计大小写与转换：输入一行字符串，统计大写/小写个数，并输出转换后字符串（大写转小写、小写转大写）[ref:2,5]。
4. 模板函数：交换与最大值：实现 swapT(T&,T&) 与 maxT(T,T)，并用 int/double/string 各测试一次[ref:2,5]。
5. 顺序查找第一次出现位置：输入 n、数组与目标 x，输出第一次出现下标；不存在输出 -1[ref:2,5]。
6. 字符串查找最后一次出现：输入一行 s 与模式 p，输出 p 在 s 中最后一次出现位置；没有输出 -1[ref:2,5]。
7. 生成闭区间随机数并格式输出：输入 a,b,k（允许 a>b），生成 k 个 [a,b] 随机整数，空格分隔、末尾无空格；要求用时间种子[ref:10,1]。
8. 求和/均值/最大最小：输入 n 和 n 个数，输出 sum、avg（保留 2 位）、max、min[ref:2,5]。
9. 质数判断与计数：输入 n，输出 1..n 中质数个数；要求用 (\sqrt{n}) 优化[ref:2,5]。
10. 冒泡排序（含提前结束）：输入 n 与数组，升序冒泡排序，若某一趟无交换则提前结束；输出排序后数组
下面把 10 道编程题都写成标准输入输出 + 参考代码 + 解释。代码只用基础语法与基础头文件（主要 iostream，第 7 题用 cstdlib/ctime，第 9 题用 cmath）[ref:1,2,10]。

---
2. 数组逆序输出（无尾随空格）[ref:1,2]
输入：
 第一行 n（1 ≤ n ≤ 100000）
 第二行 n 个整数
输出：
 按逆序输出这 n 个整数，元素间一个空格分隔，末尾不加空格，最后换行。
参考代码：
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int* a = new int[n];
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = n - 1; i >= 0; i--) {
        if (i != n - 1) cout << ' ';
        cout << a[i];
    }
    cout << '\n';

    delete[] a;
    return 0;
}
解释：
 先读入数组，再从 n-1 到 0 逆序输出；用 if (i != n-1) 控制空格避免尾随空格[ref:1,2]。

---
2. 二维数组原样输出（格式控制）[ref:1,2]
输入：
 r c（1 ≤ r,c ≤ 500）
 接着 r 行，每行 c 个整数
输出：
 按矩阵原样输出：每行 c 个数，数之间一个空格，行末换行。
参考代码：
#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;

    int* a = new int[r * c];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i * c + j];
        }
    }

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j) cout << ' ';
            cout << a[i * c + j];
        }
        cout << '\n';
    }

    delete[] a;
    return 0;
}
解释：
 用一维数组模拟二维（行优先连续存储），元素位置是 i*c + j；每行用 if(j) 控空格[ref:1,2]。

---
3. 统计大小写并互换大小写（读整行）[ref:1,2]
输入：
 一行字符串（可包含空格）
输出：
 第一行：大写字母个数 小写字母个数
 第二行：将所有字母互换大小写后的整行
参考代码：
#include <iostream>
using namespace std;

int main() {
    const int MAXN = 10005;
    char s[MAXN];

    cin.getline(s, MAXN);

    int upper = 0, lower = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') upper++;
        else if (s[i] >= 'a' && s[i] <= 'z') lower++;
    }

    cout << upper << ' ' << lower << '\n';

    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') s[i] = char(s[i] - 'A' + 'a');
        else if (s[i] >= 'a' && s[i] <= 'z') s[i] = char(s[i] - 'a' + 'A');
    }
    cout << s << '\n';
    return 0;
}
解释：
 用 ASCII 范围判断大写/小写；大小写转换用字符码差值实现；getline 读整行含空格[ref:1,2]。

---
4. 模板函数：交换与最大值（测试 int/double/字符串）[ref:1,2]
输入：
 无
输出：
 按程序内置测试打印结果（见代码）。
参考代码：
#include <iostream>
using namespace std;

template <typename T>
void swapT(T& a, T& b) {
    T t = a;
    a = b;
    b = t;
}

template <typename T>
T maxT(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    int a = 3, b = 7;
    swapT(a, b);
    cout << a << ' ' << b << '\n';      // 7 3
    cout << maxT(a, b) << '\n';         // 7

    double x = 2.5, y = 2.25;
    swapT(x, y);
    cout << x << ' ' << y << '\n';      // 2.25 2.5
    cout << maxT(x, y) << '\n';         // 2.5

    // 用基础字符数组模拟“字符串”比较/交换（不使用 std::string）
    char s1[100] = "abc";
    char s2[100] = "ab";
    // 仅演示：用 maxT 需要支持 '>'，对 char[] 不适用，所以这里不调用 maxT
    // 交换：逐字符交换（等长上限）
    for (int i = 0; i < 100; i++) { char t = s1[i]; s1[i] = s2[i]; s2[i] = t; }
    cout << s1 << '\n' << s2 << '\n';

    return 0;
}
解释：
 模板让同一逻辑适配多类型；char[] 不是可直接用 > 比较的“字符串对象”，因此只演示了固定容量的字符数组交换（逐字节交换）[ref:1,2]。

---
5. 顺序查找第一次出现位置[ref:1,2]
输入：
 n
 n 个整数
 x
输出：
 x 第一次出现的下标（0 开始），不存在输出 -1。
参考代码：
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int* a = new int[n];
    for (int i = 0; i < n; i++) cin >> a[i];
    int x;
    cin >> x;

    int pos = -1;
    for (int i = 0; i < n; i++) {
        if (a[i] == x) { pos = i; break; }
    }
    cout << pos << '\n';

    delete[] a;
    return 0;
}
解释：
 从头到尾线性扫描，第一次匹配就 break；没找到保持 -1[ref:1,2]。

---
6. 字符串中模式最后一次出现位置（不使用 string/find）[ref:1,2]
输入：
 第一行：字符串 s（可含空格）
 第二行：模式 p（可含空格）
输出：
 p 在 s 中最后一次出现的起始下标（0 开始），没有输出 -1。
参考代码：
#include <iostream>
using namespace std;

int myLen(const char* s) {
    int n = 0;
    while (s[n] != '\0') n++;
    return n;
}

int main() {
    const int MAXN = 10005;
    char s[MAXN], p[MAXN];
    cin.getline(s, MAXN);
    cin.getline(p, MAXN);

    int ns = myLen(s), np = myLen(p);
    if (np == 0) { // 约定：空模式匹配在末尾之前的最后位置，这里输出 ns
        cout << ns << '\n';
        return 0;
    }
    if (np > ns) {
        cout << -1 << '\n';
        return 0;
    }

    int ans = -1;
    for (int i = 0; i + np <= ns; i++) {
        int j = 0;
        while (j < np && s[i + j] == p[j]) j++;
        if (j == np) ans = i; // 记录最后一次
    }
    cout << ans << '\n';
    return 0;
}
解释：
 用朴素匹配：对每个起点 i 比较 p；每次匹配成功就更新 ans，最终就是最后一次位置[ref:1,2]。

---
7. 生成闭区间随机数并输出（允许 a>b）[ref:10,1]
输入：
 a b k
输出：
 k 个随机整数，落在闭区间 [min(a,b), max(a,b)]，空格分隔，末尾无空格，最后换行。
参考代码：
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    int a, b, k;
    cin >> a >> b >> k;
    if (a > b) { int t = a; a = b; b = t; }

    srand((unsigned)time(0));

    int range = b - a + 1;
    for (int i = 0; i < k; i++) {
        int x = a + rand() % range;
        if (i) cout << ' ';
        cout << x;
    }
    cout << '\n';
    return 0;
}
解释：
 先保证 a≤b；用 a + rand()%range 映射到闭区间；srand(time(0)) 让每次运行序列通常不同（取模可能有轻微偏差，但满足基础题）[ref:10,1]。

---
8. 求和/均值/最大最小[ref:1,2]
输入：
 n
 n 个整数
输出：
 sum avg max min
 其中 avg 保留 2 位小数。
参考代码：
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;

    long long sum = 0;
    int x;
    cin >> x;
    int mx = x, mn = x;
    sum += x;

    for (int i = 1; i < n; i++) {
        cin >> x;
        sum += x;
        if (x > mx) mx = x;
        if (x < mn) mn = x;
    }

    double avg = (double)sum / n;
    cout << sum << ' ' << fixed << setprecision(2) << avg << ' ' << mx << ' ' << mn << '\n';
    return 0;
}
解释：
sum 用 long long 防溢出；首个数用于初始化 max/min；均值用浮点除法并格式化输出两位小数[ref:1,2]。

---
9. 统计 1..n 中质数个数（(\sqrt{n}) 优化）[ref:1,2]
输入：
 n（n ≥ 1）
输出：
 1..n 中质数个数
参考代码：
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    if (x == 2) return true;
    if (x % 2 == 0) return false;
    int r = (int)sqrt((double)x);
    for (int i = 3; i <= r; i += 2) {
        if (x % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;

    int cnt = 0;
    for (int i = 1; i <= n; i++) {
        if (isPrime(i)) cnt++;
    }
    cout << cnt << '\n';
    return 0;
}
解释：
 质数判定：小于 2 不是质数；偶数快速排除；只试除到 (\sqrt{x})，并只检查奇数因子降低复杂度[ref:1,2]。

---
10. 冒泡排序（含提前结束）[ref:1,2]
输入：
 n
 n 个整数
输出：
 升序排列后的数组，空格分隔，末尾无空格，最后换行。
参考代码：
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int* a = new int[n];
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int pass = 0; pass < n - 1; pass++) {
        bool swapped = false;
        for (int i = 0; i < n - 1 - pass; i++) {
            if (a[i] > a[i + 1]) {
                int t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\n';

    delete[] a;
    return 0;
}
解释：
 每一趟把当前最大值“冒”到末尾；若某一趟无交换说明已有序，提前结束节省时间[ref:1,2]。

---