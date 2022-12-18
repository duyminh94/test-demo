import React from 'react'
import { Link } from 'react-router-dom'
import "./error.css"
const Error404 = () => {
    return (
        <div className='error' style={{
            background: "#1a1a1b",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <img src="https://media4.giphy.com/media/nVTa8D8zJUc2A/giphy.gif?cid=ecf05e47anokjzvq1g3gkn4j140qi9ko5t6ohj6cm0sw6w00&rid=giphy.gif&ct=g" alt="" />

            <div className='err'>
                <h1>!404!</h1>
                <p>Page not found</p>
                <Link to={"admin/board" || "/login"} className='home-error'>Trở Lại Trang Admin</Link>
            </div>
        </div>
    )
}


export default Error404