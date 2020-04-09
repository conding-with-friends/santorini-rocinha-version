import validateSetupHeroTurn from './validateSetupHeroTurn'
import validateBoundaries from './validateBoundaries'
import validateVacantPosition from './validateVacantPosition'
import { MAX_TEAMS, X_MAX, Y_MAX } from './config'

const initialLevel = { level: 0 }
const initialPosition = { x: null, y: null }
const initialTeam = { heroes: [{ ...initialPosition }, { ...initialPosition }] }

function getCurrentTeam () {
  return this._teams[this.currentTeamIndex]
}

function getHeroes () {
  return this._teams.reduce((acc, { heroes }) => [...acc, ...heroes], [])
}

export default class Game {
  constructor () {
    this._setupHeroesFinished = false

    this._turn = {
      currentTeamIndex: 0,
      moved: false,
      built: false
    }

    this._board = [
      ...(new Array(X_MAX)).fill(
        [ ...(new Array(Y_MAX)).fill({ ...initialLevel }) ]
      )
    ]

    this._teams = [...(new Array(MAX_TEAMS)).fill(initialTeam)]
  }

  get currentTeamIndex () {
    return this._turn.currentTeamIndex
  }

  get nextTeamIndex () {
    return (this.currentTeamIndex + 1) % this._teams.length
  }

  setupHero (heroIndex, position) {
    const findHeroUnset = ({ x, y }) => x === null && y === null
    const teamHeroes = getCurrentTeam.call(this).heroes

    validateSetupHeroTurn(this._setupHeroesFinished, teamHeroes)
    validateBoundaries(position)
    validateVacantPosition(position, getHeroes(this))
    Object.assign(teamHeroes[heroIndex], position)

    const notSetHero = teamHeroes.find(findHeroUnset)

    if (notSetHero) {
      Object.assign(this._turn, { currentTeamIndex: this.nextTeamIndex })
    }

    const anyHeroNotSet = getHeroes.call(this).find(findHeroUnset)

    if (!anyHeroNotSet) this._setupHeroesFinished = true
  }

  move (heroIndex, position) {
    const currentTeamHeroes = getCurrentTeam.call(this).heroes
    const hero = currentTeamHeroes[heroIndex]

    validateAllHeroesSet(currentTeamHeroes)

    Object.assign(hero, position)
  }

  build (direction) {}
}
