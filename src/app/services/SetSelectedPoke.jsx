import React, { useContext } from 'react'
import { StoreContext } from '../../ContextAPI'

const useSetSelectedPoke = ({pokemon, changeIndex}) => {
  const {setSelectedPoke, selectedPoke} = useContext(StoreContext)

  const handleActivePoke = () => {
    let tempState = [...selectedPoke]
    let index = tempState.findIndex(x=> x.id === pokemon.id)

    if (changeIndex) {
      tempState.splice(index, 1)
      tempState.push(pokemon)
    }
    else if(tempState?.some(x=> x.id === pokemon.id)) {
      tempState.splice(index, 1)
    }
    else {
      tempState.push(pokemon)
    }
    setSelectedPoke([...tempState])
  }
  return handleActivePoke
}

export default useSetSelectedPoke