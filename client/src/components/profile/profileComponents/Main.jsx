import React from 'react'
import './Main.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Input from '../../utilits/input/Input'
import { update } from '../../../actions/userActions'


const Main = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser)

    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState(user.firstName||'')
    const [lastName, setLastName] = useState(user.lastName||'')
    const [gender, setGender] = useState(user.gender||'male')
    const [error,setError] = useState(false)
    return (
        <div className='main'>
            <div className='general_info'>
                <div className='title'>General information</div>
                <div className='edit_container' style={{ height: "30px" }}>
                    {!edit ? <button className='edit_btn' onClick={() => setEdit(true)}>Edit profile</button> : <div style={{ height: "10px" }}></div>}

                </div>
                <div className='info'>
                    <div className='first_name'>
                        <div className='title'>First Name</div>
                        {edit ? <Input placeholder={user.firstName} value={firstName} onChange={e => {setFirstName(e.target.value);setError(false)}} /> : <div className='display_info'> {user.firstName}</div>}

                    </div>
                    <div className='Second_name'>
                        <div className='title'>Last Name</div>
                        {edit ? <Input placeholder={user.lastName} value={lastName} onChange={e => {setLastName(e.target.value);setError(false)}} /> : <div className='display_info'> {user.lastName}</div>}
                    </div>

                    <div className='gender'>
                        <div className='title'>Gender</div>
                        {edit ? <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                            : <div className='display_info'> {user.gender }</div>}
                    </div>
                    <div className='email'>
                        <div className='title'>Email</div>
                        <div className='display_info'> {user.email}</div>
                    </div>
                </div>
                <div className='save_container' style={{ height: "40px" }}>
                    {error? <div className='error_msg'>All fields must be filled in</div>:''}
                    {edit ? <button className='save_btn' onClick={() => {
                        if(firstName===''||lastName===''){
                            setError(true);
                            return
                        }
                        setEdit(false)
                        dispatch(update(firstName,lastName,gender))
                    }}>Save changes</button> : <div style={{ height: "10px" }}></div>}

                </div>

            </div>
        </div>
    )
}

export default Main
