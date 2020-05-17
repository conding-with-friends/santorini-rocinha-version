import React, { useReducer, useMemo } from 'react'

import AppContext from './AppContext'

const initialState = {
  localPlayerIndex: 0,
  playersCount: 2,
  currentPlayer: 0,
  phase: 'SETUP',
  board: {
    '0,0': 0, '1,0': 0, '2,0': 0, '3,0': 0, '4,0': 0,
    '0,1': 0, '1,1': 0, '2,1': 0, '3,1': 0, '4,1': 0,
    '0,2': 0, '1,2': 0, '2,2': 0, '3,2': 0, '4,2': 0,
    '0,3': 0, '1,3': 0, '2,3': 0, '3,3': 0, '4,3': 0,
    '0,4': 0, '1,4': 0, '2,4': 0, '3,4': 0, '4,4': 0
  },
  heroes: {
    '0,0': null, '0,1': null,
    '1,0': null, '1,1': null
  }
}

function reducer (state, { action, payload }) {
  switch (action) {
    case 'CHANGE_PLAYER':
      return { ...state, currentPlayer: 1 }
    default:
      return state
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const isMyTurn = useMemo(
    () => (state.localPlayerIndex === state.currentPlayer),
    [state.localPlayerIndex, state.currentPlayer]
  )

  return (
    <AppContext.Provider value={[{ ...state, isMyTurn }, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
