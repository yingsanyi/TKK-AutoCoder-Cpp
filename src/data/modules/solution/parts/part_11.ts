import { SolutionData } from '../types';

export const solutions_part11: Record<string, SolutionData> = {
"2910": {
    id: "2910",
    title: "四边形",
    content: `
> https://www.xujcoj.com/home/problem/detail/2910

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        if (a >= b + c + d || b >= a + c + d || c >= a + b + d || d >= a + b + c)
        {
            cout << "No" << endl;
        }
        else
        {
            cout << "Yes" << endl;
        }
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 判定规则
   任意边长度均小于其他三边之和，否则不能构成四边形。
2️⃣ 实现步骤
   四个条件取或，满足其一则输出 "No"，否则 "Yes"。
3️⃣ 输出部分
   每组输出一行。
`
  },
"3764": {
    id: "3764",
    title: "老人与海",
    content: `
> https://www.xujcoj.com/home/problem/detail/3764

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    long long a;
    cin >> a;
    int lv = 1;
    while (a > 0) {
        if (lv < 50) {
            lv++;
            a--;
        } else {
            long long need = lv - 48; // 升一级所需鱼
            if (a >= need) {
                lv++;
                a -= need;
            } else {
                break; // 鱼不够升下一级
            }
        }
    }
    cout << lv;
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入钓到的鱼数量 a（long long）。
2️⃣ 策略与步骤
   lv<50：每条鱼+1；lv≥50：升一级需要 lv-48 条鱼；不足时停止。
3️⃣ 输出部分
   输出最终技能点 lv。
`
  },
"2931": {
    id: "2931",
    title: "声音的频率",
    content: `
> https://www.xujcoj.com/home/problem/detail/2931

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int f, min = 20001, max = 19;
    for (int i = 0; i < 5; i++)
    {
        cin >> f;
        if (f >= 20 && f <= 20000)
        {
            if (f < min)
            {
                min = f;
            }
            if (f > max)
            {
                max = f;
            }
        }
    }
    if (min == 20001)
    {
        cout << -1;
    }
    else
    {
        cout << min << " " << max;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入 5 个频率。
2️⃣ 策略与步骤
   过滤可听范围 [20,20000]；记录最小与最大；若无则输出 -1。
3️⃣ 输出部分
   有则输出 "min max"，否则 -1。
`
  },
"3770": {
    id: "3770",
    title: "总和最大",
    content: `
> https://www.xujcoj.com/home/problem/detail/3770

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int a, b, c;
    cin >> a >> b >> c;
    
    int maxSum = 0;  // 初始为0（选0个数）
    
    // 枚举所有可能的组合
    maxSum = max(maxSum, a);           // 只选a
    maxSum = max(maxSum, b);           // 只选b
    maxSum = max(maxSum, c);           // 只选c
    maxSum = max(maxSum, a + b);       // 选a和b
    maxSum = max(maxSum, a + c);       // 选a和c
    maxSum = max(maxSum, b + c);       // 选b和c
    maxSum = max(maxSum, a + b + c);   // 选a、b、c
    
    cout << maxSum;
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：只选择正数相加，负数和0都不选

**贪心策略**：
- 正数：选上能增加总和
- 负数：选上会减少总和
- 0：选不选都一样

因此，最大总和 = 所有正数的和

**样例分析**：

**输入：6 -5 7**
\`\`\`
a = 6 (正数，选)
b = -5 (负数，不选)
c = 7 (正数，选)

最大和 = 6 + 7 = 13
\`\`\`

**典型例子**：

**例1：3 -2 5**
\`\`\`
正数：3, 5
最大和 = 3 + 5 = 8
\`\`\`

**例2：-1 -2 -3**
\`\`\`
全是负数，一个都不选
最大和 = 0
\`\`\`

**例3：0 0 0**
\`\`\`
全是0，选不选都一样
最大和 = 0
\`\`\`

**例4：10 20 30**
\`\`\`
全是正数，都选
最大和 = 10 + 20 + 30 = 60
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int a, b, c;
    cin >> a >> b >> c;
    
    int maxSum = 0;  // 初始为0（选0个数）
    
    // 枚举所有可能的组合
    maxSum = max(maxSum, a);           // 只选a
    maxSum = max(maxSum, b);           // 只选b
    maxSum = max(maxSum, c);           // 只选c
    maxSum = max(maxSum, a + b);       // 选a和b
    maxSum = max(maxSum, a + c);       // 选a和c
    maxSum = max(maxSum, b + c);       // 选b和c
    maxSum = max(maxSum, a + b + c);   // 选a、b、c
    
    cout << maxSum;
    
    return 0;
}
\`\`\``
      },
      {
        label: "推荐写法（简洁版）",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int a, b, c;
    cin >> a >> b >> c;
    
    int sum = 0;
    
    // 只选正数相加
    if(a > 0) sum += a;
    if(b > 0) sum += b;
    if(c > 0) sum += c;
    
    cout << sum;
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "3006": {
    id: "3006",
    title: "最大的长方形",
    content: `
> https://www.xujcoj.com/home/problem/detail/3006

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        cin >> m;
        
        int maxArea = 0;
        int maxLength = 0, maxWidth = 0;
        
        for(int i = 0; i < m; i++){
            int a, b;
            cin >> a >> b;
            
            // 排除正方形
            if(a == b) continue;
            
            int area = a * b;
            
            if(area > maxArea){
                maxArea = area;
                // 保证长>宽
                if(a > b){
                    maxLength = a;
                    maxWidth = b;
                } else {
                    maxLength = b;
                    maxWidth = a;
                }
            }
        }
        
        cout << maxLength << " " << maxWidth << " " << maxArea << endl;
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
1. 排除正方形（长==宽）
2. 找出剩余长方形中面积最大的
3. 输出时保证长>宽

**样例分析**：

**输入：m=3**
\`\`\`
长方形1: 4×4 (正方形，排除)
长方形2: 3×5, 面积=15 ✓
长方形3: 6×2, 面积=12

最大面积的长方形：3×5，面积15
输出格式：长 宽 面积（长>宽）
输出：5 3 15
\`\`\`

**典型例子**：

**例1：**
\`\`\`
输入：
2
2 3
4 4
5 1

长方形1: 2×3, 面积=6
长方形2: 4×4 (正方形，排除)
长方形3: 5×1, 面积=5

最大：2×3，面积6
输出：3 2 6
\`\`\`

**例2：**
\`\`\`
输入：
4
1 1
2 2
3 3
10 2

长方形1-3: 全是正方形，排除
长方形4: 10×2, 面积=20

最大：10×2，面积20
输出：10 2 20
\`\`\`

**例3：**
\`\`\`
输入：
3
3 7
5 5
4 6

长方形1: 3×7, 面积=21 ✓
长方形2: 5×5 (正方形，排除)
长方形3: 4×6, 面积=24 ✓✓

最大：4×6，面积24
输出：6 4 24
\`\`\`

**关键步骤**：

**1. 排除正方形**
\`\`\`cpp
if(a == b) continue;  // 长等于宽，是正方形
\`\`\`

**2. 计算面积**
\`\`\`cpp
int area = a * b;
\`\`\`

**3. 更新最大值**
\`\`\`cpp
if(area > maxArea){
    maxArea = area;
    // 保证长>宽
    if(a > b){
        maxLength = a;
        maxWidth = b;
    } else {
        maxLength = b;
        maxWidth = a;
    }
}
\`\`\`

**4. 输出格式**
\`\`\`cpp
cout << maxLength << " " << maxWidth << " " << maxArea << endl;
// 输出：长 宽 面积（长>宽）
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        cin >> m;
        
        int maxArea = 0;
        int maxLength = 0, maxWidth = 0;
        
        for(int i = 0; i < m; i++){
            int a, b;
            cin >> a >> b;
            
            // 排除正方形
            if(a == b) continue;
            
            int area = a * b;
            
            if(area > maxArea){
                maxArea = area;
                // 保证长>宽
                if(a > b){
                    maxLength = a;
                    maxWidth = b;
                } else {
                    maxLength = b;
                    maxWidth = a;
                }
            }
        }
        
        cout << maxLength << " " << maxWidth << " " << maxArea << endl;
    }
    
    return 0;
}
\`\`\``
      },
      {
        label: "优化写法",
        content: `\`\`\`cpp
#include<iostream>
#include<algorithm>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        cin >> m;
        
        int maxArea = 0, maxLen = 0, maxWid = 0;
        
        for(int i = 0; i < m; i++){
            int a, b;
            cin >> a >> b;
            
            if(a != b && a * b > maxArea){
                maxArea = a * b;
                maxLen = max(a, b);
                maxWid = min(a, b);
            }
        }
        
        cout << maxLen << " " << maxWid << " " << maxArea << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "3359": {
    id: "3359",
    title: "输出字符",
    content: `
> https://www.xujcoj.com/home/problem/detail/3359

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        char a;
        cin >> m >> a;
        
        if(m % 2 == 1){
            // m是奇数，输出m个a，无空格
            for(int i = 0; i < m; i++){
                cout << a;
            }
        } else {
            // m是偶数，输出m/2个a，每两个之间有空格
            for(int i = 0; i < m / 2; i++){
                if(i > 0) cout << " ";
                cout << a;
            }
        }
        
        cout << endl;
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
- **m是奇数**：连续输出m个字符，无空格
- **m是偶数**：输出m/2个字符，字符之间有空格

**样例分析**：

**案例1：m=5, a='B'（奇数）**
\`\`\`
m是奇数，输出5个B，无空格
输出：BBBBB
\`\`\`

**案例2：m=6, a='N'（偶数）**
\`\`\`
m是偶数，输出6/2=3个N，每两个之间有空格
输出：N N N
\`\`\`

**关键点**：
1. 奇数情况：直接循环输出m次
2. 偶数情况：循环m/2次，第一个前面不加空格，其他前面加空格

**典型例子**：

**m=1, a='A'（奇数）**
\`\`\`
输出：A
\`\`\`

**m=2, a='C'（偶数）**
\`\`\`
输出：C
\`\`\`

**m=3, a='X'（奇数）**
\`\`\`
输出：XXX
\`\`\`

**m=4, a='Y'（偶数）**
\`\`\`
输出：Y Y
\`\`\`

**m=8, a='Z'（偶数）**
\`\`\`
输出：Z Z Z Z
\`\`\`

**m=7, a='*'（奇数）**
\`\`\`
输出：*******
\`\`\`

**m=10, a='#'（偶数）**
\`\`\`
输出：# # # # #
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        char a;
        cin >> m >> a;
        
        if(m % 2 == 1){
            // m是奇数，输出m个a，无空格
            for(int i = 0; i < m; i++){
                cout << a;
            }
        } else {
            // m是偶数，输出m/2个a，每两个之间有空格
            for(int i = 0; i < m / 2; i++){
                if(i > 0) cout << " ";
                cout << a;
            }
        }
        
        cout << endl;
    }
    
    return 0;
}
\`\`\``
      },
      {
        label: "另一种写法",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        char a;
        cin >> m >> a;
        
        if(m % 2 == 1){
            // 奇数：连续输出m个
            for(int i = 0; i < m; i++){
                cout << a;
            }
        } else {
            // 偶数：输出m/2个，带空格
            for(int i = 0; i < m / 2; i++){
                cout << a;
                if(i < m / 2 - 1) cout << " ";
            }
        }
        
        cout << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "2173": {
    id: "2173",
    title: "时间差-2",
    content: `
> https://www.xujcoj.com/home/problem/detail/2173

**答案：**

\`\`\`cpp
#include<iostream>
#include<cmath>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int h1, m1, s1, h2, m2, s2;
        cin >> h1 >> m1 >> s1 >> h2 >> m2 >> s2;
        
        // 将时间转换为总秒数
        int time1 = h1 * 3600 + m1 * 60 + s1;
        int time2 = h2 * 3600 + m2 * 60 + s2;
        
        // 计算时间差（绝对值）
        int diff = abs(time1 - time2);
        
        // 转换回时分秒
        int hours = diff / 3600;
        int minutes = (diff % 3600) / 60;
        int seconds = diff % 60;
        
        cout << hours << " " << minutes << " " << seconds << endl;
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
1. 将两个时间点都转换为从0点开始的总秒数
2. 计算两个秒数的差值（绝对值）
3. 将差值转换回时分秒格式

**样例分析**：

**案例1：8:5:10 到 13:10:5**
\`\`\`
时间1: 8小时5分10秒 = 8×3600 + 5×60 + 10 = 28800 + 300 + 10 = 29110秒
时间2: 13小时10分5秒 = 13×3600 + 10×60 + 5 = 46800 + 600 + 5 = 47405秒

差值: |29110 - 47405| = 18295秒

转换回时分秒:
小时: 18295 / 3600 = 5
分钟: (18295 % 3600) / 60 = 295 / 60 = 4
秒数: 18295 % 60 = 55

输出: 5 4 55
\`\`\`

**关键公式**：

**1. 时间转秒数**
\`\`\`cpp
总秒数 = 小时 × 3600 + 分钟 × 60 + 秒数
\`\`\`

**2. 秒数转时分秒**
\`\`\`cpp
小时 = 总秒数 / 3600
分钟 = (总秒数 % 3600) / 60
秒数 = 总秒数 % 60
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
#include<cmath>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int h1, m1, s1, h2, m2, s2;
        cin >> h1 >> m1 >> s1 >> h2 >> m2 >> s2;
        
        // 将时间转换为总秒数
        int time1 = h1 * 3600 + m1 * 60 + s1;
        int time2 = h2 * 3600 + m2 * 60 + s2;
        
        // 计算时间差（绝对值）
        int diff = abs(time1 - time2);
        
        // 转换回时分秒
        int hours = diff / 3600;
        int minutes = (diff % 3600) / 60;
        int seconds = diff % 60;
        
        cout << hours << " " << minutes << " " << seconds << endl;
    }
    
    return 0;
}
\`\`\``
      },
      {
        label: "另一种写法（不用abs）",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int h1, m1, s1, h2, m2, s2;
        cin >> h1 >> m1 >> s1 >> h2 >> m2 >> s2;
        
        int time1 = h1 * 3600 + m1 * 60 + s1;
        int time2 = h2 * 3600 + m2 * 60 + s2;
        
        int diff = time1 - time2;
        if(diff < 0) diff = -diff;  // 手动取绝对值
        
        cout << diff / 3600 << " " 
             << (diff % 3600) / 60 << " " 
             << diff % 60 << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "2648": {
    id: "2648",
    title: "程序员纪元法",
    content: `
> https://www.xujcoj.com/home/problem/detail/2648

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

// 判断是否为闰年
bool isLeapYear(int year){
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// 获取某年某月的天数
int getDaysInMonth(int year, int month){
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
        
        long long totalDays = 0;
        
        // 1. 计算从1970年到year-1年的所有天数
        for(int y = 1970; y < year; y++){
            if(isLeapYear(y)){
                totalDays += 366;
            } else {
                totalDays += 365;
            }
        }
        
        // 2. 计算year年从1月到month-1月的天数
        for(int m = 1; m < month; m++){
            totalDays += getDaysInMonth(year, m);
        }
        
        // 3. 加上当月的天数
        totalDays += day;
        
        cout << totalDays << endl;
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
1. 计算从1970年1月1日到目标日期的总天数
2. 分三部分累加：
   - 完整的年份天数（1970到year-1）
   - year年中完整的月份天数（1月到month-1）
   - month月中的day天

**样例分析**：

**案例1：1970年1月2日**
\`\`\`
完整年份: 无（1970年还没结束）
完整月份: 无（1月还没结束）
当月天数: 2天

总天数 = 0 + 0 + 2 = 2
\`\`\`

**案例2：1971年1月1日**
\`\`\`
完整年份: 1970年（365天，非闰年）
完整月份: 无（1月的第1天）
当月天数: 1天

总天数 = 365 + 0 + 1 = 366
\`\`\`

**关键函数**：

**1. 判断闰年**
\`\`\`cpp
bool isLeapYear(int year){
    // 能被4整除但不能被100整除
    // 或者能被400整除
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}
\`\`\`

**2. 获取每月天数**
\`\`\`cpp
int getDaysInMonth(int year, int month){
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    //           占位 1   2   3   4   5   6   7   8   9  10  11  12
    
    if(month == 2 && isLeapYear(year)){
        return 29;  // 闰年2月29天
    }
    return days[month];
}
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
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// 获取某年某月的天数
int getDaysInMonth(int year, int month){
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
        
        long long totalDays = 0;
        
        // 1. 计算从1970年到year-1年的所有天数
        for(int y = 1970; y < year; y++){
            if(isLeapYear(y)){
                totalDays += 366;
            } else {
                totalDays += 365;
            }
        }
        
        // 2. 计算year年从1月到month-1月的天数
        for(int m = 1; m < month; m++){
            totalDays += getDaysInMonth(year, m);
        }
        
        // 3. 加上当月的天数
        totalDays += day;
        
        cout << totalDays << endl;
    }
    
    return 0;
}
\`\`\``
      },
      {
        label: "优化版本",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

bool isLeapYear(int year){
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int year, month, day;
        cin >> year >> month >> day;
        
        long long totalDays = 0;
        
        // 计算完整年份天数
        for(int y = 1970; y < year; y++){
            totalDays += isLeapYear(y) ? 366 : 365;
        }
        
        // 计算完整月份天数
        int daysInMonth[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        for(int m = 1; m < month; m++){
            if(m == 2 && isLeapYear(year)){
                totalDays += 29;
            } else {
                totalDays += daysInMonth[m];
            }
        }
        
        // 加上当前天数
        totalDays += day;
        
        cout << totalDays << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "1548": {
    id: "1548",
    title: "围花圃",
    content: `
> https://www.xujcoj.com/home/problem/detail/1548

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        
        // 情况1：花圃横着放（c×d）
        int count1 = (a / c) * (b / d);
        
        // 情况2：花圃竖着放（d×c）
        int count2 = (a / d) * (b / c);
        
        // 取最大值
        int maxCount = count1;
        if(count2 > maxCount){
            maxCount = count2;
        }
        
        cout << maxCount << endl;
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：
1. 土地大小：a×b
2. 花圃大小：c×d
3. 花圃可以横着放或竖着放，但所有花圃方向必须一致
4. 尝试两种摆放方式，取最大值

**样例分析**：

**案例1：土地25×10，花圃12×4**

**方式1：花圃横着放（12×4）**
\`\`\`
沿着土地长边(25)放：25 / 12 = 2个
沿着土地短边(10)放：10 / 4 = 2个
总数：2 × 2 = 4个
\`\`\`

**方式2：花圃竖着放（4×12）**
\`\`\`
沿着土地长边(25)放：25 / 4 = 6个
沿着土地短边(10)放：10 / 12 = 0个
总数：6 × 0 = 0个

无法放置（土地宽度10小于花圃宽度12）
\`\`\`

**最大值：max(4, 0) = 4**

**关键理解**：

**1. 为什么要尝试两种方式？**
\`\`\`
花圃c×d可能：
- c > d：c是长边
- c < d：d是长边  
- c = d：正方形，两种方式相同

题目规定：所有花圃的较长边都必须平行
所以只能选择一种统一的摆放方式
\`\`\`

**2. 计算公式**
\`\`\`
方式1：花圃按c×d摆放
  横向能放：a / c 个
  纵向能放：b / d 个
  总数：(a / c) × (b / d)

方式2：花圃按d×c摆放（旋转90度）
  横向能放：a / d 个
  纵向能放：b / c 个
  总数：(a / d) × (b / c)
\`\`\`
`,
    answers: [
      {
        label: "参考答案",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        
        // 方式1：花圃按c×d摆放
        // 沿土地长边a放c，沿土地短边b放d
        int count1 = (a / c) * (b / d);
        
        // 方式2：花圃旋转90度，按d×c摆放
        // 沿土地长边a放d，沿土地短边b放c
        int count2 = (a / d) * (b / c);
        
        // 两种方式取最大值
        int maxCount = count1;
        if(count2 > maxCount){
            maxCount = count2;
        }
        
        cout << maxCount << endl;
    }
    
    return 0;
}
\`\`\``
      }
    ]
  },
  "1208": {
    id: "1208",
    title: "十进制转k进制",
    content: `
> https://www.xujcoj.com/home/problem/detail/1208

**答案：**

**版本一：循环法（推荐）**
\`\`\`cpp
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
char getChar(int x){
    if(x < 10) return x + '0';
    else return x - 10 + 'A';
}
int main(){
    int n, k;
    cin >> n >> k;
    string ans = "";
    if(n == 0) cout << 0;
    else{
        while(n){
            ans += getChar(n % k);
            n /= k;
        }
        reverse(ans.begin(), ans.end());
        cout << ans;
    }
    return 0;
}
\`\`\`

**版本二：递归法**
\`\`\`cpp
#include<iostream>
using namespace std;
void convert(int n, int k){
    if(n == 0) return;
    convert(n / k, k);
    int t = n % k;
    if(t < 10) cout << t;
    else cout << (char)(t - 10 + 'A');
}
int main(){
    int n, k;
    cin >> n >> k;
    if(n == 0) cout << 0;
    else convert(n, k);
    return 0;
}
\`\`\`

**解析**：

1. **基本思想**：
   使用“除k取余法”。每次将n除以k，余数就是当前位的数值，然后将n更新为n/k。
   重复此过程直到n为0。
   注意余数如果是10-35之间，需要转换为'A'-'Z'。

2. **实现细节**：
   - 循环法：结果是反向生成的，最后需要\`reverse\`。
   - 递归法：利用递归栈的特性，先递归再输出，自然实现逆序输出。
   - 特判\`n=0\`的情况，直接输出0。
`,
    answers: [
      {
        label: "循环法（推荐）",
        content: `\`\`\`cpp
#include<iostream>
#include<string>
#include<algorithm>
using namespace std;
char getChar(int x){
    if(x < 10) return x + '0';
    else return x - 10 + 'A';
}
int main(){
    int n, k;
    cin >> n >> k;
    string ans = "";
    if(n == 0) cout << 0;
    else{
        while(n){
            ans += getChar(n % k);
            n /= k;
        }
        reverse(ans.begin(), ans.end());
        cout << ans;
    }
    return 0;
}
\`\`\``
      },
      {
        label: "递归法",
        content: `\`\`\`cpp
#include<iostream>
using namespace std;
void convert(int n, int k){
    if(n == 0) return;
    convert(n / k, k);
    int t = n % k;
    if(t < 10) cout << t;
    else cout << (char)(t - 10 + 'A');
}
int main(){
    int n, k;
    cin >> n >> k;
    if(n == 0) cout << 0;
    else convert(n, k);
    return 0;
}
\`\`\``
      }
    ]
  }
};
