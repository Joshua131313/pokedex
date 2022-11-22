import React from 'react'
import useGetEvolutionChain from '../../services/GetEvolutionChain'
import EvolutionItem from './EvolutionItem'
import './Evolutionline.css'
import EvolutionChain from './EvolutionTrees/EvolutionChain'
import EvolutionWeb from './EvolutionTrees/EvolutionWeb'
import EvolutionTrigger from './EvolutionTrigger'
const Evolutionline = (props) => {
  const {speciesDetails} = props
  const evolutionLine = useGetEvolutionChain({speciesDetails})
 //evolutionLine?.chain?.evolves_to?.length > 1?
 //evolutionLine?.chain?.evolves_to?.find(x=> x.species.name === speciesDetails.name)
 //0 evolution
 //evolutionLine.chain.species.name
 //evolutionLine.chain.evolves_to[0].evolution_details[0].trigger.name
 //first evolution
 //evolutionLine.chain.evolves_to[0].evolution_details[0].trigger.name
 //evolutionLine.chain.evolves_to[0].evolution_details[0].min_level
 //evolutionLine.chain..evolves_to[0].evolves_to[0].species.name
 //second evolution
 //evolutionLine.chain.evolves_to[0].evolves_to[0].species.name
 //evolutionLine.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level
 //evolutionLine.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name
//  console.log(evolutionLine?.chain?.evolves_to[0]?.evolves_to[0]?.species.name)
  


  
 return (
    <>{evolutionLine?.chain?.evolves_to.length ?<div className="evolution detailrow">
      <div className="flexcol detail">
        <span>Evolution Line</span>
        <div className="evolutionline">
           {evolutionLine?.chain?.evolves_to?.length > 1?
            <EvolutionWeb pkm={evolutionLine?.chain?.species?.name} evolutionWeb={evolutionLine?.chain?.evolves_to}/>
             :
            <EvolutionChain evolutionLine={evolutionLine} />
           }
        </div>
        <div className="spacer"></div>
      </div>
    </div>:''}</>
  )
}
export default Evolutionline