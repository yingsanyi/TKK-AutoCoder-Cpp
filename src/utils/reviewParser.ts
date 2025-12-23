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

    // Check for section headers
    if (trimmed.match(/^(一、|第一部分：).*选择题/)) {
      currentSectionType = 'quiz';
      // Extract description if any
      const descMatch = trimmed.match(/（(.*?)）/);
      if (descMatch) quizDesc = descMatch[1];
      continue; // The header section itself might not contain questions
    }
    if (trimmed.match(/^(二、|第二部分：).*编程题/)) {
      currentSectionType = 'exercise';
      continue;
    }

    if (currentSectionType === 'quiz') {
      // Parse Quiz Question
      // Format:
      // 1. Title
      // Code...
      // Options
      // 答案：...
      // 解析：...
      
      // Heuristic: If it contains "答案：" it's likely a question
      if (trimmed.includes('答案：')) {
        const lines = trimmed.split('\n');
        // Title is usually the first line
        const titleLine = lines[0].trim();
        // ID extraction
        const idMatch = titleLine.match(/^(\d+(\.\d+)?)\s+(.*)/);
        let idStr = "0";
        let questionText = titleLine;
        
        if (idMatch) {
            idStr = idMatch[1];
            questionText = idMatch[3];
        }

        // Find "答案：" line
        const answerIdx = lines.findIndex(l => l.trim().startsWith('答案：'));
        if (answerIdx === -1) continue;

        // Find options (A. ... B. ...)
        // Usually before answer
        // Let's assume options are in the lines before answer, after code
        
        // Find Explanation
        const explanationIdx = lines.findIndex(l => l.trim().startsWith('解析：'));
        let explanation = "";
        if (explanationIdx !== -1) {
            explanation = lines.slice(explanationIdx).join('\n').replace('解析：', '').replace(/\[ref:.*?\]/g, '').trim();
        }

        const answerLine = lines[answerIdx];
        const correctAnswer = answerLine.replace('答案：', '').replace(/\[ref:.*?\]/g, '').trim();

        // Content between title and options/answer
        // Detect where options start
        // Options usually start with A.
        let contentEndIdx = answerIdx;
        for (let i = 1; i < answerIdx; i++) {
            if (lines[i].trim().match(/^[A-E]\.\s/)) {
                contentEndIdx = i;
                break;
            }
        }

        const contentLines = lines.slice(1, contentEndIdx);
        const codeBlock = contentLines.join('\n');
        
        // Options
        const optionsLines = lines.slice(contentEndIdx, answerIdx).join(' ');
        // Split options: A. ... B. ...
        // This is tricky if they are on same line.
        // Simple regex split?
        const options: string[] = [];
        const optMatches = optionsLines.matchAll(/([A-E])\.\s+([^A-E]*)/g);
        for (const m of optMatches) {
            options.push(`${m[1]}. ${m[2].trim()}`);
        }
        
        // Fallback if regex didn't work (e.g. multiline options or different format)
        if (options.length === 0) {
            // Try splitting by A., B., etc
             const parts = optionsLines.split(/\s+([A-E]\.)\s+/);
             // This is hard to get perfect without more strict format
             // Let's just store the raw options line if parsing fails
             if (optionsLines.trim()) options.push(optionsLines.trim());
        }

        quizQuestions.push({
            id: parseFloat(idStr), // Use parsed ID or index
            question: formatInlineCode(questionText),
            options: options.length > 0 ? options : ["See description"],
            correctAnswer: correctAnswer,
            explanation: formatInlineCode(explanation) + `\n\n\`\`\`cpp\n${codeBlock}\n\`\`\``
        });
      }
    } else if (currentSectionType === 'exercise') {
      // Parse Exercise
      // Format:
      // Title
      // 输入：
      // 输出：
      // 参考代码：
      // 解释：
      
      const lines = trimmed.split('\n');
      const titleLine = lines[0].trim();
      
      // Clean title (remove number)
      let cleanTitle = titleLine.replace(/^\d+\.\s*/, '');
      // Remove [ref:...]
      cleanTitle = cleanTitle.replace(/\[ref:.*?\]/g, '').trim();
      
      // *** FILTERING LOGIC ***
      if (cleanTitle.includes('数组求和与平均值') || cleanTitle.includes('统计字符串中的数字个数')) {
          continue; // Skip this exercise
      }

      // Apply math formatting to title
      cleanTitle = formatInlineCode(cleanTitle);

      let description = "";
      let initialCode = "";
      let solutionCode = "";
      
      // Parse sections
      const inputIdx = lines.findIndex(l => l.trim().startsWith('输入：'));
      const outputIdx = lines.findIndex(l => l.trim().startsWith('输出：'));
      const codeIdx = lines.findIndex(l => l.trim().startsWith('参考代码：'));
      const explainIdx = lines.findIndex(l => l.trim().startsWith('解释：'));
      
      if (inputIdx !== -1 && outputIdx !== -1) {
          const inputDesc = lines.slice(inputIdx + 1, outputIdx).join('\n').trim();
          const outputDesc = lines.slice(outputIdx + 1, codeIdx !== -1 ? codeIdx : undefined).join('\n').trim();
          description = `**输入**：\n${inputDesc}\n\n**输出**：\n${outputDesc}`;
      } else {
          // Fallback
          description = lines.slice(1, codeIdx !== -1 ? codeIdx : undefined).join('\n').trim();
      }

      // Clean refs from description
      description = description.replace(/\[ref:.*?\]/g, '').trim();

      if (codeIdx !== -1) {
          const endCodeIdx = explainIdx !== -1 ? explainIdx : lines.length;
          solutionCode = lines.slice(codeIdx + 1, endCodeIdx).join('\n').trim();
          // Remove ```cpp and ``` if present
          solutionCode = solutionCode.replace(/^```cpp\s*/, '').replace(/```$/, '').replace(/\[ref:.*?\]/g, '');
      }

      let explanation = "";
      if (explainIdx !== -1) {
          explanation = lines.slice(explainIdx + 1).join('\n').replace(/\[ref:.*?\]/g, '').trim();
      }
      
      // *** MODIFICATION LOGIC ***
      if (cleanTitle.includes('随机生成不重复的数')) {
          cleanTitle = '生成指定区间的随机数';
          // Update description if needed, or keep it.
          // The user mentioned "将25题改成生成与指定区间的随机数的题目"
          // I will append a note or modify slightly to match the new title intent if known.
          // For now, I'll update the description header to match the new title.
          description = `生成 5 个 [1, 10] 之间的随机整数。要求设定时间种子。\n\n` + description;
      }

      exercises.push({
          title: cleanTitle,
          description: formatInlineCode(description + (explanation ? `\n\n**解释**：\n${explanation}` : "")),
          initialCode: "",
          solutionCode: solutionCode,
          hints: []
      });
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
