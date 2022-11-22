import React, { useContext, useEffect, useRef, useState } from 'react'
import './Dropdown.css'
import { Link } from 'react-router-dom';
import { addPokemonToTeam } from '../../utils/DBFunctions';

const Dropdown = (props) => {
  const {options, openID, setOpenID, id, top, pokemon} = props
  const elPos = useRef()
  const optionsrow = options?.map((option, i)=> {
    if(option.download) {
      return (
        <a href='' target='__blank' className='dropoption' key={i}>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </a>
      )
    }
    else if (option.upload) {
      return (
        <label key={i} className='dropoption'>
          <input multiple={false} onChange={(e)=> option.onChange(e)} type="file" style={{display: 'none'}} />
          <i className={option.icon}></i>
          <span>{option.text}</span>
       </label>
      )
    }
    else if(option.link) {
      return (
        <Link key={i} to={option.link} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
       </Link>
      )
    }
    else if (option.teamName) {
      return (
        <div key={i} onClick={()=> !option.pokemon.some(x=> x.name === pokemon.name) && addPokemonToTeam(option, {
          pokemonId: pokemon.id,
          name: pokemon.name,
          imgs: pokemon.sprites,
          stats: pokemon.stats,
          types: pokemon.types,
          abilities: pokemon.abilities
        })} className='dropoption teamoption'>
          <img src="https://i.imgur.com/9vjciKz.png" alt="" />
          <span>{option.teamName}</span>
        </div>
      )
    }
    else {
      return ( 
        <div key={i} onClick={()=> option.onClick()} className='dropoption'>
          <i className={option.icon}></i>
          <span>{option.text}</span>
        </div>
      )
    }
  })
  useEffect(()=> {
     if(openID) { 
       window.onclick = () => {
        setOpenID(null) 
      }
    }
    return () => {
      window.onclick = null
    }
  }, [openID, id])
  return (
    <div onClick={(e)=> {setOpenID(prev=> prev === id ? null : id); e.stopPropagation(); }} className={`dropcont ${openID === id?'activedrop':''}`}>
      {props.children}
      <div className="dropdown" style={{top}} >
          {optionsrow}
      </div>
    </div> 
    
  )
}
export default Dropdown