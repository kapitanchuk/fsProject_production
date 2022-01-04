import React, { useEffect } from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'
import { useDispatch } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'

const Options = () => {

    const dispatch = useDispatch()
    const [English, setEnglish] = useState(false)
    const [German, setGerman] = useState(true)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(1000)
    const [registration, setRegistration] = useState(true)
    const [half_b,setHalf_b] = useState(false)
    const [searchTimeout,setSearchTimeout] = useState(false)

    useEffect(()=>{
        clearTimeout(searchTimeout)

        setSearchTimeout(()=>setTimeout((value) => {
            dispatch(getFamilies(value))
        }, 500,German))

    },[English,German,min,max,registration,half_b])
    
    return (
        <div className='options_container'>


            <div className='main-title' style={{ borderBottom: '1px solid rgb(142, 174, 189)'}}>
                Choose your options
            </div>
            <div className='languages' style={{ borderBottom: '1px solid rgb(142, 174, 189)', alignContent: 'center' }}>
                <div className='title'>Languages:</div>
                <div><Input type="checkbox" checked={English} onChange={e => setEnglish(e.target.checked)}></Input> english</div>
                <div><Input type="checkbox" checked={German} onChange={e =>{ console.log(e.target.checked);setGerman(e.target.checked)}}></Input> german</div>
            </div>
            <div className='cost' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div className='title'>Cost:</div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }} className='min'><input value={min} type="range" max="1000" min="0" onChange={e => setMin(e.target.value)}></input><div>-min</div></div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }} className='max'><input value={max} type="range" max="1000" min="0" onChange={e => setMax(e.target.value)}></input><div>-max</div></div>
            </div>
            <div className='register' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={registration} type="checkbox" onChange={e => setRegistration(e.target.checked)}></Input> registration</div>
            </div>
            <div className='half-board' >
                <div ><Input value={half_b} type="checkbox" onChange={e => setHalf_b(e.target.value)}></Input> half-board</div>
            </div>

            {/* <button className='show_button'>{1? `Found ${2} items`:'families are not found'}</button> */}
        </div>
    )
}

export default Options
