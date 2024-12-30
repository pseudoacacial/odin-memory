import React from 'react'

export const Scoreboard = (props:{current:number, best:number}) => {
  return (
    <div className="scoreboard">
    <div>score: {props.current}</div>
    <div>best score: {props.best}</div>
    </div>
  )
}
