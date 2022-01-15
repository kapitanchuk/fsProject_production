import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ShowPopup } from '../../reducers/UIreducer';
import AccountPopUp from '../account/AccountPopUp.jsx';

const Navbar = () => {
    const showpopup = useSelector(state=>state.UI.showpopup)
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">

                <Link to="/"><div className="navbar__logo">Axioma Sprachbörse</div></Link>

                <div className="navbar__links">
                    {!isAuth && <div className="navbar__authorization"><Link to="/authorization">Authorization</Link></div>}
                    {!isAuth && <div className="navbar__registration"><Link to="/registration">Registration</Link></div>}
                    {isAuth && <div className="navbar__account" ><div onClick={()=>dispatch(ShowPopup())}>My account</div>{showpopup? <AccountPopUp/>:''}</div>}

                </div>
            </div>
        </div>
    )
}

export default Navbar
