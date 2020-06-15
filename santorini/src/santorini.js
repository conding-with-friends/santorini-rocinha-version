import { invalidActionError } from './errors'

import {
  validatePhase,
  validatePositionToMove,
  validatePositionToBuild,
  validatePositionToSetup
} from './validations'

import {
  getValidPositionsToMove,
  getValidPositionsToBuild,
  getValidPositionsToSetup,
  checkWinner,
  getOponent
} from './helpers'

const initialState = {
  currentPlayer: 0,
  phase: 'SETUP',
  board: {
    '0,0': 0, '1,0': 0, '2,0': 0, '3,0': 0, '4,0': 0,
    '0,1': 0, '1,1': 0, '2,1': 0, '3,1': 0, '4,1': 0,
    '0,2': 0, '1,2': 0, '2,2': 0, '3,2': 0, '4,2': 0,
    '0,3': 0, '1,3': 0, '2,3': 0, '3,3': 0, '4,3': 0,
    '0,4': 0, '1,4': 0, '2,4': 0, '3,4': 0, '4,4': 0
  },
  heroes: {
    '0,0': null, '0,1': null,
    '1,0': null, '1,1': null
  },
  winner: null
}

function santorini (action, options, state = initialState) {
  switch (action) {
    case 'SETUP': // options = ['0,0', '0,1']
      return setup(action, options, state)
    case 'MOVE_AND_BUILD': // options = { moveTo: '1,1', buildAt: '2,2', hero: 0 }
      return moveAndBuild(action, options, state)
    default:
      throw invalidActionError
  }
}

function setup (action, positions, state) {
  const { currentPlayer, playersCount, heroes, phase, board } = state

  validatePhase(action, phase)
  validatePositionToSetup(positions, heroes, board)

  return {
    ...state,
    currentPlayer: getOponent(currentPlayer),
    phase: getNextPhase(currentPlayer, heroes),
    heroes: {
      ...heroes,
      [`${currentPlayer},0`]: options[0],
      [`${currentPlayer},1`]: options[1]
    }
  }
}

function moveAndBuild (action, { moveTo, buildAt, hero }, state) {
  const { currentPlayer, playersCount, heroes, phase, board } = state
  const hero = `${currentPlayer},${hero}`

  validatePhase(action, phase)
  validatePositionToMove(hero, moveTo, heroes, board)

  const heroesAfterMove = { ...heroes, [hero]: moveTo }

  validatePositionToBuild(hero, buildAt, heroesAfterMove, board)

  const newState = {
    ...state,
    currentPlayer: getOponent(currentPlayer),
    board: {
      ...board,
      [buildAt]: board[buildAt] + 1
    },
    heroes: heroesAfterMove
  }

  const winner = checkWinner(newState)

  return {
    ...newState,
    phase: getNextPhase(currentPlayer, heroes, winner)
    winner: winner
  }
}

function getNextPhase (currentPlayer, heroes, winner = null) {
  const {
    [`${currentPlayer},0`]: _,
    [`${currentPlayer},1`]: __,
    ...otherHeroes
  } = heroes

  if (winner) return 'END_GAME'

  return Object.values(otherHeroes).every(position => !!position)
    ? 'MOVE_AND_BUILD'
    : 'SETUP'
}

export default santorini
export { initialState }
