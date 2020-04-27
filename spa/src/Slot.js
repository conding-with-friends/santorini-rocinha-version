import React from 'react'
import { createUseStyles } from 'react-jss'

import Build from './Build'
import Hero from './Hero'

const useStyle = createUseStyles({
  slot: {
    border: '1px solid #000'
  }
})

const Slot = ({ level, hasHero }) => {
  const classes = useStyle()

  return (
    <div className={classes.slot}>
      <Build level={level} />
      {hasHero && <Hero />}
    </div>
  )
}

export default Slot
