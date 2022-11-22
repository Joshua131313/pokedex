import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetNextPrevPoke = ({id}) => {
  const [next, setNext] = useState({})
  const [prev, setPrev] = useState({})
  useEffect(()=> {
    if(id - 1 >= 1) {
      axios.get()
    }
  }, [id])

  return
}
export default GetNextPrevPoke