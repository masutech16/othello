import { GameView } from './gameView'
import { GameModel } from './gameModel'
import { cellSize, lineWidth } from './constantData'

const size = cellSize + lineWidth
const black: Stone = 1
const white: Stone = 2


const calcIndex = (posX: number, posY: number): { x: number, y: number } => ({
  x: Math.floor((posX - lineWidth / 2) / size) + 1,
  y: Math.floor((posY - lineWidth / 2) / size) + 1
})


export class GameManager {
  private model: GameModel
  private currentState: State = 'Black'
  private clickPos: { x: number, y: number } = { x: 0, y: 0 }
  constructor(private view: GameView) {
    this.model = new GameModel()
  }

  initialize(): void {
    this.view.drawBoard()
    this.view.drawStones(this.model.board)
  }

  update(): void {
    const { x, y } = this.clickPos
    if (x !== 0 || y !== 0) {
      const me = this.currentState === 'Black' ? black : white
      if (this.model.canPutStone(x, y, me)) {
        this.model.putStone(x, y, me)
        const canPutWhite = this.model.canPutAnywhere(white)
        const canPutBlack = this.model.canPutAnywhere(black)
        if (this.currentState === 'Black') {
          this.currentState = canPutWhite ? 'White' : 'Black'
        } else {
          this.currentState = canPutBlack ? 'Black' : 'White'
        }
        if (!canPutBlack && !canPutWhite) {
          this.currentState = 'Finish'
        }
      }
    }
  }

  draw(): void {
    this.view.drawBoard()
    this.view.drawStones(this.model.board)
  }

  onClick(ev: MouseEvent): void {
    if (this.currentState === 'Finish') return
    this.clickPos = calcIndex(ev.offsetX, ev.offsetY)
  }
}
