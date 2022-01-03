import React from 'react'
import './FamilyItem.scss'

const FamilyItem = ({ family }) => {
    return (
        <div className='familyItem'>
            {family.photos ? <img src={family.photos[0]} alt='' /> : <div></div>}
            <div className='data'>
                {/* <div className='members'>
                    
                    {family.members.map(member => (<div key={member} className='member'>{member}</div>))}
                </div> */}
                <div className='languages'>
                    Languages:
                    {family.languages.map(language => (<div key={language} className='language'>{language}</div>))}
                </div>
                <div className='adress'>Adress: {family.adress}</div>
                <div className='description'>Description: {family.description}</div>

                <div className='living'>Living conditions: {family.living_conditions}</div>
            </div>

        </div>
    )
}

export default FamilyItem
