import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../Slice/authSlice";
const SideBarJira = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login")
    }
        
   

    return (
        <>
            <div className="sideBar">
                <div className="sideBar-top">
                    <div className="sideBar-icon">
                        <i className="fab fa-jira" />
                    </div>
                    <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
                    <i className="fa fa-search" />
                    </div>
                    <div className="sideBar-icon">
                        <i style={{ cursor: 'pointer', marginLeft: '2px' }} className="fa fa-plus mt-2" />
                    </div>
                    <div className="sideBar-icon">
                        <i style={{ cursor: 'pointer', marginLeft: '2px' }} onClick={handleLogout} className="fas fa-sign-out-alt mt-2" />
                    </div>
                </div>
                <div className="sideBar-bottom">
                    <div className="sideBar-icon">
                        <i className="fa fa-question-circle" />
                    </div>
                </div>
                <div className="sideBar-img">
                    <img
                        style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5XMA2F8dw_a9xOSSzK2VGMOeMxdODq3UDw&usqp=CAU"
                        alt="1"
                    />
                    
                </div>
            </div>
        </>
    
  )
}

export default SideBarJira