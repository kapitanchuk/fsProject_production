import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Registration from '../components/registration/Registration.jsx'
import Authorization from '../components/authorization/Authorization.jsx'
import DefaultPage from '../components/defaultPage/DefaultPage.jsx'
import Environment  from '../components/environment/Environment.jsx'
import EnvironmentAdmin from '../components/environment/EnvironmentAdmin.jsx'
import Create from '../components/create/Create.jsx'

const routes = (isAuth,isAdmin) => {
    if (!isAuth){
        return (
            <Routes>
                <Route path="/authorization" element={<Authorization/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/" element={<DefaultPage/>} />
                
            </Routes>
        )
    }
    else if (isAdmin){
        return (
            <Routes>
                <Route path="/" element={<EnvironmentAdmin/>} />
                <Route path="/authorization" element={<Navigate replace to="/"/>}/>
                <Route path="/registration" element={<Navigate replace to="/"/>}/>
                <Route path='/create' element={<Create/>}></Route>
            </Routes>
        )
    }
    else{
        return (
            <Routes>
                <Route path="/" element={<Environment/>} />
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
        )
    }
}

export default routes
