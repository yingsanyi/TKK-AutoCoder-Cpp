import { SolutionData } from '../types';

export const solutions_part6: Record<string, SolutionData> = {
"3427": {
    id: "3427",
    title: "斐波那契汤",
    content: `
> https://www.xujcoj.com/home/problem/detail/3427

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        int a, b, c, m;
        cin >> a >> b >> c >> m;
        
        if (m == 1) {
            cout << a << endl;
            continue;
        } else if (m == 2) {
            cout << b << endl;
            continue;
        }
        
        int v[3];
        v[0] = a;
        v[1] = b;
        
        for (int day = 3; day <= m; day++) {
            v[2] = v[1] / 2 + v[0] / 3;
            if (day % 5 == 0) {
                v[2] += c;
            }
            v[0] = v[1];
            v[1] = v[2];
        }
        
        cout << v[1] << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 递推 v[i] = v[i-1]/2 + v[i-2]/3；整 5 天加 c
2. 循环数组滚动保存最近两天，输出第 m 天值
`
  },
"2174": {
    id: "2174",
    title: "身份证校验码",
    content: `
> https://www.xujcoj.com/home/problem/detail/2174

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int weights[17] = {7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
    char checksumMap[11] = {'1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'};
    
    for (int kase = 0; kase < n; kase++) {
        string id;
        cin >> id;
        
        int sum = 0;
        for (int i = 0; i < 17; i++) {
            int digit = id[i] - '0';
            sum += digit * weights[i];
        }
        
        int remainder = sum % 11;
        char correctChecksum = checksumMap[remainder];
        
        if (id[17] == correctChecksum) {
            cout << "Yes" << endl;
        } else {
            for (int i = 0; i < 17; i++) cout << id[i];
            cout << correctChecksum << endl;
        }
    }
    return 0;
}
\`\`\`

**解析：**

1. 前 17 位加权取余，余数映射第 18 位校验码
2. 正确输出 Yes；错误则输出修正后的 18 位
`
  },
"3325": {
    id: "3325",
    title: "第几个星期",
    content: `
> https://www.xujcoj.com/home/problem/detail/3325

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int year, month, day, firstWeekday;
    cin >> year >> month >> day >> firstWeekday;
    
    int monthDays[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    bool isLeapYear = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    if (isLeapYear) monthDays[2] = 29;
    
    int dayOfYear = 0;
    for (int i = 1; i < month; i++) dayOfYear += monthDays[i];
    dayOfYear += day;
    
    int firstWeekLength = 8 - firstWeekday;
    int weekNumber = 1;
    if (dayOfYear > firstWeekLength) {
        int remainingDays = dayOfYear - firstWeekLength;
        weekNumber = 1 + (remainingDays + 6) / 7;
    }
    cout << weekNumber;
    return 0;
}
\`\`\`

**解析：**

1. 第 1 周长度为 \`8-firstWeekday\`，其后每周 7 天
2. 计算年内第几天并按公式向上取整得到周序
`
  },
"3970": {
    id: "3970",
    title: "日期-1",
    content: `
> https://www.xujcoj.com/home/problem/detail/3970

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int year, month, day;
        cin >> year >> month >> day;
        string monthNames[13] = {
            "", "Jan.", "Feb.", "Mar.", "Apr.", "May",
            "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
        };
        cout << monthNames[month] << " " << day << ", " << year << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 映射月份缩写，5 月为 \`May\` 无点
2. 输出格式为 \`Mon. d, yyyy\`
`
  },
"2175": {
    id: "2175",
    title: "专业代表",
    content: `
> https://www.xujcoj.com/home/problem/detail/2175

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int m;
        cin >> m;
        bool seen[26][26][26] = {false};
        string result = "";
        for (int i = 0; i < m; i++) {
            string id;
            cin >> id;
            int a = id[0] - 'A';
            int b = id[1] - 'A';
            int c = id[2] - 'A';
            if (!seen[a][b][c]) {
                seen[a][b][c] = true;
                if (!result.empty()) result += " ";
                result += id;
            }
        }
        cout << result << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 三维布尔数组标记专业，首次出现加入结果
2. 保持输入顺序输出代表学号
`
  },
"2932": {
    id: "2932",
    title: "四则运算的最大值",
    content: `
> https://www.xujcoj.com/home/problem/detail/2932

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main() {
    int a, b;
    double r[4];
    cin >> a >> b;
    r[0] = a + b;
    r[1] = a - b;
    r[2] = a * b;
    r[3] = 1.0 * a / b;
    double mx = r[0];
    for (int i = 1; i < 4; i++) if (r[i] > mx) mx = r[i];
    cout << mx;
    return 0;
}
\`\`\`

**解析：**

1. 计算加减乘除四值，取最大输出
2. 使用浮点除法 \`1.0*a/b\` 控制精度
`
  },
"2073": {
    id: "2073",
    title: "字符串替换",
    content: `
> https://www.xujcoj.com/home/problem/detail/2073

**答案：**

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int kase = 0; kase < n; kase++) {
        string s; int m; char c; string d;
        cin >> s >> m >> c >> d;
        int count = 0;
        string result = "";
        for (int i = 0; i < (int)s.length(); i++) {
            if (s[i] == c && count < m) {
                result += d;
                count++;
            } else {
                result += s[i];
            }
        }
        cout << result << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 遍历 s，前 m 次遇到字符 c 时拼接 d
2. 其余字符原样保留，输出新字符串
`
  },
"3962": {
    id: "3962",
    title: "日期格式转换",
    content: `
> https://www.xujcoj.com/home/problem/detail/3962

**答案：**

\`\`\`cpp
#include<iostream>
#include<string>
using namespace std;

int getMonth(string s) {
    string m[] = { "", "Jan.", "Feb.", "Mar.", "Apr.", "May",
                   "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." };
    for (int i = 1; i <= 12; i++) if (m[i] == s) return i;
    return 1;
}

int main() {
    int n; cin >> n;
    while (n--) {
        string s1, s2, s3;
        cin >> s1 >> s2 >> s3;
        int month; string day;
        if (isdigit(s1[0])) {
            month = getMonth(s2.substr(0, s2.size() - 1));
            day = s1;
        } else {
            month = getMonth(s1);
            day = s2.substr(0, s2.size() - 1);
        }
        cout << s3 << "." << month << "." << day << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 识别英式或美式日期，统一输出中式 \`年.月.日\`
2. 月份缩写统一映射，逗号通过子串去除
`
  },
"2236": {
    id: "2236",
    title: "斐波那契程序员",
    content: `
> https://www.xujcoj.com/home/problem/detail/2236

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    for (int kase = 0; kase < n; kase++) {
        int a; cin >> a;
        int written[100], remaining[100];
        for (int i = 0; i < a; i++) {
            cin >> written[i];
            remaining[i] = written[i];
        }
        for (int day = 1; day < a; day++) {
            if (day - 1 >= 0) remaining[day - 1] -= remaining[day - 1] / 2;
            if (day - 2 >= 0) remaining[day - 2] -= remaining[day - 2] / 2;
        }
        int total = 0;
        for (int i = 0; i < a; i++) total += remaining[i];
        cout << total << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 每天修复前一天与前两天的剩余一半
2. 模拟 a 天后剩余总量累加输出
`
  },
"3362": {
    id: "3362",
    title: "舍罕王-2",
    content: `
> https://www.xujcoj.com/home/problem/detail/3362

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
int main() {
    int n; cin >> n;
    while (n--) {
        unsigned long long m, a = 1;
        int b = 0;
        cin >> m;
        while (b < 63 && m > a) {
            m -= a; b++; a *= 2;
        }
        cout << m << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 依次放置 1,2,4,… 粒，直到不足以放满下一格
2. 循环结束剩余 m 即最后一格的麦粒数
`
  }
};
