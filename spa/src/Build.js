import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
  build: {}
})

const Build = ({ level }) => {
  const classes = useStyle()

  return (
    <div className={classes.build}>
      {level}
    </div>
  )
}

export default Build
