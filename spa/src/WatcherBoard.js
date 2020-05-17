import React, { useContext } from 'react'

import { useBoardStyle } from './styles'
import AppContext from './app-context'

const WatcherBoard = ({}) => {
  const [{ board,  }] = useContext(AppContext)

  const classes = useBoardStyle()

  return (
    <main className={classes.board}>
      {Object.keys(board).map(
        position => (
          <Slot
            key={position}
            level={board[position]}
            hasHero={[...Object.values(heroes), ...state].includes(position)}
          />
        )
      )}
    </main>
  )
}

export default WatcherBoard
