import React from 'react'
import routes from './routes/routes.js'
import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './actions/userActions.js'

const App = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.user.isAuth)

    useEffect(()=>{
        dispatch(auth())
    },[])//when page is first rendered or user changed

    return (
        <Router>
            <Navbar />
            {routes(isAuth)}
        </Router>

    )
}

export default App