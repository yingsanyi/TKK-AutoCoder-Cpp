import { SolutionData } from '../types';

export const solutions_part10: Record<string, SolutionData> = {
"4448": {
    id: "4448",
    title: "英文字母",
    content: `
> https://www.xujcoj.com/home/problem/detail/4448

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        string a;
        cin >> a;
        int f[26] = {0}, cnt = 0;
        for (int i = 0; i < a.length(); i++)
        {
            char b = a[i];
            if (isupper(b)) f[b - 'A'] = 1;
            else f[b - 'a'] = 1;
        }
        for (int i = 0; i < 26; i++)
        {
            cnt += f[i];
        }
        if (cnt == 26) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入一段仅包含大小写英文字母的字符串。
2️⃣ 策略与步骤
   使用 f[26] 记录出现过的字母，大小写统一映射；统计出现的不同字母数 cnt；判断是否为 26。
3️⃣ 输出部分
   输出 "Yes" 或 "No"。
`
  },
"3767": {
    id: "3767",
    title: "优秀的成绩",
    content: `
> https://www.xujcoj.com/home/problem/detail/3767

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int a, b, c;
    cin >> a >> b >> c;
    if (a + b + c >= 90 * 3 && a >= 85 && b >= 85 && c >= 85)
    {
        cout << "Excellent";
    }
    else
    {
        cout << "Not Excellent";
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入三门课程成绩 a, b, c。
2️⃣ 策略与步骤
   单科均 ≥85，且总分 ≥270（平均分 ≥90）才判定优秀。
3️⃣ 输出部分
   满足则输出 "Excellent"，否则 "Not Excellent"。
`
  },
"4302": {
    id: "4302",
    title: "数的乘积",
    content: `
> https://www.xujcoj.com/home/problem/detail/4302

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int a, neg = 0, pos = 0;
    for (int i = 0; i < 4; i++)
    {
        cin >> a;
        if (a > 0) pos++;
        else if (a < 0) neg++;
    }
    if (pos >= 1 && neg >= 1)
    {
        cout << "Yes";
    }
    else
    {
        cout << "No";
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入 4 个整数。
2️⃣ 策略与步骤
   至少一个正数且至少一个负数 → 存在乘积为负的组合 → "Yes"；否则 "No"。
3️⃣ 注意事项
   0 不影响负乘积的产生。
`
  },
"3361": {
    id: "3361",
    title: "静默的质数",
    content: `
> https://www.xujcoj.com/home/problem/detail/3361

**答案：**

\`\`\`cpp
#include<iostream>
#include<cmath>
using namespace std;
bool isPrime(int n)
{
    if (n < 2)
    {
        return false;
    }
    for (int i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int m, a, cnt = 0;
        cin >> m >> a;
        for (int i = a; i < a + m; i++)
        {
            if (isPrime(i)) cnt++;
        }
        cout << cnt << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入 n 组，每组 m 与 a。
2️⃣ 策略与步骤
   统计区间 [a, a+m-1] 内的质数个数，试除到 √n。
3️⃣ 输出部分
   每组输出质数的计数。
`
  },
"4446": {
    id: "4446",
    title: "打卡时间",
    content: `
> https://www.xujcoj.com/home/problem/detail/4446

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;
int main()
{
    int a, b, am, bm, sum = 0;
    cin >> a;
    am = a / 100 * 60 + a % 100;
    for (int i = 0; i < 5; i++)
    {
        cin >> b;
        bm = b / 100 * 60 + b % 100;
        if (bm > am) sum += (bm - am);
    }
    cout << sum;
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   规定时间 a 与 5 天打卡时间 b（HHMM）。
2️⃣ 策略与步骤
   转分钟比较；迟到则累加差值。
3️⃣ 输出部分
   输出总迟到分钟数。
`
  },
"2883": {
    id: "2883",
    title: "互质问题",
    content: `
> https://www.xujcoj.com/home/problem/detail/2883

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int getGCD(int a, int b)
{
    return b == 0 ? a : getGCD(b, a % b);
}
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int m, p;
        cin >> m;
        int a[2000], c[2000];
        for (int i = 0; i < m; i++)
        {
            cin >> a[i];
        }
        c[0] = 1;
        int max = c[0];
        for (int i = 1; i < m; i++)
        {
            c[i] = 1;
            for (int j = 0; j < i; j++)
            {
                if (c[j] >= c[i] && getGCD(a[i], a[j]) == 1)
                {
                    c[i] = c[j] + 1;
                }
            }
            if (c[i] > max) max = c[i];
        }
        cout << m - max << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入 m 个数。
2️⃣ 策略与步骤
   欧几里得算法求 gcd；DP 维护以 i 结尾的最长互质子序列长度 c[i]；答案为 m-max。
3️⃣ 输出部分
   输出最少删除的数字个数。
`
  },
"3819": {
    id: "3819",
    title: "谁是大佬",
    content: `
> https://www.xujcoj.com/home/problem/detail/3819

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int m, max = -1, maxno = -1;
        cin >> m;
        for (int i = 1; i <= m; i++)
        {
            int a;
            cin >> a;
            if (a > max)
            {
                max = a;
                maxno = i;
            }
        }
        cout << maxno << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入 m 个成绩。
2️⃣ 策略与步骤
   单次扫描记录最大值及其学号。
3️⃣ 输出部分
   输出最高分学生的学号。
`
  },
"2927": {
    id: "2927",
    title: "最近的坐标点",
    content: `
> https://www.xujcoj.com/home/problem/detail/2927

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    double x1, y1, x2, y2, x3, y3, d, xmin, ymin, dmin;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
    xmin = x1; ymin = y1; dmin = x1 * x1 + y1 * y1;
    d = x2 * x2 + y2 * y2;
    if (d < dmin)
    {
        dmin = d;
        xmin = x2;
        ymin = y2;
    }
    d = x3 * x3 + y3 * y3;
    if (d < dmin)
    {
        dmin = d;
        xmin = x3;
        ymin = y3;
    }
    cout << "(" << xmin << "," << ymin << ")";
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入三个点坐标。
2️⃣ 策略与步骤
   比较到原点的距离平方，选择最小者。
3️⃣ 输出部分
   输出最近点坐标，格式 "(x,y)"。
`
  },
"4334": {
    id: "4334",
    title: "字母表",
    content: `
> https://www.xujcoj.com/home/problem/detail/4334

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    char a;
    cin >> a;
    for (char i = 'A'; i <= 'Z'; i++)
    {
        if (i != toupper(a)) cout << i;
    }
    cout << endl;
    for (char i = 'a'; i <= 'z'; i++)
    {
        if (i != tolower(a)) cout << i;
    }
    cout << endl;
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入一个字母 a。
2️⃣ 策略与步骤
   分别输出去除对应大小写后的字母序列。
3️⃣ 输出部分
   两行输出，大写与小写各一行。
`
  },
"4024": {
    id: "4024",
    title: "0和1",
    content: `
> https://www.xujcoj.com/home/problem/detail/4024

**答案：**

\`\`\`cpp
#include<iostream>
#include<string>
using namespace std;
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int a, b;
        cin >> a >> b;
        string s = to_string(a + b);
        if (s.find("01") != -1 || s.find("10") != -1) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入 a、b。
2️⃣ 策略与步骤
   将 a+b 转为字符串，判断是否含相邻子串 "01" 或 "10"。
3️⃣ 输出部分
   输出 "Yes" 或 "No"。
`
  },
  "3972": {
    id: "3972",
    title: "日期-3",
    content: `
> https://www.xujcoj.com/home/problem/detail/3972

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

// 判断是否为闰年
bool isLeapYear(int year){
    // 年份为0不合法，但这里只判断闰年规则
    // 情况1：是400的倍数，但不是3200的倍数
    if(year % 400 == 0 && year % 3200 != 0){
        return true;
    }
    // 情况2：是4的倍数，但不是100的倍数
    if(year % 4 == 0 && year % 100 != 0){
        return true;
    }
    return false;
}

// 获取某年某月的天数
int getDaysInMonth(int year, int month){
    if(month < 1 || month > 12){
        return 0;  // 非法月份
    }
    
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    
    if(month == 2 && isLeapYear(year)){
        return 29;
    }
    return days[month];
}

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int year, month, day;
        cin >> year >> month >> day;
        
        // 判断日期是否合法
        bool valid = true;
        
        // 1. 年份不能为0
        if(year == 0){
            valid = false;
        }
        
        // 2. 月份必须在1-12之间
        if(month < 1 || month > 12){
            valid = false;
        }
        
        // 3. 日期必须在1到当月最大天数之间
        if(valid){
            int maxDay = getDaysInMonth(year, month);
            if(day < 1 || day > maxDay){
                valid = false;
            }
        }
        
        if(valid){
            cout << "Yes" << endl;
        } else {
            cout << "No" << endl;
        }
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
1. 年份不能为0（没有公元0年）
2. 月份必须在1-12之间
3. 日期必须在1到当月最大天数之间
4. 特殊的闰年规则

**样例分析**：

**案例1：2000年2月29日**
\`\`\`
年份：2000 ≠ 0 ✓
月份：2，在1-12之间 ✓
判断2000年是否为闰年：
  2000 % 400 = 0 且 2000 % 3200 ≠ 0 → 是闰年
2月有29天
日期：29，在1-29之间 ✓

输出：Yes
\`\`\`

**案例2：2020年0月0日**
\`\`\`
年份：2020 ≠ 0 ✓
月份：0，不在1-12之间 ✗

输出：No
\`\`\`

**闰年规则（特殊）**：

题目给出的闰年规则与常见规则不同：

**情况1：是400的倍数，但不是3200的倍数**
\`\`\`cpp
year % 400 == 0 && year % 3200 != 0
\`\`\`
- 400, 800, 1200, 1600, 2000, 2400, 2800 → 闰年
- 3200, 6400 → 不是闰年

**情况2：是4的倍数，但不是100的倍数**
\`\`\`cpp
year % 4 == 0 && year % 100 != 0
\`\`\`
- 2004, 2008, 2012, 2016, 2020 → 闰年
- 1900, 2100 → 不是闰年

**典型例子**：

**例1：0年1月1日**
\`\`\`
年份：0（没有公元0年）
输出：No
\`\`\`

**例2：-1年2月28日（公元前1年）**
\`\`\`
年份：-1 ≠ 0 ✓
月份：2 ✓
判断-1年是否为闰年：
  -1 % 4 = -1 ≠ 0 → 不是闰年
2月有28天
日期：28 ✓

输出：Yes
\`\`\`

**例3：2020年2月30日**
\`\`\`
年份：2020 ✓
月份：2 ✓
判断2020年是否为闰年：
  2020 % 4 = 0 且 2020 % 100 ≠ 0 → 闰年
2月有29天
日期：30 > 29 ✗

输出：No
\`\`\`

**例4：2021年4月31日**
\`\`\`
年份：2021 ✓
月份：4 ✓
4月有30天
日期：31 > 30 ✗

输出：No
\`\`\`

**例5：-4年2月29日（公元前4年）**
\`\`\`
年份：-4 ≠ 0 ✓
月份：2 ✓
判断-4年是否为闰年：
  -4 % 4 = 0 且 -4 % 100 ≠ 0 → 闰年
2月有29天
日期：29 ✓

输出：Yes
\`\`\`

**例6：2020年13月1日**
\`\`\`
年份：2020 ✓
月份：13 > 12 ✗

输出：No
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

// 判断是否为闰年
bool isLeapYear(int year){
    // 年份为0不合法，但这里只判断闰年规则
    // 情况1：是400的倍数，但不是3200的倍数
    if(year % 400 == 0 && year % 3200 != 0){
        return true;
    }
    // 情况2：是4的倍数，但不是100的倍数
    if(year % 4 == 0 && year % 100 != 0){
        return true;
    }
    return false;
}

// 获取某年某月的天数
int getDaysInMonth(int year, int month){
    if(month < 1 || month > 12){
        return 0;  // 非法月份
    }
    
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    
    if(month == 2 && isLeapYear(year)){
        return 29;
    }
    return days[month];
}

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int year, month, day;
        cin >> year >> month >> day;
        
        // 判断日期是否合法
        bool valid = true;
        
        // 1. 年份不能为0
        if(year == 0){
            valid = false;
        }
        
        // 2. 月份必须在1-12之间
        if(month < 1 || month > 12){
            valid = false;
        }
        
        // 3. 日期必须在1到当月最大天数之间
        if(valid){
            int maxDay = getDaysInMonth(year, month);
            if(day < 1 || day > maxDay){
                valid = false;
            }
        }
        
        if(valid){
            cout << "Yes" << endl;
        } else {
            cout << "No" << endl;
        }
    }
    
    return 0;
}
\`\`\``
      },
      {
        label: "优化写法（更简洁）",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

bool isLeapYear(int year){
    return (year % 400 == 0 && year % 3200 != 0) || 
           (year % 4 == 0 && year % 100 != 0);
}

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int year, month, day;
        cin >> year >> month >> day;
        
        bool valid = true;
        
        // 检查年份
        if(year == 0) valid = false;
        
        // 检查月份
        if(month < 1 || month > 12) valid = false;
        
        // 检查日期
        if(valid){
            int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
            int maxDay = days[month];
            if(month == 2 && isLeapYear(year)) maxDay = 29;
            
            if(day < 1 || day > maxDay) valid = false;
        }
        
        cout << (valid ? "Yes" : "No") << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  }
};
