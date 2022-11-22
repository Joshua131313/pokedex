import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetItemDetails = (props) => {
  const {item} = props
  const [itemDetails, setItemDetails] = useState([])
  const {addNoti} = useContext(StoreContext)

  
  useEffect(()=> {

      axios.get(`https://pokeapi.co/api/v2/item/${item}`).then((results)=> {
        setItemDetails(results.data)
      }).catch((err)=> {console.log(err)})

  }, [item])
  
  return itemDetails
}
export default useGetItemDetails