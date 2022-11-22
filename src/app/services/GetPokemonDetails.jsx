import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetPokemonDetails = (props) => {
  const {pokemon, details} = props
  const [pokemonDetails, setPokemonDetails] = useState([])
  const {addNoti} = useContext(StoreContext)

  useEffect(()=> {

     if(details) {
      setPokemonDetails(details)
    }
    else {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((results)=> {
        setPokemonDetails(results.data)
      }).catch((err)=> {console.log(err)})
    }
  }, [pokemon, details])
  
  return pokemonDetails
}
export default useGetPokemonDetails