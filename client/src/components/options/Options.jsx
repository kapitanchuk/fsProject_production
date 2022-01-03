import React from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'

const Options = () => {

    const [language,setLanguage] = useState(false)
    const [cost,setCost] = useState(0)

    return (
        <div className='options_container'>
            <div className='languages'>
                Languages
                <Input type="checkbox" value={language} onChange={e=>setLanguage(e.target.value)}></Input>
            </div>
            <div className='cost'>
                Cost
                <input value={cost} type="range" max="1000" min="0" onChange={e=>setCost(e.target.value)}></input>
            </div>
        </div>
    )
}

export default Options
