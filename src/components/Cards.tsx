import React from 'react'
import { ReactDOM } from 'react'
import {useState, useEffect} from 'react'
import '../style/Cards.scss'

export const Cards = () => {

    type PokemonList = [{
        name: string
        url: string
    }]
    const [images, setImages] = useState<string[]>([])

    interface Pokemon {
        sprites: {
            front_default: string;
            front_shiny?: string;
            front_female?: string;
            front_shiny_female?: string;
        }
    }
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0')
            .then((res) => {
                return res.json(); 
            })
            .then((data) => {
                console.log('fetched pokemon list from api')
                return data.results
            }).then((res:PokemonList) => {
                Promise.all(
                    res.map((pokemon)=>{
                        return fetch(pokemon.url).then(res=>res.json())
                    })
                ).then((res) => {
                    return res.map((pokemon:Pokemon) => {
                        if (pokemon.sprites.front_shiny_female) {
                            return pokemon.sprites.front_shiny_female
                        }
                        else if (pokemon.sprites.front_shiny) {
                            return pokemon.sprites.front_shiny
                        }
                        else if (pokemon.sprites.front_female) {
                            return pokemon.sprites.front_female
                        } else {
                            return pokemon.sprites.front_default
                        }
                    })
                }).then(res=>{setImages(res)})
            
            })      
    }, [])


  return (
    <>
    {images.map((image, index)=> <div key={index} className='pokemon' style={{background:`url(${image})`}}></div>)}
    </>
  )
}
