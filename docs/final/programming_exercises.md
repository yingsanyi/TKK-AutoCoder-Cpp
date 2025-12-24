# C++ 基础编程题目详解

## 1. 数组逆序输出（无尾随空格）

**题目：** 输入一个整数 $n$ ($1 \le n \le 100$) 和 $n$ 个整数，按逆序输出这些整数，元素间用空格分隔，末尾无多余空格。

**输入样例：**
```
5
1 2 3 4 5
```

**输出样例：**
```
5 4 3 2 1
```

**解析：**
1. 先读取 $n$ 个整数存入数组
2. 从数组末尾开始遍历输出
3. 关键点：最后一个元素后不输出空格，可以用 `i > 0` 判断是否输出空格

**答案：**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[100];
    
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    for(int i = n - 1; i >= 0; i--) {
        cout << arr[i];
        if(i > 0) cout << " ";  // 不是第一个元素就输出空格
    }
    cout << endl;
    
    return 0;
}
```

---

## 2. 二维数组行列输出格式

**题目：** 输入行数 $r$、列数 $c$ 和一个 $r \times c$ 的矩阵，按原矩阵格式输出，每行元素用空格分隔，行末换行。

**输入样例：**
```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

**输出样例：**
```
1 2 3 4
5 6 7 8
9 10 11 12
```

**解析：**
1. 使用二维数组存储矩阵
2. 双层循环：外层控制行，内层控制列
3. 每行最后一个元素后不输出空格，每行结束输出换行

**答案：**
```cpp
#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int matrix[100][100];
    
    // 输入矩阵
    for(int i = 0; i < r; i++) {
        for(int j = 0; j < c; j++) {
            cin >> matrix[i][j];
        }
    }
    
    // 输出矩阵
    for(int i = 0; i < r; i++) {
        for(int j = 0; j < c; j++) {
            cout << matrix[i][j];
            if(j < c - 1) cout << " ";  // 不是行末就输出空格
        }
        cout << endl;
    }
    
    return 0;
}
```

---

## 3. 统计大小写与转换

**题目：** 输入一行字符串，统计其中大写字母和小写字母的个数，并输出转换后的字符串（大写转小写、小写转大写，其他字符不变）。

**输入样例：**
```
Hello World 123
```

**输出样例：**
```
Upper: 2
Lower: 8
hELLO wORLD 123
```

**解析：**
1. 使用 `getline` 读取整行（包含空格）
2. 遍历字符串，判断每个字符：
   - `c >= 'A' && c <= 'Z'` 为大写字母，转换：`c + 32` 或 `c - 'A' + 'a'`
   - `c >= 'a' && c <= 'z'` 为小写字母，转换：`c - 32` 或 `c - 'a' + 'A'`
3. ASCII 码：大写字母比小写字母小 32

**答案：**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    
    int upperCount = 0, lowerCount = 0;
    string result = "";
    
    for(int i = 0; i < s.length(); i++) {
        char c = s[i];
        if(c >= 'A' && c <= 'Z') {
            upperCount++;
            result += (c + 32);  // 转小写
        } else if(c >= 'a' && c <= 'z') {
            lowerCount++;
            result += (c - 32);  // 转大写
        } else {
            result += c;  // 其他字符不变
        }
    }
    
    cout << "Upper: " << upperCount << endl;
    cout << "Lower: " << lowerCount << endl;
    cout << result << endl;
    
    return 0;
}
```

---

## 4. 模板函数：交换与最大值

**题目：** 实现模板函数 `swapT(T& a, T& b)` 交换两个变量的值，以及 `maxT(T a, T b)` 返回两者的最大值。分别用 `int`、`double`、`string` 类型测试。

**输入样例：**
```
5 3
2.5 3.7
apple banana
```

**输出样例：**
```
After swap: 3 5
Max: 5
After swap: 3.7 2.5
Max: 3.7
After swap: banana apple
Max: banana
```

**解析：**
1. 模板函数使用 `template <typename T>` 声明
2. `swapT` 需要引用传递才能修改原变量
3. `maxT` 使用三目运算符或 `if` 判断返回较大值
4. `string` 类型可以直接用 `>` 比较（字典序）

**答案：**
```cpp
#include <iostream>
#include <string>
using namespace std;

template <typename T>
void swapT(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

template <typename T>
T maxT(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    // 测试 int
    int i1, i2;
    cin >> i1 >> i2;
    int maxInt = maxT(i1, i2);
    swapT(i1, i2);
    cout << "After swap: " << i1 << " " << i2 << endl;
    cout << "Max: " << maxInt << endl;
    
    // 测试 double
    double d1, d2;
    cin >> d1 >> d2;
    double maxDouble = maxT(d1, d2);
    swapT(d1, d2);
    cout << "After swap: " << d1 << " " << d2 << endl;
    cout << "Max: " << maxDouble << endl;
    
    // 测试 string
    string s1, s2;
    cin >> s1 >> s2;
    string maxStr = maxT(s1, s2);
    swapT(s1, s2);
    cout << "After swap: " << s1 << " " << s2 << endl;
    cout << "Max: " << maxStr << endl;
    
    return 0;
}
```

---

## 5. 顺序查找第一次出现位置

**题目：** 输入整数 $n$、$n$ 个整数组成的数组和目标值 $x$，输出 $x$ 在数组中第一次出现的下标（从 0 开始）；如果不存在输出 -1。

**输入样例 1：**
```
6
10 20 30 20 40 50
20
```

**输出样例 1：**
```
1
```

**输入样例 2：**
```
5
1 2 3 4 5
10
```

**输出样例 2：**
```
-1
```

**解析：**
1. 线性搜索，从头到尾遍历数组
2. 找到目标值立即返回下标并结束循环
3. 遍历完未找到则返回 -1

**答案：**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    int arr[100];
    
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    cin >> x;
    
    int pos = -1;
    for(int i = 0; i < n; i++) {
        if(arr[i] == x) {
            pos = i;
            break;  // 找到第一次出现就退出
        }
    }
    
    cout << pos << endl;
    
    return 0;
}
```

---

## 6. 字符串查找最后一次出现

**题目：** 输入一行字符串 $s$ 和模式串 $p$，输出 $p$ 在 $s$ 中最后一次出现的起始位置（从 0 开始）；如果不存在输出 -1。

**输入样例 1：**
```
hello world hello
hello
```

**输出样例 1：**
```
12
```

**输入样例 2：**
```
abcdef
xyz
```

**输出样例 2：**
```
-1
```

**解析：**
1. 使用 `string::find()` 方法或手动实现字符串匹配
2. 为了找最后一次出现，可以从后往前查找，或者记录所有出现位置取最后一个
3. 使用 `rfind()` 方法可以直接从后往前查找

**答案：**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, p;
    getline(cin, s);
    getline(cin, p);
    
    int lastPos = -1;
    int pLen = p.length();
    int sLen = s.length();
    
    // 从后往前遍历 s，查找 p
    for(int i = sLen - pLen; i >= 0; i--) {
        bool match = true;
        for(int j = 0; j < pLen; j++) {
            if(s[i + j] != p[j]) {
                match = false;
                break;
            }
        }
        if(match) {
            lastPos = i;
            break;  // 找到最后一次出现就退出
        }
    }
    
    cout << lastPos << endl;
    
    return 0;
}
```

---

## 7. 生成闭区间随机数并格式输出

**题目：** 输入三个整数 $a$、$b$、$k$（允许 $a > b$），生成 $k$ 个 $[\min(a,b), \max(a,b)]$ 区间内的随机整数，用空格分隔输出，末尾无空格。要求使用时间种子。

**输入样例：**
```
5 10 6
```

**输出样例：**（随机，示例）
```
7 5 10 8 6 9
```

**解析：**
1. 使用 `srand(time(0))` 设置随机种子
2. 确保 $a \le b$，若 $a > b$ 则交换
3. 生成 $[a, b]$ 的随机数：`rand() % (b - a + 1) + a`
4. 注意最后一个数后不输出空格

**答案：**
```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    int a, b, k;
    cin >> a >> b >> k;
    
    // 确保 a <= b
    if(a > b) {
        int temp = a;
        a = b;
        b = temp;
    }
    
    srand(time(0));
    
    for(int i = 0; i < k; i++) {
        int num = rand() % (b - a + 1) + a;
        cout << num;
        if(i < k - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

## 8. 求和/均值/最大最小

**题目：** 输入整数 $n$ 和 $n$ 个数（可能是小数），输出它们的总和、平均值（保留 2 位小数）、最大值和最小值。

**输入样例：**
```
5
3.5 2.1 5.8 1.2 4.7
```

**输出样例：**
```
Sum: 17.30
Avg: 3.46
Max: 5.80
Min: 1.20
```

**解析：**
1. 使用 `double` 类型存储数据
2. 初始化 `max` 为极小值，`min` 为极大值，或者初始化为第一个元素
3. 遍历时同时累加、更新最大最小值
4. 使用 `cout.precision()` 和 `cout << fixed` 控制输出精度

**答案：**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    double arr[100];
    
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    double sum = 0;
    double maxVal = arr[0];
    double minVal = arr[0];
    
    for(int i = 0; i < n; i++) {
        sum += arr[i];
        if(arr[i] > maxVal) maxVal = arr[i];
        if(arr[i] < minVal) minVal = arr[i];
    }
    
    double avg = sum / n;
    
    cout << fixed << setprecision(2);
    cout << "Sum: " << sum << endl;
    cout << "Avg: " << avg << endl;
    cout << "Max: " << maxVal << endl;
    cout << "Min: " << minVal << endl;
    
    return 0;
}
```

---

## 9. 质数判断与计数

**题目：** 输入一个正整数 $n$，输出 $1$ 到 $n$ 中质数的个数。要求使用 $\sqrt{n}$ 优化。

**输入样例：**
```
20
```

**输出样例：**
```
8
```
（质数为：2, 3, 5, 7, 11, 13, 17, 19）

**解析：**
1. 质数定义：大于 1 且只能被 1 和自身整除的数
2. 判断 $n$ 是否为质数时，只需检查 $2$ 到 $\sqrt{n}$ 的因子
3. 优化：使用 `i * i <= n` 代替 `sqrt(n)` 避免浮点运算
4. 特殊情况：1 不是质数

**答案：**
```cpp
#include <iostream>
using namespace std;

bool isPrime(int num) {
    if(num <= 1) return false;
    if(num == 2) return true;
    if(num % 2 == 0) return false;  // 偶数优化
    
    for(int i = 3; i * i <= num; i += 2) {  // 只检查奇数
        if(num % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    
    int count = 0;
    for(int i = 2; i <= n; i++) {
        if(isPrime(i)) {
            count++;
        }
    }
    
    cout << count << endl;
    
    return 0;
}
```

---

## 10. 冒泡排序（含提前结束）

**题目：** 输入整数 $n$ 和 $n$ 个整数，使用冒泡排序将数组升序排序。如果某一趟遍历中没有发生交换，说明数组已经有序，提前结束排序。输出排序后的数组。

**输入样例：**
```
6
64 34 25 12 22 11
```

**输出样例：**
```
11 12 22 25 34 64
```

**解析：**
1. 冒泡排序原理：每次将最大元素"冒泡"到末尾
2. 外层循环控制轮数（最多 $n-1$ 轮）
3. 内层循环进行相邻元素比较和交换
4. 优化：设置 `swapped` 标志位，若某轮无交换则提前结束
5. 时间复杂度：最坏 $O(n^2)$，最好（已排序）$O(n)$

**答案：**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[100];
    
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 冒泡排序（带提前结束优化）
    for(int i = 0; i < n - 1; i++) {
        bool swapped = false;  // 标记本轮是否有交换
        
        for(int j = 0; j < n - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                // 交换
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // 如果本轮没有交换，说明已经有序
        if(!swapped) break;
    }
    
    // 输出排序后的数组
    for(int i = 0; i < n; i++) {
        cout << arr[i];
        if(i < n - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

## 总结

这 10 道题目涵盖了 C++ 基础编程的核心知识点：

1. **数组操作**：逆序输出、二维数组
2. **字符串处理**：字符统计、大小写转换、子串查找
3. **模板函数**：泛型编程基础
4. **查找算法**：线性查找、字符串匹配
5. **随机数生成**：时间种子、区间随机数
6. **统计计算**：求和、平均值、最值
7. **数学算法**：质数判断与计数
8. **排序算法**：冒泡排序及优化
9. **格式化输出**：控制空格、换行、小数精度

所有代码仅使用 C++ 基础语法，未使用 STL 容器和算法库，适合初学者练习。


---

## 11. 字符串字母排序

**题目：** 输入一行字符串（可能包含大写字母、小写字母、数字、空格和其他字符），要求：
1. 提取其中所有的字母（大写和小写）
2. 将所有字母按照字典序排序（忽略大小写，即 'a' 和 'A' 视为相同）
3. 排序后，原本是大写的保持大写，原本是小写的保持小写
4. 输出排序后的字母序列（字母间无空格）

**输入：**
一行字符串（长度不超过 200）

**输出：**
排序后的字母序列

**输入样例 1：**
```
Hello World 123
```

**输出样例 1：**
```
deHllloorW
```

**输入样例 2：**
```
C++ Programming 2024!
```

**输出样例 2：**
```
acggimmnoPrrr
```

**输入样例 3：**
```
aAbBcC
```

**输出样例 3：**
```
AaBbCc
```

**解析：**
1. 遍历字符串，把所有字母提取到数组中（忽略数字、空格、符号等）。
2. 使用冒泡排序/选择排序对字母数组排序（不使用 STL）。
3. 比较规则：先把字母转换成小写再比较；若小写相同（如 'a'/'A'），则小写字母排在大写字母前。
4. 输出排序后的字母序列（字母间无空格）。

**答案：**
```cpp
#include <iostream>
#include <string>
using namespace std;

char toLowerCase(char c) {
    if (c >= 'A' && c <= 'Z') return c + 32;
    return c;
}

bool isLetter(char c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

bool compareChar(char a, char b) {
    char lowerA = toLowerCase(a);
    char lowerB = toLowerCase(b);

    if (lowerA != lowerB) return lowerA < lowerB;
    return a > b;
}

int main() {
    string s;
    getline(cin, s);

    char letters[200];
    int cnt = 0;
    for (int i = 0; i < (int)s.length(); i++) {
        if (isLetter(s[i])) letters[cnt++] = s[i];
    }

    for (int i = 0; i < cnt - 1; i++) {
        for (int j = 0; j < cnt - 1 - i; j++) {
            if (!compareChar(letters[j], letters[j + 1])) {
                char t = letters[j];
                letters[j] = letters[j + 1];
                letters[j + 1] = t;
            }
        }
    }

    for (int i = 0; i < cnt; i++) cout << letters[i];
    cout << '\n';
    return 0;
}
```
