import React from 'react'
import './Environment.scss'
import { useDispatch } from 'react-redux'
import { getFamilies } from '../../actions/familyActions'
import { useEffect } from 'react'
import FamiliesList from '../families/FamiliesList'
import Options from '../options/Options'

const Environment = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFamilies())
        
    }, []) //here should be options that user is choosing (maybe)

    return (
        <div className='env'>
            <div className='container'>
                <div className='env__inner'>
                    <div className='options'>
                        <Options/>
                    </div>
                    <div className='families'><FamiliesList/></div>
                </div>
            </div>
        </div>
    )
}

export default Environment