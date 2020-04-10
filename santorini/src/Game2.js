const invalidPositionError = new Error('Position out of boundaries')
const notVacantPositionError = new Error('Position already taken')
const notOnTurnError = new Error('Not on turn')

// Dummy state
// {
//   playersCount: 2,
//   currentPlayer: 0, // 0, 1
//   currentHero: 0, // null, 0, 1
//   turn: 'setup', // setup, move-and-build
//   board: {
//     '0,1': 0
//   },
//   heroes: {
//     '0,0': null,
//     '0,1': null,
//     '1,0': null,
//     '1,1': '0,0'
//   }
// }

function santorini (action, options, state) {
  switch (action) {
    case 'SETUP':
      const { currentPlayer, playersCount, heroes, turn, board } = state

      validateTurn('setup', turn)
      validatePositions(...options, board)
      validateVacantPositions(...options, heroes)

      return {
        ...state,
        currentPlayer: getNextPlayer(currentPlayer, playersCount),
        turn: getNextTurn(currentPlayer, heroes),
        heroes: {
          ...heroes,
          [`${currentPlayer},0`]: options[0],
          [`${currentPlayer},1`]: options[1]
        }
      }
    case 'MOVE_AND_BUILD'
    default:
  }
}

function getNextPlayer (currentPlayer, playersCount) {
  const nextPlayer = currentPlayer + 1

  return nextPlayer === playersCount ? 0 : nextPlayer
}

function getNextTurn (currentPlayer, heroes) {
  const {
    [`${currentPlayer},0`]: _,
    [`${currentPlayer},1`]: __,
    ...otherHeroes
  } = heroes

  return Object.values(otherHeroes).every(position => !!position)
    ? 'move-and-build'
    : 'setup'
}

function validateTurn(expectedTurn, currentTurn) {
  if (expectedTurn !== currentTurn) throw notOnTurnError
}

function validatePositions(position0, position1, board) {
  if (!position0 || !position1) throw invalidPositionError

  const positions = Object.keys(board)

  if (!positions.includes(position0) || !positions.includes(position1)) {
    throw invalidPositionError
  }
}

function validateVacantPositions(position0, position1, heroes) {
  if (position0 === position1) throw notVacantPositionError
  if (heroes[position0] || heroes[position1]) throw notVacantPositionError
}