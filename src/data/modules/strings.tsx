import React from 'react';
import { Section } from '../../types/index';
import { CodeBlock } from '../../components/Common/CodeBlock';

// Helper component for visualization of char arrays
const CharMemory = ({ 
    chars, 
    label, 
    isBad = false, 
    highlights = [],
    comment
}: { 
    chars: string[], 
    label?: string, 
    isBad?: boolean, 
    highlights?: number[],
    comment?: string
}) => (
    <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex justify-between items-end mb-3">
            {label && <div className="text-sm font-bold text-slate-700">{label}</div>}
            {comment && <div className="text-xs text-slate-500 italic">{comment}</div>}
        </div>
        
        <div className="flex flex-wrap gap-1 justify-center md:justify-start">
            {chars.map((c, i) => {
                const isHighlight = highlights.includes(i);
                return (
                    <div key={i} className="flex flex-col items-center group relative">
                        {/* Index */}
                        <div className={`
                            w-10 h-10 border-2 flex items-center justify-center font-mono font-bold rounded-lg transition-all duration-300
                            ${c === '\\0' 
                                ? 'bg-slate-200 text-slate-500 border-slate-300' 
                                : c === '?' 
                                    ? 'bg-red-50 text-red-400 border-red-200 border-dashed animate-pulse' 
                                    : isHighlight
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-110 z-10' 
                                        : 'bg-white border-slate-300 text-slate-800' 
                            }
                            ${isBad && i >= 5 ? 'opacity-60' : ''}
                        `}>
                            {c}
                            {c === '\\0' && (
                                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm z-20" title="Terminator"></span>
                            )}
                        </div>
                        <span className={`text-[10px] font-mono mt-1 ${isHighlight ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                            {i}
                        </span>
                    </div>
                );
            })}
        </div>
        {isBad && (
            <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
                <span className="font-bold">⚠️ Warning:</span> No terminator, accessing beyond this point is undefined behavior!
            </div>
        )}
    </div>
);

export const stringsSections: Section[] = [
    // ... Char Intro (Lesson 1) ...
    {
        id: 'char-intro',
        category: '字符数组 & Strings',
        title: '1. 字符与 C 风格字符串',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                 <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">1.1 基石：字符 (char)</h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    在进入字符串的世界之前，我们先复习一下最小单位：<code>char</code>。<br/>
                    它占用 1 个字节，本质上是一个整数（ASCII 码）。
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <div className="flex-1">
                         <CodeBlock code="char c = 'A';" label="定义" />
                     </div>
                     <div className="flex items-center gap-4 text-slate-500 text-sm bg-slate-50 p-4 rounded-lg">
                        <div className="text-center">
                            <div className="text-xs mb-1">代码</div>
                            <div className="font-mono font-bold text-xl text-indigo-600">'A'</div>
                        </div>
                        <div>→</div>
                        <div className="text-center">
                            <div className="text-xs mb-1">内存 (ASCII)</div>
                            <div className="font-mono font-bold text-xl text-slate-800">65</div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">1.2 C 风格字符串：哨兵机制</h3>
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-6">
                     <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 text-lg">
                        🔑 核心规则：结束符 \0
                     </h4>
                     <p className="text-indigo-800 text-sm mb-2">
                        C 语言规定：字符串必须以空字符 <code>'\0'</code> (ASCII 0) 结尾。
                     </p>
                     <CharMemory 
                        chars={['H', 'e', 'l', 'l', 'o', '\\0']} 
                        label="内存布局" 
                        comment="有效长度是 5，但实际占用了 6 个字节"
                     />
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-3">常用的 3 种初始化方式：</h4>
                  <div className="space-y-4">
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <code className="text-indigo-600 font-bold">char s[] = "Hello";</code>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">推荐</span>
                        </div>
                        <p className="text-xs text-slate-500">自动补 \0，长度为 6。</p>
                     </div>
                     
                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <code className="text-slate-700 font-bold">char s[10] = "Hi";</code>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">定长</span>
                        </div>
                        <p className="text-xs text-slate-500">剩余位置自动补 \0。</p>
                     </div>

                     <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm ring-1 ring-red-100">
                        <div className="flex justify-between items-center mb-2">
                            <code className="text-slate-700 font-bold">{"char s[] = {'H','i'};"}</code>
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">危险</span>
                        </div>
                        <p className="text-xs text-slate-500">❌ 错误！没有手动加 '\0'，这只是普通字符数组，不是字符串。</p>
                     </div>
                  </div>
                </div>
            </div>
        )
    },
    
    // ... Lesson 2: Basics ...
    {
        id: 'string-basics',
        category: '字符数组 & Strings',
        title: '2. std::string 基础 (构造/容量/访问)',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                {/* 2.1 Constructors & Assignment */}
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">2.1 构造与赋值</h3>
                    <p className="text-slate-700 mb-4">
                        <code>std::string</code> 是 C++ 标准库提供的动态字符串类。
                        需包含头文件：<code>#include &lt;string&gt;</code>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">常用构造函数</h4>
                            <CodeBlock code={`string s1;             // 空串 ""
string s2("Hello");    // "Hello"
string s3(5, 'A');     // "AAAAA"
string s4 = s2;        // 拷贝构造`} />
                        </div>
                        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">赋值操作</h4>
                            <CodeBlock code={`string s;
s = "hello";           // 直接赋值
s = s2;                // 赋值另一对象
s.assign("world");     // 另一种写法`} />
                        </div>
                    </div>
                </div>

                {/* 2.2 Length & Capacity */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">2.2 长度与容量</h3>
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <div className="min-w-[120px]">
                                 <code className="text-indigo-600 font-bold bg-white px-2 py-1 rounded border">size()</code>
                             </div>
                             <div className="text-sm text-slate-700">
                                 返回字符串当前的字符个数。<code>length()</code> 与其功能完全相同。<br/>
                                 <span className="text-slate-500 text-xs mt-1 block">示例: string s="abc"; s.size() 为 3。</span>
                             </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <div className="min-w-[120px]">
                                 <code className="text-indigo-600 font-bold bg-white px-2 py-1 rounded border">empty()</code>
                             </div>
                             <div className="text-sm text-slate-700">
                                 判断字符串是否为空。推荐使用，比 <code>s.size() == 0</code> 语义更清晰。
                             </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <div className="min-w-[120px]">
                                 <code className="text-indigo-600 font-bold bg-white px-2 py-1 rounded border">resize(n)</code>
                             </div>
                             <div className="text-sm text-slate-700">
                                 调整字符串长度。如果变长了，默认补 <code>\0</code> (或指定字符)；如果变短了，则截断。
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <h4 className="text-sm font-bold text-amber-800 mb-2">容量控制 (了解即可)</h4>
                        <p className="text-xs text-amber-700 mb-2">
                           <code>capacity()</code> 返回当前分配的内存大小（通常 &gt;= size）。<br/>
                           <code>reserve(n)</code> 可以预分配内存，避免频繁扩容，提高性能。
                        </p>
                    </div>
                </div>

                {/* 2.3 Access */}
                <div className="border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">2.3 访问字符</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-slate-800">1. 下标 []</h4>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">最常用</span>
                            </div>
                            <CodeBlock code={`string s = "hello";
char c = s[1];  // 'e'
s[0] = 'H';     // "Hello"`} />
                            <p className="text-xs text-slate-500 mt-2">注意：不做越界检查，越界是未定义行为。</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-slate-800">2. at() 方法</h4>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">更安全</span>
                            </div>
                            <CodeBlock code={`try {
    char c = s.at(100);
} catch (out_of_range &e) {
    // 捕获越界异常
}`} />
                            <p className="text-xs text-slate-500 mt-2">越界时会抛出异常，适合不确定索引范围时使用。</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // ... Lesson 3: Modification ...
    {
        id: 'string-ops',
        category: '字符数组 & Strings',
        title: '3. std::string 修改 (拼接/插入/删除)',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                {/* 3.1 Append */}
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">3.1 拼接与追加</h3>
                   <CodeBlock code={`string s = "Hello";
s += " World";      // 使用运算符 +=
s.append("!!!");    // 使用 append 方法
s.push_back('A');   // 追加单个字符`} />
                   <p className="text-sm text-slate-600 mt-4">
                       <code>+=</code> 最直观，<code>append</code> 功能更多（如追加子串），<code>push_back</code> 专用于字符。
                   </p>
                </div>

                {/* 3.2 Insert/Erase/Replace */}
                <div className="border-t border-slate-200 pt-8">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">3.2 插入、删除与替换 (进阶)</h3>
                   <div className="space-y-6">
                       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                           <h4 className="font-bold text-blue-700 mb-2 ml-2">插入 insert(pos, str)</h4>
                           <CodeBlock code={`string s = "12345";
s.insert(2, "AB"); // 在下标2之前插入
// 结果: "12AB345"`} />
                       </div>

                       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                           <h4 className="font-bold text-red-700 mb-2 ml-2">删除 erase(pos, len)</h4>
                           <CodeBlock code={`string s = "12AB345";
s.erase(2, 2); // 从下标2开始删2个
// 结果: "12345"`} />
                       </div>

                       <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                           <h4 className="font-bold text-purple-700 mb-2 ml-2">替换 replace(pos, len, str)</h4>
                           <CodeBlock code={`string s = "I love Java";
s.replace(7, 4, "C++"); // 把 "Java" 换成 "C++"
// 结果: "I love C++"`} />
                       </div>
                   </div>
                </div>

                {/* 3.3 IO */}
                <div className="border-t border-slate-200 pt-8">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">3.3 输入输出</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                         <h4 className="font-bold text-slate-800 mb-2">cin &gt;&gt; s</h4>
                         <p className="text-sm text-slate-600 mb-2">
                             读取直到遇到空白符（空格、换行、Tab）。<br/>
                             适合读取单个单词。
                         </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                         <h4 className="font-bold text-slate-800 mb-2">getline(cin, s)</h4>
                         <p className="text-sm text-slate-600 mb-2">
                             读取直到遇到换行符。<br/>
                             适合读取包含空格的整行句子。
                         </p>
                      </div>
                   </div>
                   <div className="mt-4">
                       <CodeBlock code={`string s;
// 输入 "Hello World"
cin >> s;           // s = "Hello"
getline(cin, s);    // s = "Hello World"`} />
                   </div>
                </div>
            </div>
        )
    },

    // ... Lesson 4: Find ...
    {
        id: 'string-adv',
        category: '字符数组 & Strings',
        title: '4. std::string 查找与子串 (find/substr)',
        type: 'lesson',
        content: (
            <div className="space-y-10">
                {/* 4.1 Substr */}
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">4.1 截取子串 (substr)</h3>
                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <div className="mb-4 text-sm text-slate-600">
                           <code>s.substr(pos, len)</code>：从下标 pos 开始，取 len 个字符。<br/>
                           如果省略 len，默认取到结尾。
                       </div>
                       <CharMemory 
                            chars={['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']} 
                            highlights={[6, 7, 8, 9, 10]} 
                            label="示例：s.substr(6)"
                            comment="从下标 6 开始，一直取到末尾"
                       />
                       <CodeBlock code={`string s = "Hello World";
string s1 = s.substr(0, 5); // "Hello"
string s2 = s.substr(6);    // "World"`} />
                   </div>
                </div>

                {/* 4.2 Find */}
                <div className="border-t border-slate-200 pt-8">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">4.2 查找 (find)</h3>
                   <p className="text-slate-700 mb-4">
                       <code>find()</code> 返回子串或字符第一次出现的位置（下标）。
                   </p>
                   <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
                      <h4 className="font-bold text-indigo-900 mb-2">string::npos</h4>
                      <p className="text-sm text-indigo-800">
                          如果找不到，函数会返回 <code>string::npos</code>。<br/>
                          这是一个特殊常量（通常是 -1 的无符号表示），表示“没有位置”。
                      </p>
                   </div>
                   <CodeBlock code={`string s = "test@gmail.com";
size_t pos = s.find('@');

if (pos != string::npos) {
    cout << "找到了，下标是：" << pos << endl;
} else {
    cout << "没找到" << endl;
}`} />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                       <div className="text-xs bg-slate-100 p-3 rounded border border-slate-200">
                           <strong className="block mb-1 text-slate-800">rfind(str)</strong>
                           从右往左查找（最后一次出现的位置）。
                       </div>
                       <div className="text-xs bg-slate-100 p-3 rounded border border-slate-200">
                           <strong className="block mb-1 text-slate-800">find_first_of(str)</strong>
                           查找 str 中任意一个字符出现的位置。
                       </div>
                   </div>
                </div>

                {/* 4.3 Conversion */}
                <div className="border-t border-slate-200 pt-8">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">4.3 与 C 风格互转</h3>
                   <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                       <div className="flex items-center gap-3 mb-3">
                           <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded font-mono">string</span>
                           <span>➡️</span>
                           <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded font-mono">const char*</span>
                       </div>
                       <CodeBlock code={`string s = "Hello";
const char *p = s.c_str(); // ✅ 正确
printf("%s", s.c_str());   // 传给 C 函数`} />
                       <p className="text-xs text-red-500 mt-2 font-bold">
                           ⚠️ 注意：c_str() 返回的指针是临时的，千万不要保存它用于后续操作，除非你拷贝一份。
                       </p>
                   </div>
                </div>
            </div>
        )
    },
    
    // ... Exercises (Keep existing) ...
    {
        id: 'ex-str-1',
        category: '字符数组 & Strings',
        group: '课堂练习',
        title: '练习 1: 简单的问候',
        type: 'exercise',
        exerciseData: {
            title: '读入名字并输出',
            description: `1. 使用 \`std::string\`
2. 读入一个名字（不含空格，用 \`cin\` 即可）
3. 输出格式为：\`Hello, <名字>!\``,
            initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "请输入你的名字：";
    
    // 在这里写输入和输出代码
    
    return 0;
}`,
            hints: ["`cin >> name;`", "`cout << \"Hello, \" << name << \"!\";`"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "请输入你的名字：";
    cin >> name;
    cout << "Hello, " << name << "!" << endl;
    return 0;
}`
        }
    },
    {
        id: 'ex-str-2',
        category: '字符数组 & Strings',
        group: '课堂练习',
        title: '练习 2: 长度与逐字符',
        type: 'exercise',
        exerciseData: {
            title: '统计长度并逐行打印',
            description: `1. 用 \`getline\` 读入一整行
2. 输出这行的长度
3. 逐行打印每个字符`,
            initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    // 1. 读入
    // 2. 输出长度
    // 3. 循环输出
    return 0;
}`,
            hints: ["`getline(cin, line)`", "`line.size()`", "`for(char c : line)`"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    cout << "Length: " << line.size() << endl;
    for(char c : line) {
        cout << c << endl;
    }
    return 0;
}`
        }
    },
    {
        id: 'ex-str-3',
        category: '字符数组 & Strings',
        group: '课堂练习',
        title: '练习 3: 回文串判断',
        type: 'exercise',
        exerciseData: {
            title: '判断回文串',
            description: `输入不含空格字符串，判断是否回文 (YES/NO)。
例如 "\`abba\`" 是，"\`abc\`" 不是。`,
            initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // 判断逻辑
    return 0;
}`,
            hints: ["倒序拼成新串对比", "或者双指针"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    string rev = "";
    for(int i=s.size()-1; i>=0; --i) rev += s[i];
    
    if(s == rev) cout << "YES" << endl;
    else cout << "NO" << endl;
    return 0;
}`
        }
    },
    {
        id: 'ex-str-4',
        category: '字符数组 & Strings',
        group: '课堂练习',
        title: '练习 4: 字符统计',
        type: 'exercise',
        exerciseData: {
            title: '统计字符出现次数',
            description: `1. 读入一行字符串
2. 读入一个目标字符
3. 输出该字符出现次数`,
            initialCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    // ...
    return 0;
}`,
            hints: ["`getline`", "遍历对比"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    char t;
    cin >> t;
    int cnt = 0;
    for(char c : s) if(c == t) cnt++;
    cout << cnt << endl;
    return 0;
}`
        }
    },
    {
        id: 'ex-str-5',
        category: '字符数组 & Strings',
        group: '课堂练习',
        title: '练习 5 (进阶): 单词倒排',
        type: 'exercise',
        exerciseData: {
            title: '单词倒排 (数组版)',
            description: `输入 "\`I love C++\`"，输出 "\`C++ love I\`"。
要求使用 \`string\` 数组，不使用 \`vector\`。`,
            initialCode: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string line;
    getline(cin, line);
    string words[100];
    int count = 0;
    // 拆分逻辑
    // 倒序输出
    return 0;
}`,
            hints: ["遇到空格存入数组", "最后倒序遍历数组"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    string words[100];
    int count = 0;
    string temp = "";
    
    for(int i=0; i<=line.size(); ++i) {
        if(i < line.size() && line[i] != ' ') {
            temp += line[i];
        } else {
            if(!temp.empty()) {
                words[count++] = temp;
                temp = "";
            }
        }
    }
    
    for(int i=count-1; i>=0; --i) {
        cout << words[i] << (i>0 ? " " : "");
    }
    cout << endl;
    return 0;
}`
        }
    },

    // ... Quiz (Unit Test) ...
    {
        id: 'quiz-strings',
        category: '字符数组 & Strings',
        group: '阶段测试 (Unit Test)',
        title: '第一部分：基础选择题',
        type: 'quiz',
        quizData: {
            title: '字符串全能测试',
            description: '本测试包含 20 道精选题目，重点考察 `std::string` 的常用函数、内存管理及与 C 风格字符串的区别。',
            questions: [
                // 1-11 same as before, simplified slightly or kept
                { id: 1, question: '下列哪行定义是合法的标准 C 风格字符串？', options: ["`char s[]={'a','b'};`", "`char s[3]=\"abc\";`", "`char s[4]=\"abc\";`", "`string s='a';`", "`char s=\"a\";`"], correctAnswer: 2, explanation: "【选项详解】\nA: 缺 `\\0`。\nB: `\"abc\"` 需 4 字节，`s[3]` 不够。\nC: 正确。\nD: 符号反了。\nE: 类型不匹配。" },
                { id: 2, question: '`char s[10]="Hi";` `s[5]` 的值？', options: ["`'i'`", "空格", "`'\\0'`", "垃圾值", "越界"], correctAnswer: 2, explanation: "【选项详解】\n初始化后未使用的部分自动补 `\\0`。" },
                { id: 3, question: '`std::string` 的优势？', options: ["更快", "无内存占用", "自动管理内存/防越界", "无需头文件", "可存图片"], correctAnswer: 2, explanation: "【选项详解】\n自动扩容和内存管理是最大优势。" },
                { id: 4, question: '读取带空格的行？', options: ["`cin >> s;`", "`getline(cin, s);`", "`cin.get(s);`", "`scanf`", "`getchar`"], correctAnswer: 1, explanation: "【选项详解】\n`getline` 是读取整行的标准做法。" },
                { id: 5, question: '`string s="A";` 变 `"AB"`？', options: ["`s+='B'`", "`s+=\"B\"`", "`s.push_back('B')`", "`s.append(\"B\")`", "以上都对"], correctAnswer: 4, explanation: "【选项详解】\n`std::string` 提供了多种追加方式，全部合法。" },
                { id: 6, question: '`size()` vs `length()`？', options: ["`size`是字节, `length`是字符", "完全一样", "`size`兼容STL, `length`习惯", "`length`更快", "`size`含`\\0`"], correctAnswer: 1, explanation: "【选项详解】\n功能完全一样，`size()` 是为了兼容 STL 容器接口规范。" },
                { id: 7, question: '`char s[5]="Hello";` 结果？', options: ["正常", "扩容", "越界/危险", "截断", "忽略"], correctAnswer: 2, explanation: "【选项详解】\n需要 6 字节，`s[5]` 不够，发生缓冲区溢出。" },
                { id: 8, question: '比较 C 串内容？', options: ["`==`", "`strcmp`", "`=`", "`sizeof`", "`length`"], correctAnswer: 1, explanation: "【选项详解】\n`==` 比较地址，`strcmp` 比较内容。" },
                { id: 9, question: '`string s="abc";` `s[10]`？', options: ["空格", "0", "异常", "未定义行为", "扩容"], correctAnswer: 3, explanation: "【选项详解】\n`[]` 不检查越界，`at()` 才会抛异常。" },
                { id: 10, question: '`string` 转 `const char*`？', options: ["`(char*)s`", "`s.c_str()`", "`&s`", "`*s`", "`s.data`"], correctAnswer: 1, explanation: "【选项详解】\n`c_str()` 是标准转换函数。" },
                { id: 11, question: '`char s[]="abc";` `sizeof` vs `strlen`？', options: ["3,3", "4,3", "4,4", "3,4", "8,3"], correctAnswer: 1, explanation: "【选项详解】\n`sizeof` 含 `\\0` (4)，`strlen` 不含 (3)。" },

                // Refined Questions 12-20 based on new content
                {
                    id: 12,
                    question: '`string s = "ABCDE";` `string sub = s.substr(1, 3);` `sub` 是？',
                    options: ["ABC", "BCD", "CDE", "BC", "B"],
                    correctAnswer: 1,
                    explanation: "【选项详解】\n`substr(pos, len)`：从下标 1 ('B') 开始，取 3 个字符 -> \"BCD\"。\nA 是 (0,3)，C 是 (2,3)。"
                },
                {
                    id: 13,
                    question: '关于 `\\0`，错误的是？',
                    options: ["`string.size()` 包含 `\\0`", "C串必须以 `\\0` 结尾", "`\\0` ASCII 为 0", "无 `\\0` 打印乱码", "`\"a\"` 占 2 字节"],
                    correctAnswer: 0,
                    explanation: "【选项详解】\nA 错：`std::string.size()` 返回有效字符数，不包含结尾的隐式空字符。"
                },
                {
                    id: 14,
                    question: '`string s;` `s.empty()` 为 true 表示？',
                    options: ["全是空格", "全是 `\\0`", "长度为 0", "未初始化", "内存失败"],
                    correctAnswer: 2,
                    explanation: "【选项详解】\n`empty()` 等价于 `size() == 0`。空格也是字符，长度不为 0。"
                },
                {
                    id: 15,
                    question: '`void f(char s[])` 中 `s` 的类型？',
                    options: ["`char`", "`char&`", "`char*`", "`string`", "`char[100]`"],
                    correctAnswer: 2,
                    explanation: "【选项详解】\n数组参数退化为指针 `char*`。"
                },
                {
                    id: 16,
                    question: '`string s="Hello";` `s.find(\'z\')` 返回？',
                    options: ["-1", "0", "`nullptr`", "`string::npos`", "异常"],
                    correctAnswer: 3,
                    explanation: "【选项详解】\n标准规定找不到时返回 `string::npos` (通常是无符号最大整数)。"
                },
                {
                    id: 17,
                    question: '将字符 `c` (\'a\') 转大写 (\'A\') 的正确算式？',
                    options: ["`c+32`", "`c-32`", "`c-'0'`", "`c*2`", "`32-c`"],
                    correctAnswer: 1,
                    explanation: "【选项详解】\n`'a'`(97) > `'A'`(65)，所以小转大要减去差值 32。"
                },
                {
                    id: 18,
                    question: '`string s="123";` `s.insert(0, "A");` 结果？',
                    options: ["123A", "A123", "1A23", "A", "Error"],
                    correctAnswer: 1,
                    explanation: "【选项详解】\n`insert(0, ...)` 在下标 0 之前插入，即最前面。"
                },
                {
                    id: 19,
                    question: '`getline(cin, s)` 如何处理换行符？',
                    options: ["留在缓冲区", "读取并丢弃", "存入 `s`", "不处理", "转为 `\\0`"],
                    correctAnswer: 1,
                    explanation: "【选项详解】\n`getline` 读取并丢弃换行符，而 `cin >>` 通常会留下换行符。"
                },
                {
                    id: 20,
                    question: '`s="A"; s+="B"; s.push_back(\'C\'); s.append("D");`',
                    options: ["ABCD", "DCBA", "Error", "BCD", "A B C D"],
                    correctAnswer: 0,
                    explanation: "【选项详解】\n依次追加，顺序为 A -> AB -> ABC -> ABCD。"
                }
            ]
        }
    },
    // ... Programming Exercises (Same as before) ...
    {
        id: 'ex-str-prog-1',
        category: '字符数组 & Strings',
        group: '阶段测试 (Unit Test)',
        title: '第二部分：编程题 1 (字符统计)',
        type: 'exercise',
        exerciseData: {
            title: '统计字符出现次数',
            description: '读入一行字符串和一个字符，统计该字符出现次数。',
            initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 请实现
    return 0;
}`,
            hints: ["`getline`读行", "遍历统计"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    char ch;
    cin >> ch;
    int cnt = 0;
    for (char c : s) if (c == ch) cnt++;
    cout << "Count = " << cnt << endl;
    return 0;
}`
        }
    },
    {
        id: 'ex-str-prog-2',
        category: '字符数组 & Strings',
        group: '阶段测试 (Unit Test)',
        title: '第二部分：编程题 2 (回文串)',
        type: 'exercise',
        exerciseData: {
            title: '判断回文串',
            description: '输入不含空格字符串，判断是否回文 (YES/NO)。',
            initialCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    // ...
    return 0;
}`,
            hints: ["双指针法"],
            solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int l=0, r=s.size()-1;
    bool ok=true;
    while(l<r) {
        if(s[l]!=s[r]) { ok=false; break; }
        l++; r--;
    }
    cout << (ok ? "YES" : "NO") << endl;
    return 0;
}`
        }
    },
    {
        id: 'ex-str-prog-3',
        category: '字符数组 & Strings',
        group: '阶段测试 (Unit Test)',
        title: '第二部分：编程题 3 (自定义strcat)',
        type: 'exercise',
        exerciseData: {
            title: '用字符数组实现 strcat',
            description: '实现 `void my_strcat(char dest[], const char src[])`',
            initialCode: `#include <iostream>
using namespace std;

void my_strcat(char dest[], const char src[]) {
    // TODO
}

int main() {
    char s1[100] = "Hello";
    char s2[] = " World";
    my_strcat(s1, s2);
    cout << s1 << endl;
    return 0;
}`,
            hints: ["找到 dest 结尾", "复制 src"],
            solutionCode: `#include <iostream>
using namespace std;

void my_strcat(char dest[], const char src[]) {
    int i=0, j=0;
    while(dest[i]!='\\0') i++;
    while(src[j]!='\\0') dest[i++] = src[j++];
    dest[i] = '\\0';
}

int main() {
    char s1[100] = "Hello";
    char s2[] = " World";
    my_strcat(s1, s2);
    cout << s1 << endl;
    return 0;
}`
        }
    }
];