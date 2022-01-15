import React from 'react'
import './Authorization.scss'
import { useState } from 'react'
import Input from '../utilits/input/Input.jsx'
import { useDispatch } from 'react-redux'
import { authorization } from '../../actions/userActions'

const Authorization = () => {

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
            return dispatch(authorization(email,password))
        }
    }


    return (
        <div className="authorization">
            <div className="authorization__inner">
                <h1>Authorization</h1>
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

                <button onClick={()=>{dispatch(authorization(email,password))}}>Send</button>

            </div>

        </div>
    )
}

export default Authorization
