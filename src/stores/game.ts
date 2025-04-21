import { readonly, ref } from 'vue'
import { defineStore } from 'pinia'
import { BoardSquare, BoxIcon, GameState, Position } from '../types'
import { BASE_GAME } from '../configs/game-configs'

interface GameEvent {
  action: 'setWall' | 'addItemToBoard' | 'deleteItemFromBoard' | 'unhideItemFromSpace'
  index: number
  previousState: BoardSquare
  newState: BoardSquare
}

const startSquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: false,
  rotate: 0,
  icon: 'cbi:start-tv',
}
const gSquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: false,
  rotate: 0,
  icon: 'mynaui:letter-g-solid',
}
const oSquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: false,
  rotate: 0,
  icon: 'mynaui:letter-o-solid',
}
const aSquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: false,
  rotate: 0,
  icon: 'mynaui:letter-a-solid',
}
const lSquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: false,
  rotate: 0,
  icon: 'mynaui:letter-l-solid',
}
const emptySquare: BoardSquare = {
  up: false,
  down: false,
  left: false,
  right: false,
  hidden: true,
  rotate: 0,
  icon: '',
}

function initializeGameFromConfig() {
  const config = BASE_GAME

  const game = {
    boardSquares: new Array<BoardSquare>(80),
    disabledIndexes: [
      config.startIndex,
      config.gIndex,
      config.oIndex,
      config.aIndex,
      config.lIndex,
    ],
    draggableIcons: config.gameItems,
  }
  for (let i = 0; i < game.boardSquares.length; i++) game.boardSquares[i] = emptySquare
  game.boardSquares[config.startIndex] = startSquare
  game.boardSquares[config.gIndex] = gSquare
  game.boardSquares[config.oIndex] = oSquare
  game.boardSquares[config.aIndex] = aSquare
  game.boardSquares[config.lIndex] = lSquare

  return game
}

const UCH_GAME_BOARD = 'uch-game-board'
const UCH_EVENTS = 'uch-events'

function getGameState() {
  const state = localStorage.getItem(UCH_GAME_BOARD)
  return state ? JSON.parse(state) : initializeGameFromConfig()
}

function getEventsState() {
  const state = localStorage.getItem(UCH_EVENTS)
  return state ? JSON.parse(state) : []
}

export const useGameBoardStore = defineStore('game', () => {
  const gameBoard = ref<GameState>(getGameState())
  const events = ref<GameEvent[]>(getEventsState())

  function setWall(index: number, position: Position, value: boolean) {
    const previousState = { ...gameBoard.value.boardSquares[index] }
    gameBoard.value.boardSquares[index][position] = value
    localStorage.setItem(UCH_GAME_BOARD, JSON.stringify(gameBoard.value))
    events.value.push({
      action: 'setWall',
      index,
      previousState,
      newState: gameBoard.value.boardSquares[index],
    })
    localStorage.setItem(UCH_EVENTS, JSON.stringify(events.value))
  }

  async function addItemToBoard(item: BoxIcon, currentPlayer: string, index: number) {
    const previousState = { ...gameBoard.value.boardSquares[index] }
    gameBoard.value.boardSquares[index] = { ...previousState, ...item }
    gameBoard.value.boardSquares[index].playerName = currentPlayer
    gameBoard.value.boardSquares[index].hidden = true
    localStorage.setItem(UCH_GAME_BOARD, JSON.stringify(gameBoard.value))
    events.value.push({
      action: 'addItemToBoard',
      index,
      previousState,
      newState: gameBoard.value.boardSquares[index],
    })
    localStorage.setItem(UCH_EVENTS, JSON.stringify(events.value))
  }

  function deleteItemFromBoard(index: number) {
    const previousState = { ...gameBoard.value.boardSquares[index] }
    gameBoard.value.boardSquares[index] = {
      ...previousState,
      playerName: undefined,
      icon: '',
      hidden: true,
      color: undefined,
      rotate: 0,
    }
    localStorage.setItem(UCH_GAME_BOARD, JSON.stringify(gameBoard.value))
    events.value.push({
      action: 'deleteItemFromBoard',
      index,
      previousState,
      newState: gameBoard.value.boardSquares[index],
    })
    localStorage.setItem(UCH_EVENTS, JSON.stringify(events.value))
  }

  function unhideItemFromSpace(index: number) {
    const previousState = { ...gameBoard.value.boardSquares[index] }
    if (previousState.icon && !gameBoard.value.disabledIndexes.includes(index)) {
      gameBoard.value.boardSquares[index].hidden = false
      localStorage.setItem(UCH_GAME_BOARD, JSON.stringify(gameBoard.value))
      events.value.push({
        action: 'unhideItemFromSpace',
        index,
        previousState,
        newState: gameBoard.value.boardSquares[index],
      })
      localStorage.setItem(UCH_EVENTS, JSON.stringify(events.value))
    }
  }

  function undo() {
    if (events.value.length <= 0) return

    const lastEvent = events.value.pop() as GameEvent
    gameBoard.value.boardSquares[lastEvent.index] = lastEvent.previousState
    localStorage.setItem(UCH_EVENTS, JSON.stringify(events.value))
  }

  return {
    gameBoard: readonly(gameBoard),
    events,
    setWall,
    addItemToBoard,
    deleteItemFromBoard,
    unhideItemFromSpace,
    undo,
  }
})
