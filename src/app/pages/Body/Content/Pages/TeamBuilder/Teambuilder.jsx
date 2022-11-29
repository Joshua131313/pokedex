import React from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../../../../../containers/Layout/Layout'
import { createNewTeam } from '../../../../../utils/DBFunctions'
import { TeamBuilderLayout } from './TeamBuilderLayout'
import TeamsRender from './TeamsRender'

const Teambuilder = () => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route element={<TeamBuilderLayout navigate={navigate}/>}>
          <Route index element={<TeamsRender />}></Route>
          <Route path='new-team' element={<>New team</>} />
      </Route>
    </Routes>
  )
}
export default Teambuilder