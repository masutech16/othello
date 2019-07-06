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

const getOpposite = (me: Stone): Stone => me === black ? white : black

const reverse = (x: number, y: number, me: Stone, dx: number, dy: number, board: Board): void => {
  const opposite = getOpposite(me)
  let count = 0;

  let ny = y + dy
  let nx = x + dx
  while (true) {
    switch (board[ny][nx]) {
      case empty:
      case wall:
        return
      case opposite:
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

const canReverse = (x: number, y: number, me: Stone, dx: number, dy: number, board: Board) => {
  const opposite = getOpposite(me)
  let c = 1
  let flag = false

  while (true) {
    switch (board[y + dy * c][x + dx * c]) {
      case wall:
      case empty:
        return false
      case me:
        return flag
      case opposite:
        c++
        flag = true
    }
  }
}

const validateIndex = (i: number) => 1 <= i && i <= 8


export class GameModel {
  board: Board
  constructor() {
    this.board = initBoard
  }

  reset() {
    this.board = initBoard
  }

  canPutStone(x: number, y: number, me: Stone): boolean {
    if (!(validateIndex(x) && validateIndex(y))) return false
    if (this.board[y][x] !== empty) return false
    const other = me === black ? white : black
    for (let dx = -1; dx < 2; dx++) {
      for (let dy = -1; dy < 2; dy++) {
        if (canReverse(x, y, me, dx, dy, this.board)) return true
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
    this.board[y][x] = me
  }

  canPutAnywhere(me: Stone): boolean {
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.canPutStone(x, y, me)) return true
      }
    }
    return false
  }
}
