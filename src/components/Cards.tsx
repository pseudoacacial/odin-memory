import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import "../style/Cards.scss";

export const Cards = (props:{number:number}) => {
  type PokemonList = [
    {
      name: string;
      url: string;
    }
  ];
  interface storedPokemon {
    id: number;
    name: string;
    image: string;
    memorized: boolean;
  }
  const [storedPokemon, setStoredPokemon] = useState<storedPokemon[]>([]);

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
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${props.number}&offset=0`)
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
  }, []);

  return (
    <>
      {storedPokemon.map((pokemon) => (
        <div className="pokemon" key={pokemon.id}>
          <div
            className="image"
            style={{ backgroundImage: `url(${pokemon.image})` }}
          ></div>
          <div className="name">{pokemon.name}</div>
        </div>
      ))}
    </>
  );
};
