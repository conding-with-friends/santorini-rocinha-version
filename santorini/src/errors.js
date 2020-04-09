const boundariesError = new Error('Position out of boundaries')
const notVacantPositionError = new Error('Position already taken')
const notOnTurnError = new Error('Not on turn')

export {
  boundariesError,
  notVacantPositionError,
  notOnTurnError
}
