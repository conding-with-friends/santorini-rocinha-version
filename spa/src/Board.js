import React from 'react'
import { createUseStyles } from 'react-jss'

import Slot from './Slot'

const useStyle = createUseStyles({
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    columnGap: '1rem',
    rowGap: '1rem',
    margin: '0 auto',
    width: '50vw',
    height: '50vw'
  }
})

const Board = ({ slots, heroes }) => {
  const classes = useStyle()

  return (
    <main className={classes.board}>
      {Object.keys(slots).map(
        position => (
          <Slot
            key={position}
            level={slots[position]}
            hasHero={Object.values(heroes).includes(position)}
          />
        )
      )}
    </main>
  )
}

export default Board
