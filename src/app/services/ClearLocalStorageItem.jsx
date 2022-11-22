import React, { useContext } from 'react'
import { ContextApp } from '../ContextAPI'

const useClearLS = ({keyObj}) => {
  const {setSearchResult} = useContext(ContextApp)
  const clear = () => {
    setSearchResult([])
  }
  return 
} 