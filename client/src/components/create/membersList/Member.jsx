import React, { useState } from 'react'
import Input from '../../utilits/input/Input'


const Member = (props) => {

    const [member, setMember] = useState('')

    return (
        <input  id={props.id} value={member} placeholder="member" type="text" onChange={e => setMember(e.target.value)} />
    )
}

export default Member
