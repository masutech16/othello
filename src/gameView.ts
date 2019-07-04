import { Renderer } from './renderer'
import * as Color from './color'
import * as Constant from './constantData'

export class GameView {
  cellSize: number
  stoneSize: number
  lineWidth: number
  renderer: Renderer
  constructor(ctx: CanvasRenderingContext2D, public width: number, public height: number) {
    this.cellSize = Constant.cellSize
    this.stoneSize = Constant.stoneSize
    this.lineWidth = Constant.lineWidth
    this.renderer = new Renderer(ctx)
  }

  drawBoard() {
    this.renderer.drawRect(0, 0, this.width, this.height, Color.green)
    // 縦線と横線を引く
    for (let i = 0; i < 9; i++) {
      const interval = this.cellSize + this.lineWidth
      const offset = 1 // 0始まりだと一番上の線が欠けるため
      this.renderer.drawLine(0, interval * i + offset, this.width, interval * i + offset, this.lineWidth, Color.black)
      this.renderer.drawLine(interval * i + offset, 0, interval * i + offset, this.height, this.lineWidth, Color.black)
    }
  }

  drawStones(board: Array<Array<Stone>>) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] == 0 || board[y][x] == 3) continue
        const c = board[y][x] == 1 ? Color.black : Color.white
        this.drawStone(x, y, c);
      }
    }
  }

  drawStone(x: number, y: number, color: Color) {
    if (x <= 0 || 9 <= x) return
    if (y <= 0 || 9 <= y) return
    const rx = x * this.lineWidth + (x - 1) * this.cellSize + this.cellSize / 2;
    const ry = y * this.lineWidth + (y - 1) * this.cellSize + this.cellSize / 2;

    this.renderer.drawCircle(rx, ry, this.stoneSize / 2, color)
  }

  clearScreen() {
    this.renderer.drawRect(0, 0, this.width, this.height, Color.green)
  }
}
