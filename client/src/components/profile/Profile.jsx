import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import './Profile.scss'

const Profile = () => {

    const admin = useSelector(state=>state.user.currentUser.admin)

    return (
        <div className='profile'>
            <div className='profile__options'>
                <NavLink to="/profile" end>
                    Main profile
                </NavLink>
                
                <NavLink to="/profile/activate">
                    Activate account
                </NavLink>
                {admin?<NavLink to="/profile/create" end>Add family</NavLink>:''}
                <NavLink to="/profile/settings">
                    Settings
                </NavLink>

            </div>
            <div className='profile__env'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile
