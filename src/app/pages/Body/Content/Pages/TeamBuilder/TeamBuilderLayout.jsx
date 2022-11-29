import React from 'react'
import { Outlet, useNavigation } from "react-router-dom"
import Layout from "../../../../../containers/Layout/Layout"

export const TeamBuilderLayout = (props) => {
    const {navigate} = props
    return (
      <Layout className="teambuilder" 
        btn={{
          text: 'New team',
          onClick: ()=> navigate('new-team')
        }}
        title='Team Builder'
      >
         <Outlet />
     </Layout>
    )
  }