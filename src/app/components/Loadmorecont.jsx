import React, { useContext } from 'react'
import { StoreContext } from '../../ContextAPI'
import Button from './Button/Button'

const Loadmorecont = ({fetchMore, setFetchMore, pokedex, complete}) => {
  const {activeType} = useContext(StoreContext)
  const handleRender = () => {
    if(fetchMore) {
      return <i className='fas fa-circle-notch fa-spin loaderbtn'></i>
    }
    else if(activeType.name === 'all') {
      return <Button text='Load more' onClick={()=> setFetchMore(true)}/>
    }
    else if (!pokedex) {
      return <Button text='Load more' onClick={()=> setFetchMore(true)}/>
    }
    return ''
  }

  return (
    <div className='bottomdiv'>
      {complete? '':handleRender()}
    </div>
  )
}
export default Loadmorecont