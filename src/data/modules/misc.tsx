import React from 'react';
import { Section } from '../../types/index';
import { SectionHeader } from '../../components/Lesson/SectionHeader';
import { ListChecks, Play, Pause, RotateCcw } from 'lucide-react';
import { DescriptionRenderer } from '../../components/Common/DescriptionRenderer';

const SnakeIdeaAnimation: React.FC = () => {
  const ROWS = 10;
  const COLS = 16;
  const CELL = 20;
  const [snake, setSnake] = React.useState<[number, number][]>([[2, 5], [1, 5], [0, 5]]);
  const [food, setFood] = React.useState<[number, number] | null>([8, 5]);
  const [dir, setDir] = React.useState<[number, number]>([1, 0]);
  const [nextDir, setNextDir] = React.useState<[number, number]>([1, 0]);
  const [running, setRunning] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [status, setStatus] = React.useState<'准备' | '进行中' | '结束'>('准备');
  const SPEED = 300;

  const randomFood = (body: [number, number][]) => {
    const occupied = new Set(body.map(([x, y]) => `${x},${y}`));
    const candidates: [number, number][] = [];
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) candidates.push([x, y]);
      }
    }
    if (candidates.length === 0) return null;
    const idx = Math.floor(Math.random() * candidates.length);
    return candidates[idx];
  };

  const reset = () => {
    setSnake([[2, 5], [1, 5], [0, 5]]);
    setFood([8, 5]);
    setDir([1, 0]);
    setNextDir([1, 0]);
    setScore(0);
    setStatus('准备');
    setRunning(false);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const [dx, dy] = dir;
      if (e.key === 'ArrowUp' && dy !== 1) setNextDir([0, -1]);
      else if (e.key === 'ArrowDown' && dy !== -1) setNextDir([0, 1]);
      else if (e.key === 'ArrowLeft' && dx !== 1) setNextDir([-1, 0]);
      else if (e.key === 'ArrowRight' && dx !== -1) setNextDir([1, 0]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dir]);

  React.useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setDir(nextDir);
      const [hx, hy] = snake[0];
      const [dx, dy] = nextDir;
      const nh: [number, number] = [hx + dx, hy + dy];
      const hitWall = nh[0] < 0 || nh[0] >= COLS || nh[1] < 0 || nh[1] >= ROWS;
      const selfHit = snake.some(([x, y]) => x === nh[0] && y === nh[1]);
      if (hitWall || selfHit) {
        setStatus('结束');
        setRunning(false);
        return;
      }
      const eating = food && nh[0] === food[0] && nh[1] === food[1];
      const nb = [nh, ...snake];
      if (eating) {
        setScore(s => s + 1);
        const nf = randomFood(nb);
        setFood(nf);
        setSnake(nb);
      } else {
        nb.pop();
        setSnake(nb);
      }
    }, SPEED);
    return () => clearTimeout(t);
  }, [running, snake, nextDir, food]);

  const start = () => {
    if (running) return;
    setStatus('进行中');
    if (!food) setFood(randomFood(snake));
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
    setStatus('进行中');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={start} disabled={running} className={`px-3 py-1.5 rounded text-white text-sm ${running ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
          <span className="inline-flex items-center gap-1"><Play size={14} /> 开始</span>
        </button>
        <button onClick={pause} disabled={!running} className={`px-3 py-1.5 rounded text-white text-sm ${!running ? 'bg-slate-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'}`}>
          <span className="inline-flex items-center gap-1"><Pause size={14} /> 暂停</span>
        </button>
        <button onClick={reset} className="px-3 py-1.5 rounded text-white text-sm bg-indigo-600 hover:bg-indigo-700">
          <span className="inline-flex items-center gap-1"><RotateCcw size={14} /> 重置</span>
        </button>
        <div className="ml-3 text-sm text-slate-600 dark:text-slate-300">状态：{status}，得分：{score}</div>
      </div>
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`, gap: 2 }}>
          {Array.from({ length: ROWS * COLS }).map((_, idx) => {
            const x = idx % COLS;
            const y = Math.floor(idx / COLS);
            const isHead = snake.length > 0 && snake[0][0] === x && snake[0][1] === y;
            const isBody = snake.some(([sx, sy], i) => i !== 0 && sx === x && sy === y);
            const isFood = food && food[0] === x && food[1] === y;
            const bg = isHead ? '#07c160' : isBody ? '#3cc68a' : isFood ? '#ff6a00' : 'transparent';
            const border = '#cbd5e1';
            return (
              <div
                key={idx}
                className="rounded-sm"
                style={{
                  width: CELL,
                  height: CELL,
                  backgroundColor: bg,
                  border: `1px solid ${border}`
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">核心步骤</h6>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><DescriptionRenderer text={"初始化：`snake`、`food`、`dir`、`nextDir`、`score`"} inline={true} /></li>
            <li><DescriptionRenderer text={"计时器驱动：`setTimeout` 周期步进"} inline={true} /></li>
            <li><DescriptionRenderer text={"方向更新：按键更新 `nextDir`，禁止 180° 反向"} inline={true} /></li>
            <li><DescriptionRenderer text={"碰撞判定：边界与自身"} inline={true} /></li>
            <li><DescriptionRenderer text={"吃食物：加分并重新随机投放"} inline={true} /></li>
            <li><DescriptionRenderer text={"重绘与调度：更新蛇身并安排下一步"} inline={true} /></li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">设计映射</h6>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><DescriptionRenderer text={"画布网格 ↔ React 网格布局 `grid`"} inline={true} /></li>
            <li><DescriptionRenderer text={"`after` 计时器 ↔ `setTimeout`"} inline={true} /></li>
            <li><DescriptionRenderer text={"状态变量 ↔ React `useState`"} inline={true} /></li>
            <li><DescriptionRenderer text={"键盘事件 ↔ `addEventListener('keydown')`"} inline={true} /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const miscSections: Section[] = [
  {
    id: 'misc-snake-idea-animation',
    category: '其他的目录',
    title: '贪吃蛇：设计思路动画',
    type: 'lesson',
    content: (
      <div className="space-y-6 text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={ListChecks} title="阅读与映射" subtitle="源代码：/docs/tk_demo.py" />
          <div className="space-y-3 text-sm">
            <DescriptionRenderer inline={false} text={"你可以通过动画直观看到 `tk_demo.py` 中的核心设计：网格画布、计时器驱动、方向输入、碰撞判定、投放食物与步进重绘。"} />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={ListChecks} title="设计思路动画" />
          <SnakeIdeaAnimation />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <SectionHeader icon={ListChecks} title="详细逻辑说明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">坐标与网格</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"坐标系：原点在左上角，单位为“格”"} inline={true} /></li>
                <li><DescriptionRenderer text={"网格尺寸：`ROWS=10`、`COLS=16`，每格 `CELL=20px`"} inline={true} /></li>
                <li><DescriptionRenderer text={"蛇身：`snake` 为 `[[x,y], ...]`，`snake[0]` 是头"} inline={true} /></li>
                <li><DescriptionRenderer text={"食物：`food` 为 `[x,y] | null`"} inline={true} /></li>
                <li><DescriptionRenderer text={"索引映射：`idx → (x=idx%COLS, y=floor(idx/COLS))`"} inline={true} /></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">方向与更新</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"方向：`dir=[dx,dy]`，下一步方向 `nextDir`"} inline={true} /></li>
                <li><DescriptionRenderer text={"防反向：禁止与当前方向相反（同轴符号相反）"} inline={true} /></li>
                <li><DescriptionRenderer text={"步进：定时器驱动每步，先用 `nextDir` 更新头：`nh=[hx+dx, hy+dy]`"} inline={true} /></li>
                <li><DescriptionRenderer text={"蛇身更新：`nb=[nh, ...snake]`；未吃到食物则 `nb.pop()`"} inline={true} /></li>
                <li><DescriptionRenderer text={"得分：吃到食物时 `score++` 并重新投放新食物"} inline={true} /></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">碰撞检测</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"边界：`nh[0]∈[0,COLS)` 且 `nh[1]∈[0,ROWS)`"} inline={true} /></li>
                <li><DescriptionRenderer text={"自身：`snake.some(([x,y]) => x===nh[0] && y===nh[1])`"} inline={true} /></li>
                <li><DescriptionRenderer text={"失败处理：设置 `status='结束'` 并停止 `running`"} inline={true} /></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">食物投放</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"占位集：将蛇身转为 `Set('x,y')`"} inline={true} /></li>
                <li><DescriptionRenderer text={"候选格：遍历全网格收集未占用的位置到 `candidates`"} inline={true} /></li>
                <li><DescriptionRenderer text={"随机选择：`Math.random()` 选一格；满格时返回 `null`"} inline={true} /></li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">状态与控制</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"状态：`status` 为 `'准备' | '进行中' | '结束'`"} inline={true} /></li>
                <li><DescriptionRenderer text={"控制：`running` 控制计时器；`start`/`pause`/`reset` 管理流程"} inline={true} /></li>
                <li><DescriptionRenderer text={"开始：若无食物则先投放，再置 `running=true`"} inline={true} /></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h6 className="font-bold text-slate-900 dark:text-white text-sm mb-2">渲染与高亮</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><DescriptionRenderer text={"网格：按列数生成格子，逐格判断蛇头/身体/食物"} inline={true} /></li>
                <li><DescriptionRenderer text={"高亮：头为深绿、身体为浅绿、食物为橙色"} inline={true} /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
];
