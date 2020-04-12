import santorini, { initialState } from '../santorini'
import { boundariesError, notVacantPositionError } from '../errors'

describe('santorini', () => {
  describe('when "action" is "SETUP"', () => {
    const action = 'SETUP'

    it('set first player`s heroes', () => {
      const options = ['3,1', '3,2']

      expect(santorini(action, options)).toEqual({
        ...initialState,
        currentPlayer: 1,
        heroes: {
          ...initialState.heroes,
          '0,0': options[0],
          '0,1': options[1]
        }
      })
    })

    describe('when already has heroes set', () => {
      const currentState = {
        ...initialState,
        currentPlayer: 1,
        heroes: {
          ...initialState.heroes,
          '0,0': '3,1',
          '0,1': '3,2'
        }
      }

      it('Adds current player`s heroes', () => {
        const options = ['2,1', '2,3']

        expect(santorini(action, options, currentState)).toEqual({
          ...currentState,
          currentPlayer: 0,
          phase: 'MOVE_AND_BUILD',
          heroes: {
            ...currentState.heroes,
            '1,0': options[0],
            '1,1': options[1]
          }
        })
      })
    })
  })
})
