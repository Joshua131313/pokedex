import React from 'react'
import useGetPokemonDetails from '../../../../../services/GetPokemonDetails'
import Nextpoke from './Subparts/Nextpoke'

const Nextprevpoke = (props) => {
  const {pokemon, setSelected} = props
  const next = useGetPokemonDetails({pokemon: pokemon + 1})
  const prev = useGetPokemonDetails({pokemon: pokemon - 1})
  // const Nextpoke = (props) => {
  //   const {poke} = props
  //   if(poke.id) {
  //     return (
  //       <div className="nextpoke" onClick={()=> }>
  //         <ImgLoaded img={poke?.sprites?.other.home.front_default}/>
  //         <span className='pokename'>{poke?.name}</span>
  //         <span className='pokemonid'>#{poke?.id}</span>
  //       </div>
  //     )
  //   }
  //   else {
  //     return ''
  //   }
  // }
  return (
    <div className="nextprevpoke bubble">
        <Nextpoke poke={prev} setSelected={setSelected}/>
        <div className="seperator"></div>
        <Nextpoke poke={next} setSelected={setSelected}/>
    </div>
  )
}
export default Nextprevpoke