import React from 'react'
import { ThemeProvider } from 'react-jss'

import Board from './Board'

const initialState = {
  playersCount: 2,
  currentPlayer: 0,
  phase: 'SETUP',
  board: {
    '0,0': 0, '1,0': 1, '2,0': 2, '3,0': 3, '4,0': 4,
    '0,1': 0, '1,1': 0, '2,1': 0, '3,1': 0, '4,1': 0,
    '0,2': 0, '1,2': 0, '2,2': 0, '3,2': 0, '4,2': 0,
    '0,3': 0, '1,3': 0, '2,3': 0, '3,3': 0, '4,3': 0,
    '0,4': 0, '1,4': 0, '2,4': 0, '3,4': 0, '4,4': 0
  },
  heroes: {
    '0,0': '0,4', '0,1': null,
    '1,0': null, '1,1': null
  }
}

const App = () => {
  const { board: slots, heroes } = initialState

  return (
    <ThemeProvider>
      <Board slots={slots} heroes={heroes} />
    </ThemeProvider>
  )
}

export default App
