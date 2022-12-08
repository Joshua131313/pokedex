import React, { useContext } from 'react'
import { StoreContext } from '../../ContextAPI'
import { db, firestore } from '../../Fire'
import { returnPokeObj } from '../utils/Functions'

const useSetSelectedPoke = ({pokemon, changeIndex}) => {
  const {setSelectedPoke, selectedPoke} = useContext(StoreContext)
  const {user} = useContext(StoreContext)
  const handleActivePoke = () => {
    let tempState = [...selectedPoke]
    let index = tempState.findIndex(x=> x.id === pokemon.id)
    let pokeObj = returnPokeObj(pokemon, true)
    if(user) {
      if(selectedPoke?.some(x=> x.pokemonId === pokemon.id) && !changeIndex) {
        db.collection('users').doc(user.uid).update({
          selectedPoke: firestore.FieldValue.arrayRemove(pokeObj)
        })
      }
      else {
        db.collection('users').doc(user.uid).update({
          selectedPoke: firestore.FieldValue.arrayUnion(pokeObj)
        })
      }
    }
    else {
      if(tempState?.some(x=> x.id === pokemon.id)) {
        tempState.splice(index, 1)
      }
      else {
        tempState.push(pokeObj)
      }
      setSelectedPoke([...tempState])
    }
   
  }
  return handleActivePoke
}

export default useSetSelectedPoke