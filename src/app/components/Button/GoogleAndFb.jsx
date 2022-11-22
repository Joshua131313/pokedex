import React from 'react'
import firebase from 'firebase'
import { loginwithProvider } from '../../utils/Functions'
import { useNavigate } from 'react-router-dom'
const GoogleAndFb = (props) => {
  const navigate = useNavigate()
  return (
    <div className="custombtns flex">
      <div className="googlebtn" onClick={()=> loginwithProvider(new firebase.auth.GoogleAuthProvider(), ()=> navigate('/', {replace: true}))}>
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt=""/>
        <span>Continue with Google</span>
      </div>
      <div className="googlebtn facebookbtn" onClick={()=> loginwithProvider(new firebase.auth.FacebookAuthProvider(), ()=> navigate('/', {replace: true}))}>
        <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" alt=""/>
        <span>Continue with Facebook</span>
      </div>
   </div>
  )
}
export default GoogleAndFb