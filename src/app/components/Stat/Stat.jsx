import React, {useState, useEffect} from 'react'
import { getStat } from '../../utils/Functions'
import './Stat.css'

const Stat = (props) => {
  const {stat, isTotal, hov} = props
  let statName = stat?.stat.name
  const [hovered, setHovered] = useState(hov)

  useEffect(()=> {setHovered(hov)}, [hov])

  return (
    <div  
      onMouseOver={()=> setHovered(!hov)}
      onMouseLeave={()=> setHovered(hov)}
      className="stat flexcol" style={{background: hovered?getStat(statName).color:'var(--gray)'}}>
      <div className="statcircle" style={{background: hovered?'#fff':getStat(statName).color, color: hovered?getStat(statName).color:'#fff'}}>{getStat(statName).text}</div>
       <span className='statval' style={{color: hovered?'#fff':'#000'}}>{stat.base_stat}</span>
    </div>
  )
}
export default Stat