const invalidSetupPositionError = new Error('Position invalid for setup phase')
const invalidPositionError = new Error('Position out of boundaries')
const notVacantPositionError = new Error('Position already taken')
const notOnPhaseError = new Error('Not on phase')
const invalidMoveToLevelError = new Error('Invalid move to level')
const invalidRangeError = new Error('Invalid range for move or build')
const invalidBuildLevelError = new Error('Invalid build level for position')
const invalidActionError = new Error('Invalid action')

export {
  invalidSetupPositionError,
  invalidPositionError,
  notVacantPositionError,
  notOnPhaseError,
  invalidMoveToLevelError,
  invalidRangeError,
  invalidBuildLevelError,
  invalidActionError
}
