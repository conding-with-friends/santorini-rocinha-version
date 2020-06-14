import { MAX_LEVEL } from './consts'

import {
  notOnPhaseError,
  invalidMoveError,
  invalidBuildError,
  invalidSetupError
} from './errors'

import { getValidPositionsToMove, getValidPositionsToBuild } from './helpers'

function validatePhase (expectedPhase, currentPhase) {
  if (expectedPhase !== currentPhase) throw notOnPhaseError
}

function validatePositionToMove (hero, moveTo, heroes, board) {
  if (
    !getValidPositionsToMove(hero, heroes, board).includes(moveTo)
  ) throw invalidMoveError
}

function validatePositionToBuild (hero, buildAt, heroes, board) {
  if (
    !getValidPositionsToBuild(hero, heroes, board).includes(buildAt)
  ) throw invalidBuildError
}

function validatePositionToSetup (positions, heroes, board) {
  if (
    positions.some(position => getValidPositionsToSetup(heroes, board).includes(position)) ||
    position[0] === position[1]
  ) throw invalidSetupError
}

export {
  validatePhase,
  validatePositionToMove,
  validatePositionToBuild,
  validatePositionToSetup
}
