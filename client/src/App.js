import React from 'react'
import routes from './routes/routes.js'
import './App.scss'
import Navbar from './components/navbar/Navbar.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './actions/userActions.js'
import Footer from './components/Footer/Footer.jsx'

const App = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.user.isAuth)
    const isAdmin = useSelector(state=>state.user.currentUser.admin)

    useEffect(()=>{
        dispatch(auth())
    },[])//when page is first rendered 



    return (

        <Router>
            <Navbar />
            {routes(isAuth,isAdmin)}
            {/* <Footer/> */}
        </Router>

    )
}

export default App