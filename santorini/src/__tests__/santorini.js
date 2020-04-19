import santorini, { initialState } from '../santorini'

import {
  notOnPhaseError,
  invalidSetupPositionError,
  invalidPositionError,
  notVacantPositionError
} from '../errors'

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

    describe('when game`s "phase" is different from "SETUP"', () => {
      const currentState = {
        ...initialState,
        phase: 'MOVE_AND_BUILD',
        heroes: {
          ...initialState.heroes,
          '0,0': '3,1',
          '0,1': '3,2',
          '1,0': '2,1',
          '1,1': '2,3'
        }
      }

      it('throws notOnPhaseError when trying to "SETUP"', () => {
        const options = ['3,2', '3,3']

        expect(() => santorini(action, options, currentState)).toThrow(notOnPhaseError)
      })
    })

    it('throws invalidSetupPositionError for "SETUP" with empty positions', () => {
      const options = []

      expect(() => santorini(action, options, initialState)).toThrow(invalidSetupPositionError)
    })

    it('throws invalidSetupPositionError when trying to "SETUP" with only one hero position', () => {
      const options = ['0,1', null]

      expect(() => santorini(action, options, initialState)).toThrow(invalidSetupPositionError)
    })

    it('throws invalidSetupPositionError when trying to set heroes on the same slot', () => {
      const options = ['2,1', '2,1']

      expect(() => santorini(action, options, initialState)).toThrow(invalidSetupPositionError)
    })

    it('throws invalidPositionError when trying to set position out of board`s boundaries', () => {
      const options = ['0,1', '9,10']

      expect(() => santorini(action, options, initialState)).toThrow(invalidPositionError)
    })

    it('throws notVacantPositionError when trying to set a hero on an already taken slot', () => {
      const options = ['2,2', '0,1']
      const currentState = {
        ...initialState,
        currentPlayer: 1,
        heroes: {
          ...initialState.heroes,
          '0,0': '0,1',
          '0,1': '0,2'
        }
      }

      expect(() => santorini(action, options, currentState)).toThrow(notVacantPositionError)
    })
  })
})
