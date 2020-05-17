import { createUseStyles } from 'react-jss'

const useBoardStyle = createUseStyles({
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

export useBoardStyle
