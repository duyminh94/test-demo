import React from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Slice/authSlice'


const Header = () => {
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {
                user ? 
                (
                    <div className='mt-2 w-100' >
                        <div className='d-flex justify-content-end align-items-center'>
                            <div className='avatar mt-2'>
                                <img src={user?.avatar} alt={user?.avatar} />
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h4 className='font-weight-bold text-warning m-0 mr-2'>
                                    {user?.name}
                                </h4>
                                <button className='btn btn-outline-danger'
                                    onClick={() => {
                                        localStorage.removeItem(user)
                                        dispacth(logout(null));
                                        navigate("/login")
                                    }}
                                >
                                    <i className="fas fa-sign-out-alt ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div >

                )
                :
                null
            }
        </>


    )
}

export default Header