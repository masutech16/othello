const black: Stone = 1
const white: Stone = 2
const empty: Stone = 0
const wall: Stone = 3

const initBoard: Board = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 1, 2, 0, 0, 0, 3],
  [3, 0, 0, 0, 2, 1, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
]

const reverse = (x: number, y: number, me: Stone, dx: number, dy: number, board: Board): void => {
  const other = me === black ? white : black
  let count = 0;

  let ny = y + dy
  let nx = x + dx
  while (true) {
    switch (board[ny][nx]) {
      case empty:
      case wall:
        return
      case other:
        count++
        break
      case me:
        if (count === 0) return
        for (let c = 1; c <= count; c++) {
          board[y + dy * c][x + dx * c] = me
        }
        return
    }
    ny += dy
    nx += dx
  }
}


export class GameModel {
  board: Board
  constructor() {
    this.board = initBoard
  }

  reset() {
    this.board = initBoard
  }

  canPutStone(x: number, y: number, me: Stone): boolean {
    if (this.board[y][x] !== empty) return false
    const other = me === black ? white : black
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        let c = 1
        let flag = false
        while (true) {
          switch (this.board[y + dy * c][x + dx * c]) {
            case wall:
            case empty:
              break
            case me:
              if (flag) return true
              break
            case other:
              flag = true
          }
        }
      }
    }
    return false
  }

  putStone(x: number, y: number, me: Stone): void {
    if (!this.canPutStone(x, y, me)) return
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        if (dx === 0 && dy === 0) continue
        reverse(x, y, me, dx, dy, this.board)
      }
    }
  }
}
