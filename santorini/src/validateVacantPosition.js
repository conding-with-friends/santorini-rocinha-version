import { notVacantPositionError } from './errors'

export default function validateVacantPosition ({ x, y }, heroes) {
  const foundHero = heroes.find(hero => (x === hero.x && y === hero.y))

  if (foundHero) throw notVacantPositionError
}
