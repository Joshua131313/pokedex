import React from 'react'
import { NavLink } from 'react-router-dom'
import { links } from '../../../data/Arrays'
import './BodyNav.css'
const Nav = () => {

  const linksrow = links.map(link=> {
    return (
      <NavLink end className={({ isActive }) => "" + (isActive ? " activelink" : "")} to={'/'+link.link}>
        <span>{link.text}</span>
      </NavLink>
    )
  })

  return (
    <div className="bodynav flexrow">
      {linksrow}
    </div>
  )
}
export default Nav