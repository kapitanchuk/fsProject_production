import React, { useEffect } from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'
import { useDispatch } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'

const Options = () => {

    const dispatch = useDispatch()
    
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(1000)
    const [half_b,setHalf_b] = useState(true)
    const [free,setFree] = useState(true)
    const [searchTimeout,setSearchTimeout] = useState(false)

    useEffect(()=>{
        const options={
            min,max,half_b,free
        }
        dispatch(getFamilies(options))
    },[])

    useEffect(()=>{
        clearTimeout(searchTimeout)
        const options={
            min,max,half_b,free
        }
        setSearchTimeout(()=>setTimeout((value) => {
            dispatch(getFamilies(value))
        }, 500,options))

    },[min,max,half_b,free])
    
    return (
        <div className='options_container'>


            <div className='main-title' style={{ borderBottom: '1px solid rgb(142, 174, 189)'}}>
                Choose your options
            </div>
            {/* <div className='languages' style={{ borderBottom: '1px solid rgb(142, 174, 189)', alignContent: 'center' }}>
                <div className='title'>Languages:</div>
                <div><Input type="checkbox" checked={English} onChange={e => setEnglish(e.target.checked)}></Input> english</div>
                <div><Input type="checkbox" checked={German} onChange={e =>setGerman(e.target.checked)}></Input> german</div>
            </div> */}
            <div className='cost' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div className='title'>Cost:</div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }} className='min'><input value={min} type="range" max="1000" min="0" onChange={e => setMin(e.target.value)}></input><div>-min</div></div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }} className='max'><input value={max} type="range" max="1000" min="0" onChange={e => setMax(e.target.value)}></input><div>-max</div></div>
            </div>
            {/* <div className='register' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={registration} type="checkbox" onChange={e => setRegistration(e.target.checked)}></Input> registration</div>
            </div> */}
            <div className='half-board' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={half_b} type="checkbox" onChange={e => setHalf_b(e.target.checked)}></Input> half-board</div>
            </div>
            <div className='isfree'>
            <div ><Input checked={free} type="checkbox" onChange={e => setFree(e.target.checked)}></Input> free</div>
            </div>

            <button className='show_all' onClick={()=>dispatch(getFamilies())}>Show all without filters</button>
        </div>
    )
}

export default Options
