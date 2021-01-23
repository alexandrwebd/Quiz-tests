import React from 'react'
import classes from './Loader.module.css'

const Loader = (props) => {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        {/* если есть пустые теги их сразу нужно закрывать */}
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
