import React from 'react'
import { createUseStyles } from 'react-jss'

import Build from './Build'
import Hero from './Hero'

const useStyle = createUseStyles({
  slot: {
    border: '1px solid #000',
  },
  disabledSlot: {
    composes: '$slot',
    pointerEvents: 'none'
  }
})

const Slot = ({ level, hasHero, ...rest }) => {
  const classes = useStyle()

  return (
    <div className={classes[hasHero ? 'disabledSlot' : 'slot']} {...rest}>
      <Build level={level} />
      {hasHero && <Hero />}
    </div>
  )
}

export default Slot
