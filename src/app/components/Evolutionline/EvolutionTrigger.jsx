import React from 'react'
import { determineEvolutionText } from '../../utils/Functions'
import Item from './Item'

const EvolutionTrigger = (props) => {
  const {trigger, req} = props
  let cond = req?.min_level?req.min_level:req?.item?req?.item.name:''

  return (
    <div className="trigger">
      <span>{determineEvolutionText(trigger).text}</span>
      {determineEvolutionText(trigger).img?<Item  item={cond} />:<span>{cond}</span>}
     </div>
  )
}
export default EvolutionTrigger