import React from 'react'
import EvolutionTrigger from '../EvolutionTrigger'
import EvolutionItem from '../EvolutionItem'

const EvolutionWeb = (props) => {
  const {evolutionWeb, pkm} = props
  const evolutionCol = evolutionWeb?.map(evolution=> {
    return (
        <div className='evolutionwebitem flexrow'>
          <EvolutionTrigger trigger={evolution.evolution_details[0].trigger.name} req={evolution.evolution_details[0]} />
          <EvolutionItem pkm={evolution.species.name} />
        </div> 
    )
  })
  return (
    <div className="evolutionline flexrow">
      <EvolutionItem pkm={pkm} />
      <div className="flexcol evolutions">
       {evolutionCol}
      </div>
    </div>
  )
}
export default EvolutionWeb