import React, { useReducer, useMemo } from 'react'
import santorini, { initialState } from 'santorini'

import AppContext from './AppContext'

function reducer (state, { action, payload }) {
  return santorini(action, payload, state)
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState, localPlayerIndex: 0
  })

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
