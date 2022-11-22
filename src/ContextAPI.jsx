import React, { createContext, useEffect, useRef, useState } from "react";
import firebase from "firebase";
import { db } from "./Fire";
import axios from "axios";
import { addNotification } from "./Notification/Addnotification";

export const StoreContext = createContext();
const curUser = firebase.auth().currentUser;
const ContextAppProvider = (props) => {
  const notifisystem = useRef();
  const [type, setType] = useState([{}])
  const [activeType, setActiveType] = useState({name: 'all', url: ''})
  const [selectedPoke, setSelectedPoke] = useState(JSON.parse(localStorage.getItem('selectedPoke')) || [])
  const [hideSideBar, setHideSideBar] = useState(false) 
  const [hidePokeDetails, setHidePokeDetails] = useState(true)
  const [searchResult, setSearchResult] = useState(JSON.parse(localStorage.getItem('searchResult')) || [])
  const [shinyArray, setShinyArray] = useState(JSON.parse(localStorage.getItem('shinyArray')) || [])
  const [user, setUser] = useState('')
  const [firebaseLoaded, setFirebaseLoaded] = useState(false)

  useEffect(()=> {
    try {
      localStorage.setItem('selectedPoke', JSON.stringify(selectedPoke || []))
    } 
    catch (e) {

    }
  }, [selectedPoke])  
  useEffect(()=> {
    try {
      localStorage.setItem('shinyArray', JSON.stringify(shinyArray || []))
    }
    catch (e) {
      
    }
  }, [shinyArray])  


  const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
        setFirebaseLoaded(true)
      if(user) {
        setUser(user)
      }
      else {
        setUser('')
      }
    })
  }

  const addNoti = (icon, msg, img) => {
    addNotification({
      notifisystem,
      msg,
      icon,
      img
    });
  };
  useEffect(()=> {
    try {
      localStorage.setItem('searchResult', JSON.stringify(searchResult || []))
    }
    catch (e) {
    }
  }, [searchResult])

  useEffect(()=>{
    authListener()
  }, [])
  // useEffect(()=> {
  //   localStorage.setItem('language', JSON.stringify(lng))
  // }, [lng])
  // useEffect(()=> {
  //      authListener()
  // }, [])

  return (
    <StoreContext.Provider
      value={{
        notifisystem,
        addNoti,
        type, 
        setType,
        hideSideBar,
        setHideSideBar,
        activeType, 
        setActiveType,
        searchResult, 
        setSearchResult,
        hidePokeDetails, 
        setHidePokeDetails,
        selectedPoke,
        setSelectedPoke,
        shinyArray, 
        setShinyArray,
        user, 
        setUser,
        firebaseLoaded,
        curUser
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
export default ContextAppProvider;
