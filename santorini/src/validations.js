import { MAX_LEVEL } from './consts'

import {
  invalidSetupPositionError,
  invalidPositionError,
  notVacantPositionError,
  notOnPhaseError,
  invalidMoveToLevelError,
  invalidRangeError,
  invalidBuildLevelError
} from './errors'

function validatePhase (expectedPhase, currentPhase) {
  if (expectedPhase !== currentPhase) throw notOnPhaseError
}

function validateSetupPositions (position0, position1, board) {
  if (!position0 || !position1) throw invalidSetupPositionError
  if (position0 === position1) throw invalidSetupPositionError
}

function validateBoardPosition (position, board) {
  if (!Object.keys(board).includes(position)) throw invalidPositionError
}

function validateVacantPosition (position, heroes) {
  if (Object.values(heroes).includes(position)) throw notVacantPositionError
}

function validateMoveToLevel (currentPosition, destinationPosition, board) {
  if (
    (board[currentPosition] + 1 < board[destinationPosition]) ||
    (board[destinationPosition] === MAX_LEVEL)
  ) {
    throw invalidMoveToLevelError
  }
}

function validateRange (origin, destination) {
  if (origin === destination) throw invalidRangeError

  const [originX, originY] = origin.split(',').map(parseInt)
  const [destinationX, destinationY] = destination.split(',').map(parseInt)

  if (Math.abs(originX - destinationX) > 1) throw invalidRangeError
  if (Math.abs(originY - destinationY) > 1) throw invalidRangeError
}

function validateBuild (position, board) {
  if (board[position] == MAX_LEVEL) throw invalidBuildLevelError
}

export {
  validatePhase,
  validateSetupPositions,
  validateBoardPosition,
  validateVacantPosition,
  validateMoveToLevel,
  validateRange,
  validateBuild
}
