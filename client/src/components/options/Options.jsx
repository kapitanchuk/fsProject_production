import React, { useEffect } from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'
import { change_half, change_free } from '../../reducers/optionsReducer'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const Options = () => {

    const dispatch = useDispatch()

    const half_b = useSelector(state => state.options.half_b)
    const free = useSelector(state => state.options.free)
    // const range = useSelector(state => state.options.range)
    const [searchTimeout, setSearchTimeout] = useState(false)


    const [range, setRange] = useState([0, 1000]);

    const handleChange = (event, newValue) => {

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
            range, half_b, free
        }

        if (!half_b && !free&&range[0]===0&&range[1]===1000) {
            dispatch(getFamilies())
        }
        else {
            setSearchTimeout(() => setTimeout((value) => {
                dispatch(getFamilies(value))
            }, 500, options))
        }


    }, [half_b, free, range])

    return (
        <div className='options_container'>


            <div className='main-title' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                Choose your options
            </div>

            <div className='cost' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div className='title'>Cost:</div>
                <div className='input_area'>
                    <Input value={range[0]} onChange={e => {
                       setRange([e.target.value, range[1]])
                    }}>
                    </Input>
                    -
                    <Input value={range[1]} onChange={e => {
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
                <div ><Input checked={half_b} type="checkbox" onChange={e => dispatch(change_half(e.target.checked))}></Input> half-board</div>
            </div>
            <div className='isfree' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={free} type="checkbox" onChange={e => dispatch(change_free(e.target.checked))}></Input> free</div>
            </div>

            <button className='show_all' onClick={() => dispatch(getFamilies())}>Show all without filters</button>
        </div>
    )
}

export default Options
