import React from 'react';
import { Section } from '../../../../types/index';
import { FileText, Download, BookOpen, Eye } from 'lucide-react';

const gespPapers = [
  { name: 'GESP 2024年6月一级 C++ 真题与解析', file: '1723012510384160.pdf' },
  { name: 'GESP 2023年12月一级 C++ 真题与解析', file: '1703972987469856.pdf' },
  { name: 'GESP 2023年6月一级 C++ 真题与解析', file: '1687195805024288.pdf' },
  { name: 'GESP 2022年12月一级 C++ 真题与解析 (样题)', file: '1669256632598560.pdf' },
  { name: '青少年编程等级考试 2021年9月一级 C++ 真题与解析', file: '1633835940839456.pdf' },
  { name: '青少年编程等级考试 2021年6月一级 C++ 真题与解析', file: '1633835770970144.pdf' },
  { name: '青少年编程等级考试 2021年3月一级 C++ 真题与解析', file: '1633835770970144 (1).pdf' },
  { name: '青少年编程等级考试 2021年3月一级 C++ 真题与解析', file: '1621049145819168.pdf' },
  { name: '青少年编程等级考试 2020年3月一级 C++ 真题与解析', file: '1585703601307680.pdf' },
  { name: '青少年编程等级考试 2019年9月一级 C++ 真题与解析', file: '1570611155435552.pdf' },
  { name: '青少年编程等级考试 2019年6月一级 C++ 真题与解析', file: '1569361215094816.pdf' },
  { name: '青少年编程等级考试 2019年3月一级 C++ 真题与解析', file: '1553039792013344.pdf' },
  { name: '青少年编程等级考试 2018年9月一级 C++ 真题与解析', file: '1536716611518496.pdf' },
];

export const luoguGespIntroSection: Section = {
  id: 'luogu-gesp-intro',
  category: '洛谷习题解析',
  group: 'GESP',
  title: '0. GESP 认证介绍与大纲',
  type: 'lesson',
  content: (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-indigo-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          关于 GESP 认证
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          <strong>CCF 编程能力等级认证 (GESP)</strong> 由中国计算机学会 (CCF) 发起并主办，是为青少年计算机和编程学习者提供学业能力验证的平台。
          GESP 旨在提升青少年计算机和编程教育水平，推广和普及青少年计算机和编程教育。
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          认证分为 <strong>C++</strong>、<strong>Python</strong> 和 <strong>图形化编程</strong> 三个方向。
          其中 C++ 方向共分为 1-8 级，考察内容涵盖基础语法、算法与数据结构等。
        </p>
        
        <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded-lg border border-indigo-200 dark:border-slate-600 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">为什么参加 GESP？</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>权威性：由中国计算机学会主办，证书含金量高。</li>
            <li>体系化：分级明确，能够科学评估学习进度。</li>
            <li>衔接性：与 CSP-J/S 等竞赛有良好的知识体系衔接。</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">资料下载</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          点击下方按钮下载 GESP 认证大纲与详细要求文件 (PDF 格式)。
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a 
            href="/files/GESP_Outline.pdf" 
            download="GESP_Outline.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            下载 GESP 认证大纲与要求
          </a>
          <a 
            href="/files/GESP_Outline.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-slate-600 rounded-lg font-medium transition-colors shadow-sm hover:shadow hover:bg-indigo-50 dark:hover:bg-slate-600"
          >
            <Eye className="w-5 h-5" />
            在线预览大纲
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          GESP 一级真题与解析下载
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gespPapers.map((paper, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-700/50 dark:hover:bg-emerald-900/20 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  <FileText size={18} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-200" title={paper.name}>
                  {paper.name}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a 
                  href={`/files/GESP_1/${encodeURIComponent(paper.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors"
                  title="预览"
                >
                  <Eye size={16} />
                </a>
                <a 
                  href={`/files/GESP_1/${encodeURIComponent(paper.file)}`}
                  download={paper.file}
                  className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded transition-colors"
                  title="下载"
                >
                  <Download size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
