import { Renderer } from './renderer';
import * as Color from './color'

export class GameView {
  stoneSize: number
  lineWidth: number
  renderer: Renderer
  constructor(ctx: CanvasRenderingContext2D, public width: number, public height: number) {
    this.stoneSize = 64
    this.lineWidth = 2
    this.renderer = new Renderer(ctx)
  }

  drawBoard() {
    this.renderer.drawRect(0, 0, this.width, this.height, Color.green)
    // 縦線と横線を引く
    for (let i = 0; i < 9; i++) {
      const interval = this.stoneSize + this.lineWidth
      const offset = 1 // 0始まりだと一番上の線が欠けるため
      this.renderer.drawLine(0, interval * i + offset, this.width, interval * i + offset, this.lineWidth, Color.black)
      this.renderer.drawLine(interval * i + offset, 0, interval * i + offset, this.height, this.lineWidth, Color.black)
    }
  }

  drawStone(board: Array<Array<number>>) {

  }

  clearScreen() {
    this.renderer.drawRect(0, 0, this.width, this.height, Color.green)
  }
}
