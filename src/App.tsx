import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Cards } from "./components/Cards";
import { GameControls } from "./components/GameControls";
import "./style/App.scss";

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(24);
  // const [tries, setTries] = useState(0);

  const restart = function (number: number) {
    setNumber(number);
    // setTries(tries+1)
  };

  return (
    <>
      <GameControls handleRestartClick={restart}></GameControls>{" "}
      <Cards key={`${number}`} number={number}></Cards>
    </>
  );
}

export default App;
