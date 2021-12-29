import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Registration from '../components/registration/Registration.jsx'
import Authorization from '../components/authorization/Authorization.jsx'
import DefaultPage from '../components/defaultPage/DefaultPage.jsx'

const routes = isAuth => {
    if (!isAuth){
        return (
            <Routes>
                <Route path="/authorization" element={<Authorization/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/" element={<DefaultPage/>} />
                
            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/" element={<DefaultPage/>} />
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
        )
    }
}

export default routes
