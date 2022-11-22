import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC2xODpAx9wOKVAXmSh7Aw7r0mE4aodXIo",
  authDomain: "pokedex-c8953.firebaseapp.com",
  projectId: "pokedex-c8953",
  storageBucket: "pokedex-c8953.appspot.com",
  messagingSenderId: "1084509966826",
  appId: "1:1084509966826:web:a20c9765fcef746a9d2293",
  measurementId: "G-RRXZMQ6P37"
});

const db = firebaseApp.firestore();
const Fire = firebaseApp;
export { db, Fire };
