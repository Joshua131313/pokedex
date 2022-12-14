import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../../ContextAPI'

const useGetPokemon = ({limit=2, scrolledBtm, setScrolledBtm, offset, end, order, fetchMore, setFetchMore }) => {
  const [pokemon, setPokemon] = useState([])
  const {addNoti, activeType} = useContext(StoreContext)
  const [nextFetch, setNextFetch] = useState('')
  const [length, setLength] = useState(0)
  const isDsc = order === 'dsc' || offset > end 
  const fetchPoke = (url, key, handleAction) => {
    axios.get(url).then((results)=> {
      let reversed =  isDsc? [...results.data[key]].reverse():[...results.data[key]]
        if(activeType.name === 'all') {
          setPokemon(prev=> prev[0]?.name === reversed[0].name ? [...prev] : [...prev, ...reversed])
        }
      else {
          setPokemon(prev=> [...prev, ...reversed])
        }
        setLength(results.data.count)
        if(isDsc) {
          setNextFetch(results.data.previous)
          setLength(results.data.previous?results.data.count:Infinity)
        }
        else {
          setNextFetch(results.data.next)
        }
        handleAction && handleAction()
      }).catch(()=> addNoti('fal fa-exclamation-circle', 'Something went wrong...'))
  }
  const handleLimit = () => {
   return limit >= 0?limit:parseFloat(offset)-parseFloat(end)
  }
  const handleOffset = () => {
    if(order === 'dsc') {
      return 898 
    }
    else if (offset > end) {
      return end
    }
    return offset
  }
 
  useEffect(()=> {
    if (fetchMore) {
        if(activeType.name === 'all') {
          fetchPoke(nextFetch, 'results', setFetchMore)
        }
        else {
          fetchPoke(activeType.url, 'pokemon', setFetchMore)
        }
      }
  }, [fetchMore, activeType])
  // useEffect(()=> {
  //   let timerId = setInterval(()=> {setLastFetched(prev=> prev + 1)}, 1000)
  //   if (scrolledBtm && lastFetched > 3) {
  //       if(activeType.name === 'all') {
  //         fetchPoke(nextFetch, 'results')
  //       }
  //       else {
  //         fetchPoke(`https://pokeapi.co/api/v2/type/${activeType.name}`, 'pokemon')
  //       }
  //       setScrolledBtm(false)
  //       setLastFetched(0)
  //     }
  //     return ()=> clearInterval(timerId)
  // }, [scrolledBtm, activeType, pokemon, nextFetch, lastFetched, order, activeType])
  useEffect(()=> {
    setPokemon([])
    if(activeType.name === 'all') {
      fetchPoke(`https://pokeapi.co/api/v2/pokemon?limit=${handleLimit()}&offset=${parseFloat(handleOffset())}`, 'results')
    } 
    else {
      fetchPoke(activeType.url, 'pokemon')
    }
  }, [limit, activeType, offset, order])
  

  return {pokemon, length}
}
export default useGetPokemon