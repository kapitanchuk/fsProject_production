import React, { useEffect } from 'react'
import './Environment.scss'
import FamiliesList from '../families/FamiliesList'
import Options from '../options/Options'
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrPage } from '../../reducers/familyReducer'
import { CSSTransition } from 'react-transition-group'
import useWindowDimensions from './useWindowDimensions.js'
import { getFamilies } from '../../actions/familyActions'
import { SetSiderbarVisibility } from '../../reducers/UIreducer'

const Environment = () => {

    const totalNumber = useSelector(state => state.family.totalNumber)
    const limit = useSelector(state => state.family.limit)
    const currPage = useSelector(state => state.family.currPage)

    const options_menu = useSelector(state => state.UI.options_menu)
    const show_sidebar = useSelector(state => state.UI.show_sidebar)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFamilies(null, { currPage, limit }))
    }, [])

    // console.log(useWindowDimensions());
    // const dimensions = useWindowDimensions()
    // console.log(dimensions)
    // if(dimensions.width)
    // console.log(width,height)

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
        if (totalNumber <= limit) {
            return
        }
        else return (buttons.map((item, index) => <button className={`page_btn ${item === currPage ? 'active' : ''}`} onClick={() => dispatch(SetCurrPage(item))} key={index}>{item}</button>))
    }

    return (
        <div className='env'>

            <div className='env__inner'>

                <CSSTransition
                    in={show_sidebar}
                    timeout={500}
                    classNames={"options-primary"}
                    unmountOnExit
                >
                    <div className='options-mobile'>
                        <Options />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={show_sidebar}
                    timeout={500}
                    classNames={"sidebar__outer-animation"}
                    unmountOnExit
                >
                    <div onClick={() => dispatch(SetSiderbarVisibility(!show_sidebar))} className='sidebar__outer'></div>
                </CSSTransition>


                {!options_menu && <div className='options'>
                    <Options />
                </div>}


                <div className='families'><FamiliesList /><nav>{displayPageButtons()}</nav></div>

            </div>

        </div >
    )
}

export default Environment