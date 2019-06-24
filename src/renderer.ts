import * as Color from './color'

export class Renderer {

  constructor(public ctx: CanvasRenderingContext2D, public width: number, public height: number) { }

  drawRect(x: number, y: number, w: number, h: number, color: Color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
  }

  drawCircle(x: number, y: number, r: number, color: Color) {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill()
  }

  drawLine(beginX: number, beginY: number, endX: number, endY: number, width: number, color: Color) {
    this.ctx.fillStyle = color
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(beginX, beginY);
    this.ctx.lineTo(endX, endY);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  clearScreen() {
    this.drawRect(0, 0, this.width, this.height, Color.green)
  }
}
