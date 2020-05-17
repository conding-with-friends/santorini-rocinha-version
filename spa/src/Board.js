import React, { useState, useEffect, useContext } from 'react'

import AppContext from './app-context'
import Slot from './Slot'

const Board = () => {
  const [{ phase }, isMyTurn] = useContext(AppContext)

  if (!isMyTurn) return <WatcherBoard />
  if (phase === 'SETUP') return <Setup />

  return <MoveAndBuild />

  const [state, setState] = useState([])
  const classes = useStyle()

  useEffect(() => {
    if (state.length === 2) {
      const confirm = window.confirm(`${JSON.stringify(state)}?`)

      if (confirm) {
        dispatch({ action: 'CHANGE_PLAYER' })
      } else {
        setState([])
      }
    }
  }, [state.length, dispatch, setState])

  return (
    <>
      <main className={classes.board}>
        {Object.keys(board).map(
          position => (
            <Slot
              key={position}
              level={board[position]}
              hasHero={[...Object.values(heroes), ...state].includes(position)}
              onClick={() => isMyTurn && setState([...state, position])}
            />
          )
        )}
      </main>

      {currentPlayer === localPlayerIndex && `Your turn: ${phase}`}
    </>
  )
}

export default Board
