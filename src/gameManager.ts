import { GameView } from "./gameView";
import { GameModel } from "./gameModel"

export class GameManager {
  model: GameModel
  constructor(public view: GameView) {
    this.model = new GameModel()
  }

  main() {
    this.view.drawBoard()
    this.view.drawStones(this.model.board)
  }
}
