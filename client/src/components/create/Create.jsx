import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../utilits/input/Input'
import './Create.scss'
import MembersList from './membersList/MembersList'

const Create = () => {

    const [contacts, setContacts] = useState('')
    const [adress, setAdress] = useState('')
    const [desc, setDesc] = useState('')
    const [living, setLiving] = useState('')
    const [eating, setEating] = useState(false)
    const [cost, setCost] = useState(0)
    const [free, setFree] = useState(true)

    const isAdmin = useSelector(state=>state.user.currentUser.admin)

    if(!isAdmin){
        return(
            <div className='no_permission'>
                <div className='title'>Sorry, but you don`t have a permission to add new families</div>
            </div>
        )
    }

    return (
        <div className='create'>
            <div className='container'>
                <div className='create__inner'>
                    <h2>Add new family:</h2>
                    <div className='options'>
                        <div className='members'>
                            <div className='title'>Family members:</div>
                            <MembersList/>
                        </div>
                        <div className='contacts'>
                            <div className='title'>Contacts:</div>
                            <Input value={contacts} placeholder="contacts" type="text" onChange={e => setContacts(e.target.value)} />

                        </div>
                        <div className=''>
                            <div className='title'>Adress:</div>
                            <Input value={adress} placeholder="adress" type="text" onChange={e => setAdress(e.target.value)} />

                        </div>
                        {/* <div className=''>
                            <div className='title'>Languages:</div>
                            <Input value={language} placeholder="languages" type="text" onChange={e => setLanguage(e.target.value)} />

                        </div> */}
                        <div className=''>
                            <div className='title'>Description:</div>
                            <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} cols="40" rows="5"></textarea>

                        </div>
                        <div className=''>
                            <div className='title'>Living conditions</div>
                            <textarea placeholder="Living" value={living} onChange={e => setLiving(e.target.value)} cols="40" rows="5"></textarea>

                        </div>
                        <div className=''>
                            <div className='title'>Eating</div>
                            <Input type="checkbox" value={eating} onChange={e => setEating(e.target.value)}></Input>

                        </div>
                        <div className=''>
                            <div className='title'>Cost</div>
                            <Input type="number" value={cost} onChange={e => setCost(e.target.value)}></Input>

                        </div>
                        <div className=''>
                            <div className='title'>Free</div>
                            <Input type="checkbox" value={free} onChange={e => setFree(e.target.value)}></Input>

                        </div>
                    </div>

                    <button onClick={() => {}}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Create
