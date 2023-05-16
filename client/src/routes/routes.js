import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Registration from '../components/registration/Registration.jsx'
import Authorisation from '../components/authorisation/Authorisation.jsx'
import DefaultPage from '../components/defaultPage/DefaultPage.jsx'
import Environment from '../components/environment/Environment.jsx'
import Show from '../components/show/Show.jsx'
import Create from '../components/create/Create.jsx'
import Profile from '../components/profile/Profile.jsx'
import EditProfile from '../components/profile/profileComponents/EditProfile.jsx'
import Activate from '../components/profile/profileComponents/Activate.jsx'
import Settings from '../components/profile/profileComponents/Settings.jsx'
import Main from '../components/profile/profileComponents/Main.jsx'

const routes = (isAuth) => {
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/authorisation" element={<Authorisation />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/logout" element={<Navigate replace to="/" />} />
            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/" element={<Environment />} />
                <Route path="/show/:id" element={<Show />} />
                <Route path="/profile/" element={<Profile/>}>
                    {/* should be main page of user's profile */}
                    <Route index  element={<Main/>}></Route>
                    <Route path="edit" element={<EditProfile/>}></Route>
                    <Route path="activate" element={<Activate/>}></Route>
                    <Route path="create" element={<Create/>}></Route>
                    <Route path="settings" element={<Settings/>}></Route>
                    
                </Route>
                <Route path="/authorisation" element={<Navigate replace to="/" />} />
                <Route path="/registration" element={<Navigate replace to="/" />} />
            </Routes>
        )
    }
}

export default routes
