import React from 'react'
import EvolutionTrigger from '../EvolutionTrigger'
import EvolutionItem from '../EvolutionItem'

const EvolutionChain = (props) => {
  const {evolutionLine} = props
  let evolutions = [
    {
      pokemon: evolutionLine?.chain?.species.name,
    },
    {
     trigger: evolutionLine.chain?.evolves_to[0]?.evolution_details[0].trigger.name,
      req: evolutionLine?.chain?.evolves_to[0]?.evolution_details[0]
    },
    {
      pokemon: evolutionLine?.chain?.evolves_to[0]?.species.name,
    },
    {
     trigger: evolutionLine?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0].trigger.name,
     req: evolutionLine?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
    },
    {
      pokemon: evolutionLine?.chain?.evolves_to[0]?.evolves_to[0]?.species.name
    }
  ]
  const evolutionsrow = evolutions.map(evolution=> {
    if(evolution.pokemon) {
      return (
        <EvolutionItem 
          pkm={evolution.pokemon}  />
       )
    }
    else if (evolution.trigger) {
      return (
        <EvolutionTrigger
          trigger={evolution.trigger} 
          req={evolution.req}
          />
      )
    }
 })
  return (
    <div className="evolutionline flexrow">
      {evolutionsrow}
    </div>
  )
}
export default EvolutionChain