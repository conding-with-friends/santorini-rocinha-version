import {
  validatePhase,
  validateSetupPositions,
  validateBoardPosition,
  validateVacantPosition,
  validateMoveToLevel,
  validateRange,
  validateBuild
} from './validations'

import { MAX_PLAYERS } from './consts'
import { invalidActionError } from './errors'

const initialState = {
  playersCount: MAX_PLAYERS,
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
  }
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

function getNextPlayer (currentPlayer, playersCount) {
  const nextPlayer = currentPlayer + 1

  return nextPlayer === playersCount ? 0 : nextPlayer
}

function getNextPhase (currentPlayer, heroes) {
  const {
    [`${currentPlayer},0`]: _,
    [`${currentPlayer},1`]: __,
    ...otherHeroes
  } = heroes

  return Object.values(otherHeroes).every(position => !!position)
    ? 'MOVE_AND_BUILD'
    : 'SETUP'
}

function setup (action, options, state) {
  const { currentPlayer, playersCount, heroes, phase, board } = state

  validatePhase(action, phase)
  validateSetupPositions(...options, board)
  validateBoardPosition(options[0], board)
  validateBoardPosition(options[1], board)
  validateVacantPosition(options[0], heroes)
  validateVacantPosition(options[1], heroes)

  return {
    ...state,
    currentPlayer: getNextPlayer(currentPlayer, playersCount),
    phase: getNextPhase(currentPlayer, heroes),
    heroes: {
      ...heroes,
      [`${currentPlayer},0`]: options[0],
      [`${currentPlayer},1`]: options[1]
    }
  }
}

function moveAndBuild (action, option, state) {
  const { currentPlayer, playersCount, heroes, phase, board } = state
  const { moveTo, buildAt, hero } = options

  validatePhase(action, phase)
  validateBoardPosition(moveTo, board)
  validateBoardPosition(buildAt, board)
  validateVacantPosition(moveTo, heroes)
  validateVacantPosition(buildAt, heroes)

  const heroPosition = heroes[`${currentPlayer},${hero}`]

  validateRange(heroPosition, moveTo)
  validateRange(moveTo, buildAt)
  validateMoveToLevel(heroPosition, moveTo, board)
  validateBuild(buildAt, board)

  return {
    ...state,
    currentPlayer: getNextPlayer(currentPlayer, playersCount),
    board: {
      ...board,
      [buildAt]: board[buildAt] + 1
    },
    heroes: {
      ...heroes,
      [`${currentPlayer},${hero}`]: moveTo
    }
  }
}

export default santorini
export { initialState }
