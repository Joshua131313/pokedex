import React from 'react'
import ImgLoaded from '../../../../../../components/Imgloaded/Imgloaded'
import useSetSelectedPoke from '../../../../../../services/SetSelectedPoke'

const Nextpoke = (props) => {
    const {poke, setSelected} = props
    const handleSelectedPoke = useSetSelectedPoke({pokemon: poke, changeIndex: true})
    if(poke.id) {
      return (
        <div className="nextpoke" onClick={()=>{ handleSelectedPoke(); setSelected(poke)}}>
          <ImgLoaded img={poke?.sprites?.other.home.front_default}/>
          <span className='pokename'>{poke?.name}</span>
          <span className='pokemonid'>#{poke?.id}</span>
        </div>
      )
    }
    else {
      return ''
  }
}
export default Nextpoke