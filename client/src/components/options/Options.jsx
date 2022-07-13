import React, { useEffect } from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'
import { change_half, change_free } from '../../reducers/optionsReducer'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { SetCurrPage } from '../../reducers/familyReducer'

const Options = () => {

    const dispatch = useDispatch()

    const half_b = useSelector(state => state.options.half_b)
    const free = useSelector(state => state.options.free)
    const [prevhalf_b, setPrevhalf_b] = useState(half_b)
    const [prevfree, setPrevfree] = useState(free)
    // const range = useSelector(state => state.options.range)
    const [searchTimeout, setSearchTimeout] = useState(false)
    // let prevhalf_b,prevfree,prevrange=[]
    const currPage = useSelector(state => state.family.currPage)
    const limit = useSelector(state => state.family.limit)

    const [range, setRange] = useState([0, 1000]);
    const [prevRange, setPrevRange] = useState(range)

    const handleChange = (event, newValue) => {
        setPrevRange(range)
        setRange(newValue);
    };


    // const timeoutForSetMin = e => {
    //     setMinState(e.target.value)

    //     clearTimeout(minTimeout)
    //     setMinTimeout(setTimeout(() => { dispatch(set_min(e.target.value)) }, 300))
    // }
    // const timeoutForSetMax = e => {
    //     setMaxState(e.target.value)
    //     clearTimeout(maxTimeout)
    //     setMaxTimeout(setTimeout(() => { dispatch(set_max(e.target.value)) }, 300))
    // }

    useEffect(() => {
        clearTimeout(searchTimeout)
        const options = {
            range, free
        }
        const paginationOptions = {
            currPage: currPage, limit: limit
        }
        if (range[0] === '' || range[1] === '') {
            setRange([0,1000]);
        }
        else if (!half_b && !free && range[0] === 0 && range[1] === 1000) {
            setSearchTimeout(() => setTimeout(() => {
                
                dispatch(getFamilies(null, paginationOptions))
            }, 300))
            
        }
        else {
            setSearchTimeout(() => setTimeout((value) => {
                
                if (prevfree !== free || prevhalf_b !== half_b || prevRange !== range) {
                    console.log('prev State (free, half, range):', prevfree, prevhalf_b, prevRange)
                    dispatch(SetCurrPage(1));
                    dispatch(getFamilies(value, { currPage: 1, limit: limit }))

                    setPrevhalf_b(half_b)
                    setPrevfree(free)
                    setPrevRange(range)
                }
                else {
                    dispatch(getFamilies(value, paginationOptions))
                }
            }, 500, options))
        }


    }, [half_b, free, range, currPage])

    return (
        <div className='options_container'>


            <div className='main-title' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                Choose your options
            </div>

            <div className='cost' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div className='title'>Cost:</div>
                <div className='input_area'>
                    <Input type="number" value={range[0]} onChange={e => {
                        setPrevRange(range)
                        setRange([e.target.value, range[1]])
                    }}>
                    </Input>
                    -
                    <Input type="number" value={range[1]} onChange={e => {
                        setPrevRange(range)
                        setRange([range[0], e.target.value])
                    }}>
                    </Input>

                </div>
                <div className='mui-slider'>
                    <Box sx={{ width: 160 }}>
                        <Slider

                            getAriaLabel={() => 'Cost'}
                            value={range}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            max={1000}

                        />
                    </Box>
                </div>

            </div>

            <div className='half-board' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={half_b} type="checkbox" onChange={e => { setPrevhalf_b(half_b); dispatch(change_half(e.target.checked)) }}></Input> half-board</div>
            </div>
            <div className='isfree' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={free} type="checkbox" onChange={e => { setPrevfree(free); dispatch(change_free(e.target.checked)) }}></Input> free</div>
            </div>

            <button className='show_all' onClick={() => { dispatch(SetCurrPage(1)); dispatch(getFamilies(null, { currPage: 1, limit: limit })) }}>Show all without filters</button>
        </div>
    )
}

export default Options
