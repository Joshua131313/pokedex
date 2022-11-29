import React from 'react'
import './Icon.css'

const Icon = (props) => {

  const {icon, onClick} = props
  
  return (
    <div className="icon">
        <i className={icon} onClick={()=> onClick()}></i>
    </div>
  )
}
export default Icon