import React from 'react'
import { gameCovers } from '../../data/Arrays'
import ImgLoaded from '../Imgloaded/Imgloaded'
import './Videogame.css'

const Videogame = (props) => {
  const {name, url} = props.videogame
  return (
    <>
    {gameCovers?.find(x=> x.name === name)?.img ? 
      <div className={`videogame ${gameCovers?.find(x=> x.name === name)?.isVertical?'verticalvg':'sqvg'}`}>
        <ImgLoaded img={gameCovers?.find(x=> x.name === name)?.img}/>
      </div>
      : ''
    }
    </>
  )
}
export default Videogame