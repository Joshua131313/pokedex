import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { links, pokemonDetailsDimensions } from '../../../Arrays'
import { ContextApp } from '../../../ContextAPI'
import { detailsWidth } from '../../../Functions'
import './Content.css'
import Homepage from './Pages/Home'
import News from './Pages/News'
import Pokedex from './Pages/Pokedex'
import Pokemonpage from './Pages/Pokemonpage'
import Teambuilder from './Pages/Teambuilder'
import Videogames from './Pages/Videogames'

const Content = ({responsiveWidth}) => {
  const {hideSideBar, hidePokeDetails} = useContext(ContextApp)
  const left = hideSideBar?40:150
  const location = useLocation()
  const [id, setId] = useState(location.pathname.split('&')[1])
  const detmineWidth = () => {
    if(hideSideBar) {
      return `calc(98% - ${50+detailsWidth(hidePokeDetails).gap+detailsWidth(hidePokeDetails).width}px)`
    }
    else {
      return `calc(98% - ${170+detailsWidth(hidePokeDetails).width}px)`
    }
  } 
  const [width, setWidth] = useState(detmineWidth)
  const components = {
    Pokedex: Pokedex,
    Home: Homepage,
    News: News,
    Teambuilder: Teambuilder,
    Videogames: Videogames
  }
  
  const routesrow = links.map(route=> {
    let Component = components[route.component]
    return (
      <Route exact path={'/'+route.link}>
        <Component />
      </Route>
    )
  })
  useEffect(()=> {
    setId(location.pathname.split('&')[1])
  }, [location])
  useEffect(()=> {
    if(responsiveWidth) {
      setWidth(hideSideBar?`calc(98% - 50px)`:`calc(98% - ${170}px)`)
    }
    else { 
      setWidth(detmineWidth)
    }
  }, [responsiveWidth, hideSideBar, hidePokeDetails])
  
 

  return (
    <div style={{left, width}} className="content" >
      <Switch>
        {routesrow}
        <Route path={`/pokedex/pokemon&${id}`}>
          <Pokemonpage />
        </Route>
      </Switch>
    </div>
  )
}
export default Content