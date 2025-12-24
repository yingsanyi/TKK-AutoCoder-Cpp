import { QuizData, ExerciseData, QuizQuestion, TestCase } from '../types';

// Helper to format inline code using heuristics
const formatInlineCode = (text: string) => {
  if (!text) return text;
  
  // 0. Pre-process: Wrap specific unprotected LaTeX patterns in $...$
  // Heuristic for (\sqrt{n}) -> ($\sqrt{n}$)
  let processed = text.replace(/\((\\sqrt\{[^}]+\})\)/g, '($$$1$$)');
  
  // 1. Split by $...$ to protect math content
  // Regex matches $...$ blocks.
  const parts = processed.split(/(\$[^$]+\$)/g);
  
  const formattedParts = parts.map((part, index) => {
      // If index is odd, it's a captured group (the math block)
      // Check if it starts and ends with $ just to be sure
      if (part.startsWith('$') && part.endsWith('$')) {
          return part;
      }
      
      // Apply heuristics to non-math text
      let res = part;
      
      // 1. Comparison expressions: n==0, n<=1, i<n, etc.
      res = res.replace(/(?<!`)\b([a-zA-Z0-9_]+)\s*(==|<=|>=|!=|<|>)\s*([a-zA-Z0-9_]+)\b(?!`)/g, '`$1 $2 $3`');
      
      // 2. Function calls: f(n), g(n-2), main()
      // Avoid matching if it looks like Chinese text or normal parens
      res = res.replace(/(?<!`)\b([a-zA-Z_][a-zA-Z0-9_]*\([a-zA-Z0-9_,\s\+\-\*\/]*\))\b(?!`)/g, '`$1`');
      
      // 3. Keywords
      res = res.replace(/(?<!`)\b(return|int|void|double|float|char|bool|if|else|for|while|using|namespace|std|cout|cin|endl)\b(?!`)/g, '`$1`');

      return res;
  });

  return formattedParts.join('');
};

const findFencedCodeBlock = (text: string, fromIndex: number): { code: string; endIndex: number } | null => {
  const openIdx = text.indexOf('```', fromIndex);
  if (openIdx === -1) return null;
  const nlAfterOpen = text.indexOf('\n', openIdx + 3);
  if (nlAfterOpen === -1) return null;
  const closeIdx = text.indexOf('```', nlAfterOpen + 1);
  if (closeIdx === -1) return null;
  const code = text.slice(nlAfterOpen + 1, closeIdx);
  return { code, endIndex: closeIdx + 3 };
};

export const parseProgrammingMarkdown = (markdown: string): ExerciseData[] => {
  const parts = markdown.split(/^##\s+/m);
  if (parts.length <= 1) return [];

  const exercises: ExerciseData[] = [];

  for (let i = 1; i < parts.length; i++) {
    const section = `## ${parts[i]}`.trim();
    if (!section) continue;

    const lines = section.split('\n');
    const headerLine = (lines[0] ?? '').trim();
    const headerMatch = headerLine.match(/^##\s*(\d+)\.\s*(.+?)\s*$/);
    if (!headerMatch) continue;
    const questionNo = parseInt(headerMatch[1], 10);
    if (questionNo === 6) continue;
    const title = formatInlineCode(headerMatch[2].trim());

    const body = lines.slice(1).join('\n');

    let solutionCode = '';
    const answerLabelIdx = body.search(/\*\*答案：\*\*/);
    if (answerLabelIdx !== -1) {
      const block = findFencedCodeBlock(body, answerLabelIdx);
      if (block) {
        solutionCode = block.code.trim();
      }
    }

    const bodyWithoutAnswer = answerLabelIdx !== -1 ? body.slice(0, answerLabelIdx).trim() : body.trim();

    const analysisLabel = '**解析：**';
    const analysisLabelIdx = bodyWithoutAnswer.indexOf(analysisLabel);
    const analysisText =
      analysisLabelIdx !== -1 ? bodyWithoutAnswer.slice(analysisLabelIdx + analysisLabel.length).trim() : '';

    const hints: string[] = [];
    if (analysisText) {
      const rawLines = analysisText.split('\n');
      for (const line of rawLines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const numbered = trimmed.match(/^\d+\.\s*(.+)$/);
        if (numbered) {
          hints.push(formatInlineCode(numbered[1].trim()));
          continue;
        }
        const dashed = trimmed.match(/^-\s*(.+)$/);
        if (dashed) {
          hints.push(formatInlineCode(dashed[1].trim()));
        }
      }
    }

    const descriptionSource = analysisLabelIdx !== -1 ? bodyWithoutAnswer.slice(0, analysisLabelIdx).trim() : bodyWithoutAnswer.trim();

    const testCases: TestCase[] = [];
    let cursor = 0;
    let caseNo = 1;
    while (cursor < bodyWithoutAnswer.length) {
      const inputLabelMatch = bodyWithoutAnswer.slice(cursor).match(/\*\*输入样例[^*]*\*\*[:：]?\s*/);
      if (!inputLabelMatch || inputLabelMatch.index === undefined) break;
      const inputLabelAbs = cursor + inputLabelMatch.index;
      const inputBlock = findFencedCodeBlock(bodyWithoutAnswer, inputLabelAbs + inputLabelMatch[0].length);
      if (!inputBlock) break;

      cursor = inputBlock.endIndex;

      let output: string | undefined = undefined;
      const outputLabelMatch = bodyWithoutAnswer.slice(cursor).match(/\*\*输出样例[^*]*\*\*[:：]?\s*/);
      if (outputLabelMatch && outputLabelMatch.index !== undefined) {
        const outputLabelAbs = cursor + outputLabelMatch.index;
        const outputBlock = findFencedCodeBlock(bodyWithoutAnswer, outputLabelAbs + outputLabelMatch[0].length);
        if (outputBlock) {
          output = outputBlock.code.trim();
          cursor = outputBlock.endIndex;
        }
      }

      testCases.push({
        input: inputBlock.code.trim(),
        output,
        description: `样例 ${caseNo++}`
      });
    }

    const initialCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n`;

    exercises.push({
      title,
      description: formatInlineCode(descriptionSource.replace(/\[ref:.*?\]/g, '').trim()),
      initialCode,
      solutionCode,
      hints,
      testCases: testCases.length > 0 ? testCases : undefined
    });
  }

  return exercises;
};

export const parseReviewMarkdown = (markdown: string): { quizData: QuizData, exercises: ExerciseData[] } => {
  const lines = markdown.split('\n');
  const sections = markdown.split(/^---$/m);

  let currentSectionType: 'quiz' | 'exercise' | null = null;
  const quizQuestions: QuizQuestion[] = [];
  const exercises: ExerciseData[] = [];
  
  // Basic title detection for the Quiz section
  let quizTitle = "选择题";
  let quizDesc = "";

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    let contentToParse = trimmed;

    // Check for section headers
    // Use multiline match or just check inclusion
    if (trimmed.match(/(?:^|\n)(一、|第一部分：).*选择题/)) {
      currentSectionType = 'quiz';
      // Extract description if any
      const descMatch = trimmed.match(/（(.*?)）/);
      if (descMatch) quizDesc = descMatch[1];
      
      // Remove the header line and everything before it in this section
      contentToParse = contentToParse.replace(/^[\s\S]*?(一、|第一部分：).*选择题.*$/m, '').trim();
    }
    
    if (trimmed.match(/(?:^|\n)(二、|第二部分：).*编程题/)) {
      currentSectionType = 'exercise';
      contentToParse = contentToParse.replace(/^[\s\S]*?(二、|第二部分：).*编程题.*$/m, '').trim();
    }

    if (!contentToParse) continue;

    if (currentSectionType === 'quiz') {
      // Split by question start (Number + dot)
      // Regex: /(?:^|\n)(\d+\..*?)(?=\n\d+\.|$)/gs
      // But split is better.
      const questionBlocks = contentToParse.split(/(?:^|\n)(?=\d+\.\s)/).filter(b => b.trim());

      for (const block of questionBlocks) {
          if (block.includes('答案：')) {
            const lines = block.trim().split('\n');
            const titleLine = lines[0].trim();
            const idMatch = titleLine.match(/^(\d+(\.\d+)?)\s+(.*)/);
            let idStr = "0";
            let questionText = titleLine;
            
            if (idMatch) {
                idStr = idMatch[1];
                questionText = idMatch[3];
            } else {
                // If regex didn't match, maybe it starts with number but format is slightly different
                // or just strip leading number and dot/space
                questionText = titleLine.replace(/^\d+(\.\d+)?\s*\.?\s*/, '');
            }

            const allAnswerIndices = lines.map((l, i) => l.trim().startsWith('答案：') ? i : -1).filter(i => i !== -1);
            
            if (allAnswerIndices.length === 0) continue;

            const firstAnswerIdx = allAnswerIndices[0];
            const lastAnswerIdx = allAnswerIndices[allAnswerIndices.length - 1];

            const explanationIdx = lines.findIndex(l => l.trim().startsWith('解析：'));
            let explanation = "";
            if (explanationIdx !== -1) {
                explanation = lines.slice(explanationIdx).join('\n').replace(/解析：/g, '**解析：**').replace(/答案：/g, '\n**修正答案：**').replace(/\[ref:.*?\]/g, '').trim();
                explanation = explanation.replace(/^\*\*解析：\*\*/, '').trim();
            }

            const answerLine = lines[lastAnswerIdx];
            const correctAnswer = answerLine.replace('答案：', '').replace(/\[ref:.*?\]/g, '').trim();

            let contentEndIdx = firstAnswerIdx;
            for (let i = 1; i < firstAnswerIdx; i++) {
                if (lines[i].trim().match(/^[A-E]\.\s/)) {
                    contentEndIdx = i;
                    break;
                }
            }

            const contentLines = lines.slice(1, contentEndIdx);
            // Filter out standalone "C++" or "c++" line at the beginning
            if (contentLines.length > 0 && contentLines[0].trim().toLowerCase() === 'c++') {
                contentLines.shift();
            }
            
            let codeBlock = contentLines.join('\n');
            
            if (codeBlock.trim() && !codeBlock.trim().startsWith('```')) {
                codeBlock = `\`\`\`cpp\n${codeBlock}\n\`\`\``;
            }

            const optionsLines = lines.slice(contentEndIdx, firstAnswerIdx).join(' ');
            const optionsParts = optionsLines.split(/(?:^|\s+)([A-E])\.\s+/).filter(p => p.trim());
            const options: string[] = [];
            
            for (let i = 0; i < optionsParts.length; i += 2) {
                if (i + 1 < optionsParts.length) {
                    const label = optionsParts[i];
                    const content = optionsParts[i+1];
                    options.push(`${label}. ${content.trim()}`);
                }
            }
            
            if (options.length === 0 && optionsLines.trim()) {
                options.push(optionsLines.trim());
            }

            quizQuestions.push({
                id: parseFloat(idStr),
                question: formatInlineCode(questionText) + `\n\n${codeBlock}`,
                options: options.length > 0 ? options : ["See description"],
                correctAnswer: correctAnswer,
                explanation: formatInlineCode(explanation)
            });
          }
      }
    } else if (currentSectionType === 'exercise') {
      const exerciseBlocks = contentToParse.split(/(?:^|\n)(?=\d+\.\s)/).filter(b => b.trim());

      for (const block of exerciseBlocks) {
          const lines = block.trim().split('\n');
          const titleLine = lines[0].trim();
          
          if (!titleLine.match(/^\d+\./)) continue;
          
          let cleanTitle = titleLine.replace(/^\d+\.\s*/, '').replace(/\[ref:.*?\]/g, '').trim();
          
          if (cleanTitle.includes('数组求和与平均值') || cleanTitle.includes('统计字符串中的数字个数')) {
             // continue; // Re-enable filter if needed, but logic below handles it
          }

          cleanTitle = formatInlineCode(cleanTitle);

          let description = "";
          let solutionCode = "";
          
          const inputIdx = lines.findIndex(l => l.trim().startsWith('输入：'));
          const outputIdx = lines.findIndex(l => l.trim().startsWith('输出：'));
          const codeIdx = lines.findIndex(l => l.trim().startsWith('参考代码：'));
          const explainIdx = lines.findIndex(l => l.trim().startsWith('解释：'));
          
          // NEW LOGIC FOR DOCS 2
          const descIdx = lines.findIndex(l => l.trim().startsWith('题目：'));
          const parseIdx = lines.findIndex(l => l.trim().startsWith('解析：'));
          const cppIdx = lines.findIndex(l => l.trim() === 'C++' || l.trim().startsWith('```cpp'));

          if (descIdx !== -1) {
              const endDesc = parseIdx !== -1 ? parseIdx : (cppIdx !== -1 ? cppIdx : lines.length);
              description = lines.slice(descIdx, endDesc).join('\n').replace('题目：', '').trim();
              
              if (parseIdx !== -1) {
                  const endParse = cppIdx !== -1 ? cppIdx : lines.length;
                  const explanation = lines.slice(parseIdx, endParse).join('\n').replace('解析：', '').trim();
                  description += `\n\n**解析**：\n${explanation}`;
              }

              if (cppIdx !== -1) {
                  solutionCode = lines.slice(cppIdx + 1).join('\n').trim();
                  solutionCode = solutionCode.replace(/^```cpp\s*/, '').replace(/```$/, '');
              }
          } else {
              // Validity check for old format
              if (codeIdx === -1 && (inputIdx === -1 || outputIdx === -1)) {
                  continue;
              }
              
              if (inputIdx !== -1 && outputIdx !== -1) {
                  const inputDesc = lines.slice(inputIdx + 1, outputIdx).join('\n').trim();
                  const outputDesc = lines.slice(outputIdx + 1, codeIdx !== -1 ? codeIdx : undefined).join('\n').trim();
                  description = `**输入**：\n${inputDesc}\n\n**输出**：\n${outputDesc}`;
              } else {
                  description = lines.slice(1, codeIdx !== -1 ? codeIdx : undefined).join('\n').trim();
              }

              description = description.replace(/\[ref:.*?\]/g, '').trim();

              if (codeIdx !== -1) {
                  const endCodeIdx = explainIdx !== -1 ? explainIdx : lines.length;
                  solutionCode = lines.slice(codeIdx + 1, endCodeIdx).join('\n').trim();
                  solutionCode = solutionCode.replace(/^```cpp\s*/, '').replace(/```$/, '').replace(/\[ref:.*?\]/g, '');
              }

              let explanation = "";
              if (explainIdx !== -1) {
                  explanation = lines.slice(explainIdx + 1).join('\n').replace(/\[ref:.*?\]/g, '').trim();
              }
              
              if (cleanTitle.includes('随机生成不重复的数')) {
                  cleanTitle = '生成指定区间的随机数';
                  description = `生成 5 个 [1, 10] 之间的随机整数。要求设定时间种子。\n\n` + description;
              }

              if (explanation) description += `\n\n**解释**：\n${explanation}`;
          }

          exercises.push({
              title: cleanTitle,
              description: formatInlineCode(description),
              initialCode: "",
              solutionCode: solutionCode,
              hints: []
          });
      }
    }
  }

  // Fix IDs for quiz questions to be sequential
  const finalQuizQuestions = quizQuestions.map((q, idx) => ({ ...q, id: idx + 1 }));

  return {
    quizData: {
      title: quizTitle,
      description: quizDesc,
      questions: finalQuizQuestions
    },
    exercises
  };
};
