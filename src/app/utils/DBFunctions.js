import firebase from 'firebase'
import { db } from '../../Fire'
import { editState, returnPokeObj } from './Functions'
export const generateID = () => {
  return db.collection('users').doc().id
}
export const createUserCollection = (userid, name, email, profilePic='', phoneNumber='', provider=false) => {
  db.collection('users').doc(userid).set({
    created: new Date(),
    uid: userid,
    name: name,
    searchName: name.toLowerCase(),
    userinfo: {
      profilePic: profilePic,
      phoneNumber: phoneNumber,
      email: email
    },
    provider
  }).then(()=> {
    db.collection('users').doc(userid).collection('albums').doc('postsMediaAlbum').set({
      albumName: 'Posts Album',
      dateCreated: new Date(),
      albumId: 'postsMediaAlbum',
      albumLength: 0
    })
  })
}

export const handleUnload = () => {
  const user = firebase.auth().currentUser

  db.collection('users').doc(user.uid).set({lastActive: new Date()}, {merge: true})
}

export const loginwithProvider = (provider, history) => {
  provider.addScope('email');
  firebase.auth()
  .signInWithPopup(provider)
  .then((result)=>{
    if(result.additionalUserInfo.isNewUser) {
      const user = result.user  
      createUserCollection(user.uid, user.displayName, user.email, user.photoURL, user.phoneNumber,  true)
    }
    history()
  })
}

export const handleUpdateUserInfo = (userid, updated, objKey) => {
  db.collection('users').doc(userid).set({
    [objKey]: updated
  }, {merge: true})
}


export const DeleteFromDB = (collection, id) => {
  db.collection(collection).doc(id).delete()
  .then(()=> {
    console.log('k')
  })
  .catch(err=> {
    console.log(err)
  })
}
export const ClearCollection = (collection, setState) => {
  db.collection(collection) //make sure to use backtics
  .get()
  .then(res => {
    res.forEach(element => {
      element.ref.delete();
      setState && setState()
    });
  })
  .catch(()=> {
    setState && setState()
  })
  setState && setState()
}

export const AddToDB = (collection, value, clearFields, cID) => {
  const user = firebase.auth().currentUser
  let id = cID ? cID : generateID()
  let result = Object.assign(value, {
    id: id,                 
    postedBy: user.uid,
    datePosted: new Date(),
  })
  db.collection(collection).doc(id).set(result).then(()=> {clearFields?.()})
  return id
}


export const handleLogout = () =>{   
  firebase.auth().signOut().then(()=> {
    window.location.reload()
  })
}

export const GetFromDB = (collection, setState) => {
  db.collection(collection).onSnapshot(data=> {
    let result = []
    data.forEach(doc=> {
      result.push(doc.data())
    })
    setState(result)
  })
}
export const createNewTeam = (teamName, pokemon, teams, setTeams) => {
  const user = firebase.auth().currentUser
  let pokeObj = returnPokeObj(pokemon)
  const id = generateID()
  if(user) {
    const collectionRef = db.collection('users').doc(user.uid).collection('teams').doc(id)
      collectionRef.set({
        teamId: id,
        teamName: teamName
      }).then(()=> {
        collectionRef.collection('pokemon').doc(pokemon.id).set(pokeObj)
      })
  }
  else {
    let tempState = [...teams]
    tempState.push({
      teamName,
      teamId: id,
      pokemon: [pokeObj]
    })
    setTeams(tempState)
  }
}
export const addPokemonToTeam = (team, pokemon, teams, setTeams) => {
  const user = firebase.auth().currentUser
  const id = generateID()
  if((!team.pokemon.some(x=> x.name === pokemon.name) && team.pokemon.length < 6)) {
   if(user) {
    db.collection('users').doc(user.uid).collection('teams').doc(team.teamId).collection('pokemon').doc(pokemon.pokemonId).set({
     pokemon
    }) 
   }
   else {
      const {tempState, index} = editState(teams, team.teamId, 'teamId')
      tempState[index].pokemon.push(pokemon)
      setTeams(tempState)
   }
  } 
}
export const handleShinyArray = (pokemon) => {
  const user = firebase.auth().currentUser
      db.collection('users').doc(user.uid).update({
          shinyArray: firebase.firestore.FieldValue.arrayUnion(pokemon.id)
      })
};