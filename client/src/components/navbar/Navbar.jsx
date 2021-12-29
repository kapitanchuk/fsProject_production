import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Navbar = () => {

    const isAuth = useSelector(state=>state.user.isAuth)
    return (
        <div className="navbar">
            <div className="container">

                <NavLink to="/"><div className="navbar__logo">Logo</div></NavLink>

                <div className="navbar__links">
                    {!isAuth && <div className="navbar__authorization"><NavLink to="/authorization">Authorization</NavLink></div>}
                    {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>}
                    {isAuth && <div>Logout</div>}
                </div>

            </div>
        </div>
    )
}

export default Navbar
