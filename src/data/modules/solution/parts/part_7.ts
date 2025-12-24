import { SolutionData } from '../types';

export const solutions_part7: Record<string, SolutionData> = {
"3963": {
    id: "3963",
    title: "毕业答辩",
    content: `
> https://www.xujcoj.com/home/problem/detail/3963

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int a, b, c;
        cin >> a >> b >> c;
        int below60 = (a < 60) + (b < 60) + (c < 60);
        double avg = (a + b + c) / 3.0;
        if (below60 <= 1 && avg >= 60) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 统计低于 60 的人数不超过 1，且平均分 ≥ 60
2. 满足两条件输出 Yes，否则 No
`
  },
"1944": {
    id: "1944",
    title: "不重复的数字",
    content: `
> https://www.xujcoj.com/home/problem/detail/1944

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main() {
    int a, b; cin >> a >> b;
    int c = a + b, d = a - b, e = a * b;
    if (c > d) swap(c, d);
    if (c > e) swap(c, e);
    if (d > e) swap(d, e);
    cout << c;
    if (c != d) cout << " " << d;
    if (d != e) cout << " " << e;
    return 0;
}
\`\`\`

**解析：**

1. 三值手动排序并去重输出
2. 输出从小到大，重复只保留一次
`
  },
"2014": {
    id: "2014",
    title: "假期的数量",
    content: `
> https://www.xujcoj.com/home/problem/detail/2014

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int m, a; cin >> m >> a;
        int fullWeeks = m / 7, remainingDays = m % 7;
        int weekendCount = fullWeeks * 2;
        for (int day = 1; day <= remainingDays; day++) {
            int weekday = (a + day - 1) % 7;
            if (weekday == 0) weekday = 7;
            if (weekday == 6 || weekday == 7) weekendCount++;
        }
        cout << weekendCount << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 每整周 2 天周末，剩余天按起始星期补计
2. 取模处理星期日为 7
`
  },
"4361": {
    id: "4361",
    title: "转专业",
    content: `
> https://www.xujcoj.com/home/problem/detail/4361

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main() {
    int a[5], b[5];
    for (int i = 0; i < 5; i++) { cin >> a[i]; b[i] = a[i]; }
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            if (j == i) continue;
            int c; cin >> c;
            b[i] -= c; b[j] += c;
        }
    }
    for (int i = 0; i < 5; i++) {
        cout << char('A' + i) << ": " << a[i];
        if (a[i] != b[i]) cout << " >> " << b[i];
        cout << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 双层遍历读转出矩阵，实时同步人数变化
2. 输出相同人数不显示箭头，变更显示 \`>>\`
`
  },
"3360": {
    id: "3360",
    title: "总和为4",
    content: `
> https://www.xujcoj.com/home/problem/detail/3360

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int m; cin >> m;
        int c1 = 0, c2 = 0, c3 = 0;
        for (int i = 0; i < m; i++) {
            int x; cin >> x;
            if (x == 1) c1++; else if (x == 2) c2++; else if (x == 3) c3++;
        }
        bool ok = false;
        if (c1 >= 1 && c3 >= 1) ok = true;
        else if (c2 >= 2) ok = true;
        else if (c1 >= 2 && c2 >= 1) ok = true;
        else if (c1 >= 4) ok = true;
        cout << (ok ? "Yes" : "No") << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 仅统计 1、2、3 的数量，枚举四种组合
2. 数字 4 与 ≥5 无法参与正整数和为 4 的组合
`
  },
"3977": {
    id: "3977",
    title: "符合条件的数-2",
    content: `
> https://www.xujcoj.com/home/problem/detail/3977

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        long long a, b; cin >> a >> b;
        long long r = a % b;
        if (r == 0) cout << b << endl;
        else cout << r << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 令 c 为使 a−c 可被 b 整除的最小正整数
2. 余数 r= a%b；r=0 时 c=b，否则 c=r
`
  },
"1981": {
    id: "1981",
    title: "最大的总和",
    content: `
> https://www.xujcoj.com/home/problem/detail/1981

**答案：**

\`\`\`cpp
#include<iostream>
#include<limits.h>
using namespace std;
int main() {
    int n; cin >> n;
    while (n--) {
        int m, pos = 0, maxneg = INT_MIN; bool posflag = false;
        cin >> m;
        while (m--) {
            int a; cin >> a;
            if (a >= 0) { posflag = true; pos += a; }
            else if (a > maxneg) { maxneg = a; }
        }
        if (posflag) cout << pos << endl;
        else cout << maxneg << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 有非负数时选全部非负的和，否则选最大负数
2. 一次遍历统计，时间复杂度 O(m)
`
  },
"3004": {
    id: "3004",
    title: "正偶数的平均值",
    content: `
> https://www.xujcoj.com/home/problem/detail/3004

**答案：**

\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int m; cin >> m;
        int count = 0; double sum = 0;
        for (int i = 0; i < m; i++) {
            double num; cin >> num;
            if (num > 0) {
                int intPart = (int)num;
                if (fabs(num - intPart) < 1e-9 && intPart % 2 == 0) {
                    count++; sum += num;
                }
            }
        }
        int result = 0;
        if (count > 0) {
            double average = sum / count;
            result = (int)(average + 0.5);
        }
        cout << result << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 过滤正偶整数，平均后四舍五入输出整数
2. 使用误差判断小数部分为 0
`
  },
"3978": {
    id: "3978",
    title: "符合条件的数-3",
    content: `
> https://www.xujcoj.com/home/problem/detail/3978

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main()
{
    int n;
    cin >> n;
    while(n--)
    {
        long long a, b;
        cin >> a >> b;
        long long c;
        int target = b % 10;
        for(c = 1; ; c++)
        {
            if((a + c) % 10 == target)
            {
                cout << c << endl;
                break;
            }
        }
    }
    return 0;
}
\`\`\`

**解析：**

1. 题目要求找到最小正整数 \`c\`，使得 \`(a + c) % 10 == b % 10\`。
2. 由于只需要匹配个位数，可以直接从 \`c=1\` 开始枚举，直到满足条件。
3. 循环一定会在 10 次以内找到答案（因为个位数只有 0-9），所以效率很高。
`
  },
"3994": {
    id: "3994",
    title: "星号阵列-25",
    content: `
> https://www.xujcoj.com/home/problem/detail/3994

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

bool isPrime(int num) {
    if (num <= 1) return false;
    if (num == 2) return true;
    if (num % 2 == 0) return false;
    for (int i = 3; i * i <= num; i += 2) if (num % i == 0) return false;
    return true;
}

int findSmallerPrime(int num) {
    for (int i = num - 1; i >= 2; i--) if (isPrime(i)) return i;
    return 1;
}

int main() {
    int a; cin >> a;
    int current = a;
    while (true) {
        for (int i = 0; i < current; i++) cout << "*";
        cout << endl;
        if (current == 1 || current == 2) break;
        current = findSmallerPrime(current);
    }
    return 0;
}
\`\`\`

**解析：**

1. 每行输出当前星数，下一行取较小的最大质数
2. 当星数为 1 或 2 结束
`
  },
"1630": {
    id: "1630",
    title: "身份证",
    content: `
> https://www.xujcoj.com/home/problem/detail/1630

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        string id;
        cin >> id;
        
        string year_str = id.substr(6, 4);
        int year = 0;
        for (int i = 0; i < 4; i++) {
            year = year * 10 + (year_str[i] - '0');
        }
        
        string month_str = id.substr(10, 2);
        int month = 0;
        for (int i = 0; i < 2; i++) {
            month = month * 10 + (month_str[i] - '0');
        }
        
        string day_str = id.substr(12, 2);
        int day = 0;
        for (int i = 0; i < 2; i++) {
            day = day * 10 + (day_str[i] - '0');
        }
        
        cout << year << " " << month << " " << day << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 生日位置：第7-10位为年，第11-12位为月，第13-14位为日
2. 用 \`substr\` 取子串，再逐位转整数以去除前导 0
3. 也可用 \`stoi\` 简化：
\`\`\`cpp
int year = stoi(id.substr(6, 4));
int month = stoi(id.substr(10, 2));
int day = stoi(id.substr(12, 2));
\`\`\`
`
  }
};
