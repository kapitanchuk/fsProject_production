import React, { useEffect } from 'react'
import Input from '../utilits/input/Input'
import { useState } from 'react'
import './Options.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'
import {change_registration, change_free, change_conditions, change_range, change_food } from '../../reducers/optionsReducer'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { SetCurrPage } from '../../reducers/familyReducer'

const Options = () => {

    const dispatch = useDispatch()

    const conditions = useSelector(state=>state.options.conditions)
    const free = useSelector(state => state.options.free)
    const registration = useSelector(state=>state.options.registration)

    const [prevConditions,setPrevconditions] = useState(conditions)
    const [prevFree, setPrevfree] = useState(free)
    const [prevRegistration,setPrevregistration] = useState(registration)

    const [searchTimeout, setSearchTimeout] = useState(false)

    const currPage = useSelector(state => state.family.currPage)
    const limit = useSelector(state => state.family.limit)

    const range = useSelector(state=>state.options.range);
    // console.log(state.options.range)
    // const [range, setRange] = useState([0,1000]);
    const [prevRange, setPrevRange] = useState(range)

    const handleChange = (event, newValue) => {
        setPrevRange(range)
        // setRange(newValue);
        dispatch(change_range(newValue));
    };


    useEffect(() => {
        clearTimeout(searchTimeout)
        const options = {
            conditions,registration,free,range
        }
        const paginationOptions = {
            currPage: currPage, limit: limit
        }
        if (range[0] === '' || range[1] === '') {
            // setRange([0,1000]);
            dispatch(change_range([0,1000]));
        }
        else if (!conditions.wifi && !conditions.separate_bath && !conditions.pets && !conditions.kitchen && 
            !registration && !free && range[0] === 0 && range[1] === 1000) {
            setSearchTimeout(() => setTimeout(() => {
                
                dispatch(getFamilies(null, paginationOptions))
            }, 300))
            
        }
        else {
            setSearchTimeout(() => setTimeout((value) => {
                
                if (prevFree !== free || prevRegistration !== registration|| prevRange !== range || prevConditions !== conditions) {
                    console.log(range)
                    dispatch(SetCurrPage(1));
                    dispatch(getFamilies(value, { currPage: 1, limit: limit }))

                    setPrevconditions(conditions)
                    setPrevregistration(registration)
                    setPrevfree(free)
                    setPrevRange(range)
                }
                else {
                    dispatch(getFamilies(value, paginationOptions))
                }
            }, 500, options))
        }


    }, [conditions, free, registration, range, currPage])

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
                        // setRange([e.target.value, range[1]])
                        dispatch(change_range([e.target.value, range[1]]));
                    }}>
                    </Input>
                    -
                    <Input type="number" value={range[1]} onChange={e => {
                        setPrevRange(range)
                        // setRange([range[0], e.target.value])
                        dispatch(change_range([range[0], e.target.value]));
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
            
            <div className='title'>Conditions:</div>
            <div className='conditions' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={conditions.wifi} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_conditions(e.target.checked,"wifi")) }}></Input> Wifi</div>
                <div ><Input checked={conditions.separated_bath} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_conditions(e.target.checked,"separate_bath")) }}></Input> Separate bath</div>
                <div ><Input checked={conditions.pets} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_conditions(e.target.checked,"pets")) }}></Input> Without pets</div>
                <div ><Input checked={conditions.kitchen} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_conditions(e.target.checked,"kitchen")) }}></Input> Kitchen usage</div>
            </div>

            <div className='title'>Food</div>
            <div className='food' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={conditions.food.half_board} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_food(e.target.checked,"half_board")) }}></Input> half-board</div>
                <div ><Input checked={conditions.food.only_breakfast} type="checkbox" onChange={e => { setPrevconditions(conditions); dispatch(change_food(e.target.checked,"only_breakfast")) }}></Input> only breakfast</div>
            </div>

            <div className='registrationPermission' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={registration} type="checkbox" onChange={e => { setPrevregistration(free); dispatch(change_registration(e.target.checked)) }}></Input> Permission for registration</div>
            </div>

            <div className='isfree' style={{ borderBottom: '1px solid rgb(142, 174, 189)' }}>
                <div ><Input checked={free} type="checkbox" onChange={e => { setPrevfree(free); dispatch(change_free(e.target.checked)) }}></Input> free now</div>
            </div>


            <button className='show_all' onClick={() => { dispatch(SetCurrPage(1)); dispatch(getFamilies(null, { currPage: 1, limit: limit })) }}>Show all without filters</button>
        </div>
    )
}

export default Options
