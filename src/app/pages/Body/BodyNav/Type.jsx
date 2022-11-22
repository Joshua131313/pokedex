import React, { useContext, useState } from 'react'
import { StoreContext } from '../../../../ContextAPI'
import { determineColor } from '../../../utils/Functions'

const TypeC = (props) => {
  const [hovered, setHovered] = useState(false)
  const {hideSideBar} = props
  const {type, setType, activeType, setActiveType} = useContext(StoreContext)
  const active = activeType.name === props.type
  // type.some(x=> x.name === props.type)
  const color = (hovered || active)?'#fff':determineColor(props.type)
  const background = (hovered || active)?determineColor(props.type):'var(--gray)'
  
  const handleSetType = () => {
    if(active) {
      let tempState = [...type]
      let i = tempState.findIndex(x=> x.name === props.type)
      tempState.splice(i, 1)
      setType(tempState)
    }
    else {
      setType(prev=> [...prev, {name: props.type, url: props.url}])
    }
  }

  return (
    <div className={`type ${active?'activetype':''}`}
      onMouseOver={()=> setHovered(true)}
      onMouseLeave={()=> setHovered(false)}
      style={{background, color}}
      onClick={()=> active?setActiveType({name: 'all', url:''}):setActiveType({name: props.type, url: props.url})}
    >
      <span>{props.type}</span>
      <span className={`preview ${hideSideBar?'previewv':''}`}>{props?.type[0]}</span>
    </div>
  )
}
export default TypeC