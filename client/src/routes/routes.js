import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Registration from '../components/registration/Registration.jsx'
import Authorization from '../components/authorization/Authorization.jsx'
import DefaultPage from '../components/defaultPage/DefaultPage.jsx'
import Environment from '../components/environment/Environment.jsx'
import Show from '../components/show/Show.jsx'
import Create from '../components/create/Create.jsx'

const routes = (isAuth, isAdmin) => {
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/authorization" element={<Authorization />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/*" element={<Navigate replace to="/" />} />
                <Route path="/" element={<DefaultPage />} />

            </Routes>
        )
    }
    else {
        return (
            <Routes>
                <Route path="/" element={<Environment />} />
                <Route path="/create" element={<Create/>}></Route>
                <Route path="/show/:id" element={<Show />} />
                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        )
    }
}

export default routes
