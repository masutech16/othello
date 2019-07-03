import { GameView } from './gameView'
import { GameManager } from './gameManager'

let manager: GameManager

window.onload = function () {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    document.body.innerHTML = '何か問題が発生しているようでです……'
    return;
  }

  const view = new GameView(ctx, canvas.width, canvas.height)
  manager = new GameManager(view)
  setInterval(function () {
    manager.main()
  })
}


