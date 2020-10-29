import React, { useState, useEffect, useContext } from 'react'

import WatcherBoard from './WatcherBoard'
import Setup from './Setup'
import MoveAndBuild from './MoveAndBuild'
import AppContext from './app-context'
import Slot from './Slot'

const Board = () => {
  const [{ isMyTurn, phase }] = useContext(AppContext)

  if (!isMyTurn) return <WatcherBoard />
  if (phase === 'SETUP') return <Setup />

  return <MoveAndBuild />
}

export default Board
