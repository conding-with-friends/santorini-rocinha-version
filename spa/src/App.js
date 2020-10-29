import React from 'react'
import { ThemeProvider } from 'react-jss'

import { AppProvider } from './app-context'
import Board from './Board'

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Board />
      </ThemeProvider>
    </AppProvider>
  )
}

export default App
