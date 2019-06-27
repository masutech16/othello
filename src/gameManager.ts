import { GameView } from "./gameView";


export class GameManager {
  constructor(public view: GameView) { }

  main() {
    this.view.drawBoard()
  }
}
