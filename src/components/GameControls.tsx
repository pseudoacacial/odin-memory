import React, { useState } from "react";
import "../style/GameControls.scss";


export const GameControls = (props:{handleRestartClick:Function}) => {
    const [number, setNumber] = useState<number>(24)
  return (
    <div className="gameControls">
      <div className="sizeSetter">
        set size: <input type="number" min="2" placeholder="24" onClick={(event)=>{setNumber(event.target.value)}}></input>
      </div>
      <button onClick={()=>{props.handleRestartClick(number)}}>restart</button>
    </div>
  );
};
