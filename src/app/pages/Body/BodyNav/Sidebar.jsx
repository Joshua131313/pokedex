import React, { useContext } from 'react'
import { StoreContext } from '../../../../ContextAPI'
import Button from '../../../components/Button/Button'
import LogoutWrapper from '../../../components/LogoutWrapper/LogoutWrapper'
import useGetTypes from '../../../services/GetPokemonTypes'
import { handleLogout } from '../../../utils/DBFunctions'
import './BodyNav.css' 
import Type from './Type'

const Sidebar = () => {
  const types = useGetTypes()
  const {hideSideBar, setHideSideBar} = useContext(StoreContext)
  const typesrow = types.filter(x=> x.name !== 'unknown' && x.name !== 'shadow')?.map(type=> {
    return (
      <Type hideSideBar={hideSideBar} type={type.name} url={type.url}/> 
    )
  }) 
  return (
    <div className={`sid ${hideSideBar?'sidhidden':''}`}>
      <div className='hidesidebaricon' onClick={()=> setHideSideBar(!hideSideBar)} >
       <i onClick={()=> setHideSideBar(!hideSideBar)} className={`fal fa-chevron-${hideSideBar?'right':'left'}`}></i>     
      </div>
      <div className="sidebar flexcol">
        {typesrow}
        <LogoutWrapper>
          <Button text='Logout' />
        </LogoutWrapper>
      </div>
    </div>
  )
}
export default Sidebar