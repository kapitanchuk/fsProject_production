import React from 'react'
import './FamilyItem.scss'
import { Link } from 'react-router-dom'

const FamilyItem = ({ family }) => {
    return (
        <Link style={{ textDecoration: 'none' }} to={`/show/${family._id}`}>
            <div className='familyItem'>
                {family.photos ? <img src={family.photos[0]} alt='' /> : <div></div>}
                <div className='data'>
                <div className='title'>Family in {family.district}</div>
                    <ul className='properties'>
                        <li>{family.property_type}</li>
                        <li>{family.accommodation_type}</li>
                    </ul>

                    <div className='free-costs_container'>
                        <div className="freeProperty">
                            {family.free === true ? <div className='free'>Free right now</div> : <div className='free_after'>Free after: {family.free}</div>}
                        </div>
                        <div className='costs'>
                            <div className='costs_container'><div className="costs_type">without food</div><div className='costs_number'>{family.cost.cost_without_food}€</div></div>
                            {family.cost.cost_with_food ? <div className='costs_container'><div className="costs_type">half_board</div><div className='costs_number'>{family.cost.cost_with_food}€</div></div> : <div></div>}
                            {/* <div className="costs_type">without food</div><div className='costs_number'>{family.cost.cost_without_food}€</div> */}
                        </div>
                    </div>

                </div>
            </div>
            <div className='familyItem-mobile'>
                <div className='square-container'>
                    {family.photos ? <img src={family.photos[0]} alt='' /> : <></>}
                </div>
                <div className='data'>
                    <div className='title'>Family in {family.district}</div>
                    <ul className='properties'>
                        <li>{family.property_type}</li>
                        <li>{family.accommodation_type}</li>
                    </ul>

                    <div className='free-costs_container'>
                        <div className="freeProperty">
                            {family.free === true ? <div className='free'>Free right now</div> : <div className='free_after'>Free after: {family.free}</div>}
                        </div>
                        <div className='costs'>
                            <div className='costs_container'><div className="costs_type">without food</div><div className='costs_number'>{family.cost.cost_without_food}€</div></div>
                            {family.cost.cost_with_food ? <div className='costs_container'><div className="costs_type">half_board</div><div className='costs_number'>{family.cost.cost_with_food}€</div></div> : <div></div>}
                            {/* <div className="costs_type">without food</div><div className='costs_number'>{family.cost.cost_without_food}€</div> */}
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default FamilyItem
