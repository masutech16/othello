import { GameView } from './gameView'
import { GameModel } from './gameModel'
import { cellSize, lineWidth } from './constantData'

const size = cellSize + lineWidth

const calcIndex = (posX: number, posY: number): [number, number] =>
  [Math.floor((posX - lineWidth / 2) / size) + 1, Math.floor((posY - lineWidth / 2) / size) + 1]


export class GameManager {
  model: GameModel
  constructor(public view: GameView) {
    this.model = new GameModel()
  }

  main() {
    this.view.drawBoard()
    this.view.drawStones(this.model.board)
  }

  onClick(ev: MouseEvent) {
    // DOMが重なるようなことがなければこれでちゃんとした座標が取得できる
    const [x, y] = calcIndex(ev.offsetX, ev.offsetY)
    console.log(x, y)
    if (this.model.canPutStone(x, y, 1)) {
      this.model.putStone(x, y, 1)
    }
    this.view.drawStones(this.model.board)

  }
}
