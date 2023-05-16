import React from 'react'
import './Authorisation.scss'
import { useState } from 'react'
import Input from '../utilits/input/Input.jsx'
import { useDispatch } from 'react-redux'
import { authorisation } from '../../actions/userActions'

const Authorisation = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const setValueEmail = event => {
        setEmail(event.target.value)
    }
    const setValuePassword = event => {
        setPassword(event.target.value)
    }

    const handleKey = event => {
        if (event.code === 'Enter') {
            return dispatch(authorisation(email,password))
        }
    }


    return (
        <div className="authorisation">
            <div className="authorisation__inner">
                <h1>Authorisation</h1>
                <Input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={setValueEmail}
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={setValuePassword}
                    onKeyDown={handleKey}
                />

                <button onClick={()=>{dispatch(authorisation(email,password))}}>Send</button>

            </div>

        </div>
    )
}

export default Authorisation
