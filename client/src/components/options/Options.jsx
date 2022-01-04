import React from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'

const Options = () => {

    const [English,setEnglish] = useState(false)
    const [German,setGerman] = useState(false)
    const [min,setMin] = useState(0)
    const [max,setMax] = useState(1000)
    const [Location,setLocation] = useState('')

    return (
        <div className='options_container'>
            
            <div className='languages' style={{borderBottom: '1px solid rgb(142, 174, 189)', alignContent:'center'}}>
                <div className='title'>Languages:</div>
                <div><Input type="checkbox" value={English} onChange={e=>setEnglish(e.target.value)}></Input> english</div>
                <div><Input type="checkbox" value={German} onChange={e=>setGerman(e.target.value)}></Input> german</div>
            </div>
            <div className='cost' style={{borderBottom: '1px solid rgb(142, 174, 189)'}}>
                <div className='title'>Cost:</div>
                <div style={{display:'flex'}}className='min'><input value={min} type="range" max="1000" min="0" onChange={e=>setMin(e.target.value)}></input> <div> -min</div></div>
                <div style={{display:'flex'}} className='min'><input value={max} type="range" max="1000" min="0" onChange={e=>setMax(e.target.value)}></input> - max</div>
            </div>
            <div className='location' style={{borderBottom: '1px solid rgb(142, 174, 189)'}}>
                <div className='title'>City:</div>
                
            </div>
        </div>
    )
}

export default Options
