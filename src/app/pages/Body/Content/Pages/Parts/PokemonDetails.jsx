import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../../../../../ContextAPI'
import { pokemonDetailsDimensions } from '../../../../../data/Arrays'
import getMultipliers, {editState, getWeaknesses, reduceTypes, replaceSpecialChar } from '../../../../../utils/Functions'
import useGetSpeciesDetails from '../../../../../services/GetSpeciesDetails'
import AbilityModal from './AbilityModal'
import Nextprevpoke from './Nextprevpoke'
import Weakness from './Subparts/Weakness'
import Evolutionline from '../../../../../components/Evolutionline/Evolutionline'
import ImgLoaded from '../../../../../components/Imgloaded/Imgloaded'
import Pokemoncardinfo from '../../../../../components/Pokemoncard/Pokemoncardinfo'
import Stat from '../../../../../components/Stat/Stat'
import Button from '../../../../../components/Button/Button'
import Dropdown from '../../../../../components/Dropdown/Dropdown'
import { createNewTeam, generateID } from '../../../../../utils/DBFunctions'
import useGetTeams from '../../../../../services/GetTeams'

const PokemonDetails = ({left, responsiveWidth}) => {
  const {hidePokeDetails, shinyArray,  setHidePokeDetails, selectedPoke, setSelectedPoke, setActiveType, teams, setTeams} = useContext(StoreContext)
  const [selected, setSelected] = useState(selectedPoke[selectedPoke.length-1])
  const speciesDetails = useGetSpeciesDetails({pokemon: selected?.id})
  const [selectedAbility, setSelectedAbility] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [openID, setOpenID] = useState(null)
  // const [teams, setTeams] = useGetTeams()

  // console.log(speciesDetails)
  let reducedtypes = reduceTypes(selected?.types) || []
  const multipliers = reducedtypes.length && getMultipliers(reducedtypes)

  const weaknesses = getWeaknesses(selected)
  const Title = ({title}) => (
    <h4 className='desctitle'>{title}</h4>
  )
  const Detail = ({text, title}) => (
    <div className="flexcol detail">
      <span>{title}</span>
      <div className="bubble">{text}</div>
    </div> 
  )
  const weaknessrow = weaknesses?.map(weakness=> {
    return (
      <Weakness weakness={weakness} setActiveType={setActiveType} />
    )
  })
  const statsrow = selected?.stats?.map(stat=> {
    return (
      <Stat stat={stat} />
    )
  })
  const stattotal = selected?.stats?.reduce((prev, cur)=> {
    return prev + cur.base_stat
  }, 0)
  const abilitiesrow = selected?.abilities?.map(ability=> {
    return (
      <div className={`ability bubble ${ability.is_hidden?'hiddenability':''}`} onClick={()=> setSelectedAbility(ability.ability.name)}>
        {ability.ability.name}
        {ability.is_hidden && <i className='fal fa-eye-slash'></i>}
      </div>
    )
  })
  const handleDelete = (e, id) => {
    e.preventDefault()
    let tempState = [...selectedPoke]
    let i = tempState.findIndex(x=> x.id === id)
    tempState.splice(i, 1)
    setSelectedPoke([...tempState])
    
  }
  const selectedrow = selectedPoke?.map(poke=> {
    return (
     <div className={`flexrow selectedpokeitem ${selected?.id === poke.id?'activeselectedpokeitem':''}`} onClick={()=> {setSelected(poke); setShowOptions(false)}} 
      onContextMenu={e=> {handleDelete(e, poke.id)}}
     >
        <ImgLoaded img={shinyArray?.includes(poke?.id)?poke?.sprites?.other.home.front_shiny:poke?.sprites?.other.home.front_default} />
        <span>{poke.name}</span>
     </div>
    )
  })
  const teamOptions = [
    ...teams,
    {
      icon: 'fal fa-plus',
      text: 'New team',
      onClick: ()=> {
        let teamName = prompt('New team name:')
        createNewTeam(teamName, selected, teams, (val)=> setTeams(val))
      }
    }
  ]
  
  useEffect(()=> {
    setSelected(selectedPoke[selectedPoke.length-1])
  }, [selectedPoke])
  useEffect(()=> {
    if(showOptions) {
      window.onclick = () => {
        setShowOptions(false)
      } 
    }
  }, [showOptions])
  return (
    <div className="pokemondetails" style={{left, width: pokemonDetailsDimensions.width}}>
      <div className='hidesidebaricon hidepokedetails' onClick={(e)=> {setHidePokeDetails(!hidePokeDetails); }} >
       <i  className={`fal fa-chevron-${!hidePokeDetails?'right':'left'}`}></i>     
      </div>
      <i className='fal fa-ellipsis-h listpokemon' onClick={(e)=>{setShowOptions(!showOptions); e.stopPropagation()}}></i>
      <div onClick={e=> e.stopPropagation()} className={`selectedpokepreview ${showOptions?'activeselectedpokepreview':''}`}>
        {selectedrow}
      </div>
      <Pokemoncardinfo classNameImg={'selectpokeimg'} pokemon={selected}/>
      <div className="innerpokemondetails flexcol">
        {
        selected?.id ? <>
        <Title title='Pokemon Description'/>
        {speciesDetails.id && <span className='pokedescr'>{speciesDetails && replaceSpecialChar(speciesDetails?.flavor_text_entries[0]?.flavor_text)}</span>}
        <Title title='Abilties'/>
        <div className="abilityrow flexrow">
          {abilitiesrow}
        </div>
        <Evolutionline speciesDetails={speciesDetails} />

        <Title title='Other Details'/>
        <div className="heightweight detailrow flexrow">
          <Detail title='Height' text={parseFloat(selected?.height)/10+'m'} />
          <Detail title='Weight' text={parseFloat(selected?.weight)/10+'kg'} />
        </div>
        <div className="exp detailrow flexrow">
        <Detail title='Base Exp' text={parseFloat(selected?.base_experience)} />
        <Detail title='Default Form' text={selected?.is_default?'True':'False'} />
        </div>
        <div className="weaknessexp detailrow flexrow">
          <Detail title='Weaknesses' text={weaknessrow} />
        </div>
        <div className="statsrow detailrow">
          <div className="flexcol detail">
            <span>Stats</span>
            <div className="flexrow statsrow">
              {statsrow}
              <Stat stat={{base_stat: stattotal, stat: {name: 'total'}}} hov={true}/>
            </div>
          </div>
        </div>
       <Nextprevpoke pokemon={selected?.id}/>
        </>
        :
        <>
        <h3 className='noselected'>No selected Pokemon!</h3>
        <h5 className="noselected red">Select a Pokemon for more details.</h5>
        </>
        }
        <div className="extracontrols flexrow">
          <Button text='Compare'/>
          <Dropdown id={1} openID={openID} setOpenID={setOpenID} options={teamOptions} top={40} pokemon={selected}>
            <Button text='Add to team'/>
          </Dropdown>
        </div>

      </div>
      <AbilityModal selectedAbility={selectedAbility} setSelectedAbility={setSelectedAbility} />
    </div>
  )
}
export default PokemonDetails