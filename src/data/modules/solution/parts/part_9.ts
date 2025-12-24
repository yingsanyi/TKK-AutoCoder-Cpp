import { SolutionData } from '../types';

export const solutions_part9: Record<string, SolutionData> = {
"3993": {
    id: "3993",
    title: "星号阵列-24",
    content: `
> https://www.xujcoj.com/home/problem/detail/3993

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
        int a, b;
        cin >> a;
        while (true)
        {
            for (int i = 0; i < a; i++)
            {
                cout << "*";
            }
            cout << endl;
            if (a == 1) break;
            for (b = 2; b * b <= a; b++)
            {
                if (a % b == 0) break;
            }
            if (a % b == 0) a = a / b;
            else a = 1;
        }
    }
    return 0;
}
\`\`\`

**解析**：

1. 输入部分
   先输入测试案例数量 n，表示需要处理的星号阵列组数。
   每组案例输入一个正整数 a，表示第一行星号的数量（a ≤ 100）。
2. 策略与步骤
   外层 while (n--) 循环
   用于依次处理每一组测试案例。
   读取当前案例的初始星号数量 a。
   使用 while(true) 循环逐行输出星号阵列：
   每一轮循环输出当前行的 a 个星号。
   输出完成后换行。
   终止条件判断：
   如果当前星号数量 a == 1，说明已经到达最后一行，跳出循环。
   计算下一行星号数量：
   从 b = 2 开始遍历，寻找 a 的最小因子（不包含 1 和自身）。
   一旦找到因子 b，则 a / b 即为 a 的最大非自身因子。
   若在遍历过程中未找到因子，说明 a 是质数，则下一行星号数量直接设为 1。
   更新 a 的值，进入下一轮循环，继续输出星号。
`
  },
"2177": {
    id: "2177",
    title: "平行四边形",
    content: `
> https://www.xujcoj.com/home/problem/detail/2177

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
        int x1, y1, x2, y2, x3, y3;
        cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
        int x4 = x1 + x3 - x2;
        int y4 = y1 + y3 - y2;
        cout << x4 << " " << y4 << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1. 输入部分
   先输入测试案例数量 n，表示需要处理的案例组数。
   每组案例输入 6 个整数：x1, y1, x2, y2, x3, y3，分别表示三个已知点的坐标。
2. 策略与步骤
   外层 while (n--) 循环：依次处理每组数据。
   根据向量或平行四边形性质计算第四个点：
   x4 = x1 + x3 - x2，y4 = y1 + y3 - y2。
   等价于从点 (x1, y1) 出发，加上向量 (x3 - x2, y3 - y2)。
3. 注意事项
   每组测试案例独立计算并输出结果，输出后立即换行。
   输入和输出均为整数运算，不涉及浮点数误差问题。
`
  },
"3971": {
    id: "3971",
    title: "日期-2",
    content: `
> https://www.xujcoj.com/home/problem/detail/3971

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
bool isLeap(int y)
{
    return y % 400 == 0 && y % 3200 != 0 || y % 4 == 0 && y % 100 != 0;
}
int main()
{
    int days[] = { 0,31,28,31,30,31,30,31,31,30,31,30,31 };
    int n;
    cin >> n;
    while (n--)
    {
        int y, m, d;
        cin >> y >> m >> d;
        if (isLeap(y))
        {
            days[2] = 29;
            cout << 366 << " " << days[m] << endl;
        }
        else
        {
            days[2] = 28;
            cout << 365 << " " << days[m] << endl;
        }
    }
    return 0;
}
\`\`\`

**解析**：

1. 输入部分
   输入案例数 n；每组输入 y, m, d。
2. 策略与步骤
   闰年判断：y 是 400 的倍数且不是 3200 的倍数，或 y 是 4 的倍数且不是 100 的倍数。
   根据闰年设置 2 月天数，输出当年总天数和当月天数。
3. 注意事项
   每组独立计算与输出；输出顺序严格对应输入。
`
  },
"3432": {
    id: "3432",
    title: "没出现的数字",
    content: `
> https://www.xujcoj.com/home/problem/detail/3432

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
        int m, cnt = 0;
        bool a[10] = { 0 };
        cin >> m;
        while (m > 0)
        {
            a[m % 10] = true;
            m = m / 10;
        }
        for (int i = 0; i < 10; i++)
        {
            cnt += a[i];
        }
        cout << 10 - cnt << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1. 输入部分
   输入 n 组案例；每组输入一个正整数 m（≤ 1e9）。
2. 策略与步骤
   使用布尔数组 a[10] 记录 0~9 是否出现；数位分离 m%10 标记出现；统计出现的计数 cnt；输出 10-cnt。
3. 注意事项
   每组独立；数组初值为 false；按输入顺序输出。
`
  },
"2645": {
    id: "2645",
    title: "三天花完的钱",
    content: `
> https://www.xujcoj.com/home/problem/detail/2645

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
        int a;
        cin >> a;
        int cnt = 0;
        for (int i = 1; i <= (a - 3) / 3; i++)//i表示第一天花的钱
        {
            int m;
            if ((a - i) % 2 != 0)
            {
                m = (a - i) / 2;
            }
            else
            {
                m = (a - i) / 2 - 1;
            }
            cnt = cnt + (m - i);
        }
        cout << cnt << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入 n 组；每组给总额 a（a ≤ 1500）。
2️⃣ 策略与步骤
   第一日 i 范围 1..(a-3)/3；第二日最大值 m 根据奇偶：(a-i)/2 或 (a-i)/2-1；组合数累加 m-i。
3️⃣ 注意事项
   三天金额为正且严格递增；每组独立。
`
  },
"2016": {
    id: "2016",
    title: "星号阵列-14",
    content: `
> https://www.xujcoj.com/home/problem/detail/2016

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    while (n--) {
        int m;
        cin >> m; 
        for (int i = 0; i < m; i++) {
            cout << "*";
        }
        cout << endl;
        for (int i = 0; i < m-1; i++) {
                cout << "*";
                for (int j = 0; j < m - i - 3; j++) {
                    cout << " ";
                }
                if (i < m -2) {
                    cout << "*";
                }
                cout << endl;
        }
    }
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入 n；每组输入 m（m ≥ 3）。
2️⃣ 策略与步骤
   第一行输出 m 个星；随后 i=0..m-2，通过左右星与中间空格 m-i-3 构成倒三角形；最后一行仅左星。
3️⃣ 注意事项
   每组独立；行末无多余空格。
`
  },
"4304": {
    id: "4304",
    title: "比日期",
    content: `
> https://www.xujcoj.com/home/problem/detail/4304

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int y1, m1, d1, y2, m2, d2;
    cin >> y1 >> m1 >> d1 >> y2 >> m2 >> d2;
    if (y1 == y2 && m1 == m2 && d1 == d2)
    {
        cout << "Same";
    }
    else if (y1 < y2 || y1 == y2 && m1 < m2 || y1 == y2 && m1 == m2 && d1 < d2)
    {
        cout << "Early";
    }
    else
    {
        cout << "Late";
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   输入两个日期 y1,m1,d1 与 y2,m2,d2。
2️⃣ 策略与步骤
   先判断完全相同 → "Same"；否则按 年→月→日 判断先后：更早输出 "Early"，否则 "Late"。
3️⃣ 输出部分
   输出单词，不额外换行或空格。
`
  },
"1500": {
    id: "1500",
    title: "画矩形",
    content: `
> https://www.xujcoj.com/home/problem/detail/1500

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int m, n, d;
    char c;
    cin >> m >> n >> c >> d;
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            if (d == 0)
            {
                if (i == 1 || i == m || j == 1 || j == n)cout << c;
                else cout << " ";
            }
            else if (d == 1)
            {
                cout << c;
            }
        }
        cout << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   一组输入：m（高）、n（宽）、c（字符）、d（0空心/1实心）。
2️⃣ 策略与步骤
   空心：首尾行或首尾列输出 c，其它位置空格；实心：全部输出 c；每行末换行。
3️⃣ 注意事项
   行列循环边界正确；输出整齐无多余空格。
`
  },
"4357": {
    id: "4357",
    title: "斐波那契程序员-3",
    content: `
> https://www.xujcoj.com/home/problem/detail/4357

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
//返回a数组前d项之和
int getSum(int a[], int d)
{
    int sum = 0;
    for (int i = 0; i < d; i++)
    {
        sum += a[i];
    }
    return sum;
}
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int a[10], m;
        for (int i = 0; i < 10; i++)
        {
            cin >> a[i];
        }
        cin >> m;
        if (m <= 10) cout << getSum(a, m) << endl;
        else
        {
            int pre = getSum(a, 10), cur;
            for (int i = 11; i <= m; i++)
            {
                cur = pre % 100;
                pre += cur;
            }
            cout << pre << endl;
        }
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入 10 天代码量与总天数 m（1 ≤ m ≤ 10^5）。
2️⃣ 策略与步骤
   前十天求和 pre；若 m≤10 输出前 m 天之和；否则第 11 天起每日用 pre%100 并累加到 pre，直到第 m 天。
3️⃣ 注意事项
   使用 %100 控制每日新增量；整型溢出风险低。
`
  },
"4359": {
    id: "4359",
    title: "满足条件的数字和",
    content: `
> https://www.xujcoj.com/home/problem/detail/4359

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
        int m, p, a[100], sum = 0;
        cin >> m >> p;
        for (int i = 0; i < m; i++)
        {
            cin >> a[i];
        }
        for (int i = 0; i < m; i++)
        {
            int cnt = 0;
            for (int j = 0; j < m; j++)
            {
                if (i != j && a[j] % a[i] == 0)
                {
                    cnt++;
                }
            }
            if (cnt >= p) sum += a[i];
        }
        cout << sum << endl;
    }
    return 0;
}
\`\`\`

**解析**：

1️⃣ 输入部分
   每组输入 m 与 p，及 m 个正整数。
2️⃣ 策略与步骤
   对每个 a[i] 统计其作为其他数字因子的次数 cnt；若 cnt≥p 加入总和；输出总和。
3️⃣ 注意事项
   自身不参与统计；双重循环即可满足规模。
`
  }
};
