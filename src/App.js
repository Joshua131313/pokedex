import "./styles.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Notifisystem from "./Notification/Notifisystem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ContextAppProvider from "./ContextAPI";
import firebase from 'firebase'
import { AppContainer } from "./AppContainer";

export default function App() {
  const [pokemon, setPokemon] = useState({});
  const [user, setUser] = useState('')
  const [rdy, setRdy] = useState(false)
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/lugia").then((result) => {
      setPokemon(result.data);
    });
    // pokemon.sprites.other.home.front_default
    // pokemon.sprites.other.home.front_shiny
  }, []);
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        setUser(user)
      }
      else {
        setUser('')
      }
      setRdy(true)
    })
  }
  useEffect(()=>{
    authListener()
  }, [])
  return (
    <Router>
      <ContextAppProvider>
        <Notifisystem />
        <AppContainer />
      </ContextAppProvider>
    </Router>
  );
}
