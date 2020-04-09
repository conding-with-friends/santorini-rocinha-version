import { notOnTurnError } from './errors'

export default function validateSetupHeroTurn (heroes) {
  const notSetHero = heroes.find(({ x, y }) => x === null && y === null)

  if (!notSetHero) throw notOnTurnError
}
