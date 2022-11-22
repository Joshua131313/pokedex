import React, {useState, useEffect} from 'react'
import './Select.css'


const Appselect = (props) => {
  const { defaultOption, value, setValue, options, icon, className='filled'} = props
  const [visible, setVisible] = useState(false)
  const optionsrow = options.map(option=> {
    return (
      <div className={`selectoption flexrow ${value === option.value?'selectedoption':''}`} onClick={()=> {setValue?.(option.value); setVisible(false)}}>
        <i className={option.icon}></i>
        <span>{option.text}</span>
      </div>
    )
  })
  
  useEffect(()=> {
    if(visible) {
      window.onclick = (e) => {
        setVisible(!visible)
        e.preventDefault()
      }
    }
  }, [visible])

  return (
      <div className={`${className} appselect ${visible?'activeselect':''}`} onClick={e=> e.stopPropagation()}>
        <div className="defaultvalue flexrow sb" onClick={(e)=> {setVisible(!visible); e.stopPropagation()}}> 
          <div className="leftv flexrow">
           <span>{value?options.find(x=> x.value === value).text:defaultOption.text}</span>
          </div>
          <div className="rightv">
            <i className='fal fa-chevron-down'></i>
          </div>
        </div>
        <div className="appselectoptions">
          {optionsrow}
        </div>
      </div>
  )
}
export default Appselect