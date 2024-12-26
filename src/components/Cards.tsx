import React from 'react'
import { ReactDOM } from 'react'
import {useState, useEffect} from 'react'
import '../style/Cards.scss'

export const Cards = () => {

    type PokemonList = [{
        name: string
        url: string
    }]

    const [pokemonList, setPokemonList] = useState<PokemonList|[]>([])
    const [images, setImages] = useState<string[]>([])


    // console.log(pokemonList[0]?.url)

    console.log(images)

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
                console.log('fetched pokemon from api')
                setPokemonList(data.results)
            })
    }, [])
    useEffect(()=>{
        const populatedImageList:string[] = [];
        pokemonList.map((pokemon)=>{
            fetch(pokemon.url)
            .then((res) => {
                return res.json(); 
            })
            .then((pokemon:Pokemon) => {
                // console.log(pokemon)
                const length = populatedImageList.length
                if (pokemon.sprites.front_shiny_female) {
                    populatedImageList[length]= pokemon.sprites.front_shiny_female
                }
                else if (pokemon.sprites.front_shiny) {
                    populatedImageList[length]=pokemon.sprites.front_shiny
                }
                else if (pokemon.sprites.front_female) {
                    populatedImageList[length]=pokemon.sprites.front_female
                } else {
                    populatedImageList[length]=pokemon.sprites.front_default
                }
                setTimeout(()=>{setImages(populatedImageList)}, 100)
                // setImages(populatedImageList)
                console.log("updated images list")
            }).then(()=> {
                setImages(populatedImageList)
            })
        })
        
    },[pokemonList]) 
    // useEffect(()=> {
    //     setImages(populatedImageList)
    // })
    


  return (
    <>
    {images.map((image, index)=> <div key={index} className='pokemon' style={{background:`url(${image})`}}></div>)}
    {images.length}
    </>
  )
}
