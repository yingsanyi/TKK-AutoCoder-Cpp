import { QuizData, ExerciseData } from '../../../types/index';

export const reviewQuestionsQuizData: QuizData = {
  title: 'C++ 复习题全集',
  description: '本题集包含多道选择题，涵盖递归、函数、数组、指针、字符串、随机数、变量存储期等核心知识点。',
  questions: [
    {
      id: 1,
      question: '递归终止条件：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint f(int n){\n    if(n==0) return 0;\n    return f(n-1) + n;\n}\nint main(){\n    cout << f(4);\n}\n```',
      options: ['6', '8', '10', '12', '无限递归'],
      correctAnswer: 2,
      explanation: '递归求和 (1+2+3+4=10)，终止条件 n==0。'
    },
    {
      id: 2,
      question: '递归返回值：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint g(int n){\n    if(n<=1) return 1;\n    return n * g(n-2);\n}\nint main(){\n    cout << g(6);\n}\n```',
      options: ['36', '48', '72', '120', '240'],
      correctAnswer: 1,
      explanation: '递归步长为 2。g(6) = 6 * g(4) = 6 * 4 * g(2) = 6 * 4 * 2 * g(0) = 48 * 1 = 48。'
    },
    {
      id: 3,
      question: '递归与栈深度（读输出）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nvoid p(int n){\n    if(n==0) return;\n    cout << n;\n    p(n-1);\n    cout << n;\n}\nint main(){ p(3); }\n```',
      options: ['123321', '321123', '123123', '332211', '321321'],
      correctAnswer: 1,
      explanation: '先序输出 3 2 1，回溯再输出 1 2 3。'
    },
    {
      id: 4,
      question: '重载：仅返回值不同？\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint h(int x){ return x; }\ndouble h(int x){ return x + 0.5; }\n\nint main(){\n    cout << h(3);\n}\n```',
      options: ['输出 3', '输出 3.5', '编译通过但运行时二义性', '编译错误：无法仅以返回值重载', '编译错误：main 里调用非法'],
      correctAnswer: 3,
      explanation: 'C++ 不能只靠返回值区分重载，参数列表需不同。'
    },
    {
      id: 5,
      question: '参数个数不同：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint add(int a,int b){ return a+b; }\nint add(int a,int b,int c){ return a+b+c; }\n\nint main(){ cout << add(1,2) << " " << add(1,2,3); }\n```',
      options: ['3 6', '6 3', '3 5', '5 6', '编译二义性'],
      correctAnswer: 0,
      explanation: '参数个数不同可重载，分别调用对应版本。'
    },
    {
      id: 6,
      question: '嵌套调用：返回值作实参\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint inc(int x){ return x+1; }\nint mul(int a,int b){ return a*b; }\n\nint main(){\n    cout << mul(inc(2), inc(3));\n}\n```',
      options: ['9', '12', '16', '20', '24'],
      correctAnswer: 1,
      explanation: 'inc(2)=3, inc(3)=4，乘积 12。'
    },
    {
      id: 7,
      question: '静态局部变量（只初始化一次）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint foo(){\n    static int x = 0;\n    return ++x;\n}\nint main(){\n    cout << foo() << foo() << foo();\n}\n```',
      options: ['000', '111', '123', '321', '234'],
      correctAnswer: 2,
      explanation: 'static 局部变量生命周期贯穿程序，仅初始化一次，连续累加。'
    },
    {
      id: 8,
      question: '非静态局部变量（每次重建）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint foo(){\n    int x = 0;\n    return ++x;\n}\nint main(){\n    cout << foo() << foo() << foo();\n}\n```',
      options: ['123', '111', '000', '321', '222'],
      correctAnswer: 1,
      explanation: '每次调用 x 都重新创建并初始化为 0。'
    },
    {
      id: 9,
      question: '一维数组访问：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[5] = {1,2,3};\n    cout << a[3] << a[4];\n}\n```',
      options: ['00', '30', '03', '12', '未定义'],
      correctAnswer: 0,
      explanation: '部分初始化，剩余元素自动置 0（同一声明中显式初始化）。'
    },
    {
      id: 10,
      question: '自动存储期未初始化：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[3];\n    cout << a[0];\n}\n```',
      options: ['一定是 0', '一定是 1', '一定是 -1', '未定义值（不确定）', '编译错误'],
      correctAnswer: 3,
      explanation: '自动存储期的未初始化局部变量/数组元素值不确定。'
    },
    {
      id: 11,
      question: '数组名退化为指针（读输出）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[3]={10,20,30};\n    int* p=a;\n    cout << *(p+1);\n}\n```',
      options: ['10', '20', '30', '地址值', '未定义'],
      correctAnswer: 1,
      explanation: 'p+1 指向 a[1]，解引用为 20。'
    },
    {
      id: 12,
      question: '下标与指针等价：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[4]={5,6,7,8};\n    int* p=a;\n    cout << p[2];\n}\n```',
      options: ['5', '6', '7', '8', '编译错误'],
      correctAnswer: 2,
      explanation: 'p[i] 等价 *(p+i)。'
    },
    {
      id: 13,
      question: '越界访问：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[2]={1,2};\n    cout << a[2];\n}\n```',
      options: ['0', '1', '2', '3', '未定义行为'],
      correctAnswer: 4,
      explanation: '越界访问导致未定义行为。'
    },
    {
      id: 14,
      question: '二维数组内存按行连续：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[2][3]={{1,2,3},{4,5,6}};\n    cout << *(*(a+1)+2);\n}\n```',
      options: ['3', '4', '5', '6', '未定义'],
      correctAnswer: 3,
      explanation: '`a` 的类型是 `int [2][3]`，在表达式中会退化为“行指针”`int (*)[3]`（指向含 3 个 `int` 的数组）。\n\n逐步拆解 `*(*(a+1)+2)`：\n1) `a` 退化为 `int (*)[3]`，指向首行 `&a[0]`\n2) `a + 1` 指向下一行，即 `&a[1]`\n3) `*(a + 1)` 取出第 2 行（类型为 `int [3]`，在表达式中再退化为 `int*`，指向 `&a[1][0]`）\n4) `*(a + 1) + 2` 指向 `&a[1][2]`\n5) `*(*(a + 1) + 2)` 解引用得到 `a[1][2] = 6`\n\n因此：`*(*(a+1)+2) == a[1][2]`。\n\n用行指针写法等价表达：\n```cpp\nint (*p)[3] = a;      // p 的类型是 int (*)[3]，等价于 a 在表达式中的退化类型。\n// 下标形式\np[1][2] == a[1][2];\n// 指针算术形式\np[1][2] == *(*(p + 1) + 2);\n```\n\n解释 `p++` 后再取同一位置的形式（分两步写，避免把自增与取值混在一个表达式里）：\n```cpp\nint (*p)[3] = a;\np++;                 // p 从 &a[0] 移动到 &a[1]\n*(*p + 2);            // *p 是 a[1]（int[3]），退化为 int* 指向 &a[1][0]，再 +2 指向 &a[1][2]\n```\n所以 `p++; *(*p + 2)` 的结果同样是 `a[1][2] = 6`。'
    },
    {
      id: 15,
      question: '二维数组部分初始化的默认值：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[2][3]={{1},{4,5}};\n    cout << a[0][2] << a[1][2];\n}\n```',
      options: ['15', '10', '00', '05', '未定义'],
      correctAnswer: 2,
      explanation: '同一声明中部分初始化，其余元素补 0。'
    },
    {
      id: 16,
      question: '行指针类型：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[2][3]={{1,2,3},{4,5,6}};\n    int (*p)[3] = a;\n    cout << p[1][0];\n}\n```',
      options: ['1', '2', '3', '4', '编译错误'],
      correctAnswer: 3,
      explanation: 'p 是指向“含 3 个 int 的数组”的指针，p[1] 为第 2 行。'
    },
    {
      id: 17,
      question: '通过指针修改外部变量：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nvoid setv(int* p){ *p = 9; }\n\nint main(){\n    int x=1;\n    setv(&x);\n    cout << x;\n}\n```',
      options: ['1', '9', '0', '未定义', '编译错误'],
      correctAnswer: 1,
      explanation: '传入地址，函数内解引用修改原变量。'
    },
    {
      id: 18,
      question: 'string 拼接：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string s="ab";\n    s += "cd";\n    cout << s;\n}\n```',
      options: ['ab', 'cd', 'abcd', '编译错误', '未定义'],
      correctAnswer: 2,
      explanation: 'std::string 支持 += 追加拼接。'
    },
    {
      id: 19,
      question: 'substring 越界参数：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string s="abcd";\n    cout << s.substr(2, 10);\n}\n```',
      options: ['cd', 'c', '空', '抛异常', '编译错误'],
      correctAnswer: 0,
      explanation: 'substr(pos,len) 会截到字符串末尾（pos 合法时）。'
    },
    {
      id: 20,
      question: 'find 未找到：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string s="abcd";\n    cout << (s.find("e")==string::npos);\n}\n```',
      options: ['0', '1', '-1', 'npos', '编译错误'],
      correctAnswer: 1,
      explanation: '未找到返回 string::npos，比较为真输出 1。'
    },
    {
      id: 21,
      question: '反向查找 rfind：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string s="ababa";\n    cout << s.rfind("aba");\n}\n```',
      options: ['0', '1', '2', '3', 'npos'],
      correctAnswer: 2,
      explanation: '最后一次出现 "aba" 起点为 2。'
    },
    {
      id: 22,
      question: 'rand 区间映射（概念结果）：\n\n```cpp\nint x = rand() % 6 + 1;\n```\nx 的可能范围是：',
      options: ['[0,6]', '[1,6]', '[1,7]', '[0,5]', '不确定'],
      correctAnswer: 1,
      explanation: 'rand()%6 得 0..5，加 1 得 1..6（均匀性仍可能受取模影响）。\n公式：要生成 $[a, b]$ 之间的随机整数，通用的公式是：\n$$rand() \\% (b - a + 1) + a$$\\n其中：\n- `b - a + 1` 计算区间长度\n- `rand() % 长度` 生成 `[0, 长度-1]` 的偏移量\n- `+ a` 将偏移量平移到起始位置 `a`'
    },
    {
      id: 23,
      question: 'srand 作用：\n\n```cpp\n#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main(){\n    srand(1);\n    cout << rand() << " " << rand();\n}\n```',
      options: ['每次运行都不同', '每次运行相同序列', 'rand() 恒为 1', '编译错误', '未定义'],
      correctAnswer: 1,
      explanation: '固定种子会产生可复现的伪随机序列。'
    },
    {
      id: 24,
      question: 'a>b 的区间映射（读输出）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a=10,b=3;\n    if(a>b){ int t=a; a=b; b=t; }\n    cout << a << " " << b;\n}\n```',
      options: ['10 3', '3 10', '13', '7', '未定义'],
      correctAnswer: 1,
      explanation: '交换确保区间端点有序，便于生成 [a,b]。'
    },
    {
      id: 25,
      question: '指针算术与输出：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[]={1,4,9,16};\n    int* p=a+3;\n    cout << *(p-2);\n}\n```',
      options: ['1', '4', '9', '16', '未定义'],
      correctAnswer: 1,
      explanation: 'p 指向 a[3]，p-2 指向 a[1]，值为 4。'
    },
    {
      id: 26,
      question: '指针修改数组元素：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[3]={1,2,3};\n    int* p=a;\n    *(p+1)=9;\n    cout << a[1];\n}\n```',
      options: ['2', '3', '9', '未定义', '编译错误'],
      correctAnswer: 2,
      explanation: '指针指向数组，修改第二个元素。'
    },
    {
      id: 27,
      question: '二维数组传参：列数必须固定\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nvoid print(int a[][]){ cout << a[0][0]; }\n\nint main(){\n    int x[2][3]={{1,2,3},{4,5,6}};\n    print(x);\n}\n```',
      options: ['输出 1', '输出 4', '编译错误', '运行错误', '未定义'],
      correctAnswer: 2,
      explanation: '形参二维数组必须给出第二维（列数）以确定寻址。'
    },
    {
      id: 28,
      question: '正确的行指针形参：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nvoid print(int (*a)[3]){ cout << a[1][2]; }\n\nint main(){\n    int x[2][3]={{1,2,3},{4,5,6}};\n    print(x);\n}\n```',
      options: ['3', '4', '5', '6', '编译错误'],
      correctAnswer: 3,
      explanation: '访问第 2 行第 3 列元素 6。'
    },
    {
      id: 29,
      question: 'string 内容比较：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string a="hi", b="hi";\n    cout << (a==b);\n}\n```',
      options: ['0', '1', 'hi', '编译错误', '未定义'],
      correctAnswer: 1,
      explanation: 'std::string 的 == 比较内容。'
    },
    {
      id: 30,
      question: 'getline 读取空格：\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main(){\n    string s;\n    getline(cin,s);\n    cout << s.size();\n}\n```\n输入：`a b`',
      options: ['1', '2', '3', '4', '5'],
      correctAnswer: 2,
      explanation: '包含空格整行读取，"a␠b" 长度 3。'
    },
    {
      id: 31,
      question: '递归：缺少终止条件\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint f(int n){\n    return f(n-1) + 1;\n}\nint main(){ cout << f(3); }\n```',
      options: ['3', '0', '4', '编译错误', '运行时无限递归/栈溢出'],
      correctAnswer: 4,
      explanation: '无终止条件，递归不会停止，导致栈溢出。'
    },
    {
      id: 32,
      question: '数组遍历边界：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main(){\n    int a[3]={1,2,3};\n    for(int i=0;i<=3;i++) cout<<a[i];\n}\n```',
      options: ['123', '1230', '1233', '未定义行为', '编译错误'],
      correctAnswer: 3,
      explanation: 'i==3 时越界访问。'
    },
    {
      id: 33,
      question: '嵌套调用与重载（返回类型匹配）：\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint t(double x){ return (int)(x*2); }\ndouble t(int x){ return x/2.0; }\n\nint main(){\n    cout << t(t(3));\n}\n```',
      options: ['1', '2', '3', '6', '12'],
      correctAnswer: 2,
      explanation: '内层 t(3) 选 double t(int) 得 1.5；外层 t(1.5) 选 int t(double) 得 3。嵌套时关注返回类型触发的重载选择。'
    },
    {
      id: 34,
      question: '阅读以下代码，输出结果是？\n\n```cpp\nvoid f(int x) { cout << "INT"; }\nvoid f(double x) { cout << "DBL"; }\nint main() {\n    f(5);\n    f(5.0);\n    return 0;\n}\n```',
      options: ['INT INT', 'DBL DBL', 'INT DBL', 'DBL INT', '编译错误'],
      correctAnswer: 2,
      explanation: '函数重载。5 是 int 字面量匹配第一个，5.0 是 double 字面量匹配第二个。'
    },
    {
      id: 35,
      question: '阅读以下递归代码，输出结果是？\n\n```cpp\nint func(int n) {\n    if (n == 0) return 0;\n    return n + func(n - 1);\n}\nint main() { cout << func(5); }\n```',
      options: ['10', '15', '5', '0', '120'],
      correctAnswer: 1,
      explanation: '计算 $5+4+3+2+1+0 = 15$。'
    },
    {
      id: 36,
      question: '阅读以下代码，分析输出：\n\n```cpp\nint x = 1;\nint func(int a) { return a + x; }\nint main() {\n    int x = 5;\n    cout << func(x);\n}\n```',
      options: ['2', '6', '10', '5', '1'],
      correctAnswer: 1,
      explanation: 'main 中的局部变量 x 为5，作为参数传给 func 的形参 a。func 内部使用的全局变量 x 为1。返回 $5+1=6$。'
    },
    {
      id: 37,
      question: '如下代码的运行结果是？\n\n```cpp\nvoid foo(int n) {\n    if (n > 0) {\n        foo(n - 1);\n        cout << n << " ";\n    }\n}\nint main() { foo(3); }\n```',
      options: ['3 2 1', '1 2 3', '3 2 1 0', '0 1 2 3', '死循环'],
      correctAnswer: 1,
      explanation: '递归调用在 cout 之前，因此先深入到最底层 n=0（不输出），回溯时依次输出 1, 2, 3。'
    },
    {
      id: 38,
      question: '关于函数重载的匹配，以下代码会发生什么？\n\n```cpp\nvoid t(int a, float b) {}\nvoid t(float a, int b) {}\nint main() {\n    t(10, 10);\n}\n```',
      options: ['调用第一个', '调用第二个', '编译错误（二义性）', '运行时崩溃', '随机调用'],
      correctAnswer: 2,
      explanation: '两个参数都是 int，两个重载版本都需要进行一次隐式类型转换，编译器无法判断哪个更优，报二义性错误。'
    },
    {
      id: 39,
      question: '阅读嵌套调用代码：\n\n```cpp\nint sq(int x) { return x * x; }\nint add(int a, int b) { return a + b; }\nint main() {\n    cout << sq(add(2, 3));\n}\n```',
      options: ['13', '25', '10', '5', '36'],
      correctAnswer: 1,
      explanation: '先计算 add(2,3) 得到 5，再计算 sq(5) 得到 25。'
    },
    {
      id: 40,
      question: '若函数定义如下，main 中的调用结果是？\n\n```cpp\nint f(int n) {\n    return (n <= 1) ? 1 : n * f(n-1);\n}\nint main() { cout << f(4); }\n```',
      options: ['10', '24', '12', '4', '1'],
      correctAnswer: 1,
      explanation: '计算阶乘 $4! = 4 \\times 3 \\times 2 \\times 1 = 24$。'
    },
    {
      id: 41,
      question: '假设 rand() 最大值为 32767，以下代码输出值的范围？\n\n```cpp\ncout << rand() % 20 + 10;\n```',
      options: ['[0, 19]', '[10, 30]', '[10, 29]', '[10, 20]', '[11, 30]'],
      correctAnswer: 2,
      explanation: 'rand() % 20 范围是 $[0, 19]$，加上 10 后范围是 $[10, 29]$。'
    },
    {
      id: 42,
      question: '连续运行两次以下程序的输出结果是？\n\n```cpp\nint main() {\n    srand(1);\n    cout << rand();\n}\n```',
      options: ['两次输出不同的随机数', '两次输出相同的数', '第一次输出0，第二次输出1', '编译错误', '无法确定'],
      correctAnswer: 1,
      explanation: '种子固定为 1，每次运行程序生成的伪随机序列相同。'
    },
    {
      id: 43,
      question: '阅读代码，分析 x 的可能值：\n\n```cpp\nint x = rand() % 5;\nif (x == 5) cout << "Yes";\nelse cout << "No";\n```',
      options: ['一定输出 Yes', '一定输出 No', '可能输出 Yes', '编译错误', '运行时错误'],
      correctAnswer: 1,
      explanation: '% 5 的结果范围是 $[0, 4]$，永远不可能是 5。'
    },
    {
      id: 44,
      question: '如下代码输出什么？\n\n```cpp\nvoid f() {\n    static int i = 0;\n    cout << ++i << " ";\n}\nint main() { f(); f(); f(); }\n```',
      options: ['1 1 1', '0 0 0', '1 2 3', '0 1 2', '编译错误'],
      correctAnswer: 2,
      explanation: 'static 局部变量只初始化一次，后续调用会保留上次的值。'
    },
    {
      id: 45,
      question: '阅读代码，输出结果是？\n\n```cpp\nint a = 10;\nint main() {\n    int a = 20;\n    {\n        int a = 30;\n        cout << a << " ";\n    }\n    cout << a;\n}\n```',
      options: ['10 10', '30 30', '30 20', '20 20', '30 10'],
      correctAnswer: 2,
      explanation: '块作用域遮蔽。最内层 {} 输出 30，退出内层块后，main 的局部变量 a (20) 恢复可见。'
    },
    {
      id: 46,
      question: '以下代码中，变量 y 的生命周期何时结束？\n\n```cpp\nvoid func() {\n    int y = 10; \n    cout << y;\n}\n```',
      options: ['程序结束时', 'main 函数结束时', 'func 函数被调用时', 'func 函数返回时', '文件关闭时'],
      correctAnswer: 3,
      explanation: 'y 是自动变量（栈变量），函数执行完毕弹栈销毁。'
    },
    {
      id: 47,
      question: '阅读代码，输出结果是？\n\n```cpp\nint a[5] = {1, 2};\ncout << a[3];\n```',
      options: ['1', '2', '0', '垃圾值', '编译错误'],
      correctAnswer: 2,
      explanation: '聚合初始化部分元素后，其余元素自动补零。'
    },
    {
      id: 48,
      question: '以下代码会发生什么？\n\n```cpp\nint arr[] = {1, 2, 3};\ncout << sizeof(arr) / sizeof(int);\n```',
      options: ['1', '3', '4', '8', '编译错误'],
      correctAnswer: 1,
      explanation: '计算数组元素个数。数组总大小(12) / 单个int大小(4) = 3。'
    },
    {
      id: 49,
      question: '阅读代码，输出是什么？\n\n```cpp\nint a[3][2] = {{1, 2}, {3, 4}, {5, 6}};\ncout << a[1][1];\n```',
      options: ['2', '3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: '索引从0开始。a[1] 是第二行 {3, 4}，a[1][1] 是该行第二个元素 4。'
    },
    {
      id: 50,
      question: '如下代码中 p 指向哪里？\n\n```cpp\nint a[4] = {10, 20, 30, 40};\nint *p = a + 2;\ncout << *p;\n```',
      options: ['10', '20', '30', '40', '编译错误'],
      correctAnswer: 2,
      explanation: '数组名 a 是首地址，+2 偏移两个 int 大小，指向 30。'
    },
    {
      id: 51,
      question: '阅读代码，分析输出：\n\n```cpp\nint arr[5];\n// 假设 arr 内存地址是 1000 (十进制), int 占 4 字节\n// cout << arr + 1; 输出多少？\n```',
      options: ['1001', '1004', '1000', '1005', '1008'],
      correctAnswer: 1,
      explanation: '指针算术运算单位是元素类型的大小。1000 + 1 * 4 = 1004。'
    },
    {
      id: 52,
      question: '二维数组访问，代码如下：\n\n```cpp\nint m[2][3] = {1, 2, 3, 4, 5, 6};\ncout << m[0][3]; \n```',
      options: ['3', '4', '0', '编译错误', '尽管越界，但通常输出4（取决于内存布局）'],
      correctAnswer: 4,
      explanation: '这是一个典型的数组越界（Undefined Behavior）。但在连续内存布局中，m[0][3] 越过了第一行的末尾，恰好访问到了第二行的开头 4。虽然结果通常是4，但这是不安全代码。'
    },
    {
      id: 53,
      question: '遍历数组的逻辑：\n\n```cpp\nint a[] = {1, 2, 3};\nfor(int i=0; i<=3; i++) cout << a[i];\n```',
      options: ['123', '1230', '123 + 垃圾值', '编译错误', '死循环'],
      correctAnswer: 2,
      explanation: '循环条件 i<=3 导致访问下标 0, 1, 2, 3。下标 3 越界，输出未定义值。'
    },
    {
      id: 54,
      question: '二维数组部分初始化：\n\n```cpp\nint a[2][2] = {{1}, {2}};\ncout << a[0][1] << a[1][1];\n```',
      options: ['1 2', '0 0', '垃圾值 垃圾值', '1 0', '0 2'],
      correctAnswer: 1,
      explanation: '每行只初始化了第一个元素，每行剩余元素补0。'
    },
    {
      id: 55,
      question: '阅读代码：\n\n```cpp\nstring s = "123";\ns += \'4\';\ncout << s;\n```',
      options: ['123', '7 (数值相加)', '1234', '编译错误', '127'],
      correctAnswer: 2,
      explanation: 'string 重载了 +=，支持字符追加。'
    },
    {
      id: 56,
      question: 'cin 读取行为：\n\n```cpp\nstring s;\n// 输入: Hello World\ncin >> s;\ncout << s;\n```',
      options: ['Hello World', 'Hello', 'World', 'Hello\\n', '编译错误'],
      correctAnswer: 1,
      explanation: 'cin 遇空格停止。'
    },
    {
      id: 57,
      question: 'string 子串操作：\n\n```cpp\nstring s = "ABCDEF";\ncout << s.substr(2, 2);\n```',
      options: ['AB', 'BC', 'CD', 'CDE', 'DE'],
      correctAnswer: 2,
      explanation: '从索引2 (\'C\') 开始，截取长度2，得到 "CD"。'
    },
    {
      id: 58,
      question: '查找子串：\n\n```cpp\nstring s = "banana";\ncout << s.find("na");\n```',
      options: ['1', '2', '3', '4', '0'],
      correctAnswer: 1,
      explanation: '第一次出现 "na" 是在索引 2。'
    },
    {
      id: 59,
      question: '字符串比较：\n\n```cpp\nstring s1 = "apple";\nstring s2 = "banana";\ncout << (s1 > s2);\n```',
      options: ['1', '0', 'true', '编译错误', '-1'],
      correctAnswer: 1,
      explanation: '字典序比较，\'a\' 小于 \'b\'，所以 s1 > s2 为假（0）。'
    },
    {
      id: 60,
      question: 'string 修改：\n\n```cpp\nstring s = "Top";\ns[0] = \'P\';\ncout << s;\n```',
      options: ['Pop', 'Top', 'pop', '编译错误', 'P'],
      correctAnswer: 0,
      explanation: '字符串可变，直接修改索引0。'
    },
    {
      id: 61,
      question: '访问字符串最后一位：\n\n```cpp\nstring s = "Code";\ncout << s[s.size() - 1];\n```',
      options: ['d', 'e', '\\0', '越界', 'o'],
      correctAnswer: 1,
      explanation: '长度为4，最后一位下标是3，即 \'e\'。'
    },
    {
      id: 62,
      question: '指针基本操作：\n\n```cpp\nint a = 50;\nint *p = &a;\n*p = 20;\ncout << a;\n```',
      options: ['50', '20', '编译错误', '随机值', '地址值'],
      correctAnswer: 1,
      explanation: '通过指针解引用修改了原变量的值。'
    },
    {
      id: 63,
      question: '指针与数组关系：\n\n```cpp\nint a[] = {1, 2, 3};\nint *p = a;\ncout << *(p + 1);\n```',
      options: ['1', '2', '3', 'a[0]的地址', '编译错误'],
      correctAnswer: 1,
      explanation: 'p 指向 1，p+1 指向 2，解引用得到 2。'
    },
    {
      id: 64,
      question: '指针自增操作：\n\n```cpp\nint a[] = {10, 20};\nint *p = a;\ncout << *++p; \n```',
      options: ['11', '20', '10', '21', '编译错误'],
      correctAnswer: 1,
      explanation: '详细步骤解析：\n1. 前缀自增运算符 `++` 的优先级与解引用运算符 `*` 相同，结合方向为从右向左。但更直观的理解是：前缀 `++` 先生效。\n2. `++p` 的规则是“先自增，再返回”。指针 `p` 从指向 `a[0]` 自增移动到指向 `a[1]`。\n3. 然后对新地址进行解引用 `*`，得到 `a[1]` 的值，即 **20**。\n\n易错点对比：\n- `*p++`：后缀自增，先返回 `p` 当前指向的地址（指向 10），再自增指针。解引用得到 10。\n- `(*p)++`：先解引用得到 10，再对数值 10 自增，结果是 11。'
    },
    {
      id: 65,
      question: '空指针解引用：\n\n```cpp\nint *p = nullptr;\n// cout << *p; // 运行这行会发生什么？\n```',
      options: ['输出 0', '输出 null', '运行时崩溃 (Segfault)', '编译错误', '输出随机值'],
      correctAnswer: 2,
      explanation: '访问非法内存。'
    },
    {
      id: 66,
      question: '指针比较：\n\n```cpp\nint a[5];\nint *p1 = &a[1];\nint *p2 = &a[3];\ncout << (p2 > p1);\n```',
      options: ['0', '1', 'false', '编译错误', '无法确定'],
      correctAnswer: 1,
      explanation: '同一数组中，高下标元素的地址大于低下标元素的地址。'
    },
    {
      id: 67,
      question: '指针减法：\n\n```cpp\nint a[] = {1, 2, 3, 4, 5};\nint *p1 = a;\nint *p2 = a + 4;\ncout << p2 - p1;\n```',
      options: ['16', '4', '3', '5', '编译错误'],
      correctAnswer: 1,
      explanation: '指针相减返回的是两个指针之间的元素个数，不是字节数。'
    },
    {
      id: 68,
      question: '数组名作函数参数的退化：\n\n```cpp\nvoid f(int a[100]) {\n    // 这里的 a 是什么类型？\n}\n```',
      options: ['int 数组，大小100', 'int*', 'const int*', 'int&', 'int'],
      correctAnswer: 1,
      explanation: '函数参数中的数组声明自动退化为指向首元素的指针。'
    }
  ]
};

export const reviewProgrammingExercises: ExerciseData[] = [
  {
    title: '数组逆序输出（无尾随空格）',
    description: '输入一个整数 $n$ ($1 \\le n \\le 100$) 和 $n$ 个整数，按逆序输出这些整数，元素间用空格分隔，末尾无多余空格。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    \n    for(int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    for(int i = n - 1; i >= 0; i--) {\n        cout << arr[i];\n        if(i > 0) cout << " ";  // 不是第一个元素就输出空格\n    }\n    cout << endl;\n    \n    return 0;\n}`,
    hints: [
      '先读取 `n` 个整数存入数组',
      '从数组末尾开始遍历输出',
      '关键点：最后一个元素后不输出空格，可以用 `i > 0` 判断是否输出空格'
    ],
    testCases: [
      {
        input: `5\n1 2 3 4 5`,
        output: `5 4 3 2 1`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '二维数组行列输出格式',
    description: '输入行数 $r$、列数 $c$ 和一个 $r \\times c$ 的矩阵，按原矩阵格式输出，每行元素用空格分隔，行末换行。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    int matrix[100][100];\n    \n    // 输入矩阵\n    for(int i = 0; i < r; i++) {\n        for(int j = 0; j < c; j++) {\n            cin >> matrix[i][j];\n        }\n    }\n    \n    // 输出矩阵\n    for(int i = 0; i < r; i++) {\n        for(int j = 0; j < c; j++) {\n            cout << matrix[i][j];\n            if(j < c - 1) cout << " ";  // 不是行末就输出空格\n        }\n        cout << endl;\n    }\n    \n    return 0;\n}`,
    hints: [
      '使用二维数组存储矩阵',
      '双层循环：外层控制行，内层控制列',
      '每行最后一个元素后不输出空格，每行结束输出换行'
    ],
    testCases: [
      {
        input: `3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12`,
        output: `1 2 3 4\n5 6 7 8\n9 10 11 12`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '统计大小写与转换',
    description: '输入一行字符串，统计其中大写字母和小写字母的个数，并输出转换后的字符串（大写转小写、小写转大写，其他字符不变）。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    \n    int upperCount = 0, lowerCount = 0;\n    string result = "";\n    \n    for(int i = 0; i < s.length(); i++) {\n        char c = s[i];\n        if(c >= 'A' && c <= 'Z') {\n            upperCount++;\n            result += (c + 32);  // 转小写\n        } else if(c >= 'a' && c <= 'z') {\n            lowerCount++;\n            result += (c - 32);  // 转大写\n        } else {\n            result += c;  // 其他字符不变\n        }\n    }\n    \n    cout << "Upper: " << upperCount << endl;\n    cout << "Lower: " << lowerCount << endl;\n    cout << result << endl;\n    \n    return 0;\n}`,
    hints: [
      '使用 `getline` 读取整行（包含空格）',
      '遍历字符串，判断每个字符：\n   - `c >= \'A\' && c <= \'Z\'` 为大写字母，转换：`c + 32` 或 `c - \'A\' + \'a\'`\n   - `c >= \'a\' && c <= \'z\'` 为小写字母，转换：`c - 32` 或 `c - \'a\' + \'A\'`',
      'ASCII 码：大写字母比小写字母小 32'
    ],
    testCases: [
      {
        input: `Hello World 123`,
        output: `Upper: 2\nLower: 8\nhELLO wORLD 123`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '模板函数：交换与最大值',
    description: '实现模板函数 `swapT(T& a, T& b)` 交换两个变量的值，以及 `maxT(T a, T b)` 返回两者的最大值。分别用 `int`、`double`、`string` 类型测试。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nvoid swapT(T& a, T& b) {\n    T temp = a;\n    a = b;\n    b = temp;\n}\n\ntemplate <typename T>\nT maxT(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    // 测试 int\n    int i1, i2;\n    cin >> i1 >> i2;\n    int maxInt = maxT(i1, i2);\n    swapT(i1, i2);\n    cout << "After swap: " << i1 << " " << i2 << endl;\n    cout << "Max: " << maxInt << endl;\n    \n    // 测试 double\n    double d1, d2;\n    cin >> d1 >> d2;\n    double maxDouble = maxT(d1, d2);\n    swapT(d1, d2);\n    cout << "After swap: " << d1 << " " << d2 << endl;\n    cout << "Max: " << maxDouble << endl;\n    \n    // 测试 string\n    string s1, s2;\n    cin >> s1 >> s2;\n    string maxStr = maxT(s1, s2);\n    swapT(s1, s2);\n    cout << "After swap: " << s1 << " " << s2 << endl;\n    cout << "Max: " << maxStr << endl;\n    \n    return 0;\n}`,
    hints: [
      '模板函数使用 `template <typename T>` 声明',
      '`swapT` 需要引用传递才能修改原变量',
      '`maxT` 使用三目运算符或 `if` 判断返回较大值',
      '`string` 类型可以直接用 `>` 比较（字典序）'
    ],
    testCases: [
      {
        input: `5 3\n2.5 3.7\napple banana`,
        output: `After swap: 3 5\nMax: 5\nAfter swap: 3.7 2.5\nMax: 3.7\nAfter swap: banana apple\nMax: banana`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '顺序查找第一次出现位置',
    description: '输入整数 $n$、$n$ 个整数组成的数组和目标值 $x$，输出 $x$ 在数组中第一次出现的下标（从 0 开始）；如果不存在输出 -1。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, x;\n    cin >> n;\n    int arr[100];\n    \n    for(int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    cin >> x;\n    \n    int pos = -1;\n    for(int i = 0; i < n; i++) {\n        if(arr[i] == x) {\n            pos = i;\n            break;  // 找到第一次出现就退出\n        }\n    }\n    \n    cout << pos << endl;\n    \n    return 0;\n}`,
    hints: [
      '线性搜索，从头到尾遍历数组',
      '找到目标值立即返回下标并结束循环',
      '遍历完未找到则返回 -1'
    ],
    testCases: [
      {
        input: `6\n10 20 30 20 40 50\n20`,
        output: `1`,
        description: '样例 1'
      },
      {
        input: `5\n1 2 3 4 5\n10`,
        output: `-1`,
        description: '样例 2'
      }
    ]
  },
  {
    title: '生成闭区间随机数并格式输出',
    description: '输入三个整数 $a$、$b$、$k$（允许 $a > b$），生成 $k$ 个 $[\\min(a,b), \\max(a,b)]$ 区间内的随机整数，用空格分隔输出，末尾无空格。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    int a, b, k;
    cin >> a >> b >> k;
    
    // 确保 a <= b (手动交换)
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
}`,
    extraSolutions: [
      {
        label: '现代 C++ 解法 (random)',
        code: `#include <iostream>
#include <random>
using namespace std;

int main() {
    int a, b, k;
    cin >> a >> b >> k;
    
    // 确保 a <= b (手动交换)
    if(a > b) {
        int temp = a;
        a = b;
        b = temp;
    }
    
    // 使用 <random> 库
    random_device rd;  // 随机数生成器
    
    for(int i = 0; i < k; i++) {
        int num = rd() % (b - a + 1) + a;
        cout << num;
        if(i < k - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`
      }
    ],
    hints: [
      '使用 `srand(time(0))` 设置随机种子',
      '确保 $a \\le b$，若 $a > b$ 则交换',
      '生成 $[a, b]$ 的随机数：`rand() % (b - a + 1) + a`',
      '也可以使用 <random> 库中的 `random_device` 生成随机数',
      '注意最后一个数后不输出空格'
    ],
    testCases: [
      {
        input: `5 10 6`,
        output: `(随机输出，例如: 7 5 10 8 6 9)`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '求和/均值/最大最小',
    description: '输入整数 $n$ 和 $n$ 个数（可能是小数），输出它们的总和、平均值（保留 2 位小数）、最大值和最小值。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    double arr[100];\n    \n    for(int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    double sum = 0;\n    double maxVal = arr[0];\n    double minVal = arr[0];\n    \n    for(int i = 0; i < n; i++) {\n        sum += arr[i];\n        if(arr[i] > maxVal) maxVal = arr[i];\n        if(arr[i] < minVal) minVal = arr[i];\n    }\n    \n    double avg = sum / n;\n    \n    cout << fixed << setprecision(2);\n    cout << "Sum: " << sum << endl;\n    cout << "Avg: " << avg << endl;\n    cout << "Max: " << maxVal << endl;\n    cout << "Min: " << minVal << endl;\n    \n    return 0;\n}`,
    hints: [
      '使用 `double` 类型存储数据',
      '初始化 `max` 为极小值，`min` 为极大值，或者初始化为第一个元素',
      '遍历时同时累加、更新最大最小值',
      '使用 `cout.precision()` 和 `cout << fixed` 控制输出精度'
    ],
    testCases: [
      {
        input: `5\n3.5 2.1 5.8 1.2 4.7`,
        output: `Sum: 17.30\nAvg: 3.46\nMax: 5.80\nMin: 1.20`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '质数判断与计数',
    description: '输入一个正整数 $n$，输出 $1$ 到 $n$ 中质数的个数。要求使用 $\\sqrt{n}$ 优化。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\nusing namespace std;\n\nbool isPrime(int num) {\n    if(num <= 1) return false;\n    if(num == 2) return true;\n    if(num % 2 == 0) return false;  // 偶数优化\n    \n    for(int i = 3; i * i <= num; i += 2) {  // 只检查奇数\n        if(num % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    \n    int count = 0;\n    for(int i = 2; i <= n; i++) {\n        if(isPrime(i)) {\n            count++;\n        }\n    }\n    \n    cout << count << endl;\n    \n    return 0;\n}`,
    hints: [
      '质数定义：大于 1 且只能被 1 和自身整除的数',
      '判断 $n$ 是否为质数时，只需检查 $2$ 到 $\\sqrt{n}$ 的因子',
      '优化：使用 `i * i <= n` 代替 `sqrt(n)` 避免浮点运算',
      '特殊情况：1 不是质数'
    ],
    testCases: [
      {
        input: `20`,
        output: `8`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '冒泡排序（含提前结束）',
    description: '输入整数 $n$ 和 $n$ 个整数，使用冒泡排序将数组升序排序。如果某一趟遍历中没有发生交换，说明数组已经有序，提前结束排序。输出排序后的数组。',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int arr[100];\n    \n    for(int i = 0; i < n; i++) {\n        cin >> arr[i];\n    }\n    \n    // 冒泡排序（带提前结束优化）\n    for(int i = 0; i < n - 1; i++) {\n        bool swapped = false;  // 标记本轮是否有交换\n        \n        for(int j = 0; j < n - 1 - i; j++) {\n            if(arr[j] > arr[j + 1]) {\n                // 交换\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        \n        // 如果本轮没有交换，说明已经有序\n        if(!swapped) break;\n    }\n    \n    // 输出排序后的数组\n    for(int i = 0; i < n; i++) {\n        cout << arr[i];\n        if(i < n - 1) cout << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}`,
    hints: [
      '冒泡排序原理：每次将最大元素"冒泡"到末尾',
      '外层循环控制轮数（最多 $n-1$ 轮）',
      '内层循环进行相邻元素比较和交换',
      '优化：设置 `swapped` 标志位，若某轮无交换则提前结束',
      '时间复杂度：最坏 $O(n^2)$，最好（已排序）$O(n)$'
    ],
    testCases: [
      {
        input: `6\n64 34 25 12 22 11`,
        output: `11 12 22 25 34 64`,
        description: '样例 1'
      }
    ]
  },
  {
    title: '字符串字母排序',
    description: '输入一行字符串（可能包含大写字母、小写字母、数字、空格和其他字符），要求：\\n1. 提取其中所有的字母（大写和小写）\\n2. 将所有字母按照字典序排序（忽略大小写，即 \'a\' 和 \'A\' 视为相同）\\n3. 排序后，原本是大写的保持大写，原本是小写的保持小写\\n4. 输出排序后的字母序列（字母间无空格）',
    initialCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`,
    solutionCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nchar toLowerCase(char c) {\n    if (c >= 'A' && c <= 'Z') return c + 32;\n    return c;\n}\n\nbool isLetter(char c) {\n    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');\n}\n\nbool compareChar(char a, char b) {\n    char lowerA = toLowerCase(a);\n    char lowerB = toLowerCase(b);\n\n    if (lowerA != lowerB) return lowerA < lowerB;\n    return a > b;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n\n    char letters[200];\n    int cnt = 0;\n    for (int i = 0; i < (int)s.length(); i++) {\n        if (isLetter(s[i])) letters[cnt++] = s[i];\n    }\n\n    for (int i = 0; i < cnt - 1; i++) {\n        for (int j = 0; j < cnt - 1 - i; j++) {\n            if (!compareChar(letters[j], letters[j + 1])) {\n                char t = letters[j];\n                letters[j] = letters[j + 1];\n                letters[j + 1] = t;\n            }\n        }\n    }\n\n    for (int i = 0; i < cnt; i++) cout << letters[i];\n    cout << '\\n';\n    return 0;\n}`,
    hints: [
      '遍历字符串，把所有字母提取到数组中（忽略数字、空格、符号等）。',
      '使用冒泡排序/选择排序对字母数组排序（不使用 STL）。',
      '比较规则：先把字母转换成小写再比较；若小写相同（如 \'a\'/\'A\'），则小写字母排在大写字母前。',
      '输出排序后的字母序列（字母间无空格）。'
    ],
    testCases: [
      {
        input: `Hello World 123`,
        output: `deHllloorW`,
        description: '样例 1'
      },
      {
        input: `C++ Programming 2024!`,
        output: `acggimmnoPrrr`,
        description: '样例 2'
      },
      {
        input: `aAbBcC`,
        output: `AaBbCc`,
        description: '样例 3'
      }
    ]
  }
];
