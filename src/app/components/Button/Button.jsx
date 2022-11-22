import React from 'react'
import './Button.css'
const Button = (props) => {
  const {text, icon, onClick, className='', disabled, img} = props


  return (
  <button className={className+' appbtn'} onClick={()=>onClick && onClick()} disabled={disabled}>
    {icon&&<i className={icon}></i>}
    {img && <img alt='' src={img}/>}
    {text && <span>{text}</span> }
  </button>
  )
}
export default Button