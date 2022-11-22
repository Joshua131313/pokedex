import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../../ContextAPI'

const useGetVideoGames = (props) => {
  const {order, fetchMore, setFetchMore} = props
  const [videoGames, setVideoGames] = useState([])
  const [length, setLength] = useState(0)
  const {addNoti} = useContext(StoreContext)
  const [next, setNext] = useState('')
  
  const handleFetch = (url) => {
    axios.get(url).then((results)=> {
      setVideoGames(prev=> [...prev, ...results.data.results])
      setNext(results.data.next)
      setLength(results.data.count)
      setFetchMore(false)
    }).catch((err)=> console.log(err))
  }

  useEffect(()=> {
    handleFetch('https://pokeapi.co/api/v2/version')
  }, []) 

  useEffect(()=> {
    if(fetchMore) {
      handleFetch(next)
    }
  }, [fetchMore, next])
  
  return {videoGames, length}
}
export default useGetVideoGames