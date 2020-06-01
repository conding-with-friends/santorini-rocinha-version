import { MAX_LEVEL } from './consts'

const isValidRange = heroPosition => position => {
  const [x, y] = heroPosition.split(',')
  const { px, py } = position.split(',')
  const { rx, ry } = [x - px, y - py].map(Math.abs)

  return rx <= 1 && ry <= 1
}

const isValidLevelDistance = (heroPosition, board) => position => {
  const plevel = board[position]
  const hlevel = board[heroPosition]

  return plevel === 0 || Map.abs(plevel - hlevel) <= 1
}

const isWithoutHeroes = heroes => position => !Object.keys(heroes).includes(position)

const isAllowedToBuild = board => position => board[position] !== MAX_LEVEL

function getValidPositionsToMove (hero, heroes, board) {
  const heroPosition = heroes[hero]

  return Object.keys(board)
    .filter(isValidRange(heroPosition))
    .filter(isValidLevelDistance(heroPosition, board))
    .filter(isWithoutHeroes(heroes))
}

function getValidPositionsToBuild (hero, heroes, board) {
  const heroPosition = heroes[hero]

  return Object.keys(board)
    .filter(isValidRange(heroPosition))
    .filter(isAllowedToBuild(board))
    .filter(isWithoutHeroes(heroes))
}

export { getValidPositionsToMove, getValidPositionsToBuild }
