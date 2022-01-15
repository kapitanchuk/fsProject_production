import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HidePopup } from '../../reducers/UIreducer'
import './popup.scss'
import { logout } from '../../actions/userActions'

const AccountPopUp = () => {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()


    return (
        <div className='account_popup'>
            <button onClick={()=>dispatch(HidePopup())}>X</button>
            <div className='main-info'>
                <div className='email'>{user.firstName||user.email}</div>
            </div>
            <div className='profile_options'>
                <div className='edit' style={{paddingTop:'3px'}}><Link onClick={()=>dispatch(HidePopup())} to='/profile'>Profile</Link></div>
                <div className='help' style={{paddingTop:'3px'}}><Link onClick={()=>dispatch(HidePopup())} to='/profile/help'>Help</Link></div>
                <div className='activation' style={{paddingTop:'3px'}}><Link onClick={()=>dispatch(HidePopup())} to='/profile/activate'>Activate account</Link></div>
                <div className='settings' style={{paddingTop:'3px'}}><Link onClick={()=>dispatch(HidePopup())} to='/profile/settings'>Settings</Link></div>
                <div className='logout'style={{padding:'3px 0'}} onClick={()=>{dispatch(logout());dispatch(HidePopup())}}>Logout</div>
            </div>

        </div>
    )
}

export default AccountPopUp
