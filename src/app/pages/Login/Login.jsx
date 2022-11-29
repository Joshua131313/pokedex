import React, { useState } from 'react'
import './Login.css'
import firebase from 'firebase'
import { writeUserdocuments } from '../../utils/Functions'
import Button from '../../components/Button/Button'
import GoogleAndFb from '../../components/Button/GoogleAndFb'
import Logo from '../../components/Logo/Logo'
import Appinput from '../../components/Input/Input'
import { useNavigate } from 'react-router-dom'
const Login = ({setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const inputs = [
    {
      placeholder: 'Full name',
      value: name,
      setValue: setName,
      hidden: hasAccount,
      error: errors.name
    },
    {
      placeholder: 'Email adress',
      value: email,
      setValue: setEmail,
      error: errors.email
    },
    {
      placeholder: 'Password',
      value: password,
      setValue: setPassword,
      type: 'password',
      error: errors.password
    }
  ]
  const inputsrow = inputs.map(input=> {
    if(!input.hidden) {
      return (
        <>
        <Appinput value={input.value} setValue={input.setValue} placeholder={input.placeholder} type={input.type}/>
        {input.error && <span className='error'>{input.error}</span>}
        </>
      )
    }
  })
  const handleError = (key, msg) => {
    setErrors({...errors, [key]: msg})
  }
  const clearErrors = () => {
    setErrors({
      email: '',
      password: '',
      name: ''
    })
  }
  const clearInputs = () => {
    setEmail('')
    setPassword('')
    setName('')
  }

  const deterMineEvent = () => {
    if(hasAccount) {
      clearErrors()
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        setLoading(true)
        clearInputs()
        navigate('/', {replace: true})
      })
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
            handleError('email', err.message)

          break
          case "auth/user/disabled":
          case "auth/user-not-found":
            handleError('email', 'Email does not exist')
          break
          case "auth/wrong-password":
            handleError('password', 'Incorrect Password')
          break
          default: 
        } 
        setTimeout(()=>{
         clearErrors()
        },4000) 
      })
    }
    else {
      if(name !=='') {
        clearErrors()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
          setLoading(true)
            firebase.auth().onAuthStateChanged(user => {
            if(user) {
                user.updateProfile({
                  displayName: name
                })
                writeUserdocuments(user, email, name, '')
              }
              else {
                setUser('')
            }
          })
        })
        .catch((err)=>{
          switch(err.code) {
            case "auth/email-already-in-use":
              handleError('email', err.message)
              break
            case "auth/invalid-email":
              handleError('email', err.message)
            break
            case "auth/weak-password":
              handleError('password', err.message)
            break
            default: 
            handleError('email', err.message)
            setTimeout(()=>{
              clearErrors()
            }, 4000)
          }
        })
      }
    }
  }

  return (
    <div className="login">
      <Logo />
      <div className="loginsection">
        <div className="topsectinputs">
        <h2 className=''>Welcome Back</h2>
        <h2>{hasAccount?'Login':"Create Account"}</h2>
        <form onSubmit={e=> e.preventDefault()} className="inputs">
           {inputsrow}
           <span className='linktext' onClick={()=> setHasAccount(!hasAccount)}>{hasAccount?'Don\'t have an account?':'Already have an account?'}</span>
        </form>
        </div>
        <div className="btnsinput">
          <GoogleAndFb />
          <Button onClick={()=> deterMineEvent()} text={hasAccount?"Login":'Register'} img='https://i.imgur.com/snG6Fa8.png'/>
        </div>
      </div>
    </div>
  )
}
export default Login