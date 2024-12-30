import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Cards } from "./components/Cards";
import { GameControls } from "./components/GameControls";
import "./style/App.scss";
import { Scoreboard } from "./components/Scoreboard";


function App() {
  const [number, setNumber] = useState(24);
  const [storedPokemon, setStoredPokemon] = useState<storedPokemon[]>([]);
  const [bestScore, setBestScore] = useState<number>(0);
  interface storedPokemon {
    id: number;
    name: string;
    image: string;
    memorized: boolean;
  }
  type PokemonList = [
    {
      name: string;
      url: string;
    }
  ];

  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      front_shiny?: string;
      front_female?: string;
      front_shiny_female?: string;
    };
  }

  useEffect(() => {
    if(storedPokemon.length>=number) {
      setStoredPokemon([...storedPokemon].slice(0, number))
      return
    }
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=0`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("fetched pokemon list from api");
        return data.results;
      })
      .then((res: PokemonList) => {
        Promise.all(
          res.map((pokemon) => {
            return fetch(pokemon.url).then((res) => res.json());
          })
        )
          .then((res) => {
            console.log(res);
            const returnedPokemonList: storedPokemon[] = [];
            res.map((pokemon: Pokemon) => {
              const returnedPokemon: storedPokemon = {
                id: pokemon.id,
                name: pokemon.name,
                memorized: false,
                image: "",
              };
              if (pokemon.sprites.front_shiny_female) {
                returnedPokemon.image = pokemon.sprites.front_shiny_female;
              } else if (pokemon.sprites.front_shiny) {
                returnedPokemon.image = pokemon.sprites.front_shiny;
              } else if (pokemon.sprites.front_female) {
                returnedPokemon.image = pokemon.sprites.front_female;
              } else {
                returnedPokemon.image = pokemon.sprites.front_default;
              }
              returnedPokemonList.push(returnedPokemon);
            });
            return returnedPokemonList;
          })
          .then((res) => {
            setStoredPokemon(res);
          });
      });
  }, [number]);

  const randomizePokemon = () => {
    const array = [...storedPokemon];

    let currentIndex = array.length;
    console.log(currentIndex);

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setStoredPokemon(array);
    console.log(storedPokemon);
  };


  // const [tries, setTries] = useState(0);

  const restart = (value) => {
    setNumber(value)
    setStoredPokemon(storedPokemon.map((element)=>({...element, memorized:false })))
  };

  const handleCardClick = (id:number) => {
    if(storedPokemon[id].memorized) {
      restart(number)
      return
    }
    
    randomizePokemon();
    const newStoredPokemon = [...storedPokemon]
    newStoredPokemon[id].memorized=true
    if(score()>bestScore) setBestScore(score())
  }

  const score = () => storedPokemon.reduce((acc, curr)=>acc+(+curr.memorized), 0)

  

  return (
    <>
      <Scoreboard best={bestScore} current={score()}></Scoreboard>

      <GameControls handleRestartClick={restart}></GameControls>{" "}
      <Cards key={`${number}`} storedPokemon={storedPokemon} handleCardClick={handleCardClick}></Cards>
    </>
  );
}

export default App;
