import React, { useState } from 'react'
import Input from '../utilits/input/Input'
import './Create.scss'

const Create = () => {

    const [member, setMember] = useState('')
    const [contacts, setContacts] = useState('')
    const [adress, setAdress] = useState('')
    const [language, setLanguage] = useState('')
    const [desc, setDesc] = useState('')
    const [regist, setRegis] = useState(false)
    const [living, setLiving] = useState('')
    const [eating, setEating] = useState(false)
    const [cost, setCost] = useState(0)
    const [free, setFree] = useState(true)

   

    return (
        <div className='create'>
            <div className='container'>
                <div className='create__inner'>
                    <h2>Add new family:</h2>
                    <div className='options'>
                        <div className='members'>
                            <div className='title'>Members of family:</div>
                            <Input value={member} placeholder="member" type="text" onChange={e => setMember(e.target.value)} />
                        </div>
                        <div className='contacts'>
                            <div className='title'>Contacts:</div>
                            <Input value={contacts} placeholder="contacts" type="text" onChange={e => setContacts(e.target.value)} />

                        </div>
                        <div className=''>
                            <div className='title'>Adress:</div>
                            <Input value={adress} placeholder="adress" type="text" onChange={e => setAdress(e.target.value)} />

                        </div>
                        <div className=''>
                            <div className='title'>Languages:</div>
                            <Input value={language} placeholder="contacts" type="text" onChange={e => setLanguage(e.target.value)} />

                        </div>
                        <div className=''>
                            <div className='title'>Description:</div>
                            <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} cols="40" rows="5"></textarea>

                        </div>
                        <div className=''>
                            <div className='title'>Registration:</div>
                            <Input type="checkbox" value={regist} onChange={e => setRegis(e.target.value)}></Input>

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
