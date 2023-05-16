import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { addFamily } from '../../http(axios)/addFamily'
import Input from '../utilits/input/Input'
import './Create.scss'
import MembersList from './membersList/MembersList'
// import PhotosArea from './photosArea/PhotosArea'

const Create = () => {

    const [contacts, setContacts] = useState('')
    const [adress, setAdress] = useState('')
    const [desc, setDesc] = useState('')
    const [living, setLiving] = useState('')
    const [eating, setEating] = useState(false)
    const [cost, setCost] = useState(0)
    const [free, setFree] = useState(true)

    const [ready,setReady] = useState(false)
    const members = useSelector(state => state.UI.members)
    const photos = useSelector(state=>state.UI.photos)
    const isAdmin = useSelector(state => state.user.currentUser.admin)

    const options = {contacts,adress,desc,living,eating,cost,free}

    useEffect(()=>{

        let counter=0
        members.map(item=>{
            if(item.value){
                counter++
            }
        })

        if(contacts&&adress&&desc&&living&&cost&&counter===members.length){
            setReady(true)
        }
        else{
            setReady(false)
        }
    },[options])

    if (!isAdmin) {
        return (
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
                        <div className='photos'>
                            <div className='title'>Photos:</div>
                            {/* <PhotosArea/> */}

                        </div>
                        <div className='members'>
                            <div className='title'>Family members:</div>
                            <MembersList />
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
                            <Input type="checkbox" checked={eating} onChange={e => setEating(e.target.checked)}></Input>

                        </div>
                        <div className=''>
                            <div className='title'>Cost</div>
                            <Input type="number" value={cost} onChange={e => setCost(e.target.value)}></Input>

                        </div>
                        <div className=''>
                            <div className='title'>Free</div>
                            <Input type="checkbox" checked={free} onChange={e => setFree(e.target.checked)}></Input>

                        </div>
                    </div>

                    {/* <button className="create_btn" disabled={!ready} onClick={addFamily(members, contacts, adress, desc, living, eating, cost, free,photos)}>Create</button> */}
                </div>
            </div>
        </div>
    )
}

export default Create
