import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../ContextAPI'

const useGetSearched = (props) => {
  const {pokemon} = props
  const [pokemonDetails, setPokemonDetails] = useState({})
  const {addNoti} = useContext(ContextApp)

  useEffect(()=> {
    axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((results)=> {
      setPokemonDetails(results.data)
    }).catch((err)=> {console.log(err)})
  }, [pokemon])
  
  return pokemonDetails
}
export default useGetSearched