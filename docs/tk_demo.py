import tkinter as tk
from tkinter import messagebox
import random


class SnakeGame:
    """贪吃蛇游戏主类，负责界面、状态与游戏循环"""

    # 画布网格相关常量：单元尺寸（像素）、列数、行数与移动速度（毫秒）
    GRID_SIZE = 20
    COLS = 25
    ROWS = 20
    SPEED_MS = 120

    def __init__(self, root: tk.Tk) -> None:
        """初始化窗口、画布与游戏控件"""
        self.root = root
        self.root.title("贪吃蛇 - tkinter")

        # 根据网格常量计算画布尺寸
        width = self.COLS * self.GRID_SIZE
        height = self.ROWS * self.GRID_SIZE

        # 顶部信息栏（得分／状态／控制按钮）
        top_frame = tk.Frame(self.root)
        top_frame.pack(fill="x", padx=8, pady=6)

        # 分数与状态显示
        self.score_var = tk.IntVar(value=0)
        self.status_var = tk.StringVar(value="准备开始")

        tk.Label(top_frame, text="得分:").pack(side="left")
        self.score_label = tk.Label(top_frame, textvariable=self.score_var, width=6, anchor="w")
        self.score_label.pack(side="left", padx=(2, 12))
        self.status_label = tk.Label(top_frame, textvariable=self.status_var, anchor="w")
        self.status_label.pack(side="left", padx=(4, 12))

        self.start_btn = tk.Button(top_frame, text="开始", command=self.start_game)
        self.start_btn.pack(side="left", padx=4)
        self.restart_btn = tk.Button(top_frame, text="重启", command=self.reset_game, state="disabled")
        self.restart_btn.pack(side="left", padx=4)

        # 主画布区域：用于渲染网格、蛇与食物
        self.canvas = tk.Canvas(self.root, width=width, height=height, bg="#1e1e1e", highlightthickness=0)
        self.canvas.pack(padx=8, pady=6)

        # 绑定方向键事件
        self.root.bind("<Up>", self.on_key_press)
        self.root.bind("<Down>", self.on_key_press)
        self.root.bind("<Left>", self.on_key_press)
        self.root.bind("<Right>", self.on_key_press)

        # 游戏状态变量
        self.timer_id = None
        self.running = False
        self.direction = (1, 0)
        self.next_direction = (1, 0)
        self.snake = []
        self.food = None

        # 绘制背景网格并初始化到准备状态
        self.draw_grid()
        self.reset_game()

    def draw_grid(self) -> None:
        """绘制背景格线"""
        self.canvas.delete("grid")
        w = self.COLS * self.GRID_SIZE
        h = self.ROWS * self.GRID_SIZE
        # 竖直与水平分割线
        for c in range(self.COLS + 1):
            x = c * self.GRID_SIZE
            self.canvas.create_line(x, 0, x, h, fill="#2a2a2a", tags="grid")
        for r in range(self.ROWS + 1):
            y = r * self.GRID_SIZE
            self.canvas.create_line(0, y, w, y, fill="#2a2a2a", tags="grid")

    def reset_game(self) -> None:
        """重置游戏状态并回到初始界面"""
        if self.timer_id:
            self.root.after_cancel(self.timer_id)
            self.timer_id = None
        self.running = False
        self.direction = (1, 0)
        self.next_direction = (1, 0)
        # 初始蛇身（长度为 3），头部在最前
        self.snake = [(5, 10), (4, 10), (3, 10)]
        self.food = None
        self.score_var.set(0)
        self.status_var.set("准备开始")
        self.start_btn.config(state="normal")
        self.restart_btn.config(state="disabled")
        # 初始渲染
        self.draw()

    def start_game(self) -> None:
        """开始游戏循环"""
        if self.running:
            return
        self.running = True
        self.status_var.set("进行中")
        self.start_btn.config(state="disabled")
        self.restart_btn.config(state="normal")
        # 若尚未投放食物，先投放再进入循环
        if not self.food:
            self.place_food()
        self.schedule_next_step()

    def schedule_next_step(self) -> None:
        """安排下一帧的计时器"""
        if self.timer_id:
            self.root.after_cancel(self.timer_id)
        self.timer_id = self.root.after(self.SPEED_MS, self.game_step)

    def on_key_press(self, event: tk.Event) -> None:
        """处理方向键输入并更新移动方向"""
        key = event.keysym
        dx, dy = self.direction
        # 禁止与当前方向相反的 180° 反向，避免立即自撞
        if key == "Up" and dy != 1:
            self.next_direction = (0, -1)
        elif key == "Down" and dy != -1:
            self.next_direction = (0, 1)
        elif key == "Left" and dx != 1:
            self.next_direction = (-1, 0)
        elif key == "Right" and dx != -1:
            self.next_direction = (1, 0)

    def game_step(self) -> None:
        """执行一次游戏步进：移动、碰撞、得分与重绘"""
        if not self.running:
            return

        # 方向更新与新头部位置计算
        self.direction = self.next_direction
        head_x, head_y = self.snake[0]
        dx, dy = self.direction
        new_head = (head_x + dx, head_y + dy)

        # 边界／自身碰撞判定
        if self.is_collision(new_head):
            self.end_game()
            return

        # 将新头插入到蛇身前端
        self.snake.insert(0, new_head)
        # 若吃到食物则加分并生成新食物，否则尾部收缩一格
        if self.food and new_head == self.food:
            self.score_var.set(self.score_var.get() + 1)
            self.place_food()
        else:
            self.snake.pop()

        # 重绘并调度下一步
        self.draw()
        self.schedule_next_step()

    def is_collision(self, pos: tuple[int, int]) -> bool:
        """检测当前位置是否与边界或蛇身碰撞"""
        x, y = pos
        if x < 0 or x >= self.COLS or y < 0 or y >= self.ROWS:
            return True
        if pos in self.snake:
            return True
        return False

    def place_food(self) -> None:
        """在空格随机放置食物"""
        all_cells = {(x, y) for x in range(self.COLS) for y in range(self.ROWS)}
        empty = list(all_cells - set(self.snake))
        # 从空格中随机选择一个位置作为食物
        self.food = random.choice(empty) if empty else None

    def draw(self) -> None:
        """将蛇与食物渲染到画布"""
        self.canvas.delete("snake")
        self.canvas.delete("food")
        for i, (x, y) in enumerate(self.snake):
            # 头部与身体采用不同颜色以便区分
            color = "#07c160" if i == 0 else "#3cc68a"
            self.draw_cell(x, y, color, "snake")
        if self.food:
            fx, fy = self.food
            self.draw_cell(fx, fy, "#ff6a00", "food")

    def draw_cell(self, x: int, y: int, color: str, tag: str) -> None:
        """在指定格子绘制一个矩形单元"""
        pad = 2
        gx = x * self.GRID_SIZE
        gy = y * self.GRID_SIZE
        self.canvas.create_rectangle(
            gx + pad,
            gy + pad,
            gx + self.GRID_SIZE - pad,
            gy + self.GRID_SIZE - pad,
            fill=color,
            width=0,
            tags=tag,
        )

    def end_game(self) -> None:
        """结束游戏并提示得分"""
        self.running = False
        if self.timer_id:
            self.root.after_cancel(self.timer_id)
            self.timer_id = None
        self.status_var.set("游戏结束")
        try:
            # 使用消息框提示最终得分
            messagebox.showinfo("游戏结束", f"最终得分：{self.score_var.get()}")
        except Exception:
            pass


if __name__ == "__main__":
    root = tk.Tk()
    SnakeGame(root)
    root.mainloop()
