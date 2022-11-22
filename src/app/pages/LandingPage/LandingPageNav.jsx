import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'

const LandingPageNav = () => {
  const [scrolled, setScrolled] = useState(false)



  function handleScroll(){
    if(window.scrollY > 50) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  },[])

  return (
    <div className={`landingpagenav flexrow sb ${scrolled?'scrollednav':''}`}>
      <Logo />
      <div className="logincontent">
        <Link to='/login'>
          <Button text='Login' img='https://i.imgur.com/snG6Fa8.png'/>
        </Link>
      </div>
    </div>
  )
}
export default LandingPageNav