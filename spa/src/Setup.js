import React, { useState, useEffect, useContext } from 'react'

import AppContext from './app-context'
import Slot from './Slot'
import { useBoardStyle } from './styles'

const Setup = ({}) => {
  const [{ heroes, board }, dispatch] = useContext(AppContext)
  const [state, setState] = useState([])
  const classes = useBoardStyle()

  useEffect(() => {
    if (state.length === 2) {
      const confirm = window.confirm(`${JSON.stringify(state)}?`)

      if (confirm) {
        dispatch({ action: 'SETUP', payload: state })
      } else {
        setState([])
      }
    }
  }, [state, dispatch, setState])

  return (
    <main className={classes.board}>
      {Object.keys(board).map(
        position => (
          <Slot
            key={position}
            level={board[position]}
            hasHero={[...Object.values(heroes), ...state].includes(position)}
            onClick={() => setState([...state, position])}
          />
        )
      )}
    </main>
  )
}

export default Setup
