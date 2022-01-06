import React from 'react'
import './Environment.scss'
import FamiliesList from '../families/FamiliesList'
import Options from '../options/Options'

const Environment = () => {

    // useEffect(() => {
    //     dispatch(getFamilies())
        
    // }, []) //here should be options that user is choosing (maybe)



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