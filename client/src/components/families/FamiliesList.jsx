import React from 'react'
import { useSelector } from 'react-redux'
import FamilyItem from './item/FamilyItem'
import './FamiliesList.scss'

const FamiliesList = () => {

    const families = useSelector(state=>state.family.families)

    if(!families||!families.length){
        return <h1>Families are not found</h1>
    }
    return (
        <div className='familiesList'>
            {families.map(item=>(
                <FamilyItem key={item._id} family={item}/>
            ))}
        </div>
    )
}

export default FamiliesList
