import React from 'react'
import './Input.css'

const Appinput = (props) => {
  const {
  type='text', value, 
  setValue, placeholder, 
  disabled=false, 
  readonly=false,
  required=true, 
  icon, text, img='https://i.imgur.com/9vjciKz.png'} = props
  return (
    <label className='appinput'>
     
      <input 
      placeholder={placeholder}
      value={value}
      onChange={e=>setValue(e.target.value)}
      type={type}  
      title={placeholder}
      readOnly={readonly}
      required={required} 
      min={0}
      disabled={disabled}/>
       {icon && <i className={icon}></i>}
      {(img && !icon) && <img src={img} alt=''/>}
      {text&&<span>{placeholder}</span>}
   </label>
  )
}
export default Appinput