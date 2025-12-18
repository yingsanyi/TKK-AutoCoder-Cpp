import React, { useState, useEffect } from 'react';
import { ExternalLink, Trophy, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { OnlineProblem } from '../../data/modules/online_high_pass_data';

interface OnlineHighPassListProps {
  problems: OnlineProblem[];
}

export const OnlineHighPassList: React.FC<OnlineHighPassListProps> = ({ problems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPage, setJumpPage] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const getTags = (p: OnlineProblem) => {
    const t = p.title;
    const tags: string[] = [];
    const add = (tag: string) => { if (!tags.includes(tag)) tags.push(tag); };
    if (/字符串|字母|字母表|重组的字符串|名字和成绩/.test(t)) add('字符串');
    if (/日期|星期|月份|纪念日|校庆日|比日期|时间|打卡时间|第几天/.test(t)) add('日期处理');
    if (/质数|因数|互质|欧拉|强质数|完全平方数/.test(t)) add('数论');
    if (/斐波那契/.test(t)) { add('模拟'); add('数学'); };
    if (/星号阵列/.test(t)) { add('数学'); add('因子'); };
    if (/乘积|总和|最大值|最大分差|数字和|几个0|几个6|0和1|整数倍/.test(t)) add('数学');
    if (/等差数列|数列/.test(t)) { add('数学'); add('数列'); };
    if (/四边形|坐标|平行四边形|长方形/.test(t)) add('几何');
    if (/韩信分兵/.test(t)) add('数论');
    if (/家长会|优秀的成绩|大佬|年龄|递增数列|乘积最大的两个数|总和最大/.test(t)) { add('数组'); add('排序'); };
    if (/输出/.test(t)) add('输出格式');
    if (/广播操/.test(t)) { add('数列'); add('模拟'); };
    if (/猜数字/.test(t)) { add('字符串'); add('模拟'); };
    if (/回文数/.test(t)) add('字符串');
    if (/总和为4|满足条件的/.test(t)) { add('枚举'); add('子集和'); };
    if (/英文字母|字母表/.test(t)) add('字符串');
    if (/21世纪/.test(t)) add('日期处理');
    if (/拆解/.test(t)) add('数学');
    if (/下雨了/.test(t)) add('模拟');
    if (/复数乘法/.test(t)) add('数学');
    if (/转专业/.test(t)) { add('哈希'); add('数组'); };
    if (tags.length === 0) add('模拟');
    return tags.slice(0, 3);
  };

  // Reset to first page when search term changes or items per page changes
  useEffect(() => {
    setCurrentPage(1);
    setJumpPage('');
  }, [searchTerm, itemsPerPage]);

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.contest.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    // Priority logic: High submission count (>= 80) comes first
    const isHighTrafficA = a.submitCount >= 80;
    const isHighTrafficB = b.submitCount >= 80;

    if (isHighTrafficA && !isHighTrafficB) return -1;
    if (!isHighTrafficA && isHighTrafficB) return 1;

    // Secondary sort: Pass rate descending
    const passRateA = parseFloat(a.passRate.replace('%', ''));
    const passRateB = parseFloat(b.passRate.replace('%', ''));
    
    return passRateB - passRateA;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the list
    const listElement = document.getElementById('problem-list-top');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setJumpPage('');
    }
  };

  const totalSubmitCount = problems.reduce((acc, p) => acc + p.submitCount, 0);
  const totalProblems = problems.length;
  const avgPassRate = (problems.reduce((acc, p) => {
    const rate = parseFloat(p.passRate.replace('%', ''));
    return acc + (isNaN(rate) ? 0 : rate);
  }, 0) / totalProblems).toFixed(2) + '%';

  return (
    <div className="space-y-6" id="problem-list-top">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">


        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">历年线上赛高通过率题目</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  共收录 {problems.length} 道题目，帮助你快速刷题
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">每页显示:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={15}>15 条</option>
                  <option value={30}>30 条</option>
                  <option value={50}>50 条</option>
                  <option value={100}>100 条</option>
                </select>
              </div>

              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索题目或比赛..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                <th className="py-3 px-4 font-semibold w-16">序号</th>
                <th className="py-3 px-4 font-semibold">ID：题目</th>
                <th className="py-3 px-4 font-semibold">所属比赛</th>
                <th className="py-3 px-4 font-semibold">知识点</th>
                <th className="py-3 px-4 font-semibold w-32">通过率 / 提交</th>
                <th className="py-3 px-4 font-semibold w-24">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentProblems.map((problem, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-400 font-mono">{indexOfFirstItem + idx + 1}</td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-200">
                    <div className="flex flex-col">
                      <span>{problem.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                    <span className="inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700">
                      {problem.contest}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {(problem.tags.length ? problem.tags : getTags(problem)).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full w-16 overflow-hidden">
                                <div 
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: problem.passRate }}
                                />
                            </div>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                {problem.passRate}
                            </span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>AC: {problem.acCount}</span>
                            <span>Submit: {problem.submitCount}</span>
                        </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <a 
                      href={problem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                    >
                      去挑战 <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
              
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    没有找到匹配的题目
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredProblems.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              显示第 <span className="font-medium text-slate-900 dark:text-slate-200">{indexOfFirstItem + 1}</span> 到 <span className="font-medium text-slate-900 dark:text-slate-200">{Math.min(indexOfLastItem, filteredProblems.length)}</span> 条，共 <span className="font-medium text-slate-900 dark:text-slate-200">{filteredProblems.length}</span> 条
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>

              <form onSubmit={handleJumpPage} className="flex items-center gap-2 ml-2 border-l border-slate-200 dark:border-slate-700 pl-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">跳至</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  className="w-12 px-2 py-1 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">页</span>
                <button
                  type="submit"
                  disabled={!jumpPage || isNaN(parseInt(jumpPage)) || parseInt(jumpPage) < 1 || parseInt(jumpPage) > totalPages}
                  className="px-2 py-1 text-sm bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
