import React, {useState, useContext, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { StoreContext } from '../../../ContextAPI'
import Logo from '../../components/Logo/Logo'
import useWindowSize from '../../services/UseWindowSize'
import { detailsWidth } from '../../utils/Functions'
import "./Body.css"
import Sidebar from './BodyNav/Sidebar'
import PokemonDetails from './Content/Pages/Parts/PokemonDetails'
import Nav from '../Body/BodyNav/Nav'
import './Content/Content.css'
const Body = () => {
  const {hideSideBar, hidePokeDetails, selectedPoke} = useContext(StoreContext)
  const responsiveWidth = useWindowSize()
  const left = hidePokeDetails?'96%':`calc(100% - ${detailsWidth(hidePokeDetails).width + 40}px)`
  const left2 = hideSideBar?50:160

  const determineWidth = () => {
    if(hideSideBar) {
      return `calc(98% - ${70+detailsWidth(hidePokeDetails).gap+detailsWidth(hidePokeDetails).width}px)`
    }
    else {
      return `calc(98% - ${190+detailsWidth(hidePokeDetails).width}px)`
    }
  } 
  const [width, setWidth] = useState(determineWidth())



  useEffect(()=> {
    if(responsiveWidth) {
      setWidth(hideSideBar?`calc(98% - 50px)`:`calc(98% - ${190}px)`)
    }
    else { 
      setWidth(determineWidth())
    }
  }, [responsiveWidth, hideSideBar, hidePokeDetails])


  return (
    <div className="body">
      <img src="https://i.imgur.com/snG6Fa8.png" className='backgroundimg' alt=""/>
      <Logo />
      <Nav />
      <Sidebar />
       <div style={{left: left2, width}} className='content'>
         <Outlet />
       </div>
      <PokemonDetails left={left} responsiveWidth={responsiveWidth}/>
    </div>
  )
}
export default Body