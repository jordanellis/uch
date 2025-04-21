export interface GameState {
  boardSquares: BoardSquare[]
  disabledIndexes: number[]
  draggableIcons: DraggableIcon[]
}

export interface BoardSquare extends BoxIcon {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

export interface BoxIcon extends BaseIcon {
  playerName?: string
  hidden: boolean
  rotate: number
}

export interface DraggableIcon extends BaseIcon {}

interface BaseIcon {
  icon: string
  color?: string
}

export enum Position {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}
