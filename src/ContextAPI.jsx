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
  const [selectedPoke, setSelectedPoke] = useState([])
  const [hideSideBar, setHideSideBar] = useState(false) 
  const [hidePokeDetails, setHidePokeDetails] = useState(true)
  const [searchResult, setSearchResult] = useState([])
  const [shinyArray, setShinyArray] = useState([])
  const [user, setUser] = useState('')
  const [firebaseLoaded, setFirebaseLoaded] = useState(false)
  const [initLS, setInitLS] = useState(false)
  const [teams, setTeams] = useState([])
  const initializeLocalStorageStates = () => {
    setSelectedPoke(JSON.parse(localStorage.getItem('selectedPoke')) || [])
    setShinyArray(JSON.parse(localStorage.getItem('shinyArray')) || [])
    setSearchResult(JSON.parse(localStorage.getItem('searchResult')) || [])
    setTeams(JSON.parse(localStorage.getItem('teams')) || [])
    setInitLS(true)
  }
  console.log(activeType)
 
  
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user=>{
        setFirebaseLoaded(true)
        if(user) {
          setUser(user)
          db.collection('users').doc(user.uid).onSnapshot(snap=> {
            let userData = snap.data()
            setSelectedPoke(userData.selectedPoke)
            setShinyArray(userData.shinyArray)
            setSearchResult(userData.searchResult)
          })
          db.collection('users').doc(user.uid).collection('teams').onSnapshot(snapshot=> {
            const teams = snapshot.docs.map(doc => doc.data())
            setTeams(teams)
        })
        }
        else {
          setUser('')
          initializeLocalStorageStates()
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
  // set local storage when they change
  useEffect(()=>{
    authListener()
  }, [])
  

  useEffect(()=> {
    if(!curUser && initLS) {
      try {
        localStorage.setItem('selectedPoke', JSON.stringify(selectedPoke || []))
        localStorage.setItem('shinyArray', JSON.stringify(shinyArray || []))
        localStorage.setItem('searchResult', JSON.stringify(searchResult || []))
        localStorage.setItem('teams', JSON.stringify(teams || []))
      } 
      catch (e) {
  
      }
    }
  }, [selectedPoke, shinyArray, searchResult, curUser, teams, initLS])
useEffect(()=> {
  console.log(teams)
}, [teams])
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
        teams, 
        setTeams
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
export default ContextAppProvider;
