import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetAbilityDetails = (props) => {
  const {selectedAbility} = props
  const [abilityDetails, setAbilityDetails] = useState([])
  const {addNoti} = useContext(StoreContext)

  
  useEffect(()=> {
      axios.get(`https://pokeapi.co/api/v2/ability/${selectedAbility}`).then((results)=> {
        setAbilityDetails(results.data)
      }).catch((err)=> {console.log(err)})
  }, [selectedAbility])
  
  return abilityDetails
}
export default useGetAbilityDetails