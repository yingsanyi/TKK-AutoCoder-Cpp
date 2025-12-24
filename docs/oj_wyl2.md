- ## 2670：猜数字

  **答案：**

  ```cpp
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
  ```

  **解析**：

  **核心思路**：枚举所有可能的4位数（0000~9999），检查是否满足所有猜测条件

  **xAyB的含义**：

  - **xA**：x个数字位置和值都正确
  - **yB**：y个数字值正确但位置错误

  **样例分析**：

  **案例1：**

  ```
  猜测：1234 0A0B
  说明：1、2、3、4都不在答案中
  可能答案：5678、5679、5670等（很多个）
  输出：-2（多个解）
  ```

  **案例2：**

  ```
  猜测1：1234 3A1B
  说明：有3个数字位置对，1个数字位置错
  
  猜测2：5678 2A1B
  说明：有2个数字位置对，1个数字位置错
  
  无法同时满足两个条件
  输出：-1（无解）
  ```

  **案例3：**

  ```
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
  ```

  **关键函数**：

  **1. check函数**：判断candidate对guess能否得到xAyB

  ```cpp
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
  ```

  **2. hasDistinct函数**：检查4位数字是否互不相同

  ```cpp
  bool hasDistinct(string s){
      for(int i = 0; i < 4; i++){
          for(int j = i + 1; j < 4; j++){
              if(s[i] == s[j]) return false;
          }
      }
      return true;
  }
  ```

  **算法流程**：

  ```
  1. 读入所有猜测记录
  2. 枚举0000~9999的所有4位数
  3. 对每个候选数字：
     - 检查是否各位数字互不相同
     - 检查是否满足所有猜测条件
  4. 统计满足条件的数字个数
  5. 输出结果：0个→-1，1个→该数字，多个→-2
  ```

  **典型例子**：

  **答案5780，猜测0754**

  ```
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
  ```

  **易错点**：

  ❌ **错误1：B的统计包含了A**

  ```cpp
  // 错误：先统计所有数字匹配，再减去A
  for(int i = 0; i < 4; i++){
      for(int j = 0; j < 4; j++){
          if(answer[i] == guess[j]) countB++;
      }
  }
  countB -= countA;
  // 这样会把A重复统计，应该单独统计位置错的
  ```

  ❌ **错误2：没有检查数字互不相同**

  ```cpp
  // 题目要求各位数字互不相同
  // 1122这样的数字不应该被考虑
  ```

  ❌ **错误3：输出格式错误**

  ```cpp
  cout << num << endl;  // 如果num=213，输出213
  // 应该输出：0213（保留前导0）
  ```

  ❌ **错误4：提前退出优化错误**

  ```cpp
  if(count >= 1) break;  // 错误：需要判断是1个还是多个
  // 应该：if(count > 1) break;
  ```

  **关键点**：

  - 枚举所有0000~9999的4位数
  - 正确理解xAyB的含义（A是位置和值都对，B是值对位置错）
  - 输出时保留前导0（如0213）
  - 区分无解(-1)和多解(-2)
