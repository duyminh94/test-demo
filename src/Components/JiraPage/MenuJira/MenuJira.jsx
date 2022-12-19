import React from 'react'
import { NavLink } from 'react-router-dom'
import "./menu.css"
const MenuJira = () => {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img className="logo-reactjs" src="https://i.pinimg.com/564x/f2/31/06/f23106445253c30ddf633b49804ed475.jpg" alt="123" />
        </div>
        <div className="account-info">
          <p className="font-weight-bold">React Jira Clone</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-th-list mr-2"></i>
          <NavLink className="text-dark active font-weight-bold" to="board">
            <span style={{ fontSize: 16 }}>Board</span>
          </NavLink>
        </div>
        <div>
          <i className="fa fa-user-cog mr-2"></i>
          <NavLink className="text-dark active font-weight-bold" to="usermanagement">
            <span style={{ fontSize: 16 }}>User Management</span>
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-truck mr-2" />
          <span style={{ fontSize: 16 }}>Releases</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-equals mr-2" />
          <span style={{ fontSize: 16 }}>Issues and filters</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-paste mr-2" />
          <span style={{ fontSize: 16 }}>Pages</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-location-arrow mr-2" />
          <span style={{ fontSize: 16 }}>Reports</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-box mr-2" />
          <span style={{ fontSize: 16 }}>Components</span>
        </div>
      </div>
    </div>
  )
}

export default MenuJira