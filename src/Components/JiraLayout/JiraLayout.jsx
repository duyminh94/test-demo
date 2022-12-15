import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import MenuJira from '../JiraPage/MenuJira/MenuJira'
import SideBarJira from "../JiraPage/SiderBarJira"

const JiraLayout = () => {
  // const {users} = useSelector((state) => state.auth)

  // if(!users) {
  //     return <Navigate to="/" replace/>
  // }
  return (
    <div className='jira'>
      <SideBarJira />
      <MenuJira />
      <Outlet />

    </div>
  )
}

export default JiraLayout