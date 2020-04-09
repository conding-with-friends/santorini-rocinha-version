import Game from '../Game'
import { boundariesError, notVacantPositionError } from '../errors'

describe('Game', () => {
  describe('#drawCurrentTeam', () => {
    it('returns random values between 0 and 1', () => {
      const results = []
      
      for (let i = 0; i < 100; i ++) {
        results.push((new Game()).drawCurrentTeam())
      }

      expect([...new Set(results)].sort()).toEqual([0, 1])
    })

    it('sets "_currentTeamIndex" property', () => {
      const game = new Game()

      expect(game._currentTeamIndex).toBe(null)

      game.drawCurrentTeam()

      expect(game._currentTeamIndex).not.toBe(null)
    })

    it('throws error when "currentTeam" is already set', () => {
      const game = new Game()

      game.drawCurrentTeam()

      expect(() => game.drawCurrentTeam()).toThrow('"currentTeam" already set')
    })
  })

  describe('#setupHero', () => {
    let game = null

    beforeEach(() => {
      game = new Game()

      game.drawCurrentTeam()
    })

    it('1', () => {
      const heroIndex = 1
      const position = { x: 2, y: 2 }
      const hero = game.currentTeam.heroes[heroIndex]

      expect(hero).toEqual({ x: null, y: null })

      game.setupHero(heroIndex, position)

      expect(hero).toEqual(position)
    })

    it('2', () => {
      expect(() => game.setupHero(1, { x:  5, y:  2 })).toThrow(boundariesError)
      expect(() => game.setupHero(1, { x:  2, y:  5 })).toThrow(boundariesError)
      expect(() => game.setupHero(1, { x: -1, y:  2 })).toThrow(boundariesError)
      expect(() => game.setupHero(1, { x:  2, y: -1 })).toThrow(boundariesError)
    })

    it('3', () => {
      const position = { x: 4, y: 2 }
      const firstHeroIndex = 0
      const secondHeroIndex = 1

      game.setupHero(firstHeroIndex, position)

      expect(
        () => game.setupHero(secondHeroIndex, position)
      ).toThrow(notVacantPositionError)
    })
  })
})
