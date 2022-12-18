import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import MenuJira from '../JiraPage/MenuJira/MenuJira'
import SideBarJira from "../JiraPage/SiderBarJira"
import Header from '../Header'

const JiraLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    return <Navigate to="/login" />
  }
  return (
    <div className='jira'>
      <SideBarJira />
      <MenuJira />
      <div className='container p-0 m-0'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <Header />
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default JiraLayout