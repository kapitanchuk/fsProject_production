import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { SetMembers } from '../../../reducers/UIreducer'


const MembersList = () => {

    const dispatch = useDispatch()

    const [members,setMembers] = useState([{value:'',id:nanoid()}])
    const [sendTimeout,setSendTimeout] = useState(0)

    const handleChange = (e,index) =>{
        const values = [...members]
        values[index].value=e.target.value
        setMembers(values)
    }

    const addInput = () =>{
        setMembers(prevState=>[...prevState,{value:'',id:nanoid()}])
    }

    const handleRemove = (id) =>{
        const modifiedMembers = members.filter(item=>item.id!==id)
        setMembers(modifiedMembers)
    }

    useEffect(()=>{
        clearTimeout(sendTimeout)
        setSendTimeout(setTimeout(()=>{
            dispatch(SetMembers(members))

        },500))
    },[members])

    return (
        <div className='members_list'>
            <button className="add_btn" onClick={addInput}>Add one</button>
            
            {members.map((item,index) => (

                <div key={item.id}>
                    <div><input placeholder ="member" value={item.value} onChange={(e)=>handleChange(e,index)}></input></div>
                    <button className="delete_btn" onClick={()=>handleRemove(item.id)}>remove</button>
                </div>
            ))}
        </div>
    )
}

export default MembersList
