import { GameView } from './gameView'
import { GameModel } from './gameModel'
import { cellSize, lineWidth } from './constantData'

const size = cellSize + lineWidth
const black: Stone = 1
const white: Stone = 2

// TODO: modelに移す
const calcIndex = (posX: number, posY: number): [number, number] =>
  [Math.floor((posX - lineWidth / 2) / size) + 1, Math.floor((posY - lineWidth / 2) / size) + 1]


export class GameManager {
  model: GameModel
  currentState: State = 'Black'
  constructor(public view: GameView) {
    this.model = new GameModel()
  }

  initialize() {
    this.view.drawBoard()
    this.view.drawStones(this.model.board)
  }

  onClick(ev: MouseEvent) {
    if (this.currentState === 'Finish') return
    const me = this.currentState === 'Black' ? black : white
    // DOMが重なるようなことがなければこれでちゃんとした座標が取得できる
    const [x, y] = calcIndex(ev.offsetX, ev.offsetY)
    if (this.model.canPutStone(x, y, me)) {
      this.model.putStone(x, y, me)
      this.currentState = this.currentState === 'Black' ? 'White' : 'Black'
    }
    this.view.drawStones(this.model.board)
  }
}
