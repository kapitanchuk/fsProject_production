import React,{useEffect} from 'react'
import './Environment.scss'
import FamiliesList from '../families/FamiliesList'
import Options from '../options/Options'
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrPage } from '../../reducers/familyReducer'

const Environment = () => {

    const totalNumber = useSelector(state => state.family.totalNumber)
    const limit = useSelector(state => state.family.limit)
    const currPage = useSelector(state=>state.family.currPage)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getFamilies())

    // }, []) //here should be options that user is choosing (maybe)
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
    //         console.log('currPosition:',latitude,longitude)
    //     })

    // }, [])

    const displayPageButtons = () => {
        const buttons = []
        for (let i = 0, j = 1; i < totalNumber; i += limit, j++) {
            buttons.push(j)
        }
        if(totalNumber<=limit){
            return
        }
        else return (buttons.map((item, index) => <button className={`page_btn ${item===currPage? 'active': ''}`} onClick={()=>dispatch(SetCurrPage(item))} key={index}>{item}</button>))
    }

    return (
        <div className='env'>
            <div className='container'>
                <div className='env__inner'>

                    <div className='options'>
                        <Options />

                    </div>
                    <div className='families'><FamiliesList /><nav>{displayPageButtons()}</nav></div>

                </div>
            </div>
        </div>
    )
}

export default Environment