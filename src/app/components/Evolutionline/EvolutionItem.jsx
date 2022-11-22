import React, { useContext } from 'react'
import ImgLoaded from '../Imgloaded/Imgloaded'
import Item from './Item'
import { StoreContext } from "../../../ContextAPI";
import useGetPokemonDetails from '../../services/GetPokemonDetails';


const EvolutionItem = (props) => {
  const {pkm} = props
  const pokemonDetails = useGetPokemonDetails({pokemon: pkm})
  const {setSelectedPoke} = useContext(StoreContext)
  return (
    <div onClick={()=> setSelectedPoke(prev=> [...prev, pokemonDetails])} className="evolutionitem flexrow ac">
      <ImgLoaded img={pokemonDetails?.sprites?.other.home.front_default} />
    </div>
  )
}
export default EvolutionItem