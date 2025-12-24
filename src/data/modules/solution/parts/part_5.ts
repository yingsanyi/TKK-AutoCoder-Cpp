import { SolutionData } from '../types';

export const solutions_part5: Record<string, SolutionData> = {
"4314": {
    id: "4314",
    title: "最大值-2",
    content: `
> https://www.xujcoj.com/home/problem/detail/4314

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        int m;
        cin >> m;
        
        int bestNum = 0;
        int bestCount = 0;
        
        for (int i = 0; i < m; i++) {
            int num;
            cin >> num;
            
            int count = 0;
            for (int j = 1; j <= num; j++) {
                if (num % j == 0) {
                    count++;
                }
            }
            
            if (count > bestCount) {
                bestCount = count;
                bestNum = num;
            } else if (count == bestCount) {
                if (num > bestNum) {
                    bestNum = num;
                }
            }
        }
        
        cout << bestNum << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 先输入案例数量 n；每组输入 m 个正整数
2. 双重循环统计每个数字的因子个数
3. 因子个数更大则更新；相等时取原始数字更大者
4. 输出因子个数最多的数字本身
`
  },
"2785": {
    id: "2785",
    title: "一二三",
    content: `
> https://www.xujcoj.com/home/problem/detail/2785

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;
bool fun(int s[10], int a)
{
    bool f = true;
    int b[3];
    b[0] = a / 100 % 10;
    b[1] = a / 10 % 10;
    b[2] = a / 1 % 10;
    for (int i = 0; i < 3; i++)
    {
        if (s[b[i]] == 1)
        {
            f = false;
        }
        s[b[i]] = 1;
    }
    return f;
}
int main()
{
    for (int i = 102; i <= 329; i++)
    {
        int a = i, b = 2 * i, c = 3 * i;
        int s[10] = { 0 };
        bool f1 = fun(s, a);
        bool f2 = fun(s, b);
        bool f3 = fun(s, c);
        if (f1 && f2 && f3)
        {
            cout << a << " " << b << " " << c << endl;
        }
    }
    return 0;
}
\`\`\`

**解析：**

1. 枚举满足 1:2:3 的三位数三元组
2. 用标记数组 s[10] 检查 9 个数字互不重复
3. 满足条件则输出三数，空格分隔
`
  },
"1983": {
    id: "1983",
    title: "重型货车",
    content: `
> https://www.xujcoj.com/home/problem/detail/1983

**答案：**

\`\`\`cpp
#include<iostream>
#include<cmath>
using namespace std;
int main()
{
    int n;
    cin >> n;
    while (n--)
    {
        int a, b, m, x, y, maxa = 0, maxb = 0, max;
        cin >> a >> b >> m;
        while (a--)
        {
            cin >> x;
            if (x > maxa)
                maxa = x;
        }
        while (b--)
        {
            cin >> y;
            if (y > maxb)
                maxb = y;
        }
        if (maxa > maxb)
            max = maxb;
        else max = maxa;
        if (max < m)
            m = max;
        cout << m << endl;
    }
    return 0;
}
\`\`\`

**解析：**

1. 读取两组高度的最大值 maxa、maxb
2. 取较小者为约束，再与初始限制 m 比较
3. 输出能通过的最大高度
`
  },
"3066": {
    id: "3066",
    title: "Tql和Tcl",
    content: `
> https://www.xujcoj.com/home/problem/detail/3066

**答案：**

\`\`\`cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        int m;
        cin >> m;
        
        int scores[50];
        for (int i = 0; i < m; i++) {
            cin >> scores[i];
        }
        
        sort(scores, scores + m);
        for (int i = 0; i < m / 2; i++) {
            int temp = scores[i];
            scores[i] = scores[m - 1 - i];
            scores[m - 1 - i] = temp;
        }
        
        int midIndex = (m + 1) / 2 - 1;
        int midScore = scores[midIndex];
        
        if (midScore >= 80) {
            cout << "Tql" << endl;
        } else if (midScore < 60) {
            cout << "Tcl" << endl;
        } else {
            cout << "Normal" << endl;
        }
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 成绩按从高到低排序
2. 取第 (m+1)/2 名的分数判断区间输出
`
  },
"4313": {
    id: "4313",
    title: "最大值-1",
    content: `
> https://www.xujcoj.com/home/problem/detail/4313

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int reverseNumber(int num) {
    int reversed = 0;
    while (num > 0) {
        int digit = num % 10;
        reversed = reversed * 10 + digit;
        num /= 10;
    }
    return reversed;
}

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        int m;
        cin >> m;
        
        int bestOriginal = 0;
        int bestReversed = 0;
        
        for (int i = 0; i < m; i++) {
            int num;
            cin >> num;
            int reversed = reverseNumber(num);
            if (reversed > bestReversed) {
                bestReversed = reversed;
                bestOriginal = num;
            } else if (reversed == bestReversed) {
                if (num > bestOriginal) {
                    bestOriginal = num;
                }
            }
        }
        
        cout << bestOriginal << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 比较反转值，反转值大的优先
2. 反转值相同取原始数字更大的
`
  },
"3847": {
    id: "3847",
    title: "数列之和",
    content: `
> https://www.xujcoj.com/home/problem/detail/3847

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        int m;
        cin >> m;
        
        if (m == 1) {
            cout << 1 << endl;
            continue;
        } else if (m == 2) {
            cout << 2 << endl;
            continue;
        }
        
        int a = 1;
        int b = 1;
        int sum = 2;
        
        for (int i = 3; i <= m; i++) {
            int c = (a + b) % 1000;
            sum = (sum + c) % 1000;
            a = b;
            b = c;
        }
        
        cout << sum << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 斐波那契前 m 项之和，取模 1000
2. 特判 m=1、m=2；迭代累加并取模
`
  },
"2670": {
    id: "2670",
    title: "猜数字",
    content: `
> [https://www.xujcoj.com/home/problem/detail/2670](https://www.xujcoj.com/home/problem/detail/2670)

**答案：**

\`\`\`cpp
#include<iostream>
#include<string>
using namespace std;

// 判断guess对answer能得到xAyB
bool check(string answer, string guess, int x, int y){
    int countA = 0, countB = 0;
    
    // 统计A的数量（位置和数字都对）
    for(int i = 0; i < 4; i++){
        if(answer[i] == guess[i]){
            countA++;
        }
    }
    
    // 统计B的数量（数字对但位置错）
    for(int i = 0; i < 4; i++){
        if(answer[i] != guess[i]){  // 位置不对
            for(int j = 0; j < 4; j++){
                if(i != j && answer[i] == guess[j]){
                    countB++;
                    break;
                }
            }
        }
    }
    
    return countA == x && countB == y;
}

// 检查字符串是否有重复数字
bool hasDistinct(string s){
    for(int i = 0; i < 4; i++){
        for(int j = i + 1; j < 4; j++){
            if(s[i] == s[j]) return false;
        }
    }
    return true;
}

int main(){
    int n;
    cin >> n;
    
    while(n--){
        int m;
        cin >> m;
        
        string guesses[20];
        int xList[20], yList[20];
        
        // 读入所有猜测
        for(int i = 0; i < m; i++){
            string response;
            cin >> guesses[i] >> response;
            xList[i] = response[0] - '0';
            yList[i] = response[2] - '0';
        }
        
        string answer = "";
        int count = 0;
        
        // 枚举所有可能的4位数（0000~9999）
        for(int num = 0; num <= 9999; num++){
            // 转换成4位字符串
            string candidate = "";
            int temp = num;
            for(int i = 0; i < 4; i++){
                candidate = char('0' + temp % 10) + candidate;
                temp /= 10;
            }
            
            // 检查是否各位数字互不相同
            if(!hasDistinct(candidate)) continue;
            
            // 检查是否满足所有猜测条件
            bool valid = true;
            for(int i = 0; i < m; i++){
                if(!check(candidate, guesses[i], xList[i], yList[i])){
                    valid = false;
                    break;
                }
            }
            
            if(valid){
                count++;
                answer = candidate;
                if(count > 1) break;  // 超过1个解可以提前退出
            }
        }
        
        if(count == 0){
            cout << -1 << endl;
        } else if(count == 1){
            cout << answer << endl;
        } else {
            cout << -2 << endl;
        }
    }
    
    return 0;
}
\`\`\`

**解析**：

**核心思路**：枚举所有可能的4位数（0000~9999），检查是否满足所有猜测条件

**xAyB的含义**：

- **xA**：x个数字位置和值都正确
- **yB**：y个数字值正确但位置错误

**样例分析**：

**案例1：**

\`\`\`
猜测：1234 0A0B
说明：1、2、3、4都不在答案中
可能答案：5678、5679、5670等（很多个）
输出：-2（多个解）
\`\`\`

**案例2：**

\`\`\`
猜测1：1234 3A1B
说明：有3个数字位置对，1个数字位置错

猜测2：5678 2A1B
说明：有2个数字位置对，1个数字位置错

无法同时满足两个条件
输出：-1（无解）
\`\`\`

**案例3：**

\`\`\`
猜测1：3210 2A2B
猜测2：3120 0A4B

枚举检验0213：
- 对3210：
  A: 位置对的 = 2个(位置0的0和位置3的0) 等等，重新分析
  
实际：答案0213
- 对3210：
  位置0: 0≠3
  位置1: 2=2 ✓ (1A)
  位置2: 1=1 ✓ (2A)
  位置3: 3≠0
  还有：0出现在位置0，3出现在位置3，都在对方中但位置错 (2B)
  结果：2A2B ✓

- 对3120：
  位置0: 0≠3
  位置1: 2≠1
  位置2: 1≠2
  位置3: 3≠0
  但3、1、2、0都在答案中，只是位置全错 (4B)
  结果：0A4B ✓

输出：0213
\`\`\`

**关键函数**：

**1. check函数**：判断candidate对guess能否得到xAyB

\`\`\`cpp
bool check(string answer, string guess, int x, int y){
    int countA = 0, countB = 0;
    
    // 统计A
    for(int i = 0; i < 4; i++){
        if(answer[i] == guess[i]){
            countA++;
        }
    }
    
    // 统计B（数字对但位置错）
    for(int i = 0; i < 4; i++){
        if(answer[i] != guess[i]){
            for(int j = 0; j < 4; j++){
                if(i != j && answer[i] == guess[j]){
                    countB++;
                    break;
                }
            }
        }
    }
    
    return countA == x && countB == y;
}
\`\`\`

**2. hasDistinct函数**：检查4位数字是否互不相同

\`\`\`cpp
bool hasDistinct(string s){
    for(int i = 0; i < 4; i++){
        for(int j = i + 1; j < 4; j++){
            if(s[i] == s[j]) return false;
        }
    }
    return true;
}
\`\`\`

**算法流程**：

\`\`\`
1. 读入所有猜测记录
2. 枚举0000~9999的所有4位数
3. 对每个候选数字：
   - 检查是否各位数字互不相同
   - 检查是否满足所有猜测条件
4. 统计满足条件的数字个数
5. 输出结果：0个→-1，1个→该数字，多个→-2
\`\`\`

**典型例子**：

**答案5780，猜测0754**

\`\`\`
A统计：
位置0: 5≠0
位置1: 7=7 ✓ (1A)
位置2: 8≠5
位置3: 0≠4

B统计：
5在位置2，在0754的位置2出现→位置相同，不算B
0在位置3，在0754的位置0出现→位置不同 (1B)
8在位置2，在0754中不存在→不算B

结果：1A1B
\`\`\`

**易错点**：

❌ **错误1：B的统计包含了A**

\`\`\`cpp
// 错误：先统计所有数字匹配，再减去A
for(int i = 0; i < 4; i++){
    for(int j = 0; j < 4; j++){
        if(answer[i] == guess[j]) countB++;
    }
}
countB -= countA;
// 这样会把A重复统计，应该单独统计位置错的
\`\`\`

❌ **错误2：没有检查数字互不相同**

\`\`\`cpp
// 题目要求各位数字互不相同
// 1122这样的数字不应该被考虑
\`\`\`

❌ **错误3：输出格式错误**

\`\`\`cpp
cout << num << endl;  // 如果num=213，输出213
// 应该输出：0213（保留前导0）
\`\`\`

❌ **错误4：提前退出优化错误**

\`\`\`cpp
if(count >= 1) break;  // 错误：需要判断是1个还是多个
// 应该：if(count > 1) break;
\`\`\`

**关键点**：

- 枚举所有0000~9999的4位数
- 正确理解xAyB的含义（A是位置和值都对，B是值对位置错）
- 输出时保留前导0（如0213）
- 区分无解(-1)和多解(-2)
`
  },
"2585": {
    id: "2585",
    title: "广播操",
    content: `
> https://www.xujcoj.com/home/problem/detail/2585

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    for (int kase = 0; kase < n; kase++) {
        long long x;
        cin >> x;
        
        long long section = (x - 1) / 8;
        int position = (x - 1) % 8 + 1;
        
        int result;
        if (position == 1) {
            result = (section % 8) + 1;
        } else {
            result = position;
        }
        
        cout << result << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 每节 8 个数；节内位置 position 取值 1-8
2. position 为 1 时首位按节号循环；否则输出 position
`
  },
"4194": {
    id: "4194",
    title: "ABCD",
    content: `
> https://www.xujcoj.com/home/problem/detail/4194

**答案：**

\`\`\`cpp
#include<iostream>
using namespace std;

inline int min(int x, int y) {
    return x < y ? x : y;
}

int main() {
    int x, y, remainx, remainy, i, j, k;
    bool f = false;
    
    cin >> x >> y;
    
    for (i = 0; i <= min(x, y); i++) {
        for (j = 0; j <= min(x - i, y - i); j++) {
            for (k = 0; k <= min(x - i - j, y - i - 2 * j); k++) {
                remainx = x - i - j - k;
                remainy = y - i - 2 * j - 3 * k;
                
                if (remainx * 4 == remainy) {
                    cout << i << " " << j << " " << k << " " << remainx << endl;
                    f = true;
                }
            }
        }
    }
    
    if (!f) {
        cout << "None" << endl;
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 三重枚举 A、B、C；D 由件数差计算
2. 验证金额一致性 remainx*4 == remainy，输出所有解或 None
`
  },
"3321": {
    id: "3321",
    title: "乘积最大的两个数",
    content: `
> https://www.xujcoj.com/home/problem/detail/3321

**答案：**

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    
    int prod1 = a * b;
    int prod2 = a * c;
    int prod3 = b * c;
    
    int maxProd = prod1;
    if (prod2 > maxProd) maxProd = prod2;
    if (prod3 > maxProd) maxProd = prod3;
    
    if (maxProd == prod1) {
        if (a < b) {
            cout << a << " " << b;
        } else {
            cout << b << " " << a;
        }
    } else if (maxProd == prod2) {
        if (a < c) {
            cout << a << " " << c;
        } else {
            cout << c << " " << a;
        }
    } else {
        if (b < c) {
            cout << b << " " << c;
        } else {
            cout << c << " " << b;
        }
    }
    
    return 0;
}
\`\`\`

**解析：**

1. 枚举三对乘积并取最大值
2. 按大小顺序输出对应两个数
`
  }
};
