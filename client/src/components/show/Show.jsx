import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { $axios } from '../../http(axios)'
import MySlider from './MySlider'
import './Show.scss'

const Show = () => {

    const params = useParams()

    const [family, setFamily] = useState({})

    useEffect(() => {
        $axios.get(`/family/getFamily?id=${params.id}`).then(response => setFamily(response.data.family))
    }, [])


    if (!family._id) {
        return <div></div>
    }

    return (
        <div className='show_family'>


            <div className='show_family__inner'>
                <div className='slider photos'>
                    <MySlider photos={family.photos} />
                </div>
                <div className='main-info'>
                    <div className='members'>
                        <div className='title title-show'>Members:</div>
                        <ul>
                            {family.members.map(member => <li key={member} className='member'>{member}</li>)}

                        </ul>
                    </div>
                    <div className='descriptions'>
                        <div className='title title-show'>Description:</div>
                        {family.description}
                    </div>
                    <div className="living_conditions">
                        <div className='title title-show'>Conditions that are provided:</div>
                        {family.living_conditions}
                    </div>
                    <div className='adress'>
                        <div className='title title-show'>Location: </div>
                        {family.adress}
                        <div>Also here should be a map and route to school</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Show
