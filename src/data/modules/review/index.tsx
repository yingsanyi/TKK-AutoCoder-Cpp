import React from 'react';
import { Section } from '../../../types/index';
import { SectionHeader } from '../../../components/Lesson/SectionHeader';
import { ListChecks } from 'lucide-react';
import { DescriptionRenderer } from '../../../components/Common/DescriptionRenderer';
import { reviewQuestionsQuizData, reviewProgrammingExercises } from './data';

export const reviewClassSections: Section[] = [
  {
    id: 'online-high-pass-review',
    category: '复习课', // Changed category to be separate
    title: '知识点复习',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={ListChecks} title="C++ 知识点" />
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">A. 函数与调用</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>递归函数：函数调用自身；关注终止条件与递归关系、栈深度与效率。</li>
                <li>函数重载：同名函数通过“参数列表不同”区分；返回值不同不能单独构成重载。</li>
                <li>嵌套调用（将一个函数作为另一个的实参）：把某个函数的返回值作为另一个函数调用时的参数（也可多层嵌套）；关注求值顺序、返回类型匹配与可读性。</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">B. 随机数</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>随机数范围 ([a,b])：核心是把随机结果映射到闭区间；注意种子初始化与分布均匀性问题。</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">C. 变量存储期与生命周期</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>静态变量：只初始化一次、生命周期贯穿程序运行；作用域不等于生命周期（可为局部静态/类静态等）。</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">D. 数组（默认值 + 访问）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>一维数值数组访问：下标访问、遍历访问；注意越界与数组名在表达式中的“退化”。</li>
                <li>数组默认值：是否自动置零取决于存储期/初始化方式；未初始化时可能是未定义值。</li>
                <li>二维数组访问与默认值：行列下标访问；部分初始化时其余元素的默认填充值规则；注意行列维度固定与内存布局（按行连续）。</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">E. 字符串（拼接、输入、类型对比、常用操作）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li><DescriptionRenderer text={"字符串拼接：`string` 的拼接/追加 vs C 风格字符数组的拼接；注意容量、性能与缓冲区安全。"} inline={true} /></li>
                <li><DescriptionRenderer text={"字符串输入：`cin` 与 `getline()`：`cin` 以空白分隔；`getline` 读整行；混用时注意残留换行导致读空行。"} inline={true} /></li>
                <li><DescriptionRenderer text={"`string` 与 `char[]`：`string` 更安全、自动管理长度；`char[]` 需要 `'\\0'` 结尾与手动容量管理；二者转换规则与常见坑。"} inline={true} /></li>
                <li>字符串方法：切片/子串、查找子串：子串提取（起始位置、长度、越界）；查找返回位置/未找到标记；正向/反向查找与从指定位置查找。</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">F. 指针（修改变量、与数组/二维数组关系）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>通过指针修改变量值：指针定义、取地址、解引用；参数传递中用指针实现“对外部变量生效”。</li>
                <li>指针与一维数组：数组名与首元素地址关系；指针算术与下标访问的等价性；遍历与边界控制。</li>
                <li>指针与二维数组（行指针）：指向“整行数组”的指针类型；与“指针数组（每行一个指针）”概念区分；访问规则依赖列数固定。</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={ListChecks} title="编程" />
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">A. 数组与循环输出（高频）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>创建/填充：用循环读入或生成元素；明确长度、下标从 0 开始</li>
                <li>访问与遍历：正序遍历、逆序遍历（从末尾到开头）</li>
                <li>格式处理（非常常考）</li>
              </ul>
              <ul className="list-disc list-inside text-sm ml-6 md:ml-8 pl-1 mt-1.5 space-y-1">
                <li>元素间分隔：空格/逗号/无尾随空格（最后一个元素单独处理）</li>
                <li>行与行之间：每行结束换行；最后一行是否换行按题意</li>
                <li>二维数组：双层循环；行内分隔与行末换行规则</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">B. 字符与大小写判断（基础必会）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>判断是否为大写字母、小写字母、字母（基于 ASCII 范围或字符分类函数）</li>
                <li>常见延伸：大小写转换、统计大写/小写个数、忽略大小写比较</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">C. 模板函数（泛型基础）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>用于“同一逻辑适配多种类型”（如交换、求最大值、输出数组）</li>
                <li>关注点：类型推导、参数类型一致性、可能需要显式指定模板参数</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">D. 查找（顺序/线性搜索，高频）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>在数组/字符串中从头到尾比较</li>
                <li>输出形式常见：返回下标/返回是否存在/返回第一次或最后一次出现位置</li>
                <li>易错：没找到时的返回值约定（如 -1）、重复元素处理</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">E. 随机数与区间输出（常见应用题）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li><DescriptionRenderer text={"生成 `([a,b])`：映射到闭区间；处理 `a>b` 的情况（交换或按题意）"} inline={true} /></li>
                <li>打印指定个数：循环次数控制；输出格式（分隔符/换行）</li>
                <li>注意：是否允许重复、是否需要“每次不同”（种子问题，若题目要求）</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">F. 基础数值运算：求和/统计（最常见）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>一组数的和/平均/最大最小/计数（以求和为核心扩展）</li>
                <li>易错：累加变量初始化；数据范围导致溢出（必要时用更大整型/浮点）</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">G. 数学判断：质数（高频）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>特判：小于 2 不是质数；2 是质数；偶数快速排除</li>
                <li><DescriptionRenderer text={"循环到 `sqrt(n)` 的思路（减少复杂度）"} inline={true} /></li>
                <li>常见变体：区间内质数、统计质数个数、分解质因数</li>
              </ul>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">H. 排序：冒泡（经典必考）</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-6 md:ml-8">
                <li>相邻比较交换，多轮“把最大/最小冒到末端/前端”</li>
                <li>优化点：一轮无交换则提前结束</li>
                <li>易错：循环边界（内层到 n-1-i）、升序/降序方向、稳定性概念</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  // Update categories of exercises to match the new top-level "复习课"
  // 1. Quiz Section
  {
    id: 'online-high-pass-review-quiz',
    category: '复习课',
    group: '练习题',
    // subGroup: '选择题',
    title: '选择题',
    type: 'quiz',
    quizData: reviewQuestionsQuizData
  },
  // 2. Programming Exercises Sections
  ...reviewProgrammingExercises.map((ex, index) => ({
    id: `online-high-pass-review-ex-${index + 1}`,
    category: '复习课',
    group: '练习题',
    subGroup: '编程题',
    title: `${index + 1}. ${ex.title}`,
    type: 'exercise' as const,
    exerciseData: ex
  }))
];
