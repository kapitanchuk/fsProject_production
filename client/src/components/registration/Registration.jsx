import React,{useEffect, useState} from 'react'
import Input from '../utilits/input/Input'
import { registration } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import './Registration.scss'
import { ClearRegistrationErrors, RemoveRegistrationError } from '../../reducers/UIreducer'

 const Registration = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')
    const registration_errors = useSelector(state=>state.UI.registration_errors)

    const setValueEmail=event=>{
        setEmail(event.target.value)
        if(registration_errors.email.value)
        dispatch(RemoveRegistrationError("email"))
    }
    const setValuePassword=event=>{
        
        setPassword(event.target.value)
        if(registration_errors.password.value)
        dispatch(RemoveRegistrationError("password"))
    }

    const handleKey=event=>{
        if(event.code === 'Enter'){
            return dispatch(registration(email,password,name,lastName))
        }
        
    }

    return (
        <div className="registration">
            <div className="registration__inner">
                <h1>Registration</h1>
                <Input
                    className = {registration_errors.name.value ? "error_input":""}
                    type="text" 
                    placeholder="First name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <Input
                    className = {registration_errors.lastname.value ? "error_input":""}
                    type="text" 
                    placeholder="Last name"
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)}
                />
                <Input
                    className = {registration_errors.email.value ? "error_input":""}
                    type="text" 
                    placeholder="email"
                    value={email}
                    onChange={setValueEmail}
                />
                {registration_errors.email.value&&<span className='error_message'>*{registration_errors.email.message}</span>}
                <Input
                    className = {registration_errors.password.value ? "error_input":""}
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={setValuePassword}
                    onKeyDown={handleKey}
                />
                {registration_errors.password.value&&<span className='error_message'>*{registration_errors.password.message}</span>}

                <button onClick={()=>dispatch(registration(email,password,name,lastName))}>Send</button>
            </div>

        </div>
    )
}

export default Registration
