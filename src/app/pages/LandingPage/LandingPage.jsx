import React from 'react'
import './LandingPage.css'
import LandingPageNav from './LandingPageNav'
const LandingPage = (props) => {



  return (
    <div className="landingpage">
      <LandingPageNav />
      <div className="landingpagebanner">
        {/* <div className="innercontabs">
          <div> <h1>Explore. Battle. Build</h1></div>
          <div> <img src="https://i.imgur.com/S4f1ptl.png" alt=""/></div>
        </div> */}
        <img src="https://i.imgur.com/S4f1ptl.png" alt=""/>
      </div>
      <div className="infosection">
      <div className="extrainfo">
         <h2 className='apptitle'>Discover the Pokedex</h2>
          <div className="framedimgs">
            <div className="framedimg">
              <h3>Explore pokemon evolutions</h3>
             <img src="https://i.imgur.com/mrcc0hq.jpg" alt=""/>
            </div>
            <div className="framedimg">
              <h3>Create your favorite pokemon team</h3>
             <img src="https://i.imgur.com/k75UURm.jpg" alt=""/>
            </div>
            <div className="framedimg">
              <h3>Battle with your team </h3>
             <img src="https://i.imgur.com/uXwWEIk.jpg" alt=""/>
            </div>
            <div className="framedimg">
              <h3>Explore pokemon stats</h3>
             <img src="https://i.imgur.com/TspMlbn.jpg" alt=""/>
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}
export default LandingPage
