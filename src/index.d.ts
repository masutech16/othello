// Color
type White = 'rgb(255,255,255)'
type Green = 'rgb(0,126,78)'
type Black = 'rgb(0,0,0)'
type Color = White | Green | Black

// Stone empty - black - white - wall
type Stone = 0 | 1 | 2 | 3

// Board
type Board = Array<Array<Stone>>

// State
type State = 'Black' | 'White' | 'Finish'
