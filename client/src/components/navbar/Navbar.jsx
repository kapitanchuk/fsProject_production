import React from 'react'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ShowPopup } from '../../reducers/UIreducer';
import AccountPopUp from '../account/AccountPopUp';

const Navbar = () => {
    const showpopup = useSelector(state=>state.UI.showpopup)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">

                <NavLink to="/"><div className="navbar__logo">Axioma Sprachbörse</div></NavLink>

                <div className="navbar__links">
                    {!isAuth && <div className="navbar__authorization"><NavLink to="/authorization">Authorization</NavLink></div>}
                    {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>}
                    {isAuth && <div className="navbar__account" ><div onClick={()=>dispatch(ShowPopup())}>My account</div>{showpopup? <AccountPopUp/>:''}</div>}

                </div>
            </div>
        </div>
    )
}

export default Navbar
