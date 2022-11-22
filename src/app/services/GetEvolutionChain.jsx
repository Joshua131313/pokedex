import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetEvolutionChain = (props) => {
  const {speciesDetails} = props
  const [evolutionChain, setEvolutionChain] = useState([])
  const {addNoti, selectedPoke} = useContext(StoreContext)

  useEffect(()=> {
    setEvolutionChain([])
  }, [selectedPoke])
  useEffect(()=> {
      axios.get(speciesDetails?.evolution_chain?.url).then((results)=> {
        setEvolutionChain(results.data)
      }).catch((err)=> {console.log(err)})

  }, [speciesDetails])
  
  return evolutionChain
}
export default useGetEvolutionChain