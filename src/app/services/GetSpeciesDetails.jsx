import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetSpeciesDetails = (props) => {
  const {pokemon} = props
  const [speciesDetails, setSpeciesDetails] = useState({})
  const {addNoti} = useContext(StoreContext)

  useEffect(()=> {
    if(pokemon) {
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`).then((results)=> {
        setSpeciesDetails(results.data)
      }).catch((err)=> {console.log(err)})
      // .catch(()=> addNoti('fal fa-exclamation-circle', 'Something went wrong...'))
    }
  }, [pokemon])
  
  return speciesDetails
}
export default useGetSpeciesDetails