import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pokemoncardinfo from '../../../../components/Pokemoncard/Pokemoncardinfo'
import useGetSpeciesDetails from '../../../../services/GetSpeciesDetails'
import { getWeaknesses, replaceSpecialChar } from '../../../../utils/Functions'
import useLocalStorage from '../../../../utils/useLocalStorage'
import Boxinfo from './Parts/Boxinfo'
import GenerationImages from './Parts/Subparts/GenerationImages'
import Move from './Parts/Subparts/Move'
import Weakness from './Parts/Subparts/Weakness'

const Pokemonpage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(location.state || {})
  const [limitMoves, setLimitMoves] = useState(10)
  const [listView, setListView] = useLocalStorage('listView', 'icons')
  const speciesDetails = useGetSpeciesDetails({pokemon: pokemon?.id})
  const weaknesses = getWeaknesses(pokemon)
  const movesrow = (props) => {
    const {pattern, limit} = props
    return pokemon?.moves?.filter(x=> pattern.test(replaceSpecialChar(x?.move?.name).toLowerCase())).map(move=> {
      return (
        <Move move={move} />
      )
    })
  }
  const weaknessrow = weaknesses?.map(weakness=> {
    return <Weakness weakness={weakness} />
  })
  // const imgsrow = pokemon?.sprites?.versions?.map(version=> {
  //   return 'asd'
  // })
  const imgsrow = pokemon.id && Object.keys(pokemon?.sprites?.versions).map(el=> {
    let root = pokemon?.sprites?.versions
    return <GenerationImages generation={root} objKey={el} />
  })
  useEffect(()=> {
    //move.version_group_details[move.version_group_details.length-1] .level_learned .move_learned_method.name
    if(!pokemon.id) { 
      axios.get(`https://pokeapi.co/api/v2/pokemon/${location.pathname.split('&')[1]}`).then(results=> {
        setPokemon(results.data)
        navigate({}, {state: results.data})
      }) 
    }
  }, [pokemon, location])
  // speciesDetails?.flavor_text_entries[2]?.flavor_text
  return (
    <div className="pokemonpage">
      <div className="pokemonpageinfo">
           <Pokemoncardinfo pokemon={pokemon} isNotLink={true}/>
      </div>
      <Boxinfo title='Description'>
          <div className="pokemondescrip">
            <span>{replaceSpecialChar(speciesDetails?.flavor_text_entries?.[2]?.flavor_text)}</span>
          </div>
      </Boxinfo>
      <Boxinfo title='Abilities'/>
      <Boxinfo title='Evolution line'/>
      <Boxinfo title='other details'/>
      <Boxinfo title='Weaknesses'>
        <div className="weaknesses">
          {weaknessrow}
        </div>
      </Boxinfo>
      <Boxinfo title='Stats'/>
      <Boxinfo title='Images'>
        <div className="pokemonimgs">
          {imgsrow}
        </div>
      </Boxinfo>
      <Boxinfo setListView={setListView} listView={listView}  title='Moves Learned'  showInput placeholder='Search moves...' icon='fal fa-compact-disc'>
        {props=> (
           <div className={`moves flexrow flexwrap ${listView === 'list'?'moveslistview':''}`}>
             {movesrow(props)}  
            </div>
        )}
      </Boxinfo>
      {/* <Boxinfo title='possible moves to learn'/> */}
    </div>
  )
}
export default Pokemonpage