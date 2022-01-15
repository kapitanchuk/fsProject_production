import React,{useState} from 'react'
import Input from '../utilits/input/Input'
import { registration } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import './Registration.scss'

 const Registration = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')

    const setValueEmail=event=>{
        setEmail(event.target.value)
    }
    const setValuePassword=event=>{
        setPassword(event.target.value)
    }

    const handleKey=event=>{
        if(event.code === 'Enter'){
            return dispatch(registration(email,password))
        }
        
    }

    return (
        <div className="registration">
            <div className="registration__inner">
                <h1>Registration</h1>
                <Input
                    type="text" 
                    placeholder="First name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <Input
                    type="text" 
                    placeholder="Last name"
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)}
                />
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

                <button onClick={()=>dispatch(registration(email,password,name,lastName))}>Send</button>
            </div>

        </div>
    )
}

export default Registration
