import { Renderer } from './renderer';

let manager: GameManager

window.onload = function () {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx != null) {
    const renderer = new Renderer(ctx, 600, 600)
    manager = new GameManager(renderer)
    console.log(manager)
    setInterval(function () {
      manager.main()
    })
  } else {
    document.body.innerHTML = '何か問題が発生しているようでです……'
  }
}


class GameManager {
  constructor(public renderer: Renderer) { }

  main() {
    this.renderer.clearScreen()
  }
}

