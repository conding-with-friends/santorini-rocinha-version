const invalidSetupPositionError = new Error('Position invalid for setup phase')
const invalidPositionError = new Error('Position out of boundaries')
const notVacantPositionError = new Error('Position already taken')
const notOnPhaseError = new Error('Not on phase')
const invalidMoveToLevelError = new Error('Invalid move to level')
const invalidRangeError = new Error('Invalid range for move or build')

// Dummy state
// {
//   playersCount: 2,
//   currentPlayer: 0, // 0, 1
//   phase: 'setup', // setup, move-and-build
//   board: {
//     '0,0': 0, '1,0': 0, '2,0': 0, '3,0': 0, '4,0': 0,
//     '0,1': 0, '1,1': 0, '2,1': 0, '3,1': 0, '4,1': 0,
//     '0,2': 0, '1,2': 0, '2,2': 0, '3,2': 0, '4,2': 0,
//     '0,3': 0, '1,3': 0, '2,3': 0, '3,3': 0, '4,3': 0,
//     '0,4': 0, '1,4': 0, '2,4': 0, '3,4': 0, '4,4': 0
//   },
//   heroes: {
//     '0,0': null, '0,1': null,
//     '1,0': null, '1,1': null
//   }
// }

function santorini (action, options, state) {
  switch (action) {
    case 'SETUP': // ['0,0', '0,1']
      const { currentPlayer, playersCount, heroes, phase, board } = state

      validatePhase('setup', phase)
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
    case 'MOVE_AND_BUILD': // { move: '1,1', build: '2,2', hero: 0 }
      const { currentPlayer, playersCount, heroes, phase, board } = state
      const { move, build, hero } = options

      validatePhase('move-and-build', phase)
      validateBoardPosition(move, board)
      validateBoardPosition(build, board)
      validateVacantPosition(move, heroes)
      validateVacantPosition(build, heroes)

      const heroPosition = heroes[`${currentPlayer},${hero}`]
      validateRange(heroPosition, move)
      validateRange(move, build)
      validateMoveToLevel(heroPosition, move, board)

      return {
        ...state,
        currentPlayer: getNextPlayer(currentPlayer, playersCount),
        board: {
          ...board,
          [build]: board[build] + 1
        },
        heroes: {
          ...heroes,
          [`${currentPlayer},${hero}`]: move
        }
      }
    }
    default:
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
    ? 'move-and-build'
    : 'setup'
}

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
  if (heroes[position]) throw notVacantPositionError
}

function validateMoveToLevel (currentPosition, move, board) {
  if (board[currentPosition] + 1 < board[move]) throw invalidMoveToLevelError
}

function validateRange (origin, destination) {
  if (origin === destination) throw invalidRangeError

  const [originX, originY] = origin.split(',').map(parseInt)
  const [destinationX, destinationY] = destination.split(',').map(parseInt)

  if (Math.abs(originX - destinationX) > 1) throw invalidRangeError
  if (Math.abs(originY - destinationY) > 1) throw invalidRangeError
}
